import httpStatus from 'http-status';
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
 * @return {Promise}
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
