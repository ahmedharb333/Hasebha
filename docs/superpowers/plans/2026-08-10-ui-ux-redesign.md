# UI/UX Redesign (Option B) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Elevate the Hasebha Astro site to a clean, professional "fintech" standard — dark mode with a toggle, mobile-first polish, restyled calculator UX with live results, and consistent trust/credibility styling across the whole site.

**Architecture:** Styling-first. Refactor `src/styles/tokens.css` into a light/dark `[data-theme]` token system (same token names, swapped values) so all existing components pick up dark mode automatically. Define the 12 markup classes currently missing from the stylesheets. Add live calculation inside the existing zero-framework client (`calculatorApp.ts`) as an additive, debounced input path. No framework, no new dependencies, no changes to math/content/tests.

**Tech Stack:** Astro 7, plain CSS custom properties, TypeScript (type-only, no framework), node:test.

## Global Constraints

- **Never rename** these selectors that `src/lib/client/calculatorApp.ts` depends on: `.calc-form`, `.calc-result`, `[data-field="<id>"]`, `.field--invalid`, `[data-action="example|reset"]`, `select[data-role="currency"]`. Style-only changes to their appearance are fine.
- **Ads:** `AdSlot` component, all 5 locations in `src/config/ads.ts`, and the `afterResult` (CalculatorLayout) + `sidebar` (CalcSidebar) mount points stay exactly where they are. `belowIntro`, `inContent`, `betweenGuideSections` remain declared but **unmounted** — never mount them.
- **Do not touch:** `src/lib/calculators/*.ts`, `src/content/**`, `tests/calculators.test.ts`, `tests/loan.test.ts`, `src/config/*.ts`, `src/lib/number.ts`.
- **No new npm dependencies.** No React/Preact/Vue. No CSS frameworks.
- **i18n:** all new UI strings are localized in the component frontmatter (`locale === 'ar' ? … : …`); no hardcoded strings in markup. Use `localizedPath()` from `src/lib/i18n.ts` for links.
- **RTL:** use logical properties (`inset-inline-*`, `padding-inline-*`, `margin-inline-*`). Verify both locales after every layout change.
- **Numbers:** Latin-digit output even in Arabic (`ar-u-nu-latn`) is deliberate — never change `number.ts`.
- **Verification** (unless a task says otherwise): `npm test` (must stay green), `npm run check` (0 errors), `npm run build` (clean), plus manual check in both themes × both locales at ≥360px width.
- Git has no commits yet; commit per task with a short message.

---

### Task 1: Dark-mode token system + theme bootstrap + toggle

**Files:**
- Modify: `src/styles/tokens.css`
- Create: `src/lib/theme.ts`
- Modify: `src/layouts/BaseLayout.astro` (add inline head script)
- Modify: `src/components/Header.astro` (add toggle button + script)
- Create: `tests/theme.test.ts`

**Interfaces:**
- Produces: `resolveTheme(stored: string | null, systemDark: boolean): 'light' | 'dark'` (pure), `applyTheme(theme: 'light' | 'dark'): void` (sets `document.documentElement.dataset.theme`), `getStoredTheme(): string | null` (localStorage key `hasebha-theme`), `systemPrefersDark(): boolean`.
- Consumes: nothing.

- [ ] **Step 1: Write the failing test** (`tests/theme.test.ts`)

```ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolveTheme } from '../src/lib/theme.ts';

test('theme: explicit stored value wins', () => {
  assert.equal(resolveTheme('dark', false), 'dark');
  assert.equal(resolveTheme('light', true), 'light');
});

test('theme: unknown stored value falls back to system', () => {
  assert.equal(resolveTheme(null, true), 'dark');
  assert.equal(resolveTheme('', false), 'light');
  assert.equal(resolveTheme('weird', true), 'dark');
});

test('theme: default is light when system is light', () => {
  assert.equal(resolveTheme(null, false), 'light');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — module `../src/lib/theme.ts` not found.

- [ ] **Step 3: Create `src/lib/theme.ts`**

```ts
export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'hasebha-theme';

/** Pure: pick a theme from the stored value (explicit) or the OS preference. */
export function resolveTheme(stored: string | null, systemDark: boolean): Theme {
  if (stored === 'dark' || stored === 'light') return stored;
  return systemDark ? 'dark' : 'light';
}

