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
import { runCalculator } from './adapter.ts';
import type { CalcResponse } from './adapter.ts';
import type { ToolDef } from './tools.ts';
import { getCountryRules } from '../lib/country-rules/registry.ts';

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

/**
 * Health-calculator metadata (Phase 3A). Communicates the actual mathematical
 * scope of a screening estimate — never a generic disclaimer.
 */
export interface HealthMeta {
  /** Named formula/standard, e.g. "Mifflin-St Jeor", "US Navy tape", "WHO BMI 18.5–24.9". */
  method: string;
  /** Which profile inputs the result depends on, e.g. ["sex","age","height","weight"]. */
  usesProfile: string[];
  /** Measurement units the engine silently assumes, e.g. { waist: "cm" }. */
  measurementUnits?: Record<string, string>;
  /** Fixed: these tools do not give medical advice. */
  notMedicalAdvice: true;
  /** One specific line naming the method and the screening-estimate scope. */
  disclaimer: string;
}

/** Supported jurisdiction codes — sourced from the country-rules registry. */
export const SUPPORTED_COUNTRIES = ['jo', 'sa', 'ae', 'kw', 'qa', 'bh', 'om'] as const;

/**
 * Static jurisdiction spec stored per tool in AI_META. Country/currency are
 * resolved at runtime from the request + the engine's country rules.
 */
export interface JurisdictionSpec {
  calculationPeriod: 'annual' | 'monthly' | 'weekly' | 'total' | 'days';
  basis: 'statutory' | 'formulaic';
  /** One specific line; a "{country}" placeholder is filled at runtime. */
  legalNote: string;
  /** Input field that carries an employment-end type (end-of-service only). */
  employmentEndTypeField?: string;
}

/** Resolved jurisdiction metadata attached to a result (Phase 3A). */
export interface JurisdictionMeta {
  country: string;
  supportedCountries: string[];
  currency: string;
  calculationPeriod: JurisdictionSpec['calculationPeriod'];
  basis: JurisdictionSpec['basis'];
  rulesSnapshot: true;
  employmentEndType?: 'terminated' | 'voluntary';
  legalNote: string;
}

