import type { CountryRules } from './types';

export const om: CountryRules = {
  code: 'om',
  currency: 'OMR',
  overtime: {
    multipliers: [
      { kind: 'standard', multiplier: 1.25 },
      { kind: 'night', multiplier: 1.5 },
      { kind: 'rest_day', multiplier: 2 },
      { kind: 'public_holiday', multiplier: 2 },
    ],
    weeklyCapHours: 40,
    source: {
      title: 'Oman Labour Law (Royal Decree 53/2023, issued 25 July 2023 and in force the day following publication in Official Gazette 1504 of 30 July 2023), Art. 70 (max 8 actual working hours/day and 40/week, excluding the daily rest hour), Art. 71 (overtime beyond the Art. 70 hours, with the original plus additional hours capped at 12/day, paid at the basic wage plus at least 25% for day hours = 1.25x and at least 50% for night hours = 1.5x; work on the weekly rest day or an official holiday is paid 100% of the daily basic wage plus the wage for the day itself = 2.0x, or by a substitute day off; the worker\'s consent is required), with "night" defined in Art. 1(16) as 9:00 pm to 5:00 am; Art. 72 sets higher emergency rates (basic wage + at least 50% day / 75% night; 200% plus the day\'s wage on holidays) where consent is not required',
      url: 'https://decree.om/2023/rd20230053/',
      accessed: '2026-08-12',
    },
    effectiveFrom: '2023-07-31',
  },
  endOfService: {
    bands: [{ fromYears: 0, daysPerYear: 30 }],
    source: {
      title: 'Oman Labour Law (Royal Decree 53/2023), Art. 61 (post-service gratuity for workers who do not benefit from the Social Protection Law of not less than one month\'s basic wage = 30 days per year of service, pro-rated for fractions of a year, calculated on the last basic wage; no minimum-service period, no cap and no resignation reduction; service begun before the law\'s entry into force counts in full; employer savings programmes at least equal to the gratuity under Art. 48 may substitute), replacing the RD 35/2003 scale of 15 days for the first three years then one month per year — the Ministry of Labour (October 2024 clarification) applies the old scale to service before 31 July 2023 and the new flat rate to service from 31 July 2023; the Art. 61 gratuity remains payable until the Social Protection Fund\'s savings system for expatriates, deferred by RD 60/2025, replaces it from 19 July 2027',
      url: 'https://decree.om/2023/rd20230053/',
      accessed: '2026-08-12',
    },
    effectiveFrom: '2023-07-31',
  },
  socialInsurance: {
    employeeRate: 8,
    employerRate: 14.5,
    capMonthly: 3000,
    appliesTo: 'citizens',
    source: {
      title: 'Social Protection Fund (SPF) contribution schedule under the Social Protection Law (Royal Decree 52/2023, in force 19 July 2023) as amended by Royal Decree 60/2025: from 19 July 2026 the Omani employee pays 8% (7.5% old-age/disability/death + 0.5% job security) and the employer 14.5% (11% + work-injury 1% + maternity 1% + job security 0.5% + sick-leave/extraordinary-leave insurance 1% brought into effect on 19 July 2026), total 22.5%; insurable wage capped at OMR 3,000/month; the work-injury scheme for non-Omanis was deferred to 19 July 2028 and the compulsory savings system for non-Omanis to 19 July 2027 by RD 60/2025',
      url: 'https://bondoni-me.com/2026/06/10/oman-spf-update-july-2026/',
      accessed: '2026-08-12',
    },
    effectiveFrom: '2026-07-19',
  },
  noticePeriod: {
    bands: [{ fromYears: 0, days: 30 }],
    source: {
      title: 'Oman Labour Law (Royal Decree 53/2023), Art. 38 (for indefinite-term contracts, either party may terminate on at least 30 days\' written notice for workers paid a monthly wage and 15 days for others, unless the contract agrees a longer period; termination without notice attracts compensation equal to the notice-period wage on the last gross wage); Art. 46(2) requires at least 3 months\' notice for economic-cause terminations',
      url: 'https://decree.om/2023/rd20230053/',
      accessed: '2026-08-12',
    },
    effectiveFrom: '2023-07-31',
  },
  leave: {
    annualDays: [{ fromYears: 0, days: 30 }],
    maternityDays: 98,
    source: {
      title: 'Oman Labour Law (Royal Decree 53/2023), Art. 78 (annual leave of not less than 30 days on the gross wage, which may not be taken before 6 months of service, accruing 2.5 days per month, with an unused balance carried over up to 30 days) and Art. 84(10) (maternity leave of 98 days covering the period before and after childbirth, with the pre-birth portion on medical recommendation not exceeding 14 days), with Art. 84(1) granting 7 days\' paternity leave within 98 days of the child\'s birth',
      url: 'https://decree.om/2023/rd20230053/',
      accessed: '2026-08-12',
    },
    effectiveFrom: '2023-07-31',
  },
  incomeTax: {
    brackets: [],
    personalAllowance: 0,
    source: {
      title: 'Oman Income Tax Law (Royal Decree 28/2009, in force 1 January 2010): no personal income tax — the tax applies to corporate profits only and salaried employment income of individuals is not taxed; PwC Worldwide Tax Summaries — Oman, Individual - Taxes on personal income (last reviewed 7 July 2026): "PIT in Oman is effective 1 January 2028", when Royal Decree 56/2025 introduces a 5% tax on annual income above OMR 42,000 for tax residents and certain non-residents',
      url: 'https://taxsummaries.pwc.com/oman/individual/taxes-on-personal-income',
      accessed: '2026-08-12',
    },
    effectiveFrom: '2010-01-01',
  },
  grossToNet: {
    order: ['socialInsurance'],
    source: {
      title: 'The only statutory payroll deduction for Omani employees in 2026 is the 8% SPF employee share (old-age/disability/death 7.5% + job security 0.5%) on insurable wages up to OMR 3,000/month; there is no payroll income tax until the Personal Income Tax Law (RD 56/2025) takes effect on 1 January 2028',
      url: 'https://bondoni-me.com/2026/06/10/oman-spf-update-july-2026/',
      accessed: '2026-08-12',
    },
    effectiveFrom: '2026-07-19',
  },
};
