import { Model } from 'mongoose'
import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User } from './interfaces/user.interface'
import { CreateUserDto } from './dto/create-user.dto'
import { FilesService } from '../files/files.service'
import { MailerService } from '@nest-modules/mailer'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly filesService: FilesService,
    private readonly mailerService: MailerService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { avatar, username, password, email } = createUserDto
    const { secure_url } = await this.filesService.uploadAvatar(avatar[0])
    const createdUser = new this.userModel({
      email,
      username,
      password,
      avatar: secure_url,
    })
    try {
      const user = await createdUser.save()
      this.mailerService
        .sendMail({
          to: user.email, // sender address
          subject: 'Успешная регистрация!', // Subject line
          template: 'sign-up', // The `.pug` or `.hbs` extension is appended automatically.
          context: {
            // Data to be sent to template engine.
            email,
            password,
          },
        })
        .then(() => {})
        .catch(error => {
          console.log(error)
        })
      return user
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async find(username: string): Promise<User> {
    return await this.userModel.findOne({ username }).exec()
  }
}
