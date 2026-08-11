import { test } from 'node:test';
import assert from 'node:assert/strict';
import { markupMargin } from '../src/lib/calculators/markup-margin.ts';

const base = { cost: '80', sellingPrice: '120' };

function resultOf(overrides: Record<string, string>) {
  const input = { ...base, ...overrides };
  assert.deepEqual(markupMargin.validate(input), {}, `expected valid: ${JSON.stringify(input)}`);
  return markupMargin.calculate(input);
}

function valueOf(out: ReturnType<typeof markupMargin.calculate>, key: string) {
  return out.results.find((r) => r.key === key)!.value;
}

test('markup-margin: example computes profit, markup and margin', () => {
  const out = resultOf({});
  assert.equal(valueOf(out, 'profit'), 40);
  const markup = valueOf(out, 'markupPct');
  assert.ok(markup > 49.99 && markup < 50.01, `got ${markup}`);
  const margin = valueOf(out, 'marginPct');
  assert.ok(margin > 33.32 && margin < 33.34, `got ${margin}`);
});

test('markup-margin: loss case gives negative profit and percentages', () => {
  const out = resultOf({ cost: '120', sellingPrice: '80' });
  assert.equal(valueOf(out, 'profit'), -40);
  const markup = valueOf(out, 'markupPct');
  assert.ok(markup > -33.34 && markup < -33.32, `got ${markup}`);
  assert.equal(valueOf(out, 'marginPct'), -50);
});

test('markup-margin: missing cost is required', () => {
  const errors = markupMargin.validate({});
  assert.equal(errors.cost, 'required');
});

test('markup-margin: zero cost is below minimum', () => {
  const errors = markupMargin.validate({ cost: '0', sellingPrice: '120' });
  assert.equal(errors.cost, 'min');
});
