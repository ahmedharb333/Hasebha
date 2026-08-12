import type { CalcContent } from '../../lib/calculators/types';
import type { Locale } from '../../config/site';

const ar: CalcContent = {
  locale: 'ar',
  slug: 'overtime-pay',
  title: 'حاسبة أجر العمل الإضافي',
  metaDescription:
    'احسب أجر ساعات العمل الإضافية باستخدام مضاعف قابل للتخصيص (×1.25، ×1.5، ×2.0 أو مخصص).',
  h1: 'حاسبة أجر العمل الإضافي',
  intro:
    'احسب الأجر الأساسي للساعة وأجر ساعات العمل الإضافية وإجمالي الأجر الأسبوعي، مع مضاعف قابل للتخصيص يناسب قواعد بلدك أو شركتك.',
  fields: {
    country: {
      label: 'البلد',
      hint: 'اختر البلد لتطبيق مضاعفات العمل الإضافي القانونية، أو اتركه فارغاً لاختيار مضاعف يدوي.',
      options: {
        '': 'اختر البلد… (مضاعف يدوي)',
        jo: 'الأردن',
        sa: 'السعودية',
        ae: 'الإمارات',
        kw: 'الكويت',
        qa: 'قطر',
        bh: 'البحرين',
        om: 'عُمان',
      },
    },
    basis: {
      label: 'أساس الحساب',
      options: {
        monthly: 'راتب شهري',
        hourly: 'أجر بالساعة',
      },
    },
    monthlySalary: {
      label: 'الراتب الشهري',
      hint: 'الراتب الإجمالي قبل الاقتطاعات، يُستخدم لاشتقاق الأجر الأساسي للساعة.',
    },
    hourlyRate: {
      label: 'الأجر بالساعة',
      hint: 'أدخل أجرك المتفق عليه للساعة مباشرة.',
    },
    weeklyHours: {
      label: 'ساعات العمل الأسبوعية',
      hint: 'العدد المعتاد للساعات في الأسبوع؛ يُستخدم لاشتقاق الأجر الأساسي للساعة.',
    },
    overtimeHours: {
      label: 'ساعات العمل الإضافي في الأسبوع',
      hint: 'عدد الساعات الإضافية أسبوعياً.',
    },
    otKind: {
      label: 'نوع العمل الإضافي',
      hint: 'نوع الساعات الإضافية لتطبيق المضاعف القانوني للبلد.',
      options: {
        standard: 'عمل إضافي عادي',
        night: 'عمل ليلي',
        rest_day: 'يوم الراحة',
        public_holiday: 'العطلات الرسمية',
      },
    },
    multiplier: {
      label: 'المضاعف اليدوي',
      hint: 'يُستخدم عند عدم اختيار بلد.',
      options: {
        '1.0': '×1.0',
        '1.25': '×1.25',
        '1.5': '×1.5',
        '2.0': '×2.0',
        custom: 'مخصص',
      },
    },
    customMultiplier: {
      label: 'المضاعف المخصص',
      hint: 'أدخل مضاعفاً بين 1 و5.',
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
    baseHourly: {
      label: 'الأجر الأساسي للساعة',
      hint: 'مشتق من الراتب الشهري أو الأجر الساعي المُدخل.',
    },
    overtimeRate: {
      label: 'أجر الساعة الإضافية',
      hint: 'الأجر الأساسي للساعة مضروباً في المضاعف المختار.',
    },
    overtimeEarnings: {
      label: 'أجر العمل الإضافي الأسبوعي',
      hint: 'أجر الساعة الإضافية × ساعات العمل الإضافي.',
    },
    totalEarnings: {
      label: 'إجمالي الأجر الأسبوعي',
      hint: 'الأجر عن الساعات العادية + أجر العمل الإضافي.',
    },
  },
  resultTitle: 'النتائج',
  formula:
    'الأجر الأساسي للساعة = (الراتب الشهري × 12) ÷ (52 × ساعات العمل الأسبوعية). أجر الساعة الإضافية = الأجر الأساسي × المضاعف. أجر العمل الإضافي الأسبوعي = أجر الساعة الإضافية × ساعات العمل الإضافي. إجمالي الأجر الأسبوعي = (الأساسي × الساعات العادية) + أجر العمل الإضافي.',
  exampleHtml:
    'الراتب الشهري: <strong>1,000</strong> دينار، وساعات العمل الأسبوعية: 40<br>الأجر الأساسي للساعة ≈ <strong>5.77</strong> دينار<br>بمضاعف ×1.5: أجر الساعة الإضافية ≈ <strong>8.65</strong> دينار<br>6 ساعات إضافية أسبوعياً ≈ <strong>51.92</strong> دينار<br>إجمالي الأجر الأسبوعي ≈ <strong>282.69</strong> دينار',
  assumptions: [
    '52 أسبوعاً و12 شهراً في السنة.',
    'الأجر الأساسي محسوب على ساعات العمل الأسبوعية المُدخلة فقط.',
    'النتائج محسوبة على أساس أسبوعي وليس شهرياً.',
    'لا يشمل الحساب بدلات أو علاوات أو امتيازات أخرى.',
    'مضاعف العمل الإضافي يختلف بين البلدان؛ تحقق من القاعدة المطبقة في بلدك.',
    'عند اختيار البلد تُطبق قيمة المضاعف القانونية لكل نوع من أنواع العمل الإضافي.',
  ],
  whenUseful:
    'مفيد عند تقدير أجر ساعات العمل الإضافية في جداول العمل، أو عند التفاوض على تعويض العمل الإضافي، أو لمقارنة عروض عمل تتضمن ساعات إضافية.',
  mistakes: [
    'استخدام الراتب الصافي بدلاً من الإجمالي.',
    'افتراض أن الأجر الأساسي للساعة لا يعتمد على ساعات العمل الأسبوعية.',
    'نسيان أن النتيجة أسبوعية وليست شهرية.',
    'تطبيق مضاعف ثابت دون التحقق من القاعدة المحلية أو عقد العمل.',
  ],
  faqs: [
    {
      q: 'كيف يُشتق الأجر الأساسي للساعة من الراتب الشهري؟',
      a: 'يُحسب الراتب السنوي (الراتب الشهري × 12) ثم يُقسم على إجمالي الساعات السنوية (52 أسبوعاً × ساعات العمل الأسبوعية).',
    },
    {
      q: 'ما المضاعف الذي يجب أن أستخدمه؟',
      a: 'يعتمد على قوانين العمل في بلدك واتفاقية العمل الخاصة بك. لا تفترض مضاعفاً واحداً، وتحقق من النسبة المطبقة عندك.',
    },
    {
      q: 'هل النتيجة تشمل الضرائب والاقتطاعات؟',
      a: 'لا، النتيجة تقديرية على المبلغ المُدخل ولا تُخصم منها الضرائب أو الاشتراكات.',
    },
    {
      q: 'هل يمكن احتساب الإجمالي الشهري؟',
      a: 'النتائج أسبوعية. يمكنك تقدير الشهري بضرب الأجر الأسبوعي في عدد الأسابيع، مع العلم أن ذلك تقدير تقريبي.',
    },
  ],
  methodologyNote:
    'يشتق الحاسب الأجر الأساسي للساعة من الراتب الشهري أو الأجر الساعي المُدخل، ثم يطبق المضاعف على الساعات الإضافية. تُراجع هذه الصفحة دورياً، وتخضع النتائج لقوانين العمل المحلية وشروط عقدك، لذا تحقق من الأرقام مع جهة العمل أو السلطات المختصة.',
  disclaimerNote:
    'هذه النتيجة تقديرية لأغراض إعلامية فقط ولا تُعد مشورة قانونية أو مالية. تحقق دائماً من قواعد العمل الإضافي المطبقة في بلدك.',
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
    ariaResult: 'نتائج حاسبة أجر العمل الإضافي',
  },
  guideTitle: 'دليل: كيف تحسب أجر العمل الإضافي',
  relatedTitle: 'حاسبات ذات صلة',
};

