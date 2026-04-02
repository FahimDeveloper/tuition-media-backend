import status from 'http-status';
import AppError from '../../errors/AppError';
import { Teacher } from '../Teacher/teacher.model';
import { IAdminLogin, ITeacherLogin, ITeacherRegistration } from './auth.interface';
import config from '../../config';
import { createToken } from '../../utils/auth';
import { SignOptions } from 'jsonwebtoken';
import { Admin } from '../Admin/admin.model';
import { IAdmin } from '../Admin/admin.interface';

const loginTeacherIntoDB = async (payload: ITeacherLogin) => {
  const user = await Teacher.isTeacherExistsByEmail(payload.email);
  if (!user) {
    throw new AppError(status.NOT_FOUND, 'user not found!');
  }

  const passwordMatch = await Teacher.isPasswordMatched(payload?.password, user?.password);
  if (!passwordMatch) {
    throw new AppError(status.FORBIDDEN, 'Password incorrect!');
  }

  const jwtPayload = {
    email: user.email,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as SignOptions['expiresIn'],
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as SignOptions['expiresIn'],
  );

  return {
    user: {
      ...user,
    },
    accessToken,
    refreshToken,
  };
};

const teacherRegistrationIntoDB = async (payload: ITeacherRegistration) => {
  let user;
  user = await Teacher.isTeacherExistsByEmail(payload.email);
  if (user) {
    throw new AppError(status.NOT_FOUND, 'User Already exists');
  }
  user = await Teacher.create({
    ...payload,
  });

  const jwtPayload = {
    email: payload.email,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_refresh_expires_in as SignOptions['expiresIn'],
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as SignOptions['expiresIn'],
  );

  return {
    user: user.toObject(),
    accessToken,
    refreshToken,
  };
};

const loginAdminIntoDB = async (payload: IAdminLogin) => {
  const admin = await Admin.findByEmailAndValidate(
    payload.email,
    payload.password,
    payload.ip_address,
  );

  const jwtPayload = { email: admin!.email };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as SignOptions['expiresIn'],
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as SignOptions['expiresIn'],
  );

  await Admin.updateOne({ email: admin!.email }, { last_login: new Date() });

  return {
    user: admin,
    accessToken,
    refreshToken,
  };
};

export const AuthServices = {
  loginTeacherIntoDB,
  teacherRegistrationIntoDB,
  loginAdminIntoDB,
};
