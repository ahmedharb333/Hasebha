import type { CalcInput, CalcOutput, CalculatorMath } from './types';
import { numeric, checkNumber } from './utils.ts';

export const markupMargin: CalculatorMath = {
  slug: 'markup-margin',
  fields: [
    { id: 'cost', type: 'number', required: true, min: 1, max: 1e15, step: 'any' },
    { id: 'sellingPrice', type: 'number', required: true, min: 1, max: 1e15, step: 'any' },
  ],
  example: { cost: '80', sellingPrice: '120' },

  validate(input: CalcInput): Record<string, string> {
    const errors: Record<string, string> = {};
    const c = checkNumber(input.cost, 1, 1e15);
    if (c) errors.cost = c;
    const p = checkNumber(input.sellingPrice, 1, 1e15);
    if (p) errors.sellingPrice = p;
    return errors;
  },

  calculate(input: CalcInput): CalcOutput {
    const cost = numeric(input, 'cost');
    const price = numeric(input, 'sellingPrice');
    const profit = price - cost;
    const markup = (profit / cost) * 100;
    const margin = (profit / price) * 100;
    return {
      results: [
        { key: 'profit', value: profit, kind: 'currency', hero: true },
        { key: 'markupPct', value: markup, kind: 'percent' },
        { key: 'marginPct', value: margin, kind: 'percent' },
      ],
    };
  },
};

export default markupMargin;
