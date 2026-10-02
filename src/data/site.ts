// Единый источник данных о компании: шапка, подвал, формы, разметка Schema.org.
// Тексты и контакты взяты со старого сайта (архив от 06.06.2026). Перед запуском сверить всё, что помечено TODO.

export const site = {
  name: 'Дыханов Консалтинг',
  nameEn: 'Dykhanov Consulting',
  // TODO: полное наименование оператора ПД. На старом сайте под руководителем указано ООО «Эксперт-Консалтинг» — уточнить у клиента
  legalName: '',
  url: 'https://dykhanov-consult.ru',
  description:
    'Управленческий, стратегический и финансовый консалтинг в Калининграде с 1997 года. Более 900 проектов, система качества по ISO 9001.',
  phone: '+7 (911) 459-14-88',
  phoneHref: 'tel:+79114591488',
  email: 'g.dykhanov@kccbe.ru',
  address: {
    postalCode: '236006',
    city: 'Калининград',
    street: 'ул. Сергеева, 14, офис 203',
  },
  mapUrl: 'https://yandex.ru/maps/?text=' + encodeURIComponent('Калининград, улица Сергеева, 14'),
  head: {
    name: 'Георгий Яковлевич Дыханов',
    role: 'Управляющий партнёр',
    company: 'ООО «Эксперт-Консалтинг»',
    delorosUrl: 'https://deloros.ru/',
  },
  social: [
    { label: 'ВКонтакте', href: 'https://vk.com/g.dykhanov' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/georgy-dykhanov-phd-646a271a/' },
  ],
  stats: [
    { value: '1997', label: 'год основания компании' },
    { value: '900+', label: 'успешных проектов' },
    { value: 'ISO 9001', label: 'система качества с 2002 года' },
  ],
  // TODO: ссылка на анкету в Яндекс Формах для «Образования за рубежом». Пусто — кнопка ведёт к форме заявки.
  questionnaireUrl: '',
  // TODO: реквизиты оператора персональных данных
  requisites: {
    inn: '',
    ogrn: '',
  },
};

export const fullAddress = `${site.address.postalCode}, ${site.address.city}, ${site.address.street}`;

export const nav = [
  { href: '/expert-consulting/', label: 'Консалтинг' },
  { href: '/education/', label: 'Образование за рубежом' },
  { href: '/news/', label: 'Пресс-центр' },
  { href: '/contacts/', label: 'Контакты' },
] as const;

// Направления услуг со страницы /expert-consulting старого сайта
export const services = [
  {
    title: 'Финансы',
    items: ['Бизнес-планы', 'Бюджетирование', 'Управленческий учёт'],
  },
  {
    title: 'Маркетинг',
    items: ['Исследования рынков', 'Маркетинговые стратегии', 'Выход на международные рынки'],
  },
  {
    title: 'Корпоративное управление',
    items: [
      'Бизнес-процессы',
      'Показатели — KPI',
      'Управление качеством',
      'Корпоративные стратегии',
      'Разработка франшизы',
      'Советы директоров',
    ],
  },
] as const;
