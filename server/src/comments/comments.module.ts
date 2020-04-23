import { Module } from '@nestjs/common'
import { CommentsService } from './comments.service'
import { CommentsController } from './comments.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { CommentSchema } from './schemas/comment.schema'
import { AuthModule } from 'src/auth/auth.module'
import { UsersModule } from 'src/users/users.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Comment', schema: CommentSchema }]),
    AuthModule,
    UsersModule,
  ],
  providers: [CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
