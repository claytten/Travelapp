import { Router } from 'express';
import { authAdminValidation } from '../../../../validations/index.mjs';
import { authAdminController } from '../../../controllers/index.mjs';

const router = Router();

router.post('/login', authAdminValidation.login, authAdminController.login);
router.post('/register', authAdminValidation.register, authAdminController.register);
router.post('/logout', (req, res) => {
  res.json({ data: req.body }).status(200).end();
});
router.post('/refresh-tokens', (req, res) => {
  res.json({ data: req.body }).status(200).end();
});

export default router;
