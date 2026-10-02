import type { ImageMetadata } from 'astro';
import lamberd from '../assets/img/partners-at/lamberd.jpg';
import nazira from '../assets/img/partners-at/nazira.jpg';

// Партнёры в Австрии. Фото и тексты — с их сайтов, с их согласия.
// Без фото выводятся инициалы.
export const austriaPartners: {
  name: string;
  role: string;
  bio: string;
  linkedin: string;
  website: { label: string; href: string };
  photo?: ImageMetadata;
}[] = [
  {
    name: 'Назира Обосова',
    role: 'Основатель и консультант ADVENSA Consulting, Вена',
    bio: '18 лет живёт в Австрии, говорит на русском, немецком и английском. Помогает людям и компаниям решать задачи в Австрии: от логистики и визовых вопросов до обучения детей и сложных переговоров.',
    linkedin: 'https://www.linkedin.com/in/nazira-obosova-250552b5/',
    website: { label: 'advensa-consulting.com', href: 'https://advensa-consulting.com/' },
    photo: nazira,
  },
  {
    name: 'Адам Ламберд',
    role: 'Доктор, директор Austrian Medical Certification Programme в Avicenna – Batumi Medical University',
    bio: 'Эксперт по системам здравоохранения, управлению больницами и устойчивому развитию. Читает лекции об австрийской модели управления здравоохранением.',
    linkedin: 'https://www.linkedin.com/in/lamberd/',
    website: { label: 'amp.abmu.edu.ge', href: 'https://amp.abmu.edu.ge/' },
    photo: lamberd,
  },
];
