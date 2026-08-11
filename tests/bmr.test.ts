import { test } from 'node:test';
import assert from 'node:assert/strict';
import { bmr } from '../src/lib/calculators/bmr.ts';

const base = {
  sex: 'male',
  age: '30',
  weight: '80',
  weightUnit: 'kg',
  height: '180',
  heightUnit: 'cm',
  activity: 'moderate',
};

function resultOf(overrides: Record<string, string>) {
  const input = { ...base, ...overrides };
  assert.deepEqual(bmr.validate(input), {}, `expected valid: ${JSON.stringify(input)}`);
  return bmr.calculate(input);
}

function valueOf(out: ReturnType<typeof bmr.calculate>, key: string) {
  return out.results.find((r) => r.key === key)!.value;
}

test('bmr: example computes bmr and tdee', () => {
  const out = resultOf({});
  const bmrValue = valueOf(out, 'bmr');
  assert.ok(bmrValue > 1775 && bmrValue < 1785, `got ${bmrValue}`);
  assert.ok(Math.abs(valueOf(out, 'tdee') - bmrValue * 1.55) < 1e-9);
});

test('bmr: female is 166 calories below male', () => {
  const male = resultOf({});
  const female = resultOf({ sex: 'female' });
  assert.ok(Math.abs(valueOf(female, 'bmr') - (valueOf(male, 'bmr') - 166)) < 1e-9);
});

test('bmr: pounds convert to kilograms', () => {
  const kg = resultOf({});
  const lb = resultOf({ weight: '176.3698', weightUnit: 'lb' });
  assert.ok(Math.abs(valueOf(lb, 'bmr') - valueOf(kg, 'bmr')) < 1);
});

test('bmr: missing age is required', () => {
  const errors = bmr.validate({});
  assert.equal(errors.age, 'required');
});

test('bmr: age above maximum is rejected', () => {
  const errors = bmr.validate({ ...base, age: '200' });
  assert.equal(errors.age, 'max');
});
