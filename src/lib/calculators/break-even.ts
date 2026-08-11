import type { CalcInput, CalcOutput, CalculatorMath } from './types';
import { numeric, checkNumber } from './utils.ts';

export const breakEven: CalculatorMath = {
  slug: 'break-even',
  fields: [
    { id: 'fixedCosts', type: 'number', required: true, min: 0, max: 1e15, step: 'any' },
    { id: 'unitPrice', type: 'number', required: true, min: 1, max: 1e15, step: 'any' },
    { id: 'unitVariableCost', type: 'number', required: true, min: 0, max: 1e15, step: 'any' },
  ],
  example: { fixedCosts: '10000', unitPrice: '50', unitVariableCost: '30' },

  validate(input: CalcInput): Record<string, string> {
    const errors: Record<string, string> = {};
    const defs: [string, number, number][] = [
      ['fixedCosts', 0, 1e15],
      ['unitPrice', 1, 1e15],
      ['unitVariableCost', 0, 1e15],
    ];
    for (const [id, min, max] of defs) {
      const e = checkNumber(input[id], min, max);
      if (e) errors[id] = e;
    }
    if (!errors.unitPrice && !errors.unitVariableCost) {
      const price = Number(input.unitPrice);
      const vc = Number(input.unitVariableCost);
      if (price <= vc) errors.unitPrice = 'invalid';
    }
    return errors;
  },

  calculate(input: CalcInput): CalcOutput {
    const fixed = numeric(input, 'fixedCosts');
    const price = numeric(input, 'unitPrice');
    const vc = numeric(input, 'unitVariableCost');
    const contribution = price - vc;
    if (contribution <= 0) throw new Error('contribution margin must be positive');
    const units = fixed / contribution;
    return {
      results: [
        { key: 'breakEvenUnits', value: units, kind: 'number', hero: true },
        { key: 'breakEvenRevenue', value: units * price, kind: 'currency' },
        { key: 'contributionMargin', value: contribution, kind: 'currency' },
      ],
    };
  },
};

export default breakEven;
