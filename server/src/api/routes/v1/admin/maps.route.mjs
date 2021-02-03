import { Router } from 'express';
import multer from 'multer';
import { adminController } from '../../../controllers/index.mjs';
import { auth } from '../../../middlewares/authAdmin.middleware.mjs';
import { storage, fileFilter } from '../../../../utils/uploadingImage.mjs';

const router = Router();

router
  .route('/')
  .get(auth('managesMap'), adminController.getAllMaps)
  .post(auth('managesMap'), multer({ storage, fileFilter }).single('image'), adminController.storeMap);

router
  .route('/:mapId')
  .put(auth('managesMap'), multer({ storage, fileFilter }).single('image'), adminController.updateMap)
  .delete(auth('managesMap'), adminController.destroyMapSingle);

router.post('/multiple', auth('managesMap'), adminController.destroyMultipleMap);

export default router;
