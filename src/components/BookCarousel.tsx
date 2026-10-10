import { useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Book } from '../types'
import BookCard from './BookCard'

interface BookCarouselProps {
  books: Book[]
  title: string
  subtitle?: string
  badge?: string
}

export default function BookCarousel({ books, title, subtitle, badge }: BookCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(true)

  const checkScroll = () => {
    const el = scrollRef.current
    if (!el) return
    // In RTL, scrollLeft works differently across browsers; use scroll position
    const maxScroll = el.scrollWidth - el.clientWidth
    const current = Math.abs(el.scrollLeft)
    setCanScrollPrev(current > 10)
    setCanScrollNext(current < maxScroll - 10)
  }

  const scroll = (direction: 'prev' | 'next') => {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = el.querySelector('[data-book-card]')?.getBoundingClientRect().width ?? 220
    const scrollAmount = cardWidth + 16 // card + gap
    // RTL: "next" (left arrow in RTL) scrolls content to the left, "prev" scrolls right
    el.scrollBy({ left: direction === 'next' ? -scrollAmount : scrollAmount, behavior: 'smooth' })
  }

  if (books.length === 0) return null

  return (
    <section className="py-12 sm:py-16">
      <div className="container-bookito">
        {/* Header */}
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            {badge && (
              <span className="mb-2 block font-serif text-lg italic text-gold">{badge}</span>
            )}
            <h2 className="section-title">{title}</h2>
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
          </div>

          {/* Navigation controls */}
          <div className="flex gap-2">
            <button
              onClick={() => scroll('prev')}
              disabled={!canScrollPrev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-ink transition-all hover:border-terracotta hover:bg-terracotta hover:text-white disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-ink disabled:hover:border-black/10"
              aria-label="قبلی"
            >
              <ChevronRight size={20} />
            </button>
            <button
              onClick={() => scroll('next')}
              disabled={!canScrollNext}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-ink transition-all hover:border-terracotta hover:bg-terracotta hover:text-white disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-ink disabled:hover:border-black/10"
              aria-label="بعدی"
            >
              <ChevronLeft size={20} />
            </button>
          </div>
        </div>

        {/* Cards row */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="no-scrollbar flex gap-4 overflow-x-auto scroll-smooth pb-2"
        >
          {books.map((book) => (
            <div
              key={book.id}
              data-book-card
              className="w-[180px] shrink-0 sm:w-[220px]"
            >
              <BookCard book={book} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
