import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ImageUploadServices } from './imageUpload.services';
import AppError from '../../errors/AppError';

const uploadSingleImage = catchAsync(async (req, res) => {
  const file = req.file;
  const result = await ImageUploadServices.uploadSingleImageIntoDB(file!);
  sendResponse(res, status.CREATED, 'Image successfully uploaded', result);
});

const uploadMultipleImages = catchAsync(async (req, res) => {
  const files = req.files as Express.Multer.File[];
  if (!files || files.length === 0) {
    throw new AppError(status.BAD_REQUEST, 'No files uploaded');
  }
  const results = await ImageUploadServices.uploadMultipleImagesIntoDB(files);
  sendResponse(res, status.CREATED, 'Images successfully uploaded', results);
});

export const ImageUploadControllers = {
  uploadSingleImage,
  uploadMultipleImages,
};
