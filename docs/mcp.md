# Klar MCP server

Klar MCP exposes selected Klar calculators as [Model Context Protocol](https://modelcontextprotocol.io)
tools, so AI agents (Claude Desktop, Claude Code, etc.) can run them directly.

**Single source of truth.** The MCP layer does **not** contain any calculation
formulas. Every tool calls the *same* engine the website uses, via the shared
registry `getMath(slug)` in `src/lib/calculators/index.ts`. Web UI and MCP always
compute identically.

```
AI agent ──▶ MCP tool (src/mcp/tools.ts)
                 │
                 ▼
          MCP adapter (src/mcp/adapter.ts)  ── validate() + calculate()
                 │
                 ▼
   Existing Klar engine (src/lib/calculators/*.ts)  ◀── also used by the website
```

## Available tools

| Tool | Calculator slug | Purpose |
| --- | --- | --- |
| `klar_calculate_loan_payment` | `loan-payment` | Fixed-rate loan monthly payment, totals, amortization |
| `klar_calculate_mortgage` | `mortgage` | Mortgage payment, totals, amortization |
| `klar_calculate_compound_interest` | `compound-interest` | Compound growth with contributions |
| `klar_calculate_vat` | `vat` | Add / remove / extract VAT on an amount |
| `klar_calculate_discount` | `discount-percentage` | Discount pricing and percent change |
| `klar_calculate_markup_margin` | `markup-margin` | Profit, markup % and margin % from cost + price |
| `klar_calculate_break_even` | `break-even` | Break-even units, revenue, contribution margin |
| `klar_calculate_debt_to_income` | `debt-to-income` | Debt-to-income ratio and remaining income |
| `klar_calculate_selling_price_from_markup` | `wholesale-retail` | Selling price from cost + target markup % |

### Inputs

Numbers are passed as JSON numbers. `annualRate` is a percent (e.g. `5` = 5%).

**`klar_calculate_loan_payment`**

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `principal` | number | yes | Loan amount before down payment |
| `annualRate` | number | yes | 0–100 (percent) |
| `term` | number | yes | 0.001–100 |
| `termUnit` | `"months"` \| `"years"` | no | default `years` |
| `downPayment` | number | no | default `0`; must be `< principal` |
| `fees` | number | no | default `0` |
| `currency` | string | no | display only (e.g. `JOD`) |

**`klar_calculate_mortgage`** — `price`, `downPayment` (`< price`), `annualRate`,
`term`, `termUnit` (default `years`), `fees` (default `0`), `currency`.

**`klar_calculate_compound_interest`** — `initial`, `contribution`,
`contributionFrequency` (`monthly` \| `quarterly` \| `annually`, default `monthly`),
`annualRate`, `compoundingFrequency` (`monthly` \| `quarterly` \| `semiAnnually` \|
`annually`, default `monthly`), `years`, `currency`.

**`klar_calculate_vat`** — `amount`, `vatRate` (0–100 percent), `direction`
(`add` \| `remove` \| `extract`, default `add`), `currency`. `add`: amount is net,
returns gross. `remove`: amount is gross, returns net before VAT. `extract`: returns
the VAT portion.

**`klar_calculate_discount`** — `mode` (`afterDiscount` \| `discountAmount` \|
`percentIncrease` \| `percentDecrease` \| `percentDifference` \| `originalPrice`,
default `afterDiscount`) plus the fields that mode uses: `original`, `discountPct`,
`discountAmount2`, `valueA`, `valueB`, `finalPrice`, `discountPct2`, `currency`.

**`klar_calculate_markup_margin`** — `cost`, `sellingPrice`. Returns profit, markup %
(profit/cost) and margin % (profit/price). Does **not** solve price from a target
markup/margin.

**`klar_calculate_break_even`** — `fixedCosts`, `unitPrice` (must exceed
`unitVariableCost`), `unitVariableCost`.

**`klar_calculate_debt_to_income`** — `monthlyDebt`, `grossIncome` (> 0), `currency`.

**`klar_calculate_selling_price_from_markup`** — `cost`, `markupPct` (0–1000, relative
to cost). Returns `sellingPrice` (hero) and `profit`. Markup-based pricing only — the
inverse of markup&margin; does **not** solve price from a target profit margin. No
currency input, so monetary outputs are `kind:"currency"` with no currency code.

### Output — AI-native contract

Each tool returns a JSON string (MCP text content) in the canonical AI contract
(`src/mcp/ai-contract.ts`). The AI layer adds semantics — labels, units, currency,
explicit hero answers, assumptions and capability limitations — around the
**untouched** engine result. The engine stays the single source of truth: the raw
result is preserved under `raw`, and every enriched `answers[].value` equals the
engine value exactly (no rounding).

```json
{
  "calculator": { "slug": "debt-to-income", "name": "Debt-to-income", "category": "personal-finance" },
  "success": true,
  "answers": [
    { "key": "dtiRatio", "label": "Debt-to-income ratio", "value": 28.000000000000004,
      "displayValue": "28%", "unit": "%", "kind": "percent", "hero": true },
    { "key": "remainingIncome", "label": "Remaining income after debt", "value": 1800,
      "displayValue": "1800 USD", "currency": "USD", "kind": "currency" }
  ],
  "assumptions": ["Debt payments and income represent the same time period."],
  "limitations": ["Does not compute loan payments, interest, or amortization."],
  "metadata": { "currency": "USD", "period": "Debt and income must use the same period (e.g. both monthly)." },
  "raw": { "results": [ { "key": "dtiRatio", "value": 28.000000000000004, "kind": "percent", "hero": true }, "..." ] }
}
```

`value` is authoritative and exact; `displayValue` is display-only. `raw.results`
(and `raw.table` where present) is the calculator's own `CalcOutput`.

On invalid input the tool returns the same contract with `success: false` and a
structured `error` (the engine's own field codes: `required` | `invalid` | `min` |
`max`). `answers` is empty — no values are invented — while `limitations` still
travel so the agent keeps capability context:

```json
{
  "calculator": { "slug": "loan-payment", "name": "Loan payment", "category": "loans" },
  "success": false,
  "answers": [],
  "assumptions": ["Fixed interest rate for the entire term.", "..."],
  "limitations": ["Does not determine whether the loan is financially advisable."],
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "One or more inputs are invalid.",
    "fields": { "downPayment": "max" }
  }
}
```

Note: the MCP input schema (zod) rejects missing/mistyped **required** arguments
before the engine runs; the structured `VALIDATION_ERROR` above covers domain rules
(min/max, cross-field, mode-required fields). Both paths reject rather than guess.

## Requirements

- **Node ≥ 22.6** (Node 24 recommended) — the server runs TypeScript natively
  (type stripping), so no build step is needed.
- Install dependencies once: `npm install`.

## Run locally

```bash
npm run mcp
```

This starts the server on stdio. It is a **local** server — it is not publicly
accessible and is meant to be launched by an MCP client, not hit over HTTP.

## Connect to Claude

### Claude Desktop

Add to `claude_desktop_config.json` (Settings → Developer → Edit Config):

```json
{
  "mcpServers": {
    "klar-calculators": {
      "command": "node",
      "args": ["C:\\Users\\Lenovo\\Project\\Websites\\Klar\\src\\mcp\\server.ts"]
    }
  }
}
```

Use the absolute path to `src/mcp/server.ts` on your machine. Restart Claude
Desktop; the nine `klar_calculate_*` tools then appear.

### Claude Code

```bash
claude mcp add klar-calculators -- node "C:\\Users\\Lenovo\\Project\\Websites\\Klar\\src\\mcp\\server.ts"
```

## Test

```bash
npm test            # runs the whole suite, including tests/mcp.test.ts
```

`tests/mcp.test.ts` covers valid calculations, validation errors, boundary values,
and **parity tests** that assert the MCP result deep-equals the engine's own
`getMath(slug).calculate(...)` output — proving MCP reuses the same engine.

## Add another calculator as a tool

Because the adapter is generic (`runCalculator(slug, input)`), adding a calculator
that already exists in the registry is one entry in `src/mcp/tools.ts`:

```ts
{
  name: 'klar_calculate_vat',
  title: 'VAT',
  slug: 'vat',                 // must exist in src/lib/calculators/index.ts
  description: '…',
  inputSchema: { /* zod shape mirroring the engine's fields */ },
}
```

No changes to `server.ts` or `adapter.ts` are needed.

## Scope / not included

- Only the nine tools above.
- No public HTTP API (MCP/stdio only).
- No persistent storage — calculations are ephemeral; no user input is stored.
- No changes to the website, its URLs, SEO, i18n, or AdSense.
