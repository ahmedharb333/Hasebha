import type { CalcContent } from '../../lib/calculators/types';
import type { Locale } from '../../config/site';

const ar: CalcContent = {
  locale: 'ar',
  slug: 'income-tax',
  title: 'حاسبة ضريبة الدخل',
  metaDescription:
    'احسب ضريبة الدخل على الأجور باستخدام شرائح الضريبة والإعفاء الشخصي في بلدك، مع المعدل الفعلي والدخل الخاضع للضريبة.',
  h1: 'حاسبة ضريبة الدخل',
  intro:
    'أدخل دخلك السنوي واختر البلد لمعرفة ضريبة الدخل المستحقة وفق الشرائح الضريبية والإعفاء الشخصي، مع المعدل الفعلي والدخل الخاضع للضريبة.',
  fields: {
    country: {
      label: 'البلد',
      hint: 'اختر البلد لتطبيق شرائح ضريبة الدخل والإعفاء الشخصي الخاصة به.',
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
    annualIncome: {
      label: 'الدخل السنوي',
      hint: 'إجمالي الدخل السنوي قبل خصم الإعفاء الشخصي.',
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
    taxAmount: {
      label: 'ضريبة الدخل السنوية',
      hint: 'إجمالي ضريبة الدخل المستحقة على دخلك السنوي.',
      hero: true,
    },
    effectiveRate: {
      label: 'المعدل الفعلي للضريبة',
      hint: 'الضريبة كنسبة مئوية من إجمالي الدخل.',
    },
    taxableIncome: {
      label: 'الدخل الخاضع للضريبة',
      hint: 'الدخل بعد خصم الإعفاء الشخصي.',
    },
  },
  resultTitle: 'النتائج',
  formula:
    'الدخل الخاضع للضريبة = الدخل السنوي − الإعفاء الشخصي. تُحسب الضريبة بتطبيق كل شريحة على الجزء الذي يقع ضمنها، ثم يُستخرج المعدل الفعلي بقسمة الضريبة على إجمالي الدخل.',
  exampleHtml:
    'الأردن: دخل سنوي <strong>15,000 دينار</strong><br>الدخل الخاضع = 15,000 − 9,000 = <strong>6,000</strong> دينار<br>الضريبة = 5,000×5% + 1,000×10% = <strong>350</strong> ديناراً<br>المعدل الفعلي ≈ <strong>2.3%</strong>',
  assumptions: [
    'تُطبق شرائح ضريبة الدخل والإعفاء الشخصي من قاعدة بيانات كل بلد.',
    'يفترض الأردن إعفاءً شخصياً سنوياً قدره 9,000 دينار وشرائح من 5% إلى 30%.',
    'بعض الدول لا تفرض ضريبة على دخل الأجور فتُظهر النتيجة صفراً.',
    'لا تشمل الضريبة الاقتطاعات الأخرى أو الحوافز التي قد تُضاف للدخل.',
  ],
  whenUseful:
    'مفيد عند تقدير التزامك الضريبي السنوي، أو عند مقارنة عروض العمل، أو عند التخطيط المالي الشخصي.',
  mistakes: [
    'تطبيق الشريحة الأولى على كامل الدخل بدلاً من كل جزء ضمن شريحته.',
    'نسيان خصم الإعفاء الشخصي قبل تطبيق الشرائح.',
    'الخلط بين المعدل الهامشي والمعدل الفعلي.',
    'افتراض أن كل الدول تفرض ضريبة دخل على الأجور.',
  ],
  faqs: [
    {
      q: 'كيف تُطبق الشرائح الضريبية؟',
      a: 'كل جزء من دخلك يُدفع عليه الضريبة المنصوص عليها في الشريحة التي يقع ضمنها، فالدخل الأعلى لا يُفرض عليه معدل شريحة واحدة.',
    },
    {
      q: 'ما الفرق بين المعدل الهامشي والفعلي؟',
      a: 'المعدل الهامشي هو النسبة المطبقة على أعلى جزء من دخلك، أما المعدل الفعلي فهو الضريبة الكلية مقسومة على إجمالي دخلك.',
    },
    {
      q: 'لماذا تظهر النتيجة صفراً في بعض الدول؟',
      a: 'بعض الدول (مثل السعودية والإمارات والكويت) لا تفرض ضريبة على دخل الأجور، لذلك تكون الضريبة صفراً بغض النظر عن الدخل.',
    },
  ],
  methodologyNote:
    'تعتمد الحاسبة على شرائح ضريبة الدخل والإعفاء الشخصي من قاعدة بيانات قوانين العمل. مثال الأردن: شرائح من 5% إلى 30% مع إعفاء شخصي 9,000 دينار سنوياً (قانون ضريبة الدخل رقم 34 لسنة 2014 المعدل بالقانون رقم 38 لسنة 2018).',
  disclaimerNote:
    'هذه النتيجة تقديرية لأغراض إعلامية فقط ولا تُعد مشورة ضريبية أو قانونية. تحقق من الشرائح والإعفاءات المطبقة لدى السلطة الضريبية المختصة.',
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
    ariaResult: 'نتائج حاسبة ضريبة الدخل',
  },
  guideTitle: 'دليل: حساب ضريبة الدخل',
  relatedTitle: 'حاسبات ذات صلة',
};

const en: CalcContent = {
  locale: 'en',
  slug: 'income-tax',
  title: 'Income tax calculator',
  metaDescription:
    'Calculate income tax on wages using your country\u2019s tax brackets and personal allowance, with the effective rate and taxable income.',
  h1: 'Income tax calculator',
  intro:
    'Enter your annual income and select the country to see the income tax due under its brackets and personal allowance, along with the effective rate and taxable income.',
  fields: {
    country: {
      label: 'Country',
      hint: 'Select the country to apply its income-tax brackets and personal allowance.',
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
    annualIncome: {
      label: 'Annual income',
      hint: 'Total annual income before the personal allowance.',
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
    taxAmount: {
      label: 'Annual income tax',
      hint: 'The total income tax due on your annual income.',
      hero: true,
    },
    effectiveRate: {
      label: 'Effective tax rate',
      hint: 'The tax as a percentage of total income.',
    },
    taxableIncome: {
      label: 'Taxable income',
      hint: 'The income after the personal allowance.',
    },
  },
  resultTitle: 'Results',
  formula:
    'Taxable income = annual income − personal allowance. Each bracket is applied to the slice of income that falls within it; the effective rate is the total tax divided by the total income.',
  exampleHtml:
    'Jordan: annual income <strong>15,000 JOD</strong><br>Taxable = 15,000 − 9,000 = <strong>6,000</strong> JOD<br>Tax = 5,000×5% + 1,000×10% = <strong>350</strong> JOD<br>Effective rate ≈ <strong>2.3%</strong>',
  assumptions: [
    'The tax brackets and personal allowance from each country\u2019s rules database are applied.',
    'Jordan is assumed to have a 9,000 JOD annual personal allowance and 5%–30% brackets.',
    'Some countries do not tax employment income, so the result is zero.',
    'Other deductions or income add-ons are not included.',
  ],
  whenUseful:
    'Useful for estimating your annual tax liability, comparing job offers, or personal financial planning.',
  mistakes: [
    'Applying the first bracket rate to the whole income instead of each slice within its bracket.',
    'Forgetting to subtract the personal allowance before applying the brackets.',
    'Confusing the marginal rate with the effective rate.',
    'Assuming every country taxes employment income.',
  ],
  faqs: [
    {
      q: 'How are the tax brackets applied?',
      a: 'Each slice of your income is taxed at the rate of the bracket it falls into, so a higher income is not taxed at a single flat bracket rate.',
    },
    {
      q: 'What is the difference between marginal and effective rates?',
      a: 'The marginal rate applies to the highest slice of your income; the effective rate is the total tax divided by your total income.',
    },
    {
      q: 'Why is the result zero in some countries?',
      a: 'Some countries (e.g. Saudi Arabia, the UAE and Kuwait) do not tax employment income, so the tax is zero regardless of income.',
    },
  ],
  methodologyNote:
    'The calculator uses the income-tax brackets and personal allowance from the labour-law rules database. Jordan example: 5%–30% brackets with a 9,000 JOD annual personal allowance (Income Tax Law No. 34 of 2014 as amended by Law No. 38 of 2018).',
  disclaimerNote:
    'This result is an estimate for information purposes only and is not tax or legal advice. Verify the applicable brackets and allowances with the relevant tax authority.',
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
    ariaResult: 'Income tax calculator results',
  },
  guideTitle: 'Guide: calculating income tax',
  relatedTitle: 'Related calculators',
};

export default { ar, en } as Record<Locale, CalcContent>;
