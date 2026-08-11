# Catalog Expansion to 6 Categories Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand the Klar calculator catalog from 10 tools in 2 categories to 26 published tools in 6 categories (finance, employment, health, education, everyday, business), plus 6 reserved inactive employment tools for the future country labour-law engine.

**Architecture:** One shared category system (`Category` type + `CATEGORIES` metadata map in `src/config/calculators.ts`), one dynamic route file `[segment].astro` that dispatches either category pages or calculator pages, and 21 new tools each following the established 6-artifact pattern (config entry → math module → client loader → localized content → pages → tests) plus a full localized guide. All math stays pure, dependency-free TS in `src/lib/calculators/`.

**Tech Stack:** Astro, TypeScript, node:test. No UI framework, no server runtime.

## Global Constraints

- **Follow the per-calculator pattern exactly.** Each tool gets: (1) config entry in `src/config/calculators.ts`; (2) math module `src/lib/calculators/<file>.ts` implementing `CalculatorMath`; (3) lazy-loader line in `src/lib/client/registry.ts`; (4) localized content `src/content/calculators/<slug>.ts` (ar + en `CalcContent`) + registry line in `src/content/calculators/index.ts`; (5) page route via the existing `[segment].astro` (ar + en) — do NOT create per-slug route files; (6) tests in `tests/`; (7) a full guide in `src/content/guides.ts`.
- **DOM coupling — do not break.** Never rename `.calc-form`, `.calc-result`, `[data-field=…]`, `.field--invalid`, `[data-action=…]`, `select[data-role="currency"]`. Non-financial tools simply omit the currency field (client is already null-safe via `currencySelect?.`).
- **Optional currency is additive.** `CalcContent.currencyDefault` / `currencyLabel` become optional; `buildCalcPayload` falls back to `'JOD'` / locale-appropriate label. Financial tools keep providing them.
- **Result keys and field ids are the content contract.** Every result key emitted by `calculate()` must have a matching label in both `ar` and `en` content `results`; every field id must have a label in `fields`. Missing labels render as raw keys (existing behavior) — that is a defect, not a fallback.
- **Percent results** are stored as the raw percent number (e.g. `20` for 20%) — `formatPercent` appends the sign only, it does not multiply by 100.
- **Currencies** are display-only (never conversion). `currencyDefault` is `'JOD'` for financial tools.
- **Example numbers must match.** The `math.example` values, the content `exampleHtml` numbers, the guide worked examples, and the test assertions must all agree. Where the plan gives "≈N", tests assert with a small tolerance (typically `±0.05` or `±0.02`) and prose says "about N".
- **Shared helpers, no new duplication.** `src/lib/calculators/utils.ts` (created in Task 1) exports `err`, `toNumber`, `numeric`, `optionalNumeric`, `checkNumber`, `monthlyPayment`, `daysBetween`, `calendarDiff`, `parseIso`, `todayIso`. New modules import from it. Existing modules are left untouched.
- **Content prose is delegated, structure and numbers are not.** For each tool the plan specifies: title, metaDescription, h1, every field label (ar/en), every result label (ar/en), hero, currency presence, example input, worked-example numbers, and required prose topics. The implementer writes the localized prose (intro, field hints, formula text, exampleHtml, assumptions, mistakes, whenUseful, faqs, methodologyNote, and the guide's sections/body) following the `loan-payment.ts` content template and the guide structure in `guides.ts` — using exactly the specified labels, numbers and topics. `buttons`, `ui`, `errorMessages`, `requiredNote` are copied verbatim from `src/content/calculators/loan-payment.ts` (same strings every tool uses), plus the extra `mismatch` error key where a tool's `validate` returns it.
- **Arabic**: field labels, results and prose are written in Arabic for `ar`. Numbers in prose use Latin digits (site-wide convention). كلار brand name in prose where the site refers to itself.
- **Category integrity test** (`tests/catalog.test.ts`, created in Task 1) asserts that every `active` calculator has all six artifacts. It must keep passing as tools land; never skip it.
- **Reserved Tier B entries** (`end-of-service`, `social-insurance`, `notice-period`, `maternity-leave`, `gross-to-net`, `income-tax`) are `active: false`, category `employment`, `guide: ''`, `related: []`. They must NOT produce pages, content, math, loaders, or guides. The integrity test iterates `active` only.
- **Verification:** `npm test` all pass, `npm run check` 0 errors, `npm run build` clean. Manual sweep per spec §7 (all 6 category pages × 2 locales; one tool per category in both locales; non-financial tools show no currency selector; Tier B entries produce no pages).

---

### Task 1: Category system, category pages, tier-B reservations, shared utils

**Files:**
- Modify: `src/config/calculators.ts`
- Create: `src/lib/calculators/utils.ts`
- Modify: `src/lib/calculators/types.ts:90,111`
- Modify: `src/lib/calculator-payload.ts:31,44`
- Modify: `src/components/CalculatorShell.astro:9`
- Modify: `src/components/pages/HomePage.astro:39,64`
- Modify: `src/components/pages/CalculatorsIndex.astro`
- Create: `src/components/pages/CategoryPage.astro`
- Rename: `src/pages/calculators/[slug].astro` → `src/pages/calculators/[segment].astro`
- Rename: `src/pages/en/calculators/[slug].astro` → `src/pages/en/calculators/[segment].astro`
- Create: `src/pages/calculators/[category].astro` (NOT created — see `[segment].astro`)
- Modify: `src/styles/components.css:884-892`
- Create: `tests/catalog.test.ts`

**Interfaces:**
- Produces: `type Category = 'finance' | 'employment' | 'health' | 'education' | 'everyday' | 'business'`; `interface CategoryMeta { id: Category; label: { ar; en }; tagline: { ar; en }; icon: Category }`; `const CATEGORIES: Record<Category, CategoryMeta>`; `const DEFAULT_CURRENCY = 'JOD'` re-exported from `currencies.ts` usage (see Step 4); `utils.ts` exports `err`, `toNumber`, `numeric`, `optionalNumeric`, `checkNumber`, `monthlyPayment`, `daysBetween`, `calendarDiff`, `parseIso`, `todayIso` (a strict `yyyy-mm-dd` local-time parser and the current-date ISO string — both used by the date tools in Task 6).
- Consumes: nothing from later tasks.

- [x] **Step 1: Widen `Category` and add `CATEGORIES` in `src/config/calculators.ts`**

Replace line 6:

```ts
export type Category = 'finance' | 'employment' | 'health' | 'education' | 'everyday' | 'business';
```

Add after the `CalculatorEntry` interface (before `CALCULATORS`):

```ts
export interface CategoryMeta {
  id: Category;
  label: { ar: string; en: string };
  tagline: { ar: string; en: string };
  icon: Category;
}

export const CATEGORIES: Record<Category, CategoryMeta> = {
  finance: {
    id: 'finance',
    label: { ar: 'مالية', en: 'Finance' },
    tagline: {
      ar: 'حاسبات القروض والادخار والاستثمار والضرائب والتخطيط المالي.',
      en: 'Loans, savings, investments, taxes and financial planning.',
    },
    icon: 'finance',
  },
  employment: {
    id: 'employment',
    label: { ar: 'عمل وتوظيف', en: 'Employment' },
    tagline: {
      ar: 'حاسبات الرواتب والأجور وتكاليف التوظيف والإجازات.',
      en: 'Salary, wages, hiring costs and leave.',
    },
    icon: 'employment',
  },
  health: {
    id: 'health',
    label: { ar: 'صحة', en: 'Health' },
    tagline: {
      ar: 'مؤشرات وزن الجسم وحاجتك اليومية من السعرات.',
      en: 'Body weight metrics and daily calorie needs.',
    },
    icon: 'health',
  },
  education: {
    id: 'education',
    label: { ar: 'تعليم', en: 'Education' },
    tagline: {
      ar: 'حساب المعدل التراكمي والدرجات والأهداف الدراسية.',
      en: 'GPA, grades and study targets.',
    },
    icon: 'education',
  },
  everyday: {
    id: 'everyday',
    label: { ar: 'يومية', en: 'Everyday' },
    tagline: {
      ar: 'أدوات يومية سريعة: العمر، التواريخ، الإكرامية وتحويل الوحدات.',
      en: 'Quick everyday tools: age, dates, tips and unit conversion.',
    },
    icon: 'everyday',
  },
  business: {
    id: 'business',
    label: { ar: 'أعمال', en: 'Business' },
    tagline: {
      ar: 'حاسبات التسعير والهامش ونقطة التعادل للمشاريع.',
      en: 'Pricing, margin and break-even for businesses.',
    },
    icon: 'business',
  },
};
```

- [x] **Step 2: Add the 6 reserved Tier B entries to `CALCULATORS`**

Append to the `CALCULATORS` array (after the `leave-balance` entry). All have `category: 'employment'`, `active: false`, `guide: ''`, `related: []`:

```ts
  {
    id: 'end-of-service',
    slug: 'end-of-service',
    category: 'employment',
    title: { ar: 'حاسبة مكافأة نهاية الخدمة', en: 'End-of-service gratuity calculator' },
    description: {
      ar: 'تقدر مكافأة نهاية الخدمة وفق قوانين العمل في بلدك.',
      en: 'Estimates end-of-service gratuity under your country\u2019s labour law.',
    },
    related: [],
    guide: '',
    active: false,
  },
  {
    id: 'social-insurance',
    slug: 'social-insurance',
    category: 'employment',
    title: { ar: 'حاسبة التأمين الاجتماعي', en: 'Social insurance calculator' },
    description: {
      ar: 'تحسب اشتراكات التأمين الاجتماعي للموظف وصاحب العمل.',
      en: 'Calculates social-insurance contributions for employee and employer.',
    },
    related: [],
    guide: '',
    active: false,
  },
  {
    id: 'notice-period',
    slug: 'notice-period',
    category: 'employment',
    title: { ar: 'حاسبة فترة الإشعار', en: 'Notice period calculator' },
    description: {
      ar: 'تحدد فترة الإشعار الواجبة عند إنهاء عقد العمل.',
      en: 'Determines the notice period required to end an employment contract.',
    },
    related: [],
    guide: '',
    active: false,
  },
  {
    id: 'maternity-leave',
    slug: 'maternity-leave',
    category: 'employment',
    title: { ar: 'حاسبة إجازة الأمومة', en: 'Maternity leave calculator' },
    description: {
      ar: 'تحسب مدة إجازة الأمومة وأجرها حسب القانون.',
      en: 'Calculates maternity-leave duration and pay under the law.',
    },
    related: [],
    guide: '',
    active: false,
  },
  {
    id: 'gross-to-net',
    slug: 'gross-to-net',
    category: 'employment',
    title: { ar: 'محوّل الراتب الإجمالي إلى الصافي', en: 'Gross-to-net salary converter' },
    description: {
      ar: 'تحويل الراتب الإجمالي إلى الصافي بعد الخصومات القانونية.',
      en: 'Converts gross salary to net after statutory deductions.',
    },
    related: [],
    guide: '',
    active: false,
  },
  {
    id: 'income-tax',
    slug: 'income-tax',
    category: 'employment',
    title: { ar: 'حاسبة ضريبة الدخل', en: 'Income tax calculator' },
    description: {
      ar: 'تحسب ضريبة الدخل على الأجور حسب الشرائح في بلدك.',
      en: 'Calculates income tax on wages using your country\u2019s brackets.',
    },
    related: [],
    guide: '',
    active: false,
  },
```

- [x] **Step 3: Create `src/lib/calculators/utils.ts`**

```ts
/** Shared pure helpers for calculator math modules. */

export function err(msg: string): never {
  throw new Error(msg);
}

/** Safe parse: returns NaN for anything non-numeric (does not throw). */
export function toNumber(raw: string | undefined): number {
  if (raw === undefined || raw === null || raw === '') return NaN;
  return Number(raw);
}

export function numeric(input: Record<string, string | undefined>, id: string): number {
  const v = toNumber(input[id]);
  if (!Number.isFinite(v)) err(`Invalid numeric field: ${id}`);
  return v;
}

export function optionalNumeric(input: Record<string, string | undefined>, id: string, fallback = 0): number {
  const raw = input[id];
  if (raw === undefined || raw === null || raw === '') return fallback;
  return numeric(input, id);
}

/** Numeric validation helper: returns error code ('required'|'invalid'|'min'|'max') or null. */
export function checkNumber(raw: string | undefined, min: number, max: number): string | null {
  if (raw === undefined || raw === '') return 'required';
  const v = toNumber(raw);
  if (!Number.isFinite(v)) return 'invalid';
  if (v < min) return 'min';
  if (v > max) return 'max';
  return null;
}

/** Fixed-rate annuity monthly payment. months and monthlyRate are per-month. */
export function monthlyPayment(principal: number, monthlyRate: number, months: number): number {
  if (months <= 0) return 0;
  if (monthlyRate === 0) return principal / months;
  const growth = Math.pow(1 + monthlyRate, months);
  const payment = (principal * monthlyRate * growth) / (growth - 1);
  return Number.isFinite(payment) ? payment : principal / months;
}

/** Strict local-time parser for `yyyy-mm-dd`. Returns null for malformed or rollover input (e.g. 2020-13-01, 2020-02-31). */
export function parseIso(raw: string | undefined): Date | null {
  if (!raw) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(raw);
  if (!m) return null;
  const y = Number(m[1]);
  const mo = Number(m[2]);
  const d = Number(m[3]);
  const date = new Date(y, mo - 1, d);
  if (date.getFullYear() !== y || date.getMonth() !== mo - 1 || date.getDate() !== d) return null;
  return date;
}

/** Current date as `yyyy-mm-dd` (local time). */
export function todayIso(): string {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mm}-${dd}`;
}

/** Whole days between two local-midnight dates (end - start). Negative if end < start. */
export function daysBetween(start: Date, end: Date): number {
  return Math.round((end.getTime() - start.getTime()) / 86400000);
}

