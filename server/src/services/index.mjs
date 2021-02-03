import { loginAdmin, refreshAuth, logout } from './auth/admin/auth.admin.service.mjs';
import { getAdminById, createAdmin } from './admin/admin.service.mjs';
import { generateToken, generateAuthAdminToken } from './auth/admin/token.admin.service.mjs';
import { updateProfile, resetPass, saveImage } from './admin/account/accountAdmin.service.mjs';
import { getMaps, storingMap, updatingMap, singleDestroy } from './admin/maps/map.service.mjs';

export {
  loginAdmin,
  refreshAuth,
  logout,
  getAdminById,
  generateToken,
  generateAuthAdminToken,
  createAdmin,
  updateProfile,
  resetPass,
  saveImage,
  getMaps,
  storingMap,
  updatingMap,
  singleDestroy,
};
