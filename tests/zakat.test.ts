import { test } from 'node:test';
import assert from 'node:assert/strict';
import { zakat } from '../src/lib/calculators/zakat.ts';

const base = {
  cashSavings: '10000',
  goldValue: '5000',
  investments: '2000',
  debts: '1000',
  nisab: '860',
  currency: 'JOD',
};

function resultOf(overrides: Record<string, string>) {
  const input = { ...base, ...overrides };
  assert.deepEqual(zakat.validate(input), {}, `expected valid: ${JSON.stringify(input)}`);
  return zakat.calculate(input);
}

function valueOf(out: ReturnType<typeof zakat.calculate>, key: string) {
  return out.results.find((r) => r.key === key)!.value;
}

test('zakat: example computes base and due', () => {
  const out = resultOf({});
  assert.equal(valueOf(out, 'zakatBase'), 16000);
  assert.equal(valueOf(out, 'zakatDue'), 400);
});

test('zakat: zero everything gives zero', () => {
  const out = resultOf({ cashSavings: '0', goldValue: '0', investments: '0', debts: '0', nisab: '0' });
  assert.equal(valueOf(out, 'zakatBase'), 0);
  assert.equal(valueOf(out, 'zakatDue'), 0);
});

test('zakat: debts above assets zero out the base', () => {
  const out = resultOf({ cashSavings: '1000', goldValue: '0', investments: '0', debts: '5000' });
  assert.equal(valueOf(out, 'zakatBase'), 0);
  assert.equal(valueOf(out, 'zakatDue'), 0);
});

test('zakat: missing cash is required', () => {
  const errors = zakat.validate({});
  assert.equal(errors.cashSavings, 'required');
});

test('zakat: negative debts is rejected', () => {
  const errors = zakat.validate({ ...base, debts: '-1' });
  assert.equal(errors.debts, 'min');
});
