import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getCountryRules } from '../src/lib/country-rules/registry.ts';

test('kw: rules resolve and are sane', () => {
  const r = getCountryRules('kw');
  assert.ok(r);
  assert.equal(r.currency, 'KWD');
  assert.ok(r.overtime.multipliers.length >= 4);
  assert.ok(r.endOfService.resignation && r.endOfService.resignation.length > 0);
  assert.equal(r.endOfService.capMonths, 18);
  assert.equal(r.incomeTax.brackets.length, 0);
  assert.ok(r.grossToNet.order.includes('socialInsurance'));
});
