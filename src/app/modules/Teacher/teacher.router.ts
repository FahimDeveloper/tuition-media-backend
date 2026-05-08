import express from 'express';
import { TeacherControllers } from './teacher.controllers';
import authMiddleware from '../../middleware/authMiddleware';
import { ROLE } from '../../types/role';

const router = express.Router();

router.get('/public', TeacherControllers.getAllPublicTeachers);
router.get(
  '/admin/private',
  authMiddleware(ROLE.admin, ROLE.superAdmin, ROLE.teleMarketing, ROLE.teleSales),
  TeacherControllers.getAllPrivateTeachers,
);
router.get('/public/profile/:id', TeacherControllers.getSinglePublicTeacher);
router.get(
  '/own/profile/:id',
  authMiddleware(ROLE.teacher),
  TeacherControllers.getSinglePrivateTeacher,
);
router.patch('/profile/update/:id', authMiddleware(ROLE.teacher), TeacherControllers.updateTeacher);

export const TeacherRoutes = router;
