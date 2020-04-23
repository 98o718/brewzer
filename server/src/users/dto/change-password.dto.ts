import { ApiModelProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class ChangePasswordDto {
  @ApiModelProperty()
  @IsNotEmpty()
  password: string

  @ApiModelProperty()
  @IsNotEmpty()
  newPassword: string
}
