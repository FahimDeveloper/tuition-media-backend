import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TeacherServices } from './teacher.services';

const getAllPublicTeachers = catchAsync(async (req, res) => {
  const { result, count } = await TeacherServices.getAllPublicTeachersFromDB(req.query);
  sendResponse(res, status.OK, 'Teachers retrieved successfully!', result, count);
});

const getSinglePublicTeacher = catchAsync(async (req, res) => {
  const result = await TeacherServices.getSinglePublicTeacherFromDB(req.params.id as string);
  sendResponse(res, status.OK, 'Teacher retrieved successfully!', result);
});

const getAllPrivateTeachers = catchAsync(async (req, res) => {
  const { result, count } = await TeacherServices.getAllPrivateTeachersFromDB(req.query);
  sendResponse(res, status.OK, 'Teachers retrieved successfully!', result, count);
});

const getSinglePrivateTeacher = catchAsync(async (req, res) => {
  const result = await TeacherServices.getSinglePrivateTeacherFromDB(req.params.id as string);
  sendResponse(res, status.OK, 'Teacher retrieved successfully!', result);
});

const updateTeacher = catchAsync(async (req, res) => {
  const result = await TeacherServices.updateTeacherIntoDB(req.params.id as string, req.body);
  sendResponse(res, status.OK, 'Teacher updated successfully!', result);
});

export const TeacherControllers = {
  getAllPublicTeachers,
  getSinglePublicTeacher,
  getAllPrivateTeachers,
  getSinglePrivateTeacher,
  updateTeacher,
};
