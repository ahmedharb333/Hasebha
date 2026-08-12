import type { CalcContent } from '../../lib/calculators/types';
import type { Locale } from '../../config/site';

const ar: CalcContent = {
  locale: 'ar',
  slug: 'leave-balance',
  title: 'حاسبة رصيد الإجازات',
  metaDescription:
    'احسب الإجازة المستحقة والمتاحة والمتبقية حسب طرق الاستحقاق الشهرية واليومية أو السنوية.',
  h1: 'حاسبة رصيد الإجازات',
  intro:
    'احسب رصيد إجازتك السنوية المستحق والمتاح والمتبقي، مع مراعاة طريقة الاستحقاق (شهري، يومي، أو سنوي كامل)، والرصيد المرحّل، والحد الأقصى للترحيل.',
  fields: {
    country: {
      label: 'البلد',
      hint: 'اختر البلد لتطبيق الاستحقاق السنوي القانوني حسب سنوات الخدمة، أو اتركه فارغاً لإدخال الاستحقاق يدوياً.',
      options: {
        '': 'اختر البلد… (استحقاق يدوي)',
        jo: 'الأردن',
        sa: 'السعودية',
        ae: 'الإمارات',
        kw: 'الكويت',
        qa: 'قطر',
        bh: 'البحرين',
        om: 'عُمان',
      },
    },
    tenureYears: {
      label: 'مدة الخدمة (بالسنوات)',
      hint: 'عدد سنوات الخدمة لتحديد الاستحقاق السنوي القانوني.',
    },
    annualEntitlement: {
      label: 'الإجازة السنوية المستحقة (أيام)',
      hint: 'عدد أيام الإجازة المستحقة لكل سنة عمل كاملة. يُستخدم عند عدم اختيار بلد.',
    },
    startDate: {
      label: 'تاريخ بدء التعيين',
      hint: 'التاريخ الذي يبدأ منه احتساب الاستحقاق.',
    },
    calcDate: {
      label: 'تاريخ احتساب الرصيد',
      hint: 'اليوم الذي تريد احتساب الرصيد عنده؛ يجب ألا يسبق تاريخ البدء.',
    },
    leaveTaken: {
      label: 'أيام الإجازة المستهلكة',
      hint: 'عدد أيام الإجازة التي استهلكتها حتى تاريخ الاحتساب.',
    },
    approvedCarryover: {
      label: 'الرصيد المرحّل المعتمد',
      hint: 'أيام الإجازة المعتمدة المنقولة من السنة السابقة.',
    },
    accrualMethod: {
      label: 'طريقة الاستحقاق',
      options: {
        monthly: 'استحقاق شهري',
        daily: 'استحقاق يومي',
        full: 'استحقاق سنوي كامل',
      },
    },
    maxCarryover: {
      label: 'الحد الأقصى للترحيل',
      hint: 'اختياري؛ ما يتجاوز هذا الحد من الرصيد المرحّل يُعرض كأيام منتهية.',
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
    annualEntitlement: {
      label: 'الاستحقاق السنوي القانوني',
      hint: 'أيام الإجازة السنوية المقررة قانوناً حسب مدة الخدمة.',
    },
    accrued: {
      label: 'الإجازة المستحقة',
      hint: 'مجموع الأيام المتراكمة حتى تاريخ الاحتساب.',
    },
    used: {
      label: 'المستهلك',
      hint: 'أيام الإجازة التي استهلكتها بالفعل.',
    },
    available: {
      label: 'الرصيد المتاح',
      hint: 'المستحق + الرصيد المرحّل − المستهلك (لا يقل عن صفر).',
    },
    remainingEntitlement: {
      label: 'المتبقي من الاستحقاق',
      hint: 'الاستحقاق السنوي − الأيام المستهلكة.',
    },
    carryover: {
      label: 'الرصيد المرحّل',
      hint: 'الأيام المعتمدة المنقولة بعد تطبيق الحد الأقصى إن وُجد.',
    },
    expired: {
      label: 'المنتهي',
      hint: 'الجزء من الرصيد المرحّل الذي تجاوز الحد الأقصى.',
    },
  },
  resultTitle: 'النتائج',
  formula:
    'بالاستحقاق الشهري: المستحق = (الاستحقاق السنوي ÷ 12) × عدد الأشهر الكاملة. بالاستحقاق اليومي: المستحق = (الاستحقاق السنوي ÷ 365) × عدد الأيام. بالاستحقاق السنوي الكامل: المستحق = الاستحقاق السنوي. الرصيد المتاح = المستحق + الرصيد المرحّل − المستهلك.',
  exampleHtml:
    'الاستحقاق السنوي: <strong>30</strong> يوماً، بطريقة الاستحقاق الشهري<br>من 2024-01-01 إلى 2025-01-01 = 12 شهراً كاملة<br>الإجازة المستحقة = 30 ÷ 12 × 12 = <strong>30</strong> يوماً<br>المستهلك: 10 أيام<br>الرصيد المتاح = 30 − 10 = <strong>20</strong> يوماً',
  assumptions: [
    'الاستحقاق الشهري يحسب الأشهر الكاملة فقط ولا يقسم الشهر الناقص.',
    'الاستحقاق اليومي يفترض 365 يوماً في السنة.',
    'لا تُحتسب العطل الرسمية أو قواعد الترحيب الخاصة في هذه الحاسبة.',
    'الرصيد المرحّل يُقيّد بالحد الأقصى للترحيل إذا أدخلته.',
    'قواعد الإجازات تختلف بين البلدان وبين عقود العمل، فتحقق من القاعدة المطبقة عندك.',
    'عند اختيار البلد يُطبق الاستحقاق السنوي القانوني حسب مدة الخدمة بدلاً من الإدخال اليدوي.',
  ],
  whenUseful:
    'مفيد للموظفين وقسم الموارد البشرية لمتابعة الرصيد المتراكم والمتاح، وللتخطيط للإجازات قبل نهاية السنة أو قبل الاستقالة.',
  mistakes: [
    'عدم تحديد طريقة الاستحقاق المطبقة في بلدك أو شركتك.',
    'نسيان الرصيد المرحّل من السنة السابقة.',
    'تجاهل الحد الأقصى للترحيل عند احتساب الرصيد المتاح.',
    'الخلط بين أيام التقويم وأيام العمل عند احتساب الاستحقاق اليومي.',
  ],
  faqs: [
    {
      q: 'ما الفرق بين الاستحقاق الشهري واليومي؟',
      a: 'الاستحقاق الشهري يوزع الاستحقاق السنوي على 12 شهراً ويحسب الأشهر الكاملة، بينما يوزعه اليومي على 365 يوماً ويحسب كل يوم تقويمي.',
    },
    {
      q: 'متى يكون الاستحقاق السنوي الكامل مناسباً؟',
      a: 'عندما تمنح الشركة الرصيد السنوي كاملاً في بداية السنة بدلاً من تراكمه تدريجياً.',
    },
    {
      q: 'كيف يُطبق الحد الأقصى للترحيل؟',
      a: 'إذا تجاوز الرصيد المرحّل الحد الأقصى، يُثبَّت الرصيد المعتمد عند الحد الأقصى ويُعرض الفائض كأيام منتهية.',
    },
    {
      q: 'هل تعكس النتائج قوانين بلدي؟',
      a: 'القواعد تعتمد على ما تدخله من طريقة استحقاق ورصيد مرحّل. القوانين الرسمية تختلف بين البلدان، فتحقق من جهة العمل أو السلطات المختصة.',
    },
  ],
  methodologyNote:
    'يحسب الحاسب الإجازة المستحقة بناءً على طريقة الاستحقاق المختارة (شهرياً بالأشهر الكاملة، يومياً بأيام التقويم، أو سنوياً بالرصيد الكامل)، ثم يخصم الأيام المستهلكة ويضيف الرصيد المرحّل مع تطبيق الحد الأقصى. تُراجع هذه الصفحة دورياً، وتخضع الأرقام لقوانين العمل المحلية وشروط عقدك، لذا تحقق من القواعد مع جهة العمل أو السلطات المختصة.',
  disclaimerNote:
    'هذه النتيجة تقديرية لأغراض إعلامية فقط ولا تُعد مشورة قانونية. تحقق من قواعد الإجازات المطبقة في بلدك أو مؤسستك قبل التخطيط.',
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
    ariaResult: 'نتائج حاسبة رصيد الإجازات',
  },
  guideTitle: 'دليل: كيف تحسب أجر العمل الإضافي',
  relatedTitle: 'حاسبات ذات صلة',
};

