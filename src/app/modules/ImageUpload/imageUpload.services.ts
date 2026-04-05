import { uploadImage } from '../../utils/uploadSingleImage';

const uploadSingleImageIntoDB = async (file: Express.Multer.File) => {
  const result = await uploadImage(file);
  return { imageUrl: result.url };
};

export const ImageUploadServices = {
  uploadSingleImageIntoDB,
};
