import {
  Controller,
  Get,
  Post,
  UseGuards,
  Body,
  ValidationPipe,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiUseTags, ApiBearerAuth, ApiImplicitBody } from '@nestjs/swagger'

import { AuthService } from './auth.service'
import { UserCredentials } from './dto/user-credentials.dto'
import { GetUser } from './decorators/get-user.decorator'
import { User } from '../users/interfaces/user.interface'
import { RefreshTokenDto } from './dto/refresh-token.dto'
import { UserInfo } from 'src/users/interfaces/user-info.interface'
import { GetIp } from './decorators/get-ip.decorator'

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
  @Post('signin')
  async login(
    @GetUser() user: User,
    @Body('fingerprint') fingerpring: string,
    @GetIp() ip: string,
  ) {
    return await this.authService.login(user, fingerpring, ip)
  }

  @ApiImplicitBody({
    name: 'Refresh token credentials',
    type: RefreshTokenDto,
    required: true,
  })
  @Post('refresh-token')
  async refreshToken(
    @Body(ValidationPipe) refreshTokenDto: RefreshTokenDto,
    @GetIp() ip: string,
  ) {
    return await this.authService.refreshToken(refreshTokenDto, ip)
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
