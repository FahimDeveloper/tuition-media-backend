import express from 'express';
import { upload } from '../../middleware/multerMiddleware';
import { ImageUploadControllers } from './imageUpload.controllers';

const route = express.Router();

route.post('/single', upload.single('image'), ImageUploadControllers.uploadSingleImage);

export const ImageUploadRoutes = route;
