import { Model, PaginateModel } from 'mongoose'
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common'
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
import { SelectRecipesDto } from './dto/select-recipes.dto'

@Injectable()
export class RecipesService {
  private publicRecipe: Model<Recipe>
  private privateRecipe: Model<Recipe>

  constructor(
    @InjectModel('Recipe') private readonly recipe: PaginateModel<Recipe>,
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
          userId: [user.userId],
          author: user.username,
        })
        return await createdRecipe.save()
      }
      case RecipeType.PRIVATE: {
        const createdRecipe = new this.privateRecipe({
          ...createRecipeDto,
          userId: user.userId,
          author: user.username,
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

    let found: Recipe[]

    const isUserExist = await this.userService.isExist(username)

    if (!isUserExist) throw new NotFoundException(`Nothing found.`)

    if (!user || user.username !== username) {
      found = await this.search(this.publicRecipe, search, {
        author: username,
      })
    } else if (user.username === username) {
      found = await this.search(this.recipe, search, { author: username })
    }

    if (!found) {
      throw new NotFoundException(`Nothing found.`)
    } else {
      return found
    }
  }

  async select(selectRecipesDto: SelectRecipesDto) {
    const query: {
      [key: string]:
        | string
        | RegExp
        | {
            [key: string]: any
          }
    } = {}

    query.recipeType = RecipeType.PUBLIC

    if (selectRecipesDto.title) {
      let regExp = new RegExp(selectRecipesDto.title.trim(), 'i')
      query.title = regExp
    }

    if (selectRecipesDto.style) {
      let regExp = new RegExp(selectRecipesDto.style.trim(), 'i')
      query.style = regExp
    }

    if (selectRecipesDto.rating) {
      query.rating = {
        $gte: Number(selectRecipesDto.rating),
      }
    }

    if (selectRecipesDto.abv) {
      query.abv = {
        $gte: selectRecipesDto.abv,
      }
    }

    if (selectRecipesDto.ibu) {
      query.ibu = {
        $gte: selectRecipesDto.ibu,
      }
    }

    if (selectRecipesDto.og) {
      query.og = {
        $gte: selectRecipesDto.og,
      }
    }

    if (!!selectRecipesDto.grains.length) {
      if (selectRecipesDto.exactGrains) {
        query['ingredients.grains.name'] = {
          $all: selectRecipesDto.grains.map(
            name => new RegExp(name.trim(), 'i'),
          ),
        }
      } else {
        query['ingredients.grains.name'] = {
          $in: selectRecipesDto.grains.map(
            name => new RegExp(name.trim(), 'i'),
          ),
        }
      }
    }

    if (!!selectRecipesDto.hops.length) {
      if (selectRecipesDto.exactHops) {
        query.$or = [
          {
            'ingredients.hops.name': {
              $all: selectRecipesDto.hops.map(
                name => new RegExp(name.trim(), 'i'),
              ),
            },
          },
          {
            'ingredients.dryHops.name': {
              $all: selectRecipesDto.hops.map(
                name => new RegExp(name.trim(), 'i'),
              ),
            },
          },
        ]
      } else {
        query.$or = [
          {
            'ingredients.hops.name': {
              $in: selectRecipesDto.hops.map(
                name => new RegExp(name.trim(), 'i'),
              ),
            },
          },
          {
            'ingredients.dryHops.name': {
              $in: selectRecipesDto.hops.map(
                name => new RegExp(name.trim(), 'i'),
              ),
            },
          },
        ]
      }
    }

    if (!!selectRecipesDto.others.length) {
      if (selectRecipesDto.exactOthers) {
        query['ingredients.others.name'] = {
          $all: selectRecipesDto.others.map(
            name => new RegExp(name.trim(), 'i'),
          ),
        }
      } else {
        query['ingredients.others.name'] = {
          $in: selectRecipesDto.others.map(
            name => new RegExp(name.trim(), 'i'),
          ),
        }
      }
    }

    if (!!selectRecipesDto.yeasts.length) {
      query['ingredients.yeast.name'] = {
        $in: selectRecipesDto.yeasts.map(name => new RegExp(name.trim(), 'i')),
      }
    }

    const recipes = await this.recipe.paginate(query, {
      page: selectRecipesDto.page,
      limit: 10,
      sort: selectRecipesDto.sort,
    })

    return recipes
  }

  async findPopular() {
    const popular = await this.publicRecipe
      .find({
        rating: {
          $gt: 0,
        },
      })
      .sort({ rating: -1 })
      .limit(10)

    if (!popular) throw new NotFoundException(`Nothing found.`)

    return popular
  }

  async findNew() {
    const newRecipes = await this.publicRecipe
      .find()
      .sort('-created_at')
      .select('-voted')
      .limit(10)

    if (!newRecipes) throw new NotFoundException(`Nothing found.`)

    return newRecipes
  }

  async findFavorites(user: UserInfo) {
    const favoritesList = await this.userService.getFavoritesList(user.userId)

    if (!favoritesList) throw new BadRequestException()

    const favoriteRecipes = await this.recipe
      .find({
        _id: {
          $in: favoritesList,
        },
      })
      .where({
        $or: [
          { recipeType: RecipeType.PUBLIC },
          { access: RecipeAccessType.URL },
          { userId: user.userId },
        ],
      })
      .exec()

    if (favoriteRecipes.length !== favoritesList.length) {
      const actualIds = favoriteRecipes.map(recipe => `${recipe.id}`)

      for (let favorite of favoritesList) {
        if (!actualIds.includes(`${favorite}`)) {
          await this.userService.removeFromFavorites(user, `${favorite}`)
        }
      }
    }

    return favoriteRecipes
  }

  async findById(id: string, user: UserInfo | null) {
    const publicFound = await this.recipe
      .findById(id)
      .where({
        $or: [
          {
            recipeType: RecipeType.PUBLIC,
          },
          {
            access: RecipeAccessType.URL,
          },
        ],
      })
      .populate('favorites', '_id -favorites')
      .exec()

    if (publicFound) {
      let recipe = publicFound.toObject()

      if (publicFound.recipeType === RecipeType.PUBLIC) {
        let canVote =
          user === null ? false : !publicFound.voted.includes(user.userId)

        recipe.canVote = canVote
      }

      recipe.favorites =
        user === null
          ? false
          : recipe.favorites.some(
              (favorite: { _id: string }) => `${favorite._id}` === user.userId,
            )

      delete recipe.voted

      return recipe
    } else if (user) {
      const privateFound = await this.privateRecipe
        .findOne({
          _id: id,
          userId: user.userId,
        })
        .populate('favorites', '_id -favorites')
        .exec()

      if (privateFound) {
        let recipe = privateFound.toObject()

        recipe.favorites =
          user === null
            ? false
            : recipe.favorites.some(
                (favorite: { _id: string }) =>
                  `${favorite._id}` === user.userId,
              )

        return recipe
      }
    }

    throw new NotFoundException(`Recipe with id: "${id}" not found.`)
  }

  async rate(
    id: string,
    user: UserInfo | null,
    { vote }: RateRecipeDto,
  ): Promise<Recipe> {
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
  }

  async edit(
    id: string,
    user: UserInfo,
    editRecipeDto: CreateRecipeDto,
  ): Promise<Recipe> {
    const editable = await this.recipe.findOne({
      _id: id,
      userId: user.userId,
    })

    if (!editable) {
      throw new NotFoundException(
        `Recipe with id: "${id}" not found or you haven't permission to edit them.`,
      )
    } else if (editable.recipeType === editRecipeDto.recipeType) {
      return editable.updateOne(editRecipeDto)
    } else {
      switch (editable.recipeType) {
        case RecipeType.PUBLIC: {
          const futurePrivate = { ...editable.toObject(), ...editRecipeDto }

          delete futurePrivate.rating
          delete futurePrivate.voted
          delete futurePrivate.votes

          const changedPublic = new this.privateRecipe(futurePrivate)
          await editable.remove()
          return await changedPublic.save()
        }
        case RecipeType.PRIVATE: {
          const futurePublic = { ...editable.toObject(), ...editRecipeDto }

          futurePublic.rating = 0

          delete futurePublic.access

          const changedPrivate = new this.publicRecipe(futurePublic)
          await editable.remove()
          return await changedPrivate.save()
        }
      }
    }
  }

  async delete(id: string, user: UserInfo): Promise<void> {
    const result = await this.recipe.findOneAndDelete({
      _id: id,
      userId: user.userId,
    })

    if (!result) {
      throw new NotFoundException(
        `Recipe with id: "${id}" not found or you haven't permission to delete them.`,
      )
    }
  }

  async deleteAllByUser(user: UserInfo): Promise<void> {
    const result = await this.recipe.deleteMany({
      userId: user.userId,
    })

    if (!result) {
      throw new NotFoundException(`Nothing to delete.`)
    }
  }
}
