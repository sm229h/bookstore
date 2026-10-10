import { Link } from 'react-router-dom'
import { ShoppingCart, Star } from 'lucide-react'
import type { Book } from '../types'
import { formatPrice, calculateDiscount, toPersianDigits } from '../utils/format'
import { useCart } from '../context/CartContext'
import BookCover from './BookCover'

interface BookCardProps {
  book: Book
}

export default function BookCard({ book }: BookCardProps) {
  const { addToCart } = useCart()
  const discountedPrice = calculateDiscount(book.price, book.discountPercent)
  const hasDiscount = book.discountPercent > 0

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(book)
  }

  return (
    <Link
      to={`/books/${book.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white p-3 shadow-sm transition-all duration-300 ease-smooth hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Cover area */}
      <div className="relative">
        {/* Discount badge */}
        {hasDiscount && (
          <div className="absolute top-2 right-2 z-10 rounded-full bg-terracotta px-2.5 py-1 text-xs font-bold text-white shadow-md">
            {toPersianDigits(book.discountPercent)}٪
          </div>
        )}

        {/* Stock badge */}
        {book.stock <= 10 && book.stock > 0 && (
          <div className="absolute top-2 left-2 z-10 rounded-full bg-amber-600/90 px-2 py-0.5 text-[10px] font-medium text-white">
            موجودی محدود
          </div>
        )}
        {book.stock === 0 && (
          <div className="absolute top-2 left-2 z-10 rounded-full bg-red-800/90 px-2 py-0.5 text-[10px] font-medium text-white">
            ناموجود
          </div>
        )}

        <div className="overflow-hidden rounded-lg transition-transform duration-500 ease-smooth group-hover:scale-[1.02]">
          <BookCover title={book.title} authorName={book.authorName} cover={book.cover} />
        </div>
      </div>

      {/* Info */}
      <div className="mt-3 flex flex-1 flex-col">
        <h3 className="line-clamp-2 text-sm font-bold leading-6 text-ink">{book.title}</h3>
        <p className="mt-1 text-xs text-ink-muted">{book.authorName}</p>

        {/* Rating */}
        <div className="mt-1.5 flex items-center gap-1">
          <Star size={12} className="fill-gold text-gold" />
          <span className="text-xs text-ink-muted">{toPersianDigits(book.rating)}</span>
          <span className="text-xs text-ink-muted/50">({toPersianDigits(book.reviewCount)})</span>
        </div>

        {/* Price */}
        <div className="mt-auto pt-3">
          {hasDiscount ? (
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-terracotta">
                {formatPrice(discountedPrice)}
              </span>
              <span className="text-xs text-ink-muted/50 line-through">
                {formatPrice(book.price)}
              </span>
            </div>
          ) : (
            <span className="text-sm font-bold text-ink">{formatPrice(book.price)}</span>
          )}
        </div>

        {/* Add to cart button */}
        <button
          onClick={handleAddToCart}
          disabled={book.stock === 0}
          className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl bg-soft-gray py-2.5 text-xs font-semibold text-ink transition-all duration-300 ease-smooth hover:bg-terracotta hover:text-white disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-soft-gray disabled:hover:text-ink"
        >
          <ShoppingCart size={15} />
          {book.stock === 0 ? 'ناموجود' : 'افزودن به سبد'}
        </button>
      </div>
    </Link>
  )
}
