import { test } from 'node:test';
import assert from 'node:assert/strict';
import { gradeAverage } from '../src/lib/calculators/grade-average.ts';

const base = {
  grade0: '85', grade1: '92', grade2: '78', grade3: '88',
};

function resultOf(overrides: Record<string, string>) {
  const input = { ...base, ...overrides };
  assert.deepEqual(gradeAverage.validate(input), {}, `expected valid: ${JSON.stringify(input)}`);
  return gradeAverage.calculate(input);
}

function valueOf(out: ReturnType<typeof gradeAverage.calculate>, key: string) {
  return out.results.find((r) => r.key === key)!.value;
}

test('grade-average: example computes average and extremes', () => {
  const out = resultOf({});
  assert.equal(valueOf(out, 'average'), 85.75);
  assert.equal(valueOf(out, 'count'), 4);
  assert.equal(valueOf(out, 'highest'), 92);
  assert.equal(valueOf(out, 'lowest'), 78);
});

test('grade-average: one grade only averages to itself', () => {
  const out = resultOf({ grade1: '', grade2: '', grade3: '' });
  assert.equal(valueOf(out, 'average'), 85);
  assert.equal(valueOf(out, 'count'), 1);
});

test('grade-average: all empty is rejected', () => {
  assert.deepEqual(gradeAverage.validate({}), { grade0: 'required' });
});

test('grade-average: grade above 100 is rejected', () => {
  const errors = gradeAverage.validate({ ...base, grade0: '101' });
  assert.equal(errors.grade0, 'max');
});

test('grade-average: negative grade is rejected', () => {
  const errors = gradeAverage.validate({ ...base, grade0: '-1' });
  assert.equal(errors.grade0, 'min');
});
