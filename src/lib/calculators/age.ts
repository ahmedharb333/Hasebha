import type { CalcInput, CalcOutput, CalculatorMath } from './types';
import { parseIso, todayIso, daysBetween, calendarDiff } from './utils.ts';

function nextBirthday(birth: Date, asOf: Date): Date {
  let next = new Date(asOf.getFullYear(), birth.getMonth(), birth.getDate());
  if (next.getTime() < asOf.getTime()) next = new Date(asOf.getFullYear() + 1, birth.getMonth(), birth.getDate());
  return next;
}

export const age: CalculatorMath = {
  slug: 'age',
  fields: [
    { id: 'birthDate', type: 'date', required: true },
    { id: 'asOfDate', type: 'date' },
  ],
  example: { birthDate: '2000-01-01', asOfDate: '2024-01-01' },

  validate(input: CalcInput): Record<string, string> {
    const errors: Record<string, string> = {};
    const birth = parseIso(input.birthDate);
    if (!birth) {
      errors.birthDate = input.birthDate ? 'invalid' : 'required';
      return errors;
    }
    const asOfRaw = (input.asOfDate ?? '').trim() || todayIso();
    const asOf = parseIso(asOfRaw);
    if (!asOf) {
      errors.asOfDate = 'invalid';
      return errors;
    }
    if (birth.getTime() > asOf.getTime()) errors.birthDate = 'max';
    return errors;
  },

  calculate(input: CalcInput): CalcOutput {
    const birth = parseIso(input.birthDate)!;
    const asOf = parseIso((input.asOfDate ?? '').trim() || todayIso())!;
    const totalDays = daysBetween(birth, asOf);
    const { years, months } = calendarDiff(birth, asOf);
    const next = nextBirthday(birth, asOf);
    return {
      results: [
        { key: 'ageYears', value: years, kind: 'number', hero: true },
        { key: 'totalMonths', value: years * 12 + months, kind: 'number' },
        { key: 'totalDays', value: totalDays, kind: 'number' },
        { key: 'totalWeeks', value: Math.floor(totalDays / 7), kind: 'number' },
        { key: 'daysUntilNextBirthday', value: daysBetween(asOf, next), kind: 'number' },
      ],
    };
  },
};

export default age;