/** Full calendar difference (end - start) as { years, months, days }, end >= start required. */
export function calendarDiff(start: Date, end: Date): { years: number; months: number; days: number } {
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();
  if (days < 0) {
    months -= 1;
    const prevMonthDays = new Date(end.getFullYear(), end.getMonth(), 0).getDate();
    days += prevMonthDays;
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return { years, months, days };
}
```

Note: `calendarDiff` counts a full month only when the end date's day-of-month reaches the start's day. When the start's day exceeds the end month's length (e.g. 2021-01-31 → 2021-02-28), the full month is not reached and the residue lands in `days` (result: 0 years, 0 months, 28 days). Document this carry-over behavior in the date-difference content assumptions.

- [x] **Step 4: Make currency optional in `types.ts` + `calculator-payload.ts`**

In `src/lib/calculators/types.ts`, change lines 111 and 112 to optional:

```ts
  currencyDefault?: CurrencyCode;
  currencyLabel?: string;
```

In `src/lib/calculator-payload.ts`, replace the `currencyDefault` and `currencyLabel` assignments in the returned object:

```ts
    currencyDefault: content.currencyDefault ?? 'JOD',
```

```ts
    currencyLabel: content.currencyLabel ?? (content.locale === 'ar' ? 'العملة' : 'Currency'),
```

- [x] **Step 5: Widen `CalculatorShell.astro` category prop**

Replace line 9:

```ts
  category: Category;
```

and add the import `import type { Category } from '../config/calculators';` at the top of the frontmatter. (`payloadJson` already takes `category: string`, so no change there.)

- [x] **Step 6: Update `HomePage.astro` to use `CATEGORIES`**

Replace line 39 (`const t = { … category: { finance: …, employment: … } … }`): remove the `category:` key from `t`, and replace lines 60-64 so the meta label comes from `CATEGORIES`:

```astro
          <a class="tool-card" data-category={c.category} href={localizedPath(locale, `/calculators/${c.slug}/`)}>
            <span class="tool-card__icon" aria-hidden="true"></span>
            <h3>{c.title[locale]}</h3>
            <p>{c.description[locale]}</p>
            <span class="tool-card__meta">{CATEGORIES[c.category].label[locale]}</span>
          </a>
```

Add `CATEGORIES` to the existing import from `'../../config/calculators'`.

- [x] **Step 7: Make `CalculatorsIndex.astro` data-driven**

Replace the `groups` block (lines 19-26) with:

```ts
const categoryIds = Object.keys(CATEGORIES) as Category[];
const groups = categoryIds.map((id) => ({
  category: id,
  meta: CATEGORIES[id],
  items: CALCULATORS.filter((c) => c.category === id && c.active),
}));
```

Update the render block: each section shows an `<h2>` linking to the category page, the tagline, and the grid:

```astro
  {groups.map((group) => (
    <section>
      <h2><a href={localizedPath(locale, `/calculators/${group.category}/`)}>{group.meta.label[locale]}</a></h2>
      <p class="section-lead">{group.meta.tagline[locale]}</p>
      <div class="tool-grid">
        {group.items.map((c) => (
          <a class="tool-card" data-category={c.category} href={localizedPath(locale, `/calculators/${c.slug}/`)}>
            <span class="tool-card__icon" aria-hidden="true"></span>
            <h3>{c.title[locale]}</h3>
            <p>{c.description[locale]}</p>
            <span class="tool-card__meta">{group.meta.label[locale]}</span>
          </a>
        ))}
      </div>
    </section>
  ))}
```

Update the `description` copy to cover all six categories (line 15-17):

```ts
const description = locale === 'ar'
  ? 'كل حاسبات كلار: مالية، عمل وتوظيف، صحة، تعليم، أدوات يومية وأعمال.'
  : 'All of Klar\u2019s calculators: finance, employment, health, education, everyday and business.';
```

Update the import on line 5 to `import type { Category } from '../../config/calculators';` and add `CATEGORIES` to the line 3 import.

- [x] **Step 8: Create `src/components/pages/CategoryPage.astro`**

```astro
---
import PageLayout from '../../layouts/PageLayout.astro';
import { CATEGORIES, getCalculatorsByCategory } from '../../config/calculators';
import { localizedPath } from '../../lib/i18n';
import type { Category } from '../../config/calculators';
import type { Locale } from '../../config/site';

interface Props {
  locale: Locale;
  category: Category;
}

const { locale, category } = Astro.props;
const meta = CATEGORIES[category];
const path = `/calculators/${category}/`;
const title = meta.label[locale];
const items = getCalculatorsByCategory(category);
---

<PageLayout locale={locale} path={path} title={title} description={meta.tagline[locale]}>
  <section class="page-hero">
    <h1>{meta.label[locale]}</h1>
    <p class="section-lead">{meta.tagline[locale]}</p>
  </section>
  <div class="tool-grid">
    {items.map((c) => (
      <a class="tool-card" data-category={c.category} href={localizedPath(locale, `/calculators/${c.slug}/`)}>
        <span class="tool-card__icon" aria-hidden="true"></span>
        <h2>{c.title[locale]}</h2>
        <p>{c.description[locale]}</p>
        <span class="tool-card__meta">{meta.label[locale]}</span>
      </a>
    ))}
  </div>
  <p style="margin-block-start: var(--space-4)">
    <a href={localizedPath(locale, '/calculators/')}>{locale === 'ar' ? 'كل الحاسبات ←' : 'All calculators ←'}</a>
  </p>
</PageLayout>
```

(Add `.page-hero` and `.section-lead` minimal styles in `components.css` only if they are not already defined; if absent, add `.section-lead { color: var(--color-text-secondary); }`.)

- [x] **Step 9: Rename `[slug].astro` → `[segment].astro` and dispatch by segment**

Rename `src/pages/calculators/[slug].astro` to `src/pages/calculators/[segment].astro` and replace its content:

```astro
---
import CalculatorPage from '@/components/pages/CalculatorPage.astro';
import CategoryPage from '@/components/pages/CategoryPage.astro';
import { CALCULATORS, CATEGORIES } from '@/config/calculators';
import type { Category } from '@/config/calculators';

export function getStaticPaths() {
  const calculators = CALCULATORS.filter((c) => c.active).map((c) => ({
    params: { segment: c.slug },
    props: { segment: c.slug, locale: 'ar' as const },
  }));
  const categories = (Object.keys(CATEGORIES) as Category[]).map((c) => ({
    params: { segment: c },
    props: { segment: c, locale: 'ar' as const },
  }));
  return [...calculators, ...categories];
}

const { segment, locale } = Astro.props;
const isCategory = segment in CATEGORIES;
---

{isCategory ? (
  <CategoryPage category={segment as Category} locale={locale} />
) : (
  <CalculatorPage slug={segment} locale={locale} />
)}
```

Do the same rename/replace for `src/pages/en/calculators/[slug].astro` → `[segment].astro`, with `locale: 'en' as const` and `<CategoryPage category={segment as Category} locale={locale} />`.

- [x] **Step 10: Add the 4 new category icons to `src/styles/components.css`**

After the existing `.tool-card[data-category='employment'] …` rule (line 888), add:

```css
.tool-card[data-category='health'] .tool-card__icon {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%230E8A6D' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M22 12h-4l-3 9L9 3l-3 9H2'/%3E%3C/svg%3E");
}
.tool-card[data-category='education'] .tool-card__icon {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2312305C' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M22 10L12 5 2 10l10 5 10-5z'/%3E%3Cpath d='M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5'/%3E%3C/svg%3E");
}
.tool-card[data-category='everyday'] .tool-card__icon {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%230E8A6D' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cpolyline points='12 6 12 12 16 14'/%3E%3C/svg%3E");
}
.tool-card[data-category='business'] .tool-card__icon {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2312305C' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z'/%3E%3Cline x1='3' y1='6' x2='21' y2='6'/%3E%3Cpath d='M16 10a4 4 0 0 1-8 0'/%3E%3C/svg%3E");
}
```

- [x] **Step 11: Create `tests/catalog.test.ts`**

```ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CALCULATORS, CATEGORIES } from '../src/config/calculators';
import { getMath } from '../src/lib/calculators';
import { getCalcContent } from '../src/content/calculators';
import { mathLoaders } from '../src/lib/client/registry';
import guides from '../src/content/guides';

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
  const reserved = ['end-of-service', 'social-insurance', 'notice-period', 'maternity-leave', 'gross-to-net', 'income-tax'];
  for (const slug of reserved) {
    const entry = CALCULATORS.find((c) => c.slug === slug);
    assert.ok(entry, `${slug}: reserved entry exists`);
    assert.equal(entry.active, false, `${slug}: inactive`);
    assert.equal(entry.category, 'employment', `${slug}: employment category`);
  }
});
```

- [x] **Step 12: Verify**

Run: `npm test` → all pass (original tests + catalog tests).
Run: `npm run check` → 0 errors.
Run: `npm run build` → clean (61 existing pages + 6 new category pages per locale).

- [x] **Step 13: Commit**

```bash
git add src/config/calculators.ts src/lib/calculators/utils.ts src/lib/calculators/types.ts src/lib/calculator-payload.ts src/components/CalculatorShell.astro src/components/pages/HomePage.astro src/components/pages/CalculatorsIndex.astro src/components/pages/CategoryPage.astro src/pages/calculators/[segment].astro src/pages/en/calculators/[segment].astro src/styles/components.css tests/catalog.test.ts
git commit -m "feat(catalog): category system, category pages, and reserved tier-B entries"
```

---

### Task 2: Finance wave A — mortgage, loan-comparison, early-payoff

**Files:**
- Modify: `src/config/calculators.ts` (3 config entries)
- Create: `src/lib/calculators/mortgage.ts`, `src/lib/calculators/loan-comparison.ts`, `src/lib/calculators/early-payoff.ts`
- Modify: `src/lib/calculators/index.ts` (getMath registry — 3 lines)
- Modify: `src/lib/client/registry.ts` (3 loader lines)
- Create: `src/content/calculators/mortgage.ts`, `src/content/calculators/loan-comparison.ts`, `src/content/calculators/early-payoff.ts`
- Modify: `src/content/calculators/index.ts` (3 registry lines)
- Modify: `src/content/guides.ts` (3 guides)
- Create: `tests/mortgage.test.ts`, `tests/loan-comparison.test.ts`, `tests/early-payoff.test.ts`

**Interfaces:**
- Consumes: `Category`, `CATEGORIES`, `utils.ts` helpers from Task 1; `[segment].astro` route handles these slugs automatically.
- Produces: three published tools in `finance`.

**Guide slugs:** `how-to-calculate-a-mortgage`, `how-to-compare-loan-offers`, `how-early-loan-payoff-works`.

- [x] **Step 1: Add 3 config entries to `CALCULATORS` (finance, `active: true`)**

```ts
  {
    id: 'mortgage',
    slug: 'mortgage',
    category: 'finance',
    title: { ar: 'حاسبة القرض العقاري', en: 'Mortgage calculator' },
    description: {
      ar: 'احسب القسط الشهري للقرض العقاري مع الدفعة المقدمة والفائدة والرسوم وجدول سداد سنوي.',
      en: 'Estimate the monthly payment on a home loan with down payment, interest, fees and an annual repayment table.',
    },
    related: ['loan-payment', 'early-payoff'],
    guide: 'how-to-calculate-a-mortgage',
    active: true,
  },
  {
    id: 'loan-comparison',
    slug: 'loan-comparison',
    category: 'finance',
    title: { ar: 'حاسبة مقارنة القروض', en: 'Loan comparison calculator' },
    description: {
      ar: 'قارن بين عرضي قرض جنباً إلى جنب: القسط الشهري والفائدة والتكلفة الكلية لكل عرض.',
      en: 'Compare two loan offers side by side: monthly payment, interest and total cost per offer.',
    },
    related: ['loan-payment', 'early-payoff'],
    guide: 'how-to-compare-loan-offers',
    active: true,
  },
  {
    id: 'early-payoff',
    slug: 'early-payoff',
    category: 'finance',
    title: { ar: 'حاسبة السداد المبكر', en: 'Early payoff calculator' },
    description: {
      ar: 'احسب ما توفره الدفعات الإضافية على قرضك: تاريخ سداد أبكر وفائدة موفرة.',
      en: 'See how much extra payments save on your loan: an earlier payoff date and less interest.',
    },
    related: ['loan-payment', 'mortgage'],
    guide: 'how-early-loan-payoff-works',
    active: true,
  },
```

- [x] **Step 2: Create `src/lib/calculators/mortgage.ts`**

```ts
import type { CalcInput, CalcOutput, CalculatorMath } from './types';
import { err, numeric, optionalNumeric, checkNumber, monthlyPayment } from './utils';

const MONTHS_PER_YEAR = 12;

export const mortgage: CalculatorMath = {
  slug: 'mortgage',
  fields: [
    { id: 'price', type: 'number', required: true, min: 0, max: 1e15, step: 'any' },
    { id: 'downPayment', type: 'number', required: true, min: 0, max: 1e15, step: 'any' },
    { id: 'annualRate', type: 'number', required: true, min: 0, max: 100, step: 'any' },
    { id: 'term', type: 'number', required: true, min: 0.001, max: 100, step: 'any' },
    { id: 'termUnit', type: 'radio', defaultValue: 'years', options: [
      { value: 'months', label: 'months' },
      { value: 'years', label: 'years' },
    ] },
    { id: 'fees', type: 'number', min: 0, max: 1e15, step: 'any' },
    { id: 'currency', type: 'currency' },
  ],
  example: {
    price: '200000',
    downPayment: '40000',
    annualRate: '5',
    term: '20',
    termUnit: 'years',
    fees: '1000',
    currency: 'JOD',
  },

  validate(input: CalcInput): Record<string, string> {
    const errors: Record<string, string> = {};
    const priceErr = checkNumber(input.price, 0, 1e15);
    if (priceErr) errors.price = priceErr;
    const downErr = checkNumber(input.downPayment, 0, 1e15);
    if (downErr) errors.downPayment = downErr;
    const rateErr = checkNumber(input.annualRate, 0, 100);
    if (rateErr) errors.annualRate = rateErr;
    const termErr = checkNumber(input.term, 0.000001, 100);
    if (termErr) errors.term = termErr;
    const feesErr = checkNumber(input.fees, 0, 1e15);
    if (feesErr) errors.fees = feesErr;
    if (!errors.price && !errors.downPayment) {
      const price = Number(input.price);
      const down = Number(input.downPayment);
      if (Number.isFinite(price) && Number.isFinite(down) && down >= price) errors.downPayment = 'max';
    }
    return errors;
  },

  calculate(input: CalcInput): CalcOutput {
    const price = numeric(input, 'price');
    const down = numeric(input, 'downPayment');
    const ratePct = numeric(input, 'annualRate');
    const termValue = numeric(input, 'term');
    const termUnit = input.termUnit;
    const fees = optionalNumeric(input, 'fees', 0);

    const loanAmount = price - down;
    const months = termUnit === 'months' ? termValue : termValue * MONTHS_PER_YEAR;
    const monthlyRate = ratePct / 100 / MONTHS_PER_YEAR;
    const payment = monthlyPayment(loanAmount, monthlyRate, months);
    const totalPaid = payment * months;
    const totalInterest = totalPaid - loanAmount;
    const effectiveTotalCost = totalPaid + down + fees;

    // Annual schedule identical in construction to loan.ts
    const yearMap = new Map<number, { total: number; principal: number; interest: number; balance: number }>();
    let remaining = loanAmount;
    for (let m = 1; m <= Math.round(months); m++) {
      let interest: number;
      let principalPaid: number;
      if (monthlyRate === 0) {
        interest = 0;
        principalPaid = loanAmount / Math.round(months);
        if (m === Math.round(months)) principalPaid = remaining;
      } else {
        interest = remaining * monthlyRate;
        principalPaid = payment - interest;
        if (m === Math.round(months)) principalPaid = remaining;
      }
      remaining -= principalPaid;
      if (remaining < 0) remaining = 0;
      const year = Math.ceil(m / MONTHS_PER_YEAR);
      const bucket = yearMap.get(year) ?? { total: 0, principal: 0, interest: 0, balance: 0 };
      bucket.total += principalPaid + interest;
      bucket.principal += principalPaid;
      bucket.interest += interest;
      bucket.balance = remaining;
      yearMap.set(year, bucket);
    }

    const rows: (string | number)[][] = [];
    for (const [year, b] of [...yearMap.entries()].sort((a, b) => a[0] - b[0])) {
      rows.push([year, b.total, b.principal, b.interest, Math.max(b.balance, 0)]);
    }

    return {
      results: [
        { key: 'loanAmount', value: loanAmount, kind: 'currency' },
        { key: 'monthlyPayment', value: payment, kind: 'currency', hero: true },
        { key: 'totalInterest', value: totalInterest, kind: 'currency' },
        { key: 'totalPaid', value: totalPaid, kind: 'currency' },
        { key: 'effectiveTotalCost', value: effectiveTotalCost, kind: 'currency' },
      ],
      table: {
        columns: ['year', 'totalPaidYear', 'principalYear', 'interestYear', 'balance'],
        cellKinds: ['number', 'currency', 'currency', 'currency', 'currency'],
        rows,
      },
    };
  },
};

export default mortgage;
```

**Mortgage content spec** (ar/en, written into `src/content/calculators/mortgage.ts`):
- title/h1: ar `حاسبة القرض العقاري`, en `Mortgage calculator`
- metaDescription: ar `احسب القسط الشهري للقرض العقاري مع الدفعة المقدمة وسعر الفائدة والرسوم، مع جدول سداد سنوي يوضح توزيع أصل الدين والفائدة.`, en `Calculate a home loan\u2019s monthly payment with down payment, interest rate and fees, plus an annual repayment table splitting principal and interest.`
- field labels: `price` — ar `سعر العقار` / en `Property price`; `downPayment` — ar `الدفعة المقدمة` / en `Down payment`; `annualRate` — ar `سعر الفائدة السنوي (%)` / en `Annual interest rate (%)`; `term` — ar `مدة القرض` / en `Loan term`; `termUnit` — ar `وحدة المدة` / en `Term unit` (options months=أشهر/Months, years=سنوات/Years); `fees` — ar `الرسوم` / en `Fees`; `currency` — ar `العملة` / en `Currency`
- result labels: `loanAmount` — ar `مبلغ القرض الفعلي` / en `Loan amount`; `monthlyPayment` — ar `القسط الشهري` / en `Monthly payment` (hero); `totalInterest` — ar `إجمالي الفائدة` / en `Total interest`; `totalPaid` — ar `إجمالي المدفوعات` / en `Total paid`; `effectiveTotalCost` — ar `التكلفة الكلية الفعلية` / en `Effective total cost`
- currency: `JOD`. `buttons`/`ui`/`errorMessages`/`requiredNote`: copy verbatim from `loan-payment.ts`. Table columns same keys as loan-payment.
- example values (content `exampleHtml` + guide worked example must use these): price **200,000** JOD, down **40,000** JOD, rate **5%**, term **20 years**, fees **1,000** JOD → loan amount 160,000, monthly payment **≈ 1,056** JOD, total interest **≈ 93,416** JOD, effective total cost **≈ 294,416** JOD.
- prose topics: intro (what a mortgage payment includes; down payment reduces the loan amount); assumptions (fixed rate, monthly payments, fees added to cost, no insurance/early-repayment fees); whenUseful (buying a home or comparing mortgage offers); mistakes (ignoring down payment, monthly vs annual rate, comparing only the payment); methodologyNote (fixed-rate annuity formula, annual schedule, estimates); disclaimerNote same as loan-payment. FAQ topics: what is included in the payment; what if the rate is variable; how the effective total cost is computed; does the table show the real balance.

**Mortgage test** `tests/mortgage.test.ts` (import `{ mortgage }` from `../src/lib/calculators/mortgage.ts`; reuse a `resultOf` helper like `loan.test.ts`):
- baseline example → monthlyPayment within `1055..1058`; totalInterest within `93300..93500`; loanAmount == 160000
- zero rate → payment == loanAmount/months exactly
- downPayment == price → validate returns `downPayment: 'max'`
- missing required → `required`
- negative rate → `min`
- amortization last balance < 0.01 and row count == 20

- [x] **Step 3: Create `src/lib/calculators/loan-comparison.ts`**

```ts
import type { CalcInput, CalcOutput, CalculatorMath } from './types';
import { numeric, optionalNumeric, checkNumber, monthlyPayment } from './utils';

const MONTHS_PER_YEAR = 12;

export const loanComparison: CalculatorMath = {
  slug: 'loan-comparison',
  fields: [
    { id: 'principal', type: 'number', required: true, min: 0, max: 1e15, step: 'any' },
    { id: 'rateA', type: 'number', required: true, min: 0, max: 100, step: 'any' },
    { id: 'rateB', type: 'number', required: true, min: 0, max: 100, step: 'any' },
    { id: 'termA', type: 'number', required: true, min: 0.001, max: 100, step: 'any' },
    { id: 'termB', type: 'number', required: true, min: 0.001, max: 100, step: 'any' },
    { id: 'termUnit', type: 'radio', defaultValue: 'years', options: [
      { value: 'months', label: 'months' },
      { value: 'years', label: 'years' },
    ] },
    { id: 'feesA', type: 'number', min: 0, max: 1e15, step: 'any' },
    { id: 'feesB', type: 'number', min: 0, max: 1e15, step: 'any' },
    { id: 'currency', type: 'currency' },
  ],
  example: {
    principal: '50000',
    rateA: '6',
    rateB: '7.5',
    termA: '5',
    termB: '5',
    termUnit: 'years',
    feesA: '300',
    feesB: '0',
    currency: 'JOD',
  },

  validate(input: CalcInput): Record<string, string> {
    const errors: Record<string, string> = {};
    const defs: [string, number, number][] = [
      ['principal', 0, 1e15],
      ['rateA', 0, 100],
      ['rateB', 0, 100],
      ['termA', 0.000001, 100],
      ['termB', 0.000001, 100],
      ['feesA', 0, 1e15],
      ['feesB', 0, 1e15],
    ];
    for (const [id, min, max] of defs) {
      const e = checkNumber(input[id], min, max);
      if (e) errors[id] = e;
    }
    return errors;
  },

  calculate(input: CalcInput): CalcOutput {
    const principal = numeric(input, 'principal');
    const termUnit = input.termUnit;
    const months = (value: number) => (termUnit === 'months' ? value : value * MONTHS_PER_YEAR);
    const monthly = (ratePct: number, termValue: number) =>
      monthlyPayment(principal, ratePct / 100 / MONTHS_PER_YEAR, months(termValue));

    const mA = monthly(numeric(input, 'rateA'), numeric(input, 'termA'));
    const mB = monthly(numeric(input, 'rateB'), numeric(input, 'termB'));
    const nA = months(numeric(input, 'termA'));
    const nB = months(numeric(input, 'termB'));
    const interestA = mA * nA - principal;
    const interestB = mB * nB - principal;
    const feesA = optionalNumeric(input, 'feesA', 0);
    const feesB = optionalNumeric(input, 'feesB', 0);
    const costA = mA * nA + feesA;
    const costB = mB * nB + feesB;

    return {
      results: [
        { key: 'monthlyA', value: mA, kind: 'currency', hero: true },
        { key: 'monthlyB', value: mB, kind: 'currency' },
        { key: 'totalInterestA', value: interestA, kind: 'currency' },
        { key: 'totalInterestB', value: interestB, kind: 'currency' },
        { key: 'totalCostA', value: costA, kind: 'currency' },
        { key: 'totalCostB', value: costB, kind: 'currency' },
        { key: 'diffTotalCost', value: costA - costB, kind: 'currency' },
      ],
    };
  },
};

