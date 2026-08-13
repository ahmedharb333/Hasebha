import type { CalcInput, CalcOutput, CalculatorMath } from './types';
import { getCountryRules, isRegistered } from '../country-rules/registry.ts';
import { countrySelectOptions } from './country-field.ts';

function toNumber(raw: string | undefined): number {
  return raw === undefined || raw === '' ? NaN : Number(raw);
}

export const socialInsurance: CalculatorMath = {
  slug: 'social-insurance',
  fields: [
    { id: 'country', type: 'select', required: true, options: countrySelectOptions },
    { id: 'monthlySalary', type: 'number', required: true, min: 0, max: 1e12, step: 'any' },
    { id: 'currency', type: 'currency', defaultValue: 'JOD' },
  ],
  example: { country: 'sa', monthlySalary: '15000', currency: 'SAR' },
  validate(input: CalcInput): Record<string, string> {
    const errors: Record<string, string> = {};
    if (!input.country) errors.country = 'required';
    else if (!isRegistered(input.country)) errors.country = 'invalid';
    const s = toNumber(input.monthlySalary);
    if (Number.isNaN(s)) errors.monthlySalary = 'required';
    else if (s < 0) errors.monthlySalary = 'min';
    const rules = isRegistered(input.country ?? '') ? getCountryRules(input.country!) : undefined;
    if (rules && input.currency && input.currency !== rules.currency) errors.currency = 'countryMismatch';
    return errors;
  },
  calculate(input: CalcInput): CalcOutput {
    const rules = getCountryRules(input.country!)!;
    const base = toNumber(input.monthlySalary);
    const capped = Math.min(base, rules.socialInsurance.capMonthly);
    const si = rules.socialInsurance;
    const supplementary = si.supplementaryRate !== undefined && si.supplementaryLimit !== undefined
      ? Math.min(capped, si.supplementaryLimit) * si.supplementaryRate / 100
      : 0;
    const ee = capped * si.employeeRate / 100 + supplementary;
    const er = capped * si.employerRate / 100;
    return {
      results: [
        { key: 'employeeShare', value: ee, kind: 'currency', hero: true },
        { key: 'employerShare', value: er, kind: 'currency' },
        { key: 'total', value: ee + er, kind: 'currency' },
        { key: 'cappedBase', value: capped, kind: 'currency' },
      ],
    };
  },
};

export default socialInsurance;
