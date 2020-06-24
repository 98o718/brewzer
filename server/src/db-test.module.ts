import { MongooseModule } from '@nestjs/mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

const mongod = new MongoMemoryServer()

export default (customOpts: any = {}) =>
  MongooseModule.forRootAsync({
    useFactory: async () => {
      const uri = await mongod.getUri()

      return {
        uri,
        ...customOpts,
      }
    },
  })
