import { test } from 'node:test';
import assert from 'node:assert/strict';
import { leaveBalance } from '../src/lib/calculators/leave.ts';

test('leave: Saudi 3 years → 21 statutory days', () => {
  const out = leaveBalance.calculate({ country: 'sa', tenureYears: '3', startDate: '2024-01-01', calcDate: '2025-01-01', leaveTaken: '0', approvedCarryover: '0', accrualMethod: 'full', maxCarryover: '' });
  assert.equal(out.results.find((r) => r.key === 'annualEntitlement')!.value, 21);
  assert.equal(out.results.find((r) => r.key === 'accrued')!.value, 21);
});

test('leave: Saudi 5 years → 30 statutory days', () => {
  const out = leaveBalance.calculate({ country: 'sa', tenureYears: '5', startDate: '2024-01-01', calcDate: '2025-01-01', leaveTaken: '0', approvedCarryover: '0', accrualMethod: 'full', maxCarryover: '' });
  assert.equal(out.results.find((r) => r.key === 'annualEntitlement')!.value, 30);
});

test('leave: UAE 2 years → 30 statutory days', () => {
  const out = leaveBalance.calculate({ country: 'ae', tenureYears: '2', startDate: '2024-01-01', calcDate: '2025-01-01', leaveTaken: '5', approvedCarryover: '0', accrualMethod: 'monthly', maxCarryover: '' });
  assert.equal(out.results.find((r) => r.key === 'annualEntitlement')!.value, 30);
  assert.ok(Math.abs(out.results.find((r) => r.key === 'accrued')!.value - 30) < 1e-9);
  assert.equal(out.results.find((r) => r.key === 'available')!.value, 25);
});

test('leave: no-country manual path unchanged', () => {
  const out = leaveBalance.calculate({ country: '', annualEntitlement: '30', startDate: '2024-01-01', calcDate: '2025-01-01', leaveTaken: '10', approvedCarryover: '0', accrualMethod: 'monthly', maxCarryover: '' });
  assert.equal(out.results.some((r) => r.key === 'annualEntitlement'), false);
  assert.ok(Math.abs(out.results.find((r) => r.key === 'accrued')!.value - 30) < 1e-9);
  assert.equal(out.results.find((r) => r.key === 'available')!.value, 20);
});

test('leave: invalid country rejected', () => {
  const e = leaveBalance.validate({ country: 'zz', tenureYears: '3', annualEntitlement: '30', startDate: '2024-01-01', calcDate: '2025-01-01', leaveTaken: '0', approvedCarryover: '0', accrualMethod: 'monthly', maxCarryover: '' });
  assert.equal(e.country, 'invalid');
});

test('leave: manual annual entitlement required without a country', () => {
  const e = leaveBalance.validate({ country: '', tenureYears: '3', annualEntitlement: '', startDate: '2024-01-01', calcDate: '2025-01-01', leaveTaken: '0', approvedCarryover: '0', accrualMethod: 'monthly', maxCarryover: '' });
  assert.equal(e.annualEntitlement, 'required');
});
