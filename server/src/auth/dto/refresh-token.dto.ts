import { ApiModelProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class RefreshTokenDto {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  fingerprint: string

  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  refreshToken: string
}
