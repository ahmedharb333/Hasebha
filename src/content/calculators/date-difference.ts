import type { CalcContent } from '../../lib/calculators/types';
import type { Locale } from '../../config/site';

const content: Record<Locale, CalcContent> = {
  ar: {
    locale: 'ar',
    slug: 'date-difference',
    title: 'حاسبة الفرق بين تاريخين',
    metaDescription:
      'احسب الفرق بين تاريخين بالسنوات والشهور والأيام، وعدد الأيام والأسابيع بينهما.',
    h1: 'حاسبة الفرق بين تاريخين',
    intro:
      'تحسب حاسبة الفرق بين تاريخين المدة الفاصلة بينهما بطريقتين: تفصيل تقويمي بالسنوات والشهور والأيام، وعدد إجمالي دقيق للأيام والأسابيع. الحساب ميلادي بالكامل.',
    fields: {
      startDate: {
        label: 'تاريخ البداية',
        hint: 'أول تاريخ في المدة.',
      },
      endDate: {
        label: 'تاريخ النهاية',
        hint: 'آخر تاريخ في المدة، ويجب أن يكون بعد البداية أو مساوياً لها.',
      },
    },
    errorMessages: {
      required: 'هذا الحقل مطلوب.',
      invalid: 'يرجى إدخال تاريخ صحيح.',
      min: 'القيمة المدخلة أقل من الحد الأدنى المسموح.',
      max: 'تاريخ النهاية يجب أن يكون بعد تاريخ البداية.',
      __generic: 'تعذّر إتمام الحساب، تحقق من المدخلات.',
    },
    results: {
      years: {
        label: 'السنوات',
        hint: 'السنوات الكاملة بين التاريخين.',
        hero: true,
      },
      months: {
        label: 'الشهور',
        hint: 'الأشهر الكاملة المتبقية بعد السنوات.',
      },
      days: {
        label: 'الأيام',
        hint: 'الأيام المتبقية بعد الأشهر الكاملة.',
      },
      totalDays: {
        label: 'إجمالي الأيام',
        hint: 'العدد الدقيق للأيام بين التاريخين.',
      },
      totalWeeks: {
        label: 'إجمالي الأسابيع',
        hint: 'إجمالي الأيام مقسوماً على 7.',
      },
    },
    resultTitle: 'النتائج',
    formula:
      'المدة = الفرق التقويمي (سنوات، شهور، أيام)، وإجمالي الأيام = فرق الأيام الفعلي بين التاريخين.',
    exampleHtml:
      '<p>مثال بقيم الحاسبة: <strong>2020-01-01</strong> إلى <strong>2024-01-01</strong>.<br>المدة <strong>4</strong> سنوات.<br>إجمالي الأيام <strong>1,461</strong> (سنة 2020 كبيسة)، أي <strong>208</strong> أسابيع.</p>',
    assumptions: [
      'الحساب بالتقويم الميلادي حصراً.',
      'تاريخ النهاية شامل: يُحسب اليوم الأخير ضمن المدة.',
      'تفصيل السنوات والشهور والأيام تقويمي، وليس عدداً ثابتاً من الأيام.',
      'صَفّ الأيام يعبر عن البقية بعد الأشهر الكاملة، ولا يساوي إجمالي الأيام.',
    ],
    whenUseful:
      'استخدمها لحساب مدة عقد أو صلاحية منتج أو فترة بين مناسبتين، أو لمعرفة كم يوماً تبقى لموعد مهم.',
    mistakes: [
      'عكس التاريخين — يمنع الحساب ذلك ويعرض خطأ.',
      'الظن أن صف الأيام يساوي إجمالي الأيام؛ صف الأيام هو البقية بعد الأشهر الكاملة.',
      'الخلط بين التاريخ الهجري والميلادي.',
    ],
    faqs: [
      {
        q: 'هل تاريخ النهاية مشمول في الحساب؟',
        a: 'نعم، يُحسب الفرق بطريقة تشمل يوم النهاية كجزء من المدة (الفروق بين منتصف الليل بتوقيت محلي).',
      },
      {
        q: 'كيف تُعالج أطوال الشهور المختلفة؟',
        a: 'الحساب تقويمي: يضبط تلقائياً الفروق بين الشهور ذات الأطوال المختلفة والسنوات الكبيسة.',
      },
    ],
    methodologyNote:
      'تحسب الحاسبة فرق الأيام الكامل عبر منتصف الليل المحلي، ثم تفكك المدة تقويمياً إلى سنوات وشهور وأيام بمراعاة أطوال الشهور والسنوات الكبيسة.',
    disclaimerNote:
      'النتائج بالتقويم الميلادي، وقد تختلف الفروق بين بعض الأنظمة القانونية في طريقة احتساب الأيام.',
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
    guideTitle: 'كيف تعد الأيام بين تاريخين',
    relatedTitle: 'حاسبات ذات صلة',
  },

  en: {
    locale: 'en',
    slug: 'date-difference',
    title: 'Date difference calculator',
    metaDescription:
      'Calculate the difference between two dates in years, months and days, plus the total days and weeks.',
    h1: 'Date difference calculator',
    intro:
      'The date difference calculator works out the span between two dates two ways: a calendar breakdown into years, months and days, and an exact total of days and weeks. The calculation is Gregorian throughout.',
    fields: {
      startDate: {
        label: 'Start date',
        hint: 'The first date of the span.',
      },
      endDate: {
        label: 'End date',
        hint: 'The last date of the span; it must be on or after the start date.',
      },
    },
    errorMessages: {
      required: 'This field is required.',
      invalid: 'Please enter a valid date.',
      min: 'The entered value is below the allowed minimum.',
      max: 'The end date must be on or after the start date.',
      __generic: 'Could not complete the calculation. Please check your inputs.',
    },
    results: {
      years: {
        label: 'Years',
        hint: 'Complete years between the two dates.',
        hero: true,
      },
      months: {
        label: 'Months',
        hint: 'Complete months left after the years.',
      },
      days: {
        label: 'Days',
        hint: 'Days left after the complete months.',
      },
      totalDays: {
        label: 'Total days',
        hint: 'The exact number of days between the two dates.',
      },
      totalWeeks: {
        label: 'Total weeks',
        hint: 'Total days divided by 7.',
      },
    },
    resultTitle: 'Results',
    formula:
      'Span = the calendar difference (years, months, days), and total days = the actual day difference between the dates.',
    exampleHtml:
      '<p>Example using the calculator\u2019s values: <strong>2020-01-01</strong> to <strong>2024-01-01</strong>.<br>The span is <strong>4</strong> years.<br>Total days <strong>1,461</strong> (2020 is a leap year), i.e. <strong>208</strong> weeks.</p>',
    assumptions: [
      'The calculation is Gregorian only.',
      'The end date is inclusive: the last day counts within the span.',
      'The years/months/days breakdown is calendar-based, not a fixed day count.',
      'The days row is the residue after full months, not the total days.',
    ],
    whenUseful:
      'Use it to count a contract period, a product\u2019s validity, the time between occasions, or how many days remain to an important date.',
    mistakes: [
      'Reversing the two dates \u2014 the calculator blocks it with an error.',
      'Expecting the days row to equal total days; the days row is the residue after full months.',
      'Mixing Hijri and Gregorian dates.',
    ],
    faqs: [
      {
        q: 'Is the end date included?',
        a: 'Yes. The difference is computed so that the end date\u2019s day counts within the span (differences between local midnights).',
      },
      {
        q: 'How are differing month lengths handled?',
        a: 'The calculation is calendar-based: it adjusts automatically for months of different lengths and for leap years.',
      },
    ],
    methodologyNote:
      'The calculator computes the full day difference across local midnights, then breaks the span into years, months and days respecting month lengths and leap years.',
    disclaimerNote:
      'Results are in the Gregorian calendar; some legal systems count day differences slightly differently.',
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
    guideTitle: 'How to count days between dates',
    relatedTitle: 'Related calculators',
  },
};

export default content;
