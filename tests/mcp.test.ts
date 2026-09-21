import { test } from 'node:test';
import assert from 'node:assert/strict';
import { runCalculator, toCalcInput } from '../src/mcp/adapter.ts';
import { tools } from '../src/mcp/tools.ts';
import { toAIResult } from '../src/mcp/ai-contract.ts';
import { getMath } from '../src/lib/calculators/index.ts';

/** Build the AI contract exactly as the server does: engine result + wrapper. */
function aiFor(name: string, input: Record<string, unknown>) {
  const tool = tools.find((t) => t.name === name);
  if (!tool) throw new Error(`no tool: ${name}`);
  return toAIResult(tool, runCalculator(tool.slug, input), input);
}

/** One valid input per exposed tool, for structure/parity tests. */
const AI_VALID: Record<string, Record<string, unknown>> = {
  klar_calculate_loan_payment: { principal: 100000, annualRate: 5, term: 10, termUnit: 'years', downPayment: 0, fees: 0, currency: 'USD' },
  klar_calculate_mortgage: { price: 200000, downPayment: 40000, annualRate: 5, term: 20, termUnit: 'years', fees: 0, currency: 'USD' },
  klar_calculate_compound_interest: { initial: 5000, contribution: 200, contributionFrequency: 'monthly', annualRate: 7, compoundingFrequency: 'monthly', years: 20, currency: 'USD' },
  klar_calculate_vat: { amount: 100, vatRate: 15, direction: 'add', currency: 'USD' },
  klar_calculate_discount: { mode: 'afterDiscount', original: 250, discountPct: 20, currency: 'USD' },
  klar_calculate_markup_margin: { cost: 100, sellingPrice: 125 },
  klar_calculate_break_even: { fixedCosts: 10000, unitPrice: 50, unitVariableCost: 30 },
  klar_calculate_debt_to_income: { monthlyDebt: 700, grossIncome: 2500, currency: 'USD' },
  klar_calculate_selling_price_from_markup: { cost: 100, markupPct: 25 },
  klar_calculate_tip: { billAmount: 80, tipPercent: 15, people: 1, currency: 'USD' },
  klar_calculate_age: { birthDate: '2000-01-01', asOfDate: '2024-01-01' },
  klar_calculate_date_difference: { startDate: '2020-01-01', endDate: '2024-01-01' },
  klar_calculate_final_grade_needed: { currentGrade: 80, finalWeight: 30, targetGrade: 85 },
  klar_calculate_loan_early_payoff: { principal: 20000, annualRate: 6, term: 5, termUnit: 'years', extraMonthly: 100, currency: 'USD' },
  klar_calculate_savings_goal: { target: 120000, currentSavings: 10000, annualReturn: 5, years: 10, contributionFrequency: 'monthly', currency: 'USD' },
};

/* ------------------------------------------------------------------ */
/* Tool registry                                                       */
/* ------------------------------------------------------------------ */

test('mcp: exposes exactly the fifteen tools mapped to real slugs', () => {
  const byName = Object.fromEntries(tools.map((t) => [t.name, t.slug]));
  assert.deepEqual(byName, {
    klar_calculate_loan_payment: 'loan-payment',
    klar_calculate_mortgage: 'mortgage',
    klar_calculate_compound_interest: 'compound-interest',
    klar_calculate_vat: 'vat',
    klar_calculate_discount: 'discount-percentage',
    klar_calculate_markup_margin: 'markup-margin',
    klar_calculate_break_even: 'break-even',
    klar_calculate_debt_to_income: 'debt-to-income',
    klar_calculate_selling_price_from_markup: 'wholesale-retail',
    klar_calculate_tip: 'tip',
    klar_calculate_age: 'age',
    klar_calculate_date_difference: 'date-difference',
    klar_calculate_final_grade_needed: 'final-grade-planner',
    klar_calculate_loan_early_payoff: 'early-payoff',
    klar_calculate_savings_goal: 'savings-goal',
  });
  assert.equal(tools.length, 15);
  // Every tool slug resolves to a real engine, and every tool has an input schema.
  for (const t of tools) {
    assert.ok(getMath(t.slug), `slug missing: ${t.slug}`);
    assert.ok(t.inputSchema && Object.keys(t.inputSchema).length > 0, `no inputSchema: ${t.name}`);
  }
});

/* ------------------------------------------------------------------ */
/* Parity: adapter output === engine output (proves reuse)             */
/* ------------------------------------------------------------------ */

test('mcp: loan result is identical to the loan engine output (parity)', () => {
  const input = { principal: 100000, annualRate: 5, term: 10, termUnit: 'years', downPayment: 10000, fees: 500, currency: 'JOD' };
  const res = runCalculator('loan-payment', input);
  assert.equal(res.success, true);
  const direct = getMath('loan-payment').calculate(toCalcInput(input));
  assert.deepEqual(res.success && res.result, direct);
});

test('mcp: mortgage result is identical to the mortgage engine output (parity)', () => {
  const input = { price: 200000, downPayment: 40000, annualRate: 5, term: 20, termUnit: 'years', fees: 1000, currency: 'JOD' };
  const res = runCalculator('mortgage', input);
  assert.equal(res.success, true);
  const direct = getMath('mortgage').calculate(toCalcInput(input));
  assert.deepEqual(res.success && res.result, direct);
});

