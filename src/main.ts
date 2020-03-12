import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import * as fMultiPart from 'fastify-multipart'

async function bootstrap() {
  const fAdapt = new FastifyAdapter()
  fAdapt.register(fMultiPart, {
    addToBody: true,
    limits: {
      fileSize: 5000000,
    },
  })

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fAdapt,
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

  await app.listen(process.env.PORT || 3000)
}
bootstrap()
