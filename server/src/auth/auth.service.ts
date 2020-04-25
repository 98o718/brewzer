import { Injectable, UnauthorizedException, Inject } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import * as config from 'config'

import { UsersService } from '../users/users.service'
import { User } from '../users/interfaces/user.interface'
import { Session } from './interfaces/session.interface'
import { RefreshTokenDto } from './dto/refresh-token.dto'
import { Bcrypt } from '../bcrypt/bcrypt.provider'
import { UserInfo } from '../users/interfaces/user-info.interface'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @InjectModel('Session') private readonly session: Model<Session>,
    @Inject(Bcrypt) private bcrypt,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.usersService.find(username)
    if (user) {
      const isCorrectPass = await this.bcrypt.compare(password, user.password)

      if (isCorrectPass) return user
    }
    return null
  }

  async login(user: User, fingerprint: string, ip: string, req: any) {
    const payload = { username: user.username, sub: user.id }

    const session = await this.session
      .findOne({
        user: user.id,
        fingerprint,
      })
      .exec()

    const accessToken = await this.jwtService.signAsync(payload)
    const refreshToken = await this.jwtService.signAsync(
      {
        accessToken,
        ...payload,
      },
      {
        expiresIn: config.get('jwt').expiresInRefresh,
      },
    )

    if (session) {
      session.refreshToken = refreshToken
      session.ip = ip
      await session.save()
    } else {
      const count = await this.session.countDocuments({ user: user.id }).exec()

      if (count === config.get('session').count) {
        await this.session.deleteMany({ user: user.id }).exec()
      }

      await new this.session({
        user: user.id,
        refreshToken,
        fingerprint,
        ip,
      }).save()
    }

    req._cookies = [
      {
        name: 'refreshToken',
        value: refreshToken,
        options: {
          path: '/',
          maxAge: config.get('jwt').expiresInRefresh,
          httpOnly: true,
          secure: true,
        },
      },
      {
        name: 'accessToken',
        value: `Bearer ${accessToken}`,
        options: {
          path: '/',
          secure: true,
        },
      },
    ]

    return {
      username: user.username,
      fullAvatar: user.avatar,
      avatar: user.miniAvatar,
      sub: user.id,
    }
  }

  async refreshToken(
    refreshTokenDto: RefreshTokenDto,
    ip: string,
    cookies: { [key: string]: any } | undefined,
    req: any,
  ) {
    if (cookies === undefined) {
      throw new UnauthorizedException('Invalid refresh token / fingerprint')
    }

    const { refreshToken } = cookies

    if (!refreshToken) {
      throw new UnauthorizedException('Invalid refresh token / fingerprint')
    }

    let decodedToken: { [key: string]: any }

    try {
      decodedToken = await this.jwtService.verifyAsync(refreshToken)
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token / fingerprint')
    }

    const session = await this.session
      .findOneAndDelete({
        refreshToken,
        fingerprint: refreshTokenDto.fingerprint,
      })
      .exec()

    if (!session) {
      throw new UnauthorizedException('Invalid refresh token / fingerprint')
    }

    const { username, sub } = decodedToken

    const payload = { username, sub }

    const accessToken = await this.jwtService.signAsync(payload)
    const newRefreshToken = await this.jwtService.signAsync(
      {
        accessToken,
        ...payload,
      },
      {
        expiresIn: config.get('jwt').expiresInRefresh,
      },
    )

    await new this.session({
      user: sub,
      refreshToken: newRefreshToken,
      fingerprint: refreshTokenDto.fingerprint,
      ip,
    }).save()

    req._cookies = [
      {
        name: 'refreshToken',
        value: newRefreshToken,
        options: {
          path: '/',
          maxAge: config.get('jwt').expiresInRefresh,
          httpOnly: true,
          secure: true,
        },
      },
      {
        name: 'accessToken',
        value: `Bearer ${accessToken}`,
        options: {
          path: '/',
          secure: true,
        },
      },
    ]

    return {
      accessToken,
    }
  }

  async findSessions({ userId }: UserInfo) {
    const sessions = await this.session
      .find({ user: userId })
      .select('id ip updated')

    return sessions
  }

  async closeSessions({ userId }: UserInfo) {
    await this.session.deleteMany({ user: userId })
  }
}
