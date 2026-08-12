import { DEFAULT_COUNTRY, COUNTRY_STORAGE_KEY } from '../../config/countries.ts';
import { isRegistered } from '../country-rules/registry.ts';

export function getStoredCountry(): string {
  try {
    const v = localStorage.getItem(COUNTRY_STORAGE_KEY);
    return v && isRegistered(v) ? v : DEFAULT_COUNTRY;
  } catch {
    return DEFAULT_COUNTRY;
  }
}

export function setStoredCountry(code: string): void {
  if (!isRegistered(code)) return;
  try { localStorage.setItem(COUNTRY_STORAGE_KEY, code); } catch { /* ignore */ }
}

/** Wire the header selector: populate, restore, persist, and notify calculators. */
export function initCountrySelector(select: HTMLSelectElement): void {
  if (!select) return;
  const stored = getStoredCountry();
  select.value = stored;
  select.addEventListener('change', () => {
    setStoredCountry(select.value);
    window.dispatchEvent(new CustomEvent('klar:country-change', { detail: { code: select.value } }));
  });
}