test('mcp: compound result is identical to the compound engine output (parity)', () => {
  const input = { initial: 5000, contribution: 200, contributionFrequency: 'monthly', annualRate: 7, compoundingFrequency: 'monthly', years: 20, currency: 'USD' };
  const res = runCalculator('compound-interest', input);
  assert.equal(res.success, true);
  const direct = getMath('compound-interest').calculate(toCalcInput(input));
  assert.deepEqual(res.success && res.result, direct);
});

/* ------------------------------------------------------------------ */
/* Loan payment                                                        */
/* ------------------------------------------------------------------ */

test('loan: valid calculation returns a hero monthly payment', () => {
  const res = runCalculator('loan-payment', { principal: 100000, annualRate: 5, term: 10, termUnit: 'years', downPayment: 0, fees: 0 });
  assert.equal(res.success, true);
  if (!res.success) return;
  const hero = res.result.results.find((r) => r.hero);
  assert.equal(hero?.key, 'monthlyPayment');
  assert.ok((hero?.value ?? 0) > 0);
});

test('loan: missing/zero-ish invalid principal -> VALIDATION_ERROR on principal', () => {
  const res = runCalculator('loan-payment', { annualRate: 5, term: 10 });
  assert.equal(res.success, false);
  if (res.success) return;
  assert.equal(res.error.code, 'VALIDATION_ERROR');
  assert.equal(res.error.fields?.principal, 'required');
});

test('loan: interest rate above 100 is rejected', () => {
  const res = runCalculator('loan-payment', { principal: 1000, annualRate: 150, term: 10 });
  assert.equal(res.success, false);
  if (res.success) return;
  assert.equal(res.error.fields?.annualRate, 'max');
});

test('loan: term of 0 is below the allowed minimum', () => {
  const res = runCalculator('loan-payment', { principal: 1000, annualRate: 5, term: 0 });
  assert.equal(res.success, false);
  if (res.success) return;
  assert.equal(res.error.fields?.term, 'min');
});

test('loan: down payment >= principal is rejected (cross-field rule reused)', () => {
  const res = runCalculator('loan-payment', { principal: 1000, annualRate: 5, term: 10, downPayment: 1000 });
  assert.equal(res.success, false);
  if (res.success) return;
  assert.equal(res.error.fields?.downPayment, 'max');
});

test('loan: boundary — 0% interest gives payment = amount / months', () => {
  const res = runCalculator('loan-payment', { principal: 12000, annualRate: 0, term: 1, termUnit: 'years', downPayment: 0, fees: 0 });
  assert.equal(res.success, true);
  if (!res.success) return;
  const monthly = res.result.results.find((r) => r.key === 'monthlyPayment')?.value ?? 0;
  assert.ok(Math.abs(monthly - 1000) < 1e-6, `got ${monthly}`);
});

/* ------------------------------------------------------------------ */
/* Mortgage                                                            */
/* ------------------------------------------------------------------ */

test('mortgage: valid calculation exposes loanAmount and monthly payment', () => {
  const res = runCalculator('mortgage', { price: 200000, downPayment: 40000, annualRate: 5, term: 20, fees: 0 });
  assert.equal(res.success, true);
  if (!res.success) return;
  const keys = res.result.results.map((r) => r.key);
  assert.ok(keys.includes('loanAmount'));
  assert.ok(keys.includes('monthlyPayment'));
});

test('mortgage: down payment >= price is rejected', () => {
  const res = runCalculator('mortgage', { price: 100000, downPayment: 100000, annualRate: 5, term: 20 });
  assert.equal(res.success, false);
  if (res.success) return;
  assert.equal(res.error.fields?.downPayment, 'max');
});

test('mortgage: negative price is rejected', () => {
  const res = runCalculator('mortgage', { price: -1, downPayment: 0, annualRate: 5, term: 20 });
  assert.equal(res.success, false);
  if (res.success) return;
  assert.equal(res.error.fields?.price, 'min');
});

/* ------------------------------------------------------------------ */
/* Compound interest                                                   */
/* ------------------------------------------------------------------ */

test('compound: valid calculation returns final balance as hero', () => {
  const res = runCalculator('compound-interest', { initial: 5000, contribution: 200, annualRate: 7, years: 20 });
  assert.equal(res.success, true);
  if (!res.success) return;
  const hero = res.result.results.find((r) => r.hero);
  assert.equal(hero?.key, 'finalBalance');
  assert.ok((hero?.value ?? 0) > 5000);
});

test('compound: invalid compounding frequency is rejected', () => {
  const res = runCalculator('compound-interest', { initial: 5000, contribution: 200, annualRate: 7, years: 20, compoundingFrequency: 'weekly' });
  assert.equal(res.success, false);
  if (res.success) return;
  assert.equal(res.error.fields?.compoundingFrequency, 'invalid');
});

