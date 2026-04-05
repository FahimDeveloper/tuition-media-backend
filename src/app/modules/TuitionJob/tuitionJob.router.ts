import express from 'express';
import { TuitionJobControllers } from './tuitionJob.controllers';

const router = express.Router();

router.get('/user', TuitionJobControllers.getAllTuitionJobsForUser);
router.get('/admin', TuitionJobControllers.getAllTuitionJobsForAdmin);
router.get('/:id', TuitionJobControllers.getTuitionJobById);
router.post('/create', TuitionJobControllers.createTuitionJob);
router.patch('/update/:id', TuitionJobControllers.updateTuitionJobById);

export const TuitionJobRouter = router;
