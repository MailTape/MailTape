import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

import pagefind from "astro-pagefind";

import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
    site: 'https://mailta.pe',
    integrations: [mdx(), sitemap(), pagefind(), tailwind(
        {applyBaseStyles: false}
    )],
});