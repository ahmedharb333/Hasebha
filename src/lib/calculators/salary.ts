import type { CalcInput, CalcOutput, CalculatorMath } from './types';

const FREQ = ['hourly', 'daily', 'weekly', 'monthly', 'annual'] as const;
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

export const salaryConverter: CalculatorMath = {
  slug: 'salary-converter',
  fields: [
    { id: 'salaryAmount', type: 'number', required: true, min: 0.000001, max: 1e12, step: 'any' },
    { id: 'salaryFrequency', type: 'radio', defaultValue: 'monthly', options: FREQ.map((f) => ({ value: f, label: f })) },
    { id: 'daysPerWeek', type: 'number', required: true, min: 1, max: 7, step: 'any', defaultValue: '5' },
    { id: 'hoursPerDay', type: 'number', required: true, min: 1, max: 24, step: 'any', defaultValue: '8' },
    { id: 'paidWeeksPerYear', type: 'number', required: true, min: 1, max: 52, step: 'any', defaultValue: '52' },
    { id: 'unpaidLeaveDays', type: 'number', min: 0, max: 365, step: 'any', defaultValue: '0' },
    { id: 'currency', type: 'currency' },
  ],
  example: {
    salaryAmount: '1200',
    salaryFrequency: 'monthly',
    daysPerWeek: '5',
    hoursPerDay: '8',
    paidWeeksPerYear: '52',
    unpaidLeaveDays: '0',
    currency: 'JOD',
  },

  validate(input: CalcInput): Record<string, string> {
    const errors: Record<string, string> = {};
    const check = (id: string, min: number, max: number) => {
      const e = checkNumber(input[id], min, max);
      if (e) errors[id] = e;
    };
    check('salaryAmount', 0.000001, 1e12);
    check('daysPerWeek', 1, 7);
    check('hoursPerDay', 1, 24);
    check('paidWeeksPerYear', 1, 52);
    check('unpaidLeaveDays', 0, 365);
    if (!input.salaryFrequency || !(FREQ as readonly string[]).includes(input.salaryFrequency)) {
      errors.salaryFrequency = 'invalid';
    }
    return errors;
  },

  calculate(input: CalcInput): CalcOutput {
    const amount = toNumber(input.salaryAmount);
    const frequency = input.salaryFrequency as (typeof FREQ)[number];
    const daysPerWeek = toNumber(input.daysPerWeek);
    const hoursPerDay = toNumber(input.hoursPerDay);
    const paidWeeks = toNumber(input.paidWeeksPerYear);
    const unpaidDays = toNumber(input.unpaidLeaveDays);
    const workingDaysPerYear = daysPerWeek * paidWeeks;

    // Convert to annual first.
    let annual = 0;
    switch (frequency) {
      case 'hourly': annual = amount * hoursPerDay * daysPerWeek * paidWeeks; break;
      case 'daily': annual = amount * workingDaysPerYear; break;
      case 'weekly': annual = amount * paidWeeks; break;
      case 'monthly': annual = amount * MONTHS_PER_YEAR; break;
      case 'annual': annual = amount; break;
    }

    const dailyRateBase = workingDaysPerYear > 0 ? annual / workingDaysPerYear : 0;
    const effectiveAnnual = Math.max(annual - dailyRateBase * unpaidDays, 0);

    const hourly = workingDaysPerYear > 0 ? effectiveAnnual / (workingDaysPerYear * hoursPerDay) : 0;
    const daily = workingDaysPerYear > 0 ? effectiveAnnual / workingDaysPerYear : 0;
    const weekly = paidWeeks > 0 ? effectiveAnnual / paidWeeks : 0;
    const monthly = effectiveAnnual / MONTHS_PER_YEAR;

    return {
      results: [
        { key: 'hourly', value: hourly, kind: 'currency' },
        { key: 'daily', value: daily, kind: 'currency' },
        { key: 'weekly', value: weekly, kind: 'currency' },
        { key: 'monthly', value: monthly, kind: 'currency' },
        { key: 'annual', value: effectiveAnnual, kind: 'currency', hero: true },
      ],
    };
  },
};

export default salaryConverter;
