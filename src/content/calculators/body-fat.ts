import type { CalcContent } from '../../lib/calculators/types';
import type { Locale } from '../../config/site';

const content: Record<Locale, CalcContent> = {
  ar: {
    locale: 'ar',
    slug: 'body-fat',
    title: 'حاسبة نسبة الدهون في الجسم',
    metaDescription:
      'قدّر نسبة الدهون في جسمك بطريقة القياسات البحرية الأمريكية باستخدام الطول ومحيط الخصر والرقبة (والورك للإناث).',
    h1: 'حاسبة نسبة الدهون في الجسم',
    intro:
      'نسبة الدهون في الجسم تخبرك أكثر من الوزن وحده عن تكوين جسمك. تقدر هذه الحاسبة النسبة بطريقة القياسات البحرية الأمريكية (US Navy) باستخدام محيطات الجسم فقط: الطول ومحيط الخصر والرقبة، مع محيط الورك للإناث. النتيجة تقديرية وتعتمد على دقة قياسك.',
    fields: {
      sex: {
        label: 'الجنس',
        hint: 'تستخدم معادلة القياسات البحرية ثابتاً مختلفاً حسب الجنس.',
        options: {
          male: 'ذكر',
          female: 'أنثى',
        },
      },
      height: {
        label: 'الطول (سم)',
        hint: 'طولك بالسنتمتر.',
      },
      waist: {
        label: 'محيط الخصر (سم)',
        hint: 'قِس حول الخصر عند مستوى السرة تقريباً، بشريط غير مشدود وفوق الجلد مباشرة.',
      },
      neck: {
        label: 'محيط الرقبة (سم)',
        hint: 'قِس حول الرقبة أسفل تفاحة الحنجرة، بشريط ملامس وغير مشدود.',
      },
      hip: {
        label: 'محيط الورك (سم)',
        hint: 'قِس حول أوسع نقطة في الورك، بشريط موازٍ للأرض. هذا الحقل مطلوب للإناث فقط.',
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
      bodyFatPct: {
        label: 'نسبة الدهون في الجسم',
        hint: 'تقدير بطريقة القياسات البحرية. نطاقات استرشادية عامة: أساسية، رياضية، لياقة، متوسطة، ثم مرتفعة (سمنة). التقدير يعتمد على دقة القياس.',
        hero: true,
      },
    },
    resultTitle: 'النتائج',
    formula:
      'للذكر: كثافة الجسم = 1.0324 − 0.19077 × لوغ10(الخصر − الرقبة) + 0.15456 × لوغ10(الطول)، وللأنثى: = 1.29579 − 0.35004 × لوغ10(الخصر + الورك − الرقبة) + 0.221 × لوغ10(الطول)، ثم النسبة = 495 ÷ الكثافة − 450.',
    exampleHtml:
      '<p>مثال بقيم الحاسبة: ذكر، طول <strong>180 سم</strong>، محيط خصر <strong>90 سم</strong>، ومحيط رقبة <strong>40 سم</strong>.<br>نسبة الدهون في الجسم ≈ <strong>18.4%</strong>.</p>',
    assumptions: [
      'تُستخدم طريقة القياسات البحرية الأمريكية التقديرية.',
      'النتيجة تعتمد على دقة القياسات: شريط ملامس غير مشدود، ومستوى أفقي.',
      'المعادلة تختلف بين الذكور والإناث.',
      'التقدير عام وقد يختلف عن طرق أدق كالوزن المائي أو التصوير.',
      'النتائج استرشادية وليست تشخيصاً طبياً.',
    ],
    whenUseful:
      'استخدم هذه الحاسبة لمتابعة تغير تكوين جسمك عبر الزمن بنفس أسلوب القياس، لتقدر اتجاه النسبة بدل الاعتماد على الوزن وحده.',
    mistakes: [
      'القياس فوق الملابس أو بشريط مشدود، وهو ما يشوه النتيجة.',
      'إدخال القياسات بالبوصة مكان السنتمتر.',
      'نسيان إدخال محيط الورك للإناث.',
      'القياس في أوقات مختلفة من اليوم، فتتفاوت النتائج دون أن يتغير شيء حقيقي.',
    ],
    faqs: [
      {
        q: 'ما مدى دقة طريقة القياسات البحرية؟',
        a: 'إنها تقدير مقبول لكثير من الناس ضمن بضع نقاط مئوية، لكن طرقاً أدق مثل قياس الوزن المائي أو المسح بالتصوير تعطي نتائج أدق.',
      },
      {
        q: 'لماذا محيط الورك للإناث فقط؟',
        a: 'لأن توزيع الدهون يختلف بين الجنسين، وتضيف المعادلة الأنثوية محيط الورك لتعكس تراكم الدهون في تلك المنطقة.',
      },
      {
        q: 'كيف أحصل على قياس صحيح؟',
        a: 'قِس صباحاً وبنفس الطريقة كل مرة: شريط ملامس غير مشدود، أفقي على الجلد مباشرة، ولا تنفخ بطنك.',
      },
    ],
    methodologyNote:
      'تعتمد الحاسبة معادلات القياسات البحرية الأمريكية التي تقدر الكثافة الجسمية من محيطات القياس ثم تحولها إلى نسبة دهون، مع ثابتين مختلفين للذكر والأنثى.',
    disclaimerNote:
      'النتائج تقديرية لأغراض توعوية ولا تُعد تشخيصاً أو نصيحة طبية. استشر مختصاً عند أي مخاوف صحية.',
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
    guideTitle: 'كيف تقدر نسبة الدهون في الجسم',
    relatedTitle: 'حاسبات ذات صلة',
  },

  en: {
    locale: 'en',
    slug: 'body-fat',
    title: 'Body fat calculator',
    metaDescription:
      'Estimate your body fat percentage with the US Navy method using height, waist and neck (plus hip for women).',
    h1: 'Body fat calculator',
    intro:
      'Body fat percentage tells you more about your body composition than weight alone. This calculator estimates it with the US Navy method using only body circumferences: height, waist and neck, plus hip for women. The result is an estimate that depends on the accuracy of your measurements.',
    fields: {
      sex: {
        label: 'Sex',
        hint: 'The Navy method uses a different constant by sex.',
        options: {
          male: 'Male',
          female: 'Female',
        },
      },
      height: {
        label: 'Height (cm)',
        hint: 'Your height in centimetres.',
      },
      waist: {
        label: 'Waist (cm)',
        hint: 'Measure around the waist near the navel level, with a tape that is level and not pulled tight, over bare skin.',
      },
      neck: {
        label: 'Neck (cm)',
        hint: 'Measure around the neck just below the larynx, with the tape touching and not tight.',
      },
      hip: {
        label: 'Hip (cm)',
        hint: 'Measure around the widest part of the hips, keeping the tape level with the floor. Required for women only.',
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
      bodyFatPct: {
        label: 'Body fat percentage',
        hint: 'A Navy-method estimate. General indicative bands: essential, athletic, fitness, average, then high (obese). The estimate depends on measurement accuracy.',
        hero: true,
      },
    },
    resultTitle: 'Results',
    formula:
      'For men: body density = 1.0324 \u2212 0.19077 \u00d7 log10(waist \u2212 neck) + 0.15456 \u00d7 log10(height); for women: = 1.29579 \u2212 0.35004 \u00d7 log10(waist + hip \u2212 neck) + 0.221 \u00d7 log10(height); then body fat % = 495 \u00f7 density \u2212 450.',
    exampleHtml:
      '<p>Example using the calculator\u2019s values: male, height <strong>180 cm</strong>, waist <strong>90 cm</strong> and neck <strong>40 cm</strong>.<br>Body fat percentage is about <strong>18.4%</strong>.</p>',
    assumptions: [
      'The US Navy circumference method is used as an estimate.',
      'The result depends on measurement accuracy: a touching, not tight, level tape.',
      'The equation differs between men and women.',
      'The estimate is general and may differ from more precise methods such as hydrostatic weighing or imaging.',
      'Results are indicative and are not a medical diagnosis.',
    ],
    whenUseful:
      'Use this calculator to track changes in your body composition over time using the same measurement technique, to estimate the direction of the percentage instead of relying on weight alone.',
    mistakes: [
      'Measuring over clothing or with a pulled-tight tape, which distorts the result.',
      'Entering measurements in inches where centimetres are expected.',
      'Forgetting to enter the hip circumference for women.',
      'Measuring at different times of day, so results vary without anything real changing.',
    ],
    faqs: [
      {
        q: 'How accurate is the Navy method?',
        a: 'It is a reasonable estimate for many people within a few percentage points, while more precise methods such as hydrostatic weighing or imaging scans give more accurate results.',
      },
      {
        q: 'Why is the hip measured only for women?',
        a: 'Because fat distribution differs between sexes, and the female equation includes the hip circumference to reflect fat accumulation in that area.',
      },
      {
        q: 'How do I take a correct measurement?',
        a: 'Measure in the morning and the same way each time: a touching, not tight, level tape directly on the skin, without sucking in your stomach.',
      },
    ],
    methodologyNote:
      'The calculator applies the US Navy equations, which estimate body density from circumference measurements and convert it to a body fat percentage, with different constants for men and women.',
    disclaimerNote:
      'Results are estimates for awareness purposes only and do not constitute a diagnosis or medical advice. Consult a professional about any health concerns.',
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
    guideTitle: 'How to estimate body fat',
    relatedTitle: 'Related calculators',
  },
};

export default content;
