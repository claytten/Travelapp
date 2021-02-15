import { Router } from 'express';
import multer from 'multer';
import { adminController } from '../../../controllers/index.mjs';
import { adminValidation } from '../../../../validations/index.mjs';
import { auth } from '../../../middlewares/authAdmin.middleware.mjs';
import { storage, fileFilter } from '../../../../utils/uploadingImage.mjs';

const router = Router();

router
  .route('/')
  .get(auth('managesMap'), adminController.getAllMaps)
  .post(auth('managesMap'), adminValidation.createMap, adminController.storeMap);

router
  .route('/:mapId')
  .put(auth('managesMap'), adminValidation.updateMap, adminController.updateMap)
  .delete(auth('managesMap'), adminController.destroyMapSingle);

router.put('/upload-photo/:mapId', multer({ storage, fileFilter }).single('image'), adminController.mapUploadPhoto);

router.post('/multiple', auth('managesMap'), adminController.destroyMultipleMap);

export default router;
