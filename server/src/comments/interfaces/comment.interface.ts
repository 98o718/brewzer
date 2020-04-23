import { Document } from 'mongoose'

export interface Comment extends Document {
  entity: string
  user: string
  text: string
}
