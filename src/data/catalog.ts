/* =========================================================
 *  ЕДИНСТВЕННЫЙ ФАЙЛ С ДАННЫМИ САЙТА.
 *  Здесь меняют: название, телефон, почту, город, услуги,
 *  прайс, мастеров, их описания, рейтинги и статистику.
 *  ========================================================= */

export interface PriceItem {
  label: string
  price: string
}

export interface Service {
  id: string
  code: string
  icon: string
  title: string
  short: string
  minPrice: number
  duration: string
  prices: PriceItem[]
}

export interface Master {
  id: string
  name: string
  role: string
  experience: string
  orders: string
  rating: number
  reviews: number
  bio: string
  skills: string[]
  serviceIds: string[]
  top?: boolean
}

/** Компания и контакты (заглушки — заменить на реальные). */
export const COMPANY = {
  brand: 'МУЖНАЧАС',
  tag: '24/7',
  phone: '+7 (900) 123-45-67',
  phoneHref: 'tel:+79001234567',
  email: 'hello@muzhnachas.ru',
  telegram: 'https://t.me/muzhnachas',
  telegramLabel: '@muzhnachas',
  city: 'Москва',
  area: 'выезд по городу и до 20 км за МКАД',
  hours: 'Ежедневно, 08:00–21:00',
  address: 'Диспетчерская: ул. Примерная, д. 1',
  eta: '90',
  responseMin: '15',
}

/** Если указать адрес API — заявки будут уходить туда POST-запросом.
 *  Пустая строка = демо-режим (заявка только показывается на экране). */
export const ORDER_ENDPOINT = ''

export const SERVICES: Service[] = [
  {
    id: 'repair',
    code: 'SRV-01',
    icon: 'wrench',
    title: 'Мелкий ремонт',
    short: 'Полки, ручки, петли, карнизы — список бытовых задач за один выезд',
    minPrice: 500,
    duration: '30 мин – 3 ч',
    prices: [
      { label: 'Работа списком (за час)', price: '700 ₽' },
      { label: 'Полка, карниз, крючок', price: 'от 500 ₽' },
      { label: 'Замена ручек, петель, фурнитуры', price: 'от 400 ₽' },
      { label: 'Мелкий ремонт дверей и окон', price: 'от 600 ₽' },
      { label: 'Осмотр и диагностика', price: '0 ₽' },
    ],
  },
  {
    id: 'electric',
    code: 'SRV-02',
    icon: 'bolt',
    title: 'Электрика',
    short: 'Розетки, выключатели, люстры, поиск неисправностей',
    minPrice: 600,
    duration: '40 мин – 3 ч',
    prices: [
      { label: 'Замена розетки или выключателя', price: 'от 600 ₽' },
      { label: 'Установка люстры, светильника', price: 'от 900 ₽' },
      { label: 'Замена патрона, вилки, шнура', price: 'от 500 ₽' },
      { label: 'Поиск неисправности, искрение', price: 'от 1 200 ₽' },
      { label: 'Протяжка новой линии (за точку)', price: 'от 1 500 ₽' },
    ],
  },
  {
    id: 'plumbing',
    code: 'SRV-03',
    icon: 'drop',
    title: 'Сантехника',
    short: 'Смесители, сифоны, сливные механизмы, протечки',
    minPrice: 700,
    duration: '40 мин – 4 ч',
    prices: [
      { label: 'Замена смесителя', price: 'от 800 ₽' },
      { label: 'Сифон под раковиной', price: 'от 700 ₽' },
      { label: 'Арматура бачка, регулировка', price: 'от 900 ₽' },
      { label: 'Устранение протечки', price: 'от 1 000 ₽' },
      { label: 'Замена унитаза', price: 'от 1 800 ₽' },
    ],
  },
  {
    id: 'furniture',
    code: 'SRV-04',
    icon: 'box',
    title: 'Сборка мебели',
    short: 'Шкафы, кухни, стеллажи — по схеме производителя',
    minPrice: 600,
    duration: '1 – 6 ч',
    prices: [
      { label: 'Стол, стул, стеллаж', price: 'от 600 ₽' },
      { label: 'Шкаф или комод', price: 'от 1 200 ₽' },
      { label: 'Кухня (за модуль)', price: 'от 700 ₽' },
      { label: 'Навеска мебели и фурнитуры', price: 'от 500 ₽' },
      { label: 'Перенос и пересборка', price: 'от 1 000 ₽' },
    ],
  },
  {
    id: 'doors',
    code: 'SRV-05',
    icon: 'lock',
    title: 'Двери и замки',
    short: 'Врезка и замена замков, установка и регулировка дверей',
    minPrice: 600,
    duration: '30 мин – 4 ч',
    prices: [
      { label: 'Замена цилиндра (личинки)', price: 'от 600 ₽' },
      { label: 'Врезка или замена замка', price: 'от 900 ₽' },
      { label: 'Регулировка полотна и петель', price: 'от 700 ₽' },
      { label: 'Установка межкомнатной двери', price: 'от 2 000 ₽' },
      { label: 'Установка доводчика', price: 'от 1 200 ₽' },
    ],
  },
  {
    id: 'mount',
    code: 'SRV-06',
    icon: 'target',
    title: 'Монтаж и крепления',
    short: 'ТВ, зеркала, полки, подключение техники — на любой стене',
    minPrice: 500,
    duration: '30 мин – 2 ч',
    prices: [
      { label: 'Зеркало, картина, крючки', price: 'от 500 ₽' },
      { label: 'Карниз', price: 'от 600 ₽' },
      { label: 'ТВ на стену (до 55")', price: 'от 1 000 ₽' },
      { label: 'Подключение стиральной машины', price: 'от 1 200 ₽' },
      { label: 'Плинтус (за метр)', price: 'от 150 ₽' },
    ],
  },
]

