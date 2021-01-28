import { Router } from 'express';
import { auth } from '../../../middlewares/authAdmin.middleware.mjs';
import { AdminController } from '../../../controllers/index.mjs';
import { adminValidation } from '../../../../validations/index.mjs';

const router = Router();

router.route('/').get(auth('getProfile'), AdminController.profileLogin);
router.route('/:adminId').put(auth('updateProfile'), adminValidation.updateProfile, AdminController.updateProfile);

export default router;
