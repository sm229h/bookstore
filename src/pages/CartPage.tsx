import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatPrice, calculateDiscount, toPersianDigits } from '../utils/format'
import BookCover from '../components/BookCover'

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, subtotal, totalDiscount, totalPayable, totalItems } = useCart()

  if (items.length === 0) {
    return (
      <div className="pt-16 lg:pt-20">
        <div className="container-bookito py-20">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-soft-gray">
              <ShoppingBag size={32} className="text-ink-muted" />
            </div>
            <h1 className="text-xl font-bold text-ink sm:text-2xl">سبد خرید شما خالی است</h1>
            <p className="mt-2 text-sm text-ink-muted">
              هنوز کتابی به سبد خرید خود اضافه نکرده‌اید.
            </p>
            <Link to="/books" className="btn-primary mt-6">
              <ArrowLeft size={18} />
              ادامه خرید
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const shippingCost = totalPayable >= 200000 ? 0 : 45000
  const finalTotal = totalPayable + shippingCost

  return (
    <div className="pt-16 lg:pt-20">
      <div className="container-bookito py-8">
        <h1 className="mb-6 text-2xl font-bold text-ink sm:text-3xl">سبد خرید</h1>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const itemPrice = calculateDiscount(item.price, item.discountPercent)
              const lineTotal = itemPrice * item.quantity
              return (
                <div
                  key={item.bookId}
                  className="flex gap-4 rounded-2xl border border-black/5 bg-white p-4"
                >
                  {/* Cover */}
                  <Link to={`/books/${item.bookId}`} className="shrink-0">
                    <div className="w-20 sm:w-24">
                      <BookCover title={item.title} authorName={item.authorName} cover={item.cover} coverImage={item.coverImage} />
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link
                          to={`/books/${item.bookId}`}
                          className="text-sm font-bold text-ink hover:text-terracotta"
                        >
                          {item.title}
                        </Link>
                        <p className="mt-0.5 text-xs text-ink-muted">{item.authorName}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.bookId)}
                        className="p-1.5 text-ink-muted hover:text-red-600 transition-colors"
                        aria-label="حذف از سبد"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="mt-2 flex items-center gap-2">
                      {item.discountPercent > 0 ? (
                        <>
                          <span className="text-sm font-bold text-terracotta">
                            {formatPrice(itemPrice)}
                          </span>
                          <span className="text-xs text-ink-muted line-through">
                            {formatPrice(item.price)}
                          </span>
                        </>
                      ) : (
                        <span className="text-sm font-bold text-ink">
                          {formatPrice(item.price)}
                        </span>
                      )}
                    </div>

                    {/* Quantity + line total */}
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center rounded-lg border border-black/10">
                        <button
                          onClick={() => updateQuantity(item.bookId, item.quantity - 1)}
                          className="flex h-9 w-9 items-center justify-center text-ink hover:text-terracotta"
                          aria-label="کاهش"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-10 text-center text-sm font-bold text-ink">
                          {toPersianDigits(item.quantity)}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.bookId, item.quantity + 1)}
                          disabled={item.quantity >= item.stock}
                          className="flex h-9 w-9 items-center justify-center text-ink hover:text-terracotta disabled:opacity-30"
                          aria-label="افزایش"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <span className="text-sm font-bold text-ink">
                        {formatPrice(lineTotal)}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Continue shopping */}
            <Link
              to="/books"
              className="flex items-center justify-center gap-2 rounded-xl border border-black/10 bg-white py-3 text-sm font-medium text-ink hover:border-gold transition-colors"
            >
              <ArrowLeft size={18} />
              ادامه خرید
            </Link>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 rounded-2xl border border-black/5 bg-white p-5">
              <h2 className="mb-4 text-lg font-bold text-ink">خلاصه سفارش</h2>

              <dl className="space-y-3">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-ink-muted">تعداد کالا</dt>
                  <dd className="text-sm font-medium text-ink">{toPersianDigits(totalItems)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-ink-muted">جمع کل</dt>
                  <dd className="text-sm font-medium text-ink">{formatPrice(subtotal)}</dd>
                </div>
                {totalDiscount > 0 && (
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-ink-muted">تخفیف</dt>
                    <dd className="text-sm font-medium text-green-600">
                      {formatPrice(totalDiscount)}
                    </dd>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-ink-muted">هزینه ارسال</dt>
                  <dd className="text-sm font-medium text-ink">
                    {shippingCost === 0 ? 'رایگان' : formatPrice(shippingCost)}
                  </dd>
                </div>

                {shippingCost > 0 && (
                  <p className="text-xs text-ink-muted bg-soft-gray rounded-lg p-2">
                    برای ارسال رایگان، {formatPrice(200000 - totalPayable)} بیشتر خرید کنید
                  </p>
                )}

                <div className="border-t border-black/5 pt-3">
                  <div className="flex items-center justify-between">
                    <dt className="text-base font-bold text-ink">مبلغ قابل پرداخت</dt>
                    <dd className="text-lg font-bold text-terracotta">
                      {formatPrice(finalTotal)}
                    </dd>
                  </div>
                </div>
              </dl>

              <Link to="/checkout" className="btn-primary mt-5 w-full">
                تکمیل خرید
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
