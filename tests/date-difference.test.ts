import { test } from 'node:test';
import assert from 'node:assert/strict';
import { dateDifference } from '../src/lib/calculators/date-difference.ts';

const base = { startDate: '2020-01-01', endDate: '2024-01-01' };

function resultOf(overrides: Record<string, string>) {
  const input = { ...base, ...overrides };
  assert.deepEqual(dateDifference.validate(input), {}, `expected valid: ${JSON.stringify(input)}`);
  return dateDifference.calculate(input);
}

function valueOf(out: ReturnType<typeof dateDifference.calculate>, key: string) {
  return out.results.find((r) => r.key === key)!.value;
}

test('date-difference: example computes years, months, days, weeks', () => {
  const out = resultOf({});
  assert.equal(valueOf(out, 'years'), 4);
  assert.equal(valueOf(out, 'months'), 0);
  assert.equal(valueOf(out, 'days'), 0);
  assert.equal(valueOf(out, 'totalDays'), 1461);
  assert.equal(valueOf(out, 'totalWeeks'), 208);
});

test('date-difference: 2020-01-31 to 2021-02-28 is 1y 0m 28d', () => {
  const out = resultOf({ startDate: '2020-01-31', endDate: '2021-02-28' });
  assert.equal(valueOf(out, 'years'), 1);
  assert.equal(valueOf(out, 'months'), 0);
  assert.equal(valueOf(out, 'days'), 28);
});

test('date-difference: end before start is invalid', () => {
  const errors = dateDifference.validate({ startDate: '2024-01-01', endDate: '2020-01-01' });
  assert.equal(errors.endDate, 'max');
});

test('date-difference: empty start date is required', () => {
  const errors = dateDifference.validate({});
  assert.equal(errors.startDate, 'required');
});

test('date-difference: same day span is zero', () => {
  const out = resultOf({ startDate: '2024-06-15', endDate: '2024-06-15' });
  assert.equal(valueOf(out, 'years'), 0);
  assert.equal(valueOf(out, 'totalDays'), 0);
});
