import type { CalcInput, CalcOutput, CalculatorMath } from './types';
import { numeric, checkNumber } from './utils.ts';

const LB_TO_KG = 0.45359237;
const ACTIVITY_FACTORS: Record<string, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  'very-active': 1.9,
};

export const bmr: CalculatorMath = {
  slug: 'bmr',
  fields: [
    { id: 'sex', type: 'radio', defaultValue: 'male', options: [
      { value: 'male', label: 'male' },
      { value: 'female', label: 'female' },
    ] },
    { id: 'age', type: 'number', required: true, min: 1, max: 120, step: 'any' },
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
    { id: 'activity', type: 'select', defaultValue: 'moderate', options: [
      { value: 'sedentary', label: 'sedentary' },
      { value: 'light', label: 'light' },
      { value: 'moderate', label: 'moderate' },
      { value: 'active', label: 'active' },
      { value: 'very-active', label: 'very-active' },
    ] },
  ],
  example: { sex: 'male', age: '30', weight: '80', weightUnit: 'kg', height: '180', heightUnit: 'cm', activity: 'moderate' },

  validate(input: CalcInput): Record<string, string> {
    const errors: Record<string, string> = {};
    const ageErr = checkNumber(input.age, 1, 120);
    if (ageErr) errors.age = ageErr;
    const w = checkNumber(input.weight, 1, 1000);
    if (w) errors.weight = w;
    const m = input.heightUnit === 'm';
    const h = checkNumber(input.height, m ? 0.5 : 50, m ? 3 : 300);
    if (h) errors.height = h;
    return errors;
  },

  calculate(input: CalcInput): CalcOutput {
    const age = numeric(input, 'age');
    const rawWeight = numeric(input, 'weight');
    const rawHeight = numeric(input, 'height');
    const kg = input.weightUnit === 'lb' ? rawWeight * LB_TO_KG : rawWeight;
    const cm = input.heightUnit === 'm' ? rawHeight * 100 : rawHeight;
    const sex = input.sex === 'female' ? 'female' : 'male';
    const bmrValue = 10 * kg + 6.25 * cm - 5 * age + (sex === 'male' ? 5 : -161);
    const factor = ACTIVITY_FACTORS[input.activity ?? 'moderate'] ?? 1.55;
    return {
      results: [
        { key: 'bmr', value: bmrValue, kind: 'number', hero: true },
        { key: 'tdee', value: bmrValue * factor, kind: 'number' },
      ],
    };
  },
};

export default bmr;
