import * as mongoose from 'mongoose'
import { RecipeType } from '../recipe-type.enum'
import { Recipe } from '../interfaces/recipe.interface'
import uuid from 'uuidv4'
import { RecipeAccessType } from '../recipe-access-type.enum'

export const RecipeSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    details: String,
    ingredients: {
      grains: [
        {
          name: String,
          weight: Number,
          color: Number,
        },
      ],
      hops: [
        {
          name: String,
          weight: Number,
          alpha: Number,
          hopType: String,
          time: Number,
        },
      ],
      yeast: {
        name: String,
        weight: Number,
        temp: Number,
      },
    },
    style: String,
    pauses: [
      {
        temp: Number,
        name: String,
        time: Number,
      },
    ],
    beerType: String,
    volume: Number,
    abv: Number,
    ibu: Number,
    og: Number,
    fg: Number,
    userId: mongoose.Schema.Types.ObjectId,
    author: String,
  },
  { discriminatorKey: 'recipeType' },
)

RecipeSchema.set('toJSON', {
  virtuals: true,
})

const PublicRecipeSchema = new mongoose.Schema({
  rating: {
    type: Number,
    default: 0,
  },
})

const PrivateRecipeSchema = new mongoose.Schema({
  access: {
    type: String,
  },
  url: String,
})

PrivateRecipeSchema.pre('save', function(this: Recipe) {
  if (this.access === RecipeAccessType.URL) this.url = uuid()
})

export function publicRecipeDescriminator(recipe) {
  return recipe.discriminator(RecipeType.PUBLIC, PublicRecipeSchema)
}

export function privateRecipeDescriminator(recipe) {
  return recipe.discriminator(RecipeType.PRIVATE, PrivateRecipeSchema)
}
