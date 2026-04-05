import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import config from '../config';
import AppError from '../errors/AppError';
import status from 'http-status';

const s3 = new S3Client({
  region: config.s3_aws_region!,
  credentials: {
    accessKeyId: config.s3_access_key!,
    secretAccessKey: config.s3_secret_key!,
  },
});

export const uploadImage = async (file: Express.Multer.File) => {
  const fileStream = fs.createReadStream(file.path);
  const fileName = `${Date.now()}-${file.originalname.toLowerCase().split(' ').join('-')}`;

  const uploadParams = {
    Bucket: config.s3_bucket_name!,
    Key: fileName,
    Body: fileStream,
    ContentType: file.mimetype,
  };

  try {
    const command = new PutObjectCommand(uploadParams);
    await s3.send(command);
    fs.unlinkSync(file.path);
    const url = `https://${config.s3_bucket_name!}.s3.${config.s3_aws_region!}.amazonaws.com/${fileName}`;
    return { url };
  } catch (error: any) {
    throw new AppError(status.BAD_REQUEST, error.message);
  }
};
