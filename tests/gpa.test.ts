import { test } from 'node:test';
import assert from 'node:assert/strict';
import { gpa } from '../src/lib/calculators/gpa.ts';

const base = {
  scale: '4',
  grade0: 'A', credits0: '3',
  grade1: 'B', credits1: '4',
  grade2: 'A-', credits2: '3',
  grade3: 'C', credits3: '2',
};

function resultOf(overrides: Record<string, string>) {
  const input = { ...base, ...overrides };
  assert.deepEqual(gpa.validate(input), {}, `expected valid: ${JSON.stringify(input)}`);
  return gpa.calculate(input);
}

function valueOf(out: ReturnType<typeof gpa.calculate>, key: string) {
  return out.results.find((r) => r.key === key)!.value;
}

test('gpa: example computes weighted average', () => {
  const out = resultOf({});
  const gpaValue = valueOf(out, 'gpa');
  assert.ok(gpaValue > 3.25 && gpaValue < 3.27, `got ${gpaValue}`);
  assert.equal(valueOf(out, 'totalCredits'), 12);
  const points = valueOf(out, 'totalPoints');
  assert.ok(points > 39.09 && points < 39.11, `got ${points}`);
});

test('gpa: scale 5 makes A worth 5.0', () => {
  const out = resultOf({ scale: '5', grade0: 'A', credits0: '1', grade1: '', credits1: '', grade2: '', credits2: '', grade3: '', credits3: '' });
  assert.equal(valueOf(out, 'gpa'), 5);
  assert.equal(valueOf(out, 'totalCredits'), 1);
  assert.equal(valueOf(out, 'totalPoints'), 5);
});

test('gpa: all empty rows are rejected', () => {
  assert.deepEqual(gpa.validate({}), { grade0: 'required' });
});

test('gpa: credits beyond 20 are rejected', () => {
  const errors = gpa.validate({ ...base, credits0: '21' });
  assert.equal(errors.credits0, 'max');
});

test('gpa: grade without credits is rejected', () => {
  const errors = gpa.validate({ ...base, credits0: '' });
  assert.equal(errors.credits0, 'required');
});
