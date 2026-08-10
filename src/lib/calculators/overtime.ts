import type { CalcInput, CalcOutput, CalculatorMath } from './types';

const MULTIPLIERS = ['1.0', '1.25', '1.5', '2.0', 'custom'] as const;
const WEEKS_PER_YEAR = 52;
const MONTHS_PER_YEAR = 12;

function toNumber(raw: string | undefined): number {
  if (raw === undefined || raw === null || raw === '') return NaN;
  return Number(raw);
}

function checkNumber(raw: string | undefined, min: number, max: number): string | null {
  if (raw === undefined || raw === '') return 'required';
  const v = toNumber(raw);
  if (!Number.isFinite(v)) return 'invalid';
  if (v < min) return 'min';
  if (v > max) return 'max';
  return null;
}

export const overtimePay: CalculatorMath = {
  slug: 'overtime-pay',
  fields: [
    { id: 'basis', type: 'radio', defaultValue: 'monthly', options: [
      { value: 'monthly', label: 'monthly' },
      { value: 'hourly', label: 'hourly' },
    ] },
    { id: 'monthlySalary', type: 'number', min: 0, max: 1e12, step: 'any', showIf: { field: 'basis', values: ['monthly'] } },
    { id: 'hourlyRate', type: 'number', min: 0, max: 1e9, step: 'any', showIf: { field: 'basis', values: ['hourly'] } },
    { id: 'weeklyHours', type: 'number', required: true, min: 1, max: 168, step: 'any', defaultValue: '40' },
    { id: 'overtimeHours', type: 'number', required: true, min: 0, max: 168, step: 'any', defaultValue: '0' },
    { id: 'multiplier', type: 'radio', defaultValue: '1.5', options: MULTIPLIERS.map((m) => ({ value: m, label: m })) },
    { id: 'customMultiplier', type: 'number', min: 1, max: 5, step: 'any', showIf: { field: 'multiplier', values: ['custom'] } },
    { id: 'currency', type: 'currency' },
  ],
  example: {
    basis: 'monthly',
    monthlySalary: '1000',
    hourlyRate: '',
    weeklyHours: '40',
    overtimeHours: '6',
    multiplier: '1.5',
    customMultiplier: '',
    currency: 'JOD',
  },

  validate(input: CalcInput): Record<string, string> {
    const errors: Record<string, string> = {};
    if (input.basis === 'monthly') {
      const e = checkNumber(input.monthlySalary, 0.000001, 1e12);
      if (e) errors.monthlySalary = e;
    } else if (input.basis === 'hourly') {
      const e = checkNumber(input.hourlyRate, 0.000001, 1e9);
      if (e) errors.hourlyRate = e;
    } else {
      errors.basis = 'invalid';
    }

    const hoursErr = checkNumber(input.weeklyHours, 1, 168);
    if (hoursErr) errors.weeklyHours = hoursErr;
    const otErr = checkNumber(input.overtimeHours, 0, 168);
    if (otErr) errors.overtimeHours = otErr;

    if (!input.multiplier || !(MULTIPLIERS as readonly string[]).includes(input.multiplier)) {
      errors.multiplier = 'invalid';
    } else if (input.multiplier === 'custom') {
      const e = checkNumber(input.customMultiplier, 1, 5);
      if (e) errors.customMultiplier = e;
    }
    return errors;
  },

  calculate(input: CalcInput): CalcOutput {
    const weeklyHours = toNumber(input.weeklyHours);
    const overtimeHours = toNumber(input.overtimeHours);
    const multiplier = input.multiplier === 'custom' ? toNumber(input.customMultiplier) : Number(input.multiplier);

    let baseHourly: number;
    if (input.basis === 'monthly') {
      const monthly = toNumber(input.monthlySalary);
      baseHourly = monthly * MONTHS_PER_YEAR / (WEEKS_PER_YEAR * weeklyHours);
    } else {
      baseHourly = toNumber(input.hourlyRate);
    }

    const overtimeRate = baseHourly * multiplier;
    const baseWeekly = baseHourly * weeklyHours;
    const overtimeWeekly = overtimeRate * overtimeHours;
    const totalWeekly = baseWeekly + overtimeWeekly;

    return {
      results: [
        { key: 'baseHourly', value: baseHourly, kind: 'currency' },
        { key: 'overtimeRate', value: overtimeRate, kind: 'currency' },
        { key: 'overtimeEarnings', value: overtimeWeekly, kind: 'currency', hero: true },
        { key: 'totalEarnings', value: totalWeekly, kind: 'currency' },
      ],
    };
  },
};

export default overtimePay;