const en: CalcContent = {
  locale: 'en',
  slug: 'leave-balance',
  title: 'Leave-balance calculator',
  metaDescription:
    'Calculate accrued, available and remaining leave under monthly, daily or annual accrual methods.',
  h1: 'Leave-balance calculator',
  intro:
    'Calculate your accrued, available and remaining annual leave, taking into account the accrual method (monthly, daily or full-year), approved carryover and any carryover cap.',
  fields: {
    country: {
      label: 'Country',
      hint: 'Select the country to apply its statutory annual leave by years of service, or leave it empty to enter the entitlement manually.',
      options: {
        '': 'Choose a country… (manual entitlement)',
        jo: 'Jordan',
        sa: 'Saudi Arabia',
        ae: 'UAE',
        kw: 'Kuwait',
        qa: 'Qatar',
        bh: 'Bahrain',
        om: 'Oman',
      },
    },
    tenureYears: {
      label: 'Years of service',
      hint: 'Years of service, to determine the statutory annual leave entitlement.',
    },
    annualEntitlement: {
      label: 'Annual leave entitlement (days)',
      hint: 'Number of leave days earned for each full working year. Used when no country is selected.',
    },
    startDate: {
      label: 'Start date',
      hint: 'The date from which accrual begins.',
    },
    calcDate: {
      label: 'Balance as of',
      hint: 'The date at which you want the balance; it must not be before the start date.',
    },
    leaveTaken: {
      label: 'Leave taken',
      hint: 'Number of leave days already used by the balance date.',
    },
    approvedCarryover: {
      label: 'Approved carryover',
      hint: 'Approved leave days carried over from the previous year.',
    },
    accrualMethod: {
      label: 'Accrual method',
      options: {
        monthly: 'Monthly accrual',
        daily: 'Daily accrual',
        full: 'Full-year entitlement',
      },
    },
    maxCarryover: {
      label: 'Maximum carryover',
      hint: 'Optional; any carryover above this cap is shown as expired days.',
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
    annualEntitlement: {
      label: 'Statutory annual entitlement',
      hint: 'The annual leave days granted by law for the years of service.',
    },
    accrued: {
      label: 'Accrued',
      hint: 'Total days accumulated up to the balance date.',
    },
    used: {
      label: 'Used',
      hint: 'Leave days you have actually taken.',
    },
    available: {
      label: 'Available',
      hint: 'Accrued + carryover − used (never below zero).',
    },
    remainingEntitlement: {
      label: 'Remaining entitlement',
      hint: 'Annual entitlement − used days.',
    },
    carryover: {
      label: 'Carryover',
      hint: 'Approved days carried over after any cap is applied.',
    },
    expired: {
      label: 'Expired',
      hint: 'The part of the carryover that exceeds the cap.',
    },
  },
  resultTitle: 'Results',
  formula:
    'Monthly accrual: accrued = (annual entitlement ÷ 12) × full months. Daily accrual: accrued = (annual entitlement ÷ 365) × days. Full-year accrual: accrued = annual entitlement. Available = accrued + carryover − used.',
  exampleHtml:
    'Annual entitlement: <strong>30</strong> days, monthly accrual method<br>From 2024-01-01 to 2025-01-01 = 12 full months<br>Accrued leave = 30 ÷ 12 × 12 = <strong>30</strong> days<br>Used: 10 days<br>Available = 30 − 10 = <strong>20</strong> days',
  assumptions: [
    'Monthly accrual counts only full months and does not split a partial month.',
    'Daily accrual assumes 365 days per year.',
    'When a country is selected, the statutory annual entitlement by years of service is applied instead of a manual entry.',
    'Public holidays or special onboarding rules are not covered by this calculator.',
    'Carryover is capped by the maximum carryover if you provide one.',
    'Leave rules vary by country and employment contract; check the rule that applies to you.',
  ],
  whenUseful:
    'Useful for employees and HR teams to track accrued and available balances, and to plan leave before year-end or before resigning.',
  mistakes: [
    'Not selecting the accrual method that applies in your country or company.',
    'Forgetting carryover from the previous year.',
    'Ignoring the maximum carryover when computing the available balance.',
    'Confusing calendar days with working days in daily accrual.',
  ],
  faqs: [
    {
      q: 'What is the difference between monthly and daily accrual?',
      a: 'Monthly accrual spreads the entitlement over 12 months and counts full months, while daily accrual spreads it over 365 calendar days and counts each day.',
    },
    {
      q: 'When is full-year accrual appropriate?',
      a: 'When the company grants the full annual balance at the start of the year instead of accruing it gradually.',
    },
    {
      q: 'How is the maximum carryover applied?',
      a: 'If carryover exceeds the cap, the approved balance is capped at the maximum and the surplus is shown as expired days.',
    },
    {
      q: 'Do the results reflect my country rules?',
      a: 'The results depend on the accrual method and carryover you enter. Official rules vary by country, so verify with your employer or the relevant authorities.',
    },
  ],
  methodologyNote:
    'The calculator computes accrued leave using the chosen method (monthly by full months, daily by calendar days, or the full annual entitlement), then subtracts used days and adds approved carryover with the cap applied. This page is reviewed periodically, and figures depend on local labour laws and your contract, so confirm the rules with your employer or the relevant authorities.',
  disclaimerNote:
    'This result is an estimate for information purposes only and is not legal advice. Verify the leave rules that apply in your country or organisation before planning.',
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
    ariaResult: 'Leave-balance calculator results',
  },
  guideTitle: 'Guide: how to calculate overtime pay',
  relatedTitle: 'Related calculators',
};

export default { ar, en } as Record<Locale, CalcContent>;
