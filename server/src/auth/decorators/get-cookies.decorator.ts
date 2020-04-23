import { createParamDecorator } from '@nestjs/common'

export const GetCookies = createParamDecorator((data, req) => {
  if (req.cookies) {
    return req.cookies
  }
  return undefined
})
