/**
 * Static map of calculator slug -> lazy loader for the math engine.
 * Kept as explicit static imports so Vite can code-split per calculator.
 */
import type { CalculatorMath } from '../calculators/types';

export type MathLoader = () => Promise<{ default: CalculatorMath }>;

export const mathLoaders: Record<string, MathLoader> = {
  'loan-payment': () => import('../calculators/loan.ts'),
  'compound-interest': () => import('../calculators/compound.ts'),
  'savings-goal': () => import('../calculators/savings.ts'),
  vat: () => import('../calculators/vat.ts'),
  'discount-percentage': () => import('../calculators/discount.ts'),
  'salary-converter': () => import('../calculators/salary.ts'),
  'overtime-pay': () => import('../calculators/overtime.ts'),
  'freelance-rate': () => import('../calculators/freelance.ts'),
  'employee-cost': () => import('../calculators/employee-cost.ts'),
  'leave-balance': () => import('../calculators/leave.ts'),
  mortgage: () => import('../calculators/mortgage.ts'),
  'loan-comparison': () => import('../calculators/loan-comparison.ts'),
  'early-payoff': () => import('../calculators/early-payoff.ts'),
  zakat: () => import('../calculators/zakat.ts'),
  'retirement-savings': () => import('../calculators/retirement.ts'),
  'debt-to-income': () => import('../calculators/debt-to-income.ts'),
};

export async function loadMath(slug: string): Promise<CalculatorMath> {
  const loader = mathLoaders[slug];
  if (!loader) throw new Error(`Unknown calculator: ${slug}`);
  const mod = await loader();
  return mod.default;
}