export interface AICalculatorResult {
  calculator: { slug: string; name: string; category: string };
  success: boolean;
  answers: AIAnswer[];
  assumptions: string[];
  limitations: string[];
  metadata?: { currency?: string; country?: string; period?: string };
  /** True when the result is an estimate rather than an exact/statutory-verified figure. */
  estimate?: boolean;
  /** Present only for health calculators (Phase 3B). */
  health?: HealthMeta;
  /** Present only for jurisdiction/statutory calculators (Phase 3C). */
  jurisdiction?: JurisdictionMeta;
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
  /** Phase 3A: opt-in specialized metadata. Absent tools stay generic. */
  estimate?: boolean;
  health?: HealthMeta;
  jurisdiction?: JurisdictionSpec;
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
  tip: {
    category: 'everyday',
    labels: {
      tipAmount: { label: 'Tip amount' },
      totalWithTip: { label: 'Total with tip' },
      perPerson: { label: 'Amount per person' },
    },
    assumptions: [
      'Tip = bill amount × tip percent / 100.',
      'The total is split equally across the number of people.',
    ],
    limitations: [
      'Applies the tip percent to the bill amount as provided; does not add or separate tax.',
    ],
  },
  age: {
    category: 'dates',
    labels: {
      ageYears: { label: 'Age in completed years', unit: 'years' },
      totalMonths: { label: 'Age in total months', unit: 'months' },
      totalDays: { label: 'Age in total days', unit: 'days' },
      totalWeeks: { label: 'Age in total weeks', unit: 'weeks' },
      daysUntilNextBirthday: { label: 'Days until next birthday', unit: 'days' },
    },
    assumptions: ['The as-of date defaults to today when omitted.'],
    limitations: [],
  },
  'date-difference': {
    category: 'dates',
    labels: {
      years: { label: 'Full years between the dates', unit: 'years' },
      months: { label: 'Additional months (after full years)', unit: 'months' },
      days: { label: 'Additional days (after months)', unit: 'days' },
      totalDays: { label: 'Total days between the dates', unit: 'days' },
      totalWeeks: { label: 'Total whole weeks between the dates', unit: 'weeks' },
    },
    assumptions: [
      'years/months/days are the calendar breakdown; totalDays/totalWeeks are the absolute span.',
    ],
    limitations: [],
  },
  'final-grade-planner': {
    category: 'education',
    labels: {
      requiredFinal: { label: 'Required score on the final', unit: 'points', note: 'Clamped to 0–100. This is the needed score on the final exam itself. Reachability depends on comparing the target grade with the maximum achievable overall grade, not this value.' },
      currentContribution: { label: 'Current grade contribution (excluding the final)', unit: 'points' },
      maxAchievable: { label: 'Maximum achievable overall grade', unit: 'points' },
    },
    assumptions: [
      'The non-final portion of the grade is fixed at the current grade.',
      'Required final = (target − current × (1 − weight)) / weight.',
    ],
    limitations: [
      'Required final is clamped to 0–100; if the maximum achievable grade is below the target, the target is unreachable.',
    ],
  },
  'early-payoff': {
    category: 'loans',
    labels: {
      baselinePayment: { label: 'Baseline monthly payment (no extra)' },
      baselineMonths: { label: 'Baseline payoff time in months', unit: 'months' },
      newMonths: { label: 'Payoff time with the extra payment', unit: 'months' },
      interestSaved: { label: 'Interest saved by paying extra' },
    },
    assumptions: [
      'Fixed interest rate; the extra amount is paid every month.',
      'Baseline is the standard fully-amortizing payment with no extra.',
    ],
    limitations: [
      'Models a fixed extra monthly payment only; not a refinance, rate change, or lump-sum analysis.',
    ],
  },
  'savings-goal': {
    category: 'savings-investing',
    labels: {
      requiredContribution: { label: 'Required contribution per period' },
      totalContributed: { label: 'Total contributed over the horizon' },
      estimatedReturn: { label: 'Estimated investment return' },
      completionMonths: { label: 'Number of contribution periods', unit: 'periods', note: 'Count of contribution periods (years × periods per year), not necessarily months.' },
    },
    assumptions: [
      'Contribution is made every period at the chosen frequency; return compounds at that frequency.',
      'Solves the required periodic contribution to reach the target (inverse of a future-value projection).',
    ],
    limitations: [
      'Assumes a constant annual return; does not forecast actual investment performance.',
    ],
  },
  'retirement-savings': {
    category: 'savings-investing',
    labels: {
      finalBalance: { label: 'Final balance (future value)' },
      totalContributions: { label: 'Total contributions' },
      totalInterestEarned: { label: 'Total interest earned' },
    },
    assumptions: [
      'Fixed monthly contribution; return compounds monthly at a constant annual rate.',
    ],
    limitations: [
      'Monthly contributions only; does not forecast actual investment performance.',
      'For a lump sum or non-monthly compounding use the compound interest tool; to solve for the needed contribution use the savings goal tool.',
    ],
  },
  'salary-converter': {
    category: 'work-pay',
    labels: {
      hourly: { label: 'Hourly pay' },
      daily: { label: 'Daily pay' },
      weekly: { label: 'Weekly pay' },
      monthly: { label: 'Monthly pay' },
      annual: { label: 'Annual pay' },
    },
    assumptions: [
      'Re-expresses the same gross pay across periods using the given work pattern.',
    ],
    limitations: [
      'Does not deduct tax or social insurance (not net pay); does not compute employer cost.',
    ],
  },
  'loan-comparison': {
    category: 'loans',
    labels: {
      monthlyA: { label: 'Option A monthly payment' },
      monthlyB: { label: 'Option B monthly payment' },
      totalInterestA: { label: 'Option A total interest' },
      totalInterestB: { label: 'Option B total interest' },
      totalCostA: { label: 'Option A total cost (payments + fees)' },
      totalCostB: { label: 'Option B total cost (payments + fees)' },
      diffTotalCost: { label: 'Total-cost difference (A − B)' },
    },
    assumptions: [
      'Both options use the same principal; each has its own rate, term, and fees.',
      'Fixed rate, fully-amortizing payments.',
    ],
    limitations: [
      'Compares exactly two options; does not judge which is "best" beyond total cost.',
    ],
  },
  'employee-cost': {
    category: 'work-pay',
    labels: {
      monthlyCost: { label: 'Monthly employer cost' },
      annualCost: { label: 'Annual employer cost' },
      firstYearTotal: { label: 'First-year total cost' },
      salaryShare: { label: 'Salary share of first-year cost' },
    },
    assumptions: [
      'First-year total = annual recurring cost + one-time costs (equipment, recruitment, training, other).',
    ],
    limitations: [
      "Employer's cost of employment; not the employee's take-home pay and not a salary period conversion.",
    ],
  },
  'freelance-rate': {
    category: 'work-pay',
    labels: {
      minimumHourly: { label: 'Minimum hourly rate (break-even)' },
      recommendedHourly: { label: 'Recommended hourly rate' },
      dailyRate: { label: 'Daily rate' },
      projectRate: { label: 'Example project rate' },
      billableHours: { label: 'Billable hours per year', unit: 'hours' },
    },
    assumptions: [
      'Rate covers desired income and expenses over billable hours, with a tax reserve and target profit margin.',
    ],
    limitations: [
      'Sets a rate from an income goal; does not convert an existing salary or compute employer cost.',
    ],
  },
  'unit-converter': {
    category: 'conversion',
    labels: {
      convertedValue: { label: 'Converted value', note: 'Expressed in the requested target unit.' },
    },
    assumptions: ['fromUnit and toUnit are both within the chosen category.'],
    limitations: ['Converts within one category only; does not convert across categories.'],
  },
  gpa: {
    category: 'education',
    labels: {
      gpa: { label: 'GPA' },
      totalCredits: { label: 'Total credit hours', unit: 'credits' },
      totalPoints: { label: 'Total grade points', unit: 'points' },
    },
    assumptions: ['Credit-weighted average of grade points on the chosen 4.0 or 5.0 scale.'],
    limitations: [
      'Computes an existing GPA from up to 6 courses; does not determine the grade needed for a target (use the final grade tool).',
    ],
  },
  'grade-average': {
    category: 'education',
    labels: {
      average: { label: 'Average grade', unit: 'points' },
      count: { label: 'Number of grades', unit: 'grades' },
      highest: { label: 'Highest grade', unit: 'points' },
      lowest: { label: 'Lowest grade', unit: 'points' },
    },
    assumptions: ['Unweighted arithmetic mean of the provided grades.'],
    limitations: [
      'Simple average of up to 6 grades; for a credit-weighted GPA use the GPA tool.',
    ],
  },
  bmi: {
    category: 'health',
    estimate: true,
    labels: {
      bmi: { label: 'Body mass index (BMI)' },
      healthyLow: { label: 'Healthy weight range — low', unit: 'kg', note: 'In kilograms, regardless of the input weight unit.' },
      healthyHigh: { label: 'Healthy weight range — high', unit: 'kg', note: 'In kilograms, regardless of the input weight unit.' },
    },
    assumptions: ['BMI = weight(kg) / height(m)².', 'Healthy reference range is BMI 18.5–24.9.'],
    limitations: ['Does not personalize interpretation by age or sex; not an energy or body-composition measure.'],
    health: {
      method: 'WHO BMI 18.5–24.9',
      usesProfile: ['weight', 'height'],
      notMedicalAdvice: true,
      disclaimer: 'BMI screening estimate (weight ÷ height²) against the WHO 18.5–24.9 range — not a medical diagnosis or individualized advice.',
    },
  },
  'ideal-weight': {
    category: 'health',
    estimate: true,
    labels: {
      healthyLow: { label: 'Healthy weight — low', unit: 'kg' },
      healthyHigh: { label: 'Healthy weight — high', unit: 'kg' },
      midRange: { label: 'Mid-range weight', unit: 'kg' },
    },
    assumptions: ['Healthy weight range = BMI 18.5–24.9 applied to the given height (weights in kg).'],
    limitations: ['Uses the BMI range only — not Devine, Robinson, Hamwi, frame size, or sex adjustments.'],
    health: {
      method: 'BMI-range',
      usesProfile: ['height'],
      notMedicalAdvice: true,
      disclaimer: 'Healthy-weight-range estimate from the BMI 18.5–24.9 band for your height — not a medical diagnosis or individualized advice.',
    },
  },
  bmr: {
    category: 'health',
    estimate: true,
    labels: {
      bmr: { label: 'Basal metabolic rate (BMR)', unit: 'kcal/day' },
      tdee: { label: 'Total daily energy expenditure (TDEE)', unit: 'kcal/day' },
    },
    assumptions: [
      'BMR via the Mifflin-St Jeor equation.',
      'TDEE = BMR × activity factor (sedentary 1.2, light 1.375, moderate 1.55, active 1.725, very-active 1.9).',
    ],
    limitations: ['Resting/maintenance energy estimate — not a weight-goal calorie target (use the calorie intake tool).'],
    health: {
      method: 'Mifflin-St Jeor',
      usesProfile: ['sex', 'age', 'weight', 'height', 'activity'],
      notMedicalAdvice: true,
      disclaimer: 'Energy-expenditure estimate via the Mifflin-St Jeor equation — not a medical diagnosis or individualized advice.',
    },
  },
  'calorie-intake': {
    category: 'health',
    estimate: true,
    labels: {
      targetCalories: { label: 'Daily calorie target', unit: 'kcal/day' },
      bmr: { label: 'Basal metabolic rate (BMR)', unit: 'kcal/day' },
      tdee: { label: 'Total daily energy expenditure (TDEE)', unit: 'kcal/day' },
    },
    assumptions: [
      'BMR via Mifflin-St Jeor; TDEE = BMR × activity factor.',
      'Goal adjusts TDEE by a daily delta set by rate — lose subtracts / gain adds slow 250, moderate 500, aggressive 750 kcal; maintain = 0.',
    ],
    limitations: ['A dietary calorie target for a weight goal — more than BMR/TDEE alone; not individualized medical or nutritional advice.'],
    health: {
      method: 'Mifflin-St Jeor + activity + goal/rate adjustment',
      usesProfile: ['sex', 'age', 'weight', 'height', 'activity', 'goal', 'rate'],
      notMedicalAdvice: true,
      disclaimer: 'Dietary calorie-target estimate (Mifflin-St Jeor + activity + goal/rate) — not a medical diagnosis or individualized advice.',
    },
  },
  'body-fat': {
    category: 'health',
    estimate: true,
    labels: {
      bodyFatPct: { label: 'Body fat percentage' },
    },
    assumptions: ['US Navy tape-measure method from height, neck and waist (plus hip for females); measurements in cm.'],
    limitations: ['Tape-measure estimate — not a body-composition scan (e.g. DEXA/BIA) and not a BMI.'],
    health: {
      method: 'US Navy tape',
      usesProfile: ['sex', 'height', 'neck', 'waist', 'hip (female)'],
      measurementUnits: { height: 'cm', neck: 'cm', waist: 'cm', hip: 'cm' },
      notMedicalAdvice: true,
      disclaimer: 'Body-fat estimate via the US Navy tape-measure method (measurements in cm) — not a medical diagnosis or individualized advice.',
    },
  },
  'maternity-leave': {
    category: 'employment-law',
    estimate: true,
    labels: {
      maternityDays: { label: 'Statutory maternity leave', unit: 'days' },
      maternityWeeks: { label: 'Approximate weeks', unit: 'weeks' },
    },
    assumptions: ['Country-based lookup of the statutory maternity-leave entitlement.'],
    limitations: ['Statutory entitlement only; does not calculate an annual leave balance or an individual medical/maternity situation.'],
    jurisdiction: {
      calculationPeriod: 'days',
      basis: 'statutory',
      legalNote: 'Statutory estimate for {country}; based on the rules embedded in this calculator; not legal/tax advice; verify current law.',
    },
  },
  'notice-period': {
    category: 'employment-law',
    estimate: true,
    labels: {
      noticeDays: { label: 'Statutory notice period', unit: 'days' },
      noticeMonths: { label: 'Notice period in months', unit: 'months' },
    },
    assumptions: ['Statutory notice period determined by years of tenure.'],
    limitations: ['Statutory notice only; not annual leave, not end-of-service/gratuity, not a contract interpretation.'],
    jurisdiction: {
      calculationPeriod: 'days',
      basis: 'statutory',
      legalNote: 'Statutory estimate for {country}; based on the rules embedded in this calculator; not legal/tax advice; verify current law.',
    },
  },
  'social-insurance': {
    category: 'employment-law',
    estimate: true,
    labels: {
      employeeShare: { label: 'Employee social-insurance share' },
      employerShare: { label: 'Employer social-insurance share' },
      total: { label: 'Total social-insurance contribution' },
      cappedBase: { label: 'Contribution base (capped)' },
    },
    assumptions: ['Statutory rates applied to the salary, capped at the country limit; includes any supplementary component the rules define.'],
    limitations: ['Social-insurance contributions only; not income tax and not full net pay (use gross-to-net for net).'],
    jurisdiction: {
      calculationPeriod: 'monthly',
      basis: 'statutory',
      legalNote: 'Statutory estimate for {country}; based on the rules embedded in this calculator; not legal/tax advice; verify current law.',
    },
  },
  'income-tax': {
    category: 'employment-law',
    estimate: true,
    labels: {
      taxAmount: { label: 'Annual income tax' },
      effectiveRate: { label: 'Effective tax rate' },
      taxableIncome: { label: 'Taxable income (after allowance)' },
    },
    assumptions: ['Statutory brackets applied to income after the personal allowance.'],
    limitations: ['Annual income tax only; not monthly take-home pay, not social insurance, not gross-to-net.'],
    jurisdiction: {
      calculationPeriod: 'annual',
      basis: 'statutory',
      legalNote: 'Statutory estimate for {country}; based on the rules embedded in this calculator; not legal/tax advice; verify current law.',
    },
  },
  'gross-to-net': {
    category: 'employment-law',
    estimate: true,
    labels: {
      netMonthly: { label: 'Monthly net pay' },
      totalDeductions: { label: 'Total monthly deductions' },
      socialInsurance: { label: 'Social-insurance deduction' },
      incomeTax: { label: 'Income-tax deduction' },
    },
    assumptions: ['Applies the statutory deduction sequence the engine defines for the country (social insurance and/or income tax, in the country order).'],
    limitations: ['Only the deductions the engine implements; not a salary-period conversion, not employer total cost, not an annual income-tax-only figure.'],
    jurisdiction: {
      calculationPeriod: 'monthly',
      basis: 'statutory',
      legalNote: 'Statutory estimate for {country}; based on the rules embedded in this calculator; not legal/tax advice; verify current law.',
    },
  },
};

