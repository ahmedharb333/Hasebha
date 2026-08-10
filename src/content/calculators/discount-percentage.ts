import type { CalcContent } from '../../lib/calculators/types';
import type { Locale } from '../../config/site';

const content: Record<Locale, CalcContent> = {
  ar: {
    locale: 'ar',
    slug: 'discount-percentage',
    title: 'حاسبة الخصم والنسبة المئوية',
    metaDescription:
      'احسب السعر بعد الخصم، مبلغ الخصم، التغيّر والنسبة المئوية، والفرق النسبي بين قيمتين، أو استنتج السعر الأصلي قبل الخصم.',
    h1: 'حاسبة الخصم والنسبة المئوية',
    intro:
      'أداة متعددة الأغراض للتعامل مع الخصومات والنسب: احسب السعر النهائي بعد الخصم، أو مبلغ الخصم، أو النسبة المئوية للزيادة أو الانخفاض بين قيمتين، أو نسبة الفرق بينهما، أو استنتج السعر الأصلي عندما تعرف السعر النهائي ونسبة الخصم. اختر نوع الحساب وستظهر الحقول المناسبة.',
    fields: {
      mode: {
        label: 'نوع الحساب',
        hint: 'اختر نوع الحساب وستظهر الحقول المطلوبة تلقائياً.',
        options: {
          afterDiscount: 'السعر بعد الخصم',
          discountAmount: 'مبلغ الخصم',
          percentIncrease: 'زيادة نسبية',
          percentDecrease: 'انخفاض نسبي',
          percentDifference: 'فرق نسبي بين قيمتين',
          originalPrice: 'السعر الأصلي',
        },
      },
      original: {
        label: 'السعر الأصلي',
        hint: 'سعر السلعة قبل تطبيق الخصم.',
      },
      discountPct: {
        label: 'نسبة الخصم (%)',
        hint: 'نسبة الخصم المطبقة على السعر الأصلي لحساب السعر بعد الخصم.',
      },
      discountAmount2: {
        label: 'مبلغ الخصم',
        hint: 'المبلغ النقدي الذي يُخصم من السعر الأصلي لحساب نسبة الخصم.',
      },
      valueA: {
        label: 'القيمة الأولى',
        hint: 'قيمة البداية التي تُقارن بها القيمة الثانية.',
      },
      valueB: {
        label: 'القيمة الثانية',
        hint: 'القيمة النهائية أو القيمة التي تُقارن بالأولى.',
      },
      finalPrice: {
        label: 'السعر بعد الخصم',
        hint: 'السعر المدفوع فعلياً بعد الخصم لاستنتاج السعر الأصلي.',
      },
      discountPct2: {
        label: 'نسبة الخصم (%)',
        hint: 'نسبة الخصم التي أدت إلى السعر النهائي، لاستنتاج السعر الأصلي.',
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
      finalPrice: {
        label: 'السعر النهائي بعد الخصم',
        hint: 'المبلغ الذي تدفعه بعد تطبيق الخصم.',
      },
      discountAmount: {
        label: 'مبلغ الخصم',
        hint: 'المبلغ الذي تم خصمه من السعر الأصلي.',
      },
      discountPct: {
        label: 'نسبة الخصم',
        hint: 'النسبة المئوية التي يمثلها مبلغ الخصم من السعر الأصلي.',
      },
      change: {
        label: 'نسبة التغيّر',
        hint: 'نسبة الزيادة أو الانخفاض من القيمة الأولى إلى القيمة الثانية.',
      },
      difference: {
        label: 'الفرق بين القيمتين',
        hint: 'الفرق المطلق بين القيمة الأولى والثانية.',
      },
      percentDifference: {
        label: 'نسبة الفرق',
        hint: 'الفرق بين القيمتين كنسبة مئوية من متوسطهما.',
      },
      originalPrice: {
        label: 'السعر الأصلي',
        hint: 'السعر قبل الخصم المستنتج من السعر النهائي ونسبة الخصم.',
      },
    },
    resultTitle: 'النتائج',
    formula:
      'السعر بعد الخصم = السعر الأصلي × (1 − نسبة الخصم). مبلغ الخصم = السعر الأصلي × نسبة الخصم. التغيّر النسبي = (ب − أ) ÷ أ × 100. نسبة الفرق = |أ − ب| ÷ ((أ + ب) ÷ 2) × 100.',
    exampleHtml:
      '<p>مثال بقيم الحاسبة: سلعة سعرها الأصلي <strong>1,000 درهم إماراتي</strong> بخصم <strong>20%</strong>.<br>مبلغ الخصم <strong>200 درهم</strong>.<br>السعر بعد الخصم <strong>800 درهم</strong>.</p>',
    assumptions: [
      'تُستخدم المعادلات الرياضية القياسية دون اعتبارات تجارية إضافية.',
      'في وضع التغيّر النسبي تُؤخذ القيمة الأولى مرجعاً (أساساً).',
      'نسبة الفرق تُحسب من متوسط القيمتين وتكون دائماً موجبة.',
      'تُعامل الأسعار بالقيمة الاسمية دون ضرائب أو خصومات إضافية ما لم تُدرج في المدخلات.',
    ],
    whenUseful:
      'استخدمها عند التسوق ومقارنة العروض لتحديد السعر النهائي بعد الخصومات، أو عند تحليل ارتفاع أو انخفاض الأسعار بين فترتين، أو عند الحاجة إلى استنتاج السعر الأصلي قبل الخصم.',
    mistakes: [
      'حساب الخصم على السعر النهائي بدلاً من السعر الأصلي.',
      'الخلط بين نسبة التغيّر ونسبة الفرق: الأولى تعتمد القيمة الأولى أساساً والثانية متوسط القيمتين.',
      'افتراض أن خصمين متتاليين يُجمعان، بينما خصم 10% ثم 10% لا يساوي 20%.',
      'الاعتقاد بأن الزيادة والنقصان بنسبة واحدة يعيدان القيمة إلى الأصل.',
    ],
    faqs: [
      {
        q: 'لماذا خصم 10% ثم 10% لا يساوي خصماً واحداً بـ 20%؟',
        a: 'لأن الخصم الثاني يُطبق على السعر بعد الخصم الأول، فالسعر النهائي يكون 81% من الأصلي وليس 80%.',
      },
      {
        q: 'كيف أستنتج السعر الأصلي من السعر النهائي؟',
        a: 'اقسم السعر النهائي على (1 − نسبة الخصم)، وهذا ما تفعله الحاسبة في وضع «السعر الأصلي».',
      },
      {
        q: 'ما الفرق بين الزيادة النسبية ونسبة الفرق؟',
        a: 'الزيادة النسبية تقارن القيمة الثانية بالقيمة الأولى كأساس، بينما نسبة الفرق تقارن القيمتين بمتوسطهما وتكون موجبة دائماً.',
      },
      {
        q: 'هل تشمل النتائج الضريبة المضافة؟',
        a: 'لا، تعمل الحاسبة على الأسعار كما تُدخلها تماماً؛ تُحتسب الضريبة بشكل منفصل.',
      },
    ],
    methodologyNote:
      'تعتمد الحاسبة على المعادلات الرياضية القياسية للنسب والخصومات: الحسابات على السعر الأصلي للإضافة والخصم، وعلى القيمة الأولى كأساس للتغيّر النسبي، وعلى المتوسط لنسبة الفرق. النتائج تقديرية للأغراض العامة. قواعد الضريبة والتقريب التجاري قد تختلف حسب البلد، فتحقق من الجهات المعنية عند الحاجة.',
    disclaimerNote:
      'النتائج تقديرية لأغراض إعلامية ولا تُعد نصيحة مالية أو تسعيرية ملزمة.',
    lastReviewed: '2026-08-09',
    currencyDefault: 'AED',
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
    slug: 'discount-percentage',
    title: 'Discount and percentage calculator',
    metaDescription:
      'Calculate price after discount, discount amount, percentage change, percentage difference, or work out the original price before a discount.',
    h1: 'Discount and percentage calculator',
    intro:
      'A multi-purpose tool for discounts and percentages: work out the final price after a discount, the discount amount, the percentage increase or decrease between two values, the percentage difference between them, or the original price when you know the final price and the discount rate. Choose the calculation type and the relevant fields appear automatically.',
    fields: {
      mode: {
        label: 'Calculation type',
        hint: 'Choose the calculation type and the required fields appear automatically.',
        options: {
          afterDiscount: 'Price after discount',
          discountAmount: 'Discount amount',
          percentIncrease: 'Percentage increase',
          percentDecrease: 'Percentage decrease',
          percentDifference: 'Percentage difference',
          originalPrice: 'Original price',
        },
      },
      original: {
        label: 'Original price',
        hint: 'The price of the item before the discount.',
      },
      discountPct: {
        label: 'Discount rate (%)',
        hint: 'The percentage discount applied to the original price to get the price after discount.',
      },
      discountAmount2: {
        label: 'Discount amount',
        hint: 'The cash amount taken off the original price, used to find the discount rate.',
      },
      valueA: {
        label: 'First value',
        hint: 'The starting value against which the second value is compared.',
      },
      valueB: {
        label: 'Second value',
        hint: 'The final value, or the value being compared with the first.',
      },
      finalPrice: {
        label: 'Price after discount',
        hint: 'The price actually paid after the discount, used to find the original price.',
      },
      discountPct2: {
        label: 'Discount rate (%)',
        hint: 'The discount rate that led to the final price, used to find the original price.',
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
      finalPrice: {
        label: 'Final price after discount',
        hint: 'The amount you pay after the discount is applied.',
      },
      discountAmount: {
        label: 'Discount amount',
        hint: 'The amount taken off the original price.',
      },
      discountPct: {
        label: 'Discount rate',
        hint: 'The percentage of the original price that the discount amount represents.',
      },
      change: {
        label: 'Percentage change',
        hint: 'The percentage increase or decrease from the first value to the second.',
      },
      difference: {
        label: 'Difference between values',
        hint: 'The absolute difference between the first and second values.',
      },
      percentDifference: {
        label: 'Percentage difference',
        hint: 'The difference between the two values as a percentage of their average.',
      },
      originalPrice: {
        label: 'Original price',
        hint: 'The price before the discount, derived from the final price and the discount rate.',
      },
    },
    resultTitle: 'Results',
    formula:
      'Price after discount = original \u00d7 (1 \u2212 rate). Discount amount = original \u00d7 rate. Percentage change = (B \u2212 A) \u00f7 A \u00d7 100. Percentage difference = |A \u2212 B| \u00f7 ((A + B) \u00f7 2) \u00d7 100.',
    exampleHtml:
      '<p>Example using the calculator\u2019s values: an item with an original price of <strong>1,000 UAE dirhams</strong> at a <strong>20%</strong> discount.<br>The discount amount is <strong>200 dirhams</strong>.<br>The price after discount is <strong>800 dirhams</strong>.</p>',
    assumptions: [
      'Standard mathematical formulas are used, without extra commercial considerations.',
      'In the percentage-change mode, the first value is used as the base.',
      'Percentage difference is calculated from the average of the two values and is always positive.',
      'Prices are treated at their nominal value, without tax or additional discounts unless included in the inputs.',
    ],
    whenUseful:
      'Use it when shopping and comparing offers to find the final price after discounts, when analysing price increases or decreases between two periods, or when you need to work out the original price behind a discounted figure.',
    mistakes: [
      'Applying the discount to the final price instead of the original price.',
      'Mixing up percentage change and percentage difference: the first uses the first value as the base, the second uses the average of the two values.',
      'Assuming consecutive discounts add up, while a 10% then 10% discount is not equal to 20%.',
      'Believing that an increase and a decrease by the same percentage return a value to its original amount.',
    ],
    faqs: [
      {
        q: 'Why is 10% then 10% not the same as a single 20% discount?',
        a: 'Because the second discount applies to the already-discounted price, leaving you at 81% of the original rather than 80%.',
      },
      {
        q: 'How do I work out the original price from the final price?',
        a: 'Divide the final price by (1 \u2212 discount rate), which is what the calculator does in the \u201coriginal price\u201d mode.',
      },
      {
        q: 'What is the difference between percentage change and percentage difference?',
        a: 'Percentage change compares the second value with the first as the base, while percentage difference compares the two values with their average and is always positive.',
      },
      {
        q: 'Do the results include VAT?',
        a: 'No, the calculator works exactly on the prices you enter; tax is calculated separately.',
      },
    ],
    methodologyNote:
      'The calculator uses standard percentage and discount formulas: calculations on the original price for discounts, the first value as the base for percentage change, and the average for percentage difference. Results are estimates for general purposes. Tax and commercial rounding rules may vary by country, so verify with the relevant authorities when needed.',
    disclaimerNote:
      'Results are estimates for informational purposes only and do not constitute financial or binding pricing advice.',
    lastReviewed: '2026-08-09',
    currencyDefault: 'AED',
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
