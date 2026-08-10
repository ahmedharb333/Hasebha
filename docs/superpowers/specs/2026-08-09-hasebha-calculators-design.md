# Hasebha (حاسبها) — Arabic & English Financial & Employment Calculators

**Date:** 2026-08-09
**Status:** Approved for implementation (design presented to user; user requested a working preview).

## 1. Purpose

An Arabic-first, bilingual (Arabic + English) website of genuinely useful financial and
employment calculators, built for organic search traffic, Google AdSense eligibility,
ethical affiliate partnerships, and long-term search authority in Arabic and English
financial/employment topics.

Temporary brand: Arabic **حاسبها** / English **Hasebha**. All brand identity, contact
info, domain, analytics IDs, and advertising IDs are globally editable from one central
configuration area.

## 2. Stack & architecture

- **Astro 5**, static build output (`dist/`), deployable to Hostinger Horizons static
  hosting / file manager / VPS. No server runtime.
- **Bilingual via Astro built-in i18n routing**: default locale `ar` served at root
  (`lang="ar"`, `dir="rtl"`), English under `/en/` (`lang="en"`, `dir="ltr"`),
  `prefixDefaultLocale: false`. hreflang alternates + canonical on every page.
- **Zero-framework interactivity**: each calculator is an Astro page; the form is
  server-rendered; calculation logic lives in pure TypeScript modules (no dependencies);
  a single generic client script (`client:load` island) reads an embedded JSON field
  config, validates, computes, and renders results. No React/Preact; tiny JS payload.
- **Dependencies**: `astro`, `@astrojs/sitemap`, `typescript`. Unit tests run with
  Node's built-in test runner (`node:test`).
- Git repo initialized for change tracking.

## 3. Project structure

```
docs/superpowers/specs/            design docs
src/
  config/       site.ts, currencies.ts, calculators.ts, legal.ts, ads.ts, analytics.ts, features.ts
  lib/          calculators/{loan,compound,savings,vat,discount,salary,overtime,freelance,employee-cost,leave}.ts
                number.ts, i18n.ts, seo.ts, consent.ts, analytics-events.ts, share.ts
                country-rules/{schema,registry,publish-gate}.ts
  layouts/      BaseLayout, PageLayout, CalculatorLayout
  components/   Header, Footer, Breadcrumbs, LanguageSwitcher, Card, Button, Field, Select, Alert,
                ResultPanel, CalculatorShell, AdSlot, AffiliateCard, ConsentManager, CopyShare, RelatedTools
  calculator-content/  <slug>/ar.ts and <slug>/en.ts  (typed rich content data)
  content/      guides/ar/*.md, guides/en/*.md, pages/ar/*.md, pages/en/*.md (content collections)
  pages/        [lang]/ dynamic routes for all pages
  styles/       tokens.css, base.css, components.css
public/         robots.txt, ads.txt, favicon, og-image, manifest
tests/          *.test.ts for all 10 calculators + number utilities
```

Routes (each duplicated under `/en/`):

- `/` homepage
- `/calculators`, `/calculators/finance`, `/calculators/employment`
- `/calculators/loan-payment`, `/compound-interest`, `/savings-goal`, `/vat`,
  `/discount-percentage`
- `/calculators/salary-converter`, `/overtime-pay`, `/freelance-rate`,
  `/employee-cost`, `/leave-balance`
- `/guides/` + 8 guide pages
- `/about`, `/methodology`, `/editorial-policy`, `/sources-policy`, `/privacy`,
  `/cookies`, `/terms`, `/disclaimer`, `/contact`, 404

## 4. Design system

- **Font**: IBM Plex Sans Arabic (variable), self-hosted, `font-display: swap`.
- **Tokens** (CSS custom properties): deep navy primary, emerald/teal result accent,
  white/very-light backgrounds, high-contrast text, generous spacing, subtle shadows,
  visible focus rings, logical properties for automatic RTL/LTR.
