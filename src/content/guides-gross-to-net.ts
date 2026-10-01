import type { GuideContent } from './types';
import type { Locale } from '../config/site';

/**
 * Per-country gross-to-net (net salary) guides. Deductions mirror the
 * country-rules engine. The high-value message in the GCC: there is no
 * personal income tax, so net = gross minus social insurance only (and for
 * expats, who are not in social insurance, net = gross). Jordan deducts both
 * social security and income tax. Last reviewed 2026-10-01.
 */
const R = '2026-10-01';
const REL = ['gross-to-net', 'social-insurance', 'income-tax'];

const grossToNetGuides: Record<string, Record<Locale, GuideContent>> = {
  'gross-to-net-jordan': {
    en: {
      slug: 'gross-to-net-jordan', locale: 'en',
      title: 'Jordan Net Salary: Gross-to-Net Explained (2026)',
      metaDescription: 'How to work out net salary in Jordan: subtract social security (7.5%) and income tax from gross pay. Worked example + the gross-to-net calculator.',
      intro: 'Jordan is the only country in this group with both a social security deduction and personal income tax. Your net (take-home) salary is your gross pay minus the SSC employee contribution and minus income tax. This guide shows the two steps, with a worked example; the calculator combines them for the exact figure.',
      sections: [
        { heading: 'Two deductions', body: `Net salary in Jordan = gross − **social security (7.5%)** − **income tax**.

- **Social security:** 7.5% of salary (up to the 3,733 JOD ceiling).
- **Income tax:** applied after a 9,000 JOD annual personal exemption, then progressive brackets from 5%.` },
        { heading: 'Worked example', body: `On a **1,000 JOD** monthly salary:

Social security = 1,000 × 7.5% = **75 JOD**. Income tax is then calculated on the annual figure after the 9,000 JOD exemption — small at this salary. Net take-home is roughly **910–915 JOD**; enter your salary in the gross-to-net calculator for the exact amount.` },
        { heading: 'What is not deducted', body: 'Employer contributions (14.25% social security) are paid on top by the employer, not taken from your pay. The national contribution (1% over 200,000 JOD taxable) affects only very high earners.' },
      ],
      keyTakeaways: ['Net = gross − social security (7.5%) − income tax.', 'Income tax applies after a 9,000 JOD exemption.', 'Employer’s 14.25% is on top, not deducted from you.', 'Use the calculator to combine both deductions exactly.'],
      faqs: [
        { q: 'How do I calculate net salary in Jordan?', a: 'Subtract the 7.5% social security contribution and income tax (after the 9,000 JOD exemption) from your gross salary. The gross-to-net calculator does both.' },
        { q: 'Is salary taxed in Jordan?', a: 'Yes. Unlike the Gulf, Jordan has personal income tax in addition to social security; both reduce take-home pay.' },
        { q: 'What is deducted from salary in Jordan?', a: 'The 7.5% employee social security contribution and income tax. The employer separately pays 14.25% social security on top.' },
      ],
      relatedCalculators: REL, lastReviewed: R,
    },
    ar: {
      slug: 'gross-to-net-jordan', locale: 'ar',
      title: 'صافي الراتب في الأردن: من الإجمالي إلى الصافي (2026)',
      metaDescription: 'كيف تحسب صافي الراتب في الأردن: اطرح الضمان الاجتماعي (7.5%) وضريبة الدخل من الراتب الإجمالي. مثال عملي وحاسبة صافي الراتب.',
      intro: 'الأردن هو البلد الوحيد في هذه المجموعة الذي يجمع بين خصم الضمان الاجتماعي وضريبة الدخل. فصافي راتبك هو الإجمالي ناقص اشتراك الضمان للموظف وناقص ضريبة الدخل. يوضّح هذا الدليل الخطوتين بمثال؛ والحاسبة تجمعهما للرقم الدقيق.',
      sections: [
        { heading: 'خصمان', body: `صافي الراتب في الأردن = الإجمالي − **الضمان الاجتماعي (7.5%)** − **ضريبة الدخل**.

- **الضمان الاجتماعي:** 7.5% من الراتب (حتى سقف 3,733 ديناراً).
- **ضريبة الدخل:** تُطبّق بعد إعفاء سنوي 9,000 دينار، ثم شرائح تصاعدية من 5%.` },
        { heading: 'مثال عملي', body: `على راتب شهري **1,000 دينار**:

الضمان = 1,000 × 7.5% = **75 ديناراً**. ثم تُحسب ضريبة الدخل على المبلغ السنوي بعد إعفاء 9,000 دينار — وهي صغيرة عند هذا الراتب. والصافي نحو **910–915 ديناراً**؛ أدخل راتبك في حاسبة صافي الراتب للرقم الدقيق.` },
        { heading: 'ما لا يُخصم', body: 'اشتراك صاحب العمل (14.25% ضمان) يُدفع إضافةً من صاحب العمل لا من راتبك. والمساهمة الوطنية (1% على ما يزيد عن 200,000 دينار خاضع) تخصّ أصحاب الدخول العالية جداً فقط.' },
      ],
      keyTakeaways: ['الصافي = الإجمالي − الضمان (7.5%) − ضريبة الدخل.', 'ضريبة الدخل تُطبّق بعد إعفاء 9,000 دينار.', 'حصة صاحب العمل 14.25% إضافةً لا تُخصم منك.', 'استخدم الحاسبة لجمع الخصمين بدقة.'],
      faqs: [
        { q: 'كيف أحسب صافي الراتب في الأردن؟', a: 'اطرح اشتراك الضمان 7.5% وضريبة الدخل (بعد إعفاء 9,000 دينار) من راتبك الإجمالي. وحاسبة صافي الراتب تقوم بالأمرين.' },
        { q: 'هل يُفرض ضريبة على الراتب في الأردن؟', a: 'نعم. خلافاً للخليج، للأردن ضريبة دخل شخصية إضافةً إلى الضمان؛ وكلاهما يقلّل الصافي.' },
        { q: 'ماذا يُخصم من الراتب في الأردن؟', a: 'اشتراك الضمان للموظف 7.5% وضريبة الدخل. ويدفع صاحب العمل 14.25% ضماناً إضافةً.' },
      ],
      relatedCalculators: REL, lastReviewed: R,
    },
  },
};

