# Rebrand Hasebha → Klar Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rename the site brand from حاسبها / Hasebha to كلار / Klar across all source files, config, content, storage keys, favicon and package manifests — with zero behavioral change.

**Architecture:** Rename-only. Brand strings flow from `src/config/site.ts` (brandName, tagline, mailtoSubject, LOGO) into layouts/components; content strings live in `src/content/pages.ts`, `src/content/guides.ts` and `src/components/pages/CalculatorsIndex.astro`; storage keys (`hasebha-theme`, `hasebha-consent-v1`) live in `src/lib/theme.ts`, `src/lib/client/consent.ts`, `BaseLayout.astro`, `Header.astro`. `package.json`/`package-lock.json` hold the npm name. No math, no tests, no routes change.

**Tech Stack:** Astro, TypeScript, node:test (tests untouched).

## Global Constraints

- **Rename only.** Do not add features, change formulas, restyle, or alter i18n structure.
- **Arabic brand word:** `كلار` (transliteration). Latin script brand mark is `Klar`.
- **English possessives:** `Hasebha's` → `Klar's` (no apostrophe changes elsewhere).
- **Arabic grammar:** `كلار` is a foreign proper noun — always append directly, never apply construct-state vowel patterns («حاسبات كلار», not «حاسباتُ كلار»).
- **The name-meaning sentence changes** (about page): Klar means "clear" in German/Scandinavian — it no longer means "count it". Reword the name-etymology paragraph, do not just string-replace.
- **Do not touch** `src/lib/calculators/*`, `tests/**`, `src/styles/**`, `src/content/calculators/*` (no brand strings there).
- **Storage keys** are internal; rename them (no migration required).
- **Historical docs** (`docs/superpowers/specs/2026-08-09-*`) and the redesign plan doc stay untouched — they are historical/forward-looking records.
- **Verification:** `npm test` green (unchanged), `npm run check` 0 errors, `npm run build` clean, and grep of `src/` + `package.json` + `public/` shows zero `Hasebha|hasebha|حاسبها`.

---

### Task 1: Brand config, favicon, package manifests

**Files:**
- Modify: `src/config/site.ts`
- Modify: `public/favicon.svg`
- Modify: `package.json`
- Modify: `package-lock.json`

**Interfaces:**
- Produces: `SITE.brandName = { ar: 'كلار', en: 'Klar' }`, `SITE.url = 'https://klar.io'`, `SITE.contact.mailtoSubject = { ar: 'رسالة من موقع كلار', en: 'Message from Klar' }`, `LOGO.text = { ar: 'كلار', en: 'Klar' }`, `LOGO.lockup = { ar: 'كلار — Klar', en: 'Klar — كلار' }`. `SITE.tagline` unchanged.

- [ ] **Step 1: Update `src/config/site.ts`**

Replace the `SITE` block (lines 11–44) and the `LOGO` block (lines 46–57). Keep every existing comment; change only the values. The resulting blocks:

```ts
export const SITE = {
  /** Placeholder domain — replace with the real domain before launch. */
  url: 'https://klar.io',
  /** Brand name (display). */
  brandName: {
    ar: 'كلار',
    en: 'Klar',
  },
  /** Short brand tagline. */
  tagline: {
    ar: 'حاسبات مالية وحاسبات عمل واضحة وشفافة',
    en: 'Clear and transparent financial & employment calculators',
  },
  /** Owner / editorial placeholder. Kept empty until real info is provided. */
  owner: {
    name: { ar: '', en: '' },
    email: '',
    emailDisplay: { ar: 'بريد إلكتروني', en: 'email' },
    phone: '',
    address: { ar: '', en: '' },
  },
  /** Editorial placeholder — no invented people. */
  reviewerPlaceholder: {
    ar: 'المراجع: سيُذكر اسم المراجع المعتمد هنا',
    en: 'Reviewed by: reviewer name to be added here',
  },
  /** Default last-reviewed date (ISO). Update as content is reviewed. */
  lastReviewedDefault: '2026-08-09',
  /** Contact route handling: mailto-based (no server backend). */
  contact: {
    useMailto: true,
    mailtoSubject: { ar: 'رسالة من موقع كلار', en: 'Message from Klar' },
  },
} as const;

export const LOGO = {
  /** Rendered as text (no image assets). */
  text: {
    ar: 'كلار',
    en: 'Klar',
  },
  /** Arabic-English combined lockup used in footer. */
  lockup: {
    ar: 'كلار — Klar',
    en: 'Klar — كلار',
  },
} as const;
```

