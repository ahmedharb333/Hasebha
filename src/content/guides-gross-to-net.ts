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

grossToNetGuides['gross-to-net-saudi-arabia'] = {
  en: {
    slug: 'gross-to-net-saudi-arabia', locale: 'en',
    title: 'Saudi Arabia Net Salary: GOSI and Your Take-Home Pay (2026)',
    metaDescription: 'How net salary works in Saudi Arabia: no personal income tax, but Saudi nationals have 9.75% GOSI deducted while non-Saudi employees keep their full gross pay. Worked example + calculator.',
    intro: 'Saudi Arabia has no personal income tax, so the only thing that can reduce your pay is GOSI (the General Organization for Social Insurance) — and that only applies if you hold Saudi nationality. This guide explains who pays GOSI, how much, and what a non-Saudi employee actually takes home.',
    sections: [
      { heading: 'No personal income tax in Saudi Arabia', body: 'Saudi Arabia does not tax employment income. Whatever your gross salary, no portion of it is withheld as income tax — a major difference from Jordan and most countries outside the Gulf.' },
      { heading: 'GOSI applies to Saudi nationals only', body: 'The employee share of GOSI is **9.75%** of pensionable salary, and it is deducted only from **Saudi nationals**. Non-Saudi employees are outside the GOSI pension/annuities branch, so nothing is withheld from their pay for social insurance either.' },
      { heading: 'Worked example: GOSI on a 10,000 SAR salary', body: 'A Saudi national earning **10,000 SAR** a month has GOSI of 10,000 × 9.75% = **975 SAR** deducted, leaving net pay of about **9,025 SAR**. A non-Saudi employee on the same 10,000 SAR gross salary has nothing deducted, so net = gross = 10,000 SAR.' },
      { heading: 'Why non-Saudi employees take home their full gross pay', body: 'Non-Saudi employees are not enrolled in GOSI’s pension branch, and there is no income tax to make up the difference, so their net salary equals their gross salary in full. Instead of a pension, expatriate employees in Saudi Arabia are entitled to an end-of-service gratuity when their employment ends.' },
    ],
    keyTakeaways: ['No personal income tax in Saudi Arabia.', 'Saudi nationals: GOSI (9.75%) is the only deduction.', 'Non-Saudi employees: net salary equals gross salary.', 'Non-Saudis receive an end-of-service gratuity instead of a GOSI pension.'],
    faqs: [
      { q: 'Do Saudi nationals pay income tax on salary?', a: 'No — Saudi Arabia has no personal income tax. A Saudi national’s only payroll deduction is the 9.75% GOSI contribution.' },
      { q: 'Why is my net salary equal to my gross salary in Saudi Arabia?', a: 'If you are not a Saudi national, you are not enrolled in GOSI and there is no income tax, so nothing is withheld from your pay — net simply equals gross.' },
      { q: 'How much GOSI is deducted from a Saudi employee’s salary?', a: 'Employee GOSI is 9.75% of pensionable salary. On a 10,000 SAR salary that is 975 SAR, leaving about 9,025 SAR net.' },
    ],
    relatedCalculators: REL, lastReviewed: R,
  },
  ar: {
    slug: 'gross-to-net-saudi-arabia', locale: 'ar',
    title: 'صافي الراتب في السعودية: التأمينات (GOSI) وصافي راتبك (2026)',
    metaDescription: 'كيف يُحسب صافي الراتب في السعودية: لا توجد ضريبة دخل شخصية، لكن يُخصم من المواطن السعودي 9.75% تأمينات (GOSI)، بينما يحتفظ غير السعودي بكامل راتبه الإجمالي. مثال عملي وحاسبة.',
    intro: 'لا توجد في السعودية ضريبة دخل شخصية، فالشيء الوحيد الذي يمكن أن يُخصم من راتبك هو التأمينات الاجتماعية (GOSI) — وهذا فقط إن كنت تحمل الجنسية السعودية. يوضّح هذا الدليل من يدفع التأمينات وبأي نسبة، وكم يصل فعلياً إلى حساب غير السعودي.',
    sections: [
      { heading: 'لا ضريبة دخل شخصية في السعودية', body: 'السعودية لا تفرض ضريبة على دخل العمل. فأياً كان راتبك الإجمالي، لا يُقتطع منه أي جزء كضريبة دخل — وهذا فرق جوهري عن الأردن وأغلب دول العالم خارج الخليج.' },
      { heading: 'التأمينات (GOSI) للمواطن السعودي فقط', body: 'حصة الموظف في التأمينات هي **9.75%** من الراتب الخاضع للاشتراك، وتُخصم فقط من **المواطن السعودي**. أما غير السعودي فهو خارج فرع المعاشات في GOSI، فلا يُخصم من راتبه شيء مقابل التأمينات أيضاً.' },
      { heading: 'مثال عملي: التأمينات على راتب 10,000 ريال', body: 'المواطن السعودي براتب **10,000 ريال** شهرياً يُخصم منه 10,000 × 9.75% = **975 ريالاً** تأمينات، فيبقى صافي راتبه نحو **9,025 ريال**. وغير السعودي على نفس الراتب الإجمالي 10,000 ريال لا يُخصم منه شيء، فالصافي = الإجمالي = 10,000 ريال.' },
      { heading: 'لماذا يحصل غير السعودي على راتبه الإجمالي كاملاً', body: 'غير السعودي غير مُسجّل في فرع المعاشات بـ GOSI، ولا توجد ضريبة دخل تعوّض الفرق، فيتساوى صافي راتبه مع إجماليه تماماً. وبدلاً من المعاش، يحصل الموظف الوافد في السعودية على مكافأة نهاية الخدمة عند انتهاء عمله.' },
    ],
    keyTakeaways: ['لا ضريبة دخل شخصية في السعودية.', 'المواطن السعودي: التأمينات (GOSI 9.75%) هي الخصم الوحيد.', 'غير السعودي: صافي الراتب يساوي إجماليه.', 'غير السعودي يحصل على مكافأة نهاية الخدمة بدل معاش GOSI.'],
    faqs: [
      { q: 'هل يدفع المواطن السعودي ضريبة على راتبه؟', a: 'لا — لا توجد ضريبة دخل شخصية في السعودية. والخصم الوحيد من راتب المواطن السعودي هو اشتراك التأمينات GOSI بنسبة 9.75%.' },
      { q: 'لماذا يتساوى صافي راتبي مع إجماليه في السعودية؟', a: 'إن لم تكن مواطناً سعودياً، فأنت غير مسجّل في GOSI ولا توجد ضريبة دخل، فلا يُخصم من راتبك شيء — ويتساوى الصافي مع الإجمالي.' },
      { q: 'كم يُخصم من راتب الموظف السعودي لصالح التأمينات؟', a: 'حصة الموظف في GOSI هي 9.75% من الراتب الخاضع للاشتراك. على راتب 10,000 ريال هذا يعني 975 ريالاً، فيبقى نحو 9,025 ريال صافياً.' },
    ],
    relatedCalculators: REL, lastReviewed: R,
  },
};

