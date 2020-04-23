import { Schema } from 'mongoose'

export const SessionSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    refreshToken: String,
    fingerprint: String,
    ip: String,
  },
  {
    timestamps: { createdAt: 'created', updatedAt: 'updated' },
  },
)

SessionSchema.set('toJSON', {
  virtuals: true,
})
