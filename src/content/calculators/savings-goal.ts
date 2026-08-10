import type { CalcContent } from '../../lib/calculators/types';
import type { Locale } from '../../config/site';

const content: Record<Locale, CalcContent> = {
  ar: {
    locale: 'ar',
    slug: 'savings-goal',
    title: 'حاسبة هدف الادخار',
    metaDescription:
      'حدد المبلغ الذي تحتاج ادخاره شهرياً أو دورياً للوصول إلى هدفك الادخاري خلال المدة المطلوبة، مع توقع العائد.',
    h1: 'حاسبة هدف الادخار',
    intro:
      'سواء كان هدفك شراء منزل أو تعليم الأبناء أو تكوين صندوق طوارئ، فإن معرفة المبلغ الذي تحتاج ادخاره دورياً هو أول خطوة عملية نحو تحقيقه. أدخل هدفك ومدخراتك الحالية والعائد المتوقع والمدة لتعرف مبلغ الادخار الدوري المطلوب ومدى مساهمة العائد في بلوغ الهدف.',
    fields: {
      target: {
        label: 'الهدف الادخاري',
        hint: 'المبلغ الذي تطمح إلى الوصول إليه بنهاية المدة.',
      },
      currentSavings: {
        label: 'المدخرات الحالية',
        hint: 'المبلغ الذي ادخرته بالفعل وستبني عليه.',
      },
      annualReturn: {
        label: 'العائد السنوي المتوقع (%)',
        hint: 'معدل العائد السنوي المتوقع على مدخراتك؛ استخدم معدلاً تحفظياً إذا كنت غير متأكد.',
      },
      years: {
        label: 'المدة (سنوات)',
        hint: 'عدد السنوات المتاحة للوصول إلى الهدف.',
      },
      contributionFrequency: {
        label: 'تكرار الادخار',
        hint: 'اختر كيف ستودع مدخراتك: شهرياً أو ربع سنوي أو سنوياً.',
        options: {
          monthly: 'شهرياً',
          quarterly: 'ربع سنوي',
          annually: 'سنوياً',
        },
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
      requiredContribution: {
        label: 'الادخار الدوري المطلوب',
        hint: 'المبلغ الذي تحتاج ادخاره في كل فترة وفق التكرار المختار.',
        hero: true,
      },
      totalContributed: {
        label: 'إجمالي ما سيُودع',
        hint: 'مجموع مدخراتك الحالية وجميع المبالغ المودعة خلال المدة.',
      },
      estimatedReturn: {
        label: 'العائد المتوقع',
        hint: 'الجزء من الهدف الذي يُتوقع أن تغطيه العوائد.',
      },
      completionMonths: {
        label: 'مدة الإكمال (شهر)',
        hint: 'العدد الإجمالي للأشهر حتى الوصول إلى الهدف.',
      },
    },
    table: {
      title: 'التقدم نحو الهدف سنة بسنة',
      caption: 'يُظهر الرصيد المتوقع وإجمالي المبالغ المودعة والعائد في نهاية كل سنة حتى بلوغ الهدف.',
      columns: {
        year: 'السنة',
        balance: 'الرصيد',
        contributions: 'المبالغ المودعة',
        return: 'العائد',
      },
    },
    resultTitle: 'النتائج',
    formula:
      'يُحدَّد الادخار الدوري المطلوب بحيث يصل مجموع المبالغ المودعة وعوائدها المركبة إلى الهدف في نهاية المدة: مساهمة = (الهدف − الرصيد الحالي × نمو الفائدة) × المعدل ÷ (نمو الفائدة − 1).',
    exampleHtml:
      '<p>مثال بقيم الحاسبة: هدف <strong>120,000 دينار أردني</strong> مع مدخرات حالية <strong>10,000 دينار</strong> وعائد سنوي <strong>5%</strong> خلال <strong>10 سنوات</strong>.<br>تحتاج ادخار ≈ <strong>667 ديناراً شهرياً</strong>.<br>سيُسهم العائد المتوقع بحوالي <strong>30,000 دينار</strong> من إجمالي الهدف.</p>',
    assumptions: [
      'العائد السنوي ثابت طوال المدة.',
      'المبالغ تُودع بنهاية كل فترة احتساب.',
      'لا تُخصم ضرائب أو رسوم، ولا يُؤخذ التضخم في الاعتبار.',
      'بلوغ الهدف يتطلب الالتزام بالادخار الدوري بانتظام.',
      'النتائج تقديرية ولا تضمن عوائد معينة.',
    ],
    whenUseful:
      'استخدم هذه الحاسبة عند تحديد أهداف ادخار طويلة الأجل مثل تعليم الأبناء أو شراء منزل أو تكوين صندوق طوارئ، لتحدد مبلغاً واقعياً يمكنك ادخاره دورياً والوصول إلى هدفك خلال المدة المرجوة.',
    mistakes: [
      'تجاهل المدخرات الحالية عند حساب الفجوة المطلوب سدّها.',
      'استخدام عائد غير واقعي يؤدي إلى التقليل المفرط من الادخار المطلوب.',
      'عدم أخذ التضخم بالاعتبار، إذ تنخفض القوة الشرائية للهدف مع الزمن.',
      'افتراض الالتزام الشهري دون مراجعة دورية للخطة.',
      'الاعتقاد بأن بلوغ الهدف مضمون عند عائد ثابت.',
    ],
    faqs: [
      {
        q: 'ماذا لو تمكنت من بلوغ الهدف مبكراً؟',
        a: 'تعرض الحاسبة المدة بالأشهر ويمكنك تعديل المدخلات؛ كما يمكنك تقليل الادخار الدوري أو رفع الهدف وفق ظروفك.',
      },
      {
        q: 'ما العائد السنوي الذي ينبغي استخدامه؟',
        a: 'استخدم معدلاً تحفظياً إذا كنت غير متأكد من العائد المتوقع، فالمبالغة في العائد تؤدي إلى خطة ادخار غير واقعية.',
      },
      {
        q: 'هل يأخذ الحساب التضخم في الاعتبار؟',
        a: 'لا، تعمل الحاسبة بالقيم الاسمية الحالية، لذلك ضع في اعتبارك أن التضخم يقلل من القوة الشرائية للهدف مستقبلاً.',
      },
      {
        q: 'ماذا لو تجاوزت المدخرات الحالية الهدف؟',
        a: 'ستعرض الحاسبة ادخاراً دورياً صفراً، لأن الهدف مُحقَّق بالفعل من مدخراتك الحالية.',
      },
    ],
    methodologyNote:
      'تعتمد الحاسبة على القيمة المستقبلية للمساهمات الدورية مع فائدة مركبة، وتُظهر التقدم نحو الهدف سنة بسنة. النتائج تقديرية لأغراض التخطيط. قد تختلف القواعد الضريبية والتنظيمية وفرص الاستثمار حسب البلد، فتحقق من الجهات المختصة قبل الاعتماد على الأرقام.',
    disclaimerNote:
      'النتائج تقديرية لأغراض إعلامية ولا تُعد نصيحة استثمارية أو ضماناً لتحقيق الهدف بعائد معين.',
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
    guideTitle: 'كيف تضع هدفاً ادخارياً',
    relatedTitle: 'حاسبات ذات صلة',
  },

  en: {
    locale: 'en',
    slug: 'savings-goal',
    title: 'Savings goal calculator',
    metaDescription:
      'Find how much you need to save each month or period to reach a savings target within your chosen timeframe, including expected returns.',
    h1: 'Savings goal calculator',
    intro:
      'Whether your goal is buying a home, funding education or building an emergency fund, knowing how much to save each period is the first practical step. Enter your target, current savings, expected return and timeframe to see the required periodic contribution and how much of the goal your returns are expected to cover.',
    fields: {
      target: {
        label: 'Savings target',
        hint: 'The amount you aim to reach by the end of the period.',
      },
      currentSavings: {
        label: 'Current savings',
        hint: 'The amount you have already saved and will build on.',
      },
      annualReturn: {
        label: 'Expected annual return (%)',
        hint: 'The expected yearly return on your savings; use a conservative rate if you are unsure.',
      },
      years: {
        label: 'Period (years)',
        hint: 'How many years you have to reach the target.',
      },
      contributionFrequency: {
        label: 'Savings frequency',
        hint: 'Choose how you save: monthly, quarterly or annually.',
        options: {
          monthly: 'Monthly',
          quarterly: 'Quarterly',
          annually: 'Annually',
        },
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
      requiredContribution: {
        label: 'Required periodic saving',
        hint: 'How much you need to save each period at the chosen frequency.',
        hero: true,
      },
      totalContributed: {
        label: 'Total to be deposited',
        hint: 'Your current savings plus all deposits made over the period.',
      },
      estimatedReturn: {
        label: 'Expected return',
        hint: 'The part of the target expected to be covered by returns.',
      },
      completionMonths: {
        label: 'Completion (months)',
        hint: 'The total number of months until the target is reached.',
      },
    },
    table: {
      title: 'Progress towards the goal year by year',
      caption: 'Shows the expected balance, total deposited amounts and return at the end of each year until the goal is reached.',
      columns: {
        year: 'Year',
        balance: 'Balance',
        contributions: 'Deposits',
        return: 'Return',
      },
    },
    resultTitle: 'Results',
    formula:
      'The required periodic saving is set so that the total of deposits plus their compounded returns reaches the target at the end of the period: contribution = (target \u2212 current savings \u00d7 growth) \u00d7 rate \u00f7 (growth \u2212 1).',
    exampleHtml:
      '<p>Example using the calculator\u2019s values: a target of <strong>120,000 Jordanian dinars</strong> with <strong>10,000 dinars</strong> already saved, a <strong>5%</strong> annual return and <strong>10 years</strong>.<br>You need to save about <strong>667 dinars</strong> per month.<br>Expected returns contribute about <strong>30,000 dinars</strong> towards the target.</p>',
    assumptions: [
      'The annual return is fixed for the whole period.',
      'Deposits are made at the end of each period.',
      'Taxes, fees and inflation are not taken into account.',
      'Reaching the target requires saving regularly and consistently.',
      'Results are estimates and do not guarantee any particular return.',
    ],
    whenUseful:
      'Use this calculator when setting long-term savings goals such as children\u2019s education, buying a home or building an emergency fund, so you can settle on a realistic periodic amount and reach your target within the desired timeframe.',
    mistakes: [
      'Ignoring current savings when working out the gap that must be filled.',
      'Using an unrealistic return, which over-reduces the required saving.',
      'Overlooking inflation, which erodes the purchasing power of the target over time.',
      'Assuming you will stay committed without reviewing the plan regularly.',
      'Believing the target is guaranteed at a fixed return.',
    ],
    faqs: [
      {
        q: 'What if I can reach the target early?',
        a: 'The calculator shows the period in months and you can adjust the inputs; you could also lower the periodic saving or raise the target depending on your situation.',
      },
      {
        q: 'Which annual return should I use?',
        a: 'Use a conservative rate if you are unsure of the expected return, because exaggerating the return produces an unrealistic savings plan.',
      },
      {
        q: 'Does the calculation account for inflation?',
        a: 'No, it works with today\u2019s nominal values, so keep in mind that inflation reduces the purchasing power of the target in the future.',
      },
      {
        q: 'What if my current savings already exceed the target?',
        a: 'The calculator will show a periodic saving of zero, because the goal is already met with your current savings.',
      },
    ],
    methodologyNote:
      'The calculator uses the future value of periodic contributions with compound interest and shows progress towards the goal year by year. Results are estimates for planning. Tax and regulatory rules and investment options vary by country, so verify with the relevant authorities before relying on the figures.',
    disclaimerNote:
      'Results are estimates for informational purposes only and do not constitute investment advice or a guarantee of reaching the goal at any particular return.',
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
    guideTitle: 'How to set a savings goal',
    relatedTitle: 'Related calculators',
  },
};

export default content;