grossToNetGuides['gross-to-net-uae'] = {
  en: {
    slug: 'gross-to-net-uae', locale: 'en',
    title: 'UAE Net Salary: Pension Contributions and Take-Home Pay (2026)',
    metaDescription: 'Net salary in the UAE: there is no personal income tax, but Emirati nationals have an 11% pension contribution deducted. Expatriates keep their full gross pay. Worked example + calculator.',
    intro: 'The UAE levies no personal income tax on salaries, so for the vast majority of the workforce — expatriates — net pay equals gross pay in full. The one exception is Emirati nationals, who contribute to a government pension scheme. This guide explains the split and works through the numbers.',
    sections: [
      { heading: 'No income tax on salaries in the UAE', body: 'The UAE does not tax employment income. No matter your salary or nationality, income tax is never deducted from your pay.' },
      { heading: 'Pension contributions — for Emirati nationals only', body: 'UAE nationals contribute **11%** of their salary to the government pension and social-security scheme (administered by the General Pension and Social Security Authority). This is the only payroll deduction they face.' },
      { heading: 'Worked example: pension on a 20,000 AED salary', body: 'An Emirati national earning **20,000 AED** a month has pension of 20,000 × 11% = **2,200 AED** deducted, leaving net pay of about **17,800 AED**. An expatriate on the same 20,000 AED gross salary has nothing deducted, so net = gross = 20,000 AED.' },
      { heading: 'Expatriates: gratuity instead of a pension', body: 'Expatriate employees are not enrolled in the UAE pension scheme, so nothing is withheld from their salary for it, and with no income tax either, their net pay equals their gross pay. In place of a pension, expatriates build up an end-of-service gratuity based on their years of service.' },
    ],
    keyTakeaways: ['No personal income tax in the UAE.', 'Emirati nationals: pension contribution (11%) is the only deduction.', 'Expatriates: net salary equals gross salary.', 'Expatriates receive an end-of-service gratuity instead of a pension.'],
    faqs: [
      { q: 'Is salary taxed in the UAE?', a: 'No. The UAE has no personal income tax. The only payroll deduction is the 11% pension contribution, and it applies only to Emirati nationals.' },
      { q: 'Why does my UAE payslip show no deductions?', a: 'If you are an expatriate, you are not enrolled in the UAE pension scheme and there is no income tax, so nothing is withheld — your net pay is simply your gross pay.' },
      { q: 'How much pension is deducted from an Emirati national’s salary?', a: 'Emirati nationals contribute 11% of salary to the pension scheme. On a 20,000 AED salary that is 2,200 AED, leaving about 17,800 AED net.' },
    ],
    relatedCalculators: REL, lastReviewed: R,
  },
  ar: {
    slug: 'gross-to-net-uae', locale: 'ar',
    title: 'صافي الراتب في الإمارات: اشتراك المعاشات وصافي راتبك (2026)',
    metaDescription: 'صافي الراتب في الإمارات: لا توجد ضريبة دخل شخصية، لكن يُخصم من المواطن الإماراتي 11% اشتراك معاشات. ويحتفظ الوافد بكامل راتبه الإجمالي. مثال عملي وحاسبة.',
    intro: 'لا تفرض الإمارات ضريبة دخل شخصية على الرواتب، فبالنسبة لغالبية القوى العاملة — الوافدين — يتساوى الصافي مع الإجمالي كاملاً. والاستثناء الوحيد هو المواطن الإماراتي، الذي يساهم في نظام معاشات حكومي. يشرح هذا الدليل الفرق ويحسب الأرقام.',
    sections: [
      { heading: 'لا ضريبة دخل على الرواتب في الإمارات', body: 'الإمارات لا تفرض ضريبة على دخل العمل. فبغضّ النظر عن راتبك أو جنسيتك، لا تُخصم ضريبة دخل من راتبك أبداً.' },
      { heading: 'اشتراك المعاشات — للمواطن الإماراتي فقط', body: 'يساهم المواطن الإماراتي بنسبة **11%** من راتبه في نظام المعاشات والتأمينات الاجتماعية الحكومي (الذي تديره الهيئة العامة للمعاشات والتأمينات الاجتماعية). وهذا هو الخصم الوحيد الذي يواجهه.' },
      { heading: 'مثال عملي: المعاشات على راتب 20,000 درهم', body: 'المواطن الإماراتي براتب **20,000 درهم** شهرياً يُخصم منه 20,000 × 11% = **2,200 درهم** معاشاً، فيبقى صافي راتبه نحو **17,800 درهم**. والوافد على نفس الراتب الإجمالي 20,000 درهم لا يُخصم منه شيء، فالصافي = الإجمالي = 20,000 درهم.' },
      { heading: 'الوافدون: مكافأة نهاية الخدمة بدل المعاش', body: 'الوافد غير مسجّل في نظام المعاشات الإماراتي، فلا يُخصم من راتبه شيء مقابله، ومع عدم وجود ضريبة دخل أيضاً، يتساوى صافي راتبه مع إجماليه. وبدلاً من المعاش، يحصل الوافد على مكافأة نهاية خدمة تُحسب على أساس سنوات عمله.' },
    ],
    keyTakeaways: ['لا ضريبة دخل شخصية في الإمارات.', 'المواطن الإماراتي: اشتراك المعاشات (11%) هو الخصم الوحيد.', 'الوافد: صافي الراتب يساوي إجماليه.', 'الوافد يحصل على مكافأة نهاية الخدمة بدل المعاش.'],
    faqs: [
      { q: 'هل يُفرض ضريبة على الراتب في الإمارات؟', a: 'لا. لا توجد ضريبة دخل شخصية في الإمارات. والخصم الوحيد هو اشتراك المعاشات بنسبة 11%، وينطبق فقط على المواطن الإماراتي.' },
      { q: 'لماذا لا يظهر أي خصم في قسيمة راتبي في الإمارات؟', a: 'إن كنت وافداً، فأنت غير مسجّل في نظام المعاشات الإماراتي ولا توجد ضريبة دخل، فلا يُخصم من راتبك شيء — وصافي راتبك هو إجماليه ببساطة.' },
      { q: 'كم يُخصم من راتب المواطن الإماراتي لصالح المعاشات؟', a: 'يساهم المواطن الإماراتي بنسبة 11% من راتبه في نظام المعاشات. على راتب 20,000 درهم هذا يعني 2,200 درهم، فيبقى نحو 17,800 درهم صافياً.' },
    ],
    relatedCalculators: REL, lastReviewed: R,
  },
};

