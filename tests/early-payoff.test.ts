import { test } from 'node:test';
import assert from 'node:assert/strict';
import { earlyPayoff } from '../src/lib/calculators/early-payoff.ts';

const base = {
  principal: '20000',
  annualRate: '6',
  term: '5',
  termUnit: 'years',
  extraMonthly: '100',
  currency: 'JOD',
};

function resultOf(overrides: Record<string, string>) {
  const input = { ...base, ...overrides };
  assert.deepEqual(earlyPayoff.validate(input), {}, `expected valid: ${JSON.stringify(input)}`);
  return earlyPayoff.calculate(input);
}

function valueOf(out: ReturnType<typeof earlyPayoff.calculate>, key: string) {
  return out.results.find((r) => r.key === key)!.value;
}

test('early-payoff: extra payment shortens the term and saves interest', () => {
  const out = resultOf({});
  assert.ok(valueOf(out, 'baselinePayment') > 386.6 && valueOf(out, 'baselinePayment') < 386.7, `got ${valueOf(out, 'baselinePayment')}`);
  assert.equal(valueOf(out, 'baselineMonths'), 60);
  assert.ok(valueOf(out, 'newMonths') > 0 && valueOf(out, 'newMonths') < 60, `got ${valueOf(out, 'newMonths')}`);
  assert.ok(valueOf(out, 'interestSaved') > 0, `got ${valueOf(out, 'interestSaved')}`);
});

test('early-payoff: no extra payment reproduces the baseline', () => {
  const out = resultOf({ extraMonthly: '0' });
  assert.equal(valueOf(out, 'newMonths'), 60);
  assert.equal(valueOf(out, 'baselineMonths'), 60);
  assert.ok(Math.abs(valueOf(out, 'interestSaved')) < 0.001, `got ${valueOf(out, 'interestSaved')}`);
});

test('early-payoff: missing principal is required', () => {
  const errors = earlyPayoff.validate({});
  assert.equal(errors.principal, 'required');
});

test('early-payoff: negative extra payment is rejected', () => {
  const errors = earlyPayoff.validate({ ...base, extraMonthly: '-1' });
  assert.equal(errors.extraMonthly, 'min');
});
