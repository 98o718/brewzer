import { Controller, Get, Post, Body, ValidationPipe } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UsersService } from './users.service'
import { User } from './interfaces/user.interface'
import { ApiUseTags } from '@nestjs/swagger'

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
}
