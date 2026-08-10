import type { GuideContent } from './types';
import type { Locale } from '../config/site';

/**
 * Guides content — one entry per guide slug, localized in Arabic and English.
 * Each guide links to one or more calculators via relatedCalculators.
 * Worked examples mirror the example inputs of the related calculators.
 * Last reviewed: 2026-08-09.
 */
const guides: Record<string, Record<Locale, GuideContent>> = {
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
};

export default guides;
