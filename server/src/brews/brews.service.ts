import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Brew } from './interfaces/brew.interface'
import { Model } from 'mongoose'
import { UserInfo } from '../users/interfaces/user-info.interface'
import { CreateBrewDto } from './dto/create-brew.dto'

@Injectable()
export class BrewsService {
  constructor(@InjectModel('Brew') private readonly brew: Model<Brew>) {}

  async create(createBrewDto: CreateBrewDto, user: UserInfo): Promise<Brew> {
    return await new this.brew({ ...createBrewDto, userId: user.userId }).save()
  }

  async findAll(user: UserInfo): Promise<Brew[]> {
    return await this.brew.find({ userId: user.userId }).exec()
  }

  async findById(id: string, user: UserInfo): Promise<Brew> {
    const brew = await this.brew
      .findOne({ _id: id, userId: user.userId })
      .exec()

    if (brew) return brew

    throw new NotFoundException()
  }

  async edit(
    id: string,
    createBrewDto: CreateBrewDto,
    user: UserInfo,
  ): Promise<Brew> {
    const editable = await this.brew.findOneAndUpdate(
      { _id: id, userId: user.userId },
      createBrewDto,
      {
        new: true,
      },
    )

    if (!editable) {
      throw new NotFoundException('Nothing to edit')
    }

    return editable
  }

  async deleteById(id: string, user: UserInfo): Promise<void> {
    const result = await this.brew.findOneAndDelete({
      _id: id,
      userId: user.userId,
    })

    if (!result) {
      throw new NotFoundException(
        `Brew with id:"${id}" not found or you can't delete it`,
      )
    }
  }

  async deleteAll(user: UserInfo): Promise<void> {
    const result = await this.brew.deleteMany({
      userId: user.userId,
    })

    if (result.n === 0) {
      throw new NotFoundException(`Nothing to delete`)
    }
  }
}
