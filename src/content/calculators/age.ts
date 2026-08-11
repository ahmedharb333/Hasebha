import type { CalcContent } from '../../lib/calculators/types';
import type { Locale } from '../../config/site';

const content: Record<Locale, CalcContent> = {
  ar: {
    locale: 'ar',
    slug: 'age',
    title: 'حاسبة العمر',
    metaDescription:
      'احسب عمرك بالسنوات والشهور والأيام بدقة، أو عمر أي شخص بين تاريخ ولادته وأي تاريخ تختاره.',
    h1: 'حاسبة العمر',
    intro:
      'تعتمد حاسبة العمر على التقويم الميلادي لحساب عمرك بدقة بالسنوات والشهور والأيام، بين تاريخ ميلادك وأي تاريخ تختاره (واليوم افتراضياً). تعالج الحساب المبنى على التقويم السنوات الكبيسة واختلاف أطوال الشهور تلقائياً.',
    fields: {
      birthDate: {
        label: 'تاريخ الميلاد',
        hint: 'تاريخ ميلادك أو تاريخ ميلاد الشخص.',
      },
      asOfDate: {
        label: 'حتى تاريخ (اختياري، اليوم افتراضياً)',
        hint: 'التاريخ الذي يُحسب العمر عنده؛ اتركه فارغاً لاستخدام اليوم.',
      },
    },
    errorMessages: {
      required: 'هذا الحقل مطلوب.',
      invalid: 'يرجى إدخال تاريخ صحيح.',
      min: 'القيمة المدخلة أقل من الحد الأدنى المسموح.',
      max: 'تاريخ الميلاد يجب أن يكون قبل تاريخ الحساب.',
      __generic: 'تعذّر إتمام الحساب، تحقق من المدخلات.',
    },
    results: {
      ageYears: {
        label: 'العمر',
        hint: 'عمرك بالسنوات الكاملة حتى التاريخ المحدد.',
        hero: true,
      },
      totalMonths: {
        label: 'إجمالي الأشهر',
        hint: 'العمر معبّراً عنه بالأشهر.',
      },
      totalDays: {
        label: 'إجمالي الأيام',
        hint: 'العمر معبّراً عنه بالأيام، بمحاذاة التقويم.',
      },
      totalWeeks: {
        label: 'إجمالي الأسابيع',
        hint: 'إجمالي الأيام مقسوماً على 7.',
      },
      daysUntilNextBirthday: {
        label: 'أيام حتى عيد الميلاد القادم',
        hint: 'عدد الأيام المتبقية حتى عيد ميلادك التالي.',
      },
    },
    resultTitle: 'النتائج',
    formula:
      'العمر = الفرق بالتقويم بين تاريخ الميلاد وتاريخ الحساب، مقسّماً إلى سنوات وشهور وأيام.',
    exampleHtml:
      '<p>مثال بقيم الحاسبة: مواليد <strong>2000-01-01</strong> حتى <strong>2024-01-01</strong>.<br>العمر <strong>24</strong> سنة، أي <strong>288</strong> شهراً، أو <strong>8,766</strong> يوماً، أو <strong>1,252</strong> أسبوعاً.<br>أيام حتى عيد الميلاد القادم: <strong>0</strong>.</p>',
    assumptions: [
      'الحساب بالتقويم الميلادي حصراً (وليس الهجري).',
      'يحسب العمر في التاريخ المحدد دون احتساب الوقت (ساعات ودقائق).',
      'تاريخ الحساب شامل: يشمل يوم العمر نفسه.',
      'يُعالج اليوم الكبيس (29 فبراير) بالاعتماد على يوم 28 فبراير أو 1 مارس حسب السنة.',
    ],
    whenUseful:
      'استخدمها لحساب عمرك بالضبط لتعبئة النماذج الرسمية، أو لمعرفة أيام عيد ميلادك القادم، أو العمر بين أي تاريخين.',
    mistakes: [
      'الخلط بين التاريخ الهجري والميلادي — الحاسبة ميلادية فقط.',
      'إدخال تاريخ الميلاد نفسه كتاريخ حساب، وهو ما يعطي عمراً صفراً.',
      'افتراض أن العمر يُحسب بالوقت (الساعات والدقائق) بدلاً من التاريخ.',
    ],
    faqs: [
      {
        q: 'كيف تُعالج الحاسبة مواليد 29 فبراير؟',
        a: 'في السنوات غير الكبيسة يُحتسب عيد الميلاد في 28 فبراير أو 1 مارس حسب التقويم، ويُعامل العمر على أساس التقويم لا الأيام الفعلية.',
      },
      {
        q: 'هل الحاسبة بالتاريخ الهجري أم الميلادي؟',
        a: 'ميلادية فقط. لحساب العمر بالهجري تحتاج تحويل التاريخ الهجري إلى ميلادي أولاً.',
      },
    ],
    methodologyNote:
      'تحسب الحاسبة الفرق التقويمي بين التاريخين محلياً (وليس بصيغة UTC)، وتفككه إلى سنوات وشهور وأيام مع مراعاة أطوال الشهور والسنوات الكبيسة.',
    disclaimerNote:
      'النتائج بالتقويم الميلادي وقد تختلف عن العمر الهجري أو عن الحسابات الرسمية التي تعتمد معايير أخرى.',
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
    guideTitle: 'كيف تحسب العمر',
    relatedTitle: 'حاسبات ذات صلة',
  },

  en: {
    locale: 'en',
    slug: 'age',
    title: 'Age calculator',
    metaDescription:
      'Calculate your exact age in years, months and days \u2014 or anyone\u2019s age between a birth date and any date you choose.',
    h1: 'Age calculator',
    intro:
      'The age calculator uses the Gregorian calendar to compute your age precisely in years, months and days, between a birth date and any date you choose (today by default). The calendar-based math handles leap years and differing month lengths automatically.',
    fields: {
      birthDate: {
        label: 'Birth date',
        hint: 'Your birth date or the person\u2019s birth date.',
      },
      asOfDate: {
        label: 'As of date (optional, defaults to today)',
        hint: 'The date to calculate the age at; leave empty to use today.',
      },
    },
    errorMessages: {
      required: 'This field is required.',
      invalid: 'Please enter a valid date.',
      min: 'The entered value is below the allowed minimum.',
      max: 'The birth date must be before the calculation date.',
      __generic: 'Could not complete the calculation. Please check your inputs.',
    },
    results: {
      ageYears: {
        label: 'Age',
        hint: 'Your age in complete years up to the given date.',
        hero: true,
      },
      totalMonths: {
        label: 'Total months',
        hint: 'The age expressed in months.',
      },
      totalDays: {
        label: 'Total days',
        hint: 'The age expressed in calendar days.',
      },
      totalWeeks: {
        label: 'Total weeks',
        hint: 'Total days divided by 7.',
      },
      daysUntilNextBirthday: {
        label: 'Days until next birthday',
        hint: 'How many days remain until your next birthday.',
      },
    },
    resultTitle: 'Results',
    formula:
      'Age = the calendar difference between the birth date and the calculation date, split into years, months and days.',
    exampleHtml:
      '<p>Example using the calculator\u2019s values: born <strong>2000-01-01</strong> as of <strong>2024-01-01</strong>.<br>Age <strong>24</strong> years, i.e. <strong>288</strong> months, <strong>8,766</strong> days, or <strong>1,252</strong> weeks.<br>Days until next birthday: <strong>0</strong>.</p>',
    assumptions: [
      'The calculation is Gregorian only (not Hijri).',
      'Age is computed on the given date without counting time of day.',
      'The calculation date is inclusive: it includes the day of the age itself.',
      'Leap-day births (29 February) are handled using 28 February or 1 March depending on the year.',
    ],
    whenUseful:
      'Use it for your exact age on official forms, to see how many days to your next birthday, or the age between any two dates.',
    mistakes: [
      'Mixing Hijri and Gregorian dates \u2014 this calculator is Gregorian only.',
      'Entering the birth date as the calculation date, which yields age zero.',
      'Assuming age is measured by time (hours and minutes) rather than by date.',
    ],
    faqs: [
      {
        q: 'How does the calculator handle 29 February births?',
        a: 'In non-leap years the birthday is counted on 28 February or 1 March per the calendar, and age is handled on a calendar basis rather than actual days.',
      },
      {
        q: 'Is the calculator Hijri or Gregorian?',
        a: 'Gregorian only. To compute a Hijri age you first need to convert the Hijri date to Gregorian.',
      },
    ],
    methodologyNote:
      'The calculator computes the calendar difference between the two dates locally (not in UTC) and breaks it into years, months and days while respecting month lengths and leap years.',
    disclaimerNote:
      'Results are in the Gregorian calendar and may differ from a Hijri age or official calculations using other standards.',
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
    guideTitle: 'How to calculate age',
    relatedTitle: 'Related calculators',
  },
};

export default content;
