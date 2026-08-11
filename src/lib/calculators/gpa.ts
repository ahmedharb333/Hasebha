import type { CalcInput, CalcOutput, CalculatorMath, CalcFieldDef } from './types';
import { numeric, checkNumber } from './utils.ts';

const SCALE_4: Record<string, number> = {
  'A+': 4.0, A: 4.0, 'A-': 3.7, 'B+': 3.3, B: 3.0, 'B-': 2.7,
  'C+': 2.3, C: 2.0, 'C-': 1.7, 'D+': 1.3, D: 1.0, 'D-': 0.7, F: 0.0,
};
const SCALE_5: Record<string, number> = {
  'A+': 5.0, A: 5.0, 'A-': 4.7, 'B+': 4.3, B: 4.0, 'B-': 3.7,
  'C+': 3.3, C: 3.0, 'C-': 2.7, 'D+': 2.3, D: 2.0, 'D-': 1.7, F: 0.0,
};

const SLOTS = 6;
const GRADE_OPTIONS = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F'];
const gradeOptions = GRADE_OPTIONS.map((value) => ({ value, label: value }));

const fields: CalcFieldDef[] = [
  { id: 'scale', type: 'select', defaultValue: '4', options: [
    { value: '4', label: '4' },
    { value: '5', label: '5' },
  ] },
];
for (let i = 0; i < SLOTS; i++) {
  fields.push({ id: `grade${i}`, type: 'select', options: gradeOptions });
  fields.push({ id: `credits${i}`, type: 'number', min: 0.5, max: 20, step: 'any' });
}

export const gpa: CalculatorMath = {
  slug: 'gpa',
  fields,
  example: {
    scale: '4',
    grade0: 'A', credits0: '3',
    grade1: 'B', credits1: '4',
    grade2: 'A-', credits2: '3',
    grade3: 'C', credits3: '2',
  },

  validate(input: CalcInput): Record<string, string> {
    const errors: Record<string, string> = {};
    let anyRow = false;
    for (let i = 0; i < SLOTS; i++) {
      const grade = input[`grade${i}`];
      const credits = input[`credits${i}`];
      if ((grade ?? '') === '' && (credits ?? '') === '') continue;
      anyRow = true;
      if ((grade ?? '') === '') errors[`grade${i}`] = 'required';
      if ((credits ?? '') === '') {
        errors[`credits${i}`] = 'required';
      } else {
        const e = checkNumber(credits, 0.5, 20);
        if (e) errors[`credits${i}`] = e;
      }
    }
    if (!anyRow) errors.grade0 = 'required';
    return errors;
  },

  calculate(input: CalcInput): CalcOutput {
    const scale = input.scale === '5' ? SCALE_5 : SCALE_4;
    let totalPoints = 0;
    let totalCredits = 0;
    for (let i = 0; i < SLOTS; i++) {
      const grade = input[`grade${i}`];
      const rawCredits = input[`credits${i}`];
      if (!grade || rawCredits === undefined || rawCredits === '') continue;
      const credits = numeric(input, `credits${i}`);
      totalPoints += (scale[grade] ?? 0) * credits;
      totalCredits += credits;
    }
    const gpaValue = totalCredits > 0 ? totalPoints / totalCredits : 0;
    return {
      results: [
        { key: 'gpa', value: gpaValue, kind: 'number', hero: true },
        { key: 'totalCredits', value: totalCredits, kind: 'number' },
        { key: 'totalPoints', value: totalPoints, kind: 'number' },
      ],
    };
  },
};

export default gpa;
