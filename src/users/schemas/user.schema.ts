import * as mongoose from 'mongoose'
import { User } from '../interfaces/user.interface'
import { hash } from 'bcrypt'

export const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
})

UserSchema.pre('save', async function(this: User) {
  this.password = await hash(this.password, 10)
})