- [ ] **Step 2: Update `public/favicon.svg`**

Replace the whole file:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="Klar">
  <rect width="64" height="64" rx="14" fill="#12305C"/>
  <text x="32" y="44" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="700" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">ك</text>
</svg>
```

- [ ] **Step 3: Update `package.json` and `package-lock.json`**

In `package.json` line 2 and `package-lock.json` lines 2 and 8, change `"name": "hasebha"` → `"name": "klar"`. (Do not change the `version` or `dependencies`.)

- [ ] **Step 4: Verify**

Run: `npm run check`
Expected: 0 errors.

- [ ] **Step 5: Commit**

```bash
git add src/config/site.ts public/favicon.svg package.json package-lock.json
git commit -m "feat(brand): rename brand to Klar in config, favicon, package"
```

---

### Task 2: Storage keys + header brand mark

**Files:**
- Modify: `src/lib/theme.ts:3`
- Modify: `src/layouts/BaseLayout.astro:49`
- Modify: `src/components/Header.astro:24,94`
- Modify: `src/lib/client/consent.ts:9`

**Interfaces:**
- Consumes: nothing.
- Produces: `THEME_STORAGE_KEY = 'klar-theme'` in `theme.ts`; consent `STORAGE_KEY = 'klar-consent-v1'` in `consent.ts`; header brand mark letter becomes `ك` / `K`; all theme localStorage reads/writes use `klar-theme`.

- [ ] **Step 1: Update the theme storage key**

`src/lib/theme.ts` line 3:

```ts
export const THEME_STORAGE_KEY = 'klar-theme';
```

- [ ] **Step 2: Update the anti-flash bootstrap**

`src/layouts/BaseLayout.astro` line 49 — change the inline script's `localStorage.getItem('hasebha-theme')` to `localStorage.getItem('klar-theme')`. The line becomes:

```js
          var stored = localStorage.getItem('klar-theme');
```

- [ ] **Step 3: Update the header theme toggle write**

`src/components/Header.astro` line 94 — change `window.localStorage.setItem('hasebha-theme', next)` to `window.localStorage.setItem('klar-theme', next)`.

- [ ] **Step 4: Update the header brand mark letter**

`src/components/Header.astro` line 24 — change `{locale === 'ar' ? 'ح' : 'H'}` to `{locale === 'ar' ? 'ك' : 'K'}`. The line becomes:

```astro
      <span class="brand__mark" aria-hidden="true">{locale === 'ar' ? 'ك' : 'K'}</span>
