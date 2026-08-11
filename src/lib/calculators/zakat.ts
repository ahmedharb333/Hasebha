import type { CalcInput, CalcOutput, CalculatorMath } from './types';
import { numeric, optionalNumeric, checkNumber } from './utils.ts';

export const zakat: CalculatorMath = {
  slug: 'zakat',
  fields: [
    { id: 'cashSavings', type: 'number', required: true, min: 0, max: 1e15, step: 'any' },
    { id: 'goldValue', type: 'number', min: 0, max: 1e15, step: 'any' },
    { id: 'investments', type: 'number', min: 0, max: 1e15, step: 'any' },
    { id: 'debts', type: 'number', min: 0, max: 1e15, step: 'any' },
    { id: 'nisab', type: 'number', min: 0, max: 1e15, step: 'any' },
    { id: 'currency', type: 'currency' },
  ],
  example: {
    cashSavings: '10000',
    goldValue: '5000',
    investments: '2000',
    debts: '1000',
    nisab: '860',
    currency: 'JOD',
  },

  validate(input: CalcInput): Record<string, string> {
    const errors: Record<string, string> = {};
    const defs: [string, number, number][] = [
      ['cashSavings', 0, 1e15],
      ['goldValue', 0, 1e15],
      ['investments', 0, 1e15],
      ['debts', 0, 1e15],
      ['nisab', 0, 1e15],
    ];
    for (const [id, min, max] of defs) {
      const e = checkNumber(input[id], min, max);
      if (e) errors[id] = e;
    }
    return errors;
  },

  calculate(input: CalcInput): CalcOutput {
    const cash = numeric(input, 'cashSavings');
    const gold = optionalNumeric(input, 'goldValue', 0);
    const investments = optionalNumeric(input, 'investments', 0);
    const debts = optionalNumeric(input, 'debts', 0);
    const base = Math.max(cash + gold + investments - debts, 0);
    const zakatDue = base * 0.025;
    return {
      results: [
        { key: 'zakatBase', value: base, kind: 'currency' },
        { key: 'zakatDue', value: zakatDue, kind: 'currency', hero: true },
      ],
    };
  },
};

export default zakat;
