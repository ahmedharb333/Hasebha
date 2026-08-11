import { test } from 'node:test';
import assert from 'node:assert/strict';
import { finalGradePlanner } from '../src/lib/calculators/final-grade.ts';

const base = {
  currentGrade: '80',
  finalWeight: '30',
  targetGrade: '85',
};

function resultOf(overrides: Record<string, string>) {
  const input = { ...base, ...overrides };
  assert.deepEqual(finalGradePlanner.validate(input), {}, `expected valid: ${JSON.stringify(input)}`);
  return finalGradePlanner.calculate(input);
}

function valueOf(out: ReturnType<typeof finalGradePlanner.calculate>, key: string) {
  return out.results.find((r) => r.key === key)!.value;
}

test('final-grade: example computes the needed score', () => {
  const out = resultOf({});
  const needed = valueOf(out, 'requiredFinal');
  assert.ok(needed > 96.6 && needed < 96.7, `got ${needed}`);
  assert.equal(valueOf(out, 'currentContribution'), 56);
  assert.equal(valueOf(out, 'maxAchievable'), 86);
});

test('final-grade: weight 100 means the final is the whole grade', () => {
  const out = resultOf({ finalWeight: '100' });
  assert.equal(valueOf(out, 'requiredFinal'), 85);
});

test('final-grade: unreachable target clamps to 100', () => {
  const out = resultOf({ targetGrade: '100', finalWeight: '10', currentGrade: '50' });
  assert.equal(valueOf(out, 'requiredFinal'), 100);
});

test('final-grade: already-achieved target clamps to 0', () => {
  const out = resultOf({ targetGrade: '60', finalWeight: '30', currentGrade: '86' });
  assert.equal(valueOf(out, 'requiredFinal'), 0);
});

test('final-grade: missing final weight is required', () => {
  const errors = finalGradePlanner.validate({});
  assert.equal(errors.finalWeight, 'required');
});
