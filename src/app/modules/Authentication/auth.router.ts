import express from 'express';
import { AuthControllers } from './auth.controllers';

const router = express.Router();

router.post('/login', AuthControllers.loginTeacher);
router.post('/registration', AuthControllers.registerTeacher);

export const AuthenticationRoutes = router;
