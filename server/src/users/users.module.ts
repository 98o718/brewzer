import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { UserSchema } from './schemas/user.schema'
import { CloudinaryService } from '../cloudinary/cloudinary.service'
import { CloudinaryModule } from '../cloudinary/cloudinary.module'
import { BcryptModule } from '../bcrypt/bcrypt.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    CloudinaryModule,
    BcryptModule,
  ],
  providers: [UsersService, CloudinaryService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
