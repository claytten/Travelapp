import { login, register, logout, refreshToken } from './auth.admin.validation.mjs';
import { updateProfile, resetPassword } from './accountAdmin.validation.mjs';
import { createMap, updateMap } from './mapAdmin.validation.mjs';

export const adminValidation = {
  login,
  register,
  logout,
  refreshToken,
  updateProfile,
  resetPassword,
  createMap,
  updateMap,
};
