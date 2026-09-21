/**
 * Klar AI-native tool contract (v1).
 *
 * This layer owns AI-facing SEMANTICS only: labels, units, currency, explicit
 * primary answers, assumptions and capability limitations. It does NOT compute
 * anything — it wraps the untouched engine output produced by the adapter
 * (runCalculator), so the calculator engines remain the single source of truth.
 *
 * Pure, deterministic, JSON-serializable, no Astro/DOM/UI/browser dependencies.
 */
import type { CalcResponse } from './adapter.ts';
import type { ToolDef } from './tools.ts';

export interface AIAnswer {
  /** Engine result key (unchanged). */
  key: string;
  /** Human-readable semantic label. */
  label: string;
  /** Exact underlying value — never rounded, never lossy. */
  value: number | string | boolean;
  /** Display-only representation; the numeric `value` remains authoritative. */
  displayValue?: string;
  /** Unit symbol/word where applicable (e.g. "%", "units"). */
  unit?: string;
  /**
   * True when the value is a monetary amount. If `currency` is also set the
   * currency is known; if `monetary` is true but `currency` is absent, the
   * amount is currency-denominated but the currency is unspecified (the
   * calculator has no currency input) — never assume USD/EUR/etc.
   */
  monetary?: boolean;
  /** ISO currency code when the value is a monetary amount and a currency is known. */
  currency?: string;
  /** Engine value kind: 'currency' | 'percent' | 'number'. */
  kind?: string;
  /** True for the primary answer(s). */
  hero?: boolean;
  /** Optional per-answer clarification. */
  note?: string;
}

export interface AIError {
  code: string;
  message: string;
  /** fieldId -> code ('required' | 'invalid' | 'min' | 'max' | ...). */
  fields?: Record<string, string>;
}

export interface AICalculatorResult {
  calculator: { slug: string; name: string; category: string };
  success: boolean;
  answers: AIAnswer[];
  assumptions: string[];
  limitations: string[];
  metadata?: { currency?: string; country?: string; period?: string };
  /** Untouched engine output, for parity/debugging. */
  raw?: { results: unknown; table?: unknown };
  /** Structured error when success is false. */
  error?: AIError;
}

interface AILabel {
  label: string;
  /** Override the unit derived from kind (e.g. 'units' for a count). */
  unit?: string;
  note?: string;
}

interface AIMeta {
  category: string;
  /** Per-result-key semantics. Keys not listed fall back to a humanized key. */
  labels: Record<string, AILabel>;
  assumptions: string[];
  limitations: string[];
  /** Human note about the time basis, when it matters. */
  period?: string;
}

/**
 * Per-calculator AI metadata for the 8 currently exposed tools. This is the
 * only place AI-facing labels/assumptions/limitations live.
 */
export const AI_META: Record<string, AIMeta> = {
  'loan-payment': {
    category: 'loans',
    labels: {
      monthlyPayment: { label: 'Monthly payment' },
      totalPaid: { label: 'Total paid over the term' },
      totalInterest: { label: 'Total interest' },
      totalFees: { label: 'Total fees' },
      effectiveTotalCost: { label: 'Effective total cost (payments + fees)' },
    },
    assumptions: [
      'Fixed interest rate for the entire term.',
      'Equal periodic payments (fully amortizing).',
    ],
    limitations: ['Does not determine whether the loan is financially advisable.'],
    period: 'Payment is per month; term is interpreted with termUnit.',
  },
  mortgage: {
    category: 'loans',
    labels: {
      loanAmount: { label: 'Loan amount (price minus down payment)' },
      monthlyPayment: { label: 'Monthly payment' },
      totalInterest: { label: 'Total interest' },
      totalPaid: { label: 'Total paid over the term' },
      effectiveTotalCost: { label: 'Effective total cost (payments + fees)' },
    },
    assumptions: [
      'Fixed interest rate for the entire term.',
      'Equal monthly payments (fully amortizing).',
      'Loan amount = price − down payment.',
    ],
    limitations: ['Does not assess affordability or lending eligibility.'],
    period: 'Monthly payment; term interpreted with termUnit.',
  },
  'compound-interest': {
    category: 'savings-investing',
    labels: {
      finalBalance: { label: 'Final balance (future value)' },
      totalContributions: { label: 'Total contributions' },
      totalInterest: { label: 'Total interest earned' },
    },
    assumptions: [
      'Constant annual rate throughout.',
      'Contributions added every contribution period; interest reinvested.',
    ],
    limitations: ['Does not forecast actual investment performance.'],
  },
  vat: {
    category: 'tax',
    labels: {
      netAmount: { label: 'Net amount (before VAT)' },
      vatAmount: { label: 'VAT amount' },
      grossAmount: { label: 'Gross amount (including VAT)' },
    },
    assumptions: ['A single VAT rate is applied.'],
    limitations: [
      'Does not handle mixed or tiered tax rates.',
      'Does not compute discount, markup, or profit margin.',
    ],
  },
  'discount-percentage': {
    category: 'pricing',
    labels: {
      finalPrice: { label: 'Final price' },
      discountAmount: { label: 'Discount amount' },
      discountPct: { label: 'Discount percent' },
      originalPrice: { label: 'Original price' },
      change: { label: 'Percent change' },
      difference: { label: 'Difference' },
      percentDifference: { label: 'Percent difference' },
    },
    assumptions: [],
    limitations: [
      'Does not add or remove VAT.',
      'Does not compute markup or profit margin.',
    ],
  },
  'markup-margin': {
    category: 'pricing',
    labels: {
      profit: { label: 'Profit (selling price − cost)' },
      markupPct: { label: 'Markup percent (profit / cost)' },
      marginPct: { label: 'Profit margin percent (profit / selling price)' },
    },
    assumptions: [
      'Profit = selling price − cost.',
      'Markup % = profit / cost; margin % = profit / selling price.',
    ],
    limitations: [
      'Forward-only: does not solve for selling price from a target markup or margin.',
      'Does not compute discounts or VAT.',
    ],
  },
  'break-even': {
    category: 'business',
    labels: {
      breakEvenUnits: { label: 'Break-even units', unit: 'units' },
      breakEvenRevenue: { label: 'Break-even revenue' },
      contributionMargin: { label: 'Contribution margin per unit' },
    },
    assumptions: [
      'Contribution margin per unit = unit price − unit variable cost.',
      'Linear costs and a single product.',
    ],
    limitations: [
      'Does not accept a contribution margin directly; requires unit price and unit variable cost.',
      'Requires unit price greater than unit variable cost.',
    ],
  },
  'debt-to-income': {
    category: 'personal-finance',
    labels: {
      dtiRatio: { label: 'Debt-to-income ratio' },
      remainingIncome: { label: 'Remaining income after debt' },
    },
    assumptions: ['Debt payments and income represent the same time period.'],
    limitations: ['Does not compute loan payments, interest, or amortization.'],
    period: 'Debt and income must use the same period (e.g. both monthly).',
  },
  'wholesale-retail': {
    category: 'pricing',
    labels: {
      sellingPrice: { label: 'Selling price' },
      profit: { label: 'Profit (selling price − cost)' },
    },
    assumptions: [
      'Markup percent is calculated relative to cost.',
      'Selling price = cost × (1 + markup% / 100).',
    ],
    limitations: [
      'Calculates selling price from a markup percent, not from a profit margin percent.',
      'Does not compute markup or margin from an existing selling price.',
    ],
  },
};

