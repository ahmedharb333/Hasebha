/**
 * Supported currencies for display formatting only.
 * No live exchange-rate conversion is ever performed.
 */

export type CurrencyCode = 'JOD' | 'SAR' | 'AED' | 'USD' | 'EUR' | 'KWD' | 'QAR' | 'BHD' | 'OMR';

export interface Currency {
  code: CurrencyCode;
  /** Localized display label (Arabic). */
  labelAr: string;
  /** Localized display label (English). */
  labelEn: string;
  /** Maximum fraction digits used in output formatting. */
  decimals: number;
  /** ISO 4217 name used by Intl formatting. */
  iso: string;
}

export const CURRENCIES: Currency[] = [
  { code: 'JOD', labelAr: 'دينار أردني', labelEn: 'Jordanian dinar', decimals: 3, iso: 'JOD' },
  { code: 'SAR', labelAr: 'ريال سعودي', labelEn: 'Saudi riyal', decimals: 2, iso: 'SAR' },
  { code: 'AED', labelAr: 'درهم إماراتي', labelEn: 'UAE dirham', decimals: 2, iso: 'AED' },
  { code: 'USD', labelAr: 'دولار أمريكي', labelEn: 'US dollar', decimals: 2, iso: 'USD' },
  { code: 'EUR', labelAr: 'يورو', labelEn: 'Euro', decimals: 2, iso: 'EUR' },
  { code: 'KWD', labelAr: 'دينار كويتي', labelEn: 'Kuwaiti dinar', decimals: 3, iso: 'KWD' },
  { code: 'QAR', labelAr: 'ريال قطري', labelEn: 'Qatari riyal', decimals: 2, iso: 'QAR' },
  { code: 'BHD', labelAr: 'دينار بحريني', labelEn: 'Bahraini dinar', decimals: 3, iso: 'BHD' },
  { code: 'OMR', labelAr: 'ريال عماني', labelEn: 'Omani rial', decimals: 3, iso: 'OMR' },
];

export const DEFAULT_CURRENCY: CurrencyCode = 'JOD';

export function getCurrency(code: string): Currency {
  return CURRENCIES.find((c) => c.code === code) ?? CURRENCIES[0];
}
