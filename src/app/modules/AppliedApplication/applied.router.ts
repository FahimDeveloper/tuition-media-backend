import express from 'express';
import { AppliedApplicationControllers } from './applied.controllers';
import authMiddleware from '../../middleware/authMiddleware';
import { ROLE } from '../../types/role';

const router = express.Router();

router.post(
  '/apply',
  authMiddleware(ROLE.teacher, ROLE.admin, ROLE.superAdmin, ROLE.teleSales),
  AppliedApplicationControllers.applyForJob,
);
router.get(
  '/job/:id',
  authMiddleware(ROLE.admin, ROLE.superAdmin, ROLE.teleSales),
  AppliedApplicationControllers.getApplicationsByJobId,
);
router.get(
  '/applicant/:id',
  authMiddleware(ROLE.teacher),
  AppliedApplicationControllers.getApplicationsByApplicantId,
);

export const AppliedApplicationRoutes = router;
