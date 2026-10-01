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
};

export default labourGuides;
