import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { ApiUseTags, ApiBearerAuth, ApiImplicitBody } from '@nestjs/swagger'
import { CreateUserDto } from '../users/dto/create-user.dto'

@Controller('auth')
@ApiUseTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @ApiImplicitBody({
    name: 'User credentials',
    type: CreateUserDto,
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
