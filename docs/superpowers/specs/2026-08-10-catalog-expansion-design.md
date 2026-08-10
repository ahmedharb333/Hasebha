# Klar — Catalog Expansion to 6 Categories

**Date:** 2026-08-10
**Status:** Approved for implementation (design presented to user; user approved).

## 1. Purpose

Expand the Klar calculator catalog from 10 tools in 2 categories to ~30 tools in 6 categories, covering the most-searched finance, employment, health, education, everyday and business calculators for the site's market (Jordan + GCC; currencies JOD/SAR/AED/USD/EUR). Country-dependent employment tools are **deferred** to the country labour-law engine spec and only reserved here.

## 2. Category system

### 2.1 Category type

`Category` in `src/config/calculators.ts` widens from `'finance' | 'employment'` to:

```
finance | employment | health | education | everyday | business
```

`CalculatorShell.astro` prop `category: 'finance' | 'employment'` (line 9) is widened to the union type.

### 2.2 Category metadata

New `CATEGORIES` map in `src/config/calculators.ts` (or a new `src/config/categories.ts`):

```ts
export interface CategoryMeta {
  id: Category;
  label: { ar: string; en: string };
  tagline: { ar: string; en: string };
  icon: 'finance' | 'employment' | 'health' | 'education' | 'everyday' | 'business';
}

export const CATEGORIES: Record<Category, CategoryMeta> = { … };
```

Labels (ar / en): مالية / Finance, عمل وتوظيف / Employment, صحة / Health, تعليم / Education, يومية / Everyday, أعمال / Business. Taglines are one line per category describing what the category covers.

## 3. The catalog

### 3.1 Existing tools (10, unchanged)

- Finance: loan-payment, compound-interest, savings-goal, vat, discount-percentage
- Employment: salary-converter, overtime-pay, freelance-rate, employee-cost, leave-balance

### 3.2 New Tier A tools (20)

**Finance (6):**
- `mortgage` — home-loan monthly payment with down payment, rate, term, fees; annual repayment table.
- `loan-comparison` — side-by-side comparison of two or more loan offers (principal, rate, term, fees) → monthly payment, total interest, total cost per offer.
- `early-payoff` — savings from making extra/early payments on a loan; new payoff date and interest saved.
- `zakat` — 2.5% zakat on qualifying wealth (cash, savings, gold, investments), with optional nisab reminder field.
- `retirement-savings` — project retirement balance from current savings, monthly contribution, annual return, years to retirement.
- `debt-to-income` — monthly debt payments ÷ gross monthly income → DTI ratio and a simple classification note.

**Health (5):**
- `bmi` — BMI from weight (kg/lb) and height (cm/m/ft-in); classification band.
- `bmr` — BMR via Mifflin-St Jeor (sex, age, weight, height) + daily calories for activity level (TDEE).
- `ideal-weight` — healthy weight range from height (BMI 18.5–24.9 band).
- `body-fat` — body-fat estimate from sex, height, waist and (optionally) neck/hip.
- `calorie-intake` — daily calorie target for weight goal (lose/maintain/gain) from BMR + activity + goal rate.

**Education (3):**
- `gpa` — GPA from course grades + credit hours (4.0 scale), with per-course grade selector.
- `grade-average` — percentage average from multiple scores; final grade needed to reach a target.
- `final-grade-planner` — grade needed on the final exam to hit a target course grade (current grade, weight of final).

**Everyday (4):**
- `age` — exact age from birth date to a target date (years/months/days), with `date` inputs.
- `date-difference` — days/weeks/months between two dates; `date` inputs.
- `tip` — tip amount and total from bill + tip percent (or desired total → tip percent), split across people.
- `unit-converter` — single tool with a type selector (length / weight / temperature) and unit-from/unit-to selects.

**Business (3):**
- `markup-margin` — markup % and margin % from cost and sale price (or one given the other).
- `break-even` — break-even units and revenue from fixed costs, unit price, unit variable cost.
- `wholesale-retail` — retail price from wholesale cost + target margin (or margin from cost and retail).

### 3.3 Reserved Tier B tools (6, NOT built in this spec)