// GCC countries: no income tax. For nationals, only social insurance is deducted;
// for expats (not in social insurance), net = gross.
type GccRow = { slug: string; country: string; countryAr: string; scheme: string; schemeAr: string; natRate: string; natRateAr: string; example: string; exampleAr: string };
const gcc: GccRow[] = [
  { slug: 'gross-to-net-saudi-arabia', country: 'Saudi Arabia', countryAr: 'السعودية', scheme: 'GOSI', schemeAr: 'التأمينات (GOSI)', natRate: '9.75%', natRateAr: '9.75%',
    example: 'A Saudi national on 10,000 SAR has GOSI of 975 SAR deducted, so net ≈ 9,025 SAR. A non-Saudi has nothing deducted — net = gross.',
    exampleAr: 'المواطن السعودي براتب 10,000 ريال يُخصم منه 975 ريالاً تأمينات، فالصافي ≈ 9,025 ريال. وغير السعودي لا يُخصم منه شيء — الصافي = الإجمالي.' },
  { slug: 'gross-to-net-uae', country: 'the UAE', countryAr: 'الإمارات', scheme: 'the pension scheme', schemeAr: 'نظام المعاشات', natRate: '11%', natRateAr: '11%',
    example: 'A UAE national on 20,000 AED has pension of 2,200 AED deducted, so net ≈ 17,800 AED. An expat has nothing deducted — net = gross.',
    exampleAr: 'المواطن الإماراتي براتب 20,000 درهم يُخصم منه 2,200 درهم معاشاً، فالصافي ≈ 17,800 درهم. والوافد لا يُخصم منه شيء — الصافي = الإجمالي.' },
  { slug: 'gross-to-net-qatar', country: 'Qatar', countryAr: 'قطر', scheme: 'social insurance', schemeAr: 'التأمينات الاجتماعية', natRate: '7%', natRateAr: '7%',
    example: 'A Qatari national on 10,000 QAR has 700 QAR deducted, so net ≈ 9,300 QAR. An expat has nothing deducted — net = gross.',
    exampleAr: 'المواطن القطري براتب 10,000 ريال يُخصم منه 700 ريال، فالصافي ≈ 9,300 ريال. والوافد لا يُخصم منه شيء — الصافي = الإجمالي.' },
  { slug: 'gross-to-net-kuwait', country: 'Kuwait', countryAr: 'الكويت', scheme: 'PIFSS', schemeAr: 'التأمينات (PIFSS)', natRate: 'about 10.5% on the first KWD 1,500', natRateAr: 'نحو 10.5% على أول 1,500 دينار',
    example: 'A Kuwaiti national on 1,000 KWD has about 105 KWD deducted, so net ≈ 895 KWD. An expat has nothing deducted — net = gross.',
    exampleAr: 'المواطن الكويتي براتب 1,000 دينار يُخصم منه نحو 105 دنانير، فالصافي ≈ 895 ديناراً. والوافد لا يُخصم منه شيء — الصافي = الإجمالي.' },
  { slug: 'gross-to-net-bahrain', country: 'Bahrain', countryAr: 'البحرين', scheme: 'SIO social insurance', schemeAr: 'تأمينات الهيئة (SIO)', natRate: '8%', natRateAr: '8%',
    example: 'A Bahraini national on 1,000 BHD has 80 BHD deducted, so net ≈ 920 BHD. A non-Bahraini has only a 1% work-injury contribution — net ≈ gross.',
    exampleAr: 'المواطن البحريني براتب 1,000 دينار يُخصم منه 80 ديناراً، فالصافي ≈ 920 ديناراً. وغير البحريني عليه 1% إصابات عمل فقط — الصافي ≈ الإجمالي.' },
  { slug: 'gross-to-net-oman', country: 'Oman', countryAr: 'عُمان', scheme: 'social protection', schemeAr: 'الحماية الاجتماعية', natRate: '8%', natRateAr: '8%',
    example: 'An Omani national on 1,000 OMR has 80 OMR deducted, so net ≈ 920 OMR. An expat currently has nothing deducted — net = gross.',
    exampleAr: 'المواطن العُماني براتب 1,000 ريال يُخصم منه 80 ريالاً، فالصافي ≈ 920 ريالاً. والوافد لا يُخصم منه شيء حالياً — الصافي = الإجمالي.' },
];

