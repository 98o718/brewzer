import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  UseInterceptors,
  Body,
  Res,
  Req,
  ValidationPipe,
  Ip,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiUseTags, ApiBearerAuth, ApiImplicitBody } from '@nestjs/swagger'

import { AuthService } from './auth.service'
import { UserCredentials } from './dto/user-credentials.dto'
import { GetUser } from './decorators/get-user.decorator'
import { User } from '../users/interfaces/user.interface'
import { SetCookieInterceptor } from './interceptors/set-cookie.interceptor'
import { RefreshTokenDto } from './dto/refresh-token.dto'
import { GetCookies } from './decorators/get-cookies.decorator'
import { UserInfo } from 'src/users/interfaces/user-info.interface'

@Controller('auth')
@ApiUseTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @ApiImplicitBody({
    name: 'User credentials',
    type: UserCredentials,
    required: true,
  })
  @UseInterceptors(SetCookieInterceptor)
  @Post('signin')
  async login(
    @GetUser() user: User,
    @Body('fingerprint') fingerpring: string,
    @Ip() ip: string,
    @Req() req,
  ) {
    return await this.authService.login(user, fingerpring, ip, req)
  }

  @ApiImplicitBody({
    name: 'Refresh token credentials',
    type: RefreshTokenDto,
    required: true,
  })
  @UseInterceptors(SetCookieInterceptor)
  @Post('refresh-token')
  async refreshToken(
    @Body(ValidationPipe) refreshTokenDto: RefreshTokenDto,
    @Ip() ip: string,
    @GetCookies() cookies: { [key: string]: any } | undefined,
    @Req() req,
  ) {
    return await this.authService.refreshToken(
      refreshTokenDto,
      ip,
      cookies,
      req,
    )
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get('sessions')
  async findSessions(@GetUser() user: UserInfo) {
    return await this.authService.findSessions(user)
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post('close-sessions')
  async closeSessions(@GetUser() user: UserInfo) {
    return await this.authService.closeSessions(user)
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get('me')
  getProfile() {
    return {}
  }
}