export default loanComparison;
```

**Loan-comparison content spec**:
- title/h1: ar `حاسبة مقارنة القروض`, en `Loan comparison calculator`
- metaDescription: ar `قارن بين عرضي قرض جنباً إلى جنب: القسط الشهري وإجمالي الفائدة والتكلفة الكلية، لتختار العرض الأرخص بمعايير واضحة.`, en `Compare two loan offers side by side: monthly payment, total interest and total cost, so you can pick the cheaper one on clear criteria.`
- field labels: `principal` — ar `مبلغ القرض (مشترك)` / en `Loan amount (shared)`; `rateA` — ar `سعر فائدة العرض الأول (%)` / en `Offer A interest rate (%)`; `rateB` — ar `سعر فائدة العرض الثاني (%)` / en `Offer B interest rate (%)`; `termA` — ar `مدة العرض الأول` / en `Offer A term`; `termB` — ar `مدة العرض الثاني` / en `Offer B term`; `termUnit` — ar `وحدة المدة` / en `Term unit` (options months/years as mortgage); `feesA` — ar `رسوم العرض الأول` / en `Offer A fees`; `feesB` — ar `رسوم العرض الثاني` / en `Offer B fees`; `currency` — ar `العملة` / en `Currency`
- result labels: `monthlyA` — ar `قسط العرض الأول` / en `Offer A payment` (hero); `monthlyB` — ar `قسط العرض الثاني` / en `Offer B payment`; `totalInterestA` — ar `فائدة العرض الأول` / en `Offer A interest`; `totalInterestB` — ar `فائدة العرض الثاني` / en `Offer B interest`; `totalCostA` — ar `تكلفة العرض الأول` / en `Offer A cost`; `totalCostB` — ar `تكلفة العرض الثاني` / en `Offer B cost`; `diffTotalCost` — ar `الفرق في التكلفة (أ − ب)` / en `Cost difference (A − B)`
- currency: `JOD`. Prose topics: compare total cost not just the payment; same principal for both offers; assumptions (fixed rates, monthly payments, fees included in cost). FAQ: which number should drive my choice; what if terms differ; can I use it for different principals.
- example numbers: principal **50,000** JOD, A: **6%**, **5 years**, fees **300**; B: **7.5%**, **5 years**, fees **0** → payment A **≈ 966.64** JOD, payment B **≈ 1,001.82** JOD; cost A **≈ 58,298** JOD (966.64×60+300), cost B **≈ 60,109** JOD; cost difference (A − B) **≈ −1,811** JOD.

**Loan-comparison test** (import `{ loanComparison }`):
- example → monthlyA within `966.6..966.7`; monthlyB within `1001.8..1001.9`; diffTotalCost within `−1812..−1810`
- zero rates → interestA == 0 and interestB == 0
- missing principal → `required`
- negative rateA → `min`

- [x] **Step 4: Create `src/lib/calculators/early-payoff.ts`**

```ts
import type { CalcInput, CalcOutput, CalculatorMath } from './types';
import { err, numeric, optionalNumeric, checkNumber, monthlyPayment } from './utils';

const MONTHS_PER_YEAR = 12;

export const earlyPayoff: CalculatorMath = {
  slug: 'early-payoff',
  fields: [
    { id: 'principal', type: 'number', required: true, min: 0, max: 1e15, step: 'any' },
    { id: 'annualRate', type: 'number', required: true, min: 0, max: 100, step: 'any' },
    { id: 'term', type: 'number', required: true, min: 0.001, max: 100, step: 'any' },
    { id: 'termUnit', type: 'radio', defaultValue: 'years', options: [
      { value: 'months', label: 'months' },
      { value: 'years', label: 'years' },
    ] },
    { id: 'extraMonthly', type: 'number', min: 0, max: 1e15, step: 'any' },
    { id: 'currency', type: 'currency' },
  ],
  example: {
    principal: '20000',
    annualRate: '6',
    term: '5',
    termUnit: 'years',
    extraMonthly: '100',
    currency: 'JOD',
  },

  validate(input: CalcInput): Record<string, string> {
    const errors: Record<string, string> = {};
    const defs: [string, number, number][] = [
      ['principal', 0, 1e15],
      ['annualRate', 0, 100],
      ['term', 0.000001, 100],
      ['extraMonthly', 0, 1e15],
    ];
    for (const [id, min, max] of defs) {
      const e = checkNumber(input[id], min, max);
      if (e) errors[id] = e;
    }
    return errors;
  },

  calculate(input: CalcInput): CalcOutput {
    const principal = numeric(input, 'principal');
    const ratePct = numeric(input, 'annualRate');
    const termValue = numeric(input, 'term');
    const termUnit = input.termUnit;
    const extra = optionalNumeric(input, 'extraMonthly', 0);

    const months = termUnit === 'months' ? termValue : termValue * MONTHS_PER_YEAR;
    const monthlyRate = ratePct / 100 / MONTHS_PER_YEAR;
    const basePayment = monthlyPayment(principal, monthlyRate, months);
    const totalMonths = Math.round(months);
    const baselineInterest = basePayment * totalMonths - principal;

    // Simulate the extra-payment path month by month.
    const rowsOut: (string | number)[][] = [];
    const yearMap = new Map<number, { total: number; principal: number; interest: number; balance: number }>();
    let remaining = principal;
    let month = 0;
    let totalWithExtra = 0;
    while (remaining > 0.0001 && month < 1200) {
      month++;
      const interest = remaining * monthlyRate;
      let principalPaid = basePayment + extra - interest;
      if (principalPaid > remaining) principalPaid = remaining;
      remaining -= principalPaid;
      totalWithExtra += principalPaid + interest;
      const year = Math.ceil(month / MONTHS_PER_YEAR);
      const bucket = yearMap.get(year) ?? { total: 0, principal: 0, interest: 0, balance: 0 };
      bucket.total += principalPaid + interest;
      bucket.principal += principalPaid;
      bucket.interest += interest;
      bucket.balance = Math.max(remaining, 0);
      yearMap.set(year, bucket);
    }
    for (const [year, b] of [...yearMap.entries()].sort((a, b) => a[0] - b[0])) {
      rowsOut.push([year, b.total, b.principal, b.interest, Math.max(b.balance, 0)]);
    }

    const newMonths = month;
    const interestWithExtra = totalWithExtra - principal;

    return {
      results: [
        { key: 'baselinePayment', value: basePayment, kind: 'currency', hero: true },
        { key: 'baselineMonths', value: totalMonths, kind: 'number' },
        { key: 'newMonths', value: newMonths, kind: 'number' },
        { key: 'interestSaved', value: baselineInterest - interestWithExtra, kind: 'currency' },
      ],
      table: {
        columns: ['year', 'totalPaidYear', 'principalYear', 'interestYear', 'balance'],
        cellKinds: ['number', 'currency', 'currency', 'currency', 'currency'],
        rows: rowsOut,
      },
    };
  },
};

export default earlyPayoff;
```

(Note: `err` import is unused here; omit it if unused — keep imports clean.)

**Early-payoff content spec**:
- title/h1: ar `حاسبة السداد المبكر`, en `Early payoff calculator`
- metaDescription: ar `اعرف كم توفر من الفائدة والوقت عند سداد قرضك بدفعات شهرية إضافية، مع تاريخ سداد جديد وجدول سنوي.`, en `See how much interest and time extra monthly payments save on your loan, with a new payoff date and an annual schedule.`
- field labels: `principal` — ar `مبلغ القرض` / en `Loan amount`; `annualRate` — ar `سعر الفائدة السنوي (%)` / en `Annual interest rate (%)`; `term` — ar `مدة القرض` / en `Loan term`; `termUnit` — ar `وحدة المدة` / en `Term unit`; `extraMonthly` — ar `دفعة إضافية شهرياً` / en `Extra monthly payment`; `currency` — ar `العملة` / en `Currency`
- result labels: `baselinePayment` — ar `القسط الشهري الأساسي` / en `Baseline payment` (hero); `baselineMonths` — ar `مدة السداد الأساسية (شهر)` / en `Baseline payoff (months)`; `newMonths` — ar `مدة السداد الجديدة (شهر)` / en `New payoff (months)`; `interestSaved` — ar `الفائدة الموفرة` / en `Interest saved`
- currency: `JOD`. Prose topics: extra payment goes to principal first; paying even a small extra monthly shortens the term; assumptions (fixed rate, constant extra payment); mistakes (thinking extra payments only matter for large amounts; forgetting that savings depend on remaining term); FAQ: does the whole extra go to principal; what if I only pay extra once; does it work on zero-interest loans (no interest saved, term shortens only).
- example numbers: principal **20,000** JOD, rate **6%**, term **5 years**, extra **100** JOD → baseline payment **≈ 386.66** JOD, baseline **60 months**, new payoff **< 60 months** (≈ **54**), interest saved **> 0** (≈ **~500** JOD — prose may say "over 500" or compute exact from engine; use "about" with the engine value).
- guide worked example must present the SAME numbers as `math.example` and content `exampleHtml`.

**Early-payoff test**:
- example → baselinePayment within `386.6..386.7`; baselineMonths == 60; newMonths < 60 and > 0; interestSaved > 0
- extraMonthly == 0 → newMonths == baselineMonths == 60 and interestSaved == 0
- missing principal → `required`; negative extra → `min`

- [x] **Step 5: Register all three in `src/lib/calculators/index.ts` and `src/lib/client/registry.ts`**

`src/lib/calculators/index.ts` — add imports + registry lines:

```ts
import mortgage from './mortgage';
import loanComparison from './loan-comparison';
import earlyPayoff from './early-payoff';
```

```ts
  mortgage,
  'loan-comparison': loanComparison,
  'early-payoff': earlyPayoff,
```

`src/lib/client/registry.ts` — add:

```ts
  mortgage: () => import('../calculators/mortgage.ts'),
  'loan-comparison': () => import('../calculators/loan-comparison.ts'),
  'early-payoff': () => import('../calculators/early-payoff.ts'),
```

- [x] **Step 6: Register content**

`src/content/calculators/index.ts` — add imports + registry lines:

```ts
import mortgage from './mortgage';
import loanComparison from './loan-comparison';
import earlyPayoff from './early-payoff';
```

```ts
  mortgage,
  'loan-comparison': loanComparison,
  'early-payoff': earlyPayoff,
```

Create the three content files with the content specs above (full `CalcContent` per the `loan-payment.ts` template: `locale`, `slug`, title/h1/meta, `intro`, `fields` (labels + hints), `errorMessages`, `results`, optional `table` (mortgage and early-payoff have the annual schedule table with the same column keys as loan-payment), `resultTitle`, `formula`, `exampleHtml`, `assumptions`, `whenUseful`, `mistakes`, `faqs`, `methodologyNote`, `disclaimerNote`, `lastReviewed: '2026-08-10'`, `currencyDefault: 'JOD'`, `currencyLabel`, `requiredNote`, `buttons`, `ui`, `guideTitle`, `relatedTitle`).

- [x] **Step 7: Add the three guides to `src/content/guides.ts`**

Each guide: slug, `ar` + `en` `GuideContent` (title, metaDescription, intro, `sections` (4-6 sections with heading+body), `keyTakeaways` (4-5 bullets), `faqs` (2-3), `relatedCalculators`, `lastReviewed: '2026-08-10'`). Worked examples use the numbers from each tool's content spec. `relatedCalculators`:
- `how-to-calculate-a-mortgage` → `['mortgage', 'loan-payment', 'early-payoff']`
- `how-to-compare-loan-offers` → `['loan-comparison', 'loan-payment', 'early-payoff']`
- `how-early-loan-payoff-works` → `['early-payoff', 'loan-payment', 'mortgage']`

- [x] **Step 8: Verify**

Run: `npm test` → all pass (existing + catalog + 3 new tool tests).
Run: `npm run check` → 0 errors.
Run: `npm run build` → clean. New pages appear at `/calculators/mortgage/`, `/calculators/loan-comparison/`, `/calculators/early-payoff/` (both locales); category page `/calculators/finance/` now lists 8 finance tools.

- [x] **Step 9: Commit**

```bash
git add src/config/calculators.ts src/lib/calculators/mortgage.ts src/lib/calculators/loan-comparison.ts src/lib/calculators/early-payoff.ts src/lib/calculators/index.ts src/lib/client/registry.ts src/content/calculators/mortgage.ts src/content/calculators/loan-comparison.ts src/content/calculators/early-payoff.ts src/content/calculators/index.ts src/content/guides.ts tests/mortgage.test.ts tests/loan-comparison.test.ts tests/early-payoff.test.ts
git commit -m "feat(calc): finance wave A - mortgage, loan comparison, early payoff"
```

---

### Task 3: Finance wave B — zakat, retirement-savings, debt-to-income

**Files:**
- Modify: `src/config/calculators.ts` (3 config entries)
- Create: `src/lib/calculators/zakat.ts`, `src/lib/calculators/retirement.ts`, `src/lib/calculators/debt-to-income.ts`
- Modify: `src/lib/calculators/index.ts` + `src/lib/client/registry.ts` (3 entries each)
- Create: `src/content/calculators/zakat.ts`, `src/content/calculators/retirement-savings.ts`, `src/content/calculators/debt-to-income.ts`
- Modify: `src/content/calculators/index.ts` + `src/content/guides.ts`
- Create: `tests/zakat.test.ts`, `tests/retirement.test.ts`, `tests/debt-to-income.test.ts`

**Guide slugs:** `how-to-calculate-zakat`, `how-to-plan-retirement-savings`, `how-to-calculate-debt-to-income`.

- [x] **Step 1: Add 3 config entries (finance, `active: true`)**

```ts
  {
    id: 'zakat',
    slug: 'zakat',
    category: 'finance',
    title: { ar: 'حاسبة الزكاة', en: 'Zakat calculator' },
    description: {
      ar: 'احسب زكاتك عن النقود والذهب والاستثمارات بعد خصم الالتزامات، بنسبة 2.5%.',
      en: 'Calculate your zakat on cash, gold and investments after liabilities, at 2.5%.',
    },
    related: ['savings-goal', 'retirement-savings'],
    guide: 'how-to-calculate-zakat',
    active: true,
  },
  {
    id: 'retirement-savings',
    slug: 'retirement-savings',
    category: 'finance',
    title: { ar: 'حاسبة مدخرات التقاعد', en: 'Retirement savings calculator' },
    description: {
      ar: 'قدّر قيمة مدخراتك عند التقاعد مع المساهمات الشهرية والفائدة المركبة.',
      en: 'Project your retirement balance with monthly contributions and compound interest.',
    },
    related: ['compound-interest', 'savings-goal', 'zakat'],
    guide: 'how-to-plan-retirement-savings',
    active: true,
  },
  {
    id: 'debt-to-income',
    slug: 'debt-to-income',
    category: 'finance',
    title: { ar: 'حاسبة نسبة الدين إلى الدخل', en: 'Debt-to-income calculator' },
    description: {
      ar: 'احسب نسبة أقساط ديونك الشهرية إلى دخلك الإجمالي، وهي معيار شائع لدى المقرضين.',
      en: 'Calculate your monthly debt payments as a share of gross income — a common lender metric.',
    },
    related: ['loan-payment', 'loan-comparison'],
    guide: 'how-to-calculate-debt-to-income',
    active: true,
  },
```

- [x] **Step 2: Create `src/lib/calculators/zakat.ts`**

```ts
import type { CalcInput, CalcOutput, CalculatorMath } from './types';
import { err, numeric, optionalNumeric, checkNumber } from './utils';

export const zakat: CalculatorMath = {
  slug: 'zakat',
  fields: [
    { id: 'cashSavings', type: 'number', required: true, min: 0, max: 1e15, step: 'any' },
    { id: 'goldValue', type: 'number', min: 0, max: 1e15, step: 'any' },
    { id: 'investments', type: 'number', min: 0, max: 1e15, step: 'any' },
    { id: 'debts', type: 'number', min: 0, max: 1e15, step: 'any' },
    { id: 'nisab', type: 'number', min: 0, max: 1e15, step: 'any' },
    { id: 'currency', type: 'currency' },
  ],
  example: {
    cashSavings: '10000',
    goldValue: '5000',
    investments: '2000',
    debts: '1000',
    nisab: '860',
    currency: 'JOD',
  },

  validate(input: CalcInput): Record<string, string> {
    const errors: Record<string, string> = {};
    const defs: [string, number, number][] = [
      ['cashSavings', 0, 1e15],
      ['goldValue', 0, 1e15],
      ['investments', 0, 1e15],
      ['debts', 0, 1e15],
      ['nisab', 0, 1e15],
    ];
    for (const [id, min, max] of defs) {
      const e = checkNumber(input[id], min, max);
      if (e) errors[id] = e;
    }
    return errors;
  },

  calculate(input: CalcInput): CalcOutput {
    const cash = numeric(input, 'cashSavings');
    const gold = optionalNumeric(input, 'goldValue', 0);
    const investments = optionalNumeric(input, 'investments', 0);
    const debts = optionalNumeric(input, 'debts', 0);
    const base = Math.max(cash + gold + investments - debts, 0);
    const zakatDue = base * 0.025;
    return {
      results: [
        { key: 'zakatBase', value: base, kind: 'currency' },
        { key: 'zakatDue', value: zakatDue, kind: 'currency', hero: true },
      ],
    };
  },
};

export default zakat;
```

(Note: omit `err` from the import if unused.)

**Zakat content spec**: title/h1 ar `حاسبة الزكاة` / en `Zakat calculator`. metaDescription: ar `احسب زكاتك على النقود والذهب والاستثمارات بعد خصم الالتزامات بنسبة 2.5%، وهي النسبة المعتمدة عن الأموال التي بلغت النصاب وحال عليها الحول.` / en `Calculate your zakat on cash, gold and investments after liabilities at 2.5% — the standard rate on wealth that reaches the nisab and completes a lunar year.`
- fields: `cashSavings` ar `النقود والمدخرات` / en `Cash and savings`; `goldValue` ar `قيمة الذهب` / en `Gold value`; `investments` ar `الاستثمارات` / en `Investments`; `debts` ar `الالتزامات المستحقة` / en `Outstanding liabilities`; `nisab` ar `النصاب (اختياري للرجوع إليه)` / en `Nisab (optional reference)`; `currency` ar `العملة` / en `Currency`
- results: `zakatBase` ar `وعاء الزكاة` / en `Zakat base`; `zakatDue` ar `الزكاة المستحقة` / en `Zakat due` (hero)
- currency `JOD`. Prose topics: 2.5% on the zakat base; the nisab field is informational only (the due amount is computed on the base regardless — the hint must say to enter only wealth above nisab); debts reduce the base; assumptions (lunar-year condition is the user's responsibility; gold valued at current market price); mistakes (zakat on the full savings before subtracting debts; forgetting gold and investments); FAQ: what is the nisab; does the tool track the lunar year; are business assets included.
- example numbers: cash **10,000**, gold **5,000**, investments **2,000**, debts **1,000** → base **16,000** JOD, zakat due **400** JOD.

**Zakat test**: example → zakatBase == 16000, zakatDue == 400; zero everything → 0; debts > assets → base 0, due 0; missing cash → `required`; negative debts → `min`.

- [x] **Step 3: Create `src/lib/calculators/retirement.ts`**

```ts
import type { CalcInput, CalcOutput, CalculatorMath } from './types';
import { err, numeric, checkNumber } from './utils';

