import type { GuideContent } from './types';
import type { Locale } from '../config/site';

/**
 * Per-country maternity-leave guides. Numbers mirror the country-rules engine
 * (src/lib/country-rules/*): the day counts, articles, and paid/unpaid splits
 * below are the accurate source and must not be changed without updating the
 * engine first. Each country gets its own section headings, worked example,
 * and FAQs — written around what is actually distinct about that country's
 * rule (timing, eligibility, job protection, pay splits), not a shared
 * template with the country name swapped in.
 *
 * Last reviewed: 2026-10-01.
 */
const REVIEWED = '2026-10-01';
const REL = ['maternity-leave', 'leave-balance', 'notice-period'];

const maternityGuides: Record<string, Record<Locale, GuideContent>> = {
  /* ───────────────────────── Jordan ───────────────────────── */
  'maternity-leave-jordan': {
    en: {
      slug: 'maternity-leave-jordan',
      locale: 'en',
      title: 'Jordan Maternity Leave: 90 Days (2026)',
      metaDescription:
        'Jordan grants 90 continuous days of paid maternity leave under Labour Law Art. 70. Who qualifies, how it is paid, and the calculator.',
      intro:
        'Jordanian law gives working mothers 90 continuous days of paid leave around childbirth, with the timing largely left to the employee and strong protection against dismissal. Here is how the entitlement works, how it can be split around the delivery date, and what the law says if an employer tries to end the contract while an employee is on it.',
      sections: [
        {
          heading: 'How much leave and pay',
          body: `Article 70 of the Labour Law entitles a pregnant employee to **90 continuous days** of maternity leave on full pay. The leave is paid in full by the employer — it is not a reduced-pay or unpaid entitlement — so the usual wage continues throughout the 90 days.`,
        },
        {
          heading: 'Splitting the leave around delivery',
          body: `The 90 days do not have to start on the delivery date. The law allows the leave to be taken **partly before and partly after** the birth, so an employee can begin resting in the final weeks of pregnancy and still have most of the period left to recover and bond with the newborn afterward.`,
        },
        {
          heading: 'Job protection during and after leave',
          body: `Dismissal connected to the pregnancy or to taking maternity leave is prohibited. An employer cannot use the leave itself, or the underlying pregnancy, as grounds to end the employment relationship.`,
        },
        {
          heading: 'What this looks like in practice',
          body: `In practice, an employee due to deliver in mid-month might take the final 2–3 weeks before birth as part of her 90 days, then use the remainder — roughly 9–10 weeks — for recovery and newborn care after delivery, all on full pay. The exact split is left to the employee, as long as the total stays within the 90-day entitlement.`,
        },
      ],
      keyTakeaways: [
        '90 continuous days of maternity leave, paid in full.',
        'Days can be split before and after the delivery date.',
        'Dismissal linked to pregnancy or maternity leave is prohibited.',
      ],
      faqs: [
        { q: 'How many days of maternity leave does Jordan give?', a: 'Ninety continuous days on full pay, under Article 70 of the Labour Law.' },
        { q: 'Can I take some of my 90 days before I give birth in Jordan?', a: 'Yes. The law lets you split the entitlement, taking part of the 90 days before delivery and the rest afterward, rather than requiring it all to start on the birth date.' },
        { q: 'Can my employer end my contract while I am on maternity leave in Jordan?', a: 'No. Dismissal connected to the pregnancy or to the maternity leave itself is prohibited under Jordanian labour law.' },
      ],
      relatedCalculators: REL,
      lastReviewed: REVIEWED,
    },
    ar: {
      slug: 'maternity-leave-jordan',
      locale: 'ar',
      title: 'إجازة الأمومة في الأردن: 90 يوماً (2026)',
      metaDescription:
        'يمنح الأردن 90 يوماً متصلة من إجازة الأمومة المدفوعة بموجب المادة 70 من قانون العمل. من يستحقها وكيف تُدفع والحاسبة.',
      intro:
        'يمنح قانون العمل الأردني الأم العاملة 90 يوماً متصلة من الإجازة المدفوعة حول موعد الولادة، مع ترك توقيتها إلى حدٍّ كبير للموظفة وحماية قوية من الفصل. فيما يلي كيف يُطبّق الاستحقاق، وكيف يمكن تقسيمه حول موعد الوضع، وما يقوله القانون إذا حاول صاحب العمل إنهاء العقد أثناء الإجازة.',
      sections: [
        {
          heading: 'مقدار الإجازة والأجر',
          body: `تمنح المادة 70 من قانون العمل الموظفة الحامل **90 يوماً متصلة** من إجازة الأمومة بأجر كامل. والإجازة مدفوعة بالكامل من صاحب العمل — فهي ليست استحقاقاً بأجر مخفّض أو دون أجر — فيستمر الراتب المعتاد طوال الـ90 يوماً.`,
        },
        {
          heading: 'تقسيم الإجازة حول موعد الوضع',
          body: `لا يلزم أن تبدأ الـ90 يوماً من تاريخ الولادة نفسه. فالقانون يسمح بأخذ الإجازة **جزئياً قبل الوضع وجزئياً بعده**، فتستطيع الموظفة أن تبدأ الراحة في الأسابيع الأخيرة من الحمل وتبقى لها معظم المدة للتعافي ورعاية المولود بعد الولادة.`,
        },
        {
          heading: 'الحماية الوظيفية خلال الإجازة وبعدها',
          body: `يُحظر الفصل المرتبط بالحمل أو بأخذ إجازة الأمومة. فلا يجوز لصاحب العمل أن يستخدم الإجازة نفسها، أو الحمل الذي تقوم عليه، سبباً لإنهاء عقد العمل.`,
        },
        {
          heading: 'كيف يبدو ذلك عملياً',
          body: `عملياً، يمكن لموظفة موعد وضعها في منتصف الشهر أن تأخذ الأسبوعين أو الثلاثة الأخيرة قبل الولادة كجزء من الـ90 يوماً، ثم تستخدم الباقي — نحو 9 إلى 10 أسابيع — للتعافي ورعاية المولود بعد الوضع، وكل ذلك بأجر كامل. والتقسيم الدقيق متروك للموظفة ما دام الإجمالي ضمن الـ90 يوماً المستحقة.`,
        },
      ],
      keyTakeaways: [
        '90 يوماً متصلة من إجازة الأمومة، مدفوعة بالكامل.',
        'يمكن تقسيم الأيام قبل موعد الوضع وبعده.',
        'يُحظر الفصل المرتبط بالحمل أو بإجازة الأمومة.',
      ],
      faqs: [
        { q: 'كم يوماً إجازة أمومة يمنحها الأردن؟', a: 'تسعون يوماً متصلة بأجر كامل، بموجب المادة 70 من قانون العمل.' },
        { q: 'هل يمكنني أخذ جزء من الـ90 يوماً قبل الولادة في الأردن؟', a: 'نعم. يسمح القانون بتقسيم الاستحقاق، بأخذ جزء من الـ90 يوماً قبل الوضع والباقي بعده، دون أن يُفرض أن تبدأ من تاريخ الولادة.' },
        { q: 'هل يمكن لصاحب العمل إنهاء عقدي وأنا على إجازة الأمومة في الأردن؟', a: 'لا. يُحظر الفصل المرتبط بالحمل أو بإجازة الأمومة نفسها بموجب قانون العمل الأردني.' },
      ],
      relatedCalculators: REL,
      lastReviewed: REVIEWED,
    },
  },

  /* ──────────────────── Saudi Arabia ──────────────────── */
  'maternity-leave-saudi-arabia': {
    en: {
      slug: 'maternity-leave-saudi-arabia',
      locale: 'en',
      title: 'Saudi Maternity Leave: 12 Weeks (2026)',
      metaDescription:
        'Saudi Arabia grants 12 weeks (84 days) of paid maternity leave under Labour Law Art. 151, with 6 weeks mandatory after birth. Calculator + details.',
      intro:
        "Saudi Arabia's 2025-amended Labour Law gives working mothers 12 weeks of paid maternity leave, part of it fixed and part flexible. The key thing to plan around is which weeks are mandatory and which can be placed before or after the birth — covered below with a worked example.",
      sections: [
        {
          heading: 'How much leave and pay',
          body: `Article 151, as amended in 2025, entitles an employee to **12 weeks (84 days)** of paid maternity leave.`,
        },
        {
          heading: 'The mandatory post-birth period',
          body: `At least **6 weeks must be taken after the birth** — this portion is mandatory and cannot be skipped or shortened, giving the mother a guaranteed recovery period once the baby arrives.`,
        },
        {
          heading: 'Flexible weeks and the pre-birth limit',
          body: `The remaining weeks are at the employee's discretion. Up to **4 weeks may be taken before the due date**, for example to rest in the final stage of pregnancy; any discretionary weeks not used before birth can instead be added to the recovery period afterward.`,
        },
        {
          heading: 'Worked example',
          body: `An employee who takes the maximum 4 weeks before her due date still has 8 weeks left for after the birth — comfortably covering the mandatory 6-week post-birth minimum, with 2 weeks to spare. An employee who prefers to work right up to her due date instead keeps all 12 weeks for after delivery, split between the mandatory 6 weeks and 6 discretionary weeks.`,
        },
      ],
      keyTakeaways: [
        '12 weeks (84 days) of paid maternity leave under Article 151.',
        'At least 6 weeks are mandatory after birth.',
        'Up to 4 weeks of the total may be taken before the due date.',
      ],
      faqs: [
        { q: 'How many weeks of maternity leave does Saudi Arabia give?', a: '12 weeks (84 days) of paid leave under Article 151 of the Labour Law, as amended in 2025.' },
        { q: 'Do I have to take maternity leave before my due date in Saudi Arabia?', a: 'No. Taking leave before the due date is optional, up to 4 weeks; you can instead keep the full 12 weeks for after the birth.' },
        { q: 'Is there a minimum amount of Saudi maternity leave I must take after giving birth?', a: 'Yes — at least 6 of the 12 weeks are mandatory after birth and cannot be waived.' },
      ],
      relatedCalculators: REL,
      lastReviewed: REVIEWED,
    },
    ar: {
      slug: 'maternity-leave-saudi-arabia',
      locale: 'ar',
      title: 'إجازة الأمومة في السعودية: 12 أسبوعاً (2026)',
      metaDescription:
        'تمنح السعودية 12 أسبوعاً (84 يوماً) من إجازة الأمومة المدفوعة بموجب المادة 151، مع 6 أسابيع إلزامية بعد الولادة. حاسبة وتفاصيل.',
      intro:
        'يمنح نظام العمل السعودي، بتعديلاته لعام 2025، الأم العاملة 12 أسبوعاً من إجازة الأمومة المدفوعة، جزء منها ثابت وجزء مرن. والمهم في التخطيط هو معرفة الأسابيع الإلزامية والأسابيع التي يمكن وضعها قبل الولادة أو بعدها — وهو ما نشرحه أدناه مع مثال عملي.',
      sections: [
        {
          heading: 'مقدار الإجازة والأجر',
          body: `تمنح المادة 151، المعدّلة في 2025، الموظفة **12 أسبوعاً (84 يوماً)** من إجازة الأمومة المدفوعة.`,
        },
        {
          heading: 'المدة الإلزامية بعد الولادة',
          body: `يجب أخذ **6 أسابيع على الأقل بعد الولادة** — وهذا الجزء إلزامي ولا يمكن تجاوزه أو تقليصه، بما يضمن للأم فترة تعافٍ مؤكدة بعد قدوم المولود.`,
        },
        {
          heading: 'الأسابيع المرنة وحد ما قبل الولادة',
          body: `تُؤخذ بقية الأسابيع بحسب رغبة الموظفة. ويمكن أخذ **حتى 4 أسابيع قبل الموعد المتوقع**، مثلاً للراحة في المرحلة الأخيرة من الحمل؛ وأي أسابيع اختيارية لم تُستخدم قبل الولادة يمكن إضافتها إلى فترة التعافي بعدها.`,
        },
        {
          heading: 'مثال عملي',
          body: `موظفة تأخذ الحد الأقصى، 4 أسابيع، قبل موعدها المتوقع، يتبقى لها 8 أسابيع بعد الولادة — وهذا يكفي بسهولة الحد الأدنى الإلزامي البالغ 6 أسابيع بعد الولادة، مع أسبوعين إضافيين. أما موظفة تفضّل العمل حتى موعدها المتوقع، فتحتفظ بكامل الـ12 أسبوعاً لما بعد الولادة، مقسّمة بين 6 أسابيع إلزامية و6 أسابيع اختيارية.`,
        },
      ],
      keyTakeaways: [
        '12 أسبوعاً (84 يوماً) من إجازة الأمومة المدفوعة بموجب المادة 151.',
        '6 أسابيع على الأقل إلزامية بعد الولادة.',
        'يمكن أخذ حتى 4 أسابيع من الإجمالي قبل الموعد المتوقع.',
      ],
      faqs: [
        { q: 'كم أسبوعاً إجازة أمومة تمنحها السعودية؟', a: '12 أسبوعاً (84 يوماً) بأجر مدفوع بموجب المادة 151 من نظام العمل المعدّلة في 2025.' },
        { q: 'هل يجب أن أخذ إجازة قبل موعد ولادتي في السعودية؟', a: 'لا. أخذ إجازة قبل الموعد المتوقع اختياري، وبحد أقصى 4 أسابيع؛ ويمكنك الاحتفاظ بكامل الـ12 أسبوعاً لما بعد الولادة.' },
        { q: 'هل هناك حد أدنى من إجازة الأمومة يجب أخذه بعد الولادة في السعودية؟', a: 'نعم — 6 أسابيع على الأقل من الـ12 إلزامية بعد الولادة ولا يمكن التنازل عنها.' },
      ],
      relatedCalculators: REL,
      lastReviewed: REVIEWED,
    },
  },

  /* ───────────────────────── UAE ───────────────────────── */
  'maternity-leave-uae': {
    en: {
      slug: 'maternity-leave-uae',
      locale: 'en',
      title: 'UAE Maternity Leave: 60 Days (2026)',
      metaDescription:
        'UAE maternity leave is 60 days under Federal Decree-Law 33/2021: 45 days full pay + 15 days half pay, with options for unpaid extension. Calculator + details.',
      intro:
        "UAE maternity leave under Federal Decree-Law 33/2021 runs 60 days, but it is not paid at one flat rate throughout — the pay rate steps down partway through, and the law allows extra time off beyond the 60 days in some circumstances. Here is how the pay works and what happens if more time is needed.",
      sections: [
        {
          heading: 'How the 60 days are paid',
          body: `Article 30 grants **60 days** of maternity leave split into two pay tiers: the first **45 days on full pay**, followed by **15 days on half pay**. So the paid rate steps down for the final two weeks rather than staying constant across the whole leave.`,
        },
        {
          heading: 'Extending beyond 60 days',
          body: `Once the standard 60 days are used, the Implementing Regulation allows for an **additional unpaid extension** in certain circumstances, such as on medical grounds — for example if a doctor certifies the mother or baby needs more recovery time.`,
        },
        {
          heading: 'Worked example',
          body: `On a monthly salary basis, an employee earns her normal pay for the first 45 days, then half of that daily rate for the next 15 days, for a combined 60 days of leave. If a doctor then certifies she needs more time, she can apply for the unpaid extension under the regulation rather than returning to work immediately.`,
        },
      ],
      keyTakeaways: [
        '60 days total: 45 at full pay, then 15 at half pay.',
        'The pay rate steps down for the last 15 days only.',
        'An unpaid extension is available under the Implementing Regulation, e.g. on medical grounds.',
      ],
      faqs: [
        { q: 'How is UAE maternity leave split between full and half pay?', a: 'The first 45 days are paid in full, and the remaining 15 days are paid at half rate, for a total of 60 days under Article 30.' },
        { q: 'Can I take more than 60 days of maternity leave in the UAE?', a: 'Yes, in some cases. The Implementing Regulation allows an additional unpaid extension, for example on medical grounds.' },
        { q: 'Do the half-pay days come before or after the full-pay days in the UAE?', a: 'After. The leave always starts with the 45 days of full pay; the half-pay rate covers only the final 15 days.' },
      ],
      relatedCalculators: REL,
      lastReviewed: REVIEWED,
    },
    ar: {
      slug: 'maternity-leave-uae',
      locale: 'ar',
      title: 'إجازة الأمومة في الإمارات: 60 يوماً (2026)',
      metaDescription:
        'إجازة الأمومة في الإمارات 60 يوماً بموجب المرسوم 33 لسنة 2021: 45 يوماً بأجر كامل + 15 يوماً بنصف أجر، مع خيارات تمديد دون أجر. حاسبة وتفاصيل.',
      intro:
        'إجازة الأمومة في الإمارات بموجب المرسوم بقانون اتحادي 33 لسنة 2021 مدتها 60 يوماً، لكنها ليست مدفوعة بمعدل ثابت طوال المدة — فمعدل الأجر ينخفض في جزء منها، ويسمح القانون بوقت إضافي بعد الـ60 يوماً في بعض الحالات. وفيما يلي كيف يُحسب الأجر وماذا يحدث إذا احتاجت الموظفة وقتاً أطول.',
      sections: [
        {
          heading: 'كيف تُدفع الـ60 يوماً',
          body: `تمنح المادة 30 **60 يوماً** من إجازة الأمومة مقسّمة على درجتين من الأجر: أول **45 يوماً بأجر كامل**، تليها **15 يوماً بنصف أجر**. فمعدل الأجر ينخفض في الأسبوعين الأخيرين فقط، لا طوال الإجازة.`,
        },
        {
          heading: 'التمديد بعد الـ60 يوماً',
          body: `بعد استخدام الـ60 يوماً الأساسية، تسمح اللائحة التنفيذية بـ**تمديد إضافي دون أجر** في حالات معيّنة، مثل الأسباب الطبية — كأن يثبت الطبيب حاجة الأم أو الطفل إلى مزيد من وقت التعافي.`,
        },
        {
          heading: 'مثال عملي',
          body: `على أساس الراتب الشهري، تحصل الموظفة على أجرها الكامل المعتاد عن أول 45 يوماً، ثم نصف ذلك المعدل اليومي عن الـ15 يوماً التالية، أي 60 يوماً إجازة إجمالاً. وإذا أثبت الطبيب حاجتها إلى مزيد من الوقت، يمكنها طلب التمديد دون أجر بموجب اللائحة بدل العودة إلى العمل فوراً.`,
        },
      ],
      keyTakeaways: [
        '60 يوماً إجمالاً: 45 بأجر كامل ثم 15 بنصف أجر.',
        'ينخفض معدل الأجر في الـ15 يوماً الأخيرة فقط، لا قبلها.',
        'يتاح تمديد دون أجر وفق اللائحة التنفيذية، مثلاً لأسباب طبية.',
      ],
      faqs: [
        { q: 'كيف تُقسّم إجازة الأمومة في الإمارات بين الأجر الكامل والنصف؟', a: 'أول 45 يوماً بأجر كامل، والـ15 يوماً المتبقية بنصف الأجر، أي 60 يوماً إجمالاً بموجب المادة 30.' },
        { q: 'هل يمكنني أخذ أكثر من 60 يوماً إجازة أمومة في الإمارات؟', a: 'نعم، في بعض الحالات. تسمح اللائحة التنفيذية بتمديد إضافي دون أجر، مثلاً لأسباب طبية.' },
        { q: 'هل تأتي أيام نصف الأجر قبل أيام الأجر الكامل أم بعدها في الإمارات؟', a: 'بعدها. تبدأ الإجازة دائماً بـ45 يوماً بأجر كامل، ويغطي نصف الأجر الـ15 يوماً الأخيرة فقط.' },
      ],
      relatedCalculators: REL,
      lastReviewed: REVIEWED,
    },
  },

  /* ───────────────────────── Kuwait ───────────────────────── */
  'maternity-leave-kuwait': {
    en: {
      slug: 'maternity-leave-kuwait',
      locale: 'en',
      title: 'Kuwait Maternity Leave: 70 Days (2026)',
      metaDescription:
        'Kuwait grants 70 days of paid maternity leave under Labour Law Art. 24 — 30 days before and 40 days after the expected delivery date. Calculator + details.',
      intro:
        "Kuwait's Labour Law gives working mothers 70 days of fully paid maternity leave, timed around the expected delivery date rather than the actual one, with room for further unpaid leave afterward if needed.",
      sections: [
        {
          heading: 'How much leave and pay',
          body: `Article 24 entitles an employee to **70 days** of maternity leave on full pay.`,
        },
        {
          heading: 'Timing: before and after the due date',
          body: `The 70 days are fixed around the **expected delivery date**: **30 days before** and **40 days after** it — not the actual birth date, so the split is set in advance rather than adjusted once the baby arrives.`,
        },
        {
          heading: 'After the 70 days',
          body: `If more time is needed once the 70 days end, the law allows for **additional unpaid leave** to be granted afterward.`,
        },
        {
          heading: 'Worked example',
          body: `For an employee with an expected delivery date of the 15th of a month, the leave would typically begin around the 15th of the previous month (the 30 days before) and run through roughly 40 days past the expected date — a fixed 70-day window built around that due date, regardless of whether the baby arrives early or late.`,
        },
      ],
      keyTakeaways: [
        '70 days of maternity leave on full pay.',
        'Split as 30 days before and 40 days after the expected delivery date.',
        'Further unpaid leave may be granted after the 70 days.',
      ],
      faqs: [
        { q: "How are Kuwait's 70 maternity days split?", a: '30 days before the expected delivery date and 40 days after it, for a total of 70 days on full pay under Article 24.' },
        { q: "Is Kuwait's 70-day split based on my actual delivery date?", a: 'No — it is fixed around the expected delivery date, not the actual one.' },
        { q: "What if I need more time off after Kuwait's 70 days end?", a: 'The law allows additional unpaid leave to be granted after the 70 paid days, if needed.' },
      ],
      relatedCalculators: REL,
      lastReviewed: REVIEWED,
    },
    ar: {
      slug: 'maternity-leave-kuwait',
      locale: 'ar',
      title: 'إجازة الأمومة في الكويت: 70 يوماً (2026)',
      metaDescription:
        'يمنح الكويت 70 يوماً من إجازة الأمومة المدفوعة بموجب المادة 24 — 30 يوماً قبل الوضع و40 يوماً بعده. حاسبة وتفاصيل.',
      intro:
        'يمنح قانون العمل الكويتي الأم العاملة 70 يوماً من إجازة الأمومة بأجر كامل، مرتبطة بموعد الولادة المتوقع لا الفعلي، مع إمكانية الحصول على إجازة إضافية دون أجر بعدها إذا لزم الأمر.',
      sections: [
        {
          heading: 'مقدار الإجازة والأجر',
          body: `تمنح المادة 24 الموظفة **70 يوماً** من إجازة الأمومة بأجر كامل.`,
        },
        {
          heading: 'التوقيت: قبل الموعد المتوقع وبعده',
          body: `تُحدَّد الـ70 يوماً حول **الموعد المتوقع للوضع**: **30 يوماً قبله** و**40 يوماً بعده** — لا تاريخ الولادة الفعلي، فالتقسيم محدد مسبقاً لا يُعدَّل بعد قدوم المولود.`,
        },
        {
          heading: 'ما بعد الـ70 يوماً',
          body: `إذا احتاجت الموظفة وقتاً أطول بعد انتهاء الـ70 يوماً، يسمح القانون بمنح **إجازة إضافية دون أجر** بعدها.`,
        },
        {
          heading: 'مثال عملي',
          body: `بالنسبة لموظفة موعد وضعها المتوقع هو الخامس عشر من الشهر، تبدأ الإجازة عادة من نحو الخامس عشر من الشهر السابق (الـ30 يوماً قبل الموعد) وتمتد نحو 40 يوماً بعد الموعد المتوقع — نافذة ثابتة من 70 يوماً مبنية على ذلك الموعد، سواء وُلد الطفل باكراً أو متأخراً.`,
        },
      ],
      keyTakeaways: [
        '70 يوماً من إجازة الأمومة بأجر كامل.',
        'تُقسّم إلى 30 يوماً قبل الموعد المتوقع للوضع و40 يوماً بعده.',
        'يمكن منح إجازة إضافية دون أجر بعد انتهاء الـ70 يوماً.',
      ],
      faqs: [
        { q: 'كيف تُقسّم أيام إجازة الأمومة الـ70 في الكويت؟', a: '30 يوماً قبل الموعد المتوقع للوضع و40 يوماً بعده، أي 70 يوماً إجمالاً بأجر كامل بموجب المادة 24.' },
        { q: 'هل يُحدَّد تقسيم الـ70 يوماً في الكويت على أساس تاريخ الولادة الفعلي؟', a: 'لا — يُحدَّد حول الموعد المتوقع للوضع، لا التاريخ الفعلي.' },
        { q: 'ماذا لو احتجت وقتاً أطول بعد انتهاء الـ70 يوماً في الكويت؟', a: 'يسمح القانون بمنح إجازة إضافية دون أجر بعد انتهاء الـ70 يوماً المدفوعة، إذا لزم الأمر.' },
      ],
      relatedCalculators: REL,
      lastReviewed: REVIEWED,
    },
  },

  /* ───────────────────────── Qatar ───────────────────────── */
  'maternity-leave-qatar': {
    en: {
      slug: 'maternity-leave-qatar',
      locale: 'en',
      title: 'Qatar Maternity Leave: 50 Days (2026)',
      metaDescription:
        'Qatar grants 50 days of paid maternity leave under Labour Law Art. 96 after one year of service, at least 35 days after delivery. Calculator + details.',
      intro:
        "Qatar's Labour Law ties maternity leave to length of service: the 50-day paid entitlement only opens up after a year on the job, and most of it is reserved for after the birth rather than before. Dismissal during the leave is also explicitly barred.",
      sections: [
        {
          heading: 'Eligibility: one year of service',
          body: `Article 96 makes the **50-day** paid maternity leave available only after **one year of continuous service** with the employer — it is not available from the first day of employment.`,
        },
        {
          heading: 'How the 50 days are timed',
          body: `Of the 50 calendar days, at least **35 days must fall after delivery** — meaning no more than 15 days can be taken before the birth, with the bulk of the leave reserved for post-delivery recovery.`,
        },
        {
          heading: 'Job protection',
          body: `Dismissal during maternity leave is prohibited, so the employer cannot end the employment relationship while the employee is on this leave.`,
        },
        {
          heading: 'Worked example',
          body: `An employee with one year of service who wants to rest before her due date could take up to 15 days beforehand, leaving at least 35 days afterward for recovery — or she could forgo the pre-birth days entirely and use the full 50 days after delivery.`,
        },
      ],
      keyTakeaways: [
        '50 days of paid maternity leave, available after one year of continuous service.',
        'At least 35 of the 50 days must be taken after delivery.',
        'Dismissal during maternity leave is prohibited.',
      ],
      faqs: [
        { q: 'Do I need a minimum length of service to get maternity leave in Qatar?', a: 'Yes — Article 96 requires one year of continuous service before the 50-day entitlement applies.' },
        { q: "How many of Qatar's 50 maternity days must come after delivery?", a: 'At least 35 days; no more than 15 of the 50 days can be taken before the birth.' },
        { q: 'Can I be dismissed while on maternity leave in Qatar?', a: 'No. Dismissal during maternity leave is prohibited under the Labour Law.' },
      ],
      relatedCalculators: REL,
      lastReviewed: REVIEWED,
    },
    ar: {
      slug: 'maternity-leave-qatar',
      locale: 'ar',
      title: 'إجازة الأمومة في قطر: 50 يوماً (2026)',
      metaDescription:
        'يمنح قطر 50 يوماً من إجازة الأمومة المدفوعة بموجب المادة 96 بعد سنة خدمة، 35 يوماً منها بعد الولادة على الأقل. حاسبة وتفاصيل.',
      intro:
        'يربط قانون العمل القطري إجازة الأمومة بمدة الخدمة: فاستحقاق الـ50 يوماً المدفوعة لا يتاح إلا بعد سنة في العمل، ومعظمه مخصص لما بعد الولادة لا قبلها. كما يحظر القانون صريحاً الفصل أثناء هذه الإجازة.',
      sections: [
        {
          heading: 'الاستحقاق: سنة خدمة',
          body: `تجعل المادة 96 إجازة الأمومة المدفوعة البالغة **50 يوماً** متاحة فقط بعد **سنة خدمة متصلة** لدى صاحب العمل — فهي ليست متاحة من أول يوم عمل.`,
        },
        {
          heading: 'توقيت الـ50 يوماً',
          body: `من بين الـ50 يوماً التقويمية، يجب أن يقع **35 يوماً على الأقل بعد الولادة** — أي لا يمكن أخذ أكثر من 15 يوماً قبل الوضع، مع تخصيص الجزء الأكبر من الإجازة للتعافي بعد الولادة.`,
        },
        {
          heading: 'الحماية الوظيفية',
          body: `يُحظر الفصل أثناء إجازة الأمومة، فلا يجوز لصاحب العمل إنهاء علاقة العمل أثناء وجود الموظفة على هذه الإجازة.`,
        },
        {
          heading: 'مثال عملي',
          body: `موظفة أكملت سنة خدمة وتريد الراحة قبل موعد وضعها يمكنها أخذ حتى 15 يوماً قبله، ليبقى لها 35 يوماً على الأقل بعده للتعافي — أو يمكنها التنازل عن أيام ما قبل الولادة كلياً واستخدام الـ50 يوماً كاملة بعد الوضع.`,
        },
      ],
      keyTakeaways: [
        '50 يوماً من إجازة الأمومة المدفوعة، تتاح بعد سنة خدمة متصلة.',
        '35 يوماً على الأقل من الـ50 يوماً يجب أخذها بعد الولادة.',
        'يُحظر الفصل أثناء إجازة الأمومة.',
      ],
      faqs: [
        { q: 'هل أحتاج مدة خدمة معينة للحصول على إجازة أمومة في قطر؟', a: 'نعم — تتطلب المادة 96 سنة خدمة متصلة قبل أن يسري استحقاق الـ50 يوماً.' },
        { q: 'كم يوماً من الـ50 يوماً في قطر يجب أن يكون بعد الولادة؟', a: '35 يوماً على الأقل؛ ولا يمكن أخذ أكثر من 15 يوماً من الـ50 قبل الوضع.' },
        { q: 'هل يمكن فصلي أثناء إجازة الأمومة في قطر؟', a: 'لا. يُحظر الفصل أثناء إجازة الأمومة بموجب قانون العمل.' },
      ],
      relatedCalculators: REL,
      lastReviewed: REVIEWED,
    },
  },

  /* ───────────────────────── Bahrain ───────────────────────── */
  'maternity-leave-bahrain': {
    en: {
      slug: 'maternity-leave-bahrain',
      locale: 'en',
      title: 'Bahrain Maternity Leave: 60 Days (2026)',
      metaDescription:
        'Bahrain grants 60 days of paid maternity leave under Labour Law Art. 32, plus an optional 15 unpaid days; work in the 40 days after birth is prohibited. Calculator.',
      intro:
        "Bahrain's Labour Law provides 60 fully paid maternity days with an optional unpaid top-up, alongside a strict rule that bars working at all for the weeks immediately following birth.",
      sections: [
        {
          heading: 'How much leave and pay',
          body: `Article 32 entitles an employee to **60 days** of maternity leave on full pay.`,
        },
        {
          heading: 'An optional unpaid extension',
          body: `Beyond the standard 60 days, an employee may also take an **optional 15 additional unpaid days**, for a possible 75 days total if she chooses to use them.`,
        },
        {
          heading: 'No work in the weeks after birth',
          body: `Employment is **prohibited in the 40 days following childbirth** — this is a mandatory recovery period during which the employee cannot be required or permitted to work, regardless of how her 60 paid days are used.`,
        },
        {
          heading: 'Worked example',
          body: `An employee could use some of her 60 paid days before delivery and the rest after; either way, the 40 days immediately following the birth are protected and off-limits to work. If she needs more time beyond the 60 paid days, she can add up to 15 unpaid days on top.`,
        },
      ],
      keyTakeaways: [
        '60 days of maternity leave on full pay.',
        'An optional 15 additional unpaid days can extend the leave to 75 days.',
        'Working in the 40 days after childbirth is prohibited outright.',
      ],
      faqs: [
        { q: "Can I extend Bahrain's 60-day maternity leave?", a: 'Yes — an optional 15 additional unpaid days are available on top of the 60 paid days.' },
        { q: 'Can I go back to work right after giving birth in Bahrain?', a: 'No. Employment is prohibited for the 40 days immediately following childbirth, regardless of how the rest of the leave is used.' },
        { q: "Is Bahrain's standard 60-day maternity leave fully paid?", a: 'Yes, the 60 days under Article 32 are on full pay; only the additional 15-day extension is unpaid.' },
      ],
      relatedCalculators: REL,
      lastReviewed: REVIEWED,
    },
    ar: {
      slug: 'maternity-leave-bahrain',
      locale: 'ar',
      title: 'إجازة الأمومة في البحرين: 60 يوماً (2026)',
      metaDescription:
        'يمنح البحرين 60 يوماً من إجازة الأمومة المدفوعة بموجب المادة 32، مع 15 يوماً إضافية دون أجر اختيارياً؛ ويُحظر العمل في الـ40 يوماً بعد الولادة. حاسبة.',
      intro:
        'يمنح قانون العمل البحريني 60 يوماً من إجازة الأمومة بأجر كامل مع إمكانية تمديد اختياري دون أجر، إلى جانب قاعدة صارمة تحظر العمل كلياً في الأسابيع التالية مباشرة للولادة.',
      sections: [
        {
          heading: 'مقدار الإجازة والأجر',
          body: `تمنح المادة 32 الموظفة **60 يوماً** من إجازة الأمومة بأجر كامل.`,
        },
        {
          heading: 'تمديد اختياري دون أجر',
          body: `بالإضافة إلى الـ60 يوماً الأساسية، يجوز للموظفة أخذ **15 يوماً إضافية اختيارية دون أجر**، لتصل الإجازة إلى 75 يوماً إذا اختارت استخدامها.`,
        },
        {
          heading: 'حظر العمل في الأسابيع التالية للولادة',
          body: `يُحظر العمل في **الأربعين يوماً التالية للوضع** — وهي فترة تعافٍ إلزامية لا يجوز فيها تكليف الموظفة بالعمل أو السماح لها به، بصرف النظر عن كيفية استخدام الـ60 يوماً المدفوعة.`,
        },
        {
          heading: 'مثال عملي',
          body: `يمكن للموظفة استخدام بعض الـ60 يوماً المدفوعة قبل الوضع والباقي بعده؛ وفي الحالتين، تبقى الأربعون يوماً التالية مباشرة للولادة محمية ومحظور العمل خلالها. وإذا احتاجت وقتاً أطول بعد الـ60 يوماً المدفوعة، يمكنها إضافة حتى 15 يوماً دون أجر.`,
        },
      ],
      keyTakeaways: [
        '60 يوماً من إجازة الأمومة بأجر كامل.',
        '15 يوماً إضافية اختيارية دون أجر يمكن أن تمدّد الإجازة إلى 75 يوماً.',
        'يُحظر العمل كلياً في الأربعين يوماً التالية للولادة.',
      ],
      faqs: [
        { q: 'هل يمكن تمديد إجازة الأمومة الـ60 يوماً في البحرين؟', a: 'نعم — يتاح 15 يوماً إضافية اختيارية دون أجر فوق الـ60 يوماً المدفوعة.' },
        { q: 'هل يمكنني العودة إلى العمل بعد الولادة مباشرة في البحرين؟', a: 'لا. يُحظر العمل في الأربعين يوماً التالية مباشرة للولادة، بصرف النظر عن كيفية استخدام بقية الإجازة.' },
        { q: 'هل إجازة الأمومة الأساسية في البحرين (60 يوماً) مدفوعة بالكامل؟', a: 'نعم، الـ60 يوماً بموجب المادة 32 بأجر كامل؛ والتمديد الإضافي البالغ 15 يوماً فقط هو دون أجر.' },
      ],
      relatedCalculators: REL,
      lastReviewed: REVIEWED,
    },
  },

  /* ───────────────────────── Oman ───────────────────────── */
  'maternity-leave-oman': {
    en: {
      slug: 'maternity-leave-oman',
      locale: 'en',
      title: 'Oman Maternity Leave: 98 Days (2026)',
      metaDescription:
        'Oman grants 98 days of maternity leave under Labour Law (RD 53/2023) Art. 84, covering before and after childbirth, plus 7 days paternity leave. Calculator.',
      intro:
        "Oman's 2023 Labour Law gives working mothers 98 days of maternity leave — one of the most generous entitlements in the region — with a capped pre-birth portion and a separate paternity entitlement for fathers.",
      sections: [
        {
          heading: 'How much leave',
          body: `Article 84 of the 2023 Labour Law (Royal Decree 53/2023) grants **98 days** of maternity leave covering the period before and after childbirth, making it one of the most generous entitlements in the region.`,
        },
        {
          heading: 'The pre-birth portion is capped',
          body: `On medical recommendation, the portion of the leave taken **before** birth may not exceed **14 days** — so most of the 98 days are reserved for after delivery.`,
        },
        {
          heading: 'Paternity leave for fathers',
          body: `Fathers also receive **7 days** of paternity leave, to be taken within 98 days of the birth.`,
        },
        {
          heading: 'Worked example',
          body: `If a doctor recommends starting leave 14 days before the due date, the employee would still have 84 of the 98 days remaining for after the birth. Meanwhile, the father could take his separate 7-day paternity leave at any point within the 98 days following the birth — for example, around the delivery itself or later to help with newborn care.`,
        },
      ],
      keyTakeaways: [
        '98 days of maternity leave — among the most generous in the region.',
        'The pre-birth portion is capped at 14 days, on medical recommendation.',
        'Fathers receive a separate 7 days of paternity leave within 98 days of the birth.',
      ],
      faqs: [
        { q: 'How many days of maternity leave does Oman give?', a: '98 days under Article 84 of the 2023 Labour Law, covering time before and after childbirth.' },
        { q: 'Can I start my Oman maternity leave before giving birth?', a: 'Yes, but on medical recommendation only, and that pre-birth portion cannot exceed 14 days.' },
        { q: 'Does Oman give fathers time off too?', a: 'Yes — fathers are entitled to 7 days of paternity leave, to be taken within 98 days of the birth.' },
      ],
      relatedCalculators: REL,
      lastReviewed: REVIEWED,
    },
    ar: {
      slug: 'maternity-leave-oman',
      locale: 'ar',
      title: 'إجازة الأمومة في عُمان: 98 يوماً (2026)',
      metaDescription:
        'يمنح عُمان 98 يوماً من إجازة الأمومة بموجب قانون العمل (مرسوم 53/2023) المادة 84، قبل الولادة وبعدها، مع 7 أيام إجازة أبوة. حاسبة.',
      intro:
        'يمنح قانون العمل العماني لسنة 2023 الأم العاملة 98 يوماً من إجازة الأمومة — من أسخى الاستحقاقات في المنطقة — مع جزء محدود قبل الولادة واستحقاق منفصل لإجازة الأبوة.',
      sections: [
        {
          heading: 'مقدار الإجازة',
          body: `تمنح المادة 84 من قانون العمل لسنة 2023 (مرسوم سلطاني 53/2023) **98 يوماً** من إجازة الأمومة تغطي ما قبل الولادة وبعدها، وهي من أسخى الاستحقاقات في المنطقة.`,
        },
        {
          heading: 'الجزء السابق للولادة محدود',
          body: `بتوصية طبية، لا يتجاوز الجزء المأخوذ من الإجازة **قبل** الولادة **14 يوماً** — أي أن معظم الـ98 يوماً مخصص لما بعد الوضع.`,
        },
        {
          heading: 'إجازة الأبوة للآباء',
          body: `يحصل الأب أيضاً على **7 أيام** إجازة أبوة، تُؤخذ خلال 98 يوماً من تاريخ الولادة.`,
        },
        {
          heading: 'مثال عملي',
          body: `إذا أوصى الطبيب بأن تبدأ الموظفة إجازتها 14 يوماً قبل الموعد المتوقع، يبقى لها 84 يوماً من الـ98 يوماً لما بعد الولادة. وفي الوقت نفسه، يمكن للأب أخذ إجازة الأبوة المنفصلة البالغة 7 أيام في أي وقت خلال 98 يوماً من الولادة — كأن يأخذها حول الوضع نفسه أو لاحقاً للمساعدة في رعاية المولود.`,
        },
      ],
      keyTakeaways: [
        '98 يوماً من إجازة الأمومة — من الأسخى في المنطقة.',
        'الجزء السابق للولادة محدود بـ14 يوماً، بتوصية طبية.',
        'يحصل الآباء على إجازة أبوة منفصلة مدتها 7 أيام خلال 98 يوماً من الولادة.',
      ],
      faqs: [
        { q: 'كم يوماً إجازة أمومة يمنحها عُمان؟', a: '98 يوماً بموجب المادة 84 من قانون العمل لسنة 2023، تغطي فترة قبل الولادة وبعدها.' },
        { q: 'هل يمكنني بدء إجازة الأمومة في عُمان قبل الولادة؟', a: 'نعم، لكن بتوصية طبية فقط، وبحد أقصى 14 يوماً لذلك الجزء السابق للولادة.' },
        { q: 'هل يحصل الآباء في عُمان على إجازة أيضاً؟', a: 'نعم — يحق للآباء 7 أيام إجازة أبوة، تُؤخذ خلال 98 يوماً من تاريخ الولادة.' },
      ],
      relatedCalculators: REL,
      lastReviewed: REVIEWED,
    },
  },
};

export default maternityGuides;
