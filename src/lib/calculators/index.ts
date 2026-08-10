import type { CalculatorMath } from './types';
import loanPayment from './loan';
import compoundInterest from './compound';
import savingsGoal from './savings';
import vat from './vat';
import discountPercentage from './discount';
import salaryConverter from './salary';
import overtimePay from './overtime';
import freelanceRate from './freelance';
import employeeCost from './employee-cost';
import leaveBalance from './leave';

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
