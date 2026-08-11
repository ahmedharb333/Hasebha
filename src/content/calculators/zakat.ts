import type { CalcContent } from '../../lib/calculators/types';
import type { Locale } from '../../config/site';

const content: Record<Locale, CalcContent> = {
  ar: {
    locale: 'ar',
    slug: 'zakat',
    title: 'حاسبة الزكاة',
    metaDescription:
      'احسب زكاتك على النقود والذهب والاستثمارات بعد خصم الالتزامات بنسبة 2.5%، وهي النسبة المعتمدة عن الأموال التي بلغت النصاب وحال عليها الحول.',
    h1: 'حاسبة الزكاة',
    intro:
      'الزكاة ركن من أركان الإسلام تُدفع على المال الذي بلغ النصاب وحال عليه الحول الهجري، وتبلغ نسبتها 2.5% عن النقود والذهب والاستثمارات. تساعدك هذه الحاسبة على جمع وعاء الزكاة ببساطة: أدخل النقود والمدخرات وقيمة الذهب والاستثمارات، ثم اخصم الالتزامات المستحقة لتحصل على المبلغ المستحق بنسبة 2.5%.',
    fields: {
      cashSavings: {
        label: 'النقود والمدخرات',
        hint: 'النقد الموجود لديك والمدخرات في البنوك والصناديق النقدية.',
      },
      goldValue: {
        label: 'قيمة الذهب',
        hint: 'قيمة الذهب المدخر أو المشغولات المعدة للادخار بسعر السوق الحالي.',
      },
      investments: {
        label: 'الاستثمارات',
        hint: 'قيمة الأسهم والصكوك وأي استثمارات أخرى تسعى لها الزكاة.',
      },
      debts: {
        label: 'الالتزامات المستحقة',
        hint: 'الديون المستحقة عليك الآن والتي تقلص وعاء الزكاة.',
      },
      nisab: {
        label: 'النصاب (اختياري للرجوع إليه)',
        hint: 'حد أدنى إعلامي فقط: أدخل مقدار المال الذي تجاوز النصاب، فالنتيجة تُحتسب على الوعاء المدخل أعلاه.',
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
      zakatBase: {
        label: 'وعاء الزكاة',
        hint: 'إجمالي المال الخاضع للزكاة بعد خصم الالتزامات المستحقة.',
      },
      zakatDue: {
        label: 'الزكاة المستحقة',
        hint: 'نسبة 2.5% من وعاء الزكاة.',
        hero: true,
      },
    },
    resultTitle: 'النتائج',
    formula:
      'وعاء الزكاة = النقود والمدخرات + قيمة الذهب + الاستثمارات − الالتزامات المستحقة (لا يقل عن صفر)، ثم تُحسب الزكاة بنسبة 2.5% من الوعاء.',
    exampleHtml:
      '<p>مثال بقيم الحاسبة: نقود ومدخرات <strong>10,000 دينار أردني</strong>، وقيمة ذهب <strong>5,000 دينار</strong>، واستثمارات <strong>2,000 دينار</strong>، والتزامات مستحقة <strong>1,000 دينار</strong>.<br>وعاء الزكاة ≈ <strong>16,000 دينار</strong>.<br>الزكاة المستحقة ≈ <strong>400 دينار</strong> (بنسبة 2.5%).</p>',
    assumptions: [
      'تفترض الحاسبة نسبة الزكاة المعتمدة 2.5% عن الأموال التي بلغت النصاب.',
      'شرط مرور الحول الهجري هو مسؤولية المستخدم، ولا تتتبعه الحاسبة.',
      'تُحتسب قيمة الذهب بسعر السوق الحالي المدخل من المستخدم.',
      'الالتزامات المستحقة تُخصم من إجمالي المال قبل احتساب الزكاة.',
      'حقل النصاب إعلامي فقط ولا يؤثر في مبلغ الزكاة المحسوب.',
    ],
    whenUseful:
      'استخدم هذه الحاسبة في موسم الزكاة أو عند حسابها عن مالك النقدي، لتجمع مصادر المال الخاضع للزكاة وتخصم الالتزامات بسرعة وتحصل على المبلغ المستحق.',
    mistakes: [
      'حساب الزكاة على إجمالي المدخرات دون خصم الالتزامات المستحقة.',
      'نسيان إدخال قيمة الذهب أو الاستثمارات ضمن وعاء الزكاة.',
      'الخلط بين حقل النصاب الإعلامي وبين وعاء الزكاة الفعلي.',
      'إدخال إجمالي المال بما فيه المبلغ دون النصاب، ثم قراءة النتيجة وكأنها نهائية دون تحقق من النصاب والحول.',
    ],
    faqs: [
      {
        q: 'ما هو النصاب؟',
        a: 'النصاب هو الحد الأدنى من المال الذي تجب عنده الزكاة، ويُقدر غالباً بقيمة 85 غراماً من الذهب. حقل النصاب هنا إعلامي فقط، وعليك إدخال المال الذي تجاوز النصاب بنفسك.',
      },
      {
        q: 'هل تتابع الحاسبة مرور الحول الهجري؟',
        a: 'لا. الحاسبة تحسب المبلغ المستحق على الوعاء المدخل فحسب، وتترك التحقق من مرور الحول والنصاب لمسؤوليتك.',
      },
      {
        q: 'هل تشمل الأصول التجارية والأرباح؟',
        a: 'الحاسبة مخصصة للنقود والذهب والاستثمارات. لزكاة التجارة وعروض البيع أصولها ونسبها الخاصة، فاستشر من يوثق به.',
      },
    ],
    methodologyNote:
      'تعتمد الحاسبة النسبة المعتمدة 2.5% على مجموع المال بعد خصم الالتزامات المستحقة، وتفترض أن المبلغ المدخل بلغ النصاب وحال عليه الحول.',
    disclaimerNote:
      'النتائج تقديرية لأغراض إعلامية ولا تُعد فتوى أو نصيحة شرعية. تأكد من شروط الزكاة لدى الجهات المختصة.',
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
    guideTitle: 'كيف تحسب الزكاة',
    relatedTitle: 'حاسبات ذات صلة',
  },

  en: {
    locale: 'en',
    slug: 'zakat',
    title: 'Zakat calculator',
    metaDescription:
      'Calculate your zakat on cash, gold and investments after liabilities at 2.5% — the standard rate on wealth that reaches the nisab and completes a lunar year.',
    h1: 'Zakat calculator',
    intro:
      'Zakat is a pillar of Islam, paid on wealth that reaches the nisab and completes a lunar (Hijri) year, at 2.5% on cash, gold and investments. This calculator makes it simple to build your zakat base: enter cash and savings, gold value and investments, subtract outstanding liabilities, and get the amount due at 2.5%.',
    fields: {
      cashSavings: {
        label: 'Cash and savings',
        hint: 'Cash on hand plus savings held in bank accounts and cash funds.',
      },
      goldValue: {
        label: 'Gold value',
        hint: 'The value of gold saved or of jewelry held as savings, at the current market price.',
      },
      investments: {
        label: 'Investments',
        hint: 'The value of shares, sukuk and other zakatable investments.',
      },
      debts: {
        label: 'Outstanding liabilities',
        hint: 'Debts due now that reduce your zakat base.',
      },
      nisab: {
        label: 'Nisab (optional reference)',
        hint: 'An informational floor only: enter the amount that is above the nisab, since the result is computed on the base entered above.',
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
      zakatBase: {
        label: 'Zakat base',
        hint: 'Total zakatable wealth after subtracting outstanding liabilities.',
      },
      zakatDue: {
        label: 'Zakat due',
        hint: '2.5% of the zakat base.',
        hero: true,
      },
    },
    resultTitle: 'Results',
    formula:
      'Zakat base = cash and savings + gold value + investments \u2212 outstanding liabilities (never below zero), then zakat is computed at 2.5% of the base.',
    exampleHtml:
      '<p>Example using the calculator\u2019s values: cash and savings of <strong>10,000 Jordanian dinars</strong>, gold worth <strong>5,000 dinars</strong>, investments of <strong>2,000 dinars</strong>, and outstanding liabilities of <strong>1,000 dinars</strong>.<br>The zakat base is about <strong>16,000 dinars</strong>.<br>Zakat due is about <strong>400 dinars</strong> (at 2.5%).</p>',
    assumptions: [
      'The calculator uses the standard zakat rate of 2.5% on wealth that reaches the nisab.',
      'Completing a lunar (Hijri) year is the user\u2019s responsibility; the calculator does not track it.',
      'Gold is valued at the current market price entered by the user.',
      'Outstanding liabilities are subtracted from total wealth before zakat is computed.',
      'The nisab field is informational only and does not affect the computed zakat amount.',
    ],
    whenUseful:
      'Use this calculator in zakat season or when calculating zakat on your monetary wealth, to bring together the zakatable sources, subtract liabilities and get the amount due quickly.',
    mistakes: [
      'Computing zakat on total savings without subtracting outstanding liabilities.',
      'Forgetting to include gold value or investments in the zakat base.',
      'Confusing the informational nisab field with the actual zakat base.',
      'Entering all your wealth including the portion below nisab, then treating the result as final without checking nisab and the lunar year.',
    ],
    faqs: [
      {
        q: 'What is the nisab?',
        a: 'The nisab is the minimum wealth threshold at which zakat becomes due, often estimated at the value of 85 grams of gold. The nisab field here is informational; enter only wealth above the nisab yourself.',
      },
      {
        q: 'Does the calculator track the lunar year?',
        a: 'No. It only computes the amount due on the base you entered, and leaves checking the nisab and the passing of a lunar year to you.',
      },
      {
        q: 'Are business assets and profits included?',
        a: 'This calculator is for cash, gold and investments. Trade and inventory zakat has its own basis and rates, so consult someone you trust.',
      },
    ],
    methodologyNote:
      'The calculator applies the standard 2.5% rate to total wealth after subtracting outstanding liabilities, and assumes the amount entered reaches the nisab and completes a lunar year.',
    disclaimerNote:
      'Results are estimates for informational purposes only and do not constitute a religious ruling or advice. Verify zakat conditions with the relevant authorities.',
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
    guideTitle: 'How to calculate zakat',
    relatedTitle: 'Related calculators',
  },
};

export default content;
