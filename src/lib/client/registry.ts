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
  bmi: () => import('../calculators/bmi.ts'),
  bmr: () => import('../calculators/bmr.ts'),
  'ideal-weight': () => import('../calculators/ideal-weight.ts'),
  'body-fat': () => import('../calculators/body-fat.ts'),
  'calorie-intake': () => import('../calculators/calorie.ts'),
  gpa: () => import('../calculators/gpa.ts'),
  'grade-average': () => import('../calculators/grade-average.ts'),
  'final-grade-planner': () => import('../calculators/final-grade.ts'),
  age: () => import('../calculators/age.ts'),
  'date-difference': () => import('../calculators/date-difference.ts'),
  tip: () => import('../calculators/tip.ts'),
  'unit-converter': () => import('../calculators/unit-converter.ts'),
  'markup-margin': () => import('../calculators/markup-margin.ts'),
  'break-even': () => import('../calculators/break-even.ts'),
  'wholesale-retail': () => import('../calculators/wholesale-retail.ts'),
  'end-of-service': () => import('../calculators/end-of-service.ts'),
  'social-insurance': () => import('../calculators/social-insurance.ts'),
};

export async function loadMath(slug: string): Promise<CalculatorMath> {
  const loader = mathLoaders[slug];
  if (!loader) throw new Error(`Unknown calculator: ${slug}`);
  const mod = await loader();
  return mod.default;
}
