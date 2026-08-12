import type { CalcInput, CalcOutput, CalculatorMath } from './types';
import { getCountryRules, isRegistered } from '../country-rules/registry.ts';
import { countrySelectOptions } from './country-field.ts';

function toNumber(raw: string | undefined): number {
  return raw === undefined || raw === '' ? NaN : Number(raw);
}

export const noticePeriod: CalculatorMath = {
  slug: 'notice-period',
  fields: [
    { id: 'country', type: 'select', required: true, options: countrySelectOptions },
    { id: 'tenureYears', type: 'number', required: true, min: 0, max: 50, step: 'any', defaultValue: '2' },
  ],
  example: { country: 'sa', tenureYears: '7' },
  validate(input: CalcInput): Record<string, string> {
    const errors: Record<string, string> = {};
    if (!input.country) errors.country = 'required';
    else if (!isRegistered(input.country)) errors.country = 'invalid';
    const t = toNumber(input.tenureYears);
    if (Number.isNaN(t)) errors.tenureYears = 'required';
    else if (t < 0) errors.tenureYears = 'min';
    return errors;
  },
  calculate(input: CalcInput): CalcOutput {
    const rules = getCountryRules(input.country!)!;
    const t = toNumber(input.tenureYears);
    const band =
      [...rules.noticePeriod.bands].sort((a, b) => b.fromYears - a.fromYears).find((b) => t >= b.fromYears) ??
      rules.noticePeriod.bands[0];
    return {
      results: [
        { key: 'noticeDays', value: band.days, kind: 'number', hero: true },
        { key: 'noticeMonths', value: band.days / 30, kind: 'number' },
      ],
    };
  },
};

export default noticePeriod;
