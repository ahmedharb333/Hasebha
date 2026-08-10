import type { CalcInput, CalcOutput, CalculatorMath } from './types';

const MONTHS_PER_YEAR = 12;

function toNumber(raw: string | undefined): number {
  if (raw === undefined || raw === null || raw === '') return NaN;
  return Number(raw);
}

function checkNumber(raw: string | undefined, min: number, max: number): string | null {
  if (raw === undefined || raw === '') return 'required';
  const v = toNumber(raw);
  if (!Number.isFinite(v)) return 'invalid';
  if (v < min) return 'min';
  if (v > max) return 'max';
  return null;
}

function optional(raw: string | undefined): number {
  const v = toNumber(raw);
  return Number.isFinite(v) ? v : 0;
}

export const employeeCost: CalculatorMath = {
  slug: 'employee-cost',
  fields: [
    { id: 'grossSalary', type: 'number', required: true, min: 0.000001, max: 1e12, step: 'any' },
    { id: 'employerContributionPct', type: 'number', min: 0, max: 100, step: 'any', defaultValue: '0' },
    { id: 'insuranceCost', type: 'number', min: 0, max: 1e9, step: 'any', defaultValue: '0' },
    { id: 'benefitsCost', type: 'number', min: 0, max: 1e9, step: 'any', defaultValue: '0' },
    { id: 'softwareCost', type: 'number', min: 0, max: 1e9, step: 'any', defaultValue: '0' },
    { id: 'otherRecurringCost', type: 'number', min: 0, max: 1e9, step: 'any', defaultValue: '0' },
    { id: 'equipmentCost', type: 'number', min: 0, max: 1e9, step: 'any', defaultValue: '0' },
    { id: 'recruitmentCost', type: 'number', min: 0, max: 1e9, step: 'any', defaultValue: '0' },
    { id: 'trainingCost', type: 'number', min: 0, max: 1e9, step: 'any', defaultValue: '0' },
    { id: 'otherOneTimeCost', type: 'number', min: 0, max: 1e9, step: 'any', defaultValue: '0' },
    { id: 'currency', type: 'currency' },
  ],
  example: {
    grossSalary: '1500',
    employerContributionPct: '10',
    insuranceCost: '80',
    benefitsCost: '50',
    softwareCost: '30',
    otherRecurringCost: '0',
    equipmentCost: '800',
    recruitmentCost: '500',
    trainingCost: '400',
    otherOneTimeCost: '0',
    currency: 'JOD',
  },

  validate(input: CalcInput): Record<string, string> {
    const errors: Record<string, string> = {};
    const grossErr = checkNumber(input.grossSalary, 0.000001, 1e12);
    if (grossErr) errors.grossSalary = grossErr;
    const check = (id: string, max: number) => {
      const e = checkNumber(input[id], 0, max);
      if (e) errors[id] = e;
    };
    check('employerContributionPct', 100);
    check('insuranceCost', 1e9);
    check('benefitsCost', 1e9);
    check('softwareCost', 1e9);
    check('otherRecurringCost', 1e9);
    check('equipmentCost', 1e9);
    check('recruitmentCost', 1e9);
    check('trainingCost', 1e9);
    check('otherOneTimeCost', 1e9);
    return errors;
  },

  calculate(input: CalcInput): CalcOutput {
    const gross = toNumber(input.grossSalary);
    const contribPct = optional(input.employerContributionPct);
    const insurance = optional(input.insuranceCost);
    const benefits = optional(input.benefitsCost);
    const software = optional(input.softwareCost);
    const otherRecurring = optional(input.otherRecurringCost);
    const equipment = optional(input.equipmentCost);
    const recruitment = optional(input.recruitmentCost);
    const training = optional(input.trainingCost);
    const otherOneTime = optional(input.otherOneTimeCost);

    const contributionAmount = (gross * contribPct) / 100;
    const monthlyCost = gross + contributionAmount + insurance + benefits + software + otherRecurring;
    const annualCost = monthlyCost * MONTHS_PER_YEAR;
    const firstYearTotal = annualCost + equipment + recruitment + training + otherOneTime;
    const salaryShare = firstYearTotal > 0 ? ((gross * MONTHS_PER_YEAR) / firstYearTotal) * 100 : 0;

    return {
      results: [
        { key: 'monthlyCost', value: monthlyCost, kind: 'currency' },
        { key: 'annualCost', value: annualCost, kind: 'currency' },
        { key: 'firstYearTotal', value: firstYearTotal, kind: 'currency', hero: true },
        { key: 'salaryShare', value: salaryShare, kind: 'percent' },
      ],
      table: {
        columns: ['item', 'annual'],
        cellKinds: ['string', 'currency'],
        rows: [
          ['grossSalaryAnnual', gross * MONTHS_PER_YEAR],
          ['employerContribution', contributionAmount * MONTHS_PER_YEAR],
          ['insurance', insurance * MONTHS_PER_YEAR],
          ['benefits', benefits * MONTHS_PER_YEAR],
          ['software', software * MONTHS_PER_YEAR],
          ['otherRecurring', otherRecurring * MONTHS_PER_YEAR],
          ['equipment', equipment],
          ['recruitment', recruitment],
          ['training', training],
          ['otherOneTime', otherOneTime],
        ],
      },
    };
  },
};

export default employeeCost;
