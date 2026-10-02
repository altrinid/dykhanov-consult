import type { ImageMetadata } from 'astro';

// Фото проекта кладутся в src/assets/img/projects/<папка>/ — галерея подхватывает их сама,
// по порядку имён файлов (01.jpg, 02.jpg …). Первое фото — крупное.
const photos = (folder: Record<string, { default: ImageMetadata }>) =>
  Object.entries(folder)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, mod]) => mod.default);

export const projects = [
  {
    // TODO: уточнить у клиента подпись и роль компании в проекте
    title: 'Real Ships — Ушаковские верфи',
    text: 'Современное производство яхт по канонам голландского судостроения, дизайн — Ян Виссер.',
    url: 'https://real-ships.ru/',
    images: photos(
      import.meta.glob<{ default: ImageMetadata }>('../assets/img/projects/real-ships/*.{jpg,jpeg,png,webp}', {
        eager: true,
      }),
    ),
  },
];
