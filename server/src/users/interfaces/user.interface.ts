import { Document } from 'mongoose'
import { Recipe } from '../../recipes/interfaces/recipe.interface'

export interface User extends Document {
  email: string
  username: string
  password: string
  avatar: string
  avatarId?: string
  miniAvatar: string
  withPhoto: boolean
  recipes: Recipe[]
  favorites: string[]
}
