import type { CountryRules } from './types';

export const qa: CountryRules = {
  code: 'qa',
  currency: 'QAR',
  overtime: {
    multipliers: [
      { kind: 'standard', multiplier: 1.25 },
      { kind: 'night', multiplier: 1.5 },
      { kind: 'rest_day', multiplier: 1.5 },
      { kind: 'public_holiday', multiplier: 1.25 },
    ],
    weeklyCapHours: 48,
    source: {
      title: 'Qatar Labour Law No. 14 of 2004 (in force, per Al Meezan), Art. 73 (max 8h/day, 48h/week; 36h/week or 6h/day during Ramadan), Art. 74 (overtime paid at the basic wage plus an increment of at least 25% = 1.25x; night work between 9pm and 6am — 9pm to 3am in the Ministry of Labour\'s consolidated English text — at an increment of at least 50% = 1.5x, excluding shift workers), Art. 75 (paid weekly rest day, Friday; work on the rest day is compensated with a substitute rest day and, per prevailing interpretation (Pinsent Masons, 2023), 150% of normal pay — although the literal \'increment of at least 150%\' wording is read by some as 2.5x), Art. 78 (public holiday work compensated at 125% of normal pay per Pinsent Masons\' consolidated reading, which treats holidays under Art. 74 rather than the historical cross-reference to the Art. 75 rest-day rate)',
      url: 'https://www.pinsentmasons.com/out-law/guides/qatar-labour-law-employers-need-know',
      accessed: '2026-08-12',
    },
    effectiveFrom: '2004-07-06',
  },
  endOfService: {
    bands: [{ fromYears: 0, daysPerYear: 21 }],
    source: {
      title: 'Qatar Labour Law No. 14 of 2004, Art. 54 (end-of-service gratuity of 21 days\' basic wage per year of service — a flat three weeks per year — pro-rated to the exact date of termination; entitlement arises after one year of continuous service; the earlier three-tier 3/4/5-week scale and the two-year wage cap no longer apply)',
      url: 'https://www.almeezan.qa/LawPage.aspx?id=3961&language=en',
      accessed: '2026-08-12',
    },
    effectiveFrom: '2004-07-06',
  },
  socialInsurance: {
    employeeRate: 7,
    employerRate: 14,
    capMonthly: 100000,
    appliesTo: 'citizens',
    source: {
      title: 'Qatar Social Insurance Law No. 1/2022 (eff. 3 Jan 2023), administered by GRSIA: the monthly contribution rose from 15% to 21% of the contributory salary (basic salary plus social and housing allowances), split 14% employer / 7% employee, with a cap of QAR 100,000/month; applies to Qatari nationals in the private and public sectors (GCC nationals are covered at their home country\'s contribution rate); expatriates are not covered and instead receive the Labour Law end-of-service gratuity',
      url: 'https://www.fragomen.com/insights/qatar-social-security-contributions-to-be-expanded-to-private-employers.html',
      accessed: '2026-08-12',
    },
    effectiveFrom: '2023-01-03',
  },
  noticePeriod: {
    bands: [
      { fromYears: 0, days: 30 },
      { fromYears: 2, days: 60 },
    ],
    source: {
      title: 'Qatar Labour Law No. 14 of 2004, Art. 49 as amended by Decree-Law No. 18 of 2020 (issued 30 Aug 2020, effective from the day after its publication in the Official Gazette): indefinite-term contracts require one month\'s notice for service of two years or less and two months\' notice for service of more than two years; fixed-term contracts use a separate scale (1 week under 1 year, 2 weeks for 1–5 years, 1 month over 5 years)',
      url: 'https://www.diwan.gov.qa/briefing-room/legislations/2020/august/30/lg02?sc_lang=en',
      accessed: '2026-08-12',
    },
    effectiveFrom: '2020-08-30',
  },
  leave: {
    annualDays: [
      { fromYears: 0, days: 21 },
      { fromYears: 5, days: 28 },
    ],
    maternityDays: 50,
    source: {
      title: 'Qatar Labour Law No. 14 of 2004, Art. 79 (annual leave of three weeks per year for less than five years\' consecutive service and four weeks per year from five years, pro-rated for partial years) and Art. 96 (maternity leave of 50 calendar days on full pay after at least one year of continuous service, at least 35 days of which must fall after delivery; dismissal is prohibited during maternity leave)',
      url: 'https://www.almeezan.qa/LawPage.aspx?id=3961&language=en',
      accessed: '2026-08-12',
    },
    effectiveFrom: '2004-07-06',
  },
  incomeTax: {
    brackets: [],
    personalAllowance: 0,
    source: {
      title: 'Qatar imposes no personal income tax — there is no payroll withholding on employment income (Pinsent Masons, 2023: \'Qatar does not currently have in place any personal income tax\'); Qatar\'s tax regime applies to corporate/business profits only',
      url: 'https://www.pinsentmasons.com/out-law/guides/qatar-labour-law-employers-need-know',
      accessed: '2026-08-12',
    },
    effectiveFrom: '2004-07-06',
  },
  grossToNet: {
    order: ['socialInsurance'],
    source: {
      title: 'GRSIA contribution schedule under the Social Insurance Law No. 1/2022 (7% employee / 14% employer) for Qatari nationals; no payroll income tax in Qatar; expatriates have no mandatory statutory payroll deductions',
      url: 'https://www.fragomen.com/insights/qatar-social-security-contributions-to-be-expanded-to-private-employers.html',
      accessed: '2026-08-12',
    },
    effectiveFrom: '2023-01-03',
  },
};