export const MASTERS: Master[] = [
  {
    id: 'm1',
    name: 'Иван Соколов',
    role: 'Мастер-универсал',
    experience: 'стаж 12 лет',
    orders: '1 400+',
    rating: 4.97,
    reviews: 214,
    top: true,
    bio: 'Универсал: электрика, мелкий ремонт, сборка мебели. Работает по чек-листу и убирает рабочее место за собой.',
    skills: ['Свой инструмент', 'Перфоратор', 'Чек-лист'],
    serviceIds: ['repair', 'electric', 'furniture', 'doors'],
  },
  {
    id: 'm2',
    name: 'Алексей Ковалёв',
    role: 'Инженер-электрик',
    experience: 'стаж 9 лет',
    orders: '900+',
    rating: 4.92,
    reviews: 156,
    bio: 'Розетки, освещение, автоматика. Находит причину, а не симптом. Гарантия на работу — 30 дней.',
    skills: ['Диагностика', 'Освещение', 'Гарантия 30 дней'],
    serviceIds: ['electric', 'mount'],
  },
  {
    id: 'm3',
    name: 'Дмитрий Орлов',
    role: 'Мастер-сантехник',
    experience: 'стаж 10 лет',
    orders: '1 100+',
    rating: 4.95,
    reviews: 189,
    bio: 'Смесители, сливные системы, протечки. Держит в арсенале 40+ типов фурнитуры и делает с первого раза.',
    skills: ['Смесители', 'Протечки', 'Унитазы'],
    serviceIds: ['plumbing', 'repair'],
  },
  {
    id: 'm4',
    name: 'Сергей Мишин',
    role: 'Сборщик мебели',
    experience: 'стаж 7 лет',
    orders: '700+',
    rating: 4.88,
    reviews: 132,
    bio: 'Больше 900 шкафов и 60 кухонь. Работает строго по схеме производителя — без перекосов и лишних отверстий.',
    skills: ['Шкафы', 'Кухни', 'Стеллажи'],
    serviceIds: ['furniture', 'mount'],
  },
  {
    id: 'm5',
    name: 'Павел Гущин',
    role: 'Мастер по дверям и замкам',
    experience: 'стаж 8 лет',
    orders: '640+',
    rating: 4.9,
    reviews: 118,
    bio: 'Замки, доводчики, регулировка. Аккуратен с полотном и наличниками, оставляет инструкцию по уходу.',
    skills: ['Замки', 'Доводчики', 'Регулировка'],
    serviceIds: ['doors', 'mount'],
  },
  {
    id: 'm6',
    name: 'Никита Северин',
    role: 'Мастер-универсал',
    experience: 'стаж 6 лет',
    orders: '520+',
    rating: 4.93,
    reviews: 97,
    bio: 'Точность в креплениях и аккуратность в мелочах. Закрывает списки бытовых задач за один выезд.',
    skills: ['Крепления', 'Список задач', 'Сантехника'],
    serviceIds: ['repair', 'plumbing', 'mount'],
  },
]

export const HERO_STATS = [
  { value: '12', cap: 'мастеров в штате' },
  { value: '4.9', cap: 'средняя оценка' },
  { value: '90 мин', cap: 'средний выезд' },
  { value: '3 500+', cap: 'заказов выполнено' },
]
