// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
const isProd = import.meta.env.PROD;

export default defineConfig({
  site: 'https://inandoutlaundry.com',
  adapter: isProd ? cloudflare() : undefined,
  output: isProd ? undefined : "static",
});
