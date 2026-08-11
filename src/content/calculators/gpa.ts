import type { CalcContent } from '../../lib/calculators/types';
import type { Locale } from '../../config/site';

const content: Record<Locale, CalcContent> = {
  ar: {
    locale: 'ar',
    slug: 'gpa',
    title: 'حاسبة المعدل التراكمي',
    metaDescription:
      'احسب معدلك التراكمي على سلم 4 أو 5 نقاط من درجاتك وساعاتك المعتمدة، مع إمكانية ترك الصفوف الفارغة.',
    h1: 'حاسبة المعدل التراكمي',
    intro:
      'المعدل التراكمي (GPA) متوسط مرجّح بساعات المواد المعتمدة. تساعدك هذه الحاسبة على حسابه على سلم 4 أو 5 نقاط من درجاتك الحرفية وساعاتك، مع تجاهل الصفوف الفارغة تلقائياً.',
    fields: {
      scale: {
        label: 'سلم التقدير',
        hint: 'اختر السلم المعتمد في جامعتك: 4 أو 5 نقاط.',
        options: {
          '4': '4 نقاط',
          '5': '5 نقاط',
        },
      },
      grade0: {
        label: 'درجة المادة',
        hint: 'أدخل درجاتك وساعاتك؛ يمكنك ترك الصفوف الفارغة.',
      },
      credits0: {
        label: 'الساعات المعتمدة',
      },
      grade1: {
        label: 'درجة المادة',
      },
      credits1: {
        label: 'الساعات المعتمدة',
      },
      grade2: {
        label: 'درجة المادة',
      },
      credits2: {
        label: 'الساعات المعتمدة',
      },
      grade3: {
        label: 'درجة المادة',
      },
      credits3: {
        label: 'الساعات المعتمدة',
      },
      grade4: {
        label: 'درجة المادة',
      },
      credits4: {
        label: 'الساعات المعتمدة',
      },
      grade5: {
        label: 'درجة المادة',
      },
      credits5: {
        label: 'الساعات المعتمدة',
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
      gpa: {
        label: 'المعدل التراكمي',
        hint: 'مجموع النقاط مقسوماً على إجمالي الساعات المعتمدة.',
        hero: true,
      },
      totalCredits: {
        label: 'إجمالي الساعات',
        hint: 'مجموع الساعات المعتمدة للمواد المدخلة.',
      },
      totalPoints: {
        label: 'إجمالي النقاط',
        hint: 'مجموع نقاط كل مادة (الدرجة × الساعات).',
      },
    },
    resultTitle: 'النتائج',
    formula:
      'المعدل التراكمي = مجموع (نقاط الدرجة × الساعات) ÷ إجمالي الساعات. على سلم 4: A = A+ = 4.0، وعلى سلم 5: A = A+ = 5.0.',
    exampleHtml:
      '<p>مثال بقيم الحاسبة على سلم <strong>4</strong> نقاط:<br>A (3 ساعات)، B (4 ساعات)، A- (3 ساعات)، C (ساعتان).<br>المعدل التراكمي ≈ <strong>3.26</strong>.<br>إجمالي الساعات <strong>12</strong>، وإجمالي النقاط <strong>39.1</strong>.</p>',
    assumptions: [
      'يُحسب المعدل وزناً بالساعات المعتمدة، لا عدّاً بسيطاً للمواد.',
      'على سلم 4 نقاط تعادل A+ درجة A تماماً (4.0)؛ وعلى سلم 5 تعادل A+ درجة A (5.0).',
      'تُتجاهل الصفوف الفارغة أو التي تنقصها ساعات أو درجة.',
      'اختيار السلم يجب أن يطابق سلم جامعتك ليكون الناتج دقيقاً.',
      'النتائج استرشادية وليست نسخة من سجلك الرسمي.',
    ],
    whenUseful:
      'استخدمها عند احتساب معدلك للفصل الحالي أو عند التقديم للمنح أو الدراسات العليا لتعرف معدلك التراكمي وفق سلم جامعتك.',
    mistakes: [
      'الخلط بين سلم 4 وسلم 5 أو استخدام سلم لا تطبقه جامعتك.',
      'إدخال نسبة مئوية (مثل 85) بدلاً من الدرجة الحرفية.',
      'إدراج مواد سحبها الطالب (Withdrawn) في الحساب.',
      'إدخال ساعات صفرية، فالمادة بلا ساعات لا تؤثر في المعدل.',
    ],
    faqs: [
      {
        q: 'لماذا تساوي A+ درجة A على سلم 4؟',
        a: 'في معظم الأنظمة الأميركية لا تتجاوز A+ قمة السلم، لذا تتساوى القيمتان على سلم 4 نقاط. بعض الجامعات تمنح 4.33 لـ A+، فتحقق من سلمك.',
      },
      {
        q: 'جامعتي تستخدم نظام المئة، فماذا أفعل؟',
        a: 'استخدم حاسبة متوسط الدرجات للدرجات المئوية. المعدل التراكمي هنا يعتمد على الدرجات الحرفية والساعات.',
      },
      {
        q: 'هل يشمل المعدل مواد النجاح/الرسوب (Pass/Fail)؟',
        a: 'لا، عادة لا تدخل المواد غير الموزونة في حساب المعدل، وتتجاهلها الحاسبة لأنها لا تملك درجة حرفية.',
      },
    ],
    methodologyNote:
      'تحسب الحاسبة مجموع النقاط بضرب قيمة كل درجة حرفية في ساعاتها ثم تقسيمها على إجمالي الساعات، مع تجاهل الصفوف غير المكتملة.',
    disclaimerNote:
      'النتائج تقديرية، والسجلات الرسمية لجامعتك هي المرجع المعتمد دائماً.',
    lastReviewed: '2026-08-10',
    requiredNote: 'املأ صفاً واحداً على الأقل. الحقول الإلزامية داخل كل صف مشار إليها بعلامة *.',
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
    guideTitle: 'كيف تحسب المعدل التراكمي',
    relatedTitle: 'حاسبات ذات صلة',
  },

  en: {
    locale: 'en',
    slug: 'gpa',
    title: 'GPA calculator',
    metaDescription:
      'Calculate your GPA on the 4.0 or 5.0 scale from your letter grades and credit hours, leaving empty rows out.',
    h1: 'GPA calculator',
    intro:
      'Your grade point average (GPA) is a weighted mean, weighted by each course\u2019s credit hours. This calculator works it out on the 4.0 or 5.0 scale from your letter grades and credits, ignoring empty rows automatically.',
    fields: {
      scale: {
        label: 'Grading scale',
        hint: 'Choose the scale your university uses: 4 or 5 points.',
        options: {
          '4': '4-point',
          '5': '5-point',
        },
      },
      grade0: {
        label: 'Grade',
        hint: 'Enter your grades and credits; empty rows are ignored.',
      },
      credits0: {
        label: 'Credit hours',
      },
      grade1: {
        label: 'Grade',
      },
      credits1: {
        label: 'Credit hours',
      },
      grade2: {
        label: 'Grade',
      },
      credits2: {
        label: 'Credit hours',
      },
      grade3: {
        label: 'Grade',
      },
      credits3: {
        label: 'Credit hours',
      },
      grade4: {
        label: 'Grade',
      },
      credits4: {
        label: 'Credit hours',
      },
      grade5: {
        label: 'Grade',
      },
      credits5: {
        label: 'Credit hours',
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
      gpa: {
        label: 'GPA',
        hint: 'Total points divided by total credits.',
        hero: true,
      },
      totalCredits: {
        label: 'Total credits',
        hint: 'The sum of credit hours for the entered courses.',
      },
      totalPoints: {
        label: 'Total points',
        hint: 'The sum of each course\u2019s points (grade \u00d7 credits).',
      },
    },
    resultTitle: 'Results',
    formula:
      'GPA = sum of (grade points \u00d7 credits) \u00f7 total credits. On the 4.0 scale A = A+ = 4.0; on the 5.0 scale A = A+ = 5.0.',
    exampleHtml:
      '<p>Example using the calculator\u2019s values on the <strong>4</strong>-point scale:<br>A (3 credits), B (4 credits), A- (3 credits), C (2 credits).<br>Your GPA is about <strong>3.26</strong>.<br>Total credits <strong>12</strong>, total points <strong>39.1</strong>.</p>',
    assumptions: [
      'The GPA is credit-weighted, not a simple average of courses.',
      'On the 4.0 scale A+ equals A (4.0); on the 5.0 scale A+ equals A (5.0).',
      'Rows that are empty or missing a grade or credits are ignored.',
      'The scale choice must match your university for an accurate result.',
      'Results are estimates, not a copy of your official transcript.',
    ],
    whenUseful:
      'Use it when computing your term GPA or preparing applications for scholarships or graduate school to know your GPA on your university\u2019s scale.',
    mistakes: [
      'Mixing the 4.0 and 5.0 scales or using a scale your university does not apply.',
      'Entering a percentage (like 85) instead of a letter grade.',
      'Including withdrawn courses in the calculation.',
      'Entering zero credits, since a course with no credits does not move the GPA.',
    ],
    faqs: [
      {
        q: 'Why is A+ worth the same as A on the 4.0 scale?',
        a: 'In most American systems A+ does not exceed the top of the scale, so both map to 4.0. Some universities award 4.33 for A+, so check your own scale.',
      },
      {
        q: 'My university uses a 100-point system, what should I do?',
        a: 'Use the grade average calculator for percentage grades. This GPA calculator relies on letter grades and credit hours.',
      },
      {
        q: 'Does the GPA include pass/fail courses?',
        a: 'No. Pass/fail courses are usually unweighted and excluded, and this calculator skips them because they have no letter grade.',
      },
    ],
    methodologyNote:
      'The calculator sums the points of each letter grade multiplied by its credits, then divides by total credits, ignoring incomplete rows.',
    disclaimerNote:
      'Results are estimates; your university\u2019s official records are always the reference.',
    lastReviewed: '2026-08-10',
    requiredNote: 'Fill in at least one row. Required fields inside each row are marked with an asterisk (*).',
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
    guideTitle: 'How to calculate your GPA',
    relatedTitle: 'Related calculators',
  },
};

export default content;