- Components: Card, Button (primary/outline), Field (label+input+error), Select, Alert,
  ResultPanel, Table, Breadcrumbs, AdSlot, AffiliateCard, ConsentDialog, Header, Footer,
  LanguageSwitcher.
- Mobile-first: 360 / 768 / 1024 / 1440px. Semantic HTML, correct heading hierarchy,
  keyboard nav, touch targets, accessible Arabic error messages.

## 5. Central configuration

`src/config/*.ts` is the single source of truth: brand names/logo text, domain, contact,
colors, currency list, calculator registry (slug, category, related tools, guide, active),
GA4 ID, GSC verification, Clarity (off by default), AdSense publisher ID + slot IDs +
enabled/test-mode flags, affiliate programs, feature flags, legal disclaimers,
last-reviewed dates. No hardcoded IDs in components.

## 6. Calculators (10)

Financial: loan-payment, compound-interest, savings-goal, vat, discount-percentage.
Employment: salary-converter, overtime-pay, freelance-rate, employee-cost, leave-balance.

Shared structure per page: explanation, interactive tool, results interpretation,
formula + methodology, worked example, assumptions/limitations, when it's useful, common
mistakes, FAQs, related calculators, methodology reference, last-reviewed date,
disclaimer, copy/share (in-browser only; no server storage of inputs).

Numbers: Western + Arabic-Indic digits accepted, normalized internally; thousands
separators; currency selection (JOD, SAR, AED, USD, EUR) is display-only, no conversion.

Calculation logic is fully separated from presentation, unit-tested (zero values,
negatives, decimals, large values, invalid/missing inputs, zero interest, zero duration,
rounding). No silent correction of invalid inputs.

## 7. Content & SEO

- 8 Arabic + 8 English guides; substantive trust pages (about, methodology, editorial
  policy, sources policy, privacy, cookies, terms, disclaimer, contact); homepage.
- Unique per-page title/description, canonical, hreflang, OpenGraph, sitemap, robots.txt.
- JSON-LD: WebSite, BreadcrumbList, WebApplication (calculators), Article (guides),
  FAQPage only where real visible FAQs exist. No fake ratings/reviews/people.
- Placeholders where owner info is required. Contact form is mailto-based (static
  hosting, no backend, no storage).

## 8. Monetization & privacy readiness

- **AdSlot** disabled by default; renders nothing without a valid ad code; stable
  reserved dimensions only when enabled; "إعلان"/"Ad" label; banned placements (never
  beside Calculate/Reset/Copy/Share/navigation, never inside form or result breakdown);
  no popups; no CLS.
- **AffiliateCard** disabled by default; `rel="sponsored nofollow"`; visible disclosure.
- **ConsentManager**: necessary/analytics/advertising categories; Accept all / Reject
  non-essential / Manage / Withdraw; blocks tags until consent; stubs for a
  Google-certified CMP for EEA/UK/CH.
- **Analytics events** (`calculator_view`, `calculation_completed`, `result_copied`, …)
  send only calculator id, page category, currency code, validation success/failure.
  Never amounts, names, emails, or free text. GA4/Clarity inactive until real IDs are set.
- Privacy/cookies pages accurately describe data practices. Inputs never leave the browser.

## 9. Country-specific framework

Schema + version/effective-date + source/reviewer fields + strict publish gate (official
source, effective date, passing tests, reviewer, Approved status, visible last-reviewed
date, country disclaimer). Eight inactive templates (net salary, income tax, social
security EE/ER, end-of-service, payroll deductions, leave entitlement, local overtime)
registered as unpublished; unpublished tools are not indexed and show no thin
"Coming Soon" pages.

## 10. QA

Each phase gates on `astro check` + `astro build` + unit tests. Final phase performs
functional/UI/performance/SEO/monetization audit and produces a launch-readiness table.
Lighthouse targets ~90 where realistically achievable; audit results are not manipulated.

## Known limitations

- Deploying to the user's Hostinger Horizons account happens from their panel
  (I produce `dist/` + local preview).
- Contact form is mailto-based (no server backend).
- No live exchange rates; currency selection is formatting only.
