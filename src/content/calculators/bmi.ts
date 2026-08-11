import type { CalcContent } from '../../lib/calculators/types';
import type { Locale } from '../../config/site';

const content: Record<Locale, CalcContent> = {
  ar: {
    locale: 'ar',
    slug: 'bmi',
    title: 'حاسبة مؤشر كتلة الجسم',
    metaDescription:
      'احسب مؤشر كتلة الجسم من وزنك وطولك بالكيلوغرام والسنتمتر أو بالباوند والمتر، واعرف نطاق الوزن الصحي.',
    h1: 'حاسبة مؤشر كتلة الجسم',
    intro:
      'مؤشر كتلة الجسم (BMI) أداة فحص سريعة تقارن وزنك بطولك، ويُحسب بقسمة الوزن بالكيلوغرام على مربع الطول بالمتر. تساعدك هذه الحاسبة على حساب مؤشرك ونطاق الوزن الصحي المناسب لطولك، مع تذكير دائم بأنه مؤشر استرشادي لا تشخيص طبي.',
    fields: {
      weight: {
        label: 'الوزن',
        hint: 'وزنك الحالي بوحدة الوزن المختارة.',
      },
      weightUnit: {
        label: 'وحدة الوزن',
        hint: 'اختر بين الكيلوغرام والباوند.',
        options: {
          kg: 'كغ',
          lb: 'باوند',
        },
      },
      height: {
        label: 'الطول',
        hint: 'طولك بوحدة الطول المختارة.',
      },
      heightUnit: {
        label: 'وحدة الطول',
        hint: 'اختر بين السنتمتر والمتر.',
        options: {
          cm: 'سم',
          m: 'متر',
        },
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
      bmi: {
        label: 'مؤشر كتلة الجسم',
        hint: 'ناتج قسمة الوزن بالكيلوغرام على مربع الطول بالمتر. النطاق الصحي بين 18.5 و24.9.',
        hero: true,
      },
      healthyLow: {
        label: 'الحد الأدنى للوزن الصحي',
        hint: 'أدنى وزن ضمن النطاق الصحي لطولك (مؤشر 18.5).',
      },
      healthyHigh: {
        label: 'الحد الأعلى للوزن الصحي',
        hint: 'أعلى وزن ضمن النطاق الصحي لطولك (مؤشر 24.9).',
      },
    },
    resultTitle: 'النتائج',
    formula:
      'مؤشر كتلة الجسم = الوزن (كغ) ÷ الطول (م)². نطاق الوزن الصحي = طولك (م)² × 18.5 إلى طولك (م)² × 24.9.',
    exampleHtml:
      '<p>مثال بقيم الحاسبة: وزن <strong>75 كغ</strong> وطول <strong>175 سم</strong>.<br>مؤشر كتلة الجسم ≈ <strong>24.5</strong>.<br>نطاق الوزن الصحي لطولك ≈ <strong>56.7 – 76.3 كغ</strong>.</p>',
    assumptions: [
      'مؤشر كتلة الجسم مؤشر فحص استرشادي وليس تشخيصاً طبياً.',
      'النطاق الصحي هنا مبني على مؤشر من 18.5 إلى 24.9.',
      'قد يختلف المعيار لدى الرياضيين ذوي الكتلة العضلية العالية وبعض المجموعات السكانية.',
      'الحاسبة تحول الوحدات تلقائياً عند اختيار الباوند أو المتر.',
      'النتائج تقديرية لأغراض التوعية العامة.',
    ],
    whenUseful:
      'استخدم هذه الحاسبة عند مراجعة وزنك وطولك بانتظام، أو عند بدء خطة غذائية أو رياضية، لتعرف مؤشرك ونطاق وزنك الصحي كنقطة انطلاق.',
    mistakes: [
      'إدخال الوزن بالباوند مع اختيار الكيلوغرام، أو الخلط بين الوحدتين.',
      'إدخال الطول بالسنتمتر مكان المتر، وهو ما يضخم النتيجة هائلة.',
      'استخدام وحدة القوالب (الستون) ظناً أنها مدعومة.',
      'قراءة المؤشر كحكم نهائي، وتجاهل أن العضلات والبنية الجسمية تؤثر في المعنى.',
    ],
    faqs: [
      {
        q: 'هل مؤشر كتلة الجسم دقيق للجميع؟',
        a: 'لا. هو أداة فحص سريعة ولا يفرق بين العضلات والدهون، لذا قد يخطئ في تصنيف الرياضيين ذوي الكتلة العضلية العالية وبعض المجموعات السكانية.',
      },
      {
        q: 'ماذا يعني نطاق الوزن الصحي؟',
        a: 'هو مدى الأوزان التي تعطي مؤشراً بين 18.5 و24.9 لطولك، وهو إطار استرشادي وليس هدفاً دقيقاً يفرض عليك.',
      },
      {
        q: 'هل أداة الفحص هذه تناسب الأطفال أو الحوامل؟',
        a: 'لا، معايير المؤشر تُعد للبالغين. الأطفال والحوامل لهم نطاقات وتقييمات خاصة تحتاج مختصاً.',
      },
    ],
    methodologyNote:
      'تحسب الحاسبة المؤشر بقسمة الوزن على مربع الطول، ثم تحسب حدود الوزن الصحي بضرب مربع الطول في 18.5 و24.9، مع تحويل الوحدات تلقائياً.',
    disclaimerNote:
      'النتائج لأغراض توعوية ولا تُعد تشخيصاً أو نصيحة طبية. استشر مختصاً عند أي مخاوف صحية.',
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
    guideTitle: 'كيف تفهم مؤشر كتلة الجسم',
    relatedTitle: 'حاسبات ذات صلة',
  },

  en: {
    locale: 'en',
    slug: 'bmi',
    title: 'BMI calculator',
    metaDescription:
      'Calculate your body mass index from weight and height in kg/cm or lb/m, and see your healthy weight range.',
    h1: 'BMI calculator',
    intro:
      'Body mass index (BMI) is a quick screening tool that compares your weight to your height, computed by dividing weight in kilograms by height in metres squared. This calculator works out your BMI and the healthy weight range for your height, with a reminder that it is a screening index, not a medical diagnosis.',
    fields: {
      weight: {
        label: 'Weight',
        hint: 'Your current weight in the chosen unit.',
      },
      weightUnit: {
        label: 'Weight unit',
        hint: 'Choose between kilograms and pounds.',
        options: {
          kg: 'kg',
          lb: 'lb',
        },
      },
      height: {
        label: 'Height',
        hint: 'Your height in the chosen unit.',
      },
      heightUnit: {
        label: 'Height unit',
        hint: 'Choose between centimetres and metres.',
        options: {
          cm: 'cm',
          m: 'm',
        },
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
      bmi: {
        label: 'Body mass index',
        hint: 'Weight in kilograms divided by height in metres squared. The healthy range is 18.5 to 24.9.',
        hero: true,
      },
      healthyLow: {
        label: 'Healthy weight low',
        hint: 'The lowest weight in the healthy range for your height (BMI 18.5).',
      },
      healthyHigh: {
        label: 'Healthy weight high',
        hint: 'The highest weight in the healthy range for your height (BMI 24.9).',
      },
    },
    resultTitle: 'Results',
    formula:
      'BMI = weight (kg) \u00f7 height (m)\u00b2. Healthy weight range = your height (m)\u00b2 \u00d7 18.5 to your height (m)\u00b2 \u00d7 24.9.',
    exampleHtml:
      '<p>Example using the calculator\u2019s values: weight <strong>75 kg</strong> and height <strong>175 cm</strong>.<br>Your BMI is about <strong>24.5</strong>.<br>The healthy weight range for your height is about <strong>56.7 \u2013 76.3 kg</strong>.</p>',
    assumptions: [
      'BMI is a screening index, not a medical diagnosis.',
      'The healthy range here is based on a BMI of 18.5 to 24.9.',
      'The benchmark may differ for athletes with high muscle mass and some populations.',
      'The calculator converts units automatically when pounds or metres are chosen.',
      'Results are estimates for general awareness.',
    ],
    whenUseful:
      'Use this calculator when reviewing your weight and height regularly, or when starting a diet or exercise plan, to know your BMI and healthy weight range as a starting point.',
    mistakes: [
      'Entering weight in pounds while choosing kilograms, or mixing the two units.',
      'Entering height in centimetres where metres are expected, which inflates the result hugely.',
      'Assuming the stone unit is supported.',
      'Treating the index as a final verdict while ignoring that muscle and body frame affect the meaning.',
    ],
    faqs: [
      {
        q: 'Is BMI accurate for everyone?',
        a: 'No. It is a quick screening tool that does not distinguish muscle from fat, so it can misclassify athletes with high muscle mass and some populations.',
      },
      {
        q: 'What does the healthy weight range mean?',
        a: 'It is the span of weights that gives a BMI between 18.5 and 24.9 for your height — a reference frame, not an exact target imposed on you.',
      },
      {
        q: 'Does this screening suit children or pregnant women?',
        a: 'No. BMI benchmarks are set for adults. Children and pregnant women have their own ranges and assessments that need a professional.',
      },
    ],
    methodologyNote:
      'The calculator divides weight by the square of height, then computes the healthy weight bounds by multiplying the square of height by 18.5 and 24.9, converting units automatically.',
    disclaimerNote:
      'Results are for awareness only and do not constitute a diagnosis or medical advice. Consult a professional about any health concerns.',
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
    guideTitle: 'How to understand BMI',
    relatedTitle: 'Related calculators',
  },
};

export default content;
