import { Injectable } from '@nestjs/common'
import * as cloudinary from 'cloudinary'
import * as Datauri from 'datauri'
import * as config from 'config'

@Injectable()
export class FilesService {
  async uploadAvatar(avatar): Promise<any> {
    const { data, filename } = avatar

    const cloudinaryConfig = config.get('cloud')

    cloudinary.v2.config({
      cloud_name: cloudinaryConfig.cloudName,
      api_key: cloudinaryConfig.apiKey,
      api_secret: cloudinaryConfig.apiSecret,
    })

    const { content } = new Datauri().format(filename, data)

    const result = await cloudinary.v2.uploader.upload(content, {
      folder: 'avatar',
    })

    return result
  }
}
