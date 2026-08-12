# Klar — Country Labour-Law Engine Implementation Plan (First Wave: 7 Countries)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the country labour-law engine: pure-TS statutory rule data for **7 countries (jo, sa, ae, kw, qa, bh, om)** with a strict publish gate, a country selector in the header (employment pages only), a per-tool `country` field on employment calculators, the **6 Tier B tools activated** (end-of-service, social-insurance, notice-period, maternity-leave, gross-to-net, income-tax), and **retrofits** to `overtime-pay` (law-driven multiplier) and `leave-balance` (country annual-leave default).

**Design spec:** `docs/superpowers/specs/2026-08-10-country-labour-law-engine-design.md` (approved). This plan implements it.

**Architecture:** Pure TS rule modules (`src/lib/country-rules/<code>.ts`) + registry + publish gate. Math engines stay pure: `validate`/`calculate` receive `input.country` and look up rules via the registry — **no DOM coupling changes to selectors**; additive client hook only for country/currency defaults. Currency list extended by 4 codes (KWD, QAR, BHD, OMR). Tier B tools are ordinary calculators (config + math + content + guide + tests), same pattern as the catalog expansion.

**Tech Stack:** Astro, plain TS (type-only, no framework), node:test. `npm test` = `node --test "tests/**/*.test.ts"`.

## Global Constraints

- **Never rename** the client selectors `calculatorApp.ts` depends on: `.calc-form`, `.calc-result`, `[data-field="<id>"]`, `.field--invalid`, `[data-action="example|reset"]`, `select[data-role="currency"]`. All additions are additive.
- **No sourced rule, no ship.** Every country module value must trace to a `RuleSource {title, url, accessed}`; `accessed` is the date the URL was last checked. The publish-gate test fails the build with violations listed.
- **No invented law.** Draft figures below are research baselines from the planning pass; each country task **must verify every figure against the listed official source before committing**, update the value if the source differs, and record the exact URL + accessed date.
- **Math engines stay pure.** `src/lib/country-rules/*` and `src/lib/calculators/*` never touch `document`, `localStorage`, or `Astro`. Client concerns live in `src/lib/client/country.ts` and the additive hook in `calculatorApp.ts`.
- **Currency is display-only.** Rules apply only when the tool's selected currency equals the country's rule currency; otherwise `validate` returns a `countryMismatch` error on the currency field (localized message, no conversion).
- **Do not touch** `src/lib/calculators/` files other than `overtime.ts`, `leave-balance.ts` and the 6 new Tier B files; do not touch `src/content/calculators/*` other than the 6 new files and the two retrofit content files; do not touch `src/lib/client/registry.ts` beyond appending the 6 new registrations; do not touch `src/styles/**` except where a task explicitly says.
- **Storage keys:** `klar-country` (site country default) — matches the rebrand's `klar-*` convention. `klar-theme` and `klar-consent-v1` stay untouched.
- **Currency field default on Tier B tools:** server default `'JOD'`. The additive client hook overrides it from the stored/selected country at init. Never make currency a client-only field.
- Brand references in new content use every guide's audience copy style already in `src/content/guides.ts` (no "Klar" self-promotion; plain factual tone, AR + EN).
- Commit style: `feat(country-rules): ...` for engine work, `feat(calc): ...` for tool activations. Mark plan checkboxes via line-range `- [ ]` → `- [x]`.

## File Structure

New files:
- `src/lib/country-rules/types.ts` — `CountryCode`, `RuleSource`, per-category rule interfaces, `CountryRules`.
- `src/lib/country-rules/registry.ts` — static import map of the 7 modules; `getCountryRules`, `getRegisteredCountries`, `isRegistered`.
- `src/lib/country-rules/publish-gate.ts` — `validateCountryRules(rules): string[]` (violations) + `validateRegistry(): string[]`.
- `src/lib/country-rules/{jo,sa,ae,kw,qa,bh,om}.ts` — the 7 country data modules.
- `src/config/countries.ts` — ordered `COUNTRIES` array, `DEFAULT_COUNTRY`, `COUNTRY_STORAGE_KEY`, `getCountry`.
- `src/content/countries.ts` — localized country labels + shared country-field copy (error messages, hint, notice strings).
- `src/lib/client/country.ts` — pure storage helpers (`getStoredCountry`, `setStoredCountry`, `DEFAULT_COUNTRY`) + DOM hook `applyStoredCountry(shellEl)` + header selector wiring `initCountrySelector()`.
- `src/lib/calculators/{end-of-service,social-insurance,notice-period,maternity-leave,gross-to-net,income-tax}.ts` — math.
- `src/content/calculators/{end-of-service,social-insurance,notice-period,maternity-leave,gross-to-net,income-tax}.ts` — ar/en content.
- `tests/{country-config,country-rules-jo,country-rules-sa,country-rules-ae,country-rules-kw,country-rules-qa,country-rules-bh,country-rules-om,publish-gate,country-client}.test.ts` — engine tests.
- `tests/{end-of-service,social-insurance,notice-period,maternity-leave,gross-to-net,income-tax}.test.ts` — tool tests.

Modified files:
- `src/config/currencies.ts` — add KWD, QAR, BHD, OMR.
- `src/config/calculators.ts` — activate the 6 Tier B entries; set `related`/`guide`.
- `src/lib/calculators/index.ts`, `src/lib/client/registry.ts`, `src/content/calculators/index.ts` — 6 registrations each.
- `src/lib/calculators/overtime.ts`, `leave-balance.ts` (+ their content files) — retrofits.
- `src/components/Header.astro` — employment-only country selector (right of nav, before theme toggle).
- `src/lib/client/calculatorApp.ts` — additive `initCountryDefault()` called inside `initCalculator()`.
- `src/content/guides.ts` — 6 new Tier B guides.
- `src/lib/i18n.ts` — no change (slugs are single words; all Tier B slugs are already in `src/config/calculators.ts`).

## Catalog state (must stay true)

Active calculators before this plan: **31** (finance 11, employment 5, health 5, education 3, everyday 4, business 3). After: **37** (employment 11). Tier B slugs already reserved in config with `active: false`: `end-of-service`, `social-insurance`, `notice-period`, `maternity-leave`, `gross-to-net`, `income-tax`. Pages are generated by `src/pages/calculators/[segment].astro` + `src/pages/en/calculators/[segment].astro` from `CALCULATORS` — activation is purely config-driven.

## Execution order (dependency-correct)

The registry/publish-gate land at Task 13, but Tasks 3-5 (country config test, header selector client, calculatorApp hook) import the registry. Execute in this order so every commit is green: **1 → 2 → 6 → 7 → 8 → 9 → 10 → 11 → 12 → 13 → 3 → 4 → 5 → 14 → 15 → 16 → 17 → 18 → 19 → 20 → 21 → 22**. Country modules (6-12) import only `types.ts` + `currencies.ts`, so they are registry-independent. `tests/country-config.test.ts` (Task 3) and the per-country sanity tests (Tasks 6-12) land with Task 13's engine commit.

---

### Task 1: Extend the currency set (KWD, QAR, BHD, OMR)

**Why:** country rule modules reference their statutory currencies; the 4 GCC currencies are absent from `src/config/currencies.ts` (currently 5 codes).

Modify `src/config/currencies.ts`:

```ts
export type CurrencyCode = 'JOD' | 'SAR' | 'AED' | 'USD' | 'EUR' | 'KWD' | 'QAR' | 'BHD' | 'OMR';
```

Append to `CURRENCIES` (keep existing entries unchanged):

```ts
  { code: 'KWD', labelAr: 'دينار كويتي', labelEn: 'Kuwaiti dinar', decimals: 3, iso: 'KWD' },
  { code: 'QAR', labelAr: 'ريال قطري', labelEn: 'Qatari riyal', decimals: 2, iso: 'QAR' },
  { code: 'BHD', labelAr: 'دينار بحريني', labelEn: 'Bahraini dinar', decimals: 3, iso: 'BHD' },
  { code: 'OMR', labelAr: 'ريال عماني', labelEn: 'Omani rial', decimals: 3, iso: 'OMR' },
```

Add `tests/currencies.test.ts`:

```ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CURRENCIES, getCurrency, DEFAULT_CURRENCY } from '../src/config/currencies';

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
```

- [ ] Step 1: edit `src/config/currencies.ts` (type + 4 entries).
- [ ] Step 2: create `tests/currencies.test.ts` with the tests above.
- [ ] Step 3: `npm test` — all pass (existing 167 + 3 new). `npm run check` — 0 errors.
- [ ] Step 4: commit `feat(country-rules): extend currency set with KWD, QAR, BHD, OMR`.

---

### Task 2: Country-rules data model + registry + publish gate

Create `src/lib/country-rules/types.ts`:

