import { Document } from 'mongoose'

export interface Brew extends Document {
  userId: string
  recipe: string
  title: string
  comment?: string
  og?: number
  volume?: number
  fg?: number
  brewDate: Date
  bottlingDate?: Date
  reminderDate?: Date
}
