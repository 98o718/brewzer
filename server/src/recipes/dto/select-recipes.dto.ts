import {
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsString,
  IsInt,
  IsBoolean,
} from 'class-validator'
import { ApiModelProperty } from '@nestjs/swagger'

export class SelectRecipesDto {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsInt()
  page: number

  @ApiModelProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  title: string

  @ApiModelProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  style: string

  @ApiModelProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  rating: string

  @ApiModelProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  sort: string

  @ApiModelProperty({
    required: false,
  })
  @IsOptional()
  abv: number

  @ApiModelProperty({
    required: false,
  })
  @IsOptional()
  ibu: number

  @ApiModelProperty({
    required: false,
  })
  @IsOptional()
  og: number

  @ApiModelProperty({
    required: false,
  })
  @IsOptional()
  @IsArray()
  grains: string[]

  @ApiModelProperty({
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  exactGrains: boolean

  @ApiModelProperty({
    required: false,
  })
  @IsOptional()
  @IsArray()
  hops: string[]

  @ApiModelProperty({
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  exactHops: boolean

  @ApiModelProperty({
    required: false,
  })
  @IsOptional()
  @IsArray()
  others: string[]

  @ApiModelProperty({
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  exactOthers: boolean

  @ApiModelProperty({
    required: false,
  })
  @IsOptional()
  @IsArray()
  yeasts: string[]
}
