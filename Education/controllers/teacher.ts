import { Request, Response } from 'express';
import { Exam, Question } from '../../Education/models/teacher';
import mongoose from 'mongoose';

// Create a new exam
export const createExam = async (req: Request, res: Response): Promise<void> => {
  try {
    const examData = req.body;
    const exam = new Exam({
      ...examData,
      questions: [],
    });
    await exam.save();
    res.status(201).json({ message: 'Exam created successfully', exam });
  } catch (error) {
    res.status(500).json({ message: 'Error creating exam', error });
  }
};

// Add a question to an exam
export const addQuestion = async (req: Request, res: Response): Promise<void> => {
  try {
    const { examId } = req.params;
    const { questionText, options, correctAnswer, marks } = req.body;

    const question = new Question({ questionText, options, correctAnswer, marks });
    await question.save();

    const exam = await Exam.findById(examId);
    if (!exam) {
      res.status(404).json({ message: 'Exam not found' });
      return;
    }

    exam.questions.push(question._id);
    exam.totalQuestions = exam.questions.length;
    await exam.save();

    res.status(201).json({ message: 'Question added successfully', question });
  } catch (error) {
    res.status(500).json({ message: 'Error adding question', error });
  }
};

// Update exam status (e.g., start, pause, complete)
export const updateExamStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { examId } = req.params;
    const { status } = req.body;

    const validStatuses = ['scheduled', 'active', 'completed', 'paused'];
    if (!validStatuses.includes(status)) {
      res.status(400).json({ message: 'Invalid status' });
      return;
    }

    const exam = await Exam.findByIdAndUpdate(
      examId,
      { status },
      { new: true }
    );
    if (!exam) {
      res.status(404).json({ message: 'Exam not found' });
      return;
    }

    res.status(200).json({ message: 'Exam status updated', exam });
  } catch (error) {
    res.status(500).json({ message: 'Error updating exam status', error });
  }
};

// Toggle result visibility
export const toggleResultVisibility = async (req: Request, res: Response): Promise<void> => {
  try {
    const { examId } = req.params;
    const { resultsVisible, resultVisibilityTime } = req.body;

    const update: any = { resultsVisible };
    if (!resultsVisible && resultVisibilityTime) {
      update.resultVisibilityTime = resultVisibilityTime;
    } else if (resultsVisible) {
      update.resultVisibilityTime = null;
    }

    const exam = await Exam.findByIdAndUpdate(examId, update, { new: true });
    if (!exam) {
      res.status(404).json({ message: 'Exam not found' });
      return;
    }

    res.status(200).json({ message: 'Result visibility updated', exam });
  } catch (error) {
    res.status(500).json({ message: 'Error updating result visibility', error });
  }
};

// Get exam details (including questions and results if visible)
export const getExamDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const { examId } = req.params;
    const exam = await Exam.findById(examId).populate('questions');
    if (!exam) {
      res.status(404).json({ message: 'Exam not found' });
      return;
    }

    const response: any = { ...exam.toObject() };
    if (!exam.resultsVisible) {
      response.questions = response.questions.map((q: any) => ({
        _id: q._id,
        questionText: q.questionText,
        options: q.options,
        marks: q.marks,
      }));
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching exam details', error });
  }
};