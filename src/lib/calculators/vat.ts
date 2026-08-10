import type { CalcInput, CalcOutput, CalculatorMath } from './types';

const DIRECTIONS = ['add', 'extract', 'remove'] as const;

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

export const vat: CalculatorMath = {
  slug: 'vat',
  fields: [
    { id: 'amount', type: 'number', required: true, min: 0, max: 1e15, step: 'any' },
    { id: 'vatRate', type: 'number', required: true, min: 0, max: 100, step: 'any' },
    { id: 'direction', type: 'radio', defaultValue: 'add', options: [
      { value: 'add', label: 'add' },
      { value: 'remove', label: 'remove' },
      { value: 'extract', label: 'extract' },
    ] },
    { id: 'currency', type: 'currency' },
  ],
  example: {
    amount: '1000',
    vatRate: '16',
    direction: 'add',
    currency: 'SAR',
  },

  validate(input: CalcInput): Record<string, string> {
    const errors: Record<string, string> = {};
    const amountErr = checkNumber(input.amount, 0, 1e15);
    if (amountErr) errors.amount = amountErr;
    const rateErr = checkNumber(input.vatRate, 0, 100);
    if (rateErr) errors.vatRate = rateErr;
    if (!input.direction || !(DIRECTIONS as readonly string[]).includes(input.direction)) {
      errors.direction = 'invalid';
    }
    return errors;
  },

  calculate(input: CalcInput): CalcOutput {
    const amount = toNumber(input.amount);
    const rate = toNumber(input.vatRate);
    const direction = input.direction as (typeof DIRECTIONS)[number];
    const factor = 1 + rate / 100;

    let net: number;
    let vatAmount: number;
    let gross: number;

    if (direction === 'add') {
      net = amount;
      gross = amount * factor;
      vatAmount = gross - net;
    } else {
      gross = amount;
      net = amount / factor;
      vatAmount = gross - net;
    }

    const results: CalcOutput['results'] = [
      { key: 'netAmount', value: net, kind: 'currency' },
      { key: 'vatAmount', value: vatAmount, kind: 'currency' },
      { key: 'grossAmount', value: gross, kind: 'currency' },
    ];
    // Hero differs by direction: added VAT -> gross, extracted -> vat, removed -> net.
    const hero = direction === 'add' ? 'grossAmount' : direction === 'extract' ? 'vatAmount' : 'netAmount';
    for (const r of results) r.hero = r.key === hero;

    return { results };
  },
};

export default vat;
