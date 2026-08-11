import type { CalcInput, CalcOutput, CalculatorMath } from './types';
import { numeric, checkNumber } from './utils.ts';

export const retirementSavings: CalculatorMath = {
  slug: 'retirement-savings',
  fields: [
    { id: 'currentSavings', type: 'number', required: true, min: 0, max: 1e15, step: 'any' },
    { id: 'monthlyContribution', type: 'number', required: true, min: 0, max: 1e15, step: 'any' },
    { id: 'annualReturn', type: 'number', required: true, min: 0, max: 100, step: 'any' },
    { id: 'years', type: 'number', required: true, min: 1, max: 100, step: 'any' },
    { id: 'currency', type: 'currency' },
  ],
  example: {
    currentSavings: '10000',
    monthlyContribution: '200',
    annualReturn: '6',
    years: '20',
    currency: 'JOD',
  },

  validate(input: CalcInput): Record<string, string> {
    const errors: Record<string, string> = {};
    const defs: [string, number, number][] = [
      ['currentSavings', 0, 1e15],
      ['monthlyContribution', 0, 1e15],
      ['annualReturn', 0, 100],
      ['years', 1, 100],
    ];
    for (const [id, min, max] of defs) {
      const e = checkNumber(input[id], min, max);
      if (e) errors[id] = e;
    }
    return errors;
  },

  calculate(input: CalcInput): CalcOutput {
    const current = numeric(input, 'currentSavings');
    const monthly = numeric(input, 'monthlyContribution');
    const ratePct = numeric(input, 'annualReturn');
    const years = numeric(input, 'years');
    const n = Math.round(years * 12);
    const r = ratePct / 100 / 12;
    let finalBalance: number;
    if (r === 0) {
      finalBalance = current + monthly * n;
    } else {
      const growth = Math.pow(1 + r, n);
      finalBalance = current * growth + monthly * ((growth - 1) / r);
    }
    const totalContributions = current + monthly * n;
    return {
      results: [
        { key: 'finalBalance', value: finalBalance, kind: 'currency', hero: true },
        { key: 'totalContributions', value: totalContributions, kind: 'currency' },
        { key: 'totalInterestEarned', value: finalBalance - totalContributions, kind: 'currency' },
      ],
    };
  },
};

export default retirementSavings;
