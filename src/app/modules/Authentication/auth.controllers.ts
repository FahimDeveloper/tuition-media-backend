import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.services';

const loginTeacher = catchAsync(async (req, res) => {
  const result = await AuthServices.loginTeacherIntoDB(req.body);
  const { accessToken, refreshToken, user } = result;

  res.cookie('refreshToken', refreshToken, {
    // domain: '.prostrikers.com',
    secure: true,
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24 * 30,
  });

  sendResponse(res, status.OK, 'logged in successfully!', {
    user,
    accessToken,
  });
});

const registerTeacher = catchAsync(async (req, res) => {
  const result = await AuthServices.teacherRegistrationIntoDB(req.body);
  const { accessToken, refreshToken, user } = result;
  res.cookie('refreshToken', refreshToken, {
    // domain: '.prostrikers.com',
    secure: true,
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24 * 30,
  });

  sendResponse(res, status.OK, 'Teacher registered successfully!', {
    user,
    accessToken,
  });
});

const loginAdmin = catchAsync(async (req, res) => {
  const result = await AuthServices.loginAdminIntoDB(req.body);
  const { accessToken, refreshToken, user } = result;

  res.cookie('refreshToken', refreshToken, {
    // domain: '.prostrikers.com',
    secure: true,
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24 * 30,
  });

  sendResponse(res, status.OK, 'Admin logged in successfully!', {
    user,
    accessToken,
  });
});

const refreshTeacherToken = catchAsync(async (req, res) => {
  const { refreshToken, user, accessToken } = await AuthServices.refreshTeacherTokenFromDB(
    req.body,
  );
  res.cookie('refreshToken', refreshToken, {
    // domain: '.prostrikers.com',
    secure: true,
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24 * 30,
  });
  sendResponse(res, status.OK, 'Token refreshed successfully!', {
    user,
    accessToken,
  });
});

const refreshAdminToken = catchAsync(async (req, res) => {
  const { refreshToken, user, accessToken } = await AuthServices.refreshAdminTokenFromDB(req.body);
  res.cookie('refreshToken', refreshToken, {
    // domain: '.prostrikers.com',
    secure: true,
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24 * 30,
  });
  sendResponse(res, status.OK, 'Token refreshed successfully!', {
    user,
    accessToken,
  });
});

export const AuthControllers = {
  loginTeacher,
  registerTeacher,
  loginAdmin,
  refreshTeacherToken,
  refreshAdminToken,
};
