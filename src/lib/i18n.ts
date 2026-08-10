import { DEFAULT_LOCALE, type Locale } from '../config/site';

/** Build a localized path. Arabic (default) is served at root. */
export function localizedPath(locale: Locale, path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  if (locale === DEFAULT_LOCALE) return p;
  return `/en${p}`;
}

/** Given a path for one locale, return the matching path for another. */
export function pathForLocale(locale: Locale, otherPath: string): string {
  const stripped = otherPath.replace(/^\/en/, '') || '/';
  return localizedPath(locale, stripped);
}

export const DIR: Record<Locale, 'rtl' | 'ltr'> = { ar: 'rtl', en: 'ltr' };

export const LANG_ATTR: Record<Locale, string> = { ar: 'ar', en: 'en' };

export function isRtl(locale: Locale): boolean {
  return DIR[locale] === 'rtl';
}
