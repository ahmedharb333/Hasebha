import type { CalcContent } from '../../lib/calculators/types';
import type { Locale } from '../../config/site';

const content: Record<Locale, CalcContent> = {
  ar: {
    locale: 'ar',
    slug: 'compound-interest',
    title: 'حاسبة الفائدة المركبة',
    metaDescription:
      'احسب نمو استثمارك مع الفائدة المركبة والمساهمات الدورية، مع جدول يوضح تطور الرصيد والعائد سنة بسنة.',
    h1: 'حاسبة الفائدة المركبة',
    intro:
      'الفائدة المركبة هي الفائدة التي تُحتسب على رصيدك المتزايد، أي على أصل المبلغ والفوائد السابقة معاً، ما يجعل أموالك تنمو بشكل أسرع مع مرور الوقت. أدخل المبلغ الأولي والمساهمات الدورية وسعر الفائدة وتكرار المضاعفة لترى كيف ينمو استثمارك خلال سنوات.',
    fields: {
      initial: {
        label: 'المبلغ الأولي',
        hint: 'المبلغ الذي تبدأ به الاستثمار أو الادخار.',
      },
      contribution: {
        label: 'المساهمة الدورية',
        hint: 'المبلغ الذي تضيفه بانتظام وفق التكرار المختار؛ أدخل صفراً إذا لم تكن تخطط لإضافة مبالغ.',
      },
      contributionFrequency: {
        label: 'تكرار المساهمة',
        hint: 'اختر كيف ستدفع مساهماتك: شهرياً أو ربع سنوي أو سنوياً.',
        options: {
          monthly: 'شهرياً',
          quarterly: 'ربع سنوي',
          annually: 'سنوياً',
        },
      },
      annualRate: {
        label: 'سعر الفائدة السنوي (%)',
        hint: 'معدل العائد السنوي المتوقع على الاستثمار.',
      },
      compoundingFrequency: {
        label: 'تكرار المضاعفة',
        hint: 'عدد مرات إضافة الفائدة إلى الرصيد خلال السنة؛ التكرار الأكثر يزيد النمو.',
        options: {
          monthly: 'شهرياً',
          quarterly: 'ربع سنوي',
          semiAnnually: 'نصف سنوي',
          annually: 'سنوياً',
        },
      },
      years: {
        label: 'المدة (سنوات)',
        hint: 'عدد السنوات التي سيستمر فيها الاستثمار.',
      },
      currency: {
        label: 'العملة',
        hint: 'العملة التي سيتم عرض النتائج بها.',
      },
    },
    errorMessages: {
      required: 'هذا الحقل مطلوب.',
      invalid: 'يرجى إدخال قيمة رقمية صحيحة.',
      min: 'القيمة المدخلة أقل من الحد الأدنى المسموح.',
      max: 'القيمة المدخلة أكبر من الحد الأقصى المسموح.',
      __generic: 'تعذّر إتمام الحساب، تحقق من المدخلات.',
    },
    results: {
      finalBalance: {
        label: 'الرصيد النهائي',
        hint: 'قيمة الاستثمار المتوقعة في نهاية المدة.',
        hero: true,
      },
      totalContributions: {
        label: 'إجمالي المساهمات',
        hint: 'مجموع المبلغ الأولي وجميع المساهمات الدورية.',
      },
      totalInterest: {
        label: 'إجمالي الفائدة',
        hint: 'العائد الناتج عن الفائدة المركبة فوق ما أودعته أنت.',
      },
    },
    table: {
      title: 'نمو الاستثمار سنة بسنة',
      caption: 'يُظهر الرصيد وإجمالي المساهمات والعائد في نهاية كل سنة من سنوات الاستثمار.',
      columns: {
        year: 'السنة',
        balance: 'الرصيد',
        contributions: 'المساهمات',
        interest: 'الفائدة',
      },
    },
    resultTitle: 'النتائج',
    formula:
      'يُحسب الرصيد بتراكم الفائدة على الرصيد كل فترة مضاعفة: الرصيد الجديد = الرصيد السابق × (1 + معدل الفترة) + المساهمة الدورية.',
    exampleHtml:
      '<p>مثال بقيم الحاسبة: مبلغ أولي <strong>5,000 دولار</strong> مع مساهمة <strong>200 دولار شهرياً</strong> بسعر فائدة <strong>7% سنوياً</strong> تُضاعف شهرياً لمدة <strong>20 سنة</strong>.<br>الرصيد النهائي ≈ <strong>124,400 دولار</strong>.<br>إجمالي المساهمات <strong>53,000 دولار</strong>، والعائد من الفائدة ≈ <strong>71,400 دولار</strong>.</p>',
    assumptions: [
      'سعر الفائدة السنوي ثابت طوال مدة الاستثمار.',
      'المساهمات تُودع في نهاية كل فترة احتساب.',
      'الفائدة تُضاف إلى الرصيد وتُضاعف وفق التكرار المختار.',
      'لا تُحتسب الضرائب أو الرسوم أو التضخم أو تقلبات السوق.',
      'النتائج تقديرية ولا تضمن عوائد فعلية؛ الأداء السابق لا يعكس المستقبل.',
    ],
    whenUseful:
      'استخدم هذه الحاسبة لتقدير نمو مدخرات التقاعد أو الادخار طويل الأجل، أو لمقارنة سيناريوهات استثمارية مختلفة وفهم أثر الفائدة المركبة على أموالك بمرور الزمن.',
    mistakes: [
      'الخلط بين سعر الفائدة السنوي وتكرار مضاعفة الفائدة خلال السنة.',
      'البدء بحساب المضاعفة على المبلغ الأولي فقط دون المساهمات الدورية.',
      'افتراض أن العائد ثابت، بينما تختلف العوائد الفعلية من عام إلى آخر.',
      'إهمال أثر التضخم على القوة الشرائية للرصيد النهائي.',
      'تجاهل الرسوم والضرائب التي تقلّص العائد الفعلي.',
    ],
    faqs: [
      {
        q: 'ما الفرق بين الفائدة المركبة والفائدة البسيطة؟',
        a: 'الفائدة المركبة تُحتسب على الرصيد المتراكم (أصل المبلغ والفوائد السابقة)، بينما تُحتسب البسيطة على أصل المبلغ فقط، ولهذا ينمو المركّب بشكل أسرع.',
      },
      {
        q: 'هل العوائد مضمونة؟',
        a: 'لا. هذه حاسبة تقديرية تفترض معدلاً ثابتاً، والعوائد الحقيقية تتغير حسب السوق، فلا يُعدّ أي مبلغ نتيجة ضماناً للنتائج المستقبلية.',
      },
      {
        q: 'ماذا يعني تكرار المضاعفة؟',
        a: 'هو عدد مرات احتساب الفائدة وإضافتها إلى الرصيد خلال السنة؛ المضاعفة الشهرية تعطي نمواً أعلى من السنوية بنفس النسبة.',
      },
      {
        q: 'هل يمكن أن تكون المساهمة صفراً؟',
        a: 'نعم، أدخل صفراً في المساهمة الدورية لاحتساب نمو المبلغ الأولي وحده.',
      },
    ],
    methodologyNote:
      'تعتمد الحاسبة على تراكم الفائدة المركبة وتضمين المساهمات الدورية في نهاية كل فترة، مع عرض تطور الرصيد سنوياً. النتائج نظرية لأغراض التخطيط. تختلف القواعد الضريبية والتنظيمية حسب البلد، فتحقق من الجهات المختصة ولا تعتمد على النتائج كضمان للعوائد.',
    disclaimerNote:
      'النتائج تقديرية لأغراض إعلامية فقط ولا تُعد نصيحة استثمارية أو ضماناً لأي عائد مستقبلي.',
    lastReviewed: '2026-08-09',
    currencyDefault: 'USD',
    currencyLabel: 'العملة',
    requiredNote: 'الحقول المطلوبة مشار إليها بعلامة *.',
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
      copySuccess: 'تم نسخ النتيجة.',
      copyFail: 'تعذّر النسخ، حاول مرة أخرى.',
      shareFail: 'تعذّرت المشاركة.',
      ariaResult: 'نتيجة الحساب',
    },
    guideTitle: 'شرح الفائدة المركبة',
    relatedTitle: 'حاسبات ذات صلة',
  },

  en: {
    locale: 'en',
    slug: 'compound-interest',
    title: 'Compound interest calculator',
    metaDescription:
      'Calculate how your investment grows with compound interest and regular contributions, with a year-by-year breakdown of balance and returns.',
    h1: 'Compound interest calculator',
    intro:
      'Compound interest is interest earned on your growing balance \u2014 on both the principal and the interest already earned \u2014 which makes your money grow faster over time. Enter your starting amount, regular contributions, interest rate and compounding frequency to see how your investment grows over the years.',
    fields: {
      initial: {
        label: 'Initial amount',
        hint: 'The amount you start investing or saving with.',
      },
      contribution: {
        label: 'Periodic contribution',
        hint: 'The amount you add regularly at the chosen frequency; enter 0 if you do not plan to add more.',
      },
      contributionFrequency: {
        label: 'Contribution frequency',
        hint: 'Choose how you make your contributions: monthly, quarterly or annually.',
        options: {
          monthly: 'Monthly',
          quarterly: 'Quarterly',
          annually: 'Annually',
        },
      },
      annualRate: {
        label: 'Annual interest rate (%)',
        hint: 'The expected annual return on your investment.',
      },
      compoundingFrequency: {
        label: 'Compounding frequency',
        hint: 'How often interest is added to the balance each year; more frequent compounding increases growth.',
        options: {
          monthly: 'Monthly',
          quarterly: 'Quarterly',
          semiAnnually: 'Semi-annually',
          annually: 'Annually',
        },
      },
      years: {
        label: 'Period (years)',
        hint: 'How many years the investment runs.',
      },
      currency: {
        label: 'Currency',
        hint: 'The currency used to display the results.',
      },
    },
    errorMessages: {
      required: 'This field is required.',
      invalid: 'Please enter a valid number.',
      min: 'The entered value is below the allowed minimum.',
      max: 'The entered value exceeds the allowed maximum.',
      __generic: 'Could not complete the calculation. Please check your inputs.',
    },
    results: {
      finalBalance: {
        label: 'Final balance',
        hint: 'The expected value of the investment at the end of the period.',
        hero: true,
      },
      totalContributions: {
        label: 'Total contributions',
        hint: 'Your initial amount plus all periodic contributions.',
      },
      totalInterest: {
        label: 'Total interest',
        hint: 'The return earned from compounding, on top of what you contributed.',
      },
    },
    table: {
      title: 'Investment growth year by year',
      caption: 'Shows the balance, total contributions and interest at the end of each investment year.',
      columns: {
        year: 'Year',
        balance: 'Balance',
        contributions: 'Contributions',
        interest: 'Interest',
      },
    },
    resultTitle: 'Results',
    formula:
      'The balance compounds every period: new balance = previous balance \u00d7 (1 + period rate) + periodic contribution.',
    exampleHtml:
      '<p>Example using the calculator\u2019s values: an initial <strong>5,000 dollars</strong> with a <strong>200 dollar</strong> monthly contribution at <strong>7% per year</strong>, compounded monthly for <strong>20 years</strong>.<br>The final balance is about <strong>124,400 dollars</strong>.<br>Total contributions are <strong>53,000 dollars</strong>, with about <strong>71,400 dollars</strong> coming from interest.</p>',
    assumptions: [
      'The annual interest rate is fixed for the whole period.',
      'Contributions are made at the end of each compounding period.',
      'Interest is added to the balance and compounded at the chosen frequency.',
      'Taxes, fees, inflation and market fluctuations are not included.',
      'Results are estimates and do not guarantee real returns; past performance is not a guide to future results.',
    ],
    whenUseful:
      'Use this calculator to estimate the growth of retirement savings or long-term savings, compare different investment scenarios, and understand how compounding works on your money over time.',
    mistakes: [
      'Confusing the annual interest rate with how often interest compounds within the year.',
      'Compounding only the initial amount and forgetting the periodic contributions.',
      'Assuming a constant return, while real returns vary from year to year.',
      'Ignoring the effect of inflation on the purchasing power of the final balance.',
      'Overlooking fees and taxes that reduce the real return.',
    ],
    faqs: [
      {
        q: 'What is the difference between compound and simple interest?',
        a: 'Compound interest is earned on the accumulated balance (principal plus previous interest), while simple interest is earned only on the principal, so compounding grows faster.',
      },
      {
        q: 'Are the returns guaranteed?',
        a: 'No. This is an estimating calculator that assumes a fixed rate; real returns vary with the market, and no projected amount guarantees future results.',
      },
      {
        q: 'What does compounding frequency mean?',
        a: 'It is how often interest is calculated and added to the balance each year. Monthly compounding grows faster than annual compounding at the same rate.',
      },
      {
        q: 'Can the contribution be zero?',
        a: 'Yes. Enter 0 as the periodic contribution to see how the initial amount alone grows.',
      },
    ],
    methodologyNote:
      'The calculator compounds interest on the balance and adds periodic contributions at the end of each period, showing the balance year by year. Results are theoretical and for planning. Tax and regulatory rules vary by country, so verify with the relevant authorities and do not treat results as guaranteed returns.',
    disclaimerNote:
      'Results are estimates for informational purposes only and do not constitute investment advice or a guarantee of future returns.',
    lastReviewed: '2026-08-09',
    currencyDefault: 'USD',
    currencyLabel: 'Currency',
    requiredNote: 'Required fields are marked with an asterisk (*).',
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
      copySuccess: 'Result copied.',
      copyFail: 'Could not copy. Please try again.',
      shareFail: 'Could not share.',
      ariaResult: 'Calculation result',
    },
    guideTitle: 'Compound interest explained',
    relatedTitle: 'Related calculators',
  },
};

export default content;
