# Klar — Country Labour-Law Engine

**Date:** 2026-08-10
**Status:** Approved for implementation (design presented to user; user approved).

## 1. Purpose

Give Klar's employment calculators country-specific labour-law awareness for the site's market: **Saudi Arabia, UAE, Kuwait, Qatar, Bahrain, Oman, Jordan**. The engine stores sourced statutory rules (overtime, end-of-service, social insurance, notice period, leave, income tax, gross-to-net deduction order) as pure TS data, enforces a strict publish gate (official source + effective date + ar/en content + tests), applies the rules to the 6 Tier B employment tools from the catalog spec, and retrofits the existing employment calculators to auto-apply country rules where they exist.

## 2. Rule data (math-side, pure TS)

### 2.1 Per-country modules

`src/lib/country-rules/<code>.ts` for `sa`, `ae`, `kw`, `qa`, `bh`, `om`, `jo`. Each exports a typed `CountryRules`:

```ts
export type CountryCode = 'sa' | 'ae' | 'kw' | 'qa' | 'bh' | 'om' | 'jo';

export interface RuleSource {
  title: string;
  url: string;
  accessed: string; // ISO date
}

export interface CountryRules {
  code: CountryCode;
  currency: 'SAR' | 'AED' | 'KWD' | 'QAR' | 'BHD' | 'OMR' | 'JOD';
  overtime: {
    multipliers: { kind: 'standard' | 'night' | 'rest_day' | 'public_holiday'; multiplier: number }[];
    weeklyCapHours?: number;
    source: RuleSource;
    effectiveFrom: string;
  };
  endOfService: {
    // daily wage = last monthly wage / 30; bands give fraction of daily wage × days of service.
    bands: { fromYears: number; daysPerYear: number }[];
    source: RuleSource;
    effectiveFrom: string;
  };
  socialInsurance: {
    eeRate: number; erRate: number; capMonthly?: number;
    source: RuleSource; effectiveFrom: string;
  };
  noticePeriod: {
    bands: { afterYears: number; days: number }[];
    source: RuleSource; effectiveFrom: string;
  };
  leave: {
    annualDays: number; maternityWeeks: number;
    source: RuleSource; effectiveFrom: string;
  };
  incomeTax: {
    brackets: { from: number; to?: number; rate: number }[];
    source: RuleSource; effectiveFrom: string;
  };
  grossToNet: {
    steps: ('social_insurance_ee' | 'income_tax' | 'other')[];
    source: RuleSource; effectiveFrom: string;
  };
}
```

### 2.2 Registry

`src/lib/country-rules/registry.ts`: maps `CountryCode` → module, exposes `getCountryRules(code)` and `COUNTRIES` (ordered list of registered codes). Same pattern as the calculator registries.

## 3. Publish gate (hard)

`src/lib/country-rules/publish-gate.ts` exports `runPublishGate(): string[]` returning a list of violations (empty = pass). It checks, for every registered country:

- every rule category has a `source` with non-empty `title`, `url`, `accessed`;
- every category has a valid `effectiveFrom` ISO date;
- numbers are finite and within sane ranges (rates 0–100, multipliers > 0, days > 0);
- the country has ar + en localized content registered in `src/content/countries.ts`;
- a test file `tests/country-rules/<code>.test.ts` exists exercising its rules.

Wiring:
- `npm test` runs a test that asserts `runPublishGate()` returns `[]`.
- `npm run check` (astro check) additionally type-checks the country modules; a build-time failure surfaces in `npm run build`.

**No sourced rule, no ship.** Countries without complete, sourced rules are simply absent from the registry (and therefore absent from the selector) — no "coming soon" entries.

## 4. Localized content (presentation-side)

`src/content/countries.ts`: per country `{ ar, en }` with display name, per-rule labels, source citation strings (title + accessed date, localized), and the standard country disclaimer text. Keeps all display strings translated (ar/en), preserving the existing data/content separation.

