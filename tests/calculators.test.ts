import { test } from 'node:test';
import assert from 'node:assert/strict';
import { compoundInterest } from '../src/lib/calculators/compound.ts';
import { savingsGoal } from '../src/lib/calculators/savings.ts';
import { vat } from '../src/lib/calculators/vat.ts';
import { discountPercentage } from '../src/lib/calculators/discount.ts';
import { salaryConverter } from '../src/lib/calculators/salary.ts';
import { overtimePay } from '../src/lib/calculators/overtime.ts';
import { freelanceRate } from '../src/lib/calculators/freelance.ts';
import { employeeCost } from '../src/lib/calculators/employee-cost.ts';
import { leaveBalance } from '../src/lib/calculators/leave.ts';

function run(math: { validate(input: Record<string, string>): Record<string, string>; calculate(input: Record<string, string>): any }, input: Record<string, string>) {
  const errors = math.validate(input);
  assert.deepEqual(errors, {}, `expected valid, got ${JSON.stringify(errors)}`);
  return math.calculate(input);
}

/* ---------------- Compound interest ---------------- */

test('compound: zero rate, monthly contributions sum exactly', () => {
  const out = run(compoundInterest, { initial: '0', contribution: '100', contributionFrequency: 'monthly', annualRate: '0', compoundingFrequency: 'monthly', years: '1' });
  const final = out.results.find((r: any) => r.key === 'finalBalance').value;
  const contrib = out.results.find((r: any) => r.key === 'totalContributions').value;
  assert.ok(Math.abs(final - 1200) < 0.001);
  assert.ok(Math.abs(contrib - 1200) < 0.001);
});

test('compound: 12% monthly compounding on 1000 for 1 year', () => {
  const out = run(compoundInterest, { initial: '1000', contribution: '0', contributionFrequency: 'monthly', annualRate: '12', compoundingFrequency: 'monthly', years: '1' });
  const final = out.results.find((r: any) => r.key === 'finalBalance').value;
  assert.ok(Math.abs(final - 1126.825) < 0.01, `got ${final}`);
});

test('compound: quarterly compounding matches formula', () => {
  const out = run(compoundInterest, { initial: '2000', contribution: '0', contributionFrequency: 'monthly', annualRate: '8', compoundingFrequency: 'quarterly', years: '5' });
  const final = out.results.find((r: any) => r.key === 'finalBalance').value;
  const expected = 2000 * Math.pow(1 + 0.08 / 4, 20);
  assert.ok(Math.abs(final - expected) < 0.01);
});

test('compound: validation rejects negative inputs and invalid frequencies', () => {
  const e1 = compoundInterest.validate({ ...compoundInterest.example, annualRate: '-1' });
  assert.equal(e1.annualRate, 'min');
  const e2 = compoundInterest.validate({ ...compoundInterest.example, contributionFrequency: 'weekly' });
  assert.equal(e2.contributionFrequency, 'invalid');
});

/* ---------------- Savings goal ---------------- */

test('savings: target already reached -> zero contribution', () => {
  const out = run(savingsGoal, { target: '1000', currentSavings: '5000', annualReturn: '5', years: '5', contributionFrequency: 'monthly' });
  const req = out.results.find((r: any) => r.key === 'requiredContribution').value;
  assert.equal(req, 0);
});

test('savings: zero return splits gap evenly', () => {
  const out = run(savingsGoal, { target: '12000', currentSavings: '0', annualReturn: '0', years: '1', contributionFrequency: 'monthly' });
  const req = out.results.find((r: any) => r.key === 'requiredContribution').value;
  assert.ok(Math.abs(req - 1000) < 0.001);
});

test('savings: positive return lowers required contribution', () => {
  const out = run(savingsGoal, { target: '12000', currentSavings: '0', annualReturn: '12', years: '1', contributionFrequency: 'monthly' });
  const req = out.results.find((r: any) => r.key === 'requiredContribution').value;
  assert.ok(req < 1000 && req > 900, `got ${req}`);
});

test('savings: invalid duration rejected', () => {
  const errors = savingsGoal.validate({ ...savingsGoal.example, years: '0' });
  assert.equal(errors.years, 'min');
});

/* ---------------- VAT ---------------- */

test('vat: add computes gross and vat', () => {
  const out = run(vat, { amount: '1000', vatRate: '16', direction: 'add' });
  const gross = out.results.find((r: any) => r.key === 'grossAmount').value;
  const v = out.results.find((r: any) => r.key === 'vatAmount').value;
  assert.ok(Math.abs(gross - 1160) < 0.001);
  assert.ok(Math.abs(v - 160) < 0.001);
});

test('vat: remove recovers net', () => {
  const out = run(vat, { amount: '1160', vatRate: '16', direction: 'remove' });
  const net = out.results.find((r: any) => r.key === 'netAmount').value;
  assert.ok(Math.abs(net - 1000) < 0.001);
});