export const retirementSavings: CalculatorMath = {
  slug: 'retirement-savings',
  fields: [
    { id: 'currentSavings', type: 'number', required: true, min: 0, max: 1e15, step: 'any' },
    { id: 'monthlyContribution', type: 'number', required: true, min: 0, max: 1e15, step: 'any' },
    { id: 'annualReturn', type: 'number', required: true, min: 0, max: 100, step: 'any' },
    { id: 'years', type: 'number', required: true, min: 1, max: 100, step: 'any' },
    { id: 'currency', type: 'currency' },
  ],
  example: {
    currentSavings: '10000',
    monthlyContribution: '200',
    annualReturn: '6',
    years: '20',
    currency: 'JOD',
  },

  validate(input: CalcInput): Record<string, string> {
    const errors: Record<string, string> = {};
    const defs: [string, number, number][] = [
      ['currentSavings', 0, 1e15],
      ['monthlyContribution', 0, 1e15],
      ['annualReturn', 0, 100],
      ['years', 1, 100],
    ];
    for (const [id, min, max] of defs) {
      const e = checkNumber(input[id], min, max);
      if (e) errors[id] = e;
    }
    return errors;
  },

  calculate(input: CalcInput): CalcOutput {
    const current = numeric(input, 'currentSavings');
    const monthly = numeric(input, 'monthlyContribution');
    const ratePct = numeric(input, 'annualReturn');
    const years = numeric(input, 'years');
    const n = Math.round(years * 12);
    const r = ratePct / 100 / 12;
    let finalBalance: number;
    if (r === 0) {
      finalBalance = current + monthly * n;
    } else {
      const growth = Math.pow(1 + r, n);
      finalBalance = current * growth + monthly * ((growth - 1) / r);
    }
    const totalContributions = current + monthly * n;
    return {
      results: [
        { key: 'finalBalance', value: finalBalance, kind: 'currency', hero: true },
        { key: 'totalContributions', value: totalContributions, kind: 'currency' },
        { key: 'totalInterestEarned', value: finalBalance - totalContributions, kind: 'currency' },
      ],
    };
  },
};

export default retirementSavings;
```

**Retirement content spec**: title/h1 ar `حاسبة مدخرات التقاعد` / en `Retirement savings calculator`. metaDescription: ar `قدّر رصيد مدخراتك عند التقاعد بناءً على مدخراتك الحالية ومساهمتك الشهرية والعائد السنوي المتوقع.` / en `Project your retirement balance from current savings, monthly contributions and an expected annual return.`
- fields: `currentSavings` ar `المدخرات الحالية` / en `Current savings`; `monthlyContribution` ar `المساهمة الشهرية` / en `Monthly contribution`; `annualReturn` ar `العائد السنوي المتوقع (%)` / en `Expected annual return (%)`; `years` ar `سنوات حتى التقاعد` / en `Years to retirement`; `currency` ar `العملة` / en `Currency`
- results: `finalBalance` ar `الرصيد المتوقع عند التقاعد` / en `Projected retirement balance` (hero); `totalContributions` ar `إجمالي مساهماتك` / en `Total contributions`; `totalInterestEarned` ar `إجمالي العائد المكتسب` / en `Total interest earned`
- currency `JOD`. Prose topics: compounding monthly; annual return entered as a percent (the calculator converts to monthly); contributions assumed to be the same amount every month; current savings untouched; caution that returns are not guaranteed and inflation reduces purchasing power; mistakes (using the monthly rate directly in the annual field; forgetting fees); FAQ: is the return after or before inflation; what if I contribute irregularly.
- example numbers: current **10,000**, monthly **200**, return **6%**, **20 years** → projected balance **≈ 125,500** JOD, total contributions **58,000** JOD, interest earned **≈ 67,500** JOD.

**Retirement test**: example → finalBalance within `125400..125600`; totalContributions == 58000; interestEarned = final − 58000; zero return → final == current + monthly*240; missing years → `required`; years 0 → `min`.

- [x] **Step 4: Create `src/lib/calculators/debt-to-income.ts`**

```ts
import type { CalcInput, CalcOutput, CalculatorMath } from './types';
import { err, numeric, checkNumber } from './utils';

export const debtToIncome: CalculatorMath = {
  slug: 'debt-to-income',
  fields: [
    { id: 'monthlyDebt', type: 'number', required: true, min: 0, max: 1e15, step: 'any' },
    { id: 'grossIncome', type: 'number', required: true, min: 0, max: 1e15, step: 'any' },
    { id: 'currency', type: 'currency' },
  ],
  example: {
    monthlyDebt: '400',
    grossIncome: '2000',
    currency: 'JOD',
  },

  validate(input: CalcInput): Record<string, string> {
    const errors: Record<string, string> = {};
    const debtErr = checkNumber(input.monthlyDebt, 0, 1e15);
    if (debtErr) errors.monthlyDebt = debtErr;
    const incomeErr = checkNumber(input.grossIncome, 0, 1e15);
    if (incomeErr) errors.grossIncome = incomeErr;
    if (!errors.grossIncome && Number(input.grossIncome) === 0) errors.grossIncome = 'min';
    return errors;
  },

  calculate(input: CalcInput): CalcOutput {
    const debt = numeric(input, 'monthlyDebt');
    const income = numeric(input, 'grossIncome');
    if (income <= 0) throw new Error('gross income must be positive');
    const dti = (debt / income) * 100;
    return {
      results: [
        { key: 'dtiRatio', value: dti, kind: 'percent', hero: true },
        { key: 'remainingIncome', value: income - debt, kind: 'currency' },
      ],
    };
  },
};

export default debtToIncome;
```

**Debt-to-income content spec**: title/h1 ar `حاسبة نسبة الدين إلى الدخل` / en `Debt-to-income calculator`. metaDescription: ar `احسب نسبة أقساط ديونك الشهرية إلى دخلك الإجمالي، وراجع كم يتبقى من دخلك بعد الأقساط.` / en `Calculate your monthly debt payments as a share of gross income, and see what income remains after the payments.`
- fields: `monthlyDebt` ar `أقساط الديون الشهرية` / en `Monthly debt payments`; `grossIncome` ar `الدخل الإجمالي الشهري` / en `Gross monthly income`; `currency` ar `العملة` / en `Currency`
- results: `dtiRatio` ar `نسبة الدين إلى الدخل` / en `Debt-to-income ratio` (hero, percent); `remainingIncome` ar `الدخل المتبقي بعد الأقساط` / en `Remaining income`
- currency `JOD`. Prose topics: DTI = monthly debt ÷ gross income × 100; common lender guideline: ratios above ~36% signal high debt pressure (hint on the ratio result); gross income before taxes and deductions; include minimum payments on cards and loans; mistakes (using net income; forgetting minimum payments); FAQ: what is a healthy ratio; do I include living costs (no — only debt payments).
- example numbers: debt **400**, income **2,000** → ratio **20%**, remaining **1,600** JOD.

**Debt-to-income test**: example → dtiRatio == 20; remainingIncome == 1600; income 0 → validate returns `grossIncome: 'min'` (calculate throws — do not call it); missing debt → `required`.

- [x] **Step 5: Register config, math, loaders, content; write guides** (same pattern as Task 2 Steps 5-7)

`src/lib/calculators/index.ts`: `import zakat from './zakat'; import retirementSavings from './retirement'; import debtToIncome from './debt-to-income';` + registry `zakat, 'retirement-savings': retirementSavings, 'debt-to-income': debtToIncome`.
`src/lib/client/registry.ts`: `zakat: () => import('../calculators/zakat.ts'), 'retirement-savings': () => import('../calculators/retirement.ts'), 'debt-to-income': () => import('../calculators/debt-to-income.ts'),`.
`src/content/calculators/index.ts`: imports + `zakat, 'retirement-savings': retirementSavings, 'debt-to-income': debtToIncome`.
Guides: `how-to-calculate-zakat` → `['zakat', 'retirement-savings', 'savings-goal']`; `how-to-plan-retirement-savings` → `['retirement-savings', 'compound-interest', 'savings-goal']`; `how-to-calculate-debt-to-income` → `['debt-to-income', 'loan-payment', 'loan-comparison']`. Worked examples use the exact numbers from each tool's content spec.

- [x] **Step 6: Verify + commit**

Run `npm test`, `npm run check`, `npm run build` — all clean. Commit:

```bash
git add src/config/calculators.ts src/lib/calculators/zakat.ts src/lib/calculators/retirement.ts src/lib/calculators/debt-to-income.ts src/lib/calculators/index.ts src/lib/client/registry.ts src/content/calculators/zakat.ts src/content/calculators/retirement-savings.ts src/content/calculators/debt-to-income.ts src/content/calculators/index.ts src/content/guides.ts tests/zakat.test.ts tests/retirement.test.ts tests/debt-to-income.test.ts
git commit -m "feat(calc): finance wave B - zakat, retirement savings, debt-to-income"
```

---

### Task 4: Health — bmi, bmr, ideal-weight, body-fat, calorie-intake

**Files:**
- Modify: `src/config/calculators.ts` (5 config entries)
- Create: `src/lib/calculators/bmi.ts`, `src/lib/calculators/bmr.ts`, `src/lib/calculators/ideal-weight.ts`, `src/lib/calculators/body-fat.ts`, `src/lib/calculators/calorie.ts`
- Modify: `src/lib/calculators/index.ts` + `src/lib/client/registry.ts` (5 entries each)
- Create: `src/content/calculators/bmi.ts`, `src/content/calculators/bmr.ts`, `src/content/calculators/ideal-weight.ts`, `src/content/calculators/body-fat.ts`, `src/content/calculators/calorie-intake.ts`
- Modify: `src/content/calculators/index.ts` + `src/content/guides.ts`
- Create: `tests/bmi.test.ts`, `tests/bmr.test.ts`, `tests/ideal-weight.test.ts`, `tests/body-fat.test.ts`, `tests/calorie.test.ts`

**Guide slugs:** `how-to-understand-bmi`, `how-to-calculate-bmr-and-tdee`, `healthy-weight-range-explained`, `how-to-estimate-body-fat`, `how-to-set-a-calorie-target`.

**Non-currency tools:** none of these have a currency field — omit it. `buildCalcPayload` falls back to `JOD` and the client hides the currency selector (already null-safe).

- [x] **Step 1: Add 5 config entries (health, `active: true`)**

```ts
  {
    id: 'bmi',
    slug: 'bmi',
    category: 'health',
    title: { ar: 'حاسبة مؤشر كتلة الجسم', en: 'BMI calculator' },
    description: {
      ar: 'احسب مؤشر كتلة الجسم من وزنك وطولك، واعرف نطاق الوزن الصحي لطولك.',
      en: 'Calculate your body mass index from weight and height, and see the healthy weight range for your height.',
    },
    related: ['ideal-weight', 'bmr'],
    guide: 'how-to-understand-bmi',
    active: true,
  },
  {
    id: 'bmr',
    slug: 'bmr',
    category: 'health',
    title: { ar: 'حاسبة معدل الأيض الأساسي', en: 'BMR calculator' },
    description: {
      ar: 'احسب معدل الأيض الأساسي وإجمالي ما يحرقه جسمك يومياً وفق معادلة ميفلين-سانت جيور.',
      en: 'Estimate your basal metabolic rate and daily energy expenditure using the Mifflin-St Jeor equation.',
    },
    related: ['calorie-intake', 'bmi'],
    guide: 'how-to-calculate-bmr-and-tdee',
    active: true,
  },
  {
    id: 'ideal-weight',
    slug: 'ideal-weight',
    category: 'health',
    title: { ar: 'حاسبة الوزن المثالي', en: 'Ideal weight calculator' },
    description: {
      ar: 'اعرف نطاق الوزن الصحي لطولك بناءً على مؤشر كتلة الجسم من 18.5 إلى 24.9.',
      en: 'Find the healthy weight range for your height based on a BMI of 18.5 to 24.9.',
    },
    related: ['bmi', 'body-fat'],
    guide: 'healthy-weight-range-explained',
    active: true,
  },
  {
    id: 'body-fat',
    slug: 'body-fat',
    category: 'health',
    title: { ar: 'حاسبة نسبة الدهون في الجسم', en: 'Body fat calculator' },
    description: {
      ar: 'قدّر نسبة الدهون في جسمك بطريقة القياسات البحرية الأمريكية (US Navy).',
      en: 'Estimate your body fat percentage with the US Navy method.',
    },
    related: ['bmi', 'ideal-weight'],
    guide: 'how-to-estimate-body-fat',
    active: true,
  },
  {
    id: 'calorie-intake',
    slug: 'calorie-intake',
    category: 'health',
    title: { ar: 'حاسبة السعرات اليومية', en: 'Calorie intake calculator' },
    description: {
      ar: 'احسب هدفك اليومي من السعرات لفقدان الوزن أو ثباته أو زيادته حسب نشاطك وهدفك.',
      en: 'Estimate your daily calorie target for losing, maintaining or gaining weight based on your activity and goal.',
    },
    related: ['bmr', 'bmi'],
    guide: 'how-to-set-a-calorie-target',
    active: true,
  },
```

- [x] **Step 2: Create `src/lib/calculators/bmi.ts`**

```ts
import type { CalcInput, CalcOutput, CalculatorMath } from './types';
import { err, numeric, checkNumber } from './utils';

const LB_TO_KG = 0.45359237;

export const bmi: CalculatorMath = {
  slug: 'bmi',
  fields: [
    { id: 'weight', type: 'number', required: true, min: 1, max: 1000, step: 'any' },
    { id: 'weightUnit', type: 'radio', defaultValue: 'kg', options: [
      { value: 'kg', label: 'kg' },
      { value: 'lb', label: 'lb' },
    ] },
    { id: 'height', type: 'number', required: true, min: 50, max: 300, step: 'any' },
    { id: 'heightUnit', type: 'radio', defaultValue: 'cm', options: [
      { value: 'cm', label: 'cm' },
      { value: 'm', label: 'm' },
    ] },
  ],
  example: { weight: '75', weightUnit: 'kg', height: '175', heightUnit: 'cm' },

  validate(input: CalcInput): Record<string, string> {
    const errors: Record<string, string> = {};
    const w = checkNumber(input.weight, 1, 1000);
    if (w) errors.weight = w;
    const h = checkNumber(input.height, 50, 300);
    if (h) errors.height = h;
    return errors;
  },

  calculate(input: CalcInput): CalcOutput {
    const rawWeight = numeric(input, 'weight');
    const rawHeight = numeric(input, 'height');
    const kg = input.weightUnit === 'lb' ? rawWeight * LB_TO_KG : rawWeight;
    const m = input.heightUnit === 'm' ? rawHeight : rawHeight / 100;
    const bmiValue = kg / (m * m);
    return {
      results: [
        { key: 'bmi', value: bmiValue, kind: 'number', hero: true },
        { key: 'healthyLow', value: 18.5 * m * m, kind: 'number' },
        { key: 'healthyHigh', value: 24.9 * m * m, kind: 'number' },
      ],
    };
  },
};

export default bmi;
```

**BMI content spec**: title/h1 ar `حاسبة مؤشر كتلة الجسم` / en `BMI calculator`. metaDescription: ar `احسب مؤشر كتلة الجسم من وزنك وطولك بالكيلوغرام والسنتمتر أو بالباوند والمتر، واعرف نطاق الوزن الصحي.` / en `Calculate your body mass index from weight and height in kg/cm or lb/m, and see your healthy weight range.`
- fields: `weight` ar `الوزن` / en `Weight`; `weightUnit` ar `وحدة الوزن` / en `Weight unit` (options labeled `كغ`/`باوند` and `kg`/`lb`); `height` ar `الطول` / en `Height`; `heightUnit` ar `وحدة الطول` / en `Height unit` (options labeled `سم`/`متر` and `cm`/`m`)
- results: `bmi` ar `مؤشر كتلة الجسم` / en `Body mass index` (hero); `healthyLow` ar `الحد الأدنى للوزن الصحي` / en `Healthy weight low`; `healthyHigh` ar `الحد الأعلى للوزن الصحي` / en `Healthy weight high`
- no currency. Prose topics: BMI is a screening index, not a diagnosis; healthy range 18.5-24.9; caution for athletes (muscle mass) and different populations; mistakes (using stone; using height in cm as metres; mixing kg with lb inputs); FAQ: is BMI accurate for everyone; what does the healthy weight range mean.
- example numbers: weight **75 kg**, height **175 cm** → BMI **≈ 24.5**, healthy range **56.7 – 76.3 kg**.

**BMI test**: example → bmi within `24.4..24.6`; healthyLow within `56.6..56.8`; healthyHigh within `76.2..76.4`; lb conversion: 165 lb → kg = 74.84; m height: 1.75 → m.

- [x] **Step 3: Create `src/lib/calculators/bmr.ts`**

```ts
import type { CalcInput, CalcOutput, CalculatorMath } from './types';
import { err, numeric, checkNumber } from './utils';

const LB_TO_KG = 0.45359237;
const ACTIVITY_FACTORS: Record<string, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  'very-active': 1.9,
};

export const bmr: CalculatorMath = {
  slug: 'bmr',
  fields: [
    { id: 'sex', type: 'radio', defaultValue: 'male', options: [
      { value: 'male', label: 'male' },
      { value: 'female', label: 'female' },
    ] },
    { id: 'age', type: 'number', required: true, min: 1, max: 120, step: 'any' },
    { id: 'weight', type: 'number', required: true, min: 1, max: 1000, step: 'any' },
    { id: 'weightUnit', type: 'radio', defaultValue: 'kg', options: [
      { value: 'kg', label: 'kg' },
      { value: 'lb', label: 'lb' },
    ] },
    { id: 'height', type: 'number', required: true, min: 50, max: 300, step: 'any' },
    { id: 'heightUnit', type: 'radio', defaultValue: 'cm', options: [
      { value: 'cm', label: 'cm' },
      { value: 'm', label: 'm' },
    ] },
    { id: 'activity', type: 'select', defaultValue: 'moderate', options: [
      { value: 'sedentary', label: 'sedentary' },
      { value: 'light', label: 'light' },
      { value: 'moderate', label: 'moderate' },
      { value: 'active', label: 'active' },
      { value: 'very-active', label: 'very-active' },
    ] },
  ],
  example: { sex: 'male', age: '30', weight: '80', weightUnit: 'kg', height: '180', heightUnit: 'cm', activity: 'moderate' },

  validate(input: CalcInput): Record<string, string> {
    const errors: Record<string, string> = {};
    const ageErr = checkNumber(input.age, 1, 120);
    if (ageErr) errors.age = ageErr;
    const w = checkNumber(input.weight, 1, 1000);
    if (w) errors.weight = w;
    const h = checkNumber(input.height, 50, 300);
    if (h) errors.height = h;
    return errors;
  },

  calculate(input: CalcInput): CalcOutput {
    const age = numeric(input, 'age');
    const rawWeight = numeric(input, 'weight');
    const rawHeight = numeric(input, 'height');
    const kg = input.weightUnit === 'lb' ? rawWeight * LB_TO_KG : rawWeight;
    const cm = input.heightUnit === 'm' ? rawHeight * 100 : rawHeight;
    const sex = input.sex === 'female' ? 'female' : 'male';
    const bmrValue = 10 * kg + 6.25 * cm - 5 * age + (sex === 'male' ? 5 : -161);
    const factor = ACTIVITY_FACTORS[input.activity ?? 'moderate'] ?? 1.55;
    return {
      results: [
        { key: 'bmr', value: bmrValue, kind: 'number', hero: true },
        { key: 'tdee', value: bmrValue * factor, kind: 'number' },
      ],
    };
  },
};

