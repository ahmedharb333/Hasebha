import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getCountryRules } from '../src/lib/country-rules/registry.ts';

test('om: rules resolve and are sane', () => {
  const r = getCountryRules('om');
  assert.ok(r);
  assert.equal(r.currency, 'OMR');
  assert.ok(r.overtime.multipliers.length >= 4);
  assert.equal(r.overtime.weeklyCapHours, 40);
  assert.equal(r.endOfService.bands.length, 1);
  assert.equal(r.endOfService.bands[0].daysPerYear, 30);
  assert.equal(r.socialInsurance.appliesTo, 'citizens');
  assert.equal(r.leave.maternityDays, 98);
  assert.equal(r.incomeTax.brackets.length, 0);
  assert.ok(r.grossToNet.order.includes('socialInsurance'));
});
