import express from 'express';
import { TeacherControllers } from './teacher.controllers';

const router = express.Router();

router.get('/', TeacherControllers.getAllTeachers);
router.get('/profile', TeacherControllers.getSingleTeacher);
router.patch('/profile/update', TeacherControllers.updateTeacher);

export const TeacherRoutes = router;