```ts
import type { CurrencyCode } from '../../config/currencies';

export type CountryCode = 'jo' | 'sa' | 'ae' | 'kw' | 'qa' | 'bh' | 'om';

export interface RuleSource {
  title: string;
  url: string;
  /** ISO date the URL was last verified. */
  accessed: string;
}

export type OvertimeKind = 'standard' | 'night' | 'rest_day' | 'public_holiday';

export interface OvertimeRules {
  multipliers: { kind: OvertimeKind; multiplier: number }[];
  weeklyCapHours?: number;
  source: RuleSource;
  effectiveFrom: string;
}

export interface EndOfServiceRules {
  /** days-per-year band. daily wage = last monthly wage / 30. */
  bands: { fromYears: number; daysPerYear: number }[];
  /** optional cap on total payout in whole months of wage. */
  capMonths?: number;
  /** optional resignation scaling (e.g. Kuwait): fraction of full gratuity. */
  resignation?: { fromYears: number; fraction: number }[];
  source: RuleSource;
  effectiveFrom: string;
}

export interface SocialInsuranceRules {
  employeeRate: number; // percent
  employerRate: number; // percent
  capMonthly: number;
  /** 'citizens' | 'all' — who is covered. */
  appliesTo: 'citizens' | 'all';
  source: RuleSource;
  effectiveFrom: string;
}

export interface NoticePeriodRules {
  bands: { fromYears: number; days: number }[];
  source: RuleSource;
  effectiveFrom: string;
}

export interface LeaveRules {
  annualDays: { fromYears: number; days: number }[];
  maternityDays: number;
  source: RuleSource;
  effectiveFrom: string;
}

export interface IncomeTaxRules {
  /** empty brackets means no personal income tax (all GCC). */
  brackets: { from: number; rate: number }[];
  personalAllowance: number;
  source: RuleSource;
  effectiveFrom: string;
}

export interface GrossToNetRules {
  /** deduction step codes in application order, subset of 'socialInsurance' | 'incomeTax'. */
  order: ('socialInsurance' | 'incomeTax')[];
  source: RuleSource;
  effectiveFrom: string;
}

export interface CountryRules {
  code: CountryCode;
  currency: CurrencyCode;
  overtime: OvertimeRules;
  endOfService: EndOfServiceRules;
  socialInsurance: SocialInsuranceRules;
  noticePeriod: NoticePeriodRules;
  leave: LeaveRules;
  incomeTax: IncomeTaxRules;
  grossToNet: GrossToNetRules;
}
```

Create `src/lib/country-rules/registry.ts`:

```ts
import type { CountryCode, CountryRules } from './types';
import { jo } from './jo';
import { sa } from './sa';
import { ae } from './ae';
import { kw } from './kw';
import { qa } from './qa';
import { bh } from './bh';
import { om } from './om';

const REGISTRY: Record<CountryCode, CountryRules> = { jo, sa, ae, kw, qa, bh, om };
export const COUNTRY_CODES = Object.keys(REGISTRY) as CountryCode[];

export function isRegistered(code: string): code is CountryCode {
  return code in REGISTRY;
}

export function getCountryRules(code: string): CountryRules | undefined {
  return isRegistered(code) ? REGISTRY[code] : undefined;
}

export function getRegisteredCountries(): CountryRules[] {
  return COUNTRY_CODES.map((code) => REGISTRY[code]);
}
```

Create `src/lib/country-rules/publish-gate.ts` (pure validation, no DOM):

```ts
import { CURRENCIES } from '../../config/currencies';
import { getRegisteredCountries } from './registry';
import type { CountryCode, RuleSource } from './types';

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function checkSource(prefix: string, src: RuleSource | undefined, out: string[]): void {
  if (!src) { out.push(`${prefix}: missing source`); return; }
  if (!src.title || src.title.trim().length < 10) out.push(`${prefix}: source title too short`);
  if (!src.url || !/^https:\/\//.test(src.url)) out.push(`${prefix}: source url must be https`);
  if (!ISO_DATE.test(src.accessed)) out.push(`${prefix}: accessed must be ISO date`);
  else if (src.accessed > new Date().toISOString().slice(0, 10)) out.push(`${prefix}: accessed date is in the future`);
  if (!ISO_DATE.test(src.effectiveFrom) && src.effectiveFrom !== '') out.push(`${prefix}: effectiveFrom must be ISO date or empty`);
}

export function validateCountryRules(r: CountryRules): string[] {
  const out: string[] = [];
  const p = `${r.code}`;

  if (!CURRENCIES.some((c) => c.code === r.currency)) out.push(`${p}: currency ${r.currency} not in CURRENCIES`);

  // overtime
  if (r.overtime.multipliers.length === 0) out.push(`${p}: overtime.multipliers empty`);
  for (const m of r.overtime.multipliers) {
    if (m.multiplier <= 1 || m.multiplier > 3) out.push(`${p}: overtime ${m.kind} multiplier ${m.multiplier} out of (1,3]`);
    if (!['standard', 'night', 'rest_day', 'public_holiday'].includes(m.kind)) out.push(`${p}: overtime unknown kind ${m.kind}`);
  }
  if (r.overtime.weeklyCapHours !== undefined && r.overtime.weeklyCapHours < 40) out.push(`${p}: weeklyCapHours too low`);
  checkSource(`${p}.overtime`, r.overtime.source, out);

  // end-of-service
  if (r.endOfService.bands.length === 0) out.push(`${p}: endOfService.bands empty`);
  let prev = -1;
  for (const b of r.endOfService.bands) {
    if (b.fromYears <= prev) out.push(`${p}: endOfService bands not strictly ascending`);
    if (b.daysPerYear <= 0 || b.daysPerYear > 60) out.push(`${p}: endOfService daysPerYear ${b.daysPerYear} out of (0,60]`);
    prev = b.fromYears;
  }
  if (r.endOfService.capMonths !== undefined && r.endOfService.capMonths <= 0) out.push(`${p}: endOfService.capMonths must be > 0`);
  if (r.endOfService.resignation?.length) {
    let rp = -1;
    for (const s of r.endOfService.resignation) {
      if (s.fromYears <= rp || s.fraction < 0 || s.fraction > 1) out.push(`${p}: resignation scaling invalid`);
      rp = s.fromYears;
    }
  }
  checkSource(`${p}.endOfService`, r.endOfService.source, out);

  // social insurance
  if (r.socialInsurance.employeeRate < 0 || r.socialInsurance.employeeRate > 100) out.push(`${p}: eeRate out of range`);
  if (r.socialInsurance.employerRate < 0 || r.socialInsurance.employerRate > 100) out.push(`${p}: erRate out of range`);
  if (r.socialInsurance.capMonthly <= 0) out.push(`${p}: capMonthly must be > 0`);
  if (!['citizens', 'all'].includes(r.socialInsurance.appliesTo)) out.push(`${p}: appliesTo invalid`);
  checkSource(`${p}.socialInsurance`, r.socialInsurance.source, out);

  // notice
  if (r.noticePeriod.bands.length === 0) out.push(`${p}: noticePeriod.bands empty`);
  let np = -1;
  for (const b of r.noticePeriod.bands) {
    if (b.fromYears <= np || b.days <= 0 || b.days > 365) out.push(`${p}: noticePeriod band invalid`);
    np = b.fromYears;
  }
  checkSource(`${p}.noticePeriod`, r.noticePeriod.source, out);

  // leave
  if (r.leave.annualDays.length === 0 || r.leave.maternityDays <= 0) out.push(`${p}: leave invalid`);
  let lp = -1;
  for (const b of r.leave.annualDays) { if (b.fromYears <= lp || b.days <= 0) out.push(`${p}: leave annualDays invalid`); lp = b.fromYears; }
  checkSource(`${p}.leave`, r.leave.source, out);

  // income tax
  if (r.incomeTax.personalAllowance < 0) out.push(`${p}: incomeTax.personalAllowance negative`);
  let tp = -1;
  for (const b of r.incomeTax.brackets) { if (b.from <= tp || b.rate <= 0 || b.rate > 100) out.push(`${p}: incomeTax bracket invalid`); tp = b.from; }
  checkSource(`${p}.incomeTax`, r.incomeTax.source, out);

  // gross-to-net
  if (r.grossToNet.order.length === 0) out.push(`${p}: grossToNet.order empty`);
  for (const s of r.grossToNet.order) if (!['socialInsurance', 'incomeTax'].includes(s)) out.push(`${p}: grossToNet unknown step ${s}`);
  checkSource(`${p}.grossToNet`, r.grossToNet.source, out);

  return out;
}

export function validateRegistry(): string[] {
  const out: string[] = [];
  for (const r of getRegisteredCountries()) out.push(...validateCountryRules(r));
  const codes = getRegisteredCountries().map((r) => r.code);
  if (new Set(codes).size !== codes.length) out.push('registry: duplicate country codes');
  return out;
}

export function assertPublishGate(): void {
  const violations = validateRegistry();
  if (violations.length > 0) {
    throw new Error(`country-rules publish gate FAILED:\n${violations.map((v) => ` - ${v}`).join('\n')}`);
  }
}
```

Create `tests/publish-gate.test.ts`:

```ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateRegistry } from '../src/lib/country-rules/publish-gate';
import { getRegisteredCountries } from '../src/lib/country-rules/registry';

test('publish-gate: all registered countries have zero violations', () => {
  const violations = validateRegistry();
  assert.deepEqual(violations, []);
});

test('publish-gate: exactly the 7 first-wave countries are registered', () => {
  const codes = getRegisteredCountries().map((r) => r.code).sort();
  assert.deepEqual(codes, ['ae', 'bh', 'jo', 'kw', 'om', 'qa', 'sa']);
});
```

