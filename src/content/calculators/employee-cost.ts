import type { CalcContent } from '../../lib/calculators/types';
import type { Locale } from '../../config/site';

const ar: CalcContent = {
  locale: 'ar',
  slug: 'employee-cost',
  title: 'حاسبة التكلفة الكلية للموظف',
  metaDescription:
    'احسب التكلفة الشهرية والسنوية الكلية للموظف شاملة الاشتراكات والتأمين والمزايا والتكاليف لمرة واحدة.',
  h1: 'حاسبة التكلفة الكلية للموظف',
  intro:
    'احسب التكلفة الحقيقية لموظف: الراتب الإجمالي، واشتراكات صاحب العمل، والتأمين، والمزايا، والبرامج، إلى جانب التكاليف لمرة واحدة مثل الأجهزة والتوظيف والتدريب.',
  fields: {
    grossSalary: {
      label: 'الراتب الشهري الإجمالي',
      hint: 'الراتب الشهري قبل الاقتطاعات.',
    },
    employerContributionPct: {
      label: 'نسبة اشتراكات صاحب العمل (%)',
      hint: 'نسبة تُطبق على الراتب الشهري؛ تحقق من النسبة المطبقة في بلدك.',
    },
    insuranceCost: {
      label: 'تكلفة التأمين الشهرية',
      hint: 'قيمة التأمين التي يتحملها صاحب العمل شهرياً.',
    },
    benefitsCost: {
      label: 'المزايا الشهرية',
      hint: 'مثل المواصلات، الوجبات، أو بدل الاتصالات.',
    },
    softwareCost: {
      label: 'تكاليف البرامج والأدوات الشهرية',
      hint: 'اشتراكات الأدوات والبرامج المستخدمة في العمل.',
    },
    otherRecurringCost: {
      label: 'تكاليف شهرية أخرى',
      hint: 'أي تكلفة متكررة إضافية غير مدرجة أعلاه.',
    },
    equipmentCost: {
      label: 'تكلفة الأجهزة',
      hint: 'تكلفة لمرة واحدة مثل الحاسوب أو المقعد أو الأثاث.',
    },
    recruitmentCost: {
      label: 'تكلفة التوظيف',
      hint: 'تكلفة لمرة واحدة للإعلان والمقابلات والاستقدام.',
    },
    trainingCost: {
      label: 'تكلفة التدريب',
      hint: 'تكلفة لمرة واحدة لتأهيل الموظف الجديد.',
    },
    otherOneTimeCost: {
      label: 'تكاليف أخرى لمرة واحدة',
      hint: 'أي تكلفة غير متكررة إضافية.',
    },
    currency: {
      label: 'العملة',
    },
  },
  errorMessages: {
    required: 'هذا الحقل مطلوب.',
    invalid: 'أدخل قيمة صحيحة.',
    min: 'القيمة أقل من الحد الأدنى المسموح.',
    max: 'القيمة أكبر من الحد الأقصى المسموح.',
    __generic: 'يرجى مراجعة الحقول المحددة وإعادة المحاولة.',
  },
  results: {
    monthlyCost: {
      label: 'التكلفة الشهرية',
      hint: 'الراتب + الاشتراكات + التكاليف المتكررة شهرياً.',
    },
    annualCost: {
      label: 'التكلفة السنوية',
      hint: 'التكلفة الشهرية × 12.',
    },
    firstYearTotal: {
      label: 'إجمالي السنة الأولى',
      hint: 'التكلفة السنوية + التكاليف لمرة واحدة.',
    },
    salaryShare: {
      label: 'حصة الراتب من التكلفة',
      hint: 'الراتب السنوي كنسبة مئوية من إجمالي السنة الأولى.',
    },
  },
  table: {
    title: 'تفصيل التكلفة السنوية',
    caption: 'التكلفة السنوية لكل بند قبل احتساب إجمالي السنة الأولى.',
    columns: {
      item: 'البند',
      annual: 'التكلفة السنوية',
    },
    strings: {
      grossSalaryAnnual: 'الراتب السنوي الإجمالي',
      employerContribution: 'اشتراكات صاحب العمل',
      insurance: 'التأمين',
      benefits: 'المزايا',
      software: 'البرامج والأدوات',
      otherRecurring: 'تكاليف شهرية أخرى',
      equipment: 'الأجهزة',
      recruitment: 'التوظيف',
      training: 'التدريب',
      otherOneTime: 'تكاليف أخرى لمرة واحدة',
    },
  },
  resultTitle: 'النتائج',
  formula:
    'التكلفة الشهرية = الراتب + (الراتب × نسبة اشتراك صاحب العمل ÷ 100) + التأمين + المزايا + البرامج + التكاليف المتكررة. التكلفة السنوية = التكلفة الشهرية × 12. إجمالي السنة الأولى = التكلفة السنوية + التكاليف لمرة واحدة. حصة الراتب = (الراتب السنوي ÷ إجمالي السنة الأولى) × 100.',
  exampleHtml:
    'الراتب الشهري: <strong>1,500</strong> دينار، واشتراك صاحب العمل 10% = 150 دينار شهرياً<br>التكلفة الشهرية (مع التأمين 80 والمزايا 50 والبرامج 30) ≈ <strong>1,810</strong> دينار<br>التكلفة السنوية ≈ <strong>21,720</strong> دينار<br>التكاليف لمرة واحدة: أجهزة 800 + توظيف 500 + تدريب 400 = 1,700<br>إجمالي السنة الأولى ≈ <strong>23,420</strong> دينار، وحصة الراتب ≈ 77%',
  assumptions: [
    '12 شهراً متساوياً في السنة.',
    'نسبة اشتراك صاحب العمل تُطبق على الراتب الشهري الإجمالي.',
    'التكاليف لمرة واحدة تُضاف في السنة الأولى فقط.',
    'لا تُدرج الضرائب أو البدلات القانونية إلا إذا أضفتها يدوياً.',
    'تحقق من نسب الاشتراكات والقواعد المطبقة في بلدك.',
  ],
  whenUseful:
    'مفيد قبل قرارات التوظيف لتقييم التكلفة الحقيقية لموظف جديد في السنة الأولى، ومقارنتها بالميزانية المتاحة، أو لعرض التكلفة الكاملة على المسؤولين الماليين.',
  mistakes: [
    'نسيان اشتراكات صاحب العمل الشهرية.',
    'الخلط بين التكاليف لمرة واحدة والتكاليف المتكررة.',
    'تجاهل تكاليف البرامج والأدوات الشهرية.',
    'حساب التكلفة على الراتب الصافي بدلاً من الإجمالي.',
  ],
  faqs: [
    {
      q: 'لماذا تختلف التكلفة الحقيقية عن الراتب؟',
      a: 'لأن صاحب العمل يتحمل اشتراكات وتأميناً ومزايا وتكاليف أدوات فوق الراتب، بالإضافة إلى تكاليف التوظيف والتدريب في السنة الأولى.',
    },
    {
      q: 'ما النسبة الصحيحة لاشتراكات صاحب العمل؟',
      a: 'تختلف النسبة بين البلدان وبين القطاعات. أدخل النسبة المطبقة على حالة الموظف لديك بعد التحقق من المصادر الرسمية.',
    },
    {
      q: 'هل تشمل الحاسبة الضرائب؟',
      a: 'لا تضمن الحاسبة الضرائب تلقائياً، لكن يمكنك إضافتها ضمن التكاليف المتكررة أو لمرة واحدة إذا أردت.',
    },
    {
      q: 'كيف أحسب التكلفة لموظف موجود منذ سنوات؟',
      a: 'يمكنك إدخال صفر للتكاليف لمرة واحدة للحصول على التكلفة الشهرية والسنوية المتكررة فقط.',
    },
  ],
  methodologyNote:
    'تجمع الحاسبة التكلفة الشهرية المتكررة (الراتب والاشتراكات والتأمين والمزايا والبرامج والتكاليف الأخرى) ثم تحولها إلى سنوية وتضيف التكاليف لمرة واحدة لإظهار إجمالي السنة الأولى. تُراجع هذه الصفحة دورياً، وتخضع الأرقام للاشتراكات والقوانين المحلية، لذا تحقق من النسب مع جهة العمل أو السلطات المختصة.',
  disclaimerNote:
    'هذه النتيجة تقديرية لأغراض إعلامية فقط ولا تُعد مشورة مالية أو قانونية. تحقق من الاشتراكات والضرائب المطبقة لدى الجهات المختصة.',
  lastReviewed: '2026-08-09',
  currencyDefault: 'JOD',
  currencyLabel: 'العملة',
  requiredNote: 'الحقول التي تحمل علامة * مطلوبة.',
  buttons: {
    calculate: 'احسب',
    reset: 'إعادة تعيين',
    copy: 'نسخ',
    copied: 'تم النسخ',
    share: 'مشاركة',
    example: 'مثال',
  },
  ui: {
    resultTitle: 'النتائج',
    copySuccess: 'تم نسخ النتائج.',
    copyFail: 'تعذر نسخ النتائج.',
    shareFail: 'تعذر مشاركة النتائج.',
    ariaResult: 'نتائج حاسبة التكلفة الكلية للموظف',
  },
  guideTitle: 'دليل: التكلفة الحقيقية للموظف',
  relatedTitle: 'حاسبات ذات صلة',
};

