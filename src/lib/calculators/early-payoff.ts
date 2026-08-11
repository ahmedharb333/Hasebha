import type { CalcInput, CalcOutput, CalculatorMath } from './types';
import { numeric, optionalNumeric, checkNumber, monthlyPayment } from './utils.ts';

const MONTHS_PER_YEAR = 12;

export const earlyPayoff: CalculatorMath = {
  slug: 'early-payoff',
  fields: [
    { id: 'principal', type: 'number', required: true, min: 0, max: 1e15, step: 'any' },
    { id: 'annualRate', type: 'number', required: true, min: 0, max: 100, step: 'any' },
    { id: 'term', type: 'number', required: true, min: 0.001, max: 100, step: 'any' },
    { id: 'termUnit', type: 'radio', defaultValue: 'years', options: [
      { value: 'months', label: 'months' },
      { value: 'years', label: 'years' },
    ] },
    { id: 'extraMonthly', type: 'number', min: 0, max: 1e15, step: 'any' },
    { id: 'currency', type: 'currency' },
  ],
  example: {
    principal: '20000',
    annualRate: '6',
    term: '5',
    termUnit: 'years',
    extraMonthly: '100',
    currency: 'JOD',
  },

  validate(input: CalcInput): Record<string, string> {
    const errors: Record<string, string> = {};
    const defs: [string, number, number][] = [
      ['principal', 0, 1e15],
      ['annualRate', 0, 100],
      ['term', 0.000001, 100],
      ['extraMonthly', 0, 1e15],
    ];
    for (const [id, min, max] of defs) {
      const e = checkNumber(input[id], min, max);
      if (e) errors[id] = e;
    }
    return errors;
  },

  calculate(input: CalcInput): CalcOutput {
    const principal = numeric(input, 'principal');
    const ratePct = numeric(input, 'annualRate');
    const termValue = numeric(input, 'term');
    const termUnit = input.termUnit;
    const extra = optionalNumeric(input, 'extraMonthly', 0);

    const months = termUnit === 'months' ? termValue : termValue * MONTHS_PER_YEAR;
    const monthlyRate = ratePct / 100 / MONTHS_PER_YEAR;
    const basePayment = monthlyPayment(principal, monthlyRate, months);
    const totalMonths = Math.round(months);
    const baselineInterest = basePayment * totalMonths - principal;

    // Simulate the extra-payment path month by month.
    const rowsOut: (string | number)[][] = [];
    const yearMap = new Map<number, { total: number; principal: number; interest: number; balance: number }>();
    let remaining = principal;
    let month = 0;
    let totalWithExtra = 0;
    while (remaining > 0.0001 && month < 1200) {
      month++;
      const interest = remaining * monthlyRate;
      let principalPaid = basePayment + extra - interest;
      if (principalPaid > remaining) principalPaid = remaining;
      remaining -= principalPaid;
      totalWithExtra += principalPaid + interest;
      const year = Math.ceil(month / MONTHS_PER_YEAR);
      const bucket = yearMap.get(year) ?? { total: 0, principal: 0, interest: 0, balance: 0 };
      bucket.total += principalPaid + interest;
      bucket.principal += principalPaid;
      bucket.interest += interest;
      bucket.balance = Math.max(remaining, 0);
      yearMap.set(year, bucket);
    }
    for (const [year, b] of [...yearMap.entries()].sort((a, b) => a[0] - b[0])) {
      rowsOut.push([year, b.total, b.principal, b.interest, Math.max(b.balance, 0)]);
    }

    const newMonths = month;
    const interestWithExtra = totalWithExtra - principal;

    return {
      results: [
        { key: 'baselinePayment', value: basePayment, kind: 'currency', hero: true },
        { key: 'baselineMonths', value: totalMonths, kind: 'number' },
        { key: 'newMonths', value: newMonths, kind: 'number' },
        { key: 'interestSaved', value: baselineInterest - interestWithExtra, kind: 'currency' },
      ],
      table: {
        columns: ['year', 'totalPaidYear', 'principalYear', 'interestYear', 'balance'],
        cellKinds: ['number', 'currency', 'currency', 'currency', 'currency'],
        rows: rowsOut,
      },
    };
  },
};

export default earlyPayoff;