test('vat: extract isolates vat portion', () => {
  const out = run(vat, { amount: '1160', vatRate: '16', direction: 'extract' });
  const v = out.results.find((r: any) => r.key === 'vatAmount').value;
  assert.ok(Math.abs(v - 160) < 0.001);
});

test('vat: zero rate leaves amounts equal', () => {
  const out = run(vat, { amount: '500', vatRate: '0', direction: 'add' });
  const gross = out.results.find((r: any) => r.key === 'grossAmount').value;
  assert.equal(gross, 500);
});

/* ---------------- Discount / percentage ---------------- */

test('discount: afterDiscount', () => {
  const out = run(discountPercentage, { mode: 'afterDiscount', original: '1000', discountPct: '20' });
  const final = out.results.find((r: any) => r.key === 'finalPrice').value;
  const amt = out.results.find((r: any) => r.key === 'discountAmount').value;
  assert.equal(final, 800);
  assert.equal(amt, 200);
});

test('discount: discountAmount derives percent', () => {
  const out = run(discountPercentage, { mode: 'discountAmount', original: '1000', discountAmount2: '250' });
  const pct = out.results.find((r: any) => r.key === 'discountPct').value;
  assert.ok(Math.abs(pct - 25) < 1e-9);
});

test('discount: percentIncrease', () => {
  const out = run(discountPercentage, { mode: 'percentIncrease', valueA: '100', valueB: '150' });
  const pct = out.results.find((r: any) => r.key === 'change').value;
  assert.ok(Math.abs(pct - 50) < 1e-9);
});

test('discount: percentDecrease', () => {
  const out = run(discountPercentage, { mode: 'percentDecrease', valueA: '200', valueB: '150' });
  const pct = out.results.find((r: any) => r.key === 'change').value;
  assert.ok(Math.abs(pct + 25) < 1e-9);
});

test('discount: percentDifference uses average', () => {
  const out = run(discountPercentage, { mode: 'percentDifference', valueA: '100', valueB: '300' });
  const pct = out.results.find((r: any) => r.key === 'percentDifference').value;
  assert.ok(Math.abs(pct - 100) < 1e-9);
});

test('discount: originalPrice reverses the discount', () => {
  const out = run(discountPercentage, { mode: 'originalPrice', finalPrice: '800', discountPct2: '20' });
  const original = out.results.find((r: any) => r.key === 'originalPrice').value;
  assert.ok(Math.abs(original - 1000) < 1e-9);
});

test('discount: missing mode fields -> required', () => {
  const errors = discountPercentage.validate({ mode: 'afterDiscount', original: '100' });
  assert.equal(errors.discountPct, 'required');
});

/* ---------------- Salary converter ---------------- */

test('salary: monthly to annual/hourly', () => {
  const out = run(salaryConverter, { salaryAmount: '1200', salaryFrequency: 'monthly', daysPerWeek: '5', hoursPerDay: '8', paidWeeksPerYear: '52', unpaidLeaveDays: '0' });
  const annual = out.results.find((r: any) => r.key === 'annual').value;
  const hourly = out.results.find((r: any) => r.key === 'hourly').value;
  assert.ok(Math.abs(annual - 14400) < 0.001);
  assert.ok(Math.abs(hourly - 14400 / 2080) < 1e-9);
});

test('salary: unpaid leave reduces annual', () => {
  const out = run(salaryConverter, { salaryAmount: '1200', salaryFrequency: 'monthly', daysPerWeek: '5', hoursPerDay: '8', paidWeeksPerYear: '52', unpaidLeaveDays: '10' });
  const annual = out.results.find((r: any) => r.key === 'annual').value;
  // daily rate = 14400/260 = 55.3846; 10 days = 553.85
  assert.ok(Math.abs(annual - (14400 - (14400 / 260) * 10)) < 0.01);
});

test('salary: hourly input round-trips', () => {
  const out = run(salaryConverter, { salaryAmount: '10', salaryFrequency: 'hourly', daysPerWeek: '5', hoursPerDay: '8', paidWeeksPerYear: '52', unpaidLeaveDays: '0' });
  const annual = out.results.find((r: any) => r.key === 'annual').value;
  assert.ok(Math.abs(annual - 20800) < 0.001);
});

/* ---------------- Overtime ---------------- */

test('overtime: hourly basis with 1.5x', () => {
  const out = run(overtimePay, { basis: 'hourly', hourlyRate: '10', weeklyHours: '40', overtimeHours: '6', multiplier: '1.5' });
  const otRate = out.results.find((r: any) => r.key === 'overtimeRate').value;
  const otEarn = out.results.find((r: any) => r.key === 'overtimeEarnings').value;
  const total = out.results.find((r: any) => r.key === 'totalEarnings').value;
  assert.equal(otRate, 15);
  assert.equal(otEarn, 90);
  assert.equal(total, 490);
});

