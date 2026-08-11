import type { CalcContent } from '../../lib/calculators/types';
import type { Locale } from '../../config/site';

const content: Record<Locale, CalcContent> = {
  ar: {
    locale: 'ar',
    slug: 'debt-to-income',
    title: 'حاسبة نسبة الدين إلى الدخل',
    metaDescription:
      'احسب نسبة أقساط ديونك الشهرية إلى دخلك الإجمالي، وراجع كم يتبقى من دخلك بعد الأقساط.',
    h1: 'حاسبة نسبة الدين إلى الدخل',
    intro:
      'نسبة الدين إلى الدخل (DTI) مؤشر يستخدمه المقرضون لتقييم قدرتك على تحمل قرض جديد: تُحسب بقسمة أقساط ديونك الشهرية على دخلك الإجمالي. تساعدك هذه الحاسبة على حساب النسبة مباشرة ومعرفة المبلغ المتبقي من دخلك بعد سداد الأقساط، استعداداً لأي طلب تمويل.',
    fields: {
      monthlyDebt: {
        label: 'أقساط الديون الشهرية',
        hint: 'مجموع أقساط القروض وحدود الائتمان والحد الأدنى لدفعات البطاقات شهرياً.',
      },
      grossIncome: {
        label: 'الدخل الإجمالي الشهري',
        hint: 'دخلك الشهري قبل الضرائب والخصومات، ويجب أن يكون أكبر من صفر.',
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
      dtiRatio: {
        label: 'نسبة الدين إلى الدخل',
        hint: 'نسبة أقساط ديونك الشهرية إلى دخلك الإجمالي. غالباً ما يُنظر إلى النسبة الأعلى من 36% على أنها ضغط دين مرتفع.',
        hero: true,
      },
      remainingIncome: {
        label: 'الدخل المتبقي بعد الأقساط',
        hint: 'دخلك الإجمالي بعد خصم أقساط الديون الشهرية.',
      },
    },
    resultTitle: 'النتائج',
    formula:
      'نسبة الدين إلى الدخل = أقساط الديون الشهرية ÷ الدخل الإجمالي الشهري × 100، والدخل المتبقي = الدخل الإجمالي − الأقساط.',
    exampleHtml:
      '<p>مثال بقيم الحاسبة: أقساط ديون شهرية <strong>400 دينار أردني</strong> ودخل إجمالي شهري <strong>2,000 دينار</strong>.<br>نسبة الدين إلى الدخل = <strong>20%</strong>.<br>الدخل المتبقي بعد الأقساط ≈ <strong>1,600 دينار</strong>.</p>',
    assumptions: [
      'تُحسب النسبة على الدخل الإجمالي قبل الضرائب والخصومات.',
      'تشمل الأقساط كل القروض والحد الأدنى لدفعات البطاقات والالتزامات الشهرية.',
      'لا تُدخل تكاليف المعيشة في النسبة، فهي معنية بأقساط الديون فقط.',
      'الدخل يجب أن يكون أكبر من صفر لإتمام الحساب.',
      'النسبة معيار إرشادي وليس حكماً نهائياً على أهلية التمويل.',
    ],
    whenUseful:
      'استخدم هذه الحاسبة قبل التقدم لأي قرض أو تمويل جديد، لتقيس ضغط ديونك الحالي وتتوقع كيف يؤثر القرض الجديد على نسبتك.',
    mistakes: [
      'استخدام الدخل الصافي بعد الضرائب بدلاً من الإجمالي، ما يرفع النسبة الظاهرة.',
      'نسيان تضمين الحد الأدنى لدفعات البطاقات أو القروض الشخصية الصغيرة.',
      'إدخال تكاليف المعيشة والفواتير ضمن أقساط الديون.',
      'إدخال دخل صفري، وهو ما لا يمكن معه حساب النسبة.',
    ],
    faqs: [
      {
        q: 'ما هي النسبة الصحية؟',
        a: 'المعيار الشائع أن تكون النسبة أقل من 36% من الدخل الإجمالي، مع تفضيل المقرضين للنسب المنخفضة التي تترك هامشاً أكبر لقرض جديد.',
      },
      {
        q: 'هل تُدخل تكاليف المعيشة في الحساب؟',
        a: 'لا. النسبة معنية بأقساط الديون الشهرية فقط، ولا تشمل الإيجار والطعام والفواتير إلا إذا كانت قسماً من التزاماتك القرضية.',
      },
      {
        q: 'هل النسبة وحدها تحدد قبول التمويل؟',
        a: 'لا، هي معيار واحد من عدة معايير. ينظر المقرضون أيضاً إلى تاريخك الائتماني واستقرار دخلك ومبالغ أخرى.',
      },
    ],
    methodologyNote:
      'تقسم الحاسبة مجموع أقساط الديون الشهرية على الدخل الإجمالي الشهري وتضرب في 100 لتعطي النسبة، ثم تطرح الأقساط من الدخل لتعرض المتبقي.',
    disclaimerNote:
      'النتائج تقديرية لأغراض إعلامية ولا تُعد موافقة تمويلية أو نصيحة مالية من أي جهة.',
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
    guideTitle: 'كيف تحسب نسبة الدين إلى الدخل',
    relatedTitle: 'حاسبات ذات صلة',
  },

  en: {
    locale: 'en',
    slug: 'debt-to-income',
    title: 'Debt-to-income calculator',
    metaDescription:
      'Calculate your monthly debt payments as a share of gross income, and see what income remains after the payments.',
    h1: 'Debt-to-income calculator',
    intro:
      'The debt-to-income (DTI) ratio is a metric lenders use to assess your ability to take on a new loan: it divides your monthly debt payments by your gross income. This calculator works out the ratio for you and shows how much of your income remains after the payments, ready for any financing application.',
    fields: {
      monthlyDebt: {
        label: 'Monthly debt payments',
        hint: 'The total of loan installments, credit lines and minimum card payments each month.',
      },
      grossIncome: {
        label: 'Gross monthly income',
        hint: 'Your monthly income before taxes and deductions; it must be greater than zero.',
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
      dtiRatio: {
        label: 'Debt-to-income ratio',
        hint: 'Your monthly debt payments as a share of gross income. Ratios above about 36% are commonly seen as high debt pressure.',
        hero: true,
      },
      remainingIncome: {
        label: 'Remaining income',
        hint: 'Your gross income after subtracting the monthly debt payments.',
      },
    },
    resultTitle: 'Results',
    formula:
      'Debt-to-income ratio = monthly debt payments \u00f7 gross monthly income \u00d7 100, and remaining income = gross income \u2212 payments.',
    exampleHtml:
      '<p>Example using the calculator\u2019s values: monthly debt payments of <strong>400 Jordanian dinars</strong> and a gross monthly income of <strong>2,000 dinars</strong>.<br>The debt-to-income ratio is <strong>20%</strong>.<br>Remaining income after payments is about <strong>1,600 dinars</strong>.</p>',
    assumptions: [
      'The ratio is based on gross income before taxes and deductions.',
      'Payments include all loans, minimum card payments and monthly obligations.',
      'Living costs are not part of the ratio — it covers debt payments only.',
      'Income must be greater than zero to complete the calculation.',
      'The ratio is a guide, not a final verdict on financing eligibility.',
    ],
    whenUseful:
      'Use this calculator before applying for any new loan or financing, to measure your current debt pressure and see how a new loan might move your ratio.',
    mistakes: [
      'Using net income after taxes instead of gross income, which inflates the ratio.',
      'Forgetting to include minimum card payments or small personal loans.',
      'Including living costs and bills among the debt payments.',
      'Entering zero income, which makes the ratio impossible to compute.',
    ],
    faqs: [
      {
        q: 'What is a healthy ratio?',
        a: 'A common guideline is a ratio below 36% of gross income, with lenders preferring lower ratios that leave more room for a new loan.',
      },
      {
        q: 'Do living costs go into the calculation?',
        a: 'No. The ratio covers monthly debt payments only, and does not include rent, food and bills unless they are part of your loan obligations.',
      },
      {
        q: 'Does the ratio alone decide financing approval?',
        a: 'No, it is one of several criteria. Lenders also look at your credit history, income stability and other amounts.',
      },
    ],
    methodologyNote:
      'The calculator divides total monthly debt payments by gross monthly income and multiplies by 100 for the ratio, then subtracts payments from income to show what remains.',
    disclaimerNote:
      'Results are estimates for informational purposes only and do not constitute financing approval or financial advice.',
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
    guideTitle: 'How to calculate debt-to-income ratio',
    relatedTitle: 'Related calculators',
  },
};

export default content;
