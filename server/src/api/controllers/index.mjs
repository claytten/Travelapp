import { login, refreshTokens, logout, register } from './auth/admin.auth.controller.mjs';
import { profileLogin, updateProfile, resetPassword, uploadPhoto } from './admin/account.controller.mjs';

export const adminController = {
  login,
  register,
  refreshTokens,
  logout,
  profileLogin,
  updateProfile,
  resetPassword,
  uploadPhoto,
};
