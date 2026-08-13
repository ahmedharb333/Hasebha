import { test } from 'node:test';
import assert from 'node:assert/strict';
import { socialInsurance } from '../src/lib/calculators/social-insurance.ts';

test('social-insurance: computes Saudi contributions with cap', () => {
  const out = socialInsurance.calculate({ country: 'sa', monthlySalary: '50000', currency: 'SAR' });
  const capped = out.results.find((r) => r.key === 'cappedBase')!.value;
  const ee = out.results.find((r) => r.key === 'employeeShare')!.value;
  assert.equal(capped, 45000);
  assert.equal(ee, 45000 * 9.75 / 100);
});

test('social-insurance: missing country is required', () => {
  const e = socialInsurance.validate({ country: '', monthlySalary: '1000', currency: 'JOD' });
  assert.equal(e.country, 'required');
});

test('social-insurance: currency mismatch flagged', () => {
  const e = socialInsurance.validate({ country: 'sa', monthlySalary: '1000', currency: 'JOD' });
  assert.equal(e.currency, 'countryMismatch');
});

test('social-insurance: negative salary is rejected', () => {
  const e = socialInsurance.validate({ country: 'jo', monthlySalary: '-5', currency: 'JOD' });
  assert.equal(e.monthlySalary, 'min');
});

test('social-insurance: Kuwait adds 2.5% supplementary on the first KWD 1,500', () => {
  const out = socialInsurance.calculate({ country: 'kw', monthlySalary: '1500', currency: 'KWD' });
  const ee = out.results.find((r) => r.key === 'employeeShare')!.value;
  assert.equal(ee, 1500 * 8 / 100 + 1500 * 2.5 / 100);
});

test('social-insurance: Kuwait supplementary applies only up to KWD 1,500', () => {
  const out = socialInsurance.calculate({ country: 'kw', monthlySalary: '2750', currency: 'KWD' });
  const ee = out.results.find((r) => r.key === 'employeeShare')!.value;
  assert.equal(ee, 2750 * 8 / 100 + 1500 * 2.5 / 100);
});

test('social-insurance: Kuwait total capped at the 2,750 ceiling', () => {
  const out = socialInsurance.calculate({ country: 'kw', monthlySalary: '10000', currency: 'KWD' });
  const capped = out.results.find((r) => r.key === 'cappedBase')!.value;
  const ee = out.results.find((r) => r.key === 'employeeShare')!.value;
  assert.equal(capped, 2750);
  assert.equal(ee, 2750 * 8 / 100 + 1500 * 2.5 / 100);
});
