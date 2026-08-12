import { test } from 'node:test';
import assert from 'node:assert/strict';
import { endOfService } from '../src/lib/calculators/end-of-service.ts';

test('end-of-service: computes gratuity for a Jordanian case', () => {
  const out = endOfService.calculate({ country: 'jo', startDate: '2019-01-02', endDate: '2024-01-03', monthlyBasic: '900', resignation: 'terminated', currency: 'JOD' });
  assert.ok(out.results[0].value > 0);
  assert.equal(out.results[0].kind, 'currency');
});

test('end-of-service: voluntary resignation scales Kuwait gratuity', () => {
  const out = endOfService.calculate({ country: 'kw', startDate: '2017-01-01', endDate: '2020-01-01', monthlyBasic: '1000', resignation: 'voluntary', currency: 'KWD' });
  const outTerm = endOfService.calculate({ country: 'kw', startDate: '2017-01-01', endDate: '2020-01-01', monthlyBasic: '1000', resignation: 'terminated', currency: 'KWD' });
  assert.ok(out.results[0].value < outTerm.results[0].value);
});

test('end-of-service: missing country is required', () => {
  const e = endOfService.validate({ country: '', startDate: '2019-01-01', endDate: '2024-01-01', monthlyBasic: '900', resignation: 'terminated', currency: 'JOD' });
  assert.equal(e.country, 'required');
});

test('end-of-service: currency mismatch flagged', () => {
  const e = endOfService.validate({ country: 'jo', currency: 'SAR', startDate: '2019-01-01', endDate: '2024-01-01', monthlyBasic: '900', resignation: 'terminated' });
  assert.equal(e.currency, 'countryMismatch');
});
