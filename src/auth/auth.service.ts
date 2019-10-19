import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<{ id: string; username: string } | null> {
    const user = await this.usersService.find(username)
    if (user) {
      const isCorrectPass = await compare(password, user.password)

      if (isCorrectPass) return { id: user.id, username: user.username }
    }
    return null
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
