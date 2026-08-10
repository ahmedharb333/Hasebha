import type { CalcContent } from '../../lib/calculators/types';
import type { Locale } from '../../config/site';

const ar: CalcContent = {
  locale: 'ar',
  slug: 'salary-converter',
  title: 'محوّل الراتب (ساعة/يوم/شهر/سنة)',
  metaDescription:
    'حوّل الراتب بين الأجر بالساعة واليوم والأسبوع والشهر والسنة مع عرض الافتراضات بوضوح.',
  h1: 'محوّل الراتب',
  intro:
    'حوّل راتبك من وحدة إلى أخرى (ساعة، يوم، أسبوع، شهر، سنة) بشرح واضح للافتراضات المعتمدة في التحويل، مثل عدد أيام العمل وساعات اليوم والوحدات المدفوعة.',
  fields: {
    salaryAmount: {
      label: 'مبلغ الراتب',
      hint: 'أدخل قيمة الراتب بالوحدة المحددة أدناه.',
    },
    salaryFrequency: {
      label: 'وحدة الراتب',
      options: {
        hourly: 'بالساعة',
        daily: 'باليوم',
        weekly: 'بالأسبوع',
        monthly: 'بالشهر',
        annual: 'بالسنة',
      },
    },
    daysPerWeek: {
      label: 'أيام العمل في الأسبوع',
      hint: 'من 1 إلى 7، وغالباً 5 أيام.',
    },
    hoursPerDay: {
      label: 'ساعات العمل في اليوم',
      hint: 'من 1 إلى 24، وغالباً 8 ساعات.',
    },
    paidWeeksPerYear: {
      label: 'الأسابيع المدفوعة في السنة',
      hint: 'من 1 إلى 52 أسبوعاً، وغالباً 52.',
    },
    unpaidLeaveDays: {
      label: 'أيام الإجازة غير المدفوعة',
      hint: 'اختياري؛ تُخصم هذه الأيام من عدد أيام العمل السنوي.',
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
    hourly: { label: 'الأجر بالساعة', hint: 'قيمة الساعة الواحدة بناءً على المدخلات.' },
    daily: { label: 'الأجر اليومي', hint: 'قيمة يوم العمل الواحد.' },
    weekly: { label: 'الأجر الأسبوعي', hint: 'قيمة أسبوع العمل الواحد.' },
    monthly: { label: 'الأجر الشهري', hint: 'قيمة الشهر الواحد.' },
    annual: { label: 'الراتب السنوي', hint: 'صافي الراتب بعد خصم أيام الإجازة غير المدفوعة.' },
  },
  resultTitle: 'النتائج',
  formula:
    'الراتب السنوي = المبلغ × العامل حسب الوحدة (شهري × 12، أسبوعي × الأسابيع المدفوعة، يومي × أيام العمل، ساعة × ساعات اليوم × أيام الأسبوع × الأسابيع المدفوعة). ثم: الأجر بالساعة = (الراتب السنوي − خصم الأيام غير المدفوعة) ÷ (أيام العمل السنوية × ساعات اليوم).',
  exampleHtml:
    'الراتب الشهري: <strong>1,200</strong> دينار<br>أيام العمل: 5 أيام × 8 ساعات = 260 يوم عمل سنوياً<br>الراتب السنوي = 1,200 × 12 = <strong>14,400</strong> دينار<br>الأجر بالساعة ≈ <strong>6.92</strong> دينار، والأجر اليومي ≈ <strong>55.38</strong> دينار<br>الراتب السنوي بعد الخصومات: <strong>14,400</strong> دينار',
  assumptions: [
    '12 شهراً و52 أسبوعاً في السنة.',
    'عدد أيام العمل وساعات اليوم ثابتان طوال السنة.',
    'الإجازات المدفوعة الأجر لا تُخصم من الراتب السنوي.',
    'لا يُحتسب في التحويل: الضرائب، اشتراكات التقاعد، التأمين، أو العطل الرسمية.',
    'النتيجة تقديرية وتعتمد على مدخلاتك وعلى نظام العمل في بلدك.',
  ],
  whenUseful:
    'مفيد عند مقارنة عروض عمل بعملات أو وحدات مختلفة، أو عند تحويل راتب شهري إلى أجر بالساعة لتقييم مشاريع جانبية أو عمل حر.',
  mistakes: [
    'الاعتماد على الراتب الصافي بدلاً من الراتب الإجمالي.',
    'افتراض أن ساعات العمل الأسبوعية تساوي 40 دون التحقق.',
    'إدخال عدد الأسابيع المدفوعة أو أيام الإجازات بشكل غير دقيق.',
    'تجاهل الفرق بين أيام العمل والعطل الرسمية عند التخطيط للدخل.',
  ],
  faqs: [
    {
      q: 'هل نتيجة التحويل هي صافي الدخل؟',
      a: 'لا، النتيجة تعتمد على المبلغ الذي تدخله. إذا أدخلت الراتب الإجمالي فالنتائج إجمالية، وإذا أدخلت الصافي فستكون النتائج صافية.',
    },
    {
      q: 'لماذا أحتاج تحديد عدد أيام العمل وساعات اليوم؟',
      a: 'لأن التحويل إلى أجر بالساعة أو اليوم يتطلب معرفة عدد ساعات العمل الفعلية، وتختلف هذه الأرقام من وظيفة إلى أخرى.',
    },
    {
      q: 'هل تُحتسب الضرائب والاشتراكات؟',
      a: 'لا. هذا المحوّل يعمل على المبلغ الذي تدخله مباشرة، ويجب عليك مراعاة الضرائب والاشتراكات والقوانين المحلية عند التخطيط المالي.',
    },
    {
      q: 'ما معنى أيام الإجازة غير المدفوعة؟',
      a: 'هي الأيام التي لا يتقاضى الموظف أجراً عنها، وتُخصم من أيام العمل السنوية قبل حساب الأجر اليومي والساعي.',
    },
  ],
  methodologyNote:
    'يعتمد المحوّل على تحويل المبلغ إلى راتب سنوي ثم توزيعه على وحدات الوقت المدخلة، مع خصم أيام الإجازة غير المدفوعة. تُراجع هذه الصفحة دورياً للتأكد من وضوح الافتراضات، وتخضع النتائج لقوانين وأنظمة بلدك ومصدر دخلك، لذا تحقق من الأرقام النهائية مع جهة العمل أو السلطات المختصة.',
  disclaimerNote:
    'هذه النتيجة تقديرية لأغراض إعلامية فقط ولا تُعد مشورة مالية أو قانونية. يرجى التحقق من الأرقام والقوانين المحلية المطبقة قبل اتخاذ أي قرار.',
  lastReviewed: '2026-08-09',
  currencyDefault: 'JOD',
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
    ariaResult: 'نتائج محوّل الراتب',
  },
  guideTitle: 'دليل: الراتب بالساعة مقابل الراتب الشهري',
  relatedTitle: 'حاسبات ذات صلة',
};

