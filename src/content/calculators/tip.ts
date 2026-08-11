import type { CalcContent } from '../../lib/calculators/types';
import type { Locale } from '../../config/site';

const content: Record<Locale, CalcContent> = {
  ar: {
    locale: 'ar',
    slug: 'tip',
    title: 'حاسبة الإكرامية',
    metaDescription:
      'احسب الإكرامية وإجمالي الفاتورة بسرعة، وقسّم المبلغ بين عدد من الأشخاص بضغطة زر.',
    h1: 'حاسبة الإكرامية',
    intro:
      'الإكرامية نسبة مئوية تُضاف إلى قيمة الفاتورة. تحسب لك هذه الأداة قيمة الإكرامية والإجمالي النهائي، مع إمكانية تقسيم المبلغ بين عدد من الأشخاص بسهولة.',
    fields: {
      billAmount: {
        label: 'قيمة الفاتورة',
        hint: 'المبلغ قبل إضافة الإكرامية.',
      },
      tipPercent: {
        label: 'نسبة الإكرامية (%)',
        hint: 'النسبة المئوية من الفاتورة التي تريد تركها.',
      },
      people: {
        label: 'عدد الأشخاص',
        hint: 'كم شخصاً يشارك في الدفع؟ يُفترض واحداً.',
      },
      currency: {
        label: 'العملة',
        hint: 'العملة لعرض النتائج (لا تحويل بين العملات).',
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
      tipAmount: {
        label: 'الإكرامية',
        hint: 'نسبة الإكرامية مضروبة في قيمة الفاتورة.',
        hero: true,
      },
      totalWithTip: {
        label: 'الإجمالي مع الإكرامية',
        hint: 'قيمة الفاتورة زائد الإكرامية.',
      },
      perPerson: {
        label: 'نصيب كل شخص',
        hint: 'الإجمالي مقسوماً على عدد الأشخاص.',
      },
    },
    resultTitle: 'النتائج',
    formula: 'الإكرامية = الفاتورة × النسبة ÷ 100. الإجمالي = الفاتورة + الإكرامية. نصيب الشخص = الإجمالي ÷ عدد الأشخاص.',
    exampleHtml:
      '<p>مثال بقيم الحاسبة: فاتورة <strong>120</strong> وإكرامية <strong>10%</strong> لـ<strong>4</strong> أشخاص.<br>الإكرامية <strong>12</strong>، والإجمالي <strong>132</strong>، ونصيب كل شخص <strong>33</strong>.</p>',
    assumptions: [
      'الإكرامية نسبة من الفاتورة تُضاف إليها.',
      'عدد الأشخاص يُفترض 1 إن تُرك فارغاً.',
      'تقسيم النصيب مبني على الإجمالي مع الإكرامية.',
      'العملة لعرض النتائج فقط، ولا يوجد تحويل بين العملات.',
    ],
    whenUseful:
      'استخدمها عند الخروج من مطعم أو مقهى أو مع خدمة توصيل لتعرف الإكرامية المناسبة وتقسم الفاتورة بسرعة بين المجموعة.',
    mistakes: [
      'حساب الإكرامية على سعر مخفّض أو ضريبة البائع ثم إضافتها للفاتورة الأصلية.',
      'احتساب نصيب الفرد قبل إضافة الإكرامية ثم الإضافة بعد التقسيم (تضاعف الإكرامية).',
      'ظن أن تغيير العملة يحوّل المبلغ — العملة للتنسيق فقط.',
    ],
    faqs: [
      {
        q: 'هل التقسيم مبني على الإجمالي مع الإكرامية؟',
        a: 'نعم، يُقسم الإجمالي (الفاتورة + الإكرامية) على عدد الأشخاص.',
      },
      {
        q: 'هل يمكنني إدخال الإكرامية بعملة مختلفة؟',
        a: 'لا، العملة تحدد تنسيق العرض فقط ولا تُجري أي تحويل بين العملات.',
      },
    ],
    methodologyNote:
      'تحسب الحاسبة الإكرامية كنسبة من الفاتورة، وتجمعها للإجمالي، ثم تقسم الإجمالي على عدد الأشخاص (بواحد افتراضياً).',
    disclaimerNote:
      'الإكرامية عرف اجتماعي وليست إلزامية؛ اختر النسبة حسب جودة الخدمة وأعراف بلدك.',
    lastReviewed: '2026-08-10',
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
    guideTitle: 'كيف تترك إكرامية مناسبة',
    relatedTitle: 'حاسبات ذات صلة',
  },

  en: {
    locale: 'en',
    slug: 'tip',
    title: 'Tip calculator',
    metaDescription:
      'Quickly compute a tip and the total bill, and split the amount among any number of people.',
    h1: 'Tip calculator',
    intro:
      'A tip is a percentage added to the bill. This tool works out the tip amount and the final total, and lets you split the amount among any number of people with ease.',
    fields: {
      billAmount: {
        label: 'Bill amount',
        hint: 'The amount before adding the tip.',
      },
      tipPercent: {
        label: 'Tip percentage (%)',
        hint: 'The percentage of the bill you want to leave.',
      },
      people: {
        label: 'Number of people',
        hint: 'How many people share the payment? Defaults to one.',
      },
      currency: {
        label: 'Currency',
        hint: 'The currency for displaying results (no conversion between currencies).',
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
      tipAmount: {
        label: 'Tip amount',
        hint: 'The tip percentage applied to the bill.',
        hero: true,
      },
      totalWithTip: {
        label: 'Total with tip',
        hint: 'The bill plus the tip.',
      },
      perPerson: {
        label: 'Per person',
        hint: 'The total divided by the number of people.',
      },
    },
    resultTitle: 'Results',
    formula:
      'Tip = bill \u00d7 percentage \u00f7 100. Total = bill + tip. Per person = total \u00f7 number of people.',
    exampleHtml:
      '<p>Example using the calculator\u2019s values: bill <strong>120</strong> and a <strong>10%</strong> tip split between <strong>4</strong> people.<br>The tip is <strong>12</strong>, the total <strong>132</strong>, and each person pays <strong>33</strong>.</p>',
    assumptions: [
      'The tip is a percentage of the bill, added to it.',
      'The number of people defaults to 1 when left empty.',
      'The split is based on the total including the tip.',
      'The currency is for display only; there is no conversion between currencies.',
    ],
    whenUseful:
      'Use it when leaving a restaurant, cafe or delivery to work out a fair tip and split the bill quickly within a group.',
    mistakes: [
      'Computing the tip on a discounted or taxed price and then adding it to the original bill.',
      'Computing the per-person share before adding the tip and adding it again after splitting.',
      'Assuming changing the currency converts the amount \u2014 it only formats it.',
    ],
    faqs: [
      {
        q: 'Is the split based on the total with tip?',
        a: 'Yes. The total (bill + tip) is divided by the number of people.',
      },
      {
        q: 'Can I tip in a different currency?',
        a: 'No. The currency only sets the display format and performs no conversion.',
      },
    ],
    methodologyNote:
      'The calculator computes the tip as a percentage of the bill, adds it to the total, then divides the total by the number of people (defaulting to one).',
    disclaimerNote:
      'Tipping is a social convention, not an obligation; choose the percentage by service quality and local norms.',
    lastReviewed: '2026-08-10',
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
    guideTitle: 'How to tip appropriately',
    relatedTitle: 'Related calculators',
  },
};

export default content;
