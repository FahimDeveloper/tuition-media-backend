import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TuitionJobServices } from './tuitionJob.services';

const createTuitionJob = catchAsync(async (req, res) => {
  const result = await TuitionJobServices.createTuitionJobIntoDB(req.body);
  sendResponse(res, status.CREATED, 'Tuition job created successfully', result);
});

const getAllTuitionJobsForUser = catchAsync(async (req, res) => {
  const { result, count } = await TuitionJobServices.getAllTuitionJobsForUserFromDB(req.query);
  sendResponse(res, status.OK, 'Tuition jobs retrieved successfully', result, count);
});

const getAllTuitionJobsForAdmin = catchAsync(async (req, res) => {
  const { result, count } = await TuitionJobServices.getAllTuitionJobsForAdminFromDB(req.query);
  sendResponse(res, status.OK, 'Tuition jobs retrieved successfully', result, count);
});

const getTuitionJobById = catchAsync(async (req, res) => {
  const result = await TuitionJobServices.getTuitionJobByIdFromDB(req.params.id as string);
  sendResponse(res, status.OK, 'Tuition job retrieved successfully', result);
});

const updateTuitionJobById = catchAsync(async (req, res) => {
  const result = await TuitionJobServices.updateTuitionJobByIntoDB(
    req.params.id as string,
    req.body,
  );
  sendResponse(res, status.OK, 'Tuition job updated successfully', result);
});

export const TuitionJobControllers = {
  createTuitionJob,
  getAllTuitionJobsForUser,
  getAllTuitionJobsForAdmin,
  getTuitionJobById,
  updateTuitionJobById,
};
