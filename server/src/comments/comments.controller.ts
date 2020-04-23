import {
  Controller,
  Get,
  UseGuards,
  Post,
  Body,
  ValidationPipe,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiUseTags, ApiOperation } from '@nestjs/swagger'
import { GetUser } from '../auth/decorators/get-user.decorator'
import { UserInfo } from '../users/interfaces/user-info.interface'
import { CommentsService } from './comments.service'
import { AddCommentDto } from './dto/add-comment.dto'
import { Comment } from './interfaces/comment.interface'

@Controller('comments')
@ApiUseTags('Comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ title: 'Add comment' })
  async add(
    @Body(ValidationPipe) addCommentDto: AddCommentDto,
    @GetUser() user: UserInfo,
  ): Promise<Comment> {
    return await this.commentsService.add(addCommentDto, user)
  }

  @Get('/:id/:page')
  @ApiOperation({ title: "Get all entity's comments" })
  async findById(@Param('id') id: string, @Param('page') page: number) {
    return await this.commentsService.findById(id, page)
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Delete()
  @ApiOperation({ title: 'Delete comment' })
  async delete(
    @GetUser() user: UserInfo,
    @Body('id') id: string,
  ): Promise<void> {
    await this.commentsService.delete(user, id)
  }
}
