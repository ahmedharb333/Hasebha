# Klar MCP — Financial, labour-law & tax calculators for AI agents

**Give your AI agent exact, statutory-grade math for Jordan and the GCC — the numbers LLMs get wrong on their own.**

Klar is a remote [Model Context Protocol](https://modelcontextprotocol.io) server exposing 36 deterministic calculators over Streamable HTTP. Every result comes back with the answer, the assumptions used, and the limitations — so an agent can quote a figure *and* explain it.

- **Endpoint:** `https://mcp.worldly.pro/mcp`
- **Transport:** Streamable HTTP (stateless), Bearer auth
- **Tools:** 36
- **Storage:** none — stateless, no personal data retained, no logging of inputs

---

## Why it exists

Large language models are unreliable at exactly the calculations people most need to trust: end-of-service gratuity, income tax, social insurance, notice periods. These are governed by statute and vary by country. Klar answers them from rules, not guesses, for **Jordan, Saudi Arabia, UAE, Kuwait, Qatar, Bahrain, and Oman**, and returns the legal basis alongside the number.

It also covers the everyday finance, business, health, education, date and unit calculators an assistant reaches for constantly.

---

## Quick start

Add the server to any MCP client with a bearer token. A shared **public demo key** is provided so you can try it instantly (rate-limited; for production, request your own key at contact@worldly.pro):

```
klar-demo-ND8Qr5tHx2mv7bKf
```

**Claude Code**

```bash
claude mcp add --transport http --scope user klar https://mcp.worldly.pro/mcp \
  --header "Authorization: Bearer klar-demo-ND8Qr5tHx2mv7bKf"
```

**Generic client config**

```json
{
  "mcpServers": {
    "klar": {
      "type": "http",
      "url": "https://mcp.worldly.pro/mcp",
      "headers": { "Authorization": "Bearer klar-demo-ND8Qr5tHx2mv7bKf" }
    }
  }
}
```

Requests without a valid token return `401`.

---

## Example

Ask your agent: *"What's the end-of-service gratuity for a 7,500 JOD salary after 5 years in Jordan, on resignation?"*

The agent calls `klar_calculate_end_of_service` and gets back a structured result:

```json
{
  "calculator": { "slug": "end-of-service", "name": "End of service", "category": "jurisdiction" },
  "success": true,
  "answers": [
    { "label": "Gratuity", "value": 37500, "monetary": true, "currency": "JOD" }
  ],
  "assumptions": ["Continuous service", "Resignation end type"],
  "limitations": ["Statutory minimum only; contract terms may exceed it"],
  "jurisdiction": {
    "country": "jo",
    "currency": "JOD",
    "basis": "statutory",
    "legalNote": "Based on Jordanian Labour Law end-of-service provisions",
    "rulesSnapshot": true
  }
}
```

The number *and* the reasoning — ready to quote.

---

## The 36 tools

### Labour law, tax & payroll — Jordan + GCC (jo, sa, ae, kw, qa, bh, om)
The differentiator. Statutory results with legal basis.

| Tool | What it returns |
|---|---|
| `klar_calculate_end_of_service` | Statutory end-of-service gratuity |
| `klar_calculate_income_tax` | Annual statutory income tax |
| `klar_calculate_gross_to_net` | Monthly net pay from gross |
| `klar_calculate_social_insurance` | Employee/employer social-insurance contributions |
| `klar_calculate_notice_period` | Statutory notice period by tenure |
| `klar_calculate_maternity_leave` | Statutory maternity-leave entitlement |
| `klar_calculate_leave_balance` | Accrued & available annual leave |
| `klar_calculate_overtime_pay` | Weekly overtime pay (statutory or custom multiplier) |

### Finance & loans
`klar_calculate_loan_payment` · `klar_calculate_mortgage` · `klar_calculate_loan_early_payoff` · `klar_calculate_loan_comparison` · `klar_calculate_compound_interest` · `klar_calculate_savings_goal` · `klar_calculate_retirement_savings` · `klar_calculate_debt_to_income`

### Business & pricing
`klar_calculate_vat` · `klar_calculate_discount` · `klar_calculate_markup_margin` · `klar_calculate_selling_price_from_markup` · `klar_calculate_break_even` · `klar_calculate_employee_cost` · `klar_calculate_freelance_rate` · `klar_calculate_salary_converter` · `klar_calculate_tip`

### Health & fitness
`klar_calculate_bmi` · `klar_calculate_ideal_weight` · `klar_calculate_bmr` · `klar_calculate_calorie_intake` · `klar_calculate_body_fat`
*(Health tools return estimates with an explicit "not medical advice" note.)*

### Education
`klar_calculate_gpa` · `klar_calculate_grade_average` · `klar_calculate_final_grade_needed`

### Dates & units
`klar_calculate_age` · `klar_calculate_date_difference` · `klar_calculate_unit_conversion`

---

## Design principles

- **Deterministic.** Same input, same output. No model in the loop.
- **Transparent.** Every answer ships with assumptions and limitations.
- **Honest about scope.** Statutory tools mark their legal basis and note that contracts may exceed the statutory minimum. Health tools flag that they are estimates, not medical advice.
- **Private.** Stateless. Inputs are never stored or logged.

---

## Links

- Landing page: https://worldly.pro/agents/
- Contact: contact@worldly.pro

Built by [Worldly](https://worldly.pro).
