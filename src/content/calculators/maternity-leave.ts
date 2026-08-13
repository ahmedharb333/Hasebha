import type { CalcContent } from '../../lib/calculators/types';
import type { Locale } from '../../config/site';

const ar: CalcContent = {
  locale: 'ar',
  slug: 'maternity-leave',
  title: 'حاسبة إجازة الأمومة',
  metaDescription:
    'اعرف مدة إجازة الأمومة الممنوحة قانوناً في بلدك، بعدد الأيام والأسابيع، وفق قوانين العمل.',
  h1: 'حاسبة إجازة الأمومة',
  intro:
    'اختر البلد لمعرفة مدة إجازة الأمومة المقررة قانوناً في الأيام والأسابيع. تُعرض المدة الإجمالية، مع الانتباه إلى أن بعض الدول تقسمها إلى جزء بأجر كامل وجزء بنصف أجر.',
  fields: {
    country: {
      label: 'البلد',
      hint: 'اختر البلد لتطبيق مدة إجازة الأمومة المنصوص عليها في قانون العمل.',
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
  },
  errorMessages: {
    required: 'هذا الحقل مطلوب.',
    invalid: 'أدخل قيمة صحيحة.',
    min: 'القيمة أقل من الحد الأدنى المسموح.',
    max: 'القيمة أكبر من الحد الأقصى المسموح.',
    __generic: 'يرجى مراجعة الحقول المحددة وإعادة المحاولة.',
  },
  results: {
    maternityDays: {
      label: 'مدة الإجازة (أيام)',
      hint: 'إجمالي مدة إجازة الأمومة بالأيام.',
      hero: true,
    },
    maternityWeeks: {
      label: 'مدة الإجازة (أسابيع)',
      hint: 'مدة الإجازة مقرّبة إلى أسابيع.',
    },
  },
  resultTitle: 'النتائج',
  formula:
    'تُستخرج مدة إجازة الأمومة مباشرة من القانون لكل بلد. بعض الدول تمنح جزءاً بأجر كامل وجزءاً بنصف أجر (مثل الإمارات: 45 يوماً بأجر كامل ثم 15 يوماً بنصف أجر).',
  exampleHtml:
    'الأردن: <strong>90 يوماً</strong><br>السعودية: <strong>84 يوماً</strong> (12 أسبوعاً)<br>الكويت: <strong>70 يوماً</strong><br>الإمارات: <strong>60 يوماً</strong> (45 بأجر كامل + 15 بنصف أجر)<br>قطر: <strong>50 يوماً</strong><br>عُمان: <strong>98 يوماً</strong> (14 أسبوعاً)',
  assumptions: [
    'تُطبق المدة الإجمالية للإجازة كما هي منصوص عليها في قانون كل بلد.',
    'لا تُحتسب هنا تفاصيل الأجر (كامل/نصف/بدون أجر) أو التمديدات الخاصة بظروف معينة.',
    'قد تتطلب بعض الدول الحصول على الإجازة بدعم من جهة العمل وشهادة طبية.',
    'الأحكام التفصيلية (متى يمكن البدء، شروط التمديد) تختلف بين الدول.',
  ],
  whenUseful:
    'مفيد لمعرفة الحقوق القانونية لمدة إجازة الأمومة عند التخطيط للولادة أو عند مراجعة سياسات الشركة.',
  mistakes: [
    'الاعتماد على مدة عامة دون التحقق من قانون البلد.',
    'تجاهل أن بعض الدول تقسم الإجازة بين أجر كامل وأجر مخفض.',
    'الخلط بين إجازة الأمومة وإجازة الأبوة أو إجازة رعاية الطفل.',
    'عدم مراعاة شروط التمديد في الحالات الخاصة.',
  ],
  faqs: [
    {
      q: 'هل تُمنح الإجازة بأجر كامل؟',
      a: 'يختلف الأمر حسب البلد. بعض الدول تمنح كامل المدة بأجر كامل، وأخرى تمنح جزءاً بأجر كامل وجزءاً بنصف أجر (مثل الإمارات 45+15). تحقق من تفاصيل الأجر في قانون بلدك.',
    },
    {
      q: 'هل يمكن التمديد؟',
      a: 'بعض القوانين تتيح تمديداً غير مدفوع الأجر أو بشروط طبية، والبعض الآخر يسمح بإضافتها إلى إجازة أخرى. راجع النص القانوني لحالتك.',
    },
    {
      q: 'هل تشمل إجازة الأمومة إجازة الأبوة؟',
      a: 'لا، إجازة الأبوة حق منفصل يمنح للأب بموجب أحكام مستقلة في معظم الدول.',
    },
  ],
  methodologyNote:
    'تُستخرج المدد من قوانين العمل لكل بلد في قاعدة بيانات قوانين العمل مع المصادر: الأردن 90 يوماً (المادة 70)، السعودية 84 يوماً، الكويت 70 يوماً، الإمارات 60 يوماً (45+15)، قطر 50 يوماً، البحرين 60 يوماً، عُمان 98 يوماً (14 أسبوعاً).',
  disclaimerNote:
    'هذه النتيجة تقديرية لأغراض إعلامية فقط ولا تُعد مشورة قانونية. تحقق من النص الرسمي المعمول به في بلدك.',
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
    ariaResult: 'نتائج حاسبة إجازة الأمومة',
  },
  guideTitle: 'دليل: حساب إجازة الأمومة',
  relatedTitle: 'حاسبات ذات صلة',
};

