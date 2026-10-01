import type { GuideContent } from './types';
import type { Locale } from '../config/site';

/**
 * Per-country social-insurance guides. Rates, caps and coverage mirror the
 * country-rules engine (src/lib/country-rules/*). The recurring, high-value
 * nuance: GCC schemes cover NATIONALS only (expats are excluded and receive
 * the end-of-service gratuity instead); Jordan's SSC covers everyone.
 * Last reviewed: 2026-10-01.
 */
const R = '2026-10-01';
const REL = ['social-insurance', 'gross-to-net', 'end-of-service'];

const socialInsuranceGuides: Record<string, Record<Locale, GuideContent>> = {
  'social-insurance-jordan': {
    en: {
      slug: 'social-insurance-jordan', locale: 'en',
      title: 'Jordan Social Security (SSC) Contributions 2026',
      metaDescription: 'Jordan Social Security Corporation contributions: employee 7.5%, employer 14.25%, on salary up to 3,733 JOD/month. Covers nationals and expatriates. Worked example + calculator.',
      intro: 'The Social Security Corporation (SSC) is the backbone of employment benefits in Jordan — and unlike the Gulf, it covers both Jordanians and expatriates. Contributions are a percentage of your monthly salary up to a ceiling. This guide shows the rates, the cap, and a worked example matching the Klar calculator.',
      sections: [
        { heading: 'The rates', body: `Monthly contributions are split between you and your employer:

- **Employee:** 7.5% of salary.
- **Employer:** 14.25% of salary.

These fund old-age, disability, death, maternity, unemployment and work-injury benefits.` },
        { heading: 'The salary ceiling', body: `Contributions apply to salary up to **3,733 JOD per month**. Earnings above the ceiling are not subject to contributions, so the maximum monthly employee contribution is 3,733 × 7.5% ≈ 280 JOD.` },
        { heading: 'Who is covered', body: `The SSC covers **all** private-sector employees — Jordanian and expatriate alike. This is a key difference from the Gulf, where social insurance applies only to nationals. If you work legally in Jordan, you are almost certainly enrolled.` },
        { heading: 'Worked example', body: `On a **1,000 JOD** monthly salary:

Employee contribution = 1,000 × 7.5% = **75 JOD** deducted from pay. Employer contribution = 1,000 × 14.25% = 142.50 JOD on top. These are separate from income tax — use the gross-to-net calculator to see take-home after both.` },
      ],
      keyTakeaways: ['Employee 7.5%, employer 14.25% of salary.', 'Capped at 3,733 JOD/month (max employee ~280 JOD).', 'Covers nationals and expatriates — unlike the Gulf.', 'Separate from income tax; combine both in gross-to-net.'],
      faqs: [
        { q: 'How much is social security in Jordan?', a: 'The employee pays 7.5% and the employer 14.25% of monthly salary, on earnings up to a 3,733 JOD ceiling.' },
        { q: 'Do expatriates pay social security in Jordan?', a: 'Yes. Unlike the Gulf states, Jordan’s SSC covers both nationals and expatriate employees.' },
        { q: 'Is there a cap on Jordan social security?', a: 'Yes, contributions apply to salary up to 3,733 JOD per month; earnings above that are not charged.' },
      ],
      relatedCalculators: REL, lastReviewed: R,
    },
    ar: {
      slug: 'social-insurance-jordan', locale: 'ar',
      title: 'اشتراكات الضمان الاجتماعي في الأردن 2026',
      metaDescription: 'اشتراكات الضمان الاجتماعي في الأردن: الموظف 7.5% وصاحب العمل 14.25%، على الراتب حتى 3,733 ديناراً شهرياً. يشمل المواطنين والوافدين. مثال عملي وحاسبة.',
      intro: 'مؤسسة الضمان الاجتماعي هي العمود الفقري لمزايا العمل في الأردن — وخلافاً للخليج، تشمل الأردنيين والوافدين معاً. الاشتراكات نسبة من الراتب الشهري حتى سقف معيّن. يوضّح هذا الدليل النسب والسقف بمثال مطابق لحاسبة كلار.',
      sections: [
        { heading: 'النسب', body: `يُقسم الاشتراك الشهري بينك وبين صاحب العمل:

- **الموظف:** 7.5% من الراتب.
- **صاحب العمل:** 14.25% من الراتب.

وتموّل هذه الاشتراكات منافع الشيخوخة والعجز والوفاة والأمومة والتعطل وإصابات العمل.` },
        { heading: 'سقف الراتب', body: `تُطبّق الاشتراكات على الراتب حتى **3,733 ديناراً شهرياً**. ولا يخضع ما يزيد عن السقف للاشتراك، فيكون أقصى اشتراك شهري للموظف = 3,733 × 7.5% ≈ 280 ديناراً.` },
        { heading: 'من المشمول', body: `يغطي الضمان **جميع** موظفي القطاع الخاص — أردنيين ووافدين. وهذا فارق جوهري عن الخليج حيث يقتصر الضمان على المواطنين. فإن كنت تعمل نظامياً في الأردن فأنت مشترك على الأرجح.` },
        { heading: 'مثال عملي', body: `على راتب شهري **1,000 دينار**:

اشتراك الموظف = 1,000 × 7.5% = **75 ديناراً** تُقتطع من الراتب. اشتراك صاحب العمل = 1,000 × 14.25% = 142.50 ديناراً إضافةً. وهي منفصلة عن ضريبة الدخل — استخدم حاسبة صافي الراتب لرؤية الصافي بعدهما.` },
      ],
      keyTakeaways: ['الموظف 7.5% وصاحب العمل 14.25% من الراتب.', 'السقف 3,733 ديناراً شهرياً (أقصى اشتراك للموظف ~280 ديناراً).', 'يشمل المواطنين والوافدين — خلافاً للخليج.', 'منفصل عن ضريبة الدخل؛ اجمعهما في صافي الراتب.'],
      faqs: [
        { q: 'كم نسبة الضمان الاجتماعي في الأردن؟', a: 'يدفع الموظف 7.5% وصاحب العمل 14.25% من الراتب الشهري، على الأجر حتى سقف 3,733 ديناراً.' },
        { q: 'هل يدفع الوافدون الضمان الاجتماعي في الأردن؟', a: 'نعم. خلافاً لدول الخليج، يشمل الضمان الأردني المواطنين والوافدين معاً.' },
        { q: 'هل هناك سقف للضمان في الأردن؟', a: 'نعم، تُطبّق الاشتراكات على الراتب حتى 3,733 ديناراً شهرياً، وما زاد لا يخضع.' },
      ],
      relatedCalculators: REL, lastReviewed: R,
    },
  },

  'social-insurance-saudi-arabia': {
    en: {
      slug: 'social-insurance-saudi-arabia', locale: 'en',
      title: 'Saudi GOSI Contributions 2026 (Saudi & Non-Saudi)',
      metaDescription: 'Saudi GOSI contributions: Saudi nationals pay 9.75% (employer 11.75%) up to SAR 45,000; non-Saudis are covered for occupational hazards only (2% employer). Worked example + calculator.',
      intro: 'GOSI is Saudi Arabia’s social insurance scheme, and the rate depends heavily on whether you are Saudi or an expatriate. Saudi nationals contribute the full package; non-Saudis are covered only for occupational hazards, paid entirely by the employer. This guide covers both, with a worked example matching the Klar calculator.',
      sections: [
        { heading: 'Saudi nationals', body: `For Saudi employees (existing subscribers), monthly GOSI contributions are:

- **Employee:** 9.75% (9% annuities + 0.75% SANED unemployment).
- **Employer:** 11.75% (9% annuities + 2% occupational hazards + 0.75% SANED).

The contributory wage is basic salary plus housing, capped at **SAR 45,000/month**.` },
        { heading: 'Non-Saudi employees', body: `Expatriates are **not** enrolled in the full scheme. They are covered for **occupational hazards only** — 2% paid by the employer, nothing deducted from the employee. Instead of a pension, non-Saudis receive the Labour Law end-of-service award.` },
        { heading: 'Worked example (Saudi national)', body: `On a **10,000 SAR** contributory wage:

Employee contribution = 10,000 × 9.75% = **975 SAR** deducted. Employer contribution = 10,000 × 11.75% = 1,175 SAR on top.` },
      ],
      keyTakeaways: ['Saudi nationals: employee 9.75%, employer 11.75%.', 'Contributory wage capped at SAR 45,000/month.', 'Non-Saudis: occupational hazards only (2% employer, 0% employee).', 'Non-Saudis receive end-of-service award instead of a pension.'],
      faqs: [
        { q: 'How much is GOSI in Saudi Arabia?', a: 'For Saudi nationals the employee pays 9.75% and the employer 11.75% of the contributory wage (basic + housing), up to SAR 45,000/month.' },
        { q: 'Do expats pay GOSI in Saudi Arabia?', a: 'No. Non-Saudi employees are covered for occupational hazards only, paid entirely by the employer (2%); nothing is deducted from the employee.' },
        { q: 'What is the GOSI salary cap?', a: 'The contributory wage is capped at SAR 45,000 per month.' },
      ],
      relatedCalculators: REL, lastReviewed: R,
    },
    ar: {
      slug: 'social-insurance-saudi-arabia', locale: 'ar',
      title: 'اشتراكات التأمينات الاجتماعية (GOSI) في السعودية 2026',
      metaDescription: 'اشتراكات التأمينات في السعودية: المواطن السعودي 9.75% (صاحب العمل 11.75%) حتى 45,000 ريال؛ وغير السعوديين للأخطار المهنية فقط (2% على صاحب العمل). مثال عملي وحاسبة.',
      intro: 'التأمينات الاجتماعية (GOSI) هي نظام الضمان في السعودية، وتعتمد النسبة كثيراً على كونك سعودياً أم وافداً. فالمواطن السعودي يشترك بالحزمة الكاملة؛ أما غير السعودي فيُغطّى للأخطار المهنية فقط ويتحمّلها صاحب العمل بالكامل. يشرح هذا الدليل الحالتين بمثال مطابق لحاسبة كلار.',
      sections: [
        { heading: 'المواطنون السعوديون', body: `للموظف السعودي (المشترك الحالي) تكون الاشتراكات الشهرية:

- **الموظف:** 9.75% (9% معاشات + 0.75% ساند للتعطل).
- **صاحب العمل:** 11.75% (9% معاشات + 2% أخطار مهنية + 0.75% ساند).

والأجر الخاضع = الأساسي + السكن، بسقف **45,000 ريال شهرياً**.` },
        { heading: 'الموظفون غير السعوديين', body: `الوافدون **غير** مشتركين في النظام الكامل. يُغطَّون للأخطار المهنية **فقط** — 2% يتحمّلها صاحب العمل، ولا شيء يُقتطع من الموظف. وبدل المعاش يحصل غير السعودي على مكافأة نهاية الخدمة.` },
        { heading: 'مثال عملي (مواطن سعودي)', body: `على أجر خاضع **10,000 ريال**:

اشتراك الموظف = 10,000 × 9.75% = **975 ريالاً** تُقتطع. اشتراك صاحب العمل = 10,000 × 11.75% = 1,175 ريالاً إضافةً.` },
      ],
      keyTakeaways: ['المواطن السعودي: الموظف 9.75% وصاحب العمل 11.75%.', 'الأجر الخاضع بسقف 45,000 ريال شهرياً.', 'غير السعوديين: أخطار مهنية فقط (2% على صاحب العمل).', 'غير السعوديين يحصلون على مكافأة نهاية الخدمة بدل المعاش.'],
      faqs: [
        { q: 'كم نسبة التأمينات في السعودية؟', a: 'للمواطن السعودي يدفع الموظف 9.75% وصاحب العمل 11.75% من الأجر الخاضع (أساسي + سكن) حتى 45,000 ريال شهرياً.' },
        { q: 'هل يدفع الوافدون التأمينات في السعودية؟', a: 'لا. يُغطّى غير السعوديين للأخطار المهنية فقط ويتحمّلها صاحب العمل (2%)، ولا يُقتطع من الموظف شيء.' },
        { q: 'ما سقف الأجر في التأمينات؟', a: 'الأجر الخاضع للاشتراك بسقف 45,000 ريال شهرياً.' },
      ],
      relatedCalculators: REL, lastReviewed: R,
    },
  },

  'social-insurance-uae': {
    en: {
      slug: 'social-insurance-uae', locale: 'en',
      title: 'UAE Social Insurance (Pension) Contributions 2026',
      metaDescription: 'UAE pension contributions apply to UAE nationals only: employee 11%, employer 15%, up to AED 70,000/month. Expatriates are not covered — they receive end-of-service gratuity. Calculator + example.',
      intro: 'UAE social insurance (the pension scheme) is often misunderstood by expatriates, because it does not apply to them at all. It covers UAE nationals in the private sector; expats instead receive the end-of-service gratuity. This guide explains the rates and who they apply to, with a worked example matching the Klar calculator.',
      sections: [
        { heading: 'UAE nationals only', body: `Under the 2023 pension law, private-sector **UAE nationals** contribute:

- **Employee:** 11% (8% pension + 3% savings).
- **Employer:** 15% (12.5% pension + 2.5% savings); the government bears 2.5% of the employer share for salaries below AED 20,000.

The contribution salary is capped at **AED 70,000/month**.` },
        { heading: 'Expatriates are not covered', body: `If you are an expatriate — the large majority of the UAE workforce — you are **not** enrolled in social insurance and nothing is deducted for it. Your end-of-service benefit is the Labour Law **gratuity** instead.` },
        { heading: 'Worked example (UAE national)', body: `On a **20,000 AED** contribution salary:

Employee contribution = 20,000 × 11% = **2,200 AED** deducted. Employer contribution = 20,000 × 15% = 3,000 AED (of which the government may bear part).` },
      ],
      keyTakeaways: ['Applies to UAE nationals only.', 'Employee 11%, employer 15%, capped at AED 70,000/month.', 'Expatriates are not covered — nothing is deducted.', 'Expats receive end-of-service gratuity instead of a pension.'],
      faqs: [
        { q: 'Do expats pay social insurance in the UAE?', a: 'No. UAE social insurance covers UAE nationals only. Expatriates have nothing deducted and instead receive the end-of-service gratuity.' },
        { q: 'How much is UAE pension contribution for nationals?', a: 'For UAE nationals the employee pays 11% and the employer 15% of the contribution salary, capped at AED 70,000/month.' },
        { q: 'What do UAE expats get instead of a pension?', a: 'The Labour Law end-of-service gratuity — 21 days’ basic wage per year for the first five years, 30 days after.' },
      ],
      relatedCalculators: REL, lastReviewed: R,
    },
    ar: {
      slug: 'social-insurance-uae', locale: 'ar',
      title: 'اشتراكات التأمينات الاجتماعية (المعاشات) في الإمارات 2026',
      metaDescription: 'التأمينات في الإمارات للمواطنين فقط: الموظف 11% وصاحب العمل 15% حتى 70,000 درهم شهرياً. الوافدون غير مشمولين — يحصلون على مكافأة نهاية الخدمة. حاسبة ومثال.',
      intro: 'كثيراً ما يسيء الوافدون فهم التأمينات الاجتماعية في الإمارات، لأنها لا تنطبق عليهم أصلاً. فهي تغطي مواطني الدولة في القطاع الخاص؛ أما الوافدون فيحصلون على مكافأة نهاية الخدمة. يوضّح هذا الدليل النسب ومن تنطبق عليه بمثال مطابق لحاسبة كلار.',
      sections: [
        { heading: 'لمواطني الدولة فقط', body: `بموجب قانون المعاشات لسنة 2023، يشترك **مواطنو الإمارات** في القطاع الخاص:

- **الموظف:** 11% (8% معاش + 3% ادخار).
- **صاحب العمل:** 15% (12.5% معاش + 2.5% ادخار)؛ وتتحمّل الحكومة 2.5% من حصة صاحب العمل للرواتب دون 20,000 درهم.

وأجر الاشتراك بسقف **70,000 درهم شهرياً**.` },
        { heading: 'الوافدون غير مشمولين', body: `إن كنت وافداً — وهم أغلبية قوة العمل في الإمارات — فأنت **غير** مشترك في التأمينات ولا يُقتطع منك شيء لها. واستحقاق نهاية خدمتك هو **مكافأة** قانون العمل بدلاً من ذلك.` },
        { heading: 'مثال عملي (مواطن إماراتي)', body: `على أجر اشتراك **20,000 درهم**:

اشتراك الموظف = 20,000 × 11% = **2,200 درهم** تُقتطع. اشتراك صاحب العمل = 20,000 × 15% = 3,000 درهم (قد تتحمّل الحكومة جزءاً منه).` },
      ],
      keyTakeaways: ['تنطبق على مواطني الإمارات فقط.', 'الموظف 11% وصاحب العمل 15%، بسقف 70,000 درهم شهرياً.', 'الوافدون غير مشمولين — لا يُقتطع منهم شيء.', 'الوافدون يحصلون على مكافأة نهاية الخدمة بدل المعاش.'],
      faqs: [
        { q: 'هل يدفع الوافدون التأمينات في الإمارات؟', a: 'لا. التأمينات في الإمارات تغطي المواطنين فقط. الوافدون لا يُقتطع منهم شيء ويحصلون على مكافأة نهاية الخدمة.' },
        { q: 'كم اشتراك المعاش للمواطنين في الإمارات؟', a: 'للمواطن يدفع الموظف 11% وصاحب العمل 15% من أجر الاشتراك، بسقف 70,000 درهم شهرياً.' },
        { q: 'ماذا يحصل الوافد في الإمارات بدل المعاش؟', a: 'مكافأة نهاية الخدمة وفق قانون العمل — 21 يوماً من الراتب الأساسي عن كل سنة في أول خمس سنوات، و30 يوماً بعدها.' },
      ],
      relatedCalculators: REL, lastReviewed: R,
    },
  },

  'social-insurance-kuwait': {
    en: {
      slug: 'social-insurance-kuwait', locale: 'en',
      title: 'Kuwait Social Security (PIFSS) Contributions 2026',
      metaDescription: 'Kuwait PIFSS contributions apply to Kuwaiti nationals: employee 8% plus a 2.5% supplementary on the first KWD 1,500 (effective 10.5%), employer 11.5%, cap KWD 2,750. Expats excluded. Example + calculator.',
      intro: 'Kuwait’s social security (PIFSS) covers Kuwaiti nationals, with an extra supplementary contribution layered on the first slice of salary. Expatriates are excluded and receive the Labour Law indemnity instead. This guide explains the rates and the supplementary band, with a worked example matching the Klar calculator.',
      sections: [
        { heading: 'Kuwaiti nationals', body: `Monthly PIFSS contributions for Kuwaiti employees:

- **Employee:** 8% of salary, **plus** a 2.5% supplementary contribution on the **first KWD 1,500** — making the effective employee rate **10.5%** on that first slice.
- **Employer:** 11.5% of salary.

Salary is capped at **KWD 2,750/month**.` },
        { heading: 'Expatriates are not covered', body: `Non-Kuwaiti workers are **not** enrolled in PIFSS. They receive the Labour Law end-of-service indemnity instead, with nothing deducted for social security.` },
        { heading: 'Worked example (Kuwaiti national)', body: `On a **1,000 KWD** salary (within the first 1,500 band):

Employee = 1,000 × 8% + 1,000 × 2.5% = 80 + 25 = **105 KWD** deducted. Employer = 1,000 × 11.5% = 115 KWD.` },
      ],
      keyTakeaways: ['Kuwaiti nationals only.', 'Employee 8% + 2.5% supplementary on the first KWD 1,500 (effective 10.5%).', 'Employer 11.5%; salary capped at KWD 2,750/month.', 'Expats are not covered — they get the Labour Law indemnity.'],
      faqs: [
        { q: 'How much is PIFSS in Kuwait?', a: 'Kuwaiti nationals pay 8% plus a 2.5% supplementary contribution on the first KWD 1,500 (effective 10.5% on that slice); the employer pays 11.5%, up to a KWD 2,750 ceiling.' },
        { q: 'Do expats pay social security in Kuwait?', a: 'No. Expatriates are not enrolled in PIFSS; they receive the Labour Law end-of-service indemnity instead.' },
        { q: 'What is the supplementary contribution in Kuwait?', a: 'A 2.5% employee contribution on the first KWD 1,500 of monthly salary, on top of the 8% base rate.' },
      ],
      relatedCalculators: REL, lastReviewed: R,
    },
    ar: {
      slug: 'social-insurance-kuwait', locale: 'ar',
      title: 'اشتراكات التأمينات الاجتماعية (PIFSS) في الكويت 2026',
      metaDescription: 'اشتراكات التأمينات في الكويت للمواطنين: الموظف 8% مع 2.5% تكميلي على أول 1,500 دينار (فعلي 10.5%)، وصاحب العمل 11.5%، بسقف 2,750 ديناراً. الوافدون غير مشمولين. مثال وحاسبة.',
      intro: 'التأمينات الاجتماعية في الكويت (المؤسسة العامة للتأمينات) تغطي المواطنين الكويتيين، مع اشتراك تكميلي يُضاف على الشريحة الأولى من الراتب. والوافدون غير مشمولين ويحصلون على مكافأة قانون العمل. يوضّح هذا الدليل النسب والشريحة التكميلية بمثال مطابق لحاسبة كلار.',
      sections: [
        { heading: 'المواطنون الكويتيون', body: `الاشتراكات الشهرية للموظف الكويتي:

- **الموظف:** 8% من الراتب، **إضافةً** إلى 2.5% تكميلي على **أول 1,500 دينار** — فيصبح المعدل الفعلي للموظف **10.5%** على تلك الشريحة.
- **صاحب العمل:** 11.5% من الراتب.

والراتب بسقف **2,750 ديناراً شهرياً**.` },
        { heading: 'الوافدون غير مشمولين', body: `العمال غير الكويتيين **غير** مشتركين في التأمينات. ويحصلون على مكافأة نهاية الخدمة وفق قانون العمل، دون أي اقتطاع للتأمينات.` },
        { heading: 'مثال عملي (مواطن كويتي)', body: `على راتب **1,000 دينار** (ضمن شريحة أول 1,500):

الموظف = 1,000 × 8% + 1,000 × 2.5% = 80 + 25 = **105 دنانير** تُقتطع. صاحب العمل = 1,000 × 11.5% = 115 ديناراً.` },
      ],
      keyTakeaways: ['للمواطنين الكويتيين فقط.', 'الموظف 8% + 2.5% تكميلي على أول 1,500 دينار (فعلي 10.5%).', 'صاحب العمل 11.5%؛ والراتب بسقف 2,750 ديناراً شهرياً.', 'الوافدون غير مشمولين — يحصلون على مكافأة قانون العمل.'],
      faqs: [
        { q: 'كم نسبة التأمينات في الكويت؟', a: 'يدفع المواطن الكويتي 8% مع 2.5% تكميلي على أول 1,500 دينار (فعلي 10.5% على تلك الشريحة)؛ وصاحب العمل 11.5%، بسقف 2,750 ديناراً.' },
        { q: 'هل يدفع الوافدون التأمينات في الكويت؟', a: 'لا. الوافدون غير مشتركين؛ ويحصلون على مكافأة نهاية الخدمة وفق قانون العمل.' },
        { q: 'ما الاشتراك التكميلي في الكويت؟', a: 'اشتراك 2.5% على الموظف على أول 1,500 دينار من الراتب الشهري، فوق المعدل الأساسي 8%.' },
      ],
      relatedCalculators: REL, lastReviewed: R,
    },
  },

  'social-insurance-qatar': {
    en: {
      slug: 'social-insurance-qatar', locale: 'en',
      title: 'Qatar Social Insurance Contributions 2026',
      metaDescription: 'Qatar social insurance applies to Qatari nationals: employee 7%, employer 14%, up to QAR 100,000/month. Expatriates are not covered — they receive the end-of-service gratuity. Example + calculator.',
      intro: 'Qatar’s social insurance, administered by GRSIA, covers Qatari nationals. Since 2023 the total contribution rose to 21% of the contributory salary. Expatriates are excluded and receive the Labour Law gratuity instead. This guide explains the rates, with a worked example matching the Klar calculator.',
      sections: [
        { heading: 'Qatari nationals', body: `Monthly contributions for Qatari employees (since January 2023):

- **Employee:** 7% of the contributory salary (basic + social + housing allowances).
- **Employer:** 14%.

Salary is capped at **QAR 100,000/month**. GCC nationals working in Qatar contribute at their home country’s rate.` },
        { heading: 'Expatriates are not covered', body: `Non-Qatari workers are **not** enrolled in social insurance; nothing is deducted. They receive the Labour Law **end-of-service gratuity** (21 days’ basic wage per year) instead.` },
        { heading: 'Worked example (Qatari national)', body: `On a **10,000 QAR** contributory salary:

Employee = 10,000 × 7% = **700 QAR** deducted. Employer = 10,000 × 14% = 1,400 QAR on top.` },
      ],
      keyTakeaways: ['Qatari nationals only.', 'Employee 7%, employer 14%, capped at QAR 100,000/month.', 'Total contribution is 21% of the contributory salary.', 'Expats are not covered — they receive the end-of-service gratuity.'],
      faqs: [
        { q: 'How much is social insurance in Qatar?', a: 'For Qatari nationals the employee pays 7% and the employer 14% of the contributory salary (basic plus social and housing allowances), up to QAR 100,000/month.' },
        { q: 'Do expats pay social insurance in Qatar?', a: 'No. Expatriates are not covered; they receive the Labour Law end-of-service gratuity instead.' },
        { q: 'What is the Qatar social insurance cap?', a: 'The contributory salary is capped at QAR 100,000 per month.' },
      ],
      relatedCalculators: REL, lastReviewed: R,
    },
    ar: {
      slug: 'social-insurance-qatar', locale: 'ar',
      title: 'اشتراكات التأمينات الاجتماعية في قطر 2026',
      metaDescription: 'التأمينات في قطر للمواطنين القطريين: الموظف 7% وصاحب العمل 14% حتى 100,000 ريال شهرياً. الوافدون غير مشمولين — يحصلون على مكافأة نهاية الخدمة. مثال وحاسبة.',
      intro: 'التأمينات الاجتماعية في قطر، التي تديرها الهيئة العامة للتقاعد والتأمينات، تغطي المواطنين القطريين. ومنذ 2023 ارتفع إجمالي الاشتراك إلى 21% من الراتب الخاضع. والوافدون غير مشمولين ويحصلون على مكافأة قانون العمل. يشرح هذا الدليل النسب بمثال مطابق لحاسبة كلار.',
      sections: [
        { heading: 'المواطنون القطريون', body: `الاشتراكات الشهرية للموظف القطري (منذ يناير 2023):

- **الموظف:** 7% من الراتب الخاضع (الأساسي + بدلا الاجتماعية والسكن).
- **صاحب العمل:** 14%.

والراتب بسقف **100,000 ريال شهرياً**. ويشترك مواطنو الخليج العاملون في قطر بنسبة بلدهم.` },
        { heading: 'الوافدون غير مشمولين', body: `العمال غير القطريين **غير** مشتركين في التأمينات؛ ولا يُقتطع منهم شيء. ويحصلون على **مكافأة نهاية الخدمة** وفق قانون العمل (21 يوماً من الراتب الأساسي عن كل سنة).` },
        { heading: 'مثال عملي (مواطن قطري)', body: `على راتب خاضع **10,000 ريال**:

الموظف = 10,000 × 7% = **700 ريال** تُقتطع. صاحب العمل = 10,000 × 14% = 1,400 ريال إضافةً.` },
      ],
      keyTakeaways: ['للمواطنين القطريين فقط.', 'الموظف 7% وصاحب العمل 14%، بسقف 100,000 ريال شهرياً.', 'إجمالي الاشتراك 21% من الراتب الخاضع.', 'الوافدون غير مشمولين — يحصلون على مكافأة نهاية الخدمة.'],
      faqs: [
        { q: 'كم نسبة التأمينات في قطر؟', a: 'للمواطن القطري يدفع الموظف 7% وصاحب العمل 14% من الراتب الخاضع (الأساسي مع البدلين الاجتماعي والسكن)، حتى 100,000 ريال شهرياً.' },
        { q: 'هل يدفع الوافدون التأمينات في قطر؟', a: 'لا. الوافدون غير مشمولين؛ ويحصلون على مكافأة نهاية الخدمة وفق قانون العمل.' },
        { q: 'ما سقف التأمينات في قطر؟', a: 'الراتب الخاضع بسقف 100,000 ريال شهرياً.' },
      ],
      relatedCalculators: REL, lastReviewed: R,
    },
  },

  'social-insurance-bahrain': {
    en: {
      slug: 'social-insurance-bahrain', locale: 'en',
      title: 'Bahrain Social Insurance (SIO) Contributions 2026',
      metaDescription: 'Bahrain SIO contributions for nationals: employee 8%, employer 18% (rising to 20% by 2028), up to BHD 4,000/month. Non-Bahrainis: work injury only. Example + calculator.',
      intro: 'Bahrain’s Social Insurance Organisation (SIO) covers Bahraini nationals, with the employer share rising each year to a 2028 target. Non-Bahrainis are covered for work injury only. This guide explains the rates and the phase-in, with a worked example matching the Klar calculator.',
      sections: [
        { heading: 'Bahraini nationals', body: `From January 2026, monthly SIO contributions for Bahraini employees are:

- **Employee:** 8% (7% pension + 1% unemployment).
- **Employer:** 18%, rising by one percentage point each January toward a **20%** target by 2028.

Insurable wages are capped at **BHD 4,000/month**.` },
        { heading: 'Non-Bahraini workers', body: `Non-Bahrainis are covered for **work injury only** — 3% employer and 1% employee, with no pension. GCC nationals are covered under their home country’s scheme.` },
        { heading: 'Worked example (Bahraini national)', body: `On a **1,000 BHD** salary:

Employee = 1,000 × 8% = **80 BHD** deducted. Employer = 1,000 × 18% = 180 BHD on top.` },
      ],
      keyTakeaways: ['Bahraini nationals: employee 8%, employer 18% (→ 20% by 2028).', 'Insurable wages capped at BHD 4,000/month.', 'Non-Bahrainis: work injury only (3% employer, 1% employee).', 'GCC nationals are covered under their home scheme.'],
      faqs: [
        { q: 'How much is social insurance in Bahrain?', a: 'Bahraini nationals pay 8% (7% pension + 1% unemployment) and the employer pays 18% (rising to 20% by 2028), on wages up to BHD 4,000/month.' },
        { q: 'Do expats pay social insurance in Bahrain?', a: 'Non-Bahraini workers are covered for work injury only (3% employer, 1% employee), with no pension component.' },
        { q: 'Is the Bahrain employer rate increasing?', a: 'Yes. The employer share rises one percentage point each January, targeting 20% by 2028.' },
      ],
      relatedCalculators: REL, lastReviewed: R,
    },
    ar: {
      slug: 'social-insurance-bahrain', locale: 'ar',
      title: 'اشتراكات التأمينات الاجتماعية (SIO) في البحرين 2026',
      metaDescription: 'اشتراكات التأمينات في البحرين للمواطنين: الموظف 8% وصاحب العمل 18% (ترتفع إلى 20% بحلول 2028)، حتى 4,000 دينار شهرياً. غير البحرينيين: إصابات العمل فقط. مثال وحاسبة.',
      intro: 'الهيئة العامة للتأمين الاجتماعي في البحرين تغطي المواطنين البحرينيين، مع ارتفاع حصة صاحب العمل سنوياً نحو هدف 2028. أما غير البحرينيين فيُغطَّون لإصابات العمل فقط. يوضّح هذا الدليل النسب والارتفاع التدريجي بمثال مطابق لحاسبة كلار.',
      sections: [
        { heading: 'المواطنون البحرينيون', body: `من يناير 2026، الاشتراكات الشهرية للموظف البحريني:

- **الموظف:** 8% (7% معاش + 1% تعطل).
- **صاحب العمل:** 18%، يرتفع نقطة مئوية كل يناير نحو هدف **20%** بحلول 2028.

والأجور الخاضعة بسقف **4,000 دينار شهرياً**.` },
        { heading: 'العمال غير البحرينيين', body: `يُغطَّى غير البحرينيين لإصابات العمل **فقط** — 3% على صاحب العمل و1% على الموظف، دون معاش. ومواطنو الخليج يُغطَّون وفق نظام بلدهم.` },
        { heading: 'مثال عملي (مواطن بحريني)', body: `على راتب **1,000 دينار**:

الموظف = 1,000 × 8% = **80 ديناراً** تُقتطع. صاحب العمل = 1,000 × 18% = 180 ديناراً إضافةً.` },
      ],
      keyTakeaways: ['المواطن البحريني: الموظف 8% وصاحب العمل 18% (← 20% بحلول 2028).', 'الأجور الخاضعة بسقف 4,000 دينار شهرياً.', 'غير البحرينيين: إصابات العمل فقط (3% صاحب العمل، 1% الموظف).', 'مواطنو الخليج يُغطَّون وفق نظام بلدهم.'],
      faqs: [
        { q: 'كم نسبة التأمينات في البحرين؟', a: 'يدفع المواطن البحريني 8% (7% معاش + 1% تعطل) وصاحب العمل 18% (ترتفع إلى 20% بحلول 2028)، على الأجور حتى 4,000 دينار شهرياً.' },
        { q: 'هل يدفع الوافدون التأمينات في البحرين؟', a: 'يُغطَّى غير البحرينيين لإصابات العمل فقط (3% صاحب العمل، 1% الموظف)، دون معاش.' },
        { q: 'هل ترتفع نسبة صاحب العمل في البحرين؟', a: 'نعم. ترتفع حصة صاحب العمل نقطة مئوية كل يناير، بهدف 20% بحلول 2028.' },
      ],
      relatedCalculators: REL, lastReviewed: R,
    },
  },

  'social-insurance-oman': {
    en: {
      slug: 'social-insurance-oman', locale: 'en',
      title: 'Oman Social Protection Contributions 2026',
      metaDescription: 'Oman Social Protection Fund contributions for Omani nationals: employee 8%, employer 14.5%, up to OMR 3,000/month. Non-Omanis: work injury (phased). Example + calculator.',
      intro: 'Oman’s Social Protection Fund (SPF), established by the 2023 Social Protection Law, covers Omani nationals. Coverage for non-Omanis is being phased in. This guide explains the rates, with a worked example matching the Klar calculator.',
      sections: [
        { heading: 'Omani nationals', body: `From July 2026, monthly SPF contributions for Omani employees are:

- **Employee:** 8% (7.5% old-age/disability/death + 0.5% job security).
- **Employer:** 14.5% (pension + work injury + maternity + job security + sick-leave insurance).

The insurable wage is capped at **OMR 3,000/month**.` },
        { heading: 'Non-Omani workers', body: `For non-Omanis, the work-injury scheme was deferred to 2028 and the compulsory savings system to 2027. Until then, expatriates receive the Labour Law end-of-service gratuity.` },
        { heading: 'Worked example (Omani national)', body: `On a **1,000 OMR** salary:

Employee = 1,000 × 8% = **80 OMR** deducted. Employer = 1,000 × 14.5% = 145 OMR on top.` },
      ],
      keyTakeaways: ['Omani nationals: employee 8%, employer 14.5%.', 'Insurable wage capped at OMR 3,000/month.', 'Non-Omani coverage is being phased in (savings 2027, work injury 2028).', 'Expats receive the end-of-service gratuity until then.'],
      faqs: [
        { q: 'How much is social protection in Oman?', a: 'Omani nationals pay 8% (7.5% pension + 0.5% job security) and the employer pays 14.5%, on wages up to OMR 3,000/month.' },
        { q: 'Do expats pay social insurance in Oman?', a: 'Not yet. The savings system for non-Omanis is deferred to 2027 and work injury to 2028; until then expatriates receive the end-of-service gratuity.' },
        { q: 'What is the Oman insurable wage cap?', a: 'The insurable wage is capped at OMR 3,000 per month.' },
      ],
      relatedCalculators: REL, lastReviewed: R,
    },
    ar: {
      slug: 'social-insurance-oman', locale: 'ar',
      title: 'اشتراكات الحماية الاجتماعية في عُمان 2026',
      metaDescription: 'اشتراكات صندوق الحماية الاجتماعية في عُمان للمواطنين: الموظف 8% وصاحب العمل 14.5% حتى 3,000 ريال شهرياً. غير العُمانيين: إصابات العمل (مرحلي). مثال وحاسبة.',
      intro: 'صندوق الحماية الاجتماعية في عُمان، المنشأ بقانون الحماية الاجتماعية لسنة 2023، يغطي المواطنين العُمانيين. وتُطبَّق تغطية غير العُمانيين تدريجياً. يشرح هذا الدليل النسب بمثال مطابق لحاسبة كلار.',
      sections: [
        { heading: 'المواطنون العُمانيون', body: `من يوليو 2026، الاشتراكات الشهرية للموظف العُماني:

- **الموظف:** 8% (7.5% شيخوخة/عجز/وفاة + 0.5% أمان وظيفي).
- **صاحب العمل:** 14.5% (معاش + إصابات عمل + أمومة + أمان وظيفي + تأمين إجازات مرضية).

والأجر الخاضع بسقف **3,000 ريال شهرياً**.` },
        { heading: 'العمال غير العُمانيين', body: `لغير العُمانيين، أُجّل نظام إصابات العمل إلى 2028 ونظام الادخار الإلزامي إلى 2027. وحتى ذلك الحين يحصل الوافدون على مكافأة نهاية الخدمة وفق قانون العمل.` },
        { heading: 'مثال عملي (مواطن عُماني)', body: `على راتب **1,000 ريال**:

الموظف = 1,000 × 8% = **80 ريالاً** تُقتطع. صاحب العمل = 1,000 × 14.5% = 145 ريالاً إضافةً.` },
      ],
      keyTakeaways: ['المواطن العُماني: الموظف 8% وصاحب العمل 14.5%.', 'الأجر الخاضع بسقف 3,000 ريال شهرياً.', 'تغطية غير العُمانيين مرحلية (الادخار 2027، إصابات العمل 2028).', 'الوافدون يحصلون على مكافأة نهاية الخدمة حتى ذلك الحين.'],
      faqs: [
        { q: 'كم نسبة الحماية الاجتماعية في عُمان؟', a: 'يدفع المواطن العُماني 8% (7.5% معاش + 0.5% أمان وظيفي) وصاحب العمل 14.5%، على الأجور حتى 3,000 ريال شهرياً.' },
        { q: 'هل يدفع الوافدون التأمينات في عُمان؟', a: 'ليس بعد. أُجّل نظام الادخار لغير العُمانيين إلى 2027 وإصابات العمل إلى 2028؛ وحتى ذلك الحين يحصل الوافدون على مكافأة نهاية الخدمة.' },
        { q: 'ما سقف الأجر الخاضع في عُمان؟', a: 'الأجر الخاضع بسقف 3,000 ريال شهرياً.' },
      ],
      relatedCalculators: REL, lastReviewed: R,
    },
  },
};

export default socialInsuranceGuides;
