import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Check, AlertCircle } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatPrice, toPersianDigits } from '../utils/format'

interface FormData {
  name: string
  phone: string
  address: string
  postalCode: string
  city: string
}

interface FormErrors {
  name?: string
  phone?: string
  address?: string
  postalCode?: string
  city?: string
}

export default function CheckoutPage() {
  const { items, totalPayable, clearCart } = useCart()
  const navigate = useNavigate()
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    address: '',
    postalCode: '',
    city: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [orderConfirmed, setOrderConfirmed] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')

  const shippingCost = totalPayable >= 200000 ? 0 : 45000
  const finalTotal = totalPayable + shippingCost

  const validate = (): boolean => {
    const newErrors: FormErrors = {}
    if (!formData.name.trim()) newErrors.name = 'نام و نام خانوادگی الزامی است'
    if (!formData.phone.trim()) {
      newErrors.phone = 'شماره تلفن الزامی است'
    } else if (!/^09\d{9}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'شماره تلفن معتبر نیست (مثال: ۰۹۱۲۳۴۵۶۷۸۹)'
    }
    if (!formData.address.trim()) newErrors.address = 'آدرس الزامی است'
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'کد پستی الزامی است'
    } else if (!/^\d{10}$/.test(formData.postalCode.replace(/\s/g, ''))) {
      newErrors.postalCode = 'کد پستی باید ۱۰ رقم باشد'
    }
    if (!formData.city.trim()) newErrors.city = 'نام شهر الزامی است'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    // Demo checkout — no real payment is processed
    setTimeout(() => {
      const orderNum = 'BK-' + Date.now().toString().slice(-8)
      setOrderNumber(orderNum)
      setOrderConfirmed(true)
      clearCart()
      setSubmitting(false)
    }, 1500)
  }

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  if (orderConfirmed) {
    return (
      <div className="pt-16 lg:pt-20">
        <div className="container-bookito py-20">
          <div className="mx-auto max-w-lg text-center">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <Check size={36} className="text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-ink">سفارش شما ثبت شد!</h1>
            <p className="mt-3 text-sm text-ink-muted">
              سفارش شما با شماره <span className="font-bold text-ink">{toPersianDigits(orderNumber)}</span> با موفقیت ثبت شد.
            </p>
            <div className="mt-4 rounded-2xl border border-black/5 bg-soft-gray p-4 text-right">
              <p className="text-xs text-ink-muted">
                این یک فروشگاه نمایشی است و هیچ پرداخت واقعی انجام نشده است. برای فعال‌سازی پرداخت واقعی، باید درگاه پرداخت را تنظیم کنید.
              </p>
            </div>
            <div className="mt-6 flex gap-3 justify-center">
              <Link to="/books" className="btn-primary">ادامه خرید</Link>
              <Link to="/" className="btn-outline">بازگشت به خانه</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="pt-16 lg:pt-20">
        <div className="container-bookito py-20 text-center">
          <h1 className="text-xl font-bold text-ink">سبد خرید شما خالی است</h1>
          <Link to="/books" className="btn-primary mt-5">ادامه خرید</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16 lg:pt-20">
      <div className="container-bookito py-8">
        <h1 className="mb-6 text-2xl font-bold text-ink sm:text-3xl">تکمیل خرید</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Form fields */}
          <div className="lg:col-span-2 space-y-5">
            <div className="rounded-2xl border border-black/5 bg-white p-5">
              <h2 className="mb-4 text-lg font-bold text-ink">اطلاعات تحویل</h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Name */}
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-ink">
                    نام و نام خانوادگی
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="input-field"
                    placeholder="مثال: علی رضایی"
                  />
                  {errors.name && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
                      <AlertCircle size={14} /> {errors.name}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink">
                    شماره تلفن
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="input-field"
                    placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                    dir="ltr"
                  />
                  {errors.phone && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
                      <AlertCircle size={14} /> {errors.phone}
                    </p>
                  )}
                </div>

                {/* City */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink">
                    شهر
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    className="input-field"
                    placeholder="مثال: تهران"
                  />
                  {errors.city && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
                      <AlertCircle size={14} /> {errors.city}
                    </p>
                  )}
                </div>

                {/* Address */}
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-sm font-medium text-ink">
                    آدرس کامل
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    className="input-field min-h-[80px] resize-y"
                    placeholder="خیابان، کوچه، پلاک، واحد"
                  />
                  {errors.address && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
                      <AlertCircle size={14} /> {errors.address}
                    </p>
                  )}
                </div>

                {/* Postal code */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink">
                    کد پستی
                  </label>
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => handleChange('postalCode', e.target.value)}
                    className="input-field"
                    placeholder="۱۰ رقم"
                    dir="ltr"
                  />
                  {errors.postalCode && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
                      <AlertCircle size={14} /> {errors.postalCode}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Shipping method */}
            <div className="rounded-2xl border border-black/5 bg-white p-5">
              <h2 className="mb-4 text-lg font-bold text-ink">روش ارسال</h2>
              <label className="flex items-center gap-3 rounded-xl border border-gold/30 bg-gold/5 p-3 cursor-pointer">
                <input type="radio" name="shipping" defaultChecked className="h-4 w-4 accent-terracotta" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-ink">پست پیشتاز</p>
                  <p className="text-xs text-ink-muted">تحویل ۲ تا ۳ روز کاری</p>
                </div>
                <span className="text-sm font-bold text-ink">
                  {shippingCost === 0 ? 'رایگان' : formatPrice(shippingCost)}
                </span>
              </label>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 rounded-2xl border border-black/5 bg-white p-5">
              <h2 className="mb-4 text-lg font-bold text-ink">خلاصه سفارش</h2>

              <div className="space-y-2 mb-4">
                {items.map((item) => (
                  <div key={item.bookId} className="flex items-center justify-between text-sm">
                    <span className="text-ink-muted line-clamp-1 ml-2">
                      {item.title} ({toPersianDigits(item.quantity)})
                    </span>
                    <span className="font-medium text-ink shrink-0">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <dl className="space-y-3 border-t border-black/5 pt-3">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-ink-muted">جمع</dt>
                  <dd className="text-sm font-medium text-ink">{formatPrice(totalPayable)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-ink-muted">ارسال</dt>
                  <dd className="text-sm font-medium text-ink">
                    {shippingCost === 0 ? 'رایگان' : formatPrice(shippingCost)}
                  </dd>
                </div>
                <div className="flex items-center justify-between border-t border-black/5 pt-3">
                  <dt className="text-base font-bold text-ink">مبلغ نهایی</dt>
                  <dd className="text-lg font-bold text-terracotta">{formatPrice(finalTotal)}</dd>
                </div>
              </dl>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary mt-5 w-full disabled:opacity-60"
              >
                {submitting ? 'در حال ثبت...' : 'ثبت سفارش'}
              </button>

              <p className="mt-3 text-center text-xs text-ink-muted">
                فروشگاه نمایشی — پرداخت واقعی انجام نمی‌شود
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