export function getStoredTheme(): string | null {
  try {
    return window.localStorage.getItem(THEME_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function systemPrefersDark(): boolean {
  return typeof window.matchMedia === 'function' && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function applyTheme(theme: Theme): void {
  document.documentElement.setAttribute('data-theme', theme);
}

/** Read the effective theme (used by the toggle to know what to flip to). */
export function currentTheme(): Theme {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS (3 new tests).

- [ ] **Step 5: Refactor `src/styles/tokens.css` into light/dark tokens**

Keep the light values exactly as they are today, but add the background/text role tokens and move everything under an explicit `:root[data-theme='light']` default + a `[data-theme='dark']` block. The full file becomes:

```css
:root {
  /* Brand palette (light default) */
  --color-primary: #12305c;
  --color-primary-dark: #0e2446;
  --color-primary-light: #1b4a8f;
  --color-primary-tint: #eef3fa;
  --color-accent: #0e8a6d;
  --color-accent-dark: #0b6f58;
  --color-accent-light: #10a17f;
  --color-accent-tint: #e6f6f1;

  /* Role tokens: use -strong for *backgrounds*, base for *text/values*.
     Keeps buttons AA while letting text stay legible on dark surfaces. */
  --color-primary-strong: var(--color-primary);
  --color-accent-strong: var(--color-accent);
  --color-on-primary: #ffffff;
  --color-on-accent: #ffffff;

  /* Neutrals */
  --color-bg: #ffffff;
  --color-bg-alt: #f6f8fb;
  --color-bg-sunken: #eef1f6;
  --color-text: #16233a;
  --color-text-secondary: #45536f;
  --color-text-muted: #6b7a95;
  --color-border: #e3e8f0;
  --color-border-strong: #c9d3e0;

  /* Feedback */
  --color-danger: #c0392b;
  --color-danger-tint: #fbeceb;
  --color-warning: #9a6700;
  --color-warning-tint: #fdf3dd;
  --color-info-tint: var(--color-primary-tint);
  --color-info-border: #c3d5ee;
  --color-success-border: #b7e3d4;
  --color-warning-border: #ecd8a8;
  --color-error-border: #ecbfb8;

  /* Focus & selection */
  --color-focus: #0e8a6d;
  --focus-ring: 0 0 0 3px rgba(14, 138, 109, 0.35);

  /* Typography */
  --font-sans: 'IBM Plex Sans Arabic', 'Segoe UI', Tahoma, Arial, sans-serif;
  --font-size-xs: 0.8125rem;
  --font-size-sm: 0.9rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.3125rem;
  --font-size-2xl: 1.625rem;
  --font-size-3xl: 2rem;
  --line-height-tight: 1.35;
  --line-height-base: 1.75;

  /* Spacing scale (4px base) */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.5rem;
  --space-6: 2rem;
  --space-7: 3rem;
  --space-8: 4rem;

  /* Radii */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-pill: 999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(16, 42, 84, 0.06);
  --shadow-md: 0 4px 12px rgba(16, 42, 84, 0.08);
  --shadow-lg: 0 12px 32px rgba(16, 42, 84, 0.12);

  /* Layout */
  --container-max: 1180px;
  --container-pad: clamp(1rem, 4vw, 2rem);
  --header-height: 64px;
  --header-bg: rgba(255, 255, 255, 0.92);
  --overlay: rgba(14, 22, 38, 0.5);
  --footer-bg: var(--color-primary-dark);

  /* Motion */
  --transition: 150ms ease;
}

[data-theme='dark'] {
  --color-primary: #8fb4e8;
  --color-primary-dark: #c9ddf5;
  --color-primary-light: #a8c8f0;
  --color-primary-tint: #16263f;
  --color-accent: #3dd4b0;
  --color-accent-dark: #4fe0bc;
  --color-accent-light: #5ce6c6;
  --color-accent-tint: #123028;

  --color-primary-strong: #2b5c9e;
  --color-accent-strong: #128a6c;
  --color-on-primary: #ffffff;
  --color-on-accent: #ffffff;

  --color-bg: #0e1a2e;
  --color-bg-alt: #14233c;
  --color-bg-sunken: #182a47;
  --color-text: #e8eef7;
  --color-text-secondary: #c2cde0;
  --color-text-muted: #93a3bb;
  --color-border: #243550;
  --color-border-strong: #32486b;

  --color-danger: #e86a5c;
  --color-danger-tint: #33171a;
  --color-warning: #e0b25c;
  --color-warning-tint: #33260d;
  --color-info-tint: var(--color-primary-tint);
  --color-info-border: #274b78;
  --color-success-border: #1d5a48;
  --color-warning-border: #6b541f;
  --color-error-border: #7a332b;

  --color-focus: #3dd4b0;
  --focus-ring: 0 0 0 3px rgba(61, 212, 176, 0.35);

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.35);
  --shadow-lg: 0 12px 32px rgba(0, 0, 0, 0.45);

  --header-bg: rgba(14, 26, 46, 0.92);
  --overlay: rgba(0, 0, 0, 0.6);
  --footer-bg: #0a1526;
}
```

- [ ] **Step 6: Add anti-flash bootstrap to `BaseLayout.astro`**

Insert this inline script as the first child of `<head>` (before the stylesheets that load later; `is:inline` keeps it synchronous):

```astro
<script is:inline>
  (function () {
    try {
      var stored = localStorage.getItem('hasebha-theme');
      var dark = stored === 'dark' ||
        (stored !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches);
      document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    } catch (e) {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  })();
</script>
```

- [ ] **Step 7: Add the theme toggle to `Header.astro`**

Add the button between the `<nav>` and the `.lang-switch` div:

```astro
<button
  class="theme-toggle"
  type="button"
  data-theme-toggle
  aria-label={locale === 'ar' ? 'تبديل الوضع الداكن' : 'Toggle dark mode'}
  aria-pressed="false"
>
  <svg class="theme-toggle__sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
  <svg class="theme-toggle__moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
</button>
```

Append a second `<script>` block (the existing nav script stays):

```astro
<script>
  import { getStoredTheme, systemPrefersDark, resolveTheme, applyTheme, currentTheme } from '../lib/theme';

  const btn = document.querySelector('[data-theme-toggle]');
  const syncPressed = () => {
    const dark = currentTheme() === 'dark';
    btn?.setAttribute('aria-pressed', String(dark));
  };
  btn?.addEventListener('click', () => {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    try {
      window.localStorage.setItem('hasebha-theme', next);
    } catch { /* ignore */ }
    applyTheme(next);
    syncPressed();
  });
  syncPressed();
  // Keep the toggle honest if the system theme changes while the page is open.
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (getStoredTheme() === null) {
      applyTheme(resolveTheme(null, systemPrefersDark()));
      syncPressed();
    }
  });
</script>
```

- [ ] **Step 8: Verify**

Run: `npm test` → 55 pass (52 + 3 new).
Run: `npm run check` → 0 errors.
Run: `npm run build` → clean.

- [ ] **Step 9: Commit**

```bash
git add src/styles/tokens.css src/lib/theme.ts src/layouts/BaseLayout.astro src/components/Header.astro tests/theme.test.ts
git commit -m "feat(ui): dark mode token system with theme toggle"
```

---

### Task 2: Layout primitives + hero + tool cards

**Files:**
- Modify: `src/styles/components.css`
- Modify: `src/styles/base.css`
- Modify: `src/components/pages/HomePage.astro` (add `data-category` on calculator cards)
- Modify: `src/components/pages/CalculatorsIndex.astro` (add `data-category` on calculator cards)
- Modify: `src/components/pages/GuidesIndex.astro` (add `data-kind="guide"` on guide cards)
- Modify: `src/components/pages/GuidePage.astro` (add `data-kind="guide"` on related cards)
- Modify: `src/styles/tokens.css` (no — tokens already in Task 1)

**Interfaces:**
- Consumes: tokens from Task 1 (`--color-*`, `--shadow-*`).
- Produces: definitions for `.tool-grid`, `.home-hero`, `.home-hero__sub`, `.section--alt`, `.page-hero`, `.page-hero--compact`, `.page-body`, `.page-main`, `.calc-tool`, `.calc-sidebar`, `.link-list`, `.table-block`, `.field__actions`, `.tool-card__icon`.

- [ ] **Step 1: Add `data-category` / `data-kind` attributes**

In `HomePage.astro`, `CalculatorsIndex.astro`, `GuidePage.astro`, `GuidesIndex.astro`, add the attribute to the `<a class="tool-card" …>` opening tag:

```astro
<a class="tool-card" data-category={c.category} href={localizedPath(locale, `/calculators/${c.slug}/`)}>
```

and for guide cards:

```astro
<a class="tool-card" data-kind="guide" href={localizedPath(locale, `/guides/${g.slug}/`)}>
```

- [ ] **Step 2: Define the missing primitives in `src/styles/base.css`**

Append to `base.css` (inside the existing `/* Layout primitives */` area):

```css
.page-main {
  min-height: 60vh;
}
```

- [ ] **Step 3: Add the new sections to `src/styles/components.css`**

Append a new section at the end of `components.css`:

```css
/* ---------- Layout primitives (were used but undefined) ---------- */
.tool-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: var(--space-5);
}

.section--alt {
  background: var(--color-bg-alt);
}

.home-hero {
  padding-block: clamp(var(--space-7), 6vw, var(--space-8));
  background: linear-gradient(160deg, var(--color-primary-tint) 0%, var(--color-accent-tint) 100%);
  border-bottom: 1px solid var(--color-border);
}
.home-hero .container {
  max-width: 760px;
  margin-inline: auto;
}
.home-hero h1 {
  margin-block-end: var(--space-4);
}
.home-hero__sub {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  max-width: 56ch;
  margin-inline: auto;
  margin-block-end: var(--space-5);
}

.page-hero {
  padding-block: var(--space-6) var(--space-5);
  border-bottom: 1px solid var(--color-border);
  margin-block-end: var(--space-6);
}
.page-hero--compact {
  padding-block: var(--space-5) var(--space-4);
  margin-block-end: var(--space-5);
}
.page-hero h1 {
  margin-block-end: var(--space-2);
}
.page-hero p {
  color: var(--color-text-secondary);
  max-width: 65ch;
}
.page-body {
  max-width: 72ch;
}

/* ---------- Calculator tool card / sidebar shells ---------- */
.calc-tool {
  box-shadow: var(--shadow-md);
}
.calc-sidebar {
  box-shadow: var(--shadow-sm);
}

/* ---------- Tool cards with icons ---------- */
.tool-card__icon {
  width: 44px;
  height: 44px;
  flex: none;
  border-radius: var(--radius-md);
  background: var(--color-bg-sunken);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 22px 22px;
}
.tool-card[data-category='finance'] .tool-card__icon {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%230E8A6D' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='23 6 13.5 15.5 8.5 10.5 1 18'/%3E%3Cpolyline points='17 6 23 6 23 12'/%3E%3C/svg%3E");
}
.tool-card[data-category='employment'] .tool-card__icon {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2312305C' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='2' y='7' width='20' height='14' rx='2' ry='2'/%3E%3Cpath d='M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16'/%3E%3C/svg%3E");
}
.tool-card[data-kind='guide'] .tool-card__icon {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%230E8A6D' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z'/%3E%3Cpath d='M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z'/%3E%3C/svg%3E");
}
.tool-card .tool-card__icon + h3 {
  margin-block-start: var(--space-2);
}

/* ---------- Link list (sidebar related calculators) ---------- */
.link-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.link-list li {
  margin-block: var(--space-2);
}
.link-list a {
  text-decoration: none;
  color: var(--color-text-secondary);
}
.link-list a:hover {
  color: var(--color-primary);
  text-decoration: underline;
}

/* ---------- Table block (amortization etc.) ---------- */
.table-block {
  margin-block-start: var(--space-5);
}
.table-block h4 {
  font-size: var(--font-size-base);
  margin-block-end: var(--space-2);
}

/* ---------- Form action buttons ---------- */
.field__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-block-start: var(--space-5);
}
.field__actions .btn--primary {
  flex: 1 1 200px;
}
```

- [ ] **Step 4: Update button text colors to use `-strong` role tokens**

In the existing `/* ---------- Buttons ---------- */` section of `components.css`, change background usages from the base color to the `-strong` role token so dark mode keeps AA:

```css
.btn--primary {
  background: var(--color-accent-strong);
  color: var(--color-on-accent);
}
.btn--primary:hover:not(:disabled) {
  background: var(--color-accent-dark);
  color: var(--color-on-accent);
}
.btn--navy {
  background: var(--color-primary-strong);
  color: var(--color-on-primary);
}
.btn--navy:hover:not(:disabled) {
  background: var(--color-primary-dark);
  color: var(--color-on-primary);
}
```

Also update these existing rules to theme-aware tokens:
- `.skip-link { background: var(--color-primary-strong); color: var(--color-on-primary); }`
- `.brand__mark { background: linear-gradient(135deg, var(--color-primary-strong), var(--color-accent-strong)); color: #fff; }`
- `.lang-switch a[aria-current='true'] { background: var(--color-primary-strong); color: var(--color-on-primary); }`
- `.site-header { background: var(--header-bg); }`
- `.consent-dialog { background: var(--overlay); }`
- `.site-footer { background: var(--footer-bg); }`
- `.consent-toggle input:checked + span { background: var(--color-accent-strong); }`

- [ ] **Step 5: Fix alert borders + result value colors to be theme-aware**

In the `/* ---------- Alerts ---------- */` section, replace the hardcoded border hexes with the new tokens:

```css
.alert--info { background: var(--color-primary-tint); border-color: var(--color-info-border); color: var(--color-primary-dark); }
.alert--success { background: var(--color-accent-tint); border-color: var(--color-success-border); color: var(--color-accent-dark); }
.alert--warning { background: var(--color-warning-tint); border-color: var(--color-warning-border); color: var(--color-warning); }
.alert--error { background: var(--color-danger-tint); border-color: var(--color-error-border); color: var(--color-danger); }
```

In `/* ---------- Result panel ---------- */`, make values legible on dark surfaces:

```css
.result-primary__value {
  color: var(--color-accent-dark);
  font-variant-numeric: tabular-nums;
}
.result-primary__value.is-hero {
  color: var(--color-primary-dark);
}
```

- [ ] **Step 6: HomePage hero + card icons**

In `HomePage.astro`, insert the icon span as the first child inside each calculator card anchor, above the `<h3>`:

```astro
<a class="tool-card" data-category={c.category} href={localizedPath(locale, `/calculators/${c.slug}/`)}>
  <span class="tool-card__icon" aria-hidden="true"></span>
  <h3>{c.title[locale]}</h3>
  <p>{c.description[locale]}</p>
  <span class="tool-card__meta">{t.category[c.category]}</span>
</a>
```

Do the same in `CalculatorsIndex.astro` (calculator cards), and in `GuidesIndex.astro` + `GuidePage.astro` (guide cards with `data-kind="guide"`).

- [ ] **Step 7: Verify**

Run: `npm test` → 55 pass.
Run: `npm run check` → 0 errors.
Run: `npm run build` → clean.
Manual: home, calculators index, guides index, one guide, one calculator page — in light + dark, ar + en, 360px wide. Confirm card grids have 2+ columns on desktop, 1 column on mobile, and the icon shows per card.

- [ ] **Step 8: Commit**

```bash
git add src/styles/base.css src/styles/components.css src/components/pages/
git commit -m "feat(ui): layout primitives, hero, and icon tool cards"
```

---

### Task 3: Calculator form + results panel restyle

**Files:**
- Modify: `src/styles/components.css` (Forms, Alerts, Result panel, FAQ sections — style only, no selector renames)

**Interfaces:**
- Consumes: tokens from Task 1.
- Produces: polished `.field`, `.radio-group`, `.result-panel`, `.result-primary`, `.result-table`, `.result-actions`, `.faq` styles that work in both themes.

- [ ] **Step 1: Polish form fields**

In the existing `/* ---------- Forms ---------- */` section, upgrade the input styles (replace the current `.field__input, .field__select, .field__textarea` block):

```css
.field__input,
.field__select,
.field__textarea {
  width: 100%;
  font-family: inherit;
  font-size: var(--font-size-base);
  color: var(--color-text);
  background: var(--color-bg);
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-md);
  padding: 0.625rem 0.875rem;
  min-height: 44px;
  transition: border-color var(--transition), box-shadow var(--transition), background var(--transition);
}
.field__input::placeholder,
.field__textarea::placeholder {
  color: var(--color-text-muted);
  opacity: 1;
}
.field__input:hover,
.field__select:hover,
.field__textarea:hover {
  border-color: var(--color-border-strong);
}
.field__input:focus,
.field__select:focus,
.field__textarea:focus {
  outline: none;
  border-color: var(--color-focus);
  box-shadow: var(--focus-ring);
}
.field--invalid .field__input,
.field--invalid .field__select {
  border-color: var(--color-danger);
}
.field--invalid .field__input:focus,
.field--invalid .field__select:focus {
  box-shadow: 0 0 0 3px rgba(192, 57, 43, 0.2);
}
.field__error {
  display: block;
  margin-block-start: var(--space-2);
  font-size: var(--font-size-sm);
  color: var(--color-danger);
}
.field__hint {
  display: block;
  margin-block-start: var(--space-2);
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}
```

Upgrade the radio group (keep `:has` pattern, add theme-safe focus):

```css
.radio-group label {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-md);
  padding: var(--space-2) var(--space-3);
  cursor: pointer;
  font-size: var(--font-size-sm);
  transition: border-color var(--transition), background var(--transition);
}
.radio-group label:has(input:focus-visible) {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}
.radio-group label:has(input:checked) {
  border-color: var(--color-accent-strong);
  background: var(--color-accent-tint);
  color: var(--color-text);
}
```

- [ ] **Step 2: Polish the result panel**

Replace the current `/* ---------- Result panel ---------- */` block with:

```css
.result-panel {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-bg);
  box-shadow: var(--shadow-sm);
  padding: var(--space-5);
  margin-block-start: var(--space-5);
}
.result-panel > h3 {
  margin-top: 0;
  font-size: var(--font-size-lg);
}
.result-primary {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-3);
  margin-block-end: var(--space-5);
}
.result-primary__item {
  background: var(--color-bg-alt);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-4) var(--space-5);
}
.result-primary__label {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}
.result-primary__value {
  font-size: clamp(1.5rem, 1.2rem + 1vw, 2rem);
  font-weight: 700;
  color: var(--color-accent-dark);
  font-variant-numeric: tabular-nums;
  margin-block-start: var(--space-1);
}
.result-primary__value.is-hero {
  color: var(--color-primary-dark);
}
.result-table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--font-size-sm);
  background: var(--color-bg-alt);
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--color-border);
}
.result-table th,
.result-table td {
  border-bottom: 1px solid var(--color-border);
  padding: var(--space-2) var(--space-3);
  text-align: start;
}
.result-table th {
  background: var(--color-bg-sunken);
  font-weight: 600;
}
.result-table tbody tr:last-child th,
.result-table tbody tr:last-child td {
  border-bottom: 0;
}
.result-table td:last-child {
  font-weight: 600;
  color: var(--color-text);
  font-variant-numeric: tabular-nums;
}
@media (min-width: 640px) {
  .result-primary {
    grid-template-columns: repeat(2, 1fr);
  }
}
.result-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-block-start: var(--space-4);
}
```

- [ ] **Step 3: Polish FAQ**

```css
.faq details {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-3) var(--space-4);
  margin-block-end: var(--space-3);
  background: var(--color-bg);
  transition: border-color var(--transition);
}
.faq details[open] {
  border-color: var(--color-accent-strong);
}
.faq summary {
  font-weight: 600;
  cursor: pointer;
  color: var(--color-primary);
  padding-block: var(--space-1);
}
.faq summary::-webkit-details-marker {
  color: var(--color-text-muted);
}
.faq details[open] summary {
  margin-block-end: var(--space-2);
}
```

- [ ] **Step 4: Update `table-block` and `.prose table` borders to theme tokens**

In `base.css`, `.prose th, .prose td { border: 1px solid var(--color-border); … }` already uses `--color-border` — verify. Also give `.prose th` `background: var(--color-bg-alt)` (already present) — no change needed.

- [ ] **Step 5: Verify**

Run: `npm test` → 55 pass.
Run: `npm run check` → 0 errors.
Run: `npm run build` → clean.
Manual: loan-payment + salary-converter in both themes × both locales. Fill example → result panel renders hero number, grid of secondary results, table (loan), copy/share/reset buttons. Invalid input (e.g. `principal: abc`) shows red border + message; no errors in console.

- [ ] **Step 6: Commit**

```bash
git add src/styles/components.css src/styles/base.css
git commit -m "feat(ui): restyle calculator forms, result panel, and FAQ"
```

---

### Task 4: Live calculation while typing

**Files:**
- Modify: `src/lib/client/calculatorApp.ts`
- Create: `src/lib/client/debounce.ts`
- Create: `tests/debounce.test.ts`

**Interfaces:**
- Consumes: existing `run()`, `currentInput()`, `validate()`, `calculate()`, `render()` inside `initCalculator`.
- Produces: `debounce<T extends (...args: unknown[]) => void>(fn: T, waitMs: number): Debounced<T>` with `.cancel()` — used for the live input path. `run(opts?: { silent?: boolean })` — `silent` skips analytics tracking calls (used by live typing so every keystroke doesn't emit events).

- [ ] **Step 1: Write the failing debounce test** (`tests/debounce.test.ts`)

```ts
import { test, mock } from 'node:test';
import assert from 'node:assert/strict';
import { debounce } from '../src/lib/client/debounce.ts';

test('debounce: only the trailing call fires after the wait', () => {
  const calls: number[] = [];
  const fn = (n: number) => calls.push(n);
  const debounced = debounce(fn, 100);
  mock.timers.enable({ apis: ['setTimeout'] });
  try {
    debounced(1);
    debounced(2);
    debounced(3);
    assert.deepEqual(calls, []);
    mock.timers.tick(99);
    assert.deepEqual(calls, []);
    mock.timers.tick(1);
    assert.deepEqual(calls, [3]);
  } finally {
    mock.timers.reset();
  }
});

test('debounce: cancel() prevents the trailing call', () => {
  const calls: number[] = [];
  const debounced = debounce((n: number) => calls.push(n), 100);
  mock.timers.enable({ apis: ['setTimeout'] });
  try {
    debounced(1);
    debounced.cancel();
    mock.timers.tick(200);
    assert.deepEqual(calls, []);
  } finally {
    mock.timers.reset();
  }
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — `../src/lib/client/debounce.ts` not found.

- [ ] **Step 3: Create `src/lib/client/debounce.ts`**

```ts
export interface Debounced<A extends unknown[]> {
  (...args: A): void;
  cancel(): void;
}

/** Return a function that only runs after `waitMs` of quiet. */
export function debounce<A extends unknown[]>(fn: (...args: A) => void, waitMs: number): Debounced<A> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const debounced = ((...args: A) => {
    if (timer !== undefined) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = undefined;
      fn(...args);
    }, waitMs);
  }) as Debounced<A>;
  debounced.cancel = () => {
    if (timer !== undefined) clearTimeout(timer);
    timer = undefined;
  };
  return debounced;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS (2 new tests → 57 total).

- [ ] **Step 5: Add the silent option to `run()` in `calculatorApp.ts`**

Change the `run` signature and analytics calls (lines ~335-358). The tracking calls become conditional:

```ts
function run(opts?: { silent?: boolean }): void {
  const input = currentInput();
  if (!opts?.silent) trackCalculationStarted(payload.slug);
  clearErrors();
  const errors = math.validate(input);
  if (Object.keys(errors).length > 0) {
    clearResult();
    if (!opts?.silent) showErrors(errors);
    if (!opts?.silent) trackCalculationError(payload.slug);
    return;
  }
  let output: CalcOutput;
  try {
    output = math.calculate(input);
  } catch {
    clearResult();
    if (!opts?.silent) showErrors({ __generic: payload.errors.invalid ?? payload.errors.required ?? 'error' });
    if (!opts?.silent) trackCalculationError(payload.slug);
    return;
  }
  lastOutput = output;
  render(output);
  if (!opts?.silent) trackCalculationCompleted(payload.slug, currentCurrency);
}
```

Note: on silent runs, validation failures clear the result but do **not** flash inline errors — the explicit Calculate/Enter path still surfaces them.

- [ ] **Step 6: Wire the debounced live input**

Import at the top of `calculatorApp.ts`:

```ts
import { debounce } from './debounce';
```

Inside `initCalculator`, after the existing `submitHandler` registration (line ~407), add:

```ts
const liveRun = debounce(() => run({ silent: true }), 200);
form.addEventListener('input', liveRun);
```

- [ ] **Step 7: Wire `destroy()` to clean up**

Replace the `destroy` method (lines ~439-443) with:

```ts
return {
  destroy() {
    form.removeEventListener('submit', submitHandler);
    form.removeEventListener('input', liveRun);
    liveRun.cancel();
  },
};
```

- [ ] **Step 8: Verify**

Run: `npm test` → 57 pass.
Run: `npm run check` → 0 errors.
Run: `npm run build` → clean.
Manual: open loan-payment, click "ملء مثال"/fill example, then change `principal` — result updates as you type (no button click). Type `abc` in principal → result clears, no red error while typing; click Calculate → red error shows. Verify only the explicit calculate fires analytics (check no `trackCalculationStarted` spam — inspect Network tab for any analytics calls; tracking is disabled so no calls expected).

- [ ] **Step 9: Commit**

```bash
git add src/lib/client/calculatorApp.ts src/lib/client/debounce.ts tests/debounce.test.ts
git commit -m "feat(calc): live results while typing (debounced, silent)"
```

---

### Task 5: Sidebar current-result summary card

**Files:**
- Modify: `src/components/CalcSidebar.astro`
- Modify: `src/lib/client/calculatorApp.ts`
- Modify: `src/styles/components.css`

**Interfaces:**
- Consumes: `render(output)` in `initCalculator`; `payload.results` labels; `formatValue` already available in the closure.
- Produces: `[data-sidebar-summary]` element; `updateSidebarSummary(output: CalcOutput | null)` internal helper.

- [ ] **Step 1: Add the summary card to `CalcSidebar.astro`**

Insert as the first child inside the `<aside>`, above the guide card:

```astro
<div class="calc-sidebar__summary card card--padded" data-sidebar-summary hidden aria-live="polite"></div>
```

- [ ] **Step 2: Render the summary from the client**

In `calculatorApp.ts`, add a helper after `render()` (line ~328):

```ts
function updateSidebarSummary(output: CalcOutput | null): void {
  const box = document.querySelector<HTMLElement>('[data-sidebar-summary]');
  if (!box) return;
  box.hidden = true;
  box.innerHTML = '';
  if (!output) return;
  const hero = output.results.find((r) => r.hero) ?? output.results[0];
  if (!hero) return;
  const label = payload.results[hero.key]?.label ?? hero.key;
  const value = formatValue(hero.kind, hero.value, currentCurrency, payload.locale);
  box.hidden = false;
  const labelEl = document.createElement('span');
  labelEl.className = 'calc-sidebar__summary-label';
  labelEl.textContent = label;
  const valueEl = document.createElement('div');
  valueEl.className = 'calc-sidebar__summary-value';
  valueEl.textContent = value;
  box.appendChild(labelEl);
  box.appendChild(valueEl);
}
```

Call it at the end of `render()` and in `clearResult()`:

```ts
function render(output: CalcOutput): void {
  resultRegionEl.innerHTML = '';
  resultRegionEl.appendChild(buildResultPanel(output));
  updateSidebarSummary(output);
}

function clearResult(): void {
  resultRegionEl.innerHTML = '';
  lastOutput = null;
  updateSidebarSummary(null);
}
```

- [ ] **Step 3: Style the summary card**

Append to `components.css`:

```css
.calc-sidebar__summary {
  margin-block-end: var(--space-5);
  background: var(--color-bg-alt);
  border-color: var(--color-border);
}
.calc-sidebar__summary-label {
  display: block;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}
.calc-sidebar__summary-value {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--color-accent-dark);
  font-variant-numeric: tabular-nums;
  margin-block-start: var(--space-1);
}
```

- [ ] **Step 4: Verify**

Run: `npm test` → 57 pass.
Run: `npm run check` → 0 errors.
Run: `npm run build` → clean.
Manual: loan-payment on desktop (≥1024px): the sidebar shows a summary card above the guide card with the hero result; it updates live and on submit; clears on reset. On mobile the sidebar stacks below the calculator (existing grid behavior) — summary still appears. Confirm the sidebar ad slot remains below the summary.

- [ ] **Step 5: Commit**

```bash
git add src/components/CalcSidebar.astro src/lib/client/calculatorApp.ts src/styles/components.css
git commit -m "feat(calc): sidebar live-result summary card"
```

---

### Task 6: Guides, trust pages, 404, footer, consent, ad slots

**Files:**
- Modify: `src/styles/components.css` (footer, breadcrumbs, consent, ad-slot, 404, affiliate card)
- Modify: `src/styles/base.css` (prose polish, headings)

**Interfaces:**
- Consumes: tokens from Task 1.
- Produces: theme-aware footer, breadcrumbs, consent banner/dialog, ad-slot reserved collapse, 404, `.prose`.

- [ ] **Step 1: Footer dark-awareness + layout polish**

Update the existing `/* ---------- Footer ---------- */` rules:

```css
.site-footer {
  background: var(--footer-bg);
  color: #cfd8e6;
  margin-top: var(--space-8);
}
.site-footer h2 {
  color: #fff;
  font-size: var(--font-size-sm);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: var(--space-3);
}
```

No other footer change needed (footer text is already light on dark navy).

- [ ] **Step 2: Breadcrumbs polish**

Replace the `/* ---------- Breadcrumbs ---------- */` block:

```css
.breadcrumbs {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  padding-block: var(--space-4) 0;
}
.breadcrumbs ol {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin: 0;
  padding: 0;
}
.breadcrumbs li {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}
.breadcrumbs li + li::before {
  content: '/';
  color: var(--color-border-strong);
}
.breadcrumbs a {
  color: var(--color-text-secondary);
  text-decoration: none;
}
.breadcrumbs a:hover {
  color: var(--color-primary);
  text-decoration: underline;
}
.breadcrumbs [aria-current='page'] {
  color: var(--color-text-muted);
}
```

- [ ] **Step 3: Consent banner/dialog dark-awareness**

Update the existing consent rules to use tokens (backgrounds, borders, overlay):

```css
.consent-banner {
  background: var(--color-bg);
  border-top: 1px solid var(--color-border);
  box-shadow: 0 -8px 24px rgba(16, 42, 84, 0.1);
}
.consent-dialog {
  background: var(--overlay);
}
.consent-category {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-3) var(--space-4);
  margin-block-end: var(--space-3);
  background: var(--color-bg);
}
.consent-toggle span {
  background: var(--color-border-strong);
}
.consent-toggle input:checked + span {
  background: var(--color-accent-strong);
}
```

(Keep the existing `.consent-toggle` RTL `translateX` flip for `:lang(ar)` exactly as-is.)

- [ ] **Step 4: Ad-slot reserved collapse**

Update the `/* ---------- Ad slot ---------- */` section so an unconfigured (reserved-only) slot takes no visible space — no placeholder boxes until a real ad is configured:

```css
.ad-slot {
  display: none;
  min-height: 100px;
  border: 1px dashed var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--space-4);
  margin-block: var(--space-5);
}
.ad-slot[data-visible='true'] {
  display: flex;
}
/* Reserved-but-unconfigured slots collapse to nothing (no empty holes). */
.ad-slot[data-reserved='true'] {
  display: none;
}
```

- [ ] **Step 5: 404 + affiliate card polish**

```css
.error-page {
  text-align: center;
  padding-block: var(--space-8);
}
.error-page__code {
  font-size: 4rem;
  font-weight: 700;
  color: var(--color-primary-strong);
}
.affiliate-card {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-4) var(--space-5);
  background: var(--color-bg);
  box-shadow: var(--shadow-sm);
}
```

- [ ] **Step 6: Prose polish in `base.css`**

Update the `.prose` block for theme-awareness and readability:

```css
.prose {
  font-size: var(--font-size-base);
}
.prose a {
  color: var(--color-primary);
}
.prose blockquote {
  margin-inline: 0;
  padding: var(--space-3) var(--space-5);
  background: var(--color-bg-alt);
  border-inline-start: 4px solid var(--color-accent-strong);
  border-radius: var(--radius-sm);
  color: var(--color-text-secondary);
}
.prose table {
  width: 100%;
  border-collapse: collapse;
  margin-block: var(--space-4);
  font-size: var(--font-size-sm);
}
.prose th,
.prose td {
  border: 1px solid var(--color-border);
  padding: var(--space-2) var(--space-3);
  text-align: start;
}
.prose th {
  background: var(--color-bg-alt);
  font-weight: 600;
}
.prose li {
  margin-block: var(--space-2);
}
```

- [ ] **Step 7: Verify**

Run: `npm test` → 57 pass.
Run: `npm run check` → 0 errors.
Run: `npm run build` → clean.
Manual sweep: one guide page, about/methodology, 404, cookies page, footer, consent banner + dialog — both themes × both locales. Confirm: reserved ad slots render nothing (no dashed boxes) on calculator pages; consent RTL toggle flip still correct; footer legible.

- [ ] **Step 8: Commit**

```bash
git add src/styles/components.css src/styles/base.css
git commit -m "feat(ui): theme-aware footer, prose, consent, 404, ad slots"
```

---

### Task 7: Final verification & polish

**Files:** none (verification only) — unless issues are found.

**Interfaces:** consumes the finished product of Tasks 1–6.

- [ ] **Step 1: Full test + check + build**

Run: `npm test` → expect 57 pass.
Run: `npm run check` → expect 0 errors.
Run: `npm run build` → expect clean build in `dist/`.

- [ ] **Step 2: Manual matrix sweep**

Check each of these in **all 4 combos** (ar/en × light/dark) at ≥360px:
1. Home (hero, featured cards, guides section, trust section)
2. Calculators index (two category grids)
3. loan-payment (form, live results, result table, sidebar summary, sidebar ad slot hidden)
4. salary-converter (radio groups, select, currency select)
5. One guide page (prose, takeaways alert, FAQ, related grid)
6. About + cookies (prose, consent links)
7. 404
8. Header (nav, language switch, theme toggle) + Footer

Confirm:
- No horizontal scroll anywhere.
- Theme toggle flips instantly without flash and persists across reload.
- RTL layout mirrors correctly (Arabic); consent toggle flip intact.
- Focus rings visible on keyboard navigation.
- Reserved ad slots invisible; no layout shift.

- [ ] **Step 3: Fix any issues found and re-verify**

If anything fails, fix in the relevant file and re-run `npm test && npm run check && npm run build`.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore(ui): final polish after redesign verification"
```

---

## Self-review notes

- **Spec coverage:** dark-mode tokens (Task 1), missing primitives `.tool-grid`/`.home-hero`/`.section--alt` (Task 2), homepage hero + tool-card icons (Task 2), calculator form + results restyle (Task 3), live calculation (Task 4), sticky sidebar summary (Task 5), guides/trust/404/footer/consent/ad-slot polish (Task 6), full-site verification (Task 7). All spec sections §3–§7 map to a task.
- **Placeholders:** no TBD/TODO; every CSS/TS block is concrete.
- **Type consistency:** `resolveTheme`, `applyTheme`, `getStoredTheme`, `systemPrefersDark`, `currentTheme` defined once in Task 1 and used consistently in Task 1 Step 7. `debounce` + `Debounced` defined in Task 4 and used only there. `run(opts?: { silent?: boolean })` used by submit (`run()`), fill-example (`run()`), and live (`run({ silent: true })`). `updateSidebarSummary(output: CalcOutput | null)` defined and called in Task 5 only.
