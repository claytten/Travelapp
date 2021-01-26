import httpStatus from 'http-status';
import { getAdminByEmail, verifyPassword } from './admin.service.mjs';
import ApiError from '../../../utils/ApiError.mjs';

/**
 * Login with email and password
 * @param {string} email
 * @param {string} password
 * @return {Promise<Admin>}
 */
export const loginAdmin = async (email, password) => {
  const admin = await getAdminByEmail(email);
  if (!admin || !(await verifyPassword(admin.password, password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  return admin;
};
