import express from 'express';
import { upload } from '../../middleware/multerMiddleware';
import { ImageUploadControllers } from './imageUpload.controllers';
import authMiddleware from '../../middleware/authMiddleware';
import { ROLE } from '../../types/role';

const route = express.Router();

route.post(
  '/single',
  authMiddleware(ROLE.teacher, ROLE.admin, ROLE.superAdmin),
  upload.single('image'),
  ImageUploadControllers.uploadSingleImage,
);
route.post(
  '/multiple',
  authMiddleware(ROLE.teacher, ROLE.admin, ROLE.superAdmin),
  upload.array('images', 5),
  ImageUploadControllers.uploadMultipleImages,
);

export const ImageUploadRoutes = route;
