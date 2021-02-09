import { Router } from 'express';
import { adminValidation } from '../../../../validations/index.mjs';
import { adminController } from '../../../controllers/index.mjs';

const router = Router();

router.post('/login', adminValidation.login, adminController.login);
router.post('/logout', adminValidation.logout, adminController.logout);
router.post('/refresh-tokens', adminValidation.refreshToken, adminController.refreshTokens);

export default router;
