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
| `klar_calculate_tip` | `tip` | Tip amount, total, and per-person split |
| `klar_calculate_age` | `age` | Age / elapsed time from a birth date |
| `klar_calculate_date_difference` | `date-difference` | Difference between two dates |
| `klar_calculate_final_grade_needed` | `final-grade-planner` | Score needed on a final to hit a target |
| `klar_calculate_loan_early_payoff` | `early-payoff` | Payoff time & interest saved from extra payments |
| `klar_calculate_savings_goal` | `savings-goal` | Required contribution to reach a savings target |
| `klar_calculate_retirement_savings` | `retirement-savings` | Future value from a fixed monthly contribution |
| `klar_calculate_salary_converter` | `salary-converter` | Convert pay between hourly/daily/weekly/monthly/annual |
| `klar_calculate_loan_comparison` | `loan-comparison` | Compare two loan options |
| `klar_calculate_employee_cost` | `employee-cost` | Total employer cost of an employee |
| `klar_calculate_freelance_rate` | `freelance-rate` | Freelance hourly/day rate from an income goal |
| `klar_calculate_unit_conversion` | `unit-converter` | Convert a value between units in one category |
| `klar_calculate_gpa` | `gpa` | Credit-weighted GPA from a list of courses |
| `klar_calculate_grade_average` | `grade-average` | Simple average of a list of grades |
| `klar_calculate_bmi` | `bmi` | Body mass index + healthy weight range |
| `klar_calculate_ideal_weight` | `ideal-weight` | Healthy weight range from height (BMI method) |
| `klar_calculate_bmr` | `bmr` | BMR (Mifflin-St Jeor) + TDEE |
| `klar_calculate_calorie_intake` | `calorie-intake` | Daily calorie target for a weight goal |
| `klar_calculate_body_fat` | `body-fat` | Body fat % (US Navy tape, cm) |
| `klar_calculate_maternity_leave` | `maternity-leave` | Statutory maternity-leave days (by country) |
| `klar_calculate_notice_period` | `notice-period` | Statutory notice period by tenure |
| `klar_calculate_social_insurance` | `social-insurance` | Employee/employer social-insurance shares |
| `klar_calculate_income_tax` | `income-tax` | Statutory annual income tax |
| `klar_calculate_gross_to_net` | `gross-to-net` | Monthly gross → net (statutory deductions) |
| `klar_calculate_end_of_service` | `end-of-service` | Statutory end-of-service gratuity |
| `klar_calculate_leave_balance` | `leave-balance` | Annual leave balance (statutory or manual) |
| `klar_calculate_overtime_pay` | `overtime-pay` | Weekly overtime pay (statutory or manual) |

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
currency input, so monetary outputs are `monetary:true` with no currency code.

**`klar_calculate_tip`** — `billAmount`, `tipPercent` (0–100), `people` (1–100, default
1), `currency`. Returns `tipAmount` (hero), `totalWithTip`, `perPerson`. Tip percent is
applied to the bill as provided; does not add or separate tax.

**`klar_calculate_age`** — `birthDate` (ISO `YYYY-MM-DD`), `asOfDate` (ISO, optional,
defaults to today). Returns `ageYears` (hero), `totalMonths`, `totalDays`, `totalWeeks`,
`daysUntilNextBirthday`. Non-monetary.

**`klar_calculate_date_difference`** — `startDate`, `endDate` (ISO `YYYY-MM-DD`, end ≥
start). Returns the calendar breakdown `years` (hero) / `months` / `days` plus absolute
`totalDays` / `totalWeeks`. Non-monetary.

**`klar_calculate_final_grade_needed`** — `currentGrade` (0–100), `finalWeight` (1–100
percent), `targetGrade` (0–100). Returns `requiredFinal` (hero, clamped 0–100),
`currentContribution`, `maxAchievable`. If `maxAchievable` < target the goal is
unreachable. Non-monetary (points).

**`klar_calculate_loan_early_payoff`** — `principal`, `annualRate` (0–100), `term`,
`termUnit` (default `years`), `extraMonthly` (default 0), `currency`. Returns
`baselinePayment` (hero), `baselineMonths`, `newMonths`, `interestSaved`. Fixed extra
monthly payment only — not a refinance/rate-change.

**`klar_calculate_savings_goal`** — `target`, `currentSavings`, `annualReturn` (0–100),
`years`, `contributionFrequency` (`monthly` \| `quarterly` \| `annually`, default
`monthly`), `currency`. Inverse of a future-value projection: returns
`requiredContribution` (hero, per period), `totalContributed`, `estimatedReturn`, and
`completionMonths` (a count of contribution periods, not literally months).

