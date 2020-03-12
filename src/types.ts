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
