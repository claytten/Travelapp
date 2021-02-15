import { loginAdmin, refreshAuth, logout } from './auth/admin/auth.admin.service.mjs';
import { getAdminById, createAdmin, getMapById } from './admin/admin.service.mjs';
import { generateToken, generateAuthAdminToken, saveToken } from './auth/admin/token.admin.service.mjs';
import { updateProfile, resetPass, saveAccountImage } from './admin/account/accountAdmin.service.mjs';
import { getMaps, saveMapImage, storingMap, updatingMap, singleDestroy } from './admin/maps/map.service.mjs';

export {
  loginAdmin,
  refreshAuth,
  logout,
  getAdminById,
  saveToken,
  generateToken,
  generateAuthAdminToken,
  createAdmin,
  getMapById,
  updateProfile,
  resetPass,
  saveAccountImage,
  getMaps,
  saveMapImage,
  storingMap,
  updatingMap,
  singleDestroy,
};
