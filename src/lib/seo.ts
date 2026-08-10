import { SITE } from '../config/site';
import type { Locale } from '../config/site';
import { localizedPath } from './i18n';

export interface SeoMeta {
  title: string;
  description: string;
  path: string;
  locale: Locale;
  ogType?: 'website' | 'article';
  noindex?: boolean;
  lastReviewed?: string;
  datePublished?: string;
}

/** Absolute URL for a path in a locale. */
export function absoluteUrl(locale: Locale, path: string): string {
  return `${SITE.url}${localizedPath(locale, path)}`;
}

export function buildTitle(mainTitle: string, locale: Locale): string {
  const brand = SITE.brandName[locale];
  return mainTitle === brand ? `${brand} — ${SITE.tagline[locale]}` : `${mainTitle} | ${brand}`;
}

export function hreflangLinks(_locale: Locale, path: string) {
  return (['ar', 'en'] as Locale[]).map((l) => ({
    rel: 'alternate',
    hreflang: LANG_CODE[l],
    href: absoluteUrl(l, path),
  }));
}

const LANG_CODE: Record<Locale, string> = { ar: 'ar', en: 'en' };

export function metaRobots(noindex: boolean): string {
  return noindex ? 'noindex, nofollow' : 'index, follow';
}

/* ---------------- JSON-LD builders ---------------- */

export function organizationJsonLd(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.brandName[locale],
    url: absoluteUrl(locale, '/'),
    logo: absoluteUrl(locale, '/favicon.svg'),
    description: SITE.tagline[locale],
  };
}

export function websiteJsonLd(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.brandName[locale],
    url: absoluteUrl(locale, '/'),
    inLanguage: LANG_CODE[locale],
    description: SITE.tagline[locale],
  };
}

export function breadcrumbJsonLd(locale: Locale, items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(locale, item.path),
    })),
  };
}

export function webApplicationJsonLd(locale: Locale, meta: SeoMeta, offersFree = true) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    url: absoluteUrl(locale, meta.path),
    description: meta.description,
    applicationCategory: 'FinanceApplication',
    inLanguage: LANG_CODE[locale],
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    isAccessibleForFree: offersFree,
  };
}

export function articleJsonLd(locale: Locale, meta: SeoMeta, body: string, authorName: string | null) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: meta.title,
    description: meta.description,
    url: absoluteUrl(locale, meta.path),
    inLanguage: LANG_CODE[locale],
    datePublished: meta.datePublished ?? meta.lastReviewed,
    dateModified: meta.lastReviewed,
    author: authorName ? { '@type': 'Organization', name: authorName } : { '@type': 'Organization', name: SITE.brandName[locale] },
    wordCount: body.split(/\s+/).length,
  };
}

export function faqJsonLd(_locale: Locale, faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