grossToNetGuides['gross-to-net-qatar'] = {
  en: {
    slug: 'gross-to-net-qatar', locale: 'en',
    title: 'Qatar Net Salary: Social Insurance and Take-Home Pay (2026)',
    metaDescription: 'Net salary in Qatar: there is no personal income tax, but Qatari nationals have a 7% social-insurance contribution deducted. Expatriates keep their full gross pay. Worked example + calculator.',
    intro: 'Qatar charges no personal income tax on employment income, so for most of the workforce net pay and gross pay are the same figure. Qatari nationals are the exception: they contribute to the social insurance scheme. This guide separates the two groups and works through a real example.',
    sections: [
      { heading: 'Qatar has no personal income tax', body: 'There is no tax on salaries in Qatar. Whatever you earn and whatever your nationality, income tax is never part of the deduction.' },
      { heading: 'Social insurance contributions for Qatari nationals', body: 'Qatari nationals contribute **7%** of salary to social insurance; this is the one payroll deduction they have. The scheme does not cover expatriate employees.' },
      { heading: 'Worked example on a 10,000 QAR salary', body: 'A Qatari national on **10,000 QAR** a month has social insurance of 10,000 × 7% = **700 QAR** deducted, for a net of about **9,300 QAR**. An expatriate on the same 10,000 QAR gross has nothing deducted — net = gross = 10,000 QAR.' },
      { heading: 'How expatriate pay differs', body: 'Because expatriates are outside the social-insurance scheme and there is no income tax to apply instead, their take-home pay is identical to their gross salary. Their long-service benefit comes through an end-of-service gratuity, not a pension contribution.' },
    ],
    keyTakeaways: ['No personal income tax in Qatar.', 'Qatari nationals: social insurance (7%) is the only deduction.', 'Expatriates: net salary equals gross salary.', 'Expatriates receive an end-of-service gratuity rather than a pension.'],
    faqs: [
      { q: 'Is salary taxed in Qatar?', a: 'No. Qatar has no personal income tax. The only payroll deduction is the 7% social-insurance contribution, and it applies only to Qatari nationals.' },
      { q: 'Why is my net pay the same as my gross pay in Qatar?', a: 'If you are an expatriate, you are not part of the social-insurance scheme and there is no income tax, so nothing is withheld — net equals gross.' },
      { q: 'How much social insurance is deducted from a Qatari national’s salary?', a: 'Qatari nationals contribute 7% of salary. On a 10,000 QAR salary that is 700 QAR, leaving about 9,300 QAR net.' },
    ],
    relatedCalculators: REL, lastReviewed: R,
  },
  ar: {
    slug: 'gross-to-net-qatar', locale: 'ar',
    title: 'صافي الراتب في قطر: التأمينات الاجتماعية وصافي راتبك (2026)',
    metaDescription: 'صافي الراتب في قطر: لا توجد ضريبة دخل شخصية، لكن يُخصم من المواطن القطري 7% تأمينات اجتماعية. ويحتفظ الوافد بكامل راتبه الإجمالي. مثال عملي وحاسبة.',
    intro: 'لا تفرض قطر ضريبة دخل شخصية على دخل العمل، فبالنسبة لأغلب القوى العاملة يتساوى الصافي مع الإجمالي. والاستثناء هو المواطن القطري، الذي يساهم في نظام التأمينات الاجتماعية. يفصل هذا الدليل بين الفئتين ويحسب مثالاً حقيقياً.',
    sections: [
      { heading: 'لا ضريبة دخل شخصية في قطر', body: 'لا توجد ضريبة على الرواتب في قطر. فأياً كان دخلك أو جنسيتك، لا تدخل ضريبة الدخل في الخصومات أبداً.' },
      { heading: 'التأمينات الاجتماعية للمواطن القطري', body: 'يساهم المواطن القطري بنسبة **7%** من راتبه في التأمينات الاجتماعية؛ وهو الخصم الوحيد الذي يواجهه. ولا يشمل النظام الموظفين الوافدين.' },
      { heading: 'مثال عملي على راتب 10,000 ريال', body: 'المواطن القطري براتب **10,000 ريال** شهرياً يُخصم منه 10,000 × 7% = **700 ريال** تأمينات، فيكون الصافي نحو **9,300 ريال**. والوافد على نفس الراتب الإجمالي 10,000 ريال لا يُخصم منه شيء — الصافي = الإجمالي = 10,000 ريال.' },
      { heading: 'كيف يختلف راتب الوافد', body: 'بما أن الوافد خارج نظام التأمينات الاجتماعية ولا توجد ضريبة دخل تُطبّق بدلاً منها، فإن صافي راتبه مماثل تماماً لإجماليه. وتأتي مزاياه عن سنوات الخدمة عبر مكافأة نهاية الخدمة، لا عبر اشتراك معاش.' },
    ],
    keyTakeaways: ['لا ضريبة دخل شخصية في قطر.', 'المواطن القطري: التأمينات الاجتماعية (7%) هي الخصم الوحيد.', 'الوافد: صافي الراتب يساوي إجماليه.', 'الوافد يحصل على مكافأة نهاية الخدمة بدل معاش.'],
    faqs: [
      { q: 'هل يُفرض ضريبة على الراتب في قطر؟', a: 'لا. لا توجد ضريبة دخل شخصية في قطر. والخصم الوحيد هو التأمينات الاجتماعية بنسبة 7%، وينطبق فقط على المواطن القطري.' },
      { q: 'لماذا يتساوى صافي راتبي مع إجماليه في قطر؟', a: 'إن كنت وافداً، فأنت خارج نظام التأمينات الاجتماعية ولا توجد ضريبة دخل، فلا يُخصم من راتبك شيء — ويتساوى الصافي مع الإجمالي.' },
      { q: 'كم يُخصم من راتب المواطن القطري لصالح التأمينات؟', a: 'يساهم المواطن القطري بنسبة 7% من راتبه. على راتب 10,000 ريال هذا يعني 700 ريال، فيبقى نحو 9,300 ريال صافياً.' },
    ],
    relatedCalculators: REL, lastReviewed: R,
  },
};