```

- [ ] **Step 5: Update the consent storage key**

`src/lib/client/consent.ts` line 9:

```ts
const STORAGE_KEY = 'klar-consent-v1';
```

- [ ] **Step 6: Verify**

Run: `npm test` → all pass.
Run: `npm run check` → 0 errors.

- [ ] **Step 7: Commit**

```bash
git add src/lib/theme.ts src/layouts/BaseLayout.astro src/components/Header.astro src/lib/client/consent.ts
git commit -m "feat(brand): use klar storage keys and brand mark"
```

---

### Task 3: Static page content rebrand (`src/content/pages.ts`)

**Files:**
- Modify: `src/content/pages.ts` (Arabic + English sections of about, contact, methodology, sources-policy, privacy, cookies, terms, disclaimer)

**Interfaces:**
- Consumes: brand word كلار / Klar.
- Produces: every static page string uses كلار (ar) / Klar (en); the about page name-etymology paragraph is rewritten for the new meaning.

- [ ] **Step 1: Arabic replacements (`pages.ts` ar blocks)**

Apply these exact string changes:

1. About `metaDescription` (line 16): `موقع حاسبها يقدّم` → `موقع كلار يقدّم`
2. About section heading (line 19): `'ما هو حاسبها'` → `'ما هو كلار'`
3. About body (line 20): `` `حاسبها موقع ثنائي اللغة `` → `` `كلار موقع ثنائي اللغة ``
4. About name paragraph (line 22):
   Old: ``الاسم «حاسبها» يعكس نهجنا: لا صناديق سوداء ولا افتراضات خفية؛ الأرقام التي تراها أرقام يمكنك تتبّعها وفهمها.``
   New: ``الاسم «Klar» يعني «واضح» في الألمانية واللغات الإسكندنافية، ويعكس نهجنا: لا صناديق سوداء ولا افتراضات خفية؛ الأرقام التي تراها أرقام يمكنك تتبّعها وفهمها.``
5. About independence body (line 38): `حاسبها مستقل في خياراته التحريرية` → `كلار مستقل في خياراته التحريرية`
6. About section heading (line 41): `'من يدير حاسبها'` → `'من يدير كلار'`
7. About body (line 42): `يدير حاسبها فريق صغير` → `يدير كلار فريق صغير`
8. Contact `metaDescription` (line 99): `تواصل مع فريق حاسبها` → `تواصل مع فريق كلار`
9. Methodology `metaDescription` (line 162): `كيف نُبني حاسبات حاسبها ونراجعها` → `كيف نُبني حاسبات كلار ونراجعها`
10. Sources-policy `metaDescription` (line 312): `كيف يختار حاسبها المصادر` → `كيف يختار كلار المصادر`
11. Privacy `metaDescription` (line 383): `سياسة خصوصية حاسبها` → `سياسة خصوصية كلار`
12. Cookies `metaDescription` (line 470): `الكوكيز التي يستخدمها حاسبها` → `الكوكيز التي يستخدمها كلار`
13. Terms `metaDescription` (line 549): `شروط استخدام حاسبها` → `شروط استخدام كلار`
14. Disclaimer `metaDescription` (line 636): `إخلاء مسؤولية حاسبها` → `إخلاء مسؤولية كلار`
15. Disclaimer body (line 640): `نتائج الحاسبات في حاسبها تقديرية` → `نتائج الحاسبات في كلار تقديرية`

- [ ] **Step 2: English replacements (`pages.ts` en blocks)**

Apply these exact string changes:

1. About `metaDescription` (line 56): `Hasebha builds clear` → `Klar builds clear`
2. About section heading (line 59): `'What is Hasebha'` → `'What is Klar'`
3. About body (line 60): `` `Hasebha (حاسبها) is a bilingual website `` → `` `Klar is a bilingual website ``
4. About name paragraph (line 62):
   Old: ``The name means “count it” in Arabic, and it reflects our approach: no black boxes and no hidden assumptions — every number you see is one you can follow.``
   New: ``The name means “clear” in German and the Scandinavian languages, and it reflects our approach: no black boxes and no hidden assumptions — every number you see is one you can follow.``
5. About independence body (line 78): `Hasebha is independent in its editorial choices` → `Klar is independent in its editorial choices`
6. About section heading (line 81): `'Who is behind Hasebha'` → `'Who is behind Klar'`
7. About body (line 82): `Hasebha is maintained by` → `Klar is maintained by`
8. Contact `metaDescription` (line 129): `Contact the Hasebha team` → `Contact the Klar team`
9. Methodology `metaDescription` (line 196): `How Hasebha calculators are built` → `How Klar calculators are built`
10. Sources-policy `metaDescription` (line 346): `How Hasebha chooses sources` → `How Klar chooses sources`
11. Privacy `metaDescription` (line 425): `"Hasebha's privacy policy` → `"Klar's privacy policy`
12. Cookies `metaDescription` (line 508): `What cookies Hasebha uses` → `What cookies Klar uses`
13. Terms `metaDescription` (line 591): `"Hasebha's terms of use` → `"Klar's terms of use`
14. Disclaimer `metaDescription` (line 674): `"Hasebha's disclaimer` → `"Klar's disclaimer`
15. Disclaimer body (line 678): `The results produced by Hasebha calculators` → `The results produced by Klar calculators`

- [ ] **Step 3: Verify no leftover brand strings in this file**

Run: `rg "Hasebha|حاسبها" src/content/pages.ts`
Expected: no matches.

- [ ] **Step 4: Verify build**

Run: `npm run check`
Expected: 0 errors.

- [ ] **Step 5: Commit**

```bash
git add src/content/pages.ts
git commit -m "feat(brand): rebrand static page content to Klar"
```

---

### Task 4: Guide content + calculators index rebrand

**Files:**
- Modify: `src/content/guides.ts` (7 brand references: 3 AR + 4 EN)
- Modify: `src/components/pages/CalculatorsIndex.astro:16-17`

**Interfaces:**
- Consumes: brand word كلار / Klar.
- Produces: guide bodies reference كلار (ar) / Klar (en); calculators index description references كلار (ar) / Klar (en).

- [ ] **Step 1: Arabic guide replacements (`guides.ts`)**

