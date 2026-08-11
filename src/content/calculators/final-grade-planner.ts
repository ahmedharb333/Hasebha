import type { CalcContent } from '../../lib/calculators/types';
import type { Locale } from '../../config/site';

const content: Record<Locale, CalcContent> = {
  ar: {
    locale: 'ar',
    slug: 'final-grade-planner',
    title: 'حاسبة درجة النجاح النهائية',
    metaDescription:
      'احسب الدرجة التي تحتاجها في الامتحان النهائي لتحقيق معدل معين، إذا عرفت وزن النهائي ومعدلك الحالي.',
    h1: 'حاسبة درجة النجاح النهائية',
    intro:
      'تُحسب الدرجة النهائية كمتوسط مرجّح بين معدلك الحالي ودرجة الامتحان النهائي. تساعدك هذه الحاسبة على معرفة الدرجة التي تحتاجها في النهائي للوصول إلى الدرجة المستهدفة، مع تحذيرك إذا كان الهدف غير ممكن.',
    fields: {
      currentGrade: {
        label: 'معدلك الحالي (من 100)',
        hint: 'درجتك الحالية في المادة قبل الامتحان النهائي.',
      },
      finalWeight: {
        label: 'وزن الامتحان النهائي (%)',
        hint: 'نسبة وزن النهائي من الدرجة الكلية، من 1 إلى 100.',
      },
      targetGrade: {
        label: 'الدرجة المستهدفة (من 100)',
        hint: 'الدرجة النهائية التي تطمح للوصول إليها.',
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
      requiredFinal: {
        label: 'الدرجة المطلوبة في النهائي',
        hint: 'قيمة 0 تعني أن هدفك محقق أصلاً، و100 تعني أنك تحتاج الدرجة الكاملة (قد يكون الهدف غير ممكن).',
        hero: true,
      },
      currentContribution: {
        label: 'مساهمة معدلك الحالي',
        hint: 'الجزء من الدرجة النهائية الذي تؤمنه درجتك الحالية.',
      },
      maxAchievable: {
        label: 'أعلى درجة يمكن تحقيقها',
        hint: 'الدرجة النهائية التي تحصل عليها إذا أحرزت 100 في النهائي.',
      },
    },
    resultTitle: 'النتائج',
    formula:
      'الدرجة المطلوبة في النهائي = (الهدف − مساهمة المعدل الحالي) ÷ وزن النهائي. المساهمة = المعدل الحالي × (1 − وزن النهائي).',
    exampleHtml:
      '<p>مثال بقيم الحاسبة: معدل حالي <strong>80</strong>، وزن النهائي <strong>30%</strong>، هدف <strong>85</strong>.<br>تحتاج في النهائي ≈ <strong>96.67</strong>.<br>مساهمة معدلك الحالي <strong>56</strong>، وأعلى درجة يمكن تحقيقها <strong>86</strong>.</p>',
    assumptions: [
      'الدرجة النهائية متوسط مرجّح بين معدلك الحالي والامتحان النهائي فقط.',
      'وزن النهائي يُدخل كنسبة مئوية (مثل 30 لوزن 30%).',
      'تُقيّد النتيجة بين 0 و100؛ فإذا تجاوزت الحاجة الدرجة الكاملة، فالهدف غير ممكن.',
      'بافتراض أن درجتك الحالية تشمل كل أعمال الفصل قبل النهائي.',
    ],
    whenUseful:
      'استخدمها قبل الامتحان النهائي لتعرف ما تحتاجه فعلياً، أو لترى إن كان هدفك واقعياً أم يستلزم مراجعة خطتك.',
    mistakes: [
      'إدخال الوزن ككسر (مثل 0.3) بدلاً من نسبة مئوية (30).',
      'تجاهل وزن النهائي وظن أن الدرجة المطلوبة هي الفرق بين الهدف والحالي.',
      'عدم الانتباه إلى أن الهدف قد يكون غير ممكن إذا تجاوزت الحاجة 100.',
    ],
    faqs: [
      {
        q: 'ماذا لو كانت الدرجة المطلوبة أكثر من 100؟',
        a: 'هذا يعني أن هدفك غير ممكن حتى بدرجة كاملة، لأن مساهمة معدلك الحالي لا تكفي. تراجع الحاسبة النتيجة إلى 100.',
      },
      {
        q: 'ماذا لو كان النهائي بأكثر من 100 درجة؟',
        a: 'أدخل وزنه الحقيقي بالنسبة المئوية من الدرجة الكلية؛ الحساب يعتمد على الوزن النسبي لا عدد الدرجات الخام.',
      },
    ],
    methodologyNote:
      'تحسب الحاسبة مساهمة معدلك الحالي بضربه في (1 − وزن النهائي)، ثم تحدد الدرجة اللازمة في النهائي لتعويض الفرق نحو الهدف، وتقيّد الناتج بين 0 و100.',
    disclaimerNote:
      'النتائج تقديرية حسب الأوزان التي تدخلها؛ تحقق من مكونات الدرجة في مناهجك الرسمية.',
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
    guideTitle: 'كيف تخطط لدرجتك النهائية',
    relatedTitle: 'حاسبات ذات صلة',
  },

  en: {
    locale: 'en',
    slug: 'final-grade-planner',
    title: 'Final grade planner',
    metaDescription:
      'Calculate the score you need on the final exam to hit a target grade, given the final\u2019s weight and your current grade.',
    h1: 'Final grade planner',
    intro:
      'Your final grade is a weighted average of your current grade and your final exam score. This calculator works out the score you need on the final to reach a target grade, and flags when that target is out of reach.',
    fields: {
      currentGrade: {
        label: 'Current grade (out of 100)',
        hint: 'Your grade in the course before the final exam.',
      },
      finalWeight: {
        label: 'Final exam weight (%)',
        hint: 'The final\u2019s share of the total grade, from 1 to 100.',
      },
      targetGrade: {
        label: 'Target grade (out of 100)',
        hint: 'The final grade you hope to reach.',
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
      requiredFinal: {
        label: 'Score needed on the final',
        hint: 'A value of 0 means your target is already secured; 100 means you need a perfect score (the target may be unreachable).',
        hero: true,
      },
      currentContribution: {
        label: 'Current contribution',
        hint: 'The part of the final grade your current grade already secures.',
      },
      maxAchievable: {
        label: 'Maximum achievable grade',
        hint: 'The final grade you would get by scoring 100 on the final.',
      },
    },
    resultTitle: 'Results',
    formula:
      'Score needed on the final = (target \u2212 current contribution) \u00f7 final weight. Contribution = current grade \u00d7 (1 \u2212 final weight).',
    exampleHtml:
      '<p>Example using the calculator\u2019s values: current grade <strong>80</strong>, final weight <strong>30%</strong>, target <strong>85</strong>.<br>You need about <strong>96.67</strong> on the final.<br>Your current contribution is <strong>56</strong> and the maximum achievable is <strong>86</strong>.</p>',
    assumptions: [
      'The final grade is a weighted average of your current grade and the final exam only.',
      'The final\u2019s weight is entered as a percentage (like 30 for a 30% weight).',
      'The result is clamped between 0 and 100; if more than a perfect score is needed, the target is unreachable.',
      'Your current grade already includes all coursework before the final.',
    ],
    whenUseful:
      'Use it before the final exam to know exactly what you need, or to see whether your target is realistic or worth revising.',
    mistakes: [
      'Entering the weight as a fraction (like 0.3) instead of a percentage (30).',
      'Ignoring the final\u2019s weight and treating the needed score as the gap between target and current grade.',
      'Missing that the target may be unreachable when the needed score exceeds 100.',
    ],
    faqs: [
      {
        q: 'What if the score I need is over 100?',
        a: 'That means your target is unreachable even with a perfect score, because your current contribution is not enough. The calculator clamps the result to 100.',
      },
      {
        q: 'My final is worth more than 100 points raw, what do I do?',
        a: 'Enter its true weight as a percentage of the total grade; the math uses the relative weight, not the raw point count.',
      },
    ],
    methodologyNote:
      'The calculator multiplies your current grade by (1 \u2212 final weight) to get its contribution, then works out the final score needed to close the gap to your target, clamped between 0 and 100.',
    disclaimerNote:
      'Results are estimates based on the weights you enter; check the grade components in your official syllabus.',
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
    guideTitle: 'How to plan your final grade',
    relatedTitle: 'Related calculators',
  },
};

export default content;
