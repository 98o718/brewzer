import { IsOptional } from 'class-validator'

export class FindRecipeDto {
  @IsOptional()
  search: string
}
