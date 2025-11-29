// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
const isProd = import.meta.env.PROD;

export default defineConfig({
  adapter: isProd ? cloudflare() : undefined,
  output: isProd ? undefined : "static",
});
