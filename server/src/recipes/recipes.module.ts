import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { RecipesController } from './recipes.controller'
import { RecipesService } from './recipes.service'
import { RecipeSchema } from './schemas/recipe.schema'
import { UsersModule } from '../users/users.module'
import * as config from 'config'
import { UserSchema } from '../users/schemas/user.schema'

const jwtConfig = config.get('jwt')

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Recipe', schema: RecipeSchema }]),
    UsersModule,
  ],
  controllers: [RecipesController],
  providers: [RecipesService],
})
export class RecipesModule {}
