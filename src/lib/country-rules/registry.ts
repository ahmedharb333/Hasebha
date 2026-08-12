import type { CountryCode, CountryRules } from './types';
import { jo } from './jo.ts';
import { sa } from './sa.ts';
import { ae } from './ae.ts';
import { kw } from './kw.ts';
import { qa } from './qa.ts';
import { bh } from './bh.ts';
import { om } from './om.ts';

const REGISTRY: Record<CountryCode, CountryRules> = { jo, sa, ae, kw, qa, bh, om };
export const COUNTRY_CODES = Object.keys(REGISTRY) as CountryCode[];

export function isRegistered(code: string): code is CountryCode {
  return code in REGISTRY;
}

export function getCountryRules(code: string): CountryRules | undefined {
  return isRegistered(code) ? REGISTRY[code] : undefined;
}

export function getRegisteredCountries(): CountryRules[] {
  return COUNTRY_CODES.map((code) => REGISTRY[code]);
}
