/** Shared pure helpers for calculator math modules. */

export function err(msg: string): never {
  throw new Error(msg);
}

/** Safe parse: returns NaN for anything non-numeric (does not throw). */
export function toNumber(raw: string | undefined): number {
  if (raw === undefined || raw === null || raw === '') return NaN;
  return Number(raw);
}

export function numeric(input: Record<string, string | undefined>, id: string): number {
  const v = toNumber(input[id]);
  if (!Number.isFinite(v)) err(`Invalid numeric field: ${id}`);
  return v;
}

export function optionalNumeric(input: Record<string, string | undefined>, id: string, fallback = 0): number {
  const raw = input[id];
  if (raw === undefined || raw === null || raw === '') return fallback;
  return numeric(input, id);
}

/** Numeric validation helper: returns error code ('required'|'invalid'|'min'|'max') or null. */
export function checkNumber(raw: string | undefined, min: number, max: number): string | null {
  if (raw === undefined || raw === '') return 'required';
  const v = toNumber(raw);
  if (!Number.isFinite(v)) return 'invalid';
  if (v < min) return 'min';
  if (v > max) return 'max';
  return null;
}

/** Fixed-rate annuity monthly payment. months and monthlyRate are per-month. */
export function monthlyPayment(principal: number, monthlyRate: number, months: number): number {
  if (months <= 0) return 0;
  if (monthlyRate === 0) return principal / months;
  const growth = Math.pow(1 + monthlyRate, months);
  const payment = (principal * monthlyRate * growth) / (growth - 1);
  return Number.isFinite(payment) ? payment : principal / months;
}

/** Strict local-time parser for `yyyy-mm-dd`. Returns null for malformed or rollover input (e.g. 2020-13-01, 2020-02-31). */
export function parseIso(raw: string | undefined): Date | null {
  if (!raw) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(raw);
  if (!m) return null;
  const y = Number(m[1]);
  const mo = Number(m[2]);
  const d = Number(m[3]);
  const date = new Date(y, mo - 1, d);
  if (date.getFullYear() !== y || date.getMonth() !== mo - 1 || date.getDate() !== d) return null;
  return date;
}

/** Current date as `yyyy-mm-dd` (local time). */
export function todayIso(): string {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mm}-${dd}`;
}

/** Whole days between two local-midnight dates (end - start). Negative if end < start. */
export function daysBetween(start: Date, end: Date): number {
  return Math.round((end.getTime() - start.getTime()) / 86400000);
}

/** Full calendar difference (end - start) as { years, months, days }, end >= start required. */
export function calendarDiff(start: Date, end: Date): { years: number; months: number; days: number } {
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();
  if (days < 0) {
    months -= 1;
    const prevMonthDays = new Date(end.getFullYear(), end.getMonth(), 0).getDate();
    days += prevMonthDays;
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return { years, months, days };
}
