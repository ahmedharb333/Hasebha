import { test } from 'node:test';
import assert from 'node:assert/strict';
import { runCalculator, toCalcInput } from '../src/mcp/adapter.ts';
import { tools } from '../src/mcp/tools.ts';
import { getMath } from '../src/lib/calculators/index.ts';

/* ------------------------------------------------------------------ */
/* Tool registry                                                       */
/* ------------------------------------------------------------------ */

test('mcp: exposes exactly the three MVP tools mapped to real slugs', () => {
  const byName = Object.fromEntries(tools.map((t) => [t.name, t.slug]));
  assert.deepEqual(byName, {
    klar_calculate_loan_payment: 'loan-payment',
    klar_calculate_mortgage: 'mortgage',
    klar_calculate_compound_interest: 'compound-interest',
  });
  // Every tool slug resolves to a real engine.
  for (const t of tools) assert.ok(getMath(t.slug), `slug missing: ${t.slug}`);
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