/** Turn a camelCase/snake key into a readable fallback label. */
function humanize(key: string): string {
  const spaced = key
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .trim();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

/** Display-only formatting; never mutates the authoritative numeric value. */
function formatDisplay(value: number, kind: string | undefined, unit: string | undefined, currency: string | undefined): string {
  const trimmed = Number.isInteger(value) ? String(value) : String(Number(value.toFixed(4)));
  if (kind === 'percent') return `${trimmed}%`;
  if (kind === 'currency') return currency ? `${trimmed} ${currency}` : trimmed;
  if (unit) return `${trimmed} ${unit}`;
  return trimmed;
}

/**
 * Wrap the adapter's engine output in the canonical AI contract.
 * `input` is the raw tool arguments (used only for metadata like currency).
 */
export function toAIResult(tool: ToolDef, response: CalcResponse, input: Record<string, unknown>): AICalculatorResult {
  const meta = AI_META[tool.slug];
  const category = meta?.category ?? 'general';
  const currencyRaw = input.currency;
  const currency = typeof currencyRaw === 'string' && currencyRaw.trim() !== '' ? currencyRaw.trim() : undefined;

  const base: AICalculatorResult = {
    calculator: { slug: tool.slug, name: tool.title, category },
    success: response.success,
    answers: [],
    assumptions: meta ? [...meta.assumptions] : [],
    limitations: meta ? [...meta.limitations] : [],
  };

  // Surface the chosen variant (direction/mode) as an explicit assumption so an
  // agent can see which operation ran — without inventing anything.
  if (typeof input.direction === 'string') base.assumptions.push(`Direction: ${input.direction}.`);
  if (typeof input.mode === 'string') base.assumptions.push(`Mode: ${input.mode}.`);

  const metadata: NonNullable<AICalculatorResult['metadata']> = {};
  if (currency) metadata.currency = currency;
  if (meta?.period) metadata.period = meta.period;
  if (Object.keys(metadata).length > 0) base.metadata = metadata;

  if (!response.success) {
    base.error = response.error;
    return base;
  }

  const { results, table } = response.result;
  base.answers = results.map((r) => {
    const lbl = meta?.labels[r.key];
    const unit = lbl?.unit ?? (r.kind === 'percent' ? '%' : undefined);
    const isCurrency = r.kind === 'currency';
    const answer: AIAnswer = {
      key: r.key,
      label: lbl?.label ?? humanize(r.key),
      value: r.value,
      displayValue: formatDisplay(r.value, r.kind, unit, currency),
      kind: r.kind,
    };
    if (unit) answer.unit = unit;
    // Monetary amount: always flag it. Attach the currency code only when known;
    // its absence means "currency unspecified" — never inferred.
    if (isCurrency) {
      answer.monetary = true;
      if (currency) answer.currency = currency;
    }
    if (r.hero) answer.hero = true;
    if (lbl?.note) answer.note = lbl.note;
    return answer;
  });

  base.raw = table ? { results, table } : { results };
  return base;
}
