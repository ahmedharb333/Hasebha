import type { CalcInput, CalcOutput, CalculatorMath } from './types';
import { numeric, checkNumber } from './utils.ts';

export const bodyFat: CalculatorMath = {
  slug: 'body-fat',
  fields: [
    { id: 'sex', type: 'radio', defaultValue: 'male', options: [
      { value: 'male', label: 'male' },
      { value: 'female', label: 'female' },
    ] },
    { id: 'height', type: 'number', required: true, min: 50, max: 300, step: 'any' },
    { id: 'waist', type: 'number', required: true, min: 20, max: 400, step: 'any' },
    { id: 'neck', type: 'number', required: true, min: 10, max: 200, step: 'any' },
    { id: 'hip', type: 'number', required: true, min: 20, max: 400, step: 'any',
      showIf: { field: 'sex', values: ['female'] } },
  ],
  example: { sex: 'male', height: '180', waist: '90', neck: '40', hip: '0' },

  validate(input: CalcInput): Record<string, string> {
    const errors: Record<string, string> = {};
    const defs: [string, number, number][] = [
      ['height', 50, 300],
      ['waist', 20, 400],
      ['neck', 10, 200],
    ];
    for (const [id, min, max] of defs) {
      const e = checkNumber(input[id], min, max);
      if (e) errors[id] = e;
    }
    if (input.sex === 'female') {
      const e = checkNumber(input.hip, 20, 400);
      if (e) errors.hip = e;
    }
    return errors;
  },

  calculate(input: CalcInput): CalcOutput {
    const height = numeric(input, 'height');
    const waist = numeric(input, 'waist');
    const neck = numeric(input, 'neck');
    if (input.sex === 'female') {
      const hip = numeric(input, 'hip');
      const density = 1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.221 * Math.log10(height);
      return { results: [{ key: 'bodyFatPct', value: 495 / density - 450, kind: 'percent', hero: true }] };
    }
    const density = 1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height);
    return { results: [{ key: 'bodyFatPct', value: 495 / density - 450, kind: 'percent', hero: true }] };
  },
};

export default bodyFat;
