import express from 'express';
import { AppliedApplicationControllers } from './applied.controllers';

const router = express.Router();

router.post('/apply', AppliedApplicationControllers.applyForJob);
router.get('/job/:id', AppliedApplicationControllers.getApplicationsByJobId);
router.get('/applicant/:id', AppliedApplicationControllers.getApplicationsByApplicantId);

export const AppliedApplicationRoutes = router;
