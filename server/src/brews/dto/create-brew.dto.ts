import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsDate,
  IsDateString,
} from 'class-validator'
import { ApiModelProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'

export class CreateBrewDto {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  recipeId: string

  @ApiModelProperty()
  @IsOptional()
  @IsString()
  comment?: string

  @ApiModelProperty()
  @IsOptional()
  @IsNumber()
  og?: number

  @ApiModelProperty()
  @IsOptional()
  @IsNumber()
  fg?: number

  @ApiModelProperty()
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  brewDate: Date

  @ApiModelProperty()
  @IsOptional()
  @IsDateString()
  bottlingDate?: string

  @ApiModelProperty()
  @IsOptional()
  @IsDateString()
  reminderDate?: string
}
