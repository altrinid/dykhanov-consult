// Единый источник данных о компании: шапка, подвал, формы, разметка Schema.org.
// Перед запуском сверить с клиентом всё, что помечено TODO.

export const site = {
  name: 'Дыханов Консалтинг',
  // TODO: полное наименование юрлица — нужно для подвала, политики и согласия на обработку ПД
  legalName: '',
  url: 'https://dykhanov-consult.ru',
  description:
    'Консалтинг в области финансов, маркетинга и корпоративного управления в Калининграде. Более 25 лет на рынке, 700+ проектов.',
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
    role: 'Руководитель компании',
    delorosUrl: 'https://deloros.ru/litsa/dykhanov-georgiy-yakovlevich/',
  },
  stats: [
    { value: '25+', label: 'лет на рынке консалтинга' },
    { value: '700+', label: 'реализованных проектов' },
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
  { href: '/expert-consulting/', label: 'Эксперт Консалтинг' },
  { href: '/education-abroad/', label: 'Образование за рубежом' },
  { href: '/news/', label: 'Новости' },
  { href: '/contacts/', label: 'Контакты' },
] as const;

export const services = [
  {
    title: 'Финансы',
    text: 'Финансовая диагностика, планирование и контроль — чтобы решения опирались на цифры.',
  },
  {
    title: 'Маркетинг',
    text: 'Анализ рынка, позиционирование и стратегия продвижения компании и продуктов.',
  },
  {
    title: 'Корпоративное управление',
    text: 'Структура управления, регламенты, взаимодействие собственников и менеджмента.',
  },
] as const;
