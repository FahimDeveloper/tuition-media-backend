import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TeacherLeadServices } from './teacher.lead.services';

const makeLeadsForTeacher = catchAsync(async (req, res) => {
  const result = await TeacherLeadServices.makeLeadForTeacherIntoDB(req.body);
  sendResponse(res, status.OK, 'Teachers lead created successfully!', result);
});

const getLeads = catchAsync(async (req, res) => {
  const { count, result } = await TeacherLeadServices.getLeadsFromDB(req.query);
  sendResponse(res, status.OK, 'Teachers leads retrieved successfully!', result, count);
});

export const TeacherLeadControllers = {
  makeLeadsForTeacher,
  getLeads,
};
