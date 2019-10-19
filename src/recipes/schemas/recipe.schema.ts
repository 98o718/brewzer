import * as mongoose from 'mongoose'

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
        name: String,
        time: Number,
      },
    ],
    beerType: String,
    volume: Number,
  },
  { discriminatorKey: 'recipeType' },
)

const PublicRecipeSchema = new mongoose.Schema({
  rating: {
    type: Number,
  },
})

const PrivateRecipeSchema = new mongoose.Schema({
  access: {
    type: String,
    enum: ['URL', 'USER_ONLY'],
  },
})

export function publicRecipeDescriminator(recipe) {
  return recipe.discriminator('PublicRecipe', PublicRecipeSchema)
}

export function privateRecipeDescriminator(recipe) {
  return recipe.discriminator('PrivateRecipe', PrivateRecipeSchema)
}
