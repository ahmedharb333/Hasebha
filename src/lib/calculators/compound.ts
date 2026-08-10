import type { CalcInput, CalcOutput, CalculatorMath } from './types';

const COMPOUNDING: Record<string, number> = {
  monthly: 12,
  quarterly: 4,
  semiAnnually: 2,
  annually: 1,
};

const CONTRIBUTION: Record<string, number> = {
  monthly: 12,
  quarterly: 4,
  annually: 1,
};

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

function validOption(raw: string | undefined, allowed: string[]): boolean {
  return raw !== undefined && allowed.includes(raw);
}

export const compoundInterest: CalculatorMath = {
  slug: 'compound-interest',
  fields: [
    { id: 'initial', type: 'number', required: true, min: 0, max: 1e15, step: 'any' },
    { id: 'contribution', type: 'number', required: true, min: 0, max: 1e15, step: 'any' },
    { id: 'contributionFrequency', type: 'radio', defaultValue: 'monthly', options: [
      { value: 'monthly', label: 'monthly' },
      { value: 'quarterly', label: 'quarterly' },
      { value: 'annually', label: 'annually' },
    ] },
    { id: 'annualRate', type: 'number', required: true, min: 0, max: 100, step: 'any' },
    { id: 'compoundingFrequency', type: 'radio', defaultValue: 'monthly', options: [
      { value: 'monthly', label: 'monthly' },
      { value: 'quarterly', label: 'quarterly' },
      { value: 'semiAnnually', label: 'semiAnnually' },
      { value: 'annually', label: 'annually' },
    ] },
    { id: 'years', type: 'number', required: true, min: 0.01, max: 100, step: 'any' },
    { id: 'currency', type: 'currency' },
  ],
  example: {
    initial: '5000',
    contribution: '200',
    contributionFrequency: 'monthly',
    annualRate: '7',
    compoundingFrequency: 'monthly',
    years: '20',
    currency: 'USD',
  },

  validate(input: CalcInput): Record<string, string> {
    const errors: Record<string, string> = {};
    const check = (id: string, min: number, max: number) => {
      const e = checkNumber(input[id], min, max);
      if (e) errors[id] = e;
    };
    check('initial', 0, 1e15);
    check('contribution', 0, 1e15);
    check('annualRate', 0, 100);
    check('years', 0.01, 100);
    if (!validOption(input.contributionFrequency, Object.keys(CONTRIBUTION))) errors.contributionFrequency = 'invalid';
    if (!validOption(input.compoundingFrequency, Object.keys(COMPOUNDING))) errors.compoundingFrequency = 'invalid';
    return errors;
  },

  calculate(input: CalcInput): CalcOutput {
    const initial = toNumber(input.initial);
    const contribution = toNumber(input.contribution);
    const annualRate = toNumber(input.annualRate);
    const years = toNumber(input.years);
    const cpy = COMPOUNDING[input.compoundingFrequency] ?? 12;
    const contribPerYear = CONTRIBUTION[input.contributionFrequency] ?? 12;

    const r = annualRate / 100 / cpy;
    const periods = years * cpy;
    // Contributions per compounding period (contributions at end of each period).
    const contributionPerPeriod = contribution * (cpy / contribPerYear);

    const fv = (balance: number, rate: number, n: number, pmt: number): { final: number; contributions: number } => {
      let value = balance;
      let totalContrib = balance;
      for (let i = 0; i < n; i++) {
        value = value * (1 + rate) + pmt;
        totalContrib += pmt;
      }
      return { final: value, contributions: totalContrib };
    };

    const { final: finalBalance, contributions: totalContributions } = fv(initial, r, periods, contributionPerPeriod);

    const rows: (string | number)[][] = [];
    for (let y = 1; y <= Math.floor(years); y++) {
      const n = y * cpy;
      const { final: bal, contributions: contrib } = fv(initial, r, n, contributionPerPeriod);
      rows.push([y, bal, contrib, bal - contrib]);
    }

    return {
      results: [
        { key: 'finalBalance', value: finalBalance, kind: 'currency', hero: true },
        { key: 'totalContributions', value: totalContributions, kind: 'currency' },
        { key: 'totalInterest', value: finalBalance - totalContributions, kind: 'currency' },
      ],
      table: {
        columns: ['year', 'balance', 'contributions', 'interest'],
        cellKinds: ['number', 'currency', 'currency', 'currency'],
        rows,
      },
    };
  },
};

export default compoundInterest;
