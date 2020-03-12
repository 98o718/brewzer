import { Module } from '@nestjs/common'
import { BrewsService } from './brews.service'
import { BrewsController } from './brews.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { BrewSchema } from './schemas/brew.schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Brew', schema: BrewSchema }])],
  providers: [BrewsService],
  controllers: [BrewsController],
})
export class BrewsModule {}
