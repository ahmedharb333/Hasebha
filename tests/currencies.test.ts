import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CURRENCIES, getCurrency, DEFAULT_CURRENCY } from '../src/config/currencies.ts';

test('currencies: default is JOD', () => {
  assert.equal(DEFAULT_CURRENCY, 'JOD');
});

test('currencies: contains all 9 codes with label/decimals', () => {
  const codes = CURRENCIES.map((c) => c.code).sort();
  assert.deepEqual(codes, ['AED', 'BHD', 'EUR', 'JOD', 'KWD', 'OMR', 'QAR', 'SAR', 'USD'].sort());
  for (const c of CURRENCIES) {
    assert.ok(c.labelAr.length > 0);
    assert.ok(c.labelEn.length > 0);
    assert.ok(c.decimals >= 0 && c.decimals <= 3);
    assert.equal(c.iso, c.code);
  }
});

test('currencies: getCurrency falls back to JOD', () => {
  assert.equal(getCurrency('KWD').code, 'KWD');
  assert.equal(getCurrency('nope').code, 'JOD');
});
