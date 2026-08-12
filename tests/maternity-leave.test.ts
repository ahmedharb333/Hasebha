import { test } from 'node:test';
import assert from 'node:assert/strict';
import { maternityLeave } from '../src/lib/calculators/maternity-leave.ts';

function days(country: string): number {
  const out = maternityLeave.calculate({ country });
  return out.results.find((r) => r.key === 'maternityDays')!.value;
}

test('maternity-leave: Jordan 90 days', () => assert.equal(days('jo'), 90));
test('maternity-leave: Saudi Arabia 84 days', () => assert.equal(days('sa'), 84));
test('maternity-leave: Kuwait 70 days', () => assert.equal(days('kw'), 70));
test('maternity-leave: UAE 60 days', () => assert.equal(days('ae'), 60));
test('maternity-leave: Qatar 50 days', () => assert.equal(days('qa'), 50));
test('maternity-leave: Bahrain 60 days', () => assert.equal(days('bh'), 60));
test('maternity-leave: Oman 98 days', () => assert.equal(days('om'), 98));

test('maternity-leave: weeks are days / 7 rounded', () => {
  const out = maternityLeave.calculate({ country: 'jo' });
  assert.equal(out.results.find((r) => r.key === 'maternityWeeks')!.value, Math.round(90 / 7));
});

test('maternity-leave: country required', () => {
  const e = maternityLeave.validate({ country: '' });
  assert.equal(e.country, 'required');
});

test('maternity-leave: invalid country rejected', () => {
  const e = maternityLeave.validate({ country: 'zz' });
  assert.equal(e.country, 'invalid');
});
