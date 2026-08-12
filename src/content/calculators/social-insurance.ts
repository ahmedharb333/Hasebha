import type { CalcContent } from '../../lib/calculators/types';
import type { Locale } from '../../config/site';

const ar: CalcContent = {
  locale: 'ar',
  slug: 'social-insurance',
  title: 'حاسبة التأمين الاجتماعي',
  metaDescription:
    'احسب اشتراكات التأمين الاجتماعي الشهرية للموظف وصاحب العمل في الأردن ودول الخليج، مع السقف الشهري والأساس المقيد تلقائياً.',
  h1: 'حاسبة التأمين الاجتماعي',
  intro:
    'اختر البلد وأدخل الراتب الشهري لمعرفة حصة الموظف وحصة صاحب العمل من اشتراكات التأمين الاجتماعي، مع تطبيق السقف الشهري المحدد في قانون كل بلد تلقائياً.',
  fields: {
    country: {
      label: 'البلد',
      hint: 'اختر البلد لتطبيق نسب التأمين الاجتماعي الخاصة به.',
      options: {
        '': 'اختر البلد…',
        jo: 'الأردن',
        sa: 'السعودية',
        ae: 'الإمارات',
        kw: 'الكويت',
        qa: 'قطر',
        bh: 'البحرين',
        om: 'عُمان',
      },
    },
    monthlySalary: {
      label: 'الراتب الشهري',
      hint: 'الراتب الخاضع للاشتراك؛ إن تجاوز السقف يُحتسب على السقف.',
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
    countryMismatch: 'قوانين هذا البلد تتطلب عملة مختلفة. اختر العملة الصحيحة.',
  },
  results: {
    employeeShare: {
      label: 'حصة الموظف',
      hint: 'الخصم الشهري من راتب الموظف.',
      hero: true,
    },
    employerShare: {
      label: 'حصة صاحب العمل',
      hint: 'المبلغ الشهري الذي يدفعه صاحب العمل فوق الراتب.',
    },
    total: {
      label: 'الإجمالي الشهري',
      hint: 'حصة الموظف + حصة صاحب العمل.',
    },
    cappedBase: {
      label: 'الأساس المقيد',
      hint: 'الراتب بعد تقييده بالسقف الشهري المعتمد للاشتراك.',
    },
  },
  resultTitle: 'النتائج',
  formula:
    'الأساس المقيد = أقل (الراتب الشهري، السقف الشهري). حصة الموظف = الأساس المقيد × نسبة الموظف ÷ 100. حصة صاحب العمل = الأساس المقيد × نسبة صاحب العمل ÷ 100. الإجمالي = الحصتان.',
  exampleHtml:
    'السعودية: راتب <strong>15,000 ريال</strong> (أقل من السقف 45,000)<br>حصة الموظف = 15,000 × 9.75% ≈ <strong>1,462.5</strong> ريال<br>حصة صاحب العمل = 15,000 × 11.75% ≈ <strong>1,762.5</strong> ريال<br>الإجمالي ≈ <strong>3,225</strong> ريالاً',
  assumptions: [
    'تُطبق نسب التأمين الاجتماعي المسجلة لكل بلد من قاعدة البيانات.',
    'الاشتراك يُحسب على الراتب بعد تقييده بالسقف الشهري إن تجاوزه.',
    'في دول الخليج تغطي الاشتراكات في الأساس المواطنين؛ أنظمة الوافدين (ادخار/إصابات عمل) منفصلة.',
    'النسب والسقوف قابلة للتعديل بقرارات رسمية وتُراجع دورياً.',
  ],
  whenUseful:
    'مفيد عند حساب صافي الراتب الفعلي أو تكلفة الموظف على صاحب العمل، وعند التخطيط للالتزامات الشهرية للاشتراكات.',
  mistakes: [
    'إدخال الراتب الإجمالي دون تطبيق السقف الشهري يدوياً.',
    'الخلط بين حصة الموظف وحصة صاحب العمل.',
    'تجاهل أن بعض الدول تشمل المواطنين فقط في هذه الاشتراكات.',
    'اعتماد نسب قديمة بعد تعديلها رسمياً.',
  ],
  faqs: [
    {
      q: 'ما الأساس المقيد؟',
      a: 'هو الراتب بعد تقييده بالسقف الشهري الذي تعتمده الهيئة في كل بلد؛ فإذا تجاوز الراتب السقف يُحتسب الاشتراك على السقف فقط.',
    },
    {
      q: 'هل تشمل الحاسبة الوافدين؟',
      a: 'في أغلب دول الخليج تغطي اشتراكات التقاعد المواطنين، بينما تغطية الوافدين (إصابات العمل والادخار) أنظمة منفصلة بتواريخ تطبيق مختلفة، لذا أدخل حالة الموظف بعد التحقق من جهة العمل.',
    },
    {
      q: 'ماذا لو تغيرت النسب؟',
      a: 'تُحدَّث قاعدة البيانات عند صدور قرارات رسمية، وتُذكر المصادر في منهجية كل بلد. تحقق دائماً من آخر نسب لدى الهيئة المختصة.',
    },
  ],
  methodologyNote:
    'تعتمد الحاسبة على نسب التأمين الاجتماعي والسقوف الشهرية لكل بلد من قاعدة بيانات قوانين العمل. في دول الخليج تشمل الاشتراكات المواطنين في أغلبها (appliesTo = citizens) بينما يشمل الأردن جميع الموظفين. تُراجع الأرقام دورياً مقابل المصادر الرسمية وتخضع للتعديل بقرارات الهيئات المختصة.',
  disclaimerNote:
    'هذه النتيجة تقديرية لأغراض إعلامية فقط ولا تُعد مشورة مالية أو قانونية. تحقق من النسب والسقوف المطبقة لدى الهيئة المختصة.',
  lastReviewed: '2026-08-12',
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
    ariaResult: 'نتائج حاسبة التأمين الاجتماعي',
  },
  guideTitle: 'دليل: حساب اشتراكات التأمين الاجتماعي',
  relatedTitle: 'حاسبات ذات صلة',
};

