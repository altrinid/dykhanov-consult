import type { ImageMetadata } from 'astro';
import mozarteum from '../assets/img/universities/mozarteum.jpg';
import tuGraz from '../assets/img/universities/tu-graz.jpg';
import uniGraz from '../assets/img/universities/uni-graz.jpg';
import uniSalzburg from '../assets/img/universities/uni-salzburg.jpg';
import uniWien from '../assets/img/universities/uni-wien.jpg';
import wuWien from '../assets/img/universities/wu-wien.jpg';

// Университеты Австрии для страницы «Образование за рубежом».
// Фото — с Wikimedia Commons под лицензиями CC BY и CC BY-SA: по их условиям автор, лицензия и ссылка
// на источник обязательно подписываются под фото. Фото кадрированы до 3:2.
type Photo = {
  src: ImageMetadata;
  alt: string;
  author: string;
  license: string;
  licenseUrl: string;
  source: string;
};

export const universityCities: {
  city: string;
  note: string;
  universities: { name: string; original: string; founded: number; url: string; photo: Photo }[];
}[] = [
  {
    city: 'Вена',
    note: 'Столица и крупнейший университетский город Австрии.',
    universities: [
      {
        name: 'Венский университет',
        original: 'Universität Wien',
        founded: 1365,
        url: 'https://www.univie.ac.at/',
        photo: {
          src: uniWien,
          alt: 'Главный вход Венского университета на Рингштрассе',
          author: 'Ian Ehm',
          license: 'CC BY 4.0',
          licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
          source: 'https://commons.wikimedia.org/wiki/File:Universit%C3%A4t_Wien_Hauptgeb%C3%A4ude_(Ian_Ehm)_16.jpg',
        },
      },
      {
        name: 'Венский экономический университет',
        original: 'Wirtschaftsuniversität Wien',
        founded: 1898,
        url: 'https://www.wu.ac.at/',
        photo: {
          src: wuWien,
          alt: 'Библиотека и учебный центр Венского экономического университета, архитектор Заха Хадид',
          author: 'Böhringer',
          license: 'CC BY-SA 3.0 AT',
          licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/at/deed.en',
          source: 'https://commons.wikimedia.org/wiki/File:WU_Wien,_Library_%26_Learning_Center,_Zaha_Hadid_001.JPG',
        },
      },
    ],
  },
  {
    city: 'Грац',
    note: 'Второй по величине город страны и крупный студенческий центр.',
    universities: [
      {
        name: 'Грацский университет',
        original: 'Universität Graz',
        founded: 1585,
        url: 'https://www.uni-graz.at/',
        photo: {
          src: uniGraz,
          alt: 'Главное здание Грацского университета',
          author: 'C.Stadler/Bwag',
          license: 'CC BY-SA 4.0',
          licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
          source: 'https://commons.wikimedia.org/wiki/File:Graz_-_Universit%C3%A4t,_Hauptgeb%C3%A4ude_(a).JPG',
        },
      },
      {
        name: 'Грацский технический университет',
        original: 'Technische Universität Graz',
        founded: 1811,
        url: 'https://www.tugraz.at/',
        photo: {
          src: tuGraz,
          alt: 'Главное здание Грацского технического университета',
          author: 'Norbert Essl',
          license: 'CC BY-SA 4.0',
          licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
          source: 'https://commons.wikimedia.org/wiki/File:20150923_WLM_Hauptgebaeude_Alte_TU.jpg',
        },
      },
    ],
  },
  {
    city: 'Зальцбург',
    note: 'Город Моцарта у подножия Альп.',
    universities: [
      {
        name: 'Зальцбургский университет',
        original: 'Paris Lodron Universität Salzburg',
        founded: 1622,
        url: 'https://www.plus.ac.at/',
        photo: {
          src: uniSalzburg,
          alt: 'Кампус Унипарк Нонталь Зальцбургского университета с видом на крепость Хоэнзальцбург',
          author: 'Jorge Franganillo',
          license: 'CC BY 2.0',
          licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
          source: 'https://commons.wikimedia.org/wiki/File:Salzburg_Unipark_Nonntal_(47957557818).jpg',
        },
      },
      {
        name: 'Университет «Моцартеум»',
        original: 'Universität Mozarteum Salzburg',
        founded: 1841,
        url: 'https://www.moz.ac.at/',
        photo: {
          src: mozarteum,
          alt: 'Главное здание университета «Моцартеум» в Зальцбурге',
          author: 'Andreas Praefcke',
          license: 'CC BY 3.0',
          licenseUrl: 'https://creativecommons.org/licenses/by/3.0/',
          source: 'https://commons.wikimedia.org/wiki/File:Salzburg_Mozarteum_2008.jpg',
        },
      },
    ],
  },
];
