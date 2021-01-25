import { getAdminByEmail, verifyPassword } from './admin.service.mjs';
import logger from '../../../config/logger.mjs';

/**
 * Login with email and password
 * @param {string} email
 * @param {string} password
 * @return {Promise<Admin>}
 */
export const loginAdmin = async (email, password) => {
  const admin = await getAdminByEmail(email);
  if (!admin || !(await verifyPassword(admin.password, password))) {
    logger.debug('Not Found %o', { email, password });
    return;
  }
  return admin;
};