const en: CalcContent = {
  locale: 'en',
  slug: 'social-insurance',
  title: 'Social insurance calculator',
  metaDescription:
    'Calculate the monthly social-insurance contributions for employee and employer in Jordan and the Gulf, with the monthly cap and capped base applied automatically.',
  h1: 'Social insurance calculator',
  intro:
    'Select the country and enter the monthly salary to see the employee and employer shares of social-insurance contributions, with the monthly cap set by each country\u2019s law applied automatically.',
  fields: {
    country: {
      label: 'Country',
      hint: 'Select the country to apply its social-insurance rates.',
      options: {
        '': 'Choose a country…',
        jo: 'Jordan',
        sa: 'Saudi Arabia',
        ae: 'UAE',
        kw: 'Kuwait',
        qa: 'Qatar',
        bh: 'Bahrain',
        om: 'Oman',
      },
    },
    monthlySalary: {
      label: 'Monthly salary',
      hint: 'The salary subject to the contribution; if it exceeds the cap, the cap is used.',
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
    countryMismatch: 'This country\u2019s rules require a different currency. Select the correct currency.',
  },
  results: {
    employeeShare: {
      label: 'Employee share',
      hint: 'The monthly deduction from the employee\u2019s salary.',
      hero: true,
    },
    employerShare: {
      label: 'Employer share',
      hint: 'The monthly amount paid by the employer on top of the salary.',
    },
    total: {
      label: 'Monthly total',
      hint: 'Employee share + employer share.',
    },
    cappedBase: {
      label: 'Capped base',
      hint: 'The salary after applying the monthly cap used for the contribution.',
    },
  },
  resultTitle: 'Results',
  formula:
    'Capped base = min(monthly salary, monthly cap). Employee share = capped base × employee rate ÷ 100. Employer share = capped base × employer rate ÷ 100. Total = the two shares.',
  exampleHtml:
    'Saudi Arabia: salary <strong>15,000 SAR</strong> (below the 45,000 cap)<br>Employee share = 15,000 × 9.75% ≈ <strong>1,462.5</strong> SAR<br>Employer share = 15,000 × 11.75% ≈ <strong>1,762.5</strong> SAR<br>Total ≈ <strong>3,225</strong> SAR',
  assumptions: [
    'The social-insurance rates stored for each country in the database are applied.',
    'The contribution is based on the salary capped at the monthly limit if it is exceeded.',
    'In the Gulf, the contributions essentially cover citizens; expat schemes (savings/work injury) are separate.',
    'Rates and caps can change through official decisions and are reviewed periodically.',
  ],
  whenUseful:
    'Useful when working out the actual net salary or the true cost of an employee to the employer, and when planning monthly contribution obligations.',
  mistakes: [
    'Entering the gross salary without applying the monthly cap manually.',
    'Confusing the employee share with the employer share.',
    'Ignoring that some countries cover only citizens under these contributions.',
    'Relying on outdated rates after an official adjustment.',
  ],
  faqs: [
    {
      q: 'What is the capped base?',
      a: 'It is the salary after applying the monthly cap used by the authority in each country; if the salary exceeds the cap, only the cap is used.',
    },
    {
      q: 'Does the calculator cover expats?',
      a: 'In most Gulf states, the pension contributions cover citizens, while expat coverage (work injury and savings) is separate with different start dates, so enter the employee\u2019s situation after checking with the employer.',
    },
    {
      q: 'What if the rates change?',
      a: 'The database is updated when official decisions are issued, and the sources are cited in each country\u2019s methodology. Always verify the latest rates with the relevant authority.',
    },
  ],
  methodologyNote:
    'The calculator uses the social-insurance rates and monthly caps for each country from the labour-law rules database. In the Gulf, the contributions essentially cover citizens (appliesTo = citizens), while Jordan covers all employees. Figures are reviewed periodically against official sources and are subject to change by the relevant authorities.',
  disclaimerNote:
    'This result is an estimate for information purposes only and is not financial or legal advice. Verify applicable rates and caps with the relevant authority.',
  lastReviewed: '2026-08-12',
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
    ariaResult: 'Social insurance calculator results',
  },
  guideTitle: 'Guide: calculating social-insurance contributions',
  relatedTitle: 'Related calculators',
};

export default { ar, en } as Record<Locale, CalcContent>;
