/**
 * Privacy-conscious analytics helper.
 * Only sends event metadata — never financial values, names, emails or
 * free text. All tracking is gated by configuration + visitor consent.
 */
import { hasConsent } from './consent';
import type { AnalyticsEventName } from '../../config/analytics';

declare global {
  interface Window {
    dataLayer?: unknown[];
    __KLAR_GA4__?: { enabled: boolean; id: string };
    __KLAR_TRACK_ENABLED__?: boolean;
  }
}

export interface TrackParams {
  calculator_id?: string;
  page_category?: string;
  currency?: string;
  validation_success?: boolean;
  validation_failure?: boolean;
  guide_slug?: string;
}

function configEnabled(): boolean {
  return window.__KLAR_GA4__?.enabled === true && Boolean(window.__KLAR_GA4__?.id);
}

export function track(event: AnalyticsEventName, params: TrackParams = {}): void {
  try {
    if (window.__KLAR_TRACK_ENABLED__ === false) return;
    if (!configEnabled()) return;
    if (!hasConsent('analytics')) return;
    const payload = { event, ...params };
    (window.dataLayer = window.dataLayer || []).push(payload);
  } catch {
    /* never break UX because of analytics */
  }
}

export function trackCalculatorView(slug: string, category: string): void {
  track('calculator_view', { calculator_id: slug, page_category: category });
}

export function trackCalculationStarted(slug: string): void {
  track('calculation_started', { calculator_id: slug });
}

export function trackCalculationCompleted(slug: string, currency: string | undefined): void {
  track('calculation_completed', { calculator_id: slug, currency, validation_success: true });
}

export function trackCalculationError(slug: string): void {
  track('calculation_error', { calculator_id: slug, validation_failure: true });
}

export function trackResultCopied(slug: string): void {
  track('result_copied', { calculator_id: slug });
}

export function trackResultShared(slug: string): void {
  track('result_shared', { calculator_id: slug });
}
