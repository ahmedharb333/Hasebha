import type { CalcContent } from '../../lib/calculators/types';
import type { Locale } from '../../config/site';

const content: Record<Locale, CalcContent> = {
  ar: {
    locale: 'ar',
    slug: 'break-even',
    title: 'حاسبة نقطة التعادل',
    metaDescription:
      'احسب عدد الوحدات التي يجب بيعها لتغطية التكاليف الثابتة والمتغيرة والوصول إلى نقطة التعادل، وإيراد نقطة التعادل.',
    h1: 'حاسبة نقطة التعادل',
    intro:
      'نقطة التعادل هي عدد الوحدات التي يجب بيعها حتى تغطي الإيرادات كل التكاليف دون ربح أو خسارة. تحسب هذه الأداة الوحدات المطلوبة وإيراد نقطة التعادل وهامش المساهمة لكل وحدة، بافتراض تكاليف خطية ثابتة لكل وحدة.',
    fields: {
      fixedCosts: {
        label: 'التكاليف الثابتة',
        hint: 'التكاليف التي لا تتغير مع حجم المبيعات (إيجار، رواتب ثابتة، معدات).',
      },
      unitPrice: {
        label: 'سعر الوحدة',
        hint: 'السعر الذي تبيع به كل وحدة.',
      },
      unitVariableCost: {
        label: 'التكلفة المتغيرة للوحدة',
        hint: 'تكلفة إنتاج كل وحدة إضافية (خامات، عمالة متغيرة).',
      },
    },
    errorMessages: {
      required: 'هذا الحقل مطلوب.',
      invalid: 'سعر الوحدة يجب أن يزيد عن التكلفة المتغيرة للوحدة.',
      min: 'القيمة المدخلة أقل من الحد الأدنى المسموح.',
      max: 'القيمة المدخلة أكبر من الحد الأقصى المسموح.',
      __generic: 'تعذّر إتمام الحساب، تحقق من المدخلات.',
    },
    results: {
      breakEvenUnits: {
        label: 'وحدات التعادل',
        hint: 'عدد الوحدات التي تحقق نقطة التعادل.',
        hero: true,
      },
      breakEvenRevenue: {
        label: 'إيراد نقطة التعادل',
        hint: 'الإيراد الكلي عند بيع وحدات التعادل.',
      },
      contributionMargin: {
        label: 'هامش المساهمة لكل وحدة',
        hint: 'سعر الوحدة ناقص التكلفة المتغيرة للوحدة.',
      },
    },
    resultTitle: 'النتائج',
    formula:
      'وحدات التعادل = التكاليف الثابتة ÷ (سعر الوحدة − التكلفة المتغيرة للوحدة). الإيراد = وحدات التعادل × سعر الوحدة.',
    exampleHtml:
      '<p>مثال بقيم الحاسبة: تكاليف ثابتة <strong>10,000</strong>، سعر الوحدة <strong>50</strong>، وتكلفة متغيرة <strong>30</strong>.<br>هامش المساهمة <strong>20</strong>، ووحدات التعادل <strong>500</strong>، وإيراد التعادل <strong>25,000</strong>.</p>',
    assumptions: [
      'التكاليف الثابتة لا تتغير مع حجم المبيعات في المدى المدروس.',
      'التكاليف المتغيرة ثابتة لكل وحدة (علاقة خطية).',
      'كل وحدة تُباع بالسعر نفسه، وتُفترض جميعها تُباع.',
      'سعر الوحدة يجب أن يزيد عن تكلفتها المتغيرة، وإلا فلا نقطة تعادل.',
    ],
    whenUseful:
      'استخدمها قبل إطلاق منتج أو خدمة لتعرف كم تحتاج أن تبيع لتغطية تكاليفك، ولتقييم أثر تغيير السعر أو خفض التكاليف.',
    mistakes: [
      'نسيان التكاليف المتغيرة والاعتماد على سعر الوحدة وحده.',
      'استخدام الإيراد الكلي بدلاً من سعر الوحدة في المقام.',
      'اختيار سعر وحدة أقل من التكلفة المتغيرة — تمنعه الحاسبة بعرض خطأ.',
      'الظن أن الوحدات يجب أن تكون عدداً صحيحاً دائماً؛ النتيجة قد تكون كسراً.',
    ],
    faqs: [
      {
        q: 'ماذا لو لم أصل إلى نقطة التعادل؟',
        a: 'أنت تخسر لأن الإيراد لا يغطي التكاليف. جرّب رفع السعر أو خفض التكاليف أو زيادة حجم المبيعات، وراقب كيف تتغير وحدات التعادل.',
      },
      {
        q: 'هل تشمل التكاليف الثابتة الرواتب؟',
        a: 'نعم إذا كانت رواتب ثابتة لا تتغير مع المبيعات. الرواتب المتغيرة (مثل العمولات) تُدخل ضمن التكلفة المتغيرة للوحدة.',
      },
    ],
    methodologyNote:
      'تحسب الحاسبة هامش المساهمة (سعر الوحدة ناقص التكلفة المتغيرة) ثم تقسم التكاليف الثابتة عليه، بافتراض علاقة خطية بين التكاليف وحجم المبيعات.',
    disclaimerNote:
      'في الواقع قد تتغير التكاليف عند أحجام معينة، والنتيجة تقديرية ضمن المدى الخطي المفترض.',
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
    guideTitle: 'كيف تحسب نقطة التعادل',
    relatedTitle: 'حاسبات ذات صلة',
  },

  en: {
    locale: 'en',
    slug: 'break-even',
    title: 'Break-even calculator',
    metaDescription:
      'Calculate the units you need to sell to cover fixed and variable costs and reach break-even, plus break-even revenue.',
    h1: 'Break-even calculator',
    intro:
      'The break-even point is the number of units you must sell until revenue covers all costs with neither profit nor loss. This tool computes the units required, the break-even revenue and the contribution margin per unit, assuming linear per-unit costs.',
    fields: {
      fixedCosts: {
        label: 'Fixed costs',
        hint: 'Costs that do not change with sales volume (rent, fixed salaries, equipment).',
      },
      unitPrice: {
        label: 'Price per unit',
        hint: 'The price you sell each unit at.',
      },
      unitVariableCost: {
        label: 'Variable cost per unit',
        hint: 'The cost of producing each extra unit (materials, variable labour).',
      },
    },
    errorMessages: {
      required: 'This field is required.',
      invalid: 'The price per unit must exceed the variable cost per unit.',
      min: 'The entered value is below the allowed minimum.',
      max: 'The entered value exceeds the allowed maximum.',
      __generic: 'Could not complete the calculation. Please check your inputs.',
    },
    results: {
      breakEvenUnits: {
        label: 'Break-even units',
        hint: 'The number of units that reach the break-even point.',
        hero: true,
      },
      breakEvenRevenue: {
        label: 'Break-even revenue',
        hint: 'Total revenue when selling the break-even units.',
      },
      contributionMargin: {
        label: 'Contribution margin per unit',
        hint: 'Price per unit minus variable cost per unit.',
      },
    },
    resultTitle: 'Results',
    formula:
      'Break-even units = fixed costs \u00f7 (price per unit \u2212 variable cost per unit). Revenue = break-even units \u00d7 price per unit.',
    exampleHtml:
      '<p>Example using the calculator\u2019s values: fixed costs <strong>10,000</strong>, price <strong>50</strong>, variable cost <strong>30</strong>.<br>Contribution margin <strong>20</strong>, break-even units <strong>500</strong>, and break-even revenue <strong>25,000</strong>.</p>',
    assumptions: [
      'Fixed costs stay constant with sales volume within the studied range.',
      'Variable costs are constant per unit (a linear relationship).',
      'Every unit sells at the same price, and all units are assumed sold.',
      'The price per unit must exceed its variable cost, otherwise there is no break-even point.',
    ],
    whenUseful:
      'Use it before launching a product or service to know how many units you need to sell to cover costs, and to assess the impact of changing the price or cutting costs.',
    mistakes: [
      'Forgetting variable costs and relying on the unit price alone.',
      'Using total revenue instead of the per-unit price in the denominator.',
      'Setting a price below the variable cost \u2014 the calculator blocks it with an error.',
      'Assuming the units must always be a whole number; the result can be fractional.',
    ],
    faqs: [
      {
        q: 'What if I never reach break-even?',
        a: 'You are losing money because revenue does not cover costs. Try raising the price, cutting costs or increasing sales volume, and watch how break-even units change.',
      },
      {
        q: 'Do fixed costs include salaries?',
        a: 'Yes, if they are fixed and do not change with sales. Variable salaries (such as commissions) belong in the variable cost per unit.',
      },
    ],
    methodologyNote:
      'The calculator computes the contribution margin (price per unit minus variable cost) then divides fixed costs by it, assuming a linear relationship between costs and sales volume.',
    disclaimerNote:
      'Costs can change at certain volumes in reality, and the result is an estimate within the assumed linear range.',
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
    guideTitle: 'How to calculate break-even',
    relatedTitle: 'Related calculators',
  },
};

export default content;
