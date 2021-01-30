import mongoose from 'mongoose';
import validator from 'validator';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';

const adminSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid Email');
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 0,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      },
      private: true,
    },
    salt: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
      default: null,
    },
    role: {
      type: String,
      default: 'admin',
    },
  },
  { timestamps: true },
);

/**
 * Check if email is taken
 * @param {string} email - Admin Email
 * @param {ObjectId} {excluderAdminId} - id of the admin account to be excluded
 * @return {Promise<boolean>}
 */
adminSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const admin = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!admin;
};

/**
 * Check if password matches the admin account
 * @param {string} recordPassword
 * @param {string} password
 * @returns {Promise<boolean>}
 */
adminSchema.statics.isPasswordMatch = async function (recordPassword, password) {
  const authorize = await argon2.verify(recordPassword, password);
  return authorize;
};

adminSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = randomBytes(32);
    this.password = await argon2.hash(this.password, { salt });
  }
  next();
});

export default mongoose.model('Admin', adminSchema);
