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
adminSchema.statics.isEmailTaken = async (email, excludedAdminId) => {
  const admin = await this.findOne({ email, _id: { $ne: excludedAdminId } });
  return !!admin;
};

/**
 * Check if password matches the admin account
 * @param {string} password
 * @returns {Promise<boolean>}
 */
adminSchema.methods.isPasswordMatch = async (password) => {
  const admin = this;
  const authorize = await argon2.verify(password, admin.password);
  return authorize;
};

adminSchema.pre('save', async (next) => {
  const admin = this;
  if (admin.isModified('password')) {
    const salt = randomBytes(32);
    admin.password = await argon2.hash(admin.password, { salt });
  }
  next();
});

export default mongoose.model('Admin', adminSchema);
