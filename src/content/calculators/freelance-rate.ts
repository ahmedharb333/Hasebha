import type { CalcContent } from '../../lib/calculators/types';
import type { Locale } from '../../config/site';

const ar: CalcContent = {
  locale: 'ar',
  slug: 'freelance-rate',
  title: 'حاسبة سعر الساعة للمستقلين',
  metaDescription:
    'حدد الحد الأدنى والسعر الموصى به للساعة والأجر اليومي لمشروعك الحر مع احتساب المصاريف والإجازات والضرائب.',
  h1: 'حاسبة سعر الساعة للمستقلين',
  intro:
    'حدد الحد الأدنى لأجرك بالساعة والسعر الموصى به مع مراعاة المصاريف السنوية، والوقت غير القابل للفوترة، والإجازات، وأيام المرض، والاحتياطي الضريبي، وهامش الربح المستهدف.',
  fields: {
    desiredIncome: {
      label: 'الدخل السنوي المستهدف',
      hint: 'صافي المبلغ الذي تريد جنيّه قبل المصاريف.',
    },
    annualExpenses: {
      label: 'المصاريف السنوية',
      hint: 'تكاليف العمل السنوية مثل الأدوات والاشتراكات والتسويق.',
    },
    taxReservePct: {
      label: 'نسبة احتياطي الضرائب (%)',
      hint: 'من 0 إلى 50؛ نسبة تقريبية ترفع إيرادك المستهدف لتغطية الضرائب.',
    },
    nonBillablePct: {
      label: 'النسبة غير القابلة للفوترة (%)',
      hint: 'من 0 إلى 90؛ وقت يُقضى في التسويق والإدارة والتواصل بدلاً من العمل المدفوع.',
    },
    vacationDays: {
      label: 'أيام الإجازة السنوية',
      hint: 'عدد أيام العطل المدفوعة الأجر خلال السنة.',
    },
    sickDays: {
      label: 'أيام المرض المتوقعة',
      hint: 'عدد الأيام المتوقعة للغياب لأسباب صحية.',
    },
    hoursPerWeek: {
      label: 'ساعات العمل في الأسبوع',
      hint: 'إجمالي ساعات العمل الأسبوعية قبل خصم الوقت غير القابل للفوترة.',
    },
    profitMarginPct: {
      label: 'هامش الربح المستهدف (%)',
      hint: 'من 0 إلى 100؛ يرفع السعر الموصى به فوق الحد الأدنى.',
    },
    projectHours: {
      label: 'ساعات المشروع',
      hint: 'اختياري؛ يُستخدم لحساب تسعيرة مشروع معيّن.',
    },
    currency: {
      label: 'العملة',
    },
  },
  errorMessages: {
    required: 'هذا الحقل مطلوب.',
    invalid: 'أدخل قيمة صحيحة.',
    min: 'القيمة أقل من الحد الأدنى المسموح.',
    max: 'القيمة أكبر من الحد الأقصى المسموح.',
    __generic: 'يرجى مراجعة الحقول المحددة وإعادة المحاولة.',
  },
  results: {
    minimumHourly: {
      label: 'الحد الأدنى للأجر بالساعة',
      hint: 'أقل سعر يغطي دخلك المستهدف والمصاريف والضرائب.',
    },
    recommendedHourly: {
      label: 'السعر الموصى به للساعة',
      hint: 'الحد الأدنى مع هامش الربح المستهدف.',
    },
    dailyRate: {
      label: 'الأجر اليومي الموصى به',
      hint: 'السعر الموصى به للساعة × ساعات اليوم.',
    },
    projectRate: {
      label: 'تسعيرة المشروع',
      hint: 'السعر الموصى به للساعة × ساعات المشروع المُدخلة.',
    },
    billableHours: {
      label: 'الساعات القابلة للفوترة سنوياً',
      hint: 'الساعات الفعلية التي يمكن أن تفوترها بعد خصم غير القابل للفوترة والإجازات.',
    },
  },
  resultTitle: 'النتائج',
  formula:
    'الساعات القابلة للفوترة = (ساعات الأسبوع × 52) × (1 − النسبة غير القابلة للفوترة) − (أيام الإجازة + أيام المرض) × ساعات اليوم. الإيراد المطلوب = (الدخل + المصاريف) ÷ (1 − نسبة الضرائب). الحد الأدنى للساعة = الإيراد المطلوب ÷ الساعات القابلة للفوترة.',
  exampleHtml:
    'الدخل المستهدف: <strong>36,000</strong> + المصاريف: 4,000 → الإيراد قبل الضرائب ≈ <strong>44,444</strong><br>بعد خصم 20% غير قابلة للفوترة و25 يوماً إجازة ومرض: الساعات القابلة للفوترة ≈ <strong>1,464</strong> ساعة<br>الحد الأدنى للساعة ≈ <strong>30.36</strong><br>مع هامش ربح 15%: السعر الموصى به ≈ <strong>35.72</strong><br>مشروع من 200 ساعة ≈ <strong>7,143</strong>',
  assumptions: [
    '52 أسبوع عمل و5 أيام عمل في الأسبوع.',
    'الدخل والمصاريف والنسب المذكورة كلها قيم سنوية.',
    'نسبة احتياطي الضرائب احتياط تقديري وليست جدول ضرائب رسمياً.',
    'اشتراكات التقاعد أو التأمين الصحي تُحتسب فقط إذا أدرجتها في المصاريف.',
    'النتائج تقديرية وتعتمد على مدخلاتك ووضعك الخاص.',
  ],
  whenUseful:
    'مفيد عند بدء عمل حر أو إعادة تسعير خدماتك، أو قبل التفاوض مع عميل، للتأكد من أن أسعارك تغطي مصاريفك وإجازاتك وضرائبك.',
  mistakes: [
    'نسيان الوقت غير القابل للفوترة مثل التسويق والإدارة.',
    'تجاهل الإجازات وأيام المرض عند حساب سعر الساعة.',
    'إغفال مصاريف العمل السنوية والاحتياطي الضريبي.',
    'افتراض أن كل ساعات العمل قابلة للفوترة.',
  ],
  faqs: [
    {
      q: 'ما الفرق بين الحد الأدنى والسعر الموصى به؟',
      a: 'الحد الأدنى يغطي دخلك المستهدف والمصاريف والضرائب فقط، أما السعر الموصى به فيضيف هامش ربح مستهدفاً فوق ذلك.',
    },
    {
      q: 'لماذا تُخصم نسبة غير قابلة للفوترة؟',
      a: 'لأن جزءاً من وقتك يذهب للتسويق والرد على العملاء والإدارة، وهو وقت لا تدفع عنه، لذا يجب أن يغطي سعر الساعة المدفوع هذه الساعات.',
    },
    {
      q: 'هل تعتبر نسبة الضرائب التزاماً فعلياً؟',
      a: 'لا، هي احتياط تقديري. تختلف الالتزامات الضريبية من بلد إلى آخر، ويجب استشارة الجهات المختصة لتحديد التزاماتك.',
    },
    {
      q: 'لماذا تختلف تسعيرة المشروع؟',
      a: 'تُحسب التسعيرة بضرب السعر الموصى به للساعة في عدد ساعات المشروع، وتُظهر لك أثر السعر على مشروع معيّن.',
    },
  ],
  methodologyNote:
    'يحسب الحاسب الساعات القابلة للفوترة سنوياً بعد خصم الوقت غير القابل للفوترة والإجازات، ثم يقسم الإيراد المستهدف (الدخل والمصاريف مع احتياطي الضرائب) على هذه الساعات. تُراجع هذه الصفحة دورياً، والنتائج تقديرية وتعتمد على قوانين بلدك ووضعك الضريبي، لذا تحقق من الأرقام مع جهة مختصة.',
  disclaimerNote:
    'هذه النتيجة تقديرية لأغراض إعلامية فقط ولا تُعد مشورة مالية أو ضريبية. تحقق من التزاماتك الضريبية والقانونية لدى الجهات المختصة.',
  lastReviewed: '2026-08-09',
  currencyDefault: 'USD',
  currencyLabel: 'العملة',
  requiredNote: 'الحقول التي تحمل علامة * مطلوبة.',
  buttons: {
    calculate: 'احسب',
    reset: 'إعادة تعيين',
    copy: 'نسخ',
    copied: 'تم النسخ',
    share: 'مشاركة',
    example: 'مثال',
  },
  ui: {
    resultTitle: 'النتائج',
    copySuccess: 'تم نسخ النتائج.',
    copyFail: 'تعذر نسخ النتائج.',
    shareFail: 'تعذر مشاركة النتائج.',
    ariaResult: 'نتائج حاسبة سعر الساعة للمستقلين',
  },
  guideTitle: 'دليل: كيف يحدد المستقلون أسعارهم',
  relatedTitle: 'حاسبات ذات صلة',
};

