import { login, refreshTokens, logout } from './auth/admin.auth.controller.mjs';
import { profileLogin, updateProfile, resetPassword, uploadPhoto } from './admin/account.controller.mjs';
import { getAllMaps, storeMap, updateMap, destroyMapSingle, destroyMultipleMap } from './admin/map.controller.mjs';

export const adminController = {
  login,
  refreshTokens,
  logout,
  profileLogin,
  updateProfile,
  resetPassword,
  uploadPhoto,
  getAllMaps,
  storeMap,
  updateMap,
  destroyMapSingle,
  destroyMultipleMap,
};
