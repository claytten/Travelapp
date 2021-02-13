/* eslint-disable no-unused-expressions */
import multer from 'multer';
import httpStatus from 'http-status';
import { v4 as uuidv4 } from 'uuid';
import { join, resolve, extname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import ApiError from './ApiError.mjs';

export const storage = multer.diskStorage({
  destination(req, file, cb) {
    try {
      const pattern = req.baseUrl.split('/');
      const getPath = pattern[pattern.length - 1];
      const setPath = `uploads${process.env.NODE_ENV === 'testing' ? '-testing/' : '/'}${getPath}`;
      !existsSync(join(resolve(), setPath)) && mkdirSync(join(resolve(), setPath), { recursive: true });
      cb(null, setPath);
    } catch (err) {
      throw new ApiError(err);
    }
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
    cb(new ApiError(httpStatus.UNAUTHORIZED, 'File Image is not supported!'), false);
  }
};