**Ordering note:** `registry.ts` imports the 7 modules; Tasks 6–12 create them. Until those exist, `astro check`/`npm test` fail on missing imports. To keep every commit green, implement the engine as one committed unit: Tasks 2 → 6-12 → 13 in dependency order, with the registry/publish-gate files and the 7 country modules all landing before the gate test is added (Task 13 completes the engine). Task 2 creates `types.ts` only; Task 13 adds `registry.ts` + `publish-gate.ts` + gate test once all 7 modules exist.

- [ ] Step 1: create `src/lib/country-rules/types.ts` (exact code above).
- [ ] Step 2: `npm run check` — 0 errors.
- [ ] Step 3: commit `feat(country-rules): country-rules data model types`.

---

### Task 3: Country config + localized labels

Create `src/config/countries.ts`:

```ts
import type { CountryCode } from '../lib/country-rules/types';

export const COUNTRY_STORAGE_KEY = 'klar-country';

export interface Country {
  code: CountryCode;
  labelAr: string;
  labelEn: string;
  /** ISO 3166-1 alpha-2 uppercase, for display. */
  iso: string;
}

export const COUNTRIES: Country[] = [
  { code: 'jo', labelAr: 'الأردن', labelEn: 'Jordan', iso: 'JO' },
  { code: 'sa', labelAr: 'السعودية', labelEn: 'Saudi Arabia', iso: 'SA' },
  { code: 'ae', labelAr: 'الإمارات', labelEn: 'UAE', iso: 'AE' },
  { code: 'kw', labelAr: 'الكويت', labelEn: 'Kuwait', iso: 'KW' },
  { code: 'qa', labelAr: 'قطر', labelEn: 'Qatar', iso: 'QA' },
  { code: 'bh', labelAr: 'البحرين', labelEn: 'Bahrain', iso: 'BH' },
  { code: 'om', labelAr: 'عمان', labelEn: 'Oman', iso: 'OM' },
];

export const DEFAULT_COUNTRY: CountryCode = 'jo';

export function getCountry(code: string): Country | undefined {
  return COUNTRIES.find((c) => c.code === code);
}
```

Create `src/content/countries.ts` (localized labels used by tool content and the header selector; plus shared country-field copy):

```ts
import type { Locale } from '../config/site';

export const COUNTRY_LABELS: Record<Locale, Record<string, string>> = {
  ar: {
    jo: 'الأردن', sa: 'السعودية', ae: 'الإمارات', kw: 'الكويت', qa: 'قطر', bh: 'البحرين', om: 'عمان',
  },
  en: {
    jo: 'Jordan', sa: 'Saudi Arabia', ae: 'UAE', kw: 'Kuwait', qa: 'Qatar', bh: 'Bahrain', om: 'Oman',
  },
};

export const countryField = {
  label: { ar: 'البلد', en: 'Country' },
  hint: {
    ar: 'اختر البلد لتطبيق قوانين العمل الخاصة به.',
    en: 'Select the country to apply its labour-law rules.',
  },
  required: {
    ar: 'يرجى اختيار البلد.',
    en: 'Please select a country.',
  },
  invalid: {
    ar: 'بلد غير معروف.',
    en: 'Unknown country.',
  },
  mismatch: {
    ar: 'قوانين هذا البلد تتطلب عملة مختلفة. اختر العملة الصحيحة.',
    en: 'This country\u2019s rules require a different currency. Select the correct currency.',
  },
};
```

Add `tests/country-config.test.ts`:

```ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { COUNTRIES, DEFAULT_COUNTRY, getCountry } from '../src/config/countries';
import { COUNTRY_LABELS } from '../src/content/countries';
import { COUNTRY_CODES } from '../src/lib/country-rules/registry';

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
```

- [ ] Step 1: create `src/config/countries.ts`.
- [ ] Step 2: create `src/content/countries.ts`.
- [ ] Step 3: create `tests/country-config.test.ts` (needs registry — lands with Task 13; test committed with the engine unit).
- [ ] Step 4: `npm test` + `npm run check`.
- [ ] Step 5: commit `feat(country-rules): country config and localized labels` (skip the test until Task 13 if needed to keep green).

---

### Task 4: Header country selector + client storage helpers

**Design:** The selector appears **only on employment pages** (a Tier B tool page, an existing employment tool page, or the `/calculators/employment/` category page). It persists the choice to `klar-country`. Employment tools read the stored value client-side at init (Task 5 in `calculatorApp.ts`).

Create `src/lib/client/country.ts`:

```ts
import { DEFAULT_COUNTRY, COUNTRY_STORAGE_KEY } from '../../config/countries';
import { isRegistered } from '../country-rules/registry';

export function getStoredCountry(): string {
  try {
    const v = localStorage.getItem(COUNTRY_STORAGE_KEY);
    return v && isRegistered(v) ? v : DEFAULT_COUNTRY;
  } catch {
    return DEFAULT_COUNTRY;
  }
}

export function setStoredCountry(code: string): void {
  if (!isRegistered(code)) return;
  try { localStorage.setItem(COUNTRY_STORAGE_KEY, code); } catch { /* ignore */ }
}

/** Wire the header selector: populate, restore, persist, and notify calculators. */
export function initCountrySelector(select: HTMLSelectElement): void {
  if (!select) return;
  const stored = getStoredCountry();
  select.value = stored;
  select.addEventListener('change', () => {
    setStoredCountry(select.value);
    window.dispatchEvent(new CustomEvent('klar:country-change', { detail: { code: select.value } }));
  });
}
```

Modify `src/components/Header.astro`:

1. Frontmatter: import `CALCULATORS` from `../config/calculators`, `COUNTRIES` from `../config/countries`, and compute employment context:

```ts
import { CALCULATORS } from '../config/calculators';
import { COUNTRIES } from '../config/countries';
const slug = path.match(/^\/calculators\/([^/]+)\//)?.[1];
const activeEntry = slug ? CALCULATORS.find((c) => c.slug === slug && c.active) : undefined;
const isEmploymentPage = activeEntry?.category === 'employment' || path === '/calculators/employment/';
```

2. After the `</nav>` and before the theme-toggle button, render the selector only on employment pages:

```astro
{isEmploymentPage && (
  <label class="country-select" aria-label={locale === 'ar' ? 'اختر البلد' : 'Choose country'}>
    <select data-country-select>
      {COUNTRIES.map((c) => (
        <option value={c.code}>{locale === 'ar' ? c.labelAr : c.labelEn}</option>
      ))}
    </select>
  </label>
)}
```

3. In the existing `<script>` that wires `data-nav-toggle` / `data-theme-toggle`, add:

```ts
const countrySelect = document.querySelector<HTMLSelectElement>('[data-country-select]');
if (countrySelect) {
  const { initCountrySelector } = await import('../lib/client/country.ts');
  initCountrySelector(countrySelect);
}
```

**Note:** keep existing nav/theme wiring intact. If the file's script is not yet a module, `await import` inside an inline script requires converting to `<script type="module">` — do that while preserving the existing handlers.

- [ ] Step 1: create `src/lib/client/country.ts`.
- [ ] Step 2: modify `Header.astro` (computed `isEmploymentPage`, selector markup, module wiring).
- [ ] Step 3: `npm run check` + `npm run build` — clean. Verify selector appears on employment pages and is absent on finance pages (grep `dist/en/calculators/employee-cost/index.html` for `data-country-select` present; `dist/en/calculators/loan-payment/index.html` absent).
- [ ] Step 4: commit `feat(country-rules): header country selector on employment pages`.

---

### Task 5: Additive client hook — country/currency defaults in calculatorApp

Add to `src/lib/client/calculatorApp.ts` (no selector renames; purely additive):

```ts
import { getStoredCountry } from './country';
import { getCountryRules, isRegistered } from '../country-rules/registry';
import { DEFAULT_CURRENCY } from '../../config/currencies';

function applyCountryDefault(shell: HTMLElement): void {
  const countryField = shell.querySelector<HTMLSelectElement>('[data-field="country"] select');
  const currencyField = shell.querySelector<HTMLSelectElement>('select[data-role="currency"]');
  if (!countryField) return;
  const stored = getStoredCountry();
  if (isRegistered(stored)) {
    countryField.value = stored;
    const rules = getCountryRules(stored);
    if (currencyField && rules) currencyField.value = rules.currency;
  }
  countryField.addEventListener('change', () => {
    const rules = getCountryRules(countryField.value);
    if (currencyField && rules) currencyField.value = rules.currency;
  });
}
```

Call `applyCountryDefault(shell)` at the top of `initCalculator(shell)`, before the first `run()`.

- [ ] Step 1: modify `calculatorApp.ts` (imports + `applyCountryDefault` + call site).
- [ ] Step 2: `npm run build` clean; `npm test` no regressions.
- [ ] Step 3: commit `feat(country-rules): apply stored country and currency defaults in calculator client`.

---

### Task 6: Jordan country module (`jo`)

**Research baseline (verify each figure against the official source before commit):**

