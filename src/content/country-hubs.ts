import type { Locale } from '../config/site';

/**
 * Country hub pages: one landing page per country that links every labour-law
 * guide and calculator for that country. Builds the internal-linking cluster
 * (topical authority) and targets head queries like "UAE labour law calculator".
 */
export interface CountryHub {
  /** URL segment + guide-slug segment, e.g. "uae", "saudi-arabia". */
  seg: string;
  /** country-rules code. */
  code: string;
  name: Record<Locale, string>;
  /** "the UAE" reads better in some English sentences. */
  nameThe: Record<Locale, string>;
  intro: Record<Locale, string>;
  /** Tool keys to surface, in display order. "income-tax" only where it applies. */
  tools: string[];
}

const LABOUR_TOOLS = [
  'end-of-service',
  'social-insurance',
  'gross-to-net',
  'notice-period',
  'maternity-leave',
  'annual-leave',
  'overtime-pay',
];

export const COUNTRY_HUBS: CountryHub[] = [
  {
    seg: 'uae', code: 'ae',
    name: { en: 'UAE', ar: 'الإمارات' }, nameThe: { en: 'the UAE', ar: 'الإمارات' },
    intro: {
      en: 'Every Klar labour-law calculator and guide for the United Arab Emirates — end-of-service gratuity, social insurance (UAE nationals), net salary, notice period, maternity leave, annual leave and overtime — under Federal Decree-Law No. 33 of 2021. Figures follow the current statutory rules.',
      ar: 'كل حاسبات وأدلة كلار لقانون العمل في الإمارات — مكافأة نهاية الخدمة، والتأمينات (للمواطنين)، وصافي الراتب، ومدة الإشعار، وإجازة الأمومة، والإجازة السنوية، والعمل الإضافي — وفق المرسوم بقانون اتحادي رقم 33 لسنة 2021. والأرقام تتبع القواعد القانونية الحالية.',
    },
    tools: LABOUR_TOOLS,
  },
  {
    seg: 'saudi-arabia', code: 'sa',
    name: { en: 'Saudi Arabia', ar: 'السعودية' }, nameThe: { en: 'Saudi Arabia', ar: 'السعودية' },
    intro: {
      en: 'Every Klar labour-law calculator and guide for Saudi Arabia — end-of-service award, GOSI contributions, net salary, notice period, maternity leave, annual leave and overtime — under the Saudi Labour Law. Figures follow the current statutory rules.',
      ar: 'كل حاسبات وأدلة كلار لقانون العمل في السعودية — مكافأة نهاية الخدمة، واشتراكات التأمينات (GOSI)، وصافي الراتب، ومدة الإشعار، وإجازة الأمومة، والإجازة السنوية، والعمل الإضافي — وفق نظام العمل السعودي. والأرقام تتبع القواعد القانونية الحالية.',
    },
    tools: LABOUR_TOOLS,
  },
  {
    seg: 'qatar', code: 'qa',
    name: { en: 'Qatar', ar: 'قطر' }, nameThe: { en: 'Qatar', ar: 'قطر' },
    intro: {
      en: 'Every Klar labour-law calculator and guide for Qatar — end-of-service gratuity, social insurance (Qatari nationals), net salary, notice period, maternity leave, annual leave and overtime — under Labour Law No. 14 of 2004. Figures follow the current statutory rules.',
      ar: 'كل حاسبات وأدلة كلار لقانون العمل في قطر — مكافأة نهاية الخدمة، والتأمينات (للمواطنين)، وصافي الراتب، ومدة الإشعار، وإجازة الأمومة، والإجازة السنوية، والعمل الإضافي — وفق قانون العمل رقم 14 لسنة 2004. والأرقام تتبع القواعد القانونية الحالية.',
    },
    tools: LABOUR_TOOLS,
  },
  {
    seg: 'jordan', code: 'jo',
    name: { en: 'Jordan', ar: 'الأردن' }, nameThe: { en: 'Jordan', ar: 'الأردن' },
    intro: {
      en: 'Every Klar labour-law and tax calculator and guide for Jordan — end-of-service gratuity, income tax, social security (which covers everyone, unlike the Gulf), net salary, notice period, maternity leave, annual leave and overtime — under the Jordanian Labour Law and Income Tax Law. Figures follow the current statutory rules.',
      ar: 'كل حاسبات وأدلة كلار لقانون العمل والضرائب في الأردن — مكافأة نهاية الخدمة، وضريبة الدخل، والضمان الاجتماعي (الذي يشمل الجميع خلافاً للخليج)، وصافي الراتب، ومدة الإشعار، وإجازة الأمومة، والإجازة السنوية، والعمل الإضافي — وفق قانون العمل وقانون ضريبة الدخل الأردنيين. والأرقام تتبع القواعد القانونية الحالية.',
    },
    tools: [...LABOUR_TOOLS, 'income-tax'],
  },
  {
    seg: 'kuwait', code: 'kw',
    name: { en: 'Kuwait', ar: 'الكويت' }, nameThe: { en: 'Kuwait', ar: 'الكويت' },
    intro: {
      en: 'Every Klar labour-law calculator and guide for Kuwait — end-of-service indemnity, social security (PIFSS, Kuwaiti nationals), net salary, notice period, maternity leave, annual leave and overtime — under Labour Law No. 6 of 2010. Figures follow the current statutory rules.',
      ar: 'كل حاسبات وأدلة كلار لقانون العمل في الكويت — مكافأة نهاية الخدمة، والتأمينات (PIFSS للمواطنين)، وصافي الراتب، ومدة الإشعار، وإجازة الأمومة، والإجازة السنوية، والعمل الإضافي — وفق قانون العمل رقم 6 لسنة 2010. والأرقام تتبع القواعد القانونية الحالية.',
    },
    tools: LABOUR_TOOLS,
  },
  {
    seg: 'bahrain', code: 'bh',
    name: { en: 'Bahrain', ar: 'البحرين' }, nameThe: { en: 'Bahrain', ar: 'البحرين' },
    intro: {
      en: 'Every Klar labour-law calculator and guide for Bahrain — leaving indemnity, social insurance (SIO), net salary, notice period, maternity leave, annual leave and overtime — under Labour Law No. 36 of 2012. Figures follow the current statutory rules.',
      ar: 'كل حاسبات وأدلة كلار لقانون العمل في البحرين — مكافأة نهاية الخدمة، والتأمينات (SIO)، وصافي الراتب، ومدة الإشعار، وإجازة الأمومة، والإجازة السنوية، والعمل الإضافي — وفق قانون العمل رقم 36 لسنة 2012. والأرقام تتبع القواعد القانونية الحالية.',
    },
    tools: LABOUR_TOOLS,
  },
  {
    seg: 'oman', code: 'om',
    name: { en: 'Oman', ar: 'عُمان' }, nameThe: { en: 'Oman', ar: 'عُمان' },
    intro: {
      en: 'Every Klar labour-law calculator and guide for Oman — end-of-service gratuity, social protection, net salary, notice period, maternity leave, annual leave and overtime — under the 2023 Labour Law (Royal Decree 53/2023). Figures follow the current statutory rules.',
      ar: 'كل حاسبات وأدلة كلار لقانون العمل في عُمان — مكافأة نهاية الخدمة، والحماية الاجتماعية، وصافي الراتب، ومدة الإشعار، وإجازة الأمومة، والإجازة السنوية، والعمل الإضافي — وفق قانون العمل لسنة 2023 (مرسوم 53/2023). والأرقام تتبع القواعد القانونية الحالية.',
    },
    tools: LABOUR_TOOLS,
  },
];

/** Map a tool key to its guide slug for a given country segment. */
export function guideSlugFor(tool: string, seg: string): string {
  switch (tool) {
    case 'end-of-service': return `end-of-service-gratuity-${seg}`;
    case 'social-insurance': return `social-insurance-${seg}`;
    case 'gross-to-net': return `gross-to-net-${seg}`;
    case 'notice-period': return `notice-period-${seg}`;
    case 'maternity-leave': return `maternity-leave-${seg}`;
    case 'annual-leave': return `annual-leave-${seg}`;
    case 'overtime-pay': return `overtime-pay-${seg}`;
    case 'income-tax': return 'income-tax-jordan';
    default: return `${tool}-${seg}`;
  }
}

/** Map a tool key to its calculator slug (annual-leave -> leave-balance). */
export function calculatorSlugFor(tool: string): string {
  return tool === 'annual-leave' ? 'leave-balance' : tool;
}

export function getCountryHub(seg: string): CountryHub | undefined {
  return COUNTRY_HUBS.find((h) => h.seg === seg);
}
