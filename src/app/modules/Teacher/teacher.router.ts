import express from 'express';
import { TeacherControllers } from './teacher.controllers';
import authMiddleware from '../../middleware/authMiddleware';
import { ROLE } from '../../types/role';

const router = express.Router();

// ! parents info, identification, certification should not be visible to public route.
router.get('/public', TeacherControllers.getAllPublicTeachers);
router.get(
  '/admin/private',
  authMiddleware(ROLE.admin, ROLE.superAdmin, ROLE.teleMarketing, ROLE.teleSales),
  TeacherControllers.getAllPrivateTeachers,
);

// ! - same as public route.
router.get('/public/profile/:id', TeacherControllers.getSinglePublicTeacher);

router.get(
  '/own/profile/:id',
  authMiddleware(ROLE.teacher),
  TeacherControllers.getSinglePrivateTeacher,
);

// ! update password should work properly.
// ! after updating password, user should be able to login with new password.
router.patch('/profile/update/:id', authMiddleware(ROLE.teacher), TeacherControllers.updateTeacher);

export const TeacherRoutes = router;