| Category | Draft value | Official source to verify |
|---|---|---|
| Overtime | standard 1.25×; night 1.25× (no separate night premium — night OT at the general rate); rest_day 1.5×; public_holiday 1.5×; weekly cap 48h | Jordan Labour Law No. 8/1996 as amended, Art. 59 (rates), Art. 56 (48h week) — `mol.gov.jo` |
| End-of-service | 1 month's wage per year from year 1 (`bands: [{fromYears:0, daysPerYear:30}]`) | Labour Law Art. 32 (non-SSC workers) — verified |
| Social insurance | EE 7.5%, ER 14.25%, cap JOD 3,733/MONTH (2026; not annual), appliesTo `all` | SSC `ssc.gov.jo` |
| Notice | 30 days (`[{fromYears:0, days:30}]`) | Labour Law Art. 23 |
| Leave | `[{fromYears:0, days:14},{fromYears:5, days:21}]`; maternity 90 continuous days (Art. 70 as amended 2025) | Labour Law Arts. 61, 70 |
| Income tax | brackets 5–30% (annual, after allowance): `[{from:0, rate:5},{from:5000, rate:10},{from:10000, rate:15},{from:15000, rate:20},{from:20000, rate:25},{from:1000000, rate:30}]`; allowance 9000 | Income Tax Law (amendments) — `istd.gov.jo`; verify current brackets + 1% national contribution above JOD 200k |
| Gross-to-net | `['socialInsurance','incomeTax']` | — |

**Verify and fix any figure that differs from the official source, then set `accessed` to today's ISO date and `effectiveFrom` to the statute's commencement date.**

Create `src/lib/country-rules/jo.ts` (values per your verified research; structure as in types):

```ts
import type { CountryRules } from './types';

export const jo: CountryRules = {
  code: 'jo',
  currency: 'JOD',
  overtime: {
    multipliers: [
      { kind: 'standard', multiplier: 1.25 },
      { kind: 'night', multiplier: 1.25 },
      { kind: 'rest_day', multiplier: 1.5 },
      { kind: 'public_holiday', multiplier: 1.5 },
    ],
    weeklyCapHours: 48,
    source: { title: 'Jordan Labour Law No. 8 of 1996 (as amended), Art. 59 (125% OT; 150% rest/holiday; no separate night premium) and Art. 56 (48h week)', url: '<official mol.gov.jo page>', accessed: '<today>' },
    effectiveFrom: '<statute start date>',
  },
  endOfService: {
    bands: [{ fromYears: 0, daysPerYear: 30 }],
    source: { title: 'Jordan Labour Law No. 8 of 1996 (as amended), Art. 32', url: '<official page>', accessed: '<today>' },
    effectiveFrom: '<statute start date>',
  },
  socialInsurance: {
    employeeRate: 7.5,
    employerRate: 14.25,
    capMonthly: 3733,
    appliesTo: 'all',
    source: { title: 'Social Security Corporation contribution schedule (2026 ceiling JOD 3,733/MONTH)', url: '<ssc.gov.jo page>', accessed: '<today>' },
    effectiveFrom: '<schedule date>',
  },
  noticePeriod: {
    bands: [{ fromYears: 0, days: 30 }],
    source: { title: 'Jordan Labour Law No. 8 of 1996 (as amended), Art. 23', url: '<official page>', accessed: '<today>' },
    effectiveFrom: '<statute start date>',
  },
  leave: {
    annualDays: [{ fromYears: 0, days: 14 }, { fromYears: 5, days: 21 }],
    maternityDays: 90,
    source: { title: 'Jordan Labour Law No. 8 of 1996 (as amended 2025), Arts. 61, 70', url: '<official page>', accessed: '<today>' },
    effectiveFrom: '<statute start date>',
  },
  incomeTax: {
    brackets: [
      { from: 0, rate: 5 },
      { from: 5000, rate: 10 },
      { from: 10000, rate: 15 },
      { from: 15000, rate: 20 },
      { from: 20000, rate: 25 },
      { from: 1000000, rate: 30 },
    ],
    personalAllowance: 9000,
    source: { title: 'Jordan Income Tax Law (as amended), Art. 10', url: '<istd.gov.jo page>', accessed: '<today>' },
    effectiveFrom: '<law date>',
  },
  grossToNet: {
    order: ['socialInsurance', 'incomeTax'],
    source: { title: 'SSC + Income Tax withholding schedules', url: '<official pages>', accessed: '<today>' },
    effectiveFrom: '<date>',
  },
};
```

**Verify:** use web search for each category's current official figure (e.g. `site:ssc.gov.jo` contributor rates; `site:istd.gov.jo` income tax brackets). If a figure differs from the draft, keep the official one. Record the exact URLs.

Create `tests/country-rules-jo.test.ts` (sanity, not exact legal values):

```ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getCountryRules } from '../src/lib/country-rules/registry';

test('jo: rules resolve and are sane', () => {
  const r = getCountryRules('jo');
  assert.ok(r);
  assert.equal(r.currency, 'JOD');
  assert.ok(r.overtime.multipliers.length >= 4);
  assert.ok(r.endOfService.bands.length >= 1);
  assert.ok(r.socialInsurance.employeeRate > 0 && r.socialInsurance.employerRate > 0);
  assert.ok(r.incomeTax.brackets.length > 0);
  assert.ok(r.grossToNet.order.includes('socialInsurance'));
});
```

- [ ] Step 1: verify figures via official sources (web search each category).
- [ ] Step 2: create `src/lib/country-rules/jo.ts` with verified values + real URLs + today's `accessed` date.
- [ ] Step 3: create `tests/country-rules-jo.test.ts`.
- [ ] Step 4: `npm test` (jo test green; registry still not present — test lands with Task 13 if needed to keep green).
- [ ] Step 5: commit `feat(country-rules): Jordan rule module`.

---

### Task 7: Saudi Arabia (`sa`)

**Research baseline (verify against official sources):**

| Category | Draft value | Official source to verify |
|---|---|---|
| Overtime | standard 1.5×; rest_day 1.5×; public_holiday 1.5× (Art. 107; rest/holiday hours paid at 1.5×); weekly cap 48h, annual cap 720h | Saudi Labour Law Royal Decree M/51, Art. 107 — `hrsd.gov.sa` |
| End-of-service | half-month's wage × first 5 years, 1 × month/year after (`bands: [{fromYears:0, daysPerYear:15},{fromYears:5, daysPerYear:30}]`) — **verify current regulation** | Implementing Regulations of the Labour Law (M/51) — `hrsd.gov.sa` |
| Social insurance | EE 9.75%, ER 11.85% (Saudis; phased scheme), cap SAR 45,000/month, appliesTo `citizens` | GOSI `gosi.gov.sa` (note: non-Saudi employer-only 2% occupational hazard — capture as employerRate 2% + employeeRate 0? **Decision: model the citizen scheme; add a `note` in content, not the type**) |
| Notice | `[{fromYears:0, days:30},{fromYears:5, days:60},{fromYears:10, days:90}]` (verify) | Labour Law Art. 74 |
| Leave | `[{fromYears:0, days:21},{fromYears:5, days:30}]`; maternity 70 days | Labour Law Arts. 100–102, 151 |
| Income tax | `brackets: []`, allowance 0 (no personal income tax) | `zatca.gov.sa` |
| Gross-to-net | `['socialInsurance']` | — |

> Note (Task 6 jo fix): night multiplier must be statutory — if the statute prescribes no separate night premium, use the general overtime rate (see jo Task 6 fix).

**If the official source differs (esp. GOSI phased rates or EOS regime), the verified value wins.** Follow the same structure as Task 6 (`src/lib/country-rules/sa.ts`). Test file `tests/country-rules-sa.test.ts` mirrors the jo test (currency `SAR`, brackets empty, `socialInsurance.appliesTo === 'citizens'`).

- [x] Step 1: verify figures.
- [x] Step 2: create `sa.ts`.
- [ ] Step 3: create `tests/country-rules-sa.test.ts`.
- [ ] Step 4: `npm test` green.
- [x] Step 5: commit `feat(country-rules): Saudi Arabia rule module`.

---

### Task 8: UAE (`ae`)

**Research baseline (verify):**

| Category | Draft value | Official source to verify |
|---|---|---|
| Overtime | standard 1.25×; night 1.5×; rest_day 1.5×; public_holiday 1.5× + rest day (capture multiplier 1.5); weekly cap 48h | Federal Decree-Law 33/2021 Arts. 19–20 — `mohre.gov.ae` |
| End-of-service | 21 days/year first 5 years, 30 days/year after, cap 24 months (`bands: [{fromYears:0, daysPerYear:21},{fromYears:5, daysPerYear:30}], capMonths: 24`) | Decree-Law 33/2021 Art. 51 |
| Social insurance | EE 5%, ER 12.5% (Gulf nationals), cap AED 50,000/month (verify), appliesTo `citizens` | GPSSA `gpssa.gov.ae`; note: expat unemployment scheme ILOE (0.83%/1.21%) — document in content |
| Notice | `[{fromYears:0, days:30}]` (minimum; contract may set more) | Art. 43 |
| Leave | `[{fromYears:0, days:30}]` (after 1 year; 2 days/month before); maternity 60 days (45 full + 15 half — verify) | Arts. 29, 65 |
| Income tax | `brackets: []`, allowance 0 | `mof.gov.ae` |
| Gross-to-net | `['socialInsurance']` | — |

