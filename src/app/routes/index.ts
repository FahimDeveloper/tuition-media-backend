import express from 'express';
import { TeacherRoutes } from '../modules/Teacher/teacher.router';
import { AuthenticationRoutes } from '../modules/Authentication/auth.router';
import { AdminRoutes } from '../modules/Admin/admin.router';
import { TuitionJobRouter } from '../modules/TuitionJob/tuitionJob.router';

const router = express.Router();

const mainRoutes = [
  {
    path: '/teachers',
    route: TeacherRoutes,
  },
  {
    path: '/authentications',
    route: AuthenticationRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/tuition-jobs',
    route: TuitionJobRouter,
  },
];

mainRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
