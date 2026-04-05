import express from 'express';
import { TeacherRoutes } from '../modules/Teacher/teacher.router';
import { AuthenticationRoutes } from '../modules/Authentication/auth.router';
import { AdminRoutes } from '../modules/Admin/admin.router';
import { TuitionJobRouter } from '../modules/TuitionJob/tuitionJob.router';
import { AppliedApplicationRoutes } from '../modules/AppliedApplication/applied.router';

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
  {
    path: '/apply-applications',
    route: AppliedApplicationRoutes,
  },
];

mainRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
