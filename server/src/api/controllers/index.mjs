import { login, refreshTokens, logout, register } from './auth/admin.auth.controller.mjs';
import { profileLogin, updateProfile } from './admin/account.controller.mjs';

export const AdminController = { login, register, refreshTokens, logout, profileLogin, updateProfile };
