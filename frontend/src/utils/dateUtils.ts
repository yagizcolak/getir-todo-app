// src/utils/dateUtils.ts

import { startOfDay, differenceInDays } from 'date-fns';

/**
 * Calculates the remaining days until the deadline.
 * @param deadline - The deadline as an ISO date string, null, or undefined.
 * @returns A string indicating the status of the deadline.
 */
export const getRemainingDays = (deadline: string | null | undefined): string => {
    if (deadline) {
        const now = startOfDay(new Date());
        const deadlineDate = startOfDay(new Date(deadline));
        const daysLeft = differenceInDays(deadlineDate, now);

        if (daysLeft < 0) {
            return 'Overdue';
        } else if (daysLeft === 0) {
            return 'Due today';
        } else if (daysLeft <= 30) {
            return `${daysLeft} day${daysLeft > 1 ? 's' : ''} left`;
        } else {
            return 'More than 30 days left';
        }
    }
    return 'No deadline';
};