import { Schema } from 'mongoose'

export const BrewSchema = new Schema({
  userId: Schema.Types.ObjectId,
  recipeId: Schema.Types.ObjectId,
  comment: String,
  og: Number,
  fg: Number,
  brewDate: Date,
  bottlingDate: Date,
  reminderDate: Date,
})
