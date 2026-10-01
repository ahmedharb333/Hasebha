import type { GuideContent } from './types';
import type { Locale } from '../config/site';

/** Per-country overtime guides. Multipliers mirror the country-rules engine. Last reviewed 2026-10-01. */
const R = '2026-10-01';
const REL = ['overtime-pay', 'gross-to-net', 'leave-balance'];

type Row = { slug: string; country: string; countryAr: string; enTitle: string; enMeta: string; enBody: string; enFaqA: string; arTitle: string; arMeta: string; arBody: string; arFaqA: string; enTake: string[]; arTake: string[]; cap: number };

const rows: Row[] = [
  {
    slug: 'overtime-pay-jordan', country: 'Jordan', countryAr: 'الأردن', cap: 48,
    enTitle: 'Jordan Overtime Pay Rates (2026)',
    enMeta: 'Jordan overtime: 125% of the hourly wage for extra hours, 150% on rest days and public holidays, with a 48-hour standard week. Calculator + example.',
    enBody: 'In Jordan, overtime is paid at **125%** of the normal hourly wage for extra working hours (including night work), and **150%** for work on **rest days and public holidays**. The standard working week is **48 hours**.',
    enFaqA: 'Jordan pays 125% of the hourly wage for overtime, and 150% on rest days and public holidays.',
    arTitle: 'معدلات أجر العمل الإضافي في الأردن (2026)',
    arMeta: 'العمل الإضافي في الأردن: 125% من أجر الساعة للساعات الإضافية، و150% في أيام الراحة والعطل الرسمية، بأسبوع عمل 48 ساعة. حاسبة ومثال.',
    arBody: 'في الأردن، يُدفع العمل الإضافي بنسبة **125%** من أجر الساعة العادي للساعات الإضافية (بما فيها العمل الليلي)، و**150%** للعمل في **أيام الراحة والعطل الرسمية**. وأسبوع العمل المعتاد **48 ساعة**.',
    arFaqA: 'يدفع الأردن 125% من أجر الساعة للعمل الإضافي، و150% في أيام الراحة والعطل الرسمية.',
    enTake: ['125% for overtime hours (incl. night).', '150% on rest days and public holidays.', '48-hour standard week.'],
    arTake: ['125% للساعات الإضافية (مع الليلي).', '150% في أيام الراحة والعطل الرسمية.', 'أسبوع عمل 48 ساعة.'],
  },
  {
    slug: 'overtime-pay-saudi-arabia', country: 'Saudi Arabia', countryAr: 'السعودية', cap: 48,
    enTitle: 'Saudi Overtime Pay: Flat 150% (2026)',
    enMeta: 'Saudi overtime is a flat 150% of the hourly wage for all extra hours, including rest days and holidays (Labour Law Art. 107). 48-hour week. Calculator.',
    enBody: 'Saudi Arabia uses a simple **flat 150%** rate: all overtime hours — ordinary extra hours, night work, rest days and public holidays alike — are paid at **1.5×** the hourly wage (Article 107). The standard working week is **48 hours** (reduced during Ramadan for Muslims).',
    enFaqA: 'Saudi Arabia pays a flat 150% of the hourly wage for all overtime, including rest days and holidays.',
    arTitle: 'أجر العمل الإضافي في السعودية: 150% ثابتة (2026)',
    arMeta: 'العمل الإضافي في السعودية 150% ثابتة من أجر الساعة لكل الساعات الإضافية، بما فيها أيام الراحة والعطل (المادة 107). أسبوع 48 ساعة. حاسبة.',
    arBody: 'تعتمد السعودية معدلاً **ثابتاً 150%**: كل ساعات العمل الإضافي — الساعات الإضافية العادية والعمل الليلي وأيام الراحة والعطل الرسمية — تُدفع بـ**1.5×** أجر الساعة (المادة 107). وأسبوع العمل المعتاد **48 ساعة** (يُخفَّض في رمضان للمسلمين).',
    arFaqA: 'تدفع السعودية 150% ثابتة من أجر الساعة لكل العمل الإضافي، بما فيه أيام الراحة والعطل.',
    enTake: ['Flat 150% for all overtime.', 'Same rate for extra hours, rest days and holidays.', '48-hour week (reduced in Ramadan).'],
    arTake: ['150% ثابتة لكل العمل الإضافي.', 'النسبة نفسها للساعات الإضافية والراحة والعطل.', 'أسبوع 48 ساعة (يُخفَّض في رمضان).'],
  },
  {
    slug: 'overtime-pay-uae', country: 'the UAE', countryAr: 'الإمارات', cap: 48,
    enTitle: 'UAE Overtime Pay Rates (2026)',
    enMeta: 'UAE overtime: 125% of the hourly wage, 150% for night hours, rest days and public holidays (Federal Decree-Law 33/2021, Art. 19). 48-hour week. Calculator.',
    enBody: 'In the UAE, overtime is paid at **125%** of the normal hourly wage, rising to **150%** for **night hours, rest days and public holidays** (Article 19). The standard working week is **48 hours**.',
    enFaqA: 'The UAE pays 125% for overtime, and 150% for night hours, rest days and public holidays.',
    arTitle: 'معدلات أجر العمل الإضافي في الإمارات (2026)',
    arMeta: 'العمل الإضافي في الإمارات: 125% من أجر الساعة، و150% للساعات الليلية وأيام الراحة والعطل الرسمية (المرسوم 33/2021، المادة 19). أسبوع 48 ساعة. حاسبة.',
    arBody: 'في الإمارات، يُدفع العمل الإضافي بنسبة **125%** من أجر الساعة العادي، ترتفع إلى **150%** للعمل في **الساعات الليلية وأيام الراحة والعطل الرسمية** (المادة 19). وأسبوع العمل المعتاد **48 ساعة**.',
    arFaqA: 'تدفع الإمارات 125% للعمل الإضافي، و150% للساعات الليلية وأيام الراحة والعطل.',
    enTake: ['125% for overtime hours.', '150% for night hours, rest days and holidays.', '48-hour standard week.'],
    arTake: ['125% للساعات الإضافية.', '150% للساعات الليلية وأيام الراحة والعطل.', 'أسبوع عمل 48 ساعة.'],
  },
  {
    slug: 'overtime-pay-kuwait', country: 'Kuwait', countryAr: 'الكويت', cap: 48,
    enTitle: 'Kuwait Overtime Pay Rates (2026)',
    enMeta: 'Kuwait overtime: 125% of the hourly wage, 150% on rest days, and 200% (double) on public holidays. 48-hour week. Calculator + example.',
    enBody: 'In Kuwait, overtime is paid at **125%** of the hourly wage for extra hours, **150%** on **rest days**, and **200% (double pay)** on **public holidays** — the highest holiday rate in the Gulf. The standard working week is **48 hours**.',
    enFaqA: 'Kuwait pays 125% for overtime, 150% on rest days, and 200% (double) on public holidays.',
    arTitle: 'معدلات أجر العمل الإضافي في الكويت (2026)',
    arMeta: 'العمل الإضافي في الكويت: 125% من أجر الساعة، و150% في أيام الراحة، و200% (الضعف) في العطل الرسمية. أسبوع 48 ساعة. حاسبة ومثال.',
    arBody: 'في الكويت، يُدفع العمل الإضافي بنسبة **125%** من أجر الساعة للساعات الإضافية، و**150%** في **أيام الراحة**، و**200% (أجر مضاعف)** في **العطل الرسمية** — وهو أعلى معدل للعطل في الخليج. وأسبوع العمل المعتاد **48 ساعة**.',
    arFaqA: 'يدفع الكويت 125% للعمل الإضافي، و150% في أيام الراحة، و200% (الضعف) في العطل الرسمية.',
    enTake: ['125% for overtime hours.', '150% on rest days.', '200% (double) on public holidays — Gulf’s highest.'],
    arTake: ['125% للساعات الإضافية.', '150% في أيام الراحة.', '200% (الضعف) في العطل الرسمية — الأعلى خليجياً.'],
  },
  {
    slug: 'overtime-pay-qatar', country: 'Qatar', countryAr: 'قطر', cap: 48,
    enTitle: 'Qatar Overtime Pay Rates (2026)',
    enMeta: 'Qatar overtime: 125% of the hourly wage, 150% for night hours and rest days (Labour Law Art. 73–74). 48-hour week. Calculator + example.',
    enBody: 'In Qatar, overtime is paid at **125%** of the normal hourly wage, rising to **150%** for **night hours and rest days** (Articles 73–74). The standard working week is **48 hours** (reduced to 36 during Ramadan).',
    enFaqA: 'Qatar pays 125% for overtime, and 150% for night hours and rest days.',
    arTitle: 'معدلات أجر العمل الإضافي في قطر (2026)',
    arMeta: 'العمل الإضافي في قطر: 125% من أجر الساعة، و150% للساعات الليلية وأيام الراحة (المادة 73–74). أسبوع 48 ساعة. حاسبة ومثال.',
    arBody: 'في قطر، يُدفع العمل الإضافي بنسبة **125%** من أجر الساعة العادي، ترتفع إلى **150%** للعمل في **الساعات الليلية وأيام الراحة** (المادتان 73–74). وأسبوع العمل المعتاد **48 ساعة** (يُخفَّض إلى 36 في رمضان).',
    arFaqA: 'تدفع قطر 125% للعمل الإضافي، و150% للساعات الليلية وأيام الراحة.',
    enTake: ['125% for overtime hours.', '150% for night hours and rest days.', '48-hour week (36 in Ramadan).'],
    arTake: ['125% للساعات الإضافية.', '150% للساعات الليلية وأيام الراحة.', 'أسبوع 48 ساعة (36 في رمضان).'],
  },
  {
    slug: 'overtime-pay-bahrain', country: 'Bahrain', countryAr: 'البحرين', cap: 48,
    enTitle: 'Bahrain Overtime Pay Rates (2026)',
    enMeta: 'Bahrain overtime: 125% of the hourly wage, 150% for night hours, rest days and public holidays (Labour Law Art. 54). 48-hour week. Calculator.',
    enBody: 'In Bahrain, overtime is paid at **125%** of the normal hourly wage, rising to **150%** for **night hours, rest days and public holidays** (Article 54). The standard working week is **48 hours**.',
    enFaqA: 'Bahrain pays 125% for overtime, and 150% for night hours, rest days and public holidays.',
    arTitle: 'معدلات أجر العمل الإضافي في البحرين (2026)',
    arMeta: 'العمل الإضافي في البحرين: 125% من أجر الساعة، و150% للساعات الليلية وأيام الراحة والعطل الرسمية (المادة 54). أسبوع 48 ساعة. حاسبة.',
    arBody: 'في البحرين، يُدفع العمل الإضافي بنسبة **125%** من أجر الساعة العادي، ترتفع إلى **150%** للعمل في **الساعات الليلية وأيام الراحة والعطل الرسمية** (المادة 54). وأسبوع العمل المعتاد **48 ساعة**.',
    arFaqA: 'تدفع البحرين 125% للعمل الإضافي، و150% للساعات الليلية وأيام الراحة والعطل.',
    enTake: ['125% for overtime hours.', '150% for night hours, rest days and holidays.', '48-hour standard week.'],
    arTake: ['125% للساعات الإضافية.', '150% للساعات الليلية وأيام الراحة والعطل.', 'أسبوع عمل 48 ساعة.'],
  },
  {
    slug: 'overtime-pay-oman', country: 'Oman', countryAr: 'عُمان', cap: 40,
    enTitle: 'Oman Overtime Pay Rates (2026)',
    enMeta: 'Oman overtime: 125% of the hourly wage, 150% at night, and 200% (double) on rest days and public holidays (RD 53/2023). 40-hour week. Calculator.',
    enBody: 'In Oman, overtime is paid at **125%** of the hourly wage, **150%** for **night hours**, and **200% (double pay)** on **rest days and public holidays** (Royal Decree 53/2023). Notably, Oman uses a **40-hour** standard working week — shorter than the 48 hours common elsewhere in the region.',
    enFaqA: 'Oman pays 125% for overtime, 150% at night, and 200% (double) on rest days and public holidays.',
    arTitle: 'معدلات أجر العمل الإضافي في عُمان (2026)',
    arMeta: 'العمل الإضافي في عُمان: 125% من أجر الساعة، و150% ليلاً، و200% (الضعف) في أيام الراحة والعطل الرسمية (مرسوم 53/2023). أسبوع 40 ساعة. حاسبة.',
    arBody: 'في عُمان، يُدفع العمل الإضافي بنسبة **125%** من أجر الساعة، و**150%** للعمل في **الساعات الليلية**، و**200% (أجر مضاعف)** في **أيام الراحة والعطل الرسمية** (مرسوم 53/2023). واللافت أن عُمان تعتمد أسبوع عمل **40 ساعة** — أقصر من الـ48 ساعة الشائعة في المنطقة.',
    arFaqA: 'تدفع عُمان 125% للعمل الإضافي، و150% ليلاً، و200% (الضعف) في أيام الراحة والعطل الرسمية.',
    enTake: ['125% for overtime hours.', '150% at night; 200% (double) on rest days and holidays.', '40-hour week — shorter than the regional 48.'],
    arTake: ['125% للساعات الإضافية.', '150% ليلاً؛ و200% (الضعف) في أيام الراحة والعطل.', 'أسبوع 40 ساعة — أقصر من 48 الإقليمية.'],
  },
];

