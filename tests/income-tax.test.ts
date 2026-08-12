import { test } from 'node:test';
import assert from 'node:assert/strict';
import { incomeTax } from '../src/lib/calculators/income-tax.ts';

function row(out: ReturnType<typeof incomeTax.calculate>, key: string) {
  return out.results.find((r) => r.key === key)!.value;
}

test('income-tax: Jordan annual 15,000 → 350 after 9,000 allowance', () => {
  const out = incomeTax.calculate({ country: 'jo', annualIncome: '15000', currency: 'JOD' });
  assert.equal(row(out, 'taxAmount'), 350);
  assert.equal(row(out, 'taxableIncome'), 6000);
  assert.ok(Math.abs(row(out, 'effectiveRate') - (350 / 15000) * 100) < 1e-9);
});

test('income-tax: income below allowance is tax-free', () => {
  const out = incomeTax.calculate({ country: 'jo', annualIncome: '8000', currency: 'JOD' });
  assert.equal(row(out, 'taxAmount'), 0);
  assert.equal(row(out, 'taxableIncome'), 0);
});

test('income-tax: no-personal-income-tax countries are 0', () => {
  for (const code of ['sa', 'kw', 'ae', 'qa', 'bh', 'om']) {
    const out = incomeTax.calculate({ country: code, annualIncome: '100000', currency: 'SAR' });
    assert.equal(row(out, 'taxAmount'), 0, `${code}: tax 0`);
    assert.equal(row(out, 'effectiveRate'), 0, `${code}: effective rate 0`);
  }
});

test('income-tax: country required', () => {
  const e = incomeTax.validate({ country: '', annualIncome: '1000', currency: 'JOD' });
  assert.equal(e.country, 'required');
});

test('income-tax: currency mismatch flagged', () => {
  const e = incomeTax.validate({ country: 'jo', annualIncome: '1000', currency: 'SAR' });
  assert.equal(e.currency, 'countryMismatch');
});
