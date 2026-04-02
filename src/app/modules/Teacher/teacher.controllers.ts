import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TeacherServices } from './teacher.services';

const getAllTeachers = catchAsync(async (req, res) => {
  const result = await TeacherServices.getAllTeachersFromDB(req.query);
  sendResponse(res, status.OK, 'Teachers retrieved successfully!', result);
});

const getSingleTeacher = catchAsync(async (req, res) => {
  const result = await TeacherServices.getSingleTeacherFromDB(req.params.id as string);
  sendResponse(res, status.OK, 'Teacher retrieved successfully!', result);
});

const updateTeacher = catchAsync(async (req, res) => {
  const result = await TeacherServices.updateTeacherIntoDB(req.params.id as string, req.body);
  sendResponse(res, status.OK, 'Teacher updated successfully!', result);
});

export const TeacherControllers = {
  getAllTeachers,
  getSingleTeacher,
  updateTeacher,
};
