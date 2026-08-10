import type { CurrencyCode } from '../../config/currencies';
import type { Locale } from '../../config/site';

export interface CalcFieldOption {
  value: string;
  label: string;
}

export interface CalcFieldDef {
  id: string;
  type: 'number' | 'select' | 'radio' | 'date' | 'currency' | 'hidden';
  required?: boolean;
  min?: number;
  max?: number;
  step?: number | 'any';
  options?: CalcFieldOption[];
  /** Only one currency field per calculator. */
  isCurrency?: boolean;
  /** Default selected value for selects/radios. */
  defaultValue?: string;
  /** Only show this field while the controlling field has one of these values. */
  showIf?: { field: string; values: string[] };
}

export interface CalcInput {
  [fieldId: string]: string;
}

export interface CalcResultValue {
  /** Result key (matched against localized content). */
  key: string;
  value: number;
  /** Format as currency. */
  kind?: 'currency' | 'percent' | 'number';
  /** Highlight as the primary result. */
  hero?: boolean;
}

export type TableCellKind = 'string' | 'number' | 'currency' | 'percent' | 'date';

export interface CalcTable {
  columns: string[];
  cellKinds: TableCellKind[];
  rows: (string | number)[][];
}

export interface CalcOutput {
  results: CalcResultValue[];
  table?: CalcTable;
}

/** Language-neutral calculation engine contract. */
export interface CalculatorMath {
  slug: string;
  fields: CalcFieldDef[];
  /** Example values shown via the "fill example" button. */
  example: CalcInput;
  /** Returns fieldId -> error code ('required' | 'invalid' | 'min' | 'max'). */
  validate(input: CalcInput): Record<string, string>;
  /** Precondition: input is valid. Returns raw numeric output. */
  calculate(input: CalcInput): CalcOutput;
}

/* ------------------------------------------------------------------ */
/* Localized content contract                                          */
/* ------------------------------------------------------------------ */

export interface FieldContent {
  label: string;
  placeholder?: string;
  unit?: string;
  hint?: string;
  options?: Record<string, string>;
}

export interface ResultContent {
  label: string;
  hint?: string;
  hero?: boolean;
}

export interface TableContent {
  title: string;
  columns: Record<string, string>;
  caption?: string;
  /** Localized labels for string cells (row item names). */
  strings?: Record<string, string>;
}

export interface CalcContent {
  locale: Locale;
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  fields: Record<string, FieldContent>;
  errorMessages: Record<string, string>;
  results: Record<string, ResultContent>;
  table?: TableContent;
  resultTitle: string;
  formula: string;
  exampleHtml: string;
  assumptions: string[];
  whenUseful: string;
  mistakes: string[];
  faqs: { q: string; a: string }[];
  methodologyNote: string;
  disclaimerNote?: string;
  lastReviewed: string;
  currencyDefault: CurrencyCode;
  currencyLabel: string;
  requiredNote: string;
  buttons: {
    calculate: string;
    reset: string;
    copy: string;
    copied: string;
    share: string;
    example: string;
  };
  ui: {
    resultTitle: string;
    copySuccess: string;
    copyFail: string;
    shareFail: string;
    ariaResult: string;
  };
  guideTitle: string;
  relatedTitle: string;
}
