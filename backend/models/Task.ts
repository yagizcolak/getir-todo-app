// models/Task.ts

import { Schema, model, Document } from 'mongoose';

// Define allowed statuses for tasks
const allowedStatuses = ['pending', 'in-progress', 'completed'];
const allowedCategories = ['Work', 'Health & Wellbeing', 'Home & Maintenance', 'Other'];

export type TaskStatus = 'pending' | 'in-progress' | 'completed';
export type TaskCategory = 'Work' | 'Health & Wellbeing' | 'Home & Maintenance' | 'Other';

/**
 * Interface representing a Task document in MongoDB.
 */
export interface ITask extends Document {
  title: string;
  status: TaskStatus;
  category: TaskCategory;
  deadline?: Date | null;
  createdAt: Date;
}

const TaskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  status: {
    type: String,
    enum: allowedStatuses, // Ensures the status is one of the allowed values
    default: 'pending',
  },
  category: {
    type: String,
    enum: allowedCategories,
    default: 'Work',
  },
  deadline: { type: Date, default: null, required: false },
  createdAt: { type: Date, default: Date.now }, // Automatically sets the creation date
});

export default model<ITask>('Task', TaskSchema);