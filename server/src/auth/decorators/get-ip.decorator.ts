import { createParamDecorator } from '@nestjs/common'
import * as requestIp from 'request-ip'

export const GetIp = createParamDecorator((data, req) => {
  return requestIp.getClientIp(req)
})
