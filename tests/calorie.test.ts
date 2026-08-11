import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calorieIntake } from '../src/lib/calculators/calorie.ts';

const base = {
  sex: 'female',
  age: '25',
  weight: '60',
  weightUnit: 'kg',
  height: '165',
  heightUnit: 'cm',
  activity: 'moderate',
  goal: 'lose',
  rate: 'moderate',
};

function resultOf(overrides: Record<string, string>) {
  const input = { ...base, ...overrides };
  assert.deepEqual(calorieIntake.validate(input), {}, `expected valid: ${JSON.stringify(input)}`);
  return calorieIntake.calculate(input);
}

function valueOf(out: ReturnType<typeof calorieIntake.calculate>, key: string) {
  return out.results.find((r) => r.key === key)!.value;
}

test('calorie: example computes bmr, tdee and target', () => {
  const out = resultOf({});
  const bmrValue = valueOf(out, 'bmr');
  assert.ok(bmrValue > 1340 && bmrValue < 1350, `got ${bmrValue}`);
  const tdee = valueOf(out, 'tdee');
  assert.ok(Math.abs(tdee - bmrValue * 1.55) < 1e-9);
  const target = valueOf(out, 'targetCalories');
  assert.ok(target > 1580 && target < 1590, `got ${target}`);
});

test('calorie: maintain goal targets tdee', () => {
  const out = resultOf({ goal: 'maintain' });
  assert.equal(valueOf(out, 'targetCalories'), valueOf(out, 'tdee'));
});

test('calorie: lose aggressive subtracts 750', () => {
  const out = resultOf({ goal: 'lose', rate: 'aggressive' });
  assert.ok(Math.abs(valueOf(out, 'targetCalories') - (valueOf(out, 'tdee') - 750)) < 1e-9);
});

test('calorie: gain slow adds 250', () => {
  const out = resultOf({ goal: 'gain', rate: 'slow' });
  assert.ok(Math.abs(valueOf(out, 'targetCalories') - (valueOf(out, 'tdee') + 250)) < 1e-9);
});

test('calorie: missing weight is required', () => {
  const errors = calorieIntake.validate({});
  assert.equal(errors.weight, 'required');
});

test('calorie: weight below minimum is rejected', () => {
  const errors = calorieIntake.validate({ ...base, weight: '0' });
  assert.equal(errors.weight, 'min');
});
