import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsDate,
  IsDateString,
  ValidateIf,
} from 'class-validator'
import { ApiModelProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'

export class CreateBrewDto {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  recipe: string

  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  title: string

  @ApiModelProperty()
  @IsOptional()
  @IsString()
  comment?: string

  @ApiModelProperty()
  @ValidateIf(o => o.volume !== '')
  @IsOptional()
  @IsNumber()
  volume?: number

  @ApiModelProperty()
  @ValidateIf(o => o.og !== '')
  @IsOptional()
  @IsNumber()
  og?: number

  @ApiModelProperty()
  @ValidateIf(o => o.fg !== '')
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
