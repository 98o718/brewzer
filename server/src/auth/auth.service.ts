import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcrypt'

import * as cloudinary from 'cloudinary'
import * as config from 'config'
import { User } from './interfaces/user.interface'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.usersService.find(username)
    if (user) {
      const isCorrectPass = await compare(password, user.password)

      if (isCorrectPass)
        return {
          id: user.id,
          username: user.username,
          avatar: user.avatar,
          withPhoto: user.withPhoto,
        }
    }
    return null
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id }

    if (user.withPhoto) {
      const cloudinaryConfig = config.get('cloud')

      cloudinary.v2.config({
        cloud_name: cloudinaryConfig.cloudName,
        api_key: cloudinaryConfig.apiKey,
        api_secret: cloudinaryConfig.apiSecret,
      })

      const avatar = await cloudinary.v2.url(
        user.avatar.split('upload/').pop(),
        {
          height: 80,
        },
      )

      return {
        avatar,
        sub: user.id,
        access_token: this.jwtService.sign(payload),
      }
    }

    return {
      avatar: user.avatar,
      sub: user.id,
      access_token: this.jwtService.sign(payload),
    }
  }
}