**`klar_calculate_retirement_savings`** — `currentSavings`, `monthlyContribution`,
`annualReturn` (0–100), `years`, `currency`. Fixed monthly contribution, compounded
monthly. Returns `finalBalance` (hero), `totalContributions`, `totalInterestEarned`.
For a lump sum / non-monthly compounding use compound interest; to solve for the
contribution use savings goal.

**`klar_calculate_salary_converter`** — `salaryAmount`, `salaryFrequency` (`hourly` \|
`daily` \| `weekly` \| `monthly` \| `annual`), `daysPerWeek` (5), `hoursPerDay` (8),
`paidWeeksPerYear` (52), `unpaidLeaveDays` (0), `currency`. Returns hourly/daily/weekly/
monthly/annual (annual is hero). Same gross pay across periods — not net pay, not
employer cost.

**`klar_calculate_loan_comparison`** — `principal`, `termUnit` (default `years`),
`optionA` `{rate, term, fees}`, `optionB` `{rate, term, fees}`, `currency`. The adapter
maps the two option objects to the engine's paired fields. Returns `monthlyA` (hero),
`monthlyB`, `totalInterestA/B`, `totalCostA/B`, `diffTotalCost`. For a single loan use
loan payment.

**`klar_calculate_employee_cost`** — `grossSalary` plus optional employer/recurring/
one-time cost fields (`employerContributionPct`, `insuranceCost`, `benefitsCost`,
`softwareCost`, `otherRecurringCost`, `equipmentCost`, `recruitmentCost`, `trainingCost`,
`otherOneTimeCost`, all default 0), `currency`. Returns `monthlyCost`, `annualCost`,
`firstYearTotal` (hero), `salaryShare` (%). Employer's cost — not take-home pay.

**`klar_calculate_freelance_rate`** — `desiredIncome`, `annualExpenses`, `taxReservePct`
(0), `nonBillablePct` (20), `vacationDays` (20), `sickDays` (5), `hoursPerWeek` (40),
`profitMarginPct` (0), `projectHours` (0), `currency`. Returns `minimumHourly`,
`recommendedHourly` (hero), `dailyRate`, `projectRate`, `billableHours`. Sets a rate from
an income goal — not a salary conversion, not employer cost.

**`klar_calculate_unit_conversion`** — `value`, `category` (`length` \| `weight` \|
`temperature` \| `area` \| `volume`), `fromUnit`, `toUnit` (both in the category, and
different). The adapter maps these to the engine's per-category fields and validates unit
membership against the engine's own option set. Returns `convertedValue` (hero, in the
target unit). Converts within one category only.

**`klar_calculate_gpa`** — `scale` (`4` \| `5`, default `4`), `courses` (1–6 of
`{grade, credits}`, `grade` a letter A+…F). The adapter maps `courses[]` to the engine's
slot fields. Returns `gpa` (hero), `totalCredits`, `totalPoints`. Computes an existing
GPA; to find a grade needed for a target use final grade.

**`klar_calculate_grade_average`** — `grades` (1–6 numbers, each 0–100). The adapter maps
`grades[]` to the engine's slot fields. Returns `average` (hero), `count`, `highest`,
`lowest`. Unweighted mean; for a credit-weighted GPA use the GPA tool.

### Health tools (Phase 3B)

Health tools return `estimate: true` and a `health` block (`method`, `usesProfile`,
`measurementUnits?`, `notMedicalAdvice: true`, a method-specific `disclaimer`). They are
screening estimates, never a diagnosis or individualized advice, and have no currency.

**`klar_calculate_bmi`** — `weight`, `weightUnit` (`kg`\|`lb`), `height`, `heightUnit`
(`cm`\|`m`). Returns `bmi` (hero) + healthy weight range (`healthyLow`/`healthyHigh`, in
kg). Method: WHO BMI 18.5–24.9. Not energy expenditure; not a healthy-range-from-height
tool by itself.

**`klar_calculate_ideal_weight`** — `height`, `heightUnit`. Returns `healthyLow` (hero),
`healthyHigh`, `midRange` (kg). Method: BMI-range only (no Devine/Robinson/Hamwi/frame/
sex). Not a current-weight classifier.

**`klar_calculate_bmr`** — `sex`, `age`, `weight`(+unit), `height`(+unit), `activity`.
Returns `bmr` (hero) + `tdee` (kcal/day). Method: Mifflin-St Jeor. Resting/maintenance
energy — not a dietary calorie target.

**`klar_calculate_calorie_intake`** — as BMR plus `goal` (`lose`\|`maintain`\|`gain`) and
`rate` (`slow`\|`moderate`\|`aggressive` → 250/500/750 kcal). Returns `targetCalories`
(hero), `bmr`, `tdee`. A dietary target, more than BMR/TDEE alone.

**`klar_calculate_body_fat`** — `sex`, `height`, `waist`, `neck`, `hip` (females). All in
cm (surfaced via `measurementUnits`; no conversion). Returns `bodyFatPct` (hero). Method:
US Navy tape. Not a BMI.

