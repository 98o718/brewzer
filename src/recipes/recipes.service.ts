import { Model, Schema } from 'mongoose'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import {
  Recipe,
  PublicRecipe,
  PrivateRecipe,
} from './interfaces/recipe.interface'
import { CreateRecipeDto } from './dto/create-recipe.dto'
import { FindRecipeDto } from './dto/find-recipe.dto'
import {
  publicRecipeDescriminator,
  privateRecipeDescriminator,
} from './schemas/recipe.schema'
import { RecipeType } from './recipe-type.enum'

@Injectable()
export class RecipesService {
  private publicRecipe: Model<PublicRecipe>
  private privateRecipe: Model<PrivateRecipe>

  constructor(@InjectModel('Recipe') private readonly recipe: Model<Recipe>) {
    this.publicRecipe = publicRecipeDescriminator(this.recipe)
    this.privateRecipe = privateRecipeDescriminator(this.recipe)
  }

  async create(
    createRecipeDto: CreateRecipeDto,
  ): Promise<PublicRecipe | PrivateRecipe> {
    switch (createRecipeDto.type) {
      case RecipeType.PUBLIC: {
        const createdRecipe = new this.publicRecipe(createRecipeDto)
        return await createdRecipe.save()
      }
      case RecipeType.PRIVATE: {
        const createdRecipe = new this.privateRecipe(createRecipeDto)
        return await createdRecipe.save()
      }
    }
  }

  async findAll(findRecipeDto: FindRecipeDto): Promise<PublicRecipe[]> {
    const { search } = findRecipeDto

    if (search) {
      return await this.publicRecipe
        .find({ title: { $regex: search, $options: 'i' } })
        .exec()
    }
    return await this.publicRecipe.find().exec()
  }

  async findById(id: string): Promise<Recipe> {
    try {
      const found = await this.publicRecipe.findById(id).exec()

      if (!found) {
        throw new NotFoundException(`Recipe with id: "${id}" not found.`)
      }

      return found
    } catch (error) {
      throw new NotFoundException(`Recipe with id: "${id}" not found.`)
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const result = await this.publicRecipe.findByIdAndDelete(id)

      if (!result) {
        throw new NotFoundException(`Recipe with id: "${id}" not found.`)
      }
    } catch (error) {
      throw new NotFoundException(`Recipe with id: "${id}" not found.`)
    }
  }
}
