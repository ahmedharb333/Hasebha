import type { CalcInput, CalcOutput, CalculatorMath } from './types';
import { numeric, optionalNumeric, checkNumber, monthlyPayment } from './utils.ts';

const MONTHS_PER_YEAR = 12;

export const loanComparison: CalculatorMath = {
  slug: 'loan-comparison',
  fields: [
    { id: 'principal', type: 'number', required: true, min: 0, max: 1e15, step: 'any' },
    { id: 'rateA', type: 'number', required: true, min: 0, max: 100, step: 'any' },
    { id: 'rateB', type: 'number', required: true, min: 0, max: 100, step: 'any' },
    { id: 'termA', type: 'number', required: true, min: 0.001, max: 100, step: 'any' },
    { id: 'termB', type: 'number', required: true, min: 0.001, max: 100, step: 'any' },
    { id: 'termUnit', type: 'radio', defaultValue: 'years', options: [
      { value: 'months', label: 'months' },
      { value: 'years', label: 'years' },
    ] },
    { id: 'feesA', type: 'number', min: 0, max: 1e15, step: 'any' },
    { id: 'feesB', type: 'number', min: 0, max: 1e15, step: 'any' },
    { id: 'currency', type: 'currency' },
  ],
  example: {
    principal: '50000',
    rateA: '6',
    rateB: '7.5',
    termA: '5',
    termB: '5',
    termUnit: 'years',
    feesA: '300',
    feesB: '0',
    currency: 'JOD',
  },

  validate(input: CalcInput): Record<string, string> {
    const errors: Record<string, string> = {};
    const defs: [string, number, number][] = [
      ['principal', 0, 1e15],
      ['rateA', 0, 100],
      ['rateB', 0, 100],
      ['termA', 0.000001, 100],
      ['termB', 0.000001, 100],
      ['feesA', 0, 1e15],
      ['feesB', 0, 1e15],
    ];
    for (const [id, min, max] of defs) {
      const e = checkNumber(input[id], min, max);
      if (e) errors[id] = e;
    }
    return errors;
  },

  calculate(input: CalcInput): CalcOutput {
    const principal = numeric(input, 'principal');
    const termUnit = input.termUnit;
    const months = (value: number) => (termUnit === 'months' ? value : value * MONTHS_PER_YEAR);
    const monthly = (ratePct: number, termValue: number) =>
      monthlyPayment(principal, ratePct / 100 / MONTHS_PER_YEAR, months(termValue));

    const mA = monthly(numeric(input, 'rateA'), numeric(input, 'termA'));
    const mB = monthly(numeric(input, 'rateB'), numeric(input, 'termB'));
    const nA = months(numeric(input, 'termA'));
    const nB = months(numeric(input, 'termB'));
    const interestA = mA * nA - principal;
    const interestB = mB * nB - principal;
    const feesA = optionalNumeric(input, 'feesA', 0);
    const feesB = optionalNumeric(input, 'feesB', 0);
    const costA = mA * nA + feesA;
    const costB = mB * nB + feesB;

    return {
      results: [
        { key: 'monthlyA', value: mA, kind: 'currency', hero: true },
        { key: 'monthlyB', value: mB, kind: 'currency' },
        { key: 'totalInterestA', value: interestA, kind: 'currency' },
        { key: 'totalInterestB', value: interestB, kind: 'currency' },
        { key: 'totalCostA', value: costA, kind: 'currency' },
        { key: 'totalCostB', value: costB, kind: 'currency' },
        { key: 'diffTotalCost', value: costA - costB, kind: 'currency' },
      ],
    };
  },
};

export default loanComparison;
