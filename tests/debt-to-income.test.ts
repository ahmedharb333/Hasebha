import { test } from 'node:test';
import assert from 'node:assert/strict';
import { debtToIncome } from '../src/lib/calculators/debt-to-income.ts';

const base = {
  monthlyDebt: '400',
  grossIncome: '2000',
  currency: 'JOD',
};

function resultOf(overrides: Record<string, string>) {
  const input = { ...base, ...overrides };
  assert.deepEqual(debtToIncome.validate(input), {}, `expected valid: ${JSON.stringify(input)}`);
  return debtToIncome.calculate(input);
}

function valueOf(out: ReturnType<typeof debtToIncome.calculate>, key: string) {
  return out.results.find((r) => r.key === key)!.value;
}

test('debt-to-income: example ratio and remaining income', () => {
  const out = resultOf({});
  assert.equal(valueOf(out, 'dtiRatio'), 20);
  assert.equal(valueOf(out, 'remainingIncome'), 1600);
});

test('debt-to-income: zero income is rejected', () => {
  const errors = debtToIncome.validate({ ...base, grossIncome: '0' });
  assert.equal(errors.grossIncome, 'min');
});

test('debt-to-income: missing debt is required', () => {
  const errors = debtToIncome.validate({});
  assert.equal(errors.monthlyDebt, 'required');
});
