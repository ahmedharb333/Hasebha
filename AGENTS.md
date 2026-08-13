# AGENTS.md

Arabic-first bilingual (AR/EN, RTL/LTR) Astro site of financial & employment calculators. Static output to `dist/`, no server runtime, no UI framework (zero-framework JS islands).

## Commands

- `npm run dev` — dev server on :4321 (AR at `/`, EN at `/en/`)
- `npm run check` — `astro check` (type-checks .astro + TS)
- `npm test` — `node --test "tests/**/*.test.ts"` (pure math logic only, no DOM). Run before/after touching `src/lib/calculators/`.
- `npm run build` — `astro check && astro build`. Gating command for "is it shippable".
- `npm run preview` — serve the built `dist/`.

No linter or formatter is configured.

## Architecture

- **i18n**: Astro built-in routing. Default locale `ar` at root, `en` under `/en/`, `prefixDefaultLocale: false`. Use `localizedPath(locale, path)` / `pathForLocale()` from `src/lib/i18n.ts` — never hardcode the `/en` prefix. Pages live under both `src/pages/` (ar) and `src/pages/en/`.
- **Calculator data flow**: server-renders the form + an embedded JSON payload (`<script is:inline type="application/json" data-calc-payload>`); client `initCalculator()` (in `src/lib/client/calculatorApp.ts`) validates, computes, and renders results. Math engines are dependency-free pure TS in `src/lib/calculators/`.
- **Content is TS data, not markdown**: calculator content = `src/content/calculators/<slug>.ts` exporting `{ ar, en }`; guides = `src/content/guides.ts`; static pages = `src/content/pages.ts`. All localized strings for a calculator must exist in that file's `ar` and `en` objects or the client falls back to blank labels.
- **All brand/IDs/ads/analytics live in `src/config/*.ts`** — no hardcoded IDs in components. Edit `site.ts`, `ads.ts`, `analytics.ts`, `features.ts`, `legal.ts` there.
- **Country rules engine (live)**: `src/lib/country-rules/` holds sourced statutory rules as pure TS data for 7 countries (`jo`, `sa`, `ae`, `kw`, `qa`, `bh`, `om`): overtime multipliers, end-of-service bands, social-insurance rates/caps, notice periods, leave (annual bands + maternity days), income-tax brackets/allowance, and the gross-to-net deduction order. Every rule carries a `RuleSource` (`title`, `url`, `effectiveFrom`, `accessed`). Country selectors use `countrySelectOptions` from `src/lib/calculators/country-field.ts`; the header selector (`[data-country-select]` in `Header.astro`) persists the choice to `localStorage` key `klar-country` (`COUNTRY_STORAGE_KEY` in `src/config/countries.ts`, `DEFAULT_COUNTRY: 'jo'`), and `applyCountryDefault()` in `calculatorApp.ts` seeds each tool's country field and switches the currency to match (the header selector's `klar:country-change` event also live-reapplies the stored country/currency and silently recomputes an open calculator). Currency is display-only — a mismatch is a localized `countryMismatch` validation error, never a conversion. See the country-engine design doc `docs/superpowers/specs/2026-08-10-country-labour-law-engine-design.md`; the code is the source of truth where the doc differs (e.g. the doc's `afterYears`/`eeRate` field names became `fromYears`/`employeeRate`, and per-country content lives in `src/config/countries.ts` + the calculator content files, not `src/content/countries.ts`). The publish gate is enforced as a test, not at build time (see Gotchas below).
- Design doc: `docs/superpowers/specs/2026-08-09-hasebha-calculators-design.md`. It describes the target architecture; the code is the source of truth (e.g. markdown content collections in the doc are not implemented — content is TS data).

## Adding a calculator

Every calculator requires all of these (a missing one breaks build or the tool):

1. Entry in `src/config/calculators.ts` (slug, category, title, related, guide, `active`)
2. Math module `src/lib/calculators/<slug>.ts` implementing `CalculatorMath` (`src/lib/calculators/types.ts`)
3. Lazy-loader registration in `src/lib/client/registry.ts` (explicit static import map — required for code-splitting)
4. Localized content `src/content/calculators/<slug>.ts` + registry in `src/content/calculators/index.ts`
5. Page routes: `src/pages/calculators/<slug>.astro` and `src/pages/en/calculators/<slug>.astro`
6. Tests in `tests/` (node:test, assert against `math.validate` / `math.calculate`)

## DOM coupling — do not break

`calculatorApp.ts` hard-couples to class names/attributes in `CalculatorShell.astro`: `.calc-form`, `.calc-result`, `[data-field="<id>"]`, `.field--invalid`, `[data-action="example|reset"]`, `select[data-role="currency"]`. A UI redesign that renames these must update the client selectors in lockstep, or every calculator breaks silently.

## Styling

- CSS custom properties in `src/styles/tokens.css` (navy primary `#12305C`, teal accent `#0E8A6D`, `--color-*`, `--space-*`, `--radius-*`). Components in `components.css`, resets/base in `base.css`.
- **RTL**: styles use logical properties (`inset-inline-*`, `padding-inline-*`). RTL-specific overrides exist (e.g. consent toggle `translateX` flip in `components.css`). Check both locales after layout changes.
- **Dark mode**: exists via a `[data-theme='light'|'dark']` token swap in `tokens.css` (role tokens `--color-*-strong`, `--color-on-*` keep button AA in both themes). Theme logic in `src/lib/theme.ts`; anti-flash bootstrap in `BaseLayout.astro`; toggle in `Header.astro` (`data-theme-toggle`); storage key `klar-theme`. Always verify both themes after token changes.
- Layout primitives `.tool-grid`, `.home-hero`, `.section--alt`, `.page-hero`, `.page-body`, `.tool-card__icon`, `.calc-sidebar__summary` are defined in `components.css` under `/* Layout primitives */`.

## Gotchas

- Numbers: `parseNumber`/`normalizeDigits` in `src/lib/number.ts` accept Arabic/Persian digits + Arabic separators; output uses Latin digits even in AR (`ar-u-nu-latn`) — deliberate, don't "fix".
- Currency selection is display-only formatting, never conversion.
- **Ads**: `AdSlot` renders nothing until a real publisher ID is set. Only `afterResult` (CalculatorLayout) and `sidebar` (CalcSidebar) are mounted; `belowIntro`, `inContent`, `betweenGuideSections` are declared in `src/config/ads.ts` but intentionally unmounted — keep them that way.
- Font preloads in `BaseLayout.astro` point at `/fonts/ibmplexsansarabic-{arabic,latin}-400.woff2`, matching the real self-hosted IBM Plex Sans Arabic files in `public/fonts/` (declared in `fonts.css` with unicode-range subsets). If you swap fonts, update the preloads in lockstep.
- `@/*` alias maps to `src/*` (tsconfig + astro.config.mjs).
- **Country rules publish gate is test-only for v1**: `assertPublishGate()` in `src/lib/country-rules/publish-gate.ts` is exercised by `tests/publish-gate.test.ts`, not by `astro build`. Any country module must pass it — don't weaken the gate to ship a rule; fix the rule.
- `dist/` and `.astro/` are gitignored.
