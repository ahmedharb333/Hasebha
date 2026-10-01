import type { GuideContent } from './types';
import type { Locale } from '../config/site';

/** Per-country annual-leave guides. Entitlements mirror the country-rules engine. Last reviewed 2026-10-01. */
const R = '2026-10-01';
const REL = ['leave-balance', 'maternity-leave', 'end-of-service'];

type Row = { slug: string; country: string; countryAr: string; enTitle: string; enMeta: string; enBody: string; enFaqA: string; arTitle: string; arMeta: string; arBody: string; arFaqA: string; enTake: string[]; arTake: string[] };

const rows: Row[] = [
  {
    slug: 'annual-leave-jordan', country: 'Jordan', countryAr: 'الأردن',
    enTitle: 'Jordan Annual Leave: 14–21 Days (2026)',
    enMeta: 'Jordan annual leave: 14 days per year, rising to 21 days after 5 years of service (Labour Law Art. 61). Accrual, carryover, and the calculator.',
    enBody: 'Jordan grants **14 days** of paid annual leave per year, rising to **21 days after 5 years** of service with the same employer (Article 61). Leave accrues over the year and partial years are pro-rated.',
    enFaqA: 'Jordan grants 14 days of annual leave per year, rising to 21 days after 5 years of service.',
    arTitle: 'الإجازة السنوية في الأردن: 14–21 يوماً (2026)',
    arMeta: 'الإجازة السنوية في الأردن: 14 يوماً سنوياً، ترتفع إلى 21 يوماً بعد 5 سنوات خدمة (المادة 61). الاستحقاق والترحيل والحاسبة.',
    arBody: 'يمنح الأردن **14 يوماً** من الإجازة السنوية المدفوعة، ترتفع إلى **21 يوماً بعد 5 سنوات** خدمة لدى صاحب العمل نفسه (المادة 61). وتتراكم الإجازة خلال السنة وتُقسم السنوات الجزئية تناسبياً.',
    arFaqA: 'يمنح الأردن 14 يوماً إجازة سنوية، ترتفع إلى 21 يوماً بعد 5 سنوات خدمة.',
    enTake: ['14 days per year.', 'Rises to 21 days after 5 years of service.', 'Accrues over the year; partial years pro-rated.'],
    arTake: ['14 يوماً سنوياً.', 'ترتفع إلى 21 يوماً بعد 5 سنوات خدمة.', 'تتراكم خلال السنة؛ والكسور تناسبية.'],
  },
  {
    slug: 'annual-leave-saudi-arabia', country: 'Saudi Arabia', countryAr: 'السعودية',
    enTitle: 'Saudi Annual Leave: 21–30 Days (2026)',
    enMeta: 'Saudi annual leave: 21 days per year with full pay, rising to 30 days after 5 consecutive years (Labour Law Art. 109). Calculator + details.',
    enBody: 'Saudi Arabia grants **21 days** of paid annual leave per year, rising to **30 days after 5 consecutive years** with the same employer (Article 109). Leave is on full pay and accrues over the year.',
    enFaqA: 'Saudi Arabia grants 21 days of annual leave per year, rising to 30 days after 5 consecutive years.',
    arTitle: 'الإجازة السنوية في السعودية: 21–30 يوماً (2026)',
    arMeta: 'الإجازة السنوية في السعودية: 21 يوماً بأجر كامل، ترتفع إلى 30 يوماً بعد 5 سنوات متصلة (المادة 109). حاسبة وتفاصيل.',
    arBody: 'تمنح السعودية **21 يوماً** من الإجازة السنوية المدفوعة، ترتفع إلى **30 يوماً بعد 5 سنوات متصلة** لدى صاحب العمل نفسه (المادة 109). وهي بأجر كامل وتتراكم خلال السنة.',
    arFaqA: 'تمنح السعودية 21 يوماً إجازة سنوية، ترتفع إلى 30 يوماً بعد 5 سنوات متصلة.',
    enTake: ['21 days per year on full pay.', 'Rises to 30 days after 5 consecutive years.', 'Accrues over the year.'],
    arTake: ['21 يوماً سنوياً بأجر كامل.', 'ترتفع إلى 30 يوماً بعد 5 سنوات متصلة.', 'تتراكم خلال السنة.'],
  },
  {
    slug: 'annual-leave-uae', country: 'the UAE', countryAr: 'الإمارات',
    enTitle: 'UAE Annual Leave: 30 Days (2026)',
    enMeta: 'UAE annual leave is 30 calendar days per year after one year of service, and 2 days per month in the first year (Federal Decree-Law 33/2021, Art. 29). Calculator.',
    enBody: 'The UAE grants **30 calendar days** of annual leave per year for employees with at least one year of service, and **2 days per month** during the first year (Article 29). Leave accrues over the year and partial years are pro-rated.',
    enFaqA: 'The UAE grants 30 calendar days of annual leave per year, and 2 days per month in the first year.',
    arTitle: 'الإجازة السنوية في الإمارات: 30 يوماً (2026)',
    arMeta: 'الإجازة السنوية في الإمارات 30 يوماً تقويمياً بعد سنة خدمة، ويومان شهرياً في السنة الأولى (المرسوم 33/2021، المادة 29). حاسبة.',
    arBody: 'تمنح الإمارات **30 يوماً تقويمياً** من الإجازة السنوية لمن أكمل سنة خدمة، و**يومين شهرياً** خلال السنة الأولى (المادة 29). وتتراكم الإجازة خلال السنة وتُقسم الكسور تناسبياً.',
    arFaqA: 'تمنح الإمارات 30 يوماً تقويمياً إجازة سنوية، ويومين شهرياً في السنة الأولى.',
    enTake: ['30 calendar days per year after one year.', '2 days per month in the first year.', 'Partial years pro-rated.'],
    arTake: ['30 يوماً تقويمياً سنوياً بعد سنة.', 'يومان شهرياً في السنة الأولى.', 'الكسور تناسبية.'],
  },
  {
    slug: 'annual-leave-kuwait', country: 'Kuwait', countryAr: 'الكويت',
    enTitle: 'Kuwait Annual Leave: 30 Days (2026)',
    enMeta: 'Kuwait annual leave is 30 days per year, pro-rated for partial years, after at least 9 months’ service in the first year (Labour Law Art. 70). Calculator.',
    enBody: 'Kuwait grants **30 days** of annual leave per year (Article 70), pro-rated for fractional years. In the first year, entitlement arises after at least 9 months’ service.',
    enFaqA: 'Kuwait grants 30 days of annual leave per year, pro-rated for partial years.',
    arTitle: 'الإجازة السنوية في الكويت: 30 يوماً (2026)',
    arMeta: 'الإجازة السنوية في الكويت 30 يوماً سنوياً، تُقسم تناسبياً للكسور، بعد 9 أشهر خدمة على الأقل في السنة الأولى (المادة 70). حاسبة.',
    arBody: 'يمنح الكويت **30 يوماً** من الإجازة السنوية (المادة 70)، تُقسم تناسبياً للكسور. وفي السنة الأولى يبدأ الاستحقاق بعد 9 أشهر خدمة على الأقل.',
    arFaqA: 'يمنح الكويت 30 يوماً إجازة سنوية، تُقسم تناسبياً للكسور.',
    enTake: ['30 days per year.', 'Pro-rated for partial years.', 'First-year entitlement after ~9 months.'],
    arTake: ['30 يوماً سنوياً.', 'تُقسم تناسبياً للكسور.', 'استحقاق السنة الأولى بعد ~9 أشهر.'],
  },
  {
    slug: 'annual-leave-qatar', country: 'Qatar', countryAr: 'قطر',
    enTitle: 'Qatar Annual Leave: 21–28 Days (2026)',
    enMeta: 'Qatar annual leave: three weeks (21 days) per year under 5 years, four weeks (28 days) from 5 years (Labour Law Art. 79). Calculator + details.',
    enBody: 'Qatar grants **three weeks (21 days)** of annual leave per year for less than five years’ consecutive service, rising to **four weeks (28 days) from five years** (Article 79). Partial years are pro-rated.',
    enFaqA: 'Qatar grants 21 days (three weeks) of annual leave under 5 years, and 28 days (four weeks) from 5 years.',
    arTitle: 'الإجازة السنوية في قطر: 21–28 يوماً (2026)',
    arMeta: 'الإجازة السنوية في قطر: ثلاثة أسابيع (21 يوماً) دون 5 سنوات، وأربعة أسابيع (28 يوماً) من 5 سنوات (المادة 79). حاسبة وتفاصيل.',
    arBody: 'يمنح قطر **ثلاثة أسابيع (21 يوماً)** من الإجازة السنوية لمن دون خمس سنوات خدمة متصلة، ترتفع إلى **أربعة أسابيع (28 يوماً) من خمس سنوات** (المادة 79). وتُقسم الكسور تناسبياً.',
    arFaqA: 'يمنح قطر 21 يوماً (ثلاثة أسابيع) دون 5 سنوات، و28 يوماً (أربعة أسابيع) من 5 سنوات.',
    enTake: ['21 days (three weeks) under 5 years.', '28 days (four weeks) from 5 years.', 'Partial years pro-rated.'],
    arTake: ['21 يوماً (ثلاثة أسابيع) دون 5 سنوات.', '28 يوماً (أربعة أسابيع) من 5 سنوات.', 'الكسور تناسبية.'],
  },
  {
    slug: 'annual-leave-bahrain', country: 'Bahrain', countryAr: 'البحرين',
    enTitle: 'Bahrain Annual Leave: 30 Days (2026)',
    enMeta: 'Bahrain annual leave is 30 days per year after one year, accruing 2.5 days per month, and may be monetised (Labour Law Art. 58–59). Calculator.',
    enBody: 'Bahrain grants **30 days** of paid annual leave per year after one year of service, accruing at **2.5 days per month** and pro-rated for service under one year (Article 58). Unused leave may be monetised under Article 59.',
    enFaqA: 'Bahrain grants 30 days of annual leave per year, accruing 2.5 days per month.',
    arTitle: 'الإجازة السنوية في البحرين: 30 يوماً (2026)',
    arMeta: 'الإجازة السنوية في البحرين 30 يوماً سنوياً بعد سنة، تتراكم 2.5 يوماً شهرياً، ويجوز صرفها نقداً (المادة 58–59). حاسبة.',
    arBody: 'يمنح البحرين **30 يوماً** من الإجازة السنوية المدفوعة بعد سنة خدمة، تتراكم بمعدل **2.5 يوماً شهرياً** وتُقسم تناسبياً للخدمة دون سنة (المادة 58). ويجوز صرف الإجازة غير المستخدمة نقداً بموجب المادة 59.',
    arFaqA: 'يمنح البحرين 30 يوماً إجازة سنوية، تتراكم 2.5 يوماً شهرياً.',
    enTake: ['30 days per year after one year.', 'Accrues at 2.5 days per month.', 'Unused leave may be monetised.'],
    arTake: ['30 يوماً سنوياً بعد سنة.', 'تتراكم 2.5 يوماً شهرياً.', 'يجوز صرف غير المستخدمة نقداً.'],
  },
  {
    slug: 'annual-leave-oman', country: 'Oman', countryAr: 'عُمان',
    enTitle: 'Oman Annual Leave: 30 Days (2026)',
    enMeta: 'Oman annual leave is at least 30 days per year on the gross wage, accruing 2.5 days per month, with carryover up to 30 days (RD 53/2023, Art. 78). Calculator.',
    enBody: 'Oman grants at least **30 days** of annual leave per year on the gross wage (Article 78), accruing at **2.5 days per month**. Leave may not be taken before 6 months of service, and an unused balance may be carried over up to 30 days.',
    enFaqA: 'Oman grants at least 30 days of annual leave per year, accruing 2.5 days per month.',
    arTitle: 'الإجازة السنوية في عُمان: 30 يوماً (2026)',
    arMeta: 'الإجازة السنوية في عُمان لا تقل عن 30 يوماً سنوياً على الأجر الإجمالي، تتراكم 2.5 يوماً شهرياً، وتُرحَّل حتى 30 يوماً (مرسوم 53/2023، المادة 78). حاسبة.',
    arBody: 'يمنح عُمان ما لا يقل عن **30 يوماً** من الإجازة السنوية على الأجر الإجمالي (المادة 78)، تتراكم بمعدل **2.5 يوماً شهرياً**. ولا تُؤخذ قبل 6 أشهر خدمة، ويجوز ترحيل الرصيد غير المستخدم حتى 30 يوماً.',
    arFaqA: 'يمنح عُمان ما لا يقل عن 30 يوماً إجازة سنوية، تتراكم 2.5 يوماً شهرياً.',
    enTake: ['At least 30 days per year on the gross wage.', 'Accrues at 2.5 days per month.', 'Carryover up to 30 days; not before 6 months’ service.'],
    arTake: ['لا تقل عن 30 يوماً سنوياً على الأجر الإجمالي.', 'تتراكم 2.5 يوماً شهرياً.', 'ترحيل حتى 30 يوماً؛ وليس قبل 6 أشهر خدمة.'],
  },
];

