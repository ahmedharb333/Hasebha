import type { CalcInput, CalcOutput, CalculatorMath } from './types';
import { getCountryRules, isRegistered } from '../country-rules/registry.ts';
import { countrySelectOptions } from './country-field.ts';
import { annualTax } from './tax.ts';

function toNumber(raw: string | undefined): number {
  return raw === undefined || raw === '' ? NaN : Number(raw);
}

export const grossToNet: CalculatorMath = {
  slug: 'gross-to-net',
  fields: [
    { id: 'country', type: 'select', required: true, options: countrySelectOptions },
    { id: 'monthlyGross', type: 'number', required: true, min: 0, max: 1e12, step: 'any' },
    { id: 'currency', type: 'currency', defaultValue: 'JOD' },
  ],
  example: { country: 'jo', monthlyGross: '1500', currency: 'JOD' },
  validate(input: CalcInput): Record<string, string> {
    const errors: Record<string, string> = {};
    if (!input.country) errors.country = 'required';
    else if (!isRegistered(input.country)) errors.country = 'invalid';
    const g = toNumber(input.monthlyGross);
    if (Number.isNaN(g)) errors.monthlyGross = 'required';
    else if (g < 0) errors.monthlyGross = 'min';
    const rules = isRegistered(input.country ?? '') ? getCountryRules(input.country!) : undefined;
    if (rules && input.currency && input.currency !== rules.currency) errors.currency = 'countryMismatch';
    return errors;
  },
  calculate(input: CalcInput): CalcOutput {
    const rules = getCountryRules(input.country!)!;
    const grossMonthly = toNumber(input.monthlyGross);
    let net = grossMonthly;
    const detail: { key: string; value: number }[] = [];
    for (const step of rules.grossToNet.order) {
      if (step === 'socialInsurance') {
        const capped = Math.min(grossMonthly, rules.socialInsurance.capMonthly);
        const ee = capped * rules.socialInsurance.employeeRate / 100;
        net -= ee;
        detail.push({ key: 'socialInsurance', value: ee });
      } else if (step === 'incomeTax') {
        const taxableAnnual = grossMonthly * 12 - rules.incomeTax.personalAllowance;
        const monthlyTax = Math.max(0, annualTax(rules.incomeTax.brackets, taxableAnnual)) / 12;
        net -= monthlyTax;
        detail.push({ key: 'incomeTax', value: monthlyTax });
      }
    }
    return {
      results: [
        { key: 'netMonthly', value: net, kind: 'currency', hero: true },
        { key: 'totalDeductions', value: grossMonthly - net, kind: 'currency' },
        ...detail.map((d) => ({ key: d.key, value: d.value, kind: 'currency' as const })),
      ],
    };
  },
};

export default grossToNet;
