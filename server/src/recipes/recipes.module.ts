import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { RecipesController } from './recipes.controller'
import { RecipesService } from './recipes.service'
import { RecipeSchema } from './schemas/recipe.schema'
import { UsersModule } from '../users/users.module'
import { JwtModule } from '@nestjs/jwt'
import * as config from 'config'

const jwtConfig = config.get('jwt')

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Recipe', schema: RecipeSchema }]),
    JwtModule.register({
      secret: jwtConfig.secret,
      signOptions: { expiresIn: jwtConfig.expiresIn },
    }),
    UsersModule,
  ],
  controllers: [RecipesController],
  providers: [RecipesService],
})
export class RecipesModule {}
