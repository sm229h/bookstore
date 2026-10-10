import type { Author } from '../types'

export const authors: Author[] = [
  {
    id: 'a1',
    slug: 'franz-kafka',
    name: 'فرانتس کافکا',
    nameEn: 'Franz Kafka',
    bio: 'رمان‌نویس و داستان‌کوتاه‌نویس برجسته آلمانی‌زبان چک، یکی از چهره‌های تأثیرگذار ادبیات قرن بیستم.',
    bookCount: 16,
    portraitGradient: 'from-stone-700 to-stone-900',
  },
  {
    id: 'a2',
    slug: 'jane-austen',
    name: 'جین آستین',
    nameEn: 'Jane Austen',
    bio: 'رمان‌نویس انگلیسی که با طنظ ظریف و نگاه دقیق به جامعه، شاهکارهایی ماندگار خلق کرد.',
    bookCount: 12,
    portraitGradient: 'from-amber-800 to-stone-900',
  },
  {
    id: 'a3',
    slug: 'george-orwell',
    name: 'جورج اورول',
    nameEn: 'George Orwell',
    bio: 'نویسنده و روزنامه‌نگار انگلیسی، معروف به نقد اجتماعی و سیاسی در آثاری چون ۱۹۸۴ و مزرعه حیوانات.',
    bookCount: 14,
    portraitGradient: 'from-slate-700 to-slate-900',
  },
  {
    id: 'a4',
    slug: 'herman-melville',
    name: 'هرمان ملویل',
    nameEn: 'Herman Melville',
    bio: 'رمان‌نویس آمریکایی و خالق موبی‌دیک، یکی از بزرگ‌ترین رمان‌های ادبیات جهان.',
    bookCount: 11,
    portraitGradient: 'from-blue-900 to-slate-900',
  },
  {
    id: 'a5',
    slug: 'virginia-woolf',
    name: 'ویرجینیا وولف',
    nameEn: 'Virginia Woolf',
    bio: 'نویسنده مدرن انگلیسی و از پیشگامان جریان سیال ذهن در رمان.',
    bookCount: 15,
    portraitGradient: 'from-purple-900 to-stone-900',
  },
  {
    id: 'a6',
    slug: 'fyodor-dostoevsky',
    name: 'فئودور داستایفسکی',
    nameEn: 'Fyodor Dostoevsky',
    bio: 'بزرگ‌ترین رمان‌نویس روس و خالق شاهکارهای عمیق روان‌شناختی مانند جنایت و مکافات و برادران کارامازوف.',
    bookCount: 20,
    portraitGradient: 'from-red-900 to-stone-900',
  },
  {
    id: 'a7',
    slug: 'leo-tolstoy',
    name: 'لئو تولستوی',
    nameEn: 'Leo Tolstoy',
    bio: 'نویسنده روس و خالق جنگ و صلح و آنا کارنینا، از غول‌های ادبیات جهان.',
    bookCount: 18,
    portraitGradient: 'from-green-900 to-stone-900',
  },
  {
    id: 'a8',
    slug: 'abbas-maroufi',
    name: 'عباس معروفی',
    nameEn: 'Abbas Maroufi',
    bio: 'رمان‌نویس ایرانی و خالق سمفونی مردگان، از مهم‌ترین آثار ادبیات معاصر ایران.',
    bookCount: 9,
    portraitGradient: 'from-orange-900 to-stone-900',
  },
]

export function getAuthorBySlug(slug: string): Author | undefined {
  return authors.find((a) => a.slug === slug)
}

export function getAuthorById(id: string): Author | undefined {
  return authors.find((a) => a.id === id)
}
