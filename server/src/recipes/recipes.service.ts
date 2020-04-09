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
import { RateRecipeDto } from './dto/rate-recipe.dto'
import uuidv4 from 'uuidv4'

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
        .sort('-created_at')
        .select('-voted')
        .exec()
    } else {
      return await model
        .find({ ...params })
        .sort('-created_at')
        .select('-voted')
        .exec()
    }
  }

  async create(
    createRecipeDto: CreateRecipeDto,
    user: UserInfo,
  ): Promise<Recipe> {
    switch (createRecipeDto.recipeType) {
      case RecipeType.PUBLIC: {
        const createdRecipe = new this.publicRecipe({
          ...createRecipeDto,
          userId: user.userId,
          author: user.username,
        })
        return await createdRecipe.save()
      }
      case RecipeType.PRIVATE: {
        const createdRecipe = new this.privateRecipe({
          ...createRecipeDto,
          userId: user.userId,
          author: user.username,
          url:
            createRecipeDto.access === RecipeAccessType.URL ? uuidv4() : null,
        })
        return await createdRecipe.save()
      }
    }
  }

  async copy(
    createRecipeDto: CreateRecipeDto,
    user: UserInfo,
  ): Promise<Recipe> {
    switch (createRecipeDto.recipeType) {
      case RecipeType.PUBLIC: {
        const createdRecipe = new this.publicRecipe({
          ...createRecipeDto,
          userId: user.userId,
          author: user.username,
          forked: createRecipeDto.author,
        })
        return await createdRecipe.save()
      }
      case RecipeType.PRIVATE: {
        const createdRecipe = new this.privateRecipe({
          ...createRecipeDto,
          userId: user.userId,
          author: user.username,
          forked: createRecipeDto.author,
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
      let found: Recipe[]

      if (!user || user.username !== username) {
        found = await this.search(this.publicRecipe, search, {
          author: username,
        })
      } else if (user.username === username) {
        found = await this.search(this.recipe, search, { author: username })
      }

      if (!found) {
        throw new NotFoundException(`Nothing found.`)
      } else if (found.length === 0) {
        return found
      } else {
        return found
      }
    } catch (error) {
      throw new NotFoundException(`Nothing found.`)
    }
  }

  async findPopular() {
    try {
      const popular = await this.publicRecipe
        .find({
          rating: {
            $gt: 0,
          },
        })
        .sort({ rating: -1 })
        .limit(10)

      if (!popular) throw new Error()

      return popular
    } catch (error) {
      throw new NotFoundException(`Nothing found.`)
    }
  }

  async findNew() {
    try {
      const newRecipes = await this.publicRecipe
        .find()
        .sort('-created_at')
        .select('-voted')
        .limit(10)

      if (!newRecipes) throw new Error()

      return newRecipes
    } catch (error) {
      throw new NotFoundException(`Nothing found.`)
    }
  }

  async findById(id: string, user: UserInfo | null) {
    try {
      const publicFound = await this.publicRecipe.findById(id).exec()

      if (publicFound) {
        let canVote =
          user === null ? false : !publicFound.voted.includes(user.userId)

        let recipe = publicFound.toObject()

        recipe.canVote = canVote

        delete recipe.voted

        return recipe
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

  async rate(
    id: string,
    user: UserInfo | null,
    { vote }: RateRecipeDto,
  ): Promise<Recipe> {
    try {
      const recipe = await this.publicRecipe
        .findOne({ _id: id, voted: { $ne: user.userId } })
        .exec()

      if (recipe) {
        let votes = recipe.votes.slice()
        votes[vote] += 1
        recipe.votes = votes

        let total_rate = 0
        let total_voters = 0

        recipe.votes.forEach((qty, idx) => {
          total_rate += (idx + 1) * qty
          total_voters += qty
        })

        recipe.voted = recipe.voted.concat([user.userId])

        recipe.rating = +(total_rate / total_voters).toFixed(2)

        return await recipe.save()
      }

      throw new NotFoundException(
        `Rate recipe with id: "${id}" is not posssible.`,
      )
    } catch (error) {
      throw new NotFoundException(
        `Rate recipe with id: "${id}" is not posssible.`,
      )
    }
  }

  async findByUrl(url: string): Promise<Recipe> {
    try {
      const found = await this.privateRecipe
        .findOne({ url, access: RecipeAccessType.URL })
        .exec()

      if (!found) {
        throw new NotFoundException(`Recipe with url: "${url}" not found.`)
      } else {
        return found
      }
    } catch (error) {
      throw new NotFoundException(`Recipe with url: "${url}" not found.`)
    }
  }

  async edit(
    id: string,
    user: UserInfo,
    editRecipeDto: CreateRecipeDto,
  ): Promise<Recipe> {
    try {
      const editable = await this.recipe.findOne({
        _id: id,
        userId: user.userId,
      })

      if (!editable) {
        throw new NotFoundException(
          `Recipe with id: "${id}" not found or you haven't permission to edit them.`,
        )
      } else if (editable.recipeType === editRecipeDto.recipeType) {
        if (editRecipeDto.access === RecipeAccessType.URL && !editable.url) {
          return editable.updateOne({ ...editRecipeDto, url: uuidv4() })
        }
        return editable.updateOne(editRecipeDto)
      } else {
        switch (editable.recipeType) {
          case RecipeType.PUBLIC: {
            const futurePrivate = { ...editable.toObject(), ...editRecipeDto }

            delete futurePrivate.rating
            delete futurePrivate.voted
            delete futurePrivate.votes

            if (editRecipeDto.access === RecipeAccessType.URL) {
              futurePrivate.url = uuidv4()
            }

            const changedPublic = new this.privateRecipe(futurePrivate)
            await editable.remove()
            return await changedPublic.save()
          }
          case RecipeType.PRIVATE: {
            const futurePublic = { ...editable.toObject(), ...editRecipeDto }

            futurePublic.rating = 0

            delete futurePublic.access
            delete futurePublic.url

            const changedPrivate = new this.publicRecipe(futurePublic)
            await editable.remove()
            return await changedPrivate.save()
          }
        }
      }
    } catch (error) {
      throw new NotFoundException(
        `Recipe with id: "${id}" not found or you haven't permission to edit them.`,
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
