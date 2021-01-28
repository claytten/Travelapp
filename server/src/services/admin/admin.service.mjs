import { AdminModel } from '../../models/admin/index.mjs';

/**
 * Get admin by id
 * @param {ObjectId} id
 * @return {Promise<Admin>}
 */
export const getAdminById = async (id) => {
  const adminId = await AdminModel.adminModel.findById(id);
  return adminId;
};

/**
 * Get admin by email
 * @param {string} email
 * @return {Promise<Admin>}
 */
export const getAdminByEmail = async (email) => {
  const dataModel = await AdminModel.adminModel.findOne({ email });
  return dataModel;
};

/**
 * Creating Admin Account
 * @param {object} adminBody
 * @return {Promise<Admin>}
 */
export const createAdmin = async (adminBody) => {
  if (await AdminModel.adminModel.isEmailTaken(adminBody.email)) {
    return;
  }
  const admin = await AdminModel.adminModel.create(adminBody);
  return admin;
};

/**
 * Verify password login
 * @param {string} recordPassword
 * @param {string} password
 * @return {Promise<boolean>}
 */
export const verifyPassword = async (recordPassword, password) => {
  const verifyPassword = await AdminModel.adminModel.isPasswordMatch(recordPassword, password);
  return verifyPassword;
};
