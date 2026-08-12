import type { CalcContent } from '../../lib/calculators/types.ts';
import type { Locale } from '../../config/site.ts';
import loanPayment from './loan-payment.ts';
import compoundInterest from './compound-interest.ts';
import savingsGoal from './savings-goal.ts';
import vat from './vat.ts';
import discountPercentage from './discount-percentage.ts';
import salaryConverter from './salary-converter.ts';
import overtimePay from './overtime-pay.ts';
import freelanceRate from './freelance-rate.ts';
import employeeCost from './employee-cost.ts';
import leaveBalance from './leave-balance.ts';
import mortgage from './mortgage.ts';
import loanComparison from './loan-comparison.ts';
import earlyPayoff from './early-payoff.ts';
import zakat from './zakat.ts';
import retirementSavings from './retirement-savings.ts';
import debtToIncome from './debt-to-income.ts';
import bmi from './bmi.ts';
import bmr from './bmr.ts';
import idealWeight from './ideal-weight.ts';
import bodyFat from './body-fat.ts';
import calorieIntake from './calorie-intake.ts';
import gpa from './gpa.ts';
import gradeAverage from './grade-average.ts';
import finalGradePlanner from './final-grade-planner.ts';
import age from './age.ts';
import dateDifference from './date-difference.ts';
import tip from './tip.ts';
import unitConverter from './unit-converter.ts';
import markupMargin from './markup-margin.ts';
import breakEven from './break-even.ts';
import wholesaleRetail from './wholesale-retail.ts';
import endOfService from './end-of-service.ts';
import socialInsurance from './social-insurance.ts';
import noticePeriod from './notice-period.ts';
import maternityLeave from './maternity-leave.ts';
import grossToNet from './gross-to-net.ts';
import incomeTax from './income-tax.ts';

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
  mortgage,
  'loan-comparison': loanComparison,
  'early-payoff': earlyPayoff,
  zakat,
  'retirement-savings': retirementSavings,
  'debt-to-income': debtToIncome,
  bmi,
  bmr,
  'ideal-weight': idealWeight,
  'body-fat': bodyFat,
  'calorie-intake': calorieIntake,
  gpa,
  'grade-average': gradeAverage,
  'final-grade-planner': finalGradePlanner,
  age,
  'date-difference': dateDifference,
  tip,
  'unit-converter': unitConverter,
  'markup-margin': markupMargin,
  'break-even': breakEven,
  'wholesale-retail': wholesaleRetail,
  'end-of-service': endOfService,
  'social-insurance': socialInsurance,
  'notice-period': noticePeriod,
  'maternity-leave': maternityLeave,
  'gross-to-net': grossToNet,
  'income-tax': incomeTax,
};

export function getCalcContent(slug: string, locale: Locale): CalcContent {
  const entry = registry[slug];
  if (!entry) throw new Error(`No content registered for calculator: ${slug}`);
  return entry[locale];
}