for (const g of gcc) {
  grossToNetGuides[g.slug] = {
    en: {
      slug: g.slug, locale: 'en',
      title: `${g.country === 'the UAE' ? 'UAE' : g.country} Net Salary: Is Your Pay Taxed? (2026)`,
      metaDescription: `Net salary in ${g.country}: there is no personal income tax, so your take-home equals your gross pay minus social insurance (${g.natRate}) if you are a national. Expats: net = gross. Calculator.`,
      intro: `The best news about salaries in ${g.country} is what is NOT deducted: there is **no personal income tax**. Your net (take-home) pay equals your gross pay, minus a social-insurance contribution only if you are a national. Expatriates, who are not in the scheme, keep their full gross salary. This guide explains it, with a worked example.`,
      sections: [
        { heading: 'No income tax', body: `${g.country === 'the UAE' ? 'The UAE' : g.country} does not levy personal income tax on salaries. So unlike Jordan or most of the world, income tax is never subtracted from your pay.` },
        { heading: 'Social insurance — nationals only', body: `The only payroll deduction is **${g.scheme}**, and it applies to **nationals only** (${g.natRate} for the employee). **Expatriates are not enrolled**, so nothing is deducted and net = gross; expats receive the end-of-service gratuity instead of a pension.` },
        { heading: 'Worked example', body: g.example },
      ],
      keyTakeaways: [`No personal income tax in ${g.country === 'the UAE' ? 'the UAE' : g.country}.`, `Nationals: social insurance (${g.natRate}) is the only deduction.`, 'Expatriates: nothing deducted — net salary equals gross.', 'Expats get the end-of-service gratuity instead of a pension.'],
      faqs: [
        { q: `Is salary taxed in ${g.country === 'the UAE' ? 'the UAE' : g.country}?`, a: `No. ${g.country === 'the UAE' ? 'The UAE' : g.country} has no personal income tax on salaries. The only payroll deduction is social insurance, and only for nationals.` },
        { q: `How do I calculate net salary in ${g.country === 'the UAE' ? 'the UAE' : g.country}?`, a: `For an expatriate, net = gross (nothing is deducted). For a national, subtract the ${g.natRate} social-insurance contribution from gross pay.` },
        { q: `Do expats pay anything from their salary in ${g.country === 'the UAE' ? 'the UAE' : g.country}?`, a: 'Generally no payroll deductions — expatriates are not in the social-insurance scheme and there is no income tax, so take-home equals gross.' },
      ],
      relatedCalculators: REL, lastReviewed: R,
    },
    ar: {
      slug: g.slug, locale: 'ar',
      title: `صافي الراتب في ${g.countryAr}: هل يُفرض ضريبة على راتبك؟ (2026)`,
      metaDescription: `صافي الراتب في ${g.countryAr}: لا توجد ضريبة دخل شخصية، فالصافي = الإجمالي ناقص التأمينات (${g.natRateAr}) إن كنت مواطناً. الوافدون: الصافي = الإجمالي. حاسبة.`,
      intro: `أفضل ما في رواتب ${g.countryAr} هو ما لا يُخصم منها: **لا توجد ضريبة دخل شخصية**. فصافي راتبك يساوي الإجمالي، ناقص اشتراك تأمينات فقط إن كنت مواطناً. أما الوافدون، غير المشمولين بالنظام، فيحتفظون بكامل راتبهم الإجمالي. يشرح هذا الدليل ذلك بمثال عملي.`,
      sections: [
        { heading: 'لا ضريبة دخل', body: `${g.countryAr} لا تفرض ضريبة دخل شخصية على الرواتب. فخلافاً للأردن أو أغلب دول العالم، لا تُخصم ضريبة دخل من راتبك أبداً.` },
        { heading: 'التأمينات — للمواطنين فقط', body: `الخصم الوحيد من الراتب هو **${g.schemeAr}**، ويطبّق على **المواطنين فقط** (${g.natRateAr} على الموظف). أما **الوافدون فغير مشمولين**، فلا يُخصم منهم شيء والصافي = الإجمالي؛ ويحصلون على مكافأة نهاية الخدمة بدل المعاش.` },
        { heading: 'مثال عملي', body: g.exampleAr },
      ],
      keyTakeaways: [`لا ضريبة دخل شخصية في ${g.countryAr}.`, `المواطنون: التأمينات (${g.natRateAr}) هي الخصم الوحيد.`, 'الوافدون: لا خصم — الصافي يساوي الإجمالي.', 'الوافدون يحصلون على مكافأة نهاية الخدمة بدل المعاش.'],
      faqs: [
        { q: `هل يُفرض ضريبة على الراتب في ${g.countryAr}؟`, a: `لا. ${g.countryAr} لا تفرض ضريبة دخل شخصية على الرواتب. والخصم الوحيد هو التأمينات، وللمواطنين فقط.` },
        { q: `كيف أحسب صافي الراتب في ${g.countryAr}؟`, a: `للوافد، الصافي = الإجمالي (لا يُخصم شيء). وللمواطن، اطرح اشتراك التأمينات (${g.natRateAr}) من الراتب الإجمالي.` },
        { q: `هل يدفع الوافدون شيئاً من رواتبهم في ${g.countryAr}؟`, a: 'لا خصومات من الراتب عادةً — الوافدون غير مشمولين بالتأمينات ولا توجد ضريبة دخل، فالصافي يساوي الإجمالي.' },
      ],
      relatedCalculators: REL, lastReviewed: R,
    },
  };
}

export default grossToNetGuides;
