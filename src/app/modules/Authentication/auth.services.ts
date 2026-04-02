import status from 'http-status';
import AppError from '../../errors/AppError';
import { Teacher } from '../Teacher/teacher.model';
import { ILogin, IRegister } from './auth.interface';
import config from '../../config';
import { createToken } from '../../utils/auth';
import { SignOptions } from 'jsonwebtoken';

const loginTeacherIntoDB = async (payload: ILogin) => {
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

const registerUserIntoDB = async (payload: IRegister) => {
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

export const AuthServices = {
  loginTeacherIntoDB,
  registerUserIntoDB,
};
