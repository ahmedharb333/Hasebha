import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getCountryRules } from '../src/lib/country-rules/registry.ts';

test('sa: rules resolve and are sane', () => {
  const r = getCountryRules('sa');
  assert.ok(r);
  assert.equal(r.currency, 'SAR');
  assert.ok(r.overtime.multipliers.length >= 4);
  assert.equal(r.endOfService.bands.length, 2);
  assert.equal(r.socialInsurance.appliesTo, 'citizens');
  assert.equal(r.incomeTax.brackets.length, 0);
  assert.ok(r.grossToNet.order.includes('socialInsurance'));
});
