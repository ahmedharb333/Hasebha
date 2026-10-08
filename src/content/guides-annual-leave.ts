import type { GuideContent } from './types';
import type { Locale } from '../config/site';

/**
 * Per-country annual-leave guides.
 *
 * Each entry targets one country's statutory annual-leave rule. Numbers,
 * article citations and bands mirror the country-rules engine
 * (src/lib/country-rules/*); nothing here adds a fact the engine doesn't
 * already state. Sections and FAQs are written per country rather than from
 * a shared template, because what's actually distinctive — a waiting period,
 * a calendar-day rule, a monetisation option, a carryover cap — differs from
 * one country to the next.
 *
 * Last reviewed: 2026-10-01.
 */
const R = '2026-10-01';
const REL = ['leave-balance', 'maternity-leave', 'end-of-service'];

const annualLeaveGuides: Record<string, Record<Locale, GuideContent>> = {
  /* ───────────────────────── Jordan ───────────────────────── */
  'annual-leave-jordan': {
    en: {
      slug: 'annual-leave-jordan',
      locale: 'en',
      title: 'Jordan Annual Leave: 14–21 Days (2026)',
      metaDescription:
        'Jordan annual leave: 14 days per year, rising to 21 days after 5 years of service (Labour Law Art. 61). Accrual, carryover, and the calculator.',
      intro:
        'Jordan’s annual leave entitlement is set by Article 61 of the Labour Law, and it is one of the more straightforward regimes in the region: a flat 14 days that steps up once, after five years with the same employer. This guide walks through how the entitlement builds over the year, what changes at the five-year mark, and a worked example matching the Klar leave-balance calculator.',
      sections: [
        {
          heading: 'The entitlement: 14 days, then 21',
          body: `Article 61 grants **14 days** of paid annual leave for every year of service. Once an employee completes **5 years** with the same employer, the entitlement rises to **21 days** for every year after that. The step applies to continuous service with the employer, not to a particular role — a promotion or internal transfer with the same employer does not reset the count toward the five-year mark.`,
        },
        {
          heading: 'Accrual during the year',
          body: `Leave is not granted as a single lump sum on an anniversary date — it builds up as the employee works through the leave year. A year that ends partway through, whether by resignation, termination or a move between employers, is pro-rated to the days actually worked rather than rounded up to the full annual figure.`,
        },
        {
          heading: 'Worked example',
          body: `An employee with **3 years** of service — still on the 14-day band — checks their balance after working **8 months** of the current leave year. Accrued leave = 14 × (8 ÷ 12) ≈ **9.3 days**, roughly 9 full days available before accounting for any leave already taken. Once this same employee passes 5 years of service, the identical calculation would use 21 days instead of 14, giving 21 × (8 ÷ 12) = 14 days for the same 8-month stretch.`,
        },
        {
          heading: 'Checking your balance',
          body: `Because accrual runs continuously rather than arriving in one block, the simplest way to see what has actually built up between any two dates is the leave-balance calculator — it applies the same pro-rating shown above to your real start date and current tenure.`,
        },
      ],
      keyTakeaways: [
        '14 days per year, rising to 21 days once 5 years of service are completed.',
        'The jump from 14 to 21 happens at the 5-year mark, not gradually.',
        'Leave accrues continuously; partial years are pro-rated.',
        'Use the leave-balance calculator to translate your hire date into days accrued.',
      ],
      faqs: [
        { q: 'How many annual leave days do I get in Jordan?', a: 'Fourteen days per year under Article 61, rising to 21 days per year once you complete 5 years of service with the same employer.' },
        { q: 'When exactly does my leave increase to 21 days in Jordan?', a: 'At the point you complete 5 years of continuous service with the same employer — the new 21-day rate then applies to every year after that, not retroactively to earlier years.' },
        { q: 'Does annual leave accrue if I haven’t worked a full year in Jordan?', a: 'Yes. Leave builds up as you work through the year, so a partial year — because you started mid-year or your employment ended early — is paid out pro-rated rather than as the full annual figure.' },
      ],
      relatedCalculators: REL,
      lastReviewed: R,
    },
    ar: {
      slug: 'annual-leave-jordan',
      locale: 'ar',
      title: 'الإجازة السنوية في الأردن: 14–21 يوماً (2026)',
      metaDescription:
        'الإجازة السنوية في الأردن: 14 يوماً سنوياً، ترتفع إلى 21 يوماً بعد 5 سنوات خدمة (المادة 61). الاستحقاق والترحيل والحاسبة.',
      intro:
        'تنظّم المادة 61 من قانون العمل الإجازة السنوية في الأردن، وهي من أبسط الأنظمة في المنطقة: 14 يوماً ثابتة ترتفع مرة واحدة فقط بعد خمس سنوات لدى صاحب العمل نفسه. يشرح هذا الدليل كيف يتراكم الاستحقاق خلال السنة، وما يتغيّر عند عتبة الخمس سنوات، مع مثال عملي مطابق لحاسبة رصيد الإجازات في كلار.',
      sections: [
        {
          heading: 'الاستحقاق: 14 يوماً ثم 21',
          body: `تمنح المادة 61 **14 يوماً** من الإجازة السنوية المدفوعة عن كل سنة خدمة. ومتى أكمل الموظف **5 سنوات** لدى صاحب العمل نفسه، يرتفع الاستحقاق إلى **21 يوماً** عن كل سنة بعد ذلك. ويُحسب هذا الارتفاع على أساس استمرار الخدمة لدى صاحب العمل، لا على طبيعة الوظيفة — فالترقية أو النقل الداخلي لدى صاحب العمل نفسه لا يُعيد عدّ سنوات الخدمة من جديد.`,
        },
        {
          heading: 'التراكم خلال السنة',
          body: `لا تُمنح الإجازة دفعة واحدة في تاريخ معيّن، بل تتراكم مع تقدّم الموظف في السنة. فإذا انتهت الخدمة في منتصف السنة — بالاستقالة أو الإنهاء أو الانتقال إلى صاحب عمل آخر — تُقسم الإجازة تناسبياً بحسب ما عُمل فعلاً لا بتقريبها إلى الرقم السنوي الكامل.`,
        },
        {
          heading: 'مثال عملي',
          body: `موظف أكمل **3 سنوات** خدمة — وما زال على شريحة 14 يوماً — يتحقق من رصيده بعد العمل **8 أشهر** من السنة الحالية. الإجازة المتراكمة = 14 × (8 ÷ 12) ≈ **9.3 أيام**، أي نحو 9 أيام كاملة متاحة قبل حساب أي إجازة سابقة مأخوذة. ومتى تجاوز هذا الموظف نفسه 5 سنوات خدمة، يصبح الحساب ذاته على أساس 21 يوماً بدلاً من 14، فيكون الناتج 21 × (8 ÷ 12) = 14 يوماً عن نفس فترة الثمانية أشهر.`,
        },
        {
          heading: 'التحقق من رصيدك',
          body: `بما أن التراكم مستمر ولا يُمنح دفعة واحدة، فأسهل طريقة لمعرفة ما تراكم فعلياً بين تاريخين هي حاسبة رصيد الإجازات، التي تُطبّق نفس التقسيم التناسبي أعلاه على تاريخ تعيينك الحقيقي ومدة خدمتك الحالية.`,
        },
      ],
      keyTakeaways: [
        '14 يوماً سنوياً، ترتفع إلى 21 يوماً بعد إكمال 5 سنوات خدمة.',
        'الارتفاع من 14 إلى 21 يحدث عند عتبة الخمس سنوات دفعة واحدة، لا تدريجياً.',
        'تتراكم الإجازة باستمرار؛ والكسور تُقسم تناسبياً.',
        'استخدم حاسبة رصيد الإجازات لترجمة تاريخ تعيينك إلى أيام متراكمة.',
      ],
      faqs: [
        { q: 'كم يوماً إجازة سنوية أستحق في الأردن؟', a: 'أربعة عشر يوماً سنوياً بموجب المادة 61، ترتفع إلى 21 يوماً سنوياً متى أكملت 5 سنوات خدمة لدى صاحب العمل نفسه.' },
        { q: 'في أي لحظة ترتفع إجازتي إلى 21 يوماً في الأردن؟', a: 'عند إكمالك 5 سنوات خدمة متصلة لدى صاحب العمل نفسه — ويُطبّق معدل 21 يوماً الجديد على كل سنة بعد ذلك، لا بأثر رجعي على السنوات السابقة.' },
        { q: 'هل تتراكم الإجازة إذا لم أعمل سنة كاملة في الأردن؟', a: 'نعم. تتراكم الإجازة مع تقدّمك في السنة، فإذا كانت سنتك جزئية — لأنك بدأت العمل في منتصفها أو انتهت خدمتك مبكراً — تُدفع تناسبياً لا بالرقم السنوي الكامل.' },
      ],
      relatedCalculators: REL,
      lastReviewed: R,
    },
  },

  /* ───────────────────────── Saudi Arabia ───────────────────────── */
  'annual-leave-saudi-arabia': {
    en: {
      slug: 'annual-leave-saudi-arabia',
      locale: 'en',
      title: 'Saudi Annual Leave: 21–30 Days (2026)',
      metaDescription:
        'Saudi annual leave: 21 days per year with full pay, rising to 30 days after 5 consecutive years (Labour Law Art. 109). Calculator + details.',
      intro:
        'Saudi Arabia’s annual leave is set by Article 109 of the Labour Law and stands out regionally for being paid at full salary throughout, with a second-tier increase after five consecutive years with the same employer. This guide covers both bands, how the leave is paid, and a worked example matching the Klar calculator.',
      sections: [
        {
          heading: 'The entitlement: 21 days, then 30',
          body: `Article 109 grants **21 days** of annual leave per year, rising to **30 days** once an employee completes **5 consecutive years** with the same employer. The increase requires the five years to be continuous — a break in service can affect when the clock resets, so it is worth confirming continuous-service status with HR if your employment history has a gap.`,
        },
        {
          heading: 'Paid at full wage',
          body: `Annual leave in Saudi Arabia is paid at the employee’s **full wage**, not a basic-wage-only figure the way some other calculations in the region are. That makes the leave day's value straightforward: it is simply the employee's normal daily pay.`,
        },
        {
          heading: 'Worked example',
          body: `An employee with **2 years** of service checks their balance **9 months** into the leave year. At the 21-day band, accrued leave = 21 × (9 ÷ 12) = **15.75 days**, roughly 16 days. After this employee's fifth consecutive year, the same 9-month check-in would instead accrue 30 × (9 ÷ 12) = 22.5 days.`,
        },
        {
          heading: 'Checking your balance',
          body: `Because the entitlement is expressed per year and accrues continuously rather than arriving all at once, use the leave-balance calculator to translate your own hire date and today's date into the days you've actually built up.`,
        },
      ],
      keyTakeaways: [
        '21 days per year on full pay, rising to 30 days after 5 consecutive years.',
        'Leave is paid at the full wage, not a basic-wage figure.',
        'The 5-year step requires continuous service with the same employer.',
        'Accrues continuously over the year; partial years are pro-rated.',
      ],
      faqs: [
        { q: 'How many annual leave days in Saudi Arabia?', a: '21 days per year under Article 109, rising to 30 days per year once you complete 5 consecutive years with the same employer.' },
        { q: 'Is Saudi annual leave paid at full salary or basic wage?', a: 'Full salary. Unlike some other statutory payments in the region, annual leave in Saudi Arabia is not limited to the basic-wage component.' },
        { q: 'What happens to my Saudi leave balance if my employment ends mid-year?', a: 'It is pro-rated to the exact point your service ends, using whichever band (21 or 30 days) applies to your tenure at that date — not the full annual figure.' },
      ],
      relatedCalculators: REL,
      lastReviewed: R,
    },
    ar: {
      slug: 'annual-leave-saudi-arabia',
      locale: 'ar',
      title: 'الإجازة السنوية في السعودية: 21–30 يوماً (2026)',
      metaDescription:
        'الإجازة السنوية في السعودية: 21 يوماً بأجر كامل، ترتفع إلى 30 يوماً بعد 5 سنوات متصلة (المادة 109). حاسبة وتفاصيل.',
      intro:
        'تنظّم المادة 109 من نظام العمل الإجازة السنوية في السعودية، وتتميز إقليمياً بأنها مدفوعة بالأجر الكامل طوال المدة، مع درجة ثانية ترتفع بعد خمس سنوات متصلة لدى صاحب العمل نفسه. يشرح هذا الدليل الشريحتين وطريقة الدفع، مع مثال عملي مطابق لحاسبة كلار.',
      sections: [
        {
          heading: 'الاستحقاق: 21 يوماً ثم 30',
          body: `تمنح المادة 109 **21 يوماً** من الإجازة السنوية عن كل سنة، ترتفع إلى **30 يوماً** متى أكمل الموظف **5 سنوات متصلة** لدى صاحب العمل نفسه. ويتطلب هذا الارتفاع أن تكون الخمس سنوات متصلة دون انقطاع — فانقطاع الخدمة قد يؤثر على توقيت إعادة عدّ السنوات، ويُستحسن التأكد من استمرارية الخدمة مع الموارد البشرية إن كان في سجلك فجوة.`,
        },
        {
          heading: 'الدفع بالأجر الكامل',
          body: `تُدفع الإجازة السنوية في السعودية على **الأجر الكامل** للموظف، لا على الأجر الأساسي فقط كما هو الحال في بعض الحسابات الأخرى في المنطقة. وهذا يجعل قيمة يوم الإجازة مباشرة: هي أجر يوم العمل العادي للموظف.`,
        },
        {
          heading: 'مثال عملي',
          body: `موظف أكمل **سنتين** خدمة يتحقق من رصيده بعد **9 أشهر** من السنة الحالية. على شريحة 21 يوماً، الإجازة المتراكمة = 21 × (9 ÷ 12) = **15.75 يوماً**، أي نحو 16 يوماً. وبعد السنة الخامسة المتصلة لهذا الموظف، يصبح الحساب نفسه عند 9 أشهر مساوياً لـ 30 × (9 ÷ 12) = 22.5 يوماً.`,
        },
        {
          heading: 'التحقق من رصيدك',
          body: `بما أن الاستحقاق يُعبَّر عنه سنوياً لكنه يتراكم باستمرار لا دفعة واحدة، استخدم حاسبة رصيد الإجازات لترجمة تاريخ تعيينك وتاريخ اليوم إلى الأيام التي تراكمت لديك فعلياً.`,
        },
      ],
      keyTakeaways: [
        '21 يوماً سنوياً بأجر كامل، ترتفع إلى 30 يوماً بعد 5 سنوات متصلة.',
        'تُدفع الإجازة على الأجر الكامل لا على الأجر الأساسي فقط.',
        'ارتفاع السنة الخامسة يتطلب خدمة متصلة لدى صاحب العمل نفسه.',
        'تتراكم باستمرار خلال السنة؛ والكسور تناسبية.',
      ],
      faqs: [
        { q: 'كم يوماً إجازة سنوية أستحق في السعودية؟', a: '21 يوماً سنوياً بموجب المادة 109، ترتفع إلى 30 يوماً سنوياً متى أكملت 5 سنوات متصلة لدى صاحب العمل نفسه.' },
        { q: 'هل تُدفع الإجازة السنوية في السعودية بالراتب الكامل أم الأساسي؟', a: 'بالراتب الكامل. وعلى عكس بعض المستحقات النظامية الأخرى في المنطقة، لا تنحصر الإجازة السنوية في السعودية بعنصر الأجر الأساسي.' },
        { q: 'ماذا يحدث لرصيد إجازتي في السعودية إذا انتهت خدمتي في منتصف السنة؟', a: 'يُقسم تناسبياً حتى تاريخ انتهاء الخدمة بالضبط، باستخدام الشريحة المنطبقة (21 أو 30 يوماً) على مدة خدمتك في ذلك التاريخ، لا بالرقم السنوي الكامل.' },
      ],
      relatedCalculators: REL,
      lastReviewed: R,
    },
  },

  /* ───────────────────────── UAE ───────────────────────── */
  'annual-leave-uae': {
    en: {
      slug: 'annual-leave-uae',
      locale: 'en',
      title: 'UAE Annual Leave: 30 Days (2026)',
      metaDescription:
        'UAE annual leave is 30 calendar days per year after one year of service, and 2 days per month in the first year (Federal Decree-Law 33/2021, Art. 29). Calculator.',
      intro:
        'The UAE runs annual leave on two different clocks under Article 29 of Federal Decree-Law 33/2021 — a smaller monthly allowance during the first year, and a full 30-calendar-day entitlement once a year of service is complete. This guide explains both clocks and a worked example matching the Klar calculator.',
      sections: [
        {
          heading: 'The first year: 2 days a month',
          body: `During the **first year** of employment, Article 29 grants **2 days** of annual leave for each completed month of service — a monthly allowance rather than a single annual figure. An employee who leaves partway through their first year takes this accrued monthly balance with them rather than any pro-rated share of 30 days.`,
        },
        {
          heading: 'After one year: 30 calendar days',
          body: `Once an employee completes **one year** of service, the entitlement switches to **30 calendar days** per year. These are calendar days, not working days — so weekends and public holidays that fall inside a leave period count toward the total, rather than extending it.`,
        },
        {
          heading: 'Worked example',
          body: `An employee **7 months** into their first year has accrued 2 × 7 = **14 days**. Once they pass the one-year mark, the entitlement switches to the 30-calendar-day annual figure — which works out to accruing roughly **2.5 days** for each month of the second year and beyond, pro-rated for any partial year.`,
        },
        {
          heading: 'Partial years after year one',
          body: `For service beyond the first year, a year that ends partway through — by resignation or termination — is pro-rated to the exact number of days worked rather than rounded up to the full 30.`,
        },
      ],
      keyTakeaways: [
        '2 days per month of service during the first year.',
        '30 calendar days per year once one year of service is completed.',
        'The 30 days are calendar days, not working days.',
        'Partial years beyond year one are pro-rated.',
      ],
      faqs: [
        { q: 'How much annual leave do I get in my first year in the UAE?', a: 'Two days for each completed month of service — a monthly allowance rather than a single annual figure, until you complete your first year.' },
        { q: 'How many annual leave days after one year of service in the UAE?', a: '30 calendar days per year under Article 29 of Federal Decree-Law 33/2021.' },
        { q: 'Are UAE annual leave days calendar days or working days?', a: 'Calendar days. A leave period that includes a weekend or public holiday counts those days toward your 30, rather than extending your time off by them.' },
      ],
      relatedCalculators: REL,
      lastReviewed: R,
    },
    ar: {
      slug: 'annual-leave-uae',
      locale: 'ar',
      title: 'الإجازة السنوية في الإمارات: 30 يوماً (2026)',
      metaDescription:
        'الإجازة السنوية في الإمارات 30 يوماً تقويمياً بعد سنة خدمة، ويومان شهرياً في السنة الأولى (المرسوم 33/2021، المادة 29). حاسبة.',
      intro:
        'تُحسب الإجازة السنوية في الإمارات على أساسين مختلفين بموجب المادة 29 من المرسوم بقانون اتحادي 33 لسنة 2021: مخصص شهري أصغر خلال السنة الأولى، ثم استحقاق كامل 30 يوماً تقويمياً بعد إكمال سنة خدمة. يشرح هذا الدليل الأساسين معاً، مع مثال عملي مطابق لحاسبة كلار.',
      sections: [
        {
          heading: 'السنة الأولى: يومان شهرياً',
          body: `خلال **السنة الأولى** من العمل، تمنح المادة 29 **يومين** من الإجازة السنوية عن كل شهر خدمة مكتمل — وهو مخصص شهري لا رقم سنوي واحد. والموظف الذي يترك العمل في منتصف سنته الأولى يأخذ هذا الرصيد الشهري المتراكم، لا نسبة تناسبية من الـ30 يوماً.`,
        },
        {
          heading: 'بعد سنة واحدة: 30 يوماً تقويمياً',
          body: `متى أكمل الموظف **سنة واحدة** من الخدمة، ينتقل الاستحقاق إلى **30 يوماً تقويمياً** سنوياً. وهذه أيام تقويمية لا أيام عمل — فعطلات نهاية الأسبوع والعطلات الرسمية الواقعة ضمن فترة الإجازة تُحسب من الإجمالي، لا أن تُضاف إليه.`,
        },
        {
          heading: 'مثال عملي',
          body: `موظف أكمل **7 أشهر** من سنته الأولى تراكم لديه 2 × 7 = **14 يوماً**. ومتى تجاوز عتبة السنة، ينتقل الاستحقاق إلى الرقم السنوي 30 يوماً تقويمياً — وهو ما يعادل تراكماً بمعدل نحو **2.5 يوماً** عن كل شهر من السنة الثانية فصاعداً، مع تقسيم تناسبي لأي سنة جزئية.`,
        },
        {
          heading: 'السنوات الجزئية بعد السنة الأولى',
          body: `بالنسبة للخدمة بعد السنة الأولى، تُقسم السنة التي تنتهي في منتصفها — بالاستقالة أو الإنهاء — تناسبياً بحسب عدد الأيام المعمولة فعلاً، لا بتقريبها إلى الرقم الكامل 30.`,
        },
      ],
      keyTakeaways: [
        'يومان عن كل شهر خدمة خلال السنة الأولى.',
        '30 يوماً تقويمياً سنوياً بعد إكمال سنة خدمة.',
        'الثلاثون يوماً أيام تقويمية لا أيام عمل.',
        'السنوات الجزئية بعد السنة الأولى تُقسم تناسبياً.',
      ],
      faqs: [
        { q: 'كم إجازة سنوية أستحق في سنتي الأولى في الإمارات؟', a: 'يومان عن كل شهر خدمة مكتمل — مخصص شهري لا رقم سنوي واحد — حتى تكمل سنتك الأولى.' },
        { q: 'كم يوماً إجازة سنوية بعد سنة خدمة في الإمارات؟', a: '30 يوماً تقويمياً سنوياً بموجب المادة 29 من المرسوم بقانون اتحادي 33 لسنة 2021.' },
        { q: 'هل أيام الإجازة السنوية في الإمارات تقويمية أم أيام عمل؟', a: 'أيام تقويمية. فإذا وقعت عطلة نهاية أسبوع أو عطلة رسمية ضمن فترة إجازتك، تُحسب من الثلاثين يوماً لا أن تُمدَّد إجازتك بها.' },
      ],
      relatedCalculators: REL,
      lastReviewed: R,
    },
  },

  /* ───────────────────────── Kuwait ───────────────────────── */
  'annual-leave-kuwait': {
    en: {
      slug: 'annual-leave-kuwait',
      locale: 'en',
      title: 'Kuwait Annual Leave: 30 Days (2026)',
      metaDescription:
        'Kuwait annual leave is 30 days per year, pro-rated for partial years, after at least 9 months’ service in the first year (Labour Law Art. 70). Calculator.',
      intro:
        'Kuwait’s annual leave carries a feature that catches new employees out: the 30-day entitlement under Article 70 only becomes available in the first year once at least 9 months have been worked. This guide explains the waiting period, the ongoing accrual, and a worked example matching the Klar calculator.',
      sections: [
        {
          heading: 'The 9-month rule in the first year',
          body: `In an employee's **first year**, Article 70 sets the leave entitlement at **30 days**, but it is only payable once the employee has completed **at least 9 months** of service. An employee who resigns or is terminated before reaching 9 months in their first year does not accrue annual leave for that period under this rule.`,
        },
        {
          heading: '30 days a year, pro-rated',
          body: `From the second year onward, the 9-month rule no longer applies — the **30 days** accrue across the year from day one, and any partial year, whether at the start or end of employment, is pro-rated to the days actually worked.`,
        },
        {
          heading: 'Worked example',
          body: `An employee reaches exactly **9 months** of service in their first year — the point at which entitlement arises. Accrued leave at that point = 30 × (9 ÷ 12) = **22.5 days**. In the second year and beyond, the same 30-day rate applies from the start of the year and is pro-rated for any partial year worked.`,
        },
      ],
      keyTakeaways: [
        '30 days per year under Article 70.',
        'In the first year, entitlement only arises after at least 9 months’ service.',
        'From the second year on, the 9-month rule no longer applies.',
        'Pro-rated for partial years.',
      ],
      faqs: [
        { q: 'Why can’t I take annual leave before 9 months in Kuwait?', a: 'Article 70’s first-year rule only grants entitlement once at least 9 months of service are completed; leaving before that point means no annual leave accrues for that first-year period.' },
        { q: 'How many annual leave days per year in Kuwait?', a: '30 days per year under Article 70, once the first-year waiting period (if applicable) has passed.' },
        { q: 'Is Kuwait leave pro-rated if I leave mid-year?', a: 'Yes — from the second year onward, a partial year is pro-rated to the days actually worked, without the 9-month condition that applies only in the first year.' },
      ],
      relatedCalculators: REL,
      lastReviewed: R,
    },
    ar: {
      slug: 'annual-leave-kuwait',
      locale: 'ar',
      title: 'الإجازة السنوية في الكويت: 30 يوماً (2026)',
      metaDescription:
        'الإجازة السنوية في الكويت 30 يوماً سنوياً، تُقسم تناسبياً للكسور، بعد 9 أشهر خدمة على الأقل في السنة الأولى (المادة 70). حاسبة.',
      intro:
        'تحمل الإجازة السنوية في الكويت تفصيلاً يُفاجئ الموظفين الجدد: لا يصبح استحقاق 30 يوماً بموجب المادة 70 متاحاً في السنة الأولى إلا بعد إكمال 9 أشهر خدمة على الأقل. يشرح هذا الدليل فترة الانتظار والتراكم اللاحق، مع مثال عملي مطابق لحاسبة كلار.',
      sections: [
        {
          heading: 'قاعدة التسعة أشهر في السنة الأولى',
          body: `في **السنة الأولى** للموظف، تحدد المادة 70 استحقاق الإجازة بـ**30 يوماً**، لكنها لا تُستحق إلا متى أكمل الموظف **9 أشهر خدمة على الأقل**. والموظف الذي يستقيل أو تُنهى خدمته قبل إتمام 9 أشهر في سنته الأولى لا يتراكم له إجازة سنوية عن تلك الفترة بموجب هذه القاعدة.`,
        },
        {
          heading: '30 يوماً سنوياً، تُقسم تناسبياً',
          body: `من السنة الثانية فصاعداً، لا تُطبَّق قاعدة التسعة أشهر بعد ذلك — فتتراكم **الثلاثون يوماً** خلال السنة من اليوم الأول، وتُقسم أي سنة جزئية، في بداية الخدمة أو نهايتها، تناسبياً بحسب الأيام المعمولة فعلاً.`,
        },
        {
          heading: 'مثال عملي',
          body: `موظف أكمل بالضبط **9 أشهر** خدمة في سنته الأولى — وهي النقطة التي يبدأ عندها الاستحقاق. الإجازة المتراكمة عند تلك النقطة = 30 × (9 ÷ 12) = **22.5 يوماً**. وفي السنة الثانية فما بعد، يُطبَّق معدل الثلاثين يوماً نفسه من بداية السنة، ويُقسم تناسبياً لأي سنة جزئية.`,
        },
      ],
      keyTakeaways: [
        '30 يوماً سنوياً بموجب المادة 70.',
        'في السنة الأولى، لا يبدأ الاستحقاق إلا بعد 9 أشهر خدمة على الأقل.',
        'من السنة الثانية فصاعداً، لا تُطبَّق قاعدة التسعة أشهر.',
        'تُقسم الكسور تناسبياً.',
      ],
      faqs: [
        { q: 'لماذا لا يمكنني أخذ إجازة سنوية قبل 9 أشهر في الكويت؟', a: 'قاعدة السنة الأولى في المادة 70 لا تمنح الاستحقاق إلا بعد إتمام 9 أشهر خدمة على الأقل؛ وترك العمل قبل ذلك يعني عدم تراكم إجازة سنوية عن تلك الفترة.' },
        { q: 'كم يوماً إجازة سنوية في الكويت؟', a: '30 يوماً سنوياً بموجب المادة 70، متى انقضت فترة الانتظار في السنة الأولى (إن انطبقت).' },
        { q: 'هل تُقسم الإجازة تناسبياً إذا تركت العمل في منتصف السنة في الكويت؟', a: 'نعم — من السنة الثانية فصاعداً تُقسم السنة الجزئية تناسبياً بحسب الأيام المعمولة فعلاً، دون شرط التسعة أشهر الذي يُطبَّق في السنة الأولى فقط.' },
      ],
      relatedCalculators: REL,
      lastReviewed: R,
    },
  },

  /* ───────────────────────── Qatar ───────────────────────── */
  'annual-leave-qatar': {
    en: {
      slug: 'annual-leave-qatar',
      locale: 'en',
      title: 'Qatar Annual Leave: 21–28 Days (2026)',
      metaDescription:
        'Qatar annual leave: three weeks (21 days) per year under 5 years, four weeks (28 days) from 5 years (Labour Law Art. 79). Calculator + details.',
      intro:
        'Qatar’s annual leave rises once, from three weeks to four, after five years of consecutive service — a two-band structure set out in Article 79 of the Labour Law. This guide covers both bands and a worked example matching the Klar calculator.',
      sections: [
        {
          heading: 'Three weeks, then four',
          body: `Article 79 grants **three weeks (21 days)** of annual leave per year for an employee with **less than five years'** consecutive service, rising to **four weeks (28 days)** once that employee reaches **five years**. As with Jordan and Saudi Arabia, the increase is a single step at the five-year mark rather than a gradual climb.`,
        },
        {
          heading: 'Accrual and partial years',
          body: `Leave accrues across the year rather than arriving as a lump sum, so an employee whose service ends partway through a leave year — by resignation, termination, or contract expiry — has their entitlement pro-rated to the days actually worked, using whichever band (21 or 28 days) applied to their tenure at that point.`,
        },
        {
          heading: 'Worked example',
          body: `An employee with **3 years** of consecutive service — still on the three-week (21-day) band — checks their balance **10 months** into the leave year. Accrued leave = 21 × (10 ÷ 12) ≈ **17.5 days**. Once the employee reaches 5 years, the same calculation at the 10-month mark would use 28 days instead of 21, giving 28 × (10 ÷ 12) ≈ 23.3 days.`,
        },
      ],
      keyTakeaways: [
        '21 days (three weeks) per year under 5 years of consecutive service.',
        '28 days (four weeks) per year once 5 years are reached.',
        'The increase happens at the 5-year mark, not gradually.',
        'Partial years pro-rated using whichever band applies at that date.',
      ],
      faqs: [
        { q: 'How many annual leave days in Qatar?', a: 'Three weeks (21 days) per year under Article 79 for less than 5 years of consecutive service, rising to four weeks (28 days) once you reach 5 years.' },
        { q: 'When does Qatar leave increase to four weeks?', a: 'Once an employee completes 5 years of consecutive service — the 28-day rate then applies going forward, not retroactively.' },
        { q: 'Is annual leave pro-rated in Qatar if I leave mid-year?', a: 'Yes. Whichever band applies to your tenure — 21 or 28 days — is pro-rated to the exact point your service ends that year.' },
      ],
      relatedCalculators: REL,
      lastReviewed: R,
    },
    ar: {
      slug: 'annual-leave-qatar',
      locale: 'ar',
      title: 'الإجازة السنوية في قطر: 21–28 يوماً (2026)',
      metaDescription:
        'الإجازة السنوية في قطر: ثلاثة أسابيع (21 يوماً) دون 5 سنوات، وأربعة أسابيع (28 يوماً) من 5 سنوات (المادة 79). حاسبة وتفاصيل.',
      intro:
        'ترتفع الإجازة السنوية في قطر مرة واحدة فقط، من ثلاثة أسابيع إلى أربعة، بعد خمس سنوات من الخدمة المتصلة — وذلك بشريحتين تحددهما المادة 79 من قانون العمل. يشرح هذا الدليل الشريحتين، مع مثال عملي مطابق لحاسبة كلار.',
      sections: [
        {
          heading: 'ثلاثة أسابيع ثم أربعة',
          body: `تمنح المادة 79 **ثلاثة أسابيع (21 يوماً)** من الإجازة السنوية عن كل سنة لمن لديه **أقل من خمس سنوات** خدمة متصلة، ترتفع إلى **أربعة أسابيع (28 يوماً)** متى بلغ هذا الموظف **خمس سنوات**. وكما في الأردن والسعودية، يكون الارتفاع درجة واحدة عند عتبة الخمس سنوات لا تصاعداً تدريجياً.`,
        },
        {
          heading: 'التراكم والسنوات الجزئية',
          body: `تتراكم الإجازة خلال السنة ولا تُمنح دفعة واحدة، فإذا انتهت خدمة الموظف في منتصف سنة الإجازة — بالاستقالة أو الإنهاء أو انتهاء العقد — يُقسم استحقاقه تناسبياً بحسب الأيام المعمولة فعلاً، باستخدام الشريحة المنطبقة (21 أو 28 يوماً) على مدة خدمته في تلك اللحظة.`,
        },
        {
          heading: 'مثال عملي',
          body: `موظف لديه **3 سنوات** خدمة متصلة — وما زال على شريحة ثلاثة الأسابيع (21 يوماً) — يتحقق من رصيده بعد **10 أشهر** من سنة الإجازة. الإجازة المتراكمة = 21 × (10 ÷ 12) ≈ **17.5 يوماً**. ومتى بلغ هذا الموظف 5 سنوات، يصبح الحساب نفسه عند الشهر العاشر على أساس 28 يوماً بدلاً من 21، فيكون الناتج 28 × (10 ÷ 12) ≈ 23.3 يوماً.`,
        },
      ],
      keyTakeaways: [
        '21 يوماً (ثلاثة أسابيع) سنوياً دون 5 سنوات خدمة متصلة.',
        '28 يوماً (أربعة أسابيع) سنوياً متى بلغ الموظف 5 سنوات.',
        'الارتفاع يحدث عند عتبة الخمس سنوات دفعة واحدة، لا تدريجياً.',
        'الكسور تُقسم تناسبياً باستخدام الشريحة المنطبقة في ذلك التاريخ.',
      ],
      faqs: [
        { q: 'كم يوماً إجازة سنوية أستحق في قطر؟', a: 'ثلاثة أسابيع (21 يوماً) سنوياً بموجب المادة 79 لمن لديه أقل من 5 سنوات خدمة متصلة، ترتفع إلى أربعة أسابيع (28 يوماً) متى بلغت 5 سنوات.' },
        { q: 'متى ترتفع إجازتي في قطر إلى أربعة أسابيع؟', a: 'متى أكملت 5 سنوات خدمة متصلة — ويُطبَّق معدل 28 يوماً من تلك اللحظة فصاعداً، لا بأثر رجعي.' },
        { q: 'هل تُقسم الإجازة تناسبياً إذا تركت العمل في منتصف السنة في قطر؟', a: 'نعم. تُقسم الشريحة المنطبقة على مدة خدمتك — 21 أو 28 يوماً — تناسبياً حتى اللحظة التي تنتهي فيها خدمتك في تلك السنة.' },
      ],
      relatedCalculators: REL,
      lastReviewed: R,
    },
  },

  /* ───────────────────────── Bahrain ───────────────────────── */
  'annual-leave-bahrain': {
    en: {
      slug: 'annual-leave-bahrain',
      locale: 'en',
      title: 'Bahrain Annual Leave: 30 Days (2026)',
      metaDescription:
        'Bahrain annual leave is 30 days per year after one year, accruing 2.5 days per month, and may be monetised (Labour Law Art. 58–59). Calculator.',
      intro:
        'Bahrain’s annual leave accrues monthly rather than arriving as a single annual block, and — unusually among the countries covered here — unused days can be monetised under Article 59 rather than only carried forward. This guide covers the monthly accrual, the payout option, and a worked example matching the Klar calculator.',
      sections: [
        {
          heading: 'Accrual: 2.5 days a month',
          body: `Article 58 sets annual leave at **30 days** per year for an employee with at least one year of service, which works out to accruing at **2.5 days per month** (30 ÷ 12). Service under one year uses the same monthly rate, pro-rated to the months actually worked.`,
        },
        {
          heading: 'Unused leave can be monetised',
          body: `Article 59 allows unused annual leave to be paid out in cash rather than only carried forward to the following year — a feature that sets Bahrain apart from several neighbouring regimes, where unused leave is either forfeited or carried over with no cash-out option.`,
        },
        {
          heading: 'Worked example',
          body: `An employee with **1.5 years** of service checks their balance **4 months** into the current leave year. Accrued leave = 2.5 × 4 = **10 days**. If the employee does not use those 10 days and the employer agrees, Article 59 allows them to be monetised in cash instead of being carried over indefinitely.`,
        },
      ],
      keyTakeaways: [
        '30 days per year after one year of service.',
        'Accrues at a steady 2.5 days per month.',
        'Unused leave may be monetised under Article 59, not only carried over.',
        'Service under one year is pro-rated using the same monthly rate.',
      ],
      faqs: [
        { q: 'How does annual leave accrue in Bahrain?', a: 'At a steady 2.5 days per month under Article 58 — equivalent to 30 days per year once you have completed one year of service.' },
        { q: 'Can I get paid instead of taking leave in Bahrain?', a: 'Yes. Article 59 allows unused annual leave to be monetised in cash, subject to the employer’s agreement, rather than only carrying it forward.' },
        { q: 'How much annual leave am I entitled to in Bahrain?', a: '30 days per year once you’ve completed one year of service; service under one year accrues at the same 2.5-days-per-month rate, pro-rated.' },
      ],
      relatedCalculators: REL,
      lastReviewed: R,
    },
    ar: {
      slug: 'annual-leave-bahrain',
      locale: 'ar',
      title: 'الإجازة السنوية في البحرين: 30 يوماً (2026)',
      metaDescription:
        'الإجازة السنوية في البحرين 30 يوماً سنوياً بعد سنة، تتراكم 2.5 يوماً شهرياً، ويجوز صرفها نقداً (المادة 58–59). حاسبة.',
      intro:
        'تتراكم الإجازة السنوية في البحرين شهرياً لا دفعة واحدة في السنة، ويجوز — بخلاف أغلب الدول المذكورة هنا — صرف الأيام غير المستخدمة نقداً بموجب المادة 59 بدلاً من ترحيلها فقط. يشرح هذا الدليل التراكم الشهري وخيار الصرف النقدي، مع مثال عملي مطابق لحاسبة كلار.',
      sections: [
        {
          heading: 'التراكم: 2.5 يوماً شهرياً',
          body: `تحدد المادة 58 الإجازة السنوية بـ**30 يوماً** سنوياً للموظف الذي أكمل سنة خدمة على الأقل، وهو ما يعادل تراكماً بمعدل **2.5 يوماً شهرياً** (30 ÷ 12). والخدمة دون سنة تُحسب بالمعدل الشهري نفسه، مقسّمة تناسبياً على الأشهر المعمولة فعلاً.`,
        },
        {
          heading: 'يجوز صرف الإجازة غير المستخدمة نقداً',
          body: `تسمح المادة 59 بصرف الإجازة السنوية غير المستخدمة نقداً بدلاً من ترحيلها إلى السنة التالية فقط — وهو ما يميّز البحرين عن عدة أنظمة مجاورة، حيث تُفقد الإجازة غير المستخدمة أو تُرحَّل دون خيار الصرف النقدي.`,
        },
        {
          heading: 'مثال عملي',
          body: `موظف أكمل **سنة ونصف** خدمة يتحقق من رصيده بعد **4 أشهر** من سنة الإجازة الحالية. الإجازة المتراكمة = 2.5 × 4 = **10 أيام**. فإذا لم يستخدم هذا الموظف تلك الأيام العشرة وموافقة صاحب العمل متوفرة، تسمح المادة 59 بصرفها نقداً بدلاً من ترحيلها إلى ما لا نهاية.`,
        },
      ],
      keyTakeaways: [
        '30 يوماً سنوياً بعد إكمال سنة خدمة.',
        'تتراكم بمعدل ثابت قدره 2.5 يوماً شهرياً.',
        'يجوز صرف الإجازة غير المستخدمة نقداً بموجب المادة 59، لا ترحيلها فقط.',
        'الخدمة دون سنة تُقسم تناسبياً بالمعدل الشهري نفسه.',
      ],
      faqs: [
        { q: 'كيف تتراكم الإجازة السنوية في البحرين؟', a: 'بمعدل ثابت قدره 2.5 يوماً شهرياً بموجب المادة 58 — ما يعادل 30 يوماً سنوياً متى أكملت سنة خدمة.' },
        { q: 'هل يمكن أن أُصرف نقداً بدلاً من أخذ الإجازة في البحرين؟', a: 'نعم. تسمح المادة 59 بصرف الإجازة السنوية غير المستخدمة نقداً، بموافقة صاحب العمل، بدلاً من ترحيلها فقط.' },
        { q: 'كم إجازة سنوية أستحق في البحرين؟', a: '30 يوماً سنوياً متى أكملت سنة خدمة؛ والخدمة دون سنة تتراكم بالمعدل الشهري نفسه 2.5 يوماً، مقسّمة تناسبياً.' },
      ],
      relatedCalculators: REL,
      lastReviewed: R,
    },
  },

  /* ───────────────────────── Oman ───────────────────────── */
  'annual-leave-oman': {
    en: {
      slug: 'annual-leave-oman',
      locale: 'en',
      title: 'Oman Annual Leave: 30 Days (2026)',
      metaDescription:
        'Oman annual leave is at least 30 days per year on the gross wage, accruing 2.5 days per month, with carryover up to 30 days (RD 53/2023, Art. 78). Calculator.',
      intro:
        'Oman’s annual leave is calculated on the gross wage rather than a basic-wage figure, accrues at a steady 2.5 days a month, and allows unused days to be carried into the following year up to a 30-day cap — all set out in Article 78 of the 2023 Labour Law (Royal Decree 53/2023). This guide covers the accrual, the waiting period, the carryover limit, and a worked example matching the Klar calculator.',
      sections: [
        {
          heading: 'Accrual on the gross wage',
          body: `Article 78 grants **at least 30 days** of annual leave per year, calculated on the employee's **gross wage** rather than the basic wage alone, and accruing at a steady **2.5 days per month**. Calculating on the gross wage, rather than basic pay, means allowances factor into the value of each leave day.`,
        },
        {
          heading: 'The 6-month waiting period',
          body: `Leave accrues from the start of employment, but it may not actually be **taken** until an employee has completed **6 months** of service. The balance keeps building during those first six months — it simply cannot be used until the waiting period passes.`,
        },
        {
          heading: 'Carrying leave into the next year',
          body: `Any unused balance may be carried over into the following year, up to a cap of **30 days**. A large unused balance therefore does not disappear at year-end, but it also cannot keep growing indefinitely beyond that cap without being used.`,
        },
        {
          heading: 'Worked example',
          body: `An employee reaches exactly **6 months** of service — the point at which leave can first be taken. Accrued leave by that point = 2.5 × 6 = **15 days**. If this employee also carried over, say, **10** unused days from the previous year (within the 30-day cap), their available balance at the 6-month mark would be 15 + 10 = **25 days**.`,
        },
      ],
      keyTakeaways: [
        'At least 30 days per year on the gross wage.',
        'Accrues at a steady 2.5 days per month.',
        'Leave cannot be taken before 6 months of service, though it still accrues.',
        'Carryover into the next year is capped at 30 days.',
      ],
      faqs: [
        { q: 'How does Oman’s annual leave accrual work?', a: 'At a steady 2.5 days per month under Article 78, calculated on the gross wage rather than the basic wage alone.' },
        { q: 'Can I carry over unused annual leave in Oman?', a: 'Yes, up to a cap of 30 days into the following year — balances beyond that cap are not preserved indefinitely.' },
        { q: 'When can I first take annual leave in Oman?', a: 'Not before completing 6 months of service, even though leave accrues from your start date; the balance simply waits until the 6-month mark to become usable.' },
      ],
      relatedCalculators: REL,
      lastReviewed: R,
    },
    ar: {
      slug: 'annual-leave-oman',
      locale: 'ar',
      title: 'الإجازة السنوية في عُمان: 30 يوماً (2026)',
      metaDescription:
        'الإجازة السنوية في عُمان لا تقل عن 30 يوماً سنوياً على الأجر الإجمالي، تتراكم 2.5 يوماً شهرياً، وتُرحَّل حتى 30 يوماً (مرسوم 53/2023، المادة 78). حاسبة.',
      intro:
        'تُحسب الإجازة السنوية في عُمان على الأجر الإجمالي لا على رقم الأجر الأساسي فقط، وتتراكم بمعدل ثابت 2.5 يوماً شهرياً، ويجوز ترحيل الأيام غير المستخدمة إلى السنة التالية بحد أقصى 30 يوماً — وكل ذلك بموجب المادة 78 من قانون العمل الصادر بالمرسوم السلطاني 53 لسنة 2023. يشرح هذا الدليل التراكم وفترة الانتظار وحد الترحيل، مع مثال عملي مطابق لحاسبة كلار.',
      sections: [
        {
          heading: 'التراكم على الأجر الإجمالي',
          body: `تمنح المادة 78 ما **لا يقل عن 30 يوماً** من الإجازة السنوية سنوياً، تُحسب على **الأجر الإجمالي** للموظف لا على الأساسي فقط، وتتراكم بمعدل ثابت **2.5 يوماً شهرياً**. والحساب على الأجر الإجمالي بدلاً من الأساسي يعني أن البدلات تدخل في قيمة يوم الإجازة.`,
        },
        {
          heading: 'فترة انتظار الستة أشهر',
          body: `تتراكم الإجازة من بداية العمل، لكن لا يجوز **أخذها** فعلياً إلا بعد إكمال الموظف **6 أشهر** خدمة. ويستمر الرصيد في التراكم خلال تلك الأشهر الستة الأولى — إنما لا يمكن استخدامه إلا بعد انقضاء فترة الانتظار.`,
        },
        {
          heading: 'ترحيل الإجازة إلى السنة التالية',
          body: `يجوز ترحيل أي رصيد غير مستخدم إلى السنة التالية، بحد أقصى **30 يوماً**. فلا يضيع الرصيد الكبير غير المستخدم عند نهاية السنة، لكنه أيضاً لا يستمر في التراكم إلى ما لا نهاية بعد هذا الحد دون استخدام.`,
        },
        {
          heading: 'مثال عملي',
          body: `موظف أكمل بالضبط **6 أشهر** خدمة — وهي النقطة التي يمكنه عندها أخذ الإجازة لأول مرة. الإجازة المتراكمة عند تلك النقطة = 2.5 × 6 = **15 يوماً**. فإذا رحّل هذا الموظف أيضاً، على سبيل المثال، **10** أيام غير مستخدمة من السنة السابقة (ضمن حد 30 يوماً)، يصبح رصيده المتاح عند علامة الستة أشهر = 15 + 10 = **25 يوماً**.`,
        },
      ],
      keyTakeaways: [
        'لا تقل عن 30 يوماً سنوياً على الأجر الإجمالي.',
        'تتراكم بمعدل ثابت قدره 2.5 يوماً شهرياً.',
        'لا يجوز أخذ الإجازة قبل 6 أشهر خدمة، مع أنها تتراكم.',
        'ترحيل الإجازة إلى السنة التالية محدود بحد أقصى 30 يوماً.',
      ],
      faqs: [
        { q: 'كيف يتراكم رصيد الإجازة السنوية في عُمان؟', a: 'بمعدل ثابت قدره 2.5 يوماً شهرياً بموجب المادة 78، تُحسب على الأجر الإجمالي لا على الأساسي فقط.' },
        { q: 'هل يمكن ترحيل الإجازة غير المستخدمة في عُمان؟', a: 'نعم، بحد أقصى 30 يوماً إلى السنة التالية — ولا يُحتفظ بما يتجاوز هذا الحد إلى ما لا نهاية.' },
        { q: 'متى يمكنني أخذ الإجازة السنوية لأول مرة في عُمان؟', a: 'لا يجوز قبل إكمال 6 أشهر خدمة، مع أن الإجازة تتراكم من تاريخ بدء عملك؛ فالرصيد ينتظر فقط حتى علامة الستة أشهر ليصبح قابلاً للاستخدام.' },
      ],
      relatedCalculators: REL,
      lastReviewed: R,
    },
  },
};

export default annualLeaveGuides;
