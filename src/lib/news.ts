import { getCollection } from 'astro:content';

/** Опубликованные новости, свежие сверху */
export async function getNews() {
  const items = await getCollection('news', ({ data }) => !data.draft);
  return items.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

const dateFormat = new Intl.DateTimeFormat('ru-RU', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

export function formatDate(date: Date) {
  return dateFormat.format(date).replace(/\s*г\.$/, '');
}
