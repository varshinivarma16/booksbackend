import { Router } from 'express';
import {
  createExam,
  addQuestion,
  updateExamStatus,
  toggleResultVisibility,
  getExamDetails,
} from '../../Education/controllers/teacher';

const router = Router();

// Create a new exam
router.post('/', createExam);

// Add a question to an exam
router.post('/:examId/questions', addQuestion);

// Update exam status (scheduled, active, completed, paused)
router.patch('/:examId/status', updateExamStatus);

// Toggle result visibility
router.patch('/:examId/results', toggleResultVisibility);

// Get exam details
router.get('/:examId', getExamDetails);

export default router;