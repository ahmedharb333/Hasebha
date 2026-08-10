/**
 * Client-side consent management.
 * Stores the visitor's choices in localStorage. Nothing (analytics/advertising)
 * is loaded before consent where applicable. Necessary cookies are always kept.
 */

export type ConsentCategory = 'necessary' | 'analytics' | 'advertising';

const STORAGE_KEY = 'klar-consent-v1';

export interface ConsentState {
  necessary: boolean;
  analytics: boolean;
  advertising: boolean;
  savedAt: string;
}

const DEFAULT_STATE: ConsentState = {
  necessary: true,
  analytics: false,
  advertising: false,
  savedAt: '',
};

let cached: ConsentState | null = null;
const listeners = new Set<(state: ConsentState) => void>();

function readState(): ConsentState {
  if (cached) return cached;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<ConsentState>;
      cached = {
        necessary: true,
        analytics: parsed.analytics === true,
        advertising: parsed.advertising === true,
        savedAt: typeof parsed.savedAt === 'string' ? parsed.savedAt : '',
      };
      return cached;
    }
  } catch {
    /* storage unavailable — use defaults */
  }
  cached = { ...DEFAULT_STATE };
  return cached;
}

export function getConsent(): ConsentState {
  return readState();
}

export function hasConsent(category: ConsentCategory): boolean {
  const state = readState();
  if (category === 'necessary') return true;
  return category === 'analytics' ? state.analytics : state.advertising;
}

export function isConsentDecided(): boolean {
  return readState().savedAt !== '';
}

export function setConsent(patch: Partial<Pick<ConsentState, 'analytics' | 'advertising'>>): ConsentState {
  const next: ConsentState = {
    ...readState(),
    ...patch,
    necessary: true,
    savedAt: new Date().toISOString(),
  };
  cached = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* ignore storage errors */
  }
  for (const fn of listeners) fn(next);
  return next;
}

export function subscribe(fn: (state: ConsentState) => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/** Apply stored consent decisions (e.g. load/remove tags after the fact). */
export function applyStoredConsent(): void {
  if (isConsentDecided()) {
    for (const fn of listeners) fn(readState());
  }
}
