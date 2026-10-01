import type { GuideContent } from './types';
import type { Locale } from '../config/site';

/** Per-country notice-period guides. Days mirror the country-rules engine. Last reviewed 2026-10-01. */
const R = '2026-10-01';
const REL = ['notice-period', 'end-of-service', 'leave-balance'];

type Row = { slug: string; country: string; countryAr: string; enTitle: string; enMeta: string; enBody: string; enFaqA: string; arTitle: string; arMeta: string; arBody: string; arFaqA: string; enTake: string[]; arTake: string[] };

const rows: Row[] = [
  {
    slug: 'notice-period-jordan', country: 'Jordan', countryAr: 'الأردن',
    enTitle: 'Jordan Notice Period: 30 Days (2026)',
    enMeta: 'Jordan requires at least 30 days’ written notice to terminate an unlimited-term contract (Labour Law Art. 23). Payment in lieu, and the calculator.',
    enBody: 'In Jordan, either party may terminate an unlimited-term contract on at least **30 days’ written notice** (Article 23). If notice is not given, payment in lieu of the notice period is due.',
    enFaqA: 'Jordan requires at least 30 days’ written notice to end an unlimited-term contract.',
    arTitle: 'مدة الإشعار في الأردن: 30 يوماً (2026)',
    arMeta: 'يشترط الأردن إشعاراً كتابياً لا يقل عن 30 يوماً لإنهاء العقد غير المحدد المدة (المادة 23). بدل الإشعار والحاسبة.',
    arBody: 'في الأردن، يجوز لأي طرف إنهاء العقد غير المحدد المدة بإشعار كتابي لا يقل عن **30 يوماً** (المادة 23). وإن لم يُعطَ الإشعار، يُستحق بدل عن مدة الإشعار.',
    arFaqA: 'يشترط الأردن إشعاراً كتابياً لا يقل عن 30 يوماً لإنهاء العقد غير المحدد المدة.',
    enTake: ['At least 30 days’ written notice.', 'Applies to unlimited-term contracts.', 'Payment in lieu is due if notice is not served.'],
    arTake: ['إشعار كتابي لا يقل عن 30 يوماً.', 'ينطبق على العقود غير المحددة المدة.', 'يُستحق بدل إن لم يُعطَ الإشعار.'],
  },
  {
    slug: 'notice-period-saudi-arabia', country: 'Saudi Arabia', countryAr: 'السعودية',
    enTitle: 'Saudi Notice Period: 30 or 60 Days (2026)',
    enMeta: 'Saudi notice periods (Labour Law Art. 75, amended 2025): 30 days by the worker, 60 days by the employer, for monthly-paid indefinite contracts. Calculator.',
    enBody: 'For monthly-paid indefinite-term contracts, the Saudi notice period (Article 75, amended February 2025) is **30 days when the worker resigns** and **60 days when the employer terminates**. For non-monthly pay it is 30 days for either party. The Klar calculator uses the 30-day statutory minimum.',
    enFaqA: 'For monthly-paid indefinite contracts: 30 days when the worker resigns, 60 days when the employer terminates.',
    arTitle: 'مدة الإشعار في السعودية: 30 أو 60 يوماً (2026)',
    arMeta: 'مدد الإشعار في السعودية (المادة 75 المعدّلة 2025): 30 يوماً من العامل و60 يوماً من صاحب العمل للعقود غير المحددة الشهرية. حاسبة.',
    arBody: 'للعقود غير المحددة المدة ذات الأجر الشهري، مدة الإشعار في السعودية (المادة 75 المعدّلة فبراير 2025) هي **30 يوماً عند استقالة العامل** و**60 يوماً عند إنهاء صاحب العمل**. وللأجر غير الشهري 30 يوماً لأي طرف. وتستخدم حاسبة كلار الحد الأدنى 30 يوماً.',
    arFaqA: 'للعقود الشهرية غير المحددة: 30 يوماً عند استقالة العامل و60 يوماً عند إنهاء صاحب العمل.',
    enTake: ['Worker resigns: 30 days.', 'Employer terminates: 60 days.', 'Non-monthly pay: 30 days for either party.'],
    arTake: ['استقالة العامل: 30 يوماً.', 'إنهاء صاحب العمل: 60 يوماً.', 'الأجر غير الشهري: 30 يوماً لأي طرف.'],
  },
  {
    slug: 'notice-period-uae', country: 'the UAE', countryAr: 'الإمارات',
    enTitle: 'UAE Notice Period: 30 to 90 Days (2026)',
    enMeta: 'UAE notice period is a minimum of 30 days, up to 90 days as agreed, for both fixed- and indefinite-term contracts (Federal Decree-Law 33/2021, Art. 43). Calculator.',
    enBody: 'In the UAE the notice period is **at least 30 days**, and the contract may agree up to **90 days** (Article 43). The same minimum applies to both fixed-term and indefinite-term contracts. The Klar calculator uses the 30-day statutory minimum.',
    enFaqA: 'The UAE requires a minimum of 30 days’ notice, up to 90 days as agreed in the contract.',
    arTitle: 'مدة الإشعار في الإمارات: 30 إلى 90 يوماً (2026)',
    arMeta: 'مدة الإشعار في الإمارات 30 يوماً كحد أدنى، وتصل إلى 90 يوماً بالاتفاق، للعقود المحددة وغير المحددة (المرسوم 33/2021، المادة 43). حاسبة.',
    arBody: 'في الإمارات مدة الإشعار **30 يوماً على الأقل**، ويجوز أن يتفق العقد على ما يصل إلى **90 يوماً** (المادة 43). وينطبق الحد الأدنى نفسه على العقود المحددة وغير المحددة. وتستخدم حاسبة كلار الحد الأدنى 30 يوماً.',
    arFaqA: 'تشترط الإمارات إشعاراً لا يقل عن 30 يوماً، ويصل إلى 90 يوماً بحسب الاتفاق في العقد.',
    enTake: ['Minimum 30 days’ notice.', 'Up to 90 days if the contract agrees.', 'Same minimum for fixed- and indefinite-term contracts.'],
    arTake: ['حد أدنى 30 يوماً إشعار.', 'حتى 90 يوماً إن اتفق العقد.', 'الحد الأدنى نفسه للعقود المحددة وغير المحددة.'],
  },
  {
    slug: 'notice-period-kuwait', country: 'Kuwait', countryAr: 'الكويت',
    enTitle: 'Kuwait Notice Period: 90 Days (2026)',
    enMeta: 'Kuwait requires 3 months (about 90 days) notice to terminate an indefinite monthly-paid contract under Labour Law Art. 44. The longest in the Gulf. Calculator.',
    enBody: 'Kuwait has one of the longest statutory notice periods in the region: **3 months (about 90 days)** for indefinite-term, monthly-paid contracts under Article 44. Payment in lieu of notice is permitted. The long notice is a key difference from its Gulf neighbours, which use 30–60 days.',
    enFaqA: 'Kuwait requires about 90 days (3 months) notice for indefinite monthly-paid contracts — the longest in the Gulf.',
    arTitle: 'مدة الإشعار في الكويت: 90 يوماً (2026)',
    arMeta: 'يشترط الكويت إشعاراً مدته 3 أشهر (نحو 90 يوماً) لإنهاء العقد غير المحدد الشهري بموجب المادة 44. الأطول في الخليج. حاسبة.',
    arBody: 'للكويت واحدة من أطول مدد الإشعار في المنطقة: **3 أشهر (نحو 90 يوماً)** للعقود غير المحددة ذات الأجر الشهري بموجب المادة 44. ويجوز دفع بدل عن الإشعار. وهذه المدة الطويلة فارق أساسي عن جيرانها الخليجيين الذين يعتمدون 30–60 يوماً.',
    arFaqA: 'يشترط الكويت نحو 90 يوماً (3 أشهر) للعقود غير المحددة الشهرية — الأطول في الخليج.',
    enTake: ['About 90 days (3 months) notice.', 'The longest statutory notice in the Gulf.', 'Payment in lieu is permitted.'],
    arTake: ['نحو 90 يوماً (3 أشهر) إشعار.', 'الأطول قانونياً في الخليج.', 'يجوز دفع بدل عن الإشعار.'],
  },
  {
    slug: 'notice-period-qatar', country: 'Qatar', countryAr: 'قطر',
    enTitle: 'Qatar Notice Period: 30 or 60 Days (2026)',
    enMeta: 'Qatar notice period depends on tenure: 30 days under 2 years of service, 60 days from 2 years (Labour Law Art. 49). Calculator + details.',
    enBody: 'In Qatar the notice period depends on length of service (Article 49): **30 days for under 2 years** of service and **60 days from 2 years**. Payment in lieu of notice is permitted.',
    enFaqA: 'Qatar requires 30 days’ notice under 2 years of service and 60 days from 2 years.',
    arTitle: 'مدة الإشعار في قطر: 30 أو 60 يوماً (2026)',
    arMeta: 'مدة الإشعار في قطر تعتمد على مدة الخدمة: 30 يوماً دون سنتين، و60 يوماً من سنتين (المادة 49). حاسبة وتفاصيل.',
    arBody: 'في قطر تعتمد مدة الإشعار على مدة الخدمة (المادة 49): **30 يوماً لمن دون سنتين** خدمة و**60 يوماً من سنتين**. ويجوز دفع بدل عن الإشعار.',
    arFaqA: 'يشترط قطر إشعاراً 30 يوماً لمن دون سنتين خدمة و60 يوماً من سنتين.',
    enTake: ['30 days under 2 years of service.', '60 days from 2 years.', 'Payment in lieu is permitted.'],
    arTake: ['30 يوماً لمن دون سنتين خدمة.', '60 يوماً من سنتين.', 'يجوز دفع بدل عن الإشعار.'],
  },
  {
    slug: 'notice-period-bahrain', country: 'Bahrain', countryAr: 'البحرين',
    enTitle: 'Bahrain Notice Period: 30 Days (2026)',
    enMeta: 'Bahrain requires at least 30 days’ written notice to terminate an indefinite contract (Labour Law Art. 99); a longer period may be agreed. Calculator.',
    enBody: 'In Bahrain, either party may terminate an indefinite-term contract on at least **30 days’ written notice** (Article 99). The contract may agree a longer period, but an agreement reducing the statutory minimum is void. Payment in lieu is permitted.',
    enFaqA: 'Bahrain requires at least 30 days’ written notice to end an indefinite-term contract.',
    arTitle: 'مدة الإشعار في البحرين: 30 يوماً (2026)',
    arMeta: 'يشترط البحرين إشعاراً كتابياً لا يقل عن 30 يوماً لإنهاء العقد غير المحدد (المادة 99)؛ ويجوز الاتفاق على مدة أطول. حاسبة.',
    arBody: 'في البحرين، يجوز لأي طرف إنهاء العقد غير المحدد المدة بإشعار كتابي لا يقل عن **30 يوماً** (المادة 99). ويجوز الاتفاق على مدة أطول، لكن أي اتفاق يقلّل الحد الأدنى القانوني باطل. ويجوز دفع بدل عن الإشعار.',
    arFaqA: 'يشترط البحرين إشعاراً كتابياً لا يقل عن 30 يوماً لإنهاء العقد غير المحدد.',
    enTake: ['At least 30 days’ written notice.', 'A longer period may be agreed; shorter is void.', 'Payment in lieu is permitted.'],
    arTake: ['إشعار كتابي لا يقل عن 30 يوماً.', 'يجوز الاتفاق على مدة أطول؛ والأقصر باطل.', 'يجوز دفع بدل عن الإشعار.'],
  },
  {
    slug: 'notice-period-oman', country: 'Oman', countryAr: 'عُمان',
    enTitle: 'Oman Notice Period: 30 Days (2026)',
    enMeta: 'Oman requires at least 30 days’ notice for monthly-paid indefinite contracts (15 for others) under Labour Law (RD 53/2023) Art. 38. Calculator + details.',
    enBody: 'In Oman, either party may terminate an indefinite-term contract on at least **30 days’ notice** for monthly-paid workers (**15 days** for others), under Article 38. Termination without notice attracts compensation equal to the notice-period wage. Economic-cause terminations require at least 3 months’ notice.',
    enFaqA: 'Oman requires at least 30 days’ notice for monthly-paid workers (15 days for others).',
    arTitle: 'مدة الإشعار في عُمان: 30 يوماً (2026)',
    arMeta: 'يشترط عُمان إشعاراً لا يقل عن 30 يوماً للعقود غير المحددة الشهرية (15 لغيرهم) بموجب قانون العمل (مرسوم 53/2023) المادة 38. حاسبة وتفاصيل.',
    arBody: 'في عُمان، يجوز لأي طرف إنهاء العقد غير المحدد بإشعار لا يقل عن **30 يوماً** للعامل الشهري (**15 يوماً** لغيره)، بموجب المادة 38. والإنهاء دون إشعار يستوجب تعويضاً يعادل أجر مدة الإشعار. ويتطلب الإنهاء لسبب اقتصادي إشعاراً لا يقل عن 3 أشهر.',
    arFaqA: 'يشترط عُمان إشعاراً لا يقل عن 30 يوماً للعامل الشهري (15 يوماً لغيره).',
    enTake: ['30 days for monthly-paid workers (15 for others).', 'No-notice termination = compensation equal to the notice wage.', 'Economic-cause terminations need 3 months’ notice.'],
    arTake: ['30 يوماً للعامل الشهري (15 لغيره).', 'الإنهاء دون إشعار = تعويض يعادل أجر الإشعار.', 'الإنهاء لسبب اقتصادي يحتاج 3 أشهر إشعار.'],
  },
];

