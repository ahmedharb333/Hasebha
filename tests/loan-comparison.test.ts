import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loanComparison } from '../src/lib/calculators/loan-comparison.ts';

const base = {
  principal: '50000',
  rateA: '6',
  rateB: '7.5',
  termA: '5',
  termB: '5',
  termUnit: 'years',
  feesA: '300',
  feesB: '0',
  currency: 'JOD',
};

function resultOf(overrides: Record<string, string>) {
  const input = { ...base, ...overrides };
  assert.deepEqual(loanComparison.validate(input), {}, `expected valid: ${JSON.stringify(input)}`);
  return loanComparison.calculate(input);
}

function valueOf(out: ReturnType<typeof loanComparison.calculate>, key: string) {
  return out.results.find((r) => r.key === key)!.value;
}

test('loan-comparison: example matches worked numbers', () => {
  const out = resultOf({});
  assert.ok(valueOf(out, 'monthlyA') > 966.6 && valueOf(out, 'monthlyA') < 966.7, `got ${valueOf(out, 'monthlyA')}`);
  assert.ok(valueOf(out, 'monthlyB') > 1001.8 && valueOf(out, 'monthlyB') < 1001.9, `got ${valueOf(out, 'monthlyB')}`);
  assert.ok(valueOf(out, 'diffTotalCost') > -1816 && valueOf(out, 'diffTotalCost') < -1815, `got ${valueOf(out, 'diffTotalCost')}`);
});

test('loan-comparison: zero rates produce zero interest', () => {
  const out = resultOf({ rateA: '0', rateB: '0', feesA: '0', feesB: '0' });
  assert.equal(valueOf(out, 'totalInterestA'), 0);
  assert.equal(valueOf(out, 'totalInterestB'), 0);
});

test('loan-comparison: missing principal is required', () => {
  const errors = loanComparison.validate({});
  assert.equal(errors.principal, 'required');
});

test('loan-comparison: negative rateA is rejected', () => {
  const errors = loanComparison.validate({ ...base, rateA: '-1' });
  assert.equal(errors.rateA, 'min');
});