test('compound: years below minimum is rejected', () => {
  const res = runCalculator('compound-interest', { initial: 5000, contribution: 200, annualRate: 7, years: 0 });
  assert.equal(res.success, false);
  if (res.success) return;
  assert.equal(res.error.fields?.years, 'min');
});

/* ------------------------------------------------------------------ */
/* Adapter guards                                                      */
/* ------------------------------------------------------------------ */

test('adapter: unknown slug returns a structured UNKNOWN_CALCULATOR error', () => {
  const res = runCalculator('does-not-exist', {});
  assert.equal(res.success, false);
  if (res.success) return;
  assert.equal(res.error.code, 'UNKNOWN_CALCULATOR');
});

/* ------------------------------------------------------------------ */
/* Schema shape for the five added tools                               */
/* ------------------------------------------------------------------ */

test('mcp: added tools expose the expected input fields', () => {
  const shape = (name: string) => {
    const t = tools.find((x) => x.name === name);
    assert.ok(t, `tool missing: ${name}`);
    return Object.keys(t.inputSchema).sort();
  };
  assert.deepEqual(shape('klar_calculate_vat'), ['amount', 'currency', 'direction', 'vatRate']);
  assert.deepEqual(shape('klar_calculate_markup_margin'), ['cost', 'sellingPrice']);
  assert.deepEqual(shape('klar_calculate_break_even'), ['fixedCosts', 'unitPrice', 'unitVariableCost']);
  assert.deepEqual(shape('klar_calculate_debt_to_income'), ['currency', 'grossIncome', 'monthlyDebt']);
  assert.deepEqual(shape('klar_calculate_selling_price_from_markup'), ['cost', 'markupPct']);
  assert.deepEqual(shape('klar_calculate_tip'), ['billAmount', 'currency', 'people', 'tipPercent']);
  assert.deepEqual(shape('klar_calculate_age'), ['asOfDate', 'birthDate']);
  assert.deepEqual(shape('klar_calculate_date_difference'), ['endDate', 'startDate']);
  assert.deepEqual(shape('klar_calculate_final_grade_needed'), ['currentGrade', 'finalWeight', 'targetGrade']);
  assert.deepEqual(shape('klar_calculate_loan_early_payoff'), ['annualRate', 'currency', 'extraMonthly', 'principal', 'term', 'termUnit']);
  assert.deepEqual(shape('klar_calculate_savings_goal'), ['annualReturn', 'contributionFrequency', 'currency', 'currentSavings', 'target', 'years']);
  assert.ok(shape('klar_calculate_discount').includes('mode'));
});

/* ------------------------------------------------------------------ */
/* Batch 1 Class-A additions: age / date-difference / final-grade /    */
/* early-payoff / savings-goal                                         */
/* ------------------------------------------------------------------ */

test('age: 2000-01-01 to 2024-01-01 is 24 years (hero)', () => {
  const res = runCalculator('age', { birthDate: '2000-01-01', asOfDate: '2024-01-01' });
  assert.equal(res.success, true);
  if (!res.success) return;
  const hero = res.result.results.find((r) => r.hero);
  assert.equal(hero?.key, 'ageYears');
  assert.equal(hero?.value, 24);
});

test('age: birth date after as-of date is rejected', () => {
  const res = runCalculator('age', { birthDate: '2030-01-01', asOfDate: '2024-01-01' });
  assert.equal(res.success, false);
  if (res.success) return;
  assert.equal(res.error.fields?.birthDate, 'max');
});

test('age: missing birth date is required', () => {
  const res = runCalculator('age', {});
  assert.equal(res.success, false);
  if (res.success) return;
  assert.equal(res.error.fields?.birthDate, 'required');
});

test('date-difference: 2020-01-01 to 2024-01-01 is 4 years (hero)', () => {
  const res = runCalculator('date-difference', { startDate: '2020-01-01', endDate: '2024-01-01' });
  assert.equal(res.success, true);
  if (!res.success) return;
  const hero = res.result.results.find((r) => r.hero);
  assert.equal(hero?.key, 'years');
  assert.equal(hero?.value, 4);
});

test('date-difference: end before start is rejected', () => {
  const res = runCalculator('date-difference', { startDate: '2024-01-01', endDate: '2020-01-01' });
  assert.equal(res.success, false);
  if (res.success) return;
  assert.equal(res.error.fields?.endDate, 'max');
});

test('final-grade-needed: current 80, weight 30%, target 85 -> required 96.6667 (hero)', () => {
  const res = runCalculator('final-grade-planner', { currentGrade: 80, finalWeight: 30, targetGrade: 85 });
  assert.equal(res.success, true);
  if (!res.success) return;
  const hero = res.result.results.find((r) => r.hero);
  assert.equal(hero?.key, 'requiredFinal');
  assert.ok(Math.abs((hero?.value ?? 0) - 96.66666666666667) < 1e-9, `got ${hero?.value}`);
});

test('final-grade-needed: weight below 1 is rejected', () => {
  const res = runCalculator('final-grade-planner', { currentGrade: 80, finalWeight: 0, targetGrade: 85 });
  assert.equal(res.success, false);
  if (res.success) return;
  assert.equal(res.error.fields?.finalWeight, 'min');
});

