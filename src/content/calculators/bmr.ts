import type { CalcContent } from '../../lib/calculators/types';
import type { Locale } from '../../config/site';

const content: Record<Locale, CalcContent> = {
  ar: {
    locale: 'ar',
    slug: 'bmr',
    title: 'حاسبة معدل الأيض الأساسي',
    metaDescription:
      'احسب معدل الأيض الأساسي (BMR) وإجمالي إنفاق الطاقة اليومي (TDEE) وفق معادلة ميفلين-سانت جيور ومستوى نشاطك.',
    h1: 'حاسبة معدل الأيض الأساسي',
    intro:
      'معدل الأيض الأساسي (BMR) هو الطاقة التي يحرقها جسمك في حالة الراحة التامة ليبقى على قيد الحياة، وإجمالي إنفاق الطاقة اليومي (TDEE) يضيف إلى ذلك أثر نشاطك اليومي. تحسب هذه الحاسبة الرقمين معاً وفق معادلة ميفلين-سانت جيور ومستوى النشاط الذي تختاره.',
    fields: {
      sex: {
        label: 'الجنس',
        hint: 'تستخدم المعادلة ثابتاً مختلفاً حسب الجنس.',
        options: {
          male: 'ذكر',
          female: 'أنثى',
        },
      },
      age: {
        label: 'العمر',
        hint: 'عمرك بالسنوات.',
      },
      weight: {
        label: 'الوزن',
        hint: 'وزنك الحالي بوحدة الوزن المختارة.',
      },
      weightUnit: {
        label: 'وحدة الوزن',
        hint: 'اختر بين الكيلوغرام والباوند، وتُحوَّل الحاسبة تلقائياً.',
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
        hint: 'اختر بين السنتمتر والمتر، وتُحوَّل الحاسبة تلقائياً.',
        options: {
          cm: 'سم',
          m: 'متر',
        },
      },
      activity: {
        label: 'مستوى النشاط',
        hint: 'اختر المستوى الأقرب إلى روتينك اليومي: خامل، نشاط خفيف، نشاط متوسط، نشيط، أو نشاط عالٍ جداً.',
        options: {
          sedentary: 'خامل',
          light: 'نشاط خفيف',
          moderate: 'نشاط متوسط',
          active: 'نشيط',
          'very-active': 'نشاط عالٍ جداً',
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
      bmr: {
        label: 'معدل الأيض الأساسي (سعرة/يوم)',
        hint: 'الطاقة التي يحرقها جسمك في حالة الراحة التامة يومياً.',
        hero: true,
      },
      tdee: {
        label: 'إجمالي إنفاق الطاقة اليومي (سعرة/يوم)',
        hint: 'معدل الأيض الأساسي مضروباً في عامل نشاطك، وهو تقريبي يعتمد على المستوى المختار.',
      },
    },
    resultTitle: 'النتائج',
    formula:
      'BMR = 10 × الوزن (كغ) + 6.25 × الطول (سم) − 5 × العمر + (5 للذكر أو −161 للأنثى)، ثم TDEE = BMR × عامل النشاط (1.2 / 1.375 / 1.55 / 1.725 / 1.9).',
    exampleHtml:
      '<p>مثال بقيم الحاسبة: ذكر، عمر <strong>30</strong>، وزن <strong>80 كغ</strong>، طول <strong>180 سم</strong>، نشاط متوسط.<br>معدل الأيض الأساسي ≈ <strong>1,780 سعرة/يوم</strong>.<br>إجمالي إنفاق الطاقة اليومي ≈ <strong>2,759 سعرة/يوم</strong>.</p>',
    assumptions: [
      'تستخدم الحاسبة معادلة ميفلين-سانت جيور لتقدير معدل الأيض الأساسي.',
      'TDEE تقديري ويُحتسب بضرب BMR في عامل النشاط المختار.',
      'الوحدات تُحوَّل تلقائياً عند اختيار الباوند أو المتر.',
      'اختيار مستوى نشاط واقعي مهم لصحة النتيجة.',
      'التقديرات عامة ولا تُعد نصيحة أو تشخيصاً طبياً.',
    ],
    whenUseful:
      'استخدم هذه الحاسبة عند التخطيط لبرنامج غذائي أو تدريبي، لتقدر احتياجك اليومي من الطاقة كنقطة انطلاق لهدفك من السعرات.',
    mistakes: [
      'اختيار مستوى نشاط أعلى من واقعك اليومي، وهو ما يضخم الرقم.',
      'إدخال الوزن بالباوند دون مراعاة التحويل للكيلوغرام.',
      'الخلط بين BMR وTDEE: الأول للراحة والثاني يضيف النشاط.',
      'الاعتماد على النتيجة كحقيقة طبية بدل استخدامها كتقدير.',
    ],
    faqs: [
      {
        q: 'ما الفرق بين BMR وTDEE؟',
        a: 'BMR هو ما يحرقه جسمك في حالة الراحة التامة، بينما TDEE يضيف إليه أثر نشاطك اليومي، وهو الرقم الأقرب لاحتياجك الفعلي من الطاقة.',
      },
      {
        q: 'لماذا تسأل الحاسبة عن الجنس؟',
        a: 'لأن معادلة ميفلين-سانت جيور تستخدم ثابتاً مختلفاً بين الرجال والنساء يعكس فروقاً متوسطة في تكوين الجسم.',
      },
      {
        q: 'هل الأرقام دقيقة لشخصي؟',
        a: 'إنها تقديرات معتمدة على متوسطات سكانية، وقد يختلف احتياجك الفعلي بحسب تكوين جسمك ومستوى نشاطك الحقيقي.',
      },
    ],
    methodologyNote:
      'تعتمد الحاسبة معادلة ميفلين-سانت جيور لتقدير BMR من الوزن والطول والعمر والجنس، ثم تضربه في عامل النشاط المختار لتعطي TDEE تقريبياً.',
    disclaimerNote:
      'النتائج تقديرية لأغراض إعلامية ولا تُعد نصيحة أو تشخيصاً طبياً. استشر مختصاً قبل بدء أي نظام غذائي أو تدريبي.',
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
    guideTitle: 'كيف تحسب معدل الأيض الأساسي وإجمالي إنفاق الطاقة',
    relatedTitle: 'حاسبات ذات صلة',
  },

  en: {
    locale: 'en',
    slug: 'bmr',
    title: 'BMR calculator',
    metaDescription:
      'Estimate your basal metabolic rate (BMR) and total daily energy expenditure (TDEE) using the Mifflin-St Jeor equation and your activity level.',
    h1: 'BMR calculator',
    intro:
      'Basal metabolic rate (BMR) is the energy your body burns at complete rest just to stay alive, and total daily energy expenditure (TDEE) adds the effect of your daily activity. This calculator works out both figures using the Mifflin-St Jeor equation and the activity level you choose.',
    fields: {
      sex: {
        label: 'Sex',
        hint: 'The equation uses a different constant by sex.',
        options: {
          male: 'Male',
          female: 'Female',
        },
      },
      age: {
        label: 'Age',
        hint: 'Your age in years.',
      },
      weight: {
        label: 'Weight',
        hint: 'Your current weight in the chosen unit.',
      },
      weightUnit: {
        label: 'Weight unit',
        hint: 'Choose between kilograms and pounds; the calculator converts automatically.',
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
        hint: 'Choose between centimetres and metres; the calculator converts automatically.',
        options: {
          cm: 'cm',
          m: 'm',
        },
      },
      activity: {
        label: 'Activity level',
        hint: 'Choose the option closest to your daily routine: sedentary, light, moderate, active, or very active.',
        options: {
          sedentary: 'Sedentary',
          light: 'Light activity',
          moderate: 'Moderate activity',
          active: 'Active',
          'very-active': 'Very active',
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
      bmr: {
        label: 'BMR (calories/day)',
        hint: 'The energy your body burns at complete rest each day.',
        hero: true,
      },
      tdee: {
        label: 'TDEE (calories/day)',
        hint: 'Your BMR multiplied by your activity factor — approximate and depends on the chosen level.',
      },
    },
    resultTitle: 'Results',
    formula:
      'BMR = 10 \u00d7 weight (kg) + 6.25 \u00d7 height (cm) \u2212 5 \u00d7 age + (5 for male or \u2212161 for female), then TDEE = BMR \u00d7 activity factor (1.2 / 1.375 / 1.55 / 1.725 / 1.9).',
    exampleHtml:
      '<p>Example using the calculator\u2019s values: male, age <strong>30</strong>, weight <strong>80 kg</strong>, height <strong>180 cm</strong>, moderate activity.<br>BMR is about <strong>1,780 calories/day</strong>.<br>TDEE is about <strong>2,759 calories/day</strong>.</p>',
    assumptions: [
      'The calculator uses the Mifflin-St Jeor equation to estimate BMR.',
      'TDEE is an estimate computed as BMR times the chosen activity factor.',
      'Units are converted automatically when pounds or metres are chosen.',
      'Choosing a realistic activity level matters for the result.',
      'Estimates are general and are not medical advice or diagnosis.',
    ],
    whenUseful:
      'Use this calculator when planning a diet or training programme, to estimate your daily energy needs as a starting point for your calorie target.',
    mistakes: [
      'Choosing an activity level higher than your actual routine, which inflates the figure.',
      'Entering weight in pounds without accounting for the conversion to kilograms.',
      'Confusing BMR with TDEE: the former is at rest, the latter adds activity.',
      'Relying on the result as medical fact instead of treating it as an estimate.',
    ],
    faqs: [
      {
        q: 'What is the difference between BMR and TDEE?',
        a: 'BMR is what your body burns at complete rest, while TDEE adds the effect of your daily activity and is the figure closest to your actual energy needs.',
      },
      {
        q: 'Why does the calculator ask for sex?',
        a: 'Because the Mifflin-St Jeor equation uses a different constant for men and women that reflects average differences in body composition.',
      },
      {
        q: 'Are the figures accurate for me personally?',
        a: 'They are estimates based on population averages, and your actual needs may differ depending on your body composition and true activity level.',
      },
    ],
    methodologyNote:
      'The calculator applies the Mifflin-St Jeor equation to estimate BMR from weight, height, age and sex, then multiplies it by the chosen activity factor to give an approximate TDEE.',
    disclaimerNote:
      'Results are estimates for informational purposes only and are not medical advice or diagnosis. Consult a professional before starting any diet or training programme.',
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
    guideTitle: 'How to calculate BMR and TDEE',
    relatedTitle: 'Related calculators',
  },
};

export default content;
