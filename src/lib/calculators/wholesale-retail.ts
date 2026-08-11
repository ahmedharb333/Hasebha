import type { CalcInput, CalcOutput, CalculatorMath } from './types';
import { numeric, checkNumber } from './utils.ts';

export const wholesaleRetail: CalculatorMath = {
  slug: 'wholesale-retail',
  fields: [
    { id: 'cost', type: 'number', required: true, min: 0, max: 1e15, step: 'any' },
    { id: 'markupPct', type: 'number', required: true, min: 0, max: 1000, step: 'any' },
  ],
  example: { cost: '15', markupPct: '60' },

  validate(input: CalcInput): Record<string, string> {
    const errors: Record<string, string> = {};
    const c = checkNumber(input.cost, 0, 1e15);
    if (c) errors.cost = c;
    const m = checkNumber(input.markupPct, 0, 1000);
    if (m) errors.markupPct = m;
    return errors;
  },

  calculate(input: CalcInput): CalcOutput {
    const cost = numeric(input, 'cost');
    const markupPct = numeric(input, 'markupPct');
    const selling = cost * (1 + markupPct / 100);
    return {
      results: [
        { key: 'sellingPrice', value: selling, kind: 'currency', hero: true },
        { key: 'profit', value: selling - cost, kind: 'currency' },
      ],
    };
  },
};

export default wholesaleRetail;