test('loan-early-payoff: extra payment shortens the term and returns baseline payment as hero', () => {
  const res = runCalculator('early-payoff', { principal: 20000, annualRate: 6, term: 5, termUnit: 'years', extraMonthly: 100 });
  assert.equal(res.success, true);
  if (!res.success) return;
  const hero = res.result.results.find((r) => r.hero);
  assert.equal(hero?.key, 'baselinePayment');
  const baseM = res.result.results.find((r) => r.key === 'baselineMonths')?.value ?? 0;
  const newM = res.result.results.find((r) => r.key === 'newMonths')?.value ?? 0;
  assert.ok(newM < baseM, `newMonths ${newM} should be < baselineMonths ${baseM}`);
});

test('loan-early-payoff: missing principal is required', () => {
  const res = runCalculator('early-payoff', { annualRate: 6, term: 5 });
  assert.equal(res.success, false);
  if (res.success) return;
  assert.equal(res.error.fields?.principal, 'required');
});

test('savings-goal: returns required contribution as hero', () => {
  const res = runCalculator('savings-goal', { target: 120000, currentSavings: 10000, annualReturn: 5, years: 10, contributionFrequency: 'monthly' });
  assert.equal(res.success, true);
  if (!res.success) return;
  const hero = res.result.results.find((r) => r.hero);
  assert.equal(hero?.key, 'requiredContribution');
  assert.ok((hero?.value ?? 0) > 0);
});

test('savings-goal: invalid contribution frequency is rejected', () => {
  const res = runCalculator('savings-goal', { target: 120000, currentSavings: 10000, annualReturn: 5, years: 10, contributionFrequency: 'weekly' });
  assert.equal(res.success, false);
  if (res.success) return;
  assert.equal(res.error.fields?.contributionFrequency, 'invalid');
});

test('ai: batch-1 additions expose correct hero, labels, and monetary semantics', () => {
  // Non-monetary tools: dates + grades carry units, not monetary.
  const age = aiFor('klar_calculate_age', AI_VALID.klar_calculate_age);
  const ageHero = age.answers.find((a) => a.hero);
  assert.equal(ageHero?.key, 'ageYears');
  assert.equal(ageHero?.label, 'Age in completed years');
  assert.equal(ageHero?.unit, 'years');
  assert.equal(ageHero?.monetary, undefined);

  const dd = aiFor('klar_calculate_date_difference', AI_VALID.klar_calculate_date_difference);
  assert.equal(dd.answers.find((a) => a.hero)?.key, 'years');
  assert.ok(dd.answers.every((a) => a.monetary === undefined), 'date-difference has no monetary answers');

  const fg = aiFor('klar_calculate_final_grade_needed', AI_VALID.klar_calculate_final_grade_needed);
  const fgHero = fg.answers.find((a) => a.hero);
  assert.equal(fgHero?.key, 'requiredFinal');
  assert.ok(fgHero?.note && /clamp/i.test(fgHero.note), 'requiredFinal note about clamping');

  // Monetary tools with a currency input: monetary + currency present.
  const ep = aiFor('klar_calculate_loan_early_payoff', AI_VALID.klar_calculate_loan_early_payoff);
  const epHero = ep.answers.find((a) => a.hero);
  assert.equal(epHero?.key, 'baselinePayment');
  assert.equal(epHero?.monetary, true);
  assert.equal(epHero?.currency, 'USD');
  // months answers are counts, not monetary.
  assert.equal(ep.answers.find((a) => a.key === 'baselineMonths')?.monetary, undefined);

  const sg = aiFor('klar_calculate_savings_goal', AI_VALID.klar_calculate_savings_goal);
  const sgHero = sg.answers.find((a) => a.hero);
  assert.equal(sgHero?.key, 'requiredContribution');
  assert.equal(sgHero?.monetary, true);
  assert.equal(sgHero?.currency, 'USD');
  const periods = sg.answers.find((a) => a.key === 'completionMonths');
  assert.equal(periods?.unit, 'periods');
  assert.ok(periods?.note && /period/i.test(periods.note), 'completionMonths note clarifies periods');
});

/* ------------------------------------------------------------------ */
/* Parity: added tools vs their engines (proves reuse, no copied math) */
/* ------------------------------------------------------------------ */

for (const { slug, input } of [
  { slug: 'vat', input: { amount: 120, vatRate: 15, direction: 'remove', currency: 'USD' } },
  { slug: 'discount-percentage', input: { mode: 'afterDiscount', original: 250, discountPct: 20, currency: 'USD' } },
  { slug: 'markup-margin', input: { cost: 80, sellingPrice: 120 } },
  { slug: 'break-even', input: { fixedCosts: 10000, unitPrice: 50, unitVariableCost: 30 } },
  { slug: 'debt-to-income', input: { monthlyDebt: 700, grossIncome: 2500, currency: 'USD' } },
  { slug: 'wholesale-retail', input: { cost: 100, markupPct: 25 } },
  { slug: 'tip', input: { billAmount: 80, tipPercent: 15, people: 4, currency: 'USD' } },
  { slug: 'age', input: { birthDate: '2000-01-01', asOfDate: '2024-06-15' } },
  { slug: 'date-difference', input: { startDate: '2020-01-01', endDate: '2024-03-10' } },
  { slug: 'final-grade-planner', input: { currentGrade: 80, finalWeight: 30, targetGrade: 85 } },
  { slug: 'early-payoff', input: { principal: 20000, annualRate: 6, term: 5, termUnit: 'years', extraMonthly: 100, currency: 'USD' } },
  { slug: 'savings-goal', input: { target: 120000, currentSavings: 10000, annualReturn: 5, years: 10, contributionFrequency: 'monthly', currency: 'USD' } },
] as const) {
  test(`mcp: ${slug} result is identical to its engine output (parity)`, () => {
    const res = runCalculator(slug, input);
    assert.equal(res.success, true);
    if (!res.success) return;
    const direct = getMath(slug).calculate(toCalcInput(input));
    assert.deepEqual(res.result, direct);
  });
}

