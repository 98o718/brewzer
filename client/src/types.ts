export type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U

export enum RecipeType {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

export enum RecipeAccessType {
  URL = 'URL',
  USER_ONLY = 'USER_ONLY',
}

export interface RecipeDescription extends Recipe {
  readonly id: string
  readonly _id: string
  readonly author: string
  ingredients: {
    grains: Grain[]
    hops: Hop[]
    yeast: Yeast
    others: Other[]
    dryHops: DryHop[]
  }
  readonly forked?: string
  readonly userId: string
  mashWater: number
  flushingWater: number
  volume: number
  batchVolume: number
  abv: number
  ibu: number
  og: number
  fg: number
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

export interface DryHop {
  name: string
  weight: number | ''
  when: WhenDryHop | ''
  time?: number
}

export interface Other {
  name: string
  weight: number | ''
  when: WhenOther | ''
  time?: number
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
    others: Other[]
    dryHops: DryHop[]
  }
  style?: string
  pauses: Pause[]
  mashWater: number | ''
  flushingWater: number | ''
  volume: number | ''
  batchVolume: number | ''
  abv: number | ''
  ibu: number | ''
  og: number | ''
  fg: number | ''
  recipeType: RecipeType
  rating?: number
  canVote?: boolean
  access?: RecipeAccessType
  url?: string
}

export type CreateBrew = {
  userId?: string
  recipe: string
  title: string
  comment?: string
  og?: number | ''
  fg?: number | ''
  volume?: number | ''
  brewDate: Date
  bottlingDate?: Date
  reminderDate?: Date
}

type BrewDescriptionOverrides = {
  id: string
  brewDate: string
  bottlingDate: string
  reminderDate?: string
}

export type BrewDescription = Overwrite<CreateBrew, BrewDescriptionOverrides>

export enum WhenDryHop {
  FIRST = 'Главное брожение',
  SECOND = 'Вторичное брожение',
  CARB = 'Карбонизация',
}

export enum WhenOther {
  MASH = 'В затор',
  BOILER = 'В котел',
  FIRST = 'Главное брожение',
  SECOND = 'Вторичное брожение',
  CARB = 'Карбонизация',
}
