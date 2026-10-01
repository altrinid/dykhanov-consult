import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Новости: один Markdown-файл в src/content/news = одна новость
const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      description: z.string(),
      cover: image().optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { news };
