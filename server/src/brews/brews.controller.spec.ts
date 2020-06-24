import { BrewsController } from './brews.controller'
import { BrewsService } from './brews.service'
import { Test } from '@nestjs/testing'

import { BrewsModule } from './brews.module'
import { AppModule } from '../app.module'
import DbModule from '../db-test.module'
import { CreateBrewDto } from './dto/create-brew.dto'
import { Brew } from './interfaces/brew.interface'

describe('BrewsController', () => {
  let brewsController: BrewsController
  let brewsService: BrewsService
  let createdBrew: Brew

  const brew = {
    recipe: '5ea440c83dce1f6ab16efc0e',
    title: 'Каскад цветочно-ванильный',
    comment: '',
    brewDate: new Date('2020-06-05T18:15:00.000Z'),
  } as CreateBrewDto

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
        BrewsModule,
        AppModule,
      ],
    }).compile()

    brewsService = module.get<BrewsService>(BrewsService)

    brewsController = new BrewsController(brewsService)
  })

  describe('create', () => {
    it('should create a brew', async () => {
      const result = await brewsController.create(brew, user)

      createdBrew = result

      expect(result).toBeTruthy()
    })
  })

  describe('findById', () => {
    it('should find brews by id', async () => {
      const result = await brewsController.findById(createdBrew.id, user)

      expect(result).toBeTruthy()
    })
  })

  describe('edit', () => {
    it('should edit brews', async () => {
      const result = await brewsController.edit(
        createdBrew.id,
        {
          ...brew,
          title: 'test',
        },
        user,
      )

      expect(result).toBeTruthy()
      expect(result.title).toBe('test')
      expect(result.id).toBe(createdBrew.id)
    })
  })

  describe('delete', () => {
    it('should delete brews', async () => {
      await brewsController.deleteById(createdBrew.id, user)

      try {
        await brewsController.findById(createdBrew.id, user)
        fail("Brew wasn't deleted")
      } catch (error) {}
    })
  })
})
