import type { CalcContent } from '../../lib/calculators/types';
import type { Locale } from '../../config/site';

const content: Record<Locale, CalcContent> = {
  ar: {
    locale: 'ar',
    slug: 'markup-margin',
    title: 'حاسبة الربح والتكلفة والهامش',
    metaDescription:
      'احسب الربح ونسبة الترميز (markup) وهامش الربح (margin) من التكلفة وسعر البيع، وفهم الفرق بينهما.',
    h1: 'حاسبة الربح والتكلفة والهامش',
    intro:
      'نسبة الترميز وهامش الربح مقياسان مختلفان لنفس الربح، وخلطهما خطأ تسعير شائع. تحسب هذه الأداة الربح من التكلفة وسعر البيع، ثم تعرض الترميز (نسبة من التكلفة) والهامش (نسبة من سعر البيع) معاً لتفهم الفرق بينهما.',
    fields: {
      cost: {
        label: 'التكلفة',
        hint: 'تكلفة شراء أو إنتاج السلعة أو الخدمة.',
      },
      sellingPrice: {
        label: 'سعر البيع',
        hint: 'السعر الذي تبيع به السلعة أو الخدمة.',
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
      profit: {
        label: 'الربح',
        hint: 'سعر البيع ناقص التكلفة.',
        hero: true,
      },
      markupPct: {
        label: 'نسبة الترميز (من التكلفة)',
        hint: 'الربح مقسوماً على التكلفة × 100.',
      },
      marginPct: {
        label: 'هامش الربح (من سعر البيع)',
        hint: 'الربح مقسوماً على سعر البيع × 100.',
      },
    },
    resultTitle: 'النتائج',
    formula:
      'الربح = سعر البيع − التكلفة. الترميز = الربح ÷ التكلفة × 100. الهامش = الربح ÷ سعر البيع × 100.',
    exampleHtml:
      '<p>مثال بقيم الحاسبة: تكلفة <strong>80</strong> وسعر بيع <strong>120</strong>.<br>الربح <strong>40</strong>، الترميز <strong>50%</strong>، والهامش <strong>33.3%</strong>.</p>',
    assumptions: [
      'التكلفة وسعر البيع لكل وحدة واحدة.',
      'الترميز يُحسب من التكلفة، والهامش من سعر البيع.',
      'إذا كان الربح سالباً تظهر النسبتان سالبتين (خسارة).',
      'العملة لتنسيق العرض فقط، ولا يوجد تحويل.',
    ],
    whenUseful:
      'استخدمها عند تسعير منتج أو خدمة لمعرفة كم تربح فعلياً، ولمقارنة عروض التوريد أو أسعار المنافسين على أساس موحّد.',
    mistakes: [
      'استخدام الهامش حيث يُقصد الترميز والعكس، لأن المقام مختلف.',
      'القسمة على المقام الخطأ: الترميز من التكلفة والهامش من سعر البيع.',
      'الظن أن ترميز 50% يعني هامش 50% — هامشها 33.3% فقط.',
    ],
    faqs: [
      {
        q: 'أي الرقمين أستخدم للتسعير: الترميز أم الهامش؟',
        a: 'كلاهما يعبر عن نفس الربح بقاعدتين مختلفتين. استخدم الترميز عندما تبدأ من التكلفة وتضيف نسبة، والهامش عندما تعرف الربح الذي تريده من سعر البيع.',
      },
      {
        q: 'هل يمكن أن تكون النسبتان سالبتين؟',
        a: 'نعم، عندما يقل سعر البيع عن التكلفة يكون الربح سالباً وتظهر النسبتان سالبتين (خسارة).',
      },
    ],
    methodologyNote:
      'تحسب الحاسبة الربح أولاً ثم تقسمه على التكلفة للترميز وعلى سعر البيع للهامش، دون أي تقريب داخلي.',
    disclaimerNote:
      'التكاليف غير المباشرة (مثل النقل والإيجار) ليست جزءاً من هذا الحساب ما لم تُضمّن في التكلفة المدخلة.',
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
    guideTitle: 'كيف تحسب الترميز والهامش',
    relatedTitle: 'حاسبات ذات صلة',
  },

  en: {
    locale: 'en',
    slug: 'markup-margin',
    title: 'Markup & margin calculator',
    metaDescription:
      'Compute profit, markup percentage and margin percentage from cost and selling price, and understand the difference.',
    h1: 'Markup & margin calculator',
    intro:
      'Markup and margin are two different measures of the same profit, and mixing them up is a common pricing mistake. This tool computes the profit from cost and selling price, then shows both the markup (a percentage of cost) and the margin (a percentage of selling price) side by side so you understand how they differ.',
    fields: {
      cost: {
        label: 'Cost',
        hint: 'Your cost to buy or produce the item or service.',
      },
      sellingPrice: {
        label: 'Selling price',
        hint: 'The price you sell the item or service at.',
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
      profit: {
        label: 'Profit',
        hint: 'Selling price minus cost.',
        hero: true,
      },
      markupPct: {
        label: 'Markup (on cost)',
        hint: 'Profit divided by cost \u00d7 100.',
      },
      marginPct: {
        label: 'Margin (on selling price)',
        hint: 'Profit divided by selling price \u00d7 100.',
      },
    },
    resultTitle: 'Results',
    formula:
      'Profit = selling price \u2212 cost. Markup = profit \u00f7 cost \u00d7 100. Margin = profit \u00f7 selling price \u00d7 100.',
    exampleHtml:
      '<p>Example using the calculator\u2019s values: cost <strong>80</strong>, selling price <strong>120</strong>.<br>Profit <strong>40</strong>, markup <strong>50%</strong>, and margin <strong>33.3%</strong>.</p>',
    assumptions: [
      'Cost and selling price are per single unit.',
      'Markup is based on cost; margin is based on selling price.',
      'If profit is negative both percentages show as negative (a loss).',
      'The currency is display-only; there is no conversion.',
    ],
    whenUseful:
      'Use it when pricing a product or service to see how much you actually earn, and to compare supplier offers or competitor prices on a consistent basis.',
    mistakes: [
      'Using margin where markup is intended and vice versa, because the base differs.',
      'Dividing by the wrong base: markup from cost, margin from selling price.',
      'Assuming a 50% markup means a 50% margin \u2014 its margin is only 33.3%.',
    ],
    faqs: [
      {
        q: 'Which number should I use for pricing: markup or margin?',
        a: 'Both express the same profit on different bases. Use markup when you start from cost and add a percentage, and margin when you know the profit you want from the selling price.',
      },
      {
        q: 'Can both percentages be negative?',
        a: 'Yes. When the selling price is below cost, profit is negative and both percentages show as negative (a loss).',
      },
    ],
    methodologyNote:
      'The calculator computes profit first, then divides it by cost for markup and by selling price for margin, with no internal rounding.',
    disclaimerNote:
      'Indirect costs (such as shipping and rent) are not part of this calculation unless included in the cost entered.',
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
    guideTitle: 'How to calculate markup and margin',
    relatedTitle: 'Related calculators',
  },
};

export default content;
