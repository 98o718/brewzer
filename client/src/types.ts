export enum RecipeType {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

export enum RecipeAccessType {
  URL = 'URL',
  USER_ONLY = 'USER_ONLY',
}

export type RecipeDescription = {
  readonly id: string
  readonly title: string
  readonly author: string
  readonly abv: number
  readonly ibu: number
  readonly og: number
  readonly fg: number
  readonly time: string
  readonly recipeType: RecipeType
  readonly access: RecipeAccessType
}

export interface Grain {
  name: string
  weight: number
  color?: number
}

export interface Hop {
  name: string
  weight: number
  alpha: number
  hopType?: string
  time: number
}

export interface Yeast {
  name: string
  weight: number
  temp: number
}

export interface Pause {
  name?: string
  temp: number
  time: number
}

export interface Recipe {
  title: string
  description?: string
  details?: string
  ingredients: {
    grains: Grain[]
    hops: Hop[]
    yeast: Yeast | null
  }
  style?: string
  pauses: Pause[]
  volume: number
  abv: number
  ibu: number
  og: number
  fg: number
  type: RecipeType
  rating?: number
  access?: RecipeAccessType
  url?: string
}