These get slugs + category assignment (`employment`) in `calculators.ts` with `active: false`, so the country-engine spec can activate them without config surgery:

`end-of-service`, `social-insurance`, `notice-period`, `maternity-leave`, `gross-to-net`, `income-tax`

## 4. Per-calculator pattern (unchanged architecture)

Each new Tier A tool follows the exact `loan-payment` pattern — 6 artifacts:

1. **Config entry** in `src/config/calculators.ts` (id, slug, category, title, description, related, guide, `active: true`).
2. **Math module** `src/lib/calculators/<slug>.ts` implementing `CalculatorMath` (pure, dependency-free).
3. **Lazy-loader** line in `src/lib/client/registry.ts` (explicit static import map).
4. **Localized content** `src/content/calculators/<slug>.ts` (ar + en `CalcContent`) + registry line in `src/content/calculators/index.ts`.
5. **Page routes** `src/pages/calculators/<slug>.astro` and `src/pages/en/calculators/<slug>.astro`.
6. **Tests** in `tests/` (node:test; assert against `math.validate` / `math.calculate`).

### 4.1 Non-financial tools (health/education/everyday)

- Results use `kind: 'number'` (already handled by `formatValue` in `calculatorApp.ts`).
- No currency field in `fields` → `currencySelect` is null-safe in the client (already handled).
- `CalcContent.currencyDefault` and `currencyLabel` become **optional** in `CalcContent` (types.ts) and `CalcPayload`; `buildCalcPayload` omits/falls back to `'JOD'` when absent. Verify no DOM-coupling break (no `.calc-form`/`[data-role="currency"]` rename).

### 4.2 Icons

Add 4 tool-card icon variants (health, education, everyday, business) as inline SVG data-URIs in `src/styles/components.css`, matching the redesign plan's existing finance/employment `tool-card[data-category='…']` pattern.

## 5. Navigation & routes

- **Index** (`CalculatorsIndex.astro`): the hardcoded 2-group list (lines 19–26) becomes data-driven over `CATEGORIES` (6 sections).
- **New category pages**: `src/pages/calculators/[category].astro` + `src/pages/en/calculators/[category].astro` using `getStaticPaths` over `CATEGORIES`; each renders the category hero + tool grid. Matches the original design doc's planned `/calculators/finance`, `/calculators/employment` routes.
- Breadcrumbs + canonical + hreflang follow existing page patterns (`localizedPath`).
- HomePage `featured` picks 6 of the now-larger active set (unchanged logic).

## 6. Guides

Every new Tier A tool gets a **full explanatory guide** (ar + en) in `src/content/guides.ts`, matching the `GuideContent` shape, with:
- `relatedCalculators` pointing at the tool,
- worked examples mirroring the tool's example inputs,
- FAQ + methodology content consistent with existing guides.

## 7. Verification

- `npm test` — new per-tool tests; all pass.
- `npm run check` — 0 errors.
- `npm run build` — clean.
- Manual sweep: all 6 category pages × 2 locales; spot-check one tool per category in both locales; confirm non-financial tools render no currency selector; confirm reserved Tier B entries produce no pages.

## 8. Out of scope / deferred

- **Tier B employment tools** (end-of-service, social-insurance, notice-period, maternity-leave, gross-to-net, income-tax) → separate country labour-law engine spec.
- Country-aware behavior for existing tools (overtime-pay etc.) → country-engine spec.
- Dark mode, layout, live-results UX → existing UI/UX redesign plan.
- Rebrand to Klar → existing rebrand spec.

## 9. Risks

- **DOM coupling**: non-financial tools must not rename `.calc-form`, `.calc-result`, `[data-field=…]`, `.field--invalid`, `[data-action=…]`, `select[data-role="currency"]`. Currency absence is additive, not a rename.
- **Content volume**: 20 tools × (math + ar/en content + guide) is large; batches by category keep each implementation wave reviewable.
- **Optional currency in types**: touches shared `CalcContent`/`CalcPayload`; keep the fallback path defaulting to existing behavior so financial tools are unaffected.
