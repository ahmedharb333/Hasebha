import { test } from 'node:test';
import assert from 'node:assert/strict';
import { overtimePay } from '../src/lib/calculators/overtime.ts';

function rate(country: string, otKind: string, baseHourly = '10'): number {
  const out = overtimePay.calculate({ country, otKind, basis: 'hourly', hourlyRate: baseHourly, weeklyHours: '40', overtimeHours: '1' });
  return out.results.find((r) => r.key === 'overtimeRate')!.value;
}

test('overtime: Saudi standard overtime applies 1.5x', () => {
  assert.equal(rate('sa', 'standard'), 15);
});

test('overtime: UAE standard overtime applies 1.25x', () => {
  assert.equal(rate('ae', 'standard'), 12.5);
});

test('overtime: Kuwait night overtime applies 1.25x', () => {
  assert.equal(rate('kw', 'night'), 12.5);
});

test('overtime: Oman rest day applies 2x', () => {
  assert.equal(rate('om', 'rest_day'), 20);
});

test('overtime: manual path without a country still works', () => {
  const out = overtimePay.calculate({ country: '', basis: 'hourly', hourlyRate: '10', weeklyHours: '40', overtimeHours: '6', multiplier: '1.5' });
  const total = out.results.find((r) => r.key === 'totalEarnings')!.value;
  assert.equal(total, 490);
});

test('overtime: custom multiplier without a country still works', () => {
  const out = overtimePay.calculate({ country: '', basis: 'hourly', hourlyRate: '10', weeklyHours: '40', overtimeHours: '1', multiplier: 'custom', customMultiplier: '2' });
  assert.equal(out.results.find((r) => r.key === 'overtimeRate')!.value, 20);
});

test('overtime: invalid country rejected', () => {
  const e = overtimePay.validate({ country: 'zz', basis: 'hourly', hourlyRate: '10', weeklyHours: '40', overtimeHours: '1', otKind: 'standard', multiplier: '1.5' });
  assert.equal(e.country, 'invalid');
});

test('overtime: invalid otKind rejected when a country is selected', () => {
  const e = overtimePay.validate({ country: 'sa', basis: 'hourly', hourlyRate: '10', weeklyHours: '40', overtimeHours: '1', otKind: 'overnight', multiplier: '1.5' });
  assert.equal(e.otKind, 'invalid');
});
