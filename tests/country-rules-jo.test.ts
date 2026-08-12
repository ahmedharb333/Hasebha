import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getCountryRules } from '../src/lib/country-rules/registry.ts';

test('jo: rules resolve and are sane', () => {
  const r = getCountryRules('jo');
  assert.ok(r);
  assert.equal(r.currency, 'JOD');
  assert.ok(r.overtime.multipliers.length >= 4);
  assert.ok(r.endOfService.bands.length >= 1);
  assert.ok(r.socialInsurance.employeeRate > 0 && r.socialInsurance.employerRate > 0);
  assert.ok(r.incomeTax.brackets.length > 0);
  assert.ok(r.grossToNet.order.includes('socialInsurance'));
});
