import { Router } from 'express';
import multer from 'multer';
import { auth } from '../../../middlewares/authAdmin.middleware.mjs';
import { adminController } from '../../../controllers/index.mjs';
import { adminValidation } from '../../../../validations/index.mjs';
import { storage, fileFilter } from '../../../../utils/uploadingImage.mjs';

const router = Router();

router.route('/').get(auth('getProfile'), adminController.profileLogin);
router.route('/:adminId').put(auth('updateProfile'), adminValidation.updateProfile, adminController.updateProfile);
router.put(
  '/reset-password/:adminId',
  auth('resetPassword'),
  adminValidation.resetPassword,
  adminController.resetPassword,
);
router.put(
  '/upload-photo/:adminId',
  multer({ storage, fileFilter }).single('image'),
  adminController.accountUploadPhoto,
);

export default router;
