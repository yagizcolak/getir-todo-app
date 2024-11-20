// src/constants/tasks.ts

// Status Icons
import PendingIcon from '@mui/icons-material/HourglassEmpty';
import InProgressIcon from '@mui/icons-material/Autorenew';
import CompletedIcon from '@mui/icons-material/CheckCircle';
import { SvgIconComponent } from '@mui/icons-material';

// Task Categories
export const TASK_CATEGORIES = [
    'Work',
    'Health & Wellbeing',
    'Home & Maintenance',
    'Other',
] as const;

export type TaskCategory = typeof TASK_CATEGORIES[number];

// Task Statuses
export const TASK_STATUSES = ['pending', 'in-progress', 'completed'] as const;

export type TaskStatus = typeof TASK_STATUSES[number];

// Status Colors
export const STATUS_COLORS: Record<TaskStatus, string> = {
    pending: 'rgba(244, 187, 68, 0.3)',
    'in-progress': 'rgba(167, 199, 231, 0.45)',
    completed: 'rgba(159, 226, 191, 0.6)',
};

export const STATUS_ICONS: Record<TaskStatus, SvgIconComponent> = {
    pending: PendingIcon,
    'in-progress': InProgressIcon,
    completed: CompletedIcon,
};