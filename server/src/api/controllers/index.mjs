import { login, refreshTokens, logout } from './auth/admin.auth.controller.mjs';
import { profileLogin, updateProfile, resetPassword, accountUploadPhoto } from './admin/account.controller.mjs';
import {
  getAllMaps,
  storeMap,
  updateMap,
  mapUploadPhoto,
  destroyMapSingle,
  destroyMultipleMap,
} from './admin/map.controller.mjs';

export const adminController = {
  login,
  refreshTokens,
  logout,
  profileLogin,
  updateProfile,
  resetPassword,
  accountUploadPhoto,
  getAllMaps,
  storeMap,
  updateMap,
  mapUploadPhoto,
  destroyMapSingle,
  destroyMultipleMap,
};
