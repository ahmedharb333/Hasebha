import type { GuideContent } from './types';
import type { Locale } from '../config/site';

/**
 * Guides content — one entry per guide slug, localized in Arabic and English.
 * Each guide links to one or more calculators via relatedCalculators.
 * Worked examples mirror the example inputs of the related calculators.
 * Last reviewed: 2026-08-09.
 */
const guides: Record<string, Record<Locale, GuideContent>> = {
  'how-to-calculate-end-of-service': {
    ar: {
      slug: 'how-to-calculate-end-of-service',
      locale: 'ar',
      title: 'كيف تحسب مكافأة نهاية الخدمة',
      metaDescription:
        'دليل عملي لحساب مكافأة نهاية الخدمة في دول الخليج والأردن: شرائح الأيام لكل سنة، والأجر اليومي من الراتب الأساسي، والاستقالة الطوعية، والسقوف، مع مثال عددي مطابق للحاسبة.',
      intro:
        'مكافأة نهاية الخدمة هي المبلغ الذي يستحقه الموظف عند انتهاء عقده، وتُحسب عادةً كعدد أيام من الراتب لكل سنة خدمة. تختلف الشرائح والأسس بين الدول اختلافاً كبيراً، ويلعب الراتب الأساسي دوراً محورياً في النتيجة. يشرح هذا الدليل آلية الحساب ويتبع المثال نفسه الذي تستخدمه حاسبة مكافأة نهاية الخدمة في كلار.',
      sections: [
        {
          heading: 'المعلومات التي تحتاجها',
          body: `لحساب المكافأة تحتاج أربعة مدخلات أساسية: **البلد** لأنه يحدد الشرائح والسقوف وقواعد الاستقالة، **تاريخ بداية الخدمة**، **تاريخ نهاية الخدمة**، و**الراتب الأساسي الشهري** وهو الراتب قبل البدلات والعمولات، لأن معظم قوانين المنطقة تحسب المكافأة عليه.
 
احرص على استخدام الراتب الأساسي لا الإجمالي؛ فالبدلات والسكن والنقل لا تدخل في أساس الحساب في الغالب، وإدخالها سيبالغ في النتيجة.`,
        },
        {
          heading: 'الأجر اليومي والسنوات',
          body: `الأجر اليومي يُشتق من الراتب الأساسي بقسمته على 30 يوماً: إذا كان الراتب الأساسي 900 دينار، فالأجر اليومي 30 ديناراً. أما مدة الخدمة فتُحسب بين تاريخي البداية والنهاية بالسنوات مع الكسور: ثماني سنوات وستة أشهر مثلاً تُعامل كـ 8.5 سنة تقريباً، وتُقسم كسور السنة تناسبياً على أساس 365 يوماً.`,
        },
        {
          heading: 'شرائح الأيام لكل سنة',
          body: `تختلف القاعدة الأساسية بين الدول:
 
**الأردن**: مكافأة شهر كامل (30 يوماً) عن كل سنة خدمة، مع تقسيم الكسور تناسبياً.
**السعودية**: نصف شهر عن السنوات الخمس الأولى ثم شهر كامل عن كل سنة بعدها، وهي شرائح تُطبق تراكمياً.
**الإمارات**: 21 يوماً عن السنوات الخمس الأولى ثم 30 يوماً بعدها، مع سقف إجمالي نحو 24 راتباً شهرياً.
**الكويت**: 15 يوماً عن السنوات الخمس الأولى ثم شهر كامل بعدها، مع سقف 18 شهراً.
**قطر**: نصف شهر عن السنوات الخمس الأولى ثم شهر كامل بعدها.
**البحرين**: نصف شهر عن السنوات الخمس الأولى ثم شهر كامل بعدها.
**عُمان**: شهر كامل (30 يوماً) عن كل سنة خدمة دون حد أعلى.
 
الحاسبة تطبق هذه الشرائح تلقائياً بحسب البلد المختار، بما فيها التقسيم التناسبي للسنة الجزئية.`,
        },
        {
          heading: 'الاستقالة الطوعية',
          body: `الاستقالة الطوعية قد تُخفض المكافأة في بعض الدول. أبرز مثال هو **الكويت**: لا مكافأة لمن يستقيل قبل إكمال 3 سنوات، ونصف المكافأة من 3 إلى 5 سنوات، والثلثان من 5 إلى 10 سنوات، والمكافأة كاملة بعد 10 سنوات. في هذا الإصدار، لا تنص قوانين الدول الأخرى المغطاة على مقياس تخفيض للاستقالة، لذا اختر «إنهاء من جهة العمل» إذا كان العقد انتهى دون استقالة طوعية.`,
        },
        {
          heading: 'مثال عملي',
          body: `لنأخذ مثالاً مطابقاً لقيم الحاسبة: موظف في **الأردن** خدم من **2018-01-01** إلى **2026-01-01** (≈ 8 سنوات) براتب أساسي **800 دينار**، مع انتهاء العقد من جهة العمل.
 
الأجر اليومي = 800 ÷ 30 ≈ 26.67 دينار. أيام المكافأة = 8 × 30 = 240 يوماً. المكافأة ≈ 240 × 26.67 ≈ **6,400 دينار**.`,
        },
        {
          heading: 'السقوف والفترات الانتقالية',
          body: `بعض الدول تفرض سقفاً أعلى للمكافأة، مثل الإمارات (نحو 24 راتباً شهرياً) والكويت (18 شهراً)، وتطبقه الحاسبة تلقائياً. كما قد تُحتسب الخدمة قبل تغيير القانون بأسس مختلفة في بعض الدول. النتيجة تقديرية تستند إلى القوانين الحالية، وللفترات الانتقالية الدقيقة راجع جهة العمل أو السلطات المختصة.`,
        },
        {
          heading: 'افتراضات الحساب',
          body: `تعتمد النتيجة على أن الراتب الأساسي ثابت طوال الخدمة أو أن القيمة المدخلة تمثل الراتب الأساسي الحالي، وأن السنة تقسم إلى 365 يوماً. تُراجع الشرائح دورياً مقابل المصادر الرسمية، وقد تتغير القوانين، لذا تحقق من الأرقام لدى الجهات المختصة قبل اتخاذ قرار.`,
        },
      ],
      keyTakeaways: [
        'المكافأة = أيام الاستحقاق × (الراتب الأساسي ÷ 30).',
        'الشرائح والسقوف تختلف بين الدول وتُطبق تراكمياً.',
        'الاستقالة الطوعية تُخفض المكافأة في الكويت وفق مقياس قانوني.',
        'الكسور السنوية تُقسم تناسبياً، والسقوف تُحد من النتيجة حيثما وُجدت.',
      ],
      faqs: [
        {
          q: 'هل تشمل المكافأة البدلات والسكن؟',
          a: 'في معظم قوانين المنطقة تُحسب المكافأة على الراتب الأساسي الشهري دون البدلات، لذا أدخل الأساسي فقط في الحاسبة.',
        },
        {
          q: 'ما الفرق بين الاحتساب تراكمياً والاحتساب بسعر واحد؟',
          a: 'الاحتساب التراكمي يطبق سعراً مختلفاً على كل شريحة خدمة (مثل نصف شهر للسنوات الخمس الأولى ثم شهر كامل بعدها)، وهذا ما تتبعه الحاسبة في الدول ذات الشرائح.',
        },
        {
          q: 'هل تتغير المكافأة إذا وقع العقد الجديد دون انقطاع؟',
          a: 'تعتمد القواعد على استمرارية الخدمة وتفاصيل العقد. أدخل تاريخ نهاية الخدمة الفعلي، وتحقق من كيفية معاملة استمرار الخدمة في بلدك.',
        },
      ],
      relatedCalculators: ['end-of-service', 'social-insurance', 'notice-period'],
      lastReviewed: '2026-08-12',
    },
    en: {
      slug: 'how-to-calculate-end-of-service',
      locale: 'en',
      title: 'How to calculate end-of-service gratuity',
      metaDescription:
        'A practical guide to calculating end-of-service gratuity across the Gulf and Jordan: days-per-year bands, the daily wage from basic salary, voluntary resignation, and caps, with a worked example that matches the calculator.',
      intro:
        'End-of-service gratuity is the amount an employee is entitled to when their contract ends, usually calculated as a number of salary days for each year of service. Bands and bases differ widely between countries, and the basic salary plays a central role. This guide explains the calculation and follows the same example used by the end-of-service calculator on Klar.',
      sections: [
        {
          heading: 'What you need',
          body: `You need four inputs: the **country**, because it determines the bands, caps and resignation rules; the **service start date**; the **service end date**; and the **basic monthly salary**, i.e. the salary before allowances and commissions, because most regional laws base the gratuity on it.
 
Use the basic salary, not the gross one; allowances, housing and transport are generally excluded from the base, and including them inflates the result.`,
        },
        {
          heading: 'Daily wage and years of service',
          body: `The daily wage is derived by dividing the basic salary by 30 days: a basic salary of 900 units gives a daily wage of 30 units. Service length is measured between the start and end dates in years with fractions: eight years and six months is treated as about 8.5 years, and the fractional year is pro-rated on a 365-day basis.`,
        },
        {
          heading: 'Days-per-year bands',
          body: `The base rule varies by country:
 
**Jordan**: one full month (30 days) per year of service, with fractional years pro-rated.
**Saudi Arabia**: half a month for the first five years, then one month per year after that, applied cumulatively.
**UAE**: 21 days for the first five years, then 30 days after, with an overall cap of about 24 monthly salaries.
**Kuwait**: 15 days for the first five years, then one month after, capped at 18 months.
**Qatar**: half a month for the first five years, then one month after.
**Bahrain**: half a month for the first five years, then one month after.
**Oman**: one full month (30 days) for each year of service with no upper cap.
 
The calculator applies these bands automatically for the selected country, including pro-rating a partial year.`,
        },
        {
          heading: 'Voluntary resignation',
          body: `Voluntary resignation can reduce the gratuity in some countries. The clearest example is **Kuwait**: no gratuity before 3 years, half from 3 to 5 years, two-thirds from 5 to 10 years, and the full amount after 10 years. In this version, the other covered countries do not provide a resignation reduction scale, so choose \u201CTerminated by employer\u201D if the contract ended without a voluntary resignation.`,
        },
        {
          heading: 'Worked example',
          body: `A worked example matching the calculator: an employee in **Jordan** served from **2018-01-01** to **2026-01-01** (≈ 8 years) on a basic salary of **800 units**, with the contract ended by the employer.
 
Daily wage = 800 ÷ 30 ≈ 26.67 units. Entitlement days = 8 × 30 = 240 days. Gratuity ≈ 240 × 26.67 ≈ **6,400 units**.`,
        },
        {
          heading: 'Caps and transitional periods',
          body: `Some countries cap the gratuity, such as the UAE (about 24 monthly salaries) and Kuwait (18 months), and the calculator applies these automatically. Service before a law change may also be computed on different bases in some countries. The result is an estimate based on current law; for exact transitional treatment consult your employer or the authorities.`,
        },
        {
          heading: 'Assumptions',
          body: `The result assumes the basic salary is stable over service (or that the entered value represents the current basic salary) and that a year is 365 days. Bands are reviewed periodically against official sources, and laws can change, so verify the figures with the relevant authorities before making decisions.`,
        },
      ],
      keyTakeaways: [
        'Gratuity = entitlement days × (basic salary ÷ 30).',
        'Bands and caps differ by country and apply cumulatively.',
        'Voluntary resignation reduces the gratuity in Kuwait per a statutory scale.',
        'Fractional years are pro-rated, and caps limit the result where they exist.',
      ],
      faqs: [
        {
          q: 'Do allowances and housing count?',
          a: 'Most regional laws base the gratuity on the basic monthly salary excluding allowances, so enter only the basic amount in the calculator.',
        },
        {
          q: 'What is the difference between cumulative and flat-rate calculation?',
          a: 'A cumulative calculation applies a different rate to each service band (e.g. half a month for the first five years, then a full month after), which is what the calculator follows in banded countries.',
        },
        {
          q: 'Does the gratuity change if a new contract follows without a gap?',
          a: 'It depends on continuity rules and the contract\u2019s terms. Enter the actual service end date and check how continuous service is treated in your country.',
        },
      ],
      relatedCalculators: ['end-of-service', 'social-insurance', 'notice-period'],
      lastReviewed: '2026-08-12',
    },
  },
  'how-to-calculate-social-insurance': {
    ar: {
      slug: 'how-to-calculate-social-insurance',
      locale: 'ar',
      title: 'كيف تحسب اشتراكات التأمين الاجتماعي',
      metaDescription:
        'دليل عملي لحساب اشتراكات التأمين الاجتماعي (حصة الموظف وصاحب العمل) في دول الخليج والأردن، مع السقوف الشهرية وملاحظات اشتراط المواطنة.',
      intro:
        'التأمين الاجتماعي هو اقتطاع إلزامي يدفعه الموظف وصاحب العمل معاً عن الراتب الخاضع، ويغطي التقاعد والمعاشات في معظم الدول. تختلف النسب والسقوف بين البلدان، وفي دول الخليج تشمل الاشتراكات المواطنين في أغلبها. يشرح هذا الدليل الأساس ويطابق قيم حاسبة التأمين الاجتماعي في كلار.',
      sections: [
        {
          heading: 'من يدفع وكم؟',
          body: `الاشتراك يُدفع من طرفين: **حصة الموظف** تُخصم من راتبه، و**حصة صاحب العمل** تُدفع فوق الراتب. النسب الحالية المطبقة في الحاسبة:
 
**الأردن**: الموظف 7.5% وصاحب العمل 14.25%، سقف 3,733 دينار شهرياً، ويشمل جميع الموظفين.
**السعودية**: الموظف 9.75% وصاحب العمل 11.75%، سقف 45,000 ريال شهرياً، للمواطنين.
**الإمارات**: الموظف 11% وصاحب العمل 15%، سقف 70,000 درهم شهرياً، للمواطنين.
**الكويت**: الموظف 8% وصاحب العمل 11.5%، سقف 2,750 دينار شهرياً، للمواطنين.
**قطر**: الموظف 7% وصاحب العمل 14%، سقف 100,000 ريال شهرياً، للمواطنين.
**البحرين**: الموظف 8% وصاحب العمل 18%، سقف 4,000 دينار شهرياً، للمواطنين.
**عُمان**: الموظف 8% وصاحب العمل 14.5%، سقف 3,000 ريال شهرياً، للمواطنين.`,
        },
        {
          heading: 'السقف الشهري',
          body: `لا تُحتسب الاشتراكات على كامل الراتب بل على **السقف الشهري** المحدد في كل بلد. إذا كان الراتب أعلى من السقف، يُقتطع على قيمة السقف فقط. على سبيل المثال في السعودية: راتب 50,000 ريال يُعامل معاملة 45,000 ريال، وحصة الموظف = 45,000 × 9.75% ≈ 4,387.5 ريال.`,
        },
        {
          heading: 'المواطنة في دول الخليج',
          body: `في السعودية والإمارات والكويت وقطر والبحرين وعُمان تسري اشتراكات التأمين الاجتماعي في الأساس على **المواطنين**؛ ولا تشمل الحاسبة نظام الادخار أو تعويض إصابات العمل للوافدين حيث يكونان منفصلين ومؤجلين. في الأردن يشمل الاشتراك جميع الموظفين بموجب قانون الضمان الاجتماعي.`,
        },
        {
          heading: 'مثال عملي',
          body: `مثال مطابق لقيم الحاسبة: موظف سعودي راتبه **15,000 ريال**. الراتب أقل من السقف فلا يُطبق تقييد. حصة الموظف = 15,000 × 9.75% ≈ **1,462.5 ريال**، وحصة صاحب العمل = 15,000 × 11.75% ≈ **1,762.5 ريال**، والمجموع ≈ **3,225 ريالاً** شهرياً.`,
        },
        {
          heading: 'متى تتغير النسب؟',
          body: `تُعدَّل النسب والسقوف من حين لآخر بمراسيم وأنظمة رسمية (مثل الانتقال إلى نظام التأمينات الجديد في عُمان في يوليو 2026). تُراجع الأرقام دورياً في الحاسبة، لكن تحقق دائماً من آخر التحديثات لدى الهيئات المختصة قبل اعتمادها.`,
        },
      ],
      keyTakeaways: [
        'حصة الموظف تُخصم من راتبه وحصة صاحب العمل تُدفع فوقه.',
        'الاقتطاع يُحسب على الراتب بعد تقييده بالسقف الشهري إن تجاوزه.',
        'في دول الخليج تغطي الاشتراكات المواطنين في أغلبها، والأردن يشمل الجميع.',
        'النسب والسقوف قابلة للتغيير بمراسيم رسمية وتُراجع دورياً.',
      ],
      faqs: [
        {
          q: 'هل يُخصم التأمين الاجتماعي من الوافدين؟',
          a: 'في أغلب دول الخليج يخضع المواطنون للاشتراكات التقاعدية، بينما تندرج تغطية الوافدين (إصابات العمل والادخار) ضمن أنظمة منفصلة بتواريخ تطبيق مختلفة. أدخل حالة الموظف بعد التحقق من جهة العمل.',
        },
        {
          q: 'ماذا يحدث إذا تجاوز الراتب السقف؟',
          a: 'يُحتسب الاقتطاع على قيمة السقف فقط، فلا يتضخم الاشتراك مع الراتب الأعلى. تُظهر الحاسبة «الأساس المقيد» لترى القيمة المعتمدة.',
        },
        {
          q: 'هل تُعد النسب دورياً؟',
          a: 'نعم، تُعدَّل النسب والسقوف بقرارات رسمية. تتبع الحاسبة أحدث القيم المسجلة في قاعدة البيانات وتشير إلى مصدر كل بلد.',
        },
      ],
      relatedCalculators: ['social-insurance', 'end-of-service', 'gross-to-net'],
      lastReviewed: '2026-08-12',
    },
    en: {
      slug: 'how-to-calculate-social-insurance',
      locale: 'en',
      title: 'How to calculate social-insurance contributions',
      metaDescription:
        'A practical guide to calculating social-insurance contributions (employee and employer shares) across the Gulf and Jordan, with monthly caps and citizens-only notes.',
      intro:
        'Social insurance is a mandatory contribution paid by both the employee and the employer on the covered salary, funding pensions and retirement schemes in most countries. Rates and caps differ by country, and in the Gulf the contributions largely cover citizens. This guide explains the basics and matches the social-insurance calculator on Klar.',
      sections: [
        {
          heading: 'Who pays, and how much?',
          body: `The contribution is paid by two parties: the **employee share** is deducted from the salary, and the **employer share** is paid on top of it. The rates currently used by the calculator:
 
**Jordan**: employee 7.5% and employer 14.25%, cap JOD 3,733 per month, covering all employees.
**Saudi Arabia**: employee 9.75% and employer 11.75%, cap SAR 45,000 per month, citizens.
**UAE**: employee 11% and employer 15%, cap AED 70,000 per month, citizens.
**Kuwait**: employee 8% and employer 11.5%, cap KWD 2,750 per month, citizens.
**Qatar**: employee 7% and employer 14%, cap QAR 100,000 per month, citizens.
**Bahrain**: employee 8% and employer 18%, cap BHD 4,000 per month, citizens.
**Oman**: employee 8% and employer 14.5%, cap OMR 3,000 per month, citizens.`,
        },
        {
          heading: 'The monthly cap',
          body: `Contributions are not based on the full salary but on the **monthly cap** set by each country. If the salary exceeds the cap, only the capped amount is used. For example in Saudi Arabia: a salary of 50,000 SAR is treated as 45,000 SAR, and the employee share = 45,000 × 9.75% ≈ 4,387.5 SAR.`,
        },
        {
          heading: 'Citizenship in the Gulf',
          body: `In Saudi Arabia, the UAE, Kuwait, Qatar, Bahrain and Oman, social-insurance contributions essentially cover **citizens**; the calculator does not cover expat savings or work-injury schemes, which are separate and have their own deferred start dates. In Jordan, the Social Security Corporation covers all employees.`,
        },
        {
          heading: 'Worked example',
          body: `An example matching the calculator: a Saudi employee earning **15,000 SAR**. The salary is below the cap, so no limit applies. Employee share = 15,000 × 9.75% ≈ **1,462.5 SAR**, employer share = 15,000 × 11.75% ≈ **1,762.5 SAR**, and the total ≈ **3,225 SAR** per month.`,
        },
        {
          heading: 'When do the rates change?',
          body: `Rates and caps are adjusted from time to time by official decrees and regulations (such as the move to the new insurance system in Oman in July 2026). The figures are reviewed periodically in the calculator, but always verify the latest updates with the relevant authorities before relying on them.`,
        },
      ],
      keyTakeaways: [
        'The employee share is deducted from the salary; the employer share is paid on top.',
        'Contributions are based on the salary capped at the monthly limit if it is exceeded.',
        'In the Gulf the contributions largely cover citizens; Jordan covers everyone.',
        'Rates and caps change by official decree and are reviewed periodically.',
      ],
      faqs: [
        {
          q: 'Are expats subject to social insurance?',
          a: 'In most Gulf states, citizens are covered by the pension contributions, while expat coverage (work injury and savings) sits in separate schemes with different start dates. Enter the employee\u2019s situation after checking with the employer.',
        },
        {
          q: 'What happens if the salary exceeds the cap?',
          a: 'Only the capped amount is used, so the contribution does not grow with a higher salary. The calculator shows the \u201Ccapped base\u201D so you can see the amount used.',
        },
        {
          q: 'Are the rates updated periodically?',
          a: 'Yes, rates and caps change through official decisions. The calculator follows the latest values in the database and cites the source for each country.',
        },
      ],
      relatedCalculators: ['social-insurance', 'end-of-service', 'gross-to-net'],
      lastReviewed: '2026-08-12',
    },
  },
  'how-to-calculate-notice-period': {
    ar: {
      slug: 'how-to-calculate-notice-period',
      locale: 'ar',
      title: 'كيف تحسب فترة الإشعار',
      metaDescription:
        'دليل عملي لفترة الإشعار الواجبة عند إنهاء عقد العمل في دول الخليج والأردن، مع جداول الأيام لكل بلد وملاحظات حول من يوجّه الإشعار.',
      intro:
        'فترة الإشعار هي المهلة التي يجب أن تسبق إنهاء عقد العمل، سواء من طرف الموظف أو صاحب العمل، وتُحددها قوانين العمل في كل بلد وقد تختلف باختلاف مدة الخدمة أو طريقة الدفع. يشرح هذا الدليل القواعد المطبقة في الحاسبة.',
      sections: [
        {
          heading: 'لماذا تختلف الفترة بين البلدان؟',
          body: `تضع كل دولة قوانينها الخاصة للإشعار. بعضها يثبت مدة واحدة، وبعضها يربطها بمدة الخدمة. القيم المطبقة في الحاسبة:
 
**الأردن**: 30 يوماً للعقود غير محددة المدة.
**السعودية**: 30 يوماً للعامل بأجر شهري عند إشعاره من جانبه، و60 يوماً عند إشعار صاحب العمل (بعد تعديلات فبراير 2025).
**الإمارات**: من 30 إلى 90 يوماً وفق ما يتفق عليه، بحد أدنى 30 يوماً.
**الكويت**: 3 أشهر للعامل بأجر شهري، وشهر للباقين.
**قطر**: شهر للخدمة حتى سنتين، وشهران لما بعد ذلك (للعقود غير المحددة).
**البحرين**: 30 يوماً على الأقل كتابياً.
**عُمان**: 30 يوماً للأجير الشهري و15 يوماً لغيره، و3 أشهر على الأقل للإنهاء لأسباب اقتصادية.`,
        },
        {
          heading: 'دور مدة الخدمة',
          body: `في بعض البلدان تُربط الفترة بمدة الخدمة، مثل قطر حيث تتضاعف الفترة بعد سنتين من الخدمة. تدعم الحاسبة هذه الحالات بشرائح حسب سنوات الخدمة، وتختار الشريحة المناسبة تلقائياً من القيم المسجلة لكل بلد.`,
        },
        {
          heading: 'من يوجّه الإشعار؟',
          body: `لا تعني الفترة نفسها أن الطرفين متساويان دائماً. في السعودية مثلاً يمنح القانون 60 يوماً إذا كان الإشعار من صاحب العمل و30 يوماً إذا كان من العامل. الحاسبة تعرض المدة الأساسية المسجلة في القانون، وراجع تفاصيل الاتجاهين في نصوص القوانين.`,
        },
        {
          heading: 'بدل الإشعار',
          body: `يجوز في أغلب الدول تعويض الإشعار بدفع مبلغ يعادل أجر الفترة بدلاً من استمرار العمل، مثل عُمان حيث يُدفع تعويض يساوي أجر فترة الإشعار على آخر أجر إجمالي. تُراجع الشروط في عقد العمل وقانون البلد.`,
        },
      ],
      keyTakeaways: [
        'فترة الإشعار تختلف بين البلدان وقد تختلف باختلاف مدة الخدمة وطريقة الدفع.',
        'قطر تربط الفترة بمدة الخدمة (شهر حتى سنتين، شهران بعدها).',
        'قد يكون إشعار صاحب العمل أطول من إشعار العامل في بعض الدول (مثل السعودية).',
        'يجوز في أغلب الدول دفع بدل نقدي يعادل أجر فترة الإشعار.',
      ],
      faqs: [
        {
          q: 'هل يمكن الاتفاق على فترة إشعار أطول؟',
          a: 'نعم، يجوز لمعظم القوانين الاتفاق على فترة أطول من الحد الأدنى، بشرط ألا تقل عنه، وأحياناً يُبطل أي اتفاق يخفض الحد الأدنى القانوني.',
        },
        {
          q: 'ماذا يعني تعويض الإشعار؟',
          a: 'تعويض الإشعار هو دفع مبلغ نقدي يعادل أجر فترة الإشعار كاملة لإنهاء العقد فوراً دون انتظار المدة، ويُحسب على آخر أجر.',
        },
        {
          q: 'هل يختلف الإشعار في العقود محددة المدة؟',
          a: 'نعم، بعض القوانين (مثل قطر) تضع سلماً منفصلاً للعقود محددة المدة. الحاسبة تعرض قاعدة العقد غير محدد المدة، ويلزم التحقق من العقد نفسه.',
        },
      ],
      relatedCalculators: ['notice-period', 'end-of-service', 'leave-balance'],
      lastReviewed: '2026-08-12',
    },
    en: {
      slug: 'how-to-calculate-notice-period',
      locale: 'en',
      title: 'How to calculate the notice period',
      metaDescription:
        'A practical guide to the notice period required to end an employment contract across the Gulf and Jordan, with per-country day tables and notes on who serves the notice.',
      intro:
        'The notice period is the lead time that must precede the end of an employment contract, whether given by the employee or the employer. Labour laws in each country set the period, and it can vary with the length of service or the payment method. This guide explains the rules used by the calculator.',
      sections: [
        {
          heading: 'Why does it differ between countries?',
          body: `Each country sets its own notice rules. Some fix a single period, while others link it to the length of service. The values used by the calculator:
 
**Jordan**: 30 days for indefinite-term contracts.
**Saudi Arabia**: 30 days for a monthly-paid worker when the notice is given by the worker, and 60 days when given by the employer (after the February 2025 amendments).
**UAE**: 30 to 90 days as agreed, with a minimum of 30 days.
**Kuwait**: 3 months for monthly-paid workers, and 1 month for others.
**Qatar**: 1 month for service of up to two years, and 2 months beyond that (indefinite contracts).
**Bahrain**: at least 30 days in writing.
**Oman**: 30 days for a monthly-paid worker and 15 for others, and at least 3 months for economic-cause termination.`,
        },
        {
          heading: 'The role of service length',
          body: `Some countries tie the period to the length of service, such as Qatar, where it doubles after two years of service. The calculator supports these cases with bands by years of service and selects the right band automatically from each country\u2019s stored rules.`,
        },
        {
          heading: 'Who serves the notice?',
          body: `The same period does not always apply to both parties. In Saudi Arabia, for example, the law gives 60 days when the notice comes from the employer and 30 when it comes from the worker. The calculator shows the base period stored in the law; check the direction-specific details in the statutory texts.`,
        },
        {
          heading: 'Payment in lieu of notice',
          body: `Most countries allow replacing the notice with a payment equal to the wage for the period instead of continuing work, such as Oman, where a compensation equal to the notice-period wage on the last gross wage is paid. Review the contract terms and the country\u2019s law.`,
        },
      ],
      keyTakeaways: [
        'The notice period differs between countries and can vary with service length and pay method.',
        'Qatar links the period to service length (1 month up to two years, 2 months after).',
        'Employer-side notice can be longer than worker-side notice in some countries (e.g. Saudi Arabia).',
        'Most countries allow a cash payment in lieu of the notice period.',
      ],
      faqs: [
        {
          q: 'Can the parties agree a longer notice period?',
          a: 'Yes, most laws allow agreeing a period longer than the minimum, as long as it is not below it, and some void any agreement that reduces the statutory minimum.',
        },
        {
          q: 'What does payment in lieu of notice mean?',
          a: 'It is a cash payment equal to the full wage for the notice period, ending the contract immediately without waiting out the period, usually based on the last wage.',
        },
        {
          q: 'Does fixed-term employment use a different notice?',
          a: 'Yes, some laws (such as Qatar) set a separate scale for fixed-term contracts. The calculator shows the indefinite-contract rule; always check the contract itself.',
        },
      ],
      relatedCalculators: ['notice-period', 'end-of-service', 'leave-balance'],
      lastReviewed: '2026-08-12',
    },
  },
  'how-to-calculate-maternity-leave': {
    ar: {
      slug: 'how-to-calculate-maternity-leave',
      locale: 'ar',
      title: 'كيف تحسب إجازة الأمومة',
      metaDescription:
        'دليل عملي لإجازة الأمومة في دول الخليج والأردن: عدد الأيام لكل بلد، وملاحظات حول توزيع الأجر وبدء الإجازة قبل الولادة.',
      intro:
        'إجازة الأمومة حق منصوص عليه في قوانين العمل تختلف مدته بين الدول، وقد تتضمن تفاصيل حول الأجر قبل الولادة وبعدها. يشرح هذا الدليل المدد المطبقة في الحاسبة وملاحظات توزيع الأجر.',
      sections: [
        {
          heading: 'المدد حسب البلد',
          body: `المدد المعتمدة في الحاسبة:
 
**الأردن**: 90 يوماً (عدّلها القانون في 2025).
**السعودية**: 84 يوماً (12 أسبوعاً بأجر كامل بعد التعديلات اعتباراً من فبراير 2025، مع 6 أسابيع إلزامية بعد الولادة).
**الإمارات**: 60 يوماً (45 يوماً بأجر كامل و15 بأجر نصف).
**الكويت**: 70 يوماً (30 قبل الولادة و40 بعدها).
**قطر**: 50 يوماً.
**البحرين**: 60 يوماً.
**عُمان**: 98 يوماً، بحد أقصى 14 يوماً قبل الولادة.`,
        },
        {
          heading: 'توزيع الأجر',
          body: `لا تعني المدة الكاملة أجراً كاملاً دائماً. في الإمارات مثلاً أول 45 يوماً بأجر كامل ثم 15 يوماً بنصف الأجر. تختلف المعالجة بين البلدان، وتعرض الحاسبة المدة الإجمالية، بينما يجب التحقق من تفاصيل الأجر من قانون كل بلد أو جهة العمل.`,
        },
        {
          heading: 'الأيام قبل الولادة',
          body: `تحدد بعض القوانين متى تبدأ الإجازة، مثل عُمان بحد أقصى 14 يوماً قبل الولادة المتوقعة، والكويت 30 يوماً قبلها. تفاصيل التوقيت قابلة للتعديل بالاتفاق أو بحسب الحالة الصحية، وتخضع للوائح التنفيذية.`,
        },
      ],
      keyTakeaways: [
        'المدد تتراوح من 50 يوماً في قطر إلى 98 يوماً في عُمان.',
        'قد تُدفع الإجازة بأجر كامل أو جزئي حسب مراحلها في بعض الدول.',
        'بعض الدول تحدد حداً أقصى للأيام التي تسبق الولادة.',
        'النتيجة تُظهر المدة الإجمالية، والأجر التفصيلي يخضع لقانون البلد.',
      ],
      faqs: [
        {
          q: 'هل تُحسب الأيام تقويمية؟',
          a: 'نعم، تُحتسب الأيام تقويمية شاملة عطلات نهاية الأسبوع والأعياد في المدة الإجمالية.',
        },
        {
          q: 'هل يمكن تمديد الإجازة؟',
          a: 'بعض الدول تتيح تمديداً غير مدفوع (مثل الإمارات بموجب اللائحة التنفيذية)، وهو خارج المدة القانونية الأساسية.',
        },
        {
          q: 'ماذا عن الموظفين غير الخاضعين؟',
          a: 'تنطبق هذه المدد على الخاضعين لقانون العمل، وقد تختلف أحكام القطاعات العامة أو فئات خاصة، لذا تحقق من جهة العمل.',
        },
      ],
      relatedCalculators: ['maternity-leave', 'leave-balance', 'notice-period'],
      lastReviewed: '2026-08-12',
    },
    en: {
      slug: 'how-to-calculate-maternity-leave',
      locale: 'en',
      title: 'How to calculate maternity leave',
      metaDescription:
        'A practical guide to maternity leave across the Gulf and Jordan: days per country, plus notes on pay splits and starting leave before birth.',
      intro:
        'Maternity leave is a statutory right whose length varies by country and can include details about pay before and after birth. This guide explains the durations used by the calculator and pay-split notes.',
      sections: [
        {
          heading: 'Duration by country',
          body: `The durations used by the calculator:
 
**Jordan**: 90 days (amended in 2025).
**Saudi Arabia**: 84 days (12 weeks on full pay after the amendments effective February 2025, with 6 mandatory weeks after birth).
**UAE**: 60 days (45 on full pay and 15 on half pay).
**Kuwait**: 70 days (30 before and 40 after the expected delivery date).
**Qatar**: 50 days.
**Bahrain**: 60 days.
**Oman**: 98 days, with a maximum of 14 days before birth.`,
        },
        {
          heading: 'The pay split',
          body: `Full duration does not always mean full pay. In the UAE, for example, the first 45 days are on full pay and the next 15 on half pay. Treatment varies by country; the calculator shows the total duration, while pay details should be verified against each country\u2019s law or the employer.`,
        },
        {
          heading: 'Days before birth',
          body: `Some laws set when leave starts, such as Oman with a maximum of 14 days before the expected delivery date, and Kuwait with 30 days before it. Timing details may be adjusted by agreement or health condition and are subject to implementing regulations.`,
        },
      ],
      keyTakeaways: [
        'Durations range from 50 days in Qatar to 98 days in Oman.',
        'Leave may be paid in full or in part depending on its stage in some countries.',
        'Some countries cap the days that can precede birth.',
        'The result shows the total duration; detailed pay follows the country\u2019s law.',
      ],
      faqs: [
        {
          q: 'Are the days calendar days?',
          a: 'Yes, the days are calendar days, including weekends and holidays, within the total duration.',
        },
        {
          q: 'Can the leave be extended?',
          a: 'Some countries allow an unpaid extension (such as the UAE under its implementing regulation), which falls outside the core statutory duration.',
        },
        {
          q: 'What about workers not covered?',
          a: 'These durations apply to employees covered by labour law; public-sector or special categories may differ, so check with the employer.',
        },
      ],
      relatedCalculators: ['maternity-leave', 'leave-balance', 'notice-period'],
      lastReviewed: '2026-08-12',
    },
  },
  'how-to-calculate-gross-to-net': {
    ar: {
      slug: 'how-to-calculate-gross-to-net',
      locale: 'ar',
      title: 'كيف تحسب الراتب الصافي من الإجمالي',
      metaDescription:
        'دليل عملي لتحويل الراتب الإجمالي إلى الصافي بعد الخصومات القانونية (التأمين الاجتماعي وضريبة الدخل) في دول الخليج والأردن، مع ترتيب الاقتطاعات والسقوف.',
      intro:
        'الراتب الإجمالي هو ما يدفعه صاحب العمل، أما الصافي فهو ما يصلك فعلياً بعد الاقتطاعات القانونية. يعتمد التحويل على ترتيب الاقتطاعات وسقوف كل بلد، ومعظم دول الخليج لا تفرض ضريبة دخل على الأفراد. يشرح هذا الدليل خطوات الحاسبة.',
      sections: [
        {
          heading: 'ترتيب الاقتطاعات',
          body: `تُطبق الحاسبة الاقتطاعات بالترتيب المسجل لكل بلد. في جميع البلدان المغطاة يبدأ التحويل بـ**التأمين الاجتماعي** على الراتب (مقيّداً بالسقف الشهري إن وُجد)، ثم في **الأردن** تُضاف **ضريبة الدخل** بعد تطبيق الإعفاء الشخصي والشرائح السنوية.`,
        },
        {
          heading: 'لا ضريبة دخل في الخليج',
          body: `السعودية والإمارات والكويت وقطر والبحرين لا تفرض ضريبة دخل شخصية على رواتب الموظفين، لذا يقتصر الاقتطاع على التأمين الاجتماعي حيث يخضع له الموظف. في عُمان تُعلن ضريبة شخصية (5% فوق 42,000 ريال سنوياً) اعتباراً من 1 يناير 2028، وهي خارج النطاق الحالي.`,
        },
        {
          heading: 'الأردن: الشرائح والإعفاء',
          body: `في الأردن تُحسب الضريبة سنوياً على الدخل بعد **الإعفاء الشخصي (9,000 دينار)**، ثم بشرائح تبدأ من 5% وتتصاعد حتى 30%. تحوّل الحاسبة الراتب الشهري إلى سنوي، وتطبق الإعفاء والشرائح، ثم تعيد النتيجة إلى أساس شهري.`,
        },
        {
          heading: 'السقوف وأثرها',
          body: `عندما يتجاوز الراتب سقف التأمين الاجتماعي، يُقتطع الاشتراك على السقف لا على الراتب الكامل، ما يعني أن الصافي لا يتناقص بنسبة ثابتة عند الراتب المرتفع. تُظهر الحاسبة الأساس المقيد في النتائج.`,
        },
      ],
      keyTakeaways: [
        'الصافي = الإجمالي − خصم التأمين الاجتماعي (− ضريبة الدخل في الأردن).',
        'التأمين الاجتماعي يُحسب على الراتب المقيد بالسقف الشهري.',
        'دول الخليج (عدا عُمان اعتباراً من 2028) لا تفرض ضريبة دخل شخصية.',
        'الأردن يطبق إعفاءً شخصياً ثم شرائح تصاعدية سنوية.',
      ],
      faqs: [
        {
          q: 'هل تشمل الحاسبة بدلات وخصومات أخرى؟',
          a: 'تغطي الحالية الخصومات القانونية الأساسية (التأمين الاجتماعي وضريبة الدخل). القروض والاقتطاعات الاتفاقية والقضائية لا تُحتسب.',
        },
        {
          q: 'لماذا يظهر الأساس المقيد؟',
          a: 'لأن اشتراك التأمين الاجتماعي يُحتسب على سقف شهري محدد لكل بلد، ويوضح الأساس المقيد القيمة المعتمدة عند تجاوز الراتب للسقف.',
        },
        {
          q: 'هل توجد ضريبة دخل في دول الخليج؟',
          a: 'لا تفرض السعودية والإمارات والكويت وقطر والبحرين ضريبة دخل شخصية على الرواتب. عُمان ستُدخل ضريبة شخصية في 2028.',
        },
      ],
      relatedCalculators: ['gross-to-net', 'income-tax', 'social-insurance'],
      lastReviewed: '2026-08-12',
    },
    en: {
      slug: 'how-to-calculate-gross-to-net',
      locale: 'en',
      title: 'How to convert gross salary to net',
      metaDescription:
        'A practical guide to converting gross salary to net after statutory deductions (social insurance and income tax) across the Gulf and Jordan, with deduction order and caps.',
      intro:
        'The gross salary is what the employer pays, while the net salary is what you actually receive after statutory deductions. The conversion depends on the order of deductions and each country\u2019s caps, and most Gulf states do not tax personal employment income. This guide explains the calculator\u2019s steps.',
      sections: [
        {
          heading: 'The order of deductions',
          body: `The calculator applies deductions in the order stored for each country. In all covered countries the conversion starts with **social insurance** on the salary (capped at the monthly limit if any), then in **Jordan** **income tax** is added after applying the personal allowance and the annual brackets.`,
        },
        {
          heading: 'No income tax in the Gulf',
          body: `Saudi Arabia, the UAE, Kuwait, Qatar and Bahrain do not levy personal income tax on employment salaries, so the only deduction is social insurance where the employee is covered. Oman announced a personal tax (5% above OMR 42,000 per year) effective 1 January 2028, outside the current scope.`,
        },
        {
          heading: 'Jordan: brackets and allowance',
          body: `In Jordan, tax is calculated annually on income after the **personal allowance (JOD 9,000)**, then on progressive brackets starting at 5% up to 30%. The calculator converts the monthly salary to annual, applies the allowance and brackets, then returns the result to a monthly basis.`,
        },
        {
          heading: 'Caps and their effect',
          body: `When the salary exceeds the social-insurance cap, the contribution is based on the cap rather than the full salary, so the net does not shrink at a fixed rate at high salaries. The calculator shows the capped base in the results.`,
        },
      ],
      keyTakeaways: [
        'Net = gross − social insurance (− income tax in Jordan).',
        'Social insurance is based on the salary capped at the monthly limit.',
        'Gulf states (except Oman from 2028) do not levy personal income tax.',
        'Jordan applies a personal allowance, then progressive annual brackets.',
      ],
      faqs: [
        {
          q: 'Does the calculator include other deductions?',
          a: 'It covers the core statutory deductions (social insurance and income tax). Loans and contractual or court-ordered deductions are not included.',
        },
        {
          q: 'Why is a capped base shown?',
          a: 'Because the social-insurance contribution is based on a monthly cap per country, and the capped base shows the amount used when the salary exceeds the cap.',
        },
        {
          q: 'Is there income tax in the Gulf?',
          a: 'Saudi Arabia, the UAE, Kuwait, Qatar and Bahrain do not levy personal income tax on salaries. Oman will introduce a personal tax in 2028.',
        },
      ],
      relatedCalculators: ['gross-to-net', 'income-tax', 'social-insurance'],
      lastReviewed: '2026-08-12',
    },
  },
  'how-to-calculate-income-tax': {
    ar: {
      slug: 'how-to-calculate-income-tax',
      locale: 'ar',
      title: 'كيف تحسب ضريبة الدخل على الراتب',
      metaDescription:
        'دليل عملي لضريبة الدخل الشخصية في الأردن (الشرائح والإعفاء) وغيابها في دول الخليج، مع نظرة على ضريبة عُمان المقررة عام 2028.',
      intro:
        'ضريبة الدخل على رواتب الموظفين غير موحدة في المنطقة: تفرضها الأردن بشرائح تصاعدية، ولا تفرضها معظم دول الخليج أصلاً، بينما تعلن عُمان ضريبة شخصية مقررة لعام 2028. يشرح هذا الدليل ما تعرضه الحاسبة.',
      sections: [
        {
          heading: 'الأردن: الشرائح والإعفاء',
          body: `يُطبق في الأردن إعفاء شخصي قدره **9,000 دينار سنوياً** على مجموع الدخل، ثم تُفرض الشرائح التصاعدية على ما تبقى: 5% حتى 5,000 دينار، و10% حتى 10,000، و15% حتى 15,000، و20% حتى 20,000، و25% حتى 1,000,000، و30% فيما فوق. تُحسب الضريبة سنوياً ثم تُوزع على الأشهر.`,
        },
        {
          heading: 'دول بلا ضريبة دخل شخصية',
          body: `السعودية والإمارات والكويت وقطر والبحرين لا تفرض ضريبة دخل شخصية على رواتب الموظفين؛ وما يُفرض في بعضها ضرائب شركات وأرباح أنشطة تجارية لا تمس الأجور. لذلك تكون الضريبة **صفراً** لهذه الدول في الحاسبة.`,
        },
        {
          heading: 'عُمان: من 2028',
          body: `عُمان حالياً بلا ضريبة دخل شخصية، لكن المرسوم السلطاني رقم 56/2025 يقرر ضريبة **5%** على الدخل السنوي الذي يتجاوز **42,000 ريال** للمقيمين الضريبيين وبعض غير المقيمين، على أن تسري اعتباراً من **1 يناير 2028**. الحاسبة تعكس الوضع الحالي (صفر).`,
        },
        {
          heading: 'كيف تحسبها بنفسك',
          body: `جمع الدخل السنوي، اطرح الإعفاء الشخصي، وطبق كل شريحة على الجزء الواقع ضمنها فقط (لا على كامل المبلغ بسعر أعلى شريحة). مثال: دخل سنوي 14,000 دينار بعد الإعفاء: 5,000 × 5% + 4,000 × 10% = 250 + 400 = 650 ديناراً.`,
        },
      ],
      keyTakeaways: [
        'الأردن: إعفاء 9,000 دينار ثم شرائح من 5% إلى 30%.',
        'السعودية والإمارات والكويت وقطر والبحرين: صفر ضريبة على الرواتب.',
        'عُمان: ضريبة 5% فوق 42,000 ريال سنوياً اعتباراً من 1 يناير 2028.',
        'الشرائح تُطبق على الجزء الواقع ضمن كل شريحة، لا على كامل الدخل.',
      ],
      faqs: [
        {
          q: 'لماذا تُظهر الحاسبة صفراً لدول الخليج؟',
          a: 'لأن قوانينها لا تفرض ضريبة دخل شخصية على رواتب الموظفين حالياً؛ الضرائب فيها موجهة لشركات وأنشطة تجارية.',
        },
        {
          q: 'هل الإعفاء الشخصي للأردن لكل الموظفين؟',
          a: 'الإعفاء العام 9,000 دينار سنوياً، وقد تزيد إعفاءات خاصة (أسرية وتعليمية) حسب الحالة؛ الحاسبة تعتمد الإعفاء الأساسي.',
        },
        {
          q: 'هل يشمل المثال المساهمة الوطنية؟',
          a: 'لا، هناك مساهمة وطنية 1% على الدخل الخاضع فوق 200,000 دينار في الأردن، وهي خارج نطاق الحاسبة الحالي.',
        },
      ],
      relatedCalculators: ['income-tax', 'gross-to-net', 'social-insurance'],
      lastReviewed: '2026-08-12',
    },
    en: {
      slug: 'how-to-calculate-income-tax',
      locale: 'en',
      title: 'How to calculate income tax on salary',
      metaDescription:
        'A practical guide to personal income tax in Jordan (brackets and allowance) and its absence in the Gulf, with a look at Oman\u2019s tax scheduled for 2028.',
      intro:
        'Personal income tax on employment salaries is not uniform across the region: Jordan levies progressive brackets, most Gulf states levy none at all, and Oman has announced a personal tax for 2028. This guide explains what the calculator shows.',
      sections: [
        {
          heading: 'Jordan: brackets and allowance',
          body: `Jordan applies a personal allowance of **JOD 9,000 per year** to total income, then progressive brackets on the remainder: 5% up to 5,000, 10% up to 10,000, 15% up to 15,000, 20% up to 20,000, 25% up to 1,000,000, and 30% above. Tax is computed annually, then spread over the months.`,
        },
        {
          heading: 'Countries with no personal income tax',
          body: `Saudi Arabia, the UAE, Kuwait, Qatar and Bahrain do not levy personal income tax on employment salaries; the taxes they do impose target companies and business profits, not wages. The tax is therefore **zero** for these countries in the calculator.`,
        },
        {
          heading: 'Oman: from 2028',
          body: `Oman currently has no personal income tax, but Royal Decree 56/2025 introduces a **5%** tax on annual income above **OMR 42,000** for tax residents and certain non-residents, effective **1 January 2028**. The calculator reflects the current position (zero).`,
        },
        {
          heading: 'How to compute it yourself',
          body: `Add up annual income, subtract the personal allowance, and apply each bracket only to the slice that falls within it (not the whole amount at the top rate). Example: annual income of 14,000 after the allowance: 5,000 × 5% + 4,000 × 10% = 250 + 400 = 650.`,
        },
      ],
      keyTakeaways: [
        'Jordan: allowance of 9,000, then brackets from 5% to 30%.',
        'Saudi Arabia, UAE, Kuwait, Qatar, Bahrain: zero tax on salaries.',
        'Oman: 5% above 42,000 per year effective 1 January 2028.',
        'Brackets apply to each slice, not the entire income at the top rate.',
      ],
      faqs: [
        {
          q: 'Why does the calculator show zero for Gulf states?',
          a: 'Because their laws do not currently levy personal income tax on employment salaries; their taxes target companies and business activity.',
        },
        {
          q: 'Is the Jordanian allowance the same for everyone?',
          a: 'The general allowance is JOD 9,000 per year, and additional family and education allowances may apply; the calculator uses the basic allowance.',
        },
        {
          q: 'Does the example include the national contribution?',
          a: 'No, there is a 1% national contribution on taxable income above JOD 200,000 in Jordan, which is outside the calculator\u2019s current scope.',
        },
      ],
      relatedCalculators: ['income-tax', 'gross-to-net', 'social-insurance'],
      lastReviewed: '2026-08-12',
    },
  },
  'how-to-calculate-loan-payment': {
    ar: {
      slug: 'how-to-calculate-loan-payment',
      locale: 'ar',
      title: 'كيف تحسب القسط الشهري للقرض',
      metaDescription:
        'دليل عملي لحساب القسط الشهري وإجمالي الفائدة والتكلفة الكلية للقرض خطوة بخطوة، مع مثال عددي مطابق للحاسبة وافتراضات واضحة وتنبيهات حول الفائدة المتغيرة.',
      intro:
        'قبل أن تقترض، من الحكمة أن تعرف مسبقاً كم ستدفع كل شهر وما التكلفة الكلية للقرض. يشرح هذا الدليل كيف تُحسب الأقساط الشهرية للقروض بسعر فائدة ثابت، وما الفرق بين المبلغ المقترض والتكلفة الفعلية الكاملة. يتبع المثال الوارد هنا نفس القيم التي تستخدمها حاسبة القسط الشهري في كلار، حتى تتمكن من مقارنة النتائج مباشرة.',
      sections: [
        {
          heading: 'المعلومات التي تحتاجها',
          body: `لحساب القسط الشهري تحتاج أربع معلومات أساسية: **مبلغ القرض** وهو إجمالي ما ستقترضه، **سعر الفائدة السنوي** بالنسبة المئوية، **مدة القرض** بالسنوات أو الأشهر، و**الدفعة المقدمة** إن وجدت وهي ما تدفعه مقدماً ويُخصم من قيمة القرض. قد ترغب أيضاً في إضافة **الرسوم** التي يتقاضاها المُقرِض لتظهر في التكلفة الكلية.

احرص على إدخال النسبة السنوية كما هي دون قسمتها على 12؛ فالحاسبة تتعامل مع التحويل الشهري تلقائياً. إذا كان القرض بدون فائدة فأدخل صفراً في سعر الفائدة، وستُحسب الأقساط بقسمة المبلغ المتبقي بالتساوي على عدد الأشهر.`,
        },
        {
          heading: 'المبلغ المقترض الفعلي',
          body: `المبلغ الذي تُحسب عليه الفائدة ليس هو مبلغ القرض المعلن، بل المتبقي منه بعد خصم الدفعة المقدمة. على سبيل المثال، إذا كان سعر القرض 100,000 دينار ودفعت 10,000 دينار مقدماً، فإن المبلغ المقترض فعلياً هو 90,000 دينار، وتُحسب الفائدة والأقساط على هذا المبلغ.

تجاهل الدفعة المقدمة من أكثر الأخطاء شيوعاً، لأنه يجعل القسط الشهري يبدو أكبر من الواقع، أو يجعلك تقارن بين العروض على أساس خاطئ. ضع في الاعتبار دائماً ما تملكه من مقدم، وما إذا كانت زيادة الدفعة المقدمة تناسب وضعك المالي.`,
        },
        {
          heading: 'معادلة القسط الثابت',
          body: `تُحسب الأقساط الشهرية للقرض بسعر فائدة ثابت باستخدام معادلة القسط الثابت. أولاً حوّل النسبة السنوية إلى نسبة شهرية بقسمتها على 12، وحدد عدد الأشهر بضرب السنوات في 12 إذا كانت المدة بالسنوات. ثم تطبق المعادلة: القسط الشهري يساوي المبلغ المتبقي مضروباً في النسبة الشهرية مضروباً في (1 + النسبة الشهرية) مرفوعاً لعدد الأشهر، مقسوماً على ((1 + النسبة الشهرية) مرفوعاً لعدد الأشهر ناقصاً واحداً).

لا تحتاج لتنفيذ المعادلة يدوياً؛ فهي مطبقة داخل الحاسبة، لكن فهمها يساعدك على توقع النتائج والتحقق من أي كشف سداد تحصل عليه من المُقرِض.`,
        },
        {
          heading: 'مثال عملي',
          body: `لنأخذ مثالاً مطابقاً لقيم الحاسبة: قرض بقيمة **100,000 دينار** بسعر فائدة **5% سنوياً** ولمدة **10 سنوات**، مع دفعة مقدمة **10,000 دينار** ورسوم **500 دينار**.

بعد خصم الدفعة المقدمة يبقى 90,000 دينار تُسدد على 120 شهراً بنسبة شهرية 0.4167%. النتيجة: قسط شهري ≈ **955 ديناراً**، وإجمالي الفائدة ≈ **24,560 ديناراً**، وإجمالي المدفوعات على المدة ≈ **114,560 ديناراً**. التكلفة الكلية الفعلية بعد إضافة الدفعة المقدمة والرسوم ≈ **125,060 ديناراً**.`,
        },
        {
          heading: 'التكلفة الكلية الفعلية',
          body: `المبلغ الذي ستعيده فعلياً أكبر من مبلغ القرض، حتى وإن بدا القسط الشهري مناسباً. التكلفة الكلية الفعلية هي مجموع الأقساط المدفوعة على كامل المدة، مضافاً إليها الدفعة المقدمة والرسوم. في المثال السابق، تُسدَّد أقساط قدرها نحو 114,560 ديناراً، ثم تُضاف الدفعة المقدمة 10,000 دينار والرسوم 500 دينار، لتصل التكلفة الفعلية إلى نحو 125,060 ديناراً.

عند مقارنة عروض القروض، قارن هذه التكلفة الكلية وليس القسط الشهري وحده؛ فقرض بقسط أقل قد يكون أغلى بسبب المدة الأطول أو الرسوم الأعلى.`,
        },
        {
          heading: 'افتراضات الحساب',
          body: `تستند النتيجة إلى افتراضات يجب أن تكون على دراية بها: سعر الفائدة **ثابت** طوال مدة القرض، والأقساط تُسدد شهرياً وبانتظام دون دفعات إضافية أو تأخير، والدفعة المقدمة والرسوم تُضاف إلى التكلفة الكلية. لا يُحتسب التأمين أو الرسوم المتأخرة أو رسوم السداد المبكر ما لم تُدرج ضمن الرسوم.

النتائج تقديرية، ولا تشمل فروقات أسعار الصرف أو اللوائح المحلية. لقراءة كاملة لهذه الافتراضات، راجع صفحة منهجية الحساب.`,
        },
        {
          heading: 'متى تكون النتيجة تقريبية؟',
          body: `تفترض هذه الطريقة سعر فائدة ثابتاً. إذا كان عقدك بسعر فائدة متغير، فستتغير الأقساط خلال المدة ولن تمثل الحاسبة إلا تقديراً بسعر محدد. كما تختلف القواعد والرسوم بين البلدان والمُقرِضين، بما فيها رسوم الترتيب والإعفاء والسداد المبكر.

استخدم النتيجة كمقدّرة للتخطيط، وقارنها دائماً بالعرض الرسمي للمُقرِض. تحقق من شروط العقد، وعند الشك في الالتزامات القانونية أو الضريبية استشر مستشاراً مالياً أو جهة رسمية مختصة.`,
        },
      ],
      keyTakeaways: [
        'المبلغ المقترض الفعلي هو مبلغ القرض بعد خصم الدفعة المقدمة.',
        'القسط الشهري يتحدد بالمبلغ والمدة وسعر الفائدة معاً.',
        'قارن التكلفة الكلية الفعلية وليس القسط الشهري وحده.',
        'النتائج تقديرية تفترض فائدة ثابتة وسداداً منتظماً.',
        'تحقق من شروط العقد لدى المُقرِض قبل التوقيع.',
      ],
      faqs: [
        {
          q: 'هل تنطبق الطريقة على القروض بدون فائدة؟',
          a: 'نعم، أدخل صفراً في سعر الفائدة، فتُحسب الأقساط بقسمة المبلغ المتبقي بالتساوي على عدد الأشهر دون أي فائدة.',
        },
        {
          q: 'ماذا لو كان سعر الفائدة متغيراً؟',
          a: 'تفترض الحسابات سعراً ثابتاً. في القروض ذات الفائدة المتغيرة استخدم سعراً تقديرياً واعلم أن الأقساط قد تتغير خلال المدة.',
        },
        {
          q: 'ما الفرق بين إجمالي الفائدة والتكلفة الكلية الفعلية؟',
          a: 'إجمالي الفائدة هو ما تدفعه فوق المبلغ المقترض على شكل فائدة فقط. التكلفة الكلية الفعلية تشمل الأقساط كلها مضافاً إليها الدفعة المقدمة والرسوم.',
        },
      ],
      relatedCalculators: ['loan-payment', 'compound-interest', 'discount-percentage'],
      lastReviewed: '2026-08-09',
    },
    en: {
      slug: 'how-to-calculate-loan-payment',
      locale: 'en',
      title: 'How to calculate a loan monthly payment',
      metaDescription:
        'Learn how to calculate a loan’s monthly payment, total interest and full cost step by step, with a worked example and clear assumptions.',
      intro:
        'Before you borrow, it pays to know what your monthly payment will be and what the loan really costs. This guide explains how monthly payments work for fixed-rate loans, and why the amount you borrow is not the same as the total you end up paying. The worked example mirrors the values used by Klar’s loan payment calculator, so you can compare results directly.',
      sections: [
        {
          heading: 'What you need',
          body: `To estimate a monthly payment you need four pieces of information: the **loan amount**, the **annual interest rate** as a percentage, the **loan term** in years or months, and the **down payment** if any — the amount you pay upfront and deduct from the loan. You may also want to include any **fees** charged by the lender so they appear in the total cost.

Enter the annual rate as it is, without dividing it by 12; the calculator converts it to a monthly rate for you. For a zero-interest loan, enter 0 and the payment is simply the outstanding balance divided equally across the months.`,
        },
        {
          heading: 'The amount you actually borrow',
          body: `Interest is charged on what is left after your down payment, not on the advertised loan amount. If the loan is 100,000 dinars and you pay 10,000 dinars upfront, the amount you actually borrow is 90,000 dinars, and both interest and payments are based on that figure.

Forgetting the down payment is one of the most common mistakes: it makes the monthly payment look larger than it should be, or leads you to compare offers on the wrong basis. Always consider what you can put down and whether a larger down payment suits your situation.`,
        },
        {
          heading: 'The fixed-payment formula',
          body: `Fixed-rate loans are repaid using the annuity formula. First convert the annual rate to a monthly rate by dividing by 12, and convert the term to months. Then the monthly payment equals the outstanding balance times the monthly rate times (1 + monthly rate) raised to the number of months, divided by ((1 + monthly rate) raised to the number of months minus one).

You do not need to run the formula by hand — it is built into the calculator — but understanding it helps you anticipate results and check any repayment statement your lender gives you.`,
        },
        {
          heading: 'A worked example',
          body: `Using the same values as the calculator: a **100,000 dinar** loan at **5% per year** for **10 years**, with a **10,000 dinar** down payment and **500 dinars** in fees.

After the down payment, 90,000 dinars are repaid over 120 months at a monthly rate of 0.4167%. The result: a monthly payment of about **955 dinars**, total interest of about **24,560 dinars**, and total payments of about **114,560 dinars**. Adding the down payment and fees gives an effective total cost of about **125,060 dinars**.`,
        },
        {
          heading: 'The real total cost',
          body: `The amount you actually pay back is higher than the loan amount, even when the monthly payment looks affordable. The effective total cost is the sum of all payments over the term, plus the down payment and fees. In the example above, you repay about 114,560 dinars in installments, then add the 10,000 dinar down payment and 500 dinars in fees, for a total cost of about 125,060 dinars.

When comparing offers, compare this total cost rather than the monthly payment alone; a loan with a lower payment can be more expensive overall because of a longer term or higher fees.`,
        },
        {
          heading: 'Assumptions',
          body: `The result rests on assumptions worth knowing: the interest rate is **fixed** for the whole term, payments are made monthly and on time with no extra or missed payments, and the down payment and fees are included in the total cost. Insurance, late fees and early-repayment charges are not counted unless entered as fees.

Results are estimates and do not account for exchange-rate changes or local regulations. The methodology page lists these assumptions in full.`,
        },
        {
          heading: 'When the estimate falls short',
          body: `This method assumes a fixed rate. If your contract uses a variable rate, payments will change over time and the calculator can only give an estimate at one rate. Rules and charges also differ between countries and lenders, including arrangement, release and early-repayment fees.

Treat the result as a planning estimate and always compare it with the lender’s official offer. Check your contract terms, and when legal or tax obligations are unclear, consult a licensed professional or the relevant official authority.`,
        },
      ],
      keyTakeaways: [
        'The amount you borrow is the loan value minus the down payment.',
        'The monthly payment depends on amount, term and rate together.',
        'Compare the effective total cost, not the monthly payment alone.',
        'Results assume a fixed rate and regular monthly payments.',
        'Always check the contract with your lender before signing.',
      ],
      faqs: [
        {
          q: 'Does this work for zero-interest loans?',
          a: 'Yes. Enter 0 for the interest rate and the payment is calculated by dividing the outstanding balance equally across the months.',
        },
        {
          q: 'What if my rate is variable?',
          a: 'The calculations assume a fixed rate. For a variable-rate loan, use an estimated rate and expect payments to change over the term.',
        },
        {
          q: 'What is the difference between total interest and effective total cost?',
          a: 'Total interest is only what you pay above the borrowed amount as interest. The effective total cost includes all payments plus the down payment and fees.',
        },
      ],
      relatedCalculators: ['loan-payment', 'compound-interest', 'discount-percentage'],
      lastReviewed: '2026-08-09',
    },
  },

  'compound-interest-explained': {
    ar: {
      slug: 'compound-interest-explained',
      locale: 'ar',
      title: 'ما هي الفائدة المركبة وكيف تعمل؟',
      metaDescription:
        'شرح مبسط للفائدة المركبة وكيف تنمو مدخراتك واستثماراتك بمرور الوقت، مع مثال عددي من حاسبة الفائدة المركبة والفرق عن الفائدة البسيطة.',
      intro:
        'الفائدة المركبة هي الفائدة التي تُحسب على المبلغ الأصلي وعلى الفائدة المتراكمة نفسها، فتكون فائدة على فائدة. هذه الآلية تجعل المدخرات تنمو بشكل أسرع مع مرور الوقت، وكلما طالت المدة زاد أثرها. يشرح هذا الدليل كيف تعمل الفائدة المركبة، وكيف تُحسب باستخدام حاسبة الفائدة المركبة في كلار.',
      sections: [
        {
          heading: 'الفائدة البسيطة مقابل الفائدة المركبة',
          body: `في الفائدة البسيطة تُحسب الفائدة على المبلغ الأصلي فقط، فمبلغ 5,000 بعائد 7% سنوياً يعطي 350 سنوياً كل سنة دون تغير. أما في الفائدة المركبة، فتُضاف الفائدة إلى الرصيد في كل فترة، ثم تُحسب الفائدة التالية على الرصيد الجديد الذي يشملها، فينمو الرصيد بنسبة مركبة وليس بنسبة ثابتة من المبلغ الأصلي.

الفرق قد يبدو صغيراً في السنة الأولى، لكنه يتسع مع الوقت؛ فالفائدة المركبة تُكافئ الصبر والمدى الطويل، بينما الفائدة البسيطة لا تتغير مهما طالت المدة.`,
        },
        {
          heading: 'مكونات الحساب',
          body: `أربعة عناصر تحدد نمو استثمارك: **المبلغ الأولي** الذي تبدأ به، و**المساهمة الدورية** التي تضيفها بانتظام (شهرياً أو ربع سنوي أو سنوياً)، و**العائد السنوي** بالنسبة المئوية، و**تكرار المضاعفة** (شهرياً أو ربع سنوي أو نصف سنوي أو سنوياً).

كلما زاد تكرار المضاعفة زاد النمو قليلاً لنفس العائد، وكلما طالت المدة زاد أثر التركيب بشكل كبير. هذه المتغيرات هي نفسها حقول حاسبة الفائدة المركبة، ويمكنك تعديلها لترى أثر كل عنصر.`,
        },
        {
          heading: 'كيف يُحسب الرصيد',
          body: `يُحسب الرصيد في نهاية كل فترة بضرب الرصيد السابق في (1 + معدل الفترة) ثم إضافة المساهمة الدورية إن وجدت. معدل الفترة هو العائد السنوي مقسوماً على عدد مرات المضاعفة في السنة، فمع عائد 7% ومضاعفة شهرية يكون معدل الفترة 7 ÷ 12 ≈ 0.583% شهرياً.

تكرار الحساب على كل فترة حتى نهاية المدة يُنتج الرصيد النهائي وإجمالي المساهمات والعائد الناتج عن الفائدة. لا تحتاج لحساب ذلك يدوياً، لكن فهم الآلية يوضح سبب نمو الرصيد أسرع من مجموع ما أودعته.`,
        },
        {
          heading: 'مثال عملي',
          body: `مثال مطابق لقيم الحاسبة: مبلغ أولي **5,000 دولار** مع مساهمة **200 دولار شهرياً**، بعائد سنوي **7%** تُضاعف شهرياً لمدة **20 سنة**.

إجمالي ما أودعته على المدة هو 5,000 + (200 × 240) = **53,000 دولار**. لكن الرصيد النهائي يصل إلى نحو **124,400 دولار**، أي أن الفائدة المركبة ساهمت بحوالي **71,400 دولار** — أكثر من قيمة المبلغ الأصلي والمساهمات معاً. هذا هو أثر التركيب على المدى الطويل.`,
        },
        {
          heading: 'أثر المدة وتكرار المضاعفة',
          body: `المدة هي أقوى عامل في الفائدة المركبة، لأن الفائدة المتراكمة نفسها تبدأ في توليد فائدة جديدة. لذلك يبدأ الاستثمار المبكر المنخفض غالباً في التفوق على الاستثمار المتأخر الأعلى إذا طالت مدة الأول. كما أن زيادة تكرار المضاعفة — من سنوي إلى شهري — تحسّن النتيجة قليلاً لنفس العائد.

جرّب تعديل هذه المدخلات في الحاسبة لترى الفرق بنفسك: قارن النتيجة بعد 10 سنوات بالنتيجة بعد 20، ولاحظ كيف يتسع الفارق كلما طالت المدة.`,
        },
        {
          heading: 'افتراضات وحدود',
          body: `تفترض الحاسبة عائداً سنوياً **ثابتاً** طوال المدة، والمساهمات تُودع في نهاية كل فترة. لا تُؤخذ الضرائب أو الرسوم أو التضخم أو تقلبات السوق في الاعتبار، وكل هذه العوامل تؤثر على النتيجة الحقيقية.

العوائد الحقيقية غير مضمونة وتختلف باختلاف نوع الاستثمار وظروف السوق، والعوائد السابقة لا تنبئ بالمستقبل. تعامل مع النتيجة كتقدير للتخطيط، واستشر مستشاراً مالياً مرخصاً قبل اتخاذ قرارات استثمارية.`,
        },
        {
          heading: 'كيف تستخدم الفائدة المركبة لصالحك',
          body: `يمكنك الاستفادة من الفائدة المركبة بثلاث طرق: ابدأ مبكراً لأن الوقت أهم عامل، وأضف مساهمات منتظمة حتى لو صغيرة، واترك الرصيد ينمو دون سحب متكرر يعطل التركيب.

حتى المساهمات الصغيرة المنتظمة تتراكم مع الوقت بشكل مدهش. استخدم حاسبة الفائدة المركبة لتجربة سيناريوهات مختلفة، وقارن أثر المدة والمساهمة والعائد على النتيجة النهائية قبل اتخاذ أي قرار. كلما فهمت أثر التركيب بشكل أعمق، تمكنت من اتخاذ قرارات أدق حول وقت البدء ومقدار الادخار.`,
        },
      ],
      keyTakeaways: [
        'الفائدة المركبة هي فائدة تُحسب على المبلغ الأصلي وعلى الفائدة المتراكمة معاً.',
        'المدة هي العامل الأقوى في نمو الرصيد المركب.',
        'المساهمات المنتظمة الصغيرة تتراكم بشكل كبير على المدى الطويل.',
        'تفترض الحاسبة عائداً ثابتاً ولا تأخذ الضرائب أو التضخم في الاعتبار.',
        'العوائد غير مضمونة؛ النتائج تقديرية لأغراض التخطيط.',
      ],
      faqs: [
        {
          q: 'ما الفرق بين الفائدة البسيطة والمركبة؟',
          a: 'الفائدة البسيطة تُحسب على المبلغ الأصلي فقط، بينما المركبة تُحسب على المبلغ الأصلي مضافاً إليه الفائدة المتراكمة، فينمو الرصيد بشكل متسارع.',
        },
        {
          q: 'هل زيادة تكرار المضاعفة مهمة؟',
          a: 'نعم، لكن أثرها أصغر من أثر المدة. لنفس العائد، المضاعفة الشهرية تعطي نمواً أعلى قليلاً من المضاعفة السنوية.',
        },
        {
          q: 'هل النتيجة ضمان للعائد؟',
          a: 'لا، الحاسبة تفترض عائداً ثابتاً كقيمة تقديرية. العوائد الحقيقية غير مضمونة وتختلف باختلاف الاستثمار والسوق.',
        },
      ],
      relatedCalculators: ['compound-interest', 'savings-goal', 'loan-payment'],
      lastReviewed: '2026-08-09',
    },
    en: {
      slug: 'compound-interest-explained',
      locale: 'en',
      title: 'What is compound interest and how does it work?',
      metaDescription:
        'A simple explanation of compound interest and how your savings and investments grow over time, with a worked example from the calculator.',
      intro:
        'Compound interest is interest calculated on your original amount and on the interest that has already built up — interest on interest. This mechanism makes savings grow faster over time, and the longer the horizon, the greater its effect. This guide explains how compound interest works and how Klar’s compound interest calculator models it.',
      sections: [
        {
          heading: 'Simple vs compound interest',
          body: `With **simple interest**, the return is calculated on the original amount only: 5,000 at 7% per year earns 350 each year, unchanged for every year of the term. With **compound interest**, each period’s return is added to the balance, and the next period’s return is calculated on the larger balance, so the balance grows at a compounding rate rather than a flat one.

The difference can look small in the first year but widens steadily with time. Compounding rewards patience and long horizons, while simple interest stays the same no matter how long the money is invested.`,
        },
        {
          heading: 'The components',
          body: `Four inputs determine how your investment grows: the **initial amount** you start with, the **periodic contribution** you add regularly (monthly, quarterly or annually), the **annual return** as a percentage, and the **compounding frequency** (monthly, quarterly, semi-annually or annually).

For the same return, more frequent compounding adds a little more growth, and longer time horizons magnify the effect dramatically. These are exactly the fields in the compound interest calculator, and you can adjust each one to see its impact.`,
        },
        {
          heading: 'How the balance is calculated',
          body: `At the end of each period, the new balance equals the previous balance times (1 + period rate), plus any contribution. The period rate is the annual return divided by the compounding frequency; at 7% compounded monthly, the period rate is 7 ÷ 12, about 0.583% per month.

The same step is repeated for every period until the end of the term, producing a final balance, the total contributed, and the interest earned. You do not need to do this by hand, but the mechanism explains why the balance grows faster than what you actually deposited.`,
        },
        {
          heading: 'A worked example',
          body: `Mirroring the calculator’s example: an initial **5,000 dollars** with a **200 dollar** monthly contribution, a **7%** annual return compounded monthly over **20 years**.

Over the term you deposit 5,000 + (200 × 240) = **53,000 dollars**. Yet the final balance reaches about **124,400 dollars** — meaning compounding contributed roughly **71,400 dollars**, more than your initial amount and contributions combined. That is the power of compounding over a long horizon.`,
        },
        {
          heading: 'The effect of time and frequency',
          body: `Time is the strongest driver of compounding, because the interest you have already earned starts earning interest itself. That is why an early but modest investment often beats a later, larger one when the first runs for longer. Increasing the compounding frequency, say from annually to monthly, also improves the result for the same return.

Experiment with the calculator to see this yourself: compare the outcome after 10 years with the outcome after 20, and watch the gap widen as the horizon extends.`,
        },
        {
          heading: 'Assumptions and limits',
          body: `The calculator assumes a **constant** annual return for the whole term, with contributions added at the end of each period. Taxes, fees, inflation and market volatility are not included, and all of these affect the real-world result.

Real returns are never guaranteed and vary with the type of investment and market conditions; past performance does not predict future results. Treat the output as a planning estimate and consult a licensed financial professional before making investment decisions.`,
        },
        {
          heading: 'Making compounding work for you',
          body: `You can use compound interest in your favour in three ways: start early, because time matters most; add regular contributions, even small ones; and avoid frequent withdrawals that interrupt the compounding process.

Small, regular deposits accumulate surprisingly well over the years. Use the compound interest calculator to test different scenarios and compare how the horizon, contribution and return change the final result before you decide.`,
        },
      ],
      keyTakeaways: [
        'Compound interest is interest earned on both your principal and previously earned interest.',
        'Time is the most powerful factor in compounding.',
        'Small regular contributions add up significantly over the long run.',
        'The calculator assumes a fixed return and ignores taxes and inflation.',
        'Returns are not guaranteed; results are estimates for planning.',
      ],
      faqs: [
        {
          q: 'What is the difference between simple and compound interest?',
          a: 'Simple interest is calculated only on the original amount. Compound interest is calculated on the principal plus accumulated interest, so the balance grows faster over time.',
        },
        {
          q: 'Does compounding frequency matter?',
          a: 'Yes, but far less than the time horizon. For the same return, monthly compounding gives slightly more growth than annual compounding.',
        },
        {
          q: 'Is the result a guarantee?',
          a: 'No. The calculator assumes a fixed return as an estimate. Real returns are not guaranteed and depend on the investment and market conditions.',
        },
      ],
      relatedCalculators: ['compound-interest', 'savings-goal', 'loan-payment'],
      lastReviewed: '2026-08-09',
    },
  },

  'how-to-set-a-savings-goal': {
    ar: {
      slug: 'how-to-set-a-savings-goal',
      locale: 'ar',
      title: 'كيف تحدد هدفاً ادخارياً وتحققه',
      metaDescription:
        'تعلّم كيف تحدد هدفاً ادخارياً واقعياً وتحسب المبلغ الذي تحتاج ادخاره شهرياً لتحقيقه، مع مثال عملي من حاسبة هدف الادخار ونصائح لضبط الهدف.',
      intro:
        'الادخار الناجح يبدأ بهدف واضح: مبلغ محدد تريد الوصول إليه خلال مدة معينة. بمجرد تحديد الهدف، يصبح السؤال الحقيقي: كم أحتاج أن أدخر كل شهر للوصول إليه؟ يشرح هذا الدليل خطوات تحديد الهدف وحساب الادخار الشهري المطلوب، باستخدام نفس قيم حاسبة هدف الادخار.',
      sections: [
        {
          heading: 'حدد هدفاً واضحاً',
          body: `الهدف الغامض مثل أريد أن أدخر يصعب التخطيط له، بينما الهدف المحدد مثل أريد 120,000 دينار خلال 10 سنوات يمكن تحويله إلى خطة عملية. اكتب المبلغ والغرض والمدة، وضع في اعتبارك أن الهدف يجب أن يكون واقعياً مقارنة بدخلك ونفقاتك الحالية.

قسّم الهدف الكبير إلى مراحل أصغر إذا لزم الأمر، مثل هدف سنوي أو ربع سنوي، فهذا يسهّل تتبع التقدم ويبقيك مندفعاً دون أن تشعر بأن الهدف بعيد المنال.`,
        },
        {
          heading: 'المعلومات التي تحتاجها',
          body: `لحساب الادخار الشهري المطلوب تحتاج: **الهدف** وهو المبلغ النهائي المطلوب، و**المدخرات الحالية** التي تملكها الآن وتخصصها لهذا الهدف، و**العائد السنوي المتوقع** على مدخراتك بالنسبة المئوية، و**المدة** بالسنوات، وتكرار الادخار شهرياً أو ربع سنوي أو سنوياً.

العائد المتوقع هنا قيمة تقديرية تدخلها بنفسك، وليست ضماناً. استخدم نسبة متحفظة تعكس نوع الادخار أو الاستثمار الذي تفكر فيه. يمكنك تغيير هذه المدخلات في أي وقت لرؤية أثرها على النتيجة.`,
        },
        {
          heading: 'كيف يُحسب المبلغ الشهري',
          body: `يحسب الدليل الفجوة بين هدفك ومدخراتك الحالية، ثم يوزعها على الفترات المتبقية، مع مراعاة العائد السنوي. إذا كان العائد صفراً، فالمسألة بسيطة: اقسم الفجوة على عدد الفترات. أما مع عائد إيجابي، فالادخار المطلوب أقل، لأن المبالغ المودعة تنمو بالفائدة المركبة عبر المدة.

باختصار، كلما ارتفع العائد المتوقع أو طالت المدة، انخفض المبلغ الذي تحتاج ادخاره شهرياً — والعكس صحيح. جرّب تعديل المدة والعائد في الحاسبة لترى كيف تتغير النتيجة مباشرة.`,
        },
        {
          heading: 'مثال عملي',
          body: `مثال مطابق لقيم الحاسبة: هدف **120,000 دينار** خلال **10 سنوات**، مع مدخرات حالية **10,000 دينار** وعائد سنوي متوقع **5%**.

النتيجة: تحتاج ادخار نحو **667 ديناراً شهرياً**. مجموع ما ستدخره من جيبك على المدة يقارب 90,000 دينار بعد خصم مدخراتك الحالية، بينما يسهم العائد المتوقع بحوالي **30,000 دينار** في إكمال الهدف. لاحظ كيف يقلل العائد من العبء الشهري عليك. وإذا عدّلت أي مدخل فستتغير النتيجة تلقائياً في الحاسبة.`,
        },
        {
          heading: 'اجعل الهدف قابلاً للتحقيق',
          body: `بعد حساب الرقم الشهري، اسأل نفسك إن كان يتناسب مع ميزانيتك. إذا كان المبلغ كبيراً جداً، لديك خيارات: زيادة المدة، أو خفض الهدف، أو رفع المدخرات الحالية، أو البحث عن عائد متوقع أعلى مع قبول مخاطرة أعلى.

الأهم هو الاتساق: مبلغ شهري أصغر تلتزم به بانتظام أفضل من مبلغ كبير تتركه بعد شهرين. أدخل السيناريو المعدل في الحاسبة لترى أثر كل تغيير.`,
        },
        {
          heading: 'تتبع التقدم وراجع خطتك',
          body: `لا يكفي وضع الخطة؛ تحتاج مراجعة دورية. راجع رصيدك كل بضعة أشهر وقارنه بالمسار المتوقع، وعدّل الادخار إذا تغير دخلك أو نفقاتك أو العائد الفعلي. التأخر عن الخطة مبكراً أسهل إصلاحاً من اكتشافه في نهاية المدة.

ضع في اعتبارك أيضاً التضخم، فقيمة 120,000 دينار بعد 10 سنوات قد تكون أقل شراءً مما هي عليه اليوم. أعد تقييم هدفك بعملة اليوم المكافئ عند الاقتضاء.`,
        },
        {
          heading: 'متى تكون النتيجة تقديرية؟',
          body: `تفترض الحاسبة عائداً ثابتاً طوال المدة وإيداعاً في نهاية كل فترة، ولا تأخذ الضرائب أو الرسوم أو التضخم في الاعتبار. أي انحراف في العائد الفعلي عن المتوقع سيغير المبلغ النهائي المحقق.

عالج النتيجة كتقدير للتخطيط لا كضمان. إذا كان هدفك استثمارياً، فاستشر مستشاراً مالياً مرخصاً، وتأكد دائماً من فهم المخاطر قبل الالتزام بخطة. فلا تعتمد عليها كقيمة مضمونة عند اتخاذ قرارات كبيرة.`,
        },
      ],
      keyTakeaways: [
        'الهدف الواضح بالمبلغ والمدة هو أساس خطة الادخار الناجحة.',
        'المبلغ الشهري المطلوب هو الفجوة بين الهدف والمدخرات الحالية موزعة على المدة، مع مراعاة العائد.',
        'العائد المتوقع الأعلى والمدة الأطول يقللان الادخار الشهري المطلوب.',
        'الاتساق في الادخار أهم من حجم المبلغ.',
        'النتائج تقديرية ولا تضمن عوائد محددة.',
      ],
      faqs: [
        {
          q: 'ماذا لو كان المبلغ الشهري أكبر من طاقتي؟',
          a: 'عدّل أحد المتغيرات: زد المدة، أو خفض الهدف، أو ارفع مدخراتك الحالية. جرّب السيناريوهات في الحاسبة واختر ما يمكنك الالتزام به.',
        },
        {
          q: 'هل يجب أن أفترض عائداً عند الحساب؟',
          a: 'يمكنك إدخال صفر إذا لم تتوقع أي عائد، وستوزع الحاسبة الفجوة بالتساوي. لكن إن كنت ستحتفظ بالمال في أداة بعائد متوقع، فإدخال نسبة متحفظة يعطي صورة أدق.',
        },
        {
          q: 'هل العائد المتوقع مضمون؟',
          a: 'لا، هو قيمة تقديرية تدخلها بنفسك. العوائد الحقيقية غير مضمونة، والنتيجة النهائية قد تختلف عن الهدف.',
        },
      ],
      relatedCalculators: ['savings-goal', 'compound-interest', 'loan-payment'],
      lastReviewed: '2026-08-09',
    },
    en: {
      slug: 'how-to-set-a-savings-goal',
      locale: 'en',
      title: 'How to set and reach a savings goal',
      metaDescription:
        'Learn how to set a realistic savings goal and work out the monthly amount you need to save to reach it, with a worked example, and how to track progress.',
      intro:
        'Successful saving starts with a clear goal: a specific amount you want to reach within a chosen timeframe. Once the goal is set, the real question becomes how much you need to save each month to get there. This guide walks through setting a goal and calculating the required monthly saving, using the same inputs as the savings goal calculator.',
      sections: [
        {
          heading: 'Set a specific goal',
          body: `A vague goal such as I want to save more is hard to plan for, while a specific one such as I want 120,000 dinars in 10 years can become a practical plan. Write down the amount, the purpose and the timeframe, and make sure the goal is realistic relative to your income and expenses.

If the target feels large, break it into smaller stages such as yearly or quarterly goals. Smaller milestones make progress easier to track and keep you motivated over a long horizon.`,
        },
        {
          heading: 'What you need',
          body: `To find the required monthly saving you need the **target** amount, your **current savings** already set aside for this goal, the **expected annual return** on those savings as a percentage, the **timeframe** in years, and how often you plan to save — monthly, quarterly or annually.

The return is an estimate you enter yourself, not a promise. Use a conservative figure that reflects the kind of savings or investment you are considering.`,
        },
        {
          heading: 'How the monthly amount is calculated',
          body: `The calculation starts from the gap between your target and your current savings, then spreads that gap across the remaining periods, allowing for the annual return. At zero return this is simple division. With a positive return, the required saving is lower, because each deposit earns compound interest over the term.

In short, a higher expected return or a longer timeframe reduces the amount you need to save each month — and the reverse is also true.`,
        },
        {
          heading: 'A worked example',
          body: `Mirroring the calculator’s example: a target of **120,000 dinars** over **10 years**, with **10,000 dinars** already saved and an expected annual return of **5%**.

The result: you need to save about **667 dinars per month**. Over the term you contribute roughly 90,000 dinars from your own pocket after your current savings, while the expected return contributes about **30,000 dinars** to complete the goal. Notice how the return lightens the monthly burden.`,
        },
        {
          heading: 'Make the goal achievable',
          body: `Once you have the monthly figure, ask whether it fits your budget. If it is too large, you have options: extend the timeframe, lower the target, increase your starting savings, or seek a higher expected return with higher risk.

Consistency matters most: a smaller monthly amount you keep paying regularly beats a large one you abandon after two months. Adjust the scenario in the calculator to see the effect of each change.`,
        },
        {
          heading: 'Track progress and review',
          body: `A plan is only the beginning; it needs regular review. Check your balance every few months against the expected path, and adjust your saving if your income, expenses or actual returns change. Falling behind early is easier to fix than discovering it at the end of the term.

Also keep inflation in mind: 120,000 dinars in 10 years may buy less than the same amount today. Reassess the target in today’s money where relevant.`,
        },
        {
          heading: 'When the estimate falls short',
          body: `The calculator assumes a fixed return over the whole term, with deposits at the end of each period, and ignores taxes, fees and inflation. Any deviation from the assumed return changes the final balance.

Treat the output as a planning estimate, not a guarantee. If your goal involves investing, consult a licensed financial professional and make sure you understand the risks before committing to a plan.`,
        },
      ],
      keyTakeaways: [
        'A clear goal with an amount and a timeframe is the foundation of successful saving.',
        'The monthly saving equals the gap between target and current savings spread over time, allowing for returns.',
        'A higher expected return or longer timeframe lowers the monthly amount needed.',
        'Consistency matters more than the size of each deposit.',
        'Results are estimates and never guarantee specific returns.',
      ],
      faqs: [
        {
          q: 'What if the monthly amount is more than I can afford?',
          a: 'Adjust one of the inputs: extend the timeframe, lower the target, or increase your starting savings. Test scenarios in the calculator and choose one you can sustain.',
        },
        {
          q: 'Should I assume a return?',
          a: 'You can enter zero and the calculator will spread the gap evenly. If your money will earn a return, a conservative estimate gives a more accurate picture.',
        },
        {
          q: 'Is the expected return guaranteed?',
          a: 'No, it is an estimate you enter yourself. Real returns are not guaranteed and the final balance may differ from the target.',
        },
      ],
      relatedCalculators: ['savings-goal', 'compound-interest', 'loan-payment'],
      lastReviewed: '2026-08-09',
    },
  },

  'how-to-calculate-vat': {
    ar: {
      slug: 'how-to-calculate-vat',
      locale: 'ar',
      title: 'كيف تحسب الضريبة المضافة',
      metaDescription:
        'شرح بسيط لكيفية إضافة وإزالة واستخراج الضريبة المضافة من أي مبلغ، مع أمثلة رقمية واضحة وملاحظات حول النسب المعمول بها ومتى تستشير المختصين.',
      intro:
        'الضريبة المضافة تُفرض على السلع والخدمات، وتُضاف إلى السعر الذي يدفعه المشتري. توجد ثلاث حالات شائعة تحتاج فيها إلى حسابها: إضافتها إلى سعر صافٍ، أو إزالتها من سعر إجمالي، أو استخراج قيمتها من مبلغ شامل. يشرح هذا الدليل الحالات الثلاث باستخدام نفس قيم حاسبة الضريبة المضافة.',
      sections: [
        {
          heading: 'مصطلحات أساسية',
          body: `ثلاثة مصطلحات تحتاج فهمها: **الصافي** وهو سعر السلعة أو الخدمة قبل الضريبة، **الضريبة** وهي المبلغ المضاف وفق النسبة المعمول بها، و**الإجمالي** وهو الصافي زائد الضريبة، أي ما يدفعه المشتري فعلياً.

العلاقة بينها بسيطة: الإجمالي = الصافي × (1 + نسبة الضريبة ÷ 100). هذه العلاقة الواحدة تكفي لحل الحالات الثلاث، إذا عرفت أي المبلغين أمامك: صافٍ أم إجمالي. بهذه المعادلة يمكنك التحقق من أي نتيجة تحصل عليها من الحاسبة.`,
        },
        {
          heading: 'النسبة المعمول بها',
          body: `نسبة الضريبة المضافة تختلف بين البلدان، وقد تختلف أيضاً بين سلعة وأخرى داخل البلد نفسه، مع نسب مخفضة لبعض السلع الأساسية وإعفاءات من أخرى. لذلك تستخدم حاسبة كلار نسبة **مخصصة** تدخلها بنفسك.

لا تفترض نسبة معينة دون تحقق؛ تحقق من النسبة السارية في بلدك ومن السلع المشمولة من الجهات الرسمية المختصة بالضرائب، وتأكد أنها حديثة قبل استخدامها في حساباتك. وحتى مع النسب الشائعة فقد تتغير القواعد، فالمصدر الرسمي هو الفيصل.`,
        },
        {
          heading: 'إضافة الضريبة إلى سعر صافٍ',
          body: `هذه الحالة الأكثر شيوعاً عند تحديد سعر البيع: لديك سعر صافٍ وتريد معرفة كم يصبح بعد إضافة الضريبة. اضرب الصافي في (1 + نسبة الضريبة ÷ 100) لتحصل على الإجمالي، واطرح الصافي لتحصل على قيمة الضريبة.

مثال بقيم الحاسبة: سعر صافٍ **1,000 ريال** بنسبة **16%**. قيمة الضريبة = 1,000 × 16 ÷ 100 = **160 ريالاً**، والمبلغ الإجمالي = 1,000 + 160 = **1,160 ريالاً**.`,
        },
        {
          heading: 'إزالة الضريبة من سعر إجمالي',
          body: `في حالات أخرى يكون أمامك سعر إجمالي يشمل الضريبة، وتريد معرفة الصافي. اقسم الإجمالي على (1 + نسبة الضريبة ÷ 100).

مثال: مبلغ إجمالي **1,160 ريالاً** بنسبة **16%**. الصافي = 1,160 ÷ 1.16 = **1,000 ريال**. لاحظ أن إزالة الضريبة ليست مجرد طرح 16% من الإجمالي؛ لأن النسبة تُحسب على الصافي وليس على الإجمالي. هذا الفارق بين الطريقتين مصدر أخطاء شائعة في الفواتير، فاحرص على الطريقة الصحيحة.`,
        },
        {
          heading: 'استخراج قيمة الضريبة',
          body: `قد تحتاج إلى قيمة الضريبة وحدها، مثل إعداد فاتورة أو إقرار ضريبي. احسب الصافي أولاً بقسمة الإجمالي على (1 + النسبة ÷ 100)، ثم اطرحه من الإجمالي.

مثال: مبلغ **1,160 ريالاً** بنسبة **16%**: الصافي 1,000 ريال، وقيمة الضريبة = 1,160 − 1,000 = **160 ريالاً**. النتيجة نفسها التي حصلنا عليها في حالة الإضافة، وهذا يؤكد ترابط الحسابات الثلاث. استخدم هذه الطريقة عندما تحتاج مبلغ الضريبة منفصلاً عن قيمة السلعة.`,
        },
        {
          heading: 'أخطاء شائعة',
          body: `الخطأ الأكثر شيوعاً هو حساب الضريبة على المبلغ الخاطئ: عند إزالة الضريبة من مبلغ إجمالي، لا تُطرَح النسبة من الإجمالي مباشرة، بل يُقسَّم على (1 + النسبة ÷ 100). خطأ آخر هو الخلط بين الصافي والإجمالي عند إدخال المبلغ في الحاسبة.

تأكد دائماً من تحديد الحالة الصحيحة إضافة أو إزالة أو استخراج قبل إدخال الأرقام، وراجع النتيجة منطقياً: الإجمالي يجب أن يكون أكبر من الصافي دائماً.`,
        },
        {
          heading: 'متى تستشير المختصين؟',
          body: `هذه الحسابات تقديرية وتساعد في التخطيط اليومي، لكنها لا تغني عن معرفة القواعد الضريبية الرسمية في بلدك. قد تشمل هذه القواعد إعفاءات، ونسباً متعددة، ومواعيد تسجيل، والتزامات إقرار للشركات.

إذا كنت تتعامل مع ضرائب رسمية أو مبالغ كبيرة، فتحقق من الجهة الضريبية المختصة أو استشر محاسباً أو مستشاراً ضريبياً مرخصاً للتأكد من التزامك بالقواعد المطبقة. بهذه الطريقة تتجنب أخطاء الحساب اليدوي وتعرف متى تلجأ إلى المشورة المتخصصة.`,
        },
      ],
      keyTakeaways: [
        'الإجمالي = الصافي × (1 + نسبة الضريبة ÷ 100).',
        'عند إزالة الضريبة، اقسم الإجمالي على (1 + النسبة ÷ 100) ولا تطرح النسبة منه مباشرة.',
        'النسب تختلف بين البلدان وبين السلع، وتحتاج التحقق من الجهات الرسمية.',
        'حدد الحالة الصحيحة إضافة أو إزالة أو استخراج قبل إدخال المبلغ.',
        'النتائج تقديرية ولا تغني عن الالتزامات الضريبية الرسمية.',
      ],
      faqs: [
        {
          q: 'لماذا لا أطرح النسبة مباشرة من المبلغ الإجمالي؟',
          a: 'لأن نسبة الضريبة تُحسب على الصافي وليس على الإجمالي. مثال: 16% من 1,000 تساوي 160، بينما 16% من 1,160 تساوي 185.6. الطريقة الصحيحة هي قسمة الإجمالي على 1.16.',
        },
        {
          q: 'ما النسبة التي يجب أن أدخلها؟',
          a: 'استخدم النسبة السارية في بلدك حسب الحالة، وتحقق منها من الجهة الرسمية المختصة. النسب تختلف بين البلدان وبين السلع والخدمات.',
        },
        {
          q: 'هل تعمل الحاسبة مع أكثر من نسبة في نفس العملية؟',
          a: 'لا، تدعم الحاسبة نسبة واحدة ثابتة في كل عملية. إذا كان لديك بنود بنسب مختلفة فاحسب كل بند على حدة.',
        },
      ],
      relatedCalculators: ['vat', 'discount-percentage', 'savings-goal'],
      lastReviewed: '2026-08-09',
    },
    en: {
      slug: 'how-to-calculate-vat',
      locale: 'en',
      title: 'How to calculate VAT',
      metaDescription:
        'A simple guide to adding, removing and extracting VAT from any amount, with clear worked examples and notes about the rates in force.',
      intro:
        'Value-added tax (VAT) is charged on goods and services and added to the price the buyer pays. Three situations come up again and again: adding VAT to a net price, removing it from a gross price, and extracting the VAT amount from a price that already includes it. This guide covers all three using the same values as the VAT calculator.',
      sections: [
        {
          heading: 'Basic terms',
          body: `Three terms matter here: the **net** amount, the price of the good or service before tax; the **VAT**, the amount added at the prevailing rate; and the **gross** amount, net plus VAT, which is what the buyer actually pays.

The relationship is simple: gross = net × (1 + rate ÷ 100). This single relationship solves all three cases, as long as you know which figure you are starting from — net or gross.`,
        },
        {
          heading: 'The rate to use',
          body: `VAT rates differ from country to country and can vary within a country between categories of goods and services, with reduced rates and exemptions. That is why Klar’s calculator lets you enter a **custom rate** yourself.

Do not assume a rate. Check the current rate in your country and which goods and services are covered, using official tax authorities, and make sure it is up to date before using it in your calculations.`,
        },
        {
          heading: 'Adding VAT to a net price',
          body: `This is the most common case, often used when setting a selling price: you have a net price and want to know it after VAT. Multiply the net amount by (1 + rate ÷ 100) to get the gross amount, then subtract net to find the VAT.

Using the calculator’s example: a net price of **1,000 riyals** at **16%**. VAT = 1,000 × 16 ÷ 100 = **160 riyals**, and the gross amount = 1,000 + 160 = **1,160 riyals**.`,
        },
        {
          heading: 'Removing VAT from a gross price',
          body: `Sometimes you have a gross price that includes VAT and need the net figure. Divide the gross amount by (1 + rate ÷ 100).

Example: a gross amount of **1,160 riyals** at **16%**. Net = 1,160 ÷ 1.16 = **1,000 riyals**. Note that removing VAT is not simply subtracting 16% from the gross, because the rate applies to the net amount, not the gross.`,
        },
        {
          heading: 'Extracting the VAT amount',
          body: `You may need the VAT figure on its own, for example to prepare an invoice or a tax filing. First find the net amount by dividing gross by (1 + rate ÷ 100), then subtract it from the gross.

Example: a gross amount of **1,160 riyals** at **16%**: net is 1,000 riyals, so VAT = 1,160 − 1,000 = **160 riyals**. This is the same figure as in the adding case, which confirms how the three calculations fit together.`,
        },
        {
          heading: 'Common mistakes',
          body: `The most common error is applying the rate to the wrong amount: when removing VAT from a gross amount, do not subtract the rate directly — divide by (1 + rate ÷ 100). Another frequent mistake is confusing net and gross when entering the amount.

Always select the correct case add, remove or extract before entering numbers, and sanity-check the result: the gross amount must always be larger than the net amount.`,
        },
        {
          heading: 'When to consult a professional',
          body: `These calculations are estimates that help with everyday planning, but they do not replace knowing the official tax rules in your country. Those rules may include exemptions, multiple rates, registration thresholds and filing obligations for businesses.

If you are dealing with formal taxes or large amounts, verify with the relevant tax authority or consult a licensed accountant or tax adviser to make sure you comply with the applicable rules.`,
        },
      ],
      keyTakeaways: [
        'Gross = net × (1 + rate ÷ 100).',
        'To remove VAT, divide gross by (1 + rate ÷ 100) rather than subtracting the rate directly.',
        'Rates vary by country and category; verify with official authorities.',
        'Choose the right case add, remove or extract before entering an amount.',
        'Results are estimates and do not replace official tax obligations.',
      ],
      faqs: [
        {
          q: 'Why can’t I just subtract the rate from the gross amount?',
          a: 'Because the rate is applied to the net amount, not the gross. 16% of 1,000 is 160, while 16% of 1,160 is 185.6. The correct way is to divide the gross by 1.16.',
        },
        {
          q: 'Which rate should I enter?',
          a: 'Use the rate currently in force in your country and verify it with the official tax authority. Rates vary between countries and between goods and services.',
        },
        {
          q: 'Does the calculator handle multiple rates at once?',
          a: 'No, it uses a single fixed rate per calculation. If you have items at different rates, work each item separately.',
        },
      ],
      relatedCalculators: ['vat', 'discount-percentage', 'savings-goal'],
      lastReviewed: '2026-08-09',
    },
  },

  'hourly-vs-monthly-salary': {
    ar: {
      slug: 'hourly-vs-monthly-salary',
      locale: 'ar',
      title: 'الأجر بالساعة مقابل الراتب الشهري',
      metaDescription:
        'افهم العلاقة بين الراتب الشهري والأجر بالساعة وباليوم، وكيف تحول بينهما بدقة مع مثال عملي من محوّل الراتب وافتراضات واضحة، لتحصل على صورة كاملة.',
      intro:
        'عند تقييم عرض عمل أو مقارنة وظيفة بدوام كامل بعمل جزئي أو بعمل حر، قد تجد نفسك تقارن راتباً شهرياً بأجر بالساعة. التحويل بين الاثنين يحتاج تحديد عدد ساعات العمل وأيامه بوضوح، لأن الراتب الشهري وحده لا يخبرك بقيمة ساعتك. يشرح هذا الدليل العلاقة بين الأجر بالساعة واليوم والشهر والسنة.',
      sections: [
        {
          heading: 'لماذا تحتاج التحويل؟',
          body: `الراتب الشهري يوحد المقارنة بين العروض الشهرية، لكنه يخفي قيمة الساعة الفعلية. وظيفتان براتب شهري متساوٍ قد تختلفان اختلافاً كبيراً إذا كانت إحداهما 40 ساعة أسبوعياً والأخرى 50. معرفة الأجر بالساعة تساعدك على المقارنة بين عروض الدوام الكامل والجزئي، وبين الوظيفة والعمل الحر.

كما يستخدم الأجر بالساعة أساساً لحساب العمل الإضافي والتقديرات عند تسعير خدماتك، لذلك من المفيد معرفته بدقة.`,
        },
        {
          heading: 'المدخلات المطلوبة',
          body: `للتحويل بدقة تحتاج: **المبلغ** و**الوحدة** التي أدخلته بها ساعة أو يوم أو أسبوع أو شهر أو سنة، و**عدد أيام العمل في الأسبوع**، و**عدد ساعات العمل في اليوم**، و**عدد الأسابيع المدفوعة في السنة**، وأي **أيام عمل غير مدفوعة** تخصم.

تؤثر هذه الافتراضات على النتيجة: تغيير ساعات اليوم من 8 إلى 7 يرفع الأجر بالساعة، وتغيير الأسابيع المدفوعة يغير الراتب السنوي. كلما دخلت قيماً مطابقة لوضعك الفعلي كانت النتيجة أدق.`,
        },
        {
          heading: 'معادلة التحويل',
          body: `يبدأ التحويل بحساب الراتب السنوي، ثم يُشتق منه بقية الوحدات. الراتب السنوي = المبلغ الشهري × 12، أو الأسبوعي × الأسابيع المدفوعة، أو اليومي × أيام العمل السنوية، وهكذا. ثم: الأجر بالساعة = الراتب السنوي ÷ (أيام العمل السنوية × ساعات اليوم).

عدد أيام العمل السنوية = أيام العمل في الأسبوع × الأسابيع المدفوعة. أيام العمل غير المدفوعة تُخصم من الراتب السنوي قبل توزيعه على الوحدات.`,
        },
        {
          heading: 'مثال عملي',
          body: `مثال مطابق لقيم الحاسبة: راتب شهري **1,200 دينار**، و5 أيام عمل في الأسبوع × 8 ساعات، و52 أسبوعاً مدفوعاً.

الراتب السنوي = 1,200 × 12 = **14,400 دينار**. أيام العمل السنوية = 5 × 52 = 260 يوماً. الأجر اليومي ≈ **55.38 ديناراً**، والأجر بالساعة ≈ **6.92 ديناراً**. هذه الأرقام تسمح لك بمقارنة عرضك بوظيفة جزئية أو بعرض بالساعة. ويمكنك إدخال راتبك الفعلي وافتراضاتك الخاصة في الحاسبة للحصول على أرقامك أنت.`,
        },
        {
          heading: 'الافتراضات وتأثيرها',
          body: `تعتمد النتيجة على افتراضات: 12 شهراً و52 أسبوعاً في السنة، وثبات عدد أيام العمل وساعاته طوال العام، وعدم خصم الإجازات المدفوعة من الراتب السنوي. هذه الافتراضات واقعية في كثير من الحالات لكنها ليست عالمية.

إذا كان وضعك مختلفاً — مثل عقود موسمية أو ساعات متغيرة — فستكون النتيجة تقديراً تقريبياً. عدّل المدخلات لتطابق وضعك، وضع في اعتبارك أن العطل الرسمية والإجازات غير المدفوعة تؤثر على الأجر الفعلي بالساعة.`,
        },
        {
          heading: 'مقارنة عروض العمل',
          body: `بعد التحويل، قارن القيمة الحقيقية وليس الأرقام الاسمية فقط. عرض براتب شهري أعلى قليلاً قد يكون أقل جودة إذا كان يتطلب ساعات أكثر، بينما عرض بأجر أعلى بالساعة قد يعني دخلاً غير منتظم أو بدون مزايا وظيفية.

ضع في اعتبارك المزايا كالتأمين والإجازات المدفوعة والتدريب، فهي جزء من قيمة العرض الكلية ولا تظهر في الأجر بالساعة وحده. انظر دائماً إلى الصورة الكاملة.`,
        },
        {
          heading: 'متى تستشير المختصين؟',
          body: `التحويل نفسه حساب رياضي دقيق، لكن تفسير العرض الوظيفي قد يحتاج سياقاً قانونياً. قواعد الحد الأدنى للأجور وساعات العمل والعمل الإضافي تختلف بين البلدان، وقد تكون هناك التزامات تتجاوز الرقم الشهري.

تحقق من القواعد المعمول بها في بلدك لدى الجهات الرسمية أو صاحب العمل المحتمل، وإذا كان قرارك يتعلق بعقد عمل مهم فاستشر محامياً أو مستشاراً متخصصاً في شؤون العمل.`,
        },
      ],
      keyTakeaways: [
        'الراتب الشهري لا يخبرك بقيمة ساعتك؛ هناك حاجة لعدد الأيام والساعات والأسابيع المدفوعة.',
        'الراتب السنوي هو أساس التحويل، وتُشتق منه بقية الوحدات.',
        'تغيير افتراضات أيام وساعات العمل يغير النتيجة، فاختر قيماً مطابقة لوضعك.',
        'قارن القيمة الكاملة للعرض بما فيها المزايا، وليس الأجر بالساعة وحده.',
        'النتائج تقديرية وتختلف قواعدها بين البلدان.',
      ],
      faqs: [
        {
          q: 'لماذا يختلف الأجر بالساعة إذا غيّرت عدد الأسابيع المدفوعة؟',
          a: 'لأن الأجر بالساعة يُشتق من الراتب السنوي مقسوماً على عدد ساعات العمل الفعلية في السنة. تغيير الأسابيع المدفوعة أو الأيام أو الساعات يغير المقام، فتتغير النتيجة.',
        },
        {
          q: 'هل يجب خصم الإجازات المدفوعة؟',
          a: 'لا، في الحاسبة لا تُخصم الإجازات المدفوعة من الراتب السنوي، لأنك تتقاضى أجرك خلالها. أما أيام العمل غير المدفوعة فتُخصم.',
        },
        {
          q: 'هل الأجر بالساعة هو نفسه للعمل الإضافي؟',
          a: 'لا بالضرورة. العمل الإضافي غالباً يُحسب بمضاعف على الأجر الأساسي، وتختلف القواعد بين البلدان. استخدم حاسبة العمل الإضافي لحساب ذلك.',
        },
      ],
      relatedCalculators: ['salary-converter', 'overtime-pay', 'freelance-rate'],
      lastReviewed: '2026-08-09',
    },
    en: {
      slug: 'hourly-vs-monthly-salary',
      locale: 'en',
      title: 'Hourly vs monthly salary: how to compare',
      metaDescription:
        'Understand the relationship between monthly salary and hourly or daily pay, and convert between them accurately, with clear assumptions.',
      intro:
        'When evaluating a job offer, comparing full-time with part-time work, or weighing a job against freelancing, you may need to compare a monthly salary with an hourly rate. Converting between the two requires clear assumptions about working hours and days, because a monthly figure alone does not tell you the value of your time. This guide explains the relationship between hourly, daily, monthly and annual pay.',
      sections: [
        {
          heading: 'Why convert at all',
          body: `A monthly salary makes it easy to compare offers, but it hides the true value of an hour. Two jobs with the same monthly salary can differ a lot if one requires 40 hours a week and the other 50. Knowing your hourly rate lets you compare full-time and part-time roles, and compare employment with freelancing.

The hourly rate is also the basis for overtime pay and for pricing your services, so it is worth knowing accurately.`,
        },
        {
          heading: 'The inputs you need',
          body: `An accurate conversion needs: the **amount** and the **unit** you entered it in hourly, daily, weekly, monthly or annual, your **days per week**, **hours per day**, **paid weeks per year**, and any **unpaid leave days** to deduct.

These assumptions move the result: changing the working day from 8 to 7 hours raises the hourly rate, and changing the paid weeks changes the annual salary. The closer the inputs match your real situation, the more useful the estimate.`,
        },
        {
          heading: 'The conversion formula',
          body: `The conversion starts by working out the annual salary, then derives the other units from it. Annual salary = monthly amount × 12, or weekly × paid weeks, or daily × working days per year, and so on. Then: hourly rate = annual salary ÷ (working days per year × hours per day).

Working days per year = days per week × paid weeks. Unpaid leave days are deducted from the annual salary before dividing across units.`,
        },
        {
          heading: 'A worked example',
          body: `Mirroring the calculator’s example: a monthly salary of **1,200 dinars**, working 5 days per week × 8 hours, paid for 52 weeks.

Annual salary = 1,200 × 12 = **14,400 dinars**. Working days per year = 5 × 52 = 260 days. The daily rate is about **55.38 dinars** and the hourly rate about **6.92 dinars**. These figures let you compare your offer with a part-time job or an hourly-based one.`,
        },
        {
          heading: 'Assumptions and their effect',
          body: `The result rests on assumptions: 12 months and 52 weeks per year, fixed working days and hours throughout the year, and paid leave not deducted from the annual salary. These are reasonable in many cases but not universal.

If your situation differs — seasonal contracts or variable hours, for example — the result is a rough estimate. Adjust the inputs to match your situation, and remember that public holidays and unpaid leave affect the true hourly value.`,
        },
        {
          heading: 'Comparing job offers',
          body: `After converting, compare real value rather than nominal numbers. An offer with a slightly higher monthly salary may be worse if it needs many more hours, while a higher hourly rate may mean irregular income or fewer employment benefits.

Consider benefits such as insurance, paid leave and training; they are part of the total value and do not appear in an hourly rate alone. Always look at the full picture.`,
        },
        {
          heading: 'When to consult a professional',
          body: `The conversion itself is simple arithmetic, but interpreting a job offer can need legal context. Minimum-wage, working-hours and overtime rules vary by country, and obligations may go beyond the monthly figure.

Check the rules in force in your country with the official authorities or the prospective employer, and if your decision involves a significant contract, consult a lawyer or an employment specialist.`,
        },
      ],
      keyTakeaways: [
        'A monthly salary alone does not reveal the value of an hour; you need days, hours and paid weeks.',
        'Annual salary is the base for conversion; all other units are derived from it.',
        'Changing the assumptions changes the result, so use values that match your situation.',
        'Compare the full package including benefits, not just the hourly rate.',
        'Results are estimates and rules vary between countries.',
      ],
      faqs: [
        {
          q: 'Why does the hourly rate change when paid weeks change?',
          a: 'Because the hourly rate is the annual salary divided by the actual working hours in the year. Changing paid weeks, days or hours changes the denominator and therefore the result.',
        },
        {
          q: 'Should paid leave be deducted?',
          a: 'No. The calculator does not deduct paid leave from the annual salary because you still earn during it. Unpaid working days are deducted.',
        },
        {
          q: 'Is the overtime rate the same as the base hourly rate?',
          a: 'Not necessarily. Overtime is usually paid at a multiple of the base rate, and the rules vary by country. Use the overtime pay calculator for that.',
        },
      ],
      relatedCalculators: ['salary-converter', 'overtime-pay', 'freelance-rate'],
      lastReviewed: '2026-08-09',
    },
  },

  'how-to-calculate-overtime': {
    ar: {
      slug: 'how-to-calculate-overtime',
      locale: 'ar',
      title: 'كيف تحسب أجر العمل الإضافي',
      metaDescription:
        'تعلّم كيف تحسب أجر ساعات العمل الإضافية من الراتب الشهري أو الأجر بالساعة، مع مثال عملي من حاسبة العمل الإضافي وشرح لرصيد الإجازات.',
      intro:
        'ساعات العمل الإضافية هي الساعات التي تعملها فوق ساعات عملك الاعتيادية، وعادة تُحسب بأجر أعلى من أجر الساعة العادية وفق مضاعف متفق عليه. لمعرفة المبلغ الذي ستتقاضاه، تحتاج تحديد أجر ساعتك الأساسي ومضاعف العمل الإضافي وعدد الساعات. يشرح هذا الدليل الخطوات ويستعرض العلاقة بين العمل الإضافي ورصيد الإجازات.',
      sections: [
        {
          heading: 'ما هو العمل الإضافي؟',
          body: `العمل الإضافي هو العمل الذي يتجاوز ساعات العمل المتفق عليها في الأسبوع، مثل العمل فوق 40 ساعة إذا كان ذلك حدك الاعتيادي. تختلف القواعد التي تحكمه بين البلدان وبين عقود العمل، وقد تُحدد ساعات قصوى وأنظمة مختلفة حسب نوع العمل.

المبدأ العام هو أن الساعات الإضافية تُدفع بمعدل أعلى من أجر الساعة العادية، عبر **مضاعف** مثل 1.25 أو 1.5 أو 2، لكن النسبة المعمول بها يجب أن تتحقق منها في عقدك ومن الجهات الرسمية في بلدك.`,
        },
        {
          heading: 'المعلومات التي تحتاجها',
          body: `لحساب الأجر تحتاج: أساس الحساب راتب شهري أو أجر بالساعة، وعدد **ساعات العمل الأسبوعية** الاعتيادية، وعدد **ساعات العمل الإضافي**، و**المضاعف** المطبق أو قيمة مخصصة.

إذا كان أساسك راتباً شهرياً فستحتاج أيضاً ساعات العمل الأسبوعية لتحويل الراتب إلى أجر أساسي للساعة. أدخل قيماً تطابق عقدك الفعلي؛ فالمضاعف والقواعد تختلف من بلد لآخر ومن عقد لآخر. تأكد من دقة هذه القيم، لأن النتيجة النهائية حساسة للتغيير فيها.`,
        },
        {
          heading: 'حساب الأجر الأساسي للساعة',
          body: `إذا كنت تعرف أجرك بالساعة مباشرة فاستخدمه كأساس. أما إذا كنت براتب شهري، فحوّل الراتب إلى أجر بالساعة: الأجر الأساسي للساعة = (الراتب الشهري × 12) ÷ (52 × ساعات العمل الأسبوعية).

مثال بقيم الحاسبة: راتب شهري **1,000 دينار** وساعات أسبوعية 40. الأجر الأساسي للساعة = (1,000 × 12) ÷ (52 × 40) ≈ **5.77 ديناراً**. هذا هو الأجر الذي تُضرب عليه بقية الحسابات.`,
        },
        {
          heading: 'حساب أجر الساعة الإضافية',
          body: `أجر الساعة الإضافية = الأجر الأساسي للساعة × المضاعف. ثم أجر العمل الإضافي الأسبوعي = أجر الساعة الإضافية × عدد الساعات الإضافية.

بمتابعة المثال: بمضاعف **1.5**، أجر الساعة الإضافية ≈ 5.77 × 1.5 ≈ **8.65 ديناراً**. لـ**6 ساعات** إضافية أسبوعياً: أجر العمل الإضافي ≈ 8.65 × 6 ≈ **51.92 ديناراً**. إجمالي الأجر الأسبوعي = (5.77 × 40) + 51.92 ≈ **282.69 ديناراً**.`,
        },
        {
          heading: 'اختيار المضاعف الصحيح',
          body: `المضاعف ليس رقماً ثابتاً؛ قد يكون 1.25 أو 1.5 أو 2 حسب القواعد المعمول بها، وقد يختلف لأيام العطل أو الأعياد أو الساعات الليلية. الحاسبة تتيح اختيار مضاعف جاهز أو إدخال قيمة مخصصة.

لا تفترض مضاعفاً معيناً دون تحقق: راجع عقد عملك وسياسة صاحب العمل والقواعد الرسمية في بلدك. استخدام المضاعف الصحيح هو أهم خطوة للحصول على نتيجة دقيقة، لأن الخطأ فيه يضاعف الفرق في المبلغ المستحق.`,
        },
        {
          heading: 'العمل الإضافي ورصيد الإجازات',
          body: `العمل الإضافي ورصيد الإجازات موضوعان مختلفان غالباً: الأول عن ساعات العمل الزائدة وأجرها، والثاني عن أيام الإجازة المستحقة. لكن هناك حالات يتصلان فيها، مثل السياسات التي تمنح إجازة بدلاً من أجر العمل الإضافي، وهو ما يسمى التعويض الزمني.

رصيد الإجازات يُحسب عادة بتطبيق الاستحقاق السنوي على مدة الخدمة، مطروحاً منه ما استهلكته. مثال من حاسبة رصيد الإجازات: استحقاق سنوي **30 يوماً** بطريقة الاستحقاق الشهري، وبعد 12 شهراً خدمة يكون المستحق 30 يوماً، فإذا استهلكت 10 يبقى المتاح **20 يوماً**. تحقق دائماً من السياسة المطبقة عندك.`,
        },
        {
          heading: 'متى تستشير المختصين؟',
          body: `هذه الحسابات تقديرية وتفترض مدخلات تحددها أنت. قواعد العمل الإضافي والإجازات القانونية، والحدود القصوى، وطريقة احتساب الأجر الأساسي، كلها تختلف بين البلدان وقد تنطوي على التزامات لصاحب العمل.

إذا كنت غير متأكد من حقوقك أو التزاماتك، تحقق من عقدك وسياسات صاحب العمل، وراجع الجهات الرسمية المختصة بالعمل، واستشر محامياً أو مستشاراً متخصصاً عند الحاجة. بهذه الطريقة تضمن حساب أجرك وفق القاعدة الصحيحة وليس وفق التقدير فقط.`,
        },
      ],
      keyTakeaways: [
        'أجر الساعة الإضافية = الأجر الأساسي للساعة × المضاعف.',
        'الأجر الأساسي للساعة من الراتب الشهري = (الشهري × 12) ÷ (52 × ساعات الأسبوع).',
        'المضاعف يختلف بين البلدان والعقود؛ تحقق من القاعدة المطبقة عندك.',
        'أجر العمل الإضافي يُحسب أسبوعياً في الحاسبة وليس شهرياً.',
        'رصيد الإجازات يُحسب من الاستحقاق السنوي ومدة الخدمة والرصيد المستهلك.',
      ],
      faqs: [
        {
          q: 'ما المضاعف الذي يجب أن أستخدمه؟',
          a: 'استخدم المضاعف المتفق عليه في عقدك أو المعمول به في بلدك. الحاسبة تقدم خيارات جاهزة وقيمة مخصصة، لكن القيمة الصحيحة يجب أن تتحقق منها من مصادر رسمية.',
        },
        {
          q: 'هل تُحسب الساعات الإضافية من الراتب الشهري أم من الأجر بالساعة؟',
          a: 'يمكن استخدام أي منهما كأساس. إذا كان عندك راتب شهري، تحوله الحاسبة إلى أجر أساسي للساعة بناءً على ساعات العمل الأسبوعية.',
        },
        {
          q: 'هل العمل الإضافي يؤثر على رصيد الإجازات؟',
          a: 'عادة لا يؤثر مباشرة، لكن بعض السياسات تسمح بتحويل العمل الإضافي إلى إجازة تعويضية بدلاً من الأجر. راجع السياسة المطبقة عندك.',
        },
      ],
      relatedCalculators: ['overtime-pay', 'leave-balance', 'salary-converter', 'employee-cost'],
      lastReviewed: '2026-08-09',
    },
    en: {
      slug: 'how-to-calculate-overtime',
      locale: 'en',
      title: 'How to calculate overtime pay',
      metaDescription:
        'Learn how to calculate pay for overtime hours from a monthly salary or an hourly rate, with a worked example and how leave balances work.',
      intro:
        'Overtime hours are the hours you work beyond your normal weekly hours, and they are usually paid at a higher rate than your regular hourly rate, based on an agreed multiplier. To find out what you will earn, you need your base hourly rate, the overtime multiplier and the number of overtime hours. This guide walks through the steps and looks at how overtime relates to your leave balance.',
      sections: [
        {
          heading: 'What counts as overtime',
          body: `Overtime is work beyond your agreed weekly hours, such as hours above 40 if that is your usual limit. The rules governing it differ between countries and between employment contracts, and may include maximum-hour limits and different arrangements depending on the type of work.

The general principle is that extra hours are paid at a higher rate than regular hours, through a **multiplier** such as 1.25, 1.5 or 2, but the applicable figure must be checked in your contract and with the official authorities in your country.`,
        },
        {
          heading: 'What you need',
          body: `To calculate the pay you need: the basis a monthly salary or an hourly rate, your normal **weekly working hours**, the number of **overtime hours**, and the **multiplier** applied or a custom value.

If your basis is a monthly salary, you also need your weekly hours to convert the salary into a base hourly rate. Enter values that match your actual contract; multipliers and rules vary between countries and contracts.`,
        },
        {
          heading: 'Finding the base hourly rate',
          body: `If you know your hourly rate directly, use it as the basis. If you are paid a monthly salary, convert it to an hourly rate: base hourly rate = (monthly salary × 12) ÷ (52 × weekly working hours).

Using the calculator’s example: a monthly salary of **1,000 dinars** and 40 weekly hours. The base hourly rate = (1,000 × 12) ÷ (52 × 40) ≈ **5.77 dinars**. This is the rate everything else is built on.`,
        },
        {
          heading: 'Calculating the overtime pay',
          body: `The overtime hourly rate = base hourly rate × multiplier. The weekly overtime pay = overtime hourly rate × overtime hours.

Continuing the example: at a multiplier of **1.5**, the overtime hourly rate ≈ 5.77 × 1.5 ≈ **8.65 dinars**. For **6 overtime hours** per week, overtime pay ≈ 8.65 × 6 ≈ **51.92 dinars**. Your total weekly earnings = (5.77 × 40) + 51.92 ≈ **282.69 dinars**.`,
        },
        {
          heading: 'Choosing the right multiplier',
          body: `The multiplier is not a fixed number; it may be 1.25, 1.5 or 2 depending on the applicable rules, and it can differ for public holidays, weekends or night hours. The calculator lets you pick a preset multiplier or enter a custom value.

Do not assume a multiplier: check your employment contract, your employer’s policy and the official rules in your country. Getting the multiplier right is the most important step, because an error here multiplies the difference in the amount you are owed.`,
        },
        {
          heading: 'Overtime and your leave balance',
          body: `Overtime and leave balance are usually separate topics: one covers extra working hours and their pay, the other covers the leave days you have accrued. But they connect in policies that grant time off instead of overtime pay, sometimes called time off in lieu.

A leave balance is normally built from your annual entitlement applied to your service length, minus what you have used. Using the leave balance calculator’s example: an annual entitlement of **30 days** with monthly accrual, after 12 months of service the accrued leave is 30 days; if you used 10, the available balance is **20 days**. Always check the policy that applies to you.`,
        },
        {
          heading: 'When to consult a professional',
          body: `These calculations are estimates based on inputs you provide. Overtime and leave rules, maximum limits and the way the base rate is computed vary between countries and may create obligations for the employer.

If you are unsure about your rights or obligations, check your contract and your employer’s policies, review the official labour authorities in your country, and consult a lawyer or a specialist when needed.`,
        },
      ],
      keyTakeaways: [
        'Overtime hourly rate = base hourly rate × multiplier.',
        'Base hourly rate from a monthly salary = (monthly × 12) ÷ (52 × weekly hours).',
        'Multipliers vary by country and contract; verify the applicable rule.',
        'The calculator works weekly, not monthly.',
        'Leave balance comes from your annual entitlement, service length and days used.',
      ],
      faqs: [
        {
          q: 'Which multiplier should I use?',
          a: 'Use the one agreed in your contract or applied in your country. The calculator offers preset options and a custom value, but the correct figure should be verified with official sources.',
        },
        {
          q: 'Should I calculate overtime from my monthly salary or hourly rate?',
          a: 'Either basis works. With a monthly salary, the calculator converts it to a base hourly rate using your weekly hours.',
        },
        {
          q: 'Does overtime affect my leave balance?',
          a: 'Usually not directly, though some policies allow converting overtime into compensatory leave instead of pay. Check the policy that applies to you.',
        },
      ],
      relatedCalculators: ['overtime-pay', 'leave-balance', 'salary-converter', 'employee-cost'],
      lastReviewed: '2026-08-09',
    },
  },

  'how-freelancers-set-rates': {
    ar: {
      slug: 'how-freelancers-set-rates',
      locale: 'ar',
      title: 'كيف يحدد المستقلون أسعارهم',
      metaDescription:
        'دليل عملي لتحديد سعر الساعة للمستقلين من الدخل المستهدف والمصاريف والساعات القابلة للفوترة، مع مثال عددي من حاسبة سعر الساعة للمستقلين.',
      intro:
        'أحد أصعب القرارات للمستقلين هو تحديد السعر الذي يفرضونه على خدماتهم. السعر الذي يبدو معقولاً قد لا يغطي مصاريفك الفعلية بعد احتساب الإجازات والأيام غير القابلة للفوترة. يشرح هذا الدليل طريقة منهجية لحساب الحد الأدنى والسعر الموصى به للساعة، باستخدام نفس منطق حاسبة سعر الساعة للمستقلين.',
      sections: [
        {
          heading: 'لماذا يخطئ كثير من المستقلين في التسعير؟',
          body: `يقسم بعض المستقلين راتبهم السابق على عدد الساعات المتاحة، أو يقلدون أسعار السوق دون فهم مكوناتها. المشكلة أن ساعات العمل في الأسبوع لا تساوي كلها ساعات **قابلة للفوترة**: فالمهام الإدارية والتسويق وكتابة العروض والاجتماعات لا تُدفع.

كما ينسى البعض حساب الإجازات وأيام المرض، والمصاريف، والاحتياط الضريبي، فيكتشفون لاحقاً أن سعرهم لا يغطي التكلفة الحقيقية للعمل. السعر الصحيح يبدأ من تكلفتك، لا من أسعار السوق فقط.`,
        },
        {
          heading: 'المعلومات التي تحتاجها',
          body: `لتسعير خدمة تحتاج: **الدخل المستهدف** السنوي صافي ما تريد كسبه، و**المصاريف السنوية** للعمل برامج واشتراكات ومكتب وتسويق، و**نسبة احتياط الضرائب** المتوقعة، و**نسبة الوقت غير القابل للفوترة**، و**أيام الإجازة والمرض**، و**ساعات العمل في الأسبوع**، و**هامش الربح** الذي تريد إضافته، و**ساعات المشروع** المتوقعة لتسعير مشاريع محددة.

هذه المدخلات نفسها حقول الحاسبة، وكلما كانت أقرب لواقعك كانت النتيجة أدق. اجمع هذه الأرقام من واقعك المالي الفعلي بدلاً من تقديرات غير مدروسة.`,
        },
        {
          heading: 'من ساعات الأسبوع إلى الساعات القابلة للفوترة',
          body: `الساعات القابلة للفوترة هي الساعات التي تدفع مقابلها فعلياً. احسبها بطرح نسبة الوقت غير القابل للفوترة من إجمالي الساعات السنوية، ثم اطرح ساعات الإجازة والمرض.

مثال بقيم الحاسبة: 40 ساعة أسبوعياً × 52 أسبوعاً = 2,080 ساعة. بعد خصم 20% غير قابلة للفوترة و25 يوماً للإجازة والمرض تبقى نحو **1,464 ساعة قابلة للفوترة** سنوياً. هذا الرقم هو الأساس الذي يُبنى عليه السعر.`,
        },
        {
          heading: 'حساب الإيراد المطلوب',
          body: `الإيراد المطلوب = (الدخل المستهدف + المصاريف) ÷ (1 − نسبة احتياط الضرائب ÷ 100). فإذا كان الدخل المستهدف **36,000 دولار** والمصاريف **4,000 دولار** واحتياط الضرائب **10%**، فالإيراد المطلوب ≈ 40,000 ÷ 0.9 ≈ **44,444 دولاراً**.

احتياط الضرائب تقدير شخصي وليس جدول ضرائب رسمياً؛ النسب والقواعد تختلف بين البلدان، وتحقق منها عندك. الخطوة التالية توزع هذا الإيراد على الساعات المتاحة.`,
        },
        {
          heading: 'الحد الأدنى والسعر الموصى به',
          body: `الحد الأدنى للساعة = الإيراد المطلوب ÷ الساعات القابلة للفوترة. في المثال: 44,444 ÷ 1,464 ≈ **30.36 دولاراً** للساعة. هذا هو السعر الذي يغطي تكاليفك فقط دون ربح.

لإضافة هامش ربح، ارفع الإيراد: السعر الموصى به ≈ **35.72 دولاراً** للساعة مع هامش **15%**. منه يُشتق الأجر اليومي ≈ 35.72 × 8 ≈ **285.71 دولاراً**، وتكلفة مشروع من **200 ساعة** ≈ **7,143 دولاراً**. استخدم السعر الموصى به كأساس للمفاوضة، لا كسقف.`,
        },
        {
          heading: 'عوامل إضافية في التسعير',
          body: `المنطق أعلاه يعطي سعراً مبنيّاً على التكلفة، لكن السعر النهائي يتأثر أيضاً بقيمة السوق وخبرتك وتخصصك: عمل متخصص نادر يبرر سعراً أعلى من عمل عام يتنافس عليه كثيرون. كذلك خذ بعين الاعتبار قيمة النتيجة للعميل ومدة المشروع وأي مخاطر.

لا تخف من مراجعة أسعارك دورياً: مع نمو خبرتك وتزايد طلب السوق، يقل السعر الذي تحتاجه لتغطية تكلفتك نسبياً، وقد تستحق سعراً أعلى مما توحي به المعادلة.`,
        },
        {
          heading: 'متى تستشير المختصين؟',
          body: `هذه الطريقة أداة تخطيط شخصية وليست بديلاً عن المشورة المهنية. الالتزامات الضريبية للمستقلين، ونظام الفوترة، والتسجيل التجاري، وحقوق الملكية الفكرية، كلها مسائل تختلف بين البلدان.

إذا بدأت نشاطك الحر بجدية، فاستشر محاسباً أو مستشاراً ضريبياً مرخصاً لفهم التزاماتك، وراجع الجهات الرسمية المختصة لتسجيل نشاطك والامتثال للقواعد المعمول بها. وبناء خطة مالية سليمة مبكراً يوفر عليك مشكلات كثيرة لاحقاً مع نمو نشاطك.`,
        },
      ],
      keyTakeaways: [
        'السعر الصحيح يبدأ من تكلفتك الفعلية، لا من أسعار السوق فقط.',
        'لا تساوي بين ساعات الأسبوع والساعات القابلة للفوترة؛ خصم المهام غير المدفوعة والإجازات.',
        'الحد الأدنى للساعة = (الدخل + المصاريف) ÷ الساعات القابلة للفوترة، قبل الضرائب.',
        'السعر الموصى به يضيف هامش ربح، ويُشتق منه الأجر اليومي وسعر المشروع.',
        'احتياط الضرائب تقدير شخصي؛ تحقق من قواعد بلدك.',
      ],
      faqs: [
        {
          q: 'لماذا حساب الساعات القابلة للفوترة مهم؟',
          a: 'لأنها فقط الساعات التي تدر عليك دخلاً. إذا أسست السعر على كل ساعات العمل، فسيكشف الواقع أنك تتقاضى أقل من تكلفتك.',
        },
        {
          q: 'هل أحتاج حقاً هامش ربح؟',
          a: 'الحد الأدنى يغطي التكاليف فقط. هامش الربح يمنحك مساحة للنمو والاستثمار والطوارئ، ويُحدد بنفسك حسب وضعك وطموحك.',
        },
        {
          q: 'هل هذا هو سعر السوق؟',
          a: 'لا، هذه طريقة تسعير على أساس التكلفة. ادمجها مع فهم أسعار السوق وخبرتك وتخصصك لتصل إلى سعر نهائي تنافسي.',
        },
      ],
      relatedCalculators: ['freelance-rate', 'salary-converter', 'employee-cost'],
      lastReviewed: '2026-08-09',
    },
    en: {
      slug: 'how-freelancers-set-rates',
      locale: 'en',
      title: 'How freelancers should set their rates',
      metaDescription:
        'A practical guide to setting freelance hourly rates from desired income, expenses and billable hours, with a worked example from the calculator.',
      intro:
        'One of the hardest decisions freelancers face is what to charge for their work. A rate that seems reasonable can fail to cover real costs once leave and non-billable time are counted. This guide explains a systematic way to find both a minimum and a recommended hourly rate, following the same logic as the freelancer hourly-rate calculator.',
      sections: [
        {
          heading: 'Why freelancers misprice their work',
          body: `Some freelancers divide their previous salary by the hours available, or copy market rates without understanding what those rates contain. The problem is that not every hour you work is **billable**: admin, marketing, proposals and meetings are not paid.

People also forget leave and sick days, expenses and a tax reserve, only to discover later that their rate does not cover the real cost of working. The right rate starts from your costs, not only from market prices.`,
        },
        {
          heading: 'What you need',
          body: `To price your service you need: your **desired income** for the year what you want to earn after costs, your **annual expenses** software, subscriptions, office, marketing, an expected **tax reserve** percentage, the share of **non-billable time**, your **vacation and sick days**, your **hours per week**, a **profit margin** you want to add, and the expected **project hours** to price specific jobs.

These are exactly the calculator’s fields, and the closer they match your reality, the more accurate the result.`,
        },
        {
          heading: 'From weekly hours to billable hours',
          body: `Billable hours are the hours you actually get paid for. Find them by removing the non-billable share from your total annual hours, then subtracting leave and sick hours.

Using the calculator’s example: 40 hours per week × 52 weeks = 2,080 hours. After removing 20% non-billable time and 25 days of leave and sickness, about **1,464 billable hours** remain each year. That number is the foundation your rate is built on.`,
        },
        {
          heading: 'Finding the required revenue',
          body: `Required revenue = (desired income + expenses) ÷ (1 − tax reserve ÷ 100). With a desired income of **36,000 dollars**, expenses of **4,000 dollars** and a **10%** tax reserve, the required revenue is about 40,000 ÷ 0.9 ≈ **44,444 dollars**.

The tax reserve is a personal estimate, not an official tax schedule; rates and rules vary by country, so verify them where you operate. The next step spreads this revenue across your available hours.`,
        },
        {
          heading: 'Minimum and recommended rates',
          body: `The minimum hourly rate = required revenue ÷ billable hours. In the example: 44,444 ÷ 1,464 ≈ **30.36 dollars** per hour. That is the rate that covers your costs with no profit built in.

To add a profit margin, raise the revenue: the recommended rate ≈ **35.72 dollars** per hour at a **15%** margin. From it come the daily rate ≈ 35.72 × 8 ≈ **285.71 dollars** and a **200-hour** project price ≈ **7,143 dollars**. Treat the recommended rate as your negotiation baseline, not a ceiling.`,
        },
        {
          heading: 'Additional pricing factors',
          body: `The logic above gives a cost-based rate, but the final price is also shaped by market value, experience and specialisation: a rare specialist skill justifies a higher rate than a common service many competitors offer. Also weigh the value of the outcome to the client, the project length and any risks.

Do not be afraid to review your rates regularly: as your experience grows and demand rises, the rate you need to cover costs falls relatively, and you may deserve more than the formula suggests.`,
        },
        {
          heading: 'When to consult a professional',
          body: `This method is a personal planning tool, not a substitute for professional advice. Tax obligations for freelancers, invoicing, business registration and intellectual property all differ by country.

If you are starting out seriously, consult a licensed accountant or tax adviser to understand your obligations, and check the official authorities for registering your activity and complying with the applicable rules. Getting the basics right early will save you problems later as your business grows.`,
        },
      ],
      keyTakeaways: [
        'The right rate starts from your actual costs, not only market prices.',
        'Do not confuse weekly hours with billable hours; deduct unpaid tasks and leave.',
        'Minimum hourly rate = (income + expenses) ÷ billable hours, before taxes.',
        'The recommended rate adds a profit margin and feeds daily and project pricing.',
        'The tax reserve is a personal estimate; verify your country’s rules.',
      ],
      faqs: [
        {
          q: 'Why does billable hours matter so much?',
          a: 'Because those are the only hours that earn you income. If you base your rate on every working hour, reality will show that you are charging less than your true cost.',
        },
        {
          q: 'Do I really need a profit margin?',
          a: 'The minimum rate covers costs only. A margin gives room for growth, investment and emergencies, and you decide it based on your situation and goals.',
        },
        {
          q: 'Is this the market rate?',
          a: 'No, this is cost-based pricing. Combine it with an understanding of market rates, your experience and specialisation to reach a final competitive price.',
        },
      ],
      relatedCalculators: ['freelance-rate', 'salary-converter', 'employee-cost'],
      lastReviewed: '2026-08-09',
    },
  },

  'true-cost-of-an-employee': {
    ar: {
      slug: 'true-cost-of-an-employee',
      locale: 'ar',
      title: 'التكلفة الكلية للموظف: أكثر من مجرد راتب',
      metaDescription:
        'فهم التكلفة الحقيقية لتوظيف موظف تشمل الاشتراكات والتأمين والمزايا والتكاليف لمرة واحدة، مع مثال عددي من حاسبة التكلفة الكلية للموظف.',
      intro:
        'عند التخطيط للتوظيف، من السهل التركيز على الراتب الشهري، لكن التكلفة الحقيقية للموظف تتجاوز ذلك بكثير. تشمل التكلفة اشتراكات صاحب العمل والتأمين والمزايا والبرامج، إضافة إلى تكاليف لمرة واحدة كالتوظيف والتدريب والمعدات. يشرح هذا الدليل مكونات التكلفة وكيف تُحسب باستخدام حاسبة التكلفة الكلية للموظف.',
      sections: [
        {
          heading: 'لماذا يهم حساب التكلفة الكلية؟',
          body: `صاحب العمل لا يدفع للموظف راتبه فقط؛ يتحمل أيضاً اشتراكات قانونية وأحياناً تأميناً ومزايا، وكلها تزيد التكلفة الشهرية الفعلية. تجاهل هذه التكاليف قد يجعل قرار التوظيف يبدو أرخص مما هو عليه، ويؤدي إلى ميزانيات غير دقيقة أو تسعير خدمات هامشي.

حساب التكلفة الكلية يمنحك صورة واقعية عن أثر التوظيف على النفقات، ويساعدك على المقارنة بين خيارات مثل التوظيف بدوام كامل مقابل جزئي أو مقابل الاستعانة بمستقل.`,
        },
        {
          heading: 'مكونات التكلفة الشهرية',
          body: `التكلفة الشهرية المتكررة تشمل: **الراتب الإجمالي**، و**اشتراك صاحب العمل** كنسبة من الراتب تطبق حسب القواعد المعمول بها في بلدك، و**التأمين**، و**المزايا**، و**البرامج** والأدوات، وأي **تكاليف متكررة أخرى**.

مثال بقيم الحاسبة: راتب شهري **1,500 دينار** مع اشتراك صاحب العمل **10%** = 150 ديناراً، وتأمين 80 ومزايا 50 وبرامج 30. التكلفة الشهرية = 1,500 + 150 + 80 + 50 + 30 = **1,810 ديناراً**. لاحظ أن الراتب يشكل جزءاً فقط من التكلفة.`,
        },
        {
          heading: 'نسبة اشتراك صاحب العمل',
          body: `بعض البلدان تفرض على صاحب العمل مساهمة في أنظمة التقاعد أو التأمينات الاجتماعية، تُحسب كنسبة من الراتب الإجمالي وتُدفع إضافة إليه. هذه النسبة **تختلف بين البلدان** وقد تتغير، ولا يمكن للحاسبة افتراضها نيابة عنك.

تحقق من النسبة السارية في بلدك من الجهات الرسمية المختصة، وأدخلها كنسبة مئوية في الحاسبة. تذكر أنها عبء إضافي على صاحب العمل وليست خصماً من راتب الموظف، لذلك فهي تدخل كاملة في التكلفة.`,
        },
        {
          heading: 'التكاليف السنوية',
          body: `بعد حساب التكلفة الشهرية، اضربها في 12 للحصول على التكلفة السنوية المتكررة. في المثال: 1,810 × 12 = **21,720 ديناراً** سنوياً.

هذا الرقم يعكس ما يدفعه صاحب العمل كل عام للحفاظ على الوظيفة بغض النظر عن أي تكاليف لمرة واحدة. استخدمه عند مقارنة الوظائف ببعضها، وعند تقدير الميزانية السنوية للقسم أو المشروع الذي ستوظف له. ضع هذا الرقم في الاعتبار عند التخطيط المالي لأي توسع أو قرار توظيف جديد.`,
        },
        {
          heading: 'التكاليف لمرة واحدة في السنة الأولى',
          body: `السنة الأولى تحمل تكاليف إضافية لا تتكرر كل عام: **التوظيف** إعلانات ووكالات، و**التدريب**، و**المعدات** والأجهزة، وأي تكاليف لمرة واحدة أخرى.

في المثال: أجهزة **800** + توظيف **500** + تدريب **400** = **1,700 دينار**. إجمالي السنة الأولى = التكلفة السنوية 21,720 + 1,700 = **23,420 ديناراً**. وتُظهر النتيجة أيضاً أن حصة الراتب ≈ **77%** من إجمالي السنة الأولى، أي أن نحو ربع التكلفة يأتي من عناصر أخرى غير الراتب.`,
        },
        {
          heading: 'كيف تستخدم النتيجة',
          body: `استخدم التكلفة الكلية لتحديد ميزانية التوظيف الواقعية، ولمقارنة خيارات توريد العمل، ولتسعير خدماتك بدقة إذا كنت تقدم خدمات تتطلب موظفين. كما تساعدك على تقييم الأثر طويل الأمد، فالتكلفة المتكررة السنوية تتراكم عبر السنوات بينما التكاليف لمرة واحدة لا تتكرر.

عند المقارنة مع الاستعانة بمستقلين، قارن التكلفة الكلية السنوية مع إجمالي الفواتير المتوقعة، وتذكر أن الموظف يعطي ساعات مضمونة والتزاماً مستمراً بينما المستقلون أكثر مرونة.`,
        },
        {
          heading: 'متى تستشير المختصين؟',
          body: `هذه الحسابات تقديرية وتفترض مدخلات تدخلها بنفسك. نسب الاشتراكات، والتأمين الإلزامي، وبدلات وإنهاءات الخدمة، والالتزامات الضريبية، كلها تختلف بين البلدان وتخضع للتغيير.

قبل توظيف أول موظف أو عند التوسع، تحقق من القواعد المعمول بها في بلدك من الجهات الرسمية، واستشر محاسباً أو مستشاراً متخصصاً في الرواتب والموارد البشرية لضمان الامتثال ودقة الميزانية. التكلفة الحقيقية للموظف قرار مالي مهم، فلا تبنِ عليه تقديرات خاطئة.`,
        },
      ],
      keyTakeaways: [
        'التكلفة الكلية للموظف تتجاوز الراتب وتشمل الاشتراكات والتأمين والمزايا والبرامج.',
        'نسبة اشتراك صاحب العمل تختلف بين البلدان؛ تحقق منها من الجهات الرسمية.',
        'التكلفة السنوية = التكلفة الشهرية × 12، وتُضاف التكاليف لمرة واحدة في السنة الأولى.',
        'في مثال الحاسبة يشكل الراتب نحو 77% من إجمالي السنة الأولى فقط.',
        'النتائج تقديرية؛ استشر محاسباً أو مستشار رواتب للامتثال الدقيق.',
      ],
      faqs: [
        {
          q: 'هل اشتراك صاحب العمل يُخصم من راتب الموظف؟',
          a: 'لا، هو تكلفة إضافية يتحملها صاحب العمل فوق الراتب الإجمالي، وتدخل كاملة في التكلفة الكلية للموظف.',
        },
        {
          q: 'ما النسبة التي يجب أن أدخلها لاشتراك صاحب العمل؟',
          a: 'استخدم النسبة السارية في بلدك بحسب الحالة، وتحقق منها من الجهة الرسمية المختصة، لأنها تختلف بين البلدان وقد تتغير.',
        },
        {
          q: 'لماذا التكلفة في السنة الأولى أعلى؟',
          a: 'لأنها تشمل تكاليف لمرة واحدة مثل التوظيف والتدريب والمعدات، إضافة إلى التكلفة السنوية المتكررة.',
        },
        {
          q: 'هل الحاسبة تشمل الضرائب؟',
          a: 'لا تُدرج الضرائب أو البدلات القانونية إلا إذا أضفتها يدوياً ضمن التكاليف، والنتائج تقديرية لأغراض التخطيط.',
        },
      ],
      relatedCalculators: ['employee-cost', 'leave-balance', 'overtime-pay'],
      lastReviewed: '2026-08-09',
    },
    en: {
      slug: 'true-cost-of-an-employee',
      locale: 'en',
      title: 'The true cost of an employee: more than a salary',
      metaDescription:
        'Understand the real cost of hiring an employee, including contributions, insurance, benefits and one-time costs, with a worked example.',
      intro:
        'When planning a hire, it is easy to focus on the monthly salary, but the real cost of an employee goes well beyond it. That cost includes employer contributions, insurance, benefits and software, plus one-time costs such as recruiting, training and equipment. This guide breaks down the components and shows how Klar’s employee total-cost calculator adds them up.',
      sections: [
        {
          heading: 'Why the full cost matters',
          body: `Employers do not pay only a salary; they also carry statutory contributions and often insurance and benefits, all of which raise the true monthly cost. Ignoring these can make a hire look cheaper than it is, leading to inaccurate budgets or thin margins in service pricing.

Working out the full cost gives you a realistic picture of how hiring affects expenses, and helps you compare options such as full-time versus part-time employment or using freelancers instead.`,
        },
        {
          heading: 'The monthly components',
          body: `The recurring monthly cost includes: the **gross salary**, the **employer contribution** as a percentage of salary a rate that follows the rules in force in your country, **insurance**, **benefits**, **software** and tools, and any **other recurring costs**.

Using the calculator’s example: a monthly salary of **1,500 dinars** with a **10%** employer contribution = 150 dinars, plus insurance 80, benefits 50 and software 30. The monthly cost = 1,500 + 150 + 80 + 50 + 30 = **1,810 dinars**. Notice that the salary is only part of the cost.`,
        },
        {
          heading: 'The employer contribution',
          body: `Some countries require employers to contribute to pension or social insurance systems, calculated as a percentage of gross salary and paid on top of it. The rate **varies by country** and can change, so a calculator cannot assume it for you.

Check the current rate in your country with the official authorities and enter it as a percentage in the calculator. Remember it is an extra burden on the employer, not a deduction from the employee’s salary, so it counts fully in the cost.`,
        },
        {
          heading: 'The annual cost',
          body: `Once the monthly cost is known, multiply it by 12 to get the recurring annual cost. In the example: 1,810 × 12 = **21,720 dinars** per year.

That figure reflects what the employer pays each year just to maintain the role, regardless of any one-time costs. Use it to compare positions with one another and to estimate the yearly budget of the department or project you are hiring for.`,
        },
        {
          heading: 'One-time costs in the first year',
          body: `The first year carries extra costs that do not recur every year: **recruiting** ads and agencies, **training**, **equipment**, and any other one-time expenses.

In the example: equipment **800** + recruiting **500** + training **400** = **1,700 dinars**. The first-year total = annual cost 21,720 + 1,700 = **23,420 dinars**. The result also shows that the salary share is about **77%** of the first-year total, meaning roughly a quarter of the cost comes from items other than salary.`,
        },
        {
          heading: 'How to use the result',
          body: `Use the full cost to set a realistic hiring budget, to compare options for delivering the work, and to price your own services accurately if they rely on employees. It also helps with long-term planning: the recurring annual cost accumulates over the years, while one-time costs do not repeat.

When comparing with freelancers, weigh the full annual cost against the expected total invoices, remembering that an employee provides guaranteed hours and a lasting commitment while freelancers offer more flexibility.`,
        },
        {
          heading: 'When to consult a professional',
          body: `These calculations are estimates based on inputs you provide. Contribution rates, mandatory insurance, end-of-service allowances and tax obligations all vary by country and change over time.

Before making your first hire or expanding, verify the rules in force in your country with the official authorities, and consult an accountant or a payroll and HR specialist to ensure compliance and accurate budgeting.`,
        },
      ],
      keyTakeaways: [
        'The full cost of an employee goes beyond the salary and includes contributions, insurance, benefits and software.',
        'Employer contribution rates vary by country; verify them with official authorities.',
        'Annual cost = monthly cost × 12, plus one-time costs in the first year.',
        'In the calculator example, salary is only about 77% of the first-year total.',
        'Results are estimates; consult an accountant or payroll specialist for accurate compliance.',
      ],
      faqs: [
        {
          q: 'Is the employer contribution deducted from the employee’s salary?',
          a: 'No. It is an additional cost borne by the employer on top of gross salary and counts fully toward the total cost.',
        },
        {
          q: 'Which contribution rate should I enter?',
          a: 'Use the rate in force in your country and verify it with the official authority, since rates vary between countries and can change.',
        },
        {
          q: 'Why is the first year more expensive?',
          a: 'Because it includes one-time costs such as recruiting, training and equipment, in addition to the recurring annual cost.',
        },
        {
          q: 'Does the calculator include taxes?',
          a: 'Taxes and statutory allowances are only included if you add them manually, and the results are planning estimates.',
        },
      ],
      relatedCalculators: ['employee-cost', 'leave-balance', 'overtime-pay'],
      lastReviewed: '2026-08-09',
    },
  },

  'how-to-calculate-a-mortgage': {
    ar: {
      slug: 'how-to-calculate-a-mortgage',
      locale: 'ar',
      title: 'كيف تحسب القرض العقاري',
      metaDescription:
        'دليل عملي لحساب القسط الشهري للقرض العقاري مع الدفعة المقدمة والفائدة والرسوم، مع مثال عددي مطابق لحاسبة القرض العقاري وجدول سداد سنوي.',
      intro:
        'شراء منزل عبر تمويل عقاري هو أكبر التزام مالي يواجهه كثير من الناس، ومعرفة القسط الشهري والتكلفة الكلية قبل التوقيع أمر بالغ الأهمية. يشرح هذا الدليل كيف تُحسب أقساط القرض العقاري، وسبب أهمية الدفعة المقدمة، وكيف تقرأ جدول السداد السنوي. يتبع المثال الوارد هنا نفس القيم التي تستخدمها حاسبة القرض العقاري في كلار.',
      sections: [
        {
          heading: 'ما الذي يتكون منه القسط العقاري',
          body: `القسط الشهري للقرض العقاري بسعر فائدة ثابت يتكون من جزأين: **حصة أصل الدين** (الجزء الذي يقلل المبلغ المقترض) و**حصة الفائدة** (الرسوم مقابل اقتراض المال). تختلف نسبتهما عبر الزمن: في السنوات الأولى تذهب حصة أكبر للفائدة، ثم تنعكس المعادلة مع اقتراب نهاية المدة.
        
لا تشمل الأقساط التأمين أو الرسوم الشهرية أو ضرائب العقار إلا إذا أضفتها يدوياً إلى الرسوم. ضع ذلك في اعتبارك عند تقييم ميزانيتك الشهرية.`,
        },
        {
          heading: 'أثر الدفعة المقدمة',
          body: `مبلغ القرض الفعلي هو **سعر العقار ناقص الدفعة المقدمة**، والفائدة تُحسب على هذا المبلغ لا على سعر العقار. إذا كان العقار بمليون ريال ودفعت 200 ألف مقدماً، فإن مبلغ القرض 800 ألف، وتُحسب عليه كل الأرقام.
        
زيادة الدفعة المقدمة تخفض القسط الشهري وتقلل إجمالي الفائدة، لكنها تحجز سيولة قد تحتاجها لاحتياط أو تكاليف النقل والتأثيث. وازن بين تخفيض الأقساط والحفاظ على هامش أمان مالي.`,
        },
        {
          heading: 'معادلة القسط الثابت',
          body: `تُحسب الأقساط بمعادلة القسط الثابت: حوّل النسبة السنوية إلى شهرية بقسمتها على 12، وحدد عدد الأشهر بضرب السنوات في 12، ثم طبّق: القسط الشهري = مبلغ القرض × المعدل الشهري × (1 + المعدل الشهري)^عدد الأشهر ÷ ((1 + المعدل الشهري)^عدد الأشهر − 1).
        
الحاسبة تنفذ هذه المعادلة تلقائياً وترصد في جدول السداد السنوي توزيع كل سنة بين أصل الدين والفائدة والرصيد المتبقي.`,
        },
        {
          heading: 'مثال عملي',
          body: `لنأخذ مثالاً مطابقاً لقيم الحاسبة: عقار بقيمة **200,000 دينار** ودفعة مقدمة **40,000 دينار**، بفائدة **5% سنوياً** ولمدة **20 سنة**، ورسوم **1,000 دينار**.
        
مبلغ القرض الفعلي 160,000 دينار، والقسط الشهري ≈ **1,056 ديناراً**، وإجمالي الفائدة ≈ **93,416 ديناراً**، والتكلفة الكلية الفعلية (الأقساط + المقدم + الرسوم) ≈ **294,416 ديناراً**.`,
        },
        {
          heading: 'قراءة جدول السداد السنوي',
          body: `يعرض الجدول لكل سنة: المبلغ المدفوع فيها، وحصة أصل الدين، وحصة الفائدة، والرصيد المتبقي بعد السنة. ستلاحظ أن الفائدة السنوية تتناقص مع تقدم السداد، بينما تزداد حصة أصل الدين.
        
استخدم الجدول لتقدر متى ينخفض رصيدك بسرعة، ولتفهم كم من أقساطك يذهب فائدة فعلاً — وهو ما يفيدك عند مقارنة عروض تمويل مختلفة.`,
        },
        {
          heading: 'افتراضات الحساب',
          body: `تفترض الحاسبة سعر فائدة **ثابتاً** طوال المدة وسداداً شهرياً منتظماً. تُضاف الدفعة المقدمة والرسوم إلى التكلفة الكلية، ولا تُحتسب رسوم التأمين أو الرسوم المتأخرة أو رسوم السداد المبكر.
        
النتائج تقديرية ولا تشمل فروقات أسعار الصرف أو اللوائح المحلية. تحقق دائماً من شروط العقد والجهة المموِّلة قبل اتخاذ القرار، وعند الشك استشر جهة مختصة.`,
        },
      ],
      keyTakeaways: [
        'القسط الشهري يشمل أصل الدين والفائدة فقط، دون التأمين أو الرسوم الشهرية.',
        'مبلغ القرض الفعلي هو سعر العقار بعد خصم الدفعة المقدمة.',
        'زيادة الدفعة المقدمة تخفض القسط وإجمالي الفائدة معاً.',
        'قارن عروض التمويل بالتكلفة الكلية وليس القسط الشهري وحده.',
        'النتائج تقديرية تفترض فائدة ثابتة وسداداً منتظماً.',
      ],
      faqs: [
        {
          q: 'هل يشمل القسط الشهري التأمين؟',
          a: 'لا يشمل الحساب التأمين أو الرسوم الشهرية إلا إذا أضفتها ضمن الرسوم. استفسر من المُقرِض عن التكاليف الإضافية قبل الالتزام.',
        },
        {
          q: 'ماذا لو كان سعر الفائدة متغيراً؟',
          a: 'تفترض الحاسبة سعراً ثابتاً. في القروض المتغيرة استخدم سعراً تقديرياً واعلم أن الأقساط ستتغير مع السعر.',
        },
        {
          q: 'هل جدول السداد يعكس الكشف الرسمي؟',
          a: 'يعرض الجدول رصيداً تقريبياً قد يختلف قليلاً عن كشف المُقرِض بسبب التقريب والرسوم الفعلية، فاستخدمه كمرجع للتخطيط.',
        },
      ],
      relatedCalculators: ['mortgage', 'loan-payment', 'early-payoff'],
      lastReviewed: '2026-08-10',
    },
    en: {
      slug: 'how-to-calculate-a-mortgage',
      locale: 'en',
      title: 'How to calculate a mortgage',
      metaDescription:
        'A practical guide to calculating a mortgage’s monthly payment with down payment, interest and fees, with a worked example matching the mortgage calculator and an annual schedule.',
      intro:
        'Buying a home with a mortgage is the largest financial commitment many people take on, and knowing the monthly payment and total cost before signing matters. This guide explains how mortgage payments are calculated, why the down payment matters, and how to read the annual repayment schedule. The worked example mirrors the values used by Klar’s mortgage calculator.',
      sections: [
        {
          heading: 'What makes up the mortgage payment',
          body: `A fixed-rate mortgage payment has two parts: the **principal share** (the part that reduces the amount you borrowed) and the **interest share** (the cost of borrowing the money). Their balance shifts over time: in the early years a larger share goes to interest, then the ratio flips as the term nears its end.
        
Payments do not include insurance, monthly charges or property taxes unless you add them to the fees. Keep that in mind when budgeting.`,
        },
        {
          heading: 'The effect of the down payment',
          body: `The actual loan amount is **the property price minus the down payment**, and interest is charged on that amount, not on the price. If a property costs 1,000,000 riyals and you put down 200,000, the loan is 800,000 and all figures are based on it.
        
A bigger down payment lowers the monthly payment and total interest, but it ties up cash you may need as a buffer or for moving and furnishing costs. Balance lower payments against keeping a financial safety margin.`,
        },
        {
          heading: 'The fixed-payment formula',
          body: `Payments use the fixed-rate annuity formula: convert the annual rate to a monthly rate by dividing by 12, convert the term to months, then apply: monthly payment = loan amount × monthly rate × (1 + monthly rate)^months ÷ ((1 + monthly rate)^months − 1).
        
The calculator runs this formula for you and records in the annual schedule how each year splits between principal, interest and remaining balance.`,
        },
        {
          heading: 'A worked example',
          body: `Using the same values as the calculator: a **200,000 dinar** property with a **40,000 dinar** down payment, at **5% per year** for **20 years**, with **1,000 dinars** in fees.
        
The loan amount is 160,000 dinars, the monthly payment about **1,056 dinars**, total interest about **93,416 dinars**, and the effective total cost (payments + down payment + fees) about **294,416 dinars**.`,
        },
        {
          heading: 'Reading the annual schedule',
          body: `The table shows, for each year: the amount paid, the principal share, the interest share, and the balance after that year. You will see interest fall each year while the principal share rises.
        
Use the table to see when your balance drops quickly and to understand how much of your payments is actually interest — useful when comparing financing offers.`,
        },
        {
          heading: 'Assumptions',
          body: `The calculator assumes a **fixed** interest rate for the whole term and regular monthly payments. The down payment and fees are added to the total cost, and insurance, late fees or early-repayment charges are not included.
        
Results are estimates and do not cover exchange-rate changes or local regulations. Always check the contract terms with the lender before deciding, and seek professional advice when in doubt.`,
        },
      ],
      keyTakeaways: [
        'The monthly payment covers principal and interest only, not insurance or monthly charges.',
        'The actual loan amount is the price minus the down payment.',
        'A larger down payment lowers both the payment and total interest.',
        'Compare financing offers on total cost, not just the monthly payment.',
        'Results assume a fixed rate and regular payments.',
      ],
      faqs: [
        {
          q: 'Does the monthly payment include insurance?',
          a: 'Insurance and monthly charges are only included if you add them to the fees. Ask the lender about additional costs before committing.',
        },
        {
          q: 'What if the interest rate is variable?',
          a: 'The calculator assumes a fixed rate. On a variable-rate loan, use an estimated rate and expect payments to move with the rate.',
        },
        {
          q: 'Does the schedule match the official statement?',
          a: 'The table shows an approximate balance that may differ slightly from the lender\u2019s statement due to rounding and actual fees, so treat it as a planning reference.',
        },
      ],
      relatedCalculators: ['mortgage', 'loan-payment', 'early-payoff'],
      lastReviewed: '2026-08-10',
    },
  },

  'how-to-compare-loan-offers': {
    ar: {
      slug: 'how-to-compare-loan-offers',
      locale: 'ar',
      title: 'كيف تقارن عروض القروض',
      metaDescription:
        'دليل عملي لمقارنة عروض القروض بالقسط الشهري والتكلفة الكلية معاً، مع مثال عددي مطابق لحاسبة مقارنة القروض.',
      intro:
        'اختيار القرض الأرخص ليس مجرد مقارنة أسعار فائدة: المدة والرسوم يغيران الصورة كلياً. يشرح هذا الدليل الأرقام التي يجب أن تقارنها، ولماذا قد يكون العرض ذو القسط الأصغر أغلى في النهاية. يتبع المثال الوارد هنا نفس القيم التي تستخدمها حاسبة مقارنة القروض في كلار.',
      sections: [
        {
          heading: 'الأرقام التي يجب مقارنتها',
          body: `عند مقارنة عروض القروض انظر إلى ثلاث أرقام معاً: **القسط الشهري** (لقياس ملاءمته لدخلك)، **إجمالي الفائدة** (تكلفة الاقتراض)، و**التكلفة الكلية** وهي الأقساط مضافاً إليها الرسوم. القاعدة الذهبية: قارن العروض على **نفس مبلغ القرض**، وإلا كانت المقارنة غير عادلة.
        
حاسبة مقارنة القروض تعرض هذين العرضين جنباً إلى جنب وتُظهر الفرق في التكلفة مباشرة.`,
        },
        {
          heading: 'لماذا القسط الأصغر قد يكون أغلى',
          body: `العرض ذو المدة الأطول يعطي قسطاً شهرياً أصغر لأن سداد المبلغ موزع على أشهر أكثر، لكنه يدفع فائدة أكبر في المجمل. والعرض ذو الرسوم الأعلى قد يبدو أرخص من ناحية الفائدة ويزيد تكلفته الكلية.
        
قارن دائماً التكلفة الكلية (الأقساط + الرسوم) كمعيار أساسي، ثم استخدم القسط الشهري لتقييم القدرة على السداد.`,
        },
        {
          heading: 'مثال عملي',
          body: `لنأخذ مثالاً مطابقاً لقيم الحاسبة: قرض بقيمة **50,000 دينار**. العرض الأول بفائدة **6% سنوياً** لمدة **5 سنوات** ورسوم **300 دينار**، والعرض الثاني بفائدة **7.5% سنوياً** لمدة **5 سنوات** بلا رسوم.
        
قسط العرض الأول ≈ **966.64 دينار** وتكلفته ≈ **58,298 ديناراً**، بينما قسط العرض الثاني ≈ **1,001.90 دينار** وتكلفته ≈ **60,114 ديناراً**. الفرق في التكلفة ≈ **−1,815 ديناراً** لصالح العرض الأول، رغم أن الفرق في القسط الشهري يبدو صغيراً.`,
        },
        {
          heading: 'عندما تختلف المدد',
          body: `يمكن مقارنة عرضين بمدد مختلفة، لكن انتبه أن المدة الأطول تقلل القسط وترفع إجمالي الفائدة معاً. لتقارن بدقة، اسأل نفسك: هل أفضّل قسطاً أعلى لفترة أقصر، أم قسطاً أقل لفترة أطول؟ الإجابة تعتمد على دخلك الشهري وخطتك المالية.
        
إذا كانت العروض مختلفة في مبالغ القرض، احسب كل عرض منفصلاً وقارن النسب والتكاليف النسبية.`,
        },
        {
          heading: 'افتراضات المقارنة',
          body: `تفترض المقارنة سعر فائدة **ثابتاً** وسداداً شهرياً منتظماً، وأن الرسوم المدخلة تُضاف إلى التكلفة الكلية. النتائج تقديرية ولا تشمل رسوماً قد تظهر لاحقاً كرسوم السداد المبكر أو غرامات التأخير.
        
تحقق من شروط كل عرض لدى المُقرِض، بما فيها أي شروط خفية، قبل اتخاذ القرار النهائي.`,
        },
      ],
      keyTakeaways: [
        'قارن التكلفة الكلية (الأقساط + الرسوم) وليس القسط الشهري وحده.',
        'المقارنة العادلة تكون على نفس مبلغ القرض.',
        'المدة الأطول تقلل القسط وترفع إجمالي الفائدة معاً.',
        'الرسوم تدخل في التكلفة الكلية وتغير صورة المقارنة.',
        'تحقق من الشروط الخفية لدى المُقرِض قبل التوقيع.',
      ],
      faqs: [
        {
          q: 'أي رقم هو الأهم عند الاختيار؟',
          a: 'التكلفة الكلية هي المعيار الأساسي، يليها القسط الشهري من حيث ملاءمته لدخلك. سعر الفائدة وحده لا يروي القصة كاملة.',
        },
        {
          q: 'هل يمكن مقارنة عرضين بمبلغين مختلفين؟',
          a: 'صُممت الحاسبة لمقارنة عرضين على نفس المبلغ. لمبالغ مختلفة احسب كل عرض على حدة ثم قارن النسب.',
        },
        {
          q: 'ماذا لو كان أحد العرضين بلا رسوم؟',
          a: 'أدخل صفراً في رسوم ذلك العرض، وستظهر التكلفة الكلية صافية لتعكس الفرق بدقة.',
        },
      ],
      relatedCalculators: ['loan-comparison', 'loan-payment', 'early-payoff'],
      lastReviewed: '2026-08-10',
    },
    en: {
      slug: 'how-to-compare-loan-offers',
      locale: 'en',
      title: 'How to compare loan offers',
      metaDescription:
        'A practical guide to comparing loan offers by monthly payment and total cost together, with a worked example matching the loan comparison calculator.',
      intro:
        'Choosing the cheapest loan is not just about comparing interest rates: the term and fees change the picture completely. This guide explains which numbers to compare and why the offer with the smaller payment can end up costing more. The worked example mirrors the values used by Klar’s loan comparison calculator.',
      sections: [
        {
          heading: 'The numbers to compare',
          body: `When comparing loan offers, look at three numbers together: the **monthly payment** (to judge whether it fits your income), **total interest** (the cost of borrowing), and the **total cost** — the payments plus fees. The golden rule: compare offers on the **same loan amount**, otherwise the comparison is unfair.
        
The loan comparison calculator places two offers side by side and shows the cost difference directly.`,
        },
        {
          heading: 'Why the smaller payment can cost more',
          body: `An offer with a longer term gives a smaller monthly payment because the amount is spread over more months, but it pays more interest overall. And an offer with higher fees can look cheaper on interest while costing more in total.
        
Always compare the total cost (payments + fees) as the primary criterion, then use the monthly payment to gauge affordability.`,
        },
        {
          heading: 'A worked example',
          body: `Using the same values as the calculator: a **50,000 dinar** loan. Offer A at **6% per year** for **5 years** with **300 dinars** in fees, and offer B at **7.5% per year** for **5 years** with no fees.
        
Offer A\u2019s payment is about **966.64 dinars** and its cost about **58,298 dinars**, while offer B\u2019s payment is about **1,001.90 dinars** and its cost about **60,114 dinars**. The cost difference is about **\u22121,815 dinars** in favor of offer A, even though the monthly gap looks small.`,
        },
        {
          heading: 'When the terms differ',
          body: `You can compare two offers with different terms, but note that the longer term lowers the payment and raises total interest at the same time. Ask yourself: would I prefer a higher payment over a shorter period, or a lower payment over a longer one? The answer depends on your income and plans.
        
If the offers have different loan amounts, run each separately and compare the rates and relative costs.`,
        },
        {
          heading: 'Assumptions',
          body: `The comparison assumes a **fixed** interest rate and regular monthly payments, with the entered fees added to the total cost. Results are estimates and do not cover charges that may appear later, such as early-payoff fees or late penalties.
        
Check each offer\u2019s terms with the lender, including any hidden conditions, before making a final decision.`,
        },
      ],
      keyTakeaways: [
        'Compare total cost (payments + fees), not just the monthly payment.',
        'A fair comparison uses the same loan amount.',
        'A longer term lowers the payment and raises total interest.',
        'Fees count toward total cost and change the picture.',
        'Check for hidden terms with the lender before signing.',
      ],
      faqs: [
        {
          q: 'Which number matters most?',
          a: 'Total cost is the primary criterion, followed by how well the monthly payment fits your income. The interest rate alone does not tell the whole story.',
        },
        {
          q: 'Can I compare two offers with different amounts?',
          a: 'The calculator is designed to compare offers on the same amount. For different amounts, run each separately and compare the rates.',
        },
        {
          q: 'What if one offer has no fees?',
          a: 'Enter 0 for that offer\u2019s fees and the total cost will reflect the difference accurately.',
        },
      ],
      relatedCalculators: ['loan-comparison', 'loan-payment', 'early-payoff'],
      lastReviewed: '2026-08-10',
    },
  },

  'how-early-loan-payoff-works': {
    ar: {
      slug: 'how-early-loan-payoff-works',
      locale: 'ar',
      title: 'كيف يعمل السداد المبكر للقرض',
      metaDescription:
        'دليل عملي لفهم أثر الدفعات الإضافية على القرض: تقصير المدة وتوفير الفائدة، مع مثال عددي مطابق لحاسبة السداد المبكر.',
      intro:
        'الدفعة الإضافية الصغيرة شهرياً على قرضك قد تختصر سنوات من مدة السداد وتوفر مبالغ من الفائدة أكبر مما تتصور. يشرح هذا الدليل كيف يعمل السداد المبكر، ومتى يستحق فعلاً، وما الافتراضات التي تقوم عليها النتيجة. يتبع المثال الوارد هنا نفس القيم التي تستخدمها حاسبة السداد المبكر في كلار.',
      sections: [
        {
          heading: 'إلى أين تذهب الدفعة الإضافية؟',
          body: `عندما تسدد قسطاً، تُحتسب **الفائدة الشهرية** على الرصيد المتبقي أولاً، ثم يذهب الباقي إلى **أصل الدين**. الدفعة الإضافية تُضاف إلى هذا الباقي فتخفض أصل الدين مباشرة، أي تخفض الرصيد الذي تُحسب عليه الفائدة في الأشهر التالية.
        
هذا هو جوهر السداد المبكر: كل دفعة إضافية تقلل الأساس الذي تنمو عليه الفائدة، فتنخفض الفائدة في كل شهر لاحق.`,
        },
        {
          heading: 'لماذا توفر الفائدة بهذه السرعة؟',
          body: `لأن الفائدة تُحتسب على الرصيد المتبقي، فإن إنقاص الرصيد مبكراً له أثر تراكمي: تدفع فائدة أقل هذا الشهر، فيبقى من رصيدك أقل مما لو لم تدفع، فتكون الفائدة الشهر القادم أقل أيضاً. هذا الأثر يتراكم شهراً بعد شهر حتى النهاية.
        
لهذا، الدفعات الإضافية في **السنوات الأولى** من القرض توفر فائدة أكثر من دفعات مماثلة قرب نهاية المدة، لأن الرصيد الذي تقلصه ما زال كبيراً.`,
        },
        {
          heading: 'مثال عملي',
          body: `لنأخذ مثالاً مطابقاً لقيم الحاسبة: قرض بقيمة **20,000 دينار** بفائدة **6% سنوياً** ولمدة **5 سنوات**، مع دفعة إضافية شهرية **100 دينار**.
        
القسط الشهري الأساسي ≈ **386.66 دينار** والمدة الأساسية **60 شهراً**. مع الدفعة الإضافية تقصر المدة إلى نحو **54 شهراً** وتوفر فائدة تزيد على **500 دينار**، بأثر لا يظهر لو اقتصرت على القسط الأساسي.`,
        },
        {
          heading: 'متى لا يكون السداد المبكر مفيداً؟',
          body: `على قرض **بدون فائدة** لن توفر فائدة، لكن مدة السداد ستقصر ببساطة. وإذا كان لدى المُقرِض **رسوم سداد مبكر** فقد تلتهم جزءاً من الوفورات، خاصة إذا كانت رسوماً ثابتة كبيرة.
        
قارن دائماً الوفورات المتوقعة مع الرسوم، واستشر المُقرِض بشأن سياسة السداد المبكر قبل الالتزام بدفعات إضافية.`,
        },
        {
          heading: 'افتراضات الحساب',
          body: `تفترض الحاسبة فائدة **ثابتة** ودفعة إضافية **ثابتة شهرياً** تُدفع بجانب القسط الأساسي، وأن الرصيد يُخفَّض بعد احتساب الفائدة الشهرية. النتائج تقديرية وقد تختلف عن كشف المُقرِض بسبب رسوم السداد المبكر أو تغير سعر الفائدة.
        
استخدم النتيجة كمقدّرة للتخطيط، وتحقق من شروط عقدك الفعلية.`,
        },
      ],
      keyTakeaways: [
        'الدفعة الإضافية تقلص أصل الدين بعد احتساب الفائدة الشهرية.',
        'الوفورات تتراكم لأن الفائدة تُحسب على رصيد أصغر شهراً بعد شهر.',
        'الدفعات الإضافية في السنوات الأولى توفر فائدة أكثر.',
        'على القرض بدون فائدة يقصر الأجل فقط دون وفرة.',
        'انتبه لرسوم السداد المبكر التي قد يفرضها المُقرِض.',
      ],
      faqs: [
        {
          q: 'هل تذهب الدفعة الإضافية كاملة إلى أصل الدين؟',
          a: 'يُقتطع القسط الشهري (الأساسي + الإضافي) لتغطية الفائدة أولاً ثم أصل الدين؛ الإضافي يسرّع تقليص الرصيد ويقلل الفائدة المستقبلية.',
        },
        {
          q: 'ماذا لو دفعت مبلغاً إضافياً مرة واحدة؟',
          a: 'الحاسبة تفترض دفعة شهرية ثابتة. للدفعة الواحدة الأثر أصغر، لكنه يتصرف بالمبدأ نفسه: تقليص الرصيد اليوم يوفر فائدة لاحقاً.',
        },
        {
          q: 'هل ينفع السداد المبكر على كل القروض؟',
          a: 'ينفع غالباً على القروض ذات الفائدة، خصوصاً في بدايتها. على القروض بدون فائدة أو مع رسوم سداد مبكر عالية، قد لا يكون مبرراً مالياً.',
        },
      ],
      relatedCalculators: ['early-payoff', 'loan-payment', 'mortgage'],
      lastReviewed: '2026-08-10',
    },
    en: {
      slug: 'how-early-loan-payoff-works',
      locale: 'en',
      title: 'How early loan payoff works',
      metaDescription:
        'A practical guide to how extra payments affect your loan — a shorter term and less interest — with a worked example matching the early payoff calculator.',
      intro:
        'A small extra monthly payment on your loan can shave years off the term and save more interest than you might expect. This guide explains how early payoff works, when it is actually worthwhile, and the assumptions behind the result. The worked example mirrors the values used by Klar’s early payoff calculator.',
      sections: [
        {
          heading: 'Where the extra payment goes',
          body: `When you make a payment, **monthly interest** is charged on the remaining balance first, then the rest goes to the **principal**. An extra payment adds to that remainder, reducing the principal directly — which lowers the balance on which future interest is charged.
        
That is the essence of early payoff: each extra payment shrinks the base on which interest grows, so interest falls in every following month.`,
        },
        {
          heading: 'Why interest falls so fast',
          body: `Because interest is charged on the remaining balance, reducing it early has a compounding effect: you pay less interest this month, so your balance is lower than it would otherwise be, and next month\u2019s interest is lower too. The effect builds month after month.
        
That is why extra payments in the **early years** of a loan save more interest than similar payments near the end: the balance you reduce is still large.`,
        },
        {
          heading: 'A worked example',
          body: `Using the same values as the calculator: a **20,000 dinar** loan at **6% per year** for **5 years**, with an extra **100 dinars** each month.
        
The baseline payment is about **386.66 dinars** over **60 months**. With the extra payment the term drops to about **54 months**, saving over **500 dinars** in interest — savings that never appear if you stick to the base payment.`,
        },
        {
          heading: 'When early payoff is not worth it',
          body: `On a **zero-interest** loan you save no interest, though the term still shortens. And if your lender charges **early-payoff fees**, they may eat into the savings, especially fixed fees.
        
Always weigh the expected savings against the fees, and ask the lender about their early-payoff policy before committing to extra payments.`,
        },
        {
          heading: 'Assumptions',
          body: `The calculator assumes a **fixed** rate and a **constant monthly** extra payment made alongside the base payment, with the balance reduced after monthly interest is charged. Results are estimates and may differ from your lender\u2019s statement due to early-payoff fees or rate changes.
        
Use the result as a planning estimate and check the actual terms of your contract.`,
        },
      ],
      keyTakeaways: [
        'An extra payment reduces the principal after monthly interest is charged.',
        'Savings compound because interest is charged on a smaller balance each month.',
        'Extra payments in the early years save the most interest.',
        'On a zero-interest loan only the term shortens — no interest is saved.',
        'Watch out for early-payoff fees from your lender.',
      ],
      faqs: [
        {
          q: 'Does the whole extra payment go to the principal?',
          a: 'The monthly payment (base plus extra) covers interest first, then principal; the extra speeds up the balance reduction and lowers future interest.',
        },
        {
          q: 'What if I only pay extra once?',
          a: 'The calculator assumes a constant monthly extra. A one-off payment has a smaller effect, but works the same way: reducing the balance today saves interest later.',
        },
        {
          q: 'Is early payoff worth it on every loan?',
          a: 'Usually on interest-bearing loans, especially early in the term. On zero-interest loans or loans with high early-payoff fees it may not make financial sense.',
        },
      ],
      relatedCalculators: ['early-payoff', 'loan-payment', 'mortgage'],
      lastReviewed: '2026-08-10',
    },
  },

  'how-to-calculate-zakat': {
    ar: {
      slug: 'how-to-calculate-zakat',
      locale: 'ar',
      title: 'كيف تحسب الزكاة',
      metaDescription:
        'دليل عملي لحساب زكاتك: جمع النقود والذهب والاستثمارات، خصم الالتزامات، واحتساب 2.5%، مع مثال عددي مطابق لحاسبة الزكاة.',
      intro:
        'حساب الزكاة أسهل مما يبدو: اجمع مصادر مالك الخاضع للزكاة، اخصم الالتزامات المستحقة، وطبّق نسبة 2.5% على الناتج. يشرح هذا الدليل الخطوات بدقة، وأين تتدخل مسؤوليتك في النصاب والحول، ويلتزم في مثاله العددي بنفس قيم حاسبة الزكاة في كلار.',
      sections: [
        {
          heading: 'ما الذي يدخل في وعاء الزكاة؟',
          body: `وعاء الزكاة هو مجموع المال الذي بلغ النصاب وحال عليه الحول الهجري. تشمل الحاسبة ثلاث فئات رئيسية: **النقود والمدخرات** النقدية والبنكية، **قيمة الذهب** المدخر بسعر السوق الحالي، و**الاستثمارات** كالأسهم والصكوك.
        
أضف أي فئة أخرى تسعى لها الزكاة ضمن الفئات المناسبة، وتأكد من إدخال كل مصدر بقيمته الحالية لا بتاريخ الشراء.`,
        },
        {
          heading: 'خصم الالتزامات',
          body: `تُخصم **الالتزامات المستحقة** من إجمالي المال قبل احتساب الزكاة، لأن الزكاة تُدفع عما يزيد على ما عليك. الالتزام المستحق هو الدين الواجب سداده الآن، لا القروض طويلة الأجل بمددها الممتدة.
        
إذا تجاوزت الالتزامات مجموع المال، يصبح الوعاء صفراً ولا تستحق زكاة في هذا الحساب.`,
        },
        {
          heading: 'تطبيق النسبة',
          body: `النسبة المعتمدة عن النقود والذهب والاستثمارات هي **2.5%** من وعاء الزكاة، أي ربع العشر. تُحسب الحاسبة الناتج مباشرة: وعاء الزكاة × 2.5%.
        
حقل **النصاب** في الحاسبة إعلامي فقط ولا يؤثر في النتيجة: أدخل فيه المال الذي تجاوز النصاب، لكن المبلغ المحسوب يعتمد على الوعاء المدخل أعلاه.`,
        },
        {
          heading: 'مثال عملي',
          body: `لنأخذ مثالاً مطابقاً لقيم الحاسبة: نقود ومدخرات **10,000 دينار**، وقيمة ذهب **5,000 دينار**، واستثمارات **2,000 دينار**، والتزامات مستحقة **1,000 دينار**.
        
الوعاء = 10,000 + 5,000 + 2,000 − 1,000 = **16,000 دينار**، والزكاة المستحقة = 16,000 × 2.5% = **400 دينار**.`,
        },
        {
          heading: 'مسؤولية النصاب والحول',
          body: `الحاسبة لا تتحقق من شرطين يقعان على عاتقك: **بلوغ النصاب** (حد أدنى يقدر غالباً بقيمة 85 غراماً من الذهب) و**مرور الحول الهجري** كاملاً على المال. النصاب المعاصر يُحدد بسعر الذهب السائد في يوم إخراج الزكاة.
        
تحقق من هذين الشرطين قبل اعتبار النتيجة واجبة الإخراج، فالحاسبة تعطي المبلغ المستحق عن الوعاء المدخل فقط.`,
        },
        {
          heading: 'مستجدات وأسئلة شائعة',
          body: `قيمة الذهب تُحتسب **بسعر السوق الحالي**، ولزكاة الأصول التجارية وعروض البيع أصولها ونسبها الخاصة خارج نطاق هذه الحاسبة. أخطاء شائعة: حساب الزكاة على إجمالي المدخرات دون خصم الالتزامات، ونسيان إدخال الذهب أو الاستثمارات ضمن الوعاء.
        
هذه أداة إرشادية عامة، وعند الاختلاف في التفاصيل الشرعية استشر من تثق بعلمه.`,
        },
      ],
      keyTakeaways: [
        'وعاء الزكاة = النقود + الذهب + الاستثمارات − الالتزامات المستحقة.',
        'النسبة المعتمدة عن الأموال هي 2.5% من الوعاء.',
        'الالتزامات تُخصم قبل الاحتساب، وقد يجعلها تجاوز المال وعاءً صفرياً.',
        'النصاب والحول الهجري مسؤوليتك ولا تتحقق منهما الحاسبة.',
        'الذهب يُقوَّم بسعر السوق الحالي.',
      ],
      faqs: [
        {
          q: 'ما هو النصاب؟',
          a: 'حد أدنى من المال تجب عنده الزكاة، يقدر غالباً بقيمة 85 غراماً من الذهب. حقل النصاب في الحاسبة إعلامي، وتتحقق من الشرط بنفسك.',
        },
        {
          q: 'هل تتابع الحاسبة مرور الحول؟',
          a: 'لا. تحسب المبلغ عن الوعاء المدخل فقط، ويبقى التحقق من الحول والنصاب مسؤوليتك.',
        },
        {
          q: 'هل تشمل الأصول التجارية؟',
          a: 'لا. الحاسبة معنية بالنقود والذهب والاستثمارات، ولزكاة التجارة أصولها الخاصة.',
        },
      ],
      relatedCalculators: ['zakat', 'retirement-savings', 'savings-goal'],
      lastReviewed: '2026-08-10',
    },
    en: {
      slug: 'how-to-calculate-zakat',
      locale: 'en',
      title: 'How to calculate zakat',
      metaDescription:
        'A practical guide to calculating your zakat: add cash, gold and investments, subtract liabilities, and apply 2.5%, with a worked example matching the zakat calculator.',
      intro:
        'Calculating zakat is simpler than it looks: add your zakatable wealth, subtract outstanding liabilities, and apply the 2.5% rate to the result. This guide walks through each step, where your responsibility for nisab and the lunar year begins, and sticks to the same numbers used by Klar’s zakat calculator.',
      sections: [
        {
          heading: 'What goes into the zakat base?',
          body: `The zakat base is the wealth that reaches the nisab and completes a lunar (Hijri) year. The calculator covers three main categories: **cash and savings**, gold held as savings at the current market price, and **investments** such as shares and sukuk.
        
Add any other zakatable category in the appropriate field, and always enter current values rather than purchase prices.`,
        },
        {
          heading: 'Subtracting liabilities',
          body: `**Outstanding liabilities** are subtracted from total wealth before zakat is computed, because zakat is paid on what exceeds what you owe. A due liability is a debt payable now, not a long-term loan spread over its full term.
        
If liabilities exceed the total wealth, the base becomes zero and no zakat is due in this calculation.`,
        },
        {
          heading: 'Applying the rate',
          body: `The standard rate on cash, gold and investments is **2.5%** of the zakat base — one fortieth. The calculator works it out directly: zakat base × 2.5%.
        
The **nisab** field is informational only and does not affect the result: enter the wealth above nisab there, but the computed amount depends on the base entered above.`,
        },
        {
          heading: 'A worked example',
          body: `Using the same values as the calculator: cash and savings of **10,000 dinars**, gold worth **5,000 dinars**, investments of **2,000 dinars**, and outstanding liabilities of **1,000 dinars**.
        
The base is 10,000 + 5,000 + 2,000 \u2212 1,000 = **16,000 dinars**, and the zakat due is 16,000 \u00d7 2.5% = **400 dinars**.`,
        },
        {
          heading: 'Nisab and the lunar year are your call',
          body: `The calculator does not check two conditions that rest on you: **reaching the nisab** (a threshold often estimated at the value of 85 grams of gold) and the **passing of a full lunar year** over the wealth. The contemporary nisab is set by the prevailing gold price on the day zakat is paid.
        
Verify both conditions before treating the result as due; the calculator only gives the amount owed on the base you entered.`,
        },
        {
          heading: 'Practical notes',
          body: `Gold is valued **at the current market price**, and zakat on trade assets and inventory has its own basis and rates outside this calculator. Common mistakes: computing zakat on total savings without subtracting liabilities, and forgetting to include gold or investments in the base.
        
This is a general reference tool; where details differ, consult someone whose knowledge you trust.`,
        },
      ],
      keyTakeaways: [
        'Zakat base = cash + gold + investments \u2212 outstanding liabilities.',
        'The standard rate on wealth is 2.5% of the base.',
        'Liabilities are subtracted first, and can reduce the base to zero.',
        'Nisab and the lunar year are your responsibility, not tracked by the calculator.',
        'Gold is valued at the current market price.',
      ],
      faqs: [
        {
          q: 'What is the nisab?',
          a: 'A minimum wealth threshold at which zakat becomes due, often estimated at the value of 85 grams of gold. The nisab field in the calculator is informational; you check the condition yourself.',
        },
        {
          q: 'Does the calculator track the passing of a lunar year?',
          a: 'No. It computes the amount on the base you entered only, and checking the lunar year and nisab remains your responsibility.',
        },
        {
          q: 'Are business assets included?',
          a: 'No. The calculator covers cash, gold and investments, and trade zakat has its own basis.',
        },
      ],
      relatedCalculators: ['zakat', 'retirement-savings', 'savings-goal'],
      lastReviewed: '2026-08-10',
    },
  },

  'how-to-plan-retirement-savings': {
    ar: {
      slug: 'how-to-plan-retirement-savings',
      locale: 'ar',
      title: 'كيف تخطط لمدخرات التقاعد',
      metaDescription:
        'دليل عملي لتقدير مدخرات التقاعد: المساهمة الشهرية والفائدة المركبة والعائد السنوي، مع مثال عددي مطابق لحاسبة مدخرات التقاعد.',
      intro:
        'سر مدخرات التقاعد هو الوقت والفائدة المركبة: مساهمة شهرية متواضعة تنمو بصمت على مدى عقود لتكوّن رصيداً كبيراً. يشرح هذا الدليل كيف تُبنى النتيجة، وكيف تُدخل العائد بشكل صحيح، ومتى تكون التقديرات مضللة. يلتزم مثاله العددي بنفس قيم حاسبة مدخرات التقاعد في كلار.',
      sections: [
        {
          heading: 'الفائدة المركبة الشهرية',
          body: `الفائدة تُركّب شهرياً: في نهاية كل شهر تُضاف مساهمتك، ثم يرتفع الرصيد بالعائد الشهري (العائد السنوي ÷ 12). العائد يعمل على الرصيد الكامل، فيشمل العائد نفسه الذي راكمته الأشهر السابقة.
        
هذا التراكم هو ما يحول المدخرات المتواضعة إلى رصيد كبير: نحو ثلثي الرصيد في المثال أدناه يأتي من العائد لا من مساهماتك.`,
        },
        {
          heading: 'إدخال العائد السنوي',
          body: `أدخل **العائد السنوي المتوقع كنسبة مئوية** في حقل العائد، مثل 6 للدلالة على 6%. الحاسبة تحوله إلى عائد شهري تلقائياً.
        
خطأ شائع يضخم النتيجة: إدخال العائد الشهري مباشرة في حقل العائد السنوي. تذكر أن الحقل سنوي، وضعه كما تفكر به على مدار العام.`,
        },
        {
          heading: 'المساهمة الشهرية الثابتة',
          body: `تفترض الحاسبة **مساهمة شهرية ثابتة** تُضاف في نهاية كل شهر، و**مدخرات حالية** تُترك دون سحب. إن كانت مساهماتك متغيرة، استخدم متوسطاً تقريبياً واعلم أن النتيجة تصبح تقديرية.
        
رفع المساهمة الشهرية في سنواتك الأولى أثر مضاعف أكبر من رفعها لاحقاً، لأن العائد يتفاعل معها لوقت أطول.`,
        },
        {
          heading: 'مثال عملي',
          body: `لنأخذ مثالاً مطابقاً لقيم الحاسبة: مدخرات حالية **10,000 دينار**، ومساهمة شهرية **200 دينار**، وعائد سنوي **6%**، ولمدة **20 سنة**.
        
الرصيد المتوقع عند التقاعد ≈ **125,510 ديناراً**. إجمالي مساهماتك ≈ **58,000 دينار** (المدخرات الحالية + المساهمات)، والعائد المكتسب ≈ **67,510 ديناراً**.`,
        },
        {
          heading: 'العائد غير مضمون والتضخم',
          body: `العوائد **غير مضمونة**، وقد تختلف النتيجة كثيراً إذا تحقق العائد الفعلي دون المتوقع. الحاسبة تعرض رقماً **اسمياً** لا يخصم التضخم، فالقوة الشرائية عند التقاعد ستكون أقل مما يظهر إن بقي التضخم.
        
لتقدير بالقوة الشرائية اليوم، اطرح معدل التضخم المتوقع من العائد السنوي قبل إدخاله.`,
        },
        {
          heading: 'أخطاء شائعة',
          body: `من أكثر الأخطاء: استخدام العائد الشهري في حقل العائد السنوي، ونسيان خصم الرسوم الإدارية والضرائب من العائد الصافي، والاعتماد على عائد متفائل غير واقعي، وتجاهل التضخم عند تقييم الرصيد الاسمي.
        
هذه أداة تخطيط عامة: النتائج تقديرية ولا تُعد نصيحة استثمارية.`,
        },
      ],
      keyTakeaways: [
        'الفائدة تُركّب شهرياً على الرصيد المتنامي.',
        'أدخل العائد السنوي كنسبة مئوية وتتحول الحاسبة إلى عائد شهري.',
        'تفترض الحاسبة مساهمة شهرية ثابتة ومدخرات حالية دون سحب.',
        'العائد غير مضمون والتضخم يقلل القوة الشرائية للرصيد.',
        'لا تخلط العائد الشهري بالسنوي عند الإدخال.',
      ],
      faqs: [
        {
          q: 'هل العائد بعد التضخم أم قبله؟',
          a: 'الحاسبة تستخدم عائداً اسمياً كما تدخله ولا تخصم التضخم. لرقم بالقوة الشرائية اليوم، اطرح معدل التضخم المتوقع من العائد السنوي.',
        },
        {
          q: 'ماذا لو كانت مساهماتي غير منتظمة؟',
          a: 'تفترض الحاسبة مساهمة ثابتة شهرياً. للمساهمات المتغيرة استخدم متوسطاً تقريبياً واعتبر النتيجة تقديرية.',
        },
        {
          q: 'هل تشمل النتيجة أصولاً أخرى كالعقار؟',
          a: 'لا. تحسب النقد فقط: مدخراتك الحالية ومساهمتك الشهرية دون أصول أخرى.',
        },
      ],
      relatedCalculators: ['retirement-savings', 'compound-interest', 'savings-goal'],
      lastReviewed: '2026-08-10',
    },
    en: {
      slug: 'how-to-plan-retirement-savings',
      locale: 'en',
      title: 'How to plan retirement savings',
      metaDescription:
        'A practical guide to projecting retirement savings: monthly contributions, compound interest and annual return, with a worked example matching the retirement savings calculator.',
      intro:
        'The secret of retirement savings is time and compound interest: a modest monthly contribution grows silently over decades into a large balance. This guide explains how the result is built, how to enter the return correctly, and when estimates mislead. Its worked example sticks to the same values used by Klar’s retirement savings calculator.',
      sections: [
        {
          heading: 'Monthly compounding',
          body: `Interest compounds monthly: at the end of each month your contribution is added, then the balance grows by the monthly rate (annual return \u00f7 12). The return applies to the whole balance, including the interest earned in earlier months.
        
This compounding is what turns modest savings into a large balance: about two thirds of the balance in the example below comes from the return, not from your contributions.`,
        },
        {
          heading: 'Entering the annual return',
          body: `Enter the **expected annual return as a percentage** in the return field — for example 6 to mean 6%. The calculator converts it to a monthly rate automatically.
        
A common mistake that inflates the result: entering the monthly rate directly into the annual field. Remember the field is annual; think in terms of a full year.`,
        },
        {
          heading: 'A fixed monthly contribution',
          body: `The calculator assumes a **fixed monthly contribution** added at the end of each month, and **current savings** left untouched. If your contributions vary, use a rough average and treat the result as an estimate.
        
Raising your contribution in your early years has a larger compounded effect than raising it later, because the return works on it for longer.`,
        },
        {
          heading: 'A worked example',
          body: `Using the same values as the calculator: current savings of **10,000 dinars**, a monthly contribution of **200 dinars**, an annual return of **6%**, over **20 years**.
        
The projected retirement balance is about **125,510 dinars**. Your total contributions are about **58,000 dinars** (current savings plus contributions), and the interest earned about **67,510 dinars**.`,
        },
        {
          heading: 'Returns are not guaranteed, and inflation',
          body: `Returns are **not guaranteed**, and the result shifts a lot if the actual return comes in below the expectation. The calculator shows a **nominal** figure that does not deduct inflation, so the purchasing power at retirement will be lower than shown if inflation persists.
        
For an estimate in today\u2019s purchasing power, subtract your expected inflation rate from the annual return before entering it.`,
        },
        {
          heading: 'Common mistakes',
          body: `Among the most common: using the monthly rate in the annual return field, forgetting to deduct management fees and taxes from the net return, relying on an unrealistic optimistic return, and ignoring inflation when judging the nominal balance.
        
This is a general planning tool: results are estimates and are not investment advice.`,
        },
      ],
      keyTakeaways: [
        'Interest compounds monthly on the growing balance.',
        'Enter the annual return as a percentage; the calculator converts to monthly.',
        'The calculator assumes a fixed monthly contribution and untouched current savings.',
        'Returns are not guaranteed and inflation erodes purchasing power.',
        'Do not confuse the monthly rate with the annual one when entering it.',
      ],
      faqs: [
        {
          q: 'Is the return after or before inflation?',
          a: 'The calculator uses the nominal return as entered and does not deduct inflation. For a figure in today\u2019s purchasing power, subtract your expected inflation rate from the annual return.',
        },
        {
          q: 'What if my contributions are irregular?',
          a: 'The calculator assumes a fixed monthly contribution. For variable amounts, use a rough average and treat the result as an estimate.',
        },
        {
          q: 'Does the result include other assets like property?',
          a: 'No. It covers cash only: your current savings and monthly contribution, with no other assets.',
        },
      ],
      relatedCalculators: ['retirement-savings', 'compound-interest', 'savings-goal'],
      lastReviewed: '2026-08-10',
    },
  },

  'how-to-calculate-debt-to-income': {
    ar: {
      slug: 'how-to-calculate-debt-to-income',
      locale: 'ar',
      title: 'كيف تحسب نسبة الدين إلى الدخل',
      metaDescription:
        'دليل عملي لحساب نسبة الدين إلى الدخل: تقسيم أقساط الديون الشهرية على الدخل الإجمالي، مع مثال عددي مطابق للحاسبة ومعايير المقرضين.',
      intro:
        'نسبة الدين إلى الدخل (DTI) رقم واحد يلخص ضغط ديونك على دخلك، وهو معيار يستخدمه المقرضون لتقييم طلبات التمويل. يشرح هذا الدليل طريقة الحساب، وأي الأرقام تُدخل في النسبة وأيها خارجها، وماذا تعني النتيجة. يلتزم مثاله العددي بنفس قيم حاسبة نسبة الدين إلى الدخل في كلار.',
      sections: [
        {
          heading: 'معادلة النسبة',
          body: `نسبة الدين إلى الدخل = **أقساط الديون الشهرية ÷ الدخل الإجمالي الشهري × 100**. النتيجة تُعرض كنسبة مئوية، مع **الدخل المتبقي** وهو دخلك الإجمالي ناقص الأقساط.
        
مثال سريع: أقساط 400 دينار ودخل 2,000 دينار تعطي نسبة **20%** ودخلاً متبقياً **1,600 دينار**.`,
        },
        {
          heading: 'أي الأرقام تدخل في الأقساط؟',
          body: `ادخل **إجمالي التزاماتك الشهرية**: أقساط القروض، وحدود الائتمان، والحد الأدنى لدفعات البطاقات، وأي سداد مطلوب شهرياً. لا تُدخل تكاليف المعيشة كالإيجار والطعام والفواتير، فالنسبة معنية بالديون فقط.
        
احرص على تضمين الحد الأدنى للبطاقات حتى لو كان صغيراً، فالنسيان المشترك يخفي الضغط الحقيقي على دخلك.`,
        },
        {
          heading: 'الدخل الإجمالي لا الصافي',
          body: `قسمة النسبة تكون على **الدخل الإجمالي قبل الضرائب والخصومات**، وهو ما يستخدمه المقرضون عادة. استخدام الدخل الصافي بعد الخصومات يرفع النسبة الظاهرة ويجعلها غير قابلة للمقارنة مع معاييرهم.
        
إذا كان دخلك متقلباً، استخدم متوسطاً شهرياً تقديرياً للفترة الأخيرة.`,
        },
        {
          heading: 'ماذا تعني النتيجة؟',
          body: `المعيار الشائع أن تكون النسبة **أقل من 36%** من الدخل الإجمالي، وأن يشير تجاوزها إلى ضغط دين مرتفع يقلص هامش تحمل قرض جديد. المقرضون يفضلون النسب المنخفضة التي تترك مرونة أكبر.
        
النسبة مؤشر واحد لا الحكم الكامل: ينظر المقرضون أيضاً إلى تاريخك الائتماني واستقرار دخلك.`,
        },
        {
          heading: 'النتيجة وأخطاء شائعة',
          body: `النتيجة تُعرض بنسبة مئوية على أنها **نسبة الدين إلى الدخل**، ويُعرض **الدخل المتبقي** بعد الأقساط. أخطاء شائعة: استخدام الدخل الصافي بدل الإجمالي، ونسيان الحد الأدنى لدفعات البطاقات، وإدخال تكاليف المعيشة ضمن الأقساط، وإدخال دخل صفري.
        
الحاسبة تتطلب دخلاً أكبر من صفر، ولا يمكن حساب النسبة بدونه.`,
        },
        {
          heading: 'متى تستخدمها',
          body: `استخدمها **قبل التقدم لأي قرض أو تمويل جديد** لتعرف نسبتك الحالية، ولتقدر أثر القرض الجديد على ضغط ديونك. أعد الحساب مع إضافة قسط القرض المقترح لتشاهد النسبة بعد الالتزام.
        
النسبة الأفضل لا تعني قبولاً مضموناً للتمويل، لكنها تنظم توقعاتك وتجهزك للمحادثة مع المُقرِض.`,
        },
      ],
      keyTakeaways: [
        'النسبة = أقساط الديون الشهرية ÷ الدخل الإجمالي × 100.',
        'استخدم الدخل الإجمالي قبل الضرائب لا الصافي.',
        'ضمّن الحد الأدنى لدفعات البطاقات والقروض الصغيرة.',
        'لا تُدخل تكاليف المعيشة، فالنسبة معنية بالديون فقط.',
        'المعيار الشائع: النسبة أقل من 36% صحية.',
      ],
      faqs: [
        {
          q: 'ما هي النسبة الصحية؟',
          a: 'المعيار الشائع أن تكون أقل من 36% من الدخل الإجمالي، ويُفضّل المقرضون النسب المنخفضة التي تترك هامشاً لقرض جديد.',
        },
        {
          q: 'هل تُدخل تكاليف المعيشة؟',
          a: 'لا. النسبة معنية بأقساط الديون الشهرية فقط، ولا تشمل الإيجار والطعام والفواتير إلا إذا كانت قسماً من التزاماتك القرضية.',
        },
        {
          q: 'هل النسبة وحدها تحدد قبول التمويل؟',
          a: 'لا، هي معيار من عدة معايير. ينظر المقرضون أيضاً إلى تاريخك الائتماني واستقرار دخلك.',
        },
      ],
      relatedCalculators: ['debt-to-income', 'loan-payment', 'loan-comparison'],
      lastReviewed: '2026-08-10',
    },
    en: {
      slug: 'how-to-calculate-debt-to-income',
      locale: 'en',
      title: 'How to calculate debt-to-income ratio',
      metaDescription:
        'A practical guide to calculating your debt-to-income ratio: dividing monthly debt payments by gross income, with a worked example matching the calculator and lender guidelines.',
      intro:
        'The debt-to-income (DTI) ratio is one number that summarizes how much your debts press on your income, and it is a metric lenders use to assess financing applications. This guide explains how it is computed, which numbers belong in the ratio and which stay out, and what the result means. Its worked example sticks to the same values used by Klar’s debt-to-income calculator.',
      sections: [
        {
          heading: 'The ratio formula',
          body: `Debt-to-income ratio = **monthly debt payments \u00f7 gross monthly income \u00d7 100**. The result is shown as a percentage, along with the **remaining income** — your gross income minus the payments.
        
A quick example: 400 dinars of payments on 2,000 dinars of income gives a ratio of **20%** and **1,600 dinars** of remaining income.`,
        },
        {
          heading: 'Which numbers go into the payments?',
          body: `Enter your **total monthly obligations**: loan installments, credit lines, minimum card payments, and any required monthly repayment. Do not enter living costs such as rent, food and bills — the ratio covers debt only.
        
Make sure to include the minimum card payments even if small, since the common oversight of omitting them hides the real pressure on your income.`,
        },
        {
          heading: 'Gross income, not net',
          body: `The ratio divides by **gross income before taxes and deductions**, which is what lenders usually use. Using net income after deductions inflates the ratio and makes it incomparable with their benchmarks.
        
If your income fluctuates, use an estimated monthly average for the recent period.`,
        },
        {
          heading: 'What the result means',
          body: `A common guideline is a ratio **below 36%** of gross income, with higher values indicating high debt pressure that leaves less room for a new loan. Lenders prefer lower ratios that allow more flexibility.
        
The ratio is one indicator, not the full verdict: lenders also weigh your credit history and income stability.`,
        },
        {
          heading: 'The result and common mistakes',
          body: `The result shows the **debt-to-income ratio** as a percentage and the **remaining income** after payments. Common mistakes: using net income instead of gross, forgetting minimum card payments, entering living costs among the payments, and entering zero income.
        
The calculator requires income greater than zero, since the ratio cannot be computed without it.`,
        },
        {
          heading: 'When to use it',
          body: `Use it **before applying for any new loan or financing** to know your current ratio, and to estimate the effect of a new loan on your debt pressure. Re-run the calculation with the proposed loan payment added to see the ratio after the commitment.
        
A good ratio does not guarantee approval, but it sets expectations and prepares you for the conversation with the lender.`,
        },
      ],
      keyTakeaways: [
        'Ratio = monthly debt payments \u00f7 gross income \u00d7 100.',
        'Use gross income before taxes, not net.',
        'Include minimum card payments and small loans.',
        'Do not enter living costs; the ratio covers debt only.',
        'A common guideline: a healthy ratio is below 36%.',
      ],
      faqs: [
        {
          q: 'What is a healthy ratio?',
          a: 'A common guideline is below 36% of gross income, with lenders preferring lower ratios that leave room for a new loan.',
        },
        {
          q: 'Do living costs go into the calculation?',
          a: 'No. The ratio covers monthly debt payments only, and does not include rent, food and bills unless they are part of your loan obligations.',
        },
        {
          q: 'Does the ratio alone decide financing approval?',
          a: 'No, it is one of several criteria. Lenders also look at your credit history and income stability.',
        },
      ],
      relatedCalculators: ['debt-to-income', 'loan-payment', 'loan-comparison'],
      lastReviewed: '2026-08-10',
    },
  },

  'how-to-understand-bmi': {
    ar: {
      slug: 'how-to-understand-bmi',
      locale: 'ar',
      title: 'كيف تفهم مؤشر كتلة الجسم',
      metaDescription:
        'دليل عملي لفهم مؤشر كتلة الجسم: طريقة الحساب، نطاقات المؤشر، وحدود استخدامه، مع مثال عددي مطابق لحاسبة المؤشر.',
      intro:
        'مؤشر كتلة الجسم (BMI) أشهر طريقة لفحص الوزن مقابل الطول، وهو مفيد وسريع لكن له حدود واضحة. يشرح هذا الدليل كيف يُحسب، وماذا تعني النطاقات، ومتى يضلل المؤشر. يلتزم مثاله العددي بنفس قيم حاسبة مؤشر كتلة الجسم في كلار.',
      sections: [
        {
          heading: 'كيف يُحسب المؤشر',
          body: `مؤشر كتلة الجسم = **الوزن بالكيلوغرام ÷ مربع الطول بالمتر**. الحاسبة تحول الوحدات تلقائياً: الباوند إلى كيلوغرام، والمتر إلى سنتمتر والعكس.
        
مثال سريع: وزن 75 كغ وطول 175 سم (1.75 م) يعطي مؤشراً ≈ **24.5**.`,
        },
        {
          heading: 'ماذا تعني النطاقات',
          body: `التصنيف الشائع للمؤشر: أقل من **18.5** نقص وزن، ومن **18.5 إلى 24.9** وزن صحي، ومن **25 إلى 29.9** زيادة وزن، و**30 فأكثر** سمنة.
        
نطاق الوزن الصحي لطولك هو الأوزان التي تعطيك مؤشراً بين 18.5 و24.9، وتُظهر الحاسبة حديه مباشرة.`,
        },
        {
          heading: 'مثال عملي',
          body: `لنأخذ مثالاً مطابقاً لقيم الحاسبة: وزن **75 كغ** وطول **175 سم**.
        
المؤشر ≈ **24.5**، ونطاق الوزن الصحي لطولك ≈ **56.7 – 76.3 كغ** (الحد الأدنى بمؤشر 18.5 والأعلى بمؤشر 24.9).`,
        },
        {
          heading: 'حدود المؤشر',
          body: `المؤشر أداة **فحص لا تشخيص**: لا يميز بين العضلات والدهون، لذا قد يضع الرياضي ذا الكتلة العضلية العالية في خانة زيادة الوزن دون مبرر. تختلف المعايير أيضاً بين المجموعات السكانية.
        
لا تستخدم معايير البالغين للأطفال أو الحوامل، ولاتجاهات التركيب الجسمي الأفضل استخدم أدوات كتقدير نسبة الدهون.`,
        },
        {
          heading: 'أخطاء شائعة',
          body: `من الأخطاء: الخلط بين وحدات الوزن أو الطول عند الإدخال، وإدخال الطول بالسنتمتر مكان المتر فيحسب المؤشر هائلة، واستخدام وحدات غير مدعومة كالقوالب (الستون).
        
استخدم الحاسبة مع اختيار الوحدات الصحيح وستتحول تلقائياً، واقرأ النتيجة كمؤشر استرشادي لا حكماً نهائياً.`,
        },
      ],
      keyTakeaways: [
        'المؤشر = الوزن (كغ) ÷ مربع الطول (م).',
        'النطاق الصحي بين 18.5 و24.9.',
        'المؤشر فحص استرشادي وليس تشخيصاً طبياً.',
        'لا يميز العضلات عن الدهون وقد يضلل للرياضيين.',
        'الوحدات تُختار بعناية وتتحول تلقائياً في الحاسبة.',
      ],
      faqs: [
        {
          q: 'هل المؤشر دقيق للجميع؟',
          a: 'لا. هو أداة فحص سريعة لا تميز بين العضلات والدهون، وقد يخطئ في تصنيف الرياضيين وبعض المجموعات السكانية.',
        },
        {
          q: 'ماذا يعني نطاق الوزن الصحي؟',
          a: 'هو مدى الأوزان التي تعطي مؤشراً بين 18.5 و24.9 لطولك، إطار استرشادي وليس هدفاً دقيقاً يفرض عليك.',
        },
        {
          q: 'متى لا يناسبني المؤشر؟',
          a: 'قد لا يناسب معايير البالغين الأطفال والحوامل، كما قد يضلل من يملكون كتلة عضلية عالية أو بنية جسمية غير نموذجية.',
        },
      ],
      relatedCalculators: ['bmi', 'ideal-weight', 'bmr'],
      lastReviewed: '2026-08-10',
    },
    en: {
      slug: 'how-to-understand-bmi',
      locale: 'en',
      title: 'How to understand BMI',
      metaDescription:
        'A practical guide to understanding body mass index: how it is computed, the index bands, and its limits, with a worked example matching the BMI calculator.',
      intro:
        'Body mass index (BMI) is the most popular way to screen weight against height — useful and quick, but with clear limits. This guide explains how it is computed, what the bands mean, and when it misleads. Its worked example sticks to the same values used by Klar’s BMI calculator.',
      sections: [
        {
          heading: 'How the index is computed',
          body: `BMI = **weight in kilograms \u00f7 height in metres squared**. The calculator converts units automatically: pounds to kilograms, and metres to centimetres and back.
        
A quick example: 75 kg and 175 cm (1.75 m) gives an index of about **24.5**.`,
        },
        {
          heading: 'What the bands mean',
          body: `The common classification: below **18.5** is underweight, **18.5 to 24.9** is healthy weight, **25 to 29.9** is overweight, and **30 and above** is obese.
        
The healthy weight range for your height is the weights that give an index between 18.5 and 24.9, and the calculator shows its two bounds directly.`,
        },
        {
          heading: 'A worked example',
          body: `Using the same values as the calculator: weight **75 kg** and height **175 cm**.
        
The index is about **24.5**, and the healthy weight range for your height is about **56.7 \u2013 76.3 kg** (the low bound at 18.5 and the high bound at 24.9).`,
        },
        {
          heading: 'The limits of the index',
          body: `The index is a **screening tool, not a diagnosis**: it does not distinguish muscle from fat, so it may place a muscular athlete in the overweight band without reason. Benchmarks also differ between populations.
        
Do not use adult benchmarks for children or pregnant women, and for a better picture of body composition use tools such as body fat estimation.`,
        },
        {
          heading: 'Common mistakes',
          body: `Among the mistakes: mixing weight or height units when entering them, entering height in centimetres where metres are expected, which miscalculates the index hugely, and using unsupported units like stone.
        
Use the calculator with the correct units chosen and they convert automatically, and read the result as a guiding index, not a final verdict.`,
        },
      ],
      keyTakeaways: [
        'The index = weight (kg) \u00f7 height (m) squared.',
        'The healthy range is 18.5 to 24.9.',
        'The index is a guiding screen, not a medical diagnosis.',
        'It does not distinguish muscle from fat and can mislead for athletes.',
        'Choose units carefully; the calculator converts automatically.',
      ],
      faqs: [
        {
          q: 'Is the index accurate for everyone?',
          a: 'No. It is a quick screening tool that does not distinguish muscle from fat, so it can misclassify athletes and some populations.',
        },
        {
          q: 'What does the healthy weight range mean?',
          a: 'It is the span of weights giving an index between 18.5 and 24.9 for your height — a guiding frame, not an exact target imposed on you.',
        },
        {
          q: 'When does the index not suit me?',
          a: 'Adult benchmarks may not fit children and pregnant women, and it can mislead people with high muscle mass or a non-typical body frame.',
        },
      ],
      relatedCalculators: ['bmi', 'ideal-weight', 'bmr'],
      lastReviewed: '2026-08-10',
    },
  },

  'how-to-calculate-bmr-and-tdee': {
    ar: {
      slug: 'how-to-calculate-bmr-and-tdee',
      locale: 'ar',
      title: 'كيف تحسب معدل الأيض الأساسي وإجمالي إنفاق الطاقة',
      metaDescription:
        'دليل عملي لحساب معدل الأيض الأساسي (BMR) وإجمالي إنفاق الطاقة اليومي (TDEE) وفق معادلة ميفلين-سانت جيور، مع مثال عددي مطابق للحاسبة.',
      intro:
        'معرفة احتياج جسمك من الطاقة هو أساس أي خطة غذائية أو تدريبية. يشرح هذا الدليل معنى معدل الأيض الأساسي (BMR) وإجمالي إنفاق الطاقة اليومي (TDEE)، وكيف تحسبهما الحاسبة وفق معادلة ميفلين-سانت جيور وعامل النشاط. يلتزم مثاله العددي بنفس قيم حاسبة معدل الأيض الأساسي في كلار.',
      sections: [
        {
          heading: 'ما هو BMR وما هو TDEE؟',
          body: `معدل الأيض الأساسي (**BMR**) هو الطاقة التي يحرقها جسمك في حالة الراحة التامة ليبقى على قيد الحياة: التنفس ونبض القلب ووظائف الأعضاء. **إجمالي إنفاق الطاقة اليومي (TDEE)** يضيف إلى ذلك أثر نشاطك اليومي، وهو الرقم الأقرب لاحتياجك الفعلي.
        
الفرق بينهما حاسم: BMR للراحة، وTDEE لاحتياجك اليومي الكامل.`,
        },
        {
          heading: 'معادلة ميفلين-سانت جيور',
          body: `المعادلة تحسب BMR من الوزن والطول والعمر والجنس: **BMR = 10 × الوزن (كغ) + 6.25 × الطول (سم) − 5 × العمر + (5 للذكر أو −161 للأنثى)**.
        
الحاسبة تحول الوحدات تلقائياً: الباوند إلى كيلوغرام والمتر إلى سنتمتر، ثم تطبق المعادلة مباشرة.`,
        },
        {
          heading: 'عامل النشاط و TDEE',
          body: `يُضرب BMR في عامل نشاط حسب روتينك اليومي: **1.2** لخامل، **1.375** لنشاط خفيف، **1.55** لنشاط متوسط، **1.725** لنشيط، و**1.9** لنشاط عالٍ جداً.
        
اختيار مستوى واقعي مهم: اختيار أعلى من واقعك يبالغ في TDEE ويشوه أي هدف غذائي مبنياً عليه.`,
        },
        {
          heading: 'مثال عملي',
          body: `لنأخذ مثالاً مطابقاً لقيم الحاسبة: ذكر، عمر **30**، وزن **80 كغ**، طول **180 سم**، نشاط متوسط.
        
BMR = 10×80 + 6.25×180 − 5×30 + 5 = **1,780 سعرة/يوم**، وTDEE = 1,780 × 1.55 ≈ **2,759 سعرة/يوم**.`,
        },
        {
          heading: 'أخطاء شائعة',
          body: `من الأخطاء: اختيار مستوى نشاط غير واقعي، وإدخال الوزن بالباوند دون مراعاة التحويل للكيلوغرام، والخلط بين BMR وTDEE، والاعتماد على الأرقام كحقيقة طبية بدل تقدير.
        
التقديرات مبنية على متوسطات سكانية، وقد يختلف احتياجك الفعلي حسب تكوين جسمك ومستوى نشاطك الحقيقي.`,
        },
      ],
      keyTakeaways: [
        'BMR هو احتياج الراحة التامة، وTDEE يضيف أثر النشاط اليومي.',
        'المعادلة: 10 × الوزن + 6.25 × الطول − 5 × العمر + ثابت الجنس.',
        'عوامل النشاط من 1.2 إلى 1.9 حسب المستوى.',
        'اختيار مستوى نشاط واقعي ضروري لصحة النتيجة.',
        'التقديرات عامة وليست نصيحة طبية.',
      ],
      faqs: [
        {
          q: 'ما الفرق بين BMR وTDEE؟',
          a: 'BMR للراحة التامة، بينما يضيف TDEE أثر نشاطك اليومي، وهو الرقم الأقرب لاحتياجك الفعلي من الطاقة.',
        },
        {
          q: 'لماذا تسأل الحاسبة عن الجنس؟',
          a: 'لأن معادلة ميفلين-سانت جيور تستخدم ثابتاً مختلفاً بين الرجال والنساء يعكس فروقاً متوسطة في تكوين الجسم.',
        },
        {
          q: 'هل الأرقام دقيقة لشخصي؟',
          a: 'إنها تقديرات مبنية على متوسطات سكانية، وقد يختلف احتياجك الفعلي بحسب تكوين جسمك ونشاطك الحقيقي.',
        },
      ],
      relatedCalculators: ['bmr', 'calorie-intake', 'bmi'],
      lastReviewed: '2026-08-10',
    },
    en: {
      slug: 'how-to-calculate-bmr-and-tdee',
      locale: 'en',
      title: 'How to calculate BMR and TDEE',
      metaDescription:
        'A practical guide to calculating basal metabolic rate (BMR) and total daily energy expenditure (TDEE) with the Mifflin-St Jeor equation, with a worked example matching the calculator.',
      intro:
        'Knowing your body\u2019s energy needs is the foundation of any diet or training plan. This guide explains what basal metabolic rate (BMR) and total daily energy expenditure (TDEE) mean, and how the calculator works them out with the Mifflin-St Jeor equation and an activity factor. Its worked example sticks to the same values used by Klar’s BMR calculator.',
      sections: [
        {
          heading: 'What are BMR and TDEE?',
          body: `Basal metabolic rate (**BMR**) is the energy your body burns at complete rest just to stay alive: breathing, heartbeat and organ functions. **Total daily energy expenditure (TDEE)** adds the effect of your daily activity and is the figure closest to your actual needs.
        
The difference matters: BMR is for rest, TDEE is your full daily need.`,
        },
        {
          heading: 'The Mifflin-St Jeor equation',
          body: `The equation computes BMR from weight, height, age and sex: **BMR = 10 \u00d7 weight (kg) + 6.25 \u00d7 height (cm) \u2212 5 \u00d7 age + (5 for male or \u2212161 for female)**.
        
The calculator converts units automatically — pounds to kilograms and metres to centimetres — then applies the equation directly.`,
        },
        {
          heading: 'The activity factor and TDEE',
          body: `BMR is multiplied by an activity factor matching your routine: **1.2** for sedentary, **1.375** for light activity, **1.55** for moderate, **1.725** for active, and **1.9** for very active.
        
Choosing a realistic level matters: picking higher than your reality inflates TDEE and distorts any diet target built on it.`,
        },
        {
          heading: 'A worked example',
          body: `Using the same values as the calculator: male, age **30**, weight **80 kg**, height **180 cm**, moderate activity.
        
BMR = 10\u00d780 + 6.25\u00d7180 \u2212 5\u00d730 + 5 = **1,780 calories/day**, and TDEE = 1,780 \u00d7 1.55 \u2248 **2,759 calories/day**.`,
        },
        {
          heading: 'Common mistakes',
          body: `Among the mistakes: choosing an unrealistic activity level, entering weight in pounds without accounting for the conversion to kilograms, confusing BMR with TDEE, and relying on the figures as medical fact instead of an estimate.
        
The estimates are based on population averages, and your actual needs may differ depending on your body composition and true activity level.`,
        },
      ],
      keyTakeaways: [
        'BMR is the complete-rest need; TDEE adds the effect of daily activity.',
        'The equation: 10 \u00d7 weight + 6.25 \u00d7 height \u2212 5 \u00d7 age + sex constant.',
        'Activity factors range from 1.2 to 1.9 by level.',
        'A realistic activity level is essential for a sound result.',
        'Estimates are general and are not medical advice.',
      ],
      faqs: [
        {
          q: 'What is the difference between BMR and TDEE?',
          a: 'BMR is for complete rest, while TDEE adds the effect of your daily activity and is the figure closest to your actual energy needs.',
        },
        {
          q: 'Why does the calculator ask for sex?',
          a: 'Because the Mifflin-St Jeor equation uses a different constant for men and women, reflecting average differences in body composition.',
        },
        {
          q: 'Are the figures accurate for me personally?',
          a: 'They are estimates based on population averages, and your actual needs may differ depending on your body composition and activity level.',
        },
      ],
      relatedCalculators: ['bmr', 'calorie-intake', 'bmi'],
      lastReviewed: '2026-08-10',
    },
  },

  'healthy-weight-range-explained': {
    ar: {
      slug: 'healthy-weight-range-explained',
      locale: 'ar',
      title: 'شرح نطاق الوزن الصحي',
      metaDescription:
        'دليل عملي لفهم نطاق الوزن الصحي المناسب لطولك، المحسوب من مؤشر كتلة الجسم بين 18.5 و24.9، مع مثال عددي مطابق للحاسبة.',
      intro:
        'بدل السعي لوزن "مثالي" مفرد، يقدم العلم نطاقاً صحياً من الأوزان يناسب طولك. يشرح هذا الدليل من أين يأتي النطاق، ولماذا هو مدى وليس نقطة، ومتى تختلف الحدود بين الناس. يلتزم مثاله العددي بنفس قيم حاسبة الوزن المثالي في كلار.',
      sections: [
        {
          heading: 'من أين يأتي النطاق؟',
          body: `نطاق الوزن الصحي مشتق من **مؤشر كتلة الجسم** بين **18.5 و24.9**: الحد الأدنى = طولك (م)² × 18.5، والحد الأعلى = طولك (م)² × 24.9.
        
كل وزن داخل هذا المدى يعطي مؤشراً ضمن التصنيف الصحي، لذا يُعرض على شكل نطاق وليس رقماً واحداً.`,
        },
        {
          heading: 'لماذا نطاق وليس رقماً؟',
          body: `لأن الجسم الصحي لا يحدده رقم واحد دقيق: البنية الجسمية والكتلة العضلية والتركيب تختلف بين الناس، والأوزان الواقعة داخل النطاق كلها مقبولة صحياً.
        
منتصف النطاق مجرد مرجع عملي عند وضع هدف، وليس أفضل نقطة إلزامية.`,
        },
        {
          heading: 'مثال عملي',
          body: `لنأخذ مثالاً مطابقاً لقيم الحاسبة: طول **175 سم**.
        
نطاق الوزن الصحي ≈ **56.7 – 76.3 كغ**، ووزن منتصف النطاق ≈ **66.5 كغ**.`,
        },
        {
          heading: 'متى تختلف الحدود؟',
          body: `النطاق مبنٍ على مؤشر كتلة الجسم الذي لا يميز **العضلات عن الدهون**، لذا قد يصنف الرياضي ذا الكتلة العضلية العالية خطأً خارج الحدود. تختلف نطاقات المؤشر أيضاً بين المجموعات السكانية.
        
المعايير للبالغين: الأطفال والحوامل لهم تقييمات خاصة تحتاج مختصاً.`,
        },
        {
          heading: 'أخطاء شائعة',
          body: `من الأخطاء: معاملة النطاق كهدف يجب الوصول إلى حدوده بالضبط، وتجاهل اختلاف النطاقات بين المجموعات، والافتراض أن النطاق ينطبق على الرياضيين أو على الأطفال.
        
استخدم النطاق كإطار استرشادي تتحرك داخله بمرونة، لا كحكم صارم.`,
        },
      ],
      keyTakeaways: [
        'النطاق مشتق من مؤشر 18.5 إلى 24.9 فقط.',
        'الوزن الصحي نطاق وليس رقماً واحداً.',
        'الحد الأدنى والأعلى يحسبان بضرب مربع الطول في 18.5 و24.9.',
        'البنية والكتلة العضلية تغيران صحة الحدود لشخصك.',
        'المعايير للبالغين ولا تشمل الأطفال أو الحمل.',
      ],
      faqs: [
        {
          q: 'لماذا نطاق بدل رقم واحد؟',
          a: 'لأن الوزن الصحي لطولك يشمل مدى من الأوزان، والجسم الصحي لا يحدد برقم واحد يهمل البنية والتركيب.',
        },
        {
          q: 'هل النطاق صالح للرياضيين؟',
          a: 'النطاق مبني على مؤشر كتلة الجسم الذي لا يميز العضلات عن الدهون، لذا قد يصنف الرياضي خطأً خارج الحدود.',
        },
        {
          q: 'هل يشمل الأطفال والحوامل؟',
          a: 'لا. المعايير للبالغين، وللأطفال والحوامل نطاقات وتقييمات خاصة تحتاج مختصاً.',
        },
      ],
      relatedCalculators: ['ideal-weight', 'bmi', 'body-fat'],
      lastReviewed: '2026-08-10',
    },
    en: {
      slug: 'healthy-weight-range-explained',
      locale: 'en',
      title: 'Healthy weight range explained',
      metaDescription:
        'A practical guide to the healthy weight range for your height, derived from a body mass index between 18.5 and 24.9, with a worked example matching the calculator.',
      intro:
        'Instead of chasing a single "ideal" weight, science offers a healthy range of weights that fits your height. This guide explains where the range comes from, why it is a span rather than a point, and when the bounds differ between people. Its worked example sticks to the same values used by Klar’s ideal weight calculator.',
      sections: [
        {
          heading: 'Where the range comes from',
          body: `The healthy weight range is derived from a **body mass index** between **18.5 and 24.9**: the low bound = your height (m)\u00b2 \u00d7 18.5, and the high bound = your height (m)\u00b2 \u00d7 24.9.
        
Every weight inside this span gives an index within the healthy band, so it is shown as a range rather than a single number.`,
        },
        {
          heading: 'Why a range instead of one number',
          body: `Because a healthy body is not defined by a single precise number: body frame, muscle mass and composition differ between people, and every weight inside the range is healthy.
        
The mid-range is just a practical reference for setting a target, not a mandatory best point.`,
        },
        {
          heading: 'A worked example',
          body: `Using the same values as the calculator: height **175 cm**.
        
The healthy weight range is about **56.7 \u2013 76.3 kg**, and the mid-range weight is about **66.5 kg**.`,
        },
        {
          heading: 'When the bounds differ',
          body: `The range is based on BMI, which does not distinguish **muscle from fat**, so an athlete with high muscle mass can be misclassified outside the bounds. BMI bands also differ between populations.
        
The benchmarks are for adults: children and pregnant women have their own assessments that need a professional.`,
        },
        {
          heading: 'Common mistakes',
          body: `Among the mistakes: treating the range as a target to hit its exact bounds, ignoring that bands vary between populations, and assuming the range applies to athletes or to children.
        
Use the range as a guiding frame to move within flexibly, not as a rigid verdict.`,
        },
      ],
      keyTakeaways: [
        'The range is derived from an index of 18.5 to 24.9 only.',
        'Healthy weight is a range, not a single number.',
        'The low and high bounds are your height squared times 18.5 and 24.9.',
        'Frame and muscle mass change what suits you within the bounds.',
        'Benchmarks are for adults and do not cover children or pregnancy.',
      ],
      faqs: [
        {
          q: 'Why a range instead of one number?',
          a: 'Because the healthy weight for your height spans many values, and a healthy body is not defined by a single number that ignores frame and composition.',
        },
        {
          q: 'Does the range apply to athletes?',
          a: 'The range is based on BMI, which does not distinguish muscle from fat, so an athlete may be misclassified outside the bounds.',
        },
        {
          q: 'Does it cover children and pregnant women?',
          a: 'No. The benchmarks are for adults, and children and pregnant women have their own ranges and assessments that need a professional.',
        },
      ],
      relatedCalculators: ['ideal-weight', 'bmi', 'body-fat'],
      lastReviewed: '2026-08-10',
    },
  },

  'how-to-estimate-body-fat': {
    ar: {
      slug: 'how-to-estimate-body-fat',
      locale: 'ar',
      title: 'كيف تقدر نسبة الدهون في الجسم',
      metaDescription:
        'دليل عملي لتقدير نسبة الدهون بطريقة القياسات البحرية الأمريكية: القياس الصحيح للمحيطات، وفهم النطاقات، مع مثال عددي مطابق للحاسبة.',
      intro:
        'نسبة الدهون في الجسم أكثر دلالة من الوزن وحده على تكوين جسمك. يشرح هذا الدليل طريقة القياسات البحرية الأمريكية (US Navy)، وكيف تقيس المحيطات بدقة، وماذا تعني النطاقات الناتجة. يلتزم مثاله العددي بنفس قيم حاسبة نسبة الدهون في كلار.',
      sections: [
        {
          heading: 'طريقة القياسات البحرية',
          body: `تعتمد الطريقة على **محيطات الجسم** فقط: الطول ومحيط الخصر والرقبة، مع محيط الورك للإناث. من هذه الأرقام تُقدر كثافة الجسم ثم تُحول إلى نسبة دهون.
        
الطريقة تقديرية، ودقتها في حدود بضع نقاط مئوية، وتختلف عن طرق أدق كالوزن المائي أو التصوير.`,
        },
        {
          heading: 'كيف تقيس المحيطات بدقة',
          body: `اجعل القياسات **دقيقة وثابتة** كل مرة: قِس صباحاً، بشريط ملامس غير مشدود، أفقي على الجلد مباشرة، دون نفخ البطن. الخصر عند مستوى السرة تقريباً، والرقبة أسفل تفاحة الحنجرة، والورك عند أوسع نقطة.
        
النتيجة حساسة للقياس: شريط مشدود أو قياس فوق الملابس يشوه التقدير.`,
        },
        {
          heading: 'مثال عملي',
          body: `لنأخذ مثالاً مطابقاً لقيم الحاسبة: ذكر، طول **180 سم**، محيط خصر **90 سم**، ومحيط رقبة **40 سم**.
        
نسبة الدهون في الجسم ≈ **18.4%**. للمقارنة، أنثى بطول 165 سم وخصر 70 سم ورقبة 32 سم وورك 95 سم تعطي ≈ **24.9%**.`,
        },
        {
          heading: 'ماذا تعني النطاقات',
          body: `نطاقات استرشادية عامة: **أساسية** (نسبة دنيا ضرورية للصحة)، **رياضية**، **لياقة**، **متوسطة**، ثم **مرتفعة** تصنف سمنة. تختلف الحدود بين الذكور والإناث.
        
افهم مكانك داخل هذه النطاقات كإشارة عامة، وراقب **الاتجاه** عبر الزمن بنفس أسلوب القياس.`,
        },
        {
          heading: 'أخطاء شائعة',
          body: `من الأخطاء: القياس فوق الملابس أو بشريط مشدود، وإدخال القياسات بالبوصة مكان السنتمتر، ونسيان محيط الورك للإناث، والقياس في أوقات مختلفة من اليوم فيتباين الرقم دون تغير حقيقي.
        
قِس دائماً بنفس الطريقة والوقت لتحصل على اتجاه صادق لتغيرك.`,
        },
      ],
      keyTakeaways: [
        'الطريقة تعتمد على محيطات الجسم: الطول والخصر والرقبة، والورك للإناث.',
        'القياس الدقيق: شريط ملامس غير مشدود، أفقي، على الجلد مباشرة.',
        'التقدير في حدود بضع نقاط مئوية وليس تشخيصاً.',
        'النطاقات استرشادية وتختلف بين الذكور والإناث.',
        'راقب الاتجاه عبر الزمن بنفس أسلوب القياس.',
      ],
      faqs: [
        {
          q: 'ما مدى دقة طريقة القياسات البحرية؟',
          a: 'إنها تقدير مقبول لكثير من الناس ضمن بضع نقاط مئوية، بينما طرق أدق مثل الوزن المائي أو التصوير تعطي نتائج أدق.',
        },
        {
          q: 'لماذا محيط الورك للإناث فقط؟',
          a: 'لأن توزيع الدهون يختلف بين الجنسين، وتضيف المعادلة الأنثوية محيط الورك لتعكس تراكم الدهون في تلك المنطقة.',
        },
        {
          q: 'كيف أحصل على قياس صحيح؟',
          a: 'قِس صباحاً وبنفس الطريقة كل مرة: شريط ملامس غير مشدود، أفقي على الجلد مباشرة، ولا تنفخ بطنك.',
        },
      ],
      relatedCalculators: ['body-fat', 'bmi', 'ideal-weight'],
      lastReviewed: '2026-08-10',
    },
    en: {
      slug: 'how-to-estimate-body-fat',
      locale: 'en',
      title: 'How to estimate body fat',
      metaDescription:
        'A practical guide to estimating body fat with the US Navy method: measuring circumferences correctly and reading the bands, with a worked example matching the calculator.',
      intro:
        'Body fat percentage tells you more about your body composition than weight alone. This guide explains the US Navy circumference method, how to measure accurately, and what the resulting bands mean. Its worked example sticks to the same values used by Klar’s body fat calculator.',
      sections: [
        {
          heading: 'The Navy circumference method',
          body: `The method uses **body circumferences only**: height, waist and neck, plus hip for women. From these figures body density is estimated and converted to a body fat percentage.
        
The method is an estimate, accurate to within a few percentage points, and differs from more precise techniques such as hydrostatic weighing or imaging.`,
        },
        {
          heading: 'How to measure accurately',
          body: `Make your measurements **accurate and consistent** every time: measure in the morning, with a touching, not tight, level tape directly on the skin, without sucking in your stomach. The waist is around navel level, the neck just below the larynx, and the hip at its widest point.
        
The result is sensitive to the measurement: a tight tape or measuring over clothing distorts the estimate.`,
        },
        {
          heading: 'A worked example',
          body: `Using the same values as the calculator: male, height **180 cm**, waist **90 cm** and neck **40 cm**.
        
The body fat percentage is about **18.4%**. For comparison, a woman of 165 cm with a 70 cm waist, 32 cm neck and 95 cm hip gives about **24.9%**.`,
        },
        {
          heading: 'What the bands mean',
          body: `General indicative bands: **essential** (the minimum fat needed for health), **athletic**, **fitness**, **average**, then **high**, classed as obese. The thresholds differ between men and women.
        
Read where you fall as a general signal, and track the **direction** over time using the same measurement technique.`,
        },
        {
          heading: 'Common mistakes',
          body: `Among the mistakes: measuring over clothing or with a tight tape, entering measurements in inches where centimetres are expected, forgetting the hip for women, and measuring at different times of day so the figure varies without any real change.
        
Always measure the same way and at the same time to get an honest picture of your change.`,
        },
      ],
      keyTakeaways: [
        'The method uses body circumferences: height, waist and neck, plus hip for women.',
        'Accurate measuring: a touching, not tight, level tape directly on the skin.',
        'The estimate is within a few percentage points, not a diagnosis.',
        'The bands are indicative and differ between men and women.',
        'Track the direction over time with the same measurement technique.',
      ],
      faqs: [
        {
          q: 'How accurate is the Navy method?',
          a: 'It is a reasonable estimate for many people within a few percentage points, while more precise methods such as hydrostatic weighing or imaging give more accurate results.',
        },
        {
          q: 'Why is the hip measured only for women?',
          a: 'Because fat distribution differs between sexes, and the female equation includes the hip circumference to reflect fat accumulation in that area.',
        },
        {
          q: 'How do I take a correct measurement?',
          a: 'Measure in the morning and the same way each time: a touching, not tight, level tape directly on the skin, without sucking in your stomach.',
        },
      ],
      relatedCalculators: ['body-fat', 'bmi', 'ideal-weight'],
      lastReviewed: '2026-08-10',
    },
  },

  'how-to-set-a-calorie-target': {
    ar: {
      slug: 'how-to-set-a-calorie-target',
      locale: 'ar',
      title: 'كيف تحدد هدف السعرات اليومي',
      metaDescription:
        'دليل عملي لتحديد هدفك اليومي من السعرات حسب الهدف والنشاط: من احتياج الجسم إلى التعديل، مع مثال عددي مطابق لحاسبة السعرات اليومية.',
      intro:
        'هدف السعرات اليومي ليس رقماً عشوائياً: يبدأ من احتياج جسمك للطاقة ثم يُعدَّل حسب هدفك وسرعة الوصول إليه. يشرح هذا الدليل خطوات الوصول إلى الهدف، وماذا تعني تعديلات السرعة، ومتى تحذر. يلتزم مثاله العددي بنفس قيم حاسبة السعرات اليومية في كلار.',
      sections: [
        {
          heading: 'من احتياج الجسم إلى الهدف',
          body: `الخطوة الأولى: احسب **معدل الأيض الأساسي (BMR)** من وزنك وطولك وعمرك وجنسك، ثم اضربه في عامل نشاطك لتحصل على **إجمالي إنفاق الطاقة اليومي (TDEE)** — احتياجك قبل أي تعديل.
        
الخطوة الثانية: عدّل الهدف حسب هدفك: الخسارة تنقص من TDEE، والزيادة تضيف إليه، والثبات يتركه كما هو.`,
        },
        {
          heading: 'تعديلات السرعة',
          body: `تعديلات السعرات اليومية: **بطيء** ±250، **متوسط** ±500، **سريع** ±750 سعرة. تقابل هذه التقريباً تغيراً أسبوعياً قدره **0.25 / 0.5 / 0.75 كغ** للخسارة أو الزيادة.
        
السرعات السريعة أصعب استمراراً وقد تفقد عضلات مع الدهون، لذا يفضل أغلب المختصين الخسارة المعتدلة.`,
        },
        {
          heading: 'مثال عملي',
          body: `لنأخذ مثالاً مطابقاً لقيم الحاسبة: أنثى، عمر **25**، وزن **60 كغ**، طول **165 سم**، نشاط متوسط، هدف خسارة بسرعة متوسطة.
        
BMR ≈ **1,345 سعرة/يوم**، وTDEE ≈ **2,085 سعرة/يوم**، والهدف اليومي ≈ **1,585 سعرة/يوم** (TDEE − 500).`,
        },
        {
          heading: 'متى تحذر',
          body: `النتائج **تقديرية وليست نصيحة طبية**. لا تنزل عموماً دون نحو **1,200 سعرة يومياً** دون إشراف مختص، واحذر العجز السريع المطول.
        
استخدم الحاسبة أثناء الحمل أو الرضاعة: أهداف خسارة الوزن غير مناسبة في هذه المرحلة، واستشيري مختصاً.`,
        },
        {
          heading: 'أخطاء شائعة',
          body: `من الأخطاء: اختيار مستوى نشاط أعلى من الواقع، واختيار سرعة سريعة دون وعي بمخاطرها، ومعاملة الهدف كرقم جامد بدل مرجع يُعدَّل بتغير الوزن والنشاط.
        
لا تضيف تقدير حرق التمارين مرتين: مستوى النشاط الصحيح يتضمن أثرها في TDEE.`,
        },
      ],
      keyTakeaways: [
        'الهدف يبدأ من TDEE ثم يُعدَّل حسب الهدف والسرعة.',
        'التعديلات 250/500/750 سعرة ≈ 0.25/0.5/0.75 كغ أسبوعياً.',
        'الخسارة المعتدلة أسهل استمراراً وأأمن من السريعة.',
        'لا تنزل عموماً دون نحو 1,200 سعرة يومياً دون إشراف.',
        'الهدف مرجع يُعدَّل مع تغير الوزن والنشاط، لا رقم جامد.',
      ],
      faqs: [
        {
          q: 'ما السرعة الآمنة للخسارة؟',
          a: 'الخسارة المعتدلة من 0.5 كغ أسبوعياً تقريباً (عجز 500 سعرة يومياً) شائعة وقابلة للاستمرار، أما العجز الأسرع فأصعب ويحتاج إشرافاً.',
        },
        {
          q: 'هل أستطيع استخدامه أثناء الحمل؟',
          a: 'لا. أهداف خسارة الوزن غير مناسبة أثناء الحمل أو الرضاعة، واستشيري مختصاً لأي تعديل غذائي في هذه المرحلة.',
        },
        {
          q: 'ماذا لو أمارس الرياضة؟',
          a: 'إن اخترت مستوى النشاط المناسب لتمارينك، فالحاسبة تتضمن أثرها في TDEE. لا تضيف تقدير الحرق مرتين.',
        },
      ],
      relatedCalculators: ['calorie-intake', 'bmr', 'bmi'],
      lastReviewed: '2026-08-10',
    },
    en: {
      slug: 'how-to-set-a-calorie-target',
      locale: 'en',
      title: 'How to set a calorie target',
      metaDescription:
        'A practical guide to setting your daily calorie target by goal and activity: from your body\u2019s needs to the adjustment, with a worked example matching the calorie intake calculator.',
      intro:
        'A daily calorie target is not a random number: it starts from your body\u2019s energy needs and is then adjusted for your goal and how fast you want to reach it. This guide explains the steps to the target, what the pace adjustments mean, and when to be careful. Its worked example sticks to the same values used by Klar’s calorie intake calculator.',
      sections: [
        {
          heading: 'From your body\u2019s needs to the target',
          body: `First, compute your **basal metabolic rate (BMR)** from your weight, height, age and sex, then multiply it by your activity factor for **total daily energy expenditure (TDEE)** — your needs before any adjustment.
        
Second, adjust the target to your goal: losing subtracts from TDEE, gaining adds to it, and maintaining leaves it as is.`,
        },
        {
          heading: 'The pace adjustments',
          body: `The daily calorie adjustments are: **slow** \u00b1250, **moderate** \u00b1500, **fast** \u00b1750 calories. These correspond roughly to a weekly change of **0.25 / 0.5 / 0.75 kg** for loss or gain.
        
Fast paces are harder to sustain and may lose muscle along with fat, so most professionals favour moderate loss.`,
        },
        {
          heading: 'A worked example',
          body: `Using the same values as the calculator: female, age **25**, weight **60 kg**, height **165 cm**, moderate activity, goal lose at a moderate pace.
        
BMR is about **1,345 calories/day**, TDEE about **2,085 calories/day**, and the daily target about **1,585 calories/day** (TDEE \u2212 500).`,
        },
        {
          heading: 'When to be careful',
          body: `The results are **estimates, not medical advice**. Generally do not go below about **1,200 calories a day** without professional supervision, and be wary of prolonged fast deficits.
        
Do not use this for weight loss during pregnancy or breastfeeding: loss targets are unsuitable in this stage — consult a professional.`,
        },
        {
          heading: 'Common mistakes',
          body: `Among the mistakes: choosing an activity level higher than reality, picking a fast pace without understanding its risks, and treating the target as a rigid number instead of a reference that adjusts as weight and activity change.
        
Do not add your exercise burn twice: the right activity level already includes its effect in TDEE.`,
        },
      ],
      keyTakeaways: [
        'The target starts from TDEE, then adjusts for goal and pace.',
        'Adjustments of 250/500/750 calories \u2248 0.25/0.5/0.75 kg per week.',
        'Moderate loss is easier to sustain and safer than fast loss.',
        'Generally do not go below about 1,200 calories a day without supervision.',
        'The target is a reference that adjusts with weight and activity, not a rigid number.',
      ],
      faqs: [
        {
          q: 'How fast is it safe to lose weight?',
          a: 'A moderate loss of about 0.5 kg per week (a 500-calorie daily deficit) is common and sustainable, while a faster deficit is harder and needs supervision.',
        },
        {
          q: 'Can I use this while pregnant?',
          a: 'No. Weight-loss targets are unsuitable during pregnancy or breastfeeding; consult a professional for any dietary changes in this stage.',
        },
        {
          q: 'What if I exercise?',
          a: 'If you choose the activity level that matches your training, the calculator already includes its effect in TDEE. Do not add an estimated burn twice.',
        },
      ],
      relatedCalculators: ['calorie-intake', 'bmr', 'bmi'],
      lastReviewed: '2026-08-10',
    },
  },

  'how-to-calculate-gpa': {
    ar: {
      slug: 'how-to-calculate-gpa',
      locale: 'ar',
      title: 'كيف تحسب المعدل التراكمي',
      metaDescription:
        'دليل عملي لحساب المعدل التراكمي GPA على سلم 4 أو 5 نقاط: الخريطة الحرفية للنقاط، الوزن بالساعات، ومثال عددي مطابق لحاسبة المعدل التراكمي.',
      intro:
        'المعدل التراكمي (GPA) متوسط مرجّح بساعات المواد، وليس عدّاً بسيطاً. يشرح هذا الدليل كيف تُقابل الدرجات الحرفية نقاطاً على سلم 4 و5، ولماذا تُوزَّن بالساعات، وكيف تتفادى الأخطاء الشائعة. يلتزم مثاله العددي بقيم حاسبة المعدل التراكمي في كلار.',
      sections: [
        {
          heading: 'خريطة الدرجات إلى النقاط',
          body: `على سلم **4 نقاط**: A وA+ = 4.0، وA- = 3.7، وB = 3.0، وC = 2.0، وD = 1.0، وF = 0.
        
على سلم **5 نقاط**: A وA+ = 5.0، وA- = 4.7، وB = 4.0، وC = 3.0، وD = 2.0، وF = 0.`,
        },
        {
          heading: 'الوزن بالساعات المعتمدة',
          body: `كل مادة تساهم بنقاطها مضروبة في ساعاتها: **النقاط = قيمة الدرجة × الساعات**. المعدل التراكمي = مجموع النقاط ÷ إجمالي الساعات.
        
هذا يعني أن مادة بثلاث ساعات تزن ثلاثة أضعاف مادة بساعة واحدة عند نفس الدرجة.`,
        },
        {
          heading: 'مثال عملي',
          body: `لنأخذ مثالاً مطابقاً لقيم الحاسبة على سلم **4**: A (3 ساعات)، B (4 ساعات)، A- (3 ساعات)، C (ساعتان).
        
النقاط = (4×3) + (3×4) + (3.7×3) + (2×2) = **39.1**، وإجمالي الساعات **12**، والمعدل = 39.1 ÷ 12 ≈ **3.26**.`,
        },
        {
          heading: 'اختيار السلم الصحيح',
          body: `اختر السلم الذي تعتمده جامعتك بالضبط. بعض الجامعات تمنح A+ قيمة أعلى من A، والبعض لا، وقد تستخدم سلم 5 نقاط بدل 4.
        
إدخال درجات مئوية مثل 85 مكان الدرجة الحرفية سيعطي نتائج خاطئة تماماً — استخدم حاسبة متوسط الدرجات للدرجات المئوية.`,
        },
        {
          heading: 'أخطاء شائعة',
          body: `من الأخطاء: الخلط بين سلم 4 وسلم 5، وإدراج مواد مسحوبة (Withdrawn)، وإدخال ساعات صفرية، ومعاملة المعدل كمتوسط غير موزون.
        
الصفوف الفارغة أو غير المكتملة تُتجاهل تلقائياً، فلا داعي لملء الخانات كلها.`,
        },
      ],
      keyTakeaways: [
        'النقاط تعتمد على السلم المختار: A = A+ على سلم 4، وعلى سلم 5 أيضاً.',
        'المعدل موزون بالساعات: المواد الأكثر ساعات تزن أكثر.',
        'المعدل = مجموع النقاط ÷ إجمالي الساعات.',
        'اختر السلم المطابق لجامعتك، ولا تدخل الدرجات المئوية هنا.',
        'الصفوف الفارغة تُتجاهل، واملأ صفاً واحداً مكتملاً على الأقل.',
      ],
      faqs: [
        {
          q: 'لماذا تساوي A+ درجة A على سلم 4؟',
          a: 'لا تتجاوز A+ عادة قمة السلم في الأنظمة الأميركية، فتتساوى القيمتان. بعض الجامعات تمنح 4.33 لـ A+، فتحقق من سلمك.',
        },
        {
          q: 'جامعتي تستخدم نظام المئة، ماذا أفعل؟',
          a: 'استخدم حاسبة متوسط الدرجات للدرجات المئوية، فحاسبة المعدل التراكمي تعتمد على الدرجات الحرفية والساعات.',
        },
        {
          q: 'هل تشمل الحاسبة مواد النجاح/الرسوب؟',
          a: 'لا، مواد Pass/Fail ليست موزونة عادة ولا تحمل درجة حرفية، لذا تُستثنى من الحساب.',
        },
      ],
      relatedCalculators: ['gpa', 'grade-average', 'final-grade-planner'],
      lastReviewed: '2026-08-10',
    },
    en: {
      slug: 'how-to-calculate-gpa',
      locale: 'en',
      title: 'How to calculate your GPA',
      metaDescription:
        'A practical guide to calculating your GPA on the 4.0 or 5.0 scale: the letter-to-point map, credit weighting, and a worked example matching the GPA calculator.',
      intro:
        'Your GPA is a credit-weighted average, not a simple count. This guide explains how letter grades map to points on the 4 and 5 scales, why weighting by credits matters, and how to avoid common mistakes. Its worked example sticks to the values used by Klar\u2019s GPA calculator.',
      sections: [
        {
          heading: 'Mapping grades to points',
          body: `On the **4.0 scale**: A and A+ = 4.0, A- = 3.7, B = 3.0, C = 2.0, D = 1.0, and F = 0.
        
On the **5.0 scale**: A and A+ = 5.0, A- = 4.7, B = 4.0, C = 3.0, D = 2.0, and F = 0.`,
        },
        {
          heading: 'Weighting by credit hours',
          body: `Each course contributes its grade points multiplied by its credits: **points = grade value \u00d7 credits**. Your GPA is total points \u00f7 total credits.
        
So a three-credit course weighs three times a one-credit course at the same grade.`,
        },
        {
          heading: 'A worked example',
          body: `Using the calculator\u2019s values on the **4.0** scale: A (3 credits), B (4 credits), A- (3 credits), C (2 credits).
        
Points = (4\u00d73) + (3\u00d74) + (3.7\u00d73) + (2\u00d72) = **39.1**, total credits **12**, and GPA = 39.1 \u00f7 12 \u2248 **3.26**.`,
        },
        {
          heading: 'Choosing the right scale',
          body: `Pick exactly the scale your university uses. Some universities value A+ above A, some do not, and some use the 5-point scale instead of 4.
        
Entering percentage grades like 85 instead of letter grades gives completely wrong results — use the grade average calculator for percentages.`,
        },
        {
          heading: 'Common mistakes',
          body: `Among the mistakes: mixing the 4 and 5 scales, including withdrawn courses, entering zero credits, and treating the GPA as an unweighted average.
        
Empty or incomplete rows are skipped automatically, so there is no need to fill every field.`,
        },
      ],
      keyTakeaways: [
        'Points depend on the chosen scale: A = A+ on both the 4.0 and 5.0 scales.',
        'The GPA is credit-weighted: higher-credit courses weigh more.',
        'GPA = total points \u00f7 total credits.',
        'Match the scale to your university and keep percentages out of this tool.',
        'Empty rows are ignored; fill at least one complete row.',
      ],
      faqs: [
        {
          q: 'Why is A+ worth the same as A on the 4.0 scale?',
          a: 'A+ usually does not exceed the top of the scale in American systems, so both map to 4.0. Some universities award 4.33 for A+, so check your own scale.',
        },
        {
          q: 'My university uses a 100-point system, what do I do?',
          a: 'Use the grade average calculator for percentage grades, since the GPA calculator relies on letter grades and credits.',
        },
        {
          q: 'Does the calculator include pass/fail courses?',
          a: 'No. Pass/fail courses are usually unweighted and carry no letter grade, so they are excluded from the calculation.',
        },
      ],
      relatedCalculators: ['gpa', 'grade-average', 'final-grade-planner'],
      lastReviewed: '2026-08-10',
    },
  },

  'how-to-calculate-grade-average': {
    ar: {
      slug: 'how-to-calculate-grade-average',
      locale: 'ar',
      title: 'كيف تحسب متوسط الدرجات',
      metaDescription:
        'دليل عملي لحساب متوسط الدرجات من مئة: تعريف المتوسط الحسابي، الفرق بين الموازن وغير الموازن، ومثال عددي مطابق لحاسبة متوسط الدرجات.',
      intro:
        'متوسط الدرجات أبسط أدوات قياس الأداء الأكاديمي: مجموع الدرجات مقسوم على عددها. يشرح هذا الدليل متى يكون المتوسط الحسابي كافياً، ومتى تحتاج متوسطاً موزوناً بالساعات، مع مثال عددي مطابق لحاسبة متوسط الدرجات في كلار.',
      sections: [
        {
          heading: 'ما هو المتوسط الحسابي',
          body: `المتوسط = مجموع الدرجات ÷ عدد الدرجات. هو رقم واحد يلخص أداءك عبر مواد أو تقييمات متعددة.
        
حاسبة متوسط الدرجات تعتبر كل درجة متساوية الأهمية، وتستخرج مع المتوسط أعلى وأدنى درجة.`,
        },
        {
          heading: 'متوسط بسيط أم موزون؟',
          body: `المتوسط الحسابي يعطي كل مادة الوزن نفسه. إذا كانت موادك موزونة بساعات معتمدة مختلفة، فالمتوسط الحسابي لن يعكس ذلك — استخدم حاسبة المعدل التراكمي للمواد الموزونة.
        
هنا تكون الخانات فارغة مقبولة: تُستخدم الدرجات المعبأة فقط.`,
        },
        {
          heading: 'مثال عملي',
          body: `لنأخذ مثالاً مطابقاً لقيم الحاسبة: درجات **85، 92، 78، 88**.
        
المتوسط = (85 + 92 + 78 + 88) ÷ 4 = 343 ÷ 4 = **85.75**. الأعلى **92** والأدنى **78** وعدد الدرجات **4**.`,
        },
        {
          heading: 'الدرجات من مئويات مختلفة',
          body: `كل الدرجات يجب أن تكون على سلم واحد من 0 إلى 100. مزج درجة من 50 مع درجة من 100 يعطي متوسطاً بلا معنى.
        
إن أردت مزج مئويات مختلفة، حوّل الدرجات إلى سلم موحد أولاً.`,
        },
      ],
      keyTakeaways: [
        'المتوسط = مجموع الدرجات ÷ عددها.',
        'المتوسط هنا غير موزون بالساعات — استخدم المعدل التراكمي للوزن.',
        'تُستخدم الدرجات المعبأة فقط، وتُتجاهل الفارغة.',
        'جميع الدرجات على سلم 0 إلى 100.',
      ],
      faqs: [
        {
          q: 'هل تراعي الحاسبة الساعات المعتمدة؟',
          a: 'لا، المتوسط هنا غير موزون. للمواد الموزونة بالساعات استخدم حاسبة المعدل التراكمي.',
        },
        {
          q: 'هل يمكنني متوسط درجات من مئويات مختلفة؟',
          a: 'لا. يفترض المتوسط سلم 100 موحداً؛ حوّل المئويات المختلفة إلى سلم واحد قبل الجمع.',
        },
      ],
      relatedCalculators: ['grade-average', 'gpa', 'final-grade-planner'],
      lastReviewed: '2026-08-10',
    },
    en: {
      slug: 'how-to-calculate-grade-average',
      locale: 'en',
      title: 'How to calculate a grade average',
      metaDescription:
        'A practical guide to averaging your grades out of 100: what the arithmetic mean is, the difference between weighted and unweighted averages, and a worked example matching the grade average calculator.',
      intro:
        'A grade average is the simplest measure of academic performance: the sum of grades divided by their count. This guide explains when a plain arithmetic mean is enough, when you need a credit-weighted average, and includes a worked example matching the grade average calculator.',
      sections: [
        {
          heading: 'What the arithmetic mean is',
          body: `The average = sum of grades \u00f7 number of grades. It condenses your performance across several subjects or assessments into a single number.
        
The grade average calculator treats every grade equally and also reports the highest and lowest grades alongside the average.`,
        },
        {
          heading: 'Simple or weighted?',
          body: `An arithmetic mean gives every subject equal weight. If your courses have different credit hours, a plain average will not reflect that — use the GPA calculator for credit-weighted work.
        
Empty fields are fine here: only the filled grades are counted.`,
        },
        {
          heading: 'A worked example',
          body: `Using the calculator\u2019s values: grades **85, 92, 78, 88**.
        
The average = (85 + 92 + 78 + 88) \u00f7 4 = 343 \u00f7 4 = **85.75**. Highest **92**, lowest **78**, and grades counted **4**.`,
        },
        {
          heading: 'Grades from different scales',
          body: `All grades must be on a single 0 to 100 scale. Mixing a score out of 50 with one out of 100 produces a meaningless average.
        
If you want to combine different maximums, convert the grades to one scale first.`,
        },
      ],
      keyTakeaways: [
        'Average = sum of grades \u00f7 number of grades.',
        'The average here is unweighted — use the GPA calculator for weighting.',
        'Only filled grades are counted; empty fields are ignored.',
        'All grades are on a 0 to 100 scale.',
      ],
      faqs: [
        {
          q: 'Does this calculator account for credit hours?',
          a: 'No, the average here is unweighted. For credit-weighted courses use the GPA calculator.',
        },
        {
          q: 'Can I average grades from different maximums?',
          a: 'No. The mean assumes a uniform 100-point scale; convert different scales to one before averaging.',
        },
      ],
      relatedCalculators: ['grade-average', 'gpa', 'final-grade-planner'],
      lastReviewed: '2026-08-10',
    },
  },

  'how-to-plan-your-final-grade': {
    ar: {
      slug: 'how-to-plan-your-final-grade',
      locale: 'ar',
      title: 'كيف تخطط لدرجتك النهائية',
      metaDescription:
        'دليل عملي لحساب الدرجة المطلوبة في الامتحان النهائي: صيغة المتوسط الموزون، قراءة النتائج المستحيلة، ومثال عددي مطابق لحاسبة درجة النجاح النهائية.',
      intro:
        'قبل الامتحان النهائي تحتاج سؤالاً واحداً عملياً: كم يجب أن أحصد فيه؟ يشرح هذا الدليل معادلة المتوسط الموزون، وكيف تقرأ النتائج، ومتى يكون الهدف مستحيلاً. يلتزم مثاله العددي بقيم حاسبة درجة النجاح النهائية في كلار.',
      sections: [
        {
          heading: 'المعادلة: متوسط موزون',
          body: `درجتك النهائية = (معدلك الحالي × وزن غير النهائي) + (درجة النهائي × وزن النهائي).
        
بمعنى آخر: **مساهمة معدلك الحالي** تحدد أساسك، والنهائي يعوض ما ينقص نحو الهدف.`,
        },
        {
          heading: 'حساب الدرجة المطلوبة',
          body: `الدرجة المطلوبة في النهائي = (الهدف − مساهمة معدلك الحالي) ÷ وزن النهائي.
        
أدخل وزن النهائي **كنسبة مئوية**: 30% تعني 30، وليس 0.3. هذه من أكثر الأخطاء شيوعاً.`,
        },
        {
          heading: 'مثال عملي',
          body: `لنأخذ مثالاً مطابقاً لقيم الحاسبة: معدل حالي **80**، وزن النهائي **30%**، هدف **85**.
        
المساهمة = 80 × (1 − 0.3) = **56**، وأعلى درجة يمكن تحقيقها = 56 + 100 × 0.3 = **86**، والمطلوب = (85 − 56) ÷ 0.3 ≈ **96.67**.`,
        },
        {
          heading: 'متى يكون الهدف مستحيلاً',
          body: `إذا تجاوزت الدرجة المطلوبة 100، فهدفك غير ممكن حتى بدرجة كاملة، وتُقيّد الحاسبة النتيجة عند 100.
        
على الجانب الآخر، إذا كانت الدرجة المطلوبة 0 أو أقل فهدفك محقق أصلاً بمعدلك الحالي.`,
        },
        {
          heading: 'أخطاء شائعة',
          body: `من الأخطاء: إدخال الوزن ككسر (0.3) بدل النسبة (30)، وتجاهل الوزن وحساب الفرق البسيط بين الهدف والحالي، وعدم الانتباه إلى أن النهائي قد يكون بأكثر من 100 درجة خام — المهم هو وزنه النسبي.`,
        },
      ],
      keyTakeaways: [
        'الدرجة النهائية متوسط موزون بين معدلك الحالي والامتحان النهائي.',
        'المطلوب في النهائي = (الهدف − مساهمة المعدل الحالي) ÷ وزن النهائي.',
        'أدخل الوزن كنسبة مئوية: 30% تعني 30 وليس 0.3.',
        'المطلوب فوق 100 يعني هدفاً غير ممكن، ودون 0 يعني هدفاً محققاً.',
      ],
      faqs: [
        {
          q: 'ماذا لو كانت الدرجة المطلوبة أكثر من 100؟',
          a: 'هدفك غير ممكن حتى بالدرجة الكاملة، لأن مساهمة معدلك الحالي لا تكفي. الحاسبة توقف النتيجة عند 100.',
        },
        {
          q: 'النهائي بأكثر من 100 درجة، ماذا أفعل؟',
          a: 'أدخل وزنه الحقيقي كنسبة من الدرجة الكلية؛ الحساب يعتمد على الوزن النسبي لا عدد الدرجات الخام.',
        },
      ],
      relatedCalculators: ['final-grade-planner', 'grade-average', 'gpa'],
      lastReviewed: '2026-08-10',
    },
    en: {
      slug: 'how-to-plan-your-final-grade',
      locale: 'en',
      title: 'How to plan your final grade',
      metaDescription:
        'A practical guide to the score you need on the final exam: the weighted-average formula, reading unreachable results, and a worked example matching the final grade planner.',
      intro:
        'Before a final exam you need one practical question answered: how much do I have to score? This guide explains the weighted-average formula, how to read the results, and when a target is out of reach. Its worked example sticks to the values used by Klar\u2019s final grade planner.',
      sections: [
        {
          heading: 'The formula: a weighted average',
          body: `Your final grade = (current grade \u00d7 non-final weight) + (final score \u00d7 final weight).
        
In other words, your **current contribution** sets your base, and the final closes whatever gap remains towards the target.`,
        },
        {
          heading: 'Working out the score you need',
          body: `Score needed on the final = (target \u2212 current contribution) \u00f7 final weight.
        
Enter the final\u2019s weight **as a percentage**: 30% means 30, not 0.3. This is one of the most common mistakes.`,
        },
        {
          heading: 'A worked example',
          body: `Using the calculator\u2019s values: current grade **80**, final weight **30%**, target **85**.
        
Contribution = 80 \u00d7 (1 \u2212 0.3) = **56**, maximum achievable = 56 + 100 \u00d7 0.3 = **86**, and the needed score = (85 \u2212 56) \u00f7 0.3 \u2248 **96.67**.`,
        },
        {
          heading: 'When the target is unreachable',
          body: `If the needed score exceeds 100, your target is unreachable even with a perfect score, and the calculator clamps the result to 100.
        
At the other end, if the needed score is 0 or below, your target is already secured by your current grade.`,
        },
        {
          heading: 'Common mistakes',
          body: `Among the mistakes: entering the weight as a fraction (0.3) instead of a percentage (30), ignoring the weight and using the simple gap between target and current grade, and missing that a final worth more than 100 raw points still works by its relative weight.`,
        },
      ],
      keyTakeaways: [
        'The final grade is a weighted average of your current grade and the final exam.',
        'Score needed = (target \u2212 current contribution) \u00f7 final weight.',
        'Enter the weight as a percentage: 30% means 30, not 0.3.',
        'Above 100 means the target is unreachable; at or below 0 it is already secured.',
      ],
      faqs: [
        {
          q: 'What if the score I need is over 100?',
          a: 'Your target is unreachable even with a perfect score, because your current contribution is not enough. The calculator clamps the result to 100.',
        },
        {
          q: 'My final is worth more than 100 raw points, what do I do?',
          a: 'Enter its true weight as a percentage of the total grade; the math uses the relative weight, not the raw point count.',
        },
      ],
      relatedCalculators: ['final-grade-planner', 'grade-average', 'gpa'],
      lastReviewed: '2026-08-10',
    },
  },

  'how-to-calculate-age': {
    ar: {
      slug: 'how-to-calculate-age',
      locale: 'ar',
      title: 'كيف تحسب العمر',
      metaDescription:
        'دليل عملي لحساب العمر بالتقويم الميلادي: الفرق التقويمي بين تاريخين، معالجة السنوات الكبيسة والمواليد في 29 فبراير، ومثال عددي مطابق لحاسبة العمر.',
      intro:
        'العمر رقم تقويمي: يُحسب بين تاريخ الميلاد وتاريخ معيّن بالسنوات والشهور والأيام. يشرح هذا الدليل كيف تعمل الحاسبة، وكيف تُعامل السنوات الكبيسة وأعياد الميلاد في 29 فبراير، مع مثال عددي مطابق لقيم حاسبة العمر في كلار.',
      sections: [
        {
          heading: 'العمر حساب تقويمي لا زمني',
          body: `العمر هنا يعني الفرق التقويمي بين تاريخ الميلاد وتاريخ الحساب: سنوات وشهور وأيام كاملة. لا يُحتسب الوقت من اليوم (ساعات ودقائق)، فالحساب على مستوى التواريخ وليس الطوابع الزمنية.
          
يُعالج الحساب أطوال الشهور المختلفة والسنوات الكبيسة تلقائياً، لأنه مبني على التقويم وليس على عدد ثابت من الأيام.`,
        },
        {
          heading: 'مثال عملي',
          body: `لنأخذ مثالاً مطابقاً لقيم الحاسبة: مواليد **2000-01-01** حتى **2024-01-01**.
          
النتيجة: العمر **24** سنة، أي **288** شهراً، أو **8,766** يوماً، أو **1,252** أسبوعاً. أيام حتى عيد الميلاد القادم: **0**.`,
        },
        {
          heading: 'السنوات الكبيسة ومواليد 29 فبراير',
          body: `في السنوات غير الكبيسة يُحتسب عيد ميلاد المولود في 29 فبراير في 28 فبراير أو 1 مارس حسب التقويم. تعتمد الحاسبة التقويم لا عدد الأيام الفعلية، فيكون العمر دقيقاً على أساس التقويم.`,
        },
        {
          heading: 'أخطاء شائعة',
          body: `من الأخطاء: الخلط بين التاريخ الهجري والميلادي (الحاسبة ميلادية حصراً)، وإدخال تاريخ الحساب نفسه كتاريخ ميلاد (يعطي عمراً صفراً)، وافتراض أن العمر يُقاس بالساعات والدقائق بدلاً من التواريخ.`,
        },
      ],
      keyTakeaways: [
        'العمر = الفرق التقويمي بالسنوات والشهور والأيام بين تاريخ الميلاد وتاريخ الحساب.',
        'تاريخ الحساب شامل: يشمل يوم العمر نفسه.',
        'الحساب بالتقويم الميلادي حصراً، ولا يُحتسب وقت اليوم.',
        'يُعالج يوم 29 فبراير في السنوات غير الكبيسة كـ 28 فبراير أو 1 مارس.',
      ],
      faqs: [
        {
          q: 'كيف تُعالج الحاسبة مواليد 29 فبراير؟',
          a: 'في السنوات غير الكبيسة يُحتسب العيد في 28 فبراير أو 1 مارس حسب التقويم، ويُعامل العمر على أساس التقويم لا الأيام الفعلية.',
        },
        {
          q: 'هل الحاسبة بالتاريخ الهجري أم الميلادي؟',
          a: 'ميلادية فقط. لحساب العمر بالهجري حوّل التاريخ الهجري إلى ميلادي أولاً.',
        },
      ],
      relatedCalculators: ['age', 'date-difference'],
      lastReviewed: '2026-08-10',
    },
    en: {
      slug: 'how-to-calculate-age',
      locale: 'en',
      title: 'How to calculate age',
      metaDescription:
        'A practical guide to age on the Gregorian calendar: the calendar difference between two dates, handling leap years and 29 February birthdays, with a worked example matching the age calculator.',
      intro:
        'Age is a calendar number: it is computed between a birth date and a given date in years, months and days. This guide explains how the calculator works, how it handles leap years and 29 February birthdays, and gives a worked example matching Klar\u2019s age calculator.',
      sections: [
        {
          heading: 'Age is a calendar calculation, not a time one',
          body: `Age here means the calendar difference between the birth date and the calculation date: complete years, months and days. Time of day (hours and minutes) is not counted \u2014 the math runs on dates, not timestamps.
          
The calculation handles varying month lengths and leap years automatically, because it is calendar-based rather than a fixed day count.`,
        },
        {
          heading: 'A worked example',
          body: `Using the calculator\u2019s values: born **2000-01-01**, as of **2024-01-01**.
          
The result: age **24** years, that is **288** months, or **8,766** days, or **1,252** weeks. Days until next birthday: **0**.`,
        },
        {
          heading: 'Leap years and 29 February birthdays',
          body: `In non-leap years, someone born on 29 February is counted as turning a year older on 28 February or 1 March per the calendar. The calculator follows the calendar rather than the actual day count, so the age stays precise on a calendar basis.`,
        },
        {
          heading: 'Common mistakes',
          body: `Among the mistakes: mixing Hijri and Gregorian dates (the calculator is Gregorian only), entering the calculation date as the birth date (yields age zero), and assuming age is measured in hours and minutes rather than dates.`,
        },
      ],
      keyTakeaways: [
        'Age = the calendar difference in years, months and days between birth and the calculation date.',
        'The calculation date is inclusive: it includes the day of the age itself.',
        'The calculation is Gregorian only, and time of day is not counted.',
        '29 February birthdays count on 28 February or 1 March in non-leap years.',
      ],
      faqs: [
        {
          q: 'How does the calculator handle 29 February births?',
          a: 'In non-leap years the birthday counts on 28 February or 1 March per the calendar, and age is handled on a calendar basis rather than actual days.',
        },
        {
          q: 'Is the calculator Hijri or Gregorian?',
          a: 'Gregorian only. To compute a Hijri age, first convert the Hijri date to Gregorian.',
        },
      ],
      relatedCalculators: ['age', 'date-difference'],
      lastReviewed: '2026-08-10',
    },
  },

  'how-to-count-days-between-dates': {
    ar: {
      slug: 'how-to-count-days-between-dates',
      locale: 'ar',
      title: 'كيف تعد الأيام بين تاريخين',
      metaDescription:
        'دليل عملي لعد الأيام بين تاريخين: التفصيل التقويمي بالسنوات والشهور والأيام، والعدد الدقيق للأيام والأسابيع، مع مثال عددي مطابق لحاسبة الفرق بين تاريخين.',
      intro:
        'حساب المدة بين تاريخين يظهر بوجهين: تفصيل تقويمي بالسنوات والشهور والأيام، وعدد إجمالي دقيق للأيام والأسابيع. يشرح هذا الدليل متى تستخدم أيهما، وماذا تعني البقية في صف الأيام، مع مثال عددي مطابق لحاسبة الفرق بين تاريخين في كلار.',
      sections: [
        {
          heading: 'التفصيل التقويمي مقابل العدد الدقيق',
          body: `التفصيل (سنوات وشهور وأيام) تقويمي: صف **الأيام** هو البقية بعد الأشهر الكاملة، وليس إجمالي الأيام. أما **إجمالي الأيام** فهو العدد الفعلي الدقيق، و**إجمالي الأسابيع** هو إجمالي الأيام مقسوماً على 7.
          
استخدم التفصيل عندما تريد المدة المعتادة في العقود والحسابات، وإجمالي الأيام عندما تريد العدد الحرفي.`,
        },
        {
          heading: 'مثال عملي',
          body: `لنأخذ مثالاً مطابقاً لقيم الحاسبة: **2020-01-01** إلى **2024-01-01**.
          
النتيجة: **4** سنوات، **0** شهر، **0** يوم. إجمالي الأيام **1,461** (لأن سنة 2020 كبيسة)، أي **208** أسابيع.`,
        },
        {
          heading: 'تاريخ النهاية مشمول',
          body: `يُحسب الفرق بطريقة تشمل يوم النهاية كجزء من المدة، بمقارنة التواريخ عند منتصف الليل بالتوقيت المحلي. هذا يفسر لماذا يكون إجمالي الأيام من 2020-01-01 إلى 2024-01-01 هو 1,461 وليس 1,460.`,
        },
        {
          heading: 'أخطاء شائعة',
          body: `من الأخطاء: عكس التاريخين (تمنعه الحاسبة بعرض خطأ)، والظن أن صف الأيام يساوي إجمالي الأيام، والخلط بين التاريخ الهجري والميلادي (الحساب ميلادي حصراً).`,
        },
      ],
      keyTakeaways: [
        'المدة تظهر تفصيلاً تقويمياً (سنوات وشهور وأيام) وعدداً دقيقاً (إجمالي الأيام والأسابيع).',
        'صف الأيام هو البقية بعد الأشهر الكاملة، وليس إجمالي الأيام.',
        'تاريخ النهاية مشمول في المدة.',
        'إجمالي الأسابيع = إجمالي الأيام ÷ 7.',
      ],
      faqs: [
        {
          q: 'هل تاريخ النهاية مشمول في الحساب؟',
          a: 'نعم، يُحسب الفرق بحيث يشمل يوم النهاية ضمن المدة، بمقارنة التواريخ عند منتصف الليل محلياً.',
        },
        {
          q: 'كيف تُعالج أطوال الشهور المختلفة؟',
          a: 'الحساب تقويمي: يضبط تلقائياً الفروق بين الشهور ذات الأطوال المختلفة والسنوات الكبيسة.',
        },
      ],
      relatedCalculators: ['date-difference', 'age'],
      lastReviewed: '2026-08-10',
    },
    en: {
      slug: 'how-to-count-days-between-dates',
      locale: 'en',
      title: 'How to count days between dates',
      metaDescription:
        'A practical guide to counting days between two dates: the calendar breakdown in years, months and days, and the exact total of days and weeks, with a worked example matching the date difference calculator.',
      intro:
        'The span between two dates appears two ways: a calendar breakdown into years, months and days, and an exact total of days and weeks. This guide explains when to use which, what the days residue means, and gives a worked example matching Klar\u2019s date difference calculator.',
      sections: [
        {
          heading: 'Calendar breakdown vs exact count',
          body: `The breakdown (years, months and days) is calendar-based: the **days** row is the residue after full months, not the total days. **Total days** is the actual exact count, and **total weeks** is total days divided by 7.
          
Use the breakdown when you want the conventional span used in contracts and everyday talk, and total days when you want the literal count.`,
        },
        {
          heading: 'A worked example',
          body: `Using the calculator\u2019s values: **2020-01-01** to **2024-01-01**.
          
The result: **4** years, **0** months, **0** days. Total days **1,461** (2020 is a leap year), that is **208** weeks.`,
        },
        {
          heading: 'The end date is included',
          body: `The difference is computed so that the end date\u2019s day counts within the span, by comparing the dates at local midnight. That is why the total days from 2020-01-01 to 2024-01-01 is 1,461 and not 1,460.`,
        },
        {
          heading: 'Common mistakes',
          body: `Among the mistakes: reversing the two dates (the calculator blocks it with an error), expecting the days row to equal the total days, and mixing Hijri and Gregorian dates (the calculation is Gregorian only).`,
        },
      ],
      keyTakeaways: [
        'The span shows as a calendar breakdown (years, months and days) and an exact count (total days and weeks).',
        'The days row is the residue after full months, not the total days.',
        'The end date counts within the span.',
        'Total weeks = total days \u00f7 7.',
      ],
      faqs: [
        {
          q: 'Is the end date included?',
          a: 'Yes. The difference is computed so that the end date\u2019s day counts within the span, by comparing dates at local midnight.',
        },
        {
          q: 'How are differing month lengths handled?',
          a: 'The calculation is calendar-based: it adjusts automatically for months of different lengths and for leap years.',
        },
      ],
      relatedCalculators: ['date-difference', 'age'],
      lastReviewed: '2026-08-10',
    },
  },

  'how-to-tip-appropriately': {
    ar: {
      slug: 'how-to-tip-appropriately',
      locale: 'ar',
      title: 'كيف تترك إكرامية مناسبة',
      metaDescription:
        'دليل عملي لحساب الإكرامية: نسبة من الفاتورة تُضاف إليها، تقسيم المبلغ بين المجموعة، ومثال عددي مطابق لحاسبة الإكرامية.',
      intro:
        'الإكرامية عرف اجتماعي وليست إلزاماً قانونياً، لكن معرفة قيمتها الصحيحة تجعل الدفع أسهل. يشرح هذا الدليل كيف تُحسب الإكرامية من الفاتورة، وكيف تُقسم بين مجموعة، مع مثال عددي مطابق لحاسبة الإكرامية في كلار.',
      sections: [
        {
          heading: 'الإكرامية نسبة من الفاتورة',
          body: `الإكرامية تُحسب كنسبة مئوية من قيمة الفاتورة وتُضاف إليها: الإكرامية = الفاتورة × النسبة ÷ 100، والإجمالي = الفاتورة + الإكرامية.
          
لا توجد نسبة إلزامية؛ اختر النسبة حسب جودة الخدمة وأعراف بلدك (مثلاً 10% شائعة في كثير من الأماكن).`,
        },
        {
          heading: 'مثال عملي',
          body: `لنأخذ مثالاً مطابقاً لقيم الحاسبة: فاتورة **120** وإكرامية **10%** لـ**4** أشخاص.
          
النتيجة: الإكرامية **12**، والإجمالي **132**، ونصيب كل شخص **33**.`,
        },
        {
          heading: 'تقسيم الفاتورة',
          body: `إذا تركنا حقل عدد الأشخاص فارغاً يُفترض شخص واحد. وعند التقسيم، يُقسم **الإجمالي** (الفاتورة + الإكرامية) على عدد الأشخاص، وليس الفاتورة وحدها ثم تُضاف الإكرامية بعد التقسيم.`,
        },
        {
          heading: 'أخطاء شائعة',
          body: `من الأخطاء: حساب الإكرامية على سعر مخفّض ثم إضافتها للفاتورة الأصلية، واحتساب نصيب الفرد قبل الإضافة ثم إضافة الإكرامية بعد التقسيم (مما يضاعفها)، وظن أن تغيير العملة يحوّل المبلغ — العملة للتنسيق فقط.`,
        },
      ],
      keyTakeaways: [
        'الإكرامية = الفاتورة × النسبة ÷ 100، والإجمالي = الفاتورة + الإكرامية.',
        'عدد الأشخاص يُفترض 1 إن تُرك فارغاً.',
        'نصيب الشخص = الإجمالي (مع الإكرامية) ÷ عدد الأشخاص.',
        'العملة للتنسيق فقط ولا يوجد تحويل بين العملات.',
      ],
      faqs: [
        {
          q: 'هل التقسيم مبني على الإجمالي مع الإكرامية؟',
          a: 'نعم، يُقسم الإجمالي (الفاتورة + الإكرامية) على عدد الأشخاص.',
        },
        {
          q: 'هل يمكنني الإكرامية بعملة مختلفة؟',
          a: 'لا، العملة تحدد تنسيق العرض فقط ولا تُجري أي تحويل.',
        },
      ],
      relatedCalculators: ['tip', 'unit-converter'],
      lastReviewed: '2026-08-10',
    },
    en: {
      slug: 'how-to-tip-appropriately',
      locale: 'en',
      title: 'How to tip appropriately',
      metaDescription:
        'A practical guide to calculating a tip: a percentage of the bill added to it, splitting the amount within a group, and a worked example matching the tip calculator.',
      intro:
        'Tipping is a social convention rather than a legal obligation, but knowing the right figure makes paying easier. This guide explains how a tip is computed from the bill, how it is split within a group, and gives a worked example matching Klar\u2019s tip calculator.',
      sections: [
        {
          heading: 'The tip is a percentage of the bill',
          body: `A tip is computed as a percentage of the bill and added to it: tip = bill \u00d7 percentage \u00f7 100, and total = bill + tip.
          
There is no mandatory rate; choose the percentage by service quality and local norms (for example 10% is common in many places).`,
        },
        {
          heading: 'A worked example',
          body: `Using the calculator\u2019s values: bill **120**, tip **10%**, for **4** people.
          
The result: tip **12**, total **132**, and each person pays **33**.`,
        },
        {
          heading: 'Splitting the bill',
          body: `If you leave the number of people empty, it defaults to one. When splitting, the **total** (bill + tip) is divided by the number of people \u2014 not the bill alone with the tip added after the split.`,
        },
        {
          heading: 'Common mistakes',
          body: `Among the mistakes: computing the tip on a discounted price and then adding it to the original bill, working out the per-person share before the tip and adding it again after the split (which doubles it), and assuming changing the currency converts the amount \u2014 the currency only formats it.`,
        },
      ],
      keyTakeaways: [
        'Tip = bill \u00d7 percentage \u00f7 100, and total = bill + tip.',
        'The number of people defaults to 1 when left empty.',
        'Per person = total (with tip) \u00f7 number of people.',
        'The currency is display-only; there is no conversion between currencies.',
      ],
      faqs: [
        {
          q: 'Is the split based on the total with tip?',
          a: 'Yes. The total (bill + tip) is divided by the number of people.',
        },
        {
          q: 'Can I tip in a different currency?',
          a: 'No. The currency only sets the display format and performs no conversion.',
        },
      ],
      relatedCalculators: ['tip', 'unit-converter'],
      lastReviewed: '2026-08-10',
    },
  },

  'how-to-convert-units': {
    ar: {
      slug: 'how-to-convert-units',
      locale: 'ar',
      title: 'كيف تحوّل الوحدات',
      metaDescription:
        'دليل عملي لتحويل الوحدات: عوامل ثابتة لمعظم الفئات، وعلاقة إزاحة خاصة للحرارة، وجدول بكل التحويلات، ومثال عددي مطابق لمحول الوحدات.',
      intro:
        'التحويل بين الوحدات أسهل مما يبدو: معظم التحويلات تعتمد ضرب القيمة بعامل ثابت، أما الحرارة فلها علاقة إزاحة خاصة. يشرح هذا الدليل الفرق بينهما، وكيف تقرأ جدول التحويلات، مع مثال عددي مطابق لمحول الوحدات في كلار.',
      sections: [
        {
          heading: 'التحويل بعوامل ثابتة',
          body: `معظم الفئات (الطول والوزن والمساحة والحجم) تُحوّل بضرب القيمة بعامل ثابت حول وحدة أساس: متر للطول، كيلوغرام للوزن، لتر للحجم. على سبيل المثال 1 كم = 1000 م، و1 كغ = 2.20462 رطل تقريباً.
          
الوحدتان يجب أن تكونا من نفس الفئة: لا يمكن تحويل كيلوغرام (وزن) إلى لتر (حجم).`,
        },
        {
          heading: 'الحرارة علاقة إزاحة لا نسبة',
          body: `مقاييس الحرارة تبدأ من نقاط صفر مختلفة: كلفن من الصفر المطلق، ومئوية وفهرنهايت من نقطة صفر أخرى. لذلك التحويل خطي بإزاحة وليس نسبة ثابتة: 100 °مئوية = 212 °فهرنهايت، و0 °مئوية = 273.15 كلفن، و**−40 °مئوية = −40 °فهرنهايت** (نقطة التقاء المقياسين).`,
        },
        {
          heading: 'مثال عملي',
          body: `لنأخذ مثالاً مطابقاً لقيم الحاسبة: **1000** من **م** إلى **كم**.
          
النتيجة: **1** كم، ويعرض الجدول أن 1000 م = **1,000,000** ملم، وهكذا لكل وحدة في فئة الطول.`,
        },
        {
          heading: 'أخطاء شائعة',
          body: `من الأخطاء: الخلط بين الجالون الأمريكي والإمبراطوري (الحاسبة تستخدم الأمريكي)، ومحاولة تحويل وحدات من فئات مختلفة، واختيار نفس الوحدة للتحويل من وإلى (تمنعه الحاسبة بعرض خطأ)، وتجاهل أن مئوية وكلفن لا تتحولان بعامل ثابت.`,
        },
      ],
      keyTakeaways: [
        'معظم التحويلات = القيمة × عامل الوحدة المصدر ÷ عامل الوحدة الهدف.',
        'الحرارة تحويل خطي بإزاحة: 100 °مئوية = 212 °فهرنهايت.',
        'الوحدتان يجب أن تكونا من نفس الفئة.',
        'تعرض الحاسبة جدولاً بكل التحويلات للفئة المختارة.',
      ],
      faqs: [
        {
          q: 'لماذا لا يمكنني تحويل الباوند إلى اللتر؟',
          a: 'الباوند وزن واللتر حجم، وهما فئتان مختلفتان. التحويل ممكن فقط بين وحدات من نفس الفئة.',
        },
        {
          q: 'هل تستخدم الحاسبة الجالون الأمريكي أم الإمبراطوري؟',
          a: 'الجالون الأمريكي (3.785 لتر). الجالون الإمبراطوري أكبر (4.546 لتر).',
        },
      ],
      relatedCalculators: ['unit-converter', 'tip'],
      lastReviewed: '2026-08-10',
    },
    en: {
      slug: 'how-to-convert-units',
      locale: 'en',
      title: 'How to convert units',
      metaDescription:
        'A practical guide to converting units: fixed factors for most categories, a special affine relationship for temperature, a table of every conversion, and a worked example matching the unit converter.',
      intro:
        'Converting units is easier than it looks: most conversions multiply the value by a fixed factor, while temperature has a special offset relationship. This guide explains the difference, how to read the conversion table, and gives a worked example matching Klar\u2019s unit converter.',
      sections: [
        {
          heading: 'Conversion by fixed factors',
          body: `Most categories (length, weight, area and volume) convert by multiplying the value by a fixed factor around a base unit: the metre for length, the kilogram for weight, the litre for volume. For example 1 km = 1000 m, and 1 kg \u2248 2.20462 lb.
          
Both units must belong to the same category: you cannot convert kilograms (weight) into litres (volume).`,
        },
        {
          heading: 'Temperature is an offset, not a ratio',
          body: `Temperature scales start from different zero points: Kelvin from absolute zero, Celsius and Fahrenheit from another zero. So the conversion is affine rather than a fixed ratio: 100 \u00b0C = 212 \u00b0F, 0 \u00b0C = 273.15 K, and **\u221240 \u00b0C = \u221240 \u00b0F** (the point where both scales meet).`,
        },
        {
          heading: 'A worked example',
          body: `Using the calculator\u2019s values: **1000** from **m** to **km**.
          
The result: **1** km, and the table shows 1000 m = **1,000,000** mm, and so on for every unit in the length category.`,
        },
        {
          heading: 'Common mistakes',
          body: `Among the mistakes: confusing the US gallon with the imperial gallon (the calculator uses the US one), trying to convert units from different categories, picking the same unit on both sides (the calculator blocks it with an error), and forgetting that Celsius and Kelvin do not convert by a fixed factor.`,
        },
      ],
      keyTakeaways: [
        'Most conversions = value \u00d7 source-unit factor \u00f7 target-unit factor.',
        'Temperature converts by an offset: 100 \u00b0C = 212 \u00b0F.',
        'Both units must belong to the same category.',
        'The calculator shows a table of every conversion for the chosen category.',
      ],
      faqs: [
        {
          q: 'Why can\u2019t I convert pounds to litres?',
          a: 'Pounds measure weight and litres measure volume \u2014 they are different categories. Conversion is only possible between units of the same category.',
        },
        {
          q: 'Does the calculator use the US or imperial gallon?',
          a: 'The US gallon (3.785 l). The imperial gallon is larger (4.546 l).',
        },
      ],
      relatedCalculators: ['unit-converter', 'tip'],
      lastReviewed: '2026-08-10',
    },
  },

  'how-to-calculate-markup-and-margin': {
    ar: {
      slug: 'how-to-calculate-markup-and-margin',
      locale: 'ar',
      title: 'كيف تحسب الترميز والهامش',
      metaDescription:
        'دليل عملي للفرق بين نسبة الترميز (markup) وهامش الربح (margin): القاعدتان المختلفتان، حالات الخسارة، ومثال عددي مطابق لحاسبة الربح والهامش.',
      intro:
        'نسبة الترميز وهامش الربح يصفان نفس الربح بقاعدتين مختلفتين، والخلط بينهما من أكثر أخطاء التسعير شيوعاً. يشرح هذا الدليل الفرق بينهما، ومتى تستخدم كلاً منهما، مع مثال عددي مطابق لحاسبة الربح والهامش في كلار.',
      sections: [
        {
          heading: 'قاعدتان مختلفتان لنفس الربح',
          body: `الترميز = الربح ÷ التكلفة × 100، والهامش = الربح ÷ سعر البيع × 100.
          
لأن المقامين مختلفان، يبدو الترميز دائماً أكبر من الهامش لنفس الربح. مثال: ربح 40 من تكلفة 80 وسعر بيع 120 يعطي ترميز **50%** وهامش **33.3%**.`,
        },
        {
          heading: 'مثال عملي',
          body: `لنأخذ مثالاً مطابقاً لقيم الحاسبة: تكلفة **80** وسعر بيع **120**.
          
النتيجة: الربح **40**، الترميز **50%**، والهامش **33.3%**.`,
        },
        {
          heading: 'متى أستخدم أيهما؟',
          body: `استخدم الترميز عندما تبدأ من التكلفة وتضيف نسبة (تسعير البيع). استخدم الهامش عندما تريد ربحاً معيناً من سعر البيع أو تقارن أداءك مع منافسين يعبرون بالهامش. الأهم أن تعرف أي قاعدة تستخدمها أنت ومن تخاطب.`,
        },
        {
          heading: 'حالات الخسارة',
          body: `عندما يقل سعر البيع عن التكلفة يكون الربح سالباً وتظهر النسبتان سالبتين. هذه إشارة واضحة أن السعر لا يغطي التكلفة، ولا يكفي خفض السعر دون النظر للتكلفة.`,
        },
      ],
      keyTakeaways: [
        'الترميز = الربح ÷ التكلفة، والهامش = الربح ÷ سعر البيع.',
        'الترميز أكبر من الهامش لنفس الربح.',
        'استخدم الترميز من التكلفة، والهامش من سعر البيع.',
        'الربح السالب يعطي نسبتين سالبتين (خسارة).',
      ],
      faqs: [
        {
          q: 'أي الرقمين أستخدم في التسعير؟',
          a: 'استخدم الترميز عندما تضيف نسبة على التكلفة، والهامش عندما تحدد الربح من سعر البيع. اعرف القاعدة التي تعمل بها من تخاطبهم.',
        },
        {
          q: 'هل يمكن أن تكون النسبتان سالبتين؟',
          a: 'نعم، عندما يقل سعر البيع عن التكلفة يعرض الحساب ربحاً سالباً ونسباً سالبة تعني خسارة.',
        },
      ],
      relatedCalculators: ['markup-margin', 'break-even', 'wholesale-retail'],
      lastReviewed: '2026-08-10',
    },
    en: {
      slug: 'how-to-calculate-markup-and-margin',
      locale: 'en',
      title: 'How to calculate markup and margin',
      metaDescription:
        'A practical guide to the difference between markup and margin: the two different bases, loss cases, and a worked example matching the markup & margin calculator.',
      intro:
        'Markup and margin describe the same profit on two different bases, and mixing them up is one of the most common pricing mistakes. This guide explains the difference, when to use each, and gives a worked example matching Klar\u2019s markup & margin calculator.',
      sections: [
        {
          heading: 'Two different bases for the same profit',
          body: `Markup = profit \u00f7 cost \u00d7 100, and margin = profit \u00f7 selling price \u00d7 100.
          
Because the bases differ, markup always looks larger than margin for the same profit. For example a profit of 40 from a cost of 80 and a price of 120 gives a markup of **50%** and a margin of **33.3%**.`,
        },
        {
          heading: 'A worked example',
          body: `Using the calculator\u2019s values: cost **80**, selling price **120**.
          
The result: profit **40**, markup **50%**, and margin **33.3%**.`,
        },
        {
          heading: 'When to use which',
          body: `Use markup when you start from cost and add a percentage (pricing for sale). Use margin when you want a specific profit out of the selling price or when comparing yourself with competitors who quote margins. The key is to know which base you and your audience are using.`,
        },
        {
          heading: 'Loss cases',
          body: `When the selling price falls below cost, profit is negative and both percentages show as negative. This is a clear signal that the price does not cover the cost, and lowering the price without looking at cost is not enough.`,
        },
      ],
      keyTakeaways: [
        'Markup = profit \u00f7 cost, and margin = profit \u00f7 selling price.',
        'Markup is larger than margin for the same profit.',
        'Use markup from cost, and margin from selling price.',
        'Negative profit yields two negative percentages (a loss).',
      ],
      faqs: [
        {
          q: 'Which number do I use when pricing?',
          a: 'Use markup when you add a percentage on top of cost, and margin when you set the profit out of the selling price. Know which base you and the people you talk to are using.',
        },
        {
          q: 'Can both percentages be negative?',
          a: 'Yes. When the selling price is below cost, the calculation shows a negative profit and negative percentages meaning a loss.',
        },
      ],
      relatedCalculators: ['markup-margin', 'break-even', 'wholesale-retail'],
      lastReviewed: '2026-08-10',
    },
  },

  'how-to-calculate-break-even': {
    ar: {
      slug: 'how-to-calculate-break-even',
      locale: 'ar',
      title: 'كيف تحسب نقطة التعادل',
      metaDescription:
        'دليل عملي لنقطة التعادل: وحدات التعادل من التكاليف الثابتة وهامش المساهمة، وشرط السعر فوق التكلفة المتغيرة، ومثال عددي مطابق لحاسبة نقطة التعادل.',
      intro:
        'نقطة التعادل تخبرك كم وحدة يجب أن تبيع حتى يغطي إيرادك كل التكاليف. يشرح هذا الدليل معادلة وحدات التعادل، وشرط أن يتجاوز السعر التكلفة المتغيرة، وماذا تعني النتيجة عملياً، مع مثال عددي مطابق لحاسبة نقطة التعادل في كلار.',
      sections: [
        {
          heading: 'المعادلة: التكاليف الثابتة ÷ هامش المساهمة',
          body: `وحدات التعادل = التكاليف الثابتة ÷ (سعر الوحدة − التكلفة المتغيرة للوحدة).
          
فرق السعر والتكلفة المتغيرة يسمى **هامش المساهمة**، وهو ما يغطي التكاليف الثابتة ثم يتحول إلى ربح بعد نقطة التعادل.`,
        },
        {
          heading: 'مثال عملي',
          body: `لنأخذ مثالاً مطابقاً لقيم الحاسبة: تكاليف ثابتة **10,000**، سعر الوحدة **50**، وتكلفة متغيرة **30**.
          
هامش المساهمة = 50 − 30 = **20**، ووحدات التعادل = 10,000 ÷ 20 = **500** وحدة، وإيراد التعادل = 500 × 50 = **25,000**.`,
        },
        {
          heading: 'شرط السعر فوق التكلفة المتغيرة',
          body: `إذا كان سعر الوحدة يساوي أو يقل عن تكلفتها المتغيرة فلا يوجد هامش مساهمة موجب، وبالتالي لا نقطة تعادل. تمنع الحاسبة هذه الحالة بعرض خطأ على سعر الوحدة.`,
        },
        {
          heading: 'ماذا تعني النتيجة؟',
          body: `أقل من 500 وحدة تعني خسارة، وأكثر منها تعني ربحاً. النتيجة قد تكون كسراً (مثل 500.5)، ويُستخدم العدد الصحيح المكافئ للتخطيط. بعد التعادل، كل وحدة إضافية تضيف هامش المساهمة كاملاً إلى الربح.`,
        },
      ],
      keyTakeaways: [
        'وحدات التعادل = التكاليف الثابتة ÷ (سعر الوحدة − التكلفة المتغيرة).',
        'هامش المساهمة = سعر الوحدة − التكلفة المتغيرة.',
        'إيراد التعادل = وحدات التعادل × سعر الوحدة.',
        'السعر يجب أن يزيد عن التكلفة المتغيرة وإلا فلا نقطة تعادل.',
      ],
      faqs: [
        {
          q: 'ماذا لو لم أصل إلى نقطة التعادل؟',
          a: 'أنت تخسر لأن الإيراد لا يغطي التكاليف. جرّب رفع السعر أو خفض التكاليف أو زيادة المبيعات وراقب أثر كل تغيير على وحدات التعادل.',
        },
        {
          q: 'هل تشمل التكاليف الثابتة الرواتب؟',
          a: 'نعم إذا كانت ثابتة لا تتغير مع المبيعات. العمولات والمدفوعات المتغيرة تُدخل ضمن التكلفة المتغيرة للوحدة.',
        },
      ],
      relatedCalculators: ['break-even', 'markup-margin', 'wholesale-retail'],
      lastReviewed: '2026-08-10',
    },
    en: {
      slug: 'how-to-calculate-break-even',
      locale: 'en',
      title: 'How to calculate break-even',
      metaDescription:
        'A practical guide to break-even: break-even units from fixed costs and contribution margin, the price-above-variable-cost condition, and a worked example matching the break-even calculator.',
      intro:
        'The break-even point tells you how many units you must sell until your revenue covers all costs. This guide explains the break-even formula, the condition that price must exceed variable cost, what the result means in practice, and gives a worked example matching Klar\u2019s break-even calculator.',
      sections: [
        {
          heading: 'The formula: fixed costs \u00f7 contribution margin',
          body: `Break-even units = fixed costs \u00f7 (price per unit \u2212 variable cost per unit).
          
The gap between price and variable cost is the **contribution margin**: it covers fixed costs, then turns into profit beyond the break-even point.`,
        },
        {
          heading: 'A worked example',
          body: `Using the calculator\u2019s values: fixed costs **10,000**, price **50**, variable cost **30**.
          
Contribution margin = 50 \u2212 30 = **20**, break-even units = 10,000 \u00f7 20 = **500** units, and break-even revenue = 500 \u00d7 50 = **25,000**.`,
        },
        {
          heading: 'The price-above-variable-cost condition',
          body: `If the price equals or falls below the variable cost, there is no positive contribution margin and therefore no break-even point. The calculator blocks this case with an error on the price per unit.`,
        },
        {
          heading: 'What the result means',
          body: `Below 500 units you lose money; above it you make a profit. The result can be fractional (like 500.5), and the equivalent whole number is used for planning. Beyond break-even, every extra unit adds the full contribution margin to profit.`,
        },
      ],
      keyTakeaways: [
        'Break-even units = fixed costs \u00f7 (price per unit \u2212 variable cost).',
        'Contribution margin = price per unit \u2212 variable cost.',
        'Break-even revenue = break-even units \u00d7 price per unit.',
        'The price must exceed the variable cost, otherwise there is no break-even point.',
      ],
      faqs: [
        {
          q: 'What if I never reach break-even?',
          a: 'You are losing money because revenue does not cover costs. Try raising the price, cutting costs or increasing sales, and watch how break-even units change with each move.',
        },
        {
          q: 'Do fixed costs include salaries?',
          a: 'Yes, if they are fixed and do not change with sales. Commissions and variable payments belong in the variable cost per unit.',
        },
      ],
      relatedCalculators: ['break-even', 'markup-margin', 'wholesale-retail'],
      lastReviewed: '2026-08-10',
    },
  },

  'how-to-price-wholesale-and-retail': {
    ar: {
      slug: 'how-to-price-wholesale-and-retail',
      locale: 'ar',
      title: 'كيف تسعّر الجملة والتجزئة',
      metaDescription:
        'دليل عملي لتحديد سعر التجزئة من تكلفة الجملة ونسبة الترميز على الوحدة، مع مثال عددي مطابق لحاسبة سعر الجملة والتجزئة.',
      intro:
        'عند شراء بضاعة جملة تحتاج سعر تجزئة يحقق الربح الذي تريده مع بقاء السعر مقبولاً للعميل. يشرح هذا الدليل معادلة سعر التجزئة من تكلفة الجملة ونسبة الترميز لكل وحدة، مع مثال عددي مطابق لحاسبة سعر الجملة والتجزئة في كلار.',
      sections: [
        {
          heading: 'المعادلة: تكلفة الجملة × (1 + الترميز)',
          body: `سعر التجزئة = تكلفة الجملة × (1 + نسبة الترميز ÷ 100)، والربح على الوحدة = سعر التجزئة − التكلفة.
          
النسبة تُحسب من التكلفة (ترميز) وليس من سعر البيع (هامش). ترميز 100% على تكلفة 15 يعني سعراً 30 وليس هامش 100%.`,
        },
        {
          heading: 'مثال عملي',
          body: `لنأخذ مثالاً مطابقاً لقيم الحاسبة: تكلفة جملة **15** وترميز **60%**.
          
سعر التجزئة = 15 × 1.6 = **24**، والربح على الوحدة = 24 − 15 = **9**.`,
        },
        {
          heading: 'لكل وحدة وليس للدفعة',
          body: `المدخلات لكل وحدة واحدة. إذا اشتريت صندوقاً بـ 10 وحدات وبعت كل وحدة بسعر محسوب من تكلفتها وحدها، فاجعل التكلفة المدخلة هي تكلفة الوحدة الواحدة لا تكلفة الصندوق.`,
        },
        {
          heading: 'اختيار نسبة الترميز',
          body: `اختر نسبة تغطي تكاليفك التشغيلية (نقل، تخزين، تسويق) وربحك، مع مراعاة أسعار المنافسين. لا تنس إضافة ضريبة القيمة المضافة على السعر النهائي المعروض للعميل.`,
        },
      ],
      keyTakeaways: [
        'سعر التجزئة = تكلفة الجملة × (1 + نسبة الترميز ÷ 100).',
        'الترميز نسبة من التكلفة وليس من سعر البيع.',
        'المدخلات لكل وحدة واحدة، وليس للدفعة كاملة.',
        'السعر الناتج قبل الضريبة؛ أضف الضريبة عند العرض.',
      ],
      faqs: [
        {
          q: 'كيف أختار نسبة الترميز؟',
          a: 'أضف هامشاً يغطي تكاليفك التشغيلية ويربحك، مع مقارنة أسعار المنافسين وقيمة ما تقدمه. لا توجد نسبة واحدة صحيحة.',
        },
        {
          q: 'هل يشمل السعر ضريبة القيمة المضافة؟',
          a: 'لا. الحاسبة تعطي السعر قبل الضريبة، وعليك إضافة الضريبة المطبقة في بلدك.',
        },
      ],
      relatedCalculators: ['wholesale-retail', 'markup-margin', 'break-even'],
      lastReviewed: '2026-08-10',
    },
    en: {
      slug: 'how-to-price-wholesale-and-retail',
      locale: 'en',
      title: 'How to price wholesale and retail',
      metaDescription:
        'A practical guide to setting a retail price from wholesale cost and a per-unit markup, with a worked example matching the wholesale to retail calculator.',
      intro:
        'When you buy goods wholesale you need a retail price that earns your target profit while staying acceptable to the customer. This guide explains the retail formula from wholesale cost and per-unit markup, and gives a worked example matching Klar\u2019s wholesale to retail calculator.',
      sections: [
        {
          heading: 'The formula: wholesale cost \u00d7 (1 + markup)',
          body: `Retail price = wholesale cost \u00d7 (1 + markup percentage \u00f7 100), and profit per unit = retail price \u2212 cost.
          
The percentage is based on cost (markup), not on selling price (margin). A 100% markup on a cost of 15 means a price of 30, not a 100% margin.`,
        },
        {
          heading: 'A worked example',
          body: `Using the calculator\u2019s values: wholesale cost **15**, markup **60%**.
          
Retail price = 15 \u00d7 1.6 = **24**, and profit per unit = 24 \u2212 15 = **9**.`,
        },
        {
          heading: 'Per unit, not per batch',
          body: `The inputs are per single unit. If you bought a box of 10 units and sell each at a price derived from its own cost, enter the cost of one unit, not the box.`,
        },
        {
          heading: 'Choosing the markup',
          body: `Pick a percentage that covers your operating costs (shipping, storage, marketing) and your profit, while considering competitor prices. Do not forget to add VAT on the final price shown to the customer.`,
        },
      ],
      keyTakeaways: [
        'Retail price = wholesale cost \u00d7 (1 + markup percentage \u00f7 100).',
        'Markup is a percentage of cost, not of selling price.',
        'The inputs are per single unit, not for the whole batch.',
        'The resulting price is pre-tax; add tax when pricing.',
      ],
      faqs: [
        {
          q: 'How do I choose the markup?',
          a: 'Add enough margin to cover your operating costs and earn profit, while comparing competitor prices and the value you offer. There is no single right percentage.',
        },
        {
          q: 'Does the price include VAT?',
          a: 'No. The calculator gives the pre-tax price; add the tax applied in your country.',
        },
      ],
      relatedCalculators: ['wholesale-retail', 'markup-margin', 'break-even'],
      lastReviewed: '2026-08-10',
    },
  },
};

export default guides;
