import type { CountryCode } from '../lib/country-rules/types';

export const COUNTRY_STORAGE_KEY = 'klar-country';

export interface Country {
  code: CountryCode;
  labelAr: string;
  labelEn: string;
  /** ISO 3166-1 alpha-2 uppercase, for display. */
  iso: string;
}

export const COUNTRIES: Country[] = [
  { code: 'jo', labelAr: 'الأردن', labelEn: 'Jordan', iso: 'JO' },
  { code: 'sa', labelAr: 'السعودية', labelEn: 'Saudi Arabia', iso: 'SA' },
  { code: 'ae', labelAr: 'الإمارات', labelEn: 'UAE', iso: 'AE' },
  { code: 'kw', labelAr: 'الكويت', labelEn: 'Kuwait', iso: 'KW' },
  { code: 'qa', labelAr: 'قطر', labelEn: 'Qatar', iso: 'QA' },
  { code: 'bh', labelAr: 'البحرين', labelEn: 'Bahrain', iso: 'BH' },
  { code: 'om', labelAr: 'عمان', labelEn: 'Oman', iso: 'OM' },
];

export const DEFAULT_COUNTRY: CountryCode = 'jo';

export function getCountry(code: string): Country | undefined {
  return COUNTRIES.find((c) => c.code === code);
}
