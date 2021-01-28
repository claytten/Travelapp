import { login, register, logout, refreshToken } from './auth.admin.validation.mjs';
import { updateProfile, resetPassword } from './accountAdmin.validation.mjs';

export const adminValidation = { login, register, logout, refreshToken, updateProfile, resetPassword };
