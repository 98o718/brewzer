import { Model } from 'mongoose'
import { Injectable, HttpException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User } from './interfaces/user.interface'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto)
    try {
      return await createdUser.save()
    } catch (error) {
      if (error.code === 11000) {
        throw new HttpException(`User with same username is already exist`, 200)
      }
      throw new HttpException(error.message, 500)
    }
  }

  async find(username: string): Promise<User> {
    return await this.userModel.findOne({ username }).exec()
  }
}
