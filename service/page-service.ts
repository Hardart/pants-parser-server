import { QueryParams } from '../types/custom-request'
import articleService from './article-service'

const team = [
  {
    name: 'Ella Ward',
    position: 'Dental Assistant',
    image: '/images/team/01.webp',
  },

  {
    name: 'Cedric Wilson',
    position: 'Dental Assistant',
    image: '/images/team/02.webp',
  },

  {
    name: 'Sandra Kim',
    position: 'Dental Assistant',
    image: '/images/team/03.webp',
  },

  {
    name: 'Edie Sheffield',
    position: 'Dental Assistant',
    image: '/images/team/04.webp',
  },

  {
    name: 'Miriam Weber',
    position: 'Office Management',
    image: '/images/team/05.webp',
  },

  {
    name: 'Amber Rosso',
    position: 'Office Management',
    image: '/images/team/06.webp',
  },

  {
    name: 'Alison Hart',
    position: 'Front Desk',
    image: '/images/team/07.webp',
  },

  {
    name: 'Shelley Wyatt',
    position: 'Front Desk',
    image: '/images/team/08.webp',
  },
]

const mainMenu = [
  {
    slug: '',
    label: 'Радио',
    childrens: [
      { slug: 'schedule', label: 'Сетка вещания' },
      { slug: 'playlist', label: 'Плейлист' },
      { slug: 'hosts', label: 'Ведущие' },
      { slug: 'podcasts', label: 'Подкасты' },
      { slug: 'live', label: 'Прямой эфир' },
      { slug: 'news', label: 'Новости' },
    ],
  },
  {
    slug: 'programs',
    label: 'Программы',
    childrens: [
      { slug: 'top-chart', label: 'TOP Chart 20' },
      { slug: '', label: 'Итоги недели' },
    ],
  },
  {
    slug: 'promo',
    label: 'Конкурсы',
    childrens: [
      { slug: 'how-get-prize', label: 'Как получить приз' },
      { slug: 'model-regulations', label: 'Правила участия в играх' },
    ],
  },
  {
    slug: 'contacts',
    label: 'Контакты',
    childrens: [
      { slug: 'about', label: 'О радиостанции' },
      { slug: 'team', label: 'Команда' },
    ],
  },
]

const schedule = [
  {
    weekdayTitle: 'Понедельник',
    weekdayId: 1,
    programs: [
      { start: '07:00', end: '10:00', title: 'Тапки ШОУ', replay: false, image: '/logo.svg' },
      { start: '14:00', end: '15:00', title: 'Программа «ЛИЧКА»', replay: false, image: '/logo.svg' },
      {
        start: '16:00',
        end: '18:00',
        title: 'TOP Chart 20 – Лучшие треки недели',
        replay: true,
        image: '/images/programs/top-chart.webp',
      },
      { start: '18:00', end: '21:00', title: 'Вечерний отрыв', replay: false, image: '/logo.svg' },
    ],
  },
  {
    weekdayTitle: 'Вторник',
    weekdayId: 2,
    programs: [
      { start: '07:00', end: '10:00', title: 'Тапки ШОУ', replay: false, image: '/logo.svg' },
      { start: '14:00', end: '15:00', title: 'Программа «ЛИЧКА»', replay: false, image: '/logo.svg' },
      { start: '18:00', end: '21:00', title: 'Вечерний отрыв', replay: false, image: '/logo.svg' },
    ],
  },
  {
    weekdayTitle: 'Среда',
    weekdayId: 3,
    programs: [
      { start: '07:00', end: '10:00', title: 'Тапки ШОУ', replay: false, image: '/logo.svg' },
      { start: '14:00', end: '15:00', title: 'Программа «ЛИЧКА»', replay: false, image: '/logo.svg' },
      { start: '16:00', end: '18:00', title: 'TOP Chart 20 – Итоги недели', replay: true, image: '/logo.svg' },
      { start: '18:00', end: '21:00', title: 'Вечерний отрыв', replay: false, image: '/logo.svg' },
    ],
  },
  {
    weekdayTitle: 'Четверг',
    weekdayId: 4,
    programs: [
      { start: '07:00', end: '10:00', title: 'Тапки ШОУ', replay: false, image: '/logo.svg' },
      { start: '14:00', end: '15:00', title: 'Программа «ЛИЧКА»', replay: false, image: '/logo.svg' },
      { start: '18:00', end: '21:00', title: 'Вечерний отрыв', replay: false, image: '/logo.svg' },
    ],
  },
  {
    weekdayTitle: 'Пятница',
    weekdayId: 5,
    programs: [
      { start: '07:00', end: '10:00', title: 'Тапки ШОУ', replay: false, image: '/logo.svg' },
      { start: '14:00', end: '15:00', title: 'Программа «ЛИЧКА»', replay: false, image: '/logo.svg' },
      { start: '18:00', end: '21:00', title: 'Вечерний отрыв', replay: false, image: '/logo.svg' },
      { start: '21:00', end: '00:00', title: 'Атмосферные выходные', replay: false, image: '/logo.svg' },
    ],
  },
  {
    weekdayTitle: 'Суббота',
    weekdayId: 6,
    programs: [
      { start: '10:00', end: '14:00', title: 'Атмосферные выходные', replay: false, image: '/logo.svg' },
      { start: '14:00', end: '15:00', title: 'Программа «ЛИЧКА»', replay: false, image: '/logo.svg' },
      { start: '15:00', end: '18:00', title: 'Атмосферные выходные', replay: false, image: '/logo.svg' },
      {
        start: '18:00',
        end: '19:00',
        title: 'TOP Chart 20 – Лучшие треки недели',
        replay: false,
        image: '/images/programs/top-chart.webp',
      },
    ],
  },
  {
    weekdayTitle: 'Воскресенье',
    weekdayId: 0,
    programs: [
      { start: '10:00', end: '14:00', title: 'Атмосферные выходные', replay: false, image: '/logo.svg' },
      { start: '14:00', end: '15:00', title: 'Программа «ЛИЧКА»', replay: false, image: '/logo.svg' },
      { start: '15:00', end: '18:00', title: 'Атмосферные выходные', replay: false, image: '/logo.svg' },
      { start: '18:00', end: '19:00', title: 'TOP Chart 20 – Итоги недели', replay: false, image: '/logo.svg' },
    ],
  },
]

class PageService {
  async hosts() {
    return team
  }

  async nav() {
    return addLinkToMenuItem(mainMenu)
  }

  async programs() {
    return schedule
  }

  async index(query: QueryParams) {
    const pageData = {
      news: await articleService.list(query),
      hosts: await this.hosts(),
    }
    return pageData
  }
}

function addLinkToMenuItem(menuItems: any) {
  return menuItems.map(mapMenuItem())
}

function mapMenuItem(parentLink: string = '') {
  return function (item: any) {
    item.link = `${parentLink}/${item.slug}`.replace('//', '/')
    item.childrens = item.childrens?.map(mapMenuItem(item.link))
    return item
  }
}

export default new PageService()
