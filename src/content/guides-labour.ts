import type { GuideContent } from './types';
import type { Locale } from '../config/site';

/**
 * Per-country labour-law guides (SEO-focused, high-intent).
 *
 * Unlike the generic "how-to" guides, each entry here targets one country +
 * one statutory topic (e.g. "UAE end-of-service gratuity"). Numbers and bands
 * mirror the country-rules engine (src/lib/country-rules/*), and worked
 * examples match the calculators' output exactly. Country-specific nuances
 * (resignation scales, caps, social-security interplay) are stated explicitly,
 * because those are what generic calculators and LLMs get wrong.
 *
 * Last reviewed: 2026-10-01.
 */
const REVIEWED = '2026-10-01';
const EOS_RELATED = ['end-of-service', 'social-insurance', 'notice-period'];

const labourGuides: Record<string, Record<Locale, GuideContent>> = {
  /* ───────────────────────── UAE ───────────────────────── */
  'end-of-service-gratuity-uae': {
    en: {
      slug: 'end-of-service-gratuity-uae',
      locale: 'en',
      title: 'UAE End-of-Service Gratuity: How It’s Calculated (2026)',
      metaDescription:
        'How UAE end-of-service gratuity works under Federal Decree-Law 33/2021: 21 days’ basic wage per year for the first 5 years, 30 days after, capped at two years’ wages. Worked example + calculator.',
      intro:
        'End-of-service gratuity is the lump sum a UAE private-sector employee receives when their employment ends. It is set by Article 51 of UAE Federal Decree-Law No. 33 of 2021 and is calculated on the basic wage — not the total salary with allowances. This guide explains the bands, the cap, and how resignation affects the figure, with a worked example that matches the Klar calculator.',
      sections: [
        {
          heading: 'What you need',
          body: `Four inputs decide the gratuity: your **monthly basic wage** (the salary before housing, transport and other allowances), your **start date**, your **end date**, and whether employment ended by termination or resignation. The law bases the calculation on the basic wage only, so entering the gross salary will overstate the result.`,
        },
        {
          heading: 'The bands: 21 days, then 30 days',
          body: `UAE gratuity accrues in two tiers:

- **First 5 years:** 21 days of basic wage for each year of service.
- **After 5 years:** 30 days of basic wage for each additional year.

Partial years are pro-rated to the day. The daily wage is the monthly basic wage divided by 30.`,
        },
        {
          heading: 'The two-year cap',
          body: `The total gratuity is capped at **two years’ basic wages** (24 months). For most employees this cap only bites after very long service, but the Klar calculator applies it automatically.`,
        },
        {
          heading: 'Does resignation reduce it?',
          body: `Under the current unlimited-contract regime (Decree-Law 33/2021), an employee who resigns still receives the **full** gratuity once they have completed at least one year of service — the old reductions for resignation on limited contracts no longer apply. (Gratuity is forfeited only in the narrow dismissal grounds set out in the law.)`,
        },
        {
          heading: 'Worked example',
          body: `An employee on a **7,500 AED** monthly basic wage leaves after exactly **5 years**.

Daily wage = 7,500 ÷ 30 = 250 AED. Days accrued = 21 × 5 = **105 days**. Gratuity = 105 × 250 = **26,250 AED**.

This is below the two-year cap (which would be 180,000 AED here), so the full amount is payable.`,
        },
      ],
      keyTakeaways: [
        'Gratuity is based on the basic wage, not the total salary.',
        '21 days per year for the first 5 years, 30 days per year after.',
        'Total is capped at two years’ basic wages.',
        'Resignation no longer reduces the gratuity for completed years (min. 1 year of service).',
      ],
      faqs: [
        { q: 'Is UAE gratuity calculated on basic salary or total salary?', a: 'On the basic wage only. Housing, transport and other allowances are excluded, so using the gross salary overstates the gratuity.' },
        { q: 'Do I get end-of-service gratuity if I resign in the UAE?', a: 'Yes. Under Federal Decree-Law 33/2021 a resigning employee receives the full gratuity for completed years once they have at least one year of continuous service.' },
        { q: 'How many days per year is UAE gratuity?', a: '21 days of basic wage per year for the first five years of service, then 30 days per year for each year beyond five.' },
        { q: 'Is there a maximum UAE gratuity?', a: 'Yes — the total is capped at two years’ basic wages (24 months).' },
      ],
      relatedCalculators: EOS_RELATED,
      lastReviewed: REVIEWED,
    },
    ar: {
      slug: 'end-of-service-gratuity-uae',
      locale: 'ar',
      title: 'مكافأة نهاية الخدمة في الإمارات: كيف تُحسب (2026)',
      metaDescription:
        'كيف تُحسب مكافأة نهاية الخدمة في الإمارات وفق المرسوم بقانون اتحادي 33 لسنة 2021: 21 يوماً عن كل سنة في أول خمس سنوات، و30 يوماً بعدها، بحد أقصى راتبي سنتين. مثال عملي وحاسبة.',
      intro:
        'مكافأة نهاية الخدمة هي المبلغ الذي يستحقه موظف القطاع الخاص في الإمارات عند انتهاء عمله. تنظّمها المادة 51 من المرسوم بقانون اتحادي رقم 33 لسنة 2021، وتُحسب على **الراتب الأساسي** لا الراتب الإجمالي مع البدلات. يشرح هذا الدليل الشرائح والسقف وأثر الاستقالة، مع مثال مطابق لحاسبة كلار.',
      sections: [
        {
          heading: 'ما الذي تحتاجه',
          body: `أربعة مدخلات تحدد المكافأة: **الراتب الأساسي الشهري** (قبل بدل السكن والنقل وغيرها)، و**تاريخ بداية الخدمة**، و**تاريخ نهايتها**، وهل انتهى العمل بإنهاء من جهة العمل أم باستقالة. القانون يحسب على الأساسي فقط، لذا إدخال الإجمالي سيبالغ في النتيجة.`,
        },
        {
          heading: 'الشرائح: 21 يوماً ثم 30 يوماً',
          body: `تتراكم المكافأة على مرحلتين:

- **أول 5 سنوات:** 21 يوماً من الراتب الأساسي عن كل سنة.
- **بعد 5 سنوات:** 30 يوماً عن كل سنة إضافية.

تُقسم السنوات الجزئية تناسبياً حتى اليوم. والأجر اليومي = الراتب الأساسي ÷ 30.`,
        },
        {
          heading: 'سقف الراتبين',
          body: `إجمالي المكافأة محدود بسقف **راتبي سنتين** (24 شهراً). لا يؤثر هذا السقف غالباً إلا بعد خدمة طويلة جداً، وتطبّقه حاسبة كلار تلقائياً.`,
        },
        {
          heading: 'هل تُخفّض الاستقالة المكافأة؟',
          body: `في ظل النظام الحالي للعقود غير المحددة (المرسوم 33 لسنة 2021)، يحصل المستقيل على **كامل** المكافأة متى أكمل سنة خدمة على الأقل، إذ لم تعد تخفيضات الاستقالة في العقود المحددة سارية. ولا تسقط المكافأة إلا في حالات الفصل المحددة ضيّقاً في القانون.`,
        },
        {
          heading: 'مثال عملي',
          body: `موظف براتب أساسي **7,500 درهم** شهرياً ترك العمل بعد **5 سنوات** بالضبط.

الأجر اليومي = 7,500 ÷ 30 = 250 درهماً. أيام الاستحقاق = 21 × 5 = **105 أيام**. المكافأة = 105 × 250 = **26,250 درهماً**.

وهي أقل من سقف الراتبين (180,000 درهم هنا)، فتُدفع كاملة.`,
        },
      ],
      keyTakeaways: [
        'المكافأة تُحسب على الراتب الأساسي لا الإجمالي.',
        '21 يوماً عن كل سنة في أول 5 سنوات، و30 يوماً بعدها.',
        'الإجمالي محدود بسقف راتبي سنتين.',
        'الاستقالة لم تعد تُخفّض مكافأة السنوات المكتملة (بشرط سنة خدمة).',
      ],
      faqs: [
        { q: 'هل تُحسب مكافأة الإمارات على الراتب الأساسي أم الإجمالي؟', a: 'على الراتب الأساسي فقط. تُستثنى بدلات السكن والنقل وغيرها، لذا استخدام الإجمالي يبالغ في المكافأة.' },
        { q: 'هل أستحق مكافأة نهاية الخدمة إذا استقلت في الإمارات؟', a: 'نعم. وفق المرسوم 33 لسنة 2021 يحصل المستقيل على كامل مكافأة السنوات المكتملة متى أكمل سنة خدمة متصلة على الأقل.' },
        { q: 'كم يوماً عن كل سنة في مكافأة الإمارات؟', a: '21 يوماً من الراتب الأساسي عن كل سنة في أول خمس سنوات، ثم 30 يوماً عن كل سنة بعد الخامسة.' },
        { q: 'هل هناك حد أقصى لمكافأة الإمارات؟', a: 'نعم، الإجمالي محدود بسقف راتبي سنتين (24 شهراً).' },
      ],
      relatedCalculators: EOS_RELATED,
      lastReviewed: REVIEWED,
    },
  },

  /* ──────────────────── Saudi Arabia ──────────────────── */
  'end-of-service-gratuity-saudi-arabia': {
    en: {
      slug: 'end-of-service-gratuity-saudi-arabia',
      locale: 'en',
      title: 'Saudi End-of-Service Award: How It’s Calculated (2026)',
      metaDescription:
        'Saudi end-of-service award under Labour Law Art. 84–85: half a month’s wage per year for the first 5 years, a full month after, with a resignation scale (nil under 2 years, 1/3, 2/3, then full). Worked example + calculator.',
      intro:
        'In Saudi Arabia the end-of-service award (“mukafa’at nihayat al-khidma”) is set by Articles 84–85 of the Labour Law. The headline bands are generous, but resignation can cut the amount sharply on an unlimited contract — which is exactly where most people miscalculate. This guide walks through both, with a worked example matching the Klar calculator.',
      sections: [
        {
          heading: 'The bands: half a month, then a full month',
          body: `The award accrues on the last wage:

- **First 5 years:** half a month’s wage (15 days) for each year.
- **After 5 years:** a full month’s wage (30 days) for each additional year.

Partial years are pro-rated. The daily wage is the monthly wage divided by 30.`,
        },
        {
          heading: 'The resignation scale (Art. 85)',
          body: `On an unlimited-term contract, resignation reduces the award by length of service:

- **Under 2 years:** nothing.
- **2 to under 5 years:** one third of the award.
- **5 to under 10 years:** two thirds.
- **10 years or more:** the full award.

Termination by the employer pays the full award regardless. This single rule is the most common source of wrong figures.`,
        },
        {
          heading: 'Full-award exceptions (Art. 87)',
          body: `Some resignations still receive the full award — for example a female worker who resigns within six months of marriage or three months of childbirth, and cases of force majeure. Choose “termination by employer” in the calculator to model a full-award outcome.`,
        },
        {
          heading: 'Worked example',
          body: `An employee on a **10,000 SAR** monthly wage leaves after **7 years**.

First 5 years: 15 × 5 = 75 days. Next 2 years: 30 × 2 = 60 days. Total = 135 days. Daily wage = 10,000 ÷ 30 = 333.33 SAR. Full award = 135 × 333.33 ≈ **45,000 SAR**.

If the employee **resigned** at 7 years, the Art. 85 scale applies two thirds: ≈ **30,000 SAR**.`,
        },
      ],
      keyTakeaways: [
        'Half a month per year for the first 5 years, a full month per year after.',
        'Resignation on an unlimited contract cuts the award: nil under 2 years, 1/3, 2/3, then full at 10.',
        'Employer termination always pays the full award.',
        'Art. 87 keeps the full award for specific cases (e.g. marriage/childbirth, force majeure).',
      ],
      faqs: [
        { q: 'How is the Saudi end-of-service award calculated?', a: 'Half a month’s wage for each of the first five years and a full month’s wage for each year after, pro-rated for partial years, on the last wage.' },
        { q: 'What happens to my Saudi end-of-service if I resign?', a: 'On an unlimited contract the award is reduced by service: nothing under 2 years, one third from 2 to 5, two thirds from 5 to 10, and the full award at 10 years or more.' },
        { q: 'Does employer termination pay the full Saudi award?', a: 'Yes. The resignation scale only applies when the employee resigns; termination by the employer pays the full award.' },
      ],
      relatedCalculators: EOS_RELATED,
      lastReviewed: REVIEWED,
    },
    ar: {
      slug: 'end-of-service-gratuity-saudi-arabia',
      locale: 'ar',
      title: 'مكافأة نهاية الخدمة في السعودية: كيف تُحسب (2026)',
      metaDescription:
        'مكافأة نهاية الخدمة في السعودية وفق المادتين 84 و85 من نظام العمل: نصف شهر عن كل سنة في أول خمس سنوات، وشهر كامل بعدها، مع مقياس تخفيض للاستقالة (لا شيء دون سنتين، الثلث، الثلثان، ثم الكامل). مثال عملي وحاسبة.',
      intro:
        'في السعودية تُنظّم مكافأة نهاية الخدمة بالمادتين 84 و85 من نظام العمل. الشرائح الأساسية سخية، لكن الاستقالة قد تقتطع المبلغ بشدة في العقد غير المحدد المدة — وهنا تحديداً يقع أغلب الخطأ في الحساب. يشرح هذا الدليل الأمرين بمثال مطابق لحاسبة كلار.',
      sections: [
        {
          heading: 'الشرائح: نصف شهر ثم شهر كامل',
          body: `تتراكم المكافأة على الأجر الأخير:

- **أول 5 سنوات:** نصف شهر (15 يوماً) عن كل سنة.
- **بعد 5 سنوات:** شهر كامل (30 يوماً) عن كل سنة إضافية.

تُقسم السنوات الجزئية تناسبياً، والأجر اليومي = الأجر الشهري ÷ 30.`,
        },
        {
          heading: 'مقياس الاستقالة (المادة 85)',
          body: `في العقد غير المحدد المدة، تُخفّض الاستقالة المكافأة بحسب مدة الخدمة:

- **دون سنتين:** لا شيء.
- **من سنتين إلى أقل من 5:** ثلث المكافأة.
- **من 5 إلى أقل من 10:** الثلثان.
- **10 سنوات فأكثر:** المكافأة كاملة.

أما الإنهاء من جهة العمل فيدفع المكافأة كاملة أياً كانت المدة. وهذه القاعدة أكثر أسباب الأرقام الخاطئة شيوعاً.`,
        },
        {
          heading: 'استثناءات المكافأة الكاملة (المادة 87)',
          body: `بعض حالات الاستقالة تُمنح المكافأة كاملة — مثل استقالة العاملة خلال ستة أشهر من زواجها أو ثلاثة أشهر من وضعها، وحالات القوة القاهرة. اختر «إنهاء من جهة العمل» في الحاسبة لتمثيل نتيجة المكافأة الكاملة.`,
        },
        {
          heading: 'مثال عملي',
          body: `موظف بأجر شهري **10,000 ريال** ترك العمل بعد **7 سنوات**.

أول 5 سنوات: 15 × 5 = 75 يوماً. السنتان التاليتان: 30 × 2 = 60 يوماً. الإجمالي = 135 يوماً. الأجر اليومي = 10,000 ÷ 30 = 333.33 ريال. المكافأة الكاملة = 135 × 333.33 ≈ **45,000 ريال**.

ولو **استقال** عند 7 سنوات، يُطبّق مقياس المادة 85 الثلثين: ≈ **30,000 ريال**.`,
        },
      ],
      keyTakeaways: [
        'نصف شهر عن كل سنة في أول 5 سنوات، وشهر كامل بعدها.',
        'الاستقالة في العقد غير المحدد تُخفّض المكافأة: لا شيء دون سنتين، الثلث، الثلثان، ثم الكامل عند 10.',
        'الإنهاء من جهة العمل يدفع المكافأة كاملة دائماً.',
        'المادة 87 تُبقي المكافأة كاملة في حالات محددة (كالزواج والولادة والقوة القاهرة).',
      ],
      faqs: [
        { q: 'كيف تُحسب مكافأة نهاية الخدمة في السعودية؟', a: 'نصف شهر عن كل سنة في أول خمس سنوات وشهر كامل عن كل سنة بعدها، مع تقسيم تناسبي للكسور، على الأجر الأخير.' },
        { q: 'ماذا يحدث لمكافأتي في السعودية إذا استقلت؟', a: 'في العقد غير المحدد تُخفّض المكافأة بحسب المدة: لا شيء دون سنتين، الثلث من سنتين إلى 5، الثلثان من 5 إلى 10، والكاملة عند 10 سنوات فأكثر.' },
        { q: 'هل يدفع الإنهاء من جهة العمل المكافأة كاملة؟', a: 'نعم. مقياس الاستقالة يُطبّق عند استقالة الموظف فقط؛ أما الإنهاء من جهة العمل فيدفع المكافأة كاملة.' },
      ],
      relatedCalculators: EOS_RELATED,
      lastReviewed: REVIEWED,
    },
  },

  /* ───────────────────────── Qatar ───────────────────────── */
  'end-of-service-gratuity-qatar': {
    en: {
      slug: 'end-of-service-gratuity-qatar',
      locale: 'en',
      title: 'Qatar End-of-Service Gratuity: How It’s Calculated (2026)',
      metaDescription:
        'Qatar end-of-service gratuity under Labour Law Art. 54: 21 days’ basic wage (three weeks) per year of service after one year, no cap. Who gets it, worked example + calculator.',
      intro:
        'Qatar’s end-of-service gratuity is a flat three weeks’ wage per year — one of the simplest formulas in the region. It is set by Article 54 of Labour Law No. 14 of 2004 and applies to expatriate workers, who make up most of the private-sector workforce. This guide covers the rule, who it applies to, and a worked example matching the Klar calculator.',
      sections: [
        {
          heading: 'The rule: 21 days per year',
          body: `After completing **one year** of continuous service, an employee earns **21 days** of basic wage (three weeks) for **each year** of service, pro-rated to the exact termination date. There is now a single flat rate — the earlier three/four/five-week tiers and the two-year cap have been removed.`,
        },
        {
          heading: 'Who gets the gratuity',
          body: `The Labour Law gratuity applies to **expatriate** employees. Qatari nationals are instead covered by the social insurance scheme administered by GRSIA (and GCC nationals by their home scheme), so they do not receive this separate gratuity. The Klar calculator estimates the Labour Law gratuity.`,
        },
        {
          heading: 'Basic wage and partial years',
          body: `The gratuity is calculated on the **basic wage**, excluding allowances. The daily wage is the monthly basic wage divided by 30, and any partial final year is paid proportionally.`,
        },
        {
          heading: 'Worked example',
          body: `An employee on a **6,000 QAR** monthly basic wage leaves after **4 years**.

Daily wage = 6,000 ÷ 30 = 200 QAR. Days accrued = 21 × 4 = **84 days**. Gratuity = 84 × 200 = **16,800 QAR**.`,
        },
      ],
      keyTakeaways: [
        '21 days of basic wage (three weeks) per year of service.',
        'Entitlement begins after one year of continuous service.',
        'No cap, and a single flat rate (old tiers removed).',
        'Applies to expatriate workers; Qatari nationals are covered by social insurance instead.',
      ],
      faqs: [
        { q: 'How is Qatar end-of-service gratuity calculated?', a: 'Twenty-one days of basic wage (three weeks) for each year of service, pro-rated to the termination date, once you have completed one year.' },
        { q: 'Is there a cap on Qatar gratuity?', a: 'No. The former two-year wage cap and the tiered 3/4/5-week scale were removed; it is now a flat 21 days per year with no maximum.' },
        { q: 'Do Qatari nationals get the Labour Law gratuity?', a: 'No. Qatari nationals are covered by the GRSIA social insurance scheme; the Labour Law gratuity applies to expatriate workers.' },
      ],
      relatedCalculators: EOS_RELATED,
      lastReviewed: REVIEWED,
    },
    ar: {
      slug: 'end-of-service-gratuity-qatar',
      locale: 'ar',
      title: 'مكافأة نهاية الخدمة في قطر: كيف تُحسب (2026)',
      metaDescription:
        'مكافأة نهاية الخدمة في قطر وفق المادة 54 من قانون العمل: 21 يوماً (ثلاثة أسابيع) من الراتب الأساسي عن كل سنة خدمة بعد إتمام سنة، دون حد أقصى. لمن تُصرف، مع مثال عملي وحاسبة.',
      intro:
        'مكافأة نهاية الخدمة في قطر هي ثلاثة أسابيع من الأجر عن كل سنة — من أبسط الصيغ في المنطقة. تنظّمها المادة 54 من قانون العمل رقم 14 لسنة 2004، وتُطبّق على العمال الوافدين الذين يشكّلون أغلب قوة العمل في القطاع الخاص. يغطي هذا الدليل القاعدة ومن تنطبق عليه مع مثال مطابق لحاسبة كلار.',
      sections: [
        {
          heading: 'القاعدة: 21 يوماً عن كل سنة',
          body: `بعد إتمام **سنة** خدمة متصلة، يستحق الموظف **21 يوماً** من الراتب الأساسي (ثلاثة أسابيع) عن **كل سنة** خدمة، مع تقسيم تناسبي حتى تاريخ انتهاء العمل. وصارت القاعدة معدلاً ثابتاً واحداً — إذ أُلغيت الشرائح السابقة (3/4/5 أسابيع) وسقف الراتبين.`,
        },
        {
          heading: 'لمن تُصرف المكافأة',
          body: `مكافأة قانون العمل تُصرف للموظفين **الوافدين**. أما القطريون فيخضعون لنظام التأمينات الاجتماعية لدى الهيئة العامة للتقاعد والتأمينات (ومواطنو الخليج لنظام بلدهم)، فلا يتلقّون هذه المكافأة المنفصلة. وتقدّر حاسبة كلار مكافأة قانون العمل.`,
        },
        {
          heading: 'الراتب الأساسي والسنوات الجزئية',
          body: `تُحسب المكافأة على **الراتب الأساسي** دون البدلات. والأجر اليومي = الراتب الأساسي الشهري ÷ 30، وتُدفع السنة الأخيرة الجزئية بنسبتها.`,
        },
        {
          heading: 'مثال عملي',
          body: `موظف براتب أساسي **6,000 ريال قطري** شهرياً ترك العمل بعد **4 سنوات**.

الأجر اليومي = 6,000 ÷ 30 = 200 ريال. أيام الاستحقاق = 21 × 4 = **84 يوماً**. المكافأة = 84 × 200 = **16,800 ريال قطري**.`,
        },
      ],
      keyTakeaways: [
        '21 يوماً (ثلاثة أسابيع) من الراتب الأساسي عن كل سنة خدمة.',
        'يبدأ الاستحقاق بعد إتمام سنة خدمة متصلة.',
        'لا سقف، ومعدل ثابت واحد (أُلغيت الشرائح القديمة).',
        'تُصرف للوافدين؛ أما القطريون فيخضعون للتأمينات الاجتماعية.',
      ],
      faqs: [
        { q: 'كيف تُحسب مكافأة نهاية الخدمة في قطر؟', a: 'واحد وعشرون يوماً من الراتب الأساسي (ثلاثة أسابيع) عن كل سنة خدمة، مع تقسيم تناسبي حتى تاريخ الانتهاء، بعد إتمام سنة.' },
        { q: 'هل هناك حد أقصى لمكافأة قطر؟', a: 'لا. أُلغي سقف الراتبين السابق والشرائح المتدرجة (3/4/5 أسابيع)، وصارت معدلاً ثابتاً قدره 21 يوماً عن كل سنة دون حد أقصى.' },
        { q: 'هل يحصل القطريون على مكافأة قانون العمل؟', a: 'لا. القطريون مشمولون بنظام التأمينات الاجتماعية لدى هيئة التقاعد؛ ومكافأة قانون العمل تُصرف للوافدين.' },
      ],
      relatedCalculators: EOS_RELATED,
      lastReviewed: REVIEWED,
    },
  },

  /* ───────────────────────── Jordan ───────────────────────── */
  'end-of-service-gratuity-jordan': {
    en: {
      slug: 'end-of-service-gratuity-jordan',
      locale: 'en',
      title: 'Jordan End-of-Service Gratuity & Social Security (2026)',
      metaDescription:
        'Jordan end-of-service gratuity is one month’s wage per year — but only for employees NOT covered by Social Security. SSC-covered workers (the majority) receive end-of-service through the SSC instead. Worked example + calculator.',
      intro:
        'Jordan’s end-of-service gratuity has a catch that trips up most online calculators: it applies in full only to employees who are **not** covered by the Social Security Corporation (SSC). Because SSC coverage is mandatory for virtually all private-sector workers, the separate employer gratuity usually does not apply — end of service runs through the SSC instead. This guide explains both the formula and the coverage rule.',
      sections: [
        {
          heading: 'The formula (for non-SSC employees)',
          body: `Where it applies, the gratuity is **one month’s wage (30 days) for each year** of service, with partial years pro-rated. The daily wage is the monthly wage divided by 30.`,
        },
        {
          heading: 'The Social Security catch',
          body: `This is the part almost everyone gets wrong. Under Jordanian law the employer-paid end-of-service gratuity is owed **only to employees not covered by Social Security**. Since the SSC covers nearly all private-sector employees, most workers receive their end-of-service entitlement **through the SSC** (as a pension or lump sum) rather than a separate gratuity from the employer. For a typical SSC-covered worker, the employer gratuity may therefore be **zero**.`,
        },
        {
          heading: 'What to check',
          body: `Confirm whether you are registered with the SSC (almost all legally employed workers are). If you are covered, your end-of-service benefit comes from the SSC, and this calculator’s gratuity figure represents the Article formula — useful mainly for the minority of non-covered cases or as an upper-bound reference.`,
        },
        {
          heading: 'Worked example (non-SSC case)',
          body: `A non-SSC-covered employee on an **800 JOD** monthly wage leaves after **8 years**.

Daily wage = 800 ÷ 30 ≈ 26.67 JOD. Days accrued = 30 × 8 = **240 days**. Gratuity = 240 × 26.67 ≈ **6,400 JOD**.

For an SSC-covered employee, this employer gratuity would not apply — end of service is handled by the SSC.`,
        },
      ],
      keyTakeaways: [
        'The formula is one month’s wage (30 days) per year of service.',
        'It applies in full only to employees NOT covered by Social Security.',
        'SSC-covered workers (the large majority) receive end of service through the SSC, so the employer gratuity may be 0.',
        'Check your SSC registration before relying on a gratuity figure.',
      ],
      faqs: [
        { q: 'Is there end-of-service gratuity in Jordan?', a: 'There is an Article-based gratuity of one month’s wage per year, but it applies only to employees not covered by Social Security. SSC-covered workers — the large majority — receive end of service through the SSC instead.' },
        { q: 'Do I get both Social Security and an end-of-service gratuity in Jordan?', a: 'Generally no. If you are covered by the SSC, your end-of-service entitlement comes through the SSC; the separate employer gratuity applies to non-covered employees.' },
        { q: 'How is the Jordan gratuity formula calculated?', a: 'One month’s wage (30 days) for each year of service, pro-rated for partial years — for the minority of employees not covered by Social Security.' },
      ],
      relatedCalculators: ['end-of-service', 'social-insurance', 'income-tax'],
      lastReviewed: REVIEWED,
    },
    ar: {
      slug: 'end-of-service-gratuity-jordan',
      locale: 'ar',
      title: 'مكافأة نهاية الخدمة والضمان الاجتماعي في الأردن (2026)',
      metaDescription:
        'مكافأة نهاية الخدمة في الأردن شهر عن كل سنة — لكن للموظفين غير المشمولين بالضمان الاجتماعي فقط. أما المشمولون (الأغلبية) فيحصلون على نهاية الخدمة عبر الضمان. مثال عملي وحاسبة.',
      intro:
        'لمكافأة نهاية الخدمة في الأردن استثناء يُوقِع أغلب الحاسبات على الإنترنت في الخطأ: فهي تُطبّق كاملةً فقط على الموظفين **غير المشمولين** بالضمان الاجتماعي. ولأن اشتراك الضمان إلزامي لكل عمال القطاع الخاص تقريباً، فإن مكافأة صاحب العمل المنفصلة لا تُطبّق غالباً — إذ تتم نهاية الخدمة عبر الضمان. يشرح هذا الدليل الصيغة وقاعدة الشمول معاً.',
      sections: [
        {
          heading: 'الصيغة (لغير المشمولين بالضمان)',
          body: `حيث تنطبق، تكون المكافأة **شهراً كاملاً (30 يوماً) عن كل سنة** خدمة، مع تقسيم تناسبي للكسور. والأجر اليومي = الأجر الشهري ÷ 30.`,
        },
        {
          heading: 'استثناء الضمان الاجتماعي',
          body: `هنا تحديداً يقع الخطأ عند الجميع تقريباً. بموجب القانون الأردني، لا تُستحق مكافأة نهاية الخدمة من صاحب العمل إلا **للموظفين غير المشمولين بالضمان الاجتماعي**. ولأن الضمان يغطي كل موظفي القطاع الخاص تقريباً، فإن أغلب العمال يحصلون على استحقاق نهاية الخدمة **عبر الضمان** (راتباً تقاعدياً أو دفعة واحدة) بدلاً من مكافأة منفصلة من صاحب العمل. لذا قد تكون مكافأة صاحب العمل للموظف المشمول **صفراً**.`,
        },
        {
          heading: 'ما الذي ينبغي التحقق منه',
          body: `تأكّد مما إذا كنت مشتركاً في الضمان الاجتماعي (وغالبية العاملين نظامياً مشتركون). فإن كنت مشمولاً، يأتي استحقاق نهاية خدمتك من الضمان، ويمثّل رقم المكافأة في هذه الحاسبة صيغة المادة القانونية — وهو مفيد أساساً للأقلية غير المشمولة أو كحدّ أعلى مرجعي.`,
        },
        {
          heading: 'مثال عملي (حالة غير مشمولة بالضمان)',
          body: `موظف غير مشمول بالضمان بأجر شهري **800 دينار** ترك العمل بعد **8 سنوات**.

الأجر اليومي = 800 ÷ 30 ≈ 26.67 ديناراً. أيام الاستحقاق = 30 × 8 = **240 يوماً**. المكافأة = 240 × 26.67 ≈ **6,400 دينار**.

أما الموظف المشمول بالضمان فلا تنطبق عليه مكافأة صاحب العمل هذه — إذ تتولى نهاية الخدمة مؤسسة الضمان.`,
        },
      ],
      keyTakeaways: [
        'الصيغة شهر كامل (30 يوماً) عن كل سنة خدمة.',
        'لا تُطبّق كاملةً إلا على الموظفين غير المشمولين بالضمان الاجتماعي.',
        'المشمولون بالضمان (الأغلبية) يحصلون على نهاية الخدمة عبر الضمان، فقد تكون مكافأة صاحب العمل صفراً.',
        'تحقّق من اشتراكك في الضمان قبل الاعتماد على رقم المكافأة.',
      ],
      faqs: [
        { q: 'هل توجد مكافأة نهاية خدمة في الأردن؟', a: 'توجد مكافأة قانونية قدرها شهر عن كل سنة، لكنها تُطبّق فقط على غير المشمولين بالضمان الاجتماعي. أما المشمولون — وهم الأغلبية — فيحصلون على نهاية الخدمة عبر الضمان.' },
        { q: 'هل أحصل على الضمان ومكافأة نهاية الخدمة معاً في الأردن؟', a: 'غالباً لا. إن كنت مشمولاً بالضمان، يأتي استحقاق نهاية خدمتك من الضمان؛ أما مكافأة صاحب العمل المنفصلة فتخصّ غير المشمولين.' },
        { q: 'كيف تُحسب صيغة المكافأة في الأردن؟', a: 'شهر كامل (30 يوماً) عن كل سنة خدمة، مع تقسيم تناسبي للكسور — للأقلية غير المشمولة بالضمان الاجتماعي.' },
      ],
      relatedCalculators: ['end-of-service', 'social-insurance', 'income-tax'],
      lastReviewed: REVIEWED,
    },
  },

  /* ───────────────────────── Kuwait ───────────────────────── */
  'end-of-service-gratuity-kuwait': {
    en: {
      slug: 'end-of-service-gratuity-kuwait',
      locale: 'en',
      title: 'Kuwait End-of-Service Indemnity: How It’s Calculated (2026)',
      metaDescription:
        'Kuwait end-of-service indemnity under Labour Law Art. 51 & 53: 15 days’ wage per year for the first 5 years, a full month after, capped at 18 months, with a resignation scale (nil under 3 years, 1/2, 2/3, then full). Worked example + calculator.',
      intro:
        'Kuwait’s end-of-service indemnity for monthly-paid private-sector workers is set by Articles 51 and 53 of Labour Law No. 6 of 2010. Like Saudi Arabia it has a resignation scale, but the thresholds differ — Kuwait’s first step is three years, not two — and there is an 18-month cap. This guide covers both, with a worked example matching the Klar calculator.',
      sections: [
        {
          heading: 'The bands and the cap',
          body: `For monthly-paid workers the indemnity accrues on the last wage:

- **First 5 years:** 15 days’ wage for each year.
- **After 5 years:** a full month (30 days) for each additional year.

The total is capped at **18 months’ wage** (1.5 years). Partial years are pro-rated; the daily wage is the monthly wage divided by 30.`,
        },
        {
          heading: 'The resignation scale (Art. 53)',
          body: `On an unlimited contract, resignation reduces the indemnity by service length:

- **Under 3 years:** nothing.
- **3 to under 5 years:** one half.
- **5 to under 10 years:** two thirds.
- **10 years or more:** the full indemnity.

Note the first threshold is **3 years** (Saudi’s is 2). Termination by the employer pays the full indemnity.`,
        },
        {
          heading: 'Worked example',
          body: `An employee on an **800 KWD** monthly wage leaves after **7 years**.

First 5 years: 15 × 5 = 75 days. Next 2 years: 30 × 2 = 60 days. Total = 135 days. Daily wage = 800 ÷ 30 = 26.67 KWD. Full indemnity = 135 × 26.67 ≈ **3,600 KWD** (below the 18-month cap of 14,400 KWD).

If the employee **resigned** at 7 years, the Art. 53 scale applies two thirds: ≈ **2,400 KWD**.`,
        },
      ],
      keyTakeaways: [
        '15 days per year for the first 5 years, a full month per year after.',
        'Total capped at 18 months’ wage.',
        'Resignation scale: nil under 3 years, 1/2, 2/3, then full at 10.',
        'Employer termination pays the full indemnity.',
      ],
      faqs: [
        { q: 'How is Kuwait end-of-service indemnity calculated?', a: 'For monthly-paid workers: 15 days’ wage for each of the first five years and a full month for each year after, pro-rated, on the last wage, capped at 18 months.' },
        { q: 'What happens to my Kuwait indemnity if I resign?', a: 'On an unlimited contract it is reduced by service: nothing under 3 years, one half from 3 to 5, two thirds from 5 to 10, and the full indemnity at 10 years or more.' },
        { q: 'Is there a cap on Kuwait end-of-service?', a: 'Yes — the total is capped at 18 months’ wage (1.5 years).' },
      ],
      relatedCalculators: EOS_RELATED,
      lastReviewed: REVIEWED,
    },
    ar: {
      slug: 'end-of-service-gratuity-kuwait',
      locale: 'ar',
      title: 'مكافأة نهاية الخدمة في الكويت: كيف تُحسب (2026)',
      metaDescription:
        'مكافأة نهاية الخدمة في الكويت وفق المادتين 51 و53 من قانون العمل: 15 يوماً عن كل سنة في أول خمس سنوات، وشهر كامل بعدها، بحد أقصى 18 شهراً، مع مقياس تخفيض للاستقالة (لا شيء دون 3 سنوات، النصف، الثلثان، ثم الكامل). مثال عملي وحاسبة.',
      intro:
        'مكافأة نهاية الخدمة في الكويت للعامل الشهري في القطاع الخاص تنظّمها المادتان 51 و53 من قانون العمل رقم 6 لسنة 2010. وكما في السعودية ثمّة مقياس للاستقالة، لكن العتبات مختلفة — فأول درجة في الكويت ثلاث سنوات لا سنتان — مع سقف 18 شهراً. يشرح هذا الدليل الأمرين بمثال مطابق لحاسبة كلار.',
      sections: [
        {
          heading: 'الشرائح والسقف',
          body: `للعامل الشهري تتراكم المكافأة على الأجر الأخير:

- **أول 5 سنوات:** 15 يوماً عن كل سنة.
- **بعد 5 سنوات:** شهر كامل (30 يوماً) عن كل سنة إضافية.

والإجمالي محدود بسقف **18 شهراً** (سنة ونصف). تُقسم السنوات الجزئية تناسبياً، والأجر اليومي = الأجر الشهري ÷ 30.`,
        },
        {
          heading: 'مقياس الاستقالة (المادة 53)',
          body: `في العقد غير المحدد، تُخفّض الاستقالة المكافأة بحسب المدة:

- **دون 3 سنوات:** لا شيء.
- **من 3 إلى أقل من 5:** النصف.
- **من 5 إلى أقل من 10:** الثلثان.
- **10 سنوات فأكثر:** المكافأة كاملة.

لاحظ أن العتبة الأولى **3 سنوات** (وهي سنتان في السعودية). والإنهاء من جهة العمل يدفع المكافأة كاملة.`,
        },
        {
          heading: 'مثال عملي',
          body: `موظف بأجر شهري **800 دينار كويتي** ترك العمل بعد **7 سنوات**.

أول 5 سنوات: 15 × 5 = 75 يوماً. السنتان التاليتان: 30 × 2 = 60 يوماً. الإجمالي = 135 يوماً. الأجر اليومي = 800 ÷ 30 = 26.67 ديناراً. المكافأة الكاملة = 135 × 26.67 ≈ **3,600 دينار** (أقل من سقف 18 شهراً البالغ 14,400 ديناراً).

ولو **استقال** عند 7 سنوات، يُطبّق مقياس المادة 53 الثلثين: ≈ **2,400 دينار**.`,
        },
      ],
      keyTakeaways: [
        '15 يوماً عن كل سنة في أول 5 سنوات، وشهر كامل بعدها.',
        'الإجمالي محدود بسقف 18 شهراً.',
        'مقياس الاستقالة: لا شيء دون 3 سنوات، النصف، الثلثان، ثم الكامل عند 10.',
        'الإنهاء من جهة العمل يدفع المكافأة كاملة.',
      ],
      faqs: [
        { q: 'كيف تُحسب مكافأة نهاية الخدمة في الكويت؟', a: 'للعامل الشهري: 15 يوماً عن كل سنة في أول خمس سنوات وشهر كامل عن كل سنة بعدها، مع تقسيم تناسبي، على الأجر الأخير، بحد أقصى 18 شهراً.' },
        { q: 'ماذا يحدث لمكافأتي في الكويت إذا استقلت؟', a: 'في العقد غير المحدد تُخفّض بحسب المدة: لا شيء دون 3 سنوات، النصف من 3 إلى 5، الثلثان من 5 إلى 10، والكاملة عند 10 سنوات فأكثر.' },
        { q: 'هل هناك حد أقصى لمكافأة الكويت؟', a: 'نعم، الإجمالي محدود بسقف 18 شهراً (سنة ونصف).' },
      ],
      relatedCalculators: EOS_RELATED,
      lastReviewed: REVIEWED,
    },
  },

  /* ───────────────────────── Bahrain ───────────────────────── */
  'end-of-service-gratuity-bahrain': {
    en: {
      slug: 'end-of-service-gratuity-bahrain',
      locale: 'en',
      title: 'Bahrain Leaving Indemnity: How It’s Calculated (2026)',
      metaDescription:
        'Bahrain leaving indemnity under Labour Law Art. 116: 15 days’ wage per year for the first 3 years, a full month after, no cap, on the last basic wage. Plus the SIO expat end-of-service scheme since 2024. Worked example + calculator.',
      intro:
        'Bahrain’s leaving indemnity is set by Article 116 of Labour Law No. 36 of 2012. Its distinctive feature is the **three-year** step — the rate rises after three years, not five — and there is no cap. Since 2024 the indemnity for non-Bahraini workers is also funded through a SIO scheme. This guide covers both, with a worked example matching the Klar calculator.',
      sections: [
        {
          heading: 'The bands: 15 days, then 30 days after 3 years',
          body: `The indemnity accrues on the last basic wage:

- **First 3 years:** 15 days’ wage (half a month) for each year.
- **After 3 years:** a full month (30 days) for each additional year.

Note the step is at **3 years**, earlier than most GCC states. There is **no cap** and no minimum-service requirement; partial years are pro-rated.`,
        },
        {
          heading: 'Non-Bahraini workers: the SIO scheme',
          body: `Since **1 March 2024**, the end-of-service benefit for non-Bahraini workers has been administered through a SIO-funded scheme (employer contributions of 4.2% of wage for the first three years, then 8.4%). Service **before** that date is still settled directly by the employer under the Article 116 formula. The calculator estimates the Article 116 indemnity.`,
        },
        {
          heading: 'Worked example',
          body: `An employee on a **600 BHD** monthly basic wage leaves after **5 years**.

First 3 years: 15 × 3 = 45 days. Next 2 years: 30 × 2 = 60 days. Total = 105 days. Daily wage = 600 ÷ 30 = 20 BHD. Indemnity = 105 × 20 = **2,100 BHD** (no cap applies).`,
        },
      ],
      keyTakeaways: [
        '15 days per year for the first 3 years, a full month per year after.',
        'The rate step is at 3 years — earlier than most GCC states.',
        'No cap and no minimum-service requirement.',
        'Since March 2024, non-Bahraini end-of-service is funded via a SIO scheme; pre-2024 service is settled by the employer.',
      ],
      faqs: [
        { q: 'How is Bahrain leaving indemnity calculated?', a: '15 days’ wage for each of the first three years and a full month for each year after, pro-rated, on the last basic wage, with no cap.' },
        { q: 'When does the Bahrain rate increase to a full month?', a: 'After three years of service — earlier than the five-year step used in several other Gulf states.' },
        { q: 'How does Bahrain’s SIO scheme affect expat end-of-service?', a: 'Since 1 March 2024 the benefit for non-Bahraini workers is funded through SIO contributions (4.2% then 8.4%); service before that date is paid directly by the employer under Article 116.' },
      ],
      relatedCalculators: EOS_RELATED,
      lastReviewed: REVIEWED,
    },
    ar: {
      slug: 'end-of-service-gratuity-bahrain',
      locale: 'ar',
      title: 'مكافأة نهاية الخدمة في البحرين: كيف تُحسب (2026)',
      metaDescription:
        'مكافأة نهاية الخدمة في البحرين وفق المادة 116 من قانون العمل: 15 يوماً عن كل سنة في أول 3 سنوات، وشهر كامل بعدها، دون حد أقصى، على الأجر الأساسي الأخير. مع نظام الهيئة للوافدين منذ 2024. مثال عملي وحاسبة.',
      intro:
        'مكافأة نهاية الخدمة في البحرين تنظّمها المادة 116 من قانون العمل رقم 36 لسنة 2012. وميزتها المميّزة هي عتبة **الثلاث سنوات** — إذ يرتفع المعدل بعد ثلاث سنوات لا خمس — ودون سقف. ومنذ 2024 صارت مكافأة الوافدين تُموَّل أيضاً عبر نظام لدى الهيئة. يشرح هذا الدليل الأمرين بمثال مطابق لحاسبة كلار.',
      sections: [
        {
          heading: 'الشرائح: 15 يوماً ثم 30 يوماً بعد 3 سنوات',
          body: `تتراكم المكافأة على الأجر الأساسي الأخير:

- **أول 3 سنوات:** 15 يوماً (نصف شهر) عن كل سنة.
- **بعد 3 سنوات:** شهر كامل (30 يوماً) عن كل سنة إضافية.

لاحظ أن الارتفاع عند **3 سنوات**، أبكر من أغلب دول الخليج. ولا **سقف** ولا حد أدنى للخدمة؛ وتُقسم الكسور تناسبياً.`,
        },
        {
          heading: 'الوافدون: نظام الهيئة',
          body: `منذ **1 مارس 2024**، صارت مكافأة نهاية الخدمة للوافدين تُدار عبر نظام تموّله هيئة التأمينات (اشتراكات صاحب العمل 4.2% من الأجر لأول ثلاث سنوات ثم 8.4%). أما الخدمة **قبل** ذلك التاريخ فتُسوّى مباشرةً من صاحب العمل وفق صيغة المادة 116. وتقدّر الحاسبة مكافأة المادة 116.`,
        },
        {
          heading: 'مثال عملي',
          body: `موظف بأجر أساسي **600 دينار بحريني** شهرياً ترك العمل بعد **5 سنوات**.

أول 3 سنوات: 15 × 3 = 45 يوماً. السنتان التاليتان: 30 × 2 = 60 يوماً. الإجمالي = 105 أيام. الأجر اليومي = 600 ÷ 30 = 20 ديناراً. المكافأة = 105 × 20 = **2,100 دينار** (لا سقف يُطبّق).`,
        },
      ],
      keyTakeaways: [
        '15 يوماً عن كل سنة في أول 3 سنوات، وشهر كامل بعدها.',
        'ارتفاع المعدل عند 3 سنوات — أبكر من أغلب دول الخليج.',
        'لا سقف ولا حد أدنى للخدمة.',
        'منذ مارس 2024 تُموَّل مكافأة الوافدين عبر نظام الهيئة؛ والخدمة قبلها يسوّيها صاحب العمل.',
      ],
      faqs: [
        { q: 'كيف تُحسب مكافأة نهاية الخدمة في البحرين؟', a: '15 يوماً عن كل سنة في أول ثلاث سنوات وشهر كامل عن كل سنة بعدها، مع تقسيم تناسبي، على الأجر الأساسي الأخير، دون سقف.' },
        { q: 'متى يرتفع معدل البحرين إلى شهر كامل؟', a: 'بعد ثلاث سنوات خدمة — أبكر من عتبة الخمس سنوات المعتمدة في عدة دول خليجية أخرى.' },
        { q: 'كيف يؤثر نظام الهيئة على مكافأة الوافدين في البحرين؟', a: 'منذ 1 مارس 2024 تُموَّل مكافأة الوافدين عبر اشتراكات الهيئة (4.2% ثم 8.4%)؛ والخدمة قبل ذلك التاريخ تُدفع مباشرةً من صاحب العمل وفق المادة 116.' },
      ],
      relatedCalculators: EOS_RELATED,
      lastReviewed: REVIEWED,
    },
  },

  /* ───────────────────────── Oman ───────────────────────── */
  'end-of-service-gratuity-oman': {
    en: {
      slug: 'end-of-service-gratuity-oman',
      locale: 'en',
      title: 'Oman End-of-Service Gratuity: How It’s Calculated (2026)',
      metaDescription:
        'Oman post-service gratuity under Labour Law (RD 53/2023) Art. 61: one month’s basic wage (30 days) per year of service, no cap, no resignation reduction — for workers not covered by the Social Protection Law. Worked example + calculator.',
      intro:
        'Oman’s post-service gratuity was reset by the 2023 Labour Law (Royal Decree 53/2023). It is now a flat one month’s basic wage per year, with no cap and no resignation reduction — but it applies to workers **not** covered by the Social Protection Law, and service split across the 2023 reform can mix old and new rates. This guide explains all three points, with a worked example matching the Klar calculator.',
      sections: [
        {
          heading: 'The rule: one month per year',
          body: `Under Article 61, the gratuity is **30 days of the last basic wage for each year** of service, pro-rated for partial years, with **no cap** and **no resignation reduction**. The daily wage is the monthly basic wage divided by 30.`,
        },
        {
          heading: 'Who gets it',
          body: `The Article 61 gratuity is for workers who do **not** benefit from the Social Protection Law — in practice, mainly **expatriate** workers. It remains payable to them until the Social Protection Fund’s savings system for non-Omanis takes over (deferred to 2027). Omani nationals covered by social protection receive their end-of-service through that system instead.`,
        },
        {
          heading: 'Service before the 2023 reform',
          body: `The current flat rate replaced an older scale (15 days for the first three years, then a full month). Per the Ministry of Labour’s October 2024 clarification, service **before 31 July 2023** is computed under the old scale and service **from** that date under the new flat rate. The calculator uses the current flat rate; for long service spanning the reform, confirm the split with your employer.`,
        },
        {
          heading: 'Worked example',
          body: `An employee on a **700 OMR** monthly basic wage leaves after **6 years** (all under the current law).

Daily wage = 700 ÷ 30 = 23.33 OMR. Days accrued = 30 × 6 = **180 days**. Gratuity = 180 × 23.33 ≈ **4,200 OMR** (no cap, no resignation reduction).`,
        },
      ],
      keyTakeaways: [
        'One month’s basic wage (30 days) per year of service.',
        'No cap and no resignation reduction.',
        'Applies to workers not covered by the Social Protection Law (mainly expatriates, until 2027).',
        'Service before 31 July 2023 may use the old 15/30-day scale.',
      ],
      faqs: [
        { q: 'How is Oman end-of-service gratuity calculated?', a: 'Under the 2023 Labour Law, 30 days of the last basic wage for each year of service, pro-rated, with no cap and no resignation reduction.' },
        { q: 'Does resignation reduce end-of-service gratuity in Oman?', a: 'No. The Article 61 gratuity has no resignation reduction and no minimum-service period.' },
        { q: 'Who is entitled to the Oman Labour Law gratuity?', a: 'Workers not covered by the Social Protection Law — mainly expatriates — until the Social Protection Fund’s savings system for non-Omanis takes over (deferred to 2027).' },
      ],
      relatedCalculators: EOS_RELATED,
      lastReviewed: REVIEWED,
    },
    ar: {
      slug: 'end-of-service-gratuity-oman',
      locale: 'ar',
      title: 'مكافأة نهاية الخدمة في عُمان: كيف تُحسب (2026)',
      metaDescription:
        'مكافأة نهاية الخدمة في عُمان وفق قانون العمل (مرسوم 53/2023) المادة 61: شهر كامل (30 يوماً) من الأجر الأساسي عن كل سنة خدمة، دون سقف ودون تخفيض للاستقالة — للعاملين غير المشمولين بقانون الحماية الاجتماعية. مثال عملي وحاسبة.',
      intro:
        'أُعيد ضبط مكافأة نهاية الخدمة في عُمان بقانون العمل لسنة 2023 (مرسوم سلطاني 53/2023). فصارت شهراً كاملاً من الأجر الأساسي عن كل سنة، دون سقف ودون تخفيض للاستقالة — لكنها تخصّ العاملين **غير المشمولين** بقانون الحماية الاجتماعية، وقد تمزج الخدمةُ الممتدّة عبر إصلاح 2023 بين المعدّلين القديم والجديد. يشرح هذا الدليل النقاط الثلاث بمثال مطابق لحاسبة كلار.',
      sections: [
        {
          heading: 'القاعدة: شهر عن كل سنة',
          body: `بموجب المادة 61، المكافأة **30 يوماً من الأجر الأساسي الأخير عن كل سنة** خدمة، مع تقسيم تناسبي للكسور، **دون سقف** و**دون تخفيض للاستقالة**. والأجر اليومي = الأجر الأساسي الشهري ÷ 30.`,
        },
        {
          heading: 'لمن تُصرف',
          body: `مكافأة المادة 61 للعاملين **غير** المشمولين بقانون الحماية الاجتماعية — وعملياً هم أساساً العمال **الوافدون**. وتبقى مستحقّة لهم حتى يحلّ محلّها نظام الادخار لغير العُمانيين في صندوق الحماية الاجتماعية (المؤجّل إلى 2027). أما العُمانيون المشمولون بالحماية الاجتماعية فيحصلون على نهاية خدمتهم عبر ذلك النظام.`,
        },
        {
          heading: 'الخدمة قبل إصلاح 2023',
          body: `حلّ المعدل الثابت الحالي محلّ شريحة أقدم (15 يوماً لأول ثلاث سنوات ثم شهر كامل). ووفق توضيح وزارة العمل في أكتوبر 2024، تُحسب الخدمة **قبل 31 يوليو 2023** بالشريحة القديمة، والخدمة **من** ذلك التاريخ بالمعدل الثابت الجديد. تستخدم الحاسبة المعدل الثابت الحالي؛ وللخدمة الطويلة الممتدّة عبر الإصلاح، تحقّق من التقسيم لدى صاحب العمل.`,
        },
        {
          heading: 'مثال عملي',
          body: `موظف بأجر أساسي **700 ريال عُماني** شهرياً ترك العمل بعد **6 سنوات** (كلها تحت القانون الحالي).

الأجر اليومي = 700 ÷ 30 = 23.33 ريال. أيام الاستحقاق = 30 × 6 = **180 يوماً**. المكافأة = 180 × 23.33 ≈ **4,200 ريال عُماني** (لا سقف ولا تخفيض للاستقالة).`,
        },
      ],
      keyTakeaways: [
        'شهر كامل (30 يوماً) من الأجر الأساسي عن كل سنة خدمة.',
        'لا سقف ولا تخفيض للاستقالة.',
        'تخصّ غير المشمولين بقانون الحماية الاجتماعية (أساساً الوافدين، حتى 2027).',
        'الخدمة قبل 31 يوليو 2023 قد تُحسب بالشريحة القديمة 15/30 يوماً.',
      ],
      faqs: [
        { q: 'كيف تُحسب مكافأة نهاية الخدمة في عُمان؟', a: 'وفق قانون العمل 2023: 30 يوماً من الأجر الأساسي الأخير عن كل سنة خدمة، مع تقسيم تناسبي، دون سقف ودون تخفيض للاستقالة.' },
        { q: 'هل تُخفّض الاستقالة المكافأة في عُمان؟', a: 'لا. مكافأة المادة 61 دون تخفيض للاستقالة ودون حد أدنى للخدمة.' },
        { q: 'من يستحق مكافأة قانون العمل في عُمان؟', a: 'العاملون غير المشمولين بقانون الحماية الاجتماعية — أساساً الوافدون — حتى يحلّ محلّها نظام الادخار لغير العُمانيين في صندوق الحماية الاجتماعية (المؤجّل إلى 2027).' },
      ],
      relatedCalculators: EOS_RELATED,
      lastReviewed: REVIEWED,
    },
  },
  /* ─────────────────── Jordan income tax ─────────────────── */
  'income-tax-jordan': {
    en: {
      slug: 'income-tax-jordan',
      locale: 'en',
      title: 'Jordan Income Tax 2026: Brackets, Exemptions & Calculator',
      metaDescription:
        'How Jordan personal income tax works: a 9,000 JOD personal exemption, then progressive brackets from 5% to 30%. Worked example (24,000 JOD → 1,500 JOD) plus the family exemption most calculators miss.',
      intro:
        'Jordan taxes personal income progressively under Income Tax Law No. 34 of 2014 (as amended by No. 38 of 2018, effective 2019). You subtract an exemption from your annual income, then apply the brackets to what remains. This guide shows the brackets, a worked example that matches the Klar calculator, and the family exemption that makes most online figures too high for married taxpayers.',
      sections: [
        {
          heading: 'Step 1: the personal exemption',
          body: `Every resident individual gets a **9,000 JOD** personal exemption. You subtract it from your annual income to get **taxable income**, and the brackets apply only to that remainder. So on 24,000 JOD of income, taxable income is 24,000 − 9,000 = 15,000 JOD.`,
        },
        {
          heading: 'Step 2: the brackets (5% to 30%)',
          body: `The rates are **marginal** — each slice of taxable income is taxed at its own rate:

- First **5,000**: 5%
- Next **5,000** (5,000–10,000): 10%
- Next **5,000** (10,000–15,000): 15%
- Next **5,000** (15,000–20,000): 20%
- Above **20,000**: 25%
- Above **1,000,000**: 30%

A separate **1% national contribution** applies to taxable income above 200,000 JOD (not included in the calculator).`,
        },
        {
          heading: 'Worked example',
          body: `Annual income **24,000 JOD**, individual exemption 9,000 → taxable **15,000 JOD**.

- 5,000 × 5% = 250
- 5,000 × 10% = 500
- 5,000 × 15% = 750

Total tax = **1,500 JOD** (an effective rate of 6.25%). This matches the Klar income-tax calculator exactly.`,
        },
        {
          heading: 'The family exemption most calculators miss',
          body: `The calculator applies the **9,000 individual** exemption. Jordanian law also grants a **9,000 family exemption** (18,000 JOD total for a household), plus limited deductions for medical, education and rent up to a capped amount. So a married taxpayer’s actual tax is usually **lower** than the individual figure — treat the calculator’s result as the single-person case and subtract the family exemption where it applies.`,
        },
        {
          heading: 'Income tax is not your only deduction',
          body: `Income tax is separate from **social security** (the SSC employee contribution) and from monthly take-home pay. To see net salary after both social security and tax, use the gross-to-net calculator rather than the income-tax figure alone.`,
        },
      ],
      keyTakeaways: [
        'Subtract the 9,000 JOD personal exemption first; brackets apply to the remainder.',
        'Marginal rates: 5% / 10% / 15% / 20% / 25%, and 30% above 1,000,000.',
        '24,000 JOD income → 15,000 taxable → 1,500 JOD tax (6.25% effective).',
        'A married taxpayer also gets a 9,000 family exemption, so actual tax is often lower.',
      ],
      faqs: [
        { q: 'How much is income tax in Jordan?', a: 'After a 9,000 JOD personal exemption, taxable income is taxed progressively: 5% on the first 5,000, then 10%, 15%, 20% and 25% on higher slices (30% above 1,000,000). For example, 24,000 JOD of income yields 1,500 JOD of tax.' },
        { q: 'What is the personal exemption in Jordan?', a: 'Each resident individual gets a 9,000 JOD exemption. A married taxpayer gets an additional 9,000 JOD family exemption (18,000 total), plus limited medical, education and rent deductions.' },
        { q: 'Does the calculator include the family exemption?', a: 'No — it applies the 9,000 individual exemption only. A married taxpayer should subtract the additional 9,000 family exemption, which lowers the tax.' },
        { q: 'Is social security included in Jordan income tax?', a: 'No. Income tax and the social security (SSC) contribution are separate deductions. Use the gross-to-net calculator to see take-home pay after both.' },
      ],
      relatedCalculators: ['income-tax', 'gross-to-net', 'social-insurance'],
      lastReviewed: REVIEWED,
    },
    ar: {
      slug: 'income-tax-jordan',
      locale: 'ar',
      title: 'ضريبة الدخل في الأردن 2026: الشرائح والإعفاءات وحاسبة',
      metaDescription:
        'كيف تُحسب ضريبة الدخل الشخصي في الأردن: إعفاء شخصي 9,000 دينار ثم شرائح تصاعدية من 5% إلى 30%. مثال عملي (24,000 دينار ← 1,500 دينار) مع الإعفاء العائلي الذي تُغفله أغلب الحاسبات.',
      intro:
        'تفرض الأردن ضريبة دخل تصاعدية بموجب قانون ضريبة الدخل رقم 34 لسنة 2014 (المعدّل بالقانون رقم 38 لسنة 2018، نافذ من 2019). تطرح إعفاءً من دخلك السنوي ثم تطبّق الشرائح على الباقي. يوضّح هذا الدليل الشرائح بمثال مطابق لحاسبة كلار، مع الإعفاء العائلي الذي يجعل أغلب الأرقام على الإنترنت مبالغاً فيها للمتزوجين.',
      sections: [
        {
          heading: 'الخطوة 1: الإعفاء الشخصي',
          body: `يحصل كل مقيم فرد على إعفاء شخصي قدره **9,000 دينار**. تطرحه من دخلك السنوي للحصول على **الدخل الخاضع للضريبة**، وتُطبّق الشرائح على هذا الباقي فقط. فعلى دخل 24,000 دينار، يكون الخاضع للضريبة 24,000 − 9,000 = 15,000 دينار.`,
        },
        {
          heading: 'الخطوة 2: الشرائح (5% إلى 30%)',
          body: `المعدلات **تصاعدية حدّية** — كل شريحة من الدخل الخاضع تُضرَّب بمعدلها:

- أول **5,000**: 5%
- التالية **5,000** (5,000–10,000): 10%
- التالية **5,000** (10,000–15,000): 15%
- التالية **5,000** (15,000–20,000): 20%
- فوق **20,000**: 25%
- فوق **1,000,000**: 30%

وتُطبّق **مساهمة وطنية 1%** منفصلة على الدخل الخاضع فوق 200,000 دينار (غير مضمّنة في الحاسبة).`,
        },
        {
          heading: 'مثال عملي',
          body: `دخل سنوي **24,000 دينار**، الإعفاء الفردي 9,000 ← الخاضع **15,000 دينار**.

- 5,000 × 5% = 250
- 5,000 × 10% = 500
- 5,000 × 15% = 750

إجمالي الضريبة = **1,500 دينار** (معدل فعلي 6.25%). وهو مطابق تماماً لحاسبة ضريبة الدخل في كلار.`,
        },
        {
          heading: 'الإعفاء العائلي الذي تُغفله أغلب الحاسبات',
          body: `تطبّق الحاسبة الإعفاء **الفردي 9,000**. ويمنح القانون الأردني أيضاً **إعفاءً عائلياً قدره 9,000** (أي 18,000 دينار للأسرة)، إضافةً إلى خصومات محدودة للعلاج والتعليم والإيجار ضمن سقف. لذا فإن ضريبة المتزوّج الفعلية عادةً **أقل** من الرقم الفردي — اعتبر نتيجة الحاسبة حالة الأعزب واطرح الإعفاء العائلي حيث ينطبق.`,
        },
        {
          heading: 'ضريبة الدخل ليست خصمك الوحيد',
          body: `ضريبة الدخل منفصلة عن **الضمان الاجتماعي** (اشتراك الموظف) وعن صافي الراتب الشهري. ولرؤية صافي الراتب بعد الضمان والضريبة معاً، استخدم حاسبة صافي الراتب بدلاً من رقم ضريبة الدخل وحده.`,
        },
      ],
      keyTakeaways: [
        'اطرح الإعفاء الشخصي 9,000 دينار أولاً؛ والشرائح تُطبّق على الباقي.',
        'معدلات حدّية: 5% / 10% / 15% / 20% / 25%، و30% فوق 1,000,000.',
        'دخل 24,000 دينار ← خاضع 15,000 ← ضريبة 1,500 دينار (6.25% فعلي).',
        'المتزوّج يحصل أيضاً على إعفاء عائلي 9,000، فضريبته الفعلية أقل غالباً.',
      ],
      faqs: [
        { q: 'كم ضريبة الدخل في الأردن؟', a: 'بعد إعفاء شخصي قدره 9,000 دينار، يُضرَّب الدخل الخاضع تصاعدياً: 5% على أول 5,000 ثم 10% و15% و20% و25% على الشرائح الأعلى (و30% فوق 1,000,000). فمثلاً دخل 24,000 دينار ينتج عنه 1,500 دينار ضريبة.' },
        { q: 'ما هو الإعفاء الشخصي في الأردن؟', a: 'يحصل كل مقيم فرد على إعفاء 9,000 دينار. ويحصل المتزوّج على إعفاء عائلي إضافي قدره 9,000 دينار (18,000 إجمالاً)، إضافةً إلى خصومات محدودة للعلاج والتعليم والإيجار.' },
        { q: 'هل تتضمّن الحاسبة الإعفاء العائلي؟', a: 'لا — تطبّق الإعفاء الفردي 9,000 فقط. وعلى المتزوّج أن يطرح الإعفاء العائلي الإضافي 9,000، وهو ما يخفّض الضريبة.' },
        { q: 'هل الضمان الاجتماعي مشمول في ضريبة دخل الأردن؟', a: 'لا. ضريبة الدخل واشتراك الضمان الاجتماعي خصمان منفصلان. استخدم حاسبة صافي الراتب لرؤية الراتب بعدهما معاً.' },
      ],
      relatedCalculators: ['income-tax', 'gross-to-net', 'social-insurance'],
      lastReviewed: REVIEWED,
    },
  },
};

export default labourGuides;
