/**
 * MCP adapter — the single bridge between MCP tools and Klar's existing
 * calculation engines. It does NOT contain any calculation formulas: it looks
 * up the engine via the shared registry (getMath) and reuses the engine's own
 * validate() + calculate() so MCP and the website always compute identically.
 */
import { getMath } from '../lib/calculators/index.ts';
import type { CalcInput, CalcOutput } from '../lib/calculators/types.ts';

export interface CalcSuccess {
  success: true;
  calculator: string;
  result: CalcOutput;
}

export interface CalcFailure {
  success: false;
  error: {
    code: 'VALIDATION_ERROR' | 'UNKNOWN_CALCULATOR' | 'CALCULATION_ERROR';
    message: string;
    /** fieldId -> error code ('required' | 'invalid' | 'min' | 'max' | ...). */
    fields?: Record<string, string>;
  };
}

export type CalcResponse = CalcSuccess | CalcFailure;

/**
 * Normalize agent-friendly input (numbers, strings, undefined) into the
 * engine's string-keyed CalcInput. Undefined/null are dropped so the engine's
 * own "required" checks decide what is missing.
 */
export function toCalcInput(raw: Record<string, unknown>): CalcInput {
  const input: CalcInput = {};
  for (const [key, value] of Object.entries(raw)) {
    if (value === undefined || value === null) continue;
    input[key] = typeof value === 'string' ? value : String(value);
  }
  return input;
}

/**
 * Run a calculator by slug through its existing engine.
 * Validation and calculation are the engine's own — never reimplemented here.
 */
export function runCalculator(slug: string, raw: Record<string, unknown>): CalcResponse {
  let math;
  try {
    math = getMath(slug);
  } catch {
    return { success: false, error: { code: 'UNKNOWN_CALCULATOR', message: `No calculator registered for slug: ${slug}` } };
  }

  // Apply the engine's own field defaults (e.g. termUnit='years',
  // frequencies='monthly') for any omitted field, so MCP behaves like the
  // website form regardless of how the caller supplied input.
  const input = toCalcInput(raw);
  for (const field of math.fields) {
    if (field.defaultValue !== undefined && (input[field.id] === undefined || input[field.id] === '')) {
      input[field.id] = field.defaultValue;
    }
  }

  const fieldErrors = math.validate(input);
  if (Object.keys(fieldErrors).length > 0) {
    return {
      success: false,
      error: { code: 'VALIDATION_ERROR', message: 'One or more inputs are invalid.', fields: fieldErrors },
    };
  }

  try {
    const result = math.calculate(input);
    return { success: true, calculator: slug, result };
  } catch (e) {
    return {
      success: false,
      error: { code: 'CALCULATION_ERROR', message: e instanceof Error ? e.message : 'Calculation failed.' },
    };
  }
}