## 5. Site-level country selector (remembered default)

- Config: `src/config/countries.ts` — ordered country list with localized names, `DEFAULT_COUNTRY: 'jo'` (Jordan, matching the site's default JOD currency).
- **Header selector** next to the language switch on employment-facing pages; persisted in `localStorage` key `klar-country`; applied as the default on all employment tools.
- Per-tool override: each employment calculator shows an inline country selector initialized from the remembered default.
- The selector only lists countries present in the registry (publish gate guarantees complete rules).

## 6. Calculator wiring

### 6.1 New Tier B tools (activate reserved slugs from catalog spec)

`end-of-service`, `social-insurance`, `notice-period`, `maternity-leave`, `gross-to-net`, `income-tax` — currently `active: false` in `src/config/calculators.ts`; this spec sets them `active: true` (category `employment`).

Each tool: inputs = salary/service-related fields + country (site default) + currency. Math engines look up `getCountryRules(code)` and compute from the rules. Results render the applicable rule + source citation in the assumptions/methodology area, plus the country disclaimer.

### 6.2 Retrofits (existing employment tools)

`overtime-pay`, `leave-balance`, `salary-converter`, `employee-cost` accept an optional `country` input. When a country is selected and a rule exists:

- **overtime-pay**: the multiplier is auto-applied from the country law (standard / night / rest-day / public-holiday), replacing the manual radio selection; a note shows the rule + source ("Per <country> law: standard overtime ×1.5 (source, verified <date>)").
- **leave-balance**: annual leave entitlement defaults from the country law.
- **salary-converter / employee-cost**: no country-specific numeric rules in the model (beyond gross-to-net, which is a separate tool) — these keep current behavior; country selection only affects the shared site default. *(Rationale: adding speculative rules here would fail the publish gate.)*

When no rule applies, current behavior is unchanged. Math engines stay pure: `validate`/`calculate` take an optional `countryCode` in `CalcInput` and look up rules via the registry — no DOM coupling changes.

## 7. Currency interaction

Rules are stored in the country's currency. Income-tax brackets and social-insurance caps are applied only when the user's selected currency matches the rule currency; otherwise the tool shows a notice asking the user to switch currency. No runtime conversion (respects the AGENTS.md "currency selection is display-only, never conversion" rule).

## 8. Verification

- `tests/country-rules/<code>.test.ts` per country: rules present, sources valid, band/rate math sanity.
- Per-tool math tests for the 6 Tier B tools (zero values, negatives, decimals, boundaries, missing inputs).
- `publishGate` test asserts no violations.
- `npm test` green, `npm run check` 0 errors, `npm run build` clean.
- Manual sweep: all 6 Tier B tools + 4 retrofits × 7 countries × 2 locales; header selector persists across reload; currency-mismatch notice appears where applicable.

## 9. Build order

Rebrand → catalog expansion → country engine (per user decision). The country engine activates the catalog spec's reserved Tier B slugs, so it runs after the catalog lands. The UI/UX redesign plan can be interleaved at any point (it touches styling, not the country engine's data flow).

## 10. Out of scope

- Countries beyond the 7 first-wave (Egypt, Morocco, Syria, etc.) — future modules via the same pattern.
- Live exchange rates / currency conversion.
- Legal guarantees: results remain estimates for informational purposes; the country disclaimer is always shown.

## 11. Risks

- **Statutory accuracy**: the hard gate prevents unsourced rules from shipping; sourcing is the critical path. Rule figures must be gathered from official texts/government pages during implementation.
- **Currency mismatch UX**: users picking e.g. SAR salary with a Jordan rule must be clearly guided to switch currency, never silently mis-applied.
- **Retrofit scope creep**: existing tools only gain country behavior where a sourced rule exists; otherwise untouched (avoids bloating math engines with speculative rules).
- **DOM coupling**: new fields follow the existing `[data-field]` / select patterns; no selector renames.
