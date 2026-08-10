import type { CalcInput, CalcOutput, CalculatorMath } from './types';

const FREQ: Record<string, number> = { monthly: 12, quarterly: 4, annually: 1 };

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

export const savingsGoal: CalculatorMath = {
  slug: 'savings-goal',
  fields: [
    { id: 'target', type: 'number', required: true, min: 0, max: 1e15, step: 'any' },
    { id: 'currentSavings', type: 'number', required: true, min: 0, max: 1e15, step: 'any' },
    { id: 'annualReturn', type: 'number', required: true, min: 0, max: 100, step: 'any' },
    { id: 'years', type: 'number', required: true, min: 0.01, max: 100, step: 'any' },
    { id: 'contributionFrequency', type: 'radio', defaultValue: 'monthly', options: [
      { value: 'monthly', label: 'monthly' },
      { value: 'quarterly', label: 'quarterly' },
      { value: 'annually', label: 'annually' },
    ] },
    { id: 'currency', type: 'currency' },
  ],
  example: {
    target: '120000',
    currentSavings: '10000',
    annualReturn: '5',
    years: '10',
    contributionFrequency: 'monthly',
    currency: 'JOD',
  },

  validate(input: CalcInput): Record<string, string> {
    const errors: Record<string, string> = {};
    const check = (id: string, min: number, max: number) => {
      const e = checkNumber(input[id], min, max);
      if (e) errors[id] = e;
    };
    check('target', 0, 1e15);
    check('currentSavings', 0, 1e15);
    check('annualReturn', 0, 100);
    check('years', 0.01, 100);
    if (!input.contributionFrequency || !FREQ[input.contributionFrequency]) errors.contributionFrequency = 'invalid';
    return errors;
  },

  calculate(input: CalcInput): CalcOutput {
    const target = toNumber(input.target);
    const currentSavings = toNumber(input.currentSavings);
    const annualReturn = toNumber(input.annualReturn);
    const years = toNumber(input.years);
    const periodsPerYear = FREQ[input.contributionFrequency] ?? 12;
    const r = annualReturn / 100 / periodsPerYear;
    const n = years * periodsPerYear;

    const gap = target - currentSavings;

    let requiredPerPeriod: number;
    let totalContributed = currentSavings;
    let totalReturn = 0;

    if (gap <= 0) {
      requiredPerPeriod = 0;
      totalReturn = 0;
    } else if (r === 0) {
      requiredPerPeriod = gap / n;
      totalContributed = currentSavings + requiredPerPeriod * n;
    } else {
      const growth = Math.pow(1 + r, n);
      requiredPerPeriod = ((target - currentSavings * growth) * r) / (growth - 1);
      totalContributed = currentSavings + requiredPerPeriod * n;
      totalReturn = target - totalContributed;
    }

    const rows: (string | number)[][] = [];
    let balance = currentSavings;
    for (let y = 1; y <= Math.ceil(years); y++) {
      let cum = 0;
      for (let p = 0; p < periodsPerYear; p++) {
        balance = balance * (1 + r) + requiredPerPeriod;
        cum += requiredPerPeriod;
      }
      rows.push([y, Math.min(balance, target), currentSavings + cum, Math.min(balance, target) - (currentSavings + cum)]);
      if (balance >= target) break;
    }

    return {
      results: [
        { key: 'requiredContribution', value: requiredPerPeriod, kind: 'currency', hero: true },
        { key: 'totalContributed', value: totalContributed, kind: 'currency' },
        { key: 'estimatedReturn', value: totalReturn, kind: 'currency' },
        { key: 'completionMonths', value: n, kind: 'number' },
      ],
      table: {
        columns: ['year', 'balance', 'contributions', 'return'],
        cellKinds: ['number', 'currency', 'currency', 'currency'],
        rows,
      },
    };
  },
};

export default savingsGoal;
