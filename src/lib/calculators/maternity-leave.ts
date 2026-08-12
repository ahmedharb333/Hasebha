import type { CalcInput, CalcOutput, CalculatorMath } from './types';
import { getCountryRules, isRegistered } from '../country-rules/registry.ts';
import { countrySelectOptions } from './country-field.ts';

export const maternityLeave: CalculatorMath = {
  slug: 'maternity-leave',
  fields: [{ id: 'country', type: 'select', required: true, options: countrySelectOptions }],
  example: { country: 'ae' },
  validate(input: CalcInput): Record<string, string> {
    const errors: Record<string, string> = {};
    if (!input.country) errors.country = 'required';
    else if (!isRegistered(input.country)) errors.country = 'invalid';
    return errors;
  },
  calculate(input: CalcInput): CalcOutput {
    const rules = getCountryRules(input.country!)!;
    const days = rules.leave.maternityDays;
    return {
      results: [
        { key: 'maternityDays', value: days, kind: 'number', hero: true },
        { key: 'maternityWeeks', value: Math.round(days / 7), kind: 'number' },
      ],
    };
  },
};

export default maternityLeave;
