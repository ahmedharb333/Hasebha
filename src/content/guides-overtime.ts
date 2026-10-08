import type { GuideContent } from './types';
import type { Locale } from '../config/site';

/**
 * Per-country overtime-pay guides (SEO-focused, high-intent).
 *
 * Hand-written per country, in the style of guides-labour.ts: each entry has
 * its own section headings (varying by how many overtime tiers that country
 * actually has), a worked numeric example, and FAQs grounded in what is
 * actually distinct about that country's rule. Multipliers, caps and standard
 * working weeks mirror the country-rules engine (src/lib/country-rules/*) and
 * the overtime calculator (src/lib/calculators/overtime.ts), which derives the
 * hourly wage from a monthly salary as:
 *
 *   hourly wage = (monthly salary × 12) ÷ (52 × standard weekly hours)
 *
 * i.e. the annual salary spread over the year's actual working hours — not a
 * ÷30 day-rate shortcut. Every worked example below uses that exact formula.
 *
 * Last reviewed: 2026-10-01.
 */
const REVIEWED = '2026-10-01';
const REL = ['overtime-pay', 'gross-to-net', 'leave-balance'];

const overtimeGuides: Record<string, Record<Locale, GuideContent>> = {
  /* ───────────────────────── Jordan ───────────────────────── */
  'overtime-pay-jordan': {
    en: {
      slug: 'overtime-pay-jordan',
      locale: 'en',
      title: 'Jordan Overtime Pay Rates (2026)',
      metaDescription:
        'Jordan overtime: 125% of the hourly wage for extra hours, 150% on rest days and public holidays, with a 48-hour standard week. Calculator + example.',
      intro:
        'Jordanian labour law sets two overtime rates, and which one applies depends on when — not whether — the extra hours are worked. Ordinary extra hours, including night work, carry one premium; rest days and public holidays carry a higher one. This guide walks through both rates, how the hourly wage they are applied to is derived from a monthly salary, and a full worked example.',
      sections: [
        {
          heading: 'The overtime rate',
          body: `Hours worked beyond the normal working day — including hours worked at **night** — are paid at **125%** of the normal hourly wage. Jordan does not single out night work for a separate, higher rate; it is treated the same as any other extra hour.`,
        },
        {
          heading: 'Rest days and public holidays pay more',
          body: `Work on the weekly **rest day** or a **public holiday** jumps to **150%** of the hourly wage — a full 25 percentage points above ordinary overtime. This is the one distinction Jordanian law draws: not day versus night, but working day versus rest day/holiday.`,
        },
        {
          heading: 'How the hourly rate is derived',
          body: `The hourly wage used for both rates comes from the monthly salary spread over the year's actual hours: annual salary (monthly × 12) divided by the year's working hours (52 weeks × the standard **48-hour** week). Multiply that hourly figure by 1.25 or 1.5 depending on when the overtime hours fall.`,
        },
        {
          heading: 'Worked example',
          body: `An employee earns **624 JOD** a month on the standard 48-hour week.

Hourly wage = (624 × 12) ÷ (52 × 48) = 7,488 ÷ 2,496 = **3 JOD/hour**.

For **8 hours** of ordinary overtime: rate = 3 × 1.25 = 3.75 JOD/hour; pay = 8 × 3.75 = **30 JOD**.

Had those same 8 hours instead fallen on a rest day or public holiday, the rate would be 3 × 1.5 = 4.5 JOD/hour, for **36 JOD** — six dinars more for identical hours worked on a different day.`,
        },
      ],
      keyTakeaways: [
        '125% for overtime hours, including night work (no separate night premium).',
        '150% on rest days and public holidays — the only distinction Jordanian law draws.',
        'The 48-hour standard week sets the hourly wage the rate is applied to.',
      ],
      faqs: [
        {
          q: 'What is the overtime rate in Jordan?',
          a: '125% of the normal hourly wage for ordinary extra hours, rising to 150% for work on rest days and public holidays.',
        },
        {
          q: 'Does night work get paid more than daytime overtime in Jordan?',
          a: 'No — unlike some neighbouring countries, Jordan has no separate night-work premium. Night hours are paid at the same 125% as any other ordinary overtime hour; only rest days and public holidays carry the higher 150% rate.',
        },
        {
          q: 'How much extra do I get for working on a Friday or a public holiday in Jordan?',
          a: '150% of your hourly wage instead of 125% — a 25-percentage-point jump reserved specifically for the weekly rest day and public holidays, regardless of what time of day the work falls.',
        },
      ],
      relatedCalculators: REL,
      lastReviewed: REVIEWED,
    },
    ar: {
      slug: 'overtime-pay-jordan',
      locale: 'ar',
      title: 'معدلات أجر العمل الإضافي في الأردن (2026)',
      metaDescription:
        'العمل الإضافي في الأردن: 125% من أجر الساعة للساعات الإضافية، و150% في أيام الراحة والعطل الرسمية، بأسبوع عمل 48 ساعة. حاسبة ومثال.',
      intro:
        'يحدد قانون العمل الأردني معدلين للعمل الإضافي، ويتوقف أيهما ينطبق على **توقيت** الساعات الإضافية لا على طبيعتها. فالساعات الإضافية العادية، بما فيها العمل الليلي، لها معدل واحد، أما أيام الراحة والعطل الرسمية فلها معدل أعلى. يشرح هذا الدليل المعدلين، وكيف يُستخرج أجر الساعة الذي يُطبّقان عليه من الراتب الشهري، مع مثال عملي كامل.',
      sections: [
        {
          heading: 'معدل العمل الإضافي',
          body: `الساعات التي تُعمل بعد يوم العمل العادي — بما فيها الساعات **الليلية** — تُدفع بنسبة **125%** من أجر الساعة العادي. ولا يخصّ القانون الأردني العمل الليلي بمعدل أعلى منفصل؛ بل يُعامَل كأي ساعة إضافية أخرى.`,
        },
        {
          heading: 'أيام الراحة والعطل الرسمية تدفع أكثر',
          body: `يرتفع المعدل إلى **150%** من أجر الساعة عند العمل في **يوم الراحة** الأسبوعي أو **عطلة رسمية** — أي 25 نقطة كاملة فوق العمل الإضافي العادي. وهذا هو الفارق الوحيد الذي يرسمه القانون الأردني: ليس بين الليل والنهار، بل بين يوم العمل ويوم الراحة/العطلة.`,
        },
        {
          heading: 'كيف يُستخرج أجر الساعة',
          body: `يُستخرج أجر الساعة المستخدم في المعدلين من الراتب الشهري مقسوماً على ساعات العمل الفعلية في السنة: الراتب السنوي (الشهري × 12) مقسوماً على ساعات العمل في السنة (52 أسبوعاً × أسبوع العمل المعتاد **48 ساعة**). ثم يُضرب أجر الساعة هذا بـ1.25 أو 1.5 بحسب توقيت الساعات الإضافية.`,
        },
        {
          heading: 'مثال عملي',
          body: `موظف يتقاضى **624 ديناراً** شهرياً على أسبوع عمل 48 ساعة.

أجر الساعة = (624 × 12) ÷ (52 × 48) = 7,488 ÷ 2,496 = **3 دنانير/ساعة**.

عن **8 ساعات** عمل إضافي عادي: المعدل = 3 × 1.25 = 3.75 دينار/ساعة؛ الأجر = 8 × 3.75 = **30 ديناراً**.

ولو وقعت نفس الساعات الثماني في يوم راحة أو عطلة رسمية، لكان المعدل 3 × 1.5 = 4.5 دينار/ساعة، أي **36 ديناراً** — ستة دنانير أكثر عن نفس عدد الساعات في يوم مختلف.`,
        },
      ],
      keyTakeaways: [
        '125% للساعات الإضافية، بما فيها العمل الليلي (لا معدل ليلي منفصل).',
        '150% في أيام الراحة والعطل الرسمية — الفارق الوحيد الذي يرسمه القانون الأردني.',
        'أسبوع العمل المعتاد 48 ساعة هو أساس استخراج أجر الساعة الذي يُطبّق عليه المعدل.',
      ],
      faqs: [
        {
          q: 'ما معدل العمل الإضافي في الأردن؟',
          a: '125% من أجر الساعة العادي للساعات الإضافية العادية، ويرتفع إلى 150% للعمل في أيام الراحة والعطل الرسمية.',
        },
        {
          q: 'هل يُدفع العمل الليلي أكثر من العمل الإضافي النهاري في الأردن؟',
          a: 'لا — على خلاف بعض الدول المجاورة، لا يوجد في الأردن معدل ليلي منفصل. تُدفع الساعات الليلية بنفس نسبة 125% كأي ساعة إضافية عادية؛ ولا يرتفع المعدل إلى 150% إلا في أيام الراحة والعطل الرسمية.',
        },
        {
          q: 'كم أستحق إضافياً عند العمل يوم الجمعة أو في عطلة رسمية في الأردن؟',
          a: '150% من أجر ساعتك بدلاً من 125% — وهي زيادة 25 نقطة مخصّصة فقط ليوم الراحة الأسبوعي والعطل الرسمية، بصرف النظر عن وقت العمل خلال اليوم.',
        },
      ],
      relatedCalculators: REL,
      lastReviewed: REVIEWED,
    },
  },

  /* ──────────────────── Saudi Arabia ──────────────────── */
  'overtime-pay-saudi-arabia': {
    en: {
      slug: 'overtime-pay-saudi-arabia',
      locale: 'en',
      title: 'Saudi Overtime Pay: Flat 150% (2026)',
      metaDescription:
        'Saudi overtime is a flat 150% of the hourly wage for all extra hours, including rest days and holidays (Labour Law Art. 107). 48-hour week. Calculator.',
      intro:
        'Saudi Arabia keeps its overtime rule unusually simple compared to its neighbours: there is no tiering by day, night, rest day or holiday — just one flat premium that applies to every extra hour worked. This guide explains that flat rate, why it does not vary, how the underlying hourly wage is derived, and a worked example.',
      sections: [
        {
          heading: 'A single flat rate',
          body: `Article 107 of the Labour Law sets a flat **150%** of the hourly wage for all overtime hours. There is no separate category for night work, rest days or public holidays — one rate covers every extra hour, which makes the Saudi rule the simplest to apply of the seven countries covered here.`,
        },
        {
          heading: 'Why there is no tiering by day, night or holiday',
          body: `Several neighbouring countries pay a lower rate for ordinary extra hours and a higher one for night, rest-day or holiday work. Saudi Arabia skips that distinction entirely: the 1.5× multiplier in Article 107 is written as a single figure, so an employer cannot pay less for an overtime hour simply because it fell on a Tuesday rather than a Friday.`,
        },
        {
          heading: 'How the hourly rate is derived',
          body: `The hourly wage is the annual salary (monthly × 12) divided by the year's working hours (52 weeks × the standard **48-hour** week). The standard week is shortened for Muslim employees during Ramadan — which raises the hourly wage derived from the same monthly salary, and with it the 150% overtime rate, since the same salary is now spread over fewer standard hours.`,
        },
        {
          heading: 'Worked example',
          body: `An employee earns **4,160 SAR** a month on the standard 48-hour week.

Hourly wage = (4,160 × 12) ÷ (52 × 48) = 49,920 ÷ 2,496 = **20 SAR/hour**.

For **10 hours** of overtime at the flat rate: rate = 20 × 1.5 = 30 SAR/hour; pay = 10 × 30 = **300 SAR** — the same figure whether those 10 hours were ordinary daytime hours, night hours, a rest day, or a public holiday.`,
        },
      ],
      keyTakeaways: [
        'Flat 150% for every overtime hour — no day/night/holiday tiers.',
        'Article 107 applies the same rate regardless of when the hours fall.',
        'The 48-hour week (shortened in Ramadan) sets the hourly wage the rate is applied to.',
      ],
      faqs: [
        {
          q: 'Does Saudi Arabia pay more for overtime on rest days or public holidays?',
          a: 'No. Unlike Kuwait or Oman, which pay a higher rate for holidays specifically, Saudi Arabia applies the same flat 150% to every overtime hour — ordinary, night, rest day or public holiday alike.',
        },
        {
          q: 'How is the Saudi overtime hourly rate worked out from my salary?',
          a: 'The monthly salary is annualised (× 12) and divided by the year\'s standard working hours (52 weeks × 48 hours), giving the base hourly wage; that figure is then multiplied by 1.5 for every overtime hour.',
        },
        {
          q: 'Does the Ramadan reduction in working hours change my overtime pay?',
          a: 'It can increase it. Because the standard week is shorter during Ramadan for Muslim employees, the same monthly salary divides into fewer standard hours — raising the base hourly wage, and therefore the 150% overtime rate calculated from it.',
        },
      ],
      relatedCalculators: REL,
      lastReviewed: REVIEWED,
    },
    ar: {
      slug: 'overtime-pay-saudi-arabia',
      locale: 'ar',
      title: 'أجر العمل الإضافي في السعودية: 150% ثابتة (2026)',
      metaDescription:
        'العمل الإضافي في السعودية 150% ثابتة من أجر الساعة لكل الساعات الإضافية، بما فيها أيام الراحة والعطل (المادة 107). أسبوع 48 ساعة. حاسبة.',
      intro:
        'تعتمد السعودية قاعدة عمل إضافي أبسط بشكل لافت مقارنة بجيرانها: لا تدرّج بين النهار والليل أو بين يوم الراحة والعطلة — بل معدل ثابت واحد يُطبّق على كل ساعة إضافية. يشرح هذا الدليل هذا المعدل الثابت، وسبب عدم تغيّره، وكيف يُستخرج أجر الساعة الذي يُطبّق عليه، مع مثال عملي.',
      sections: [
        {
          heading: 'معدل ثابت واحد',
          body: `تحدد المادة 107 من نظام العمل نسبة ثابتة **150%** من أجر الساعة لكل ساعات العمل الإضافي. ولا توجد فئة منفصلة للعمل الليلي أو أيام الراحة أو العطل الرسمية — معدل واحد يغطي كل ساعة إضافية، وهذا ما يجعل القاعدة السعودية أبسط القواعد السبع المعروضة هنا من حيث التطبيق.`,
        },
        {
          heading: 'لماذا لا يوجد تدرّج بين النهار والليل والعطلة',
          body: `تدفع عدة دول مجاورة معدلاً أقل للساعات الإضافية العادية ومعدلاً أعلى للعمل الليلي أو في أيام الراحة والعطل. أما السعودية فتتجاوز هذا التمييز تماماً: معامل 1.5× في المادة 107 مكتوب كرقم واحد، فلا يمكن لصاحب العمل أن يدفع أقل لساعة إضافية لمجرد أنها وقعت يوم ثلاثاء لا يوم جمعة.`,
        },
        {
          heading: 'كيف يُستخرج أجر الساعة',
          body: `أجر الساعة هو الراتب السنوي (الشهري × 12) مقسوماً على ساعات العمل في السنة (52 أسبوعاً × أسبوع العمل المعتاد **48 ساعة**). ويُخفَّض أسبوع العمل للموظفين المسلمين في رمضان — وهذا يرفع أجر الساعة المستخرج من نفس الراتب الشهري، ومعه معدل العمل الإضافي 150%، لأن نفس الراتب يُقسم الآن على ساعات معتادة أقل.`,
        },
        {
          heading: 'مثال عملي',
          body: `موظف يتقاضى **4,160 ريال** شهرياً على أسبوع عمل 48 ساعة.

أجر الساعة = (4,160 × 12) ÷ (52 × 48) = 49,920 ÷ 2,496 = **20 ريال/ساعة**.

عن **10 ساعات** عمل إضافي بالمعدل الثابت: المعدل = 20 × 1.5 = 30 ريال/ساعة؛ الأجر = 10 × 30 = **300 ريال** — وهو نفس الرقم سواء كانت هذه الساعات العشر نهارية عادية أو ليلية أو في يوم راحة أو عطلة رسمية.`,
        },
      ],
      keyTakeaways: [
        '150% ثابتة لكل ساعة عمل إضافي — دون تدرّج بين النهار والليل والعطلة.',
        'المادة 107 تطبّق المعدل نفسه بصرف النظر عن توقيت الساعات.',
        'أسبوع العمل 48 ساعة (يُخفَّض في رمضان) هو أساس استخراج أجر الساعة الذي يُطبّق عليه المعدل.',
      ],
      faqs: [
        {
          q: 'هل تدفع السعودية أكثر للعمل الإضافي في أيام الراحة أو العطل الرسمية؟',
          a: 'لا. على خلاف الكويت أو عُمان التي تدفع معدلاً أعلى للعطل تحديداً، تطبّق السعودية نسبة 150% الثابتة نفسها على كل ساعة عمل إضافي — عادية أو ليلية أو في يوم راحة أو عطلة رسمية.',
        },
        {
          q: 'كيف يُحسب أجر ساعة العمل الإضافي في السعودية من راتبي؟',
          a: 'يُحوَّل الراتب الشهري إلى سنوي (× 12) ويُقسم على ساعات العمل المعتادة في السنة (52 أسبوعاً × 48 ساعة) لنحصل على أجر الساعة الأساسي، ثم يُضرب هذا الرقم بـ1.5 عن كل ساعة عمل إضافي.',
        },
        {
          q: 'هل يغيّر تخفيض ساعات العمل في رمضان قيمة أجر عملي الإضافي؟',
          a: 'يمكن أن يرفعها. فلأن أسبوع العمل أقصر في رمضان للموظفين المسلمين، يُقسم نفس الراتب الشهري على ساعات معتادة أقل — فيرتفع أجر الساعة الأساسي، وبالتالي معدل العمل الإضافي 150% المحسوب منه.',
        },
      ],
      relatedCalculators: REL,
      lastReviewed: REVIEWED,
    },
  },

  /* ───────────────────────── UAE ───────────────────────── */
  'overtime-pay-uae': {
    en: {
      slug: 'overtime-pay-uae',
      locale: 'en',
      title: 'UAE Overtime Pay Rates (2026)',
      metaDescription:
        'UAE overtime: 125% of the hourly wage, 150% for night hours, rest days and public holidays (Federal Decree-Law 33/2021, Art. 19). 48-hour week. Calculator.',
      intro:
        'Article 19 of UAE Federal Decree-Law No. 33 of 2021 sets two overtime rates depending on when the extra hours fall: a standard premium for ordinary daytime hours, and a higher one that groups together night work, rest days and public holidays. This guide covers both rates, how the hourly wage behind them is derived, and a worked example.',
      sections: [
        {
          heading: 'The overtime rate',
          body: `Ordinary extra hours worked during the day are paid at **125%** of the normal hourly wage under Article 19.`,
        },
        {
          heading: 'Night work, rest days and public holidays',
          body: `The UAE groups three situations under one higher rate of **150%**: hours worked at **night**, hours worked on the weekly **rest day**, and hours worked on a **public holiday**. Unlike Kuwait or Oman, there is no further step up for holidays specifically — night work, rest-day work and holiday work all sit at the same 150%.`,
        },
        {
          heading: 'How the hourly rate is derived',
          body: `The base hourly wage is the annual salary (monthly × 12) divided by the year's working hours (52 weeks × the standard **48-hour** week), then multiplied by 1.25 or 1.5 depending on when the overtime hours were worked.`,
        },
        {
          heading: 'Worked example',
          body: `An employee earns **5,200 AED** a month on the standard 48-hour week.

Hourly wage = (5,200 × 12) ÷ (52 × 48) = 62,400 ÷ 2,496 = **25 AED/hour**.

For **6 hours** of ordinary daytime overtime: rate = 25 × 1.25 = 31.25 AED/hour; pay = 6 × 31.25 = **187.5 AED**.

For the same 6 hours worked at night, on the rest day, or on a public holiday: rate = 25 × 1.5 = 37.5 AED/hour; pay = 6 × 37.5 = **225 AED**.`,
        },
      ],
      keyTakeaways: [
        '125% for ordinary daytime overtime hours.',
        '150% groups night work, rest days and public holidays — all at the same rate.',
        '48-hour standard week sets the base hourly wage.',
      ],
      faqs: [
        {
          q: 'How much extra does night work pay in the UAE?',
          a: '150% of the hourly wage — the same rate that applies to work on the weekly rest day or a public holiday. Article 19 groups all three under one higher premium rather than giving night work its own separate rate.',
        },
        {
          q: 'Is working on a public holiday treated differently from a rest day in the UAE?',
          a: 'No — both carry the same 150% rate as night work. Unlike Kuwait or Oman, the UAE does not pay a further, higher rate specifically for public holidays.',
        },
        {
          q: "What is the standard working week used to calculate the UAE overtime rate?",
          a: '48 hours a week, which is divided into the annualised monthly salary to produce the base hourly wage that the 125%/150% multipliers are applied to.',
        },
      ],
      relatedCalculators: REL,
      lastReviewed: REVIEWED,
    },
    ar: {
      slug: 'overtime-pay-uae',
      locale: 'ar',
      title: 'معدلات أجر العمل الإضافي في الإمارات (2026)',
      metaDescription:
        'العمل الإضافي في الإمارات: 125% من أجر الساعة، و150% للساعات الليلية وأيام الراحة والعطل الرسمية (المرسوم 33/2021، المادة 19). أسبوع 48 ساعة. حاسبة.',
      intro:
        'تحدد المادة 19 من المرسوم بقانون اتحادي رقم 33 لسنة 2021 معدلين للعمل الإضافي بحسب توقيت الساعات: معدل عادي للساعات النهارية الاعتيادية، ومعدل أعلى يجمع العمل الليلي وأيام الراحة والعطل الرسمية في فئة واحدة. يغطي هذا الدليل المعدلين، وكيف يُستخرج أجر الساعة الذي يُطبّقان عليه، مع مثال عملي.',
      sections: [
        {
          heading: 'معدل العمل الإضافي',
          body: `الساعات الإضافية الاعتيادية التي تُعمل نهاراً تُدفع بنسبة **125%** من أجر الساعة العادي بموجب المادة 19.`,
        },
        {
          heading: 'العمل الليلي وأيام الراحة والعطل الرسمية',
          body: `تجمع الإمارات ثلاث حالات تحت معدل أعلى واحد قدره **150%**: الساعات **الليلية**، وساعات العمل في **يوم الراحة** الأسبوعي، وساعات العمل في **عطلة رسمية**. وعلى خلاف الكويت أو عُمان، لا يوجد ارتفاع إضافي للعطل تحديداً — فالعمل الليلي والعمل في يوم الراحة والعمل في العطلة كلها عند نسبة 150% نفسها.`,
        },
        {
          heading: 'كيف يُستخرج أجر الساعة',
          body: `أجر الساعة الأساسي هو الراتب السنوي (الشهري × 12) مقسوماً على ساعات العمل في السنة (52 أسبوعاً × أسبوع العمل المعتاد **48 ساعة**)، ثم يُضرب بـ1.25 أو 1.5 بحسب توقيت ساعات العمل الإضافي.`,
        },
        {
          heading: 'مثال عملي',
          body: `موظف يتقاضى **5,200 درهم** شهرياً على أسبوع عمل 48 ساعة.

أجر الساعة = (5,200 × 12) ÷ (52 × 48) = 62,400 ÷ 2,496 = **25 درهم/ساعة**.

عن **6 ساعات** عمل إضافي نهاري عادي: المعدل = 25 × 1.25 = 31.25 درهم/ساعة؛ الأجر = 6 × 31.25 = **187.5 درهم**.

ولو وقعت نفس الساعات الست ليلاً، أو في يوم الراحة، أو في عطلة رسمية: المعدل = 25 × 1.5 = 37.5 درهم/ساعة؛ الأجر = 6 × 37.5 = **225 درهماً**.`,
        },
      ],
      keyTakeaways: [
        '125% للساعات الإضافية النهارية العادية.',
        '150% تجمع العمل الليلي وأيام الراحة والعطل الرسمية عند معدل واحد.',
        'أسبوع العمل المعتاد 48 ساعة هو أساس أجر الساعة.',
      ],
      faqs: [
        {
          q: 'كم يُدفع إضافياً للعمل الليلي في الإمارات؟',
          a: '150% من أجر الساعة — وهو المعدل نفسه المطبّق على العمل في يوم الراحة الأسبوعي أو في عطلة رسمية. فالمادة 19 تجمع الحالات الثلاث تحت معدل أعلى واحد بدل إفراد العمل الليلي بمعدل خاص.',
        },
        {
          q: 'هل يُعامَل العمل في عطلة رسمية بشكل مختلف عن يوم الراحة في الإمارات؟',
          a: 'لا — فكلاهما يحمل نسبة 150% نفسها الخاصة بالعمل الليلي. وعلى خلاف الكويت أو عُمان، لا تدفع الإمارات معدلاً أعلى إضافياً خاصاً بالعطل الرسمية.',
        },
        {
          q: 'ما أسبوع العمل المعتمد لحساب معدل العمل الإضافي في الإمارات؟',
          a: '48 ساعة أسبوعياً، وهو الرقم الذي يُقسم عليه الراتب الشهري بعد تحويله إلى سنوي لاستخراج أجر الساعة الأساسي الذي يُطبّق عليه معاملا 125% و150%.',
        },
      ],
      relatedCalculators: REL,
      lastReviewed: REVIEWED,
    },
  },

  /* ───────────────────────── Kuwait ───────────────────────── */
  'overtime-pay-kuwait': {
    en: {
      slug: 'overtime-pay-kuwait',
      locale: 'en',
      title: 'Kuwait Overtime Pay Rates (2026)',
      metaDescription:
        'Kuwait overtime: 125% of the hourly wage, 150% on rest days, and 200% (double) on public holidays. 48-hour week. Calculator + example.',
      intro:
        "Kuwait is the only one of the seven countries covered here with three distinct overtime tiers rather than two: ordinary extra hours, rest-day work, and public-holiday work each have their own rate — and the public-holiday rate is double pay. This guide walks through all three, how the underlying hourly wage is derived, and a worked example covering each tier.",
      sections: [
        {
          heading: 'The overtime rate',
          body: `Ordinary extra working hours are paid at **125%** of the hourly wage.`,
        },
        {
          heading: 'Rest days vs public holidays — a bigger gap',
          body: `Work on a **rest day** steps up to **150%**, but work on a **public holiday** jumps further still to **200% (double pay)** — the highest holiday rate among the countries covered in this guide series. Kuwait is the only one of the seven that pays meaningfully more for a public holiday than for an ordinary rest day; most others treat the two the same.`,
        },
        {
          heading: 'How the hourly rate is derived',
          body: `The base hourly wage is the annual salary (monthly × 12) divided by the year's working hours (52 weeks × the standard **48-hour** week). That figure is then multiplied by 1.25, 1.5 or 2.0 depending on which of the three tiers the overtime hours fall into.`,
        },
        {
          heading: 'Worked example',
          body: `An employee earns **624 KWD** a month on the standard 48-hour week.

Hourly wage = (624 × 12) ÷ (52 × 48) = 7,488 ÷ 2,496 = **3 KWD/hour**.

For **8 hours** of ordinary overtime: rate = 3 × 1.25 = 3.75 KWD/hour; pay = 8 × 3.75 = **30 KWD**.

The same 8 hours on a rest day: rate = 3 × 1.5 = 4.5 KWD/hour; pay = **36 KWD**.

The same 8 hours on a public holiday: rate = 3 × 2.0 = 6 KWD/hour; pay = **48 KWD** — 18 KWD more than the ordinary rate for identical hours.`,
        },
      ],
      keyTakeaways: [
        '125% for ordinary overtime hours.',
        '150% on rest days — but 200% (double pay) on public holidays.',
        "Kuwait's holiday rate is the highest of the seven countries covered here.",
      ],
      faqs: [
        {
          q: 'Why does Kuwait pay double on public holidays but not on rest days?',
          a: "Kuwaiti labour law draws a distinction most of the region doesn't: an ordinary weekly rest day is paid at 150%, but a public holiday — a less frequent occurrence — is paid at a full 200%, double the normal hourly wage.",
        },
        {
          q: 'What is the overtime rate for ordinary extra hours in Kuwait?',
          a: '125% of the normal hourly wage, the same baseline rate used in most countries in the region before the rest-day and holiday premiums step in.',
        },
        {
          q: "Is Kuwait's public-holiday overtime rate the highest in the Gulf?",
          a: 'Among the countries covered in this guide series, yes — 200% (double pay) is higher than the 150% most other countries pay for holiday work, and matches the top rest-day/holiday tier that only Oman also reaches.',
        },
      ],
      relatedCalculators: REL,
      lastReviewed: REVIEWED,
    },
    ar: {
      slug: 'overtime-pay-kuwait',
      locale: 'ar',
      title: 'معدلات أجر العمل الإضافي في الكويت (2026)',
      metaDescription:
        'العمل الإضافي في الكويت: 125% من أجر الساعة، و150% في أيام الراحة، و200% (الضعف) في العطل الرسمية. أسبوع 48 ساعة. حاسبة ومثال.',
      intro:
        'الكويت هي الدولة الوحيدة من بين الدول السبع في هذا الدليل التي تعتمد ثلاث شرائح للعمل الإضافي لا شريحتين: للساعات الإضافية العادية معدل، ولعمل يوم الراحة معدل آخر، ولعمل العطلة الرسمية معدل ثالث هو أجر مضاعف. يشرح هذا الدليل الشرائح الثلاث، وكيف يُستخرج أجر الساعة الذي تُطبّق عليه، مع مثال يغطي كل شريحة.',
      sections: [
        {
          heading: 'معدل العمل الإضافي',
          body: `تُدفع ساعات العمل الإضافي العادية بنسبة **125%** من أجر الساعة.`,
        },
        {
          heading: 'أيام الراحة والعطل الرسمية — فارق أكبر',
          body: `يرتفع معدل العمل في **يوم الراحة** إلى **150%**، لكن العمل في **عطلة رسمية** يقفز أبعد إلى **200% (أجر مضاعف)** — وهو أعلى معدل للعطل بين الدول المعروضة في سلسلة هذا الدليل. والكويت هي الدولة الوحيدة من السبع التي تدفع فارقاً كبيراً بين العطلة الرسمية ويوم الراحة العادي؛ فبقية الدول تعامل الاثنين بنفس المعدل.`,
        },
        {
          heading: 'كيف يُستخرج أجر الساعة',
          body: `أجر الساعة الأساسي هو الراتب السنوي (الشهري × 12) مقسوماً على ساعات العمل في السنة (52 أسبوعاً × أسبوع العمل المعتاد **48 ساعة**). ثم يُضرب هذا الرقم بـ1.25 أو 1.5 أو 2.0 بحسب الشريحة التي تقع فيها ساعات العمل الإضافي.`,
        },
        {
          heading: 'مثال عملي',
          body: `موظف يتقاضى **624 ديناراً كويتياً** شهرياً على أسبوع عمل 48 ساعة.

أجر الساعة = (624 × 12) ÷ (52 × 48) = 7,488 ÷ 2,496 = **3 دنانير/ساعة**.

عن **8 ساعات** عمل إضافي عادي: المعدل = 3 × 1.25 = 3.75 دينار/ساعة؛ الأجر = 8 × 3.75 = **30 ديناراً**.

نفس الساعات الثماني في يوم راحة: المعدل = 3 × 1.5 = 4.5 دينار/ساعة؛ الأجر = **36 ديناراً**.

ونفس الساعات الثماني في عطلة رسمية: المعدل = 3 × 2.0 = 6 دنانير/ساعة؛ الأجر = **48 ديناراً** — أي 18 ديناراً أكثر من المعدل العادي عن نفس عدد الساعات.`,
        },
      ],
      keyTakeaways: [
        '125% للساعات الإضافية العادية.',
        '150% في أيام الراحة — لكن 200% (أجر مضاعف) في العطل الرسمية.',
        'معدل العطل في الكويت هو الأعلى بين الدول السبع المعروضة في هذا الدليل.',
      ],
      faqs: [
        {
          q: 'لماذا تدفع الكويت أجراً مضاعفاً في العطل الرسمية دون أيام الراحة؟',
          a: 'يرسم قانون العمل الكويتي فارقاً لا تعتمده أغلب دول المنطقة: يُدفع يوم الراحة الأسبوعي العادي بنسبة 150%، أما العطلة الرسمية — وهي أقل تكراراً — فتُدفع بنسبة كاملة 200%، أي ضعف أجر الساعة العادي.',
        },
        {
          q: 'ما معدل العمل الإضافي للساعات العادية في الكويت؟',
          a: '125% من أجر الساعة العادي، وهو المعدل الأساسي نفسه المعتمد في أغلب دول المنطقة قبل أن تبدأ معدلات يوم الراحة والعطلة بالارتفاع.',
        },
        {
          q: 'هل معدل العطل الرسمية في الكويت هو الأعلى في الخليج؟',
          a: 'بين الدول المعروضة في سلسلة هذا الدليل، نعم — فنسبة 200% (الأجر المضاعف) أعلى من نسبة 150% التي تدفعها أغلب الدول الأخرى لعمل العطل، وتضاهي أعلى شريحة لعُمان فقط من بين بقية الدول.',
        },
      ],
      relatedCalculators: REL,
      lastReviewed: REVIEWED,
    },
  },

  /* ───────────────────────── Qatar ───────────────────────── */
  'overtime-pay-qatar': {
    en: {
      slug: 'overtime-pay-qatar',
      locale: 'en',
      title: 'Qatar Overtime Pay Rates (2026)',
      metaDescription:
        'Qatar overtime: 125% of the hourly wage, 150% for night hours and rest days (Labour Law Art. 73–74). 48-hour week. Calculator + example.',
      intro:
        "Qatar's Labour Law sets two overtime rates under Articles 73–74, and has an extra wrinkle most of the region doesn't: the standard working week itself shrinks during Ramadan, which changes the hourly wage the rates are applied to. This guide covers both rates, the Ramadan effect, and a worked example.",
      sections: [
        {
          heading: 'The overtime rate',
          body: `Ordinary extra hours are paid at **125%** of the normal hourly wage under Article 73.`,
        },
        {
          heading: 'Night hours and rest days',
          body: `Hours worked at **night** or on the weekly **rest day** are paid at **150%** under Article 74. Qatar's law, as covered here, groups these two situations together rather than giving holidays a separate, further-elevated rate the way Kuwait or Oman does.`,
        },
        {
          heading: 'How the hourly rate changes during Ramadan',
          body: `The base hourly wage is the annual salary (monthly × 12) divided by the year's working hours — normally 52 weeks × the standard **48-hour** week. During Ramadan the standard week drops to **36 hours**, so the same monthly salary is spread over fewer hours, raising the base hourly wage — and with it, the 125%/150% overtime rates calculated from it.`,
        },
        {
          heading: 'Worked example',
          body: `An employee earns **4,160 QAR** a month on the standard 48-hour week.

Hourly wage = (4,160 × 12) ÷ (52 × 48) = 49,920 ÷ 2,496 = **20 QAR/hour**.

For **10 hours** of ordinary overtime: rate = 20 × 1.25 = 25 QAR/hour; pay = 10 × 25 = **250 QAR**.

During Ramadan, on the 36-hour week, the hourly wage rises to (4,160 × 12) ÷ (52 × 36) ≈ **26.67 QAR/hour** — so the same 10 ordinary overtime hours would pay 10 × (26.67 × 1.25) ≈ **333 QAR**, purely because the standard week is shorter.`,
        },
      ],
      keyTakeaways: [
        '125% for ordinary overtime hours.',
        '150% for night hours and rest days — grouped together, not tiered further for holidays.',
        'The 36-hour Ramadan week raises the hourly wage the overtime rate is calculated from.',
      ],
      faqs: [
        {
          q: 'What is the overtime rate in Qatar?',
          a: '125% of the normal hourly wage for ordinary extra hours, rising to 150% for night hours and rest days under Articles 73–74.',
        },
        {
          q: 'Does working on a public holiday change the overtime rate in Qatar?',
          a: "Articles 73–74 set the 150% premium specifically for night hours and rest days; this guide does not list a further, separate holiday rate beyond those two, so holiday work follows the same rates set out above.",
        },
        {
          q: 'How does Ramadan affect overtime pay in Qatar?',
          a: "The standard working week drops to 36 hours during Ramadan. Because the hourly wage is the monthly salary spread over the standard week's hours, a shorter week means a higher hourly wage — and a higher overtime rate for the same number of overtime hours.",
        },
      ],
      relatedCalculators: REL,
      lastReviewed: REVIEWED,
    },
    ar: {
      slug: 'overtime-pay-qatar',
      locale: 'ar',
      title: 'معدلات أجر العمل الإضافي في قطر (2026)',
      metaDescription:
        'العمل الإضافي في قطر: 125% من أجر الساعة، و150% للساعات الليلية وأيام الراحة (المادة 73–74). أسبوع 48 ساعة. حاسبة ومثال.',
      intro:
        'يحدد قانون العمل القطري معدلين للعمل الإضافي بموجب المادتين 73 و74، مع خاصية إضافية لا تتوفر في أغلب المنطقة: أسبوع العمل المعتاد نفسه يتقلّص في رمضان، وهذا يغيّر أجر الساعة الذي تُطبّق عليه المعدلات. يغطي هذا الدليل المعدلين وأثر رمضان، مع مثال عملي.',
      sections: [
        {
          heading: 'معدل العمل الإضافي',
          body: `تُدفع الساعات الإضافية العادية بنسبة **125%** من أجر الساعة العادي بموجب المادة 73.`,
        },
        {
          heading: 'الساعات الليلية وأيام الراحة',
          body: `تُدفع الساعات التي تُعمل **ليلاً** أو في **يوم الراحة** الأسبوعي بنسبة **150%** بموجب المادة 74. ويجمع القانون القطري، كما هو مُغطّى هنا، هاتين الحالتين معاً دون أن يُفرد للعطل الرسمية معدلاً أعلى إضافياً كما تفعل الكويت أو عُمان.`,
        },
        {
          heading: 'كيف يتغيّر أجر الساعة في رمضان',
          body: `أجر الساعة الأساسي هو الراتب السنوي (الشهري × 12) مقسوماً على ساعات العمل في السنة — وهي عادة 52 أسبوعاً × أسبوع العمل المعتاد **48 ساعة**. وفي رمضان ينخفض أسبوع العمل المعتاد إلى **36 ساعة**، فيُقسم نفس الراتب الشهري على ساعات أقل، فيرتفع أجر الساعة الأساسي — ومعه معدلا العمل الإضافي 125% و150% المحسوبان منه.`,
        },
        {
          heading: 'مثال عملي',
          body: `موظف يتقاضى **4,160 ريال قطري** شهرياً على أسبوع عمل 48 ساعة.

أجر الساعة = (4,160 × 12) ÷ (52 × 48) = 49,920 ÷ 2,496 = **20 ريال/ساعة**.

عن **10 ساعات** عمل إضافي عادي: المعدل = 20 × 1.25 = 25 ريال/ساعة؛ الأجر = 10 × 25 = **250 ريالاً**.

وفي رمضان، على أسبوع 36 ساعة، يرتفع أجر الساعة إلى (4,160 × 12) ÷ (52 × 36) ≈ **26.67 ريال/ساعة** — فتصبح نفس الساعات الإضافية العشر العادية بأجر 10 × (26.67 × 1.25) ≈ **333 ريالاً**، لمجرد أن أسبوع العمل أقصر.`,
        },
      ],
      keyTakeaways: [
        '125% للساعات الإضافية العادية.',
        '150% للساعات الليلية وأيام الراحة — مجموعتان معاً دون تدرّج إضافي للعطل.',
        'أسبوع رمضان (36 ساعة) يرفع أجر الساعة الذي يُحسب منه معدل العمل الإضافي.',
      ],
      faqs: [
        {
          q: 'ما معدل العمل الإضافي في قطر؟',
          a: '125% من أجر الساعة العادي للساعات الإضافية العادية، ويرتفع إلى 150% للساعات الليلية وأيام الراحة بموجب المادتين 73–74.',
        },
        {
          q: 'هل يغيّر العمل في عطلة رسمية معدل العمل الإضافي في قطر؟',
          a: 'تحدد المادتان 73–74 نسبة 150% للساعات الليلية وأيام الراحة تحديداً؛ ولا يذكر هذا الدليل معدلاً منفصلاً إضافياً للعطل بخلاف هذين، فيُعامَل العمل في العطلة وفق المعدلات نفسها المذكورة أعلاه.',
        },
        {
          q: 'كيف يؤثر رمضان على أجر العمل الإضافي في قطر؟',
          a: 'ينخفض أسبوع العمل المعتاد إلى 36 ساعة في رمضان. ولأن أجر الساعة هو الراتب الشهري مقسوماً على ساعات الأسبوع المعتاد، فإن أسبوعاً أقصر يعني أجر ساعة أعلى — ومعدل عمل إضافي أعلى عن نفس عدد الساعات.',
        },
      ],
      relatedCalculators: REL,
      lastReviewed: REVIEWED,
    },
  },

  /* ───────────────────────── Bahrain ───────────────────────── */
  'overtime-pay-bahrain': {
    en: {
      slug: 'overtime-pay-bahrain',
      locale: 'en',
      title: 'Bahrain Overtime Pay Rates (2026)',
      metaDescription:
        'Bahrain overtime: 125% of the hourly wage, 150% for night hours, rest days and public holidays (Labour Law Art. 54). 48-hour week. Calculator.',
      intro:
        "Article 54 of Bahrain's Labour Law sets two overtime rates, grouping night work, rest days and public holidays together under a single higher premium rather than tiering them separately. This guide covers both rates, how the hourly wage is derived, and a worked example.",
      sections: [
        {
          heading: 'The overtime rate',
          body: `Ordinary extra working hours are paid at **125%** of the normal hourly wage under Article 54.`,
        },
        {
          heading: 'Night work, rest days and public holidays',
          body: `Bahrain groups three situations under one rate of **150%**: **night hours**, the weekly **rest day**, and **public holidays**. There is no further step-up for holidays specifically — unlike Kuwait, which pays double on public holidays, or Oman, which also reaches 200% for rest days and holidays, Bahrain keeps all three at the same 150%.`,
        },
        {
          heading: 'How the hourly rate is derived',
          body: `The base hourly wage is the annual salary (monthly × 12) divided by the year's working hours (52 weeks × the standard **48-hour** week), then multiplied by 1.25 or 1.5 depending on when the overtime hours fall.`,
        },
        {
          heading: 'Worked example',
          body: `An employee earns **624 BHD** a month on the standard 48-hour week.

Hourly wage = (624 × 12) ÷ (52 × 48) = 7,488 ÷ 2,496 = **3 BHD/hour**.

For **10 hours** of ordinary overtime: rate = 3 × 1.25 = 3.75 BHD/hour; pay = 10 × 3.75 = **37.5 BHD**.

The same 10 hours at night, on the rest day, or on a public holiday: rate = 3 × 1.5 = 4.5 BHD/hour; pay = 10 × 4.5 = **45 BHD**.`,
        },
      ],
      keyTakeaways: [
        '125% for ordinary overtime hours.',
        '150% groups night hours, rest days and public holidays at the same rate.',
        '48-hour standard week sets the base hourly wage.',
      ],
      faqs: [
        {
          q: 'What is the overtime rate in Bahrain?',
          a: '125% of the normal hourly wage for ordinary extra hours, rising to 150% for night hours, rest days and public holidays under Article 54.',
        },
        {
          q: 'Does Bahrain pay a separate, higher rate for public holidays?',
          a: "No — holidays are grouped with night work and rest days under the same 150% rate. Unlike Kuwait (double pay on holidays) or Oman (also 200% on rest days and holidays), Bahrain does not step the rate up any further for holidays specifically.",
        },
        {
          q: "How many hours make up Bahrain's standard working week for overtime purposes?",
          a: '48 hours a week — the figure the annualised monthly salary is divided by to produce the base hourly wage that the 125%/150% rates are applied to.',
        },
      ],
      relatedCalculators: REL,
      lastReviewed: REVIEWED,
    },
    ar: {
      slug: 'overtime-pay-bahrain',
      locale: 'ar',
      title: 'معدلات أجر العمل الإضافي في البحرين (2026)',
      metaDescription:
        'العمل الإضافي في البحرين: 125% من أجر الساعة، و150% للساعات الليلية وأيام الراحة والعطل الرسمية (المادة 54). أسبوع 48 ساعة. حاسبة.',
      intro:
        'تحدد المادة 54 من قانون العمل البحريني معدلين للعمل الإضافي، وتجمع العمل الليلي وأيام الراحة والعطل الرسمية معاً تحت معدل أعلى واحد دون تدرّج منفصل بينها. يغطي هذا الدليل المعدلين، وكيف يُستخرج أجر الساعة، مع مثال عملي.',
      sections: [
        {
          heading: 'معدل العمل الإضافي',
          body: `تُدفع ساعات العمل الإضافي العادية بنسبة **125%** من أجر الساعة العادي بموجب المادة 54.`,
        },
        {
          heading: 'العمل الليلي وأيام الراحة والعطل الرسمية',
          body: `تجمع البحرين ثلاث حالات تحت معدل واحد قدره **150%**: **الساعات الليلية**، و**يوم الراحة** الأسبوعي، و**العطل الرسمية**. ولا يوجد ارتفاع إضافي للعطل تحديداً — فعلى خلاف الكويت التي تدفع أجراً مضاعفاً في العطل، أو عُمان التي تصل أيضاً إلى 200% في أيام الراحة والعطل، تحتفظ البحرين بالحالات الثلاث عند نسبة 150% نفسها.`,
        },
        {
          heading: 'كيف يُستخرج أجر الساعة',
          body: `أجر الساعة الأساسي هو الراتب السنوي (الشهري × 12) مقسوماً على ساعات العمل في السنة (52 أسبوعاً × أسبوع العمل المعتاد **48 ساعة**)، ثم يُضرب بـ1.25 أو 1.5 بحسب توقيت ساعات العمل الإضافي.`,
        },
        {
          heading: 'مثال عملي',
          body: `موظف يتقاضى **624 ديناراً بحرينياً** شهرياً على أسبوع عمل 48 ساعة.

أجر الساعة = (624 × 12) ÷ (52 × 48) = 7,488 ÷ 2,496 = **3 دنانير/ساعة**.

عن **10 ساعات** عمل إضافي عادي: المعدل = 3 × 1.25 = 3.75 دينار/ساعة؛ الأجر = 10 × 3.75 = **37.5 دينار**.

ونفس الساعات العشر ليلاً، أو في يوم الراحة، أو في عطلة رسمية: المعدل = 3 × 1.5 = 4.5 دينار/ساعة؛ الأجر = 10 × 4.5 = **45 ديناراً**.`,
        },
      ],
      keyTakeaways: [
        '125% للساعات الإضافية العادية.',
        '150% تجمع الساعات الليلية وأيام الراحة والعطل الرسمية عند معدل واحد.',
        'أسبوع العمل المعتاد 48 ساعة هو أساس أجر الساعة.',
      ],
      faqs: [
        {
          q: 'ما معدل العمل الإضافي في البحرين؟',
          a: '125% من أجر الساعة العادي للساعات الإضافية العادية، ويرتفع إلى 150% للساعات الليلية وأيام الراحة والعطل الرسمية بموجب المادة 54.',
        },
        {
          q: 'هل تدفع البحرين معدلاً أعلى منفصلاً للعطل الرسمية؟',
          a: 'لا — تُجمع العطل مع العمل الليلي وأيام الراحة تحت نسبة 150% نفسها. وعلى خلاف الكويت (أجر مضاعف في العطل) أو عُمان (200% أيضاً في أيام الراحة والعطل)، لا ترفع البحرين المعدل أكثر للعطل تحديداً.',
        },
        {
          q: 'كم ساعة يضم أسبوع العمل المعتاد في البحرين لحساب العمل الإضافي؟',
          a: '48 ساعة أسبوعياً — وهو الرقم الذي يُقسم عليه الراتب الشهري بعد تحويله إلى سنوي لاستخراج أجر الساعة الأساسي الذي تُطبّق عليه نسبتا 125% و150%.',
        },
      ],
      relatedCalculators: REL,
      lastReviewed: REVIEWED,
    },
  },

  /* ───────────────────────── Oman ───────────────────────── */
  'overtime-pay-oman': {
    en: {
      slug: 'overtime-pay-oman',
      locale: 'en',
      title: 'Oman Overtime Pay Rates (2026)',
      metaDescription:
        'Oman overtime: 125% of the hourly wage, 150% at night, and 200% (double) on rest days and public holidays (RD 53/2023). 40-hour week. Calculator.',
      intro:
        'Oman combines two features that set it apart from its neighbours: a three-tier overtime scale under Royal Decree 53/2023 that reaches double pay for rest days and holidays, and a shorter 40-hour standard week. This guide covers all three tiers, what the shorter week means for the hourly wage, and a worked example.',
      sections: [
        {
          heading: 'The overtime rate',
          body: `Ordinary extra working hours are paid at **125%** of the hourly wage.`,
        },
        {
          heading: 'Night hours vs rest days and holidays',
          body: `**Night hours** step up to **150%**, but **rest days and public holidays** jump further to **200% (double pay)** — matching Kuwait's holiday rate, but applying it to rest days as well, not just public holidays. Oman is one of only two countries in this guide series (alongside Kuwait) that reaches a full double-pay tier.`,
        },
        {
          heading: 'A shorter standard week',
          body: `Oman's standard working week is **40 hours**, shorter than the 48-hour week used elsewhere in the region. Because the base hourly wage is the annual salary (monthly × 12) divided by the year's working hours (52 weeks × the standard week), a shorter week means the same monthly salary converts to a *higher* base hourly wage than it would under a 48-hour week — before the overtime multiplier is even applied.`,
        },
        {
          heading: 'Worked example',
          body: `An employee earns **520 OMR** a month on the standard 40-hour week.

Hourly wage = (520 × 12) ÷ (52 × 40) = 6,240 ÷ 2,080 = **3 OMR/hour**.

For **8 hours** of ordinary overtime: rate = 3 × 1.25 = 3.75 OMR/hour; pay = 8 × 3.75 = **30 OMR**.

The same 8 hours at night: rate = 3 × 1.5 = 4.5 OMR/hour; pay = **36 OMR**.

The same 8 hours on a rest day or public holiday: rate = 3 × 2.0 = 6 OMR/hour; pay = **48 OMR**.`,
        },
      ],
      keyTakeaways: [
        '125% for ordinary overtime hours; 150% at night.',
        '200% (double pay) on rest days and public holidays — alongside Kuwait, the highest tier in this guide series.',
        'The 40-hour standard week — shorter than the regional 48 — raises the base hourly wage itself.',
      ],
      faqs: [
        {
          q: "Why is Oman's standard working week shorter than its neighbours?",
          a: "Royal Decree 53/2023 sets Oman's standard week at 40 hours, compared with the 48-hour week used in Jordan, Saudi Arabia, the UAE, Kuwait, Qatar and Bahrain. It affects the base hourly wage calculation, not just the working schedule.",
        },
        {
          q: 'Does a 40-hour week mean a higher hourly rate in Oman?',
          a: 'For the same monthly salary, yes. Dividing an annual salary by fewer standard hours (40 rather than 48 a week) produces a higher base hourly wage, which in turn raises every overtime figure calculated from it.',
        },
        {
          q: "What is the overtime rate for rest days and public holidays in Oman?",
          a: "200% — double the normal hourly wage. This is the same level as Kuwait's public-holiday rate, but Oman applies it to ordinary rest days as well as public holidays, not holidays alone.",
        },
      ],
      relatedCalculators: REL,
      lastReviewed: REVIEWED,
    },
    ar: {
      slug: 'overtime-pay-oman',
      locale: 'ar',
      title: 'معدلات أجر العمل الإضافي في عُمان (2026)',
      metaDescription:
        'العمل الإضافي في عُمان: 125% من أجر الساعة، و150% ليلاً، و200% (الضعف) في أيام الراحة والعطل الرسمية (مرسوم 53/2023). أسبوع 40 ساعة. حاسبة.',
      intro:
        'تجمع عُمان بين خاصيتين تميّزانها عن جيرانها: مقياس ثلاثي الشرائح للعمل الإضافي بموجب المرسوم السلطاني 53/2023 يصل إلى أجر مضاعف في أيام الراحة والعطل، وأسبوع عمل معتاد أقصر مدته 40 ساعة. يغطي هذا الدليل الشرائح الثلاث، وما يعنيه الأسبوع الأقصر لأجر الساعة، مع مثال عملي.',
      sections: [
        {
          heading: 'معدل العمل الإضافي',
          body: `تُدفع ساعات العمل الإضافي العادية بنسبة **125%** من أجر الساعة.`,
        },
        {
          heading: 'الساعات الليلية مقابل أيام الراحة والعطل',
          body: `ترتفع **الساعات الليلية** إلى **150%**، لكن **أيام الراحة والعطل الرسمية** تقفز أبعد إلى **200% (أجر مضاعف)** — وهي تضاهي معدل العطل في الكويت، لكنها تُطبّق في عُمان على أيام الراحة أيضاً لا على العطل الرسمية فقط. وعُمان واحدة من دولتين فقط في سلسلة هذا الدليل (مع الكويت) تصلان إلى شريحة الأجر المضاعف الكاملة.`,
        },
        {
          heading: 'أسبوع عمل أقصر',
          body: `أسبوع العمل المعتاد في عُمان **40 ساعة**، أقصر من أسبوع الـ48 ساعة المعتمد في بقية المنطقة. ولأن أجر الساعة الأساسي هو الراتب السنوي (الشهري × 12) مقسوماً على ساعات العمل في السنة (52 أسبوعاً × الأسبوع المعتاد)، فإن أسبوعاً أقصر يعني أن نفس الراتب الشهري يتحوّل إلى أجر ساعة أساسي **أعلى** مما لو كان أسبوع العمل 48 ساعة — قبل حتى تطبيق معامل العمل الإضافي.`,
        },
        {
          heading: 'مثال عملي',
          body: `موظف يتقاضى **520 ريالاً عُمانياً** شهرياً على أسبوع عمل 40 ساعة.

أجر الساعة = (520 × 12) ÷ (52 × 40) = 6,240 ÷ 2,080 = **3 ريالات/ساعة**.

عن **8 ساعات** عمل إضافي عادي: المعدل = 3 × 1.25 = 3.75 ريال/ساعة؛ الأجر = 8 × 3.75 = **30 ريالاً**.

نفس الساعات الثماني ليلاً: المعدل = 3 × 1.5 = 4.5 ريال/ساعة؛ الأجر = **36 ريالاً**.

ونفس الساعات الثماني في يوم راحة أو عطلة رسمية: المعدل = 3 × 2.0 = 6 ريالات/ساعة؛ الأجر = **48 ريالاً**.`,
        },
      ],
      keyTakeaways: [
        '125% للساعات الإضافية العادية؛ و150% ليلاً.',
        '200% (أجر مضاعف) في أيام الراحة والعطل الرسمية — أعلى شريحة في سلسلة هذا الدليل مع الكويت.',
        'أسبوع العمل 40 ساعة — أقصر من 48 الإقليمية — يرفع أجر الساعة الأساسي نفسه.',
      ],
      faqs: [
        {
          q: 'لماذا أسبوع العمل المعتاد في عُمان أقصر من جيرانها؟',
          a: 'يحدد المرسوم السلطاني 53/2023 أسبوع العمل المعتاد في عُمان بـ40 ساعة، مقارنة بأسبوع 48 ساعة المعتمد في الأردن والسعودية والإمارات والكويت وقطر والبحرين. وهذا يؤثر في حساب أجر الساعة الأساسي، لا في جدول العمل فقط.',
        },
        {
          q: 'هل يعني أسبوع الـ40 ساعة أجر ساعة أعلى في عُمان؟',
          a: 'نعم بالنسبة لنفس الراتب الشهري. فقسمة الراتب السنوي على ساعات معتادة أقل (40 بدل 48 أسبوعياً) تعطي أجر ساعة أساسياً أعلى، وهذا يرفع بدوره كل رقم عمل إضافي يُحسب منه.',
        },
        {
          q: 'ما معدل العمل الإضافي في أيام الراحة والعطل الرسمية في عُمان؟',
          a: '200% — أي ضعف أجر الساعة العادي. وهذا يطابق مستوى معدل العطل الرسمية في الكويت، لكن عُمان تطبّقه على أيام الراحة العادية أيضاً لا على العطل الرسمية وحدها.',
        },
      ],
      relatedCalculators: REL,
      lastReviewed: REVIEWED,
    },
  },
};

export default overtimeGuides;
