import mongoose, { Schema, Document } from 'mongoose';

interface IQuestion extends Document {
  questionText: string;
  options: string[];
  correctAnswer: string;
  marks: number;
}

interface IExam extends Document {
  id: string;
  title: string;
  subject: string;
  duration: number;
  totalQuestions: number;
  scheduledDate: string;
  scheduledTime: string;
  status: 'scheduled' | 'active' | 'completed' | 'paused';
  studentsEnrolled: number;
  studentsCompleted: number;
  resultsVisible: boolean;
  autoShowResults: boolean;
  resultVisibilityTime?: string;
  passingMarks: number;
  questions: mongoose.Types.ObjectId[];
}

const QuestionSchema: Schema = new Schema({
  questionText: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswer: { type: String, required: true },
  marks: { type: Number, required: true, min: 1 },
});

const ExamSchema: Schema = new Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  duration: { type: Number, required: true, min: 1 },
  totalQuestions: { type: Number, required: true, min: 1 },
  scheduledDate: { type: String, required: true }, // ISO date (e.g., "2025-07-10")
  scheduledTime: { type: String, required: true }, // Time (e.g., "14:30")
  status: {
    type: String,
    enum: ['scheduled', 'active', 'completed', 'paused'],
    default: 'scheduled',
  },
  studentsEnrolled: { type: Number, default: 0 },
  studentsCompleted: { type: Number, default: 0 },
  resultsVisible: { type: Boolean, default: false },
  autoShowResults: { type: Boolean, default: false },
  resultVisibilityTime: { type: String, default: null },
  passingMarks: { type: Number, required: true, min: 0 },
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
}, { timestamps: true });

export const Question = mongoose.model<IQuestion>('Question', QuestionSchema);
export const Exam = mongoose.model<IExam>('Exam', ExamSchema);