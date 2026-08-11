import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mortgage } from '../src/lib/calculators/mortgage.ts';

const base = {
  price: '200000',
  downPayment: '40000',
  annualRate: '5',
  term: '20',
  termUnit: 'years',
  fees: '1000',
  currency: 'JOD',
};

function resultOf(overrides: Record<string, string>) {
  const input = { ...base, ...overrides };
  assert.deepEqual(mortgage.validate(input), {}, `expected valid: ${JSON.stringify(input)}`);
  return mortgage.calculate(input);
}

function valueOf(out: ReturnType<typeof mortgage.calculate>, key: string) {
  return out.results.find((r) => r.key === key)!.value;
}

test('mortgage: baseline example gives ~1056 monthly and ~93416 interest', () => {
  const out = resultOf({});
  assert.equal(valueOf(out, 'loanAmount'), 160000);
  assert.ok(Math.abs(valueOf(out, 'monthlyPayment') - 1056) < 2, `got ${valueOf(out, 'monthlyPayment')}`);
  assert.ok(valueOf(out, 'monthlyPayment') > 1055 && valueOf(out, 'monthlyPayment') < 1058);
  assert.ok(valueOf(out, 'totalInterest') > 93300 && valueOf(out, 'totalInterest') < 93500);
});

test('mortgage: zero rate splits principal evenly', () => {
  const out = resultOf({ annualRate: '0', term: '5', termUnit: 'years', fees: '0' });
  const payment = valueOf(out, 'monthlyPayment');
  assert.ok(Math.abs(payment - 160000 / 60) < 0.001);
  assert.equal(valueOf(out, 'totalInterest'), 0);
});

test('mortgage: down payment >= price is rejected', () => {
  const errors = mortgage.validate({ ...base, downPayment: '200000' });
  assert.equal(errors.downPayment, 'max');
});

test('mortgage: missing required fields are rejected', () => {
  const errors = mortgage.validate({});
  assert.equal(errors.price, 'required');
  assert.equal(errors.downPayment, 'required');
  assert.equal(errors.annualRate, 'required');
  assert.equal(errors.term, 'required');
});

test('mortgage: negative rate is rejected', () => {
  const errors = mortgage.validate({ ...base, annualRate: '-1' });
  assert.equal(errors.annualRate, 'min');
});

test('mortgage: amortization repays the loan in 20 annual rows', () => {
  const out = resultOf({});
  const rows = out.table!.rows;
  assert.equal(rows.length, 20);
  const last = rows[rows.length - 1];
  assert.ok((last[4] as number) < 0.01, `last balance ${last[4]}`);
});
