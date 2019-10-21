import { Module } from '@nestjs/common'
import { AppService } from './app.service'

import { RecipesModule } from './recipes/recipes.module'

import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'

import * as config from 'config'

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URL || config.get('db').url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }),
    RecipesModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
