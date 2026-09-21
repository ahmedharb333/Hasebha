/**
 * MCP tool definitions. Each tool maps 1:1 to an existing Klar calculator via
 * its slug; the input schema mirrors that calculator's own field spec
 * (src/lib/calculators/<engine>.ts). Adding another calculator later is just
 * one more entry here — no server changes.
 */
import { z } from 'zod';
import type { ZodRawShape } from 'zod';
import { getMath } from '../lib/calculators/index.ts';

export interface ToolDef {
  name: string;
  title: string;
  description: string;
  /** Slug into the existing calculator registry (getMath). */
  slug: string;
  inputSchema: ZodRawShape;
  /**
   * Optional: translate the AI-facing input shape into the engine's own field
   * shape (e.g. semantic `courses[]` -> slot fields `grade0/credits0`). The
   * engine is never modified; this only reshapes input. Returns engine input.
   */
  transformInput?: (args: Record<string, unknown>) => Record<string, unknown>;
  /**
   * Optional: MCP-layer validation of the AI-facing input before it is
   * transformed (e.g. checking a unit belongs to the chosen category, using the
   * engine's own field options). Returns AI-field -> error code, or null when ok.
   * This never reimplements engine math — it guards input shape only.
   */
  preValidate?: (args: Record<string, unknown>) => Record<string, string> | null;
}

/** Valid letter grades, sourced conceptually from the gpa engine's option set. */
const LETTER_GRADES = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F'] as const;

const currency = z
  .string()
  .min(2)
  .max(8)
  .optional()
  .describe('ISO currency code for display only (e.g. JOD, USD). Optional; does not affect the numbers.');

const termUnit = z
  .enum(['months', 'years'])
  .default('years')
  .describe('Unit for the term value.');