const en: CalcContent = {
  locale: 'en',
  slug: 'salary-converter',
  title: 'Salary converter',
  metaDescription:
    'Convert salary between hourly, daily, weekly, monthly and annual amounts with clearly stated assumptions.',
  h1: 'Salary converter',
  intro:
    'Convert your salary between units (hourly, daily, weekly, monthly, annual) with the underlying assumptions shown clearly, such as working days, hours per day and paid weeks.',
  fields: {
    salaryAmount: {
      label: 'Salary amount',
      hint: 'Enter the salary value in the unit selected below.',
    },
    salaryFrequency: {
      label: 'Salary unit',
      options: {
        hourly: 'Hourly',
        daily: 'Daily',
        weekly: 'Weekly',
        monthly: 'Monthly',
        annual: 'Annual',
      },
    },
    daysPerWeek: {
      label: 'Days worked per week',
      hint: 'Between 1 and 7, usually 5.',
    },
    hoursPerDay: {
      label: 'Hours worked per day',
      hint: 'Between 1 and 24, usually 8.',
    },
    paidWeeksPerYear: {
      label: 'Paid weeks per year',
      hint: 'Between 1 and 52, usually 52.',
    },
    unpaidLeaveDays: {
      label: 'Unpaid leave days',
      hint: 'Optional; these days are deducted from the annual working days.',
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
    hourly: { label: 'Hourly rate', hint: 'Value of one hour based on your inputs.' },
    daily: { label: 'Daily rate', hint: 'Value of one working day.' },
    weekly: { label: 'Weekly rate', hint: 'Value of one working week.' },
    monthly: { label: 'Monthly rate', hint: 'Value of one month.' },
    annual: { label: 'Annual salary', hint: 'Your salary after deducting unpaid leave days.' },
  },
  resultTitle: 'Results',
  formula:
    'Annual salary = amount × unit factor (monthly × 12, weekly × paid weeks, daily × working days, hourly × hours per day × days per week × paid weeks). Then: hourly rate = (annual salary − unpaid-day deduction) ÷ (annual working days × hours per day).',
  exampleHtml:
    'Monthly salary: <strong>1,200</strong> currency units<br>Working pattern: 5 days × 8 hours = 260 working days per year<br>Annual salary = 1,200 × 12 = <strong>14,400</strong><br>Hourly rate ≈ <strong>6.92</strong>, daily rate ≈ <strong>55.38</strong><br>Annual salary after deductions: <strong>14,400</strong>',
  assumptions: [
    '12 months and 52 weeks per year.',
    'Working days and hours per day are constant throughout the year.',
    'Paid leave does not reduce the annual salary.',
    'Taxes, retirement contributions, insurance and public holidays are not included.',
    'Results are estimates and depend on your inputs and local rules.',
  ],
  whenUseful:
    'Useful when comparing job offers quoted in different units, or when converting a monthly salary to an hourly rate to evaluate side projects or freelance work.',
  mistakes: [
    'Using net salary instead of gross salary.',
    'Assuming 40 working hours per week without checking.',
    'Entering paid weeks or leave days inaccurately.',
    'Ignoring the difference between working days and public holidays when planning income.',
  ],
  faqs: [
    {
      q: 'Is the result the net income?',
      a: 'No. The result reflects whatever amount you enter: if you enter gross salary you get gross figures, and if you enter net salary you get net figures.',
    },
    {
      q: 'Why do I need to specify working days and hours per day?',
      a: 'Because converting to an hourly or daily rate requires knowing the actual working hours, and these numbers differ from job to job.',
    },
    {
      q: 'Are taxes and contributions included?',
      a: 'No. This converter works directly on the amount you enter. Consider taxes, contributions and local regulations when planning your finances.',
    },
    {
      q: 'What are unpaid leave days?',
      a: 'Days an employee does not get paid for. They are deducted from the annual working days before calculating daily and hourly rates.',
    },
  ],
  methodologyNote:
    'The converter normalises your amount to an annual salary, then divides it across the time units you provide, deducting unpaid leave days. This page is reviewed periodically for clarity, and results depend on your local laws and income source, so confirm final figures with your employer or the relevant authorities.',
  disclaimerNote:
    'This result is an estimate for information purposes only and is not financial or legal advice. Verify applicable local figures and regulations before making any decision.',
  lastReviewed: '2026-08-09',
  currencyDefault: 'JOD',
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
    ariaResult: 'Salary converter results',
  },
  guideTitle: 'Guide: hourly vs monthly salary',
  relatedTitle: 'Related calculators',
};

export default { ar, en } as Record<Locale, CalcContent>;