### Jurisdiction tools (Phase 3C-1)

Jurisdiction tools return `estimate: true` and a `jurisdiction` block (`country`,
`supportedCountries`, `currency`, `calculationPeriod`, `basis: "statutory"`,
`rulesSnapshot: true`, `legalNote`). **Country is required** and must be one of `jo, sa,
ae, kw, qa, bh, om` — any other value returns the engine's structured `country: "invalid"`
error. **Currency is derived from the country's rules** (jo→JOD, sa→SAR, ae→AED, …) and is
never an AI input. Rules are a fixed embedded snapshot — no live legislation lookup;
`legalNote` says so. These are statutory estimates, not legal/tax advice.

**`klar_calculate_maternity_leave`** — `country`. Returns `maternityDays` (hero),
`maternityWeeks`. Country lookup; not an annual leave balance.

**`klar_calculate_notice_period`** — `country`, `tenureYears`. Returns `noticeDays`
(hero), `noticeMonths`. Statutory notice by tenure; not leave, not gratuity.

**`klar_calculate_social_insurance`** — `country`, `monthlySalary`. Returns
`employeeShare` (hero), `employerShare`, `total`, `cappedBase`. Not income tax, not net pay.

**`klar_calculate_income_tax`** — `country`, `annualIncome`. Returns `taxAmount` (hero),
`effectiveRate`, `taxableIncome`. Annual tax only; not net pay, not social insurance.

**`klar_calculate_gross_to_net`** — `country`, `monthlyGross`. Returns `netMonthly`
(hero), `totalDeductions`, and each deduction (`socialInsurance`/`incomeTax`) in the
country's order. Not a salary-period conversion, not employer cost.

**`klar_calculate_end_of_service`** — `country`, `startDate`, `endDate`, `monthlyBasic`,
`endType` (`terminated`\|`voluntary`, default `terminated`). Returns `gratuity` (hero),
`days`, `years`. `jurisdiction.employmentEndType` echoes the branch; `calculationPeriod:
"total"`. Contract types (limited/unlimited) are not modelled. Not a salary, not
gross-to-net, not notice period.

**`klar_calculate_leave_balance`** — `mode` (`statutory`\|`manual`). `statutory`:
`country` + `tenureYears`; `manual`: `annualEntitlement` (no country). Plus `startDate`,
`calcDate`, `leaveTaken` (0), `approvedCarryover` (0), `accrualMethod` (`monthly`\|`daily`
\|`full`), `maxCarryover?`. Returns accrued/used/available/remaining/carryover/expired
(days); `annualEntitlement` in statutory mode. `basis` is `statutory` (country) or
`formulaic` (manual). Not maternity, not notice, not end-of-service.

**`klar_calculate_overtime_pay`** — `mode` (`statutory`\|`manual`), `basis`
(`monthly`\|`hourly`) with `monthlySalary`/`hourlyRate`, `weeklyHours` (40),
`overtimeHours`. `statutory`: `country` + `otKind`; `manual`: `multiplier`
(+`customMultiplier`). Returns `baseHourly`, `overtimeRate` (per hour), `overtimeEarnings`
(hero, **per week**), `totalEarnings` (per week). Overtime figures are WEEKLY — not
monthly/total, not a salary conversion, not employer cost, not gross-to-net.

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
      "displayValue": "1800 USD", "monetary": true, "currency": "USD", "kind": "currency" }
  ],
  "assumptions": ["Debt payments and income represent the same time period."],
  "limitations": ["Does not compute loan payments, interest, or amortization."],
  "metadata": { "currency": "USD", "period": "Debt and income must use the same period (e.g. both monthly)." },
  "raw": { "results": [ { "key": "dtiRatio", "value": 28.000000000000004, "kind": "percent", "hero": true }, "..." ] }
}
```

`value` is authoritative and exact; `displayValue` is display-only. `raw.results`
(and `raw.table` where present) is the calculator's own `CalcOutput`.

**Monetary values.** A money amount carries `monetary: true`. If `currency` is also
present the currency is known (the calculator has a currency input); if `monetary` is
true but `currency` is absent, the amount is currency-denominated but the currency is
**unspecified** — do not assume USD/EUR/etc, and `displayValue` is a bare number. Tools
without a currency input (`markup-margin`, `break-even`, `selling-price-from-markup`)
return `monetary: true` with no `currency`. Non-monetary answers (percentages, counts)
omit `monetary`.

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
Desktop; the thirty-six `klar_calculate_*` tools then appear.

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

- Only the thirty-six tools above.
- No public HTTP API (MCP/stdio only).
- No persistent storage — calculations are ephemeral; no user input is stored.
- No changes to the website, its URLs, SEO, i18n, or AdSense.
