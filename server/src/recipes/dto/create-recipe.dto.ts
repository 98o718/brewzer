import {
  IsNotEmpty,
  IsOptional,
  IsObject,
  ValidateNested,
  IsArray,
  ArrayNotEmpty,
  ValidateIf,
  IsEnum,
} from 'class-validator'
import { Type } from 'class-transformer'
import { ApiModelProperty } from '@nestjs/swagger'
import { RecipeType } from '../recipe-type.enum'
import { RecipeAccessType } from '../recipe-access-type.enum'

class Grain {
  @ApiModelProperty()
  @IsNotEmpty()
  name: string

  @ApiModelProperty()
  @IsNotEmpty()
  weight: number

  @ApiModelProperty({
    required: false,
  })
  @IsOptional()
  color: number
}

class Hop {
  @ApiModelProperty()
  @IsNotEmpty()
  name: string

  @ApiModelProperty()
  @IsNotEmpty()
  weight: number

  @ApiModelProperty()
  @IsNotEmpty()
  alpha: number

  @ApiModelProperty({
    required: false,
  })
  @IsOptional()
  hopType: string

  @ApiModelProperty()
  @IsNotEmpty()
  time: number
}

class DryHop {
  @ApiModelProperty()
  @IsNotEmpty()
  name: string

  @ApiModelProperty()
  @IsNotEmpty()
  weight: number

  @ApiModelProperty()
  @IsNotEmpty()
  when: string

  @ApiModelProperty()
  @IsOptional()
  time: number
}

class Other {
  @ApiModelProperty()
  @IsNotEmpty()
  name: string

  @ApiModelProperty()
  @IsNotEmpty()
  weight: number

  @ApiModelProperty()
  @IsNotEmpty()
  when: string

  @ApiModelProperty()
  @IsOptional()
  time: number
}

class Yeast {
  @ApiModelProperty()
  @IsNotEmpty()
  name: string

  @ApiModelProperty({
    required: false,
  })
  @IsOptional()
  weight: number

  @ApiModelProperty()
  @IsNotEmpty()
  temp: number
}

class Ingredients {
  @ApiModelProperty({
    isArray: true,
    type: Grain,
  })
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => Grain)
  grains: Grain[]

  @ApiModelProperty({
    isArray: true,
    type: Hop,
  })
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => Hop)
  hops: Hop[]

  @ApiModelProperty({
    isArray: true,
    type: DryHop,
  })
  @IsArray()
  @ValidateNested()
  @Type(() => DryHop)
  dryHops: DryHop[]

  @ApiModelProperty({
    isArray: true,
    type: Other,
  })
  @IsArray()
  @ValidateNested()
  @Type(() => Other)
  others: Other[]

  @ApiModelProperty()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Yeast)
  yeast: Yeast
}

class Pause {
  @ApiModelProperty({
    required: false,
  })
  @IsOptional()
  name: string

  @IsNotEmpty()
  temp: number

  @IsNotEmpty()
  time: number
}

export class CreateRecipeDto {
  @ApiModelProperty()
  @IsNotEmpty()
  title: string

  @ApiModelProperty({
    required: false,
  })
  @IsOptional()
  description: string

  @ApiModelProperty({
    required: false,
  })
  @IsOptional()
  details: string

  @ApiModelProperty()
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => Ingredients)
  ingredients: Ingredients

  @ApiModelProperty({
    required: false,
  })
  @IsOptional()
  style: string

  @ApiModelProperty()
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => Pause)
  pauses: Pause[]

  @ApiModelProperty({
    required: false,
  })
  @IsOptional()
  beerType: string

  @ApiModelProperty({
    required: false,
  })
  @IsOptional()
  author: string

  @ApiModelProperty()
  @IsNotEmpty()
  mashWater: number

  @ApiModelProperty()
  @IsNotEmpty()
  flushingWater: number

  @ApiModelProperty()
  @IsNotEmpty()
  volume: number

  @ApiModelProperty()
  @IsOptional()
  batchVolume: number

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
  fg: number

  @ApiModelProperty()
  @IsNotEmpty()
  @IsEnum(RecipeType)
  recipeType: RecipeType

  @ApiModelProperty()
  @ValidateIf(o => o.type === RecipeType.PRIVATE)
  @IsNotEmpty()
  access: RecipeAccessType
}