test('overtime: monthly salary derives base hourly', () => {
  const out = run(overtimePay, { basis: 'monthly', monthlySalary: '1040', weeklyHours: '40', overtimeHours: '0', multiplier: '2.0' });
  const base = out.results.find((r: any) => r.key === 'baseHourly').value;
  // 1040*12/(52*40) = 6
  assert.ok(Math.abs(base - 6) < 1e-9);
});

test('overtime: custom multiplier validated', () => {
  const errors = overtimePay.validate({ ...overtimePay.example, multiplier: 'custom', customMultiplier: '' });
  assert.equal(errors.customMultiplier, 'required');
  const errors2 = overtimePay.validate({ ...overtimePay.example, multiplier: 'custom', customMultiplier: '3' });
  assert.deepEqual(errors2, {});
});

/* ---------------- Freelancer ---------------- */

test('freelance: example computes minimum and recommended hourly', () => {
  const out = run(freelanceRate, freelanceRate.example as Record<string, string>);
  const minH = out.results.find((r: any) => r.key === 'minimumHourly').value;
  const recH = out.results.find((r: any) => r.key === 'recommendedHourly').value;
  const project = out.results.find((r: any) => r.key === 'projectRate').value;
  const expectedMin = (36000 + 4000) / 0.9 / 1464;
  assert.ok(Math.abs(minH - expectedMin) < 0.01, `got ${minH}`);
  assert.ok(recH > minH);
  assert.ok(Math.abs(project - recH * 200) < 0.01);
});

test('freelance: non-billable 0 and no leave yields max billable hours', () => {
  const out = run(freelanceRate, { desiredIncome: '10000', annualExpenses: '0', taxReservePct: '0', nonBillablePct: '0', vacationDays: '0', sickDays: '0', hoursPerWeek: '40', profitMarginPct: '0', projectHours: '0' });
  const billable = out.results.find((r: any) => r.key === 'billableHours').value;
  assert.ok(Math.abs(billable - 2080) < 1e-9);
});

/* ---------------- Employee cost ---------------- */

test('employee-cost: example totals', () => {
  const out = run(employeeCost, employeeCost.example as Record<string, string>);
  const monthly = out.results.find((r: any) => r.key === 'monthlyCost').value;
  const firstYear = out.results.find((r: any) => r.key === 'firstYearTotal').value;
  assert.ok(Math.abs(monthly - 1810) < 0.001);
  assert.ok(Math.abs(firstYear - (1810 * 12 + 800 + 500 + 400)) < 0.001);
  const salaryShare = out.results.find((r: any) => r.key === 'salaryShare').value;
  assert.ok(Math.abs(salaryShare - (18000 / 23420) * 100) < 0.01);
});

test('employee-cost: zero extras equals gross-based cost', () => {
  const out = run(employeeCost, { grossSalary: '1000', employerContributionPct: '0', insuranceCost: '0', benefitsCost: '0', softwareCost: '0', otherRecurringCost: '0', equipmentCost: '0', recruitmentCost: '0', trainingCost: '0', otherOneTimeCost: '0' });
  const monthly = out.results.find((r: any) => r.key === 'monthlyCost').value;
  assert.equal(monthly, 1000);
});

/* ---------------- Leave balance ---------------- */

test('leave: monthly accrual over one year', () => {
  const out = run(leaveBalance, { annualEntitlement: '30', startDate: '2024-01-01', calcDate: '2025-01-01', leaveTaken: '10', approvedCarryover: '0', accrualMethod: 'monthly' });
  const accrued = out.results.find((r: any) => r.key === 'accrued').value;
  const available = out.results.find((r: any) => r.key === 'available').value;
  assert.ok(Math.abs(accrued - 30) < 1e-9);
  assert.ok(Math.abs(available - 20) < 1e-9);
});

test('leave: daily accrual uses calendar days', () => {
  const out = run(leaveBalance, { annualEntitlement: '365', startDate: '2023-01-01', calcDate: '2024-01-01', leaveTaken: '0', approvedCarryover: '0', accrualMethod: 'daily' });
  const accrued = out.results.find((r: any) => r.key === 'accrued').value;
  assert.ok(Math.abs(accrued - 365) < 0.01);
});

test('leave: carryover capped and remainder expired', () => {
  const out = run(leaveBalance, { annualEntitlement: '30', startDate: '2024-01-01', calcDate: '2024-01-01', leaveTaken: '0', approvedCarryover: '20', accrualMethod: 'full', maxCarryover: '15' });
  const carry = out.results.find((r: any) => r.key === 'carryover').value;
  const expired = out.results.find((r: any) => r.key === 'expired').value;
  assert.equal(carry, 15);
  assert.equal(expired, 5);
});

test('leave: calcDate before startDate rejected', () => {
  const errors = leaveBalance.validate({ annualEntitlement: '30', startDate: '2025-01-01', calcDate: '2024-01-01', leaveTaken: '0', approvedCarryover: '0', accrualMethod: 'monthly' });
  assert.equal(errors.calcDate, 'min');
});