export const tools: ToolDef[] = [
  {
    name: 'klar_calculate_loan_payment',
    title: 'Loan payment',
    slug: 'loan-payment',
    description:
      'Calculate a fixed-rate loan: monthly payment, total paid, total interest, fees, effective total cost, and a per-year amortization table. Uses Klar\'s loan-payment engine.',
    inputSchema: {
      principal: z.number().min(0).max(1e15).describe('Loan principal amount before any down payment.'),
      annualRate: z.number().min(0).max(100).describe('Annual interest rate as a percent (e.g. 5 means 5%).'),
      term: z.number().min(0.001).max(100).describe('Loan term length (interpreted with termUnit).'),
      termUnit,
      downPayment: z.number().min(0).max(1e15).default(0).describe('Down payment subtracted from the principal (default 0). Must be less than principal.'),
      fees: z.number().min(0).max(1e15).default(0).describe('One-off fees added to the effective total cost (default 0).'),
      currency,
    },
  },
  {
    name: 'klar_calculate_mortgage',
    title: 'Mortgage',
    slug: 'mortgage',
    description:
      'Calculate a mortgage: loan amount (price minus down payment), monthly payment, total interest, total paid, effective total cost, and a per-year amortization table. Uses Klar\'s mortgage engine.',
    inputSchema: {
      price: z.number().min(0).max(1e15).describe('Property price.'),
      downPayment: z.number().min(0).max(1e15).describe('Down payment. Must be less than the price.'),
      annualRate: z.number().min(0).max(100).describe('Annual interest rate as a percent (e.g. 5 means 5%).'),
      term: z.number().min(0.001).max(100).describe('Mortgage term length (interpreted with termUnit).'),
      termUnit,
      fees: z.number().min(0).max(1e15).default(0).describe('One-off fees added to the effective total cost (default 0).'),
      currency,
    },
  },
  {
    name: 'klar_calculate_compound_interest',
    title: 'Compound interest',
    slug: 'compound-interest',
    description:
      'Calculate compound interest growth with periodic contributions: final balance, total contributions, total interest, and a per-year growth table. Assumes a constant annual rate; does not forecast actual investment performance. Uses Klar\'s compound-interest engine.',
    inputSchema: {
      initial: z.number().min(0).max(1e15).describe('Initial principal / starting balance.'),
      contribution: z.number().min(0).max(1e15).describe('Recurring contribution amount added each contribution period.'),
      contributionFrequency: z
        .enum(['monthly', 'quarterly', 'annually'])
        .default('monthly')
        .describe('How often the contribution is added.'),
      annualRate: z.number().min(0).max(100).describe('Annual interest rate as a percent (e.g. 7 means 7%).'),
      compoundingFrequency: z
        .enum(['monthly', 'quarterly', 'semiAnnually', 'annually'])
        .default('monthly')
        .describe('How often interest compounds.'),
      years: z.number().min(0.01).max(100).describe('Number of years to grow.'),
      currency,
    },
  },
  {
    name: 'klar_calculate_vat',
    title: 'VAT',
    slug: 'vat',
    description:
      'Add, remove, or extract value-added tax (VAT/GST/sales tax) on a single amount, given a tax rate. direction="add": amount is the net (pre-tax) price, returns the gross tax-inclusive price. direction="remove": amount is the gross price, returns the net price before VAT. direction="extract": amount is the gross price, returns only the VAT portion. Returns netAmount, vatAmount, grossAmount. Use for VAT/GST/sales-tax questions. Does NOT compute a discount, markup, or profit margin.',
    inputSchema: {
      amount: z
        .number()
        .min(0)
        .max(1e15)
        .describe('The money amount. Net (pre-tax) when direction="add"; gross (tax-inclusive) when direction="remove" or "extract".'),
      vatRate: z.number().min(0).max(100).describe('VAT rate as a percent (e.g. 15 means 15%).'),
      direction: z
        .enum(['add', 'remove', 'extract'])
        .default('add')
        .describe('add = amount excludes VAT, compute gross; remove = amount includes VAT, compute net before VAT; extract = amount includes VAT, compute the VAT portion.'),
      currency,
    },
  },
  {
    name: 'klar_calculate_discount',
    title: 'Discount / percent change',
    slug: 'discount-percentage',
    description:
      'Percentage discounts and percent change between two values. mode="afterDiscount": final price from an original price and a discount percent. mode="discountAmount": discount percent from an original price and a discount amount. mode="originalPrice": original price from a final price and a discount percent. mode="percentIncrease"/"percentDecrease": percent change from value A to value B. mode="percentDifference": percent difference between two values. Use for sale/discount pricing or percent-change questions. Does NOT add or remove VAT and does NOT compute markup or profit margin.',
    inputSchema: {
      mode: z
        .enum(['afterDiscount', 'discountAmount', 'percentIncrease', 'percentDecrease', 'percentDifference', 'originalPrice'])
        .default('afterDiscount')
        .describe('Which discount/percent calculation to run.'),
      original: z.number().min(0).max(1e15).optional().describe('Original/list price. Used by afterDiscount and discountAmount.'),
      discountPct: z.number().min(0).max(100).optional().describe('Discount percent. Used by afterDiscount.'),
      discountAmount2: z.number().min(0).max(1e15).optional().describe('Discount amount in currency. Used by discountAmount.'),
      valueA: z.number().min(0).max(1e15).optional().describe('First value. Used by percentIncrease/percentDecrease/percentDifference.'),
      valueB: z.number().min(0).max(1e15).optional().describe('Second value. Used by percentIncrease/percentDecrease/percentDifference.'),
      finalPrice: z.number().min(0).max(1e15).optional().describe('Final/after-discount price. Used by originalPrice.'),
      discountPct2: z.number().min(0).max(99.9999).optional().describe('Discount percent. Used by originalPrice.'),
      currency,
    },
  },
  {
    name: 'klar_calculate_markup_margin',
    title: 'Markup & margin',
    slug: 'markup-margin',
    description:
      'From a unit cost and its selling price, compute profit, markup percent (profit / cost) and profit margin percent (profit / selling price). Use for questions distinguishing markup vs margin, or profit on a cost-and-price pair. Requires both cost and sellingPrice; it does NOT solve for a selling price from a target markup or margin, and does NOT compute discounts or VAT.',
    inputSchema: {
      cost: z.number().min(1).max(1e15).describe('Unit cost (what you pay).'),
      sellingPrice: z.number().min(1).max(1e15).describe('Unit selling price (what you charge).'),
    },
  },
  {
    name: 'klar_calculate_break_even',
    title: 'Break-even',
    slug: 'break-even',
    description:
      'Break-even analysis: from fixed costs, unit selling price, and unit variable cost, compute break-even units, break-even revenue, and contribution margin per unit. Use for "how many units to break even" questions. Requires unitPrice greater than unitVariableCost. Does NOT accept a contribution margin directly — it requires unit price and unit variable cost separately. Does NOT compute profit margin, markup, or discounts.',
    inputSchema: {
      fixedCosts: z.number().min(0).max(1e15).describe('Total fixed costs.'),
      unitPrice: z.number().min(1).max(1e15).describe('Selling price per unit. Must exceed unitVariableCost.'),
      unitVariableCost: z.number().min(0).max(1e15).describe('Variable cost per unit.'),
    },
  },
  {
    name: 'klar_calculate_debt_to_income',
    title: 'Debt-to-income',
    slug: 'debt-to-income',
    description:
      'Debt-to-income (DTI) ratio: from recurring debt payments and gross income for the same period, compute the DTI percent and remaining income. Use for "what percent of my income goes to debt" questions. Debt and income must use the same time period (e.g. both monthly). Gross income must be greater than 0. Does NOT compute loan payments, interest, or amortization.',
    inputSchema: {
      monthlyDebt: z.number().min(0).max(1e15).describe('Total recurring debt payments for the period.'),
      grossIncome: z.number().min(0).max(1e15).describe('Gross income for the same period. Must be greater than 0.'),
      currency,
    },
  },
  {
    name: 'klar_calculate_selling_price_from_markup',
    title: 'Selling price from markup',
    slug: 'wholesale-retail',
    description:
      'Calculate the selling price from a cost and a target markup percentage (markup is relative to cost). Use this when the user knows their cost and desired markup and wants the resulting selling price. Returns selling price and profit. This is markup-based pricing only: it does NOT calculate selling price from a target profit margin, and does NOT compute markup/margin from an existing selling price (use the markup & margin tool for that).',
    inputSchema: {
      cost: z.number().min(0).max(1e15).describe('Cost basis — the amount paid per unit.'),
      markupPct: z
        .number()
        .min(0)
        .max(1000)
        .describe('Target markup percent, relative to cost (e.g. 25 means selling price = cost × 1.25).'),
    },
  },
  {
    name: 'klar_calculate_tip',
    title: 'Tip',
    slug: 'tip',
    description:
      'Calculate a tip and the total from a bill amount and tip percent, optionally split across a number of people. Returns the tip amount, the total including the tip, and the amount per person. The tip percent is applied to the bill amount exactly as provided — it does not add or separate tax.',
    inputSchema: {
      billAmount: z.number().min(0).max(1e15).describe('Bill amount the tip is calculated on.'),
      tipPercent: z.number().min(0).max(100).describe('Tip as a percent of the bill (e.g. 15 means 15%).'),
      people: z
        .number()
        .min(1)
        .max(100)
        .default(1)
        .describe('Number of people to split the total across (default 1).'),
      currency,
    },
  },
  {
    name: 'klar_calculate_age',
    title: 'Age',
    slug: 'age',
    description:
      'Calculate age (and elapsed time) from a birth date to an as-of date. Returns age in years (primary), plus total months, days, weeks, and days until the next birthday. If no as-of date is given, today is used.',
    inputSchema: {
      birthDate: z.string().describe('Birth date in ISO format YYYY-MM-DD.'),
      asOfDate: z
        .string()
        .optional()
        .describe('Reference date in ISO format YYYY-MM-DD. Optional; defaults to today. Must not be before birthDate.'),
    },
  },
  {
    name: 'klar_calculate_date_difference',
    title: 'Date difference',
    slug: 'date-difference',
    description:
      'Calculate the difference between two dates. Returns the calendar breakdown (full years, plus additional months and days) and the absolute span in total days and total weeks. Use for "how long between two dates" questions.',
    inputSchema: {
      startDate: z.string().describe('Start date in ISO format YYYY-MM-DD.'),
      endDate: z.string().describe('End date in ISO format YYYY-MM-DD. Must not be before startDate.'),
    },
  },
  {
    name: 'klar_calculate_final_grade_needed',
    title: 'Final grade needed',
    slug: 'final-grade-planner',
    description:
      'Calculate the score needed on a final exam to reach a target overall grade, given the current grade and the final exam\'s weight. Returns the required final score (primary), the current grade\'s contribution, and the maximum achievable overall grade. Scores are 0–100. If the required final exceeds the maximum achievable, the target is not reachable.',
    inputSchema: {
      currentGrade: z.number().min(0).max(100).describe('Current overall grade so far, 0–100.'),
      finalWeight: z.number().min(1).max(100).describe('Weight of the final exam as a percent of the overall grade, 1–100.'),
      targetGrade: z.number().min(0).max(100).describe('Desired overall grade, 0–100.'),
    },
  },
  {
    name: 'klar_calculate_loan_early_payoff',
    title: 'Loan early payoff',
    slug: 'early-payoff',
    description:
      'For a fixed-rate loan, calculate how a fixed extra monthly payment shortens the payoff and how much interest it saves. Returns the baseline monthly payment, baseline payoff months, new payoff months with the extra payment, and interest saved. Use for "how much do I save by paying extra each month" questions — not for a plain loan payment (use the loan payment tool) or a rate change.',
    inputSchema: {
      principal: z.number().min(0).max(1e15).describe('Outstanding loan principal.'),
      annualRate: z.number().min(0).max(100).describe('Annual interest rate as a percent.'),
      term: z.number().min(0.001).max(100).describe('Remaining loan term (interpreted with termUnit).'),
      termUnit,
      extraMonthly: z.number().min(0).max(1e15).default(0).describe('Extra amount paid each month on top of the normal payment (default 0).'),
      currency,
    },
  },
  {
    name: 'klar_calculate_savings_goal',
    title: 'Savings goal',
    slug: 'savings-goal',
    description:
      'Calculate the recurring contribution needed to reach a savings target by a deadline, given current savings and an expected annual return. This is the inverse of a future-value projection: you supply the target and it solves for the required contribution per period. Returns the required contribution per period (primary), total contributed, estimated investment return, and the number of contribution periods.',
    inputSchema: {
      target: z.number().min(0).max(1e15).describe('Savings target to reach.'),
      currentSavings: z.number().min(0).max(1e15).describe('Amount already saved.'),
      annualReturn: z.number().min(0).max(100).describe('Expected annual return as a percent.'),
      years: z.number().min(0.01).max(100).describe('Number of years until the target date.'),
      contributionFrequency: z
        .enum(['monthly', 'quarterly', 'annually'])
        .default('monthly')
        .describe('How often the contribution is made.'),
      currency,
    },
  },
  {
    name: 'klar_calculate_retirement_savings',
    title: 'Retirement savings',
    slug: 'retirement-savings',
    description:
      'Project the future value of retirement savings from a starting balance plus a FIXED MONTHLY contribution over a number of years at an expected annual return (compounded monthly). Returns the final balance, total contributions, and total interest earned. Use this for regular monthly retirement/investment saving. For a lump sum with no or non-monthly contributions, or to choose the compounding/contribution frequency, use the compound interest tool instead. To solve for the contribution needed to hit a target, use the savings goal tool.',
    inputSchema: {
      currentSavings: z.number().min(0).max(1e15).describe('Starting balance already saved.'),
      monthlyContribution: z.number().min(0).max(1e15).describe('Fixed amount contributed every month.'),
      annualReturn: z.number().min(0).max(100).describe('Expected annual return as a percent (compounded monthly).'),
      years: z.number().min(1).max(100).describe('Number of years to project.'),
      currency,
    },
  },
  {
    name: 'klar_calculate_salary_converter',
    title: 'Salary converter',
    slug: 'salary-converter',
    description:
      'Convert a pay rate between periods (hourly, daily, weekly, monthly, annual) based on a work pattern. Returns the equivalent hourly, daily, weekly, monthly and annual amounts. This only re-expresses the SAME gross pay across time periods — it does NOT deduct tax or social insurance (not net pay), and does NOT compute the employer\'s total cost of the employee.',
    inputSchema: {
      salaryAmount: z.number().min(0.000001).max(1e12).describe('The pay amount to convert.'),
      salaryFrequency: z
        .enum(['hourly', 'daily', 'weekly', 'monthly', 'annual'])
        .default('monthly')
        .describe('The period the salaryAmount is expressed in.'),
      daysPerWeek: z.number().min(1).max(7).default(5).describe('Working days per week (default 5).'),
      hoursPerDay: z.number().min(1).max(24).default(8).describe('Working hours per day (default 8).'),
      paidWeeksPerYear: z.number().min(1).max(52).default(52).describe('Paid weeks per year (default 52).'),
      unpaidLeaveDays: z.number().min(0).max(365).default(0).describe('Unpaid leave days per year (default 0).'),
      currency,
    },
  },
  {
    name: 'klar_calculate_loan_comparison',
    title: 'Loan comparison',
    slug: 'loan-comparison',
    description:
      'Compare TWO loan options for the same principal: each option has its own interest rate, term, and optional fees. Returns each option\'s monthly payment, total interest, and total cost, plus the total-cost difference. Use this when the user explicitly wants to compare two loans/offers. For a single loan\'s payment, use the loan payment tool instead.',
    inputSchema: {
      principal: z.number().min(0).max(1e15).describe('Loan principal, the same for both options.'),
      termUnit,
      optionA: z
        .object({
          rate: z.number().min(0).max(100).describe('Annual interest rate percent for option A.'),
          term: z.number().min(0.001).max(100).describe('Term for option A (in termUnit).'),
          fees: z.number().min(0).max(1e15).default(0).describe('One-off fees for option A (default 0).'),
        })
        .describe('First loan option.'),
      optionB: z
        .object({
          rate: z.number().min(0).max(100).describe('Annual interest rate percent for option B.'),
          term: z.number().min(0.001).max(100).describe('Term for option B (in termUnit).'),
          fees: z.number().min(0).max(1e15).default(0).describe('One-off fees for option B (default 0).'),
        })
        .describe('Second loan option.'),
      currency,
    },
    transformInput: (args) => {
      const a = (args.optionA ?? {}) as Record<string, unknown>;
      const b = (args.optionB ?? {}) as Record<string, unknown>;
      return {
        principal: args.principal,
        termUnit: args.termUnit,
        currency: args.currency,
        rateA: a.rate, termA: a.term, feesA: a.fees ?? 0,
        rateB: b.rate, termB: b.term, feesB: b.fees ?? 0,
      };
    },
  },
  {
    name: 'klar_calculate_employee_cost',
    title: 'Employee cost',
    slug: 'employee-cost',
    description:
      'Calculate the total cost to an EMPLOYER of an employee: gross salary plus employer contributions, recurring costs (insurance, benefits, software, other) and one-time costs (equipment, recruitment, training, other). Returns monthly cost, annual cost, first-year total, and salary share of that total. This is the employer\'s cost — not the employee\'s take-home pay, and not a salary period conversion.',
    inputSchema: {
      grossSalary: z.number().min(0.000001).max(1e12).describe('Monthly gross salary.'),
      employerContributionPct: z.number().min(0).max(100).default(0).describe('Employer contribution as a percent of gross (default 0).'),
      insuranceCost: z.number().min(0).max(1e9).default(0).describe('Monthly insurance cost (default 0).'),
      benefitsCost: z.number().min(0).max(1e9).default(0).describe('Monthly benefits cost (default 0).'),
      softwareCost: z.number().min(0).max(1e9).default(0).describe('Monthly software/tools cost (default 0).'),
      otherRecurringCost: z.number().min(0).max(1e9).default(0).describe('Other monthly recurring cost (default 0).'),
      equipmentCost: z.number().min(0).max(1e9).default(0).describe('One-time equipment cost (default 0).'),
      recruitmentCost: z.number().min(0).max(1e9).default(0).describe('One-time recruitment cost (default 0).'),
      trainingCost: z.number().min(0).max(1e9).default(0).describe('One-time training cost (default 0).'),
      otherOneTimeCost: z.number().min(0).max(1e9).default(0).describe('Other one-time cost (default 0).'),
      currency,
    },
  },
  {
    name: 'klar_calculate_freelance_rate',
    title: 'Freelance rate',
    slug: 'freelance-rate',
    description:
      'Calculate the hourly/daily rate a freelancer should charge to reach a desired annual income, accounting for business expenses, a tax reserve, non-billable time, leave, and a target profit margin. Returns minimum and recommended hourly rates, a daily rate, an optional project rate, and billable hours per year. This sets a rate from an income goal — it does NOT convert an existing salary between periods and does NOT compute an employer\'s cost.',
    inputSchema: {
      desiredIncome: z.number().min(0.000001).max(1e12).describe('Desired annual take-home income.'),
      annualExpenses: z.number().min(0).max(1e12).describe('Annual business expenses.'),
      taxReservePct: z.number().min(0).max(50).default(0).describe('Percent of revenue reserved for tax (default 0).'),
      nonBillablePct: z.number().min(0).max(90).default(20).describe('Percent of working time that is non-billable (default 20).'),
      vacationDays: z.number().min(0).max(120).default(20).describe('Vacation days per year (default 20).'),
      sickDays: z.number().min(0).max(120).default(5).describe('Sick days per year (default 5).'),
      hoursPerWeek: z.number().min(1).max(84).default(40).describe('Working hours per week (default 40).'),
      profitMarginPct: z.number().min(0).max(100).default(0).describe('Target profit margin percent (default 0).'),
      projectHours: z.number().min(0).max(10000).default(0).describe('Hours for an example project quote (default 0 = skip).'),
      currency,
    },
  },
  {
    name: 'klar_calculate_unit_conversion',
    title: 'Unit conversion',
    slug: 'unit-converter',
    description:
      'Convert a value between units within one category: length (mm, cm, m, km, in, ft, yd, mi), weight (mg, g, kg, tonne, oz, lb, stone), temperature (celsius, fahrenheit, kelvin), area (mm2, cm2, m2, hectare, km2, in2, ft2, yd2, acre), or volume (ml, l, cm3, m3, gal, qt, floz, tsp, tbsp). fromUnit and toUnit must both belong to the chosen category. Returns the converted value. Does not convert across categories.',
    inputSchema: {
      value: z.number().describe('The numeric value to convert.'),
      category: z
        .enum(['length', 'weight', 'temperature', 'area', 'volume'])
        .describe('Measurement category; fromUnit and toUnit must be in this category.'),
      fromUnit: z.string().describe('Source unit code (must be in the chosen category).'),
      toUnit: z.string().describe('Target unit code (must be in the chosen category, and different from fromUnit).'),
    },
    // Validate units against the ENGINE'S OWN option set — no duplicated unit data.
    preValidate: (args) => {
      const category = String(args.category ?? '');
      const math = getMath('unit-converter');
      const fromField = math.fields.find((f) => f.id === `from${category}`);
      if (!fromField || !fromField.options) return { category: 'invalid' };
      const units = new Set(fromField.options.map((o) => o.value));
      const errors: Record<string, string> = {};
      if (!units.has(String(args.fromUnit))) errors.fromUnit = 'invalid';
      if (!units.has(String(args.toUnit))) errors.toUnit = 'invalid';
      if (!errors.fromUnit && !errors.toUnit && String(args.fromUnit) === String(args.toUnit)) errors.toUnit = 'invalid';
      return Object.keys(errors).length ? errors : null;
    },
    transformInput: (args) => {
      const category = String(args.category ?? '');
      return {
        value: args.value,
        category,
        [`from${category}`]: args.fromUnit,
        [`to${category}`]: args.toUnit,
      };
    },
  },
  {
    name: 'klar_calculate_gpa',
    title: 'GPA',
    slug: 'gpa',
    description:
      'Calculate a grade point average (GPA) from a list of courses, each with a letter grade and credit hours, on a 4.0 or 5.0 scale. Returns the GPA plus total credits and total grade points. Use this to compute an EXISTING GPA from completed courses. To find the score needed on a final exam to reach a target grade, use the final grade tool instead. Supports up to 6 courses.',
    inputSchema: {
      scale: z.enum(['4', '5']).default('4').describe('GPA scale: 4.0 or 5.0.'),
      courses: z
        .array(
          z.object({
            grade: z.enum(LETTER_GRADES).describe('Letter grade (A+ … F).'),
            credits: z.number().min(0.5).max(20).describe('Credit hours for the course.'),
          }),
        )
        .min(1)
        .max(6)
        .describe('Courses, each with a letter grade and credit hours (max 6).'),
    },
    preValidate: (args) => {
      const courses = args.courses;
      if (Array.isArray(courses) && courses.length > 6) return { courses: 'max' };
      return null;
    },
    transformInput: (args) => {
      const out: Record<string, unknown> = { scale: String(args.scale ?? '4') };
      const courses = Array.isArray(args.courses) ? args.courses : [];
      courses.slice(0, 6).forEach((c, i) => {
        const course = (c ?? {}) as Record<string, unknown>;
        out[`grade${i}`] = course.grade;
        out[`credits${i}`] = course.credits;
      });
      return out;
    },
  },
  {
    name: 'klar_calculate_grade_average',
    title: 'Grade average',
    slug: 'grade-average',
    description:
      'Calculate the simple average of a list of numeric grades (each 0–100). Returns the average plus the count and the highest and lowest grades. This is an unweighted mean of grades you already have. To compute a credit-weighted GPA use the GPA tool; to find the score needed to reach a target use the final grade tool. Supports up to 6 grades.',
    inputSchema: {
      grades: z
        .array(z.number().min(0).max(100))
        .min(1)
        .max(6)
        .describe('Numeric grades, each 0–100 (max 6).'),
    },
    preValidate: (args) => {
      const grades = args.grades;
      if (Array.isArray(grades) && grades.length > 6) return { grades: 'max' };
      return null;
    },
    transformInput: (args) => {
      const out: Record<string, unknown> = {};
      const grades = Array.isArray(args.grades) ? args.grades : [];
      grades.slice(0, 6).forEach((g, i) => {
        out[`grade${i}`] = g;
      });
      return out;
    },
  },
];
