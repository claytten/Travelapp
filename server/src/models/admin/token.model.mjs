import mongoose from 'mongoose';
import { tokenTypes } from '../../config/token.mjs';

const tokenSchema = mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      index: true,
    },
    admin: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Admin',
      required: true,
    },
    type: {
      type: String,
      enum: [tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD],
      required: true,
    },
    expired: {
      type: Date,
      required: true,
    },
    blacklisted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('TokenAdmin', tokenSchema);
