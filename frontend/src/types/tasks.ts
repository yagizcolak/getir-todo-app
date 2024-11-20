import { TaskStatus, TaskCategory } from '../constants';

export interface Task {
  _id: string;
  title: string;
  status: TaskStatus;
  category: TaskCategory;
  deadline?: string | null; // ISO date string
  createdAt: string;
}

export interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}