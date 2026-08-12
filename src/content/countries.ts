import type { Locale } from '../config/site';

export const COUNTRY_LABELS: Record<Locale, Record<string, string>> = {
  ar: {
    jo: 'الأردن', sa: 'السعودية', ae: 'الإمارات', kw: 'الكويت', qa: 'قطر', bh: 'البحرين', om: 'عمان',
  },
  en: {
    jo: 'Jordan', sa: 'Saudi Arabia', ae: 'UAE', kw: 'Kuwait', qa: 'Qatar', bh: 'Bahrain', om: 'Oman',
  },
};

export const countryField = {
  label: { ar: 'البلد', en: 'Country' },
  hint: {
    ar: 'اختر البلد لتطبيق قوانين العمل الخاصة به.',
    en: 'Select the country to apply its labour-law rules.',
  },
  required: {
    ar: 'يرجى اختيار البلد.',
    en: 'Please select a country.',
  },
  invalid: {
    ar: 'بلد غير معروف.',
    en: 'Unknown country.',
  },
  mismatch: {
    ar: 'قوانين هذا البلد تتطلب عملة مختلفة. اختر العملة الصحيحة.',
    en: 'This country\u2019s rules require a different currency. Select the correct currency.',
  },
};
