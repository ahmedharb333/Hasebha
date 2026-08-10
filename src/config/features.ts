/**
 * Feature flags — central switches for optional functionality.
 * Everything non-essential defaults to OFF.
 */

export const FEATURES = {
  /** Affiliate recommendation module. */
  affiliates: {
    enabled: false,
    /** Programs keyed by calculator/guide id. */
    programs: [] as { id: string; name: string; url: string; label: { ar: string; en: string } }[],
  },
  /** Consent management for analytics/advertising tags. */
  consent: {
    enabled: true,
    /** Google-certified CMP stub — leave null until a real CMP is integrated. */
    cmp: null as null | { name: string; scriptUrl: string },
  },
  /** Analytics event tracking (respects consent). */
  analyticsEvents: true,
} as const;
