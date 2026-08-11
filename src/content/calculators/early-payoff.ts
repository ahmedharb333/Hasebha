import type { CalcContent } from '../../lib/calculators/types';
import type { Locale } from '../../config/site';

const content: Record<Locale, CalcContent> = {
  ar: {
    locale: 'ar',
    slug: 'early-payoff',
    title: 'حاسبة السداد المبكر',
    metaDescription:
      'اعرف كم توفر من الفائدة والوقت عند سداد قرضك بدفعات شهرية إضافية، مع تاريخ سداد جديد وجدول سنوي.',
    h1: 'حاسبة السداد المبكر',
    intro:
      'الدفعات الإضافية على قرضك، مهما بدت صغيرة، تختصر المدة وتوفر فائدة قد تفاجئك. تدخل هذه الحاسبة مبلغ قرضك وسعر الفائدة ومدة السداد الأساسية، ثم المبلغ الإضافي الذي تنوي دفعه شهرياً، لتعرف مدة السداد الجديدة والفائدة الموفرة، مع جدول سنوي يوضح مسار السداد.',
    fields: {
      principal: {
        label: 'مبلغ القرض',
        hint: 'المبلغ المتبقي من القرض الذي تنوي سداده مبكراً.',
      },
      annualRate: {
        label: 'سعر الفائدة السنوي (%)',
        hint: 'نسبة الفائدة السنوية على القرض.',
      },
      term: {
        label: 'مدة القرض',
        hint: 'مدة السداد الأساسية المتبقية بالأشهر أو السنوات حسب الوحدة المختارة.',
      },
      termUnit: {
        label: 'وحدة المدة',
        hint: 'اختر ما إذا كانت المدة المدخلة بالأشهر أو بالسنوات.',
        options: {
          months: 'أشهر',
          years: 'سنوات',
        },
      },
      extraMonthly: {
        label: 'دفعة إضافية شهرياً',
        hint: 'المبلغ الإضافي الذي تدفعه شهرياً فوق القسط الأساسي (اختياري).',
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
      baselinePayment: {
        label: 'القسط الشهري الأساسي',
        hint: 'القسط الشهري دون أي دفعة إضافية.',
        hero: true,
      },
      baselineMonths: {
        label: 'مدة السداد الأساسية (شهر)',
        hint: 'عدد الأشهر اللازمة لسداد القرض بالقسط الأساسي وحده.',
      },
      newMonths: {
        label: 'مدة السداد الجديدة (شهر)',
        hint: 'عدد الأشهر مع الدفعة الإضافية الشهرية.',
      },
      interestSaved: {
        label: 'الفائدة الموفرة',
        hint: 'الفرق بين إجمالي الفائدة في المسار الأساسي وبينها مع الدفعات الإضافية.',
      },
    },
    table: {
      title: 'جدول السداد السنوي',
      caption:
        'ملخص سنوي لمسار السداد مع الدفعات الإضافية، بقيم تقريبية قد تختلف قليلاً عن كشف المُقرِض.',
      columns: {
        year: 'السنة',
        totalPaidYear: 'المدفوع في السنة',
        principalYear: 'أصل الدين',
        interestYear: 'الفائدة',
        balance: 'الرصيد المتبقي',
      },
    },
    resultTitle: 'النتائج',
    formula:
      'يُحسب القسط الأساسي بمعادلة القسط الثابت، ثم تُحاكى عملية السداد شهراً بشهر: تُضاف الدفعة الإضافية إلى القسط، وتذهب حصة الفائدة أولاً والباقي لأصل الدين، حتى يسدد الرصيد بالكامل.',
    exampleHtml:
      '<p>مثال بقيم الحاسبة: قرض بقيمة <strong>20,000 دينار أردني</strong> بسعر فائدة <strong>6% سنوياً</strong> ولمدة <strong>5 سنوات</strong>.<br>دفعة إضافية شهرية <strong>100 دينار</strong>.<br>القسط الشهري الأساسي ≈ <strong>386.66 دينار</strong> ومدة السداد الأساسية <strong>60 شهراً</strong>.<br>مدة السداد الجديدة ≈ <strong>54 شهراً</strong> مع وفرة في الفائدة تزيد على <strong>500 دينار</strong>.</p>',
    assumptions: [
      'سعر الفائدة ثابت طوال مدة القرض.',
      'الدفعة الإضافية ثابتة وتُدفع كل شهر مع القسط الأساسي.',
      'تُخصم الدفعة الإضافية من أصل الدين بعد احتساب الفائدة الشهرية.',
      'لا تُحتسب رسوم السداد المبكر إن كانت لدى المُقرِض.',
      'النتائج تقديرية لأغراض التخطيط العامة.',
    ],
    whenUseful:
      'استخدم هذه الحاسبة عندما يتوفر لديك مبلغ شهري إضافي تريد توجيهه لتسريع سداد قرضك، لتعرف كم تقصر المدة وكم توفر من الفائدة قبل الالتزام.',
    mistakes: [
      'الاعتقاد أن الدفعات الإضافية الصغيرة لا تنفع: فحتى مبلغ بسيط شهرياً يختصر المدة ويوفر فائدة.',
      'نسيان أن قيمة الوفورات تعتمد على الفترة المتبقية من القرض وسعر الفائدة.',
      'افتراض أن الدفعة الإضافية تذهب كاملة للفائدة: فهي تذهب لأصل الدين بعد الفائدة الشهرية.',
      'إهمال رسوم السداد المبكر التي قد يفرضها بعض المُقرِضين.',
    ],
    faqs: [
      {
        q: 'هل تذهب الدفعة الإضافية كاملة إلى أصل الدين؟',
        a: 'تُدفع الفائدة الشهرية أولاً من القسط الإجمالي (الأساسي + الإضافي)، ثم يذهب الباقي إلى أصل الدين، وهو ما يسرّع السداد.',
      },
      {
        q: 'ماذا لو دفعت مبلغاً إضافياً مرة واحدة فقط؟',
        a: 'تظل الدفعات الإضافية في هذه الحاسبة شهرية ثابتة. لدفعة واحدة، استخدم التقدير نفسه بالنظر إلى الأثر الأصغر على المدة والفائدة.',
      },
      {
        q: 'هل تنفع على قرض بدون فائدة؟',
        a: 'لن توفر فائدة لأن أصل الدين فقط هو المطلوب سداده، لكن مدة السداد ستقصر بمقدار الدفعات الإضافية.',
      },
    ],
    methodologyNote:
      'تحاكي الحاسبة السداد شهراً بشهر: الفائدة تُحتسب على الرصيد المتبقي، والدفعة الإضافية تخفض أصل الدين. النتائج تقريبية وقد تختلف عن كشف المُقرِض بسبب رسوم السداد المبكر أو تغير سعر الفائدة.',
    disclaimerNote:
      'النتائج تقديرية لأغراض إعلامية ولا تُعد نصيحة مالية أو عرضاً تمويلياً من أي جهة.',
    lastReviewed: '2026-08-10',
    currencyDefault: 'JOD',
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
    guideTitle: 'دليل السداد المبكر للقروض',
    relatedTitle: 'حاسبات ذات صلة',
  },

  en: {
    locale: 'en',
    slug: 'early-payoff',
    title: 'Early payoff calculator',
    metaDescription:
      'See how much interest and time extra monthly payments save on your loan, with a new payoff date and an annual schedule.',
    h1: 'Early payoff calculator',
    intro:
      'Extra payments on your loan — however small they seem — shorten the term and save interest you may not expect. Enter your loan amount, interest rate and remaining term, then the extra amount you plan to pay each month, to see your new payoff period and the interest saved, with an annual schedule tracking the payoff path.',
    fields: {
      principal: {
        label: 'Loan amount',
        hint: 'The remaining loan balance you plan to pay off early.',
      },
      annualRate: {
        label: 'Annual interest rate (%)',
        hint: 'The annual interest rate on the loan.',
      },
      term: {
        label: 'Loan term',
        hint: 'The remaining base term, in months or years depending on the chosen unit.',
      },
      termUnit: {
        label: 'Term unit',
        hint: 'Choose whether the term is measured in months or years.',
        options: {
          months: 'Months',
          years: 'Years',
        },
      },
      extraMonthly: {
        label: 'Extra monthly payment',
        hint: 'The extra amount you pay each month on top of the base payment (optional).',
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
      baselinePayment: {
        label: 'Baseline payment',
        hint: 'The monthly payment with no extra amount.',
        hero: true,
      },
      baselineMonths: {
        label: 'Baseline payoff (months)',
        hint: 'How many months the loan takes with the base payment alone.',
      },
      newMonths: {
        label: 'New payoff (months)',
        hint: 'How many months the loan takes with the extra monthly payment.',
      },
      interestSaved: {
        label: 'Interest saved',
        hint: 'The difference between total interest on the base path and with the extra payments.',
      },
    },
    table: {
      title: 'Annual repayment schedule',
      caption:
        'A yearly summary of the payoff path with extra payments. Values are approximate and may differ slightly from your lender\u2019s statement.',
      columns: {
        year: 'Year',
        totalPaidYear: 'Paid in year',
        principalYear: 'Principal',
        interestYear: 'Interest',
        balance: 'Remaining balance',
      },
    },
    resultTitle: 'Results',
    formula:
      'The base payment uses the fixed-rate annuity formula, then the payoff is simulated month by month: the extra amount is added to the payment, interest is charged on the remaining balance, and the rest reduces the principal until the balance reaches zero.',
    exampleHtml:
      '<p>Example using the calculator\u2019s values: a <strong>20,000 Jordanian dinar</strong> loan at <strong>6% per year</strong> for <strong>5 years</strong>.<br>An extra monthly payment of <strong>100 dinars</strong>.<br>The baseline payment is about <strong>386.66 dinars</strong> and the baseline payoff <strong>60 months</strong>.<br>The new payoff is about <strong>54 months</strong>, saving over <strong>500 dinars</strong> in interest.</p>',
    assumptions: [
      'The interest rate is fixed for the whole loan term.',
      'The extra payment is constant and made every month alongside the base payment.',
      'The extra amount reduces the principal after monthly interest is charged.',
      'Early-payoff fees, if any, are not included.',
      'Results are estimates for general planning.',
    ],
    whenUseful:
      'Use this calculator when you have some extra cash each month and want to direct it at paying off a loan faster, to see how much it shortens the term and how much interest you save before committing.',
    mistakes: [
      'Assuming small extra payments do not matter: even a modest monthly amount shortens the term and saves interest.',
      'Forgetting that the savings depend on the remaining term and the interest rate.',
      'Assuming the extra payment all goes to interest: it reduces the principal after monthly interest is charged.',
      'Ignoring early-payoff fees that some lenders charge.',
    ],
    faqs: [
      {
        q: 'Does the whole extra payment go to the principal?',
        a: 'Monthly interest is paid first from the total payment (base plus extra), and the rest reduces the principal — which is what speeds up the payoff.',
      },
      {
        q: 'What if I only pay extra once?',
        a: 'This calculator assumes a constant monthly extra payment. For a one-off payment, the effect on the term and interest is smaller.',
      },
      {
        q: 'Does it work on a zero-interest loan?',
        a: 'There is no interest to save, but the term shortens by the effect of the extra payments.',
      },
    ],
    methodologyNote:
      'The calculator simulates the payoff month by month: interest accrues on the remaining balance and the extra payment reduces the principal. Results are approximate and may differ from your lender\u2019s statement due to early-payoff fees or rate changes.',
    disclaimerNote:
      'Results are estimates for informational purposes only and do not constitute financial advice or a lending offer.',
    lastReviewed: '2026-08-10',
    currencyDefault: 'JOD',
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
    guideTitle: 'How early loan payoff works',
    relatedTitle: 'Related calculators',
  },
};

export default content;
