import type { GuideContent } from './types';
import type { Locale } from '../config/site';

/**
 * Per-country notice-period guides. Days mirror the country-rules engine.
 *
 * Each country gets its own structure — which sections apply, the worked
 * example, and the FAQs — because the underlying rules differ in kind, not
 * just in the number of days: Saudi and Qatar tier by who ends the contract
 * or by tenure, Kuwait's period is flat but unusually long, Bahrain allows
 * one-sided extension, and Oman layers a pay-frequency split on top of a
 * separate economic-cause rule. No day counts, articles or figures beyond
 * what the country-rules engine already states are introduced here — only
 * elaboration, worked examples and distinct FAQ framing.
 *
 * Last reviewed: 2026-10-01.
 */
const R = '2026-10-01';
const REL = ['notice-period', 'end-of-service', 'leave-balance'];

const noticeGuides: Record<string, Record<Locale, GuideContent>> = {
  /* ───────────────────────── Jordan ───────────────────────── */
  'notice-period-jordan': {
    en: {
      slug: 'notice-period-jordan',
      locale: 'en',
      title: 'Jordan Notice Period: 30 Days (2026)',
      metaDescription:
        'Jordan requires at least 30 days’ written notice to terminate an unlimited-term contract (Labour Law Art. 23). Payment in lieu, and the calculator.',
      intro:
        'Ending an unlimited-term job in Jordan — whether you resign or your employer lets you go — runs through a single rule: at least 30 days’ written notice, or pay instead of serving it. Here’s how that works in practice, including what you’re owed if the notice isn’t given.',
      sections: [
        {
          heading: 'How much notice is required',
          body: `Jordan’s Labour Law gives either side of an unlimited-term contract the right to end it on **at least 30 days’ written notice** (Article 23). The obligation is symmetric: the same 30-day minimum applies whether the employer is ending the job or the employee is resigning, and nothing in the Article lets either side shorten it unilaterally.`,
        },
        {
          heading: 'Payment in lieu of notice',
          body: `If the full 30 days isn’t worked — because either side wants the contract to end sooner — the shortfall is settled as money rather than time. The party ending the contract early owes **payment in lieu** for the days of notice not served, calculated on the employee’s wage.`,
        },
        {
          heading: 'Worked example',
          body: `Take an employee earning **500 JOD** a month whose employer ends the contract with no notice at all. Because 30 days works out to one month, the payment in lieu is roughly one month’s wage: **500 JOD**. If 15 days of notice had actually been worked, only the remaining 15 days — about **250 JOD** — would be owed in lieu.`,
        },
        {
          heading: 'Notice vs. end-of-service gratuity',
          body: `Don’t confuse the 30-day notice with end-of-service entitlements. Notice (or its cash equivalent) covers the run-up to the last working day; what you may separately be owed afterwards — a gratuity, or for most SSC-covered workers a Social Security benefit — is a different calculation entirely. Use the end-of-service calculator for that figure.`,
        },
      ],
      keyTakeaways: ['At least 30 days’ written notice.', 'Applies to unlimited-term contracts.', 'Payment in lieu is due if notice is not served.'],
      faqs: [
        { q: 'What is the notice period in Jordan?', a: 'Jordan requires at least 30 days’ written notice to end an unlimited-term contract, whichever side is ending it (Article 23).' },
        { q: 'Does the 30-day notice apply the same way to employers and employees?', a: 'Yes — Article 23 is symmetric. A resigning employee and a terminating employer are both held to the same 30-day minimum.' },
        { q: 'What if my employer or I don’t want to wait out the full 30 days?', a: 'Either side can end the contract sooner, but then owes payment in lieu for the days of notice that weren’t worked.' },
      ],
      relatedCalculators: REL,
      lastReviewed: R,
    },
    ar: {
      slug: 'notice-period-jordan',
      locale: 'ar',
      title: 'مدة الإشعار في الأردن: 30 يوماً (2026)',
      metaDescription:
        'يشترط الأردن إشعاراً كتابياً لا يقل عن 30 يوماً لإنهاء العقد غير المحدد المدة (المادة 23). بدل الإشعار والحاسبة.',
      intro:
        'إنهاء عقد غير محدد المدة في الأردن — سواء كنت الموظف المستقيل أو صاحب العمل المُنهي — يقوم على قاعدة واحدة: إشعار كتابي لا يقل عن 30 يوماً، أو بدل نقدي عنه إذا لم يُعطَ. وفيما يلي كيف تُطبَّق هذه القاعدة عملياً، وما يُستحق إن لم يُعطَ الإشعار.',
      sections: [
        {
          heading: 'مدة الإشعار المطلوبة',
          body: `يمنح قانون العمل الأردني أي طرف في العقد غير المحدد المدة حق إنهائه بإشعار كتابي **لا يقل عن 30 يوماً** (المادة 23). والالتزام متماثل: ينطبق الحد الأدنى نفسه سواء كان صاحب العمل هو المُنهي أو كان الموظف هو المستقيل، ولا يجيز نص المادة لأي طرف تقليصه من جانب واحد.`,
        },
        {
          heading: 'بدل الإشعار',
          body: `إن لم تُستوفَ الثلاثون يوماً كاملة — لأن أحد الطرفين يريد إنهاء العقد في وقت أقرب — يُسوَّى الفارق نقداً بدلاً من الزمن. فالطرف الذي أنهى العقد قبل اكتمال المدة يُستحق عليه **بدل** عن أيام الإشعار غير المُستوفاة، يُحسب على أجر الموظف.`,
        },
        {
          heading: 'مثال عملي',
          body: `موظف يتقاضى **500 دينار** شهرياً أنهى صاحب العمل عقده دون أي إشعار. ولأن 30 يوماً تساوي شهراً واحداً تقريباً، فإن البدل المستحق نحو أجر شهر كامل: **500 دينار**. ولو كان قد عمل 15 يوماً من مدة الإشعار فعلاً، لم يُستحق إلا بدل الأيام الـ15 المتبقية — نحو **250 ديناراً**.`,
        },
        {
          heading: 'الإشعار مقابل مكافأة نهاية الخدمة',
          body: `لا تخلط بين إشعار الثلاثين يوماً واستحقاقات نهاية الخدمة. فالإشعار (أو بدله النقدي) يغطي الفترة السابقة لآخر يوم عمل؛ أما ما قد يُستحق لك بعد ذلك بشكل منفصل — مكافأة، أو لمعظم المشمولين بالضمان الاجتماعي استحقاق من الضمان — فحساب مختلف تماماً. استخدم حاسبة نهاية الخدمة لذلك الرقم.`,
        },
      ],
      keyTakeaways: ['إشعار كتابي لا يقل عن 30 يوماً.', 'ينطبق على العقود غير المحددة المدة.', 'يُستحق بدل إن لم يُعطَ الإشعار.'],
      faqs: [
        { q: 'ما مدة الإشعار في الأردن؟', a: 'يشترط الأردن إشعاراً كتابياً لا يقل عن 30 يوماً لإنهاء العقد غير المحدد المدة، أياً كان الطرف المُنهي (المادة 23).' },
        { q: 'هل يُطبَّق إشعار الثلاثين يوماً على صاحب العمل والموظف بالتساوي؟', a: 'نعم — المادة 23 متماثلة الأثر. فالموظف المستقيل وصاحب العمل المُنهي يخضعان لحدٍّ أدنى واحد قدره 30 يوماً.' },
        { q: 'ماذا لو لم يُرِد أحدنا الانتظار حتى اكتمال الثلاثين يوماً؟', a: 'يجوز لأي طرف إنهاء العقد في وقت أقرب، لكنه يُصبح ملزماً ببدل نقدي عن أيام الإشعار التي لم تُستوفَ.' },
      ],
      relatedCalculators: REL,
      lastReviewed: R,
    },
  },

  /* ───────────────────── Saudi Arabia ───────────────────── */
  'notice-period-saudi-arabia': {
    en: {
      slug: 'notice-period-saudi-arabia',
      locale: 'en',
      title: 'Saudi Notice Period: 30 or 60 Days (2026)',
      metaDescription:
        'Saudi notice periods (Labour Law Art. 75, amended 2025): 30 days by the worker, 60 days by the employer, for monthly-paid indefinite contracts. Calculator.',
      intro:
        'Saudi Arabia is one of the few countries in this list where the notice period itself depends on who is ending the contract — not on how long you’ve worked there. Here’s the split, and what it means in riyals.',
      sections: [
        {
          heading: 'How much notice is required',
          body: `For a monthly-paid, indefinite-term contract, Article 75 (as amended in February 2025) sets **30 days** of notice when the **worker resigns** and **60 days** when the **employer terminates**. If the wage isn’t paid monthly, the rule simplifies to a flat **30 days for either party**.`,
        },
        {
          heading: 'Why the notice period differs by who ends it',
          body: `The split exists specifically for monthly-paid indefinite contracts: an employer ending the relationship owes the worker double the notice a resigning worker would have to give. This asymmetry doesn’t depend on tenure or seniority — a worker with one year of service and one with ten both fall under the same 30/60-day split. The Klar calculator applies the 30-day statutory minimum as its baseline figure.`,
        },
        {
          heading: 'Worked example',
          body: `An employee earning **8,000 SAR** a month resigns and leaves immediately instead of working the 30 days. Thirty days is one month, so the payment in lieu is about **8,000 SAR**. If instead the **employer** ends the contract with no notice, the 60-day requirement means roughly two months’ pay in lieu: **16,000 SAR**.`,
        },
        {
          heading: 'Notice vs. end-of-service',
          body: `This notice period is separate from the end-of-service award under Articles 84–85. The notice (or its cash equivalent) is paid regardless of how the award itself is calculated — including the resignation scale that can reduce the end-of-service amount. Use the end-of-service calculator for that figure.`,
        },
      ],
      keyTakeaways: ['Worker resigns: 30 days.', 'Employer terminates: 60 days.', 'Non-monthly pay: 30 days for either party.'],
      faqs: [
        { q: 'Is Saudi’s notice period 30 days or 60 days?', a: 'It depends who is ending the contract: 30 days if the worker resigns, 60 days if the employer terminates, for monthly-paid indefinite contracts (Article 75).' },
        { q: 'Does the 30/60-day split apply to non-monthly-paid workers?', a: 'No — for contracts that aren’t paid monthly, the notice period is a flat 30 days regardless of which side ends it.' },
        { q: 'Why does an employer owe longer notice than a resigning worker?', a: 'Article 75’s 2025 amendment built in that asymmetry deliberately; it isn’t tied to how long the employee has worked there.' },
      ],
      relatedCalculators: REL,
      lastReviewed: R,
    },
    ar: {
      slug: 'notice-period-saudi-arabia',
      locale: 'ar',
      title: 'مدة الإشعار في السعودية: 30 أو 60 يوماً (2026)',
      metaDescription:
        'مدد الإشعار في السعودية (المادة 75 المعدّلة 2025): 30 يوماً من العامل و60 يوماً من صاحب العمل للعقود غير المحددة الشهرية. حاسبة.',
      intro:
        'السعودية من الدول القليلة في هذه القائمة التي تجعل مدة الإشعار نفسها متوقفة على الطرف المُنهي للعقد — لا على مدة الخدمة. وفيما يلي التفصيل، وما يعنيه بالريال.',
      sections: [
        {
          heading: 'مدة الإشعار المطلوبة',
          body: `للعقد غير المحدد المدة ذي الأجر الشهري، تحدد المادة 75 (المعدّلة في فبراير 2025) مدة الإشعار بـ **30 يوماً** عند **استقالة العامل** و**60 يوماً** عند **إنهاء صاحب العمل**. وإن لم يكن الأجر شهرياً، تبسّط القاعدة إلى **30 يوماً لأي طرف**.`,
        },
        {
          heading: 'لماذا تختلف المدة بحسب الطرف المُنهي',
          body: `هذا التفاوت مخصص للعقود غير المحددة ذات الأجر الشهري: فصاحب العمل الذي يُنهي العلاقة يتحمل ضعف مدة الإشعار التي يلتزم بها العامل المستقيل. ولا يتوقف هذا التفاوت على مدة الخدمة أو الأقدمية — فالعامل بسنة خدمة والعامل بعشر سنوات يخضعان لنفس التقسيم 30/60 يوماً. وتستخدم حاسبة كلار الحد الأدنى القانوني 30 يوماً كرقم أساسي.`,
        },
        {
          heading: 'مثال عملي',
          body: `موظف يتقاضى **8,000 ريال** شهرياً استقال وترك العمل فوراً بدل العمل خلال 30 يوماً. وبما أن 30 يوماً تعادل شهراً، فالبدل المستحق نحو **8,000 ريال**. وإن أنهى **صاحب العمل** العقد دون إشعار، فإن متطلب 60 يوماً يعني بدلاً يقارب شهرين: **16,000 ريال**.`,
        },
        {
          heading: 'الإشعار مقابل نهاية الخدمة',
          body: `مدة الإشعار هذه منفصلة عن مكافأة نهاية الخدمة بموجب المادتين 84 و85. فالإشعار (أو بدله النقدي) يُستحق بصرف النظر عن كيفية حساب المكافأة نفسها — بما في ذلك مقياس الاستقالة الذي قد يخفّضها. استخدم حاسبة نهاية الخدمة لذلك الرقم.`,
        },
      ],
      keyTakeaways: ['استقالة العامل: 30 يوماً.', 'إنهاء صاحب العمل: 60 يوماً.', 'الأجر غير الشهري: 30 يوماً لأي طرف.'],
      faqs: [
        { q: 'هل مدة الإشعار في السعودية 30 يوماً أم 60؟', a: 'تتوقف على الطرف المُنهي للعقد: 30 يوماً إن استقال العامل، و60 يوماً إن أنهى صاحب العمل، للعقود غير المحددة ذات الأجر الشهري (المادة 75).' },
        { q: 'هل ينطبق تقسيم 30/60 يوماً على غير المأجورين شهرياً؟', a: 'لا — للعقود غير المدفوعة شهرياً، مدة الإشعار 30 يوماً ثابتة أياً كان الطرف المُنهي.' },
        { q: 'لماذا يتحمل صاحب العمل مدة إشعار أطول من العامل المستقيل؟', a: 'تعديل المادة 75 لعام 2025 أدخل هذا التفاوت عمداً؛ وهو غير مرتبط بمدة خدمة الموظف.' },
      ],
      relatedCalculators: REL,
      lastReviewed: R,
    },
  },

  /* ───────────────────────── UAE ───────────────────────── */
  'notice-period-uae': {
    en: {
      slug: 'notice-period-uae',
      locale: 'en',
      title: 'UAE Notice Period: 30 to 90 Days (2026)',
      metaDescription:
        'UAE notice period is a minimum of 30 days, up to 90 days as agreed, for both fixed- and indefinite-term contracts (Federal Decree-Law 33/2021, Art. 43). Calculator.',
      intro:
        'The UAE sets a single notice floor that applies no matter what kind of contract you’re on — and then leaves room for the contract to ask for more. Here’s how the 30-to-90-day range plays out.',
      sections: [
        {
          heading: 'How much notice is required',
          body: `Article 43 of Federal Decree-Law 33/2021 sets a notice period of **at least 30 days**, with the contract free to agree on anything up to **90 days**. Whatever figure the contract lands on, it can’t go below the 30-day floor.`,
        },
        {
          heading: 'Does the minimum change by contract type',
          body: `No — the same 30-day minimum applies whether the employment is on a **fixed-term** or an **indefinite-term** contract. The UAE doesn’t tier its notice period by tenure or by which side is ending the contract; the only variable is whatever longer period the parties may have agreed in writing, up to the 90-day ceiling.`,
        },
        {
          heading: 'Worked example',
          body: `An employee earning **10,000 AED** a month is let go with no notice served. At the statutory 30-day minimum, that’s one month’s pay in lieu: **10,000 AED**. If the employment contract had instead set the notice period at the maximum 90 days, the same scenario would owe three months’ pay in lieu: **30,000 AED**. The Klar calculator defaults to the 30-day statutory minimum unless you tell it otherwise.`,
        },
        {
          heading: 'Notice vs. end-of-service',
          body: `Notice pay and end-of-service gratuity are calculated independently under UAE law — the 21-/30-day gratuity bands under Article 51 aren’t affected by whichever notice period your contract uses. Use the end-of-service calculator to estimate that separate figure.`,
        },
      ],
      keyTakeaways: ['Minimum 30 days’ notice.', 'Up to 90 days if the contract agrees.', 'Same minimum for fixed- and indefinite-term contracts.'],
      faqs: [
        { q: 'What is the minimum notice period in the UAE?', a: 'At least 30 days under Article 43, with the contract able to extend it up to 90 days.' },
        { q: 'Can my UAE employer set a shorter notice period than 30 days?', a: 'No. Thirty days is a statutory floor; a contract can lengthen it up to 90 days but can’t reduce it.' },
        { q: 'Does the UAE notice period differ between fixed-term and unlimited contracts?', a: 'No — the same 30-day minimum (and 90-day ceiling) applies to both contract types.' },
      ],
      relatedCalculators: REL,
      lastReviewed: R,
    },
    ar: {
      slug: 'notice-period-uae',
      locale: 'ar',
      title: 'مدة الإشعار في الإمارات: 30 إلى 90 يوماً (2026)',
      metaDescription:
        'مدة الإشعار في الإمارات 30 يوماً كحد أدنى، وتصل إلى 90 يوماً بالاتفاق، للعقود المحددة وغير المحددة (المرسوم 33/2021، المادة 43). حاسبة.',
      intro:
        'تضع الإمارات حداً أدنى واحداً للإشعار ينطبق على أي نوع عقد — وتترك مجالاً للعقد لطلب أكثر منه. وفيما يلي كيف يُطبَّق هذا المدى من 30 إلى 90 يوماً.',
      sections: [
        {
          heading: 'مدة الإشعار المطلوبة',
          body: `تحدد المادة 43 من المرسوم بقانون اتحادي 33/2021 مدة إشعار **لا تقل عن 30 يوماً**، ويجوز أن يتفق العقد على ما يصل إلى **90 يوماً**. وأياً كان الرقم الذي يتفق عليه العقد، فلا يجوز أن يقل عن الحد الأدنى 30 يوماً.`,
        },
        {
          heading: 'هل يختلف الحد الأدنى بنوع العقد',
          body: `لا — ينطبق الحد الأدنى نفسه 30 يوماً سواء كان العمل بعقد **محدد المدة** أو **غير محدد المدة**. فالإمارات لا تُدرّج مدة الإشعار بحسب مدة الخدمة أو الطرف المُنهي؛ والمتغير الوحيد هو أي مدة أطول يتفق عليها الطرفان كتابةً، حتى سقف 90 يوماً.`,
        },
        {
          heading: 'مثال عملي',
          body: `موظف يتقاضى **10,000 درهم** شهرياً أُنهي عقده دون إشعار. وبالحد الأدنى القانوني 30 يوماً، يُستحق بدل شهر واحد: **10,000 درهم**. ولو كان عقد العمل قد حدد مدة الإشعار عند السقف الأقصى 90 يوماً، لاستُحق في الحالة نفسها بدل ثلاثة أشهر: **30,000 درهم**. وتفترض حاسبة كلار الحد الأدنى القانوني 30 يوماً ما لم تُحدَّد مدة أخرى.`,
        },
        {
          heading: 'الإشعار مقابل نهاية الخدمة',
          body: `يُحسب بدل الإشعار ومكافأة نهاية الخدمة بشكل مستقل بموجب القانون الإماراتي — فشرائح المكافأة (21/30 يوماً) بموجب المادة 51 لا تتأثر بمدة الإشعار المحددة في عقدك. استخدم حاسبة نهاية الخدمة لتقدير ذلك الرقم المنفصل.`,
        },
      ],
      keyTakeaways: ['حد أدنى 30 يوماً إشعار.', 'حتى 90 يوماً إن اتفق العقد.', 'الحد الأدنى نفسه للعقود المحددة وغير المحددة.'],
      faqs: [
        { q: 'ما الحد الأدنى لمدة الإشعار في الإمارات؟', a: 'لا يقل عن 30 يوماً بموجب المادة 43، ويجوز أن يمدّده العقد حتى 90 يوماً.' },
        { q: 'هل يجوز لصاحب العمل في الإمارات تحديد مدة إشعار أقل من 30 يوماً؟', a: 'لا. الثلاثون يوماً حد أدنى قانوني؛ ويجوز للعقد تمديده حتى 90 يوماً لكن لا يجوز تقليصه.' },
        { q: 'هل تختلف مدة الإشعار في الإمارات بين العقود المحددة وغير المحددة؟', a: 'لا — ينطبق الحد الأدنى نفسه (30 يوماً) والسقف نفسه (90 يوماً) على العقدين.' },
      ],
      relatedCalculators: REL,
      lastReviewed: R,
    },
  },

  /* ───────────────────────── Kuwait ───────────────────────── */
  'notice-period-kuwait': {
    en: {
      slug: 'notice-period-kuwait',
      locale: 'en',
      title: 'Kuwait Notice Period: 90 Days (2026)',
      metaDescription:
        'Kuwait requires 3 months (about 90 days) notice to terminate an indefinite monthly-paid contract under Labour Law Art. 44. The longest in the Gulf. Calculator.',
      intro:
        'Kuwait stands out in the Gulf for one number: a three-month notice period that’s roughly double what most of its neighbours require. Here’s what that means in practice.',
      sections: [
        {
          heading: 'How much notice is required',
          body: `For an indefinite-term, monthly-paid contract, Article 44 sets the notice period at **3 months (about 90 days)** — one of the longest statutory notice requirements in the region.`,
        },
        {
          heading: 'Why Kuwait’s notice period is longer than its neighbours',
          body: `Most Gulf states use a 30-to-60-day range for the equivalent contract. Kuwait’s 3-month requirement is noticeably longer than that, which matters most when estimating payment in lieu — a figure based on 90 days is roughly triple what a 30-day calculation would produce.`,
        },
        {
          heading: 'Payment in lieu of notice',
          body: `Kuwait permits **payment in lieu** of the notice period, so an employer or employee ending the contract immediately doesn’t have to serve out the 3 months — they settle it as wages instead.`,
        },
        {
          heading: 'Worked example',
          body: `An employee earning **600 KWD** a month has their contract ended with no notice served. Three months works out to **1,800 KWD** in payment in lieu — compared with roughly 600 KWD if Kuwait used the 30-day minimum common elsewhere in the Gulf.`,
        },
      ],
      keyTakeaways: ['About 90 days (3 months) notice.', 'The longest statutory notice in the Gulf.', 'Payment in lieu is permitted.'],
      faqs: [
        { q: 'How long is the notice period in Kuwait?', a: '3 months (about 90 days) for an indefinite-term, monthly-paid contract under Article 44 — the longest statutory notice in the Gulf.' },
        { q: 'Why is Kuwait’s notice period so much longer than Saudi’s or the UAE’s?', a: 'There’s no tenure-based reasoning behind it — Article 44 simply sets a flat 3-month requirement, well above the 30-to-60-day range most neighbouring countries use.' },
        { q: 'Can my employer pay me instead of making me work the 3 months?', a: 'Yes — payment in lieu of notice is permitted, so the 3 months can be settled as wages rather than worked.' },
      ],
      relatedCalculators: REL,
      lastReviewed: R,
    },
    ar: {
      slug: 'notice-period-kuwait',
      locale: 'ar',
      title: 'مدة الإشعار في الكويت: 90 يوماً (2026)',
      metaDescription:
        'يشترط الكويت إشعاراً مدته 3 أشهر (نحو 90 يوماً) لإنهاء العقد غير المحدد الشهري بموجب المادة 44. الأطول في الخليج. حاسبة.',
      intro:
        'تتميّز الكويت في الخليج برقم واحد: مدة إشعار ثلاثة أشهر، أي ما يقارب ضعف ما تشترطه أغلب دول الجوار. وفيما يلي ما يعنيه ذلك عملياً.',
      sections: [
        {
          heading: 'مدة الإشعار المطلوبة',
          body: `للعقد غير المحدد المدة ذي الأجر الشهري، تحدد المادة 44 مدة الإشعار بـ **3 أشهر (نحو 90 يوماً)** — من أطول مدد الإشعار القانونية في المنطقة.`,
        },
        {
          heading: 'لماذا مدة الإشعار في الكويت أطول من جيرانها',
          body: `تعتمد أغلب دول الخليج مدى 30 إلى 60 يوماً للعقد المماثل. ومتطلب الكويت بثلاثة أشهر أطول بوضوح من ذلك، وهذا يهم تحديداً عند تقدير بدل الإشعار — فالرقم المحسوب على 90 يوماً يقارب ثلاثة أضعاف ما ينتج عن حساب قائم على 30 يوماً.`,
        },
        {
          heading: 'بدل الإشعار',
          body: `تسمح الكويت بدفع **بدل** عن مدة الإشعار، فلا يُضطر صاحب العمل أو الموظف المُنهي للعقد فوراً إلى استيفاء الثلاثة أشهر — بل تُسوَّى نقداً بدلاً من ذلك.`,
        },
        {
          heading: 'مثال عملي',
          body: `موظف يتقاضى **600 دينار كويتي** شهرياً أُنهي عقده دون إشعار. وثلاثة أشهر تعني بدلاً مقداره **1,800 دينار** — مقارنة بنحو 600 دينار لو اعتمدت الكويت الحد الأدنى 30 يوماً المعتاد في دول الخليج الأخرى.`,
        },
      ],
      keyTakeaways: ['نحو 90 يوماً (3 أشهر) إشعار.', 'الأطول قانونياً في الخليج.', 'يجوز دفع بدل عن الإشعار.'],
      faqs: [
        { q: 'ما مدة الإشعار في الكويت؟', a: '3 أشهر (نحو 90 يوماً) للعقد غير المحدد ذي الأجر الشهري بموجب المادة 44 — الأطول قانونياً في الخليج.' },
        { q: 'لماذا مدة الإشعار في الكويت أطول بكثير من السعودية أو الإمارات؟', a: 'لا يوجد منطق مرتبط بمدة الخدمة وراء ذلك — فالمادة 44 تحدد ببساطة متطلباً ثابتاً بثلاثة أشهر، أعلى بكثير من مدى 30-60 يوماً المعتمد في أغلب دول الجوار.' },
        { q: 'هل يجوز لصاحب العمل دفع بدل لي بدلاً من إلزامي بالعمل ثلاثة أشهر؟', a: 'نعم — يُسمح بدفع بدل عن مدة الإشعار، فتُسوَّى الثلاثة أشهر نقداً بدلاً من العمل الفعلي.' },
      ],
      relatedCalculators: REL,
      lastReviewed: R,
    },
  },

  /* ───────────────────────── Qatar ───────────────────────── */
  'notice-period-qatar': {
    en: {
      slug: 'notice-period-qatar',
      locale: 'en',
      title: 'Qatar Notice Period: 30 or 60 Days (2026)',
      metaDescription:
        'Qatar notice period depends on tenure: 30 days under 2 years of service, 60 days from 2 years (Labour Law Art. 49). Calculator + details.',
      intro:
        'Qatar is the one country here where the length of your notice period actually moves with your tenure — not your pay frequency or who’s ending the contract. Here’s where the line falls.',
      sections: [
        {
          heading: 'How notice depends on your length of service',
          body: `Article 49 ties the notice period to how long you’ve worked there: **30 days** for service **under 2 years**, rising to **60 days** once you’ve completed **2 years** or more. Crossing the 2-year mark is what changes the number — nothing else does.`,
        },
        {
          heading: 'Payment in lieu of notice',
          body: `Qatar permits **payment in lieu** of notice at either tier, so an employer or employee ending the contract immediately settles the notice period as wages rather than working it out.`,
        },
        {
          heading: 'Worked example',
          body: `An employee earning **4,000 QAR** a month with **18 months** of service has their contract ended with no notice. Being under 2 years, the 30-day tier applies — one month’s pay in lieu, **4,000 QAR**. The same employee staying on past the 2-year mark would instead fall into the 60-day tier: roughly **8,000 QAR** in payment in lieu.`,
        },
        {
          heading: 'Notice vs. end-of-service',
          body: `This tenure-based notice period is unrelated to Qatar’s flat 21-days-per-year end-of-service gratuity under Article 54 — the two run on separate clocks and separate formulas. Use the end-of-service calculator for the gratuity figure.`,
        },
      ],
      keyTakeaways: ['30 days under 2 years of service.', '60 days from 2 years.', 'Payment in lieu is permitted.'],
      faqs: [
        { q: 'How many days’ notice does Qatar require?', a: '30 days for under 2 years of service, rising to 60 days once you’ve completed 2 years or more, under Article 49.' },
        { q: 'What happens to my notice period right at the 2-year mark?', a: 'Once you complete 2 years of service the longer 60-day tier applies; before that, it’s 30 days.' },
        { q: 'Can my employer in Qatar pay me instead of giving notice?', a: 'Yes — payment in lieu of notice is permitted at either the 30-day or 60-day tier.' },
      ],
      relatedCalculators: REL,
      lastReviewed: R,
    },
    ar: {
      slug: 'notice-period-qatar',
      locale: 'ar',
      title: 'مدة الإشعار في قطر: 30 أو 60 يوماً (2026)',
      metaDescription:
        'مدة الإشعار في قطر تعتمد على مدة الخدمة: 30 يوماً دون سنتين، و60 يوماً من سنتين (المادة 49). حاسبة وتفاصيل.',
      intro:
        'قطر هي الدولة الوحيدة هنا التي تتغير فيها مدة الإشعار فعلاً بحسب مدة الخدمة — لا بحسب نمط الأجر أو الطرف المُنهي. وفيما يلي أين يقع الخط الفاصل.',
      sections: [
        {
          heading: 'كيف تتوقف المدة على مدة خدمتك',
          body: `تربط المادة 49 مدة الإشعار بمدة الخدمة: **30 يوماً** لمن خدم **دون سنتين**، ترتفع إلى **60 يوماً** بعد إتمام **سنتين** فأكثر. وتجاوز عتبة السنتين هو ما يُغيّر الرقم — ولا شيء آخر.`,
        },
        {
          heading: 'بدل الإشعار',
          body: `تسمح قطر بدفع **بدل** عن مدة الإشعار في كلتا الشريحتين، فيُسوّي صاحب العمل أو الموظف المُنهي للعقد فوراً مدة الإشعار نقداً بدل العمل خلالها.`,
        },
        {
          heading: 'مثال عملي',
          body: `موظف يتقاضى **4,000 ريال قطري** شهرياً، وخدم **18 شهراً**، أُنهي عقده دون إشعار. ولكونه دون السنتين، تُطبَّق شريحة 30 يوماً — بدل شهر واحد، **4,000 ريال**. ولو استمر الموظف نفسه بعد عتبة السنتين لانتقل إلى شريحة 60 يوماً: بدل يقارب **8,000 ريال**.`,
        },
        {
          heading: 'الإشعار مقابل نهاية الخدمة',
          body: `مدة الإشعار المرتبطة بالخدمة هذه لا علاقة لها بمكافأة نهاية الخدمة الثابتة في قطر (21 يوماً عن كل سنة) بموجب المادة 54 — فكلاهما يسير على جدول وصيغة منفصلين. استخدم حاسبة نهاية الخدمة لرقم المكافأة.`,
        },
      ],
      keyTakeaways: ['30 يوماً لمن دون سنتين خدمة.', '60 يوماً من سنتين.', 'يجوز دفع بدل عن الإشعار.'],
      faqs: [
        { q: 'كم يوماً إشعار تشترط قطر؟', a: '30 يوماً لمن خدم دون سنتين، ترتفع إلى 60 يوماً بعد إتمام سنتين فأكثر، بموجب المادة 49.' },
        { q: 'ماذا يحدث لمدة إشعاري عند عتبة السنتين تماماً؟', a: 'بعد إتمام سنتين خدمة تُطبَّق الشريحة الأطول 60 يوماً؛ وقبل ذلك فهي 30 يوماً.' },
        { q: 'هل يجوز لصاحب العمل في قطر دفع بدل لي بدلاً من الإشعار؟', a: 'نعم — يُسمح بدفع بدل عن مدة الإشعار في أي من الشريحتين 30 أو 60 يوماً.' },
      ],
      relatedCalculators: REL,
      lastReviewed: R,
    },
  },

  /* ───────────────────────── Bahrain ───────────────────────── */
  'notice-period-bahrain': {
    en: {
      slug: 'notice-period-bahrain',
      locale: 'en',
      title: 'Bahrain Notice Period: 30 Days (2026)',
      metaDescription:
        'Bahrain requires at least 30 days’ written notice to terminate an indefinite contract (Labour Law Art. 99); a longer period may be agreed. Calculator.',
      intro:
        'Bahrain’s notice rule is simple on paper — a 30-day floor — but the one-sided way it can be extended is worth knowing before you sign a contract.',
      sections: [
        {
          heading: 'How much notice is required',
          body: `Article 99 gives either party to an indefinite-term contract the right to end it on **at least 30 days’ written notice**.`,
        },
        {
          heading: 'Can the notice period be extended by agreement',
          body: `Yes, but only in one direction. The contract may set a **longer** notice period than 30 days, and that longer figure is enforceable. What it cannot do is agree to **less** than 30 days — any clause trying to shorten the statutory minimum is void, so 30 days remains the floor no matter what the contract says.`,
        },
        {
          heading: 'Worked example',
          body: `An employee earning **450 BHD** a month has their contract ended with no notice. At the 30-day statutory minimum, that’s one month’s pay in lieu: **450 BHD**. If their contract had instead set a longer, 45-day notice period, the same scenario would owe about 1.5 months: roughly **675 BHD**.`,
        },
        {
          heading: 'Notice vs. end-of-service',
          body: `The 30-day (or longer) notice is separate from Bahrain’s leaving indemnity under Article 116, which uses its own 15-/30-day bands based on years of service. Use the end-of-service calculator for that figure.`,
        },
      ],
      keyTakeaways: ['At least 30 days’ written notice.', 'A longer period may be agreed; shorter is void.', 'Payment in lieu is permitted.'],
      faqs: [
        { q: 'What is the minimum notice period in Bahrain?', a: 'At least 30 days’ written notice under Article 99, applying to either party on an indefinite-term contract.' },
        { q: 'Can a Bahraini employment contract require more than 30 days’ notice?', a: 'Yes — a longer period can be agreed and is enforceable, but any clause setting less than 30 days is void.' },
        { q: 'Is payment in lieu of notice allowed in Bahrain?', a: 'Yes — the notice period can be settled as wages instead of being worked.' },
      ],
      relatedCalculators: REL,
      lastReviewed: R,
    },
    ar: {
      slug: 'notice-period-bahrain',
      locale: 'ar',
      title: 'مدة الإشعار في البحرين: 30 يوماً (2026)',
      metaDescription:
        'يشترط البحرين إشعاراً كتابياً لا يقل عن 30 يوماً لإنهاء العقد غير المحدد (المادة 99)؛ ويجوز الاتفاق على مدة أطول. حاسبة.',
      intro:
        'قاعدة الإشعار في البحرين بسيطة على الورق — حد أدنى 30 يوماً — لكن الطريقة التي يمكن تمديدها بها من جانب واحد تستحق المعرفة قبل توقيع العقد.',
      sections: [
        {
          heading: 'مدة الإشعار المطلوبة',
          body: `تمنح المادة 99 أي طرف في العقد غير المحدد المدة حق إنهائه بإشعار كتابي **لا يقل عن 30 يوماً**.`,
        },
        {
          heading: 'هل يجوز تمديد مدة الإشعار بالاتفاق',
          body: `نعم، لكن في اتجاه واحد فقط. يجوز أن يحدد العقد مدة إشعار **أطول** من 30 يوماً، وتكون تلك المدة الأطول نافذة. أما ما لا يجوز فهو الاتفاق على **أقل** من 30 يوماً — فأي بند يحاول تقليص الحد الأدنى القانوني يكون باطلاً، فيبقى الثلاثون يوماً هو الحد الأدنى بصرف النظر عن نص العقد.`,
        },
        {
          heading: 'مثال عملي',
          body: `موظف يتقاضى **450 ديناراً بحرينياً** شهرياً أُنهي عقده دون إشعار. وبالحد الأدنى القانوني 30 يوماً، يُستحق بدل شهر واحد: **450 ديناراً**. ولو كان عقده قد حدد مدة إشعار أطول، 45 يوماً، لاستُحق في الحالة نفسها نحو شهر ونصف: قرابة **675 ديناراً**.`,
        },
        {
          heading: 'الإشعار مقابل نهاية الخدمة',
          body: `مدة الإشعار (30 يوماً أو أكثر) منفصلة عن مكافأة البحرين عند ترك العمل بموجب المادة 116، التي تعتمد شرائحها الخاصة (15/30 يوماً) على مدة الخدمة. استخدم حاسبة نهاية الخدمة لذلك الرقم.`,
        },
      ],
      keyTakeaways: ['إشعار كتابي لا يقل عن 30 يوماً.', 'يجوز الاتفاق على مدة أطول؛ والأقصر باطل.', 'يجوز دفع بدل عن الإشعار.'],
      faqs: [
        { q: 'ما الحد الأدنى لمدة الإشعار في البحرين؟', a: 'إشعار كتابي لا يقل عن 30 يوماً بموجب المادة 99، ينطبق على أي طرف في العقد غير المحدد المدة.' },
        { q: 'هل يجوز أن يشترط عقد العمل في البحرين أكثر من 30 يوماً إشعاراً؟', a: 'نعم — يجوز الاتفاق على مدة أطول وتكون نافذة، لكن أي بند يحدد أقل من 30 يوماً يكون باطلاً.' },
        { q: 'هل يُسمح بدفع بدل عن الإشعار في البحرين؟', a: 'نعم — يجوز تسوية مدة الإشعار نقداً بدلاً من العمل خلالها.' },
      ],
      relatedCalculators: REL,
      lastReviewed: R,
    },
  },

  /* ───────────────────────── Oman ───────────────────────── */
  'notice-period-oman': {
    en: {
      slug: 'notice-period-oman',
      locale: 'en',
      title: 'Oman Notice Period: 30 Days (2026)',
      metaDescription:
        'Oman requires at least 30 days’ notice for monthly-paid indefinite contracts (15 for others) under Labour Law (RD 53/2023) Art. 38. Calculator + details.',
      intro:
        'Oman’s notice rule has two layers most people miss: the length depends on how you’re paid, and it stretches much longer if the termination is for economic reasons. Here’s both.',
      sections: [
        {
          heading: 'How much notice is required',
          body: `Article 38 of the 2023 Labour Law (Royal Decree 53/2023) sets the notice period at **at least 30 days** for **monthly-paid** workers and **15 days** for others, applying to either party ending an indefinite-term contract.`,
        },
        {
          heading: 'What happens if notice isn’t given',
          body: `Ending the contract without serving the notice period triggers **compensation equal to the notice-period wage** — effectively the same outcome as payment in lieu, calculated on whichever notice length (30 or 15 days) applies to that worker.`,
        },
        {
          heading: 'Longer notice for economic-cause terminations',
          body: `If the termination is for **economic reasons**, the notice period is substantially longer: **at least 3 months**, well beyond the standard 30-day minimum for monthly-paid workers.`,
        },
        {
          heading: 'Worked example',
          body: `A monthly-paid employee earning **500 OMR** has their contract ended with no notice. Because 30 days is one month, the compensation equals roughly one month’s wage: **500 OMR**. If the same employee were instead let go for an economic-cause reason requiring the 3-month notice, the equivalent figure would be about **1,500 OMR**.`,
        },
      ],
      keyTakeaways: ['30 days for monthly-paid workers (15 for others).', 'No-notice termination = compensation equal to the notice wage.', 'Economic-cause terminations need 3 months’ notice.'],
      faqs: [
        { q: 'How many days’ notice does Oman require?', a: 'At least 30 days for monthly-paid workers, and 15 days for others, under Article 38.' },
        { q: 'What am I owed if my Omani employer ends my contract without notice?', a: 'Compensation equal to the wage for the notice period you were owed — 30 or 15 days, depending on how you’re paid.' },
        { q: 'Is the notice period different for economic-cause (redundancy-style) terminations in Oman?', a: 'Yes — those require at least 3 months’ notice, far longer than the standard 30-day minimum.' },
      ],
      relatedCalculators: REL,
      lastReviewed: R,
    },
    ar: {
      slug: 'notice-period-oman',
      locale: 'ar',
      title: 'مدة الإشعار في عُمان: 30 يوماً (2026)',
      metaDescription:
        'يشترط عُمان إشعاراً لا يقل عن 30 يوماً للعقود غير المحددة الشهرية (15 لغيرهم) بموجب قانون العمل (مرسوم 53/2023) المادة 38. حاسبة وتفاصيل.',
      intro:
        'قاعدة الإشعار في عُمان تحمل طبقتين كثيراً ما تُهملان: المدة تتوقف على طريقة الدفع، وتطول كثيراً إن كان الإنهاء لسبب اقتصادي. وفيما يلي الطبقتان.',
      sections: [
        {
          heading: 'مدة الإشعار المطلوبة',
          body: `تحدد المادة 38 من قانون العمل لعام 2023 (مرسوم سلطاني 53/2023) مدة الإشعار بـ **30 يوماً على الأقل** للعامل **الشهري** و**15 يوماً** لغيره، وتنطبق على أي طرف يُنهي العقد غير المحدد المدة.`,
        },
        {
          heading: 'ماذا يحدث إن لم يُعطَ الإشعار',
          body: `إنهاء العقد دون استيفاء مدة الإشعار يستوجب **تعويضاً يعادل أجر مدة الإشعار** — وهو عملياً نفس أثر البدل النقدي، يُحسب على مدة الإشعار المطبّقة على ذلك الموظف (30 أو 15 يوماً).`,
        },
        {
          heading: 'إشعار أطول للإنهاء لسبب اقتصادي',
          body: `إن كان الإنهاء لسبب **اقتصادي**، تطول مدة الإشعار كثيراً: **3 أشهر على الأقل**، أي أكثر بكثير من الحد الأدنى العادي 30 يوماً للعامل الشهري.`,
        },
        {
          heading: 'مثال عملي',
          body: `موظف شهري يتقاضى **500 ريال عُماني** أُنهي عقده دون إشعار. ولأن 30 يوماً تساوي شهراً واحداً، فالتعويض يعادل أجر شهر تقريباً: **500 ريال**. ولو أُنهي عمل الموظف نفسه لسبب اقتصادي يستوجب إشعار 3 أشهر، لكان الرقم المعادل نحو **1,500 ريال**.`,
        },
      ],
      keyTakeaways: ['30 يوماً للعامل الشهري (15 لغيره).', 'الإنهاء دون إشعار = تعويض يعادل أجر الإشعار.', 'الإنهاء لسبب اقتصادي يحتاج 3 أشهر إشعار.'],
      faqs: [
        { q: 'كم يوماً إشعار تشترط عُمان؟', a: '30 يوماً على الأقل للعامل الشهري، و15 يوماً لغيره، بموجب المادة 38.' },
        { q: 'ما الذي يُستحق لي إن أنهى صاحب العمل عقدي في عُمان دون إشعار؟', a: 'تعويض يعادل أجر مدة الإشعار المستحقة لك — 30 أو 15 يوماً، بحسب طريقة أجرك.' },
        { q: 'هل تختلف مدة الإشعار في حالات الإنهاء لسبب اقتصادي في عُمان؟', a: 'نعم — تستوجب هذه الحالات إشعاراً لا يقل عن 3 أشهر، أطول بكثير من الحد الأدنى العادي 30 يوماً.' },
      ],
      relatedCalculators: REL,
      lastReviewed: R,
    },
  },
};

export default noticeGuides;
