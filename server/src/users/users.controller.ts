import { Controller, Get, Post, Body, ValidationPipe } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UsersService } from './users.service'
import { User } from './interfaces/user.interface'
import { ApiUseTags } from '@nestjs/swagger'
import { ForgetPasswordDto } from './dto/forget-password.dto'
import { ResetPasswordDto } from './dto/reset-password.dto'

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('auth/signup')
  @ApiUseTags('Auth')
  async create(
    @Body(
      new ValidationPipe({
        disableErrorMessages: true,
      }),
    )
    createUserDto: CreateUserDto,
  ): Promise<User> {
    return await this.usersService.create(createUserDto)
  }

  @Post('auth/forget')
  @ApiUseTags('Auth')
  async forget(
    @Body(
      new ValidationPipe({
        disableErrorMessages: true,
      }),
    )
    forgetPasswordDto: ForgetPasswordDto,
  ) {
    return await this.usersService.forget(forgetPasswordDto)
  }

  @Post('auth/reset')
  @ApiUseTags('Auth')
  async reset(
    @Body(
      new ValidationPipe({
        disableErrorMessages: true,
      }),
    )
    resetPasswordDto: ResetPasswordDto,
  ) {
    return await this.usersService.reset(resetPasswordDto)
  }
}
