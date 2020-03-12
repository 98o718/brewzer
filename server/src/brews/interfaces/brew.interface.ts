import { Document } from 'mongoose'

export interface Brew extends Document {
  userId: string
  recipeId: string
  comment?: string
  og?: number
  fg?: number
  brewDate: Date
  bottlingDate?: Date
  reminderDate?: Date
}