const en: CalcContent = {
  locale: 'en',
  slug: 'freelance-rate',
  title: 'Freelancer hourly-rate calculator',
  metaDescription:
    'Find your minimum and recommended hourly rate and project rates, accounting for expenses, leave and taxes.',
  h1: 'Freelancer hourly-rate calculator',
  intro:
    'Find your minimum and recommended hourly rates while accounting for annual expenses, non-billable time, vacation, sick days, a tax reserve and your target profit margin.',
  fields: {
    desiredIncome: {
      label: 'Desired annual income',
      hint: 'The net amount you want to earn before expenses.',
    },
    annualExpenses: {
      label: 'Annual business expenses',
      hint: 'Yearly work costs such as tools, subscriptions and marketing.',
    },
    taxReservePct: {
      label: 'Tax reserve (%)',
      hint: 'Between 0 and 50; an approximate rate that raises your target revenue to cover taxes.',
    },
    nonBillablePct: {
      label: 'Non-billable time (%)',
      hint: 'Between 0 and 90; time spent on marketing, admin and communication instead of paid work.',
    },
    vacationDays: {
      label: 'Vacation days',
      hint: 'Number of paid days off during the year.',
    },
    sickDays: {
      label: 'Sick days',
      hint: 'Expected number of days off for health reasons.',
    },
    hoursPerWeek: {
      label: 'Working hours per week',
      hint: 'Total weekly working hours before deducting non-billable time.',
    },
    profitMarginPct: {
      label: 'Target profit margin (%)',
      hint: 'Between 0 and 100; raises the recommended rate above the minimum.',
    },
    projectHours: {
      label: 'Project hours',
      hint: 'Optional; used to price a specific project.',
    },
    currency: {
      label: 'Currency',
    },
  },
  errorMessages: {
    required: 'This field is required.',
    invalid: 'Enter a valid value.',
    min: 'The value is below the allowed minimum.',
    max: 'The value exceeds the allowed maximum.',
    __generic: 'Please review the highlighted fields and try again.',
  },
  results: {
    minimumHourly: {
      label: 'Minimum hourly rate',
      hint: 'The lowest rate that covers your target income, expenses and taxes.',
    },
    recommendedHourly: {
      label: 'Recommended hourly rate',
      hint: 'The minimum rate plus your target profit margin.',
    },
    dailyRate: {
      label: 'Recommended daily rate',
      hint: 'Recommended hourly rate × hours per day.',
    },
    projectRate: {
      label: 'Project rate',
      hint: 'Recommended hourly rate × the project hours you entered.',
    },
    billableHours: {
      label: 'Billable hours per year',
      hint: 'Hours you can actually invoice after deducting non-billable time and leave.',
    },
  },
  resultTitle: 'Results',
  formula:
    'Billable hours = (weekly hours × 52) × (1 − non-billable %) − (vacation + sick days) × hours per day. Required revenue = (income + expenses) ÷ (1 − tax %). Minimum hourly = required revenue ÷ billable hours.',
  exampleHtml:
    'Target income: <strong>36,000</strong> + expenses: 4,000 → revenue before taxes ≈ <strong>44,444</strong><br>After 20% non-billable time and 25 days of vacation and sick leave: billable hours ≈ <strong>1,464</strong><br>Minimum hourly rate ≈ <strong>30.36</strong><br>With a 15% profit margin: recommended rate ≈ <strong>35.72</strong><br>A 200-hour project ≈ <strong>7,143</strong>',
  assumptions: [
    '52 working weeks and 5 working days per week.',
    'Income, expenses and the percentages you enter are annual figures.',
    'The tax reserve is an estimate, not an official tax schedule.',
    'Pension or health insurance contributions only count if you add them to expenses.',
    'Results are estimates and depend on your inputs and circumstances.',
  ],
  whenUseful:
    'Useful when starting freelancing or repricing your services, or before negotiating with a client, to make sure your rates cover your expenses, leave and taxes.',
  mistakes: [
    'Forgetting non-billable time such as marketing and admin.',
    'Ignoring vacation and sick days when pricing your hour.',
    'Overlooking annual business expenses and the tax reserve.',
    'Assuming every working hour is billable.',
  ],
  faqs: [
    {
      q: 'What is the difference between the minimum and recommended rate?',
      a: 'The minimum covers your target income, expenses and taxes only, while the recommended rate adds a target profit margin on top.',
    },
    {
      q: 'Why is non-billable time deducted?',
      a: 'Because part of your time goes to marketing, client communication and admin, which is unpaid. Your paid rate must therefore cover those hours too.',
    },
    {
      q: 'Is the tax percentage a real obligation?',
      a: 'No, it is an approximate reserve. Tax obligations vary by country, so consult the relevant authorities to confirm yours.',
    },
    {
      q: 'Why does the project rate differ?',
      a: 'The project rate multiplies the recommended hourly rate by the project hours, showing you the impact of your rate on a specific project.',
    },
  ],
  methodologyNote:
    'The calculator computes annual billable hours after deducting non-billable time and leave, then divides the target revenue (income, expenses and tax reserve) by those hours. This page is reviewed periodically, and results are estimates that depend on your country laws and tax situation, so confirm figures with a qualified professional.',
  disclaimerNote:
    'This result is an estimate for information purposes only and is not financial or tax advice. Verify your tax and legal obligations with the relevant authorities.',
  lastReviewed: '2026-08-09',
  currencyDefault: 'USD',
  currencyLabel: 'Currency',
  requiredNote: 'Fields marked with * are required.',
  buttons: {
    calculate: 'Calculate',
    reset: 'Reset',
    copy: 'Copy',
    copied: 'Copied',
    share: 'Share',
    example: 'Example',
  },
  ui: {
    resultTitle: 'Results',
    copySuccess: 'Results copied.',
    copyFail: 'Could not copy results.',
    shareFail: 'Could not share results.',
    ariaResult: 'Freelancer hourly-rate calculator results',
  },
  guideTitle: 'Guide: how freelancers set rates',
  relatedTitle: 'Related calculators',
};

export default { ar, en } as Record<Locale, CalcContent>;
