export interface Book {
  id: string
  slug: string
  title: string
  authorId: string
  authorName: string
  publisher: string
  isbn: string
  category: string
  price: number
  discountPercent: number
  stock: number
  pages: number
  language: string
  edition: string
  publishYear: number
  cover: BookCover
  coverImage?: string
  description: string
  isFeatured: boolean
  isBestseller: boolean
  isNew: boolean
  isDiscounted: boolean
  rating: number
  reviewCount: number
}

export interface BookCover {
  /** Tailwind gradient classes for the cover background */
  gradient: string
  /** Accent color hex for text/borders */
  accent: string
  /** Whether the title should be light or dark on the cover */
  textLight: boolean
}

export interface Author {
  id: string
  slug: string
  name: string
  nameEn: string
  bio: string
  bookCount: number
  /** Tailwind gradient for portrait background */
  portraitGradient: string
}

export interface Collection {
  id: string
  slug: string
  title: string
  description: string
  /** Tailwind gradient for spine */
  spineGradient: string
  bookCount: number
}

export interface CartItem {
  bookId: string
  title: string
  authorName: string
  price: number
  discountPercent: number
  cover: BookCover
  coverImage?: string
  quantity: number
  stock: number
}
