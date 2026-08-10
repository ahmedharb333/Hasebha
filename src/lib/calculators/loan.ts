import type { CalcInput, CalcOutput, CalculatorMath } from './types';

const MONTHS_PER_YEAR = 12;

function err(msg: string): never {
  throw new Error(msg);
}

/** Safe parse: returns NaN for anything non-numeric (does not throw). */
function toNumber(raw: string | undefined): number {
  if (raw === undefined || raw === null || raw === '') return NaN;
  return Number(raw);
}

function numeric(input: CalcInput, id: string): number {
  const v = toNumber(input[id]);
  if (!Number.isFinite(v)) err(`Invalid numeric field: ${id}`);
  return v;
}

function optionalNumeric(input: CalcInput, id: string, fallback = 0): number {
  const raw = input[id];
  if (raw === undefined || raw === null || raw === '') return fallback;
  return numeric(input, id);
}

/** Numeric validation helper used by validate(): returns error code or null. */
function checkNumber(raw: string | undefined, min: number, max: number): string | null {
  if (raw === undefined || raw === '') return 'required';
  const v = toNumber(raw);
  if (!Number.isFinite(v)) return 'invalid';
  if (v < min) return 'min';
  if (v > max) return 'max';
  return null;
}

export const loanPayment: CalculatorMath = {
  slug: 'loan-payment',
  fields: [
    { id: 'principal', type: 'number', required: true, min: 0, max: 1e15, step: 'any' },
    { id: 'annualRate', type: 'number', required: true, min: 0, max: 100, step: 'any' },
    { id: 'term', type: 'number', required: true, min: 0.001, max: 100, step: 'any' },
    { id: 'termUnit', type: 'radio', defaultValue: 'years', options: [
      { value: 'months', label: 'months' },
      { value: 'years', label: 'years' },
    ] },
    { id: 'downPayment', type: 'number', min: 0, max: 1e15, step: 'any' },
    { id: 'fees', type: 'number', min: 0, max: 1e15, step: 'any' },
    { id: 'currency', type: 'currency' },
  ],
  example: {
    principal: '100000',
    annualRate: '5',
    term: '10',
    termUnit: 'years',
    downPayment: '10000',
    fees: '500',
    currency: 'JOD',
  },

  validate(input: CalcInput): Record<string, string> {
    const errors: Record<string, string> = {};

    const principalErr = checkNumber(input.principal, 0, 1e15);
    if (principalErr) errors.principal = principalErr;

    const rateErr = checkNumber(input.annualRate, 0, 100);
    if (rateErr) errors.annualRate = rateErr;

    const termErr = checkNumber(input.term, 0.000001, 100);
    if (termErr) errors.term = termErr;

    const downErr = checkNumber(input.downPayment, 0, 1e15);
    if (downErr) errors.downPayment = downErr;

    const feesErr = checkNumber(input.fees, 0, 1e15);
    if (feesErr) errors.fees = feesErr;

    if (!errors.principal && !errors.downPayment && input.downPayment !== undefined && input.downPayment !== '') {
      const principal = toNumber(input.principal);
      const down = toNumber(input.downPayment);
      if (Number.isFinite(principal) && Number.isFinite(down) && down >= principal) {
        errors.downPayment = 'max';
      }
    }

    return errors;
  },

  calculate(input: CalcInput): CalcOutput {
    const principal = numeric(input, 'principal');
    const annualRatePct = numeric(input, 'annualRate');
    const termValue = numeric(input, 'term');
    const termUnit = input.termUnit;
    const downPayment = optionalNumeric(input, 'downPayment', 0);
    const fees = optionalNumeric(input, 'fees', 0);

    const loanAmount = principal - downPayment;
    const months = termUnit === 'months' ? termValue : termValue * MONTHS_PER_YEAR;
    const monthlyRate = annualRatePct / 100 / MONTHS_PER_YEAR;

    let monthlyPayment: number;
    if (monthlyRate === 0) {
      monthlyPayment = loanAmount / months;
    } else {
      const growth = Math.pow(1 + monthlyRate, months);
      monthlyPayment = (loanAmount * monthlyRate * growth) / (growth - 1);
    }
    if (!Number.isFinite(monthlyPayment)) {
      monthlyPayment = loanAmount / months;
    }

    const totalPaid = monthlyPayment * months;
    const totalInterest = totalPaid - loanAmount;
    const effectiveTotalCost = totalPaid + downPayment + fees;

    // Amortization summary by year
    const yearMap = new Map<number, { total: number; principal: number; interest: number; balance: number }>();
    let remaining = loanAmount;
    for (let m = 1; m <= Math.round(months); m++) {
      let interest: number;
      let principalPaid: number;
      if (monthlyRate === 0) {
        interest = 0;
        principalPaid = loanAmount / Math.round(months);
        if (m === Math.round(months)) principalPaid = remaining;
      } else {
        interest = remaining * monthlyRate;
        principalPaid = monthlyPayment - interest;
        if (m === Math.round(months)) principalPaid = remaining;
      }
      remaining -= principalPaid;
      if (remaining < 0) remaining = 0;
      const year = Math.ceil(m / MONTHS_PER_YEAR);
      const bucket = yearMap.get(year) ?? { total: 0, principal: 0, interest: 0, balance: 0 };
      bucket.total += principalPaid + interest;
      bucket.principal += principalPaid;
      bucket.interest += interest;
      bucket.balance = remaining;
      yearMap.set(year, bucket);
    }

    const rows: (string | number)[][] = [];
    for (const [year, b] of [...yearMap.entries()].sort((a, b) => a[0] - b[0])) {
      rows.push([year, b.total, b.principal, b.interest, Math.max(b.balance, 0)]);
    }

    return {
      results: [
        { key: 'monthlyPayment', value: monthlyPayment, kind: 'currency', hero: true },
        { key: 'totalPaid', value: totalPaid, kind: 'currency' },
        { key: 'totalInterest', value: totalInterest, kind: 'currency' },
        { key: 'totalFees', value: fees, kind: 'currency' },
        { key: 'effectiveTotalCost', value: effectiveTotalCost, kind: 'currency' },
      ],
      table: {
        columns: ['year', 'totalPaidYear', 'principalYear', 'interestYear', 'balance'],
        cellKinds: ['number', 'currency', 'currency', 'currency', 'currency'],
        rows,
      },
    };
  },
};

export default loanPayment;
