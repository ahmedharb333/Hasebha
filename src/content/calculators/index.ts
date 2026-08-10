import type { CalcContent } from '../../lib/calculators/types';
import type { Locale } from '../../config/site';
import loanPayment from './loan-payment';
import compoundInterest from './compound-interest';
import savingsGoal from './savings-goal';
import vat from './vat';
import discountPercentage from './discount-percentage';
import salaryConverter from './salary-converter';
import overtimePay from './overtime-pay';
import freelanceRate from './freelance-rate';
import employeeCost from './employee-cost';
import leaveBalance from './leave-balance';

const registry: Record<string, Record<Locale, CalcContent>> = {
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

export function getCalcContent(slug: string, locale: Locale): CalcContent {
  const entry = registry[slug];
  if (!entry) throw new Error(`No content registered for calculator: ${slug}`);
  return entry[locale];
}
