import { CommentsController } from './comments.controller'
import { CommentsService } from './comments.service'
import { Test } from '@nestjs/testing'

import { CommentsModule } from './comments.module'
import { AppModule } from '../app.module'
import DbModule from '../db-test.module'
import { AddCommentDto } from './dto/add-comment.dto'
import { Comment } from './interfaces/comment.interface'

describe('CommentsController', () => {
  let commentsController: CommentsController
  let commentsService: CommentsService
  let createdComment: Comment

  const comment = {
    entity: '5ea440c83dce1f6ab16efc0e',
    text: 'Каскад цветочно-ванильный',
  } as AddCommentDto

  const user = {
    userId: '5ea457aa3dce1f6ab16efcca',
    username: '98o718',
  }

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        DbModule({
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          useFindAndModify: false,
        }),
        CommentsModule,
        AppModule,
      ],
    }).compile()

    commentsService = module.get<CommentsService>(CommentsService)

    commentsController = new CommentsController(commentsService)
  })

  describe('add', () => {
    it('should add a comment', async () => {
      const result = await commentsController.add(comment, user)

      createdComment = result

      expect(result).toBeTruthy()
    })
  })

  describe('findById', () => {
    it('should find comments by id', async () => {
      const result = await commentsController.findById(createdComment.id, 1)

      expect(result).toBeTruthy()
    })
  })

  describe('delete', () => {
    it('should delete comments', async () => {
      await commentsController.delete(user, createdComment.id)

      const result = await commentsController.findById(createdComment.id, 1)

      expect(result.totalDocs).toBe(0)
    })
  })
})
