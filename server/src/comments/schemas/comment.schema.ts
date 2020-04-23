import { Schema } from 'mongoose'

export const CommentSchema = new Schema(
  {
    entity: Schema.Types.ObjectId,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    text: String,
  },
  {
    timestamps: { createdAt: 'created', updatedAt: false },
  },
)

CommentSchema.set('toJSON', {
  virtuals: true,
})

CommentSchema.plugin(require('mongoose-paginate-v2'))
