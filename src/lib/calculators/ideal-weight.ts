import type { CalcInput, CalcOutput, CalculatorMath } from './types';
import { numeric, checkNumber } from './utils.ts';

export const idealWeight: CalculatorMath = {
  slug: 'ideal-weight',
  fields: [
    { id: 'height', type: 'number', required: true, min: 50, max: 300, step: 'any' },
    { id: 'heightUnit', type: 'radio', defaultValue: 'cm', options: [
      { value: 'cm', label: 'cm' },
      { value: 'm', label: 'm' },
    ] },
  ],
  example: { height: '175', heightUnit: 'cm' },

  validate(input: CalcInput): Record<string, string> {
    const errors: Record<string, string> = {};
    const m = input.heightUnit === 'm';
    const h = checkNumber(input.height, m ? 0.5 : 50, m ? 3 : 300);
    if (h) errors.height = h;
    return errors;
  },

  calculate(input: CalcInput): CalcOutput {
    const rawHeight = numeric(input, 'height');
    const m = input.heightUnit === 'm' ? rawHeight : rawHeight / 100;
    const low = 18.5 * m * m;
    const high = 24.9 * m * m;
    return {
      results: [
        { key: 'healthyLow', value: low, kind: 'number', hero: true },
        { key: 'healthyHigh', value: high, kind: 'number' },
        { key: 'midRange', value: (low + high) / 2, kind: 'number' },
      ],
    };
  },
};

export default idealWeight;
