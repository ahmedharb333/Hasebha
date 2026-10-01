import type { GuideContent } from './types';
import type { Locale } from '../config/site';

/** Per-country maternity-leave guides. Days mirror the country-rules engine. Last reviewed 2026-10-01. */
const R = '2026-10-01';
const REL = ['maternity-leave', 'leave-balance', 'notice-period'];

type Row = { slug: string; days: number; enTitle: string; enMeta: string; enBody: string; enFaqA: string; arTitle: string; arMeta: string; arBody: string; arFaqA: string; enTake: string[]; arTake: string[] };

const rows: Row[] = [
  {
    slug: 'maternity-leave-jordan', days: 90,
    enTitle: 'Jordan Maternity Leave: 90 Days (2026)',
    enMeta: 'Jordan grants 90 continuous days of paid maternity leave under Labour Law Art. 70. Who qualifies, how it is paid, and the calculator.',
    enBody: 'Jordan provides **90 continuous days** of paid maternity leave under Article 70 of the Labour Law. It is paid leave, and dismissal connected to the pregnancy or leave is prohibited. The 90 days may be taken partly before and partly after delivery.',
    enFaqA: 'Jordan grants 90 continuous days of paid maternity leave under Article 70 of the Labour Law.',
    arTitle: 'إجازة الأمومة في الأردن: 90 يوماً (2026)',
    arMeta: 'يمنح الأردن 90 يوماً متصلة من إجازة الأمومة المدفوعة بموجب المادة 70 من قانون العمل. من يستحقها وكيف تُدفع والحاسبة.',
    arBody: 'يمنح الأردن **90 يوماً متصلة** من إجازة الأمومة المدفوعة بموجب المادة 70 من قانون العمل. وهي إجازة بأجر، ويُحظر الفصل المرتبط بالحمل أو الإجازة. ويمكن أخذ الـ90 يوماً جزئياً قبل الوضع وجزئياً بعده.',
    arFaqA: 'يمنح الأردن 90 يوماً متصلة من إجازة الأمومة المدفوعة بموجب المادة 70 من قانون العمل.',
    enTake: ['90 continuous days of paid maternity leave.', 'Paid in full; dismissal linked to the leave is prohibited.', 'May be split before and after delivery.'],
    arTake: ['90 يوماً متصلة من إجازة الأمومة المدفوعة.', 'مدفوعة بالكامل؛ ويُحظر الفصل المرتبط بالإجازة.', 'يمكن تقسيمها قبل الوضع وبعده.'],
  },
  {
    slug: 'maternity-leave-saudi-arabia', days: 84,
    enTitle: 'Saudi Maternity Leave: 12 Weeks (2026)',
    enMeta: 'Saudi Arabia grants 12 weeks (84 days) of paid maternity leave under Labour Law Art. 151, with 6 weeks mandatory after birth. Calculator + details.',
    enBody: 'Saudi Arabia provides **12 weeks (84 days)** of paid maternity leave under Article 151, as amended in 2025. At least **6 weeks are mandatory after birth**; the remaining weeks may be taken at the employee’s discretion, up to 4 weeks before the due date.',
    enFaqA: 'Saudi Arabia grants 12 weeks (84 days) of paid maternity leave, with 6 weeks mandatory after birth.',
    arTitle: 'إجازة الأمومة في السعودية: 12 أسبوعاً (2026)',
    arMeta: 'تمنح السعودية 12 أسبوعاً (84 يوماً) من إجازة الأمومة المدفوعة بموجب المادة 151، مع 6 أسابيع إلزامية بعد الولادة. حاسبة وتفاصيل.',
    arBody: 'تمنح السعودية **12 أسبوعاً (84 يوماً)** من إجازة الأمومة المدفوعة بموجب المادة 151 المعدّلة في 2025. و**6 أسابيع إلزامية بعد الولادة** على الأقل؛ وتُؤخذ بقية الأسابيع بحسب رغبة الموظفة، بحد أقصى 4 أسابيع قبل الموعد المتوقع.',
    arFaqA: 'تمنح السعودية 12 أسبوعاً (84 يوماً) من إجازة الأمومة المدفوعة، مع 6 أسابيع إلزامية بعد الولادة.',
    enTake: ['12 weeks (84 days) of paid maternity leave.', '6 weeks mandatory after birth.', 'Up to 4 weeks may be taken before the due date.'],
    arTake: ['12 أسبوعاً (84 يوماً) من إجازة الأمومة المدفوعة.', '6 أسابيع إلزامية بعد الولادة.', 'يمكن أخذ حتى 4 أسابيع قبل الموعد المتوقع.'],
  },
  {
    slug: 'maternity-leave-uae', days: 60,
    enTitle: 'UAE Maternity Leave: 60 Days (2026)',
    enMeta: 'UAE maternity leave is 60 days under Federal Decree-Law 33/2021: 45 days full pay + 15 days half pay, with options for unpaid extension. Calculator + details.',
    enBody: 'The UAE grants **60 days** of maternity leave under Article 30: the first **45 days on full pay** and the next **15 days on half pay**. Additional unpaid extension is available under the Implementing Regulation, for example on medical grounds.',
    enFaqA: 'The UAE grants 60 days of maternity leave — 45 days at full pay and 15 days at half pay.',
    arTitle: 'إجازة الأمومة في الإمارات: 60 يوماً (2026)',
    arMeta: 'إجازة الأمومة في الإمارات 60 يوماً بموجب المرسوم 33 لسنة 2021: 45 يوماً بأجر كامل + 15 يوماً بنصف أجر، مع خيارات تمديد دون أجر. حاسبة وتفاصيل.',
    arBody: 'تمنح الإمارات **60 يوماً** من إجازة الأمومة بموجب المادة 30: أول **45 يوماً بأجر كامل**، والـ**15 يوماً** التالية **بنصف أجر**. ويتاح تمديد إضافي دون أجر وفق اللائحة التنفيذية، مثلاً لأسباب طبية.',
    arFaqA: 'تمنح الإمارات 60 يوماً من إجازة الأمومة — 45 يوماً بأجر كامل و15 يوماً بنصف أجر.',
    enTake: ['60 days of maternity leave.', '45 days full pay + 15 days half pay.', 'Unpaid extension available under the regulation.'],
    arTake: ['60 يوماً من إجازة الأمومة.', '45 يوماً بأجر كامل + 15 يوماً بنصف أجر.', 'يتاح تمديد دون أجر وفق اللائحة.'],
  },
  {
    slug: 'maternity-leave-kuwait', days: 70,
    enTitle: 'Kuwait Maternity Leave: 70 Days (2026)',
    enMeta: 'Kuwait grants 70 days of paid maternity leave under Labour Law Art. 24 — 30 days before and 40 days after the expected delivery date. Calculator + details.',
    enBody: 'Kuwait provides **70 days** of maternity leave on full pay under Article 24 — **30 days before** and **40 days after** the expected delivery date. Additional unpaid leave may be granted afterwards under the law.',
    enFaqA: 'Kuwait grants 70 days of paid maternity leave — 30 before and 40 after the expected delivery date.',
    arTitle: 'إجازة الأمومة في الكويت: 70 يوماً (2026)',
    arMeta: 'يمنح الكويت 70 يوماً من إجازة الأمومة المدفوعة بموجب المادة 24 — 30 يوماً قبل الوضع و40 يوماً بعده. حاسبة وتفاصيل.',
    arBody: 'يمنح الكويت **70 يوماً** من إجازة الأمومة بأجر كامل بموجب المادة 24 — **30 يوماً قبل** و**40 يوماً بعد** الموعد المتوقع للوضع. ويجوز منح إجازة إضافية دون أجر بعدها وفق القانون.',
    arFaqA: 'يمنح الكويت 70 يوماً من إجازة الأمومة المدفوعة — 30 قبل الوضع و40 بعده.',
    enTake: ['70 days of paid maternity leave.', '30 days before and 40 days after the due date.', 'Further unpaid leave may follow.'],
    arTake: ['70 يوماً من إجازة الأمومة المدفوعة.', '30 يوماً قبل الوضع و40 بعده.', 'قد تليها إجازة إضافية دون أجر.'],
  },
  {
    slug: 'maternity-leave-qatar', days: 50,
    enTitle: 'Qatar Maternity Leave: 50 Days (2026)',
    enMeta: 'Qatar grants 50 days of paid maternity leave under Labour Law Art. 96 after one year of service, at least 35 days after delivery. Calculator + details.',
    enBody: 'Qatar provides **50 calendar days** of paid maternity leave under Article 96, available after **one year** of continuous service. At least **35 days** must fall after delivery, and dismissal during maternity leave is prohibited.',
    enFaqA: 'Qatar grants 50 days of paid maternity leave after one year of service, with at least 35 days after delivery.',
    arTitle: 'إجازة الأمومة في قطر: 50 يوماً (2026)',
    arMeta: 'يمنح قطر 50 يوماً من إجازة الأمومة المدفوعة بموجب المادة 96 بعد سنة خدمة، 35 يوماً منها بعد الولادة على الأقل. حاسبة وتفاصيل.',
    arBody: 'يمنح قطر **50 يوماً** من إجازة الأمومة المدفوعة بموجب المادة 96، تتاح بعد **سنة** خدمة متصلة. ويجب أن يقع **35 يوماً** منها على الأقل بعد الولادة، ويُحظر الفصل أثناء إجازة الأمومة.',
    arFaqA: 'يمنح قطر 50 يوماً من إجازة الأمومة المدفوعة بعد سنة خدمة، 35 يوماً منها بعد الولادة على الأقل.',
    enTake: ['50 days of paid maternity leave.', 'Available after one year of continuous service.', 'At least 35 days must fall after delivery.'],
    arTake: ['50 يوماً من إجازة الأمومة المدفوعة.', 'تتاح بعد سنة خدمة متصلة.', '35 يوماً منها على الأقل بعد الولادة.'],
  },
  {
    slug: 'maternity-leave-bahrain', days: 60,
    enTitle: 'Bahrain Maternity Leave: 60 Days (2026)',
    enMeta: 'Bahrain grants 60 days of paid maternity leave under Labour Law Art. 32, plus an optional 15 unpaid days; work in the 40 days after birth is prohibited. Calculator.',
    enBody: 'Bahrain provides **60 days** of maternity leave on full pay under Article 32, with an optional **15 additional unpaid days**. Employment in the **40 days following childbirth** is prohibited.',
    enFaqA: 'Bahrain grants 60 days of paid maternity leave, plus an optional 15 unpaid days.',
    arTitle: 'إجازة الأمومة في البحرين: 60 يوماً (2026)',
    arMeta: 'يمنح البحرين 60 يوماً من إجازة الأمومة المدفوعة بموجب المادة 32، مع 15 يوماً إضافية دون أجر اختيارياً؛ ويُحظر العمل في الـ40 يوماً بعد الولادة. حاسبة.',
    arBody: 'يمنح البحرين **60 يوماً** من إجازة الأمومة بأجر كامل بموجب المادة 32، مع **15 يوماً إضافية دون أجر** اختيارياً. ويُحظر العمل في **الأربعين يوماً التالية للوضع**.',
    arFaqA: 'يمنح البحرين 60 يوماً من إجازة الأمومة المدفوعة، مع 15 يوماً إضافية دون أجر.',
    enTake: ['60 days of paid maternity leave.', 'Optional 15 additional unpaid days.', 'Work is prohibited in the 40 days after birth.'],
    arTake: ['60 يوماً من إجازة الأمومة المدفوعة.', '15 يوماً إضافية دون أجر اختيارياً.', 'يُحظر العمل في الـ40 يوماً بعد الولادة.'],
  },
  {
    slug: 'maternity-leave-oman', days: 98,
    enTitle: 'Oman Maternity Leave: 98 Days (2026)',
    enMeta: 'Oman grants 98 days of maternity leave under Labour Law (RD 53/2023) Art. 84, covering before and after childbirth, plus 7 days paternity leave. Calculator.',
    enBody: 'Oman provides **98 days** of maternity leave under the 2023 Labour Law (Art. 84), covering the period before and after childbirth — one of the most generous in the region. The pre-birth portion, on medical recommendation, may not exceed 14 days. Fathers also receive **7 days** of paternity leave within 98 days of the birth.',
    enFaqA: 'Oman grants 98 days of maternity leave under the 2023 Labour Law, plus 7 days of paternity leave.',
    arTitle: 'إجازة الأمومة في عُمان: 98 يوماً (2026)',
    arMeta: 'يمنح عُمان 98 يوماً من إجازة الأمومة بموجب قانون العمل (مرسوم 53/2023) المادة 84، قبل الولادة وبعدها، مع 7 أيام إجازة أبوة. حاسبة.',
    arBody: 'يمنح عُمان **98 يوماً** من إجازة الأمومة بموجب قانون العمل لسنة 2023 (المادة 84)، تغطي ما قبل الولادة وبعدها — من الأسخى في المنطقة. ولا يتجاوز الجزء السابق للولادة، بتوصية طبية، 14 يوماً. كما يحصل الأب على **7 أيام** إجازة أبوة خلال 98 يوماً من الولادة.',
    arFaqA: 'يمنح عُمان 98 يوماً من إجازة الأمومة بموجب قانون العمل لسنة 2023، مع 7 أيام إجازة أبوة.',
    enTake: ['98 days of maternity leave — among the region’s most generous.', 'Pre-birth portion capped at 14 days on medical advice.', 'Fathers get 7 days of paternity leave.'],
    arTake: ['98 يوماً من إجازة الأمومة — من الأسخى في المنطقة.', 'الجزء السابق للولادة بحد 14 يوماً بتوصية طبية.', 'الأب يحصل على 7 أيام إجازة أبوة.'],
  },
];

