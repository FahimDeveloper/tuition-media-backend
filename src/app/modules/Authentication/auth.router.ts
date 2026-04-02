import express from 'express';
import { AuthControllers } from './auth.controllers';

const router = express.Router();

router.post('/teacher/login', AuthControllers.loginTeacher);
router.post('/teacher/registration', AuthControllers.registerTeacher);
router.post('/admin/login', AuthControllers.loginAdmin);

export const AuthenticationRoutes = router;
