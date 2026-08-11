import type { CalcInput, CalcOutput, CalculatorMath } from './types';
import { numeric, checkNumber } from './utils.ts';

export const tip: CalculatorMath = {
  slug: 'tip',
  fields: [
    { id: 'billAmount', type: 'number', required: true, min: 0, max: 1e15, step: 'any' },
    { id: 'tipPercent', type: 'number', required: true, min: 0, max: 100, step: 'any' },
    { id: 'people', type: 'number', min: 1, max: 100, step: 'any', defaultValue: '1' },
    { id: 'currency', type: 'currency' },
  ],
  example: { billAmount: '120', tipPercent: '10', people: '4', currency: 'JOD' },

  validate(input: CalcInput): Record<string, string> {
    const errors: Record<string, string> = {};
    for (const [id, min, max] of [
      ['billAmount', 0, 1e15],
      ['tipPercent', 0, 100],
    ] as [string, number, number][]) {
      const e = checkNumber(input[id], min, max);
      if (e) errors[id] = e;
    }
    if ((input.people ?? '') !== '') {
      const e = checkNumber(input.people, 1, 100);
      if (e) errors.people = e;
    }
    return errors;
  },

  calculate(input: CalcInput): CalcOutput {
    const bill = numeric(input, 'billAmount');
    const pct = numeric(input, 'tipPercent');
    const peopleRaw = input.people ?? '';
    const people = Math.max(1, Math.floor(peopleRaw === '' ? 1 : numeric(input, 'people')));
    const tipAmount = (bill * pct) / 100;
    const total = bill + tipAmount;
    return {
      results: [
        { key: 'tipAmount', value: tipAmount, kind: 'currency', hero: true },
        { key: 'totalWithTip', value: total, kind: 'currency' },
        { key: 'perPerson', value: total / people, kind: 'currency' },
      ],
    };
  },
};

export default tip;
