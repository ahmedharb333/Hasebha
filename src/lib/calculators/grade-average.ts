import type { CalcInput, CalcOutput, CalculatorMath, CalcFieldDef } from './types';
import { numeric, checkNumber } from './utils.ts';

const SLOTS = 6;

const fields: CalcFieldDef[] = [];
for (let i = 0; i < SLOTS; i++) {
  fields.push({ id: `grade${i}`, type: 'number', min: 0, max: 100, step: 'any' });
}

export const gradeAverage: CalculatorMath = {
  slug: 'grade-average',
  fields,
  example: { grade0: '85', grade1: '92', grade2: '78', grade3: '88' },

  validate(input: CalcInput): Record<string, string> {
    const errors: Record<string, string> = {};
    let any = false;
    for (let i = 0; i < SLOTS; i++) {
      const raw = input[`grade${i}`];
      if (raw === undefined || raw === '') continue;
      any = true;
      const e = checkNumber(raw, 0, 100);
      if (e) errors[`grade${i}`] = e;
    }
    if (!any) errors.grade0 = 'required';
    return errors;
  },

  calculate(input: CalcInput): CalcOutput {
    const values: number[] = [];
    for (let i = 0; i < SLOTS; i++) {
      const raw = input[`grade${i}`];
      if (raw === undefined || raw === '') continue;
      values.push(numeric(input, `grade${i}`));
    }
    const sum = values.reduce((a, b) => a + b, 0);
    const average = values.length > 0 ? sum / values.length : 0;
    return {
      results: [
        { key: 'average', value: average, kind: 'number', hero: true },
        { key: 'count', value: values.length, kind: 'number' },
        { key: 'highest', value: values.length ? Math.max(...values) : 0, kind: 'number' },
        { key: 'lowest', value: values.length ? Math.min(...values) : 0, kind: 'number' },
      ],
    };
  },
};

export default gradeAverage;
