import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CALCULATORS, CATEGORIES } from '../src/config/calculators.ts';
import { getMath } from '../src/lib/calculators/index.ts';
import { getCalcContent } from '../src/content/calculators/index.ts';
import { mathLoaders } from '../src/lib/client/registry.ts';
import guides from '../src/content/guides.ts';

test('catalog: every category has metadata', () => {
  for (const id of ['finance', 'employment', 'health', 'education', 'everyday', 'business'] as const) {
    assert.ok(CATEGORIES[id], `CATEGORIES.${id}`);
    assert.ok(CATEGORIES[id].label.ar && CATEGORIES[id].label.en);
  }
});

const active = CALCULATORS.filter((c) => c.active);

test('catalog: all active calculators have every artifact', () => {
  assert.ok(active.length >= 10, 'at least the original ten');
  for (const entry of active) {
    assert.equal(entry.id, entry.slug, `${entry.slug}: id === slug`);
    assert.ok(entry.guide, `${entry.slug}: guide slug present`);
    assert.doesNotThrow(() => getMath(entry.slug), `${entry.slug}: math registered`);
    assert.ok(mathLoaders[entry.slug], `${entry.slug}: client loader registered`);
    assert.ok(guides[entry.guide]?.ar && guides[entry.guide]?.en, `${entry.slug}: guide localized`);
    for (const locale of ['ar', 'en'] as const) {
      const content = getCalcContent(entry.slug, locale);
      assert.equal(content.slug, entry.slug, `${entry.slug}: content slug matches (${locale})`);
      assert.ok(content.title && content.h1 && content.metaDescription, `${entry.slug}: prose present (${locale})`);
    }
  }
});

test('catalog: tier-B entries are reserved and inactive', () => {
  const reserved = ['maternity-leave', 'gross-to-net', 'income-tax'];
  for (const slug of reserved) {
    const entry = CALCULATORS.find((c) => c.slug === slug);
    assert.ok(entry, `${slug}: reserved entry exists`);
    assert.equal(entry.active, false, `${slug}: inactive`);
    assert.equal(entry.category, 'employment', `${slug}: employment category`);
  }
});

test('catalog: activated Tier B employment tools are active', () => {
  const activated = ['end-of-service', 'social-insurance', 'notice-period'];
  for (const slug of activated) {
    const entry = CALCULATORS.find((c) => c.slug === slug);
    assert.ok(entry, `${slug}: entry exists`);
    assert.equal(entry.active, true, `${slug}: active`);
    assert.equal(entry.category, 'employment', `${slug}: employment category`);
  }
});
