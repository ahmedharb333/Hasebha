// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { fileURLToPath } from 'node:url';
import { SITE } from './src/config/site.ts';

export default defineConfig({
  site: SITE.url,
  i18n: {
    locales: ['ar', 'en'],
    defaultLocale: 'ar',
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
  integrations: [
    sitemap({
      // i18n-aware: alternates are generated automatically from the i18n config.
      changefreq: 'monthly',
      lastmod: new Date(),
    }),
  ],
});
