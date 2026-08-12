import { test } from 'node:test';
import assert from 'node:assert/strict';
import { noticePeriod } from '../src/lib/calculators/notice-period.ts';

test('notice-period: Saudi worker-side notice is 30 days regardless of tenure', () => {
  const out = noticePeriod.calculate({ country: 'sa', tenureYears: '7' });
  const days = out.results.find((r) => r.key === 'noticeDays')!.value;
  const months = out.results.find((r) => r.key === 'noticeMonths')!.value;
  assert.equal(days, 30);
  assert.equal(months, 1);
});

test('notice-period: Kuwait notice is 90 days (three months)', () => {
  const out = noticePeriod.calculate({ country: 'kw', tenureYears: '10' });
  assert.equal(out.results.find((r) => r.key === 'noticeDays')!.value, 90);
  assert.equal(out.results.find((r) => r.key === 'noticeMonths')!.value, 3);
});

test('notice-period: Jordan notice is 30 days', () => {
  const out = noticePeriod.calculate({ country: 'jo', tenureYears: '20' });
  assert.equal(out.results.find((r) => r.key === 'noticeDays')!.value, 30);
});

test('notice-period: country required', () => {
  const e = noticePeriod.validate({ country: '', tenureYears: '5' });
  assert.equal(e.country, 'required');
});

test('notice-period: invalid country rejected', () => {
  const e = noticePeriod.validate({ country: 'zz', tenureYears: '5' });
  assert.equal(e.country, 'invalid');
});

test('notice-period: missing tenure required', () => {
  const e = noticePeriod.validate({ country: 'jo', tenureYears: '' });
  assert.equal(e.tenureYears, 'required');
});
