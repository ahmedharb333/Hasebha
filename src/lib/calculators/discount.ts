import type { CalcInput, CalcOutput, CalculatorMath } from './types';

const MODES = ['afterDiscount', 'discountAmount', 'percentIncrease', 'percentDecrease', 'percentDifference', 'originalPrice'] as const;

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

export const discountPercentage: CalculatorMath = {
  slug: 'discount-percentage',
  fields: [
    { id: 'mode', type: 'radio', defaultValue: 'afterDiscount', options: MODES.map((m) => ({ value: m, label: m })) },
    // Original price (afterDiscount / discountAmount)
    { id: 'original', type: 'number', min: 0, max: 1e15, step: 'any', showIf: { field: 'mode', values: ['afterDiscount', 'discountAmount'] } },
    { id: 'discountPct', type: 'number', min: 0, max: 100, step: 'any', showIf: { field: 'mode', values: ['afterDiscount'] } },
    { id: 'discountAmount2', type: 'number', min: 0, max: 1e15, step: 'any', showIf: { field: 'mode', values: ['discountAmount'] } },
    { id: 'valueA', type: 'number', min: 0, max: 1e15, step: 'any', showIf: { field: 'mode', values: ['percentIncrease', 'percentDecrease', 'percentDifference'] } },
    { id: 'valueB', type: 'number', min: 0, max: 1e15, step: 'any', showIf: { field: 'mode', values: ['percentIncrease', 'percentDecrease', 'percentDifference'] } },
    { id: 'finalPrice', type: 'number', min: 0, max: 1e15, step: 'any', showIf: { field: 'mode', values: ['originalPrice'] } },
    { id: 'discountPct2', type: 'number', min: 0, max: 99.9999, step: 'any', showIf: { field: 'mode', values: ['originalPrice'] } },
    { id: 'currency', type: 'currency' },
  ],
  example: {
    mode: 'afterDiscount',
    original: '1000',
    discountPct: '20',
    currency: 'AED',
  },

  validate(input: CalcInput): Record<string, string> {
    const errors: Record<string, string> = {};
    if (!input.mode || !(MODES as readonly string[]).includes(input.mode)) {
      errors.mode = 'invalid';
      return errors;
    }
    const mode = input.mode;
    const need = (id: string, min: number, max: number) => {
      const e = checkNumber(input[id], min, max);
      if (e) errors[id] = e;
    };
    switch (mode) {
      case 'afterDiscount':
        need('original', 0, 1e15);
        need('discountPct', 0, 100);
        break;
      case 'discountAmount':
        need('original', 0, 1e15);
        need('discountAmount2', 0, 1e15);
        break;
      case 'percentIncrease':
      case 'percentDecrease':
      case 'percentDifference':
        need('valueA', 0, 1e15);
        need('valueB', 0, 1e15);
        break;
      case 'originalPrice':
        need('finalPrice', 0, 1e15);
        need('discountPct2', 0, 100);
        break;
    }
    return errors;
  },

  calculate(input: CalcInput): CalcOutput {
    const mode = input.mode as (typeof MODES)[number];
    const n = (id: string) => toNumber(input[id]);
    let results: CalcOutput['results'] = [];

    switch (mode) {
      case 'afterDiscount': {
        const original = n('original');
        const pct = n('discountPct');
        const discountAmount = (original * pct) / 100;
        const finalPrice = original - discountAmount;
        results = [
          { key: 'finalPrice', value: finalPrice, kind: 'currency', hero: true },
          { key: 'discountAmount', value: discountAmount, kind: 'currency' },
        ];
        break;
      }
      case 'discountAmount': {
        const original = n('original');
        const discountAmount = n('discountAmount2');
        const pct = original === 0 ? 0 : (discountAmount / original) * 100;
        results = [
          { key: 'discountPct', value: pct, kind: 'percent', hero: true },
          { key: 'finalPrice', value: Math.max(original - discountAmount, 0), kind: 'currency' },
        ];
        break;
      }
      case 'percentIncrease':
      case 'percentDecrease': {
        const a = n('valueA');
        const b = n('valueB');
        const pct = a === 0 ? 0 : ((b - a) / a) * 100;
        results = [
          { key: 'change', value: pct, kind: 'percent', hero: true },
          { key: 'difference', value: b - a, kind: 'currency' },
        ];
        break;
      }
      case 'percentDifference': {
        const a = n('valueA');
        const b = n('valueB');
        const avg = (a + b) / 2;
        const pct = avg === 0 ? 0 : (Math.abs(a - b) / avg) * 100;
        results = [
          { key: 'difference', value: Math.abs(a - b), kind: 'currency' },
          { key: 'percentDifference', value: pct, kind: 'percent', hero: true },
        ];
        break;
      }
      case 'originalPrice': {
        const finalPrice = n('finalPrice');
        const pct = n('discountPct2');
        const original = finalPrice / (1 - pct / 100);
        const discountAmount = original - finalPrice;
        results = [
          { key: 'originalPrice', value: original, kind: 'currency', hero: true },
          { key: 'discountAmount', value: discountAmount, kind: 'currency' },
        ];
        break;
      }
    }

    return { results };
  },
};

export default discountPercentage;
