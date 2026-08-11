import type { CalcInput, CalcOutput, CalculatorMath } from './types';
import { numeric, checkNumber } from './utils.ts';

const LB_TO_KG = 0.45359237;

export const bmi: CalculatorMath = {
  slug: 'bmi',
  fields: [
    { id: 'weight', type: 'number', required: true, min: 1, max: 1000, step: 'any' },
    { id: 'weightUnit', type: 'radio', defaultValue: 'kg', options: [
      { value: 'kg', label: 'kg' },
      { value: 'lb', label: 'lb' },
    ] },
    { id: 'height', type: 'number', required: true, min: 50, max: 300, step: 'any' },
    { id: 'heightUnit', type: 'radio', defaultValue: 'cm', options: [
      { value: 'cm', label: 'cm' },
      { value: 'm', label: 'm' },
    ] },
  ],
  example: { weight: '75', weightUnit: 'kg', height: '175', heightUnit: 'cm' },

  validate(input: CalcInput): Record<string, string> {
    const errors: Record<string, string> = {};
    const w = checkNumber(input.weight, 1, 1000);
    if (w) errors.weight = w;
    const m = input.heightUnit === 'm';
    const h = checkNumber(input.height, m ? 0.5 : 50, m ? 3 : 300);
    if (h) errors.height = h;
    return errors;
  },

  calculate(input: CalcInput): CalcOutput {
    const rawWeight = numeric(input, 'weight');
    const rawHeight = numeric(input, 'height');
    const kg = input.weightUnit === 'lb' ? rawWeight * LB_TO_KG : rawWeight;
    const m = input.heightUnit === 'm' ? rawHeight : rawHeight / 100;
    const bmiValue = kg / (m * m);
    return {
      results: [
        { key: 'bmi', value: bmiValue, kind: 'number', hero: true },
        { key: 'healthyLow', value: 18.5 * m * m, kind: 'number' },
        { key: 'healthyHigh', value: 24.9 * m * m, kind: 'number' },
      ],
    };
  },
};

export default bmi;
