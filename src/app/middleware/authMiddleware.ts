import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import catchAsync from '../utils/catchAsync';
import { Admin } from '../modules/Admin/admin.model';
import { ROLE } from '../types/role';
import { TRole } from '../utils/role';
import { Teacher } from '../modules/Teacher/teacher.model';

const authMiddleware = (...requiredRoles: Partial<TRole[]>) =>
  catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'The request not authorized!');
    }
    const decoded = jwt.verify(
      token.split(' ')[1],
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { role, email } = decoded;

    if (role === ROLE.teacher) {
      const user = await Teacher.isTeacherExistsByEmail(email);
      if (!user) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'The request not authorized!');
      } else {
        if (!user?.is_verified) {
          throw new AppError(
            httpStatus.BAD_REQUEST,
            'Please verify your account to access this resource!',
          );
        }
      }
    } else if (
      role === ROLE.admin ||
      role === ROLE.superAdmin ||
      role === ROLE.teleMarketing ||
      role === ROLE.teleSales
    ) {
      const user = await Admin.isAdminExistsByEmail(email);
      if (!user) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'The request not authorized!');
      }
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'The request not authorized!');
    }

    req.user = decoded;
    next();
  });

export default authMiddleware;
