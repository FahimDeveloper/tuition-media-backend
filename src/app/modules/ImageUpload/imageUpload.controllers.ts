import status from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { ImageUploadServices } from './imageUpload.services'

const uploadSingleImage = catchAsync(async (req, res) => {
  const file = req.file
  const result = await ImageUploadServices.uploadSingleImageIntoDB(file!)
  sendResponse(res, status.CREATED, 'Image successfully uploaded', result)
})

export const ImageUploadControllers = {
  uploadSingleImage,
}
