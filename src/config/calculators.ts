/**
 * Calculator registry — the single source of truth for all calculators:
 * routes, categories, related tools, guide links and publish status.
 */

export type Category = 'finance' | 'employment' | 'health' | 'education' | 'everyday' | 'business';

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

export interface CategoryMeta {
  id: Category;
  label: { ar: string; en: string };
  tagline: { ar: string; en: string };
  icon: Category;
}

export const CATEGORIES: Record<Category, CategoryMeta> = {
  finance: {
    id: 'finance',
    label: { ar: 'مالية', en: 'Finance' },
    tagline: {
      ar: 'حاسبات القروض والادخار والاستثمار والضرائب والتخطيط المالي.',
      en: 'Loans, savings, investments, taxes and financial planning.',
    },
    icon: 'finance',
  },
  employment: {
    id: 'employment',
    label: { ar: 'عمل وتوظيف', en: 'Employment' },
    tagline: {
      ar: 'حاسبات الرواتب والأجور وتكاليف التوظيف والإجازات.',
      en: 'Salary, wages, hiring costs and leave.',
    },
    icon: 'employment',
  },
  health: {
    id: 'health',
    label: { ar: 'صحة', en: 'Health' },
    tagline: {
      ar: 'مؤشرات وزن الجسم وحاجتك اليومية من السعرات.',
      en: 'Body weight metrics and daily calorie needs.',
    },
    icon: 'health',
  },
  education: {
    id: 'education',
    label: { ar: 'تعليم', en: 'Education' },
    tagline: {
      ar: 'حساب المعدل التراكمي والدرجات والأهداف الدراسية.',
      en: 'GPA, grades and study targets.',
    },
    icon: 'education',
  },
  everyday: {
    id: 'everyday',
    label: { ar: 'يومية', en: 'Everyday' },
    tagline: {
      ar: 'أدوات يومية سريعة: العمر، التواريخ، الإكرامية وتحويل الوحدات.',
      en: 'Quick everyday tools: age, dates, tips and unit conversion.',
    },
    icon: 'everyday',
  },
  business: {
    id: 'business',
    label: { ar: 'أعمال', en: 'Business' },
    tagline: {
      ar: 'حاسبات التسعير والهامش ونقطة التعادل للمشاريع.',
      en: 'Pricing, margin and break-even for businesses.',
    },
    icon: 'business',
  },
};

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
    id: 'mortgage',
    slug: 'mortgage',
    category: 'finance',
    title: { ar: 'حاسبة القرض العقاري', en: 'Mortgage calculator' },
    description: {
      ar: 'احسب القسط الشهري للقرض العقاري مع الدفعة المقدمة والفائدة والرسوم وجدول سداد سنوي.',
      en: 'Estimate the monthly payment on a home loan with down payment, interest, fees and an annual repayment table.',
    },
    related: ['loan-payment', 'early-payoff'],
    guide: 'how-to-calculate-a-mortgage',
    active: true,
  },
  {
    id: 'loan-comparison',
    slug: 'loan-comparison',
    category: 'finance',
    title: { ar: 'حاسبة مقارنة القروض', en: 'Loan comparison calculator' },
    description: {
      ar: 'قارن بين عرضي قرض جنباً إلى جنب: القسط الشهري والفائدة والتكلفة الكلية لكل عرض.',
      en: 'Compare two loan offers side by side: monthly payment, interest and total cost per offer.',
    },
    related: ['loan-payment', 'early-payoff'],
    guide: 'how-to-compare-loan-offers',
    active: true,
  },
  {
    id: 'early-payoff',
    slug: 'early-payoff',
    category: 'finance',
    title: { ar: 'حاسبة السداد المبكر', en: 'Early payoff calculator' },
    description: {
      ar: 'احسب ما توفره الدفعات الإضافية على قرضك: تاريخ سداد أبكر وفائدة موفرة.',
      en: 'See how much extra payments save on your loan: an earlier payoff date and less interest.',
    },
    related: ['loan-payment', 'mortgage'],
    guide: 'how-early-loan-payoff-works',
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
  {
    id: 'end-of-service',
    slug: 'end-of-service',
    category: 'employment',
    title: { ar: 'حاسبة مكافأة نهاية الخدمة', en: 'End-of-service gratuity calculator' },
    description: {
      ar: 'تقدر مكافأة نهاية الخدمة وفق قوانين العمل في بلدك.',
      en: 'Estimates end-of-service gratuity under your country\u2019s labour law.',
    },
    related: [],
    guide: '',
    active: false,
  },
  {
    id: 'social-insurance',
    slug: 'social-insurance',
    category: 'employment',
    title: { ar: 'حاسبة التأمين الاجتماعي', en: 'Social insurance calculator' },
    description: {
      ar: 'تحسب اشتراكات التأمين الاجتماعي للموظف وصاحب العمل.',
      en: 'Calculates social-insurance contributions for employee and employer.',
    },
    related: [],
    guide: '',
    active: false,
  },
  {
    id: 'notice-period',
    slug: 'notice-period',
    category: 'employment',
    title: { ar: 'حاسبة فترة الإشعار', en: 'Notice period calculator' },
    description: {
      ar: 'تحدد فترة الإشعار الواجبة عند إنهاء عقد العمل.',
      en: 'Determines the notice period required to end an employment contract.',
    },
    related: [],
    guide: '',
    active: false,
  },
  {
    id: 'maternity-leave',
    slug: 'maternity-leave',
    category: 'employment',
    title: { ar: 'حاسبة إجازة الأمومة', en: 'Maternity leave calculator' },
    description: {
      ar: 'تحسب مدة إجازة الأمومة وأجرها حسب القانون.',
      en: 'Calculates maternity-leave duration and pay under the law.',
    },
    related: [],
    guide: '',
    active: false,
  },
  {
    id: 'gross-to-net',
    slug: 'gross-to-net',
    category: 'employment',
    title: { ar: 'محوّل الراتب الإجمالي إلى الصافي', en: 'Gross-to-net salary converter' },
    description: {
      ar: 'تحويل الراتب الإجمالي إلى الصافي بعد الخصومات القانونية.',
      en: 'Converts gross salary to net after statutory deductions.',
    },
    related: [],
    guide: '',
    active: false,
  },
  {
    id: 'income-tax',
    slug: 'income-tax',
    category: 'employment',
    title: { ar: 'حاسبة ضريبة الدخل', en: 'Income tax calculator' },
    description: {
      ar: 'تحسب ضريبة الدخل على الأجور حسب الشرائح في بلدك.',
      en: 'Calculates income tax on wages using your country\u2019s brackets.',
    },
    related: [],
    guide: '',
    active: false,
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
