/**
 * Central site configuration.
 * Edit brand, contact, domain, colors, legal names, dates and IDs here only.
 */

export type Locale = 'ar' | 'en';

export const LOCALES: Locale[] = ['ar', 'en'];
export const DEFAULT_LOCALE: Locale = 'ar';

export const SITE = {
  /** Live domain. */
  url: 'https://klar.worldly.pro',
  /** Brand name (display). */
  brandName: {
    ar: 'كلار',
    en: 'Klar',
  },
  /** Short brand tagline. */
  tagline: {
    ar: 'حاسبات مالية وحاسبات عمل واضحة وشفافة',
    en: 'Clear and transparent financial & employment calculators',
  },
  /** Owner / editorial placeholder. Kept empty until real info is provided. */
  owner: {
    name: { ar: '', en: '' },
    email: '',
    emailDisplay: { ar: 'بريد إلكتروني', en: 'email' },
    phone: '',
    address: { ar: '', en: '' },
  },
  /** Editorial placeholder — no invented people. */
  reviewerPlaceholder: {
    ar: 'المراجع: سيُذكر اسم المراجع المعتمد هنا',
    en: 'Reviewed by: reviewer name to be added here',
  },
  /** Default last-reviewed date (ISO). Update as content is reviewed. */
  lastReviewedDefault: '2026-08-09',
  /** Contact route handling: mailto-based (no server backend). */
  contact: {
    useMailto: true,
    mailtoSubject: { ar: 'رسالة من موقع كلار', en: 'Message from Klar' },
  },
} as const;

export const LOGO = {
  /** Rendered as text (no image assets). */
  text: {
    ar: 'كلار',
    en: 'Klar',
  },
  /** Arabic-English combined lockup used in footer. */
  lockup: {
    ar: 'كلار — Klar',
    en: 'Klar — كلار',
  },
} as const;

export const THEME = {
  /** Brand colors (kept in sync with styles/tokens.css). */
  primary: '#12305C',
  accent: '#0E8A6D',
  background: '#FFFFFF',
  altBackground: '#F6F8FB',
  text: '#16233A',
} as const;

export const NAV = {
  main: [
    { label: { ar: 'الرئيسية', en: 'Home' }, href: '/' },
    { label: { ar: 'الحاسبات', en: 'Calculators' }, href: '/calculators/' },
    { label: { ar: 'الأدلة', en: 'Guides' }, href: '/guides/' },
    { label: { ar: 'من نحن', en: 'About' }, href: '/about/' },
    { label: { ar: 'تواصل معنا', en: 'Contact' }, href: '/contact/' },
  ],
  footer: [
    { label: { ar: 'منهجية الحساب', en: 'Methodology' }, href: '/methodology/' },
    { label: { ar: 'السياسة التحريرية', en: 'Editorial policy' }, href: '/editorial-policy/' },
    { label: { ar: 'سياسة المصادر', en: 'Sources policy' }, href: '/sources-policy/' },
    { label: { ar: 'سياسة الخصوصية', en: 'Privacy policy' }, href: '/privacy/' },
    { label: { ar: 'سياسة الكوكيز', en: 'Cookies policy' }, href: '/cookies/' },
    { label: { ar: 'شروط الاستخدام', en: 'Terms of use' }, href: '/terms/' },
    { label: { ar: 'إخلاء المسؤولية', en: 'Disclaimer' }, href: '/disclaimer/' },
  ],
} as const;
