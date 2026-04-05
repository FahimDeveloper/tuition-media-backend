import { uploadImage } from '../../utils/uploadSingleImage';

const uploadSingleImageIntoDB = async (file: Express.Multer.File) => {
  const result = await uploadImage(file);
  return { imageUrl: result.url };
};

const uploadMultipleImagesIntoDB = async (files: Express.Multer.File[]) => {
  const uploadedImages = await Promise.all(files.map((file) => uploadImage(file)));
  return uploadedImages.map((img) => ({ imageUrl: img.url }));
};

export const ImageUploadServices = {
  uploadSingleImageIntoDB,
  uploadMultipleImagesIntoDB,
};