/**
 * Run a tool end-to-end exactly as the MCP server does: optional MCP-layer
 * preValidation, optional input transformation into the engine shape, engine
 * execution (single source of truth), then AI-contract enrichment. Shared by
 * the server and the tests so they behave identically.
 */
export function runTool(tool: ToolDef, rawArgs: Record<string, unknown>): AICalculatorResult {
  const preErr = tool.preValidate?.(rawArgs);
  let response: CalcResponse;
  if (preErr && Object.keys(preErr).length > 0) {
    response = { success: false, error: { code: 'VALIDATION_ERROR', message: 'One or more inputs are invalid.', fields: preErr } };
  } else {
    const engineInput = tool.transformInput ? tool.transformInput(rawArgs) : rawArgs;
    response = runCalculator(tool.slug, engineInput);
  }
  return toAIResult(tool, response, rawArgs);
}

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
 * Resolve a static JurisdictionSpec into concrete JurisdictionMeta using the
 * request's country and the engine's OWN country rules for currency (never a
 * user-supplied guess, never an invented code). Unsupported/absent country ->
 * empty currency; the supported list is always surfaced so an agent can check.
 */
export function resolveJurisdiction(spec: JurisdictionSpec, input: Record<string, unknown>): JurisdictionMeta {
  const country = typeof input.country === 'string' ? input.country : '';
  const currency = getCountryRules(country)?.currency ?? '';
  const meta: JurisdictionMeta = {
    country,
    supportedCountries: [...SUPPORTED_COUNTRIES],
    currency,
    calculationPeriod: spec.calculationPeriod,
    basis: spec.basis,
    rulesSnapshot: true,
    legalNote: spec.legalNote.replace('{country}', country ? country.toUpperCase() : 'the selected country'),
  };
  if (spec.employmentEndTypeField) {
    const v = input[spec.employmentEndTypeField];
    if (v === 'terminated' || v === 'voluntary') meta.employmentEndType = v;
  }
  return meta;
}

