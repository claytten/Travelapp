import { Router } from 'express';
import { adminValidation } from '../../../../validations/index.mjs';
import { AdminController } from '../../../controllers/index.mjs';

const router = Router();

router.post('/login', adminValidation.login, AdminController.login);
router.post('/register', adminValidation.register, AdminController.register);
router.post('/logout', adminValidation.logout, AdminController.logout);
router.post('/refresh-tokens', adminValidation.refreshToken, AdminController.refreshTokens);

export default router;