/* ------------------------------------------------------------------ */
/* VAT                                                                 */
/* ------------------------------------------------------------------ */

test('vat: remove returns net below the gross amount', () => {
  const res = runCalculator('vat', { amount: 120, vatRate: 15, direction: 'remove' });
  assert.equal(res.success, true);
  if (!res.success) return;
  const net = res.result.results.find((r) => r.key === 'netAmount')?.value ?? 0;
  const gross = res.result.results.find((r) => r.key === 'grossAmount')?.value ?? 0;
  assert.ok(net < gross && net > 0, `net ${net} gross ${gross}`);
});

test('vat: add uses default direction and returns gross as hero', () => {
  const res = runCalculator('vat', { amount: 100, vatRate: 15 });
  assert.equal(res.success, true);
  if (!res.success) return;
  const hero = res.result.results.find((r) => r.hero);
  assert.equal(hero?.key, 'grossAmount');
});

test('vat: rate above 100 is rejected', () => {
  const res = runCalculator('vat', { amount: 100, vatRate: 150 });
  assert.equal(res.success, false);
  if (res.success) return;
  assert.equal(res.error.fields?.vatRate, 'max');
});

/* ------------------------------------------------------------------ */
/* Discount                                                            */
/* ------------------------------------------------------------------ */

test('discount: afterDiscount returns final price as hero', () => {
  const res = runCalculator('discount-percentage', { mode: 'afterDiscount', original: 250, discountPct: 20 });
  assert.equal(res.success, true);
  if (!res.success) return;
  const hero = res.result.results.find((r) => r.hero);
  assert.equal(hero?.key, 'finalPrice');
  assert.ok(Math.abs((hero?.value ?? 0) - 200) < 1e-9, `got ${hero?.value}`);
});

test('discount: missing required field for the chosen mode is rejected', () => {
  const res = runCalculator('discount-percentage', { mode: 'afterDiscount', original: 250 });
  assert.equal(res.success, false);
  if (res.success) return;
  assert.equal(res.error.fields?.discountPct, 'required');
});

/* ------------------------------------------------------------------ */
/* Markup / margin                                                     */
/* ------------------------------------------------------------------ */

test('markup-margin: returns both markup and margin percents', () => {
  const res = runCalculator('markup-margin', { cost: 100, sellingPrice: 125 });
  assert.equal(res.success, true);
  if (!res.success) return;
  const markup = res.result.results.find((r) => r.key === 'markupPct')?.value ?? 0;
  const margin = res.result.results.find((r) => r.key === 'marginPct')?.value ?? 0;
  assert.ok(Math.abs(markup - 25) < 1e-9, `markup ${markup}`);
  assert.ok(Math.abs(margin - 20) < 1e-9, `margin ${margin}`);
});

test('markup-margin: cost below minimum is rejected', () => {
  const res = runCalculator('markup-margin', { cost: 0, sellingPrice: 125 });
  assert.equal(res.success, false);
  if (res.success) return;
  assert.equal(res.error.fields?.cost, 'min');
});

/* ------------------------------------------------------------------ */
/* Break-even                                                          */
/* ------------------------------------------------------------------ */

test('break-even: computes units as hero', () => {
  const res = runCalculator('break-even', { fixedCosts: 10000, unitPrice: 50, unitVariableCost: 30 });
  assert.equal(res.success, true);
  if (!res.success) return;
  const hero = res.result.results.find((r) => r.hero);
  assert.equal(hero?.key, 'breakEvenUnits');
  assert.ok(Math.abs((hero?.value ?? 0) - 500) < 1e-9, `got ${hero?.value}`);
});

test('break-even: price not above variable cost is rejected', () => {
  const res = runCalculator('break-even', { fixedCosts: 10000, unitPrice: 30, unitVariableCost: 30 });
  assert.equal(res.success, false);
  if (res.success) return;
  assert.equal(res.error.fields?.unitPrice, 'invalid');
});

/* ------------------------------------------------------------------ */
/* Selling price from markup (wholesale-retail)                        */
/* ------------------------------------------------------------------ */

