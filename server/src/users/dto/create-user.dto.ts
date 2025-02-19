import { ApiModelProperty } from '@nestjs/swagger'
import {
  IsEmail,
  IsNotEmpty,
  ValidateNested,
  ArrayMaxSize,
  IsOptional,
} from 'class-validator'
import { Avatar } from './upload-avatar.dto'
import { Type } from 'class-transformer'

export class CreateUserDto {
  @ApiModelProperty()
  @IsEmail()
  email: string

  @ApiModelProperty()
  @IsNotEmpty()
  username: string

  @ApiModelProperty()
  @IsNotEmpty()
  password: string

  @IsOptional()
  @ArrayMaxSize(1)
  @Type(() => Avatar)
  @ValidateNested()
  @ApiModelProperty({ isArray: true, type: Avatar })
  avatar: Avatar[]
}
