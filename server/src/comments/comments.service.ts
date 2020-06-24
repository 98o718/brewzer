import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { PaginateModel, PaginateResult } from 'mongoose'
import { UserInfo } from '../users/interfaces/user-info.interface'
import { Comment } from './interfaces/comment.interface'
import { AddCommentDto } from './dto/add-comment.dto'
import { UsersService } from '../users/users.service'

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel('Comment') private readonly comment: PaginateModel<Comment>,
    private readonly usersService: UsersService,
  ) {}

  async add(addCommentDto: AddCommentDto, user: UserInfo): Promise<Comment> {
    return await new this.comment({
      ...addCommentDto,
      user: user.userId,
    }).save()
  }

  async findById(id: string, page: number): Promise<PaginateResult<Comment>> {
    return await this.comment.paginate(
      { entity: id },
      {
        page,
        limit: 10,
        populate: {
          path: 'user',
          select: 'username withPhoto miniAvatar',
        },
      },
    )
  }

  async delete(user: UserInfo, id: string): Promise<void> {
    const result = await this.comment.findById(id)

    if (!result) {
      throw new NotFoundException(
        `Comment with id:"${id}" not found or you can't delete it`,
      )
    }

    if (`${result.user}` === `${user.userId}`) {
      await result.remove()
    } else {
      const isAuthor = await this.usersService.isAuthor(
        result.entity,
        user.userId,
      )

      if (isAuthor) {
        await result.remove()
      } else {
        throw new NotFoundException(
          `Comment with id:"${id}" not found or you can't delete it`,
        )
      }
    }
  }
}
