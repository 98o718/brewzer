import {
  Controller,
  Get,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Patch,
} from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UsersService } from './users.service'
import { User } from './interfaces/user.interface'
import { ApiUseTags } from '@nestjs/swagger'
import { ForgetPasswordDto } from './dto/forget-password.dto'
import { ResetPasswordDto } from './dto/reset-password.dto'
import { AuthInterceptor } from 'src/auth/interceptors/auth.interceptor'
import { AuthGuard } from '@nestjs/passport'
import { GetUser } from 'src/auth/decorators/get-user.decorator'
import { UserInfo } from './interfaces/user-info.interface'
import { UploadAvatarDto } from './dto/upload-avatar.dto'
import { ChangePasswordDto } from './dto/change-password.dto'

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
    @Body(ValidationPipe)
    forgetPasswordDto: ForgetPasswordDto,
  ) {
    return await this.usersService.forget(forgetPasswordDto)
  }

  @Post('auth/reset')
  @ApiUseTags('Auth')
  async reset(
    @Body(ValidationPipe)
    resetPasswordDto: ResetPasswordDto,
  ) {
    return await this.usersService.reset(resetPasswordDto)
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('users/change-avatar')
  @ApiUseTags('Users')
  async changeAvatar(
    @GetUser() user: UserInfo,
    @Body(ValidationPipe)
    uploadAvatarDto: UploadAvatarDto,
  ) {
    return await this.usersService.changeAvatar(user, uploadAvatarDto)
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('users/change-password')
  @ApiUseTags('Users')
  async changePassword(
    @GetUser() user: UserInfo,
    @Body(ValidationPipe)
    changePasswordDto: ChangePasswordDto,
  ) {
    return await this.usersService.changePassword(user, changePasswordDto)
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('users/add-to-favorites')
  @ApiUseTags('Users')
  async addToFavorites(
    @GetUser() user: UserInfo,
    @Body('id')
    id: string,
  ) {
    return await this.usersService.addToFavorites(user, id)
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('users/remove-from-favorites')
  @ApiUseTags('Users')
  async removeFromFavorites(
    @GetUser() user: UserInfo,
    @Body('id')
    id: string,
  ) {
    return await this.usersService.removeFromFavorites(user, id)
  }
}
