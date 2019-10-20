import { Document } from 'mongoose'
import { RecipeAccessType } from '../recipe-access-type.enum'

interface Grain {
  name: string
  weight: number
  color: number
}

interface Hop {
  name: string
  weight: number
  alpha: number
  hopType?: string
  time: number
}

interface Yeast {
  name: string
  weight?: number
  temp: number
}

interface Pause {
  name: string
  time: number
}

export interface Recipe extends Document {
  readonly title: string
  readonly description?: string
  readonly details?: string
  readonly ingredients: {
    grains: Grain[]
    hops: Hop[]
    yeast: Yeast
  }
  readonly style?: string
  readonly pauses: Pause[]
  readonly beerType?: string
  readonly volume: number
  recipeType: string
  readonly userId: string
  rating?: number
  access?: RecipeAccessType
  url?: string
}

export interface PublicRecipe extends Recipe {
  rating: number
}

export interface PrivateRecipe extends Recipe {
  readonly access: RecipeAccessType
  url?: string
}
