import type { CalcContent } from '../../lib/calculators/types';
import type { Locale } from '../../config/site';

const content: Record<Locale, CalcContent> = {
  ar: {
    locale: 'ar',
    slug: 'vat',
    title: 'حاسبة الضريبة المضافة (الضريبة على القيمة المضافة)',
    metaDescription:
      'أضف أو أزل أو استخرج قيمة الضريبة المضافة من أي مبلغ بنسبة مخصصة، مع شرح واضح لكل اتجاه من اتجاهات الحساب.',
    h1: 'حاسبة الضريبة المضافة',
    intro:
      'يساعدك هذا الحاسب في التعامل مع الضريبة على القيمة المضافة بثلاث طرق: إضافة الضريبة إلى مبلغ صافي، أو إزالتها من مبلغ شامل للضريبة لمعرفة الصافي، أو استخراج قيمة الضريبة الموجودة داخل إجمالي معيّن. اختر الاتجاه المناسب وأدخل نسبة الضريبة المعمول بها.',
    fields: {
      amount: {
        label: 'المبلغ',
        hint: 'المبلغ الذي ستحسب الضريبة عليه أو داخله حسب الاتجاه المختار.',
      },
      vatRate: {
        label: 'نسبة الضريبة المضافة (%)',
        hint: 'نسبة الضريبة المطبقة؛ تأكد من النسبة المعمول بها محلياً لأنها تختلف بين الدول.',
      },
      direction: {
        label: 'اتجاه الحساب',
        hint: 'أضِف الضريبة فوق مبلغ صافي، أو أزِلها من مبلغ شامل، أو استخرج قيمتها من الإجمالي.',
        options: {
          add: 'إضافة الضريبة (المبلغ صافي)',
          remove: 'إزالة الضريبة (المبلغ شامل)',
          extract: 'استخراج الضريبة من الإجمالي',
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
      netAmount: {
        label: 'المبلغ الصافي',
        hint: 'قيمة السلعة أو الخدمة قبل إضافة الضريبة.',
      },
      vatAmount: {
        label: 'قيمة الضريبة',
        hint: 'مقدار الضريبة وحدها دون المبلغ الأساسي.',
      },
      grossAmount: {
        label: 'المبلغ الإجمالي',
        hint: 'المبلغ شاملاً الضريبة.',
      },
    },
    resultTitle: 'النتائج',
    formula:
      'إضافة الضريبة: الإجمالي = الصافي × (1 + نسبة الضريبة). إزالة الضريبة: الصافي = الإجمالي ÷ (1 + نسبة الضريبة). الاستخراج: قيمة الضريبة = الإجمالي − الصافي.',
    exampleHtml:
      '<p>مثال بقيم الحاسبة: مبلغ صافي <strong>1,000 ريال سعودي</strong> بنسبة ضريبة <strong>16%</strong>.<br>قيمة الضريبة <strong>160 ريالاً</strong> والمبلغ الإجمالي <strong>1,160 ريالاً</strong>.<br>وإذا كان المبلغ <strong>1,160 ريالاً</strong> شاملاً الضريبة فإن الصافي <strong>1,000 ريال</strong>.</p>',
    assumptions: [
      'المبلغ المدخل إما صافي أو إجمالي حسب اتجاه الحساب المختار.',
      'نسبة الضريبة قيمة ثابتة يحددها المستخدم.',
      'لا تُطبق نسب متعددة أو إعفاءات ضمن الحساب الواحد.',
      'النسب والقواعد المعمول بها تختلف حسب البلد ونوع السلعة أو الخدمة.',
    ],
    whenUseful:
      'استخدم هذه الحاسبة عند حساب السعر الشامل للضريبة لسلعة أو خدمة، أو عند التحقق من قيمة الضريبة ضمن فاتورة، أو عند تحديد سعر صافي من مبلغ شامل، خاصة لأصحاب المتاجر والخدمات.',
    mistakes: [
      'الخلط بين إضافة الضريبة إلى مبلغ صافي وإزالتها من مبلغ شامل.',
      'حساب الضريبة على المبلغ الشامل عند الإضافة، بينما تُحسب على المبلغ الصافي.',
      'استخدام نسبة ضريبية قديمة أو غير صحيحة لبلدك.',
      'تجاهل أن بعض السلع والخدمات قد تخضع لنسب مختلفة أو إعفاءات.',
    ],
    faqs: [
      {
        q: 'ما الفرق بين إزالة الضريبة واستخراجها؟',
        a: 'إزالة الضريبة تعني إيجاد المبلغ الصافي من مبلغ شامل للضريبة، أما استخراج الضريبة فيعرض مقدار الضريبة نفسها الموجودة داخل الإجمالي.',
      },
      {
        q: 'ما النسبة التي يجب استخدامها؟',
        a: 'النسبة تختلف حسب البلد ونوع السلعة أو الخدمة، لذلك تحقق من الجهة الضريبية المختصة في بلدك قبل إدخالها.',
      },
      {
        q: 'هل تُحتسب الضريبة على المبلغ الشامل؟',
        a: 'لا، عند إضافة الضريبة تُحسب على المبلغ الصافي ثم يُضاف ناتجها إلى الصافي للحصول على الإجمالي.',
      },
      {
        q: 'هل يمكن استخدامها لسلعة معفاة من الضريبة؟',
        a: 'نعم، أدخل نسبة صفر وستظهر قيمة الضريبة صفراً ويبقى المبلغ كما هو.',
      },
    ],
    methodologyNote:
      'يعتمد الحساب على المعادلات القياسية للضريبة على القيمة المضافة: الضرب في (1 + النسبة) للإضافة، والقسمة على (1 + النسبة) للإزالة. النتائج حسابية بحتة، وقيم الضريبة المعمول بها والقواعد التطبيقية تختلف بين الدول وتتغير بمرور الوقت، فتحقق دائماً من السلطات الضريبية المختصة.',
    disclaimerNote:
      'النتائج تقديرية لأغراض إعلامية ولا تُعد نصيحة ضريبية أو إقراراً ضريبياً.',
    lastReviewed: '2026-08-09',
    currencyDefault: 'SAR',
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
    guideTitle: 'كيف تحسب الضريبة المضافة',
    relatedTitle: 'حاسبات ذات صلة',
  },

  en: {
    locale: 'en',
    slug: 'vat',
    title: 'VAT calculator',
    metaDescription:
      'Add, remove or extract VAT from any amount using a custom rate, with each calculation direction clearly explained.',
    h1: 'VAT calculator',
    intro:
      'This calculator helps you work with value-added tax in three ways: add VAT to a net amount, remove VAT from a gross amount to find the net, or extract the VAT portion contained within a total. Choose the direction that matches your situation and enter the applicable tax rate.',
    fields: {
      amount: {
        label: 'Amount',
        hint: 'The amount you want to calculate VAT on or from, depending on the chosen direction.',
      },
      vatRate: {
        label: 'VAT rate (%)',
        hint: 'The applied tax rate; make sure you use the rate in force locally, as it varies between countries.',
      },
      direction: {
        label: 'Calculation direction',
        hint: 'Add VAT on top of a net amount, remove it from a gross amount, or extract the VAT inside a total.',
        options: {
          add: 'Add VAT (amount is net)',
          remove: 'Remove VAT (amount is gross)',
          extract: 'Extract VAT from the total',
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
      netAmount: {
        label: 'Net amount',
        hint: 'The value of the good or service before tax.',
      },
      vatAmount: {
        label: 'VAT amount',
        hint: 'The tax alone, without the base amount.',
      },
      grossAmount: {
        label: 'Gross amount',
        hint: 'The amount including tax.',
      },
    },
    resultTitle: 'Results',
    formula:
      'Add VAT: gross = net \u00d7 (1 + VAT rate). Remove VAT: net = gross \u00f7 (1 + VAT rate). Extract: VAT amount = gross \u2212 net.',
    exampleHtml:
      '<p>Example using the calculator\u2019s values: a net amount of <strong>1,000 Saudi riyals</strong> at a <strong>16%</strong> VAT rate.<br>The VAT is <strong>160 riyals</strong> and the gross amount is <strong>1,160 riyals</strong>.<br>If the <strong>1,160 riyals</strong> already includes VAT, the net amount is <strong>1,000 riyals</strong>.</p>',
    assumptions: [
      'The amount entered is either net or gross depending on the chosen direction.',
      'The VAT rate is a fixed value entered by the user.',
      'Multiple rates or exemptions are not applied within a single calculation.',
      'Rates and rules in force vary by country and by type of good or service.',
    ],
    whenUseful:
      'Use this calculator when pricing a product or service including tax, checking the VAT portion of an invoice, or finding the net amount behind a gross figure \u2014 especially useful for shop owners and service providers.',
    mistakes: [
      'Mixing up adding VAT to a net amount and removing it from a gross amount.',
      'Calculating VAT on the gross amount when adding it, instead of on the net amount.',
      'Using an outdated or incorrect rate for your country.',
      'Forgetting that some goods and services may be subject to different rates or exemptions.',
    ],
    faqs: [
      {
        q: 'What is the difference between removing and extracting VAT?',
        a: 'Removing VAT finds the net amount from a figure that includes tax, while extracting VAT shows the amount of tax itself contained within the total.',
      },
      {
        q: 'Which rate should I use?',
        a: 'The rate varies by country and by type of good or service, so check with your local tax authority before entering it.',
      },
      {
        q: 'Is VAT calculated on the gross amount?',
        a: 'No. When adding VAT it is calculated on the net amount, and the result is then added to the net to get the gross.',
      },
      {
        q: 'Can I use it for an exempt product?',
        a: 'Yes. Enter a rate of zero and the VAT amount will be zero while the amount stays unchanged.',
      },
    ],
    methodologyNote:
      'The calculation uses the standard VAT formulas: multiplying by (1 + rate) to add tax and dividing by (1 + rate) to remove it. Results are purely arithmetic, and the rates and rules in force differ between countries and change over time, so always verify with the competent tax authorities.',
    disclaimerNote:
      'Results are estimates for informational purposes only and do not constitute tax advice or a tax filing.',
    lastReviewed: '2026-08-09',
    currencyDefault: 'SAR',
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
    guideTitle: 'How to calculate VAT',
    relatedTitle: 'Related calculators',
  },
};

export default content;
