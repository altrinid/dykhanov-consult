// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Служебные страницы, которым не место в sitemap.xml
const hiddenPages = ['/thanks/', '/form-error/'];

export default defineConfig({
  site: 'https://dykhanov-consult.ru',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  integrations: [
    sitemap({
      filter: (page) => !hiddenPages.includes(new URL(page).pathname),
    }),
  ],
  devToolbar: {
    enabled: false,
  },
});
