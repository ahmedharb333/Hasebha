import { test } from 'node:test';
import assert from 'node:assert/strict';
import { age } from '../src/lib/calculators/age.ts';

const base = { birthDate: '2000-01-01', asOfDate: '2024-01-01' };

function resultOf(overrides: Record<string, string>) {
  const input = { ...base, ...overrides };
  assert.deepEqual(age.validate(input), {}, `expected valid: ${JSON.stringify(input)}`);
  return age.calculate(input);
}

function valueOf(out: ReturnType<typeof age.calculate>, key: string) {
  return out.results.find((r) => r.key === key)!.value;
}

test('age: example computes the calendar age', () => {
  const out = resultOf({});
  assert.equal(valueOf(out, 'ageYears'), 24);
  assert.equal(valueOf(out, 'totalMonths'), 288);
  assert.equal(valueOf(out, 'totalDays'), 8766);
  assert.equal(valueOf(out, 'totalWeeks'), 1252);
  assert.equal(valueOf(out, 'daysUntilNextBirthday'), 0);
});

test('age: leap-day birth 2000-02-29 vs 2024-02-29 is 24', () => {
  const out = resultOf({ birthDate: '2000-02-29', asOfDate: '2024-02-29' });
  assert.equal(valueOf(out, 'ageYears'), 24);
  assert.equal(valueOf(out, 'totalMonths'), 288);
});

test('age: birthday after as-of date is invalid', () => {
  const errors = age.validate({ birthDate: '2024-01-01', asOfDate: '2020-01-01' });
  assert.equal(errors.birthDate, 'max');
});

test('age: malformed date is invalid', () => {
  const errors = age.validate({ birthDate: '2020-13-01', asOfDate: '2024-01-01' });
  assert.equal(errors.birthDate, 'invalid');
});

test('age: empty birth date is required', () => {
  const errors = age.validate({});
  assert.equal(errors.birthDate, 'required');
});

test('age: malformed as-of date is invalid', () => {
  const errors = age.validate({ birthDate: '2000-01-01', asOfDate: '2020-02-31' });
  assert.equal(errors.asOfDate, 'invalid');
});
