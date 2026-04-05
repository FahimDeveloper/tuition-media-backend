import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AppliedApplicationServices } from './applied.services';

const applyForJob = catchAsync(async (req, res) => {
  const result = await AppliedApplicationServices.applyForJobIntoDB(req.body);
  sendResponse(res, status.CREATED, 'Applied for job successfully', result);
});

const getApplicationsByJobId = catchAsync(async (req, res) => {
  const { result, count } = await AppliedApplicationServices.getApplicationsByJobIdFromDB(
    req.query,
  );
  sendResponse(res, status.OK, 'Applications retrieved successfully', result, count);
});

const getApplicationsByApplicantId = catchAsync(async (req, res) => {
  const { result, count } = await AppliedApplicationServices.getApplicationsByApplicantIdFromDB(
    req.query,
  );
  sendResponse(res, status.OK, 'Applications retrieved successfully', result, count);
});

export const AppliedApplicationControllers = {
  applyForJob,
  getApplicationsByJobId,
  getApplicationsByApplicantId,
};
