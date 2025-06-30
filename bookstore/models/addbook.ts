import mongoose, { Document, Schema } from 'mongoose';

interface IBookRequest extends Document {
  name: string;
  email: string;
  mobile: string;
  bookTitle: string;
  publisher: string;
  author: string;
  classLevel: string;
  message: string;
}

const bookRequestSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  bookTitle: { type: String, required: true },
  publisher: { type: String, required: true },
  author: { type: String, required: true },
  classLevel: { type: String, required: true },
  message: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model<IBookRequest>('BookRequest', bookRequestSchema);