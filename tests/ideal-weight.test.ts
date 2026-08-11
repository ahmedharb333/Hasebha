import { test } from 'node:test';
import assert from 'node:assert/strict';
import { idealWeight } from '../src/lib/calculators/ideal-weight.ts';

function resultOf(overrides: Record<string, string>) {
  const input = { height: '175', heightUnit: 'cm', ...overrides };
  assert.deepEqual(idealWeight.validate(input), {}, `expected valid: ${JSON.stringify(input)}`);
  return idealWeight.calculate(input);
}

function valueOf(out: ReturnType<typeof idealWeight.calculate>, key: string) {
  return out.results.find((r) => r.key === key)!.value;
}

test('ideal-weight: example computes range and mid', () => {
  const out = resultOf({});
  const low = valueOf(out, 'healthyLow');
  assert.ok(low > 56.6 && low < 56.8, `got ${low}`);
  const high = valueOf(out, 'healthyHigh');
  assert.ok(high > 76.2 && high < 76.4, `got ${high}`);
  const mid = valueOf(out, 'midRange');
  assert.ok(mid > 66.4 && mid < 66.6, `got ${mid}`);
});

test('ideal-weight: metres height equals centimetres height', () => {
  const cm = resultOf({});
  const m = resultOf({ height: '1.75', heightUnit: 'm' });
  assert.equal(valueOf(m, 'healthyLow'), valueOf(cm, 'healthyLow'));
  assert.equal(valueOf(m, 'healthyHigh'), valueOf(cm, 'healthyHigh'));
});

test('ideal-weight: missing height is required', () => {
  const errors = idealWeight.validate({});
  assert.equal(errors.height, 'required');
});

test('ideal-weight: height below minimum is rejected', () => {
  const errors = idealWeight.validate({ height: '10', heightUnit: 'cm' });
  assert.equal(errors.height, 'min');
});
