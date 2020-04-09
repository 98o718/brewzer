import { Module, Global } from '@nestjs/common'
import { JwtModule as Jwt } from '@nestjs/jwt'

import * as config from 'config'

const jwtConfig = config.get('jwt')

@Global()
@Module({
  imports: [
    Jwt.register({
      secret: jwtConfig.secret,
      signOptions: { expiresIn: jwtConfig.expiresIn },
    }),
  ],
  exports: [Jwt],
})
export class JwtModule {}