const noticeGuides: Record<string, Record<Locale, GuideContent>> = {};
for (const r of rows) {
  noticeGuides[r.slug] = {
    en: {
      slug: r.slug, locale: 'en', title: r.enTitle, metaDescription: r.enMeta,
      intro: r.enBody,
      sections: [
        { heading: 'The statutory notice', body: r.enBody },
        { heading: 'Notice vs end-of-service', body: 'The notice period is separate from your end-of-service gratuity — notice is time (or pay in lieu) before employment ends, while gratuity is the lump sum paid afterwards. Use the end-of-service calculator for the latter.' },
      ],
      keyTakeaways: r.enTake,
      faqs: [
        { q: `What is the notice period in ${r.country}?`, a: r.enFaqA },
        { q: 'Can my employer pay me instead of giving notice?', a: 'Yes — payment in lieu of the notice period is generally permitted; you receive the wage for the notice period instead of working it.' },
        { q: 'Is notice the same as end-of-service gratuity?', a: 'No. Notice is the period (or pay in lieu) before termination; the gratuity is the separate lump sum paid on leaving.' },
      ],
      relatedCalculators: REL, lastReviewed: R,
    },
    ar: {
      slug: r.slug, locale: 'ar', title: r.arTitle, metaDescription: r.arMeta,
      intro: r.arBody,
      sections: [
        { heading: 'الإشعار القانوني', body: r.arBody },
        { heading: 'الإشعار مقابل نهاية الخدمة', body: 'مدة الإشعار منفصلة عن مكافأة نهاية الخدمة — فالإشعار مدة (أو بدل عنها) قبل انتهاء العمل، أما المكافأة فمبلغ يُدفع بعده. استخدم حاسبة نهاية الخدمة للأخيرة.' },
      ],
      keyTakeaways: r.arTake,
      faqs: [
        { q: `ما مدة الإشعار في ${r.countryAr}؟`, a: r.arFaqA },
        { q: 'هل يجوز لصاحب العمل دفع بدل بدلاً من الإشعار؟', a: 'نعم — يُسمح عادةً بدفع بدل عن مدة الإشعار؛ فتتقاضى أجر المدة بدل العمل فيها.' },
        { q: 'هل الإشعار هو نفسه مكافأة نهاية الخدمة؟', a: 'لا. الإشعار مدة (أو بدل عنها) قبل الإنهاء؛ والمكافأة مبلغ منفصل يُدفع عند ترك العمل.' },
      ],
      relatedCalculators: REL, lastReviewed: R,
    },
  };
}

export default noticeGuides;
