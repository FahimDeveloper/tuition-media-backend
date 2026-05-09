import express from 'express';
import { AppliedApplicationControllers } from './applied.controllers';
import authMiddleware from '../../middleware/authMiddleware';
import { ROLE } from '../../types/role';

const router = express.Router();

// ! - 1 user should not apply multiple times for a single job.
router.post(
  '/apply',
  authMiddleware(ROLE.teacher, ROLE.admin, ROLE.superAdmin, ROLE.teleSales),
  AppliedApplicationControllers.applyForJob,
);

// ! - should fix this. should be able to get all applications by job id.
// ! - shows an error Schema hasn't been registered for model \"User\".\nUse mongoose.model(name, schema)
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