Create `src/lib/country-rules/ae.ts` + `tests/country-rules-ae.test.ts` (currency `AED`, brackets empty, `capMonths === 24`).

- [x] Step 1: verify figures (GPSSA cap; maternity split; ILOE note).
- [x] Step 2: create `ae.ts`.
- [ ] Step 3: create `tests/country-rules-ae.test.ts`.
- [ ] Step 4: `npm test` green.
- [x] Step 5: commit `feat(country-rules): UAE rule module`.

---

### Task 9: Kuwait (`kw`)

**Research baseline (verify):**

| Category | Draft value | Official source to verify |
|---|---|---|
| Overtime | standard 1.25×; night 1.5×; rest_day 1.5×; public_holiday 1.5×; weekly cap 48h (private sector Law 6/2010) | Private Sector Labour Law 6/2010 Arts. 66–70 — `pam.gov.kw` |
| End-of-service | 15 days/year first 5 years, 1 month/year after, cap 18 months; resignation scaling `[{fromYears:0, fraction:0},{fromYears:3, fraction:0.5},{fromYears:5, fraction:0.6667},{fromYears:10, fraction:1}]` | Law 6/2010 Arts. 51–53 |
| Social insurance | EE 10.5%, ER 11.5% (Kuwaitis), cap KWD 2,500/month (verify), appliesTo `citizens` | PIFSS `pifss.gov.kw` |
| Notice | `[{fromYears:0, days:90}]` for monthly-paid (3 months; verify) | Law 6/2010 Art. 113 |
| Leave | `[{fromYears:0, days:30}]`; maternity 70 days | Law 6/2010 |
| Income tax | `brackets: []`, allowance 0 | `tax.gov.kw` (none for individuals) |
| Gross-to-net | `['socialInsurance']` | — |

Create `kw.ts` + `tests/country-rules-kw.test.ts` (currency `KWD`, `resignation` present, `capMonths === 18`).

- [x] Step 1: verify figures (PIFSS cap; notice duration).
- [x] Step 2: create `kw.ts`.
- [ ] Step 3: create `tests/country-rules-kw.test.ts`.
- [ ] Step 4: `npm test` green.
- [x] Step 5: commit `feat(country-rules): Kuwait rule module`.

---

### Task 10: Qatar (`qa`)

**Research baseline (verify):**

| Category | Draft value | Official source to verify |
|---|---|---|
| Overtime | standard 1.25×; night 1.5×; rest_day 1.5×; public_holiday 1.5×; weekly cap 48h | Labour Law 14/2004 (amended 2023) Arts. 74–75 — `adlsa.gov.qa` |
| End-of-service | 21 days/year first 5 years, 28 days/year after (`bands: [{fromYears:0, daysPerYear:21},{fromYears:5, daysPerYear:28}]`) | Law 14/2004 Art. 54 (limited-term contracts) — verify unlimited-term variant |
| Social insurance | EE 5%, ER 10% (Qataris), cap QAR 100,000/month (verify), appliesTo `citizens` | GOSI-Qatar `gosinqatar.gov.qa` |
| Notice | `[{fromYears:0, days:30}]` | Law 14/2004 Art. 51 |
| Leave | `[{fromYears:0, days:21},{fromYears:5, days:28}]`; maternity 50 days (verify amended law) | Law 14/2004 Art. 88; 2023 amendments |
| Income tax | `brackets: []`, allowance 0 | `mof.gov.qa` |
| Gross-to-net | `['socialInsurance']` | — |

Create `qa.ts` + `tests/country-rules-qa.test.ts` (currency `QAR`, brackets empty).

- [x] Step 1: verify figures.
- [x] Step 2: create `qa.ts`.
- [ ] Step 3: create `tests/country-rules-qa.test.ts`.
- [ ] Step 4: `npm test` green.
- [x] Step 5: commit `feat(country-rules): Qatar rule module`.

---

### Task 11: Bahrain (`bh`)

**Research baseline (verify):**

| Category | Draft value | Official source to verify |
|---|---|---|
| Overtime | standard 1.25×; night 1.5×; rest_day 1.5×; public_holiday 1.5×; weekly cap 48h | Labour Law RD-Law 36/2012 Arts. 72–73 — `lmra.bh` |
| End-of-service | 15 days/year first 3 years, 1 month/year after (`bands: [{fromYears:0, daysPerYear:15},{fromYears:3, daysPerYear:30}]`); note: SIO Resolution 109/2023 overlay for non-Bahrainis from 1 Mar 2024 (content note) | Art. 116, Law 36/2012; SIO `sio.gov.bh` |
| Social insurance | EE 1%, ER 6% (reform scheme; **verify current 2026 rates**), cap BHD 1,000/month (verify), appliesTo `citizens` | SIO `sio.gov.bh` |
| Notice | `[{fromYears:0, days:30}]` | Law 36/2012 |
| Leave | `[{fromYears:0, days:30}]`; maternity 60 days (45 full + 15 half) | Law 36/2012 |
| Income tax | `brackets: []`, allowance 0 | `nbr.gov.bh` |
| Gross-to-net | `['socialInsurance']` | — |

**The SIO non-Bahraini overlay and the phased EE/ER rates are the kind of figure that drifts — verify hard.** Create `bh.ts` + `tests/country-rules-bh.test.ts` (currency `BHD`).

- [x] Step 1: verify figures (esp. SIO EE/ER rates 2026; Art. 116 formula).
- [x] Step 2: create `bh.ts`.
- [ ] Step 3: create `tests/country-rules-bh.test.ts`.
- [ ] Step 4: `npm test` green.
- [x] Step 5: commit `feat(country-rules): Bahrain rule module`.

---

### Task 12: Oman (`om`)

**Research baseline (verify):**

| Category | Draft value | Official source to verify |
|---|---|---|
| Overtime | standard 1.25×; night 1.5×; rest_day 1.5×; public_holiday 1.5×; weekly cap 48h | Royal Decree 53/2023 (new Labour Law) — `manpower.gov.om` |
| End-of-service | **RD 53/2023 Art. 61: 1 month/year for all service** (`bands: [{fromYears:0, daysPerYear:30}]`); transitional pre-Aug-2023: 15 days first 3 years then 1 month (content note) | RD 53/2023 Art. 61; prior RD 35/2003 Art. 42 |
| Social insurance | EE 6.5%, ER 9.5% (Omanis; verify PASI current), cap OMR 3,000/month (verify), appliesTo `citizens` | PASI `pasi.gov.om` |
| Notice | `[{fromYears:0, days:30}]` | Labour Law |
| Leave | `[{fromYears:0, days:30}]` (after 6 months service); maternity 50 days | Labour Law |
| Income tax | `brackets: []`, allowance 0 | `taxoman.gov.om` |
| Gross-to-net | `['socialInsurance']` | — |

Create `om.ts` + `tests/country-rules-om.test.ts` (currency `OMR`, single-band EOS).

- [x] Step 1: verify figures (SPF rates via RD 60/2025; RD 53/2023 EOS Art. 61).
- [x] Step 2: create `om.ts`.
- [ ] Step 3: create `tests/country-rules-om.test.ts`.
- [x] Step 4: `npm test` green.
- [x] Step 5: commit `feat(country-rules): Oman rule module`.

---

### Task 13: Registry + publish gate green — engine commit

Now that all 7 modules exist, create the engine glue and tests:

- [ ] Step 1: create `src/lib/country-rules/registry.ts` (exact code from Task 2).
- [ ] Step 2: create `src/lib/country-rules/publish-gate.ts` (exact code from Task 2).
- [ ] Step 3: create `tests/publish-gate.test.ts` + `tests/country-config.test.ts` (from Tasks 2/3) + per-country sanity tests from Tasks 6–12.
- [ ] Step 4: run `node --test tests/publish-gate.test.ts tests/country-config.test.ts` — 0 violations; exactly 7 codes.
- [ ] Step 5: run `npm test` — full suite green. `npm run check` — 0 errors.
- [ ] Step 6: `npm run build` — clean. **Decision:** keep the gate test-only for v1 (`astro build` does not invoke `assertPublishGate`); note in AGENTS.md.
- [ ] Step 7: commit `feat(country-rules): registry and publish gate green for 7 countries`.

---

### Task 14: End-of-service tool (`end-of-service`)

**Activate in `src/config/calculators.ts`** (entry already exists): flip `active: true`, set `related: ['social-insurance', 'notice-period']`, `guide: 'how-to-calculate-end-of-service'`.

**Shared country-field helper** — create `src/lib/calculators/country-field.ts`:

```ts
import { COUNTRIES } from '../../config/countries';

export const countrySelectOptions = [{ value: '', label: 'choose' }] as { value: string; label: string }[];
for (const c of COUNTRIES) countrySelectOptions.push({ value: c.code, label: c.code.toUpperCase() });
```

