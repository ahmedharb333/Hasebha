import type { CalcContent, FieldContent } from '../../lib/calculators/types';
import type { Locale } from '../../config/site';

const UNIT_LABELS: Record<string, { ar: string; en: string }> = {
  mm: { ar: 'ملم', en: 'mm' },
  cm: { ar: 'سم', en: 'cm' },
  m: { ar: 'م', en: 'm' },
  km: { ar: 'كم', en: 'km' },
  in: { ar: 'بوصة', en: 'in' },
  ft: { ar: 'قدم', en: 'ft' },
  yd: { ar: 'ياردة', en: 'yd' },
  mi: { ar: 'ميل', en: 'mi' },
  mg: { ar: 'ملغ', en: 'mg' },
  g: { ar: 'غ', en: 'g' },
  kg: { ar: 'كغ', en: 'kg' },
  tonne: { ar: 'طن', en: 'tonne' },
  oz: { ar: 'أوقية', en: 'oz' },
  lb: { ar: 'رطل', en: 'lb' },
  stone: { ar: 'ستون', en: 'stone' },
  mm2: { ar: 'ملم²', en: 'mm²' },
  cm2: { ar: 'سم²', en: 'cm²' },
  m2: { ar: 'م²', en: 'm²' },
  hectare: { ar: 'هكتار', en: 'hectare' },
  km2: { ar: 'كم²', en: 'km²' },
  in2: { ar: 'بوصة²', en: 'in²' },
  ft2: { ar: 'قدم²', en: 'ft²' },
  yd2: { ar: 'ياردة²', en: 'yd²' },
  acre: { ar: 'فدان', en: 'acre' },
  ml: { ar: 'مل', en: 'ml' },
  l: { ar: 'لتر', en: 'l' },
  cm3: { ar: 'سم³', en: 'cm³' },
  m3: { ar: 'م³', en: 'm³' },
  gal: { ar: 'جالون', en: 'gal' },
  qt: { ar: 'كوارت', en: 'qt' },
  floz: { ar: 'أونصة سائلة', en: 'fl oz' },
  tsp: { ar: 'ملعقة صغيرة', en: 'tsp' },
  tbsp: { ar: 'ملعقة كبيرة', en: 'tbsp' },
  celsius: { ar: 'مئوية', en: 'Celsius' },
  fahrenheit: { ar: 'فهرنهايت', en: 'Fahrenheit' },
  kelvin: { ar: 'كلفن', en: 'Kelvin' },
};

const CATEGORY_CODES: Record<string, string[]> = {
  length: ['mm', 'cm', 'm', 'km', 'in', 'ft', 'yd', 'mi'],
  weight: ['mg', 'g', 'kg', 'tonne', 'oz', 'lb', 'stone'],
  temperature: ['celsius', 'fahrenheit', 'kelvin'],
  area: ['mm2', 'cm2', 'm2', 'hectare', 'km2', 'in2', 'ft2', 'yd2', 'acre'],
  volume: ['ml', 'l', 'cm3', 'm3', 'gal', 'qt', 'floz', 'tsp', 'tbsp'],
};

const CATEGORY_LABELS: Record<string, { ar: string; en: string }> = {
  length: { ar: 'طول', en: 'Length' },
  weight: { ar: 'وزن', en: 'Weight' },
  temperature: { ar: 'حرارة', en: 'Temperature' },
  area: { ar: 'مساحة', en: 'Area' },
  volume: { ar: 'حجم', en: 'Volume' },
};

function buildFields(locale: Locale): Record<string, FieldContent> {
  const fields: Record<string, FieldContent> = {
    value: {
      label: locale === 'ar' ? 'القيمة' : 'Value',
      hint: locale === 'ar' ? 'الرقم الذي تريد تحويله.' : 'The number you want to convert.',
    },
    category: {
      label: locale === 'ar' ? 'الفئة' : 'Category',
      hint: locale === 'ar' ? 'اختر فئة الوحدات المراد التحويل بينها.' : 'Choose the category of units to convert between.',
      options: Object.fromEntries(Object.keys(CATEGORY_CODES).map((c) => [c, CATEGORY_LABELS[c][locale]])),
    },
  };
  for (const cat of Object.keys(CATEGORY_CODES)) {
    const options = Object.fromEntries(CATEGORY_CODES[cat].map((code) => [code, UNIT_LABELS[code][locale]]));
    fields[`from${cat}`] = {
      label: locale === 'ar' ? 'من وحدة' : 'From unit',
      hint: locale === 'ar' ? 'الوحدة التي تبدأ بها.' : 'The unit you start from.',
      options,
    };
    fields[`to${cat}`] = {
      label: locale === 'ar' ? 'إلى وحدة' : 'To unit',
      hint: locale === 'ar' ? 'الوحدة المستهدفة للتحويل.' : 'The target unit to convert to.',
      options,
    };
  }
  return fields;
}

