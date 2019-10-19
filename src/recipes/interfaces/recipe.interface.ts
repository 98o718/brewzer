import { Document } from 'mongoose'

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
}

export interface PublicRecipe extends Recipe {
  readonly rating: number
}

export interface PrivateRecipe extends Recipe {
  readonly access: 'URL' | 'USER_ONLY'
}
