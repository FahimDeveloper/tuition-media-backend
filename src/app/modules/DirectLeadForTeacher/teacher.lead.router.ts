import express from 'express';
import { TeacherLeadControllers } from './teacher.lead.controllers';

const router = express.Router();

router.get('/', TeacherLeadControllers.getLeads);
router.post('/create', TeacherLeadControllers.makeLeadsForTeacher);

export const TeacherLeadRouter = router;
