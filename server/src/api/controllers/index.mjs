import { login, refreshTokens, logout, register } from './auth/admin.auth.controller.mjs';

export const authAdminController = { login, register, refreshTokens, logout };
