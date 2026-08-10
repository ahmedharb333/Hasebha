import type { Currency } from '../config/currencies';
import type { Locale } from '../config/site';

const ARABIC_DIGITS = '٠١٢٣٤٥٦٧٨٩';
const PERSIAN_DIGITS = '۰۱۲۳۴۵۶۷۸۹';
const ASCII_DIGITS = '0123456789';

/** Convert Arabic-Indic and Persian-Indic digits to ASCII digits. */
export function normalizeDigits(input: string): string {
  let out = '';
  for (const ch of input) {
    const a = ARABIC_DIGITS.indexOf(ch);
    const p = PERSIAN_DIGITS.indexOf(ch);
    if (a !== -1) out += ASCII_DIGITS[a];
    else if (p !== -1) out += ASCII_DIGITS[p];
    else out += ch;
  }
  return out;
}

/** Parse a user-entered number. Accepts Arabic/Western digits, Arabic and
 * Western thousands/decimal separators. Returns null when the input is empty
 * or not a valid number. */
export function parseNumber(raw: string): number | null {
  const normalized = normalizeDigits(raw).trim();
  if (normalized === '') return null;
  // Arabic separators: ٬ (thousands) and ٫ (decimal).
  const cleaned = normalized
    .replace(/٬/g, '')
    .replace(/٫/g, '.')
    .replace(/\s/g, '')
    .replace(/,/g, '');
  if (!/^[-+]?\d*\.?\d*$/.test(cleaned)) return null;
  const value = Number(cleaned);
  return Number.isFinite(value) ? value : null;
}

/** True when the value is finite and not NaN. */
export function isFiniteNumber(value: number): boolean {
  return Number.isFinite(value);
}

/** Round to a number of decimals without floating-point drift. */
export function round(value: number, decimals: number): number {
  const factor = 10 ** decimals;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

const formatters = new Map<string, Intl.NumberFormat>();

function getFormatter(locale: Locale, maxFrac: number, minFrac = 0): Intl.NumberFormat {
  // Use Latin digits for numbers even in Arabic content for consistent
  // separators and cross-device readability.
  const key = `${locale}-${maxFrac}-${minFrac}`;
  let fmt = formatters.get(key);
  if (!fmt) {
    fmt = new Intl.NumberFormat(locale === 'ar' ? 'ar-u-nu-latn' : 'en-US', {
      minimumFractionDigits: minFrac,
      maximumFractionDigits: maxFrac,
      useGrouping: true,
    });
    formatters.set(key, fmt);
  }
  return fmt;
}

export function formatNumber(value: number, locale: Locale, maxFrac = 2, minFrac = 0): string {
  if (!Number.isFinite(value)) return '—';
  return getFormatter(locale, maxFrac, minFrac).format(value);
}

export function formatCurrency(value: number, currency: Currency, locale: Locale, maxFrac?: number): string {
  const decimals = maxFrac ?? currency.decimals;
  const num = formatNumber(value, locale, decimals, Math.min(decimals, 2) > 0 ? 0 : 0);
  const code = currency.code;
  return locale === 'ar' ? `${num} ${code}` : `${code} ${num}`;
}

export function formatPercent(value: number, locale: Locale, maxFrac = 2): string {
  const sign = locale === 'ar' ? '٪' : '%';
  return `${formatNumber(value, locale, maxFrac)}${sign}`;
}