test('selling-price-from-markup: cost 100 + 25% markup = 125', () => {
  const res = runCalculator('wholesale-retail', { cost: 100, markupPct: 25 });
  assert.equal(res.success, true);
  if (!res.success) return;
  const hero = res.result.results.find((r) => r.hero);
  assert.equal(hero?.key, 'sellingPrice');
  assert.ok(Math.abs((hero?.value ?? 0) - 125) < 1e-9, `got ${hero?.value}`);
});

test('selling-price-from-markup: cost 80 + 25% markup = 100', () => {
  const res = runCalculator('wholesale-retail', { cost: 80, markupPct: 25 });
  assert.equal(res.success, true);
  if (!res.success) return;
  const selling = res.result.results.find((r) => r.key === 'sellingPrice')?.value ?? 0;
  assert.ok(Math.abs(selling - 100) < 1e-9, `got ${selling}`);
});

test('selling-price-from-markup: missing cost is required (engine rule)', () => {
  const res = runCalculator('wholesale-retail', { markupPct: 25 });
  assert.equal(res.success, false);
  if (res.success) return;
  assert.equal(res.error.fields?.cost, 'required');
});

test('selling-price-from-markup: markup above maximum is rejected (engine rule)', () => {
  const res = runCalculator('wholesale-retail', { cost: 100, markupPct: 5000 });
  assert.equal(res.success, false);
  if (res.success) return;
  assert.equal(res.error.fields?.markupPct, 'max');
});

test('ai: selling-price-from-markup returns canonical contract with correct semantics', () => {
  const ai = aiFor('klar_calculate_selling_price_from_markup', { cost: 100, markupPct: 25 });
  assert.equal(ai.success, true);
  const hero = ai.answers.find((a) => a.hero);
  assert.equal(hero?.key, 'sellingPrice');
  assert.equal(hero?.label, 'Selling price');
  assert.equal(hero?.value, 125);
  // Monetary but no currency input -> kind is 'currency', no fake code attached.
  assert.equal(hero?.kind, 'currency');
  assert.equal(hero?.currency, undefined);
  assert.equal(ai.metadata?.currency, undefined);
  // Limitation: markup, not margin. Assumption: markup relative to cost.
  assert.ok(ai.limitations.some((l) => /markup percent, not from a profit margin/i.test(l)), JSON.stringify(ai.limitations));
  assert.ok(ai.assumptions.some((a) => /relative to cost/i.test(a)), JSON.stringify(ai.assumptions));
});

/* ------------------------------------------------------------------ */
/* Tip                                                                 */
/* ------------------------------------------------------------------ */

test('tip: bill 80 + 15%, 1 person -> tip 12, total 92, per person 92', () => {
  const res = runCalculator('tip', { billAmount: 80, tipPercent: 15, people: 1 });
  assert.equal(res.success, true);
  if (!res.success) return;
  const v = (k: string) => res.result.results.find((r) => r.key === k)?.value ?? NaN;
  assert.ok(Math.abs(v('tipAmount') - 12) < 1e-9, `tip ${v('tipAmount')}`);
  assert.ok(Math.abs(v('totalWithTip') - 92) < 1e-9, `total ${v('totalWithTip')}`);
  assert.ok(Math.abs(v('perPerson') - 92) < 1e-9, `perPerson ${v('perPerson')}`);
  assert.equal(res.result.results.find((r) => r.hero)?.key, 'tipAmount');
});

test('tip: bill 120 + 10%, 4 people -> tip 12, total 132, per person 33', () => {
  const res = runCalculator('tip', { billAmount: 120, tipPercent: 10, people: 4 });
  assert.equal(res.success, true);
  if (!res.success) return;
  const v = (k: string) => res.result.results.find((r) => r.key === k)?.value ?? NaN;
  assert.ok(Math.abs(v('tipAmount') - 12) < 1e-9, `tip ${v('tipAmount')}`);
  assert.ok(Math.abs(v('totalWithTip') - 132) < 1e-9, `total ${v('totalWithTip')}`);
  assert.ok(Math.abs(v('perPerson') - 33) < 1e-9, `perPerson ${v('perPerson')}`);
});

test('tip: bill 50 + 20%, 2 people -> tip 10, total 60, per person 30', () => {
  const res = runCalculator('tip', { billAmount: 50, tipPercent: 20, people: 2 });
  assert.equal(res.success, true);
  if (!res.success) return;
  const v = (k: string) => res.result.results.find((r) => r.key === k)?.value ?? NaN;
  assert.ok(Math.abs(v('tipAmount') - 10) < 1e-9, `tip ${v('tipAmount')}`);
  assert.ok(Math.abs(v('perPerson') - 30) < 1e-9, `perPerson ${v('perPerson')}`);
});

test('tip: missing bill amount is required', () => {
  const res = runCalculator('tip', { tipPercent: 15 });
  assert.equal(res.success, false);
  if (res.success) return;
  assert.equal(res.error.fields?.billAmount, 'required');
});

test('tip: tip percent above 100 is rejected (engine boundary)', () => {
  const res = runCalculator('tip', { billAmount: 80, tipPercent: 150 });
  assert.equal(res.success, false);
  if (res.success) return;
  assert.equal(res.error.fields?.tipPercent, 'max');
});

