import { adminModel } from '../../../models/admin/index.mjs';

/**
 * Get admin by id
 * @param {ObjectId} id
 * @return {Promise<Admin>}
 */
export const getAdminById = async (id) => {
  const adminId = await adminModel.findById(id);
  return adminId;
};

/**
 * Get admin by email
 * @param {string} email
 * @return {Promise<Admin>}
 */
export const getAdminByEmail = async (email) => {
  const dataModel = await adminModel.findOne({ email });
  return dataModel;
};

/**
 * Creating Admin Account
 * @param {object} adminBody
 * @return {Promise<Admin>}
 */
export const createAdmin = async (adminBody) => {
  if (await adminModel.isEmailTaken(adminBody.email)) {
    return;
  }
  const admin = await adminModel.create(adminBody);
  return admin;
};

/**
 * Verify password login
 * @param {string} recordPassword
 * @param {string} password
 * @return {Promise<boolean>}
 */
export const verifyPassword = async (recordPassword, password) => {
  const verifyPassword = await adminModel.isPasswordMatch(recordPassword, password);
  return verifyPassword;
};
