import { Model } from 'mongoose'
import { Injectable, BadRequestException, Inject } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { User } from './interfaces/user.interface'
import { CreateUserDto } from './dto/create-user.dto'
import { MailerService } from '@nest-modules/mailer'
import { ForgetPasswordDto } from './dto/forget-password.dto'
import * as jwt from 'jsonwebtoken'
import { ResetPasswordDto } from './dto/reset-password.dto'
import { CloudinaryService } from '../cloudinary/cloudinary.service'
import { UserInfo } from './interfaces/user-info.interface'
import { UploadAvatarDto } from './dto/upload-avatar.dto'
import { Bcrypt } from '../bcrypt/bcrypt.provider'
import { ChangePasswordDto } from './dto/change-password.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly cloudinary: CloudinaryService,
    private readonly mailerService: MailerService,
    @Inject(Bcrypt) private bcrypt,
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
        const { secure_url, public_id } = await this.cloudinary.uploadAvatar(
          avatar[0],
        )
        createdUser.avatarId = public_id
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

  async isExist(username: string) {
    const user = await this.userModel.findOne({ username }).exec()

    return !!user
  }

  async isAuthor(recipeId: string, id: string): Promise<boolean> {
    const user = await this.userModel
      .findById(id)
      .populate('recipes', '_id')
      .exec()

    if (!user) return false

    for (let recipe of user.recipes) {
      if (`${recipe._id}` === `${recipeId}`) return true
    }

    return false
  }

  async addToFavorites({ userId }: UserInfo, id: string) {
    const user = await this.userModel.findById(userId).exec()

    if (!user) throw new BadRequestException()

    user.favorites = Array.from(new Set(user.favorites.concat([id])))

    await user.save()
  }

  async removeFromFavorites({ userId }: UserInfo, id: string) {
    const user = await this.userModel.findById(userId).exec()

    if (!user) throw new BadRequestException()

    user.favorites = user.favorites.filter(favorite => `${favorite}` !== id)

    await user.save()
  }

  async getFavoritesList(id: string) {
    const user = await this.userModel.findById(id).exec()

    if (user) {
      return user.favorites
    } else {
      return null
    }
  }

  async changeAvatar({ username }: UserInfo, { avatar }: UploadAvatarDto) {
    const user = await this.userModel.findOne({ username }).exec()

    if (!user) throw new BadRequestException()

    const oldAvatar = user.withPhoto && user.avatarId ? user.avatarId : null

    if (avatar !== undefined) {
      const { secure_url, public_id } = await this.cloudinary.uploadAvatar(
        avatar[0],
      )
      user.avatarId = public_id
      user.avatar = secure_url
      user.withPhoto = true
    } else {
      user.avatarId = undefined
      user.avatar = user.username
      user.withPhoto = false
    }

    if (oldAvatar !== null) {
      await this.cloudinary.deleteAvatar(oldAvatar)
    }

    await user.save()

    return {
      username: user.username,
      fullAvatar: user.avatar,
      avatar: user.miniAvatar,
      sub: user.id,
    }
  }

  async changePassword(
    { username }: UserInfo,
    { password, newPassword }: ChangePasswordDto,
  ) {
    const user = await this.userModel.findOne({ username }).exec()

    if (!user) throw new BadRequestException()

    const isCorrectPass = await this.bcrypt.compare(password, user.password)

    if (!isCorrectPass) throw new BadRequestException()

    user.password = await this.bcrypt.hash(newPassword, 10)

    await user.save()
  }

  async forget(forgetPasswordDto: ForgetPasswordDto) {
    const { email } = forgetPasswordDto

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
      throw new BadRequestException()
    }
  }

  async reset(resetPasswordDto: ResetPasswordDto) {
    const { username, password, token } = resetPasswordDto

    const user = await this.find(username)

    if (user) {
      jwt.verify(token, user.password)

      user.password = await this.bcrypt.hash(password, 10)

      await user.save()

      await this.mailerService.sendMail({
        to: user.email, // sender address
        subject: 'Восстановление доступа!', // Subject line
        template: 'reset', // The `.pug` or `.hbs` extension is appended automatically.
      })

      return
    } else {
      throw new BadRequestException()
    }
  }

  async find(username: string): Promise<User> {
    return await this.userModel.findOne({ username }).exec()
  }
}
