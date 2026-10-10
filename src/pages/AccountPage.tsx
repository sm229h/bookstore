import { Link } from 'react-router-dom'
import { User, Package, Heart, Settings, LogOut, BookOpen } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { toPersianDigits } from '../utils/format'

export default function AccountPage() {
  const { totalItems } = useCart()

  return (
    <div className="pt-16 lg:pt-20">
      <div className="container-bookito py-8">
        <h1 className="mb-6 text-2xl font-bold text-ink sm:text-3xl">حساب کاربری</h1>

        {/* Demo notice */}
        <div className="mb-6 rounded-2xl border border-gold/30 bg-gold/5 p-4">
          <p className="text-sm text-ink-muted">
            <span className="font-bold text-ink">حالت نمایشی:</span> این بخش در حالت نمایشی است. برای فعال‌سازی ورود و ثبت‌نام واقعی، باید backend و سیستم احراز هویت را تنظیم کنید.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="rounded-2xl border border-black/5 bg-white p-5">
              {/* User avatar */}
              <div className="flex items-center gap-3 pb-4 border-b border-black/5">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-forest">
                  <User size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-ink">کاربر مهمان</p>
                  <p className="text-xs text-ink-muted">وارد نشده‌اید</p>
                </div>
              </div>

              {/* Menu */}
              <nav className="mt-4 space-y-1">
                <Link to="/account" className="flex items-center gap-3 rounded-xl bg-soft-gray px-4 py-3 text-sm font-medium text-ink">
                  <User size={18} /> پروفایل
                </Link>
                <Link to="/account" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-ink-muted hover:bg-soft-gray hover:text-ink transition-colors">
                  <Package size={18} /> سفارش‌های من
                </Link>
                <Link to="/cart" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-ink-muted hover:bg-soft-gray hover:text-ink transition-colors">
                  <BookOpen size={18} /> سبد خرید ({toPersianDigits(totalItems)})
                </Link>
                <Link to="/account" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-ink-muted hover:bg-soft-gray hover:text-ink transition-colors">
                  <Heart size={18} /> علاقه‌مندی‌ها
                </Link>
                <Link to="/account" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-ink-muted hover:bg-soft-gray hover:text-ink transition-colors">
                  <Settings size={18} /> تنظیمات
                </Link>
                <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-ink-muted hover:bg-soft-gray hover:text-ink transition-colors">
                  <LogOut size={18} /> خروج
                </button>
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Login prompt */}
            <div className="rounded-2xl border border-black/5 bg-white p-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-soft-gray">
                <User size={28} className="text-ink-muted" />
              </div>
              <h2 className="text-lg font-bold text-ink">به بوکیتو خوش آمدید</h2>
              <p className="mt-2 text-sm text-ink-muted">
                برای دسترسی به سفارش‌ها، علاقه‌مندی‌ها و تنظیمات حساب، وارد شوید یا ثبت‌نام کنید.
              </p>
              <div className="mt-5 flex gap-3 justify-center">
                <button className="btn-primary">ورود</button>
                <button className="btn-outline">ثبت‌نام</button>
              </div>
            </div>

            {/* Recent orders placeholder */}
            <div className="rounded-2xl border border-black/5 bg-white p-5">
              <h3 className="mb-4 text-sm font-bold text-ink">سفارش‌های اخیر</h3>
              <p className="text-sm text-ink-muted text-center py-8">هنوز سفارشی ثبت نشده است.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
