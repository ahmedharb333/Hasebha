import type { CurrencyCode } from '../../config/currencies';

export type CountryCode = 'jo' | 'sa' | 'ae' | 'kw' | 'qa' | 'bh' | 'om';

export interface RuleSource {
  title: string;
  url: string;
  /** ISO date the URL was last verified. */
  accessed: string;
}

export type OvertimeKind = 'standard' | 'night' | 'rest_day' | 'public_holiday';

export interface OvertimeRules {
  multipliers: { kind: OvertimeKind; multiplier: number }[];
  weeklyCapHours?: number;
  source: RuleSource;
  effectiveFrom: string;
}

export interface EndOfServiceRules {
  /** days-per-year band. daily wage = last monthly wage / 30. */
  bands: { fromYears: number; daysPerYear: number }[];
  /** optional cap on total payout in whole months of wage. */
  capMonths?: number;
  /** optional resignation scaling (e.g. Kuwait): fraction of full gratuity. */
  resignation?: { fromYears: number; fraction: number }[];
  source: RuleSource;
  effectiveFrom: string;
}

export interface SocialInsuranceRules {
  employeeRate: number; // percent
  employerRate: number; // percent
  capMonthly: number;
  /** Optional supplementary employee contribution: extra rate applied to the first `supplementaryLimit` of capped salary (e.g. Kuwait 2.5% on the first KWD 1,500 under Law 128/1992). */
  supplementaryRate?: number;
  supplementaryLimit?: number;
  /** 'citizens' | 'all' — who is covered. */
  appliesTo: 'citizens' | 'all';
  source: RuleSource;
  effectiveFrom: string;
}

export interface NoticePeriodRules {
  bands: { fromYears: number; days: number }[];
  source: RuleSource;
  effectiveFrom: string;
}

export interface LeaveRules {
  annualDays: { fromYears: number; days: number }[];
  maternityDays: number;
  source: RuleSource;
  effectiveFrom: string;
}

export interface IncomeTaxRules {
  /** empty brackets means no personal income tax (all GCC). */
  brackets: { from: number; rate: number }[];
  personalAllowance: number;
  source: RuleSource;
  effectiveFrom: string;
}

export interface GrossToNetRules {
  /** deduction step codes in application order, subset of 'socialInsurance' | 'incomeTax'. */
  order: ('socialInsurance' | 'incomeTax')[];
  source: RuleSource;
  effectiveFrom: string;
}

export interface CountryRules {
  code: CountryCode;
  currency: CurrencyCode;
  overtime: OvertimeRules;
  endOfService: EndOfServiceRules;
  socialInsurance: SocialInsuranceRules;
  noticePeriod: NoticePeriodRules;
  leave: LeaveRules;
  incomeTax: IncomeTaxRules;
  grossToNet: GrossToNetRules;
}
