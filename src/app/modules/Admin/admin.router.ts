import express from 'express';
import { AdminControllers } from './admin.controllers';

const router = express.Router();
// ! - only super admins should have access to all this routes.

// ! - allowed ip should not visible to user.
// ? - will the existing auth middleware will do the job?
router.get('/', AdminControllers.getAllAdmins);
router.get('/:id', AdminControllers.getSingleAdmin);

// ! SuperAdmin should not be able to create another super admin.
// ! Only superAdmin should have the ability to create another admin.
// ! Same goes for other route update and delete.
router.post('/create', AdminControllers.createAdmin);

// ? - when i update admin user password then i can't login don't know why is that.
router.patch('/update/:id', AdminControllers.updateAdmin);

// * - didn't checked this two routes.
router.delete('/delete/:id', AdminControllers.deleteAdmin);
router.patch('/restore/:id', AdminControllers.restoreAdmin);

export const AdminRoutes = router;
