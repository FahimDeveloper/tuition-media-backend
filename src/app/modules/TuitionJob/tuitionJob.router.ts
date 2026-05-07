import express from 'express';
import { TuitionJobControllers } from './tuitionJob.controllers';

const router = express.Router();

// Public api
router.get('/', TuitionJobControllers.getAllTuitionJobsForUser);
router.get('/:id', TuitionJobControllers.getTuitionJobById);

// private api.
router.get('/admin', TuitionJobControllers.getAllTuitionJobsForAdmin);
router.post('/create', TuitionJobControllers.createTuitionJob);
router.patch('/update/:id', TuitionJobControllers.updateTuitionJobById);

export const TuitionJobRouter = router;
