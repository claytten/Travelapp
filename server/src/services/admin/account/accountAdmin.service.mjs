import httpStatus from 'http-status';
import { unlinkSync } from 'fs';
import { resolve, join } from 'path';
import ApiError from '../../../utils/ApiError.mjs';
import { getAdminById, verifyPassword } from '../admin.service.mjs';
import { AdminModel } from '../../../models/index.mjs';

/**
 * Update Profile
 * @param {string} adminId
 * @param {object} data
 * @return {Promise<Object>}
 */
export const updateProfile = async (adminId, data) => {
  const { name, email, confirmationPassword } = data;
  const admin = await getAdminById(adminId);
  if (!admin) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin Not Found');
  }
  if (!(await verifyPassword(admin.password, confirmationPassword))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect your confirmation password');
  }
  Object.assign(admin, {
    name,
    email,
    password: confirmationPassword,
  });
  await admin.save();
  return admin;
};

/**
 * Reset Password
 * @param {string} adminId
 * @param {object} data (oldPassword, newPassword)
 * @return {Promise<object>}
 */
export const resetPass = async (adminId, data) => {
  const { oldPassword, newPassword } = data;
  const admin = await getAdminById(adminId);
  if (!admin) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin Not Found');
  }
  if (!(await verifyPassword(admin.password, oldPassword))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password not match!');
  }
  Object.assign(admin, { password: newPassword });
  await AdminModel.tokenModel.deleteMany({ admin: admin.id });
  await admin.save();
  return admin;
};

/**
 * Updating avatar
 * @param {string} adminId
 * @param {stirng} pathFile
 * @return {Promise<object>}
 */
export const saveImage = async (adminId, pathFile) => {
  const admin = await getAdminById(adminId);
  if (!admin) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin Not Found');
  }
  if (admin.image !== null) {
    unlinkSync(join(resolve(), admin.image));
  }

  Object.assign(admin, {
    image: pathFile,
  });
  await admin.save();
  return admin;
};
