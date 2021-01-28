import httpStatus from 'http-status';
import { getAdminById, getAdminByEmail, verifyPassword } from '../../admin/admin.service.mjs';
import ApiError from '../../../utils/ApiError.mjs';
import { AdminModel } from '../../../models/index.mjs';
import { tokenTypes } from '../../../config/token.mjs';
import { verifyToken, generateAuthAdminToken } from './token.admin.service.mjs';

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

/**
 * Logout
 * @params {string} refreshToken
 * @return {Promise}
 */
export const logout = async (refreshToken) => {
  const refreshTokenDoc = await AdminModel.tokenModel.findOne({
    token: refreshToken,
    type: tokenTypes.REFRESH,
    blacklisted: false,
  });
  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not Found');
  }
  await refreshTokenDoc.remove();
};

/**
 * RefreshToken
 * @param {string} refreshToken
 * @return {Promise}
 */
export const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await verifyToken(refreshToken, tokenTypes.REFRESH);
    const admin = await getAdminById(refreshTokenDoc.admin);
    if (!admin) {
      throw new Error();
    }
    await refreshTokenDoc.remove();
    return generateAuthAdminToken(admin);
  } catch (e) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please Authenticate');
  }
};
