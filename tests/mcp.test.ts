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
};

/* ------------------------------------------------------------------ */
/* Tool registry                                                       */
/* ------------------------------------------------------------------ */

test('mcp: exposes exactly the nine tools mapped to real slugs', () => {
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
  });
  assert.equal(tools.length, 9);
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
  assert.ok(shape('klar_calculate_discount').includes('mode'));
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
