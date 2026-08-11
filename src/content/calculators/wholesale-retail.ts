import type { CalcContent } from '../../lib/calculators/types';
import type { Locale } from '../../config/site';

const content: Record<Locale, CalcContent> = {
  ar: {
    locale: 'ar',
    slug: 'wholesale-retail',
    title: 'حاسبة سعر الجملة والتجزئة',
    metaDescription:
      'حدد سعر التجزئة من تكلفة الجملة ونسبة الترميز، واعرف ربحك على كل وحدة.',
    h1: 'حاسبة سعر الجملة والتجزئة',
    intro:
      'لتجار الجملة والتجزئة: تُحدد هذه الأداة سعر التجزئة المقترح من تكلفة الجملة ونسبة الترميز على كل وحدة، مع عرض الربح الذي تحققه من كل وحدة. النسبة هنا تُحسب من التكلفة (ترميز) وليس من سعر البيع (هامش).',
    fields: {
      cost: {
        label: 'تكلفة الجملة',
        hint: 'تكلفة شراء الوحدة الواحدة من المورد أو الجملة.',
      },
      markupPct: {
        label: 'نسبة الترميز (%)',
        hint: 'النسبة المئوية من التكلفة التي تضيفها كربح.',
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
      sellingPrice: {
        label: 'سعر التجزئة المقترح',
        hint: 'تكلفة الجملة مضافاً إليها نسبة الترميز.',
        hero: true,
      },
      profit: {
        label: 'الربح على الوحدة',
        hint: 'سعر التجزئة ناقص تكلفة الجملة.',
      },
    },
    resultTitle: 'النتائج',
    formula: 'سعر التجزئة = تكلفة الجملة × (1 + نسبة الترميز ÷ 100). الربح على الوحدة = سعر التجزئة − التكلفة.',
    exampleHtml:
      '<p>مثال بقيم الحاسبة: تكلفة جملة <strong>15</strong> وترميز <strong>60%</strong>.<br>سعر التجزئة المقترح <strong>24</strong>، والربح على الوحدة <strong>9</strong>.</p>',
    assumptions: [
      'نسبة الترميز تُحسب من التكلفة وليس من سعر البيع.',
      'المدخلات لكل وحدة واحدة، وليس للدفعة كاملة.',
      'النتيجة قبل الضرائب مثل ضريبة القيمة المضافة.',
      'العملة لتنسيق العرض فقط، ولا يوجد تحويل.',
    ],
    whenUseful:
      'استخدمها عند تسعير بضاعة اشتريتها جملة لمعرفة السعر الذي تحققه الربح المطلوب، أو لضبط نسبة الترميز لتوفيق سعر تنافسي.',
    mistakes: [
      'إدخال هامش الربح (نسبة من سعر البيع) مكان الترميز (نسبة من التكلفة) — الرقمان مختلفان.',
      'تطبيق الترميز على الدفعة كاملة بدلاً من الوحدة الواحدة.',
      'نسيان إضافة الضرائب أو الرسوم إلى السعر النهائي المعروض للعميل.',
    ],
    faqs: [
      {
        q: 'كيف أختار نسبة الترميز المناسبة؟',
        a: 'أضف هامشاً يغطي تكاليفك التشغيلية ويربحك، مع مراعاة أسعار المنافسين وقيمة ما تقدمه للعميل. لا توجد نسبة واحدة صحيحة.',
      },
      {
        q: 'هل يشمل السعر ضريبة القيمة المضافة؟',
        a: 'لا. الحاسبة تعطي السعر قبل الضريبة، وعليك إضافة الضريبة المطبقة في بلدك عند العرض للعميل.',
      },
    ],
    methodologyNote:
      'تحسب الحاسبة سعر التجزئة بضرب تكلفة الوحدة في (1 + الترميز)، وخصم التكلفة من السعر لإظهار الربح على الوحدة.',
    disclaimerNote:
      'السعر اقتراح يبدأ من التكلفة والترميز؛ قد تحتاج تعديله وفق السوق والعرض والطلب.',
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
    guideTitle: 'كيف تسعّر الجملة والتجزئة',
    relatedTitle: 'حاسبات ذات صلة',
  },

  en: {
    locale: 'en',
    slug: 'wholesale-retail',
    title: 'Wholesale to retail calculator',
    metaDescription:
      'Set a retail price from wholesale cost and a markup percentage, and see your profit per unit.',
    h1: 'Wholesale to retail calculator',
    intro:
      'For wholesalers and retailers: this tool sets a suggested retail price from your wholesale cost and a markup percentage per unit, and shows the profit you make on each unit. The percentage here is based on cost (markup), not on selling price (margin).',
    fields: {
      cost: {
        label: 'Wholesale cost',
        hint: 'What it costs to buy one unit from the supplier or wholesaler.',
      },
      markupPct: {
        label: 'Markup percentage (%)',
        hint: 'The percentage of cost you add as profit.',
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
      sellingPrice: {
        label: 'Suggested retail price',
        hint: 'Wholesale cost plus the markup percentage.',
        hero: true,
      },
      profit: {
        label: 'Profit per unit',
        hint: 'Retail price minus wholesale cost.',
      },
    },
    resultTitle: 'Results',
    formula:
      'Retail price = wholesale cost \u00d7 (1 + markup percentage \u00f7 100). Profit per unit = retail price \u2212 cost.',
    exampleHtml:
      '<p>Example using the calculator\u2019s values: wholesale cost <strong>15</strong>, markup <strong>60%</strong>.<br>The suggested retail price is <strong>24</strong>, and the profit per unit is <strong>9</strong>.</p>',
    assumptions: [
      'The markup is based on cost, not on selling price.',
      'The inputs are per single unit, not for the whole batch.',
      'The result is before taxes such as VAT.',
      'The currency is display-only; there is no conversion.',
    ],
    whenUseful:
      'Use it when pricing goods you bought wholesale to find the price that earns your target profit, or to tune the markup to stay competitive.',
    mistakes: [
      'Entering the margin (a percentage of the selling price) where markup is meant (a percentage of cost) \u2014 the two figures differ.',
      'Applying the markup to the whole batch instead of per unit.',
      'Forgetting to add taxes or fees to the final price shown to the customer.',
    ],
    faqs: [
      {
        q: 'How do I choose the right markup percentage?',
        a: 'Add enough margin to cover your operating costs and earn profit, while considering competitor prices and the value you offer. There is no single right percentage.',
      },
      {
        q: 'Does the price include VAT?',
        a: 'No. The calculator gives the pre-tax price; add the tax applied in your country when pricing for the customer.',
      },
    ],
    methodologyNote:
      'The calculator computes the retail price by multiplying the unit cost by (1 + markup), and subtracts the cost from the price to show profit per unit.',
    disclaimerNote:
      'The price is a suggestion starting from cost and markup; you may need to adjust it for market, supply and demand.',
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
    guideTitle: 'How to price wholesale and retail',
    relatedTitle: 'Related calculators',
  },
};

export default content;
