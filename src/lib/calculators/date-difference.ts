import type { CalcInput, CalcOutput, CalculatorMath } from './types';
import { parseIso, daysBetween, calendarDiff } from './utils.ts';

export const dateDifference: CalculatorMath = {
  slug: 'date-difference',
  fields: [
    { id: 'startDate', type: 'date', required: true },
    { id: 'endDate', type: 'date', required: true },
  ],
  example: { startDate: '2020-01-01', endDate: '2024-01-01' },

  validate(input: CalcInput): Record<string, string> {
    const errors: Record<string, string> = {};
    const start = parseIso(input.startDate);
    if (!start) {
      errors.startDate = input.startDate ? 'invalid' : 'required';
      return errors;
    }
    const end = parseIso(input.endDate);
    if (!end) {
      errors.endDate = input.endDate ? 'invalid' : 'required';
      return errors;
    }
    if (end.getTime() < start.getTime()) errors.endDate = 'max';
    return errors;
  },

  calculate(input: CalcInput): CalcOutput {
    const start = parseIso(input.startDate)!;
    const end = parseIso(input.endDate)!;
    const totalDays = daysBetween(start, end);
    const { years, months, days } = calendarDiff(start, end);
    return {
      results: [
        { key: 'years', value: years, kind: 'number', hero: true },
        { key: 'months', value: months, kind: 'number' },
        { key: 'days', value: days, kind: 'number' },
        { key: 'totalDays', value: totalDays, kind: 'number' },
        { key: 'totalWeeks', value: Math.floor(totalDays / 7), kind: 'number' },
      ],
    };
  },
};

export default dateDifference;
