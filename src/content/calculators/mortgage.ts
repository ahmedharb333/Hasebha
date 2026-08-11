import type { CalcContent } from '../../lib/calculators/types';
import type { Locale } from '../../config/site';

const content: Record<Locale, CalcContent> = {
  ar: {
    locale: 'ar',
    slug: 'mortgage',
    title: 'حاسبة القرض العقاري',
    metaDescription:
      'احسب القسط الشهري للقرض العقاري مع الدفعة المقدمة وسعر الفائدة والرسوم، مع جدول سداد سنوي يوضح توزيع أصل الدين والفائدة.',
    h1: 'حاسبة القرض العقاري',
    intro:
      'قبل شراء منزل عبر تمويل عقاري، من المهم أن تعرف كم سيدفع قسطك الشهري وما التكلفة الفعلية للقرض على مدى سنين. أدخل سعر العقار والدفعة المقدمة وسعر الفائدة والمدة والرسوم لتحصل على مبلغ القرض الفعلي والقسط الشهري وإجمالي الفائدة، إضافة إلى جدول سداد سنوي يوضح توزيع أصل الدين والفائدة والرصيد المتبقي.',
    fields: {
      price: {
        label: 'سعر العقار',
        hint: 'إجمالي سعر المنزل أو العقار الذي تنوي شراءه.',
      },
      downPayment: {
        label: 'الدفعة المقدمة',
        hint: 'المبلغ الذي تدفعه من جيبك مسبقاً ويُخصم من سعر العقار لتحديد مبلغ القرض.',
      },
      annualRate: {
        label: 'سعر الفائدة السنوي (%)',
        hint: 'نسبة الفائدة السنوية على القرض العقاري؛ أدخل صفراً إذا كان القرض بدون فائدة.',
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
      fees: {
        label: 'الرسوم',
        hint: 'رسوم الترتيب والمصاريف الإدارية التي ترغب في تضمينها في التكلفة الإجمالية (اختياري).',
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
      max: 'القيمة المدخلة أكبر من الحد الأقصى المسموح، أو الدفعة المقدمة أكبر من سعر العقار.',
      __generic: 'تعذّر إتمام الحساب، تحقق من المدخلات.',
    },
    results: {
      loanAmount: {
        label: 'مبلغ القرض الفعلي',
        hint: 'سعر العقار بعد خصم الدفعة المقدمة، وهو المبلغ الذي تُحسب عليه الفائدة.',
      },
      monthlyPayment: {
        label: 'القسط الشهري',
        hint: 'المبلغ الذي ستدفعه كل شهر لسداد القرض العقاري.',
        hero: true,
      },
      totalInterest: {
        label: 'إجمالي الفائدة',
        hint: 'إجمالي الفائدة المدفوعة على مدى عمر القرض.',
      },
      totalPaid: {
        label: 'إجمالي المدفوعات',
        hint: 'مجموع الأقساط الشهرية على كامل مدة القرض.',
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
      '<p>مثال بقيم الحاسبة: عقار بقيمة <strong>200,000 دينار أردني</strong> ودفعة مقدمة <strong>40,000 دينار</strong>.<br>سعر فائدة <strong>5% سنوياً</strong> ولمدة <strong>20 سنة</strong>، ورسوم <strong>1,000 دينار</strong>.<br>مبلغ القرض الفعلي <strong>160,000 دينار</strong>، والقسط الشهري ≈ <strong>1,056 ديناراً</strong>.<br>إجمالي الفائدة ≈ <strong>93,416 ديناراً</strong>، والتكلفة الكلية الفعلية ≈ <strong>294,416 ديناراً</strong>.</p>',
    assumptions: [
      'سعر الفائدة ثابت طوال مدة القرض.',
      'الأقساط تُسدد شهرياً وبانتظام دون تأخير أو دفعات إضافية.',
      'تُضاف الدفعة المقدمة والرسوم إلى التكلفة الفعلية للقرض.',
      'لا تُحتسب رسوم التأمين أو الرسوم المتأخرة أو رسوم السداد المبكر ما لم تُدرج ضمن الرسوم.',
      'النتائج تقديرية ولا تشمل فروقات أسعار الصرف أو اللوائح المحلية.',
    ],
    whenUseful:
      'استخدم هذه الحاسبة عند التفكير في شراء منزل أو مقارنة عروض التمويل العقاري، لتقدّر القسط الشهري ومبلغ القرض الفعلي والتكلفة الكلية قبل التوقيع على أي اتفاقية.',
    mistakes: [
      'نسيان خصم الدفعة المقدمة من سعر العقار عند حساب مبلغ القرض الفعلي.',
      'الخلط بين سعر الفائدة الشهري والسنوي: أدخل النسبة السنوية كما هي دون قسمتها.',
      'مقارنة عروض القروض بالقسط الشهري وحده دون النظر إلى المدة والتكلفة الكلية.',
      'افتراض أن القسط ثابت حتى لو كان سعر الفائدة متغيراً.',
      'تجاهل الرسوم عند حساب التكلفة الكلية الفعلية للتمويل.',
    ],
    faqs: [
      {
        q: 'ماذا يشمل القسط الشهري؟',
        a: 'يشمل القسط الشهري حصة أصل الدين وحصة الفائدة فقط، وفق مدة القرض وسعر الفائدة. لا يشمل التأمين أو الرسوم الشهرية إلا إذا أدرجتها ضمن الرسوم.',
      },
      {
        q: 'ماذا لو كان سعر الفائدة متغيراً؟',
        a: 'تفترض هذه الحاسبة سعراً ثابتاً. إذا كان سعر الفائدة متغيراً فاستخدم سعراً تقديرياً واعلم أن الأقساط قد تتغير خلال المدة.',
      },
      {
        q: 'كيف تُحسب التكلفة الكلية الفعلية؟',
        a: 'تُحسب بجمع إجمالي الأقساط المدفوعة على مدى المدة مضافاً إليها الدفعة المقدمة والرسوم.',
      },
      {
        q: 'هل يعرض الجدول الرصيد الفعلي؟',
        a: 'يعرض الجدول رصيداً تقريبياً لكل سنة بناءً على سعر الفائدة والمدة المدخلين، وقد يختلف قليلاً عن كشف المُقرِض بسبب التقريب والرسوم الفعلية.',
      },
    ],
    methodologyNote:
      'تعتمد الحاسبة على معادلة القسط الثابت للقروض بسعر فائدة ثابت، مع احتساب شهري وترحيل الرصيد سنوياً في جدول السداد. النتائج تقريبية لأغراض تخطيطية عامة. قد تختلف القواعد والرسوم حسب البلد والمُقرِض، لذا تحقق من شروط العقد والجهات الرسمية قبل اتخاذ أي قرار.',
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
    guideTitle: 'دليل حساب القرض العقاري',
    relatedTitle: 'حاسبات ذات صلة',
  },

  en: {
    locale: 'en',
    slug: 'mortgage',
    title: 'Mortgage calculator',
    metaDescription:
      'Calculate a home loan\u2019s monthly payment with down payment, interest rate and fees, plus an annual repayment table splitting principal and interest.',
    h1: 'Mortgage calculator',
    intro:
      'Before buying a home with a mortgage, it helps to know what your monthly payment will be and what the loan really costs over the years. Enter the property price, down payment, interest rate, term and fees to get the actual loan amount, monthly payment, total interest, and an annual repayment table splitting principal, interest and remaining balance.',
    fields: {
      price: {
        label: 'Property price',
        hint: 'The total price of the home or property you plan to buy.',
      },
      downPayment: {
        label: 'Down payment',
        hint: 'The amount you pay from your own pocket upfront, deducted from the price to set the loan amount.',
      },
      annualRate: {
        label: 'Annual interest rate (%)',
        hint: 'The annual interest rate on the mortgage; enter 0 for a zero-interest loan.',
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
      fees: {
        label: 'Fees',
        hint: 'Arrangement fees and administrative charges you want included in the total cost (optional).',
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
      max: 'The entered value exceeds the allowed maximum, or the down payment is greater than the property price.',
      __generic: 'Could not complete the calculation. Please check your inputs.',
    },
    results: {
      loanAmount: {
        label: 'Loan amount',
        hint: 'The property price after the down payment — the amount on which interest is calculated.',
      },
      monthlyPayment: {
        label: 'Monthly payment',
        hint: 'The amount you will pay each month to repay the mortgage.',
        hero: true,
      },
      totalInterest: {
        label: 'Total interest',
        hint: 'The total interest paid over the life of the loan.',
      },
      totalPaid: {
        label: 'Total paid',
        hint: 'The sum of all monthly payments over the full loan term.',
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
      '<p>Example using the calculator\u2019s values: a <strong>200,000 Jordanian dinar</strong> property with a <strong>40,000 dinar</strong> down payment.<br>An interest rate of <strong>5% per year</strong> over <strong>20 years</strong>, with <strong>1,000 dinars</strong> in fees.<br>The loan amount is <strong>160,000 dinars</strong>, and the monthly payment is about <strong>1,056 dinars</strong>.<br>Total interest is about <strong>93,416 dinars</strong>, and the effective total cost about <strong>294,416 dinars</strong>.</p>',
    assumptions: [
      'The interest rate is fixed for the whole loan term.',
      'Payments are made monthly and on time, with no extra or missed payments.',
      'The down payment and fees are added to the effective total cost.',
      'Insurance, late fees or early-repayment charges are not included unless entered as fees.',
      'Results are estimates and do not account for exchange-rate changes or local regulations.',
    ],
    whenUseful:
      'Use this calculator when you are thinking of buying a home or comparing mortgage offers, so you can estimate the monthly payment, actual loan amount and total cost before signing any agreement.',
    mistakes: [
      'Forgetting to subtract the down payment from the property price when working out the actual loan amount.',
      'Confusing the monthly and annual interest rate: enter the annual rate as it is, without dividing it.',
      'Comparing mortgage offers by monthly payment alone, ignoring the term and total cost.',
      'Assuming the payment stays fixed even on a variable-rate loan.',
      'Ignoring fees when calculating the full cost of the financing.',
    ],
    faqs: [
      {
        q: 'What is included in the monthly payment?',
        a: 'The payment covers the principal and interest shares only, based on the term and rate. It does not include insurance or monthly charges unless you add them to the fees.',
      },
      {
        q: 'What if the interest rate is variable?',
        a: 'This calculator assumes a fixed rate. If your rate is variable, use an estimated rate and be aware that payments may change over time.',
      },
      {
        q: 'How is the effective total cost calculated?',
        a: 'It is the sum of all monthly payments over the term plus the down payment and fees.',
      },
      {
        q: 'Does the table show the real balance?',
        a: 'The table shows an approximate balance for each year based on the entered rate and term. It may differ slightly from your lender\u2019s statement because of rounding and actual fees.',
      },
    ],
    methodologyNote:
      'The calculator uses the standard fixed-rate annuity formula with monthly accounting and a year-by-year balance schedule. Results are approximate and for general planning. Rules and fees vary by country and lender, so always check the contract terms and official bodies before deciding.',
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
    guideTitle: 'How to calculate a mortgage',
    relatedTitle: 'Related calculators',
  },
};

export default content;
