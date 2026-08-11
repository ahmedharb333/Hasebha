import { test } from 'node:test';
import assert from 'node:assert/strict';
import { retirementSavings } from '../src/lib/calculators/retirement.ts';

const base = {
  currentSavings: '10000',
  monthlyContribution: '200',
  annualReturn: '6',
  years: '20',
  currency: 'JOD',
};

function resultOf(overrides: Record<string, string>) {
  const input = { ...base, ...overrides };
  assert.deepEqual(retirementSavings.validate(input), {}, `expected valid: ${JSON.stringify(input)}`);
  return retirementSavings.calculate(input);
}

function valueOf(out: ReturnType<typeof retirementSavings.calculate>, key: string) {
  return out.results.find((r) => r.key === key)!.value;
}

test('retirement: example projects the balance', () => {
  const out = resultOf({});
  const final = valueOf(out, 'finalBalance');
  assert.ok(final > 125400 && final < 125600, `got ${final}`);
  assert.equal(valueOf(out, 'totalContributions'), 58000);
  assert.equal(valueOf(out, 'totalInterestEarned'), final - 58000);
});

test('retirement: zero return equals plain sum', () => {
  const out = resultOf({ annualReturn: '0' });
  assert.equal(valueOf(out, 'finalBalance'), 10000 + 200 * 240);
});

test('retirement: missing years is required', () => {
  const errors = retirementSavings.validate({});
  assert.equal(errors.years, 'required');
});

test('retirement: years zero is rejected', () => {
  const errors = retirementSavings.validate({ ...base, years: '0' });
  assert.equal(errors.years, 'min');
});