grossToNetGuides['gross-to-net-kuwait'] = {
  en: {
    slug: 'gross-to-net-kuwait', locale: 'en',
    title: 'Kuwait Net Salary: PIFSS Contributions and Take-Home Pay (2026)',
    metaDescription: 'Net salary in Kuwait: there is no personal income tax, but Kuwaiti nationals have a PIFSS contribution (about 10.5%, capped at the first KWD 1,500) deducted. Expatriates keep their full gross pay. Worked example + calculator.',
    intro: 'Kuwait has no personal income tax, so for expatriates net salary is simply gross salary. Kuwaiti nationals pay into PIFSS (the Public Institution for Social Security) instead — but only on a capped portion of salary. This guide explains the cap and works through the numbers.',
    sections: [
      { heading: 'No income tax in Kuwait', body: 'Kuwait does not tax salaries. No deduction for income tax ever appears on a payslip, regardless of nationality.' },
      { heading: 'PIFSS contributions and the KWD 1,500 salary cap', body: 'Kuwaiti nationals contribute **about 10.5%** to PIFSS, but only on **the first KWD 1,500** of monthly salary — earnings above that cap are not subject to the contribution. Non-Kuwaiti employees are not enrolled in PIFSS at all.' },
      { heading: 'Worked example: PIFSS on a 1,000 KWD salary', body: 'A Kuwaiti national earning **1,000 KWD** a month (below the cap) has about 1,000 × 10.5% = **105 KWD** deducted, for a net of roughly **895 KWD**. An expatriate on the same 1,000 KWD gross has nothing deducted — net = gross = 1,000 KWD.' },
      { heading: 'Expatriates and end-of-service benefits', body: 'Because non-Kuwaiti employees sit outside PIFSS and there is no income tax, their net pay matches their gross pay exactly. Instead of a PIFSS pension, expatriates in Kuwait build an end-of-service indemnity tied to their length of service.' },
    ],
    keyTakeaways: ['No personal income tax in Kuwait.', 'Kuwaiti nationals: PIFSS (about 10.5%) is deducted, but only up to the first KWD 1,500 of salary.', 'Expatriates: net salary equals gross salary.', 'Expatriates receive an end-of-service indemnity instead of a PIFSS pension.'],
    faqs: [
      { q: 'Is salary taxed in Kuwait?', a: 'No. Kuwait has no personal income tax. The only payroll deduction is the PIFSS contribution (about 10.5%), and it applies only to Kuwaiti nationals.' },
      { q: 'Does PIFSS apply to a Kuwaiti national’s entire salary?', a: 'No — the PIFSS contribution is calculated only on the first KWD 1,500 of monthly salary; any amount above that cap is not contributed on.' },
      { q: 'Do expatriates in Kuwait have anything deducted from their pay?', a: 'No. Expatriates are not enrolled in PIFSS and there is no income tax, so their net salary equals their gross salary.' },
    ],
    relatedCalculators: REL, lastReviewed: R,
  },
  ar: {
    slug: 'gross-to-net-kuwait', locale: 'ar',
    title: 'صافي الراتب في الكويت: اشتراك التأمينات (PIFSS) وصافي راتبك (2026)',
    metaDescription: 'صافي الراتب في الكويت: لا توجد ضريبة دخل شخصية، لكن يُخصم من المواطن الكويتي اشتراك تأمينات (PIFSS) بنحو 10.5% على أول 1,500 دينار فقط. ويحتفظ الوافد بكامل راتبه الإجمالي. مثال عملي وحاسبة.',
    intro: 'لا توجد في الكويت ضريبة دخل شخصية، فبالنسبة للوافد يتساوى الصافي مع الإجمالي ببساطة. أما المواطن الكويتي فيساهم في التأمينات الاجتماعية (PIFSS) — لكن على جزء محدد فقط من راتبه. يشرح هذا الدليل هذا السقف ويحسب الأرقام.',
    sections: [
      { heading: 'لا ضريبة دخل في الكويت', body: 'الكويت لا تفرض ضريبة على الرواتب. لا يظهر أي خصم لضريبة الدخل في قسيمة الراتب مطلقاً، بغضّ النظر عن الجنسية.' },
      { heading: 'اشتراك PIFSS وسقف 1,500 دينار', body: 'يساهم المواطن الكويتي بنحو **10.5%** في PIFSS، ولكن فقط على **أول 1,500 دينار** من الراتب الشهري — أما ما يزيد عن هذا السقف فلا يُحسب عليه اشتراك. وغير الكويتي غير مُسجّل في PIFSS أصلاً.' },
      { heading: 'مثال عملي: PIFSS على راتب 1,000 دينار', body: 'المواطن الكويتي براتب **1,000 دينار** شهرياً (أقل من السقف) يُخصم منه نحو 1,000 × 10.5% = **105 دنانير**، فيكون الصافي نحو **895 ديناراً**. والوافد على نفس الراتب الإجمالي 1,000 دينار لا يُخصم منه شيء — الصافي = الإجمالي = 1,000 دينار.' },
      { heading: 'الوافدون ومزايا نهاية الخدمة', body: 'بما أن غير الكويتي خارج PIFSS ولا توجد ضريبة دخل، فإن صافي راتبه يطابق إجماليه تماماً. وبدلاً من معاش PIFSS، يحصل الوافد في الكويت على مكافأة نهاية خدمة مرتبطة بسنوات عمله.' },
    ],
    keyTakeaways: ['لا ضريبة دخل شخصية في الكويت.', 'المواطن الكويتي: اشتراك PIFSS (نحو 10.5%) يُخصم، لكن على أول 1,500 دينار من الراتب فقط.', 'الوافد: صافي الراتب يساوي إجماليه.', 'الوافد يحصل على مكافأة نهاية خدمة بدل معاش PIFSS.'],
    faqs: [
      { q: 'هل يُفرض ضريبة على الراتب في الكويت؟', a: 'لا. لا توجد ضريبة دخل شخصية في الكويت. والخصم الوحيد هو اشتراك PIFSS (نحو 10.5%)، وينطبق فقط على المواطن الكويتي.' },
      { q: 'هل يُطبّق اشتراك PIFSS على كامل راتب المواطن الكويتي؟', a: 'لا — يُحسب اشتراك PIFSS فقط على أول 1,500 دينار من الراتب الشهري؛ أما ما يزيد عن هذا السقف فلا يُحسب عليه اشتراك.' },
      { q: 'هل يُخصم شيء من راتب الوافد في الكويت؟', a: 'لا. الوافد غير مسجّل في PIFSS ولا توجد ضريبة دخل، فصافي راتبه يساوي إجماليه.' },
    ],
    relatedCalculators: REL, lastReviewed: R,
  },
};