1. Loan guide body (line 19): `تستخدمها حاسبة القسط الشهري في حاسبها` → `تستخدمها حاسبة القسط الشهري في كلار`
2. Compound-interest guide body (line 174): `باستخدام حاسبة الفائدة المركبة في حاسبها` → `باستخدام حاسبة الفائدة المركبة في كلار`
3. VAT guide body (line 494): `تستخدم حاسبة حاسبها نسبة **مخصصة**` → `تستخدم حاسبة كلار نسبة **مخصصة**`

- [ ] **Step 2: English guide replacements (`guides.ts`)**

1. Loan guide body (line 95): `used by Hasebha’s loan payment calculator` → `used by Klar’s loan payment calculator`
2. Compound-interest guide body (line 250): `how Hasebha’s compound interest calculator models it` → `how Klar’s compound interest calculator models it`
3. VAT guide body (line 570): `That is why Hasebha’s calculator lets you enter` → `That is why Klar’s calculator lets you enter`
4. Employee-cost guide body (line 1184): `shows how Hasebha’s employee total-cost calculator adds them up` → `shows how Klar’s employee total-cost calculator adds them up`

- [ ] **Step 3: Update `CalculatorsIndex.astro` description strings**

Line 16:
Old: `'كل الحاسبات المالية وحاسبات العمل في حاسبها: قروض، فائدة مركبة، ادخار، ضريبة، رواتب، عمل إضافي وأكثر.'`
New: `'كل الحاسبات المالية وحاسبات العمل في كلار: قروض، فائدة مركبة، ادخار، ضريبة، رواتب، عمل إضافي وأكثر.'`

Line 17:
Old: `'All of Hasebha’s finance and employment calculators: loans, compound interest, savings, VAT, salary, overtime and more.'`
New: `'All of Klar’s finance and employment calculators: loans, compound interest, savings, VAT, salary, overtime and more.'`

- [ ] **Step 4: Verify no leftover brand strings in these files**

Run: `rg "Hasebha|حاسبها" src/content/guides.ts src/components/pages/CalculatorsIndex.astro`
Expected: no matches.

- [ ] **Step 5: Verify**

Run: `npm run check`
Expected: 0 errors.

- [ ] **Step 6: Commit**

```bash
git add src/content/guides.ts src/components/pages/CalculatorsIndex.astro
git commit -m "feat(brand): rebrand guide content and index to Klar"
```

---

### Task 5: Final verification

**Files:** none (verification only — unless issues found).

**Interfaces:** consumes the finished product of Tasks 1–4.

- [ ] **Step 1: Full test + check + build**

Run: `npm test` → all pass (unchanged test count).
Run: `npm run check` → 0 errors.
Run: `npm run build` → clean build in `dist/`.

- [ ] **Step 2: Grep sweep for leftover brand strings**

Run: `rg -i "hasebha|حاسبها" src/ public/ package.json`
Expected: no matches.

- [ ] **Step 3: Manual sanity sweep**

Check both locales (ar at `/`, en at `/en/`):
1. Header brand mark shows `ك` (ar) / `K` (en); header word shows كلار / Klar.
2. Footer lockup shows `كلار — Klar` (ar) / `Klar — كلار` (en).
3. About page name paragraph explains the "clear" meaning.
4. Theme toggle still works and persists across reload (now `klar-theme`).
5. Favicon shows `ك`.
6. Contact mailto opens with subject "رسالة من موقع كلار" / "Message from Klar".

- [ ] **Step 4: Fix any issues found and re-verify**

If anything fails, fix in the relevant file and re-run `npm test && npm run check && npm run build` and the grep sweep.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore(brand): final verification after Klar rebrand"
```

---

## Self-review notes

- **Spec coverage:** brandName/LOGO/tagline/mailtoSubject/url (Task 1), favicon (Task 1), package name (Task 1), storage keys theme + consent (Task 2), header brand mark (Task 2), pages.ts ar + en including the name-meaning rewrite (Task 3), guides.ts + CalculatorsIndex (Task 4), verification + grep (Task 5). All spec sections map to tasks.
- **Placeholders:** no TBD/TODO; every edit has exact before/after strings.
- **Type consistency:** `THEME_STORAGE_KEY` (klar-theme) used in `theme.ts`, `BaseLayout.astro`, `Header.astro`; `STORAGE_KEY` (klar-consent-v1) in `consent.ts`; brand word كلار / Klar consistent across all content edits; Header mark letter ك/K matches favicon ك.
