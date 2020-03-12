import * as mongoose from 'mongoose'
import { User } from '../interfaces/user.interface'
import { hash } from 'bcrypt'
import * as uniqueValidator from 'mongoose-unique-validator'

export const UserSchema = new mongoose.Schema({
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
})

UserSchema.plugin(uniqueValidator)

UserSchema.pre('save', async function(this: User) {
  this.password = await hash(this.password, 10)
})