const content: Record<Locale, CalcContent> = {
  ar: {
    locale: 'ar',
    slug: 'unit-converter',
    title: 'محول الوحدات',
    metaDescription:
      'حوّل بسهولة بين وحدات الطول والوزن والحرارة والمساحة والحجم، وشاهد جدولاً بكل التحويلات الممكنة.',
    h1: 'محول الوحدات',
    intro:
      'يحوّل هذا المحول القيم بين وحدات من نفس الفئة: الطول أو الوزن أو الحرارة أو المساحة أو الحجم. التحويلات مضبوطة بدقة على عوامل ثابتة، باستثناء الحرارة التي تعتمد علاقة خطية خاصة (مئوية ↔ فهرنهايت ↔ كلفن).',
    fields: buildFields('ar'),
    errorMessages: {
      required: 'هذا الحقل مطلوب.',
      invalid: 'يرجى إدخال قيمة صحيحة أو اختيار وحدتين مختلفتين.',
      min: 'القيمة المدخلة أقل من الحد الأدنى المسموح.',
      max: 'القيمة المدخلة أكبر من الحد الأقصى المسموح.',
      __generic: 'تعذّر إتمام الحساب، تحقق من المدخلات.',
    },
    results: {
      convertedValue: {
        label: 'القيمة المحوّلة',
        hint: 'بالوحدة المستهدفة المختارة أعلاه.',
        hero: true,
      },
    },
    table: {
      title: 'جميع التحويلات',
      columns: { unit: 'الوحدة', value: 'القيمة' },
      caption: 'كل تحويلات القيمة المدخلة في فئة الوحدات المختارة.',
      strings: Object.fromEntries(Object.entries(UNIT_LABELS).map(([code, l]) => [code, l.ar])),
    },
    resultTitle: 'النتائج',
    formula:
      'التحويل = القيمة × معامل الوحدة المصدر ÷ معامل الوحدة الهدف (للحرارة: علاقة إزاحة خطية خاصة).',
    exampleHtml:
      '<p>مثال بقيم الحاسبة: <strong>1000</strong> من <strong>م</strong> إلى <strong>كم</strong>.<br>الناتج <strong>1</strong> كم، ويبين الجدول أن 1000 م = <strong>1,000,000</strong> ملم.</p>',
    assumptions: [
      'الوحدتان يجب أن تكونا من نفس الفئة (لا يمكن تحويل كيلوغرام إلى لتر).',
      'معاملات التحويل دقيقة لعوامل النظام الدولي أو المعتمدة في النظام الإمبراطوري.',
      'يُستخدم الجالون الأمريكي (وليس الإمبراطوري).',
      'جدول جميع التحويلات يعرض القيمة لكل وحدة في الفئة المختارة.',
    ],
    whenUseful:
      'استخدمها في وصفات الطبخ (مل/ل)، أو عند شراء الأراضي أو البناء (م²/فدان)، أو في الرياضة والحمية (كغ/رطل)، أو عند تحويل درجة الحرارة بين المقاييس.',
    mistakes: [
      'الخلط بين الجالون الأمريكي والإمبراطوري — تستخدم الحاسبة الجالون الأمريكي.',
      'محاولة تحويل وحدات من فئات مختلفة (مثل الباوند إلى اللتر).',
      'تجاهل أن درجات مئوية وكلفن تبدأ من نقطة صفر مختلفة، فهي ليست معامل ثابت.',
      'اختيار نفس الوحدة للتحويل من وإلى — يمنع الحساب ذلك ويعرض خطأ.',
    ],
    faqs: [
      {
        q: 'لماذا لا يمكنني تحويل الباوند إلى اللتر؟',
        a: 'الباوند وحدة وزن واللتر وحدة حجم، وهما فئتان مختلفتان. لا يمكن التحويل إلا بين وحدات من نفس الفئة.',
      },
      {
        q: 'هل وحدة الستون إمبراطورية؟',
        a: 'نعم، الستون وحدة وزن بريطانية تساوي 14 رطلاً (6.35 كغ)، ما تزال شائعة في المملكة المتحدة.',
      },
      {
        q: 'لماذا تعرض الحاسبة درجة الحرارة بعمليات جمع وطرح وليست ضرباً وقسمة فقط؟',
        a: 'لأن مقياس كلفن يبدأ من الصفر المطلق بينما مئوية وفهرنهايت لهما نقطة صفر مختلفة، فالعلاقة خطية بإزاحة وليست نسبة ثابتة.',
      },
    ],
    methodologyNote:
      'تستخدم الحاسبة عوامل تحويل ثابتة من النظام الدولي للوحدات وتطبقها حول وحدة أساس (المتر/الكيلوغرام/اللتر)، وتعامل الحرارة بعلاقة إزاحة خطية خاصة. النتائج تُقرّب للعرض وقد تحمل فوارق ضئيلة جداً.',
    disclaimerNote:
      'النسب القياسية كما هي معتمدة عالمياً؛ تبقى بعض الوحدات المحلية (مثل الفدان) تختلف بين الدول.',
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
    guideTitle: 'كيف تحوّل الوحدات',
    relatedTitle: 'حاسبات ذات صلة',
  },

  en: {
    locale: 'en',
    slug: 'unit-converter',
    title: 'Unit converter',
    metaDescription:
      'Easily convert between units of length, weight, temperature, area and volume, and see a table of every conversion.',
    h1: 'Unit converter',
    intro:
      'This converter transforms values between units of the same category: length, weight, temperature, area or volume. Conversions are precise using fixed factors, except temperature which uses a special affine relationship (Celsius \u2194 Fahrenheit \u2194 Kelvin).',
    fields: buildFields('en'),
    errorMessages: {
      required: 'This field is required.',
      invalid: 'Please enter a valid value or choose two different units.',
      min: 'The entered value is below the allowed minimum.',
      max: 'The entered value exceeds the allowed maximum.',
      __generic: 'Could not complete the calculation. Please check your inputs.',
    },
    results: {
      convertedValue: {
        label: 'Converted value',
        hint: 'In the selected target unit.',
        hero: true,
      },
    },
    table: {
      title: 'All conversions',
      columns: { unit: 'Unit', value: 'Value' },
      caption: 'Every conversion of the entered value within the chosen unit category.',
      strings: Object.fromEntries(Object.entries(UNIT_LABELS).map(([code, l]) => [code, l.en])),
    },
    resultTitle: 'Results',
    formula:
      'Conversion = value \u00d7 source-unit factor \u00f7 target-unit factor (temperature uses a special affine offset).',
    exampleHtml:
      '<p>Example using the calculator\u2019s values: <strong>1000</strong> from <strong>m</strong> to <strong>km</strong>.<br>The result is <strong>1</strong> km, and the table shows 1000 m = <strong>1,000,000</strong> mm.</p>',
    assumptions: [
      'Both units must belong to the same category (you cannot convert kilograms to litres).',
      'Conversion factors are precise to SI factors or established imperial ones.',
      'The US gallon is used (not the imperial gallon).',
      'The all-conversions table shows the value in every unit of the chosen category.',
    ],
    whenUseful:
      'Use it for cooking recipes (ml/l), buying land or construction (m\u00b2/acre), sport and dieting (kg/lb), or converting temperatures between scales.',
    mistakes: [
      'Confusing the US gallon with the imperial gallon \u2014 the calculator uses the US gallon.',
      'Trying to convert units from different categories (such as pounds to litres).',
      'Forgetting that Celsius and Kelvin start from different zero points, so the relationship is not a constant factor.',
      'Picking the same unit for both sides \u2014 the calculator blocks it with an error.',
    ],
    faqs: [
      {
        q: 'Why can\u2019t I convert pounds to litres?',
        a: 'Pounds measure weight and litres measure volume \u2014 they are different categories. Conversion is only possible between units of the same category.',
      },
      {
        q: 'Is the stone unit imperial?',
        a: 'Yes. The stone is a British weight unit equal to 14 pounds (6.35 kg), still common in the UK.',
      },
      {
        q: 'Why does temperature use addition and subtraction rather than only multiplication?',
        a: 'Because Kelvin starts at absolute zero while Celsius and Fahrenheit have a different zero point, so the relationship is affine rather than a constant ratio.',
      },
    ],
    methodologyNote:
      'The calculator uses fixed conversion factors from the International System of Units applied around a base unit (metre/kilogram/litre), and handles temperature with a special affine relationship. Results are rounded for display and may carry tiny differences.',
    disclaimerNote:
      'Standard ratios are as adopted globally; some local units (such as acre-equivalents) differ between countries.',
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
    guideTitle: 'How to convert units',
    relatedTitle: 'Related calculators',
  },
};

export default content;
