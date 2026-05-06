import express from 'express';
import { TeacherControllers } from './teacher.controllers';

const router = express.Router();

// Is it public routes?
// Public teacher routes
router.get('/', TeacherControllers.getAllTeachers);
router.get('/profile/:id', TeacherControllers.getSingleTeacher);

// Private teacher routes
// all teacher admin is missing.
// single teacher admin is missing.

router.patch('/profile/update/:id', TeacherControllers.updateTeacher);

// if i update profile from here will it update user data?

// authenticated teacher data route is missing.

export const TeacherRoutes = router;
