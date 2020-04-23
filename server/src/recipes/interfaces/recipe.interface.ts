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

interface DryHop {
  name: string
  weight: number
  when: string
  time?: number
}

interface Yeast {
  name: string
  weight?: number
  temp: number
}

interface Pause {
  name?: string
  temp: number
  time: number
}

interface Other {
  name: string
  weight: number
  when: string
  time?: number
}

export interface Recipe extends Document {
  readonly title: string
  readonly description?: string
  readonly details?: string
  readonly ingredients: {
    grains: Grain[]
    hops: Hop[]
    dryHops: DryHop[]
    others: Other[]
    yeast: Yeast
  }
  readonly style?: string
  readonly pauses: Pause[]
  readonly beerType?: string
  readonly volume: number
  readonly batchVolume: number
  readonly mashWater: number
  readonly flushingWater: number
  readonly abv: number
  readonly ibu: number
  readonly og: number
  readonly fg: number
  recipeType: string
  readonly userId: string
  rating?: number
  votes?: number[]
  voted?: string[]
  favorites?: string[]
  canVote?: boolean
  forked?: string
  access?: RecipeAccessType
}

export interface PublicRecipe extends Recipe {
  rating: number
  votes: number[]
  voted: string[]
}

export interface PrivateRecipe extends Recipe {
  readonly access: RecipeAccessType
}
