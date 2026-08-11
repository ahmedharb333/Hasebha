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
const RATE_DELTA: Record<string, number> = {
  slow: 250,
  moderate: 500,
  aggressive: 750,
};

export const calorieIntake: CalculatorMath = {
  slug: 'calorie-intake',
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
    { id: 'goal', type: 'radio', defaultValue: 'maintain', options: [
      { value: 'lose', label: 'lose' },
      { value: 'maintain', label: 'maintain' },
      { value: 'gain', label: 'gain' },
    ] },
    { id: 'rate', type: 'select', defaultValue: 'moderate', options: [
      { value: 'slow', label: 'slow' },
      { value: 'moderate', label: 'moderate' },
      { value: 'aggressive', label: 'aggressive' },
    ] },
  ],
  example: { sex: 'female', age: '25', weight: '60', weightUnit: 'kg', height: '165', heightUnit: 'cm', activity: 'moderate', goal: 'lose', rate: 'moderate' },

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
    const tdee = bmrValue * factor;
    const goal = input.goal === 'lose' || input.goal === 'gain' ? input.goal : 'maintain';
    const delta = goal === 'maintain' ? 0 : RATE_DELTA[input.rate ?? 'moderate'] ?? 500;
    const target = goal === 'gain' ? tdee + delta : tdee - delta;
    return {
      results: [
        { key: 'targetCalories', value: Math.max(target, 0), kind: 'number', hero: true },
        { key: 'bmr', value: bmrValue, kind: 'number' },
        { key: 'tdee', value: tdee, kind: 'number' },
      ],
    };
  },
};

export default calorieIntake;
