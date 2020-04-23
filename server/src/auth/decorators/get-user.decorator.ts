import { createParamDecorator } from '@nestjs/common'
import { UserInfo } from '../../users/interfaces/user-info.interface'

export const GetUser = createParamDecorator(
  (data, req): UserInfo => {
    return req.user
  },
)
