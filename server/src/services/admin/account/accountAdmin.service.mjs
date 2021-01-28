import httpStatus from 'http-status';
import ApiError from '../../../utils/ApiError.mjs';
import { getAdminById, verifyPassword } from '../admin.service.mjs';

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
