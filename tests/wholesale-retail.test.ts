import { test } from 'node:test';
import assert from 'node:assert/strict';
import { wholesaleRetail } from '../src/lib/calculators/wholesale-retail.ts';

const base = { cost: '15', markupPct: '60' };

function resultOf(overrides: Record<string, string>) {
  const input = { ...base, ...overrides };
  assert.deepEqual(wholesaleRetail.validate(input), {}, `expected valid: ${JSON.stringify(input)}`);
  return wholesaleRetail.calculate(input);
}

function valueOf(out: ReturnType<typeof wholesaleRetail.calculate>, key: string) {
  return out.results.find((r) => r.key === key)!.value;
}

test('wholesale-retail: example computes retail price and profit', () => {
  const out = resultOf({});
  assert.equal(valueOf(out, 'sellingPrice'), 24);
  assert.equal(valueOf(out, 'profit'), 9);
});

test('wholesale-retail: zero markup sells at cost', () => {
  const out = resultOf({ markupPct: '0' });
  assert.equal(valueOf(out, 'sellingPrice'), 15);
  assert.equal(valueOf(out, 'profit'), 0);
});

test('wholesale-retail: 100% markup doubles the cost', () => {
  const out = resultOf({ markupPct: '100' });
  assert.equal(valueOf(out, 'sellingPrice'), 30);
  assert.equal(valueOf(out, 'profit'), 15);
});

test('wholesale-retail: missing cost is required', () => {
  const errors = wholesaleRetail.validate({});
  assert.equal(errors.cost, 'required');
});

test('wholesale-retail: markup above maximum is rejected', () => {
  const errors = wholesaleRetail.validate({ ...base, markupPct: '1500' });
  assert.equal(errors.markupPct, 'max');
});
