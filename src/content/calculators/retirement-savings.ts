import type { CalcContent } from '../../lib/calculators/types';
import type { Locale } from '../../config/site';

const content: Record<Locale, CalcContent> = {
  ar: {
    locale: 'ar',
    slug: 'retirement-savings',
    title: 'حاسبة مدخرات التقاعد',
    metaDescription:
      'قدّر رصيد مدخراتك عند التقاعد بناءً على مدخراتك الحالية ومساهمتك الشهرية والعائد السنوي المتوقع.',
    h1: 'حاسبة مدخرات التقاعد',
    intro:
      'مدخرات التقاعد تُبنى بالتراكم: مساهمة شهرية ثابتة تنمو بفائدة مركبة على مدى سنوات طويلة. تساعدك هذه الحاسبة على تقدير رصيدك عند التقاعد بناءً على مدخراتك الحالية ومساهمتك الشهرية والعائد السنوي المتوقع، مع عرض إجمالي مساهماتك والعائد المكتسب فوقها.',
    fields: {
      currentSavings: {
        label: 'المدخرات الحالية',
        hint: 'الرصيد الذي لديك بالفعل في حسابات الادخار أو الاستثمار للتقاعد.',
      },
      monthlyContribution: {
        label: 'المساهمة الشهرية',
        hint: 'المبلغ الثابت الذي تخطط لإيداعه كل شهر.',
      },
      annualReturn: {
        label: 'العائد السنوي المتوقع (%)',
        hint: 'النسبة السنوية المتوقعة لعائد استثماراتك، تُدخل كنسبة مئوية وتُحوَّل إلى شهرية تلقائياً.',
      },
      years: {
        label: 'سنوات حتى التقاعد',
        hint: 'عدد السنوات المتبقية حتى تاريخ تقاعدك.',
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
        label: 'الرصيد المتوقع عند التقاعد',
        hint: 'قيمة مدخراتك التقديرية عند التقاعد بعد تراكم العائد الشهري.',
        hero: true,
      },
      totalContributions: {
        label: 'إجمالي مساهماتك',
        hint: 'مجموع مدخراتك الحالية وكل مساهماتك الشهرية دون العائد.',
      },
      totalInterestEarned: {
        label: 'إجمالي العائد المكتسب',
        hint: 'الفرق بين الرصيد المتوقع وإجمالي مساهماتك، أي نمو الاستثمار.',
      },
    },
    resultTitle: 'النتائج',
    formula:
      'الرصيد المتوقع = المدخرات الحالية × (1 + العائد الشهري)^عدد الأشهر + المساهمة الشهرية × ((1 + العائد الشهري)^عدد الأشهر − 1) ÷ العائد الشهري، حيث العائد الشهري = العائد السنوي ÷ 12.',
    exampleHtml:
      '<p>مثال بقيم الحاسبة: مدخرات حالية <strong>10,000 دينار أردني</strong>، ومساهمة شهرية <strong>200 دينار</strong>، وعائد سنوي <strong>6%</strong>، ولمدة <strong>20 سنة</strong>.<br>الرصيد المتوقع عند التقاعد ≈ <strong>125,510 ديناراً</strong>.<br>إجمالي مساهماتك ≈ <strong>58,000 دينار</strong>، والعائد المكتسب ≈ <strong>67,510 ديناراً</strong>.</p>',
    assumptions: [
      'الفائدة تُركّب شهرياً على الرصيد المتنامي.',
      'العائد السنوي يُدخل كنسبة مئوية وتُحوَّل الحاسبة إلى عائد شهري تلقائياً.',
      'المساهمة الشهرية ثابتة المبلغ طوال فترة الادخار.',
      'المدخرات الحالية تُترك دون سحب أو تغيير.',
      'العائد غير مضمون، والتضخم يقلل القوة الشرائية للرصيد الاسمي.',
    ],
    whenUseful:
      'استخدم هذه الحاسبة عند التخطيط للتقاعد أو لمراجعة خطة ادخار قائمة، لتقدير رصيدك المستقبلي وترى أثر رفع مساهمتك الشهرية أو المدة على النتيجة.',
    mistakes: [
      'إدخال العائد الشهري مباشرة في حقل العائد السنوي، وهو ما يضخم النتيجة.',
      'نسيان خصم الرسوم الإدارية والضرائب عند تقدير العائد الصافي.',
      'الاعتماد على عائد سنوي متفائل دون مراعاة أن العوائد غير مضمونة.',
      'تجاهل التضخم عند تقييم الرصيد الاسمي عند التقاعد.',
    ],
    faqs: [
      {
        q: 'هل العائد بعد التضخم أم قبله؟',
        a: 'الحاسبة تستخدم عائداً اسمياً كما تدخله، ولا تخصم التضخم. إذا أردت رقماً بالقوة الشرائية اليوم، فاطرح معدل التضخم المتوقع من العائد السنوي.',
      },
      {
        q: 'ماذا لو كانت مساهماتي غير منتظمة؟',
        a: 'تفترض الحاسبة مساهمة شهرية ثابتة. للمساهمات المتغيرة استخدم متوسطاً تقريبياً واعلم أن النتيجة ستكون تقديرية.',
      },
      {
        q: 'هل يشمل الرصيد أصولاً أخرى كالعقار؟',
        a: 'لا. تحسب الحاسبة النقد المنفصل: مدخراتك الحالية ومساهمتك الشهرية فقط، دون أصول أخرى.',
      },
    ],
    methodologyNote:
      'تحاكي الحاسبة النمو شهرياً: العائد السنوي يُقسَّم على 12، وتُضاف المساهمة الشهرية في نهاية كل شهر ويرتفع الرصيد بالعائد الشهري.',
    disclaimerNote:
      'النتائج تقديرية لأغراض إعلامية ولا تُعد نصيحة استثمارية أو ضماناً للعائد.',
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
    guideTitle: 'كيف تخطط لمدخرات التقاعد',
    relatedTitle: 'حاسبات ذات صلة',
  },

  en: {
    locale: 'en',
    slug: 'retirement-savings',
    title: 'Retirement savings calculator',
    metaDescription:
      'Project your retirement balance from current savings, monthly contributions and an expected annual return.',
    h1: 'Retirement savings calculator',
    intro:
      'Retirement savings are built by accumulation: a fixed monthly contribution growing with compound interest over many years. This calculator projects your balance at retirement from your current savings, monthly contribution and expected annual return, showing your total contributions and the interest earned on top of them.',
    fields: {
      currentSavings: {
        label: 'Current savings',
        hint: 'The balance you already hold in savings or retirement investment accounts.',
      },
      monthlyContribution: {
        label: 'Monthly contribution',
        hint: 'The fixed amount you plan to deposit each month.',
      },
      annualReturn: {
        label: 'Expected annual return (%)',
        hint: 'The expected yearly return on your investments, entered as a percentage and converted to monthly automatically.',
      },
      years: {
        label: 'Years to retirement',
        hint: 'How many years remain until your retirement date.',
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
        label: 'Projected retirement balance',
        hint: 'Your estimated savings at retirement after monthly compounding.',
        hero: true,
      },
      totalContributions: {
        label: 'Total contributions',
        hint: 'Your current savings plus all monthly contributions, without any return.',
      },
      totalInterestEarned: {
        label: 'Total interest earned',
        hint: 'The difference between the projected balance and your total contributions — the investment growth.',
      },
    },
    resultTitle: 'Results',
    formula:
      'Projected balance = current savings \u00d7 (1 + monthly rate)^months + monthly contribution \u00d7 ((1 + monthly rate)^months \u2212 1) \u00f7 monthly rate, where monthly rate = annual return \u00f7 12.',
    exampleHtml:
      '<p>Example using the calculator\u2019s values: current savings of <strong>10,000 Jordanian dinars</strong>, a monthly contribution of <strong>200 dinars</strong>, an annual return of <strong>6%</strong>, over <strong>20 years</strong>.<br>The projected retirement balance is about <strong>125,510 dinars</strong>.<br>Your total contributions are about <strong>58,000 dinars</strong>, and the interest earned about <strong>67,510 dinars</strong>.</p>',
    assumptions: [
      'Interest compounds monthly on the growing balance.',
      'The annual return is entered as a percentage and converted to a monthly rate automatically.',
      'The monthly contribution is a fixed amount for the whole saving period.',
      'Current savings are left untouched and unchanged.',
      'Returns are not guaranteed, and inflation erodes the purchasing power of the nominal balance.',
    ],
    whenUseful:
      'Use this calculator when planning for retirement or reviewing an existing saving plan, to project your future balance and see how raising your monthly contribution or the term changes the result.',
    mistakes: [
      'Entering the monthly rate directly in the annual return field, which inflates the result.',
      'Forgetting to deduct management fees and taxes when estimating the net return.',
      'Relying on an optimistic annual return without recognizing that returns are not guaranteed.',
      'Ignoring inflation when judging the nominal balance at retirement.',
    ],
    faqs: [
      {
        q: 'Is the return after or before inflation?',
        a: 'The calculator uses the nominal return as entered and does not deduct inflation. For a figure in today\u2019s purchasing power, subtract your expected inflation rate from the annual return.',
      },
      {
        q: 'What if my contributions are irregular?',
        a: 'The calculator assumes a fixed monthly contribution. For variable amounts, use a rough average and treat the result as an estimate.',
      },
      {
        q: 'Does the balance include other assets like property?',
        a: 'No. The calculator covers cash only: your current savings and monthly contribution, with no other assets.',
      },
    ],
    methodologyNote:
      'The calculator simulates monthly growth: the annual return is divided by 12, the monthly contribution is added at the end of each month, and the balance grows by the monthly rate.',
    disclaimerNote:
      'Results are estimates for informational purposes only and do not constitute investment advice or a guarantee of returns.',
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
    guideTitle: 'How to plan retirement savings',
    relatedTitle: 'Related calculators',
  },
};

export default content;