const overtimeGuides: Record<string, Record<Locale, GuideContent>> = {};
for (const r of rows) {
  overtimeGuides[r.slug] = {
    en: {
      slug: r.slug, locale: 'en', title: r.enTitle, metaDescription: r.enMeta,
      intro: r.enBody,
      sections: [
        { heading: 'The rates', body: r.enBody },
        { heading: 'How overtime pay is worked out', body: `Overtime pay = hourly wage × overtime hours × the applicable multiplier. The hourly wage is derived from your monthly wage and the standard ${r.cap}-hour week. Enter your wage and hours in the overtime calculator to get the exact figure.` },
      ],
      keyTakeaways: r.enTake,
      faqs: [
        { q: `What is the overtime rate in ${r.country}?`, a: r.enFaqA },
        { q: 'How is the overtime hourly rate calculated?', a: `Your normal hourly wage is derived from your monthly wage over the standard ${r.cap}-hour week, then multiplied by the overtime rate for the type of hours worked.` },
        { q: 'Do rest days and holidays pay more?', a: 'Yes — rest days and public holidays carry a higher multiplier than ordinary overtime hours in these countries.' },
      ],
      relatedCalculators: REL, lastReviewed: R,
    },
    ar: {
      slug: r.slug, locale: 'ar', title: r.arTitle, metaDescription: r.arMeta,
      intro: r.arBody,
      sections: [
        { heading: 'المعدلات', body: r.arBody },
        { heading: 'كيف يُحسب أجر العمل الإضافي', body: `أجر العمل الإضافي = أجر الساعة × ساعات العمل الإضافي × المعامل المطبّق. ويُشتق أجر الساعة من أجرك الشهري وأسبوع العمل المعتاد (${r.cap} ساعة). أدخل أجرك وساعاتك في حاسبة العمل الإضافي للحصول على الرقم الدقيق.` },
      ],
      keyTakeaways: r.arTake,
      faqs: [
        { q: `ما معدل العمل الإضافي في ${r.countryAr}؟`, a: r.arFaqA },
        { q: 'كيف يُحسب أجر ساعة العمل الإضافي؟', a: `يُشتق أجر ساعتك العادي من أجرك الشهري على أسبوع العمل المعتاد (${r.cap} ساعة)، ثم يُضرب بمعدل العمل الإضافي بحسب نوع الساعات.` },
        { q: 'هل تدفع أيام الراحة والعطل أكثر؟', a: 'نعم — أيام الراحة والعطل الرسمية لها معامل أعلى من الساعات الإضافية العادية في هذه الدول.' },
      ],
      relatedCalculators: REL, lastReviewed: R,
    },
  };
}

export default overtimeGuides;
