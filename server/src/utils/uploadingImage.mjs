import multer from 'multer';
import { uuid } from 'uuidv4';
import { extname } from 'path';

export const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/avatar');
  },
  filename(req, file, cb) {
    cb(null, `${uuid()}-${Date.now()}${extname(file.originalname)}`);
  },
});

export const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
