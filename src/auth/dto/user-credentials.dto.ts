import { ApiModelProperty } from '@nestjs/swagger'

export class UserCredentials {
  @ApiModelProperty()
  username: string

  @ApiModelProperty()
  password: string
}
