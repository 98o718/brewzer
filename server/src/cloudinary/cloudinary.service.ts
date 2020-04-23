import { Injectable, Inject } from '@nestjs/common'
import { Cloudinary } from './cloudinary.provider'
import * as Datauri from 'datauri'
import * as config from 'config'
import { response } from 'express'

@Injectable()
export class CloudinaryService {
  constructor(@Inject(Cloudinary) private cloudinary) {
    const cloudinaryConfig = config.get('cloud')

    this.cloudinary.v2.config({
      cloud_name: cloudinaryConfig.cloudName,
      api_key: cloudinaryConfig.apiKey,
      api_secret: cloudinaryConfig.apiSecret,
    })
  }

  async uploadAvatar(avatar): Promise<any> {
    const { data, filename } = avatar

    const { content } = new Datauri().format(filename, data)

    const result = await this.cloudinary.v2.uploader.upload(content, {
      folder: 'avatar',
    })

    return result
  }

  async deleteAvatar(publicId: string) {
    const result = await this.cloudinary.v2.api.delete_resources([publicId])

    return result
  }
}
