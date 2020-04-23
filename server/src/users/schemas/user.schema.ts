import * as mongoose from 'mongoose'
import { User } from '../interfaces/user.interface'
import { hash } from 'bcrypt'
import * as uniqueValidator from 'mongoose-unique-validator'
import * as cloudinary from 'cloudinary'
import * as config from 'config'

export const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    withPhoto: {
      type: Boolean,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    miniAvatar: {
      type: String,
    },
    avatarId: {
      type: String,
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe',
      },
    ],
  },
  { toJSON: { virtuals: true } },
)

UserSchema.plugin(uniqueValidator)

UserSchema.pre('save', async function(this: User) {
  if (this.isNew) {
    this.password = await hash(this.password, 10)
  }

  if (this.withPhoto) {
    const cloudinaryConfig = config.get('cloud')

    cloudinary.v2.config({
      cloud_name: cloudinaryConfig.cloudName,
      api_key: cloudinaryConfig.apiKey,
      api_secret: cloudinaryConfig.apiSecret,
    })

    this.miniAvatar = cloudinary.v2.url(this.avatarId, {
      height: 80,
    })
  } else {
    this.miniAvatar = this.avatar
  }
})

UserSchema.virtual('recipes', {
  ref: 'Recipe',
  localField: '_id',
  foreignField: 'userId',
  justOne: false,
})
