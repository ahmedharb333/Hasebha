import type { CalcContent } from '../../lib/calculators/types';
import type { Locale } from '../../config/site';

const ar: CalcContent = {
  locale: 'ar',
  slug: 'notice-period',
  title: 'حاسبة فترة الإشعار',
  metaDescription:
    'اعرف فترة الإشعار الواجبة عند إنهاء عقد العمل حسب قانون البلد والمدة المنقضية في الخدمة.',
  h1: 'حاسبة فترة الإشعار',
  intro:
    'اختر البلد وأدخل عدد سنوات الخدمة لمعرفة فترة الإشعار التي يجب على الموظف أو صاحب العمل الالتزام بها قبل إنهاء عقد العمل.',
  fields: {
    country: {
      label: 'البلد',
      hint: 'اختر البلد لتطبيق قانون العمل الخاص بفترة الإشعار.',
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
    tenureYears: {
      label: 'مدة الخدمة (بالسنوات)',
      hint: 'عدد السنوات التي قضاها الموظف في الخدمة.',
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
    noticeDays: {
      label: 'فترة الإشعار (أيام)',
      hint: 'عدد أيام الإشعار المطلوبة قبل إنهاء العقد.',
      hero: true,
    },
    noticeMonths: {
      label: 'فترة الإشعار (شهور)',
      hint: 'فترة الإشعار مقرّبة إلى شهور.',
    },
  },
  resultTitle: 'النتائج',
  formula:
    'تُستخرج فترة الإشعار من جدول الشرائح المعتمد في قانون كل بلد حسب مدة الخدمة. فإذا لم تكن مدة الخدمة مشمولة بشرائح في بعض الدول، تُطبق المدة الثابتة المنصوص عليها في القانون.',
  exampleHtml:
    'السعودية (عقد غير محدد المدة، راتب شهري): فترة إشعار الموظف <strong>30 يوماً</strong> وفترة صاحب العمل <strong>60 يوماً</strong>.<br>الكويت: <strong>90 يوماً</strong> للعامل الشهري في العقد غير المحدد.<br>الأردن: <strong>30 يوماً</strong>.',
  assumptions: [
    'تُطبق فترات الإشعار الواردة في قوانين العمل المسجلة لكل بلد.',
    'قد تختلف الفترة حسب نوع العقد (محدد/غير محدد المدة) وطريقة الدفع (شهري/غير شهري).',
    'الحاسبة تعرض الجانب الأعم الأصلي؛ تحقق من نص القانون لحالتك الخاصة.',
    'يمكن الاتفاق على تعويض مالي بدل الإشعار إذا نص القانون عليه.',
  ],
  whenUseful:
    'مفيد عند التخطيط للاستقالة أو عند إصدار إشعار إنهاء خدمة للموظف، لمعرفة المدة القانونية الواجب الالتزام بها قبل نهاية الخدمة.',
  mistakes: [
    'تجاهل أن فترة الإشعار قد تختلف بين الموظف وصاحب العمل.',
    'الخلط بين العقد المحدد وغير المحدد المدة.',
    'افتراض مدة إشعار موحدة في كل الدول.',
    'عدم مراعاة أن بعض القوانين تسمح بالتعويض النقدي بدل الإشعار.',
  ],
  faqs: [
    {
      q: 'ما فترة الإشعار في السعودية؟',
      a: 'للموظف ذي الراتب الشهري في العقد غير المحدد 30 يوماً، ولصاحب العمل 60 يوماً، بعد تعديلات عام 2025. الحاسبة تعرض 30 يوماً لأنها تتبع جانب الموظف افتراضياً.',
    },
    {
      q: 'هل يمكن دفع تعويض بدل الإشعار؟',
      a: 'نعم، غالباً يسمح القانون للطرفين بالاتفاق على تعويض مالي بدل تنفيذ الإشعار، بمقدار أجر فترة الإشعار كاملة.',
    },
    {
      q: 'هل تختلف الفترة في العقد محدد المدة؟',
      a: 'نعم. قوانين بعض الدول تنص على مدة مختلفة أو تُنهي العقد محدد المدة بانتهاء مدته أو بالاتفاق، لذا تحقق من البند الخاص بنوع عقدك.',
    },
  ],
  methodologyNote:
    'تعتمد الحاسبة على فترات الإشعار المنصوص عليها في قوانين العمل لكل بلد من قاعدة بيانات قوانين العمل، مع اسم المصدر وتاريخ النفاذ. المصادر: السعودية المادة 75 من قانون العمل (تعديل 2025)، الكويت المادة 44 من القانون رقم 6 لسنة 2010، الأردن المادة 23 من قانون العمل رقم 8 لسنة 1996.',
  disclaimerNote:
    'هذه النتيجة تقديرية لأغراض إعلامية فقط ولا تُعد مشورة قانونية. تحقق من نص القانون المطبق على نوع عقدك وحالتك.',
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
    ariaResult: 'نتائج حاسبة فترة الإشعار',
  },
  guideTitle: 'دليل: حساب فترة الإشعار',
  relatedTitle: 'حاسبات ذات صلة',
};

const en: CalcContent = {
  locale: 'en',
  slug: 'notice-period',
  title: 'Notice period calculator',
  metaDescription:
    'Find the notice period required to end an employment contract under your country\u2019s labour law and length of service.',
  h1: 'Notice period calculator',
  intro:
    'Select the country and enter the years of service to find the notice period that the employee or employer must give before ending the employment contract.',
  fields: {
    country: {
      label: 'Country',
      hint: 'Select the country to apply its labour-law notice period.',
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
    tenureYears: {
      label: 'Years of service',
      hint: 'How many years the employee has been in service.',
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
    noticeDays: {
      label: 'Notice period (days)',
      hint: 'The days of notice required before the contract ends.',
      hero: true,
    },
    noticeMonths: {
      label: 'Notice period (months)',
      hint: 'The notice period rounded to months.',
    },
  },
  resultTitle: 'Results',
  formula:
    'The notice period is taken from the band table in each country\u2019s law by years of service. Where the law sets a single fixed period regardless of service, that period is applied.',
  exampleHtml:
    'Saudi Arabia (unlimited contract, monthly-paid): <strong>30 days</strong> notice by the worker, <strong>60 days</strong> by the employer.<br>Kuwait: <strong>90 days</strong> for monthly-paid workers on unlimited contracts.<br>Jordan: <strong>30 days</strong>.',
  assumptions: [
    'The notice periods stored for each country\u2019s labour law are applied.',
    'The period may differ by contract type (fixed/unlimited term) and pay basis (monthly or not).',
    'The calculator shows the most common side; check the exact wording of the law for your case.',
    'Where the law allows, the parties may agree payment in lieu of notice.',
  ],
  whenUseful:
    'Useful when planning a resignation or serving a termination notice, to know the statutory period to observe before the employment ends.',
  mistakes: [
    'Ignoring that the notice period may differ between the employee and the employer.',
    'Confusing fixed-term with unlimited-term contracts.',
    'Assuming a uniform notice period across countries.',
    'Overlooking that some laws allow payment in lieu of notice.',
  ],
  faqs: [
    {
      q: 'What is the notice period in Saudi Arabia?',
      a: 'For a monthly-paid employee on an unlimited contract it is 30 days by the worker and 60 days by the employer after the 2025 amendments. The calculator shows 30 days because it follows the worker\u2019s side by default.',
    },
    {
      q: 'Can I pay in lieu of notice?',
      a: 'Yes. Most laws let either party pay compensation equal to the full notice-period pay instead of serving the notice.',
    },
    {
      q: 'Does it differ on a fixed-term contract?',
      a: 'Yes. Some laws set a different period for fixed-term contracts or end them at term/agreement, so check the clause for your contract type.',
    },
  ],
  methodologyNote:
    'The calculator uses the notice periods set by each country\u2019s labour law from the rules database, with the source name and effective date. Sources: Saudi Arabia Art. 75 of the Labour Law (2025 amendment), Kuwait Art. 44 of Law No. 6 of 2010, Jordan Art. 23 of Labour Law No. 8 of 1996.',
  disclaimerNote:
    'This result is an estimate for information purposes only and is not legal advice. Verify the exact law that applies to your contract type and situation.',
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
    ariaResult: 'Notice period calculator results',
  },
  guideTitle: 'Guide: calculating the notice period',
  relatedTitle: 'Related calculators',
};

export default { ar, en } as Record<Locale, CalcContent>;
