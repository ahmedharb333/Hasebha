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
      'Calculate compound interest growth with periodic contributions: final balance, total contributions, total interest, and a per-year growth table. Uses Klar\'s compound-interest engine.',
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
];
