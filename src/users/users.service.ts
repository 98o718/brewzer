import { Model } from 'mongoose'
import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User } from './interfaces/user.interface'
import { CreateUserDto } from './dto/create-user.dto'
import { FilesService } from '../files/files.service'
import { MailerService } from '@nest-modules/mailer'
import { ForgetPasswordDto } from './dto/forget-password.dto'
import * as jwt from 'jsonwebtoken'
import { ResetPasswordDto } from './dto/reset-password.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly filesService: FilesService,
    private readonly mailerService: MailerService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { avatar, username, password, email } = createUserDto
    try {
      const createdUser = new this.userModel({
        email,
        username,
        password,
        avatar: username.substring(0, 10),
        withPhoto: false,
      })
      await createdUser.validate()

      if (avatar) {
        const { secure_url } = await this.filesService.uploadAvatar(avatar[0])
        createdUser.avatar = secure_url
        createdUser.withPhoto = true
      }

      const user = await createdUser.save()

      await this.mailerService.sendMail({
        to: user.email, // sender address
        subject: 'Успешная регистрация!', // Subject line
        template: 'sign-up', // The `.pug` or `.hbs` extension is appended automatically.
        context: {
          // Data to be sent to template engine.
          username,
          password,
        },
      })
      return user
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async forget(forgetPasswordDto: ForgetPasswordDto) {
    const { email } = forgetPasswordDto
    try {
      const user = await this.userModel.findOne({ email }).exec()

      if (user) {
        const token = jwt.sign({ email }, user.password, { expiresIn: 3600 })

        await this.mailerService.sendMail({
          to: email, // sender address
          subject: 'Восстановление доступа!', // Subject line
          template: 'forget', // The `.pug` or `.hbs` extension is appended automatically.
          context: {
            // Data to be sent to template engine.
            username: user.username,
            token,
          },
        })
      } else {
        throw new Error()
      }
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async reset(resetPasswordDto: ResetPasswordDto) {
    try {
      const { username, password, token } = resetPasswordDto

      const user = await this.find(username)

      if (user) {
        jwt.verify(token, user.password)

        user.password = password

        await user.save()

        await this.mailerService.sendMail({
          to: user.email, // sender address
          subject: 'Восстановление доступа!', // Subject line
          template: 'reset', // The `.pug` or `.hbs` extension is appended automatically.
        })

        return
      } else {
        throw new Error()
      }
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async find(username: string): Promise<User> {
    return await this.userModel.findOne({ username }).exec()
  }
}
