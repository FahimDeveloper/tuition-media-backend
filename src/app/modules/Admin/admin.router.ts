import express from 'express';
import { AdminControllers } from './admin.controllers';

const router = express.Router();

router.get('/', AdminControllers.getAllAdmins);
router.get('/:id', AdminControllers.getSingleAdmin);
router.post('/create', AdminControllers.createAdmin);
router.patch('/update/:id', AdminControllers.updateAdmin);
router.delete('/delete/:id', AdminControllers.deleteAdmin);
router.patch('/restore/:id', AdminControllers.restoreAdmin);

export const AdminRoutes = router;
