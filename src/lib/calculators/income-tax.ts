import type { CalcInput, CalcOutput, CalculatorMath } from './types';
import { getCountryRules, isRegistered } from '../country-rules/registry.ts';
import { countrySelectOptions } from './country-field.ts';
import { annualTax } from './tax.ts';

function toNumber(raw: string | undefined): number {
  return raw === undefined || raw === '' ? NaN : Number(raw);
}

export const incomeTax: CalculatorMath = {
  slug: 'income-tax',
  fields: [
    { id: 'country', type: 'select', required: true, options: countrySelectOptions },
    { id: 'annualIncome', type: 'number', required: true, min: 0, max: 1e12, step: 'any' },
    { id: 'currency', type: 'currency', defaultValue: 'JOD' },
  ],
  example: { country: 'jo', annualIncome: '24000', currency: 'JOD' },
  validate(input: CalcInput): Record<string, string> {
    const errors: Record<string, string> = {};
    if (!input.country) errors.country = 'required';
    else if (!isRegistered(input.country)) errors.country = 'invalid';
    const a = toNumber(input.annualIncome);
    if (Number.isNaN(a)) errors.annualIncome = 'required';
    else if (a < 0) errors.annualIncome = 'min';
    const rules = isRegistered(input.country ?? '') ? getCountryRules(input.country!) : undefined;
    if (rules && input.currency && input.currency !== rules.currency) errors.currency = 'countryMismatch';
    return errors;
  },
  calculate(input: CalcInput): CalcOutput {
    const rules = getCountryRules(input.country!)!;
    const annual = toNumber(input.annualIncome);
    const taxable = Math.max(0, annual - rules.incomeTax.personalAllowance);
    const tax = rules.incomeTax.brackets.length === 0 ? 0 : annualTax(rules.incomeTax.brackets, taxable);
    return {
      results: [
        { key: 'taxAmount', value: tax, kind: 'currency', hero: true },
        { key: 'effectiveRate', value: annual > 0 ? (tax / annual) * 100 : 0, kind: 'percent' },
        { key: 'taxableIncome', value: taxable, kind: 'currency' },
      ],
    };
  },
};

export default incomeTax;
