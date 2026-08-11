import { test } from 'node:test';
import assert from 'node:assert/strict';
import { bodyFat } from '../src/lib/calculators/body-fat.ts';

const base = {
  sex: 'male',
  height: '180',
  waist: '90',
  neck: '40',
  hip: '0',
};

function resultOf(overrides: Record<string, string>) {
  const input = { ...base, ...overrides };
  assert.deepEqual(bodyFat.validate(input), {}, `expected valid: ${JSON.stringify(input)}`);
  return bodyFat.calculate(input);
}

function valueOf(out: ReturnType<typeof bodyFat.calculate>, key: string) {
  return out.results.find((r) => r.key === key)!.value;
}

test('body-fat: male example computes percentage', () => {
  const out = resultOf({});
  const pct = valueOf(out, 'bodyFatPct');
  assert.ok(pct > 18.2 && pct < 18.6, `got ${pct}`);
});

test('body-fat: female example matches independent formula', () => {
  const input = { sex: 'female', height: '165', waist: '70', neck: '32', hip: '95' };
  assert.deepEqual(bodyFat.validate(input), {});
  const pct = valueOf(bodyFat.calculate(input), 'bodyFatPct');
  const density = 1.29579 - 0.35004 * Math.log10(70 + 95 - 32) + 0.221 * Math.log10(165);
  const expected = 495 / density - 450;
  assert.ok(Math.abs(pct - expected) < 0.5, `got ${pct}, expected ${expected}`);
});

test('body-fat: missing neck is required', () => {
  const errors = bodyFat.validate({ sex: 'male', height: '180', waist: '90' });
  assert.equal(errors.neck, 'required');
});

test('body-fat: female without hip is rejected', () => {
  const errors = bodyFat.validate({ sex: 'female', height: '165', waist: '70', neck: '32' });
  assert.equal(errors.hip, 'required');
});
