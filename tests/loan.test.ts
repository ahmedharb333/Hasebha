import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loanPayment } from '../src/lib/calculators/loan.ts';
import { parseNumber, normalizeDigits, round, formatNumber } from '../src/lib/number.ts';

const base = {
  principal: '100000',
  annualRate: '5',
  term: '10',
  termUnit: 'years',
  downPayment: '0',
  fees: '0',
  currency: 'JOD',
};

function resultOf(overrides: Record<string, string>) {
  const input = { ...base, ...overrides };
  assert.deepEqual(loanPayment.validate(input), {}, `expected valid: ${JSON.stringify(input)}`);
  return loanPayment.calculate(input);
}

test('loan: baseline 10-year 5% loan gives ~1060.66 monthly', () => {
  const out = resultOf({});
  const monthly = out.results.find((r) => r.key === 'monthlyPayment')!.value;
  assert.ok(Math.abs(monthly - 1060.66) < 0.02, `got ${monthly}`);
});

test('loan: total paid = monthly * months', () => {
  const out = resultOf({});
  const monthly = out.results.find((r) => r.key === 'monthlyPayment')!.value;
  const total = out.results.find((r) => r.key === 'totalPaid')!.value;
  assert.ok(Math.abs(total - monthly * 120) < 0.02);
});

test('loan: total interest is total paid minus loan amount', () => {
  const out = resultOf({});
  const total = out.results.find((r) => r.key === 'totalPaid')!.value;
  const interest = out.results.find((r) => r.key === 'totalInterest')!.value;
  assert.ok(Math.abs(interest - (total - 100000)) < 0.02);
});

test('loan: zero interest splits principal evenly', () => {
  const out = resultOf({ annualRate: '0', term: '12', termUnit: 'months' });
  const monthly = out.results.find((r) => r.key === 'monthlyPayment')!.value;
  const interest = out.results.find((r) => r.key === 'totalInterest')!.value;
  assert.ok(Math.abs(monthly - 100000 / 12) < 0.001);
  assert.equal(interest, 0);
});

test('loan: down payment reduces loan amount', () => {
  const out = resultOf({ annualRate: '0', term: '24', termUnit: 'months', downPayment: '20000' });
  const monthly = out.results.find((r) => r.key === 'monthlyPayment')!.value;
  assert.ok(Math.abs(monthly - 80000 / 24) < 0.001);
});

test('loan: fees add to effective total cost only', () => {
  const out = resultOf({ annualRate: '0', term: '12', termUnit: 'months', downPayment: '0', fees: '500' });
  const monthly = out.results.find((r) => r.key === 'monthlyPayment')!.value;
  const fees = out.results.find((r) => r.key === 'totalFees')!.value;
  const cost = out.results.find((r) => r.key === 'effectiveTotalCost')!.value;
  assert.equal(fees, 500);
  assert.ok(Math.abs(cost - (monthly * 12 + 500)) < 0.02);
});

test('loan: amortization fully repays the loan', () => {
  const out = resultOf({});
  const rows = out.table!.rows;
  const lastBalance = rows[rows.length - 1][4] as number;
  assert.ok(lastBalance < 0.01, `balance ${lastBalance}`);
  const yearCount = rows.length;
  assert.equal(yearCount, 10);
});

test('loan: decimals work', () => {
  const out = resultOf({ principal: '1234.56', annualRate: '2.5', term: '2', termUnit: 'years' });
  const monthly = out.results.find((r) => r.key === 'monthlyPayment')!.value;
  assert.ok(Number.isFinite(monthly) && monthly > 50 && monthly < 60, `got ${monthly}`);
});

test('loan: very large values stay finite', () => {
  const out = resultOf({ principal: '1000000000000', annualRate: '10', term: '30', termUnit: 'years' });
  const monthly = out.results.find((r) => r.key === 'monthlyPayment')!.value;
  assert.ok(Number.isFinite(monthly) && monthly > 0);
});

test('loan: missing required fields -> required', () => {
  const errors = loanPayment.validate({ currency: 'JOD' });
  assert.equal(errors.principal, 'required');
  assert.equal(errors.annualRate, 'required');
  assert.equal(errors.term, 'required');
});

test('loan: negative inputs -> min', () => {
  const errors = loanPayment.validate({ ...base, principal: '-5', downPayment: '-1', fees: '-2' });
  assert.equal(errors.principal, 'min');
  assert.equal(errors.downPayment, 'min');
  assert.equal(errors.fees, 'min');
});

test('loan: negative rate -> min', () => {
  const errors = loanPayment.validate({ ...base, annualRate: '-1' });
  assert.equal(errors.annualRate, 'min');
});

test('loan: zero term -> min', () => {
  const errors = loanPayment.validate({ ...base, term: '0' });
  assert.equal(errors.term, 'min');
});

test('loan: down payment >= principal -> max', () => {
  const errors = loanPayment.validate({ ...base, downPayment: '100000' });
  assert.equal(errors.downPayment, 'max');
});

test('loan: non-numeric input -> invalid', () => {
  const errors = loanPayment.validate({ ...base, principal: 'abc' });
  assert.equal(errors.principal, 'invalid');
});

test('number: normalizes Arabic-Indic digits', () => {
  assert.equal(normalizeDigits('١٢٣٤.٥'), '1234.5');
  assert.equal(normalizeDigits('۰۱۲۳'), '0123');
});

test('number: parses commas and Arabic digits', () => {
  assert.equal(parseNumber('1,234.56'), 1234.56);
  assert.equal(parseNumber('١٬٢٣٤٫٥٦'), 1234.56);
  assert.equal(parseNumber(''), null);
  assert.equal(parseNumber('abc'), null);
});

test('number: round avoids float drift', () => {
  assert.equal(round(1.005, 2), 1.01);
});

test('number: formats with grouping in both locales', () => {
  assert.equal(formatNumber(1234.5, 'ar'), '1,234.5');
  assert.equal(formatNumber(1234.5, 'en'), '1,234.5');
});
