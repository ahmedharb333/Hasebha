import type { CalcInput, CalcOutput, CalculatorMath } from './types';

const WEEKS_PER_YEAR = 52;
const DAYS_PER_WEEK = 5;

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

export const freelanceRate: CalculatorMath = {
  slug: 'freelance-rate',
  fields: [
    { id: 'desiredIncome', type: 'number', required: true, min: 0.000001, max: 1e12, step: 'any' },
    { id: 'annualExpenses', type: 'number', required: true, min: 0, max: 1e12, step: 'any' },
    { id: 'taxReservePct', type: 'number', required: true, min: 0, max: 50, step: 'any', defaultValue: '0' },
    { id: 'nonBillablePct', type: 'number', required: true, min: 0, max: 90, step: 'any', defaultValue: '20' },
    { id: 'vacationDays', type: 'number', required: true, min: 0, max: 120, step: 'any', defaultValue: '20' },
    { id: 'sickDays', type: 'number', required: true, min: 0, max: 120, step: 'any', defaultValue: '5' },
    { id: 'hoursPerWeek', type: 'number', required: true, min: 1, max: 84, step: 'any', defaultValue: '40' },
    { id: 'profitMarginPct', type: 'number', required: true, min: 0, max: 100, step: 'any', defaultValue: '0' },
    { id: 'projectHours', type: 'number', min: 0, max: 10000, step: 'any', defaultValue: '0' },
    { id: 'currency', type: 'currency' },
  ],
  example: {
    desiredIncome: '36000',
    annualExpenses: '4000',
    taxReservePct: '10',
    nonBillablePct: '20',
    vacationDays: '20',
    sickDays: '5',
    hoursPerWeek: '40',
    profitMarginPct: '15',
    projectHours: '200',
    currency: 'USD',
  },

  validate(input: CalcInput): Record<string, string> {
    const errors: Record<string, string> = {};
    const check = (id: string, min: number, max: number) => {
      const e = checkNumber(input[id], min, max);
      if (e) errors[id] = e;
    };
    check('desiredIncome', 0.000001, 1e12);
    check('annualExpenses', 0, 1e12);
    check('taxReservePct', 0, 50);
    check('nonBillablePct', 0, 90);
    check('vacationDays', 0, 120);
    check('sickDays', 0, 120);
    check('hoursPerWeek', 1, 84);
    check('profitMarginPct', 0, 100);
    check('projectHours', 0, 10000);
    return errors;
  },

  calculate(input: CalcInput): CalcOutput {
    const income = toNumber(input.desiredIncome);
    const expenses = toNumber(input.annualExpenses);
    const taxPct = toNumber(input.taxReservePct);
    const nonBillablePct = toNumber(input.nonBillablePct);
    const vacationDays = toNumber(input.vacationDays);
    const sickDays = toNumber(input.sickDays);
    const hoursPerWeek = toNumber(input.hoursPerWeek);
    const marginPct = toNumber(input.profitMarginPct);
    const projectHours = toNumber(input.projectHours);

    const hoursPerDay = hoursPerWeek / DAYS_PER_WEEK;
    const grossHours = hoursPerWeek * WEEKS_PER_YEAR;
    const productiveHours = grossHours * (1 - nonBillablePct / 100);
    const leaveHours = (vacationDays + sickDays) * hoursPerDay;
    const billableHours = Math.max(productiveHours - leaveHours, 0.001);

    const baseRevenue = (income + expenses) / (1 - taxPct / 100);
    const minimumHourly = baseRevenue / billableHours;
    const recommendedRevenue = marginPct >= 100 ? Infinity : baseRevenue / (1 - marginPct / 100);
    const recommendedHourly = recommendedRevenue / billableHours;
    const dailyRate = recommendedHourly * hoursPerDay;
    const projectRate = projectHours > 0 ? recommendedHourly * projectHours : 0;

    return {
      results: [
        { key: 'minimumHourly', value: minimumHourly, kind: 'currency' },
        { key: 'recommendedHourly', value: recommendedHourly, kind: 'currency', hero: true },
        { key: 'dailyRate', value: dailyRate, kind: 'currency' },
        { key: 'projectRate', value: projectRate, kind: 'currency' },
        { key: 'billableHours', value: billableHours, kind: 'number' },
      ],
    };
  },
};

export default freelanceRate;
