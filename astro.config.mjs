// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://nubenca.com',
  output: 'static',
  integrations: [
    mdx(),
    sitemap({
      // @astrojs/sitemap no lee el <meta name="robots">, así que hay que
      // excluir explícitamente las rutas noindex (ver Layout.astro).
      filter: (page) => !page.includes('/gracias'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