/**
 * Attach opt-in specialized metadata (estimate / health / jurisdiction) from a
 * tool's AIMeta onto a result. A tool with no such metadata is untouched, so
 * generic tools never receive health/jurisdiction fields. Pure; mutates+returns.
 */
export function applySpecialized(
  base: AICalculatorResult,
  meta: { estimate?: boolean; health?: HealthMeta; jurisdiction?: JurisdictionSpec } | undefined,
  input: Record<string, unknown>,
): AICalculatorResult {
  if (!meta) return base;
  if (meta.estimate) base.estimate = true;
  if (meta.health) base.health = meta.health;
  if (meta.jurisdiction) base.jurisdiction = resolveJurisdiction(meta.jurisdiction, input);
  return base;
}

/**
 * Wrap the adapter's engine output in the canonical AI contract.
 * `input` is the raw tool arguments (used only for metadata like currency).
 */
export function toAIResult(tool: ToolDef, response: CalcResponse, input: Record<string, unknown>): AICalculatorResult {
  const meta = AI_META[tool.slug];
  const category = meta?.category ?? 'general';
  const currencyRaw = input.currency;
  let currency = typeof currencyRaw === 'string' && currencyRaw.trim() !== '' ? currencyRaw.trim() : undefined;
  // Jurisdiction tools: currency is DERIVED from the country's rules, never a
  // user input, so monetary answers and metadata match jurisdiction.currency.
  if (meta?.jurisdiction) {
    currency = getCountryRules(typeof input.country === 'string' ? input.country : '')?.currency ?? undefined;
  }

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

  // Opt-in specialized metadata (estimate/health/jurisdiction). Only tools whose
  // AI_META declares these get them; the existing generic tools are unaffected.
  applySpecialized(base, meta, input);

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
