import type { CalcInput, CalcOutput, CalculatorMath } from './types';
import { numeric, checkNumber } from './utils.ts';

export const debtToIncome: CalculatorMath = {
  slug: 'debt-to-income',
  fields: [
    { id: 'monthlyDebt', type: 'number', required: true, min: 0, max: 1e15, step: 'any' },
    { id: 'grossIncome', type: 'number', required: true, min: 0, max: 1e15, step: 'any' },
    { id: 'currency', type: 'currency' },
  ],
  example: {
    monthlyDebt: '400',
    grossIncome: '2000',
    currency: 'JOD',
  },

  validate(input: CalcInput): Record<string, string> {
    const errors: Record<string, string> = {};
    const debtErr = checkNumber(input.monthlyDebt, 0, 1e15);
    if (debtErr) errors.monthlyDebt = debtErr;
    const incomeErr = checkNumber(input.grossIncome, 0, 1e15);
    if (incomeErr) errors.grossIncome = incomeErr;
    if (!errors.grossIncome && Number(input.grossIncome) === 0) errors.grossIncome = 'min';
    return errors;
  },

  calculate(input: CalcInput): CalcOutput {
    const debt = numeric(input, 'monthlyDebt');
    const income = numeric(input, 'grossIncome');
    if (income <= 0) throw new Error('gross income must be positive');
    const dti = (debt / income) * 100;
    return {
      results: [
        { key: 'dtiRatio', value: dti, kind: 'percent', hero: true },
        { key: 'remainingIncome', value: income - debt, kind: 'currency' },
      ],
    };
  },
};

export default debtToIncome;
