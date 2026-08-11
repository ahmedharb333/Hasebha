import type { CalcContent } from '../../lib/calculators/types';
import type { Locale } from '../../config/site';

const content: Record<Locale, CalcContent> = {
  ar: {
    locale: 'ar',
    slug: 'calorie-intake',
    title: 'حاسبة السعرات اليومية',
    metaDescription:
      'احسب هدفك اليومي من السعرات حسب هدفك (خسارة أو ثبات أو زيادة) ومستوى نشاطك، بناءً على معدل الأيض الأساسي.',
    h1: 'حاسبة السعرات اليومية',
    intro:
      'هدف السعرات اليومي يبدأ من احتياج جسمك للطاقة ثم يُعدَّل حسب هدفك: خسارة الوزن أو ثباته أو زيادته. تحسب هذه الحاسبة الرقم بالاعتماد على معدل الأيض الأساسي (BMR) وإجمالي إنفاق الطاقة اليومي (TDEE) ومستوى نشاطك، ثم تضيف أو تطرح مبلغاً حسب الهدف والسرعة المختارين.',
    fields: {
      sex: {
        label: 'الجنس',
        hint: 'يستخدم حساب معدل الأيض الأساسي ثابتاً مختلفاً حسب الجنس.',
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
      goal: {
        label: 'الهدف',
        hint: 'هل تريد خسارة الوزن أو ثباته أو زيادته؟',
        options: {
          lose: 'خسارة',
          maintain: 'ثبات',
          gain: 'زيادة',
        },
      },
      rate: {
        label: 'السرعة',
        hint: 'تعديل السعرات اليومي: بطيء (−250/+250) أو متوسط (−500/+500) أو سريع (−750/+750) سعرة يومياً تقريباً.',
        options: {
          slow: 'بطيء',
          moderate: 'متوسط',
          aggressive: 'سريع',
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
      targetCalories: {
        label: 'هدف السعرات اليومي',
        hint: 'عدد السعرات اليومي المقترح لتحقيق هدفك بالسرعة المختارة.',
        hero: true,
      },
      bmr: {
        label: 'معدل الأيض الأساسي',
        hint: 'الطاقة التي يحرقها جسمك في حالة الراحة التامة يومياً.',
      },
      tdee: {
        label: 'إجمالي إنفاق الطاقة اليومي',
        hint: 'احتياجك اليومي قبل أي تعديل حسب الهدف.',
      },
    },
    resultTitle: 'النتائج',
    formula:
      'BMR = 10 × الوزن (كغ) + 6.25 × الطول (سم) − 5 × العمر + ثابت الجنس، ثم TDEE = BMR × عامل النشاط، والهدف = TDEE + التعديل (−250 / −500 / −750 للخسارة أو +250 / +500 / +750 للزيادة).',
    exampleHtml:
      '<p>مثال بقيم الحاسبة: أنثى، عمر <strong>25</strong>، وزن <strong>60 كغ</strong>، طول <strong>165 سم</strong>، نشاط متوسط، هدف خسارة بسرعة متوسطة.<br>معدل الأيض الأساسي ≈ <strong>1,345 سعرة/يوم</strong> وإجمالي إنفاق الطاقة ≈ <strong>2,085 سعرة/يوم</strong>.<br>هدف السعرات اليومي ≈ <strong>1,585 سعرة/يوم</strong>.</p>',
    assumptions: [
      'الهدف يُحسب من تقدير TDEE ثم يُعدَّل حسب الهدف والسرعة.',
      'التعديلات 250/500/750 سعرة يومياً تقابل تقريباً 0.25/0.5/0.75 كغ أسبوعياً.',
      'النتيجة لا تنزل عن الصفر.',
      'الخطة ليست نصيحة طبية، خاصة العجز السريع: لا تنزل عموماً عن نحو 1,200 سعرة يومياً دون إشراف مختص.',
      'السرعات السريعة للخسارة صعبة الاستمرار وقد تفقد عضلات مع الدهون.',
    ],
    whenUseful:
      'استخدم هذه الحاسبة عند بدء خطة غذائية، لتقدر هدفاً يومياً من السعرات متناسباً مع هدفك ونشاطك، ثم راقب النتيجة وعُدّل مع مختص إن لزم.',
    mistakes: [
      'اختيار مستوى نشاط أعلى من الواقع، فيُبالغ في الهدف.',
      'اختيار سرعة سريعة للخسارة دون وعي بصعوبتها ومخاطرها.',
      'الخسارة الحادة: الهبوط دون نحو 1,200 سعرة يومياً دون إشراف مختص.',
      'معاملة الهدف كرقم جامد بدل مرجع يُعدَّل بتغير الوزن والنشاط.',
    ],
    faqs: [
      {
        q: 'ما السرعة الآمنة للخسارة؟',
        a: 'الخسارة المعتدلة من 0.5 كغ أسبوعياً تقريباً (عجز 500 سعرة يومياً) شائعة وقابلة للاستمرار، أما العجز الأسرع فأصعب ويحتاج إشرافاً.',
      },
      {
        q: 'هل أستطيع استخدامه أثناء الحمل؟',
        a: 'لا. حساب السعرات بخسارة الوزن غير مناسب أثناء الحمل أو الرضاعة، واستشيري مختصاً لأي تعديل غذائي في هذه المرحلة.',
      },
      {
        q: 'ماذا لو أمارس الرياضة؟',
        a: 'إن اخترت مستوى النشاط المناسب لتمارينك، فإن الحاسبة تتضمن أثرها في TDEE. لا تضف تقدير حرق التمارين مرتين.',
      },
    ],
    methodologyNote:
      'تحسب الحاسبة BMR بمعادلة ميفلين-سانت جيور، وتضربه في عامل النشاط لتعطي TDEE، ثم تضيف أو تطرح تعديل الهدف (250/500/750 سعرة) حسب الخسارة أو الثبات أو الزيادة.',
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
    guideTitle: 'كيف تحدد هدف السعرات اليومي',
    relatedTitle: 'حاسبات ذات صلة',
  },

  en: {
    locale: 'en',
    slug: 'calorie-intake',
    title: 'Calorie intake calculator',
    metaDescription:
      'Estimate your daily calorie target for losing, maintaining or gaining weight, based on your BMR and activity level.',
    h1: 'Calorie intake calculator',
    intro:
      'A daily calorie target starts from your body\u2019s energy needs and is then adjusted to your goal: losing, maintaining or gaining weight. This calculator works out the figure from your basal metabolic rate (BMR), total daily energy expenditure (TDEE) and activity level, then adds or subtracts an amount based on the goal and pace you choose.',
    fields: {
      sex: {
        label: 'Sex',
        hint: 'The BMR calculation uses a different constant by sex.',
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
      goal: {
        label: 'Goal',
        hint: 'Are you aiming to lose, maintain or gain weight?',
        options: {
          lose: 'Lose',
          maintain: 'Maintain',
          gain: 'Gain',
        },
      },
      rate: {
        label: 'Pace',
        hint: 'The daily calorie adjustment: slow (\u2212250/+250), moderate (\u2212500/+500) or fast (\u2212750/+750) calories per day.',
        options: {
          slow: 'Slow',
          moderate: 'Moderate',
          aggressive: 'Fast',
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
      targetCalories: {
        label: 'Daily calorie target',
        hint: 'The suggested daily calorie figure to achieve your goal at the chosen pace.',
        hero: true,
      },
      bmr: {
        label: 'BMR',
        hint: 'The energy your body burns at complete rest each day.',
      },
      tdee: {
        label: 'TDEE',
        hint: 'Your daily needs before any goal adjustment.',
      },
    },
    resultTitle: 'Results',
    formula:
      'BMR = 10 \u00d7 weight (kg) + 6.25 \u00d7 height (cm) \u2212 5 \u00d7 age + sex constant, then TDEE = BMR \u00d7 activity factor, and the target = TDEE + adjustment (\u2212250 / \u2212500 / \u2212750 for loss, or +250 / +500 / +750 for gain).',
    exampleHtml:
      '<p>Example using the calculator\u2019s values: female, age <strong>25</strong>, weight <strong>60 kg</strong>, height <strong>165 cm</strong>, moderate activity, goal lose at a moderate pace.<br>BMR is about <strong>1,345 calories/day</strong> and TDEE about <strong>2,085 calories/day</strong>.<br>The daily calorie target is about <strong>1,585 calories/day</strong>.</p>',
    assumptions: [
      'The target is based on an estimated TDEE, then adjusted for the goal and pace.',
      'Adjustments of 250/500/750 calories per day correspond to roughly 0.25/0.5/0.75 kg per week.',
      'The result is floored at zero.',
      'This is not medical advice, especially for fast deficits: generally do not go below about 1,200 calories per day without professional supervision.',
      'Fast loss paces are hard to sustain and may lose muscle along with fat.',
    ],
    whenUseful:
      'Use this calculator when starting a diet plan, to estimate a daily calorie target that fits your goal and activity, then monitor the results and adjust with a professional if needed.',
    mistakes: [
      'Choosing an activity level higher than reality, which overestimates the target.',
      'Choosing a fast loss pace without being aware of how hard and risky it is.',
      'Crash dieting: dropping below about 1,200 calories a day without professional supervision.',
      'Treating the target as a rigid number instead of a reference to adjust as weight and activity change.',
    ],
    faqs: [
      {
        q: 'How fast is it safe to lose weight?',
        a: 'A moderate loss of about 0.5 kg per week (a 500-calorie daily deficit) is common and sustainable, while a faster deficit is harder and needs supervision.',
      },
      {
        q: 'Can I use this while pregnant?',
        a: 'No. Calorie targets aimed at losing weight are not suitable during pregnancy or breastfeeding; consult a professional for any dietary changes in this stage.',
      },
      {
        q: 'What if I exercise?',
        a: 'If you choose the activity level that matches your training, the calculator already includes its effect in TDEE. Do not add an estimated burn twice.',
      },
    ],
    methodologyNote:
      'The calculator computes BMR with the Mifflin-St Jeor equation, multiplies it by the activity factor for TDEE, then adds or subtracts the goal adjustment (250/500/750 calories) depending on losing, maintaining or gaining.',
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
    guideTitle: 'How to set a calorie target',
    relatedTitle: 'Related calculators',
  },
};

export default content;
