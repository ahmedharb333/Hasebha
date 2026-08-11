import { test } from 'node:test';
import assert from 'node:assert/strict';
import { breakEven } from '../src/lib/calculators/break-even.ts';

const base = { fixedCosts: '10000', unitPrice: '50', unitVariableCost: '30' };

function resultOf(overrides: Record<string, string>) {
  const input = { ...base, ...overrides };
  assert.deepEqual(breakEven.validate(input), {}, `expected valid: ${JSON.stringify(input)}`);
  return breakEven.calculate(input);
}

function valueOf(out: ReturnType<typeof breakEven.calculate>, key: string) {
  return out.results.find((r) => r.key === key)!.value;
}

test('break-even: example computes units, revenue and contribution', () => {
  const out = resultOf({});
  assert.equal(valueOf(out, 'breakEvenUnits'), 500);
  assert.equal(valueOf(out, 'breakEvenRevenue'), 25000);
  assert.equal(valueOf(out, 'contributionMargin'), 20);
});

test('break-even: price equal to variable cost is invalid', () => {
  const errors = breakEven.validate({ ...base, unitPrice: '30', unitVariableCost: '30' });
  assert.equal(errors.unitPrice, 'invalid');
});

test('break-even: price below variable cost is invalid', () => {
  const errors = breakEven.validate({ ...base, unitPrice: '20', unitVariableCost: '30' });
  assert.equal(errors.unitPrice, 'invalid');
});

test('break-even: zero fixed costs means zero units', () => {
  const out = resultOf({ fixedCosts: '0' });
  assert.equal(valueOf(out, 'breakEvenUnits'), 0);
  assert.equal(valueOf(out, 'breakEvenRevenue'), 0);
});

test('break-even: missing unit price is required', () => {
  const errors = breakEven.validate({});
  assert.equal(errors.unitPrice, 'required');
});
