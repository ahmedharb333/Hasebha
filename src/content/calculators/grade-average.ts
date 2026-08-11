import type { CalcContent } from '../../lib/calculators/types';
import type { Locale } from '../../config/site';

const content: Record<Locale, CalcContent> = {
  ar: {
    locale: 'ar',
    slug: 'grade-average',
    title: 'حاسبة متوسط الدرجات',
    metaDescription:
      'احسب متوسط درجاتك من مئة وأعلى وأدنى درجة من دون الحاجة لملء كل الخانات.',
    h1: 'حاسبة متوسط الدرجات',
    intro:
      'متوسط الدرجات ناتج قسمة مجموع درجاتك على عددها. تساعدك هذه الحاسبة على حساب المتوسط من مئة مع أعلى وأدنى درجة، دون الحاجة لملء كل الخانات المتاحة.',
    fields: {
      grade0: {
        label: 'درجة',
        hint: 'أدخل الدرجات من 0 إلى 100؛ اترك الخانات الفارغة.',
      },
      grade1: {
        label: 'درجة',
      },
      grade2: {
        label: 'درجة',
      },
      grade3: {
        label: 'درجة',
      },
      grade4: {
        label: 'درجة',
      },
      grade5: {
        label: 'درجة',
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
      average: {
        label: 'متوسط الدرجات',
        hint: 'مجموع الدرجات المدخلة مقسوماً على عددها.',
        hero: true,
      },
      count: {
        label: 'عدد الدرجات',
        hint: 'عدد الدرجات التي أدخلتها فعلياً.',
      },
      highest: {
        label: 'أعلى درجة',
        hint: 'أعلى درجة بين ما أدخلته.',
      },
      lowest: {
        label: 'أدنى درجة',
        hint: 'أدنى درجة بين ما أدخلته.',
      },
    },
    resultTitle: 'النتائج',
    formula: 'المتوسط = مجموع الدرجات ÷ عدد الدرجات.',
    exampleHtml:
      '<p>مثال بقيم الحاسبة: درجات <strong>85، 92، 78، 88</strong>.<br>المتوسط ≈ <strong>85.75</strong>.<br>عدد الدرجات <strong>4</strong>، الأعلى <strong>92</strong>، والأدنى <strong>78</strong>.</p>',
    assumptions: [
      'المتوسط حسابي بسيط غير مرجّح بالساعات المعتمدة.',
      'تُستخدم الخانات المعبأة فقط، وتُتجاهل الفارغة.',
      'جميع الدرجات على سلم واحد من 0 إلى 100.',
      'النتائج استرشادية لأغراض المتابعة الأكاديمية.',
    ],
    whenUseful:
      'استخدمها لتتبع أداءك عبر المواد، أو لمعرفة متوسطك في فصل دراسي أو في مادة ذات تقييمات متعددة.',
    mistakes: [
      'الخلط بين درجات مختلفة السلالم، مثل درجة من 50 مع درجة من 100.',
      'اعتبار المتوسط مرجّحاً بالساعات، وهو غير مرجّح هنا.',
      'إدخال الدرجات كنسب مئوية من مئويات مختلفة.',
    ],
    faqs: [
      {
        q: 'هل تراعي هذه الحاسبة الساعات المعتمدة؟',
        a: 'لا، المتوسط هنا غير مرجّح. إذا كانت مادتك موزونة بالساعات فاستخدم حاسبة المعدل التراكمي.',
      },
      {
        q: 'هل يمكنني حساب متوسط درجات من مئويات مختلفة؟',
        a: 'لا. يفترض أن جميع الدرجات من 100؛ لمزج مئويات مختلفة ستحتاج لتحويلها لسلم موحد أولاً.',
      },
    ],
    methodologyNote:
      'تجمع الحاسبة الدرجات المدخلة فقط ثم تقسمها على عددها، وتستخرج أعلى وأدنى قيمة تلقائياً.',
    disclaimerNote:
      'النتائج تقديرية لأغراض المتابعة، وليست سجلاً رسمياً.',
    lastReviewed: '2026-08-10',
    requiredNote: 'أدخل درجة واحدة على الأقل. الحقول المطلوبة مشار إليها بعلامة *.',
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
    guideTitle: 'كيف تحسب متوسط الدرجات',
    relatedTitle: 'حاسبات ذات صلة',
  },

  en: {
    locale: 'en',
    slug: 'grade-average',
    title: 'Grade average calculator',
    metaDescription:
      'Average your grades out of 100, with the highest and lowest, without filling every field.',
    h1: 'Grade average calculator',
    intro:
      'A grade average is the sum of your grades divided by their count. This calculator works out the average out of 100 along with the highest and lowest grade, without requiring every field to be filled.',
    fields: {
      grade0: {
        label: 'Grade',
        hint: 'Enter grades from 0 to 100; leave empty fields out.',
      },
      grade1: {
        label: 'Grade',
      },
      grade2: {
        label: 'Grade',
      },
      grade3: {
        label: 'Grade',
      },
      grade4: {
        label: 'Grade',
      },
      grade5: {
        label: 'Grade',
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
      average: {
        label: 'Average',
        hint: 'The sum of the entered grades divided by their count.',
        hero: true,
      },
      count: {
        label: 'Grades counted',
        hint: 'How many grades you actually entered.',
      },
      highest: {
        label: 'Highest',
        hint: 'The highest grade you entered.',
      },
      lowest: {
        label: 'Lowest',
        hint: 'The lowest grade you entered.',
      },
    },
    resultTitle: 'Results',
    formula: 'Average = sum of grades \u00f7 number of grades.',
    exampleHtml:
      '<p>Example using the calculator\u2019s values: grades <strong>85, 92, 78, 88</strong>.<br>The average is about <strong>85.75</strong>.<br>Grades counted <strong>4</strong>, highest <strong>92</strong>, lowest <strong>78</strong>.</p>',
    assumptions: [
      'The average is a simple arithmetic mean, not credit-weighted.',
      'Only filled fields are used; empty fields are ignored.',
      'All grades are on a single 0 to 100 scale.',
      'Results are estimates for academic tracking.',
    ],
    whenUseful:
      'Use it to track your performance across subjects, or to find your average in a term or for a course with multiple assessments.',
    mistakes: [
      'Mixing grades on different scales, like a score out of 50 with one out of 100.',
      'Treating the average as credit-weighted; it is unweighted here.',
      'Entering percentages from different maximums as if they were comparable.',
    ],
    faqs: [
      {
        q: 'Does this calculator account for credit hours?',
        a: 'No, the average here is unweighted. If your courses are credit-weighted, use the GPA calculator.',
      },
      {
        q: 'Can I average grades from different maximums?',
        a: 'No. All grades are assumed to be out of 100; to combine different scales you would need to convert them first.',
      },
    ],
    methodologyNote:
      'The calculator adds only the grades you entered, divides by their count, and picks out the highest and lowest values automatically.',
    disclaimerNote:
      'Results are estimates for tracking and are not an official record.',
    lastReviewed: '2026-08-10',
    requiredNote: 'Enter at least one grade. Required fields are marked with an asterisk (*).',
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
    guideTitle: 'How to calculate a grade average',
    relatedTitle: 'Related calculators',
  },
};

export default content;
