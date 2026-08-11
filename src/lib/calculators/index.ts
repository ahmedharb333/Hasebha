import type { CalculatorMath } from './types.ts';
import loanPayment from './loan.ts';
import compoundInterest from './compound.ts';
import savingsGoal from './savings.ts';
import vat from './vat.ts';
import discountPercentage from './discount.ts';
import salaryConverter from './salary.ts';
import overtimePay from './overtime.ts';
import freelanceRate from './freelance.ts';
import employeeCost from './employee-cost.ts';
import leaveBalance from './leave.ts';

const registry: Record<string, CalculatorMath> = {
  'loan-payment': loanPayment,
  'compound-interest': compoundInterest,
  'savings-goal': savingsGoal,
  vat,
  'discount-percentage': discountPercentage,
  'salary-converter': salaryConverter,
  'overtime-pay': overtimePay,
  'freelance-rate': freelanceRate,
  'employee-cost': employeeCost,
  'leave-balance': leaveBalance,
};

export function getMath(slug: string): CalculatorMath {
  const math = registry[slug];
  if (!math) throw new Error(`No math engine registered for calculator: ${slug}`);
  return math;
}
