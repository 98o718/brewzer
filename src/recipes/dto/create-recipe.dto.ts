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

  @ApiModelProperty()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Yeast)
  yeast: Yeast
}

class Pause {
  @IsNotEmpty()
  name: string

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

  @ApiModelProperty()
  @IsNotEmpty()
  volume: number

  @ApiModelProperty()
  @IsNotEmpty()
  @IsEnum(RecipeType)
  type: RecipeType

  @ApiModelProperty()
  @ValidateIf(o => o.type === RecipeType.PRIVATE)
  @IsNotEmpty()
  access: RecipeAccessType
}
