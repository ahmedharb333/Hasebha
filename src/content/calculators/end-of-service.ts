import type { CalcContent } from '../../lib/calculators/types';
import type { Locale } from '../../config/site';

const ar: CalcContent = {
  locale: 'ar',
  slug: 'end-of-service',
  title: 'حاسبة مكافأة نهاية الخدمة',
  metaDescription:
    'قدّر مكافأة نهاية الخدمة وفق قوانين العمل في الأردن والسعودية والإمارات والكويت وقطر والبحرين وعُمان، بناءً على مدة الخدمة والراتب الأساسي.',
  h1: 'حاسبة مكافأة نهاية الخدمة',
  intro:
    'أدخل بلد العمل وتاريخي بداية ونهاية الخدمة والراتب الأساسي الشهري لتقدير مكافأة نهاية الخدمة. تُطبَّق شرائح القوانين الخاصة بكل بلد، مع مراعاة الاستقالة الطوعية والسقوف حيثما تنطبق.',
  fields: {
    country: {
      label: 'البلد',
      hint: 'اختر البلد لتطبيق قواعد مكافأة نهاية الخدمة الخاصة به.',
      options: {
        '': 'اختر البلد…',
        jo: 'الأردن',
        sa: 'السعودية',
        ae: 'الإمارات',
        kw: 'الكويت',
        qa: 'قطر',
        bh: 'البحرين',
        om: 'عُمان',
      },
    },
    startDate: {
      label: 'تاريخ بداية الخدمة',
      hint: 'اليوم الذي بدأت فيه الخدمة.',
    },
    endDate: {
      label: 'تاريخ نهاية الخدمة',
      hint: 'آخر يوم عمل أو تاريخ إنهاء العقد.',
    },
    monthlyBasic: {
      label: 'الراتب الأساسي الشهري',
      hint: 'الراتب الأساسي دون البدلات والعمولات، لأنه أساس احتساب المكافأة.',
    },
    resignation: {
      label: 'طريقة انتهاء الخدمة',
      options: {
        terminated: 'إنهاء من جهة العمل',
        voluntary: 'استقالة طوعية',
      },
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
    countryMismatch: 'قوانين هذا البلد تتطلب عملة مختلفة. اختر العملة الصحيحة.',
  },
  results: {
    gratuity: {
      label: 'مكافأة نهاية الخدمة',
      hint: 'عدد الأيام المستحقة × الأجر اليومي (الراتب الأساسي ÷ 30).',
      hero: true,
    },
    days: {
      label: 'أيام الخدمة المستحقة',
      hint: 'إجمالي أيام المكافأة بعد تطبيق الشرائح والسقوف.',
    },
    years: {
      label: 'سنوات الخدمة',
      hint: 'مدة الخدمة بين تاريخي البداية والنهاية مع الكسور.',
    },
  },
  resultTitle: 'النتائج',
  formula:
    'الأجر اليومي = الراتب الأساسي الشهري ÷ 30. المكافأة = عدد أيام الخدمة المستحقة × الأجر اليومي. تُحتسب الأيام من شرائح قانون البلد المختار، وتُقسم الكسور السنوية تناسبياً، وتُخفض عند الاستقالة الطوعية في الدول التي تنص على ذلك، وتُحدّ حسب السقف إن وجد.',
  exampleHtml:
    'الأردن: خدمة من 2018-01-01 إلى 2026-01-01 (≈ 8 سنوات) براتب أساسي 800 دينار<br>أيام المكافأة ≈ 8 × 30 = 240 يوماً، والأجر اليومي ≈ 26.67<br>المكافأة ≈ <strong>6,400</strong> دينار',
  assumptions: [
    'تُحسب المكافأة على الراتب الأساسي الشهري (بدون البدلات) ÷ 30.',
    'تُطبق شرائح قانون بلد العمل المختار كما وردت في قاعدة البيانات، وتُقسم الكسور السنوية تناسبياً.',
    'الاستقالة الطوعية تُخفض المكافأة في الكويت وفق مقياس القانون؛ وفي البلدان الأخرى لا يوجد تخفيض للاستقالة في هذا الإصدار.',
    'لا يُطبق أي سقف أعلى إلا في الدول التي تنص قوانينها على سقف (مثل 24 شهراً في الإمارات و18 في الكويت).',
    'قد تخضع الخدمة قبل تاريخ نفاذ قانون معين لأسس مختلفة؛ النتيجة تقديرية.',
  ],
  whenUseful:
    'مفيد عند إنهاء عقد العمل أو تقديم الاستقالة للتعرف على نطاق المكافأة المتوقع، وعند التفاوض على شروط مغادرة بين صاحب العمل والموظف.',
  mistakes: [
    'إدخال الراتب الإجمالي بدلاً من الأساسي، مما يبالغ في النتيجة.',
    'اعتبار كل البلدان تتبع نفس الشرائح أو نفس قاعدة الاستقالة.',
    'تجاهل السقوف الأعلى للمكافأة في بعض الدول.',
    'خلط تاريخ نهاية الخدمة بتاريخ توقيع عقد جديد دون انقطاع.',
  ],
  faqs: [
    {
      q: 'هل تدعم الحاسبة الاستقالة الطوعية؟',
      a: 'نعم، وفي الكويت تحديداً تُطبق الحاسبة مقياس التخفيض القانوني (لا مكافأة قبل 3 سنوات، نصف المكافأة من 3 إلى 5 سنوات، الثلثين من 5 إلى 10 سنوات، والمكافأة كاملة بعد 10 سنوات).',
    },
    {
      q: 'على أي راتب تُحسب المكافأة؟',
      a: 'تُحسب على الراتب الأساسي الشهري في معظم قوانين المنطقة، لذا أدخل الأساسي دون البدلات والعمولات. الأجر اليومي = الراتب الأساسي ÷ 30.',
    },
    {
      q: 'هل توجد سقوف للمكافأة؟',
      a: 'نعم، في الإمارات يُحدّ إجمالي المكافأة بـ 24 راتباً شهرياً تقريباً، وفي الكويت بـ 18 شهراً. تُطبق الحاسبة هذه السقوف تلقائياً حسب البلد المختار.',
    },
    {
      q: 'ماذا لو كانت بداية الخدمة قبل تغيير القانون؟',
      a: 'بعض الدول تفرض تقسيم المكافأة بين فترات الخدمة قبل وبعد تاريخ نفاذ القانون. هذه الحاسبة تُطبق أسس القانون الحالي؛ للفترات الانتقالية الدقيقة استشر جهة العمل أو السلطات المختصة.',
    },
  ],
  methodologyNote:
    'تعتمد الحاسبة على قاعدة بيانات قوانين العمل لكل بلد (شرائح الأيام لكل سنة، سقوف المكافأة، ومقياس الاستقالة الطوعية). الأجر اليومي = الراتب الأساسي ÷ 30، والكسور السنوية تُقسم تناسبياً على أساس 365 يوماً. تُراجع الأرقام دورياً مقابل المصادر الرسمية، والنتيجة تقديرية.',
  disclaimerNote:
    'هذه النتيجة تقديرية لأغراض إعلامية فقط ولا تُعد مشورة قانونية. تحقق من تطبيق القانون على حالتك لدى جهة العمل أو السلطات المختصة.',
  lastReviewed: '2026-08-12',
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
    ariaResult: 'نتائج حاسبة مكافأة نهاية الخدمة',
  },
  guideTitle: 'دليل: حساب مكافأة نهاية الخدمة',
  relatedTitle: 'حاسبات ذات صلة',
};

