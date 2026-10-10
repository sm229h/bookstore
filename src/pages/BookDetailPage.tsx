import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Star, Minus, Plus, ShoppingCart, ArrowRight, BookOpen, Check } from 'lucide-react'
import { getBookBySlug, getRelatedBooks } from '../data/books'
import { getAuthorById } from '../data/authors'
import { formatPrice, calculateDiscount, toPersianDigits } from '../utils/format'
import { useCart } from '../context/CartContext'
import BookCover from '../components/BookCover'
import BookCard from '../components/BookCard'

export default function BookDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const book = getBookBySlug(slug || '')

  if (!book) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center pt-20 text-center">
        <h1 className="text-2xl font-bold text-ink">کتاب یافت نشد</h1>
        <p className="mt-2 text-sm text-ink-muted">کتاب موردنظر شما پیدا نشد.</p>
        <Link to="/books" className="btn-primary mt-5">بازگشت به کتاب‌ها</Link>
      </div>
    )
  }

  const author = getAuthorById(book.authorId)
  const discountedPrice = calculateDiscount(book.price, book.discountPercent)
  const hasDiscount = book.discountPercent > 0
  const relatedBooks = getRelatedBooks(book)

  const handleAddToCart = () => {
    addToCart(book, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 3000)
  }

  const handleBuyNow = () => {
    addToCart(book, quantity)
    navigate('/cart')
  }

  return (
    <div className="pt-16 lg:pt-20">
      {/* Breadcrumb */}
      <div className="border-b border-black/5 bg-soft-gray">
        <div className="container-bookito py-4">
          <nav className="flex items-center gap-2 text-xs text-ink-muted">
            <Link to="/" className="hover:text-terracotta">خانه</Link>
            <span>/</span>
            <Link to="/books" className="hover:text-terracotta">کتاب‌ها</Link>
            <span>/</span>
            <span className="text-ink line-clamp-1">{book.title}</span>
          </nav>
        </div>
      </div>

      <div className="container-bookito py-8 lg:py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Cover */}
          <div className="mx-auto w-full max-w-sm lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-2xl shadow-2xl">
              <BookCover title={book.title} authorName={book.authorName} cover={book.cover} className="w-full" />
            </div>
          </div>

          {/* Details */}
          <div>
            {/* Category badge */}
            <span className="inline-block rounded-full bg-soft-gray px-3 py-1 text-xs font-medium text-ink-muted">
              {book.category}
            </span>

            {/* Title */}
            <h1 className="mt-3 text-2xl font-bold text-ink sm:text-3xl">{book.title}</h1>

            {/* Author link */}
            {author && (
              <Link
                to={`/books?author=${author.slug}`}
                className="mt-2 inline-block text-sm text-terracotta hover:text-terracotta-light"
              >
                {book.authorName}
              </Link>
            )}

            {/* Rating */}
            <div className="mt-3 flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    className={star <= Math.round(book.rating) ? 'fill-gold text-gold' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-sm text-ink-muted">
                {toPersianDigits(book.rating)} ({toPersianDigits(book.reviewCount)} نظر)
              </span>
            </div>

            {/* Price */}
            <div className="mt-5 flex items-center gap-3">
              {hasDiscount ? (
                <>
                  <span className="text-2xl font-bold text-terracotta">
                    {formatPrice(discountedPrice)}
                  </span>
                  <span className="text-lg text-ink-muted line-through">
                    {formatPrice(book.price)}
                  </span>
                  <span className="rounded-full bg-terracotta/10 px-2.5 py-1 text-xs font-bold text-terracotta">
                    {toPersianDigits(book.discountPercent)}٪ تخفیف
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold text-ink">{formatPrice(book.price)}</span>
              )}
            </div>

            {/* Stock */}
            <div className="mt-3 flex items-center gap-2 text-sm">
              {book.stock > 0 ? (
                <>
                  <span className="flex h-2 w-2 rounded-full bg-green-600" />
                  <span className="text-green-700">موجود در انبار ({toPersianDigits(book.stock)} عدد)</span>
                </>
              ) : (
                <>
                  <span className="flex h-2 w-2 rounded-full bg-red-600" />
                  <span className="text-red-700">ناموجود</span>
                </>
              )}
            </div>

            {/* Quantity + Add to cart */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              {/* Quantity selector */}
              <div className="flex items-center rounded-xl border border-black/10 bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex h-12 w-12 items-center justify-center text-ink hover:text-terracotta"
                  disabled={quantity <= 1}
                  aria-label="کاهش تعداد"
                >
                  <Minus size={18} />
                </button>
                <span className="w-12 text-center text-sm font-bold text-ink">
                  {toPersianDigits(quantity)}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(book.stock, quantity + 1))}
                  className="flex h-12 w-12 items-center justify-center text-ink hover:text-terracotta"
                  disabled={quantity >= book.stock}
                  aria-label="افزایش تعداد"
                >
                  <Plus size={18} />
                </button>
              </div>

              {/* Add to cart */}
              <button
                onClick={handleAddToCart}
                disabled={book.stock === 0}
                className="btn-primary flex-1 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {added ? (
                  <><Check size={18} /> افزوده شد</>
                ) : (
                  <><ShoppingCart size={18} /> افزودن به سبد</>
                )}
              </button>
            </div>

            {/* Buy now */}
            <button
              onClick={handleBuyNow}
              disabled={book.stock === 0}
              className="btn-outline mt-3 w-full disabled:cursor-not-allowed disabled:opacity-50"
            >
              خرید فوری
            </button>

            {/* Description */}
            <div className="mt-8">
              <h2 className="mb-3 text-lg font-bold text-ink">درباره کتاب</h2>
              <p className="text-sm leading-8 text-ink-muted">{book.description}</p>
            </div>

            {/* Specifications */}
            <div className="mt-8 rounded-2xl border border-black/5 bg-soft-gray p-5">
              <h2 className="mb-4 text-lg font-bold text-ink">مشخصات کتاب</h2>
              <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <SpecItem label="ناشر" value={book.publisher} />
                <SpecItem label="شابک" value={book.isbn} />
                <SpecItem label="تعداد صفحات" value={toPersianDigits(book.pages)} />
                <SpecItem label="زبان" value={book.language} />
                <SpecItem label="نوبت چاپ" value={book.edition} />
                <SpecItem label="سال انتشار" value={toPersianDigits(book.publishYear)} />
              </dl>
            </div>

            {/* Author link */}
            {author && (
              <Link
                to={`/books?author=${author.slug}`}
                className="mt-6 flex items-center gap-4 rounded-2xl border border-black/5 bg-white p-4 hover:border-gold transition-colors"
              >
                <div className={`flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-b ${author.portraitGradient}`}>
                  <span className="font-serif text-xl font-bold text-white/40">
                    {author.nameEn.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-ink">{author.name}</p>
                  <p className="text-xs text-ink-muted line-clamp-1">{author.bio}</p>
                </div>
                <ArrowRight size={18} className="text-ink-muted" />
              </Link>
            )}
          </div>
        </div>

        {/* Related books */}
        {relatedBooks.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6 text-xl font-bold text-ink sm:text-2xl">کتاب‌های مرتبط</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {relatedBooks.map((b) => (
                <BookCard key={b.id} book={b} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function SpecItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-black/5 py-2 last:border-0">
      <dt className="text-xs text-ink-muted">{label}</dt>
      <dd className="text-xs font-medium text-ink">{value}</dd>
    </div>
  )
}
