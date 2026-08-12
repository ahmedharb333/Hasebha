import type { CountryRules } from './types';

export const sa: CountryRules = {
  code: 'sa',
  currency: 'SAR',
  overtime: {
    multipliers: [
      { kind: 'standard', multiplier: 1.5 },
      { kind: 'night', multiplier: 1.5 },
      { kind: 'rest_day', multiplier: 1.5 },
      { kind: 'public_holiday', multiplier: 1.5 },
    ],
    weeklyCapHours: 48,
    source: {
      title: 'Saudi Labour Law (Royal Decree M/51 of 2005, WIPO Lex English text), Art. 98 (max 8h/day, 48h/week) and Art. 107 (overtime at basic wage + 50%; work on the weekly rest day or public holidays at basic wage + 50%; no separate night premium — night overtime at the general rate; annual overtime cap 720h per the Implementing Regulations), as amended by Royal Decree M/44 eff. 18 Feb 2025 (time-off-in-lieu option)',
      url: 'https://www.wipo.int/wipolex/en/legislation/details/14685',
      accessed: '2026-08-12',
    },
    effectiveFrom: '2006-04-26',
  },
  endOfService: {
    bands: [
      { fromYears: 0, daysPerYear: 15 },
      { fromYears: 5, daysPerYear: 30 },
    ],
    resignation: [
      { fromYears: 0, fraction: 0 },
      { fromYears: 2, fraction: 1 / 3 },
      { fromYears: 5, fraction: 2 / 3 },
      { fromYears: 10, fraction: 1 },
    ],
    source: {
      title: 'Saudi Labour Law (Royal Decree M/51 of 2005, WIPO Lex English text), Art. 84 (half-month wage per year for the first 5 years, full month per year after, pro-rata partial years) and Art. 85 (resignation scale for unlimited contracts: nil under 2 years, 1/3 for 2-5, 2/3 for 5-10, full at 10+); Art. 87 full-benefit exceptions (force majeure; female worker resigning within 6 months of marriage or 3 months of childbirth)',
      url: 'https://www.wipo.int/wipolex/en/legislation/details/14685',
      accessed: '2026-08-12',
    },
    effectiveFrom: '2006-04-26',
  },
  socialInsurance: {
    employeeRate: 9.75,
    employerRate: 11.75,
    capMonthly: 45000,
    appliesTo: 'citizens',
    source: {
      title: 'GOSI contribution schedule for existing subscribers under the new Social Insurance System (Royal Decree M/273, eff. 3 July 2024): Saudi EE 9.75% (9% annuity + 0.75% SANED), ER 11.75% (9% annuity + 2% occupational hazards + 0.75% SANED), total 21.5%; contributory wage = basic + housing, capped at SAR 45,000/month; non-Saudi employees covered by occupational hazards only (2% employer, 0% employee)',
      url: 'https://gosi.gov.sa/en/Branches/Pages/Annuity.aspx',
      accessed: '2026-08-12',
    },
    effectiveFrom: '2024-07-03',
  },
  noticePeriod: {
    bands: [{ fromYears: 0, days: 30 }],
    source: {
      title: 'Saudi Labour Law Art. 75 as amended by Royal Decree M/44 (eff. 18 Feb 2025): indefinite-term contracts, monthly-paid — 30 days notice by the worker, 60 days by the employer (30 days for either party when the wage is not paid monthly)',
      url: 'https://www.tamimi.com/news/key-amendments-to-saudi-arabias-labour-law',
      accessed: '2026-08-12',
    },
    effectiveFrom: '2025-02-18',
  },
  leave: {
    annualDays: [
      { fromYears: 0, days: 21 },
      { fromYears: 5, days: 30 },
    ],
    maternityDays: 84,
    source: {
      title: 'Saudi Labour Law Art. 101 (annual leave 21 days/year with full pay, 30 days after 5 consecutive years with the same employer) and Art. 151 as amended by Royal Decree M/44 (maternity leave 12 weeks full pay, 6 weeks mandatory after birth, remaining 6 weeks at the employee\'s discretion up to 4 weeks before the due date, eff. 18 Feb 2025)',
      url: 'https://gccbdi.org/legal-updates/key-amendments-saudi-arabias-labour-law-ksa',
      accessed: '2026-08-12',
    },
    effectiveFrom: '2025-02-18',
  },
  incomeTax: {
    brackets: [],
    personalAllowance: 0,
    source: {
      title: 'Saudi Income Tax Law (Royal Decree M/1 of 2004, eff. 30 July 2004): no personal income tax — salaried employment income is excluded from the income tax base; ZATCA Income Tax page',
      url: 'https://zatca.gov.sa/en/RulesRegulations/Taxes/Pages/income-tax.aspx',
      accessed: '2026-08-12',
    },
    effectiveFrom: '2004-07-30',
  },
  grossToNet: {
    order: ['socialInsurance'],
    source: {
      title: 'GOSI contribution schedule (gosi.gov.sa); no payroll income tax on employment income in Saudi Arabia',
      url: 'https://gosi.gov.sa/en/Branches/Pages/Annuity.aspx',
      accessed: '2026-08-12',
    },
    effectiveFrom: '2024-07-03',
  },
};