**One static definition, used by all 8 tools that need a country field.** The client displays localized labels from content `fields.country.options`.

**Math** `src/lib/calculators/end-of-service.ts`:

```ts
import type { CalculatorMath } from './types';
import { getCountryRules, isRegistered } from '../country-rules/registry';
import { countrySelectOptions } from './country-field';

function toNumber(raw: string | undefined): number {
  if (raw === undefined || raw === '') return NaN;
  return Number(raw);
}

function yearsBetween(start: string, end: string): number {
  const s = new Date(start + 'T00:00:00');
  const e = new Date(end + 'T00:00:00');
  if (Number.isNaN(s.getTime()) || Number.isNaN(e.getTime()) || e < s) return NaN;
  let years = e.getFullYear() - s.getFullYear();
  const m = e.getMonth() - s.getMonth();
  const d = e.getDate() - s.getDate();
  if (m < 0 || (m === 0 && d < 0)) years -= 1;
  const adjusted = new Date(e.getFullYear() - (m < 0 || (m === 0 && d < 0) ? 1 : 0), s.getMonth(), s.getDate());
  const remDays = Math.floor((e.getTime() - adjusted.getTime()) / 86400000);
  return years + remDays / 365;
}

export const endOfService: CalculatorMath = {
  slug: 'end-of-service',
  fields: [
    { id: 'country', type: 'select', required: true, options: countrySelectOptions },
    { id: 'startDate', type: 'date', required: true },
    { id: 'endDate', type: 'date', required: true },
    { id: 'monthlyBasic', type: 'number', required: true, min: 0, max: 1e12, step: 'any', isCurrency: true },
    { id: 'resignation', type: 'select', defaultValue: 'terminated', options: [
      { value: 'terminated', label: 'terminated' },
      { value: 'voluntary', label: 'voluntary' },
    ] },
  ],
  example: {
    country: 'jo', startDate: '2018-01-01', endDate: '2026-01-01', monthlyBasic: '800', resignation: 'terminated',
  },
  validate(input) {
    const errors: Record<string, string> = {};
    if (!input.country) errors.country = 'required';
    else if (!isRegistered(input.country)) errors.country = 'invalid';
    if (!toNumber(input.monthlyBasic)) errors.monthlyBasic = 'required';
    const y = yearsBetween(input.startDate ?? '', input.endDate ?? '');
    if (Number.isNaN(y)) errors.endDate = 'invalid';
    const rules = isRegistered(input.country ?? '') ? getCountryRules(input.country!) : undefined;
    if (rules && input.currency && input.currency !== rules.currency) errors.currency = 'countryMismatch';
    return errors;
  },
  calculate(input) {
    const rules = getCountryRules(input.country!)!;
    const years = yearsBetween(input.startDate!, input.endDate!);
    const salary = toNumber(input.monthlyBasic);
    const daily = salary / 30;
    let days = 0;
    const bands = rules.endOfService.bands;
    for (let i = 0; i < bands.length; i++) {
      const from = bands[i].fromYears;
      const to = i + 1 < bands.length ? bands[i + 1].fromYears : Infinity;
      if (years > from) days += (Math.min(years, to) - from) * bands[i].daysPerYear;
    }
    if (rules.endOfService.capMonths) days = Math.min(days, rules.endOfService.capMonths * 30);
    if (rules.endOfService.resignation && input.resignation === 'voluntary') {
      const scale = [...rules.endOfService.resignation].sort((a, b) => b.fromYears - a.fromYears).find((s) => years >= s.fromYears);
      if (scale) days *= scale.fraction;
    }
    const gratuity = days * daily;
    return {
      results: [
        { key: 'gratuity', value: gratuity, kind: 'currency', hero: true },
        { key: 'days', value: days, kind: 'number' },
        { key: 'years', value: years, kind: 'number' },
      ],
    };
  },
};
```

**Content** `src/content/calculators/end-of-service.ts` (ar/en; follow existing content shape — `slug`, `h1`, `meta`/`description`, `requiredNote`, `fields` incl. `country` with `label`/`hint`/`options`/`required`/`invalid`/`mismatch`, `buttons`, `ui`, `errorMessages` incl. `country: {required, invalid}` and `currency: {countryMismatch}`, `results` keys `gratuity/days/years`). Both locales; currencyDefault `'JOD'`.

**Registrations:** `src/lib/calculators/index.ts`, `src/lib/client/registry.ts`, `src/content/calculators/index.ts`.

**Tests** `tests/end-of-service.test.ts`:

```ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { endOfService } from '../src/lib/calculators/end-of-service';

test('end-of-service: computes gratuity for a Jordanian case', () => {
  const out = endOfService.calculate({ country: 'jo', startDate: '2019-01-02', endDate: '2024-01-03', monthlyBasic: '900', resignation: 'terminated' });
  assert.ok(out.results[0].value > 0);
  assert.equal(out.results[0].kind, 'currency');
});

test('end-of-service: voluntary resignation scales Kuwait gratuity', () => {
  const out = endOfService.calculate({ country: 'kw', startDate: '2017-01-01', endDate: '2020-01-01', monthlyBasic: '1000', resignation: 'voluntary' });
  const outTerm = endOfService.calculate({ country: 'kw', startDate: '2017-01-01', endDate: '2020-01-01', monthlyBasic: '1000', resignation: 'terminated' });
  assert.ok(out.results[0].value < outTerm.results[0].value);
});

test('end-of-service: missing country is required', () => {
  const e = endOfService.validate({ country: '', startDate: '2019-01-01', endDate: '2024-01-01', monthlyBasic: '900', resignation: 'terminated' });
  assert.equal(e.country, 'required');
});

test('end-of-service: currency mismatch flagged', () => {
  const e = endOfService.validate({ country: 'jo', currency: 'SAR', startDate: '2019-01-01', endDate: '2024-01-01', monthlyBasic: '900', resignation: 'terminated' });
  assert.equal(e.currency, 'countryMismatch');
});
```

- [ ] Step 1: create `src/lib/calculators/country-field.ts`.
- [ ] Step 2: create `src/lib/calculators/end-of-service.ts`.
- [ ] Step 3: create `src/content/calculators/end-of-service.ts` (ar/en).
- [ ] Step 4: register in `src/lib/calculators/index.ts`, `src/lib/client/registry.ts`, `src/content/calculators/index.ts`.
- [ ] Step 5: flip config `active: true` + `related` + `guide` in `src/config/calculators.ts`.
- [ ] Step 6: create `tests/end-of-service.test.ts`.
- [ ] Step 7: `npm test` — all green. **Update `tests/catalog.test.ts`:** the `tier-B entries are reserved and inactive` test now fails for the newly-activated slug — change it to assert the remaining reserved-and-inactive list, or assert the newly-active ones are `active`. Keep an invariant like "Tier B employment count === 11".
- [ ] Step 8: `npm run check` + `npm run build` — clean; new page `dist/calculators/end-of-service/index.html` (+ EN) exist.
- [ ] Step 9: commit `feat(calc): end-of-service gratuity calculator with country rules`.

---

### Task 15: Social-insurance tool (`social-insurance`)

Config: `active: true`, `related: ['end-of-service', 'gross-to-net']`, `guide: 'how-to-calculate-social-insurance'`.

**Math** `src/lib/calculators/social-insurance.ts`:

```ts
import type { CalculatorMath } from './types';
import { getCountryRules, isRegistered } from '../country-rules/registry';
import { countrySelectOptions } from './country-field';

function toNumber(raw: string | undefined): number { return raw === undefined || raw === '' ? NaN : Number(raw); }

export const socialInsurance: CalculatorMath = {
  slug: 'social-insurance',
  fields: [
    { id: 'country', type: 'select', required: true, options: countrySelectOptions },
    { id: 'monthlySalary', type: 'number', required: true, min: 0, max: 1e12, step: 'any' },
    { id: 'currency', type: 'currency', defaultValue: 'JOD' },
  ],
  example: { country: 'sa', monthlySalary: '15000', currency: 'SAR' },
  validate(input) {
    const errors: Record<string, string> = {};
    if (!input.country) errors.country = 'required';
    else if (!isRegistered(input.country)) errors.country = 'invalid';
    const s = toNumber(input.monthlySalary);
    if (Number.isNaN(s)) errors.monthlySalary = 'required';
    const rules = isRegistered(input.country ?? '') ? getCountryRules(input.country!) : undefined;
    if (rules && input.currency && input.currency !== rules.currency) errors.currency = 'countryMismatch';
    return errors;
  },
  calculate(input) {
    const rules = getCountryRules(input.country!)!;
    const base = toNumber(input.monthlySalary);
    const capped = Math.min(base, rules.socialInsurance.capMonthly);
    const ee = capped * rules.socialInsurance.employeeRate / 100;
    const er = capped * rules.socialInsurance.employerRate / 100;
    return {
      results: [
        { key: 'employeeShare', value: ee, kind: 'currency', hero: true },
        { key: 'employerShare', value: er, kind: 'currency' },
        { key: 'total', value: ee + er, kind: 'currency' },
        { key: 'cappedBase', value: capped, kind: 'currency' },
      ],
    };
  },
};
```

