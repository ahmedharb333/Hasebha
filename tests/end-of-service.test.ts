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

test('end-of-service: multi-band summation (sa 6y = 15\u00d75 + 30\u00d71)', () => {
  const out = endOfService.calculate({ country: 'sa', startDate: '2000-01-01', endDate: '2006-01-01', monthlyBasic: '3000', resignation: 'terminated', currency: 'SAR' });
  assert.equal(out.results.find((r) => r.key === 'days')!.value, 105);
});

test('end-of-service: capMonths clamps the total (kw 22y = 585 \u2192 540)', () => {
  const out = endOfService.calculate({ country: 'kw', startDate: '2000-01-01', endDate: '2022-01-01', monthlyBasic: '1000', resignation: 'terminated', currency: 'KWD' });
  assert.equal(out.results.find((r) => r.key === 'days')!.value, 540);
});

test('end-of-service: exact anniversary stays in the lower band (sa 5.0y = 75 days)', () => {
  const out = endOfService.calculate({ country: 'sa', startDate: '2000-01-01', endDate: '2005-01-01', monthlyBasic: '3000', resignation: 'terminated', currency: 'SAR' });
  assert.equal(out.results.find((r) => r.key === 'days')!.value, 75);
});

test('end-of-service: resignation scaling is inclusive at the anniversary (kw 5.0y voluntary \u2248 2/3)', () => {
  const term = endOfService.calculate({ country: 'kw', startDate: '2000-01-01', endDate: '2005-01-01', monthlyBasic: '1000', resignation: 'terminated', currency: 'KWD' });
  const vol = endOfService.calculate({ country: 'kw', startDate: '2000-01-01', endDate: '2005-01-01', monthlyBasic: '1000', resignation: 'voluntary', currency: 'KWD' });
  assert.equal(term.results.find((r) => r.key === 'days')!.value, 75);
  assert.ok(Math.abs(vol.results.find((r) => r.key === 'days')!.value - 50) < 1e-9);
});