const annualLeaveGuides: Record<string, Record<Locale, GuideContent>> = {};
for (const r of rows) {
  annualLeaveGuides[r.slug] = {
    en: {
      slug: r.slug, locale: 'en', title: r.enTitle, metaDescription: r.enMeta,
      intro: r.enBody,
      sections: [
        { heading: 'The entitlement', body: r.enBody },
        { heading: 'Accrual and balance', body: 'Annual leave accrues as you work. To estimate how much paid leave you have accrued and have available between two dates, use the leave-balance calculator.' },
      ],
      keyTakeaways: r.enTake,
      faqs: [
        { q: `How many annual leave days in ${r.country}?`, a: r.enFaqA },
        { q: 'Does annual leave accrue monthly?', a: 'Yes — entitlement builds up over the year and partial years are pro-rated; several countries express this as roughly 2.5 days per month.' },
        { q: 'Can unused annual leave be paid out?', a: 'In several of these countries unused leave may be monetised or carried over, subject to limits — check your contract and the local rule.' },
      ],
      relatedCalculators: REL, lastReviewed: R,
    },
    ar: {
      slug: r.slug, locale: 'ar', title: r.arTitle, metaDescription: r.arMeta,
      intro: r.arBody,
      sections: [
        { heading: 'الاستحقاق', body: r.arBody },
        { heading: 'التراكم والرصيد', body: 'تتراكم الإجازة السنوية مع عملك. ولتقدير ما تراكم لديك من إجازة مدفوعة والمتاح بين تاريخين، استخدم حاسبة رصيد الإجازات.' },
      ],
      keyTakeaways: r.arTake,
      faqs: [
        { q: `كم يوماً إجازة سنوية في ${r.countryAr}؟`, a: r.arFaqA },
        { q: 'هل تتراكم الإجازة السنوية شهرياً؟', a: 'نعم — يتراكم الاستحقاق خلال السنة وتُقسم الكسور تناسبياً؛ وتعبّر عدة دول عن ذلك بنحو 2.5 يوماً شهرياً.' },
        { q: 'هل يمكن صرف الإجازة غير المستخدمة؟', a: 'في عدة من هذه الدول يجوز صرف الإجازة غير المستخدمة نقداً أو ترحيلها ضمن حدود — راجع عقدك والقاعدة المحلية.' },
      ],
      relatedCalculators: REL, lastReviewed: R,
    },
  };
}

export default annualLeaveGuides;
