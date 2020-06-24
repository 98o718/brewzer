import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { Test } from '@nestjs/testing'

import { UsersModule } from './users.module'
import { AppModule } from '../app.module'
import DbModule from '../db-test.module'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './interfaces/user.interface'

describe('UsersController', () => {
  let usersController: UsersController
  let usersService: UsersService
  let createdUser: User

  const user = {
    email: 'test@test.ru',
    username: '98o718',
    password: 'testtest',
  } as CreateUserDto

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        DbModule({
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          useFindAndModify: false,
        }),
        UsersModule,
        AppModule,
      ],
    }).compile()

    usersService = module.get<UsersService>(UsersService)
    usersController = new UsersController(usersService)
  })

  describe('create', () => {
    it('should create an user', async () => {
      const result = await usersController.create(user)

      createdUser = result

      expect(result).toBeTruthy()
    })
  })

  describe('find', () => {
    it('should find user by name', async () => {
      const result = await usersService.find(createdUser.username)

      expect(result).toBeTruthy()
    })
  })
})