const maternityGuides: Record<string, Record<Locale, GuideContent>> = {};
for (const r of rows) {
  maternityGuides[r.slug] = {
    en: {
      slug: r.slug, locale: 'en', title: r.enTitle, metaDescription: r.enMeta,
      intro: r.enBody,
      sections: [
        { heading: 'The entitlement', body: r.enBody },
        { heading: 'How it is paid', body: 'Maternity leave is paid by the employer at the stated rate for the stated period. Use the leave-balance calculator for annual leave, and the Klar calculators for other statutory entitlements in your country.' },
      ],
      keyTakeaways: r.enTake,
      faqs: [
        { q: `How many days of maternity leave in ${r.slug.replace('maternity-leave-', '').replace(/-/g, ' ')}?`, a: r.enFaqA },
        { q: 'Is maternity leave paid?', a: 'Yes — the statutory maternity period is paid as described; some countries add an optional unpaid extension.' },
        { q: 'Can I be dismissed during maternity leave?', a: 'Dismissal connected to pregnancy or maternity leave is prohibited in these jurisdictions.' },
      ],
      relatedCalculators: REL, lastReviewed: R,
    },
    ar: {
      slug: r.slug, locale: 'ar', title: r.arTitle, metaDescription: r.arMeta,
      intro: r.arBody,
      sections: [
        { heading: 'الاستحقاق', body: r.arBody },
        { heading: 'كيف تُدفع', body: 'تُدفع إجازة الأمومة من صاحب العمل بالنسبة والمدة المذكورتين. استخدم حاسبة رصيد الإجازات للإجازة السنوية، وحاسبات كلار لبقية الاستحقاقات القانونية في بلدك.' },
      ],
      keyTakeaways: r.arTake,
      faqs: [
        { q: 'كم يوماً إجازة أمومة؟', a: r.arFaqA },
        { q: 'هل إجازة الأمومة مدفوعة؟', a: 'نعم — الفترة القانونية للأمومة مدفوعة كما ورد؛ وتضيف بعض الدول تمديداً اختيارياً دون أجر.' },
        { q: 'هل يمكن فصلي أثناء إجازة الأمومة؟', a: 'يُحظر الفصل المرتبط بالحمل أو إجازة الأمومة في هذه الدول.' },
      ],
      relatedCalculators: REL, lastReviewed: R,
    },
  };
}

export default maternityGuides;
