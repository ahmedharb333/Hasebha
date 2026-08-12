import { test } from 'node:test';
import assert from 'node:assert/strict';
import { COUNTRIES, DEFAULT_COUNTRY, getCountry } from '../src/config/countries.ts';
import { COUNTRY_LABELS } from '../src/content/countries.ts';
import { COUNTRY_CODES } from '../src/lib/country-rules/registry.ts';

test('countries: registry codes match config + content labels', () => {
  const cfgCodes = COUNTRIES.map((c) => c.code).sort();
  assert.deepEqual(cfgCodes, [...COUNTRY_CODES].sort());
  for (const code of COUNTRY_CODES) {
    assert.ok(COUNTRY_LABELS.ar[code]?.length > 0, `ar label missing for ${code}`);
    assert.ok(COUNTRY_LABELS.en[code]?.length > 0, `en label missing for ${code}`);
  }
});

test('countries: default is jo and getCountry resolves', () => {
  assert.equal(DEFAULT_COUNTRY, 'jo');
  assert.equal(getCountry('sa')?.iso, 'SA');
  assert.equal(getCountry('xx'), undefined);
});
