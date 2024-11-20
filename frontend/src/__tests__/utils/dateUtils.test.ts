import { getRemainingDays } from '../../utils/dateUtils';

describe('getRemainingDays', () => {
    it('returns "No deadline" when deadline is null or undefined', () => {
        expect(getRemainingDays(null)).toBe('No deadline');
        expect(getRemainingDays(undefined)).toBe('No deadline');
    });

    it('returns "Overdue" when the deadline is in the past', () => {
        const pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - 1);
        expect(getRemainingDays(pastDate.toISOString())).toBe('Overdue');
    });

    it('returns "Due today" when the deadline is today', () => {
        const today = new Date();
        expect(getRemainingDays(today.toISOString())).toBe('Due today');
    });

    it('returns correct days left when the deadline is within 30 days', () => {
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 5);
        expect(getRemainingDays(futureDate.toISOString())).toBe('5 days left');
    });

    it('returns "More than 30 days left" when the deadline is over 30 days away', () => {
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + 31);
        expect(getRemainingDays(futureDate.toISOString())).toBe('More than 30 days left');
    });
});