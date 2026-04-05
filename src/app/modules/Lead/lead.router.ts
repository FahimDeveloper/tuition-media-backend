import express from 'express';
import { LeadControllers } from './lead.controllers';

const router = express.Router();

router.post('/create', LeadControllers.createLead);
router.get('/new', LeadControllers.getNewLeads);
router.get('/assigned', LeadControllers.getAssignedLeads);
router.get('/assigned/own/:id', LeadControllers.getAssignedOwnLeads);
router.patch('/assigned/:id', LeadControllers.makeLeadAsAssigned);
router.patch('/update/:id', LeadControllers.updateLead);

export const LeadRoutes = router;
