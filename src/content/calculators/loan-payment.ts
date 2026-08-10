import type { CalcContent } from '../../lib/calculators/types';
import type { Locale } from '../../config/site';

const content: Record<Locale, CalcContent> = {
  ar: {
    locale: 'ar',
    slug: 'loan-payment',
    title: 'حاسبة القسط الشهري للقرض',
    metaDescription:
      'احسب القسط الشهري وإجمالي الفائدة والتكلفة الكلية لأي قرض بفائدة ثابتة أو بدون فائدة، مع جدول سداد سنوي واضح.',
    h1: 'حاسبة القسط الشهري للقرض',
    intro:
      'قبل اقتراض أي مبلغ، من المهم أن تعرف مقدماً كم ستدفع كل شهر وما التكلفة الفعلية الكاملة للقرض. أدخل مبلغ القرض وسعر الفائدة والمدة والرسوم لتحصل على قسط شهري تقديري وإجمالي التكلفة، إضافة إلى جدول سداد سنوي يوضح توزيع أصل الدين والفائدة والرصيد المتبقي.',
    fields: {
      principal: {
        label: 'مبلغ القرض',
        hint: 'إجمالي المبلغ الذي ستقترضه قبل خصم الدفعة المقدمة.',
      },
      annualRate: {
        label: 'سعر الفائدة السنوي (%)',
        hint: 'نسبة الفائدة السنوية على القرض؛ أدخل صفراً إذا كان القرض بدون فائدة.',
      },
      term: {
        label: 'مدة القرض',
        hint: 'عدد السنوات أو الأشهر التي ستسدد خلالها القرض حسب الوحدة المختارة.',
      },
      termUnit: {
        label: 'وحدة المدة',
        hint: 'اختر ما إذا كانت المدة المدخلة بالأشهر أو بالسنوات.',
        options: {
          months: 'أشهر',
          years: 'سنوات',
        },
      },
      downPayment: {
        label: 'الدفعة المقدمة',
        hint: 'المبلغ الذي تدفعه مقدماً ويُخصم من قيمة القرض (اختياري).',
      },
      fees: {
        label: 'الرسوم',
        hint: 'رسوم ومصاريف القرض التي ترغب في تضمينها في التكلفة الإجمالية (اختياري).',
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
      max: 'القيمة المدخلة أكبر من الحد الأقصى المسموح، أو الدفعة المقدمة أكبر من مبلغ القرض.',
      __generic: 'تعذّر إتمام الحساب، تحقق من المدخلات.',
    },
    results: {
      monthlyPayment: {
        label: 'القسط الشهري',
        hint: 'المبلغ الذي ستدفعه كل شهر لسداد القرض.',
        hero: true,
      },
      totalPaid: {
        label: 'إجمالي المدفوعات',
        hint: 'مجموع الأقساط الشهرية على كامل مدة القرض.',
      },
      totalInterest: {
        label: 'إجمالي الفائدة',
        hint: 'إجمالي الفائدة المدفوعة على مدى عمر القرض.',
      },
      totalFees: {
        label: 'إجمالي الرسوم',
        hint: 'الرسوم المدخلة التي تُضاف إلى التكلفة الإجمالية.',
      },
      effectiveTotalCost: {
        label: 'التكلفة الكلية الفعلية',
        hint: 'إجمالي المدفوعات مضافاً إليه الدفعة المقدمة والرسوم.',
      },
    },
    table: {
      title: 'جدول السداد السنوي',
      caption:
        'ملخص السداد لكل سنة، بقيم تقريبية قد تختلف قليلاً عن كشف المُقرِض بسبب التقريب إلى أقرب فرك.',
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
      'يُحسب القسط الشهري بمعادلة القسط الثابت: قسط = المبلغ المتبقي × المعدل الشهري × (1 + المعدل الشهري)^عدد الأشهر ÷ ((1 + المعدل الشهري)^عدد الأشهر − 1).',
    exampleHtml:
      '<p>مثال بقيم الحاسبة: قرض بقيمة <strong>100,000 دينار أردني</strong> بسعر فائدة <strong>5% سنوياً</strong> ولمدة <strong>10 سنوات</strong>.<br>دفعة مقدمة <strong>10,000 دينار</strong> ورسوم <strong>500 دينار</strong>.<br>القسط الشهري ≈ <strong>955 ديناراً</strong>، وإجمالي الفائدة ≈ <strong>24,560 ديناراً</strong>.<br>التكلفة الكلية الفعلية ≈ <strong>125,060 ديناراً</strong>.</p>',
    assumptions: [
      'سعر الفائدة ثابت طوال مدة القرض.',
      'الأقساط تُسدد شهرياً وبانتظام دون تأخير أو دفعات إضافية.',
      'تُضاف الدفعة المقدمة والرسوم إلى التكلفة الفعلية للقرض.',
      'لا تُحتسب رسوم التأمين أو الرسوم المتأخرة أو رسوم السداد المبكر ما لم تُدرج ضمن الرسوم.',
      'النتائج تقديرية ولا تشمل فروقات أسعار الصرف أو اللوائح المحلية.',
    ],
    whenUseful:
      'استخدم هذه الحاسبة عند مقارنة عروض القروض أو قبل الاقتراض لشراء سيارة أو منزل أو تمويل دراسة، لتقدّر القسط الشهري والتكلفة الكلية قبل التوقيع على أي اتفاقية.',
    mistakes: [
      'الخلط بين سعر الفائدة الشهري والسنوي: أدخل النسبة السنوية كما هي دون قسمتها.',
      'نسيان الدفعة المقدمة عند حساب المبلغ المقترض الفعلي.',
      'تجاهل الرسوم والمصاريف عند مقارنة التكلفة الكلية بين عروض مختلفة.',
      'افتراض أن القسط ثابت حتى لو تغيّر سعر الفائدة في القروض ذات الفائدة المتغيرة.',
      'الاعتماد على إجمالي الفائدة فقط دون النظر إلى التكلفة الفعلية الشاملة.',
    ],
    faqs: [
      {
        q: 'هل تُظهر النتيجة الفائدة فقط أم التكلفة الكاملة؟',
        a: 'تعرض النتائج القسط الشهري وإجمالي المدفوعات وإجمالي الفائدة، كما تعرض التكلفة الكلية الفعلية التي تضم الدفعة المقدمة والرسوم.',
      },
      {
        q: 'ماذا أفعل إذا كان القرض بسعر فائدة متغيرة؟',
        a: 'تفترض هذه الحاسبة سعراً ثابتاً. إذا كان سعر الفائدة متغيراً فاستخدم سعراً تقديرياً واعلم أن الأقساط قد تتغير خلال المدة.',
      },
      {
        q: 'هل يمكن استخدامها لقرض بدون فائدة؟',
        a: 'نعم، أدخل صفراً في سعر الفائدة، وستُحتسب الأقساط بتقسيم المبلغ المتبقي بالتساوي على عدد الأشهر.',
      },
      {
        q: 'كيف تُحسب التكلفة الكلية الفعلية؟',
        a: 'تُحسب بجمع إجمالي الأقساط المدفوعة على مدى المدة مضافاً إليها الدفعة المقدمة والرسوم.',
      },
    ],
    methodologyNote:
      'تعتمد الحاسبة على معادلة القسط الثابت للقروض بسعر فائدة ثابت، مع احتساب شهري وترحيل الرصيد سنوياً في جدول السداد. النتائج تقريبية لأغراض تخطيطية عامة. قد تختلف القواعد والرسوم حسب البلد والمُقرِض، لذا تحقق من شروط العقد والجهات الرسمية قبل اتخاذ أي قرار.',
    disclaimerNote:
      'النتائج تقديرية لأغراض إعلامية ولا تُعد نصيحة مالية أو عرضاً تمويلياً من أي جهة.',
    lastReviewed: '2026-08-09',
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
    guideTitle: 'دليل حساب القسط الشهري للقرض',
    relatedTitle: 'حاسبات ذات صلة',
  },

  en: {
    locale: 'en',
    slug: 'loan-payment',
    title: 'Loan monthly payment calculator',
    metaDescription:
      'Calculate the monthly payment, total interest and total cost of any fixed-rate or zero-interest loan, with a clear annual repayment table.',
    h1: 'Loan monthly payment calculator',
    intro:
      'Before borrowing, it helps to know how much you will pay each month and what the loan really costs. Enter the loan amount, interest rate, term and fees to get an estimated monthly payment, total cost, and an annual repayment table showing how each year splits between principal, interest and remaining balance.',
    fields: {
      principal: {
        label: 'Loan amount',
        hint: 'The total amount you plan to borrow, before any down payment.',
      },
      annualRate: {
        label: 'Annual interest rate (%)',
        hint: 'The annual interest rate on the loan; enter 0 for a zero-interest loan.',
      },
      term: {
        label: 'Loan term',
        hint: 'How long you will take to repay the loan, in the chosen unit.',
      },
      termUnit: {
        label: 'Term unit',
        hint: 'Choose whether the term is measured in months or years.',
        options: {
          months: 'Months',
          years: 'Years',
        },
      },
      downPayment: {
        label: 'Down payment',
        hint: 'The amount you pay upfront, deducted from the loan amount (optional).',
      },
      fees: {
        label: 'Fees',
        hint: 'Loan fees and charges you want included in the total cost (optional).',
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
      max: 'The entered value exceeds the allowed maximum, or the down payment is greater than the loan amount.',
      __generic: 'Could not complete the calculation. Please check your inputs.',
    },
    results: {
      monthlyPayment: {
        label: 'Monthly payment',
        hint: 'The amount you will pay each month to repay the loan.',
        hero: true,
      },
      totalPaid: {
        label: 'Total paid',
        hint: 'The sum of all monthly payments over the full loan term.',
      },
      totalInterest: {
        label: 'Total interest',
        hint: 'The total interest paid over the life of the loan.',
      },
      totalFees: {
        label: 'Total fees',
        hint: 'The fees you entered, added to the total cost.',
      },
      effectiveTotalCost: {
        label: 'Effective total cost',
        hint: 'Total payments plus the down payment and fees.',
      },
    },
    table: {
      title: 'Annual repayment schedule',
      caption:
        'A yearly summary of your repayments. Values are approximate and may differ slightly from your lender\u2019s statement due to rounding.',
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
      'The monthly payment uses the standard fixed-rate annuity formula: payment = outstanding balance \u00d7 monthly rate \u00d7 (1 + monthly rate)^months \u00f7 ((1 + monthly rate)^months \u2212 1).',
    exampleHtml:
      '<p>Example using the calculator\u2019s values: a <strong>100,000 Jordanian dinar</strong> loan at <strong>5% per year</strong> for <strong>10 years</strong>.<br>A <strong>10,000 dinar</strong> down payment and <strong>500 dinar</strong> in fees.<br>The monthly payment is about <strong>955 dinars</strong>, with total interest of about <strong>24,560 dinars</strong>.<br>The effective total cost is about <strong>125,060 dinars</strong>.</p>',
    assumptions: [
      'The interest rate is fixed for the whole loan term.',
      'Payments are made monthly and on time, with no extra or missed payments.',
      'The down payment and fees are added to the effective total cost.',
      'Insurance, late fees or early-repayment charges are not included unless entered as fees.',
      'Results are estimates and do not account for exchange-rate changes or local regulations.',
    ],
    whenUseful:
      'Use this calculator when comparing loan offers, or before borrowing to buy a car, a home or fund an education, so you can estimate the monthly payment and total cost before signing any agreement.',
    mistakes: [
      'Confusing the monthly and annual interest rate: enter the annual rate as it is, without dividing it.',
      'Forgetting the down payment when working out the actual amount borrowed.',
      'Ignoring fees and charges when comparing the total cost of different offers.',
      'Assuming the payment stays fixed even if the interest rate on a variable-rate loan changes.',
      'Looking only at total interest instead of the full effective cost.',
    ],
    faqs: [
      {
        q: 'Does the result show interest only, or the full cost?',
        a: 'The results show the monthly payment, total paid and total interest, plus the effective total cost that includes the down payment and fees.',
      },
      {
        q: 'What if the loan has a variable interest rate?',
        a: 'This calculator assumes a fixed rate. If your rate is variable, use an estimated rate and be aware that payments may change over time.',
      },
      {
        q: 'Can I use it for a zero-interest loan?',
        a: 'Yes. Enter 0 for the interest rate and the payment is calculated by dividing the outstanding balance equally across the months.',
      },
      {
        q: 'How is the effective total cost calculated?',
        a: 'It is the sum of all monthly payments over the term plus the down payment and fees.',
      },
    ],
    methodologyNote:
      'The calculator uses the standard fixed-rate annuity formula with monthly accounting and a year-by-year balance schedule. Results are approximate and for general planning. Rules and fees vary by country and lender, so always check the contract terms and official bodies before deciding.',
    disclaimerNote:
      'Results are estimates for informational purposes only and do not constitute financial advice or a lending offer.',
    lastReviewed: '2026-08-09',
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
    guideTitle: 'How to calculate a loan monthly payment',
    relatedTitle: 'Related calculators',
  },
};

export default content;
