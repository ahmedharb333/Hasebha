import type { StaticPageContent } from './types';
import type { Locale } from '../config/site';

/**
 * Static pages content (about, contact, methodology, legal pages).
 * Localized here so wording can be reviewed and edited in one place.
 * Last updated: 2026-08-09.
 */
const pages: Record<string, Record<Locale, StaticPageContent>> = {
  about: {
    ar: {
      slug: 'about',
      locale: 'ar',
      title: 'من نحن',
      metaDescription:
        'موقع حاسبها يقدّم حاسبات مالية وحاسبات عمل واضحة وشفافة بالعربية والإنجليزية. تعرّف على رسالتنا ومبادئنا التحريرية وكيفية مراجعة المحتوى.',
      sections: [
        {
          heading: 'ما هو حاسبها',
          body: `حاسبها موقع ثنائي اللغة (العربية افتراضياً مع توفر الإنجليزية) يقدّم حاسبات مالية وحاسبات عمل مجانية، واضحة وشفافة. ننشر المحتوى بهدف واحد: مساعدتك على فهم قراراتك المالية وقرارات العمل اليومية دون غموض أو تعقيد.

الاسم «حاسبها» يعكس نهجنا: لا صناديق سوداء ولا افتراضات خفية؛ الأرقام التي تراها أرقام يمكنك تتبّعها وفهمها.`,
        },
        {
          heading: 'ماذا ننشر',
          body: `ننشر نوعين من المحتوى:

**حاسبات** تغطي موضوعات مالية ومتعلقة بالعمل مثل القروض، والفائدة المركبة، وأهداف الادخار، والضريبة المضافة، والخصومات والنسب المئوية، وتحويل الراتب، وأجر العمل الإضافي، وأسعار الساعة للمستقلين، والتكلفة الكلية للموظف، ورصيد الإجازات. تعرض كل حاسبة افتراضاتها وتتيح لك تعديل المدخلات.

**أدلة** تشرح كيف تعمل الحسابات، ومتى يكون استخدامها مناسباً، وأين يتوقف كونها دليلاً موثوقاً.`,
        },
        {
          heading: 'مبادئنا التحريرية',
          body: `نلتزم بقواعد بسيطة في كل محتوى ننشره. نهدف إلى الدقة والوضوح. لا نختلق ادعاءات ولا مصادر ولا أشخاصاً ولا نتائج. نراجع المحتوى ونعرض تواريخ المراجعة. وعندما نكون غير متأكدين، نقول ذلك بوضوح ونوجّهك إلى مصادر رسمية للتحقق.`,
        },
        {
          heading: 'الاستقلالية والشفافية',
          body: `حاسبها مستقل في خياراته التحريرية. الإعلانات والروابط التابعة معطّلة افتراضياً، وإن فُعّلت في أي وقت فسيُعلن عنها بوضوح. نتائج الحسابات تقديرية لأغراض إرشادية فقط، ولا تُعد نصيحة مالية أو ضريبية أو استثمارية أو قانونية أو متعلقة بالتوظيف أو الرواتب.`,
        },
        {
          heading: 'من يدير حاسبها',
          body: `يدير حاسبها فريق صغير من المحرّرين والكُتّاب والمطوّرين. ستُنشر أسماء وبيانات تواصل المالك والمراجعين هنا فور توفّرها. لأي أسئلة أو اقتراحات أو تصحيحات، يرجى استخدام صفحة التواصل معنا.`,
        },
        {
          heading: 'آخر تحديث',
          body: 'حُدّثت هذه الصفحة في 2026-08-09.',
        },
      ],
      lastUpdated: '2026-08-09',
    },
    en: {
      slug: 'about',
      locale: 'en',
      title: 'About us',
      metaDescription:
        'Hasebha builds clear, transparent financial and employment calculators in Arabic and English. Read about our mission and editorial principles.',
      sections: [
        {
          heading: 'What is Hasebha',
          body: `Hasebha (حاسبها) is a bilingual website — Arabic by default, with an English version — offering free, clear and transparent financial and employment calculators. Everything we publish serves one goal: to help you make sense of everyday money and work decisions without jargon or guesswork.

The name means “count it” in Arabic, and it reflects our approach: no black boxes and no hidden assumptions — every number you see is one you can follow.`,
        },
        {
          heading: 'What we publish',
          body: `We publish two kinds of content:

**Calculators** covering finance and employment topics such as loan payments, compound interest, savings goals, VAT, discounts and percentages, salary conversion, overtime pay, freelance hourly rates, total employee cost, and leave balances. Each calculator states its assumptions and lets you adjust the inputs.

**Guides** that explain how the calculations work, when they are useful, and where they stop being reliable.`,
        },
        {
          heading: 'Editorial principles',
          body: `Our content follows a few simple rules. We aim for accuracy and clarity. We do not invent claims, sources, people or results. We review content and show review dates. When we are not certain, we say so, and we point you to official sources for verification.`,
        },
        {
          heading: 'Independence and transparency',
          body: `Hasebha is independent in its editorial choices. Advertising and affiliate recommendations are disabled by default and, if ever enabled, would always be clearly disclosed. Calculator results are estimates for informational purposes only and do not constitute financial, tax, investment, legal, payroll or employment advice.`,
        },
        {
          heading: 'Who is behind Hasebha',
          body: `Hasebha is maintained by a small team of editors, writers and developers. The names and contact details of the owner and reviewers will be published here as soon as they are available. For questions, suggestions or corrections, please use the contact page.`,
        },
        {
          heading: 'Last updated',
          body: 'This page was last updated on 2026-08-09.',
        },
      ],
      lastUpdated: '2026-08-09',
    },
  },

  contact: {
    ar: {
      slug: 'contact',
      locale: 'ar',
      title: 'تواصل معنا',
      metaDescription:
        'تواصل مع فريق حاسبها لطرح الأسئلة أو إبداء الملاحظات أو الإبلاغ عن الأخطاء في الحاسبات والأدلة، وتعرّف على طريقة الرد المتوقعة من الفريق.',
      sections: [
        {
          heading: 'يسعدنا تواصلك معنا',
          body: `نرحّب بملاحظاتك وأسئلتك حول الحاسبات والأدلة. سواء وجدت خطأً في إحدى الحاسبات، أو لديك اقتراح لحاسبة جديدة، أو فكرة لتحسين المحتوى، فملاحظاتك تساعدنا على تقديم الأفضل.`,
        },
        {
          heading: 'كيف تتواصل معنا',
          body: `يستخدم الموقع نموذج تواصل يعتمد على البريد الإلكتروني: عند إرسال النموذج تُفتح تطبيق البريد على جهازك برسالة مُعدّة مسبقاً، تُرسل من بريدك الإلكتروني مباشرة. لا يخزّن الموقع رسالتك على خادم خاص به، ولا نعرض هنا عنوان بريد لم نتحقق منه بعد. ستُنشر بيانات التواصل الرسمية عند توفّرها.`,
        },
        {
          heading: 'متى تتوقع رداً',
          body: `نبذل جهدنا للرد خلال أيام عمل قليلة، دون التزام بزمن محدد. لا يمكننا تقديم نصيحة مالية أو قانونية أو ضريبية فردية عبر المراسلات، ويرجى عدم إرفاق بيانات شخصية حساسة أو معلومات مالية مفصلة في رسائلك.`,
        },
        {
          heading: 'الإبلاغ عن أخطاء في الحسابات',
          body: `إذا بدت نتيجة إحدى الحاسبات غير صحيحة، فأخبرنا باسم الحاسبة والمدخلات التي استخدمتها والنتيجة التي توقّعتها. راجع صفحة منهجية الحساب لفهم الافتراضات التي تقوم عليها كل أداة.`,
        },
        {
          heading: 'آخر تحديث',
          body: 'حُدّثت هذه الصفحة في 2026-08-09.',
        },
      ],
      lastUpdated: '2026-08-09',
    },
    en: {
      slug: 'contact',
      locale: 'en',
      title: 'Contact us',
      metaDescription:
        'Contact the Hasebha team with questions, feedback, or correction requests about our calculators and guides. Learn what to expect and how we reply.',
      sections: [
        {
          heading: 'We would love to hear from you',
          body: `We welcome your feedback and questions about our calculators and guides. Whether you found an error in a calculator, have an idea for a new one, or want to suggest an improvement, your input helps us do better.`,
        },
        {
          heading: 'How to reach us',
          body: `The site uses a mailto-based contact form: submitting the form opens a pre-addressed message in your default email application, and you send it from your own email account. The site does not store your message on its own server, and no official email address is displayed until it has been verified.`,
        },
        {
          heading: 'When to expect a reply',
          body: `We aim to reply within a few working days, though we cannot guarantee a specific timeframe. We cannot give individual financial, tax or legal advice through correspondence, so please do not include sensitive personal or financial details in your message.`,
        },
        {
          heading: 'Reporting calculation issues',
          body: `If a calculator result looks wrong, tell us the name of the calculator, the inputs you used, and the result you expected. Reviewing the methodology page can help you understand the assumptions behind each tool.`,
        },
        {
          heading: 'Last updated',
          body: 'This page was last updated on 2026-08-09.',
        },
      ],
      lastUpdated: '2026-08-09',
    },
  },

  methodology: {
    ar: {
      slug: 'methodology',
      locale: 'ar',
      title: 'منهجية الحساب',
      metaDescription:
        'كيف نُبني حاسبات حاسبها ونراجعها: محركات حساب مستقلة عن اللغة، افتراضات واضحة، تواريخ مراجعة محدّثة، ومتى يجب التحقق من المصادر الرسمية.',
      sections: [
        {
          heading: 'كيف تُبنى الحاسبات',
          body: `نفصل محرك الحساب عن المحتوى المترجم: تعمل الحسابات بمحرك واحد مستقل عن اللغة، وتُضاف حوله نصوص وواجهات محلية بالعربية والإنجليزية. يضمن هذا تطابق النتائج بين اللغتين ويمنع انحراف المعادلات عند ترجمة النصوص.`,
        },
        {
          heading: 'المعادلات والافتراضات',
          body: `نعتمد معادلات قياسية معروفة في المجال المالي وحسابات العمل، ونعرض افتراضات كل حاسبة بوضوح داخل الأداة نفسها. عند اعتماد قواعد خاصة بدولة معيّنة نوضّح ذلك، وتخضع هذه القواعد للمراجعة الدورية.`,
        },
        {
          heading: 'المراجعة والتحديث',
          body: `نراجع المحتوى والحاسبات بشكل دوري، ونعرض تاريخ آخر مراجعة في الصفحات. سيُثبت اسم المراجع المعتمد هنا عند توفّره. الأسعار والقوانين قابلة للتغيير، لذلك نحدّث الصفحات عند حدوث تغيّرات جوهرية.`,
        },
        {
          heading: 'حدود الحسابات',
          body: `نتائج الحاسبات تقديرية لأغراض إرشادية فقط، وقد تختلف عن التطبيق الرسمي في بلدك. الحسابات ليست بديلاً عن النصائح المهنية أو عن التحقق لدى الجهات المختصة، خاصة في القرارات المهمة.`,
        },
        {
          heading: 'المصادر',
          body: `نشرح في سياسة المصادر كيف نختار المصادر ونراجعها، ومبدأنا في عدم اختلاق أي مرجع. للاطلاع على التفاصيل، راجع صفحة سياسة المصادر.`,
        },
        {
          heading: 'آخر تحديث',
          body: 'حُدّثت هذه الصفحة في 2026-08-09.',
        },
      ],
      lastUpdated: '2026-08-09',
    },
    en: {
      slug: 'methodology',
      locale: 'en',
      title: 'Methodology',
      metaDescription:
        'How Hasebha calculators are built and reviewed: language-neutral engines, clearly stated assumptions, review dates, and when to verify with official sources.',
      sections: [
        {
          heading: 'How calculators are built',
          body: `We keep the calculation engine separate from the localized content: every calculator runs on a language-neutral engine, with Arabic and English texts and interfaces layered around it. This keeps results identical across languages and prevents formulas from drifting when text is translated.`,
        },
        {
          heading: 'Formulas and assumptions',
          body: `We use standard, well-known formulas from finance and employment practice, and each calculator displays its assumptions clearly within the tool. Where a calculator relies on country-specific rules, we say so, and those rules are subject to periodic review.`,
        },
        {
          heading: 'Review and updates',
          body: `We review content and calculators on a regular basis and show the last review date on our pages. The name of the approved reviewer will be added here once available. Rates and regulations can change, so we refresh pages whenever a material change occurs.`,
        },
        {
          heading: 'Limitations',
          body: `Calculator results are estimates for informational purposes only and may differ from the official application in your country. They are not a substitute for professional advice or for checking with the relevant authorities on important decisions.`,
        },
        {
          heading: 'Sources',
          body: `Our sources policy explains how we choose and review sources, and our rule against fabricated references. See the sources policy page for details.`,
        },
        {
          heading: 'Last updated',
          body: 'This page was last updated on 2026-08-09.',
        },
      ],
      lastUpdated: '2026-08-09',
    },
  },

  'editorial-policy': {
    ar: {
      slug: 'editorial-policy',
      locale: 'ar',
      title: 'السياسة التحريرية',
      metaDescription:
        'معاييرنا التحريرية: الاستقلالية، الدقة، الشفافية، عملية التصحيح، والإفصاح الواضح عن الإعلانات والروابط التابعة المعطّلة افتراضياً.',
      sections: [
        {
          heading: 'الاستقلالية',
          body: `لا تؤثر الإعلانات أو الشراكات على ما ننشره أو على ترتيب المحتوى. نختار موضوعاتنا بناءً على احتياجات المستخدمين وجودة المحتوى وحدها، ولا ننشر محتوى مدفوعاً يُقدَّم كمحتوى تحريري.`,
        },
        {
          heading: 'الدقة والشفافية',
          body: `نتحقق من المعلومات قبل النشر، ونعرض افتراضات الحسابات وتواريخ المراجعة، ونوضّح حدود المعرفة عندما لا تكون الإجابة قاطعة. نهدف إلى أن يفهم القارئ كيف وصلنا إلى كل رقم.`,
        },
        {
          heading: 'لا ادعاءات مختلقة',
          body: `لا نختلق إحصاءات أو مصادر أو شهادات أو أشخاصاً أو نتائج. كل ما نذكره قابل للتحقق، أو نبيّن أنه تقدير أو رأي.`,
        },
        {
          heading: 'عملية التصحيح',
          body: `عند ورود تقرير عن خطأ، نتحقق منه ونتخذ الإجراء المناسب خلال وقت معقول، ونصوّب المعلومة بوضوح عند الثبوت، مع تحديث تاريخ المراجعة. يمكنك الإبلاغ عن الأخطاء عبر صفحة التواصل معنا.`,
        },
        {
          heading: 'الإعلانات والروابط التابعة',
          body: `الإعلانات والروابط التابعة معطّلة افتراضياً في الموقع. إذا فُعّلت مستقبلاً، فستُوسم بوضوح وبشكل ثابت، ولن تؤثر أبداً على المحتوى أو على توصياتنا.`,
        },
        {
          heading: 'الحقائق مقابل الرأي',
          body: `نفرّق بين ما نعرفه كحقيقة وما هو حكم أو تقدير. تُبنى الحسابات على معادلات قابلة للتحقق، بينما تُعرض الآراء والتقديرات بعبارات صريحة.`,
        },
        {
          heading: 'آخر تحديث',
          body: 'حُدّثت هذه الصفحة في 2026-08-09.',
        },
      ],
      lastUpdated: '2026-08-09',
    },
    en: {
      slug: 'editorial-policy',
      locale: 'en',
      title: 'Editorial policy',
      metaDescription:
        'Our editorial standards: independence, accuracy, transparency, a public correction process, and clear disclosure of advertising and affiliate links.',
      sections: [
        {
          heading: 'Independence',
          body: `Advertising and partnerships do not influence what we publish or how content is ordered. We choose topics based only on readers' needs and on content quality, and we never present paid content as editorial content.`,
        },
        {
          heading: 'Accuracy and transparency',
          body: `We verify information before publishing, show the assumptions behind every calculator, display review dates, and acknowledge the limits of our knowledge when an answer is not clear-cut. Our goal is for readers to see how we arrived at every number.`,
        },
        {
          heading: 'No invented claims',
          body: `We do not fabricate statistics, sources, testimonials, people or results. Anything we state is verifiable, or is presented explicitly as an estimate or an opinion.`,
        },
        {
          heading: 'Corrections',
          body: `When a mistake is reported, we investigate and take appropriate action within a reasonable time. If an error is confirmed, we correct it clearly and update the review date. You can report errors through the contact page.`,
        },
        {
          heading: 'Advertising and affiliate links',
          body: `Advertising and affiliate links are disabled by default across the site. If they are ever enabled, they will be labeled consistently and clearly, and they will never influence editorial content or recommendations.`,
        },
        {
          heading: 'Facts versus opinion',
          body: `We distinguish between what we know as fact and what is a judgment or estimate. Calculations are built on verifiable formulas, while opinions and estimates are presented in explicit language.`,
        },
        {
          heading: 'Last updated',
          body: 'This page was last updated on 2026-08-09.',
        },
      ],
      lastUpdated: '2026-08-09',
    },
  },

  'sources-policy': {
    ar: {
      slug: 'sources-policy',
      locale: 'ar',
      title: 'سياسة المصادر',
      metaDescription:
        'كيف يختار حاسبها المصادر: الاعتماد على مصادر رسمية وما يقاربها، وعرض تواريخ المراجعة، وإجراء التصحيحات، وعدم اختلاق أي مراجع مطلقاً.',
      sections: [
        {
          heading: 'مبدأنا في اختيار المصادر',
          body: `نفضّل عند النشر المصادر الرسمية وما يقاربها: الجهات الحكومية، والهيئات التنظيمية، وأجهزة الإحصاء، والحاسبات الرسمية المعتمدة. عندما نعتمد على مصادر عامة موثوقة أخرى، نذكرها بوضوح.`,
        },
        {
          heading: 'متى ننشر المصادر',
          body: `حيثما أمكن، نذكر الأساس الذي تُبنى عليه الحسابات والصفحات. إذا لم يتوفر مصدر رسمي منشور لموضوع معيّن، نقول ذلك صراحةً بدل التلميح إلى وجود مصدر غير موجود.`,
        },
        {
          heading: 'تواريخ المراجعة',
          body: `تحمل صفحات الموقع تاريخ آخر مراجعة أو تحديث، ونجدّد المصادر عند تغيّر القوانين أو الأسعار أو اللوائح. إذا لم نتمكن من تحديث معلومة في وقتها، ننصحك بالتحقق من المصدر الرسمي مباشرة.`,
        },
        {
          heading: 'التصحيحات',
          body: `إذا اكتشفنا أننا اعتمدنا على مصدر بشكل غير صحيح، نصحّح الصفحة سريعاً ونحدّث تاريخ المراجعة، ونوضّح التصحيح عند الاقتضاء.`,
        },
        {
          heading: 'لا مراجع مختلقة',
          body: `لا نختلق أي مرجع أو استشهاد. إذا لم نتمكن من التحقق من معلومة، لا ننشرها كحقيقة، ولا نضيف أسماء مصادر غير حقيقية لأغراض المظهر.`,
        },
        {
          heading: 'آخر تحديث',
          body: 'حُدّثت هذه الصفحة في 2026-08-09.',
        },
      ],
      lastUpdated: '2026-08-09',
    },
    en: {
      slug: 'sources-policy',
      locale: 'en',
      title: 'Sources policy',
      metaDescription:
        'How Hasebha chooses sources: official and official-adjacent references, visible review dates, corrections, and a strict rule against fabricated references.',
      sections: [
        {
          heading: 'Our sourcing principle',
          body: `Whenever we publish, we prefer official and official-adjacent sources: government bodies, regulators, statistical authorities, and official calculators. Where we rely on other reputable public sources, we name them clearly.`,
        },
        {
          heading: 'When sources are published',
          body: `Wherever practical, we note the basis on which a calculator or page is built. If no official published source exists for a particular topic, we say so openly rather than implying a source that does not exist.`,
        },
        {
          heading: 'Review dates',
          body: `Our pages carry a last-reviewed or last-updated date, and we refresh sources as laws, rates and regulations change. If we cannot update an item promptly, we advise you to verify directly with the official source.`,
        },
        {
          heading: 'Corrections',
          body: `If we discover we relied on a source incorrectly, we correct the page promptly, update its review date, and note the correction where appropriate.`,
        },
        {
          heading: 'No fabricated references',
          body: `We never invent a citation or reference. If we cannot verify a piece of information, we do not publish it as fact, and we never add fictional source names to make content look more authoritative.`,
        },
        {
          heading: 'Last updated',
          body: 'This page was last updated on 2026-08-09.',
        },
      ],
      lastUpdated: '2026-08-09',
    },
  },

  privacy: {
    ar: {
      slug: 'privacy',
      locale: 'ar',
      title: 'سياسة الخصوصية',
      metaDescription:
        'سياسة خصوصية حاسبها: جمع بيانات محدود، تحليلات معطّلة افتراضياً ولا تُفعّل إلا بموافقتك، عدم تتبّع أي قيم مالية، وحقوقك في بياناتك.',
      sections: [
        {
          heading: 'نطاق هذه السياسة',
          body: `توضح هذه السياسة كيف نتعامل مع المعلومات عند زيارتك للموقع واستخدامك للحاسبات والأدلة. نعتمد مبدأ الحد الأدنى من جمع البيانات، ونعمل على أن يكون كل ما تجريه في متصفحك خاصاً بك.`,
        },
        {
          heading: 'البيانات التي نجمعها',
          body: `لا يتطلب الموقع إنشاء حساب. تُجرى الحسابات داخل متصفحك ولا نرسل مدخلاتك أو نتائجك، ولا نجمع أي قيم مالية مثل المبالغ أو الرواتب أو نسب الفائدة. قد نخزّن إعدادات تقنية محدودة محلياً على جهازك لتشغيل الموقع بشكل صحيح.`,
        },
        {
          heading: 'التحليلات',
          body: `التحليلات معطّلة افتراضياً ولا يُحمَّل أي كود تتبع إلا بعد موافقتك الصريحة. حتى عند التفعيل، لا تُضمَّن القيم المالية أبداً في أحداث التحليلات. يمكنك إدارة موافقتك أو سحبها في أي وقت من مدير الموافقة أو إعدادات المتصفح.`,
        },
        {
          heading: 'الكوكيز والموافقة',
          body: `نستخدم الكوكيز الأساسية الضرورية لتشغيل الموقع وتذكّر خيار موافقتك. تُحمَّل أي تقنيات أخرى كالتحليلات والإعلانات فقط بعد الحصول على موافقتك، كما هو مفصّل في سياسة الكوكيز.`,
        },
        {
          heading: 'الإعلانات',
          body: `الإعلانات معطّلة افتراضياً في الموقع ولا نعرض أي إعلانات في الوقت الحالي. إذا تغيّر ذلك مستقبلاً، ستُحدَّث هذه السياسة وسيُعلن عن أي شركاء بوضوح.`,
        },
        {
          heading: 'الروابط الخارجية',
          body: `قد يحتوي الموقع روابط لمواقع خارجية. لا تنطبق هذه السياسة على تلك المواقع، وننصحك بمراجعة سياسات الخصوصية الخاصة بها.`,
        },
        {
          heading: 'حقوقك',
          body: `يمكنك طلب معلومات عن البيانات المرتبطة بك، أو تصحيحها أو حذفها، حسب ما ينطبق في بلدك، عبر صفحة التواصل معنا. نحن لا نبيع بياناتك الشخصية لأي طرف، ولا نشاركها لأغراض تسويقية.`,
        },
        {
          heading: 'آخر تحديث',
          body: 'حُدّثت هذه الصفحة في 2026-08-09.',
        },
      ],
      lastUpdated: '2026-08-09',
    },
    en: {
      slug: 'privacy',
      locale: 'en',
      title: 'Privacy policy',
      metaDescription:
        "Hasebha's privacy policy: minimal data collection, analytics off by default and consent-gated, financial values never tracked, and your rights.",
      sections: [
        {
          heading: 'Scope of this policy',
          body: `This policy explains how we handle information when you visit the site and use our calculators and guides. We follow a data-minimization principle, and we work so that everything you do in your browser stays yours.`,
        },
        {
          heading: 'What we collect',
          body: `The site does not require an account. Calculations run entirely in your browser, and we do not send or store your inputs or results. We never collect financial values such as amounts, salaries or interest rates. We may store a limited amount of technical settings locally on your device to keep the site working correctly.`,
        },
        {
          heading: 'Analytics',
          body: `Analytics are disabled by default, and no tracking code loads until you give explicit consent. Even when enabled, financial values are never included in analytics events. You can manage or withdraw your consent at any time through the consent manager or your browser settings.`,
        },
        {
          heading: 'Cookies and consent',
          body: `We use essential cookies needed for the site to work and to remember your consent choice. Any other technologies, such as analytics or advertising, load only after your consent, as detailed in the cookies policy.`,
        },
        {
          heading: 'Advertising',
          body: `Advertising is disabled by default and no ads are currently shown on the site. If that changes in the future, this policy will be updated and any partners will be disclosed clearly.`,
        },
        {
          heading: 'Third-party links',
          body: `The site may link to external websites. This policy does not apply to those sites, and we recommend reviewing their privacy policies.`,
        },
        {
          heading: 'Your rights',
          body: `You may request information about, correction of, or deletion of data relating to you, as applicable in your country, through the contact page. We never sell your personal data and never share it for marketing purposes.`,
        },
        {
          heading: 'Last updated',
          body: 'This page was last updated on 2026-08-09.',
        },
      ],
      lastUpdated: '2026-08-09',
    },
  },

  cookies: {
    ar: {
      slug: 'cookies',
      locale: 'ar',
      title: 'سياسة الكوكيز',
      metaDescription:
        'الكوكيز التي يستخدمها حاسبها: كوكيز أساسية فقط افتراضياً، وتحليلات وإعلانات لا تُفعّل إلا بموافقتك، وكيفية إدارة الموافقة وسحبها في أي وقت.',
      sections: [
        {
          heading: 'ما هي الكوكيز',
          body: `الكوكيز ملفات نصية صغيرة يخزّنها المتصفح على جهازك لتساعد الموقع على التذكّر والعمل بشكل صحيح. بعضها ضروري لتشغيل الموقع، وبعضها الآخر اختياري ولا يُستخدم إلا بموافقتك.`,
        },
        {
          heading: 'الكوكيز الأساسية',
          body: `نستخدم كوكيز ضرورية لتشغيل الموقع وتذكّر اختيارك المتعلق بالموافقة. لا يمكن تعطيلها لأن الموقع قد لا يعمل بدونها، ولا تخدم أي غرض تسويقي أو تتبّع.`,
        },
        {
          heading: 'كوكيز التحليلات',
          body: `التحليلات معطّلة افتراضياً ولا تُحمَّل سكربتاتها إلا بعد موافقتك الصريحة. عند التفعيل، تُستخدم لفهم كيفية استخدام الموقع بشكل عام لتحسينه، ولا تتضمن القيم المالية التي تُدخلها في الحاسبات إطلاقاً.`,
        },
        {
          heading: 'كوكيز الإعلانات',
          body: `الإعلانات معطّلة افتراضياً في الموقع، ولا نحمّل أي كوكيز أو سكربتات إعلانية حالياً. إذا فُعّلت الإعلانات مستقبلاً، فلن تُحمَّل إلا بعد موافقتك وبما يتوافق مع هذه السياسة.`,
        },
        {
          heading: 'إدارة الموافقة وسحبها',
          body: `يمكنك تغيير خيارات الموافقة في أي وقت من مدير الموافقة في الموقع أو من إعدادات المتصفح لحذف الكوكيز وضبط سلوكه. سحب موافقتك لا يؤثر على استخدام الحاسبات نفسها.`,
        },
        {
          heading: 'تغييرات على هذه السياسة',
          body: `قد نحدّث سياسة الكوكيز عند تغيّر تقنيات الموقع أو الشركاء. يظهر تاريخ آخر تحديث في نهاية هذه الصفحة.`,
        },
        {
          heading: 'آخر تحديث',
          body: 'حُدّثت هذه الصفحة في 2026-08-09.',
        },
      ],
      lastUpdated: '2026-08-09',
    },
    en: {
      slug: 'cookies',
      locale: 'en',
      title: 'Cookies policy',
      metaDescription:
        'What cookies Hasebha uses: essential cookies only by default, analytics and advertising loaded only with your consent, and how to manage or withdraw consent.',
      sections: [
        {
          heading: 'What cookies are',
          body: `Cookies are small text files that your browser stores on your device to help a site remember and work correctly. Some are essential for the site to function; others are optional and are used only with your consent.`,
        },
        {
          heading: 'Essential cookies',
          body: `We use essential cookies needed for the site to operate and to remember your consent choice. They cannot be disabled because the site may not work without them, and they serve no marketing or tracking purpose.`,
        },
        {
          heading: 'Analytics cookies',
          body: `Analytics are disabled by default, and analytics scripts load only after your explicit consent. When enabled, they help us understand generally how the site is used so we can improve it, and they never include the financial values you enter into calculators.`,
        },
        {
          heading: 'Advertising cookies',
          body: `Advertising is disabled by default, and no advertising cookies or scripts are currently loaded. If advertising is ever enabled, it will load only with your consent and in line with this policy.`,
        },
        {
          heading: 'Managing and withdrawing consent',
          body: `You can change your consent choices at any time through the site's consent manager or your browser settings, which also let you delete cookies and control their behavior. Withdrawing consent does not affect your ability to use the calculators themselves.`,
        },
        {
          heading: 'Changes to this policy',
          body: `We may update this cookies policy as the site's technology or partners change. The last-updated date appears at the end of this page.`,
        },
        {
          heading: 'Last updated',
          body: 'This page was last updated on 2026-08-09.',
        },
      ],
      lastUpdated: '2026-08-09',
    },
  },

  terms: {
    ar: {
      slug: 'terms',
      locale: 'ar',
      title: 'شروط الاستخدام',
      metaDescription:
        'شروط استخدام حاسبها: الاستخدام المسموح للحاسبات، النتائج تقديرية وليست نصيحة مهنية أو مالية، حدود المسؤولية، وعدم ضمان دقة النتائج.',
      sections: [
        {
          heading: 'قبول الشروط',
          body: `باستخدامك لهذا الموقع فأنت توافق على هذه الشروط. إذا كنت لا توافق عليها، فيرجى عدم استخدام الموقع. ننصحك بقراءة هذه الصفحة إلى جانب إخلاء المسؤولية وسياسة الخصوصية.`,
        },
        {
          heading: 'الاستخدام المسموح',
          body: `صُمّم الموقع للاستخدام الشخصي ولأغراض إرشادية. يمكنك استخدام الحاسبات بحرية، ولا يجوز إساءة استخدام الموقع، أو محاولة تعطيله، أو إعادة تقديم نتائجه على أنها نتائج رسمية أو صادرة عن جهة معتمدة.`,
        },
        {
          heading: 'النتائج تقديرية وليست نصيحة',
          body: `نتائج الحاسبات تقديرية لأغراض إرشادية فقط، ولا تُعد نصيحة مالية أو ضريبية أو استثمارية أو قانونية أو متعلقة بالتوظيف أو الرواتب. يجب التحقق من أي قرار مهم مع مختصين مؤهلين والجهات الرسمية.`,
        },
        {
          heading: 'حدود المسؤولية',
          body: `نقدّم الموقع والمحتوى كما هو («على حالته»)، دون أي ضمانات صريحة أو ضمنية. لا نتحمل المسؤولية عن القرارات المتخذة بناءً على النتائج، أو عن الأضرار الناتجة عن استخدام الموقع، إلى أقصى حد يسمح به القانون.`,
        },
        {
          heading: 'لا ضمانات',
          body: `نبذل جهدنا لدقة المحتوى وتحديثه، لكننا لا نضمن خلوّه من الأخطاء ولا استمرار توفّره دون انقطاع. الأسعار والقوانين قابلة للتغيير وقد تتأخر التحديثات عن التغييرات الفعلية.`,
        },
        {
          heading: 'القانون الحاكم',
          body: `بما أن الموقع لم يُعلن بعد عن كيان قانوني أو نطاق قضائي محدد، فإن هذه الشروط تخضع للقوانين المعمول بها في مكان استخدام الموقع، وبما لا يتعارض مع أي متطلبات محلية إلزامية.`,
        },
        {
          heading: 'تغييرات على هذه الشروط',
          body: `قد نعدّل هذه الشروط من وقت لآخر، ويُشار إلى التحديث بتاريخ النهاية. استمرارك في استخدام الموقع بعد التحديث يعني قبولك للشروط المعدّلة.`,
        },
        {
          heading: 'آخر تحديث',
          body: 'حُدّثت هذه الصفحة في 2026-08-09.',
        },
      ],
      lastUpdated: '2026-08-09',
    },
    en: {
      slug: 'terms',
      locale: 'en',
      title: 'Terms of use',
      metaDescription:
        "Hasebha's terms of use: acceptable use of our calculators, results are estimates and not professional advice, limits of liability, and no guarantee of results.",
      sections: [
        {
          heading: 'Acceptance of terms',
          body: `By using this website, you agree to these terms. If you do not agree, please do not use the site. We recommend reading this page alongside the disclaimer and the privacy policy.`,
        },
        {
          heading: 'Permitted use',
          body: `The site is designed for personal, informational use. You may use the calculators freely, but you may not misuse the site, attempt to disrupt it, or present its results as official or as issued by a recognized authority.`,
        },
        {
          heading: 'Estimates, not advice',
          body: `Calculator results are estimates for informational purposes only and do not constitute financial, tax, investment, legal, payroll or employment advice. Always verify important decisions with qualified professionals and official authorities.`,
        },
        {
          heading: 'Limits of liability',
          body: `We provide the site and its content “as is”, without warranties of any kind, express or implied. To the maximum extent permitted by law, we are not liable for decisions made based on the results, or for damages arising from your use of the site.`,
        },
        {
          heading: 'No guarantee',
          body: `We make a good-faith effort to keep content accurate and up to date, but we do not guarantee that the site is error-free or continuously available. Rates and regulations can change, and updates may lag behind actual changes.`,
        },
        {
          heading: 'Governing law',
          body: `Because the site does not yet declare a specific legal entity or jurisdiction, these terms are governed by the laws applicable where the site is used, to the extent consistent with any mandatory local requirements.`,
        },
        {
          heading: 'Changes to these terms',
          body: `We may revise these terms from time to time, and revisions are indicated by the date at the end of this page. Your continued use of the site after a revision means you accept the updated terms.`,
        },
        {
          heading: 'Last updated',
          body: 'This page was last updated on 2026-08-09.',
        },
      ],
      lastUpdated: '2026-08-09',
    },
  },

  disclaimer: {
    ar: {
      slug: 'disclaimer',
      locale: 'ar',
      title: 'إخلاء المسؤولية',
      metaDescription:
        'إخلاء مسؤولية حاسبها: النتائج تقديرية لأغراض إرشادية فقط، وليست نصيحة مالية أو ضريبية أو قانونية أو متعلقة بالتوظيف. تحقق مع المختصين.',
      sections: [
        {
          heading: 'تنويه عام',
          body: `نتائج الحاسبات في حاسبها تقديرية لأغراض إرشادية فقط، ولا تُعد نصيحة مالية أو ضريبية أو استثمارية أو قانونية أو متعلقة بالتوظيف أو الرواتب. يبقى التحقق من أي معلومة قبل الاعتماد عليها مسؤولية المستخدم.`,
        },
        {
          heading: 'ليست نصيحة مهنية',
          body: `لا يحل المحتوى هنا محل الاستشارة المهنية المتخصصة. عند اتخاذ قرارات مالية أو ضريبية أو استثمارية أو قانونية أو متعلقة بالعمل، استشر مختصين مؤهلين في مجالهم.`,
        },
        {
          heading: 'الأسعار والقوانين قابلة للتغيير',
          body: `الأسعار والنسب والقوانين واللوائح عرضة للتغيير في أي وقت، وقد لا تعكس المعلومات المنشورة أحدث التحديثات. تحقق دائماً من المصادر الرسمية المحدثة.`,
        },
        {
          heading: 'الحاسبات الخاصة بدولة معيّنة',
          body: `تُبنى بعض الحاسبات على قواعد خاصة بدولة معيّنة تخضع للمراجعة. قد تختلف النتائج عن التطبيق الرسمي في بلدك؛ تحقق دائماً مع الجهات المختصة.`,
        },
        {
          heading: 'العوائد الافتراضية',
          body: `العوائد المستخدمة في الحاسبات الاستثمارية افتراضية ولن تُضمن. الاستثمار ينطوي على مخاطر، وقد تكون النتائج الفعلية مختلفة.`,
        },
        {
          heading: 'تحقق دائماً',
          body: `ننصحك بالتحقق من أي نتيجة مهمة مع مختصين مؤهلين والجهات الرسمية قبل اتخاذ أي قرار. نتائج الحسابات أدوات إرشادية وليست قرارات ملزمة.`,
        },
        {
          heading: 'آخر تحديث',
          body: 'حُدّثت هذه الصفحة في 2026-08-09.',
        },
      ],
      lastUpdated: '2026-08-09',
    },
    en: {
      slug: 'disclaimer',
      locale: 'en',
      title: 'Disclaimer',
      metaDescription:
        "Hasebha's disclaimer: calculator results are estimates for informational purposes and not financial, tax, legal or payroll advice. Verify with professionals.",
      sections: [
        {
          heading: 'General notice',
          body: `The results produced by Hasebha calculators are estimates provided for informational purposes only and do not constitute financial, tax, investment, legal, payroll or employment advice. You are responsible for verifying any information before relying on it.`,
        },
        {
          heading: 'Not professional advice',
          body: `Nothing on this site is a substitute for specialized professional advice. Before making financial, tax, investment, legal or employment decisions, consult qualified professionals in the relevant field.`,
        },
        {
          heading: 'Rates and regulations change',
          body: `Rates, percentages, laws and regulations can change at any time, and the information on this site may not always reflect the latest updates. Always check current official sources.`,
        },
        {
          heading: 'Country-specific calculators',
          body: `Some calculators are built on country-specific rules that are subject to review. Results may differ from the official application in your country; always check with the relevant authorities.`,
        },
        {
          heading: 'Hypothetical returns',
          body: `Returns used in investment-related calculators are hypothetical and not guaranteed. Investing involves risk, and actual results may differ.`,
        },
        {
          heading: 'Always verify',
          body: `We recommend verifying any important result with qualified professionals and official authorities before making a decision. Calculator results are guidance tools, not binding decisions.`,
        },
        {
          heading: 'Last updated',
          body: 'This page was last updated on 2026-08-09.',
        },
      ],
      lastUpdated: '2026-08-09',
    },
  },
};

export default pages;
