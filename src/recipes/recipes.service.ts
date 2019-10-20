import { Model } from 'mongoose'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Recipe } from './interfaces/recipe.interface'
import { CreateRecipeDto } from './dto/create-recipe.dto'
import { FindRecipeDto } from './dto/find-recipe.dto'
import {
  publicRecipeDescriminator,
  privateRecipeDescriminator,
} from './schemas/recipe.schema'
import { RecipeType } from './recipe-type.enum'
import { UserInfo } from '../users/interfaces/user-info.interface'
import { UsersService } from '../users/users.service'
import { RecipeAccessType } from './recipe-access-type.enum'

@Injectable()
export class RecipesService {
  private publicRecipe: Model<Recipe>
  private privateRecipe: Model<Recipe>

  constructor(
    @InjectModel('Recipe') private readonly recipe: Model<Recipe>,
    private readonly userService: UsersService,
  ) {
    this.publicRecipe = publicRecipeDescriminator(this.recipe)
    this.privateRecipe = privateRecipeDescriminator(this.recipe)
  }

  private async search(
    model: Model<Recipe>,
    searchString?: string,
    params?: any,
  ) {
    if (searchString) {
      return await model
        .find({ title: { $regex: searchString, $options: 'i' }, ...params })
        .exec()
    } else {
      return await model.find({ ...params }).exec()
    }
  }

  async create(
    createRecipeDto: CreateRecipeDto,
    user: UserInfo,
  ): Promise<Recipe> {
    switch (createRecipeDto.type) {
      case RecipeType.PUBLIC: {
        const createdRecipe = new this.publicRecipe({
          ...createRecipeDto,
          userId: user.userId,
        })
        return await createdRecipe.save()
      }
      case RecipeType.PRIVATE: {
        const createdRecipe = new this.privateRecipe({
          ...createRecipeDto,
          userId: user.userId,
        })
        return await createdRecipe.save()
      }
    }
  }

  async findAll(
    findRecipeDto: FindRecipeDto,
    user: UserInfo | null,
  ): Promise<Recipe[]> {
    const { search } = findRecipeDto
    const recipes = await this.search(this.publicRecipe, search)
    if (user) {
      const privateRecipes = await this.search(this.privateRecipe, search, {
        userId: user.userId,
      })
      return recipes.concat(privateRecipes)
    }
    return recipes
  }

  async findAllByUser(
    findRecipeDto: FindRecipeDto,
    user: UserInfo | null,
    username: string,
  ): Promise<Recipe[]> {
    const { search } = findRecipeDto

    try {
      const { id } = await this.userService.find(username)

      let found: Recipe[]

      if (!user || user.userId !== id) {
        found = await this.search(this.publicRecipe, search, { userId: id })
      } else if (user.userId === id) {
        found = await this.search(this.recipe, search, { userId: id })
      }

      if (!found || found.length === 0) {
        throw new NotFoundException(`Nothing found.`)
      } else {
        return found
      }
    } catch (error) {
      throw new NotFoundException(`Nothing found.`)
    }
  }

  async findById(id: string, user: UserInfo | null): Promise<Recipe> {
    try {
      const publicFound = await this.publicRecipe.findById(id).exec()

      if (publicFound) {
        return publicFound
      } else if (user) {
        const privateFound = await this.privateRecipe
          .findOne({
            _id: id,
            userId: user.userId,
          })
          .exec()

        if (privateFound) {
          return privateFound
        }
      }

      throw new NotFoundException(`Recipe with id: "${id}" not found.`)
    } catch (error) {
      throw new NotFoundException(`Recipe with id: "${id}" not found.`)
    }
  }

  async findByUrl(url: string): Promise<Recipe> {
    try {
      const found = await this.privateRecipe.findOne({ url }).exec()

      if (!found) {
        throw new NotFoundException(`Recipe with url: "${url}" not found.`)
      } else {
        return found
      }
    } catch (error) {
      throw new NotFoundException(`Recipe with url: "${url}" not found.`)
    }
  }

  async changeType(id: string, user: UserInfo): Promise<Recipe> {
    try {
      const changed = await this.recipe.findOne({
        _id: id,
        userId: user.userId,
      })

      if (!changed) {
        throw new NotFoundException(
          `Recipe with id: "${id}" not found or you haven't permission to change type of them.`,
        )
      }

      switch (changed.recipeType) {
        case RecipeType.PUBLIC: {
          const futurePrivate = changed.toObject()

          delete futurePrivate.rating
          futurePrivate.access = RecipeAccessType.USER_ONLY

          const changedPublic = this.privateRecipe.hydrate(futurePrivate)
          changedPublic.recipeType = RecipeType.PRIVATE
          return await changedPublic.save()
        }
        case RecipeType.PRIVATE: {
          const futurePublic = changed.toObject()

          futurePublic.rating = 0
          delete futurePublic.access
          delete futurePublic.url

          const changedPrivate = this.publicRecipe.hydrate(futurePublic)
          changedPrivate.recipeType = RecipeType.PUBLIC
          return await changedPrivate.save()
        }
      }
    } catch (error) {
      throw new NotFoundException(
        `Recipe with id: "${id}" not found or you haven't permission to change type of them.`,
      )
    }
  }

  async delete(id: string, user: UserInfo): Promise<void> {
    try {
      const result = await this.recipe.findOneAndDelete({
        _id: id,
        userId: user.userId,
      })

      if (!result) {
        throw new NotFoundException(
          `Recipe with id: "${id}" not found or you haven't permission to delete them.`,
        )
      }
    } catch (error) {
      throw new NotFoundException(
        `Recipe with id: "${id}" not found or you haven't permission to delete them.`,
      )
    }
  }

  async deleteAllByUser(user: UserInfo): Promise<void> {
    try {
      const result = await this.recipe.deleteMany({
        userId: user.userId,
      })

      if (!result) {
        throw new NotFoundException(`Nothing to delete.`)
      }
    } catch (error) {
      throw new NotFoundException(`Nothing to delete.`)
    }
  }
}
