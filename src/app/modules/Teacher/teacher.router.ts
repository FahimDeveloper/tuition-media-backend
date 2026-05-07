import express from 'express';
import { TeacherControllers } from './teacher.controllers';

const router = express.Router();

// Is it public routes?
// Public teacher routes
router.get('/', TeacherControllers.getAllTeachers);
<<<<<<< HEAD
router.get('/profile', TeacherControllers.getMyProfile);
router.get('/profile/:id', TeacherControllers.getSingleTeacher);
router.patch('/profile/update/:id', TeacherControllers.updateTeacher);
=======
router.get('/profile/:id', TeacherControllers.getSingleTeacher);

// Private teacher routes
// all teacher admin is missing.
// single teacher admin is missing.

router.patch('/profile/update/:id', TeacherControllers.updateTeacher);

// if i update profile from here will it update user data?

// authenticated teacher data route is missing.
>>>>>>> 5f8f04d451f6c394808c41de931e8fd39248f336

export const TeacherRoutes = router;
