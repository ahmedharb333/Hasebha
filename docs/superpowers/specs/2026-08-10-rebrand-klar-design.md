# Rebrand: Hasebha → Klar

## Context

The site currently uses the placeholder brand حاسبها / **Hasebha**. This rebrand locks in a real, defensible brand identity: **Klar** (English) / **كلار** (Arabic transliteration).

Name rationale, established in brainstorming:
- Means "clear" in German/Danish/Swedish/Norwegian — reinforces the site's core promise: clear, transparent financial & employment calculators.
- One name in both languages (latin-script brand mark, كلار in Arabic prose).
- Domain: `klar.io` is **available** (verified via RDAP). `klar.com` is parked/unreachable; `klar.app` is registered.
- No Arabic root required (deliberate user decision after checking مبيّن/بيان/صافي — all `.com`s taken, Safi collides with SAFI Structural Software).

This is a **rename-only** change. No features, no CSS, no math, no route changes, no i18n-structure changes.

## Brand identity

| Item | Value |
|---|---|
| English brand | Klar |
| Arabic brand | كلار |
| Footer lockup | `Klar — كلار` / `كلار — Klar` |
| Domain | `https://klar.io` |
| Tagline | unchanged: ar `حاسبات مالية وحاسبات عمل واضحة وشفافة`, en `Clear and transparent financial & employment calculators` |

## Scope of changes

### Config — `src/config/site.ts`
- `url`: `https://hasebha.example.com` → `https://klar.io`
- `brandName`: `{ ar: 'كلار', en: 'Klar' }`
- `mailtoSubject`: ar `رسالة من موقع كلار`, en `Message from Klar`
- `LOGO.text`: `{ ar: 'كلار', en: 'Klar' }`
- `LOGO.lockup`: `{ ar: 'كلار — Klar', en: 'Klar — كلار' }`
- Tagline unchanged.

### Content strings — `src/content/pages.ts`
Replace all references to حاسبها / Hasebha with كلار / Klar (~28 strings across about, contact, methodology, sources policy, privacy, cookies, terms, disclaimer). Watch grammar: Arabic construct-state phrases like «حاسبات حاسبها» become «حاسبات كلار» (a foreign proper noun, so no construct-state elision — append as-is). English possessives `Hasebha's` → `Klar's`.

### Content strings — `src/content/guides.ts`
Replace the 7 occurrences of «حاسبها» / `Hasebha` (3 AR + 4 EN) in guide bodies with كلار / Klar.

### Content strings — `src/components/pages/CalculatorsIndex.astro`
Replace the two strings (ar `كل الحاسبات... في حاسبها`, en `All of Hasebha's...`) with كلار / Klar.

### Storage keys (internal, safe to rename — no persisted-user-data compatibility requirement)
- `src/lib/theme.ts`: `THEME_STORAGE_KEY` `hasebha-theme` → `klar-theme`
- `src/layouts/BaseLayout.astro`: inline bootstrap `localStorage` key → `klar-theme`
- `src/components/Header.astro`: toggle read/write key → `klar-theme`
- `src/lib/client/consent.ts`: `STORAGE_KEY` `hasebha-consent-v1` → `klar-consent-v1`

### Favicon — `public/favicon.svg`
- `aria-label`: `Hasebha` → `Klar`.
- Letter mark: `ح` → `ك` (initial of كلار). Same navy fill, white text, dimensions unchanged.

### Package manifest
- `package.json` (and `package-lock.json`): `"name": "hasebha"` → `"name": "klar"`.

## Out of scope
- No test changes: `tests/**` are math-only and contain no brand strings.
- Historical specs (`docs/superpowers/specs/2026-08-09-hasebha-calculators-design.md`) remain as historical records.
- The in-flight redesign plan (`docs/superpowers/plans/2026-08-10-ui-ux-redesign.md`) will have its `hasebha-theme` string references updated to `klar-theme` as part of the redesign phase, not this rebrand.

## Verification
- `npm test` — green (untouched, no new tests needed).
- `npm run check` — 0 errors.
- `npm run build` — clean.
- Grep `Hasebha|حاسبها|hasebha` over `src/`, `public/` and `package.json` — zero matches (excluding intentional history in `docs/`).

## Risks
- Arabic grammar: كلار is a foreign noun; do not apply Arabic construct-state (إضافة) vowel patterns — always append directly («حاسبات كلار»).
- The footer lockup changes from `حاسبها — Hasebha` to `كلار — Klar`; confirm both locales render the em-dash lockup correctly.
