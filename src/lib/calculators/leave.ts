import type { CalcInput, CalcOutput, CalculatorMath } from './types';
import { getCountryRules, isRegistered } from '../country-rules/registry.ts';
import { countrySelectOptions } from './country-field.ts';

const METHODS = ['monthly', 'daily', 'full'] as const;
const DAYS_PER_YEAR = 365;

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

function parseDate(raw: string | undefined): Date | null {
  if (!raw) return null;
  const d = new Date(raw + 'T00:00:00');
  return Number.isNaN(d.getTime()) ? null : d;
}

function fullMonthsBetween(start: Date, end: Date): number {
  let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  if (end.getDate() < start.getDate()) months -= 1;
  return Math.max(months, 0);
}

export const leaveBalance: CalculatorMath = {
  slug: 'leave-balance',
  fields: [
    { id: 'country', type: 'select', defaultValue: '', options: countrySelectOptions },
    {
      id: 'tenureYears',
      type: 'number',
      min: 0,
      max: 60,
      step: 'any',
      defaultValue: '0',
      showIf: { field: 'country', values: ['jo', 'sa', 'ae', 'kw', 'qa', 'bh', 'om'] },
    },
    { id: 'annualEntitlement', type: 'number', required: true, min: 0, max: 365, step: 'any', showIf: { field: 'country', values: [''] } },
    { id: 'startDate', type: 'date', required: true },
    { id: 'calcDate', type: 'date', required: true },
    { id: 'leaveTaken', type: 'number', min: 0, max: 1000, step: 'any', defaultValue: '0' },
    { id: 'approvedCarryover', type: 'number', min: 0, max: 1000, step: 'any', defaultValue: '0' },
    { id: 'accrualMethod', type: 'radio', defaultValue: 'monthly', options: METHODS.map((m) => ({ value: m, label: m })) },
    { id: 'maxCarryover', type: 'number', min: 0, max: 1000, step: 'any' },
  ],
  example: {
    country: '',
    tenureYears: '0',
    annualEntitlement: '30',
    startDate: '2024-01-01',
    calcDate: '2025-01-01',
    leaveTaken: '10',
    approvedCarryover: '0',
    accrualMethod: 'monthly',
    maxCarryover: '',
  },

  validate(input: CalcInput): Record<string, string> {
    const errors: Record<string, string> = {};
    if (input.country) {
      if (!isRegistered(input.country)) errors.country = 'invalid';
      const tErr = checkNumber(input.tenureYears, 0, 60);
      if (tErr) errors.tenureYears = tErr;
    } else {
      const entErr = checkNumber(input.annualEntitlement, 0, 365);
      if (entErr) errors.annualEntitlement = entErr;
    }

    const start = parseDate(input.startDate);
    const calc = parseDate(input.calcDate);
    if (!start) errors.startDate = 'invalid';
    if (!calc) errors.calcDate = 'invalid';
    if (start && calc && calc < start) errors.calcDate = 'min';

    const takenErr = checkNumber(input.leaveTaken, 0, 1000);
    if (takenErr) errors.leaveTaken = takenErr;
    const carryErr = checkNumber(input.approvedCarryover, 0, 1000);
    if (carryErr) errors.approvedCarryover = carryErr;

    if (input.maxCarryover !== undefined && input.maxCarryover !== '') {
      const maxErr = checkNumber(input.maxCarryover, 0, 1000);
      if (maxErr) errors.maxCarryover = maxErr;
    }

    if (!input.accrualMethod || !(METHODS as readonly string[]).includes(input.accrualMethod)) {
      errors.accrualMethod = 'invalid';
    }
    return errors;
  },

  calculate(input: CalcInput): CalcOutput {
    const country = input.country;
    let entitlement: number;
    let lawDerived = false;
    if (country && isRegistered(country)) {
      const rules = getCountryRules(country)!;
      const tenure = toNumber(input.tenureYears);
      const band =
        [...rules.leave.annualDays].sort((a, b) => b.fromYears - a.fromYears).find((b) => tenure >= b.fromYears) ??
        rules.leave.annualDays[0];
      entitlement = band.days;
      lawDerived = true;
    } else {
      entitlement = toNumber(input.annualEntitlement);
    }

    const start = parseDate(input.startDate)!;
    const calc = parseDate(input.calcDate)!;
    const taken = toNumber(input.leaveTaken);
    const carryover = toNumber(input.approvedCarryover);
    const method = input.accrualMethod as (typeof METHODS)[number];
    const maxCarryoverRaw = input.maxCarryover;
    const maxCarryover = maxCarryoverRaw === undefined || maxCarryoverRaw === '' ? null : toNumber(maxCarryoverRaw);

    let accrued: number;
    if (method === 'full') {
      accrued = entitlement;
    } else if (method === 'daily') {
      const days = Math.floor((calc.getTime() - start.getTime()) / 86_400_000);
      accrued = (entitlement / DAYS_PER_YEAR) * Math.max(days, 0);
    } else {
      const months = fullMonthsBetween(start, calc);
      accrued = (entitlement / 12) * months;
    }

    let effectiveCarryover = carryover;
    let expired = 0;
    if (maxCarryover !== null && carryover > maxCarryover) {
      effectiveCarryover = maxCarryover;
      expired = carryover - maxCarryover;
    }

    const available = Math.max(accrued + effectiveCarryover - taken, 0);
    const remainingEntitlement = Math.max(entitlement - taken, 0);

    const results: CalcOutput['results'] = [];
    if (lawDerived) {
      results.push({ key: 'annualEntitlement', value: entitlement, kind: 'number', hero: true });
    }
    results.push(
      { key: 'accrued', value: accrued, kind: 'number', hero: !lawDerived },
      { key: 'used', value: taken, kind: 'number' },
      { key: 'available', value: available, kind: 'number' },
      { key: 'remainingEntitlement', value: remainingEntitlement, kind: 'number' },
      { key: 'carryover', value: effectiveCarryover, kind: 'number' },
      { key: 'expired', value: expired, kind: 'number' },
    );

    return { results };
  },
};

export default leaveBalance;
