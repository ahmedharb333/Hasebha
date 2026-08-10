/**
 * Calculator registry — the single source of truth for all calculators:
 * routes, categories, related tools, guide links and publish status.
 */

export type Category = 'finance' | 'employment';

export interface CalculatorEntry {
  /** Stable machine id (used in analytics events). */
  id: string;
  /** URL slug. */
  slug: string;
  category: Category;
  /** Localized titles. */
  title: { ar: string; en: string };
  /** Localized one-line description (used in cards + meta). */
  description: { ar: string; en: string };
  /** Slugs of related calculators (internal linking). */
  related: string[];
  /** Slug of the primary explanatory guide. */
  guide: string;
  /** Whether the calculator is published. */
  active: boolean;
}

export const CALCULATORS: CalculatorEntry[] = [
  {
    id: 'loan-payment',
    slug: 'loan-payment',
    category: 'finance',
    title: { ar: 'حاسبة القسط الشهري للقرض', en: 'Loan monthly payment calculator' },
    description: {
      ar: 'احسب القسط الشهري وإجمالي الفائدة والتكلفة الكلية لأي قرض بفائدة ثابتة أو بدون فائدة.',
      en: 'Calculate the monthly payment, total interest and total cost of any fixed-rate or zero-interest loan.',
    },
    related: ['compound-interest', 'discount-percentage'],
    guide: 'how-to-calculate-loan-payment',
    active: true,
  },
  {
    id: 'compound-interest',
    slug: 'compound-interest',
    category: 'finance',
    title: { ar: 'حاسبة الفائدة المركبة', en: 'Compound interest calculator' },
    description: {
      ar: 'احسب نمو الاستثمار مع الفائدة المركبة والمساهمات الدورية المنتظمة.',
      en: 'Calculate investment growth with compound interest and regular periodic contributions.',
    },
    related: ['savings-goal', 'loan-payment'],
    guide: 'compound-interest-explained',
    active: true,
  },
  {
    id: 'savings-goal',
    slug: 'savings-goal',
    category: 'finance',
    title: { ar: 'حاسبة هدف الادخار', en: 'Savings goal calculator' },
    description: {
      ar: 'حدد المبلغ الذي تحتاج ادخاره شهرياً للوصول إلى هدف ادخاري خلال المدة المطلوبة.',
      en: 'Find how much you need to save each month to reach a savings target within a chosen timeframe.',
    },
    related: ['compound-interest', 'loan-payment'],
    guide: 'how-to-set-a-savings-goal',
    active: true,
  },
  {
    id: 'vat',
    slug: 'vat',
    category: 'finance',
    title: { ar: 'حاسبة الضريبة المضافة (الضريبة على القيمة المضافة)', en: 'VAT calculator' },
    description: {
      ar: 'أضف أو أزل أو استخرج قيمة الضريبة المضافة من أي مبلغ بنسبة مخصصة.',
      en: 'Add, remove or extract VAT from any amount using a custom rate.',
    },
    related: ['discount-percentage', 'savings-goal'],
    guide: 'how-to-calculate-vat',
    active: true,
  },
  {
    id: 'discount-percentage',
    slug: 'discount-percentage',
    category: 'finance',
    title: { ar: 'حاسبة الخصم والنسبة المئوية', en: 'Discount and percentage calculator' },
    description: {
      ar: 'احسب السعر بعد الخصم، مبلغ الخصم، التغيّر والنسبة المئوية، والفرق بين قيمتين.',
      en: 'Calculate price after discount, discount amount, percentage change and percentage difference.',
    },
    related: ['vat', 'loan-payment'],
    guide: 'how-to-calculate-loan-payment',
    active: true,
  },
  {
    id: 'salary-converter',
    slug: 'salary-converter',
    category: 'employment',
    title: { ar: 'محوّل الراتب (ساعة/يوم/شهر/سنة)', en: 'Salary converter' },
    description: {
      ar: 'حوّل الراتب بين الأجر بالساعة واليوم والأسبوع والشهر والسنة مع عرض الافتراضات بوضوح.',
      en: 'Convert salary between hourly, daily, weekly, monthly and annual amounts with clearly stated assumptions.',
    },
    related: ['overtime-pay', 'freelance-rate'],
    guide: 'hourly-vs-monthly-salary',
    active: true,
  },
  {
    id: 'overtime-pay',
    slug: 'overtime-pay',
    category: 'employment',
    title: { ar: 'حاسبة أجر العمل الإضافي', en: 'Overtime pay calculator' },
    description: {
      ar: 'احسب أجر ساعات العمل الإضافية باستخدام مضاعف قابل للتخصيص.',
      en: 'Calculate overtime earnings using a configurable multiplier.',
    },
    related: ['salary-converter', 'employee-cost'],
    guide: 'how-to-calculate-overtime',
    active: true,
  },
  {
    id: 'freelance-rate',
    slug: 'freelance-rate',
    category: 'employment',
    title: { ar: 'حاسبة سعر الساعة للمستقلين', en: 'Freelancer hourly-rate calculator' },
    description: {
      ar: 'حدد الحد الأدنى والسعر الموصى به للساعة والأجر اليومي لمشروعك الحر مع احتساب المصاريف.',
      en: 'Find your minimum and recommended hourly rate and project rates, accounting for expenses.',
    },
    related: ['salary-converter', 'employee-cost'],
    guide: 'how-freelancers-set-rates',
    active: true,
  },
  {
    id: 'employee-cost',
    slug: 'employee-cost',
    category: 'employment',
    title: { ar: 'حاسبة التكلفة الكلية للموظف', en: 'Employee total-cost calculator' },
    description: {
      ar: 'احسب التكلفة الشهرية والسنوية الكلية للموظف شاملة الاشتراكات والتأمين والمزايا.',
      en: 'Calculate the full monthly and annual cost of an employee including contributions, insurance and benefits.',
    },
    related: ['leave-balance', 'overtime-pay'],
    guide: 'true-cost-of-an-employee',
    active: true,
  },
  {
    id: 'leave-balance',
    slug: 'leave-balance',
    category: 'employment',
    title: { ar: 'حاسبة رصيد الإجازات', en: 'Leave-balance calculator' },
    description: {
      ar: 'احسب الإجازة المستحقة والمتاحة والمتبقية حسب طرق الاستحقاق الشهرية واليومية أو السنوية.',
      en: 'Calculate accrued, available and remaining leave under monthly, daily or annual accrual methods.',
    },
    related: ['employee-cost', 'overtime-pay'],
    guide: 'how-to-calculate-overtime',
    active: true,
  },
];

export function getCalculator(slug: string): CalculatorEntry | undefined {
  return CALCULATORS.find((c) => c.slug === slug);
}

export function getCalculatorsByCategory(category: Category): CalculatorEntry[] {
  return CALCULATORS.filter((c) => c.category === category && c.active);
}

export function getRelated(slug: string): CalculatorEntry[] {
  const entry = getCalculator(slug);
  if (!entry) return [];
  return entry.related
    .map((s) => getCalculator(s))
    .filter((c): c is CalculatorEntry => c !== undefined && c.active);
}
