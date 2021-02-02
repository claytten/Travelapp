import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';

export const storage = multer.diskStorage({
  destination(req, file, cb) {
    const pattern = req.route.path.split('/');
    const getPath = pattern[pattern.length - 2];
    cb(null, `uploads/${getPath}`);
  },
  filename(req, file, cb) {
    cb(null, `${uuidv4()}-${Date.now()}${extname(file.originalname)}`);
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