**Content** ar/en (fields: country, monthlySalary, currency; results employeeShare/employerShare/total/cappedBase; errorMessages incl. country + currency.countryMismatch). Note `appliesTo === 'citizens'` in methodology copy.

**Tests** `tests/social-insurance.test.ts`: missing country → required; currency mismatch; Saudi capped computation (fixture `monthlySalary: 50000, country: sa` → capped at 45000; ee = 45000 × eeRate).

- [ ] Step 1: create math.
- [ ] Step 2: create content (ar/en).
- [ ] Step 3: register ×3.
- [ ] Step 4: config activate + related/guide.
- [ ] Step 5: create tests.
- [ ] Step 6: `npm test` + `npm run check` + `npm run build`.
- [ ] Step 7: commit `feat(calc): social insurance calculator with country rules`.

---

### Task 16: Notice-period tool (`notice-period`)

Config: `active: true`, `related: ['end-of-service', 'leave-balance']`, `guide: 'how-to-calculate-notice-period'`.

**Math** `src/lib/calculators/notice-period.ts` — bands lookup by years of service; fields: `country` (select, required), `tenureYears` (number, required, min 0, max 50, step any, default 2); output `noticeDays` (hero, number) + `noticeMonths` (number). No currency field.

```ts
export const noticePeriod: CalculatorMath = {
  slug: 'notice-period',
  fields: [
    { id: 'country', type: 'select', required: true, options: countrySelectOptions },
    { id: 'tenureYears', type: 'number', required: true, min: 0, max: 50, step: 'any', defaultValue: '2' },
  ],
  example: { country: 'sa', tenureYears: '7' },
  validate(input) {
    const errors: Record<string, string> = {};
    if (!input.country) errors.country = 'required';
    else if (!isRegistered(input.country)) errors.country = 'invalid';
    const t = toNumber(input.tenureYears);
    if (Number.isNaN(t)) errors.tenureYears = 'required';
    return errors;
  },
  calculate(input) {
    const rules = getCountryRules(input.country!)!;
    const t = toNumber(input.tenureYears);
    const band = [...rules.noticePeriod.bands].sort((a, b) => b.fromYears - a.fromYears).find((b) => t >= b.fromYears) ?? rules.noticePeriod.bands[0];
    return { results: [
      { key: 'noticeDays', value: band.days, kind: 'number', hero: true },
      { key: 'noticeMonths', value: band.days / 30, kind: 'number' },
    ] };
  },
};
```

**Content** ar/en (results `noticeDays`, `noticeMonths`; country field; methodology notes the bands come from the country law with source name).

**Tests** `tests/notice-period.test.ts`: country required; SA 7 years → 60 days; KW any tenure → 90 days; JO any → 30 days; invalid country → invalid.

- [ ] Step 1–5: math, content, registrations, config activation, tests.
- [ ] Step 6: `npm test` + `npm run check` + `npm run build`.
- [ ] Step 7: commit `feat(calc): notice period calculator with country rules`.

---

### Task 17: Maternity-leave tool (`maternity-leave`)

Config: `active: true`, `related: ['leave-balance', 'notice-period']`, `guide: 'how-to-calculate-maternity-leave'`.

**Math** `src/lib/calculators/maternity-leave.ts` — fields: `country` (select, required). Output: `maternityDays` (hero, number), `maternityWeeks` (secondary, = days/7). Simple rules lookup; no currency.

```ts
export const maternityLeave: CalculatorMath = {
  slug: 'maternity-leave',
  fields: [{ id: 'country', type: 'select', required: true, options: countrySelectOptions }],
  example: { country: 'ae' },
  validate(input) {
    const errors: Record<string, string> = {};
    if (!input.country) errors.country = 'required';
    else if (!isRegistered(input.country)) errors.country = 'invalid';
    return errors;
  },
  calculate(input) {
    const rules = getCountryRules(input.country!)!;
    const days = rules.leave.maternityDays;
    return { results: [
      { key: 'maternityDays', value: days, kind: 'number', hero: true },
      { key: 'maternityWeeks', value: Math.round(days / 7), kind: 'number' },
    ] };
  },
};
```

**Content** ar/en (country field; results `maternityWeeks`, `maternityDays`). Mention pay-split nuance in copy where sources differ (e.g., AE 45 full + 15 half) without hardcoding.

**Tests** `tests/maternity-leave.test.ts`: country required; jo → 90 days; sa → 70; kw → 70; ae → 60; qa → 50; bh → 60; om → per draft hedge (49 or 50 — verify).

- [ ] Step 1–5: math, content, registrations, config activation, tests.
- [ ] Step 6: `npm test` + `npm run check` + `npm run build`.
- [ ] Step 7: commit `feat(calc): maternity leave calculator with country rules`.

---

### Task 18: Gross-to-net tool (`gross-to-net`)

Config: `active: true`, `related: ['income-tax', 'social-insurance']`, `guide: 'how-to-calculate-gross-to-net'`.

**Math** `src/lib/calculators/gross-to-net.ts` — fields: `country` (select, required), `monthlyGross` (number, required, min 0), `currency` (currency, default JOD). Steps applied in `rules.grossToNet.order`:

```ts
function annualTax(brackets: { from: number; rate: number }[], annual: number): number {
  let tax = 0;
  let prev = 0;
  for (const b of brackets) {
    const upper = b.from;
    if (annual <= prev) break;
    tax += (Math.min(annual, upper) - prev) * b.rate / 100;
    prev = upper;
  }
  return tax;
}

export const grossToNet: CalculatorMath = {
  slug: 'gross-to-net',
  fields: [
    { id: 'country', type: 'select', required: true, options: countrySelectOptions },
    { id: 'monthlyGross', type: 'number', required: true, min: 0, max: 1e12, step: 'any' },
    { id: 'currency', type: 'currency', defaultValue: 'JOD' },
  ],
  example: { country: 'jo', monthlyGross: '1500', currency: 'JOD' },
  validate(input) {
    const errors: Record<string, string> = {};
    if (!input.country) errors.country = 'required';
    else if (!isRegistered(input.country)) errors.country = 'invalid';
    const g = toNumber(input.monthlyGross);
    if (Number.isNaN(g)) errors.monthlyGross = 'required';
    const rules = isRegistered(input.country ?? '') ? getCountryRules(input.country!) : undefined;
    if (rules && input.currency && input.currency !== rules.currency) errors.currency = 'countryMismatch';
    return errors;
  },
  calculate(input) {
    const rules = getCountryRules(input.country!)!;
    const grossMonthly = toNumber(input.monthlyGross);
    let net = grossMonthly;
    const detail: { key: string; value: number }[] = [];
    for (const step of rules.grossToNet.order) {
      if (step === 'socialInsurance') {
        const capped = Math.min(grossMonthly, rules.socialInsurance.capMonthly);
        const ee = capped * rules.socialInsurance.employeeRate / 100;
        net -= ee;
        detail.push({ key: 'socialInsurance', value: ee });
      } else if (step === 'incomeTax') {
        const monthlyTax = Math.max(0, annualTax(rules.incomeTax.brackets, grossMonthly * 12 - rules.incomeTax.personalAllowance)) / 12;
        net -= monthlyTax;
        detail.push({ key: 'incomeTax', value: monthlyTax });
      }
    }
    return {
      results: [
        { key: 'netMonthly', value: net, kind: 'currency', hero: true },
        { key: 'totalDeductions', value: grossMonthly - net, kind: 'currency' },
        ...detail.map((d) => ({ key: d.key, value: d.value, kind: 'currency' as const })),
      ],
    };
  },
};
```

**Note:** the bracket tax progression must tax each slice at the lower bound's rate. Add a unit test for a known total (e.g., annual 15,000 JOD after allowance 9,000 → taxable 6,000 → 5,000×5% + 1,000×10% = 350).

**Content** ar/en (results `netMonthly`, `totalDeductions`, per-step rows). **Tests** `tests/gross-to-net.test.ts`: jo deducts both steps; sa deducts only socialInsurance; currency mismatch.

- [ ] Step 0: verify the `annualTax` progression with the 350 fixture; add a focused unit test.
- [ ] Step 1–5: math, content, registrations, config activation, tests.
- [ ] Step 6: `npm test` + `npm run check` + `npm run build`.
- [ ] Step 7: commit `feat(calc): gross-to-net calculator with country rules`.

---

### Task 19: Income-tax tool (`income-tax`)

Config: `active: true`, `related: ['gross-to-net', 'social-insurance']`, `guide: 'how-to-calculate-income-tax'`.

**Math** `src/lib/calculators/income-tax.ts` — fields: `country` (select, required), `annualIncome` (number, required, min 0), `currency` (currency, default JOD). For GCC countries (`brackets: []`) → tax 0 with a note result `noTax` (kind number, value 0) and hero `taxAmount` 0; content explains the country has no personal income tax. Compute:

```ts
export const incomeTax: CalculatorMath = {
  slug: 'income-tax',
  fields: [
    { id: 'country', type: 'select', required: true, options: countrySelectOptions },
    { id: 'annualIncome', type: 'number', required: true, min: 0, max: 1e12, step: 'any' },
    { id: 'currency', type: 'currency', defaultValue: 'JOD' },
  ],
  example: { country: 'jo', annualIncome: '24000', currency: 'JOD' },
  validate(input) {
    const errors: Record<string, string> = {};
    if (!input.country) errors.country = 'required';
    else if (!isRegistered(input.country)) errors.country = 'invalid';
    const a = toNumber(input.annualIncome);
    if (Number.isNaN(a)) errors.annualIncome = 'required';
    const rules = isRegistered(input.country ?? '') ? getCountryRules(input.country!) : undefined;
    if (rules && input.currency && input.currency !== rules.currency) errors.currency = 'countryMismatch';
    return errors;
  },
  calculate(input) {
    const rules = getCountryRules(input.country!)!;
    const annual = toNumber(input.annualIncome);
    const taxable = Math.max(0, annual - rules.incomeTax.personalAllowance);
    const tax = rules.incomeTax.brackets.length === 0 ? 0 : annualTax(rules.incomeTax.brackets, taxable);
    return {
      results: [
        { key: 'taxAmount', value: tax, kind: 'currency', hero: true },
        { key: 'effectiveRate', value: annual > 0 ? (tax / annual) * 100 : 0, kind: 'percent' },
        { key: 'taxableIncome', value: taxable, kind: 'currency' },
      ],
    };
  },
};
```

**Extract the shared `annualTax` helper** into `src/lib/calculators/tax.ts` used by both gross-to-net and income-tax.

**Content** ar/en (results `taxAmount`, `effectiveRate`, `taxableIncome`; copy notes no-PIT countries explicitly). **Tests** `tests/income-tax.test.ts`: jo annual 15,000 → tax 350; sa → 0; kw → 0; missing country → required; currency mismatch.

- [ ] Step 0: create `src/lib/calculators/tax.ts` (shared `annualTax`) and refactor gross-to-net to use it.
- [ ] Step 1–5: math, content, registrations, config activation, tests.
- [ ] Step 6: `npm test` + `npm run check` + `npm run build`.
- [ ] Step 7: commit `feat(calc): income tax calculator with country rules`.

---

### Task 20: Retrofits — overtime-pay and leave-balance

#### 20A. Overtime-pay

Modify `src/lib/calculators/overtime.ts`:

1. Import `countrySelectOptions` and `getCountryRules`/`isRegistered`.
2. Add at the top of `fields`:

```ts
    { id: 'country', type: 'select', defaultValue: '', options: countrySelectOptions },
```

3. Restrict the manual `multiplier` radio to show only when no country (`showIf: { field: 'country', values: [''] }`), restating the multiplier label to mention "manual".

4. Add a law-driven kind select shown when a country is selected:

```ts
    { id: 'otKind', type: 'select', defaultValue: 'standard', showIf: { field: 'country', values: ['jo', 'sa', 'ae', 'kw', 'qa', 'bh', 'om'] }, options: [
      { value: 'standard', label: 'standard' },
      { value: 'night', label: 'night' },
      { value: 'rest_day', label: 'rest_day' },
      { value: 'public_holiday', label: 'public_holiday' },
    ] },
```

5. `validate`: if `input.country` is set and not registered → `country: 'invalid'`. Keep existing number validations.

6. `calculate`: determine multiplier:

```ts
    let multiplier = 1.5;
    if (input.country) {
      const rules = getCountryRules(input.country);
      if (rules) {
        const kind = (input.otKind ?? 'standard') as 'standard' | 'night' | 'rest_day' | 'public_holiday';
        multiplier = rules.overtime.multipliers.find((m) => m.kind === kind)?.multiplier ?? 1.5;
      }
    } else {
      multiplier = input.multiplier === 'custom' ? toNumber(input.customMultiplier) : toNumber(input.multiplier ?? '1.5');
    }
```

7. Add `country` + `otKind` labels to `src/content/calculators/overtime.ts` (ar/en) and a methodology note ("عند اختيار البلد تُطبق قيمة المضاعف القانونية" / "When a country is selected the legal multiplier applies").

8. Extend `tests/overtime-pay.test.ts`: SA standard 1.5; AE standard 1.25; KW night 1.5; no-country custom path still works.

#### 20B. Leave-balance

Modify `src/lib/calculators/leave.ts`:

1. Add `country` select field (default `''`, options `countrySelectOptions`).
2. When `input.country` is set and accrual method is `annual`, override the annual allowance with the country rule (band by tenure). **Add a `tenureYears` number field shown only when a country is selected** (tools are pure — no "today"); band-lookup the annual entitlement and output `annualEntitlement` hero + existing accrual results. Keep the manual allowance path when no country.
3. Update `src/content/calculators/leave.ts` (ar/en): `country` + `tenureYears` field copy; methodology note for the country default.
4. Extend `tests/leave-balance.test.ts`: SA 3 years → 21 days; UAE 2 years → 30 days (verify band shape); no-country path unchanged.

**Content update for both tools:** client `showIf` on `tenureYears`/`otKind` uses country codes; the `''` value keeps the manual UI when "choose" is selected.

- [ ] Step 1: modify `overtime.ts` + content + tests; `npm test` green.
- [ ] Step 2: modify `leave.ts` + content + tests; `npm test` green.
- [ ] Step 3: `npm run check` + `npm run build` clean.
- [ ] Step 4: commit `feat(calc): country-rule retrofits for overtime-pay and leave-balance`.

---

### Task 21: Guides for the 6 Tier B tools

Append 6 guides to `src/content/guides.ts` (ar/en each; follow existing guide shape — `title`, `description`, `sections` with `heading`/`body`, `related` slugs). Terse, factual, assumption-stating; each cites that numbers come from official statutory sources with the source name in the guide body (no live URLs needed in guides).

Guides:
- `how-to-calculate-end-of-service` (ar: دليل حساب مكافأة نهاية الخدمة) — bands logic, daily wage = basic/30, fractional years, resignation scaling (KW), caps.
- `how-to-calculate-social-insurance` (ar: دليل حساب التأمين الاجتماعي) — EE/ER rates, caps, citizens-only notes per country.
- `how-to-calculate-notice-period` (ar: دليل حساب فترة الإشعار) — band tables + notice rules.
- `how-to-calculate-maternity-leave` (ar: دليل حساب إجازة الأمومة) — weeks/days per country, pay-split notes.
- `how-to-calculate-gross-to-net` (ar: دليل حساب الراتب الصافي) — deduction order, caps, no-income-tax GCC note.
- `how-to-calculate-income-tax` (ar: دليل حساب ضريبة الدخل) — brackets, allowance, no-PIT countries.

All 6 guide slugs map to the config `guide` fields set in Tasks 14–19.

- [ ] Step 1: append 6 guides (12 locale variants) to `guides.ts`.
- [ ] Step 2: `npm test` (guide integrity test in the catalog suite passes — every config `guide` slug resolves).
- [ ] Step 3: `npm run build` — 12 new guide pages exist.
- [ ] Step 4: commit `feat(content): guides for country-law employment calculators`.

---

### Task 22: Final verification, QA sweep, self-review

- [ ] **Step 1: Full gate run** — `npm test` (all green; 37 active tools), `npm run check` (0 errors), `npm run build` (clean), `npm run preview` spot check (HTTP 200 on: `/calculators/end-of-service/`, `/en/calculators/income-tax/`, `/calculators/employment/`, both locales).
- [ ] **Step 2: Page counts** — verify `dist/calculators/` lists all 37 tool slugs; the employment category page shows 11; indexes show 37.
- [ ] **Step 3: Header selector** — appears on employment tool pages (grep `data-country-select` in `dist/en/calculators/end-of-service/index.html`), absent on finance/health/everyday/business pages (grep absence).
- [ ] **Step 4: Country field + mismatch** — in a built math bundle, confirm validate maps a foreign currency to `countryMismatch`; manual QA note: AR page shows the Arabic mismatch message.
- [ ] **Step 5: RTL/manual spot-check** (browser, `npm run dev`) — employment pages load; header selector works; tool country field initialized from header choice; currency follows country; reset restores defaults; no console errors. **This is the only human-dependent step.**
- [ ] **Step 6: Self-review against spec** — re-read `docs/superpowers/specs/2026-08-10-country-labour-law-engine-design.md`; confirm: publish gate enforced (tests), 7 countries registered, selector behavior, 6 tools + 2 retrofits, no currency conversion, no DOM-coupling renames.
- [ ] **Step 7: AGENTS.md** — update the stale "`country-rules/` and markdown content collections in the doc are not implemented" bullet to describe the live engine, the `klar-country` storage key, and the gate-as-test decision.
- [ ] **Step 8: Commit** — `chore(country-rules): finalize country engine — QA, docs, AGENTS.md`.

---

**Definition of Done (all must be true):**
- 7 country modules registered, publish-gate test zero violations, each rule traced to an official https source with accessed date ≤ today.
- 6 Tier B tools active (37 total calculators), each with math/content/guide/tests and both-locale pages.
- overtime-pay and leave-balance retrofitted; other tools untouched except as listed.
- Currency set = 9 codes; no conversion anywhere; mismatch produces a localized error.
- Full gates green; AGENTS.md current; plan checkboxes marked; working tree clean.