grossToNetGuides['gross-to-net-bahrain'] = {
  en: {
    slug: 'gross-to-net-bahrain', locale: 'en',
    title: 'Bahrain Net Salary: SIO Contributions and Take-Home Pay (2026)',
    metaDescription: 'Net salary in Bahrain: there is no personal income tax. Bahraini nationals have an 8% SIO contribution deducted, while non-Bahrainis pay only a 1% work-injury contribution. Worked example + calculator.',
    intro: 'Bahrain has no personal income tax, but unlike the rest of the Gulf, non-Bahraini employees here are not entirely deduction-free: they contribute a small amount for work-injury cover, separate from the fuller SIO contribution that Bahraini nationals pay. This guide compares the two.',
    sections: [
      { heading: 'No personal income tax in Bahrain', body: 'Bahrain does not tax salaries. No portion of your pay is withheld as income tax, whatever your nationality.' },
      { heading: 'SIO social insurance for Bahraini nationals (8%)', body: 'Bahraini nationals contribute **8%** of salary to the Social Insurance Organisation (SIO), covering pensions and related benefits. This is their only payroll deduction.' },
      { heading: 'The 1% work-injury contribution for non-Bahrainis', body: 'Non-Bahraini employees are not enrolled in the full SIO pension scheme, but Bahrain still requires a **1% work-injury contribution** on their behalf — the one case in the Gulf where expatriate pay is not completely deduction-free. It is far smaller than the national rate and covers injury-at-work protection only.' },
      { heading: 'Worked example comparing a national and a non-national', body: 'A Bahraini national on **1,000 BHD** a month has SIO of 1,000 × 8% = **80 BHD** deducted, for a net of about **920 BHD**. A non-Bahraini on the same 1,000 BHD gross has only the 1% work-injury contribution applied, so net is roughly **990 BHD** — close to gross, but not identical to it.' },
    ],
    keyTakeaways: ['No personal income tax in Bahrain.', 'Bahraini nationals: SIO contribution (8%) is the deduction.', 'Non-Bahrainis: a smaller 1% work-injury contribution applies — net is close to, but not exactly, gross.', 'Bahrain is the one Gulf country where expatriate pay is not fully deduction-free.'],
    faqs: [
      { q: 'Is salary taxed in Bahrain?', a: 'No. Bahrain has no personal income tax. Deductions are limited to social insurance: 8% SIO for Bahraini nationals, or a 1% work-injury contribution for non-Bahrainis.' },
      { q: 'Do non-Bahrainis have anything deducted from their salary?', a: 'Yes, a small one — unlike other Gulf countries, Bahrain applies a 1% work-injury contribution to non-Bahraini employees, even though they are outside the main SIO pension scheme.' },
      { q: 'How much is deducted from a Bahraini national’s salary?', a: 'Bahraini nationals contribute 8% of salary to SIO. On a 1,000 BHD salary that is 80 BHD, leaving about 920 BHD net.' },
    ],
    relatedCalculators: REL, lastReviewed: R,
  },
  ar: {
    slug: 'gross-to-net-bahrain', locale: 'ar',
    title: 'صافي الراتب في البحرين: اشتراكات SIO وصافي راتبك (2026)',
    metaDescription: 'صافي الراتب في البحرين: لا توجد ضريبة دخل شخصية. يُخصم من المواطن البحريني 8% تأمينات (SIO)، بينما يدفع غير البحريني 1% فقط اشتراك إصابات عمل. مثال عملي وحاسبة.',
    intro: 'لا توجد في البحرين ضريبة دخل شخصية، لكن خلافاً لبقية دول الخليج، غير البحريني هنا ليس معفى تماماً من الخصومات: فهو يساهم بمبلغ صغير لتغطية إصابات العمل، بخلاف اشتراك SIO الأشمل الذي يدفعه المواطن البحريني. يقارن هذا الدليل بين الحالتين.',
    sections: [
      { heading: 'لا ضريبة دخل شخصية في البحرين', body: 'البحرين لا تفرض ضريبة على الرواتب. لا يُخصم أي جزء من راتبك كضريبة دخل، بغضّ النظر عن جنسيتك.' },
      { heading: 'تأمينات SIO للمواطن البحريني (8%)', body: 'يساهم المواطن البحريني بنسبة **8%** من راتبه في هيئة التأمينات الاجتماعية (SIO)، التي تغطي المعاشات والمزايا المرتبطة بها. وهذا هو خصمه الوحيد من الراتب.' },
      { heading: 'اشتراك إصابات العمل 1% لغير البحريني', body: 'غير البحريني غير مُسجّل في فرع المعاشات الكامل بـ SIO، لكن البحرين تفرض عليه رغم ذلك **اشتراك إصابات عمل 1%** — الحالة الوحيدة في الخليج التي لا يكون فيها راتب الوافد معفى تماماً من الخصومات. وهو أصغر بكثير من نسبة المواطن ويغطي الحماية من إصابات العمل فقط.' },
      { heading: 'مثال عملي يقارن بين مواطن وغير مواطن', body: 'المواطن البحريني براتب **1,000 دينار** شهرياً يُخصم منه 1,000 × 8% = **80 ديناراً** تأمينات، فيكون الصافي نحو **920 ديناراً**. وغير البحريني على نفس الراتب الإجمالي 1,000 دينار يُطبّق عليه فقط اشتراك إصابات العمل 1%، فيكون الصافي نحو **990 ديناراً** — قريباً من الإجمالي، لكنه ليس مطابقاً له.' },
    ],
    keyTakeaways: ['لا ضريبة دخل شخصية في البحرين.', 'المواطن البحريني: اشتراك SIO (8%) هو الخصم.', 'غير البحريني: يُطبّق اشتراك إصابات عمل أصغر 1% — والصافي قريب من الإجمالي لكن ليس مطابقاً له.', 'البحرين هي الدولة الخليجية الوحيدة التي لا يكون فيها راتب الوافد معفى تماماً من الخصومات.'],
    faqs: [
      { q: 'هل يُفرض ضريبة على الراتب في البحرين؟', a: 'لا. لا توجد ضريبة دخل شخصية في البحرين. وتقتصر الخصومات على التأمينات الاجتماعية: 8% SIO للمواطن البحريني، أو 1% اشتراك إصابات عمل لغير البحريني.' },
      { q: 'هل يُخصم شيء من راتب غير البحريني؟', a: 'نعم، مبلغ صغير — خلافاً لبقية دول الخليج، تفرض البحرين اشتراك إصابات عمل 1% على غير البحريني، مع أنه خارج فرع معاشات SIO الأساسي.' },
      { q: 'كم يُخصم من راتب المواطن البحريني؟', a: 'يساهم المواطن البحريني بنسبة 8% من راتبه في SIO. على راتب 1,000 دينار هذا يعني 80 ديناراً، فيبقى نحو 920 ديناراً صافياً.' },
    ],
    relatedCalculators: REL, lastReviewed: R,
  },
};

