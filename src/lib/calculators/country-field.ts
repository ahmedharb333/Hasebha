import { COUNTRIES } from '../../config/countries.ts';

export const countrySelectOptions = [{ value: '', label: 'choose' }] as { value: string; label: string }[];
for (const c of COUNTRIES) countrySelectOptions.push({ value: c.code, label: c.code.toUpperCase() });
