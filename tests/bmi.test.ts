import { test } from 'node:test';
import assert from 'node:assert/strict';
import { bmi } from '../src/lib/calculators/bmi.ts';

const base = {
  weight: '75',
  weightUnit: 'kg',
  height: '175',
  heightUnit: 'cm',
};

function resultOf(overrides: Record<string, string>) {
  const input = { ...base, ...overrides };
  assert.deepEqual(bmi.validate(input), {}, `expected valid: ${JSON.stringify(input)}`);
  return bmi.calculate(input);
}

function valueOf(out: ReturnType<typeof bmi.calculate>, key: string) {
  return out.results.find((r) => r.key === key)!.value;
}

test('bmi: example computes bmi and healthy range', () => {
  const out = resultOf({});
  const bmiValue = valueOf(out, 'bmi');
  assert.ok(bmiValue > 24.4 && bmiValue < 24.6, `got ${bmiValue}`);
  const low = valueOf(out, 'healthyLow');
  assert.ok(low > 56.6 && low < 56.8, `got ${low}`);
  const high = valueOf(out, 'healthyHigh');
  assert.ok(high > 76.2 && high < 76.4, `got ${high}`);
});

test('bmi: pounds convert to kilograms', () => {
  const out = resultOf({ weight: '165', weightUnit: 'lb' });
  const kg = 165 * 0.45359237;
  const expected = kg / 1.75 / 1.75;
  const bmiValue = valueOf(out, 'bmi');
  assert.ok(Math.abs(bmiValue - expected) < 1e-9, `got ${bmiValue}, expected ${expected}`);
});

test('bmi: metres height equals centimetres height', () => {
  const cm = resultOf({});
  const m = resultOf({ height: '1.75', heightUnit: 'm' });
  assert.equal(valueOf(m, 'bmi'), valueOf(cm, 'bmi'));
});

test('bmi: missing weight is required', () => {
  const errors = bmi.validate({});
  assert.equal(errors.weight, 'required');
});

test('bmi: height below minimum is rejected', () => {
  const errors = bmi.validate({ ...base, height: '10' });
  assert.equal(errors.height, 'min');
});