const en: CalcContent = {
  locale: 'en',
  slug: 'employee-cost',
  title: 'Employee total-cost calculator',
  metaDescription:
    'Calculate the full monthly and annual cost of an employee including contributions, insurance, benefits and one-time costs.',
  h1: 'Employee total-cost calculator',
  intro:
    'Calculate the true cost of an employee: gross salary, employer contributions, insurance, benefits, software, plus one-time costs such as equipment, recruitment and training.',
  fields: {
    grossSalary: {
      label: 'Gross monthly salary',
      hint: 'Monthly salary before deductions.',
    },
    employerContributionPct: {
      label: 'Employer contribution (%)',
      hint: 'A percentage applied to the monthly salary; check the rate that applies in your country.',
    },
    insuranceCost: {
      label: 'Monthly insurance cost',
      hint: 'Monthly insurance amount borne by the employer.',
    },
    benefitsCost: {
      label: 'Monthly benefits',
      hint: 'Such as transport, meals or communication allowance.',
    },
    softwareCost: {
      label: 'Monthly software and tools cost',
      hint: 'Subscriptions for tools and software used at work.',
    },
    otherRecurringCost: {
      label: 'Other monthly recurring costs',
      hint: 'Any additional recurring cost not listed above.',
    },
    equipmentCost: {
      label: 'Equipment cost',
      hint: 'One-time cost such as a computer, desk or furniture.',
    },
    recruitmentCost: {
      label: 'Recruitment cost',
      hint: 'One-time cost for advertising, interviews and hiring.',
    },
    trainingCost: {
      label: 'Training cost',
      hint: 'One-time cost to onboard the new employee.',
    },
    otherOneTimeCost: {
      label: 'Other one-time costs',
      hint: 'Any additional non-recurring cost.',
    },
    currency: {
      label: 'Currency',
    },
  },
  errorMessages: {
    required: 'This field is required.',
    invalid: 'Enter a valid value.',
    min: 'The value is below the allowed minimum.',
    max: 'The value exceeds the allowed maximum.',
    __generic: 'Please review the highlighted fields and try again.',
  },
  results: {
    monthlyCost: {
      label: 'Monthly cost',
      hint: 'Salary + contributions + recurring costs per month.',
    },
    annualCost: {
      label: 'Annual cost',
      hint: 'Monthly cost × 12.',
    },
    firstYearTotal: {
      label: 'First-year total',
      hint: 'Annual cost + one-time costs.',
    },
    salaryShare: {
      label: 'Salary share of cost',
      hint: 'Annual salary as a percentage of the first-year total.',
    },
  },
  table: {
    title: 'Annual cost breakdown',
    caption: 'Annual cost for each line item before the first-year total.',
    columns: {
      item: 'Item',
      annual: 'Annual cost',
    },
    strings: {
      grossSalaryAnnual: 'Gross annual salary',
      employerContribution: 'Employer contributions',
      insurance: 'Insurance',
      benefits: 'Benefits',
      software: 'Software and tools',
      otherRecurring: 'Other recurring costs',
      equipment: 'Equipment',
      recruitment: 'Recruitment',
      training: 'Training',
      otherOneTime: 'Other one-time costs',
    },
  },
  resultTitle: 'Results',
  formula:
    'Monthly cost = salary + (salary × employer contribution % ÷ 100) + insurance + benefits + software + recurring costs. Annual cost = monthly cost × 12. First-year total = annual cost + one-time costs. Salary share = (annual salary ÷ first-year total) × 100.',
  exampleHtml:
    'Monthly salary: <strong>1,500</strong> currency units, employer contribution 10% = 150 per month<br>Monthly cost (with insurance 80, benefits 50, software 30) ≈ <strong>1,810</strong><br>Annual cost ≈ <strong>21,720</strong><br>One-time costs: equipment 800 + recruitment 500 + training 400 = 1,700<br>First-year total ≈ <strong>23,420</strong>, salary share ≈ 77%',
  assumptions: [
    '12 equal months per year.',
    'The employer contribution rate is applied to the gross monthly salary.',
    'One-time costs are added only in the first year.',
    'Taxes or statutory allowances are only included if you add them manually.',
    'Check the contribution rates and rules that apply in your country.',
  ],
  whenUseful:
    'Useful before hiring decisions to assess the true first-year cost of a new employee, compare it with the available budget, or present the full cost to finance decision-makers.',
  mistakes: [
    'Forgetting monthly employer contributions.',
    'Mixing up one-time and recurring costs.',
    'Ignoring monthly software and tools costs.',
    'Basing the calculation on net salary instead of gross.',
  ],
  faqs: [
    {
      q: 'Why is the true cost different from the salary?',
      a: 'Because the employer pays contributions, insurance, benefits and tool costs on top of the salary, plus recruitment and training costs in the first year.',
    },
    {
      q: 'What is the correct employer contribution rate?',
      a: 'Rates vary by country and sector. Enter the rate that applies to your employee after verifying it with official sources.',
    },
    {
      q: 'Does the calculator include taxes?',
      a: 'It does not add taxes automatically, but you can include them under recurring or one-time costs if you wish.',
    },
    {
      q: 'How do I calculate the cost for an existing employee?',
      a: 'Enter zero for the one-time costs to get only the recurring monthly and annual cost.',
    },
  ],
  methodologyNote:
    'The calculator adds the recurring monthly cost (salary, contributions, insurance, benefits, software and other costs), annualises it, then adds one-time costs to show the first-year total. This page is reviewed periodically, and figures depend on local contribution rates and laws, so verify the rates with your employer or the relevant authorities.',
  disclaimerNote:
    'This result is an estimate for information purposes only and is not financial or legal advice. Verify applicable contributions and taxes with the relevant authorities.',
  lastReviewed: '2026-08-09',
  currencyDefault: 'JOD',
  currencyLabel: 'Currency',
  requiredNote: 'Fields marked with * are required.',
  buttons: {
    calculate: 'Calculate',
    reset: 'Reset',
    copy: 'Copy',
    copied: 'Copied',
    share: 'Share',
    example: 'Example',
  },
  ui: {
    resultTitle: 'Results',
    copySuccess: 'Results copied.',
    copyFail: 'Could not copy results.',
    shareFail: 'Could not share results.',
    ariaResult: 'Employee total-cost calculator results',
  },
  guideTitle: 'Guide: the true cost of an employee',
  relatedTitle: 'Related calculators',
};

export default { ar, en } as Record<Locale, CalcContent>;
