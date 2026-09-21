/**
 * MCP tool definitions. Each tool maps 1:1 to an existing Klar calculator via
 * its slug; the input schema mirrors that calculator's own field spec
 * (src/lib/calculators/<engine>.ts). Adding another calculator later is just
 * one more entry here — no server changes.
 */
import { z } from 'zod';
import type { ZodRawShape } from 'zod';

export interface ToolDef {
  name: string;
  title: string;
  description: string;
  /** Slug into the existing calculator registry (getMath). */
  slug: string;
  inputSchema: ZodRawShape;
}

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
];
