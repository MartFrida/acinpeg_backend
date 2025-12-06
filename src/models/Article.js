import { Schema, model } from 'mongoose';

const articleSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, default: '' },

    // Правильное поле для связи с пользователем
    // authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },

    status: { type: String, enum: ['draft', 'submitted', 'reviewed'], default: 'draft' },
    version: { type: Number, default: 1 },
    tags: [{ type: String }],
    history: [
      {
        timestamp: { type: Date, default: Date.now },
        message: String
      }
    ]
  },
  { timestamps: true } // создаёт createdAt и updatedAt
);

export default model('Article', articleSchema);
