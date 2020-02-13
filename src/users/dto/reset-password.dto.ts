import { ApiModelProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class ResetPasswordDto {
  @ApiModelProperty()
  @IsNotEmpty()
  username: string

  @ApiModelProperty()
  @IsNotEmpty()
  password: string

  @ApiModelProperty()
  @IsNotEmpty()
  token: string
}
