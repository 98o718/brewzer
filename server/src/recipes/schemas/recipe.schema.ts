import { Schema } from 'mongoose'
import { RecipeType } from '../recipe-type.enum'

export const RecipeSchema = new Schema(
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
      dryHops: [
        {
          name: String,
          weight: Number,
          when: String,
          time: Number,
        },
      ],
      others: [
        {
          name: String,
          weight: Number,
          when: String,
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
    batchVolume: Number,
    mashWater: Number,
    flushingWater: Number,
    abv: Number,
    ibu: Number,
    og: Number,
    fg: Number,
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    author: String,
    forked: String,
  },
  {
    discriminatorKey: 'recipeType',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  },
)

const PublicRecipeSchema = new Schema({
  rating: {
    type: Number,
    default: 0,
  },
  votes: {
    type: [Number],
    default: [0, 0, 0, 0, 0],
  },
  voted: {
    type: [String],
    default: [],
  },
})

const PrivateRecipeSchema = new Schema({
  access: {
    type: String,
  },
})

export function publicRecipeDescriminator(recipe) {
  return recipe.discriminator(RecipeType.PUBLIC, PublicRecipeSchema)
}

export function privateRecipeDescriminator(recipe) {
  return recipe.discriminator(RecipeType.PRIVATE, PrivateRecipeSchema)
}

RecipeSchema.virtual('favorites', {
  ref: 'User',
  localField: '_id',
  foreignField: 'favorites',
  justOne: false,
})

RecipeSchema.plugin(require('mongoose-paginate-v2'))
