import { Router } from 'express';
import { authAdminValidation } from '../../../../validations/index.mjs';
import { authAdminController } from '../../../controllers/index.mjs';

const router = Router();

router.post('/login', authAdminValidation.login, authAdminController.login);
router.post('/register', authAdminValidation.register, authAdminController.register);
router.post('/logout', authAdminValidation.logout, authAdminController.logout);
router.post('/refresh-tokens', authAdminValidation.refreshToken, authAdminController.refreshTokens);

export default router;
