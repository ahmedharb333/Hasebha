import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getCountryRules } from '../src/lib/country-rules/registry.ts';

test('qa: rules resolve and are sane', () => {
  const r = getCountryRules('qa');
  assert.ok(r);
  assert.equal(r.currency, 'QAR');
  assert.ok(r.overtime.multipliers.length >= 4);
  assert.ok(r.endOfService.bands.length >= 1);
  assert.equal(r.incomeTax.brackets.length, 0);
  assert.ok(r.grossToNet.order.includes('socialInsurance'));
});
