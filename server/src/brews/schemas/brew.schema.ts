import { Schema } from 'mongoose'

export const BrewSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  recipe: { type: Schema.Types.ObjectId, ref: 'Recipe' },
  title: String,
  comment: String,
  og: Number,
  volume: Number,
  fg: Number,
  brewDate: Date,
  bottlingDate: Date,
  reminderDate: Date,
})

BrewSchema.set('toJSON', {
  virtuals: true,
})
