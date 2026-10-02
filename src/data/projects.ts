import type { ImageMetadata } from 'astro';

// Фото проекта кладутся в src/assets/img/projects/<папка>/ — галерея подхватывает их сама,
// по порядку имён файлов (01.jpg, 02.jpg …). Первое фото — крупное.
// Фото и тексты взяты с сайтов проектов с согласия владельцев.
const photos = (folder: Record<string, { default: ImageMetadata }>) =>
  Object.entries(folder)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, mod]) => mod.default);

export const projects = [
  {
    title: 'Real Ships — Ушаковские верфи',
    text: 'С 2012 года верфь строит в Калининградской области стальные яхты класса «люкс» по голландским технологиям. Дизайн всех яхт — голландец Ян Виссер.',
    url: 'https://real-ships.ru/',
    images: photos(
      import.meta.glob<{ default: ImageMetadata }>('../assets/img/projects/real-ships/*.{jpg,jpeg,png,webp}', {
        eager: true,
      }),
    ),
  },
  {
    title: 'Monoton Spa',
    text: 'Премиальный SPA-комплекс в Зеленоградске: пространство тишины, тепла и восстановления с видом на Балтику.',
    url: 'https://monotonspa.ru/',
    images: photos(
      import.meta.glob<{ default: ImageMetadata }>('../assets/img/projects/monoton-spa/*.{jpg,jpeg,png,webp}', {
        eager: true,
      }),
    ),
  },
];
