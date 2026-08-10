import type { Locale } from '../config/site';

/** One prose section of a guide or static page. Body is plain paragraphs
 * separated by blank lines; `**bold**` is rendered as <strong>. */
export interface ProseSection {
  heading?: string;
  body: string;
}

export interface GuideContent {
  slug: string;
  locale: Locale;
  title: string;
  metaDescription: string;
  intro: string;
  sections: ProseSection[];
  keyTakeaways: string[];
  faqs: { q: string; a: string }[];
  /** Slugs of calculators this guide links to. */
  relatedCalculators: string[];
  lastReviewed: string;
}

export interface StaticPageContent {
  slug: string;
  locale: Locale;
  title: string;
  metaDescription: string;
  sections: ProseSection[];
  lastUpdated: string;
}
