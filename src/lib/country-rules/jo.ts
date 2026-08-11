import type { CountryRules } from './types';

export const jo: CountryRules = {
  code: 'jo',
  currency: 'JOD',
  overtime: {
    multipliers: [
      { kind: 'standard', multiplier: 1.25 },
      { kind: 'night', multiplier: 1.5 },
      { kind: 'rest_day', multiplier: 1.5 },
      { kind: 'public_holiday', multiplier: 1.5 },
    ],
    weeklyCapHours: 48,
    source: {
      title: 'Jordan Labour Law No. 8 of 1996 (as amended), Art. 59 (rates) and Art. 56 (48h week)',
      url: 'https://www.mol.gov.jo/ebv4.0/root_storage/en/eb_list_page/final_labor_law_(with_2023_amendments)_qa_(2).pdf',
      accessed: '2026-08-11',
    },
    effectiveFrom: '2004-05-16',
  },
  endOfService: {
    bands: [{ fromYears: 0, daysPerYear: 30 }],
    source: {
      title: 'Jordan Labour Law No. 8 of 1996 (as amended), Art. 32 (end-of-service remuneration for workers not covered by Social Security)',
      url: 'https://www.mol.gov.jo/ebv4.0/root_storage/en/eb_list_page/final_labor_law_(with_2023_amendments)_qa_(2).pdf',
      accessed: '2026-08-11',
    },
    effectiveFrom: '2019-05-16',
  },
  socialInsurance: {
    employeeRate: 7.5,
    employerRate: 14.25,
    capMonthly: 3733,
    appliesTo: 'all',
    source: {
      title: 'Social Security Corporation (ssc.gov.jo): contribution rates and 2026 ceiling of JOD 3,733 (الحد الأعلى للأجر المشمول بأحكام القانون)',
      url: 'https://www.ssc.gov.jo/%D8%A7%D9%84%D8%B6%D9%85%D8%A7%D9%86-3733-%D8%AF%D9%8A%D9%86%D8%A7%D8%B1%D8%A7%D9%8B-%D8%A7%D9%84%D8%AD%D8%AF-%D8%A7%D9%84%D8%A3%D8%B9%D9%84%D9%89-%D9%84%D9%84%D8%A3%D8%AC%D8%B1-%D8%A7%D9%84%D9%85/',
      accessed: '2026-08-11',
    },
    effectiveFrom: '2026-01-01',
  },
  noticePeriod: {
    bands: [{ fromYears: 0, days: 30 }],
    source: {
      title: 'Jordan Labour Law No. 8 of 1996 (as amended), Art. 23 (termination of unlimited-term contract; one month notice)',
      url: 'https://www.mol.gov.jo/ebv4.0/root_storage/en/eb_list_page/final_labor_law_(with_2023_amendments)_qa_(2).pdf',
      accessed: '2026-08-11',
    },
    effectiveFrom: '1996-06-14',
  },
  leave: {
    annualDays: [
      { fromYears: 0, days: 14 },
      { fromYears: 5, days: 21 },
    ],
    maternityWeeks: 10,
    source: {
      title: 'Jordan Labour Law No. 8 of 1996 (as amended), Art. 61 (annual leave) and Art. 70 (maternity leave)',
      url: 'https://www.mol.gov.jo/ebv4.0/root_storage/en/eb_list_page/final_labor_law_(with_2023_amendments)_qa_(2).pdf',
      accessed: '2026-08-11',
    },
    effectiveFrom: '2019-05-16',
  },
  incomeTax: {
    brackets: [
      { from: 0, rate: 5 },
      { from: 5000, rate: 10 },
      { from: 10000, rate: 15 },
      { from: 15000, rate: 20 },
      { from: 20000, rate: 25 },
      { from: 1000000, rate: 30 },
    ],
    personalAllowance: 9000,
    source: {
      title: 'Jordan Income Tax Law No. 34 of 2014 as amended by No. 38 of 2018, personal income tax brackets (effective 1 Jan 2019)',
      url: 'https://istd.gov.jo/ebv4.0/root_storage/en/eb_list_page/income_tax_law_no._(38_)_of_2018.pdf',
      accessed: '2026-08-11',
    },
    effectiveFrom: '2019-01-01',
  },
  grossToNet: {
    order: ['socialInsurance', 'incomeTax'],
    source: {
      title: 'Social Security Corporation contribution schedule (ssc.gov.jo) and Income and Sales Tax Department withholding (istd.gov.jo)',
      url: 'https://www.ssc.gov.jo/%D8%A7%D9%84%D8%B6%D9%85%D8%A7%D9%86-3733-%D8%AF%D9%8A%D9%86%D8%A7%D8%B1%D8%A7%D9%8B-%D8%A7%D9%84%D8%AD%D8%AF-%D8%A7%D9%84%D8%A3%D8%B9%D9%84%D9%89-%D9%84%D9%84%D8%A3%D8%AC%D8%B1-%D8%A7%D9%84%D9%85/',
      accessed: '2026-08-11',
    },
    effectiveFrom: '2020-01-01',
  },
};
