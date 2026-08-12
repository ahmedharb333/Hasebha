import { CURRENCIES } from '../../config/currencies.ts';
import { getRegisteredCountries } from './registry.ts';
import type { CountryRules, RuleSource } from './types';

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function checkSource(prefix: string, src: (RuleSource & { effectiveFrom?: string }) | undefined, out: string[]): void {
  if (!src) { out.push(`${prefix}: missing source`); return; }
  if (!src.title || src.title.trim().length < 10) out.push(`${prefix}: source title too short`);
  if (!src.url || !/^https:\/\//.test(src.url)) out.push(`${prefix}: source url must be https`);
  if (!ISO_DATE.test(src.accessed)) out.push(`${prefix}: accessed must be ISO date`);
  else if (src.accessed > new Date().toISOString().slice(0, 10)) out.push(`${prefix}: accessed date is in the future`);
  if (src.effectiveFrom !== undefined && src.effectiveFrom !== '' && !ISO_DATE.test(src.effectiveFrom)) out.push(`${prefix}: effectiveFrom must be ISO date or empty`);
}

export function validateCountryRules(r: CountryRules): string[] {
  const out: string[] = [];
  const p = `${r.code}`;

  if (!CURRENCIES.some((c) => c.code === r.currency)) out.push(`${p}: currency ${r.currency} not in CURRENCIES`);

  // overtime
  if (r.overtime.multipliers.length === 0) out.push(`${p}: overtime.multipliers empty`);
  for (const m of r.overtime.multipliers) {
    if (m.multiplier <= 1 || m.multiplier > 3) out.push(`${p}: overtime ${m.kind} multiplier ${m.multiplier} out of (1,3]`);
    if (!['standard', 'night', 'rest_day', 'public_holiday'].includes(m.kind)) out.push(`${p}: overtime unknown kind ${m.kind}`);
  }
  if (r.overtime.weeklyCapHours !== undefined && r.overtime.weeklyCapHours < 40) out.push(`${p}: weeklyCapHours too low`);
  checkSource(`${p}.overtime`, r.overtime.source, out);

  // end-of-service
  if (r.endOfService.bands.length === 0) out.push(`${p}: endOfService.bands empty`);
  let prev = -1;
  for (const b of r.endOfService.bands) {
    if (b.fromYears <= prev) out.push(`${p}: endOfService bands not strictly ascending`);
    if (b.daysPerYear <= 0 || b.daysPerYear > 60) out.push(`${p}: endOfService daysPerYear ${b.daysPerYear} out of (0,60]`);
    prev = b.fromYears;
  }
  if (r.endOfService.capMonths !== undefined && r.endOfService.capMonths <= 0) out.push(`${p}: endOfService.capMonths must be > 0`);
  if (r.endOfService.resignation?.length) {
    let rp = -1;
    for (const s of r.endOfService.resignation) {
      if (s.fromYears <= rp || s.fraction < 0 || s.fraction > 1) out.push(`${p}: resignation scaling invalid`);
      rp = s.fromYears;
    }
  }
  checkSource(`${p}.endOfService`, r.endOfService.source, out);

  // social insurance
  if (r.socialInsurance.employeeRate < 0 || r.socialInsurance.employeeRate > 100) out.push(`${p}: eeRate out of range`);
  if (r.socialInsurance.employerRate < 0 || r.socialInsurance.employerRate > 100) out.push(`${p}: erRate out of range`);
  if (r.socialInsurance.capMonthly <= 0) out.push(`${p}: capMonthly must be > 0`);
  if (!['citizens', 'all'].includes(r.socialInsurance.appliesTo)) out.push(`${p}: appliesTo invalid`);
  checkSource(`${p}.socialInsurance`, r.socialInsurance.source, out);

  // notice
  if (r.noticePeriod.bands.length === 0) out.push(`${p}: noticePeriod.bands empty`);
  let np = -1;
  for (const b of r.noticePeriod.bands) {
    if (b.fromYears <= np || b.days <= 0 || b.days > 365) out.push(`${p}: noticePeriod band invalid`);
    np = b.fromYears;
  }
  checkSource(`${p}.noticePeriod`, r.noticePeriod.source, out);

  // leave
  if (r.leave.annualDays.length === 0 || r.leave.maternityDays <= 0) out.push(`${p}: leave invalid`);
  let lp = -1;
  for (const b of r.leave.annualDays) { if (b.fromYears <= lp || b.days <= 0) out.push(`${p}: leave annualDays invalid`); lp = b.fromYears; }
  checkSource(`${p}.leave`, r.leave.source, out);

  // income tax
  if (r.incomeTax.personalAllowance < 0) out.push(`${p}: incomeTax.personalAllowance negative`);
  let tp = -1;
  for (const b of r.incomeTax.brackets) { if (b.from <= tp || b.rate <= 0 || b.rate > 100) out.push(`${p}: incomeTax bracket invalid`); tp = b.from; }
  checkSource(`${p}.incomeTax`, r.incomeTax.source, out);

  // gross-to-net
  if (r.grossToNet.order.length === 0) out.push(`${p}: grossToNet.order empty`);
  for (const s of r.grossToNet.order) if (!['socialInsurance', 'incomeTax'].includes(s)) out.push(`${p}: grossToNet unknown step ${s}`);
  checkSource(`${p}.grossToNet`, r.grossToNet.source, out);

  return out;
}

export function validateRegistry(): string[] {
  const out: string[] = [];
  for (const r of getRegisteredCountries()) out.push(...validateCountryRules(r));
  const codes = getRegisteredCountries().map((r) => r.code);
  if (new Set(codes).size !== codes.length) out.push('registry: duplicate country codes');
  return out;
}

export function assertPublishGate(): void {
  const violations = validateRegistry();
  if (violations.length > 0) {
    throw new Error(`country-rules publish gate FAILED:\n${violations.map((v) => ` - ${v}`).join('\n')}`);
  }
}
