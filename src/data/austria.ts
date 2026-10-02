import type { ImageMetadata } from 'astro';

// Партнёры в Австрии. Фото — с согласия партнёров: файл в src/assets/img/partners-at/
// и импорт в поле photo. Пока фото нет, выводятся инициалы.
// TODO: согласовать с партнёрами подписи и фото
export const austriaPartners: {
  name: string;
  role: string;
  linkedin: string;
  photo?: ImageMetadata;
}[] = [
  {
    name: 'Назира Обосова',
    role: 'Консалтинговая компания Advensa Consulting, Вена',
    linkedin: 'https://www.linkedin.com/in/nazira-obosova-250552b5/',
  },
  {
    name: 'Адам Ламберд',
    role: 'Vienna Business Consulting Group (VBCG), Вена',
    linkedin: 'https://www.linkedin.com/in/lamberd/',
  },
];
