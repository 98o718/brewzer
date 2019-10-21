import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { ApiUseTags, ApiBearerAuth, ApiImplicitBody } from '@nestjs/swagger'
import { UserCredentials } from './dto/user-credentials.dto'

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
  async login(@Request() req) {
    return await this.authService.login(req.user)
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get('me')
  getProfile(@Request() req) {
    return req.user
  }
}
