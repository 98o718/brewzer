import { Module } from '@nestjs/common'
import { AppService } from './app.service'

import { RecipesModule } from './recipes/recipes.module'

import { MongooseModule } from '@nestjs/mongoose'
import { MailerModule, PugAdapter } from '@nest-modules/mailer'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { BrewsModule } from './brews/brews.module'
import { JwtModule } from './jwt/jwt.module'
import { CommentsModule } from './comments/comments.module'
import { CloudinaryModule } from './cloudinary/cloudinary.module'
import { BcryptModule } from './bcrypt/bcrypt.module'

import * as config from 'config'

const smtpConfig = config.get('smtp')

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URL || config.get('db').url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }),
    MailerModule.forRoot({
      transport: {
        host: smtpConfig.host,
        port: smtpConfig.port,
        auth: {
          user: smtpConfig.user,
          pass: smtpConfig.pass,
        },
      },
      defaults: {
        from: `"${smtpConfig.name}" <${smtpConfig.mail}>`,
      },
      template: {
        dir: 'templates',
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    RecipesModule,
    AuthModule,
    UsersModule,
    BrewsModule,
    JwtModule,
    CommentsModule,
    CloudinaryModule,
    BcryptModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
