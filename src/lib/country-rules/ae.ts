import type { CountryRules } from './types';

export const ae: CountryRules = {
  code: 'ae',
  currency: 'AED',
  overtime: {
    multipliers: [
      { kind: 'standard', multiplier: 1.25 },
      { kind: 'night', multiplier: 1.5 },
      { kind: 'rest_day', multiplier: 1.5 },
      { kind: 'public_holiday', multiplier: 1.5 },
    ],
    weeklyCapHours: 48,
    source: {
      title: 'UAE Federal Decree-Law No. 33 of 2021 (Regulation of Labour Relations, eff. 2 Feb 2022), Art. 19 (overtime at 125% of basic wage, or 125% + 50% — i.e. 150% — for work between 22:00 and 04:00 or on the weekly rest day or public holidays; max 2 overtime hours per day) and Art. 17 (max 8h/day, 48h/week; reduced to 7h for arduous/harmful work)',
      url: 'https://www.ilo.org/dyn/natlex/docs/ELECTRONIC/112621/139078/F-583756867/Federal_Decree-Law_No.33_of_2021.pdf',
      accessed: '2026-08-12',
    },
    effectiveFrom: '2022-02-02',
  },
  endOfService: {
    bands: [
      { fromYears: 0, daysPerYear: 21 },
      { fromYears: 5, daysPerYear: 30 },
    ],
    capMonths: 24,
    source: {
      title: 'UAE Federal Decree-Law No. 33 of 2021, Art. 51 (end-of-service gratuity: 21 days of basic wage per year for the first 5 years, 30 days per year thereafter, pro-rata for partial years; total capped at two years\' wages; partial-service fractions for employees with less than 5 years under the Implementing Regulation)',
      url: 'https://www.ilo.org/dyn/natlex/docs/ELECTRONIC/112621/139078/F-583756867/Federal_Decree-Law_No.33_of_2021.pdf',
      accessed: '2026-08-12',
    },
    effectiveFrom: '2022-02-02',
  },
  socialInsurance: {
    employeeRate: 11,
    employerRate: 15,
    capMonthly: 70000,
    appliesTo: 'citizens',
    source: {
      title: 'UAE Federal Decree-Law No. 57 of 2023 (Pensions and Social Security, eff. Oct 2023): private-sector UAE nationals contribute 11% of monthly contribution salary (8% pension + 3% savings), employer 15% (12.5% pension + 2.5% savings); the government bears 2.5% of the employer share for employees earning below AED 20,000/month (employer effectively 12.5%); cap raised to AED 70,000/month (AED 100,000 for new Abu Dhabi Pensions Fund members); employees registered before the law keep the old 5% rate unless they opt in',
      url: 'https://uaelegislation.gov.ae/en/legislations/2254/download',
      accessed: '2026-08-12',
    },
    effectiveFrom: '2023-10-01',
  },
  noticePeriod: {
    bands: [{ fromYears: 0, days: 30 }],
    source: {
      title: 'UAE Federal Decree-Law No. 33 of 2021, Art. 43 (notice period 30 to 90 days as agreed; minimum 30 days for both fixed-term and indefinite-term contracts)',
      url: 'https://www.ilo.org/dyn/natlex/docs/ELECTRONIC/112621/139078/F-583756867/Federal_Decree-Law_No.33_of_2021.pdf',
      accessed: '2026-08-12',
    },
    effectiveFrom: '2022-02-02',
  },
  leave: {
    annualDays: [{ fromYears: 0, days: 30 }],
    maternityDays: 60,
    source: {
      title: 'UAE Federal Decree-Law No. 33 of 2021, Art. 29 (annual leave 30 calendar days per year for employees with 1+ years\' service; 2 days per month for the first year) and Art. 30 (maternity leave 60 days: 45 full pay + 15 half pay; plus options for unpaid extension under the Implementing Regulation)',
      url: 'https://www.ilo.org/dyn/natlex/docs/ELECTRONIC/112621/139078/F-583756867/Federal_Decree-Law_No.33_of_2021.pdf',
      accessed: '2026-08-12',
    },
    effectiveFrom: '2022-02-02',
  },
  incomeTax: {
    brackets: [],
    personalAllowance: 0,
    source: {
      title: 'UAE: no personal income tax — Federal Decree-Law No. 47 of 2022 (Corporate Tax, eff. 1 Jun 2023) taxes corporate income only and explicitly excludes employment income from the tax base; Ministry of Finance Corporate Tax page',
      url: 'https://mof.gov.ae/corporatetax/',
      accessed: '2026-08-12',
    },
    effectiveFrom: '2023-06-01',
  },
  grossToNet: {
    order: ['socialInsurance'],
    source: {
      title: 'GPSSA contribution schedule under Federal Decree-Law No. 57 of 2023; no payroll income tax on employment income in the UAE',
      url: 'https://uaelegislation.gov.ae/en/legislations/2254/download',
      accessed: '2026-08-12',
    },
    effectiveFrom: '2023-10-01',
  },
};