const en: CalcContent = {
  locale: 'en',
  slug: 'end-of-service',
  title: 'End-of-service gratuity calculator',
  metaDescription:
    'Estimate end-of-service gratuity under the labour laws of Jordan, Saudi Arabia, UAE, Kuwait, Qatar, Bahrain and Oman, based on service length and basic salary.',
  h1: 'End-of-service gratuity calculator',
  intro:
    'Enter the country of work, the service start and end dates and the basic monthly salary to estimate end-of-service gratuity. Each country\u2019s statutory bands are applied, including voluntary-resignation scaling and caps where they apply.',
  fields: {
    country: {
      label: 'Country',
      hint: 'Select the country to apply its end-of-service gratuity rules.',
      options: {
        '': 'Choose a country…',
        jo: 'Jordan',
        sa: 'Saudi Arabia',
        ae: 'UAE',
        kw: 'Kuwait',
        qa: 'Qatar',
        bh: 'Bahrain',
        om: 'Oman',
      },
    },
    startDate: {
      label: 'Service start date',
      hint: 'The day service began.',
    },
    endDate: {
      label: 'Service end date',
      hint: 'The last working day or the date the contract ended.',
    },
    monthlyBasic: {
      label: 'Basic monthly salary',
      hint: 'The basic salary excluding allowances and commissions, as it is the basis of the gratuity.',
    },
    resignation: {
      label: 'How service ended',
      options: {
        terminated: 'Terminated by employer',
        voluntary: 'Voluntary resignation',
      },
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
    countryMismatch: 'This country\u2019s rules require a different currency. Select the correct currency.',
  },
  results: {
    gratuity: {
      label: 'End-of-service gratuity',
      hint: 'Entitlement days × daily wage (basic salary ÷ 30).',
      hero: true,
    },
    days: {
      label: 'Entitlement days',
      hint: 'Total gratuity days after applying bands and caps.',
    },
    years: {
      label: 'Years of service',
      hint: 'Service length between the start and end dates, including fractions.',
    },
  },
  resultTitle: 'Results',
  formula:
    'Daily wage = basic monthly salary ÷ 30. Gratuity = entitlement days × daily wage. Days follow the bands of the selected country\u2019s law, fractional years are pro-rated, voluntary resignation is scaled where the law provides, and caps are applied where they exist.',
  exampleHtml:
    'Jordan: service 2018-01-01 to 2026-01-01 (≈ 8 years) with a basic salary of 800 currency units<br>Entitlement ≈ 8 × 30 = 240 days, daily wage ≈ 26.67<br>Gratuity ≈ <strong>6,400</strong> currency units',
  assumptions: [
    'The gratuity is based on the basic monthly salary (excluding allowances) ÷ 30.',
    'The bands of the selected country\u2019s law are applied as stored in the database, and fractional years are pro-rated.',
    'Voluntary resignation reduces the gratuity in Kuwait per the statutory scale; in the other countries no resignation reduction applies in this version.',
    'An upper cap applies only where the law provides one (e.g. 24 months in the UAE and 18 in Kuwait).',
    'Service before a law\u2019s effective date may follow different bases; the result is an estimate.',
  ],
  whenUseful:
    'Useful when a contract ends or you are resigning, to understand the likely gratuity range, and when negotiating exit terms between employer and employee.',
  mistakes: [
    'Entering the gross salary instead of the basic one, which inflates the result.',
    'Assuming all countries share the same bands or the same resignation rule.',
    'Ignoring the upper gratuity caps in some countries.',
    'Confusing the service end date with the signing date of a new contract with no gap.',
  ],
  faqs: [
    {
      q: 'Does the calculator support voluntary resignation?',
      a: 'Yes, and in Kuwait specifically the statutory reduction scale is applied (no gratuity under 3 years, half from 3 to 5 years, two-thirds from 5 to 10 years, and the full amount after 10 years).',
    },
    {
      q: 'On which salary is the gratuity based?',
      a: 'Most laws in the region base it on the basic monthly salary, so enter the basic amount excluding allowances and commissions. The daily wage = basic salary ÷ 30.',
    },
    {
      q: 'Are there gratuity caps?',
      a: 'Yes, the UAE caps the total gratuity at roughly 24 monthly salaries and Kuwait at 18 months. The calculator applies these caps automatically for the selected country.',
    },
    {
      q: 'What if service started before a law changed?',
      a: 'Some countries split the gratuity between service before and after the law\u2019s effective date. This calculator applies the current-law basis; for exact transitional treatment consult your employer or the authorities.',
    },
  ],
  methodologyNote:
    'The calculator relies on a database of each country\u2019s labour-law rules (days per year, gratuity caps, and the voluntary-resignation scale). The daily wage is the basic salary ÷ 30, and fractional years are pro-rated on a 365-day basis. Figures are reviewed periodically against official sources, and the result is an estimate.',
  disclaimerNote:
    'This result is an estimate for information purposes only and is not legal advice. Verify how the law applies to your case with your employer or the relevant authorities.',
  lastReviewed: '2026-08-12',
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
    ariaResult: 'End-of-service gratuity calculator results',
  },
  guideTitle: 'Guide: calculating end-of-service gratuity',
  relatedTitle: 'Related calculators',
};

export default { ar, en } as Record<Locale, CalcContent>;