export default bmr;
```

**BMR content spec**: title/h1 ar `حاسبة معدل الأيض الأساسي` / en `BMR calculator`. metaDescription: ar `احسب معدل الأيض الأساسي (BMR) وإجمالي إنفاق الطاقة اليومي (TDEE) وفق معادلة ميفلين-سانت جيور ومستوى نشاطك.` / en `Estimate your basal metabolic rate (BMR) and total daily energy expenditure (TDEE) using the Mifflin-St Jeor equation and your activity level.`
- fields: `sex` ar `الجنس` / en `Sex` (male ذكر / female أنثى); `age` ar `العمر` / en `Age`; `weight` ar `الوزن` / en `Weight`; `weightUnit` ar `وحدة الوزن` / en `Weight unit`; `height` ar `الطول` / en `Height`; `heightUnit` ar `وحدة الطول` / en `Height unit`; `activity` ar `مستوى النشاط` / en `Activity level` (sedentary خامل / light نشاط خفيف / moderate نشاط متوسط / active نشيط / very-active نشاط عالٍ جداً)
- results: `bmr` ar `معدل الأيض الأساسي (سعرة/يوم)` / en `BMR (calories/day)` (hero); `tdee` ar `إجمالي إنفاق الطاقة اليومي (سعرة/يوم)` / en `TDEE (calories/day)`
- no currency. Prose topics: Mifflin-St Jeor equation; what BMR means (energy at rest); TDEE = BMR × activity factor; the activity factors (1.2/1.375/1.55/1.725/1.9); estimates not medical advice; mistakes (using lb in a kg-position without converting — the tool converts; choosing an unrealistic activity level); FAQ: what's the difference between BMR and TDEE; why does the tool ask for sex.
- example numbers: male, **30**, **80 kg**, **180 cm**, moderate → BMR **≈ 1,780** kcal/day, TDEE **≈ 2,759** kcal/day.

**BMR test**: example → bmr within `1775..1785`; tdee = bmr × 1.55; female variant: same inputs, female → bmr = male − 166; lb conversion path.

- [x] **Step 4: Create `src/lib/calculators/ideal-weight.ts`**

```ts
import type { CalcInput, CalcOutput, CalculatorMath } from './types';
import { err, numeric, checkNumber } from './utils';

export const idealWeight: CalculatorMath = {
  slug: 'ideal-weight',
  fields: [
    { id: 'height', type: 'number', required: true, min: 50, max: 300, step: 'any' },
    { id: 'heightUnit', type: 'radio', defaultValue: 'cm', options: [
      { value: 'cm', label: 'cm' },
      { value: 'm', label: 'm' },
    ] },
  ],
  example: { height: '175', heightUnit: 'cm' },

  validate(input: CalcInput): Record<string, string> {
    const errors: Record<string, string> = {};
    const h = checkNumber(input.height, 50, 300);
    if (h) errors.height = h;
    return errors;
  },

  calculate(input: CalcInput): CalcOutput {
    const rawHeight = numeric(input, 'height');
    const m = input.heightUnit === 'm' ? rawHeight : rawHeight / 100;
    const low = 18.5 * m * m;
    const high = 24.9 * m * m;
    return {
      results: [
        { key: 'healthyLow', value: low, kind: 'number', hero: true },
        { key: 'healthyHigh', value: high, kind: 'number' },
        { key: 'midRange', value: (low + high) / 2, kind: 'number' },
      ],
    };
  },
};

export default idealWeight;
```

**Ideal-weight content spec**: title/h1 ar `حاسبة الوزن المثالي` / en `Ideal weight calculator`. metaDescription: ar `اعرف نطاق الوزن الصحي المناسب لطولك، المحسوب من مؤشر كتلة الجسم بين 18.5 و24.9.` / en `Find the healthy weight range for your height, derived from a body mass index between 18.5 and 24.9.`
- fields: `height` ar `الطول` / en `Height`; `heightUnit` ar `وحدة الطول` / en `Height unit`
- results: `healthyLow` ar `أدنى وزن صحي` / en `Healthy weight low` (hero); `healthyHigh` ar `أعلى وزن صحي` / en `Healthy weight high`; `midRange` ar `وزن منتصف النطاق` / en `Mid-range weight`
- no currency. Prose topics: range derived from BMI 18.5-24.9 only; "ideal" is a range not a single number; individual variation (frame size, muscle); not for children/pregnancy; mistakes (treating the range as a target to hit exactly; ignoring that BMI bands vary by population); FAQ: why a range instead of one number; is this valid for athletes.
- example numbers: height **175 cm** → range **56.7 – 76.3 kg**, mid **≈ 66.5 kg**.

**Ideal-weight test**: example → healthyLow within `56.6..56.8`; healthyHigh within `76.2..76.4`; mid within `66.4..66.6`; m input 1.75 → same as cm 175.

- [x] **Step 5: Create `src/lib/calculators/body-fat.ts`**

```ts
import type { CalcInput, CalcOutput, CalculatorMath } from './types';
import { err, numeric, checkNumber } from './utils';

export const bodyFat: CalculatorMath = {
  slug: 'body-fat',
  fields: [
    { id: 'sex', type: 'radio', defaultValue: 'male', options: [
      { value: 'male', label: 'male' },
      { value: 'female', label: 'female' },
    ] },
    { id: 'height', type: 'number', required: true, min: 50, max: 300, step: 'any' },
    { id: 'waist', type: 'number', required: true, min: 20, max: 400, step: 'any' },
    { id: 'neck', type: 'number', required: true, min: 10, max: 200, step: 'any' },
    { id: 'hip', type: 'number', required: true, min: 20, max: 400, step: 'any',
      showIf: { field: 'sex', values: ['female'] } },
  ],
  example: { sex: 'male', height: '180', waist: '90', neck: '40', hip: '0' },

  validate(input: CalcInput): Record<string, string> {
    const errors: Record<string, string> = {};
    const defs: [string, number, number][] = [
      ['height', 50, 300],
      ['waist', 20, 400],
      ['neck', 10, 200],
    ];
    for (const [id, min, max] of defs) {
      const e = checkNumber(input[id], min, max);
      if (e) errors[id] = e;
    }
    if (input.sex === 'female') {
      const e = checkNumber(input.hip, 20, 400);
      if (e) errors.hip = e;
    }
    return errors;
  },

  calculate(input: CalcInput): CalcOutput {
    const height = numeric(input, 'height');
    const waist = numeric(input, 'waist');
    const neck = numeric(input, 'neck');
    if (input.sex === 'female') {
      const hip = numeric(input, 'hip');
      const density = 1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.221 * Math.log10(height);
      return { results: [{ key: 'bodyFatPct', value: 495 / density - 450, kind: 'percent', hero: true }] };
    }
    const density = 1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height);
    return { results: [{ key: 'bodyFatPct', value: 495 / density - 450, kind: 'percent', hero: true }] };
  },
};

export default bodyFat;
```

**Body-fat content spec**: title/h1 ar `حاسبة نسبة الدهون في الجسم` / en `Body fat calculator`. metaDescription: ar `قدّر نسبة الدهون في جسمك بطريقة القياسات البحرية الأمريكية باستخدام الطول ومحيط الخصر والرقبة (والورك للإناث).` / en `Estimate your body fat percentage with the US Navy method using height, waist and neck (plus hip for women).`
- fields: `sex` ar `الجنس` / en `Sex`; `height` ar `الطول (سم)` / en `Height (cm)`; `waist` ar `محيط الخصر (سم)` / en `Waist (cm)`; `neck` ar `محيط الرقبة (سم)` / en `Neck (cm)`; `hip` ar `محيط الورك (سم)` / en `Hip (cm)` (shown only when sex=female)
- results: `bodyFatPct` ar `نسبة الدهون في الجسم` / en `Body fat percentage` (hero, percent)
- no currency. Prose topics: US Navy circumference method; gender difference in formula; estimates vary with measurement technique (measure relaxed, tape level, not pulled tight — cover in hints); band interpretation (essential/athletic/fitness/average/obese ranges) goes in content result hint and guide; mistakes (measuring over clothing; using inches as cm); FAQ: how accurate is the Navy method; why hip only for women.
- example numbers: male, **180 cm**, waist **90 cm**, neck **40 cm** → **≈ 18.4%**.

**Body-fat test**: example (male) → bodyFatPct within `18.2..18.6`; female example: 165 cm, waist 70, neck 32, hip 95 → compute expected from formula (assert within `0.5` of the implementation's value derived independently in the test); missing neck → `required`; female without hip → validate returns `hip: 'required'`.

- [x] **Step 6: Create `src/lib/calculators/calorie.ts`**

```ts
import type { CalcInput, CalcOutput, CalculatorMath } from './types';
import { err, numeric, checkNumber } from './utils';

const LB_TO_KG = 0.45359237;
const ACTIVITY_FACTORS: Record<string, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  'very-active': 1.9,
};
const RATE_DELTA: Record<string, number> = {
  slow: 250,
  moderate: 500,
  aggressive: 750,
};

export const calorieIntake: CalculatorMath = {
  slug: 'calorie-intake',
  fields: [
    { id: 'sex', type: 'radio', defaultValue: 'male', options: [
      { value: 'male', label: 'male' },
      { value: 'female', label: 'female' },
    ] },
    { id: 'age', type: 'number', required: true, min: 1, max: 120, step: 'any' },
    { id: 'weight', type: 'number', required: true, min: 1, max: 1000, step: 'any' },
    { id: 'weightUnit', type: 'radio', defaultValue: 'kg', options: [
      { value: 'kg', label: 'kg' },
      { value: 'lb', label: 'lb' },
    ] },
    { id: 'height', type: 'number', required: true, min: 50, max: 300, step: 'any' },
    { id: 'heightUnit', type: 'radio', defaultValue: 'cm', options: [
      { value: 'cm', label: 'cm' },
      { value: 'm', label: 'm' },
    ] },
    { id: 'activity', type: 'select', defaultValue: 'moderate', options: [
      { value: 'sedentary', label: 'sedentary' },
      { value: 'light', label: 'light' },
      { value: 'moderate', label: 'moderate' },
      { value: 'active', label: 'active' },
      { value: 'very-active', label: 'very-active' },
    ] },
    { id: 'goal', type: 'radio', defaultValue: 'maintain', options: [
      { value: 'lose', label: 'lose' },
      { value: 'maintain', label: 'maintain' },
      { value: 'gain', label: 'gain' },
    ] },
    { id: 'rate', type: 'select', defaultValue: 'moderate', options: [
      { value: 'slow', label: 'slow' },
      { value: 'moderate', label: 'moderate' },
      { value: 'aggressive', label: 'aggressive' },
    ] },
  ],
  example: { sex: 'female', age: '25', weight: '60', weightUnit: 'kg', height: '165', heightUnit: 'cm', activity: 'moderate', goal: 'lose', rate: 'moderate' },

  validate(input: CalcInput): Record<string, string> {
    const errors: Record<string, string> = {};
    const ageErr = checkNumber(input.age, 1, 120);
    if (ageErr) errors.age = ageErr;
    const w = checkNumber(input.weight, 1, 1000);
    if (w) errors.weight = w;
    const h = checkNumber(input.height, 50, 300);
    if (h) errors.height = h;
    return errors;
  },

  calculate(input: CalcInput): CalcOutput {
    const age = numeric(input, 'age');
    const rawWeight = numeric(input, 'weight');
    const rawHeight = numeric(input, 'height');
    const kg = input.weightUnit === 'lb' ? rawWeight * LB_TO_KG : rawWeight;
    const cm = input.heightUnit === 'm' ? rawHeight * 100 : rawHeight;
    const sex = input.sex === 'female' ? 'female' : 'male';
    const bmrValue = 10 * kg + 6.25 * cm - 5 * age + (sex === 'male' ? 5 : -161);
    const factor = ACTIVITY_FACTORS[input.activity ?? 'moderate'] ?? 1.55;
    const tdee = bmrValue * factor;
    const goal = input.goal === 'lose' || input.goal === 'gain' ? input.goal : 'maintain';
    const delta = goal === 'maintain' ? 0 : RATE_DELTA[input.rate ?? 'moderate'] ?? 500;
    const target = goal === 'gain' ? tdee + delta : tdee - delta;
    return {
      results: [
        { key: 'targetCalories', value: Math.max(target, 0), kind: 'number', hero: true },
        { key: 'bmr', value: bmrValue, kind: 'number' },
        { key: 'tdee', value: tdee, kind: 'number' },
      ],
    };
  },
};

export default calorieIntake;
```

**Calorie-intake content spec**: title/h1 ar `حاسبة السعرات اليومية` / en `Calorie intake calculator`. metaDescription: ar `احسب هدفك اليومي من السعرات حسب هدفك (خسارة أو ثبات أو زيادة) ومستوى نشاطك، بناءً على معدل الأيض الأساسي.` / en `Estimate your daily calorie target for losing, maintaining or gaining weight, based on your BMR and activity level.`
- fields: `sex` ar `الجنس` / en `Sex`; `age` ar `العمر` / en `Age`; `weight` ar `الوزن` / en `Weight`; `weightUnit` ar `وحدة الوزن` / en `Weight unit`; `height` ar `الطول` / en `Height`; `heightUnit` ar `وحدة الطول` / en `Height unit`; `activity` ar `مستوى النشاط` / en `Activity level`; `goal` ar `الهدف` / en `Goal` (lose خسارة / maintain ثبات / gain زيادة); `rate` ar `السرعة` / en `Pace` (slow بطيء −250 / moderate متوسط −500 / aggressive سريع −750, and the same amounts added for gain)
- results: `targetCalories` ar `هدف السعرات اليومي` / en `Daily calorie target` (hero); `bmr` ar `معدل الأيض الأساسي` / en `BMR`; `tdee` ar `إجمالي إنفاق الطاقة اليومي` / en `TDEE`
- no currency. Prose topics: target = TDEE + goal adjustment; adjustments of ±250/500/750 kcal ≈ 0.25/0.5/0.75 kg per week; floor at 0; not medical advice (especially aggressive deficits — content should caution not to go below ~1200 kcal/day without supervision — put in assumptions/mistakes); FAQ: how fast is safe; can I use this while pregnant (no — see disclaimer); what if I exercise.
- example numbers: female, **25**, **60 kg**, **165 cm**, moderate, goal lose, pace moderate → BMR **≈ 1,345** kcal/day, TDEE **≈ 2,085** kcal/day, target **≈ 1,585** kcal/day.

**Calorie test**: example → targetCalories within `1580..1590`; bmr within `1340..1350`; tdee = bmr × 1.55; maintain goal → target == tdee; lose aggressive → tdee − 750; gain slow → tdee + 250.

- [x] **Step 7: Register config, math, loaders, content; write guides**

`src/lib/calculators/index.ts`: imports + `bmi, bmr, 'ideal-weight': idealWeight, 'body-fat': bodyFat, 'calorie-intake': calorieIntake`.
`src/lib/client/registry.ts`: `bmi: () => import('../calculators/bmi.ts'), bmr: () => import('../calculators/bmr.ts'), 'ideal-weight': () => import('../calculators/ideal-weight.ts'), 'body-fat': () => import('../calculators/body-fat.ts'), 'calorie-intake': () => import('../calculators/calorie.ts'),`.
`src/content/calculators/index.ts`: imports + `bmi, bmr, 'ideal-weight': idealWeight, 'body-fat': bodyFat, 'calorie-intake': calorieIntake`.
Guides (`relatedCalculators`): `how-to-understand-bmi` → `['bmi', 'ideal-weight', 'bmr']`; `how-to-calculate-bmr-and-tdee` → `['bmr', 'calorie-intake', 'bmi']`; `healthy-weight-range-explained` → `['ideal-weight', 'bmi', 'body-fat']`; `how-to-estimate-body-fat` → `['body-fat', 'bmi', 'ideal-weight']`; `how-to-set-a-calorie-target` → `['calorie-intake', 'bmr', 'bmi']`. Worked examples use the exact numbers from each tool's content spec.

- [x] **Step 8: Verify + commit**

Run `npm test`, `npm run check`, `npm run build` — all clean. The finance category page must now show 11 finance tools; health shows 5; the index lists 6 sections. Commit:

```bash
git add src/config/calculators.ts src/lib/calculators/bmi.ts src/lib/calculators/bmr.ts src/lib/calculators/ideal-weight.ts src/lib/calculators/body-fat.ts src/lib/calculators/calorie.ts src/lib/calculators/index.ts src/lib/client/registry.ts src/content/calculators/bmi.ts src/content/calculators/bmr.ts src/content/calculators/ideal-weight.ts src/content/calculators/body-fat.ts src/content/calculators/calorie-intake.ts src/content/calculators/index.ts src/content/guides.ts tests/bmi.test.ts tests/bmr.test.ts tests/ideal-weight.test.ts tests/body-fat.test.ts tests/calorie.test.ts
git commit -m "feat(calc): health calculators - BMI, BMR, ideal weight, body fat, calorie intake"
```

---

### Task 5: Education — gpa, grade-average, final-grade-planner

**Architecture constraint discovered during planning:** `calculatorApp.ts` has no repeated-row/dynamic-list support — the client reads exactly one `input`/`select` per `[data-field]` (calculatorApp.ts:96-125). Adding dynamic course rows would require client + shell changes inside the DOM-coupling contract (AGENTS.md warns against this). **Design decision: the education tools use a fixed number of course slots** (6), with empty slots skipped — zero client changes, same validation contract.

**Files:**
- Modify: `src/config/calculators.ts` (3 config entries)
- Create: `src/lib/calculators/gpa.ts`, `src/lib/calculators/grade-average.ts`, `src/lib/calculators/final-grade.ts`
- Modify: `src/lib/calculators/index.ts` + `src/lib/client/registry.ts` (3 entries each)
- Create: `src/content/calculators/gpa.ts`, `src/content/calculators/grade-average.ts`, `src/content/calculators/final-grade-planner.ts`
- Modify: `src/content/calculators/index.ts` + `src/content/guides.ts`
- Create: `tests/gpa.test.ts`, `tests/grade-average.test.ts`, `tests/final-grade.test.ts`

**Guide slugs:** `how-to-calculate-gpa`, `how-to-calculate-grade-average`, `how-to-plan-your-final-grade`.

No currency fields on any of these tools.

- [ ] **Step 1: Add 3 config entries (education, `active: true`)**

```ts
  {
    id: 'gpa',
    slug: 'gpa',
    category: 'education',
    title: { ar: 'حاسبة المعدل التراكمي', en: 'GPA calculator' },
    description: {
      ar: 'احسب معدلك التراكمي GPA على سلم 4 أو 5 نقاط من درجاتك وساعاتك الدراسية.',
      en: 'Calculate your GPA on the 4.0 or 5.0 scale from your grades and course credits.',
    },
    related: ['grade-average', 'final-grade-planner'],
    guide: 'how-to-calculate-gpa',
    active: true,
  },
  {
    id: 'grade-average',
    slug: 'grade-average',
    category: 'education',
    title: { ar: 'حاسبة متوسط الدرجات', en: 'Grade average calculator' },
    description: {
      ar: 'احسب متوسط درجاتك من مئة، مع أعلى وأدنى درجة، لتتبع أداءك الأكاديمي.',
      en: 'Average your percentage grades, with the highest and lowest, to track academic performance.',
    },
    related: ['gpa', 'final-grade-planner'],
    guide: 'how-to-calculate-grade-average',
    active: true,
  },
  {
    id: 'final-grade-planner',
    slug: 'final-grade-planner',
    category: 'education',
    title: { ar: 'حاسبة درجة النجاح النهائية', en: 'Final grade planner' },
    description: {
      ar: 'اعرف الدرجة التي تحتاجها في الامتحان النهائي للوصول إلى المعدل الذي تريده.',
      en: 'Find the score you need on the final exam to reach your target overall grade.',
    },
    related: ['grade-average', 'gpa'],
    guide: 'how-to-plan-your-final-grade',
    active: true,
  },
