import type { CalcInput, CalcOutput, CalculatorMath } from './types';
import { getCountryRules, isRegistered } from '../country-rules/registry.ts';
import { countrySelectOptions } from './country-field.ts';

function toNumber(raw: string | undefined): number {
  if (raw === undefined || raw === '') return NaN;
  return Number(raw);
}

function yearsBetween(start: string, end: string): number {
  const s = new Date(start + 'T00:00:00');
  const e = new Date(end + 'T00:00:00');
  if (Number.isNaN(s.getTime()) || Number.isNaN(e.getTime()) || e < s) return NaN;
  let years = e.getFullYear() - s.getFullYear();
  const m = e.getMonth() - s.getMonth();
  const d = e.getDate() - s.getDate();
  if (m < 0 || (m === 0 && d < 0)) years -= 1;
  const adjusted = new Date(e.getFullYear() - (m < 0 || (m === 0 && d < 0) ? 1 : 0), s.getMonth(), s.getDate());
  const remDays = Math.floor((e.getTime() - adjusted.getTime()) / 86400000);
  return years + remDays / 365;
}

export const endOfService: CalculatorMath = {
  slug: 'end-of-service',
  fields: [
    { id: 'country', type: 'select', required: true, options: countrySelectOptions },
    { id: 'startDate', type: 'date', required: true },
    { id: 'endDate', type: 'date', required: true },
    { id: 'monthlyBasic', type: 'number', required: true, min: 0, max: 1e12, step: 'any', isCurrency: true },
    { id: 'resignation', type: 'select', defaultValue: 'terminated', options: [
      { value: 'terminated', label: 'terminated' },
      { value: 'voluntary', label: 'voluntary' },
    ] },
    { id: 'currency', type: 'currency', defaultValue: 'JOD' },
  ],
  example: {
    country: 'jo', startDate: '2018-01-01', endDate: '2026-01-01', monthlyBasic: '800', resignation: 'terminated', currency: 'JOD',
  },
  validate(input: CalcInput): Record<string, string> {
    const errors: Record<string, string> = {};
    if (!input.country) errors.country = 'required';
    else if (!isRegistered(input.country)) errors.country = 'invalid';
    if (!toNumber(input.monthlyBasic)) errors.monthlyBasic = 'required';
    const y = yearsBetween(input.startDate ?? '', input.endDate ?? '');
    if (Number.isNaN(y)) errors.endDate = 'invalid';
    const rules = isRegistered(input.country ?? '') ? getCountryRules(input.country!) : undefined;
    if (rules && input.currency && input.currency !== rules.currency) errors.currency = 'countryMismatch';
    return errors;
  },
  calculate(input: CalcInput): CalcOutput {
    const rules = getCountryRules(input.country!)!;
    const years = yearsBetween(input.startDate!, input.endDate!);
    const salary = toNumber(input.monthlyBasic);
    const daily = salary / 30;
    let days = 0;
    const bands = rules.endOfService.bands;
    for (let i = 0; i < bands.length; i++) {
      const from = bands[i].fromYears;
      const to = i + 1 < bands.length ? bands[i + 1].fromYears : Infinity;
      if (years > from) days += (Math.min(years, to) - from) * bands[i].daysPerYear;
    }
    if (rules.endOfService.capMonths) days = Math.min(days, rules.endOfService.capMonths * 30);
    if (rules.endOfService.resignation && input.resignation === 'voluntary') {
      const scale = [...rules.endOfService.resignation].sort((a, b) => b.fromYears - a.fromYears).find((s) => years >= s.fromYears);
      if (scale) days *= scale.fraction;
    }
    const gratuity = days * daily;
    return {
      results: [
        { key: 'gratuity', value: gratuity, kind: 'currency', hero: true },
        { key: 'days', value: days, kind: 'number' },
        { key: 'years', value: years, kind: 'number' },
      ],
    };
  },
};

export default endOfService;
