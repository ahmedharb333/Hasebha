import type { CalcInput, CalcOutput, CalculatorMath, CalcFieldDef } from './types';
import { numeric, checkNumber } from './utils.ts';

interface UnitDef { code: string; factor: number }

const LENGTH: UnitDef[] = [
  { code: 'mm', factor: 0.001 }, { code: 'cm', factor: 0.01 }, { code: 'm', factor: 1 },
  { code: 'km', factor: 1000 }, { code: 'in', factor: 0.0254 }, { code: 'ft', factor: 0.3048 },
  { code: 'yd', factor: 0.9144 }, { code: 'mi', factor: 1609.344 },
];
const WEIGHT: UnitDef[] = [
  { code: 'mg', factor: 1e-6 }, { code: 'g', factor: 0.001 }, { code: 'kg', factor: 1 },
  { code: 'tonne', factor: 1000 }, { code: 'oz', factor: 0.028349523125 },
  { code: 'lb', factor: 0.45359237 }, { code: 'stone', factor: 6.35029318 },
];
const AREA: UnitDef[] = [
  { code: 'mm2', factor: 1e-6 }, { code: 'cm2', factor: 1e-4 }, { code: 'm2', factor: 1 },
  { code: 'hectare', factor: 1e4 }, { code: 'km2', factor: 1e6 }, { code: 'in2', factor: 0.00064516 },
  { code: 'ft2', factor: 0.09290304 }, { code: 'yd2', factor: 0.83612736 }, { code: 'acre', factor: 4046.8564224 },
];
const VOLUME: UnitDef[] = [
  { code: 'ml', factor: 0.001 }, { code: 'l', factor: 1 }, { code: 'cm3', factor: 0.001 },
  { code: 'm3', factor: 1000 }, { code: 'gal', factor: 3.785411784 }, { code: 'qt', factor: 0.946352946 },
  { code: 'floz', factor: 0.0295735295625 }, { code: 'tsp', factor: 0.00492892159375 },
  { code: 'tbsp', factor: 0.01478676478125 },
];
const TEMPERATURE: string[] = ['celsius', 'fahrenheit', 'kelvin'];

function toCelsius(value: number, unit: string): number {
  if (unit === 'fahrenheit') return ((value - 32) * 5) / 9;
  if (unit === 'kelvin') return value - 273.15;
  return value;
}
function fromCelsius(c: number, unit: string): number {
  if (unit === 'fahrenheit') return (c * 9) / 5 + 32;
  if (unit === 'kelvin') return c + 273.15;
  return c;
}

function unitOptions(defs: UnitDef[]) {
  return defs.map((u) => ({ value: u.code, label: u.code }));
}
const CATEGORIES = [
  { value: 'length', label: 'length' },
  { value: 'weight', label: 'weight' },
  { value: 'temperature', label: 'temperature' },
  { value: 'area', label: 'area' },
  { value: 'volume', label: 'volume' },
];

const fields: CalcFieldDef[] = [
  { id: 'value', type: 'number', required: true, step: 'any' },
  { id: 'category', type: 'select', defaultValue: 'length', options: CATEGORIES },
];
const CATEGORY_UNITS: Record<string, UnitDef[] | string[]> = { length: LENGTH, weight: WEIGHT, temperature: TEMPERATURE, area: AREA, volume: VOLUME };
const UNITS: Record<string, number> = {};
for (const defs of [LENGTH, WEIGHT, AREA, VOLUME]) for (const u of defs) UNITS[u.code] = u.factor;
for (const [cat, defs] of Object.entries(CATEGORY_UNITS)) {
  const opts = Array.isArray(defs) && typeof defs[0] === 'string'
    ? (defs as string[]).map((c) => ({ value: c, label: c }))
    : unitOptions(defs as UnitDef[]);
  fields.push({ id: `from${cat}`, type: 'select', defaultValue: opts[0].value, options: opts, showIf: { field: 'category', values: [cat] } });
  fields.push({ id: `to${cat}`, type: 'select', defaultValue: opts[1]?.value ?? opts[0].value, options: opts, showIf: { field: 'category', values: [cat] } });
}

export const unitConverter: CalculatorMath = {
  slug: 'unit-converter',
  fields,
  example: { value: '1000', category: 'length', fromlength: 'm', tolength: 'km' },

  validate(input: CalcInput): Record<string, string> {
    const errors: Record<string, string> = {};
    const v = checkNumber(input.value, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
    if (v) errors.value = v;
    const category = input.category ?? 'length';
    if (category !== 'temperature' && Number(input.value) < 0) errors.value = 'min';
    if (input[`from${category}`] === input[`to${category}`]) errors[`to${category}`] = 'invalid';
    return errors;
  },

  calculate(input: CalcInput): CalcOutput {
    const value = numeric(input, 'value');
    const category = input.category ?? 'length';
    const from = input[`from${category}`];
    const to = input[`to${category}`];
    let converted: number;
    if (category === 'temperature') {
      converted = fromCelsius(toCelsius(value, from), to);
    } else {
      const base = value * (UNITS[from] ?? 1);
      converted = base / (UNITS[to] ?? 1);
    }
    const defs = CATEGORY_UNITS[category];
    const codes = Array.isArray(defs) && typeof defs[0] === 'string' ? (defs as string[]) : (defs as UnitDef[]).map((u) => u.code);
    const rows: (string | number)[][] = codes.map((code) => [
      code,
      category === 'temperature'
        ? fromCelsius(toCelsius(value, from), code)
        : (value * (UNITS[from] ?? 1)) / (UNITS[code] ?? 1),
    ]);
    return {
      results: [{ key: 'convertedValue', value: converted, kind: 'number', hero: true }],
      table: { columns: ['unit', 'value'], cellKinds: ['string', 'number'], rows },
    };
  },
};

export default unitConverter;