```

- [ ] **Step 2: Create `src/lib/calculators/gpa.ts`**

Six course slots. Each slot = `grade<i>` select + `credits<i>` number. All fields optional; at least one complete slot is required. `validate` returns errors against the offending slot's field ids.

```ts
import type { CalcInput, CalcOutput, CalculatorMath, CalcFieldDef } from './types';
import { err, numeric, checkNumber } from './utils';

const SCALE_4: Record<string, number> = {
  'A+': 4.0, A: 4.0, 'A-': 3.7, 'B+': 3.3, B: 3.0, 'B-': 2.7,
  'C+': 2.3, C: 2.0, 'C-': 1.7, 'D+': 1.3, D: 1.0, 'D-': 0.7, F: 0.0,
};
const SCALE_5: Record<string, number> = {
  'A+': 5.0, A: 5.0, 'A-': 4.7, 'B+': 4.3, B: 4.0, 'B-': 3.7,
  'C+': 3.3, C: 3.0, 'C-': 2.7, 'D+': 2.3, D: 2.0, 'D-': 1.7, F: 0.0,
};

const SLOTS = 6;
const GRADE_OPTIONS = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F'];
const gradeOptions = GRADE_OPTIONS.map((value) => ({ value, label: value }));

const fields: CalcFieldDef[] = [
  { id: 'scale', type: 'select', defaultValue: '4', options: [
    { value: '4', label: '4' },
    { value: '5', label: '5' },
  ] },
];
for (let i = 0; i < SLOTS; i++) {
  fields.push({ id: `grade${i}`, type: 'select', options: gradeOptions });
  fields.push({ id: `credits${i}`, type: 'number', min: 0.5, max: 20, step: 'any' });
}

export const gpa: CalculatorMath = {
  slug: 'gpa',
  fields,
  example: {
    scale: '4',
    grade0: 'A', credits0: '3',
    grade1: 'B', credits1: '4',
    grade2: 'A-', credits2: '3',
    grade3: 'C', credits3: '2',
  },

  validate(input: CalcInput): Record<string, string> {
    const errors: Record<string, string> = {};
    let anyRow = false;
    for (let i = 0; i < SLOTS; i++) {
      const grade = input[`grade${i}`];
      const credits = input[`credits${i}`];
      if ((grade ?? '') === '' && (credits ?? '') === '') continue;
      anyRow = true;
      if ((grade ?? '') === '') errors[`grade${i}`] = 'required';
      if ((credits ?? '') === '') {
        errors[`credits${i}`] = 'required';
      } else {
        const e = checkNumber(credits, 0.5, 20);
        if (e) errors[`credits${i}`] = e;
      }
    }
    if (!anyRow) errors.grade0 = 'required';
    return errors;
  },

  calculate(input: CalcInput): CalcOutput {
    const scale = input.scale === '5' ? SCALE_5 : SCALE_4;
    let totalPoints = 0;
    let totalCredits = 0;
    for (let i = 0; i < SLOTS; i++) {
      const grade = input[`grade${i}`];
      const credits = numeric(input, `credits${i}`);
      if (grade && credits > 0) {
        totalPoints += (scale[grade] ?? 0) * credits;
        totalCredits += credits;
      }
    }
    const gpaValue = totalCredits > 0 ? totalPoints / totalCredits : 0;
    return {
      results: [
        { key: 'gpa', value: gpaValue, kind: 'number', hero: true },
        { key: 'totalCredits', value: totalCredits, kind: 'number' },
        { key: 'totalPoints', value: totalPoints, kind: 'number' },
      ],
    };
  },
};

export default gpa;
```

**GPA content spec**: title/h1 ar `حاسبة المعدل التراكمي` / en `GPA calculator`. metaDescription: ar `احسب معدلك التراكمي على سلم 4 أو 5 نقاط من درجاتك وساعاتك المعتمدة، مع إمكانية ترك الصفوف الفارغة.` / en `Calculate your GPA on the 4.0 or 5.0 scale from your letter grades and credit hours, leaving empty rows out.`
- fields: `scale` ar `سلم التقدير` / en `Grading scale` (4/5); per slot: `grade<i>` ar `درجة المادة` / en `Grade`; `credits<i>` ar `الساعات المعتمدة` / en `Credit hours` — `fields.grade0.hint` ar `أدخل درجاتك وساعاتك؛ يمكنك ترك الصفوف الفارغة.` / en `Enter your grades and credits; empty rows are ignored.`
- results: `gpa` ar `المعدل التراكمي` / en `GPA` (hero); `totalCredits` ar `إجمالي الساعات` / en `Total credits`; `totalPoints` ar `إجمالي النقاط` / en `Total points`
- no currency. Prose topics: how points map on the 4 vs 5 scale; weighted by credits; empty rows ignored; A+ == A on the 4.0 scale (map above); scale choice must match your university; mistakes (mixing scales; entering percentage instead of letter; including withdrawn courses); FAQ: why is A+ worth the same as A; my university uses a 100-point system (use grade-average); does GPA include pass/fail.
- example numbers: scale **4**, courses A(3), B(4), A-(3), C(2) → GPA **≈ 3.26**, credits **12**, points **39.1**.

**GPA test**: example → gpa within `3.25..3.27`; totalCredits == 12; totalPoints within `39.09..39.11`; scale 5 → A == 5.0; all-empty → validate returns `{ grade0: 'required' }`; credits beyond 20 → `max`; grade without credits → `credits<i>: 'required'`.

- [ ] **Step 3: Create `src/lib/calculators/grade-average.ts`**

Six grade slots, each a number 0-100, all optional, at least one required.

```ts
import type { CalcInput, CalcOutput, CalculatorMath, CalcFieldDef } from './types';
import { err, numeric, checkNumber } from './utils';

const SLOTS = 6;

const fields: CalcFieldDef[] = [];
for (let i = 0; i < SLOTS; i++) {
  fields.push({ id: `grade${i}`, type: 'number', min: 0, max: 100, step: 'any' });
}

export const gradeAverage: CalculatorMath = {
  slug: 'grade-average',
  fields,
  example: { grade0: '85', grade1: '92', grade2: '78', grade3: '88' },

  validate(input: CalcInput): Record<string, string> {
    const errors: Record<string, string> = {};
    let any = false;
    for (let i = 0; i < SLOTS; i++) {
      const raw = input[`grade${i}`];
      if (raw === undefined || raw === '') continue;
      any = true;
      const e = checkNumber(raw, 0, 100);
      if (e) errors[`grade${i}`] = e;
    }
    if (!any) errors.grade0 = 'required';
    return errors;
  },

  calculate(input: CalcInput): CalcOutput {
    const values: number[] = [];
    for (let i = 0; i < SLOTS; i++) {
      const raw = input[`grade${i}`];
      if (raw === undefined || raw === '') continue;
      values.push(numeric(input, `grade${i}`));
    }
    const sum = values.reduce((a, b) => a + b, 0);
    const average = values.length > 0 ? sum / values.length : 0;
    return {
      results: [
        { key: 'average', value: average, kind: 'number', hero: true },
        { key: 'count', value: values.length, kind: 'number' },
        { key: 'highest', value: values.length ? Math.max(...values) : 0, kind: 'number' },
        { key: 'lowest', value: values.length ? Math.min(...values) : 0, kind: 'number' },
      ],
    };
  },
};

export default gradeAverage;
```

**Grade-average content spec**: title/h1 ar `حاسبة متوسط الدرجات` / en `Grade average calculator`. metaDescription: ar `احسب متوسط درجاتك من مئة وأعلى وأدنى درجة من دون الحاجة لملء كل الخانات.` / en `Average your grades out of 100, with the highest and lowest, without filling every field.`
- fields: `grade<i>` ar `درجة` / en `Grade`; `fields.grade0.hint` ar `أدخل الدرجات من 0 إلى 100؛ اترك الخانات الفارغة.` / en `Enter grades from 0 to 100; leave empty fields out.`
- results: `average` ar `متوسط الدرجات` / en `Average` (hero); `count` ar `عدد الدرجات` / en `Grades counted`; `highest` ar `أعلى درجة` / en `Highest`; `lowest` ar `أدنى درجة` / en `Lowest`
- no currency. Prose topics: simple arithmetic mean; unweighted — for weighted/credit-based use the GPA calculator; the average uses only filled fields; mistakes (including a grade on a different scale, e.g. out of 50); FAQ: does this account for credit hours (no — use GPA); can I average percentages across different max scores (no).
- example numbers: **85, 92, 78, 88** → average **85.75**, count **4**, highest **92**, lowest **78**.

**Grade-average test**: example → average == 85.75, count == 4, highest == 92, lowest == 78; one grade only → average == that grade; all empty → `{ grade0: 'required' }`; 101 → `max`; -1 → `min`.

- [ ] **Step 4: Create `src/lib/calculators/final-grade.ts`**

```ts
import type { CalcInput, CalcOutput, CalculatorMath } from './types';
import { err, numeric, checkNumber } from './utils';

export const finalGradePlanner: CalculatorMath = {
  slug: 'final-grade-planner',
  fields: [
    { id: 'currentGrade', type: 'number', required: true, min: 0, max: 100, step: 'any' },
    { id: 'finalWeight', type: 'number', required: true, min: 1, max: 100, step: 'any' },
    { id: 'targetGrade', type: 'number', required: true, min: 0, max: 100, step: 'any' },
  ],
  example: { currentGrade: '80', finalWeight: '30', targetGrade: '85' },

  validate(input: CalcInput): Record<string, string> {
    const errors: Record<string, string> = {};
    const defs: [string, number, number][] = [
      ['currentGrade', 0, 100],
      ['finalWeight', 1, 100],
      ['targetGrade', 0, 100],
    ];
    for (const [id, min, max] of defs) {
      const e = checkNumber(input[id], min, max);
      if (e) errors[id] = e;
    }
    return errors;
  },

  calculate(input: CalcInput): CalcOutput {
    const current = numeric(input, 'currentGrade');
    const w = numeric(input, 'finalWeight') / 100;
    const target = numeric(input, 'targetGrade');
    const currentContribution = current * (1 - w);
    const maxAchievable = currentContribution + 100 * w;
    const needed = (target - currentContribution) / w;
    const requiredFinal = Math.min(100, Math.max(0, needed));
    return {
      results: [
        { key: 'requiredFinal', value: requiredFinal, kind: 'number', hero: true },
        { key: 'currentContribution', value: currentContribution, kind: 'number' },
        { key: 'maxAchievable', value: maxAchievable, kind: 'number' },
      ],
    };
  },
};