test('tip: fewer than 1 person is rejected (engine boundary)', () => {
  const res = runCalculator('tip', { billAmount: 80, tipPercent: 15, people: 0 });
  assert.equal(res.success, false);
  if (res.success) return;
  assert.equal(res.error.fields?.people, 'min');
});

test('ai: tip returns canonical contract with tipAmount hero and monetary answers', () => {
  const ai = aiFor('klar_calculate_tip', { billAmount: 80, tipPercent: 15, people: 1, currency: 'USD' });
  assert.equal(ai.success, true);
  const hero = ai.answers.find((a) => a.hero);
  assert.equal(hero?.key, 'tipAmount');
  assert.equal(hero?.label, 'Tip amount');
  assert.equal(hero?.value, 12);
  assert.equal(hero?.monetary, true);
  assert.equal(hero?.currency, 'USD');
  assert.ok(ai.answers.every((a) => a.monetary === true), 'all tip answers monetary');
  assert.ok(ai.assumptions.some((a) => /tip percent \/ 100|split equally/i.test(a)), JSON.stringify(ai.assumptions));
  assert.ok(ai.limitations.some((l) => /does not add or separate tax/i.test(l)), JSON.stringify(ai.limitations));
});

/* ------------------------------------------------------------------ */
/* Debt-to-income                                                      */
/* ------------------------------------------------------------------ */

test('debt-to-income: computes DTI percent as hero', () => {
  const res = runCalculator('debt-to-income', { monthlyDebt: 700, grossIncome: 2500 });
  assert.equal(res.success, true);
  if (!res.success) return;
  const hero = res.result.results.find((r) => r.hero);
  assert.equal(hero?.key, 'dtiRatio');
  assert.ok(Math.abs((hero?.value ?? 0) - 28) < 1e-9, `got ${hero?.value}`);
});

test('debt-to-income: zero gross income is rejected', () => {
  const res = runCalculator('debt-to-income', { monthlyDebt: 700, grossIncome: 0 });
  assert.equal(res.success, false);
  if (res.success) return;
  assert.equal(res.error.fields?.grossIncome, 'min');
});

/* ================================================================== */
/* AI-native contract layer                                            */
/* ================================================================== */

/* A. Contract structure — every tool returns the canonical AI shape.  */
test('ai: every tool returns the canonical AI contract', () => {
  for (const [name, input] of Object.entries(AI_VALID)) {
    const ai = aiFor(name, input);
    assert.equal(ai.success, true, `${name} success`);
    assert.ok(ai.calculator.slug && ai.calculator.name && ai.calculator.category, `${name} calculator meta`);
    assert.ok(Array.isArray(ai.answers) && ai.answers.length > 0, `${name} answers`);
    assert.ok(Array.isArray(ai.assumptions), `${name} assumptions`);
    assert.ok(Array.isArray(ai.limitations), `${name} limitations`);
    assert.ok(ai.raw && Array.isArray((ai.raw as { results: unknown[] }).results), `${name} raw`);
    for (const a of ai.answers) {
      assert.ok(a.key && a.label, `${name} answer key/label`);
      assert.equal(typeof a.displayValue, 'string', `${name} displayValue`);
    }
    // Round-trips as JSON (MCP text channel).
    assert.doesNotThrow(() => JSON.stringify(ai));
  }
});

/* B. Semantic labels. */
test('ai: important outputs carry meaningful labels (not raw keys)', () => {
  const dti = aiFor('klar_calculate_debt_to_income', AI_VALID.klar_calculate_debt_to_income);
  assert.equal(dti.answers.find((a) => a.key === 'dtiRatio')?.label, 'Debt-to-income ratio');
  const vat = aiFor('klar_calculate_vat', AI_VALID.klar_calculate_vat);
  assert.match(vat.answers.find((a) => a.key === 'grossAmount')?.label ?? '', /gross/i);
  const mort = aiFor('klar_calculate_mortgage', AI_VALID.klar_calculate_mortgage);
  assert.match(mort.answers.find((a) => a.key === 'loanAmount')?.label ?? '', /loan amount/i);
});

/* C. Units / currency explicit. */
test('ai: percentages, currency and unit answers are explicit', () => {
  const dti = aiFor('klar_calculate_debt_to_income', AI_VALID.klar_calculate_debt_to_income);
  const ratio = dti.answers.find((a) => a.key === 'dtiRatio');
  assert.equal(ratio?.unit, '%');
  assert.equal(ratio?.displayValue?.endsWith('%'), true);
  const loan = aiFor('klar_calculate_loan_payment', AI_VALID.klar_calculate_loan_payment);
  const pay = loan.answers.find((a) => a.key === 'monthlyPayment');
  assert.equal(pay?.currency, 'USD');
  assert.equal(loan.metadata?.currency, 'USD');
  const be = aiFor('klar_calculate_break_even', AI_VALID.klar_calculate_break_even);
  assert.equal(be.answers.find((a) => a.key === 'breakEvenUnits')?.unit, 'units');
});