const en: CalcContent = {
  locale: 'en',
  slug: 'maternity-leave',
  title: 'Maternity leave calculator',
  metaDescription:
    'Find the statutory maternity leave in your country, in days and weeks, under the applicable labour law.',
  h1: 'Maternity leave calculator',
  intro:
    'Select the country to see the maternity leave granted by law, in days and weeks. The total duration is shown; note that some countries split it into a fully paid part and a half-paid part.',
  fields: {
    country: {
      label: 'Country',
      hint: 'Select the country to apply its statutory maternity leave.',
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
  },
  errorMessages: {
    required: 'This field is required.',
    invalid: 'Enter a valid value.',
    min: 'The value is below the allowed minimum.',
    max: 'The value exceeds the allowed maximum.',
    __generic: 'Please review the highlighted fields and try again.',
  },
  results: {
    maternityDays: {
      label: 'Leave length (days)',
      hint: 'The total maternity leave in days.',
      hero: true,
    },
    maternityWeeks: {
      label: 'Leave length (weeks)',
      hint: 'The leave length rounded to weeks.',
    },
  },
  resultTitle: 'Results',
  formula:
    'The maternity leave is taken directly from each country\u2019s law. Some countries pay part in full and part at half pay (e.g. UAE: 45 days full pay then 15 days at half pay).',
  exampleHtml:
    'Jordan: <strong>90 days</strong><br>Saudi Arabia: <strong>84 days</strong> (12 weeks)<br>Kuwait: <strong>70 days</strong><br>UAE: <strong>60 days</strong> (45 full + 15 half pay)<br>Qatar: <strong>50 days</strong><br>Oman: <strong>98 days</strong> (14 weeks)',
  assumptions: [
    'The total leave length as set by each country\u2019s law is applied.',
    'Pay details (full/half/none) and extensions for special circumstances are not computed here.',
    'Some countries require employer support and a medical certificate to take the leave.',
    'Detailed rules (when the leave can start, extension conditions) vary by country.',
  ],
  whenUseful:
    'Useful for knowing the statutory maternity leave rights when planning a birth or reviewing company policy.',
  mistakes: [
    'Relying on a general duration without checking the country\u2019s law.',
    'Ignoring that some countries split the leave into full- and reduced-pay parts.',
    'Confusing maternity leave with paternity leave or childcare leave.',
    'Overlooking extension conditions in special cases.',
  ],
  faqs: [
    {
      q: 'Is the leave fully paid?',
      a: 'It depends on the country. Some pay the full period, others pay part in full and part at half pay (e.g. UAE 45+15). Check the pay rules in your country\u2019s law.',
    },
    {
      q: 'Can the leave be extended?',
      a: 'Some laws allow an unpaid extension or one on medical grounds, and others let it be added to another leave. Review the applicable text for your case.',
    },
    {
      q: 'Does this include paternity leave?',
      a: 'No. Paternity leave is a separate right granted to the father under independent provisions in most countries.',
    },
  ],
  methodologyNote:
    'Durations come from each country\u2019s labour law in the rules database with sources: Jordan 90 days (Art. 70), Saudi Arabia 84 days, Kuwait 70 days, UAE 60 days (45+15), Qatar 50 days, Bahrain 60 days, Oman 98 days (14 weeks).',
  disclaimerNote:
    'This result is an estimate for information purposes only and is not legal advice. Verify the official text in force in your country.',
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
    ariaResult: 'Maternity leave calculator results',
  },
  guideTitle: 'Guide: calculating maternity leave',
  relatedTitle: 'Related calculators',
};

export default { ar, en } as Record<Locale, CalcContent>;
