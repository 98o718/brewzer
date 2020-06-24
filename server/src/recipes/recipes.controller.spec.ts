import { RecipesController } from './recipes.controller'
import { RecipesService } from './recipes.service'
import { Test } from '@nestjs/testing'

import { RecipesModule } from './recipes.module'
import { AppModule } from '../app.module'
import DbModule from '../db-test.module'
import { CreateRecipeDto } from './dto/create-recipe.dto'
import { Recipe } from './interfaces/recipe.interface'

describe('RecipesController', () => {
  let recipesController: RecipesController
  let recipesService: RecipesService
  let createdRecipe: Recipe

  const recipe = {
    ingredients: {
      yeast: { name: 'Fermentis - Сафэль US-05', weight: 27, temp: 18 },
      grains: [
        { name: 'Пэйл Эль Курский (Россия)', weight: 9 },
        { name: 'Овсяные хлопья', weight: 1.2 },
        { name: 'Пшеничный светлый Суффле (Россия)', weight: 3 },
      ],
      hops: [
        {
          name: 'Мандарина Бавария (Германия)',
          weight: 30,
          alpha: 8.5,
          time: 30,
        },
        {
          name: 'Мандарина Бавария (Германия)',
          weight: 30,
          alpha: 8,
          time: 10,
        },
        { name: 'Амарилло (США)', weight: 50, alpha: 9.2, time: 1 },
        {
          name: 'Мандарина Бавария (Германия)',
          weight: 40,
          alpha: 8.5,
          time: 0,
        },
      ],
      dryHops: [
        {
          name: 'Цитра (США)',
          weight: 50,
          when: 'Главное брожение',
          time: 5,
        },
        {
          name: 'Амарилло (США)',
          weight: 50,
          when: 'Вторичное брожение',
          time: 5,
        },
        {
          name: 'Цитра (США)',
          weight: 50,
          when: 'Вторичное брожение',
          time: 5,
        },
      ],
      others: [
        { name: 'Лактоза', weight: 800, when: 'В котел', time: 15 },
        { name: 'Манго', weight: 2200, when: 'Главное брожение' },
        { name: 'Ваниль', weight: 10, when: 'Карбонизация' },
        { name: 'Цедра апельсина', weight: 20, when: 'Карбонизация' },
      ],
    },
    recipeType: 'PUBLIC',
    pauses: [
      { temp: 52, time: 15 },
      { temp: 63, time: 60 },
      { temp: 72, time: 20 },
      { temp: 78, time: 5 },
    ],
    title: 'Взрывной манго-апельсиновый милкшейк',
    description:
      'Хочу получить ароматный, не горький милкшейк. Нашёл в продаже манговое пюре. Манго приобретается уже готовым пюре и добавляется на третий день после начала брожения. Цедра с 3-х апельсинов и ванилин, предварительно замоченные в ректификате, добавляются вместе с декстрозой при розливе по бутылкам.',
    details: '',
    style: 'ИПЭ Новой Англии (NE IPA)',
    mashWater: 38.3,
    flushingWater: 34.8,
    volume: 50,
    batchVolume: 58.6,
    abv: 6.24,
    ibu: 13,
    og: 14.9,
    fg: 3.8,
  } as CreateRecipeDto

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
        RecipesModule,
        AppModule,
      ],
    }).compile()

    recipesService = module.get<RecipesService>(RecipesService)

    recipesController = new RecipesController(recipesService)
  })

  describe('create', () => {
    it('should create a recipe', async () => {
      const result = await recipesController.create(recipe, user)

      createdRecipe = result

      expect(result).toBeTruthy()
    })
  })

  describe('findById', () => {
    it('should find recipes by id', async () => {
      const result = await recipesController.findById(createdRecipe.id, user)

      expect(result).toBeTruthy()
    })
  })

  describe('edit', () => {
    it('should edit recipes', async () => {
      const result = await recipesController.edit(createdRecipe.id, user, {
        ...recipe,
        title: 'test',
      })

      expect(result).toBeTruthy()
      expect(result.title).toBe('test')
      expect(result.id).toBe(createdRecipe.id)
    })
  })

  describe('delete', () => {
    it('should delete recipes', async () => {
      await recipesController.delete(createdRecipe.id, user)

      try {
        await recipesController.findById(createdRecipe.id, user)
        fail("Recipe wasn't deleted")
      } catch (error) {}
    })
  })
})