/* C2. Monetary flag distinguishes known vs unspecified currency. */
test('ai: monetary amounts are flagged; currency present only when known', () => {
  // Known currency (has a currency input): monetary true AND currency set.
  const loan = aiFor('klar_calculate_loan_payment', AI_VALID.klar_calculate_loan_payment);
  const pay = loan.answers.find((a) => a.key === 'monthlyPayment');
  assert.equal(pay?.monetary, true);
  assert.equal(pay?.currency, 'USD');

  // Currency-less monetary tools: monetary true, NO currency code, bare displayValue.
  for (const [name, keys] of [
    ['klar_calculate_selling_price_from_markup', ['sellingPrice', 'profit']],
    ['klar_calculate_markup_margin', ['profit']],
    ['klar_calculate_break_even', ['breakEvenRevenue', 'contributionMargin']],
  ] as const) {
    const ai = aiFor(name, AI_VALID[name]);
    for (const k of keys) {
      const a = ai.answers.find((x) => x.key === k);
      assert.equal(a?.monetary, true, `${name}.${k} monetary`);
      assert.equal(a?.currency, undefined, `${name}.${k} no currency code`);
      // displayValue stays a bare number (no invented code) for currency-unknown.
      assert.equal(/[A-Za-z]/.test(a?.displayValue ?? ''), false, `${name}.${k} bare displayValue`);
    }
  }

  // Non-monetary answers are not flagged monetary.
  const dtiRatio = aiFor('klar_calculate_debt_to_income', AI_VALID.klar_calculate_debt_to_income).answers.find((a) => a.key === 'dtiRatio');
  assert.equal(dtiRatio?.monetary, undefined);
  const units = aiFor('klar_calculate_break_even', AI_VALID.klar_calculate_break_even).answers.find((a) => a.key === 'breakEvenUnits');
  assert.equal(units?.monetary, undefined);
});

/* D. Hero / primary answer. */
test('ai: primary answer is flagged as hero', () => {
  assert.equal(aiFor('klar_calculate_loan_payment', AI_VALID.klar_calculate_loan_payment).answers.find((a) => a.hero)?.key, 'monthlyPayment');
  assert.equal(aiFor('klar_calculate_debt_to_income', AI_VALID.klar_calculate_debt_to_income).answers.find((a) => a.hero)?.key, 'dtiRatio');
  assert.equal(aiFor('klar_calculate_vat', AI_VALID.klar_calculate_vat).answers.find((a) => a.hero)?.key, 'grossAmount');
});

/* E. Limitations exposed. */
test('ai: markup-margin exposes its forward-only limitation', () => {
  const ai = aiFor('klar_calculate_markup_margin', AI_VALID.klar_calculate_markup_margin);
  assert.ok(ai.limitations.some((l) => /forward-only|target (markup|margin)/i.test(l)), JSON.stringify(ai.limitations));
});

test('ai: break-even exposes its contribution-margin input limitation', () => {
  const ai = aiFor('klar_calculate_break_even', AI_VALID.klar_calculate_break_even);
  assert.ok(ai.limitations.some((l) => /contribution margin/i.test(l)), JSON.stringify(ai.limitations));
});

/* F. Assumptions exposed. */
test('ai: debt-to-income exposes the same-period assumption', () => {
  const ai = aiFor('klar_calculate_debt_to_income', AI_VALID.klar_calculate_debt_to_income);
  assert.ok(ai.assumptions.some((a) => /same (time )?period/i.test(a)), JSON.stringify(ai.assumptions));
  assert.match(ai.metadata?.period ?? '', /same period/i);
});

test('ai: vat/discount surface the chosen direction/mode as an assumption', () => {
  const vat = aiFor('klar_calculate_vat', { amount: 120, vatRate: 15, direction: 'remove' });
  assert.ok(vat.assumptions.some((a) => /Direction: remove/.test(a)));
  const disc = aiFor('klar_calculate_discount', AI_VALID.klar_calculate_discount);
  assert.ok(disc.assumptions.some((a) => /Mode: afterDiscount/.test(a)));
});

/* G. Exact parity — AI values equal the engine's, unchanged. */
test('ai: enriched values exactly match the engine output (parity)', () => {
  for (const [name, input] of Object.entries(AI_VALID)) {
    const tool = tools.find((t) => t.name === name)!;
    const engine = getMath(tool.slug).calculate(toCalcInput(input));
    const ai = aiFor(name, input);
    // raw is the untouched engine result.
    assert.deepEqual((ai.raw as { results: unknown }).results, engine.results, `${name} raw parity`);
    // Every answer value equals the engine value for the same key, exactly.
    for (const a of ai.answers) {
      const eng = engine.results.find((r) => r.key === a.key);
      assert.equal(a.value, eng?.value, `${name} ${a.key} value parity`);
    }
  }
});

/* H. Error behavior preserved through the AI layer. */
test('ai: missing input yields a structured error, no invented answers', () => {
  const ai = aiFor('klar_calculate_debt_to_income', { monthlyDebt: 700 });
  assert.equal(ai.success, false);
  assert.equal(ai.answers.length, 0);
  assert.equal(ai.error?.code, 'VALIDATION_ERROR');
  assert.equal(ai.error?.fields?.grossIncome, 'required');
  // Limitations still travel with a failed call so the agent keeps context.
  assert.ok(ai.limitations.length > 0);
});
