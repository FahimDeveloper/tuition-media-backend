import express from 'express';
import { AuthControllers } from './auth.controllers';

const router = express.Router();

// ! - login and signup response should not return password field.
router.post('/teacher/login', AuthControllers.loginTeacher);
router.post('/teacher/registration', AuthControllers.registerTeacher);

router.post('/teacher/refresh-token', AuthControllers.refreshTeacherToken);
router.post('/admin/login', AuthControllers.loginAdmin);
router.post('/admin/refresh-token', AuthControllers.refreshAdminToken);

export const AuthenticationRoutes = router;
