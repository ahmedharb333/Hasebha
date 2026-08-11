import { test } from 'node:test';
import assert from 'node:assert/strict';
import { tip } from '../src/lib/calculators/tip.ts';

const base = { billAmount: '120', tipPercent: '10', people: '4', currency: 'JOD' };

function resultOf(overrides: Record<string, string>) {
  const input = { ...base, ...overrides };
  assert.deepEqual(tip.validate(input), {}, `expected valid: ${JSON.stringify(input)}`);
  return tip.calculate(input);
}

function valueOf(out: ReturnType<typeof tip.calculate>, key: string) {
  return out.results.find((r) => r.key === key)!.value;
}

test('tip: example computes tip, total and per person', () => {
  const out = resultOf({});
  assert.equal(valueOf(out, 'tipAmount'), 12);
  assert.equal(valueOf(out, 'totalWithTip'), 132);
  assert.equal(valueOf(out, 'perPerson'), 33);
});

test('tip: empty people defaults to one', () => {
  const out = resultOf({ people: '' });
  assert.equal(valueOf(out, 'perPerson'), valueOf(out, 'totalWithTip'));
});

test('tip: two people split in half', () => {
  const out = resultOf({ people: '2' });
  assert.equal(valueOf(out, 'perPerson'), 66);
});

test('tip: zero tip percentage yields zero tip', () => {
  const out = resultOf({ tipPercent: '0' });
  assert.equal(valueOf(out, 'tipAmount'), 0);
  assert.equal(valueOf(out, 'totalWithTip'), 120);
});

test('tip: missing bill amount is required', () => {
  const errors = tip.validate({});
  assert.equal(errors.billAmount, 'required');
});

test('tip: zero people is below minimum', () => {
  const errors = tip.validate({ ...base, people: '0' });
  assert.equal(errors.people, 'min');
});

test('tip: people above maximum is rejected', () => {
  const errors = tip.validate({ ...base, people: '101' });
  assert.equal(errors.people, 'max');
});
