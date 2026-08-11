import type { CalcInput, CalcOutput, CalculatorMath } from './types';
import { numeric, optionalNumeric, checkNumber, monthlyPayment } from './utils.ts';

const MONTHS_PER_YEAR = 12;

export const mortgage: CalculatorMath = {
  slug: 'mortgage',
  fields: [
    { id: 'price', type: 'number', required: true, min: 0, max: 1e15, step: 'any' },
    { id: 'downPayment', type: 'number', required: true, min: 0, max: 1e15, step: 'any' },
    { id: 'annualRate', type: 'number', required: true, min: 0, max: 100, step: 'any' },
    { id: 'term', type: 'number', required: true, min: 0.001, max: 100, step: 'any' },
    { id: 'termUnit', type: 'radio', defaultValue: 'years', options: [
      { value: 'months', label: 'months' },
      { value: 'years', label: 'years' },
    ] },
    { id: 'fees', type: 'number', min: 0, max: 1e15, step: 'any' },
    { id: 'currency', type: 'currency' },
  ],
  example: {
    price: '200000',
    downPayment: '40000',
    annualRate: '5',
    term: '20',
    termUnit: 'years',
    fees: '1000',
    currency: 'JOD',
  },

  validate(input: CalcInput): Record<string, string> {
    const errors: Record<string, string> = {};
    const priceErr = checkNumber(input.price, 0, 1e15);
    if (priceErr) errors.price = priceErr;
    const downErr = checkNumber(input.downPayment, 0, 1e15);
    if (downErr) errors.downPayment = downErr;
    const rateErr = checkNumber(input.annualRate, 0, 100);
    if (rateErr) errors.annualRate = rateErr;
    const termErr = checkNumber(input.term, 0.000001, 100);
    if (termErr) errors.term = termErr;
    const feesErr = checkNumber(input.fees, 0, 1e15);
    if (feesErr) errors.fees = feesErr;
    if (!errors.price && !errors.downPayment) {
      const price = Number(input.price);
      const down = Number(input.downPayment);
      if (Number.isFinite(price) && Number.isFinite(down) && down >= price) errors.downPayment = 'max';
    }
    return errors;
  },

  calculate(input: CalcInput): CalcOutput {
    const price = numeric(input, 'price');
    const down = numeric(input, 'downPayment');
    const ratePct = numeric(input, 'annualRate');
    const termValue = numeric(input, 'term');
    const termUnit = input.termUnit;
    const fees = optionalNumeric(input, 'fees', 0);

    const loanAmount = price - down;
    const months = termUnit === 'months' ? termValue : termValue * MONTHS_PER_YEAR;
    const monthlyRate = ratePct / 100 / MONTHS_PER_YEAR;
    const payment = monthlyPayment(loanAmount, monthlyRate, months);
    const totalPaid = payment * months;
    const totalInterest = totalPaid - loanAmount;
    const effectiveTotalCost = totalPaid + down + fees;

    // Annual schedule identical in construction to loan.ts
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
        principalPaid = payment - interest;
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
        { key: 'loanAmount', value: loanAmount, kind: 'currency' },
        { key: 'monthlyPayment', value: payment, kind: 'currency', hero: true },
        { key: 'totalInterest', value: totalInterest, kind: 'currency' },
        { key: 'totalPaid', value: totalPaid, kind: 'currency' },
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

export default mortgage;
