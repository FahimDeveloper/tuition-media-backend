import express from 'express';
import { LeadControllers } from './lead.controllers';
import authMiddleware from '../../middleware/authMiddleware';
import { ROLE } from '../../types/role';

const router = express.Router();

router.post('/create', LeadControllers.createLead);
// * - need a api to get all leads for admin dashboard.

router.get(
  '/new',
  authMiddleware(ROLE.admin, ROLE.superAdmin, ROLE.teleSales),
  LeadControllers.getNewLeads,
);

router.get(
  '/assigned',
  authMiddleware(ROLE.admin, ROLE.superAdmin, ROLE.teleSales),
  LeadControllers.getAssignedLeads,
);

// ? what is the difference between own and assigned
// * need to understand it will check later. although it's not needed now for prototype.
router.get(
  '/assigned/own/:id',
  authMiddleware(ROLE.admin, ROLE.superAdmin, ROLE.teleSales),
  LeadControllers.getAssignedOwnLeads,
);
router.patch(
  '/assigned/:id',
  authMiddleware(ROLE.admin, ROLE.superAdmin, ROLE.teleSales),
  LeadControllers.makeLeadAsAssigned,
);
router.patch(
  '/update/:id',
  authMiddleware(ROLE.admin, ROLE.superAdmin, ROLE.teleSales),
  LeadControllers.updateLead,
);

export const LeadRoutes = router;
