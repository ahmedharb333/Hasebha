import { test } from 'node:test';
import assert from 'node:assert/strict';
import { grossToNet } from '../src/lib/calculators/gross-to-net.ts';
import { annualTax } from '../src/lib/calculators/tax.ts';

function row(out: ReturnType<typeof grossToNet.calculate>, key: string) {
  return out.results.find((r) => r.key === key)!.value;
}

test('gross-to-net: annualTax taxes each slice at its own bracket rate (350 fixture)', () => {
  const brackets = [
    { from: 0, rate: 5 },
    { from: 5000, rate: 10 },
    { from: 10000, rate: 15 },
    { from: 15000, rate: 20 },
  ];
  assert.equal(annualTax(brackets, 6000), 5000 * 0.05 + 1000 * 0.1);
});

test('gross-to-net: annualTax returns 0 when annual is 0 or below first bracket', () => {
  const brackets = [
    { from: 0, rate: 5 },
    { from: 5000, rate: 10 },
  ];
  assert.equal(annualTax(brackets, 0), 0);
});

test('gross-to-net: annualTax handles empty brackets (no income tax)', () => {
  assert.equal(annualTax([], 100000), 0);
});

test('gross-to-net: Jordan deducts social insurance then income tax', () => {
  const out = grossToNet.calculate({ country: 'jo', monthlyGross: '1500', currency: 'JOD' });
  const si = row(out, 'socialInsurance');
  const tax = row(out, 'incomeTax');
  const net = row(out, 'netMonthly');
  const total = row(out, 'totalDeductions');
  assert.equal(si, Math.min(1500, 3733) * 7.5 / 100);
  assert.ok(Math.abs(tax - 650 / 12) < 1e-9, `tax ${tax} expected ${650 / 12}`);
  assert.ok(Math.abs(net - (1500 - si - tax)) < 1e-9);
  assert.ok(Math.abs(total - (si + tax)) < 1e-9);
});

test('gross-to-net: Jordan caps social insurance above the ceiling', () => {
  const out = grossToNet.calculate({ country: 'jo', monthlyGross: '10000', currency: 'JOD' });
  assert.equal(row(out, 'socialInsurance'), 3733 * 7.5 / 100);
});

test('gross-to-net: Saudi Arabia deducts social insurance only (no income tax)', () => {
  const out = grossToNet.calculate({ country: 'sa', monthlyGross: '15000', currency: 'SAR' });
  assert.equal(row(out, 'socialInsurance'), 15000 * 9.75 / 100);
  assert.equal(out.results.some((r) => r.key === 'incomeTax'), false);
  assert.equal(row(out, 'netMonthly'), 15000 - 15000 * 9.75 / 100);
});

test('gross-to-net: currency mismatch flagged', () => {
  const e = grossToNet.validate({ country: 'sa', monthlyGross: '1000', currency: 'JOD' });
  assert.equal(e.currency, 'countryMismatch');
});

test('gross-to-net: missing country required', () => {
  const e = grossToNet.validate({ country: '', monthlyGross: '1000', currency: 'JOD' });
  assert.equal(e.country, 'required');
});

test('gross-to-net: Kuwait deducts supplementary-insurance band from net', () => {
  const out = grossToNet.calculate({ country: 'kw', monthlyGross: '1500', currency: 'KWD' });
  const si = row(out, 'socialInsurance');
  assert.equal(si, 1500 * 8 / 100 + 1500 * 2.5 / 100);
  assert.equal(row(out, 'netMonthly'), 1500 - si);
});
