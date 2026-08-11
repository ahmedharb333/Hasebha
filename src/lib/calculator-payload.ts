import type { CalculatorMath, CalcContent } from './calculators/types';
import { CURRENCIES } from '../config/currencies';
import type { CalcPayload, CalcFieldPayload } from './client/calculatorApp';

/** Build the client payload for a calculator from its math + content. */
export function buildCalcPayload(math: CalculatorMath, content: CalcContent, category: string): CalcPayload {
  const fields: CalcFieldPayload[] = math.fields.map((field) => {
    const fieldContent = content.fields[field.id];
    const options = field.options?.map((o) => ({
      value: o.value,
      label: fieldContent?.options?.[o.value] ?? o.label,
    }));
    return {
      id: field.id,
      type: field.type,
      required: field.required,
      min: field.min,
      max: field.max,
      step: field.step,
      options,
      defaultValue: field.defaultValue,
      isCurrency: field.isCurrency,
      showIf: field.showIf,
    };
  });

  return {
    slug: content.slug,
    category,
    locale: content.locale,
    currencyDefault: content.currencyDefault ?? 'JOD',
    currencies: CURRENCIES.map((c) => ({
      code: c.code,
      label: content.locale === 'ar' ? `${c.code} — ${c.labelAr}` : `${c.code} — ${c.labelEn}`,
    })),
    fields,
    errors: content.errorMessages,
    results: content.results,
    table: content.table
      ? { title: content.table.title, caption: content.table.caption, columns: content.table.columns, strings: content.table.strings }
      : undefined,
    ui: content.ui,
    buttons: content.buttons,
    currencyLabel: content.currencyLabel ?? (content.locale === 'ar' ? 'العملة' : 'Currency'),
  };
}

export function payloadJson(math: CalculatorMath, content: CalcContent, category: string): string {
  return JSON.stringify(buildCalcPayload(math, content, category));
}
