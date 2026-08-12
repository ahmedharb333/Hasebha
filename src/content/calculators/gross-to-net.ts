import type { CalcContent } from '../../lib/calculators/types';
import type { Locale } from '../../config/site';

const ar: CalcContent = {
  locale: 'ar',
  slug: 'gross-to-net',
  title: 'محوّل الراتب الإجمالي إلى الصافي',
  metaDescription:
    'حوّل الراتب الإجمالي إلى الصافي بعد خصم اشتراكات التأمين الاجتماعي وضريبة الدخل وفق قانون البلد.',
  h1: 'محوّل الراتب الإجمالي إلى الصافي',
  intro:
    'أدخل الراتب الشهري الإجمالي واختر البلد لمعرفة الراتب الصافي بعد خصم اشتراكات التأمين الاجتماعي وضريبة الدخل، مع تفصيل كل خصم على حدة.',
  fields: {
    country: {
      label: 'البلد',
      hint: 'اختر البلد لتطبيق اشتراكات التأمين الاجتماعي وضريبة الدخل الخاصة به.',
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
    monthlyGross: {
      label: 'الراتب الشهري الإجمالي',
      hint: 'الراتب الكامل قبل أي خصومات.',
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
    netMonthly: {
      label: 'الراتب الصافي الشهري',
      hint: 'المبلغ الذي يستلمه الموظف بعد جميع الخصومات.',
      hero: true,
    },
    totalDeductions: {
      label: 'إجمالي الخصومات',
      hint: 'مجموع الاشتراكات والضرائب المخصومة من الراتب الإجمالي.',
    },
    socialInsurance: {
      label: 'اشتراك التأمين الاجتماعي',
      hint: 'حصة الموظف من التأمين الاجتماعي.',
    },
    incomeTax: {
      label: 'ضريبة الدخل',
      hint: 'ضريبة الدخل الشهرية المستقطعة من الراتب.',
    },
  },
  resultTitle: 'النتائج',
  formula:
    'الراتب الصافي = الراتب الإجمالي − اشتراك التأمين الاجتماعي − ضريبة الدخل الشهرية. يُحسب الاشتراك على الراتب بعد تقييده بالسقف الشهري، وتُحسب الضريبة على الدخل السنوي بعد خصم الإعفاء الشخصي باستخدام الشرائح الضريبية.',
  exampleHtml:
    'الأردن: راتب <strong>1,500 دينار</strong><br>اشتراك التأمين = 1,500 × 7.5% = <strong>112.5</strong> دينار<br>الدخل السنوي الخاضع = 18,000 − 9,000 = 9,000 دينار<br>الضريبة السنوية = 5,000×5% + 4,000×10% = <strong>650</strong> دينار (≈ 54.2 شهرياً)<br>الراتب الصافي ≈ <strong>1,333.3</strong> دينار',
  assumptions: [
    'تُطبق اشتراكات التأمين الاجتماعي وشرائح ضريبة الدخل والإعفاء الشخصي من قاعدة بيانات كل بلد.',
    'يفترض الأردن إعفاءً شخصياً سنوياً قدره 9,000 دينار.',
    'لا تشمل الخصومات الأخرى مثل الاقتطاعات النقابية أو قروض الموظفين.',
    'قد تتغير الشرائح والاشتراكات بقرارات رسمية وتُراجع دورياً.',
  ],
  whenUseful:
    'مفيد عند مقارنة عروض العمل، أو عند التخطيط للميزانية الشخصية بناءً على الراتب الصافي الفعلي.',
  mistakes: [
    'اعتبار الراتب الإجمالي هو ما يُستلم فعلياً دون الخصومات.',
    'تجاهل السقف الشهري عند حساب اشتراك التأمين الاجتماعي.',
    'الخلط بين الضريبة الشهرية والسنوية.',
    'نسيان الإعفاء الشخصي قبل تطبيق الشرائح.',
  ],
  faqs: [
    {
      q: 'هل يُخصم التأمين الاجتماعي من الراتب الإجمالي كاملاً؟',
      a: 'لا، يُخصم على الراتب بعد تقييده بالسقف الشهري الذي تحدده الهيئة، فيُحتسب الاشتراك على السقف فقط إذا تجاوزه الراتب.',
    },
    {
      q: 'كيف تُحسب ضريبة الدخل الشهرية؟',
      a: 'تُحسب الضريبة على الدخل السنوي بعد خصم الإعفاء الشخصي باستخدام الشرائح، ثم تقسم على 12 شهراً للحصول على الاستقطاع الشهري.',
    },
    {
      q: 'لماذا لا تظهر ضريبة الدخل في بعض الدول؟',
      a: 'بعض الدول لا تفرض ضريبة على دخل الأجور (مثل السعودية والإمارات)، فيُخصم التأمين الاجتماعي فقط.',
    },
  ],
  methodologyNote:
    'تعتمد الحاسبة على اشتراكات التأمين الاجتماعي وشرائح ضريبة الدخل والإعفاء الشخصي من قاعدة بيانات قوانين العمل. مثال الأردن: الإعفاء الشخصي 9,000 دينار سنوياً وشرائح 5%–30%، واشتراك الموظف 7.5% بسقف 3,733 ديناراً شهرياً.',
  disclaimerNote:
    'هذه النتيجة تقديرية لأغراض إعلامية فقط ولا تُعد مشورة ضريبية أو قانونية. تحقق من الشرائح والاشتراكات المطبقة لدى الجهات المختصة.',
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
    ariaResult: 'نتائج محوّل الراتب الإجمالي إلى الصافي',
  },
  guideTitle: 'دليل: التحويل من الراتب الإجمالي إلى الصافي',
  relatedTitle: 'حاسبات ذات صلة',
};

const en: CalcContent = {
  locale: 'en',
  slug: 'gross-to-net',
  title: 'Gross-to-net salary converter',
  metaDescription:
    'Convert gross salary to net after social-insurance contributions and income tax under your country\u2019s law.',
  h1: 'Gross-to-net salary converter',
  intro:
    'Enter the monthly gross salary and select the country to see the net salary after social-insurance contributions and income tax, with each deduction itemized.',
  fields: {
    country: {
      label: 'Country',
      hint: 'Select the country to apply its social-insurance and income-tax rules.',
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
    monthlyGross: {
      label: 'Monthly gross salary',
      hint: 'The full salary before any deductions.',
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
    netMonthly: {
      label: 'Monthly net salary',
      hint: 'The amount the employee receives after all deductions.',
      hero: true,
    },
    totalDeductions: {
      label: 'Total deductions',
      hint: 'The sum of contributions and taxes deducted from the gross salary.',
    },
    socialInsurance: {
      label: 'Social insurance contribution',
      hint: 'The employee share of social insurance.',
    },
    incomeTax: {
      label: 'Income tax',
      hint: 'The monthly income tax withheld from the salary.',
    },
  },
  resultTitle: 'Results',
  formula:
    'Net salary = gross salary − social insurance − monthly income tax. The contribution is based on the capped salary, and tax is computed on the annual income after the personal allowance using the tax brackets.',
  exampleHtml:
    'Jordan: salary <strong>1,500 JOD</strong><br>Social insurance = 1,500 × 7.5% = <strong>112.5</strong> JOD<br>Taxable annual income = 18,000 − 9,000 = 9,000 JOD<br>Annual tax = 5,000×5% + 4,000×10% = <strong>650</strong> JOD (≈ 54.2 monthly)<br>Net ≈ <strong>1,333.3</strong> JOD',
  assumptions: [
    'The social-insurance contributions, tax brackets and personal allowance from each country\u2019s rules database are applied.',
    'Jordan is assumed to have an annual personal allowance of 9,000 JOD.',
    'Other deductions such as union fees or employee loans are not included.',
    'Rates and brackets may change through official decisions and are reviewed periodically.',
  ],
  whenUseful:
    'Useful when comparing job offers or planning a personal budget around the actual net salary.',
  mistakes: [
    'Treating the gross salary as the take-home amount without deductions.',
    'Ignoring the monthly cap when computing the social-insurance contribution.',
    'Confusing monthly and annual tax.',
    'Forgetting the personal allowance before applying the brackets.',
  ],
  faqs: [
    {
      q: 'Is social insurance deducted from the full gross salary?',
      a: 'No. It is based on the salary capped at the monthly ceiling set by the authority, so the contribution is computed on the cap if the salary exceeds it.',
    },
    {
      q: 'How is the monthly income tax computed?',
      a: 'The tax is computed on the annual income after the personal allowance using the brackets, then divided by 12 months to get the monthly withholding.',
    },
    {
      q: 'Why is income tax missing for some countries?',
      a: 'Some countries do not tax employment income (e.g. Saudi Arabia and the UAE), so only the social-insurance contribution is deducted.',
    },
  ],
  methodologyNote:
    'The calculator uses the social-insurance contributions, income-tax brackets and personal allowance from the labour-law rules database. Jordan example: 9,000 JOD annual personal allowance and 5%–30% brackets, with a 7.5% employee contribution capped at 3,733 JOD monthly.',
  disclaimerNote:
    'This result is an estimate for information purposes only and is not tax or legal advice. Verify the applicable brackets and contributions with the relevant authorities.',
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
    ariaResult: 'Gross-to-net salary converter results',
  },
  guideTitle: 'Guide: converting gross to net salary',
  relatedTitle: 'Related calculators',
};

export default { ar, en } as Record<Locale, CalcContent>;
