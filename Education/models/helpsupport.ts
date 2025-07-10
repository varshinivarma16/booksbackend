import mongoose, { Schema, Document } from 'mongoose';

interface IResponse {
  id: string;
  message: string;
  sender: 'student' | 'admin';
  senderName: string;
  timestamp: string;
}

interface ITicket extends Document {
  id: string;
  title: string;
  description: string;
  student: {
    name: string;
    email: string;
    id: string;
    course: string;
  };
  category: 'Technical' | 'Academic' | 'Administrative' | 'Financial';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  responses: IResponse[];
}

const ResponseSchema: Schema = new Schema({
  id: { type: String, required: true, default: () => new mongoose.Types.ObjectId().toString() },
  message: { type: String, required: [true, 'Response message is required'], trim: true },
  sender: { type: String, enum: ['student', 'admin'], required: true },
  senderName: { type: String, required: [true, 'Sender name is required'], trim: true },
  timestamp: { type: String, required: true },
}, { _id: false });

const TicketSchema: Schema = new Schema({
  title: { type: String, required: [true, 'Title is required'], trim: true },
  description: { type: String, required: [true, 'Description is required'], trim: true },
  student: {
    name: { type: String, required: [true, 'Student name is required'], trim: true },
    email: { type: String, required: [true, 'Student email is required'], trim: true },
    id: { type: String, required: [true, 'Student ID is required'] },
    course: { type: String, required: [true, 'Course is required'], trim: true },
  },
  category: {
    type: String,
    enum: ['Technical', 'Academic', 'Administrative', 'Financial'],
    required: [true, 'Category is required'],
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    required: [true, 'Priority is required'],
    default: 'medium',
  },
  status: {
    type: String,
    enum: ['open', 'in-progress', 'resolved', 'closed'],
    required: [true, 'Status is required'],
    default: 'open',
  },
  createdAt: { type: String, required: true, default: () => new Date().toISOString() },
  updatedAt: { type: String, required: true, default: () => new Date().toISOString() },
  assignedTo: { type: String, default: null },
  responses: [ResponseSchema],
}, { timestamps: true });

export const Ticket = mongoose.model<ITicket>('Ticket', TicketSchema);