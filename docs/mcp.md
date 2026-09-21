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

## Available tools (MVP)

| Tool | Calculator slug | Purpose |
| --- | --- | --- |
| `klar_calculate_loan_payment` | `loan-payment` | Fixed-rate loan monthly payment, totals, amortization |
| `klar_calculate_mortgage` | `mortgage` | Mortgage payment, totals, amortization |
| `klar_calculate_compound_interest` | `compound-interest` | Compound growth with contributions |

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

### Output

Each tool returns a JSON string in the MCP text content — machine-readable, not a
formatted prose blob:

```json
{
  "success": true,
  "calculator": "loan-payment",
  "result": {
    "results": [
      { "key": "monthlyPayment", "value": 954.58, "kind": "currency", "hero": true },
      { "key": "totalPaid", "value": 114550.75, "kind": "currency" },
      { "key": "totalInterest", "value": 24550.75, "kind": "currency" }
    ],
    "table": { "columns": ["year", "..."], "cellKinds": ["number", "..."], "rows": [[1, "..."]] }
  }
}
```

`result` is the calculator's own `CalcOutput` — the exact fields the website shows.

On invalid input the tool returns a structured error (the engine's own field codes:
`required` | `invalid` | `min` | `max`):

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "One or more inputs are invalid.",
    "fields": { "downPayment": "max" }
  }
}
```

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
Desktop; the three `klar_calculate_*` tools then appear.

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

- Only the three MVP tools above.
- No public HTTP API (MCP/stdio only).
- No persistent storage — calculations are ephemeral; no user input is stored.
- No changes to the website, its URLs, SEO, i18n, or AdSense.
