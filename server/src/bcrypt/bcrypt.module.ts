import { Module } from '@nestjs/common'
import { bcryptProvider } from './bcrypt.provider'

@Module({
  providers: [bcryptProvider],
  exports: [bcryptProvider],
})
export class BcryptModule {}
