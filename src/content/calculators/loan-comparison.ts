import type { CalcContent } from '../../lib/calculators/types';
import type { Locale } from '../../config/site';

const content: Record<Locale, CalcContent> = {
  ar: {
    locale: 'ar',
    slug: 'loan-comparison',
    title: 'حاسبة مقارنة القروض',
    metaDescription:
      'قارن بين عرضي قرض جنباً إلى جنب: القسط الشهري وإجمالي الفائدة والتكلفة الكلية، لتختار العرض الأرخص بمعايير واضحة.',
    h1: 'حاسبة مقارنة القروض',
    intro:
      'عند اقتراض مبلغ ما تصلك عروض متعددة تختلف في سعر الفائدة والمدة والرسوم، وقد يبدو الاختيار محيراً. تضع هذه الحاسبة عرضين جنباً إلى جنب على نفس مبلغ القرض، وتعرض القسط الشهري وإجمالي الفائدة والتكلفة الكلية لكل عرض والفرق بينهما، لتقرر بناءً على أرقام واضحة.',
    fields: {
      principal: {
        label: 'مبلغ القرض (مشترك)',
        hint: 'نفس مبلغ القرض لكلا العرضين، لأن المقارنة العادلة تكون على مبلغ واحد.',
      },
      rateA: {
        label: 'سعر فائدة العرض الأول (%)',
        hint: 'نسبة الفائدة السنوية في العرض الأول.',
      },
      rateB: {
        label: 'سعر فائدة العرض الثاني (%)',
        hint: 'نسبة الفائدة السنوية في العرض الثاني.',
      },
      termA: {
        label: 'مدة العرض الأول',
        hint: 'مدة سداد العرض الأول بالأشهر أو السنوات حسب الوحدة المختارة.',
      },
      termB: {
        label: 'مدة العرض الثاني',
        hint: 'مدة سداد العرض الثاني بالأشهر أو السنوات حسب الوحدة المختارة.',
      },
      termUnit: {
        label: 'وحدة المدة',
        hint: 'اختر ما إذا كانت المدد المدخلة بالأشهر أو بالسنوات.',
        options: {
          months: 'أشهر',
          years: 'سنوات',
        },
      },
      feesA: {
        label: 'رسوم العرض الأول',
        hint: 'الرسوم والمصاريف في العرض الأول (اختياري).',
      },
      feesB: {
        label: 'رسوم العرض الثاني',
        hint: 'الرسوم والمصاريف في العرض الثاني (اختياري).',
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
      monthlyA: {
        label: 'قسط العرض الأول',
        hint: 'القسط الشهري في العرض الأول.',
        hero: true,
      },
      monthlyB: {
        label: 'قسط العرض الثاني',
        hint: 'القسط الشهري في العرض الثاني.',
      },
      totalInterestA: {
        label: 'فائدة العرض الأول',
        hint: 'إجمالي الفائدة المدفوعة في العرض الأول على كامل المدة.',
      },
      totalInterestB: {
        label: 'فائدة العرض الثاني',
        hint: 'إجمالي الفائدة المدفوعة في العرض الثاني على كامل المدة.',
      },
      totalCostA: {
        label: 'تكلفة العرض الأول',
        hint: 'إجمالي الأقساط مضافاً إليه رسوم العرض الأول.',
      },
      totalCostB: {
        label: 'تكلفة العرض الثاني',
        hint: 'إجمالي الأقساط مضافاً إليه رسوم العرض الثاني.',
      },
      diffTotalCost: {
        label: 'الفرق في التكلفة (أ − ب)',
        hint: 'تكلفة العرض الأول ناقص تكلفة العرض الثاني؛ القيمة السالبة تعني أن العرض الأول أرخص.',
      },
    },
    resultTitle: 'النتائج',
    formula:
      'يُحسب القسط الشهري لكل عرض بمعادلة القسط الثابت: قسط = مبلغ القرض × المعدل الشهري × (1 + المعدل الشهري)^عدد الأشهر ÷ ((1 + المعدل الشهري)^عدد الأشهر − 1). ثم تُضاف الرسوم إلى إجمالي الأقساط لتحصل على التكلفة الكلية.',
    exampleHtml:
      '<p>مثال بقيم الحاسبة: قرض بقيمة <strong>50,000 دينار أردني</strong>.<br>العرض الأول: <strong>6% سنوياً</strong> لمدة <strong>5 سنوات</strong> ورسوم <strong>300 دينار</strong>.<br>العرض الثاني: <strong>7.5% سنوياً</strong> لمدة <strong>5 سنوات</strong> بلا رسوم.<br>قسط العرض الأول ≈ <strong>966.64 دينار</strong> وتكلفته ≈ <strong>58,298 ديناراً</strong>.<br>قسط العرض الثاني ≈ <strong>1,001.90 دينار</strong> وتكلفته ≈ <strong>60,114 ديناراً</strong>.<br>الفرق في التكلفة ≈ <strong>−1,815 ديناراً</strong> لصالح العرض الأول.</p>',
    assumptions: [
      'نفس مبلغ القرض لكلا العرضين لضمان مقارنة عادلة.',
      'سعر الفائدة ثابت طوال مدة كل عرض.',
      'الأقساط تُسدد شهرياً وبانتظام.',
      'تُضاف الرسوم المدخلة إلى التكلفة الكلية لكل عرض.',
      'النتائج تقديرية ولا تشمل فروقات أسعار الصرف أو اللوائح المحلية.',
    ],
    whenUseful:
      'استخدم هذه الحاسبة عند تلقي عروض قروض متعددة من بنوك أو جهات مختلفة، لتقارن القسط الشهري والتكلفة الكلية معاً بدلاً من الاعتماد على سعر الفائدة وحده.',
    mistakes: [
      'مقارنة القسط الشهري وحده دون النظر إلى المدة، فالعرض الأرخص قسطاً قد يكون أغلى تكلفة.',
      'مقارنة عروض بمبالغ قروض مختلفة: القاعدة هي نفس المبلغ لكلا العرضين.',
      'نسيان الرسوم عند حساب التكلفة الكلية.',
      'الخلط بين سعر الفائدة الشهري والسنوي.',
    ],
    faqs: [
      {
        q: 'أي رقم يجب أن يعتمد عليه قراري؟',
        a: 'قارن التكلفة الكلية لكل عرض (الأقساط + الرسوم) أولاً، ثم استخدم القسط الشهري لتقييم مدى ملاءمته لدخلك الشهري.',
      },
      {
        q: 'ماذا لو اختلفت مدتا العرضين؟',
        a: 'يمكنك إدخال مدتين مختلفتين، لكن انتبه أن العرض الأطول قد يقلل القسط الشهري ويزيد إجمالي الفائدة في آن واحد.',
      },
      {
        q: 'هل يمكن استخدامها لمبالغ قروض مختلفة؟',
        a: 'صُممت لمقارنة العرضين على نفس مبلغ القرض. لمقارنة مبالغ مختلفة احسب لكل مبلغ على حدة ثم قارن النسب والتكاليف النسبية.',
      },
    ],
    methodologyNote:
      'تعتمد الحاسبة على معادلة القسط الثابت لكل عرض بسعر فائدة ثابت، ثم تجمع الأقساط والرسوم لحساب التكلفة الكلية وتظهر الفرق بين العرضين. النتائج تقريبية لأغراض تخطيطية عامة، وقد تختلف القواعد والرسوم حسب البلد والمُقرِض.',
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
    guideTitle: 'دليل مقارنة عروض القروض',
    relatedTitle: 'حاسبات ذات صلة',
  },

  en: {
    locale: 'en',
    slug: 'loan-comparison',
    title: 'Loan comparison calculator',
    metaDescription:
      'Compare two loan offers side by side: monthly payment, total interest and total cost, so you can pick the cheaper one on clear criteria.',
    h1: 'Loan comparison calculator',
    intro:
      'When you borrow, offers come from different banks and lenders with different rates, terms and fees — and choosing can feel confusing. This calculator places two offers side by side on the same loan amount, showing the monthly payment, total interest, total cost and the difference, so you can decide on clear numbers.',
    fields: {
      principal: {
        label: 'Loan amount (shared)',
        hint: 'The same loan amount for both offers, because a fair comparison uses one amount.',
      },
      rateA: {
        label: 'Offer A interest rate (%)',
        hint: 'The annual interest rate on offer A.',
      },
      rateB: {
        label: 'Offer B interest rate (%)',
        hint: 'The annual interest rate on offer B.',
      },
      termA: {
        label: 'Offer A term',
        hint: 'How long offer A runs, in months or years depending on the chosen unit.',
      },
      termB: {
        label: 'Offer B term',
        hint: 'How long offer B runs, in months or years depending on the chosen unit.',
      },
      termUnit: {
        label: 'Term unit',
        hint: 'Choose whether the terms are measured in months or years.',
        options: {
          months: 'Months',
          years: 'Years',
        },
      },
      feesA: {
        label: 'Offer A fees',
        hint: 'Fees and charges on offer A (optional).',
      },
      feesB: {
        label: 'Offer B fees',
        hint: 'Fees and charges on offer B (optional).',
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
      monthlyA: {
        label: 'Offer A payment',
        hint: 'The monthly payment under offer A.',
        hero: true,
      },
      monthlyB: {
        label: 'Offer B payment',
        hint: 'The monthly payment under offer B.',
      },
      totalInterestA: {
        label: 'Offer A interest',
        hint: 'Total interest paid under offer A over the full term.',
      },
      totalInterestB: {
        label: 'Offer B interest',
        hint: 'Total interest paid under offer B over the full term.',
      },
      totalCostA: {
        label: 'Offer A cost',
        hint: 'Total payments plus offer A fees.',
      },
      totalCostB: {
        label: 'Offer B cost',
        hint: 'Total payments plus offer B fees.',
      },
      diffTotalCost: {
        label: 'Cost difference (A \u2212 B)',
        hint: 'Offer A cost minus offer B cost; a negative value means offer A is cheaper.',
      },
    },
    resultTitle: 'Results',
    formula:
      'Each offer\u2019s monthly payment uses the fixed-rate annuity formula: payment = loan amount \u00d7 monthly rate \u00d7 (1 + monthly rate)^months \u00f7 ((1 + monthly rate)^months \u2212 1). Fees are then added to total payments to give the total cost.',
    exampleHtml:
      '<p>Example using the calculator\u2019s values: a <strong>50,000 Jordanian dinar</strong> loan.<br>Offer A: <strong>6% per year</strong> for <strong>5 years</strong> with <strong>300 dinars</strong> in fees.<br>Offer B: <strong>7.5% per year</strong> for <strong>5 years</strong> with no fees.<br>Offer A\u2019s payment is about <strong>966.64 dinars</strong> and its cost about <strong>58,298 dinars</strong>.<br>Offer B\u2019s payment is about <strong>1,001.90 dinars</strong> and its cost about <strong>60,114 dinars</strong>.<br>The cost difference is about <strong>\u22121,815 dinars</strong> in favor of offer A.</p>',
    assumptions: [
      'The same loan amount is used for both offers to keep the comparison fair.',
      'The interest rate is fixed for the term of each offer.',
      'Payments are made monthly and on time.',
      'Entered fees are added to each offer\u2019s total cost.',
      'Results are estimates and do not account for exchange-rate changes or local regulations.',
    ],
    whenUseful:
      'Use this calculator when you receive multiple loan offers from different banks or lenders, so you can weigh the monthly payment and the total cost together rather than relying on the interest rate alone.',
    mistakes: [
      'Comparing the monthly payment alone and ignoring the term — a cheaper payment can cost more overall.',
      'Comparing offers with different loan amounts: the rule is the same amount for both.',
      'Forgetting fees when working out the total cost.',
      'Confusing the monthly and annual interest rate.',
    ],
    faqs: [
      {
        q: 'Which number should drive my decision?',
        a: 'Compare the total cost of each offer (payments plus fees) first, then use the monthly payment to judge whether it fits your monthly income.',
      },
      {
        q: 'What if the two terms differ?',
        a: 'You can enter different terms, but note that a longer term may lower the payment while raising total interest at the same time.',
      },
      {
        q: 'Can I use it for different loan amounts?',
        a: 'It is designed to compare both offers on the same loan amount. For different amounts, run each separately and compare the rates and relative costs.',
      },
    ],
    methodologyNote:
      'The calculator applies the fixed-rate annuity formula to each offer, then sums payments and fees to compute the total cost and show the difference. Results are approximate and for general planning; rules and fees vary by country and lender.',
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
    guideTitle: 'How to compare loan offers',
    relatedTitle: 'Related calculators',
  },
};

export default content;
