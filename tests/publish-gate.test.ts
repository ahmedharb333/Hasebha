import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateRegistry } from '../src/lib/country-rules/publish-gate.ts';
import { getRegisteredCountries } from '../src/lib/country-rules/registry.ts';

test('publish-gate: all registered countries have zero violations', () => {
  const violations = validateRegistry();
  assert.deepEqual(violations, []);
});

test('publish-gate: exactly the 7 first-wave countries are registered', () => {
  const codes = getRegisteredCountries().map((r) => r.code).sort();
  assert.deepEqual(codes, ['ae', 'bh', 'jo', 'kw', 'om', 'qa', 'sa']);
});
