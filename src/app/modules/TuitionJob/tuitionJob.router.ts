import express from 'express';
import { TuitionJobControllers } from './tuitionJob.controllers';
import { ROLE } from '../../types/role';
import authMiddleware from '../../middleware/authMiddleware';

const router = express.Router();

// Public api
router.get('/', TuitionJobControllers.getAllTuitionJobsForTeacher);
router.get('/:id', TuitionJobControllers.getTuitionJobById);

// private api.
// ! - it shows invalid id. should fix it.
router.get(
  '/admin',
  authMiddleware(ROLE.admin, ROLE.superAdmin, ROLE.teleSales),
  TuitionJobControllers.getAllTuitionJobsForAdmin,
);

// * - They are working fine. will check again after admin get all tuition jobs fixed
router.post(
  '/create',
  authMiddleware(ROLE.admin, ROLE.superAdmin, ROLE.teleSales),
  TuitionJobControllers.createTuitionJob,
);

router.patch(
  '/update/:id',
  authMiddleware(ROLE.admin, ROLE.superAdmin, ROLE.teleSales),
  TuitionJobControllers.updateTuitionJobById,
);

export const TuitionJobRouter = router;
