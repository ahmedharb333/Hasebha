import type { CalcContent } from '../../lib/calculators/types';
import type { Locale } from '../../config/site';

const content: Record<Locale, CalcContent> = {
  ar: {
    locale: 'ar',
    slug: 'ideal-weight',
    title: 'حاسبة الوزن المثالي',
    metaDescription:
      'اعرف نطاق الوزن الصحي المناسب لطولك، المحسوب من مؤشر كتلة الجسم بين 18.5 و24.9.',
    h1: 'حاسبة الوزن المثالي',
    intro:
      '"الوزن المثالي" ليس رقماً واحداً بل نطاقاً صحياً من الأوزان يناسب طولك، محسوباً من مؤشر كتلة الجسم بين 18.5 و24.9. تحسب هذه الحاسبة الحد الأدنى والحد الأعلى ومنتصف النطاق لطولك، لتعرف حدود صحية واقعية بدل هدف تعسفي.',
    fields: {
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
      healthyLow: {
        label: 'أدنى وزن صحي',
        hint: 'أدنى وزن ضمن النطاق الصحي لطولك (مؤشر 18.5).',
        hero: true,
      },
      healthyHigh: {
        label: 'أعلى وزن صحي',
        hint: 'أعلى وزن ضمن النطاق الصحي لطولك (مؤشر 24.9).',
      },
      midRange: {
        label: 'وزن منتصف النطاق',
        hint: 'منتصف النطاق الصحي، وهو مرجع عملي عند وضع هدف.',
      },
    },
    resultTitle: 'النتائج',
    formula:
      'الحد الأدنى = الطول (م)² × 18.5، والحد الأعلى = الطول (م)² × 24.9، والمنتصف = متوسط الحدين.',
    exampleHtml:
      '<p>مثال بقيم الحاسبة: طول <strong>175 سم</strong>.<br>نطاق الوزن الصحي ≈ <strong>56.7 – 76.3 كغ</strong>.<br>وزن منتصف النطاق ≈ <strong>66.5 كغ</strong>.</p>',
    assumptions: [
      'النطاق محسوب من مؤشر كتلة الجسم بين 18.5 و24.9 فقط.',
      'الوزن المثالي نطاق وليس رقماً واحداً.',
      'يختلف الإطار حسب البنية الجسمية والكتلة العضلية.',
      'المعايير للبالغين ولا تنطبق على الأطفال أو الحمل.',
      'النتائج استرشادية لأغراض التوعية العامة.',
    ],
    whenUseful:
      'استخدم هذه الحاسبة عند وضع هدف وزني، لتعرف النطاق الصحي المناسب لطولك وتختار بداخله هدفاً واقعياً بدل اعتماد رقم تعسفي.',
    mistakes: [
      'معاملة النطاق كهدف يجب الوصول إلى حدوده بالضبط.',
      'تجاهل أن نطاقات المؤشر تختلف بين المجموعات السكانية.',
      'الافتراض أن النطاق ينطبق على الرياضيين ذوي الكتلة العضلية العالية.',
      'استخدام الحاسبة لتحديد أهداف للأطفال أو الحوامل.',
    ],
    faqs: [
      {
        q: 'لماذا نطاق بدل رقم واحد؟',
        a: 'لأن الوزن الصحي لطولك يشمل مدى من الأوزان، والجسم الصحي لا يحدد برقم واحد دقيق يهمل البنية والتركيب.',
      },
      {
        q: 'هل النطاق صالح للرياضيين؟',
        a: 'النطاق مبني على مؤشر كتلة الجسم الذي لا يميز العضلات عن الدهون، لذا قد يصنف الرياضي خطأً خارج الحدود.',
      },
      {
        q: 'هل يشمل الأطفال والحوامل؟',
        a: 'لا. المعايير للبالغين، وللأطفال والحوامل نطاقات وتقييمات خاصة تحتاج مختصاً.',
      },
    ],
    methodologyNote:
      'تحسب الحاسبة الحد الأدنى والأعلى بضرب مربع الطول بالمتر في 18.5 و24.9، ثم تأخذ منتصفهما، مع تحويل وحدات الطول تلقائياً.',
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
    guideTitle: 'شرح نطاق الوزن الصحي',
    relatedTitle: 'حاسبات ذات صلة',
  },

  en: {
    locale: 'en',
    slug: 'ideal-weight',
    title: 'Ideal weight calculator',
    metaDescription:
      'Find the healthy weight range for your height, derived from a body mass index between 18.5 and 24.9.',
    h1: 'Ideal weight calculator',
    intro:
      '"Ideal weight" is not a single number but a healthy range of weights that fits your height, derived from a body mass index between 18.5 and 24.9. This calculator works out the low bound, high bound and mid-range weight for your height, so you can set realistic healthy limits instead of an arbitrary target.',
    fields: {
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
      healthyLow: {
        label: 'Healthy weight low',
        hint: 'The lowest weight in the healthy range for your height (BMI 18.5).',
        hero: true,
      },
      healthyHigh: {
        label: 'Healthy weight high',
        hint: 'The highest weight in the healthy range for your height (BMI 24.9).',
      },
      midRange: {
        label: 'Mid-range weight',
        hint: 'The middle of the healthy range, a practical reference when setting a target.',
      },
    },
    resultTitle: 'Results',
    formula:
      'Low bound = height (m)\u00b2 \u00d7 18.5, high bound = height (m)\u00b2 \u00d7 24.9, and the mid-range is the average of the two.',
    exampleHtml:
      '<p>Example using the calculator\u2019s values: height <strong>175 cm</strong>.<br>The healthy weight range is about <strong>56.7 \u2013 76.3 kg</strong>.<br>The mid-range weight is about <strong>66.5 kg</strong>.</p>',
    assumptions: [
      'The range is derived from a body mass index between 18.5 and 24.9 only.',
      'Ideal weight is a range, not a single number.',
      'The frame varies with body structure and muscle mass.',
      'Benchmarks are for adults and do not apply to children or pregnancy.',
      'Results are indicative for general awareness.',
    ],
    whenUseful:
      'Use this calculator when setting a weight goal, to know the healthy range for your height and pick a realistic target within it instead of relying on an arbitrary number.',
    mistakes: [
      'Treating the range as a target to hit its exact bounds.',
      'Ignoring that BMI bands vary between populations.',
      'Assuming the range applies to athletes with high muscle mass.',
      'Using the calculator to set goals for children or pregnant women.',
    ],
    faqs: [
      {
        q: 'Why a range instead of one number?',
        a: 'Because the healthy weight for your height spans many values, and a healthy body is not defined by a single precise number that ignores frame and composition.',
      },
      {
        q: 'Does the range apply to athletes?',
        a: 'The range is based on BMI, which does not distinguish muscle from fat, so an athlete may be misclassified outside the bounds.',
      },
      {
        q: 'Does it cover children and pregnant women?',
        a: 'No. The benchmarks are for adults, and children and pregnant women have their own ranges and assessments that need a professional.',
      },
    ],
    methodologyNote:
      'The calculator computes the low and high bounds by multiplying the square of height in metres by 18.5 and 24.9, then takes their average, converting height units automatically.',
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
    guideTitle: 'Healthy weight range explained',
    relatedTitle: 'Related calculators',
  },
};

export default content;