const en: CalcContent = {
  locale: 'en',
  slug: 'overtime-pay',
  title: 'Overtime pay calculator',
  metaDescription:
    'Calculate overtime earnings using a configurable multiplier (×1.25, ×1.5, ×2.0 or custom).',
  h1: 'Overtime pay calculator',
  intro:
    'Calculate your base hourly rate, overtime rate and total weekly earnings with a configurable multiplier that fits your country or company rules.',
  fields: {
    country: {
      label: 'Country',
      hint: 'Select the country to apply its legal overtime multipliers, or leave it empty to choose a manual multiplier.',
      options: {
        '': 'Choose a country… (manual multiplier)',
        jo: 'Jordan',
        sa: 'Saudi Arabia',
        ae: 'UAE',
        kw: 'Kuwait',
        qa: 'Qatar',
        bh: 'Bahrain',
        om: 'Oman',
      },
    },
    basis: {
      label: 'Pay basis',
      options: {
        monthly: 'Monthly salary',
        hourly: 'Hourly rate',
      },
    },
    monthlySalary: {
      label: 'Monthly salary',
      hint: 'Gross salary before deductions, used to derive the base hourly rate.',
    },
    hourlyRate: {
      label: 'Hourly rate',
      hint: 'Enter your agreed hourly rate directly.',
    },
    weeklyHours: {
      label: 'Weekly working hours',
      hint: 'Usual hours per week; used to derive the base hourly rate.',
    },
    overtimeHours: {
      label: 'Overtime hours per week',
      hint: 'Number of additional hours worked each week.',
    },
    otKind: {
      label: 'Overtime kind',
      hint: 'The kind of overtime hours, to apply the country\u2019s legal multiplier.',
      options: {
        standard: 'Standard overtime',
        night: 'Night work',
        rest_day: 'Rest day',
        public_holiday: 'Public holidays',
      },
    },
    multiplier: {
      label: 'Manual multiplier',
      hint: 'Used when no country is selected.',
      options: {
        '1.0': '×1.0',
        '1.25': '×1.25',
        '1.5': '×1.5',
        '2.0': '×2.0',
        custom: 'Custom',
      },
    },
    customMultiplier: {
      label: 'Custom multiplier',
      hint: 'Enter a multiplier between 1 and 5.',
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
    baseHourly: {
      label: 'Base hourly rate',
      hint: 'Derived from the monthly salary or the hourly rate you entered.',
    },
    overtimeRate: {
      label: 'Overtime rate',
      hint: 'Base hourly rate multiplied by the chosen multiplier.',
    },
    overtimeEarnings: {
      label: 'Weekly overtime earnings',
      hint: 'Overtime rate × overtime hours.',
    },
    totalEarnings: {
      label: 'Total weekly earnings',
      hint: 'Regular hours pay + overtime pay.',
    },
  },
  resultTitle: 'Results',
  formula:
    'Base hourly rate = (monthly salary × 12) ÷ (52 × weekly hours). Overtime rate = base hourly × multiplier. Weekly overtime pay = overtime rate × overtime hours. Total weekly earnings = (base hourly × regular hours) + overtime pay.',
  exampleHtml:
    'Monthly salary: <strong>1,000</strong> currency units, weekly hours: 40<br>Base hourly rate ≈ <strong>5.77</strong><br>With a ×1.5 multiplier: overtime rate ≈ <strong>8.65</strong><br>6 overtime hours per week ≈ <strong>51.92</strong><br>Total weekly earnings ≈ <strong>282.69</strong>',
  assumptions: [
    '52 weeks and 12 months per year.',
    'The base hourly rate is derived only from the weekly hours you enter.',
    'Results are weekly, not monthly.',
    'Allowances, bonuses and other benefits are not included.',
    'Overtime multipliers vary by country; check the rule that applies to you.',
    'When a country is selected the legal multiplier for each overtime kind is applied.',
  ],
  whenUseful:
    'Useful when estimating overtime pay for work schedules, negotiating overtime compensation, or comparing job offers that involve extra hours.',
  mistakes: [
    'Using net salary instead of gross salary.',
    'Assuming the base hourly rate does not depend on weekly working hours.',
    'Forgetting that the result is weekly, not monthly.',
    'Applying a fixed multiplier without checking local rules or your contract.',
  ],
  faqs: [
    {
      q: 'How is the base hourly rate derived from a monthly salary?',
      a: 'The annual salary (monthly × 12) is divided by the total annual hours (52 weeks × weekly working hours).',
    },
    {
      q: 'Which multiplier should I use?',
      a: 'It depends on your country labour law and your employment agreement. Do not assume a single multiplier; check the rate that applies to you.',
    },
    {
      q: 'Does the result include taxes and deductions?',
      a: 'No. The result is an estimate based on the amount you enter, with no taxes or contributions deducted.',
    },
    {
      q: 'Can I get a monthly total?',
      a: 'Results are weekly. You can roughly estimate a month by multiplying the weekly figure by the number of weeks, but that is only an approximation.',
    },
  ],
  methodologyNote:
    'The calculator derives the base hourly rate from the monthly salary or the hourly rate you enter, then applies the multiplier to overtime hours. This page is reviewed periodically, and results depend on local labour laws and your contract, so confirm figures with your employer or the relevant authorities.',
  disclaimerNote:
    'This result is an estimate for information purposes only and is not legal or financial advice. Always verify the overtime rules that apply in your country.',
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
    ariaResult: 'Overtime pay calculator results',
  },
  guideTitle: 'Guide: how to calculate overtime pay',
  relatedTitle: 'Related calculators',
};

export default { ar, en } as Record<Locale, CalcContent>;
