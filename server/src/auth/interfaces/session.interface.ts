import { Document } from 'mongoose'

export interface Session extends Document {
  id: string
  user: string
  refreshToken: string
  fingerprint: string
  ip: string
  created: string
}
