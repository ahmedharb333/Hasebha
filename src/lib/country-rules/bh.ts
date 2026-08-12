import type { CountryRules } from './types';

export const bh: CountryRules = {
  code: 'bh',
  currency: 'BHD',
  overtime: {
    multipliers: [
      { kind: 'standard', multiplier: 1.25 },
      { kind: 'night', multiplier: 1.5 },
      { kind: 'rest_day', multiplier: 1.5 },
      { kind: 'public_holiday', multiplier: 1.5 },
    ],
    weeklyCapHours: 48,
    source: {
      title: 'Bahrain Labour Law for the Private Sector No. 36 of 2012 (promulgated 26 July 2012; in force one month after publication in Official Gazette No. 3063 of 2 Aug 2012 per the promulgating law\'s Art. 4), Art. 54 (overtime paid at the due wage plus at least 25% for day hours = 1.25x and at least 50% for night hours = 1.5x, with "night" defined in Art. 1 as 7:00 pm to 7:00 am), Art. 57(b) (work on the weekly rest day — Friday — compensated by an additional 150% of the normal wage or a substitute rest day), Art. 64(b) (work on official holidays compensated by the day\'s wage plus an additional 150% or a substitute rest day); the weekly maximum of 48 hours (Art. 51) and the daily maximum of 10 hours (Art. 53) effectively cap overtime at ~2 h/day / 12 h/week',
      url: 'https://www.lmra.gov.bh/files/cms/shared/file/labour%20law.pdf',
      accessed: '2026-08-12',
    },
    effectiveFrom: '2012-09-02',
  },
  endOfService: {
    bands: [
      { fromYears: 0, daysPerYear: 15 },
      { fromYears: 3, daysPerYear: 30 },
    ],
    source: {
      title: 'Bahrain Labour Law No. 36 of 2012, Art. 116 (leaving indemnity of half a month\'s wage = 15 days for each of the first three years of service and one month\'s wage = 30 days for each subsequent year, pro-rated for fractions of a year; no statutory service minimum and no cap), computed on the last basic wage plus any social gratuity (Art. 47); for non-Bahraini workers the benefit has been administered since 1 March 2024 by the SIO-funded end-of-service scheme (Resolution No. 109 of 2023: 4.2% of wage for the first three years, then 8.4%), with service before that date still settled directly by the employer',
      url: 'https://www.lmra.gov.bh/files/cms/shared/file/labour%20law.pdf',
      accessed: '2026-08-12',
    },
    effectiveFrom: '2012-09-02',
  },
  socialInsurance: {
    employeeRate: 8,
    employerRate: 18,
    capMonthly: 4000,
    appliesTo: 'citizens',
    source: {
      title: 'Social Insurance Organisation (SIO) contributions under the Social Insurance Law (Legislative Decree No. 24 of 1976) as amended by Law No. 14 of 2022: from 1 January 2026 the Bahraini national employee pays 8% (7% pension + 1% unemployment) and the employer 18%, the employer share rising 1 percentage point each 1 January to a target of 20% by 2028; insurable wages are capped at BHD 4,000/month; non-GCC expatriates are covered for work injury only (3% employer / 1% employee, no pension); GCC nationals are covered under their home country\'s scheme',
      url: 'https://taxsummaries.pwc.com/bahrain/individual/other-taxes',
      accessed: '2026-08-12',
    },
    effectiveFrom: '2026-01-01',
  },
  noticePeriod: {
    bands: [{ fromYears: 0, days: 30 }],
    source: {
      title: 'Bahrain Labour Law No. 36 of 2012, Art. 99(a) (either party may terminate an indefinite-term labour contract on at least 30 days\' written notice; the contract may agree a longer notice period, and an agreement reducing the statutory minimum is null and void under Art. 103); payment in lieu of notice is permitted (Art. 99)',
      url: 'https://www.lmra.gov.bh/files/cms/shared/file/labour%20law.pdf',
      accessed: '2026-08-12',
    },
    effectiveFrom: '2012-09-02',
  },
  leave: {
    annualDays: [{ fromYears: 0, days: 30 }],
    maternityDays: 60,
    source: {
      title: 'Bahrain Labour Law No. 36 of 2012, Art. 58 (paid annual leave of at least 30 days per year after one year of service, accruing at 2.5 days per month, pro-rated for service under one year; the leave may be monetised under Art. 59) and Art. 32 (maternity leave of 60 days on full pay before and after delivery, plus an optional 15 days unpaid; employment in the 40 days following confinement is prohibited)',
      url: 'https://www.lmra.gov.bh/files/cms/shared/file/labour%20law.pdf',
      accessed: '2026-08-12',
    },
    effectiveFrom: '2012-09-02',
  },
  incomeTax: {
    brackets: [],
    personalAllowance: 0,
    source: {
      title: 'PwC Worldwide Tax Summaries — Bahrain, Individual - Taxes on personal income (last reviewed 26 July 2026): "There is no personal income tax (PIT) regime in Bahrain"; individuals are subject only to SIO contributions, and capital gains and income of residents or non-residents not paid in Bahrain are not subject to tax',
      url: 'https://taxsummaries.pwc.com/bahrain/individual/taxes-on-personal-income',
      accessed: '2026-08-12',
    },
    effectiveFrom: '2012-09-02',
  },
  grossToNet: {
    order: ['socialInsurance'],
    source: {
      title: 'The only statutory payroll deduction for Bahraini employees in 2026 is the 8% SIO employee share (7% pension + 1% unemployment) on insurable wages up to BHD 4,000/month; there is no payroll income tax; non-GCC expatriates are deducted 1% for work-injury cover only',
      url: 'https://taxsummaries.pwc.com/bahrain/individual/other-taxes',
      accessed: '2026-08-12',
    },
    effectiveFrom: '2026-01-01',
  },
};
