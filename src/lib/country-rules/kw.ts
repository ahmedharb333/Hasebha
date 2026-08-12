import type { CountryRules } from './types';

export const kw: CountryRules = {
  code: 'kw',
  currency: 'KWD',
  overtime: {
    multipliers: [
      { kind: 'standard', multiplier: 1.25 },
      { kind: 'night', multiplier: 1.25 },
      { kind: 'rest_day', multiplier: 1.5 },
      { kind: 'public_holiday', multiplier: 2 },
    ],
    weeklyCapHours: 48,
    source: {
      title: 'Kuwait Private Sector Labour Law No. 6 of 2010 (ILO NatLex official English translation, published in Official Gazette No. 963 of 21 Feb 2010): Art. 64 (max 8h/day, 48h/week), Art. 66 (overtime by written order only, max 2h/day / 180h/year / 3 days per week, paid at 25% above the ordinary rate — flat, with no separate night premium under the law), Art. 67 (work on the weekly rest day at ordinary wage + 50%, plus a substitute rest day), Art. 68 (work on a public holiday at double the daily wage, plus an additional day of leave)',
      url: 'https://natlex.ilo.org/dyn/natlex2/natlex2/files/download/83616/KWT83616%20English%202.pdf',
      accessed: '2026-08-12',
    },
    effectiveFrom: '2010-02-21',
  },
  endOfService: {
    bands: [
      { fromYears: 0, daysPerYear: 15 },
      { fromYears: 5, daysPerYear: 30 },
    ],
    capMonths: 18,
    resignation: [
      { fromYears: 0, fraction: 0 },
      { fromYears: 3, fraction: 0.5 },
      { fromYears: 5, fraction: 2 / 3 },
      { fromYears: 10, fraction: 1 },
    ],
    source: {
      title: 'Kuwait Private Sector Labour Law No. 6 of 2010, Art. 51 (monthly-paid workers: 15 days\' wage per year for the first 5 years and one month\'s wage per year after, pro-rata partial years, capped at 18 months — 1.5 years\' wage; non-monthly workers: 10 days per year for the first 5 years, 15 days after, capped at 12 months) and Art. 53 (resignation scale for unlimited contracts: nil under 3 years, 1/2 for 3-5, 2/3 for 5-10, full at 10+); Art. 62 (base = last wage), as amended by Laws 85/2017 and 17/2018',
      url: 'https://natlex.ilo.org/dyn/natlex2/natlex2/files/download/83616/KWT83616%20English%202.pdf',
      accessed: '2026-08-12',
    },
    effectiveFrom: '2010-02-21',
  },
  socialInsurance: {
    employeeRate: 8,
    employerRate: 11.5,
    capMonthly: 2750,
    appliesTo: 'citizens',
    source: {
      title: 'Kuwait Social Security Law (Amiri Order No. 61 of 1976, as amended) administered by PIFSS: employee 8% and employer 11.5% of monthly salary up to a ceiling of KWD 2,750/month, covering Kuwaiti nationals only; plus a 2.5% employee Supplementary Insurance contribution (Law No. 128 of 1992, in force since Jan 2015) on the first KWD 1,500/month of salary, making the effective employee rate 10.5% on the first KWD 1,500; expatriates are not covered (they receive Labour Law end-of-service indemnity instead)',
      url: 'https://taxsummaries.pwc.com/kuwait/individual/other-taxes',
      accessed: '2026-08-12',
    },
    effectiveFrom: '2015-01-01',
  },
  noticePeriod: {
    bands: [{ fromYears: 0, days: 90 }],
    source: {
      title: 'Kuwait Private Sector Labour Law No. 6 of 2010, Art. 44 (termination of an unlimited contract requires three months\' notice for monthly-paid workers and one month\'s notice for all other workers; compensation in lieu of notice equals pay for the notice period)',
      url: 'https://natlex.ilo.org/dyn/natlex2/natlex2/files/download/83616/KWT83616%20English%202.pdf',
      accessed: '2026-08-12',
    },
    effectiveFrom: '2010-02-21',
  },
  leave: {
    annualDays: [{ fromYears: 0, days: 30 }],
    maternityDays: 70,
    source: {
      title: 'Kuwait Private Sector Labour Law No. 6 of 2010, Art. 70 (annual leave 30 days per year; pro-rata for fractional years, at least 9 months service in the first year) and Art. 24 (maternity leave 70 days — 30 before and 40 after the expected delivery date — on full pay)',
      url: 'https://natlex.ilo.org/dyn/natlex2/natlex2/files/download/83616/KWT83616%20English%202.pdf',
      accessed: '2026-08-12',
    },
    effectiveFrom: '2010-02-21',
  },
  incomeTax: {
    brackets: [],
    personalAllowance: 0,
    source: {
      title: 'Kuwait: no personal income tax — the Income Tax Law (Law No. 3 of 1955) taxes corporate/business income only and never natural persons\' employment income; PwC Worldwide Tax Summaries, Kuwait, individual taxes',
      url: 'https://taxsummaries.pwc.com/kuwait/individual/taxes-on-personal-income',
      accessed: '2026-08-12',
    },
    effectiveFrom: '1955-01-01',
  },
  grossToNet: {
    order: ['socialInsurance'],
    source: {
      title: 'PIFSS contribution schedule under the Social Security Law (Amiri Order No. 61 of 1976) and Law No. 128 of 1992; no payroll income tax on employment income in Kuwait',
      url: 'https://taxsummaries.pwc.com/kuwait/individual/other-taxes',
      accessed: '2026-08-12',
    },
    effectiveFrom: '2015-01-01',
  },
};
