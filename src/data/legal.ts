import { fullAddress, site } from './site';

// Данные оператора персональных данных для политики и согласия.
// Пока реквизиты не заполнены в site.ts, на страницах видны заметные заглушки в квадратных скобках.
export const operator = {
  name: site.legalName || '[полное наименование организации]',
  inn: site.requisites.inn || '[ИНН]',
  ogrn: site.requisites.ogrn || '[ОГРН]',
  address: fullAddress,
  email: site.email,
  site: site.url,
};

// TODO: дата утверждения документов
export const legalEdition = '[дата редакции]';