grossToNetGuides['gross-to-net-oman'] = {
  en: {
    slug: 'gross-to-net-oman', locale: 'en',
    title: 'Oman Net Salary: Social Protection and Take-Home Pay (2026)',
    metaDescription: 'Net salary in Oman: there is no personal income tax. Omani nationals have an 8% Social Protection Fund contribution deducted; expatriates currently have nothing withheld. Worked example + calculator.',
    intro: 'Oman has no personal income tax, and for now expatriate employees have no payroll deductions at all. Omani nationals contribute to the Social Protection Fund instead. This guide walks through the national contribution and flags the one thing worth watching for expatriates.',
    sections: [
      { heading: 'No personal income tax in Oman', body: 'Oman does not levy income tax on salaries. Whatever you earn, income tax is never part of what is withheld from your pay.' },
      { heading: 'Social Protection Fund contributions for Omani nationals', body: 'Omani nationals contribute **8%** of salary to the Social Protection Fund, covering pensions and related social-security benefits. This is their only payroll deduction.' },
      { heading: 'Worked example on a 1,000 OMR salary', body: 'An Omani national earning **1,000 OMR** a month has Social Protection Fund contributions of 1,000 × 8% = **80 OMR** deducted, for a net of about **920 OMR**. An expatriate on the same 1,000 OMR gross currently has nothing deducted, so net = gross = 1,000 OMR.' },
      { heading: 'Expatriates today — and a scheme that may change', body: 'For now, expatriate employees in Oman are not enrolled in the Social Protection Fund, so their net pay equals their gross pay in full. Oman has signalled plans to widen social-protection coverage over time, so this guide and the calculator are kept current — check your contract or employer if that changes for you.' },
    ],
    keyTakeaways: ['No personal income tax in Oman.', 'Omani nationals: Social Protection Fund contribution (8%) is the only deduction.', 'Expatriates: currently nothing is deducted — net salary equals gross salary.', 'Expatriate coverage may expand in future, so confirm your specific contract.'],
    faqs: [
      { q: 'Is salary taxed in Oman?', a: 'No. Oman has no personal income tax. The only payroll deduction is the 8% Social Protection Fund contribution, and today it applies only to Omani nationals.' },
      { q: 'Why is nothing deducted from an expatriate’s salary in Oman?', a: 'Expatriates are currently not enrolled in the Social Protection Fund, and there is no income tax, so nothing is withheld — net equals gross. This could change as coverage expands.' },
      { q: 'How much is deducted from an Omani national’s salary?', a: 'Omani nationals contribute 8% of salary to the Social Protection Fund. On a 1,000 OMR salary that is 80 OMR, leaving about 920 OMR net.' },
    ],
    relatedCalculators: REL, lastReviewed: R,
  },
  ar: {
    slug: 'gross-to-net-oman', locale: 'ar',
    title: 'صافي الراتب في عُمان: الحماية الاجتماعية وصافي راتبك (2026)',
    metaDescription: 'صافي الراتب في عُمان: لا توجد ضريبة دخل شخصية. يُخصم من المواطن العُماني 8% اشتراك حماية اجتماعية، بينما لا يُخصم من الوافد شيء حالياً. مثال عملي وحاسبة.',
    intro: 'لا توجد في عُمان ضريبة دخل شخصية، وحالياً لا تُخصم من الموظف الوافد أي خصومات على الإطلاق. أما المواطن العُماني فيساهم في صندوق الحماية الاجتماعية. يشرح هذا الدليل اشتراك المواطن، ويشير إلى ما يجدر بالوافد متابعته.',
    sections: [
      { heading: 'لا ضريبة دخل شخصية في عُمان', body: 'عُمان لا تفرض ضريبة دخل على الرواتب. أياً كان دخلك، لا تدخل ضريبة الدخل أبداً ضمن ما يُخصم من راتبك.' },
      { heading: 'اشتراك صندوق الحماية الاجتماعية للمواطن العُماني', body: 'يساهم المواطن العُماني بنسبة **8%** من راتبه في صندوق الحماية الاجتماعية، الذي يغطي المعاشات والمزايا الاجتماعية المرتبطة بها. وهذا هو خصمه الوحيد من الراتب.' },
      { heading: 'مثال عملي على راتب 1,000 ريال', body: 'المواطن العُماني براتب **1,000 ريال** شهرياً يُخصم منه 1,000 × 8% = **80 ريالاً** اشتراك حماية اجتماعية، فيكون الصافي نحو **920 ريالاً**. والوافد على نفس الراتب الإجمالي 1,000 ريال لا يُخصم منه شيء حالياً، فالصافي = الإجمالي = 1,000 ريال.' },
      { heading: 'الوافدون اليوم — ونظام قد يتغيّر', body: 'حالياً، الموظف الوافد في عُمان غير مُسجّل في صندوق الحماية الاجتماعية، فيتساوى صافي راتبه مع إجماليه كاملاً. وقد أشارت عُمان إلى خطط لتوسيع تغطية الحماية الاجتماعية مستقبلاً، فنحافظ على تحديث هذا الدليل والحاسبة — راجع عقدك أو صاحب عملك إن أشار إلى غير ذلك.' },
    ],
    keyTakeaways: ['لا ضريبة دخل شخصية في عُمان.', 'المواطن العُماني: اشتراك صندوق الحماية الاجتماعية (8%) هو الخصم الوحيد.', 'الوافد: لا يُخصم منه شيء حالياً — الصافي يساوي الإجمالي.', 'قد تتوسع تغطية الوافدين مستقبلاً، فتحقّق من عقدك الخاص.'],
    faqs: [
      { q: 'هل يُفرض ضريبة على الراتب في عُمان؟', a: 'لا. لا توجد ضريبة دخل شخصية في عُمان. والخصم الوحيد هو اشتراك صندوق الحماية الاجتماعية بنسبة 8%، وينطبق اليوم على المواطن العُماني فقط.' },
      { q: 'لماذا لا يُخصم شيء من راتب الوافد في عُمان؟', a: 'الوافد غير مُسجّل حالياً في صندوق الحماية الاجتماعية، ولا توجد ضريبة دخل، فلا يُخصم من راتبه شيء — والصافي يساوي الإجمالي. وقد يتغيّر هذا مع توسّع التغطية.' },
      { q: 'كم يُخصم من راتب المواطن العُماني؟', a: 'يساهم المواطن العُماني بنسبة 8% من راتبه في صندوق الحماية الاجتماعية. على راتب 1,000 ريال هذا يعني 80 ريالاً، فيبقى نحو 920 ريالاً صافياً.' },
    ],
    relatedCalculators: REL, lastReviewed: R,
  },
};

export default grossToNetGuides;
