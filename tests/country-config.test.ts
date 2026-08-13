import { test } from 'node:test';
import assert from 'node:assert/strict';
import { COUNTRIES, DEFAULT_COUNTRY, getCountry } from '../src/config/countries.ts';
import { COUNTRY_CODES } from '../src/lib/country-rules/registry.ts';

test('countries: registry codes match config labels', () => {
  const cfgCodes = COUNTRIES.map((c) => c.code).sort();
  assert.deepEqual(cfgCodes, [...COUNTRY_CODES].sort());
  for (const code of COUNTRY_CODES) {
    const entry = getCountry(code);
    assert.ok(entry, `config entry missing for ${code}`);
    assert.ok(entry.labelAr.length > 0, `ar label missing for ${code}`);
    assert.ok(entry.labelEn.length > 0, `en label missing for ${code}`);
  }
});

test('countries: default is jo and getCountry resolves', () => {
  assert.equal(DEFAULT_COUNTRY, 'jo');
  assert.equal(getCountry('sa')?.iso, 'SA');
  assert.equal(getCountry('xx'), undefined);
});
