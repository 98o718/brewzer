import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  )

  const options = new DocumentBuilder()
    .setTitle('Brewzer API')
    .setDescription('Brewzer API documentation')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, options)

  if (process.env.NODE_ENV === 'development') {
    SwaggerModule.setup('docs', app, document)
  }

  await app.listen(3000)
}
bootstrap()
