/**
 * Analytics configuration. Nothing loads until a real measurement ID is set.
 * Financial values are never sent in analytics events.
 */

export const ANALYTICS = {
  /** Whether tracking scripts may load at all (also gated by consent). */
  enabled: false,
  /** Whether visitor consent is required before loading tracking tags. */
  consentEnabled: true,
  ga4: {
    /** Master switch for Google Analytics 4. */
    enabled: false,
    /** GA4 measurement ID placeholder (G-XXXXXXXXXX). */
    measurementId: '',
  },
  /** Google Search Console verification placeholder. */
  gscVerification: '',
  clarity: {
    /** Microsoft Clarity — disabled by default. */
    enabled: false,
    projectId: '',
  },
} as const;

export type AnalyticsEventName =
  | 'calculator_view'
  | 'calculation_started'
  | 'calculation_completed'
  | 'calculation_error'
  | 'result_copied'
  | 'result_shared'
  | 'related_calculator_clicked'
  | 'guide_opened'
  | 'affiliate_link_clicked';
