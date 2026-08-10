# Hasebha — UI/UX Redesign (Option B)

**Date:** 2026-08-10
**Status:** Approved for implementation (user selected Option B, whole-site scope, dark mode with toggle).

## 1. Goals

- **Polish**: elevate the visual design to a clean, professional "fintech" standard — generous whitespace, refined navy + green accent system, strong typographic hierarchy.
- **Mobile-first**: navigation, cards, forms and results must work beautifully at 360px and be comfortably touch-friendly.
- **Trust & credibility**: clarity of formulas, disclaimers, consistent info presentation, refined focus states and prose — a finance site must look authoritative.

Scope: **whole site** — homepage, calculators index, calculator pages, guides index + guide pages, trust pages, 404, header/footer, consent UI.

## 2. Constraints & non-negotiables

- **DOM coupling**: `src/lib/client/calculatorApp.ts` hard-couples to these selectors in `CalculatorShell.astro`:
  `.calc-form`, `.calc-result`, `[data-field="<id>"]`, `.field--invalid`, `[data-action="example|reset"]`, `select[data-role="currency"]`.
  These class names and attributes must not be renamed. Styling changes only.
- **Ads**: `AdSlot` component, all 5 locations in `src/config/ads.ts`, and the reserved placeholders stay exactly where they are. Only `afterResult` (CalculatorLayout) and `sidebar` (CalcSidebar) are mounted. **`belowIntro`, `inContent`, `betweenGuideSections` remain declared but unmounted** — do not mount them.
- **No framework**: zero-framework JS islands remain. No React/Preact/Vue. No new runtime dependencies.
- **Math layer**: `src/lib/calculators/*.ts`, `src/content/calculators/*.ts` localized content, and `tests/` are untouched by this redesign.
- **Numbers**: Arabic/Persian digit input normalization and Latin-digit output (`ar-u-nu-latn`) are deliberate — never change.

## 3. Design foundation

### 3.1 Dark mode via `[data-theme]`

- Refactor `src/styles/tokens.css` into light + dark token sets keyed off `[data-theme="dark"]` on `<html>`. Keep the same token *names* (`--color-bg`, `--color-text`, etc.) and swap values — all existing components pick up dark mode for free.
- Dark palette: deep navy surfaces (≈`#0b1626`–`#0f1f36`), light text (`#e8eef7`), same primary `#12305C`-family accent (`#0E8A6D` brighter variant for contrast), borders dimmed.
- Light remains the default (no flash): set `data-theme` from `localStorage` or `prefers-color-scheme` in an inline head script before first paint.
- Toggle button in header (sun/moon), persists choice, respects `prefers-color-scheme` when no explicit choice.
- **Contrast**: all pairs WCAG AA (4.5:1 body text) in both themes.
- Consent dialog, alerts, ad-slot reserved placeholders, and footer all get dark variants.

### 3.2 Missing primitives (currently unstyled — must be defined)

- `.tool-grid` — responsive card grid (auto-fill, min 260–280px, gaps `--space-5`).
- `.home-hero` — hero layout for homepage.
- `.section--alt` — alternate (tinted) section background.

### 3.3 Typography

- Keep IBM Plex Sans Arabic (self-hosted) as the single family for both locales.
- Tighten scale for labels; keep current headings.
- Use `font-variant-numeric: tabular-nums` on result values so columns/numbers align.

## 4. Component work

### 4.1 Header
- Add dark-mode toggle (icon button) beside the language switch.
- Sticky header keeps translucent background; adapt to dark.
- Mobile nav unchanged structurally.

### 4.2 Homepage
- Hero: eyebrow → H1 → sub-line → CTAs, on a subtle gradient panel (`--color-primary` → `--color-accent` hints) with light/dark variants.
- Tool cards: existing `.tool-card` styles refined; add category badge + arrow affordance on hover. Grid via `.tool-grid`.
- Featured section, guides section (`section--alt`), trust section.

### 4.3 Calculator pages (primary focus)
- Form: keep every field/selector untouched; refine `.field`, labels, hints, focus rings, invalid states.
- **Live calculation**: debounced `input` listener recalculates while typing (≈200ms). The "Calculate" button remains for Enter/fallback. Implement inside `calculatorApp.ts` — additive only, must not break the submit path or tests.
- Results panel restyled: hero metric large, secondary results in a responsive grid, `.result-table` polished, copy/share/reset actions, formula disclosure, disclaimer footer.
- Sticky sidebar on desktop: `CalcSidebar` gets a compact "current result" summary card above the sidebar ad slot (mounting order respected).
- **No structural changes to DOM contracts.**

### 4.4 Guides & trust pages
- `.prose` refined: tables, blockquotes, lists, links polished for both themes.
- Guide page related-tools grid uses `.tool-grid`.
- Trust/legal pages use the shared prose treatment.

### 4.5 404, footer, consent, breadcrumbs
- 404: keep structure, polish styling.
- Footer: keep 4-col grid + dark brand treatment; adapt to dark.
- Breadcrumbs, buttons, alerts, FAQ: polish, dark variants.
- Consent banner + dialog: restyled, dark variant.

## 5. Data flow & error handling

- Data flow unchanged: server renders form + `data-calc-payload` JSON; client loads math via `loadMath` and calls `initCalculator`.
- Live recalculation reuses the same `validate` → `calculate` → render path as submit, so error handling and `aria` result announcements stay identical.
- The new debounce must be cleaned up by the existing `destroy()` handle.

## 6. Verification

- `npm test` — all math tests green (unchanged, run anyway).
- `npm run check` — astro check clean.
- `npm run build` — builds clean (the shippable gate).
- Manual: both locales × both themes × desktop/mobile for: home, one calculator (loan-payment), calculators index, one guide, one trust page, 404.
- Verify RTL: `inset-inline-*` and the consent-toggle `translateX` flip still behave.

## 7. Out of scope

- Mounting `belowIntro`, `inContent`, `betweenGuideSections` ad slots.
- Country-specific framework (`country-rules/`), content collections as markdown, new calculators, analytics/ads enablement.
- Fixing the stale `/fonts/Amiri` + `/fonts/Inter` preloads in `BaseLayout.astro` (harmless; can be cleaned opportunistically if touched).