export default finalGradePlanner;
```

**Final-grade content spec**: title/h1 ar `حاسبة درجة النجاح النهائية` / en `Final grade planner`. metaDescription: ar `احسب الدرجة التي تحتاجها في الامتحان النهائي لتحقيق معدل معين، إذا عرفت وزن النهائي ومعدلك الحالي.` / en `Calculate the score you need on the final exam to hit a target grade, given the final's weight and your current grade.`
- fields: `currentGrade` ar `معدلك الحالي (من 100)` / en `Current grade (out of 100)`; `finalWeight` ar `وزن الامتحان النهائي (%)` / en `Final exam weight (%)`; `targetGrade` ar `الدرجة المستهدفة (من 100)` / en `Target grade (out of 100)`
- results: `requiredFinal` ar `الدرجة المطلوبة في النهائي` / en `Score needed on the final` (hero); `currentContribution` ar `مساهمة معدلك الحالي` / en `Current contribution`; `maxAchievable` ar `أعلى درجة يمكن تحقيقها` / en `Maximum achievable grade`
- `requiredFinal.hint` ar `قيمة 0 تعني أن هدفك محقق أصلاً، و100 تعني أنك تحتاج الدرجة الكاملة (قد يكون الهدف غير ممكن).` / en `A value of 0 means your target is already secured; 100 means you need a perfect score (the target may be unreachable).`
- no currency. Prose topics: the weighted-average formula; how the weight affects the result; clamping rules; mistakes (entering weight as a fraction like 0.3; ignoring the final's weight); FAQ: what if the needed score is over 100; my final is worth more than 100%.
- example numbers: current **80**, weight **30%**, target **85** → needed **96.67** (hero), current contribution **56**, max achievable **86**.

**Final-grade test**: example → requiredFinal within `96.6..96.7`; currentContribution == 56; maxAchievable == 86; weight 100 → requiredFinal == target; unreachable target (target 100, weight 10, current 50) → requiredFinal == 100 (clamped); already achieved (target 60, weight 30, current 70) → requiredFinal == 0; missing finalWeight → `required`.

- [ ] **Step 5: Register config, math, loaders, content; write guides**

`src/lib/calculators/index.ts`: imports + `gpa, 'grade-average': gradeAverage, 'final-grade-planner': finalGradePlanner`.
`src/lib/client/registry.ts`: `gpa: () => import('../calculators/gpa.ts'), 'grade-average': () => import('../calculators/grade-average.ts'), 'final-grade-planner': () => import('../calculators/final-grade.ts'),`.
`src/content/calculators/index.ts`: imports + `gpa, 'grade-average': gradeAverage, 'final-grade-planner': finalGradePlanner`.
Guides: `how-to-calculate-gpa` → `['gpa', 'grade-average', 'final-grade-planner']`; `how-to-calculate-grade-average` → `['grade-average', 'gpa', 'final-grade-planner']`; `how-to-plan-your-final-grade` → `['final-grade-planner', 'grade-average', 'gpa']`. Worked examples use each tool's content example numbers.

- [ ] **Step 6: Verify + commit**

Run `npm test`, `npm run check`, `npm run build` — all clean. Education category shows 3 tools. Commit:

```bash
git add src/config/calculators.ts src/lib/calculators/gpa.ts src/lib/calculators/grade-average.ts src/lib/calculators/final-grade.ts src/lib/calculators/index.ts src/lib/client/registry.ts src/content/calculators/gpa.ts src/content/calculators/grade-average.ts src/content/calculators/final-grade-planner.ts src/content/calculators/index.ts src/content/guides.ts tests/gpa.test.ts tests/grade-average.test.ts tests/final-grade.test.ts
git commit -m "feat(calc): education calculators - GPA, grade average, final grade planner"
```

---

### Task 6: Everyday — age, date-difference, tip, unit-converter

**Files:**
- Modify: `src/config/calculators.ts` (4 config entries)
- Create: `src/lib/calculators/age.ts`, `src/lib/calculators/date-difference.ts`, `src/lib/calculators/tip.ts`, `src/lib/calculators/unit-converter.ts`
- Modify: `src/lib/calculators/index.ts` + `src/lib/client/registry.ts` (4 entries each)
- Create: `src/content/calculators/age.ts`, `src/content/calculators/date-difference.ts`, `src/content/calculators/tip.ts`, `src/content/calculators/unit-converter.ts`
- Modify: `src/content/calculators/index.ts` + `src/content/guides.ts`
- Create: `tests/age.test.ts`, `tests/date-difference.test.ts`, `tests/tip.test.ts`, `tests/unit-converter.test.ts`

**Guide slugs:** `how-to-calculate-age`, `how-to-count-days-between-dates`, `how-to-tip-appropriately`, `how-to-convert-units`.

**Date fields note:** `type: 'date'` fields emit `yyyy-mm-dd` values from `<input type="date">`. Math must parse ISO dates explicitly (not `new Date('yyyy-mm-dd')`, which is UTC — use local parsing `new Date(y, m-1, d)`).

- [ ] **Step 1: Add 4 config entries (everyday, `active: true`)**

```ts
  {
    id: 'age',
    slug: 'age',
    category: 'everyday',
    title: { ar: 'حاسبة العمر', en: 'Age calculator' },
    description: {
      ar: 'احسب عمرك بالسنوات والشهور والأيام بالضبط، أو احسب العمر بين تاريخين.',
      en: 'Calculate your exact age in years, months and days, or the age between any two dates.',
    },
    related: ['date-difference'],
    guide: 'how-to-calculate-age',
    active: true,
  },
  {
    id: 'date-difference',
    slug: 'date-difference',
    category: 'everyday',
    title: { ar: 'حاسبة الفرق بين تاريخين', en: 'Date difference calculator' },
    description: {
      ar: 'احسب عدد الأيام والأسابيع والشهور والسنوات بين تاريخين.',
      en: 'Count the days, weeks, months and years between two dates.',
    },
    related: ['age'],
    guide: 'how-to-count-days-between-dates',
    active: true,
  },
  {
    id: 'tip',
    slug: 'tip',
    category: 'everyday',
    title: { ar: 'حاسبة الإكرامية', en: 'Tip calculator' },
    description: {
      ar: 'احسب الإكرامية وإجمالي الفاتورة، مع خيار تقسيم المبلغ بين عدة أشخاص.',
      en: 'Calculate a tip and the total bill, with the option to split between people.',
    },
    related: ['unit-converter'],
    guide: 'how-to-tip-appropriately',
    active: true,
  },
  {
    id: 'unit-converter',
    slug: 'unit-converter',
    category: 'everyday',
    title: { ar: 'محول الوحدات', en: 'Unit converter' },
    description: {
      ar: 'حوّل بين وحدات الطول والوزن والحرارة والمساحة والحجم، مع جدول بكل التحويلات.',
      en: 'Convert between units of length, weight, temperature, area and volume, with a full conversion table.',
    },
    related: ['tip'],
    guide: 'how-to-convert-units',
    active: true,
  },
```

- [ ] **Step 2: Create `src/lib/calculators/age.ts`**

```ts
import type { CalcInput, CalcOutput, CalculatorMath } from './types';
import { checkNumber, parseIso, todayIso, daysBetween, calendarDiff } from './utils';

function nextBirthday(birth: Date, asOf: Date): Date {
  let next = new Date(asOf.getFullYear(), birth.getMonth(), birth.getDate());
  if (next.getTime() < asOf.getTime()) next = new Date(asOf.getFullYear() + 1, birth.getMonth(), birth.getDate());
  return next;
}

export const age: CalculatorMath = {
  slug: 'age',
  fields: [
    { id: 'birthDate', type: 'date', required: true },
    { id: 'asOfDate', type: 'date' },
  ],
  example: { birthDate: '2000-01-01', asOfDate: '2024-01-01' },

  validate(input: CalcInput): Record<string, string> {
    const errors: Record<string, string> = {};
    const birth = parseIso(input.birthDate);
    if (!birth) {
      errors.birthDate = input.birthDate ? 'invalid' : 'required';
      return errors;
    }
    const asOfRaw = (input.asOfDate ?? '').trim() || todayIso();
    const asOf = parseIso(asOfRaw);
    if (!asOf) {
      errors.asOfDate = 'invalid';
      return errors;
    }
    if (birth.getTime() > asOf.getTime()) errors.birthDate = 'max';
    return errors;
  },

  calculate(input: CalcInput): CalcOutput {
    const birth = parseIso(input.birthDate)!;
    const asOf = parseIso((input.asOfDate ?? '').trim() || todayIso())!;
    const totalDays = daysBetween(birth, asOf);
    const { years, months } = calendarDiff(birth, asOf);
    const next = nextBirthday(birth, asOf);
    return {
      results: [
        { key: 'ageYears', value: years, kind: 'number', hero: true },
        { key: 'totalMonths', value: years * 12 + months, kind: 'number' },
        { key: 'totalDays', value: totalDays, kind: 'number' },
        { key: 'totalWeeks', value: Math.floor(totalDays / 7), kind: 'number' },
        { key: 'daysUntilNextBirthday', value: daysBetween(asOf, next), kind: 'number' },
      ],
    };
  },
};

export default age;
```

**Age content spec**: title/h1 ar `حاسبة العمر` / en `Age calculator`. metaDescription: ar `احسب عمرك بالسنوات والشهور والأيام بدقة، أو عمر أي شخص بين تاريخ ولادته وأي تاريخ تختاره.` / en `Calculate your exact age in years, months and days — or anyone's age between a birth date and any date you choose.`
- fields: `birthDate` ar `تاريخ الميلاد` / en `Birth date`; `asOfDate` ar `حتى تاريخ (اختياري، اليوم افتراضياً)` / en `As of date (optional, defaults to today)`
- results: `ageYears` ar `العمر` / en `Age` (hero); `totalMonths` ar `إجمالي الأشهر` / en `Total months`; `totalDays` ar `إجمالي الأيام` / en `Total days`; `totalWeeks` ar `إجمالي الأسابيع` / en `Total weeks`; `daysUntilNextBirthday` ar `أيام حتى عيد الميلاد القادم` / en `Days until next birthday`
- no currency. Prose topics: calendar-based calculation (handles leap years and month lengths); the "as of" date is inclusive; time-of-day not counted (age on a date, not a timestamp); mistakes (mixing Hijri and Gregorian dates — the tool is Gregorian only; entering today's date as birth date); FAQ: does it handle leap birthdays (Feb 29 → Feb 28/Mar 1); is it Gregorian or Hijri.
- example numbers: birth **2000-01-01**, as of **2024-01-01** → age **24** years, total months **288**, total days **8766**, total weeks **1252**, days until next birthday **0**.

**Age test**: example → ageYears == 24, totalDays == 8766, totalWeeks == 1252, totalMonths == 288, daysUntilNextBirthday == 0 (or 365); birthday after asOf → `birthDate: 'max'`; invalid date `2020-13-01` → `invalid`; empty birthDate → `required`; leap-day birth 2000-02-29 vs 2024-02-29 → ageYears 24.

- [ ] **Step 3: Create `src/lib/calculators/date-difference.ts`**

Uses `parseIso`, `daysBetween` and `calendarDiff` from `utils.ts` (same helpers age.ts uses).

```ts
import type { CalcInput, CalcOutput, CalculatorMath } from './types';
import { checkNumber, parseIso, daysBetween, calendarDiff } from './utils';

export const dateDifference: CalculatorMath = {
  slug: 'date-difference',
  fields: [
    { id: 'startDate', type: 'date', required: true },
    { id: 'endDate', type: 'date', required: true },
  ],
  example: { startDate: '2020-01-01', endDate: '2024-01-01' },

  validate(input: CalcInput): Record<string, string> {
    const errors: Record<string, string> = {};
    const start = parseIso(input.startDate);
    if (!start) {
      errors.startDate = input.startDate ? 'invalid' : 'required';
      return errors;
    }
    const end = parseIso(input.endDate);
    if (!end) {
      errors.endDate = input.endDate ? 'invalid' : 'required';
      return errors;
    }
    if (end.getTime() < start.getTime()) errors.endDate = 'max';
    return errors;
  },

  calculate(input: CalcInput): CalcOutput {
    const start = parseIso(input.startDate)!;
    const end = parseIso(input.endDate)!;
    const totalDays = daysBetween(start, end);
    const { years, months, days } = calendarDiff(start, end);
    return {
      results: [
        { key: 'years', value: years, kind: 'number', hero: true },
        { key: 'months', value: months, kind: 'number' },
        { key: 'days', value: days, kind: 'number' },
        { key: 'totalDays', value: totalDays, kind: 'number' },
        { key: 'totalWeeks', value: Math.floor(totalDays / 7), kind: 'number' },
      ],
    };
  },
};

export default dateDifference;
```

**Date-difference content spec**: title/h1 ar `حاسبة الفرق بين تاريخين` / en `Date difference calculator`. metaDescription: ar `احسب الفرق بين تاريخين بالسنوات والشهور والأيام، وعدد الأيام والأسابيع بينهما.` / en `Calculate the difference between two dates in years, months and days, plus the total days and weeks.`
- fields: `startDate` ar `تاريخ البداية` / en `Start date`; `endDate` ar `تاريخ النهاية` / en `End date`
- results: `years` ar `السنوات` / en `Years` (hero); `months` ar `الشهور` / en `Months`; `days` ar `الأيام` / en `Days`; `totalDays` ar `إجمالي الأيام` / en `Total days`; `totalWeeks` ar `إجمالي الأسابيع` / en `Total weeks`
- no currency. Prose topics: the years/months/days breakdown is calendar-based (a day residue carries into the next month — the `days` row is the residue after full months); `totalDays` is the exact day count; mistakes (reversing the dates — validation blocks it; expecting the `days` row to equal totalDays); FAQ: is the end date included; how are month lengths handled.
- example numbers: **2020-01-01 → 2024-01-01** → years **4**, months **0**, days **0**, totalDays **1461** (2020 is a leap year), weeks **208**.

**Date-difference test**: example → years == 4, totalDays == 1461, totalWeeks == 208, months == 0, days == 0; 2020-01-31 → 2021-02-28 → years 1, months 0, days 28; end before start → `endDate: 'max'`.

- [ ] **Step 4: Create `src/lib/calculators/tip.ts`**

```ts
import type { CalcInput, CalcOutput, CalculatorMath } from './types';
import { err, numeric, checkNumber } from './utils';

export const tip: CalculatorMath = {
  slug: 'tip',
  fields: [
    { id: 'billAmount', type: 'number', required: true, min: 0, max: 1e15, step: 'any' },
    { id: 'tipPercent', type: 'number', required: true, min: 0, max: 100, step: 'any' },
    { id: 'people', type: 'number', min: 1, max: 100, step: 'any', defaultValue: '1' },
    { id: 'currency', type: 'currency' },
  ],
  example: { billAmount: '120', tipPercent: '10', people: '4', currency: 'JOD' },

  validate(input: CalcInput): Record<string, string> {
    const errors: Record<string, string> = {};
    const defs: [string, number, number][] = [
      ['billAmount', 0, 1e15],
      ['tipPercent', 0, 100],
      ['people', 1, 100],
    ];
    for (const [id, min, max] of defs) {
      const e = checkNumber(input[id], min, max);
      if (e) errors[id] = e;
    }
    return errors;
  },

  calculate(input: CalcInput): CalcOutput {
    const bill = numeric(input, 'billAmount');
    const pct = numeric(input, 'tipPercent');
    const people = Math.max(1, Math.floor(numeric(input, 'people') || 1));
    const tipAmount = (bill * pct) / 100;
    const total = bill + tipAmount;
    return {
      results: [
        { key: 'tipAmount', value: tipAmount, kind: 'currency', hero: true },
        { key: 'totalWithTip', value: total, kind: 'currency' },
        { key: 'perPerson', value: total / people, kind: 'currency' },
      ],
    };
  },
};

export default tip;
```

**Tip content spec**: title/h1 ar `حاسبة الإكرامية` / en `Tip calculator`. metaDescription: ar `احسب الإكرامية وإجمالي الفاتورة بسرعة، وقسّم المبلغ بين عدد من الأشخاص بضغطة زر.` / en `Quickly compute a tip and the total bill, and split the amount among any number of people.`
- fields: `billAmount` ar `قيمة الفاتورة` / en `Bill amount`; `tipPercent` ar `نسبة الإكرامية (%)` / en `Tip percentage (%)`; `people` ar `عدد الأشخاص` / en `Number of people`; `currency` ar `العملة` / en `Currency`
- results: `tipAmount` ar `الإكرامية` / en `Tip amount` (hero); `totalWithTip` ar `الإجمالي مع الإكرامية` / en `Total with tip`; `perPerson` ar `نصيب كل شخص` / en `Per person` — `perPerson.hint` ar `الإجمالي مقسوماً على عدد الأشخاص.` / en `Total divided by the number of people.`
- currency `JOD`. Prose topics: tip is a percent of the bill, added to it; `people` defaults to 1; custom percentages for local norms; mistakes (tipping on a discounted price; including the tip in the split twice); FAQ: is the split based on the total with tip (yes); can I tip in a different currency (no — display only).
- example numbers: bill **120**, tip **10%**, people **4** → tip **12**, total **132**, per person **33** JOD.

**Tip test**: example → tipAmount == 12, totalWithTip == 132, perPerson == 33; people empty → perPerson == total (default 1); people 2 → half; tipPercent 0 → tipAmount 0; missing bill → `required`.

- [ ] **Step 5: Create `src/lib/calculators/unit-converter.ts`**

Categories each have their own from/to selects, shown via `showIf` on the `category` select (the client's only dynamic mechanism). Temperature is special-cased (affine conversion, not a factor).

```ts
import type { CalcInput, CalcOutput, CalculatorMath, CalcFieldDef } from './types';
import { err, numeric, checkNumber } from './utils';

interface UnitDef { code: string; factor: number }

const LENGTH: UnitDef[] = [
  { code: 'mm', factor: 0.001 }, { code: 'cm', factor: 0.01 }, { code: 'm', factor: 1 },
  { code: 'km', factor: 1000 }, { code: 'in', factor: 0.0254 }, { code: 'ft', factor: 0.3048 },
  { code: 'yd', factor: 0.9144 }, { code: 'mi', factor: 1609.344 },
];
const WEIGHT: UnitDef[] = [
  { code: 'mg', factor: 1e-6 }, { code: 'g', factor: 0.001 }, { code: 'kg', factor: 1 },
  { code: 'tonne', factor: 1000 }, { code: 'oz', factor: 0.028349523125 },
  { code: 'lb', factor: 0.45359237 }, { code: 'stone', factor: 6.35029318 },
];
const AREA: UnitDef[] = [
  { code: 'mm2', factor: 1e-6 }, { code: 'cm2', factor: 1e-4 }, { code: 'm2', factor: 1 },
  { code: 'hectare', factor: 1e4 }, { code: 'km2', factor: 1e6 }, { code: 'in2', factor: 0.00064516 },
  { code: 'ft2', factor: 0.09290304 }, { code: 'yd2', factor: 0.83612736 }, { code: 'acre', factor: 4046.8564224 },
];
const VOLUME: UnitDef[] = [
  { code: 'ml', factor: 0.001 }, { code: 'l', factor: 1 }, { code: 'cm3', factor: 0.001 },
  { code: 'm3', factor: 1000 }, { code: 'gal', factor: 3.785411784 }, { code: 'qt', factor: 0.946352946 },
  { code: 'floz', factor: 0.0295735295625 }, { code: 'tsp', factor: 0.00492892159375 },
  { code: 'tbsp', factor: 0.01478676478125 },
];
const TEMPERATURE: string[] = ['celsius', 'fahrenheit', 'kelvin'];

function toCelsius(value: number, unit: string): number {
  if (unit === 'fahrenheit') return ((value - 32) * 5) / 9;
  if (unit === 'kelvin') return value - 273.15;
  return value;
}
function fromCelsius(c: number, unit: string): number {
  if (unit === 'fahrenheit') return (c * 9) / 5 + 32;
  if (unit === 'kelvin') return c + 273.15;
  return c;
}

function unitOptions(defs: UnitDef[]) {
  return defs.map((u) => ({ value: u.code, label: u.code }));
}
const CATEGORIES = [
  { value: 'length', label: 'length' },
  { value: 'weight', label: 'weight' },
  { value: 'temperature', label: 'temperature' },
  { value: 'area', label: 'area' },
  { value: 'volume', label: 'volume' },
];

const fields: CalcFieldDef[] = [
  { id: 'value', type: 'number', required: true, step: 'any' },
  { id: 'category', type: 'select', defaultValue: 'length', options: CATEGORIES },
];
const CATEGORY_UNITS: Record<string, UnitDef[] | string[]> = { length: LENGTH, weight: WEIGHT, temperature: TEMPERATURE, area: AREA, volume: VOLUME };
const UNITS: Record<string, number> = {};
for (const defs of [LENGTH, WEIGHT, AREA, VOLUME]) for (const u of defs) UNITS[u.code] = u.factor;
for (const [cat, defs] of Object.entries(CATEGORY_UNITS)) {
  const opts = Array.isArray(defs) && typeof defs[0] === 'string'
    ? (defs as string[]).map((c) => ({ value: c, label: c }))
    : unitOptions(defs as UnitDef[]);
  fields.push({ id: `from${cat}`, type: 'select', defaultValue: opts[0].value, options: opts, showIf: { field: 'category', values: [cat] } });
  fields.push({ id: `to${cat}`, type: 'select', defaultValue: opts[1]?.value ?? opts[0].value, options: opts, showIf: { field: 'category', values: [cat] } });
}

export const unitConverter: CalculatorMath = {
  slug: 'unit-converter',
  fields,
  example: { value: '1000', category: 'length', fromlength: 'm', tolength: 'km' },

  validate(input: CalcInput): Record<string, string> {
    const errors: Record<string, string> = {};
    const v = checkNumber(input.value, undefined, undefined);
    if (v) errors.value = v;
    const category = input.category ?? 'length';
    if (category !== 'temperature' && Number(input.value) < 0) errors.value = 'min';
    if (input[`from${category}`] === input[`to${category}`]) errors[`to${category}`] = 'invalid';
    return errors;
  },

  calculate(input: CalcInput): CalcOutput {
    const value = numeric(input, 'value');
    const category = input.category ?? 'length';
    const from = input[`from${category}`];
    const to = input[`to${category}`];
    let converted: number;
    if (category === 'temperature') {
      converted = fromCelsius(toCelsius(value, from), to);
    } else {
      const base = value * (UNITS[from] ?? 1);
      converted = base / (UNITS[to] ?? 1);
    }
    const defs = CATEGORY_UNITS[category];
    const codes = Array.isArray(defs) && typeof defs[0] === 'string' ? (defs as string[]) : (defs as UnitDef[]).map((u) => u.code);
    const rows: (string | number)[][] = codes.map((code) => [
      code,
      category === 'temperature'
        ? fromCelsius(toCelsius(value, from), code)
        : (value * (UNITS[from] ?? 1)) / (UNITS[code] ?? 1),
    ]);
    return {
      results: [{ key: 'convertedValue', value: converted, kind: 'number', hero: true }],
      table: { columns: ['unit', 'value'], cellKinds: ['string', 'number'], rows },
    };
  },
};

export default unitConverter;
```

**Unit-converter content spec**: title/h1 ar `محول الوحدات` / en `Unit converter`. metaDescription: ar `حوّل بسهولة بين وحدات الطول والوزن والحرارة والمساحة والحجم، وشاهد جدولاً بكل التحويلات الممكنة.` / en `Easily convert between units of length, weight, temperature, area and volume, and see a table of every conversion.`
- fields: `value` ar `القيمة` / en `Value`; `category` ar `الفئة` / en `Category` (length طول / weight وزن / temperature حرارة / area مساحة / volume حجم); `from<i>` ar `من وحدة` / en `From unit`; `to<i>` ar `إلى وحدة` / en `To unit` (option labels localized: mm ملم, cm سم, m م, km كم, in بوصة, ft قدم, yd ياردة, mi ميل, mg ملغ, g غ, kg كغ, tonne طن, oz أوقية, lb رطل, stone ستون, mm2 ملم², cm2 سم², m2 م², hectare هكتار, km2 كم², in2 بوصة², ft2 قدم², yd2 ياردة², acre فدان, ml مل, l لتر, cm3 سم³, m3 م³, gal جالون, qt كوارت, floz أونصة سائلة, tsp ملعقة صغيرة, tbsp ملعقة كبيرة, celsius مئوية, fahrenheit فهرنهايت, kelvin كلفن)
- results: `convertedValue` ar `القيمة المحوّلة` / en `Converted value` (hero) — hint ar `بالوحدة المستهدفة المختارة أعلاه.` / en `In the selected target unit.`; table title ar `جميع التحويلات` / en `All conversions`, columns `unit`/`value` ar `الوحدة`/`القيمة`
- no currency. Prose topics: conversions are exact factor-based except temperature (affine); the table shows every conversion for the category; both units must be in the same category (validation blocks same-unit conversion as `invalid`); mistakes (confusing US gallon with imperial gallon — the tool uses US; mixing C and K in the table); FAQ: why can't I convert pounds to litres (different categories); is the stone unit imperial.
- example numbers: value **1000**, category length, m → km → **1** km; table first row mm = 1,000,000.

**Unit-converter test**: 1000 m → km == 1; 1 lb → kg within `0.45359..0.4536`; 100 °C → °F == 212; 0 °C → K within `273.14..273.16`; 1 km² → acre within `247.104..247.106`; 1 gal → l within `3.785..3.786`; negative length → `value: 'min'`; negative temperature allowed (−40 °C → −40 °F); same unit from/to → `invalid`.

- [ ] **Step 6: Register config, math, loaders, content; write guides**

`src/lib/calculators/index.ts`: imports + `age, 'date-difference': dateDifference, tip, 'unit-converter': unitConverter`.
`src/lib/client/registry.ts`: `age: () => import('../calculators/age.ts'), 'date-difference': () => import('../calculators/date-difference.ts'), tip: () => import('../calculators/tip.ts'), 'unit-converter': () => import('../calculators/unit-converter.ts'),`.
`src/content/calculators/index.ts`: imports + `age, 'date-difference': dateDifference, tip, 'unit-converter': unitConverter`.
Guides: `how-to-calculate-age` → `['age', 'date-difference']`; `how-to-count-days-between-dates` → `['date-difference', 'age']`; `how-to-tip-appropriately` → `['tip', 'unit-converter']`; `how-to-convert-units` → `['unit-converter', 'tip']`. Worked examples use each tool's content example numbers.

- [ ] **Step 7: Verify + commit**

Run `npm test`, `npm run check`, `npm run build` — all clean. Everyday category shows 4 tools. Commit:

```bash
git add src/config/calculators.ts src/lib/calculators/age.ts src/lib/calculators/date-difference.ts src/lib/calculators/tip.ts src/lib/calculators/unit-converter.ts src/lib/calculators/index.ts src/lib/client/registry.ts src/content/calculators/age.ts src/content/calculators/date-difference.ts src/content/calculators/tip.ts src/content/calculators/unit-converter.ts src/content/calculators/index.ts src/content/guides.ts tests/age.test.ts tests/date-difference.test.ts tests/tip.test.ts tests/unit-converter.test.ts
git commit -m "feat(calc): everyday calculators - age, date difference, tip, unit converter"
```

---

### Task 7: Business — markup-margin, break-even, wholesale-retail

**Files:**
- Modify: `src/config/calculators.ts` (3 config entries)
- Create: `src/lib/calculators/markup-margin.ts`, `src/lib/calculators/break-even.ts`, `src/lib/calculators/wholesale-retail.ts`
- Modify: `src/lib/calculators/index.ts` + `src/lib/client/registry.ts` (3 entries each)
- Create: `src/content/calculators/markup-margin.ts`, `src/content/calculators/break-even.ts`, `src/content/calculators/wholesale-retail.ts`
- Modify: `src/content/calculators/index.ts` + `src/content/guides.ts`
- Create: `tests/markup-margin.test.ts`, `tests/break-even.test.ts`, `tests/wholesale-retail.test.ts`

**Guide slugs:** `how-to-calculate-markup-and-margin`, `how-to-calculate-break-even`, `how-to-price-wholesale-and-retail`.

No currency field on any of these (they are ratio/formula tools; currency output uses the page default).

- [ ] **Step 1: Add 3 config entries (business, `active: true`)**

```ts
  {
    id: 'markup-margin',
    slug: 'markup-margin',
    category: 'business',
    title: { ar: 'حاسبة الربح والتكلفة والهامش', en: 'Markup & margin calculator' },
    description: {
      ar: 'احسب الربح ونسبة الترميز (markup) وهامش الربح (margin) من التكلفة وسعر البيع.',
      en: 'Compute profit, markup percentage and margin percentage from cost and selling price.',
    },
    related: ['break-even', 'wholesale-retail'],
    guide: 'how-to-calculate-markup-and-margin',
    active: true,
  },
  {
    id: 'break-even',
    slug: 'break-even',
    category: 'business',
    title: { ar: 'حاسبة نقطة التعادل', en: 'Break-even calculator' },
    description: {
      ar: 'اعرف عدد الوحدات التي يجب بيعها لتغطية تكاليفك الثابتة والمتغيرة والوصول إلى نقطة التعادل.',
      en: 'Find how many units you must sell to cover fixed and variable costs and reach break-even.',
    },
    related: ['markup-margin', 'wholesale-retail'],
    guide: 'how-to-calculate-break-even',
    active: true,
  },
  {
    id: 'wholesale-retail',
    slug: 'wholesale-retail',
    category: 'business',
    title: { ar: 'حاسبة سعر الجملة والتجزئة', en: 'Wholesale to retail calculator' },
    description: {
      ar: 'حدد سعر التجزئة من تكلفة الجملة ونسبة الربح، مع قيمة الربح على كل وحدة.',
      en: 'Set a retail price from wholesale cost and a markup percentage, with the per-unit profit.',
    },
    related: ['markup-margin', 'break-even'],
    guide: 'how-to-price-wholesale-and-retail',
    active: true,
  },
```

- [ ] **Step 2: Create `src/lib/calculators/markup-margin.ts`**

```ts
import type { CalcInput, CalcOutput, CalculatorMath } from './types';
import { err, numeric, checkNumber } from './utils';

export const markupMargin: CalculatorMath = {
  slug: 'markup-margin',
  fields: [
    { id: 'cost', type: 'number', required: true, min: 1, max: 1e15, step: 'any' },
    { id: 'sellingPrice', type: 'number', required: true, min: 1, max: 1e15, step: 'any' },
  ],
  example: { cost: '80', sellingPrice: '120' },

  validate(input: CalcInput): Record<string, string> {
    const errors: Record<string, string> = {};
    const c = checkNumber(input.cost, 1, 1e15);
    if (c) errors.cost = c;
    const p = checkNumber(input.sellingPrice, 1, 1e15);
    if (p) errors.sellingPrice = p;
    return errors;
  },

  calculate(input: CalcInput): CalcOutput {
    const cost = numeric(input, 'cost');
    const price = numeric(input, 'sellingPrice');
    const profit = price - cost;
    const markup = (profit / cost) * 100;
    const margin = (profit / price) * 100;
    return {
      results: [
        { key: 'profit', value: profit, kind: 'currency', hero: true },
        { key: 'markupPct', value: markup, kind: 'percent' },
        { key: 'marginPct', value: margin, kind: 'percent' },
      ],
    };
  },
};

export default markupMargin;
```

**Markup-margin content spec**: title/h1 ar `حاسبة الربح والتكلفة والهامش` / en `Markup & margin calculator`. metaDescription: ar `احسب الربح ونسبة الترميز (markup) وهامش الربح (margin) من التكلفة وسعر البيع، وفهم الفرق بينهما.` / en `Compute profit, markup percentage and margin percentage from cost and selling price, and understand the difference.`
- fields: `cost` ar `التكلفة` / en `Cost`; `sellingPrice` ar `سعر البيع` / en `Selling price`
- results: `profit` ar `الربح` / en `Profit` (hero, currency); `markupPct` ar `نسبة الترميز (من التكلفة)` / en `Markup (on cost)` (percent); `marginPct` ar `هامش الربح (من سعر البيع)` / en `Margin (on selling price)` (percent)
- no currency (currency-formatted output uses the page default). Prose topics: markup is profit ÷ cost; margin is profit ÷ price; they differ — the same profit yields a larger markup than margin; negative profit → negative percentages (a loss); mistakes (using margin where markup is intended and vice versa; dividing by the wrong base); FAQ: which number should I use for pricing; can these be negative.
- example numbers: cost **80**, selling **120** → profit **40**, markup **50%**, margin **33.3%**.

**Markup-margin test**: example → profit == 40, markupPct within `49.99..50.01`, marginPct within `33.32..33.34`; loss case cost 120 / price 80 → profit −40, markup ≈ −33.33, margin == −50; missing cost → `required`; cost 0 → `min`.

- [ ] **Step 3: Create `src/lib/calculators/break-even.ts`**

```ts
import type { CalcInput, CalcOutput, CalculatorMath } from './types';
import { err, numeric, checkNumber } from './utils';

export const breakEven: CalculatorMath = {
  slug: 'break-even',
  fields: [
    { id: 'fixedCosts', type: 'number', required: true, min: 0, max: 1e15, step: 'any' },
    { id: 'unitPrice', type: 'number', required: true, min: 1, max: 1e15, step: 'any' },
    { id: 'unitVariableCost', type: 'number', required: true, min: 0, max: 1e15, step: 'any' },
  ],
  example: { fixedCosts: '10000', unitPrice: '50', unitVariableCost: '30' },

  validate(input: CalcInput): Record<string, string> {
    const errors: Record<string, string> = {};
    const defs: [string, number, number][] = [
      ['fixedCosts', 0, 1e15],
      ['unitPrice', 1, 1e15],
      ['unitVariableCost', 0, 1e15],
    ];
    for (const [id, min, max] of defs) {
      const e = checkNumber(input[id], min, max);
      if (e) errors[id] = e;
    }
    if (!errors.unitPrice && !errors.unitVariableCost) {
      const price = Number(input.unitPrice);
      const vc = Number(input.unitVariableCost);
      if (price <= vc) errors.unitPrice = 'invalid';
    }
    return errors;
  },

  calculate(input: CalcInput): CalcOutput {
    const fixed = numeric(input, 'fixedCosts');
    const price = numeric(input, 'unitPrice');
    const vc = numeric(input, 'unitVariableCost');
    const contribution = price - vc;
    if (contribution <= 0) throw new Error('contribution margin must be positive');
    const units = fixed / contribution;
    return {
      results: [
        { key: 'breakEvenUnits', value: units, kind: 'number', hero: true },
        { key: 'breakEvenRevenue', value: units * price, kind: 'currency' },
        { key: 'contributionMargin', value: contribution, kind: 'currency' },
      ],
    };
  },
};

export default breakEven;
```

**Break-even content spec**: title/h1 ar `حاسبة نقطة التعادل` / en `Break-even calculator`. metaDescription: ar `احسب عدد الوحدات التي يجب بيعها لتغطية التكاليف الثابتة والمتغيرة والوصول إلى نقطة التعادل، وإيراد نقطة التعادل.` / en `Calculate the units you need to sell to cover fixed and variable costs and reach break-even, plus break-even revenue.`
- fields: `fixedCosts` ar `التكاليف الثابتة` / en `Fixed costs`; `unitPrice` ar `سعر الوحدة` / en `Price per unit`; `unitVariableCost` ar `التكلفة المتغيرة للوحدة` / en `Variable cost per unit`
- results: `breakEvenUnits` ar `وحدات التعادل` / en `Break-even units` (hero); `breakEvenRevenue` ar `إيراد نقطة التعادل` / en `Break-even revenue` (currency); `contributionMargin` ar `هامش المساهمة لكل وحدة` / en `Contribution margin per unit` (currency)
- no currency (currency output uses page default). Prose topics: break-even units = fixed ÷ (price − variable cost); the unit must sell above its variable cost (validation enforces price > variable cost — explain in `errors.invalid` message and mistakes); revenue at break-even; contributions assume linear costs; mistakes (forgetting variable costs; using total revenue instead of per-unit price); FAQ: what if I never reach break-even; do fixed costs include salaries (yes, if fixed).
- example numbers: fixed **10,000**, price **50**, variable **30** → units **500**, revenue **25,000**, contribution **20**.

**Break-even test**: example → breakEvenUnits == 500, breakEvenRevenue == 25000, contributionMargin == 20; price == vc → validate returns `unitPrice: 'invalid'` (do not call calculate); fixed 0 → units 0; missing unitPrice → `required`.

- [ ] **Step 4: Create `src/lib/calculators/wholesale-retail.ts`**

```ts
import type { CalcInput, CalcOutput, CalculatorMath } from './types';
import { err, numeric, checkNumber } from './utils';

export const wholesaleRetail: CalculatorMath = {
  slug: 'wholesale-retail',
  fields: [
    { id: 'cost', type: 'number', required: true, min: 0, max: 1e15, step: 'any' },
    { id: 'markupPct', type: 'number', required: true, min: 0, max: 1000, step: 'any' },
  ],
  example: { cost: '15', markupPct: '60' },

  validate(input: CalcInput): Record<string, string> {
    const errors: Record<string, string> = {};
    const c = checkNumber(input.cost, 0, 1e15);
    if (c) errors.cost = c;
    const m = checkNumber(input.markupPct, 0, 1000);
    if (m) errors.markupPct = m;
    return errors;
  },

  calculate(input: CalcInput): CalcOutput {
    const cost = numeric(input, 'cost');
    const markupPct = numeric(input, 'markupPct');
    const selling = cost * (1 + markupPct / 100);
    return {
      results: [
        { key: 'sellingPrice', value: selling, kind: 'currency', hero: true },
        { key: 'profit', value: selling - cost, kind: 'currency' },
      ],
    };
  },
};

export default wholesaleRetail;
```

**Wholesale-retail content spec**: title/h1 ar `حاسبة سعر الجملة والتجزئة` / en `Wholesale to retail calculator`. metaDescription: ar `حدد سعر التجزئة من تكلفة الجملة ونسبة الترميز، واعرف ربحك على كل وحدة.` / en `Set a retail price from wholesale cost and a markup percentage, and see your profit per unit.`
- fields: `cost` ar `تكلفة الجملة` / en `Wholesale cost`; `markupPct` ar `نسبة الترميز (%)` / en `Markup percentage (%)`
- results: `sellingPrice` ar `سعر التجزئة المقترح` / en `Suggested retail price` (hero, currency); `profit` ar `الربح على الوحدة` / en `Profit per unit` (currency)
- no currency. Prose topics: retail = wholesale × (1 + markup); markup is a percentage of cost (not of price — see markup-margin for the difference); applies to each unit (inputs are per-unit); mistakes (entering margin where markup is meant; applying the markup to the whole batch instead of per unit); FAQ: how do I choose a markup; does this include VAT.
- example numbers: cost **15**, markup **60%** → retail **24**, profit **9**.

**Wholesale-retail test**: example → sellingPrice == 24, profit == 9; markup 0 → selling == cost; markup 100 → selling == 2×cost; missing cost → `required`; markup 1500 → `max`.

- [ ] **Step 5: Register config, math, loaders, content; write guides**

`src/lib/calculators/index.ts`: imports + `'markup-margin': markupMargin, 'break-even': breakEven, 'wholesale-retail': wholesaleRetail`.
`src/lib/client/registry.ts`: `'markup-margin': () => import('../calculators/markup-margin.ts'), 'break-even': () => import('../calculators/break-even.ts'), 'wholesale-retail': () => import('../calculators/wholesale-retail.ts'),`.
`src/content/calculators/index.ts`: imports + `'markup-margin': markupMargin, 'break-even': breakEven, 'wholesale-retail': wholesaleRetail`.
Guides: `how-to-calculate-markup-and-margin` → `['markup-margin', 'break-even', 'wholesale-retail']`; `how-to-calculate-break-even` → `['break-even', 'markup-margin', 'wholesale-retail']`; `how-to-price-wholesale-and-retail` → `['wholesale-retail', 'markup-margin', 'break-even']`. Worked examples use each tool's content example numbers.

- [ ] **Step 6: Verify + commit**

Run `npm test`, `npm run check`, `npm run build` — all clean. Business category shows 3 tools. Commit:

```bash
git add src/config/calculators.ts src/lib/calculators/markup-margin.ts src/lib/calculators/break-even.ts src/lib/calculators/wholesale-retail.ts src/lib/calculators/index.ts src/lib/client/registry.ts src/content/calculators/markup-margin.ts src/content/calculators/break-even.ts src/content/calculators/wholesale-retail.ts src/content/calculators/index.ts src/content/guides.ts tests/markup-margin.test.ts tests/break-even.test.ts tests/wholesale-retail.test.ts
git commit -m "feat(calc): business calculators - markup/margin, break-even, wholesale-retail"
```

---

### Task 8: Final verification, manual QA sweep, self-review

- [ ] **Step 1: Full gate run**

Run, in order:
1. `npm test` — every test passes (existing + catalog integrity + all 21 new tool test files).
2. `npm run check` — 0 errors.
3. `npm run build` — clean. `dist/` regenerated.
4. `npm run preview` (manual spot check) — no console errors on any new page.

- [ ] **Step 2: Manual QA sweep (both locales)**

Using `npm run dev`, verify on AR (`/`) and EN (`/en/`) for every category page and at least one tool per category:
- Category pages: `/calculators/<category>/` and `/calculators/` index list exactly the 26 active tools (6 per finance/employment, 5 health, 3 education, 4 everyday, 3 business).
- Tool pages: URL, title/h1, meta description; the form renders all fields; currency selector appears **only** on financial tools and **never** on health/education/everyday/business tools.
- Fill example (`data-action="example"`) → results match the content `exampleHtml` numbers; hero highlighted; copy/share buttons work; sidebar summary shows the hero result.
- `showIf` behavior: body-fat `hip` field appears only for female; unit-converter from/to selects swap with category; calorie `rate` is always visible.
- RTL: AR pages render correctly (logical properties) — check the unit-converter table, GPA slot rows, and result tables.
- Empty-submit shows `required` messages; out-of-range shows `min`/`max`; reset restores defaults.
- Tier B (`end-of-service`, `social-insurance`, `notice-period`, `maternity-leave`, `gross-to-net`, `income-tax`): confirm no pages exist at their slugs in either locale.

- [ ] **Step 3: Self-review against the design spec**

Re-read `docs/superpowers/specs/2026-08-09-hasebha-calculators-design.md`. Confirm the implementation honors its architecture and nothing in this plan contradicts it. Note divergences (like the education fixed-slot design and the non-currency default) in the final summary — the code remains the source of truth.

- [ ] **Step 4: Final commit**

If any fixes were needed in Tasks 5–7 during the QA sweep, commit them now:

```bash
git add -A
git commit -m "fix(calc): QA fixes from catalog expansion verification"
```

(If no changes, skip this commit.)

---

## Definition of Done

- `npm test`, `npm run check`, `npm run build` all pass with 26 active tools.
- 21 new calculators live in 4 new categories + 2 new finance tools, each with: config entry, math module, registry loader, ar/en content, page (via `[segment].astro`, both locales), tests, and a full ar/en guide.
- No client/DOM-coupling changes (the `calculatorApp.ts` contract is untouched).
- Tier B employment entries remain inactive and produce no pages.
- Finance category: 11 tools. Employment: 6 (all existing). Health: 5. Education: 3. Everyday: 4. Business: 3.

## Known gaps / follow-ups (out of scope for this plan)

- `.tool-grid`, `.home-hero`, `.section--alt` are still undefined styles (documented in AGENTS.md) — a separate UI task should define them as part of redesign work.
- Dark mode (`[data-theme]`) is still not built.
- The stale `/fonts/Amiri/...` and `/fonts/Inter/...` preloads in `BaseLayout.astro` remain (harmless but wrong).
- `country-rules/` and markdown content collections described in the design spec are not implemented (as AGENTS.md notes).

## Rollback

Each task is an isolated commit. To revert a single wave:

```bash
git revert <commit-hash-of-that-task>
```

Tasks 1–7 are sequenced so later waves depend only on Task 1's infrastructure; reverting Task 1 requires reverting Tasks 2–7.
