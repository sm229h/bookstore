import { Link } from 'react-router-dom'
import { BookOpen, Mail, Phone, MapPin, Instagram, Twitter, Facebook } from 'lucide-react'

const footerLinks = {
  'بوکیتو': [
    { label: 'درباره ما', path: '/account' },
    { label: 'تماس با ما', path: '/account' },
    { label: 'مجله کتاب', path: '/books' },
    { label: 'فرصت‌های شغلی', path: '/account' },
  ],
  'خدمات مشتری': [
    { label: 'راهنمای خرید', path: '/books' },
    { label: 'شرایط ارسال', path: '/books' },
    { label: 'پرسش‌های متداول', path: '/books' },
    { label: 'پیگیری سفارش', path: '/account' },
  ],
  'دسته‌بندی‌ها': [
    { label: 'رمان کلاسیک', path: '/books?category=رمان کلاسیک' },
    { label: 'ادبیات معاصر', path: '/books?category=ادبیات معاصر' },
    { label: 'فلسفه', path: '/books?category=فلسفه' },
    { label: 'روان‌شناسی', path: '/books?category=روان‌شناسی' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-forest-deep text-white/80">
      <div className="container-bookito py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen size={24} className="text-gold" />
              <span className="text-2xl font-extrabold text-white">بوکیتو</span>
              <span className="font-serif text-lg italic text-gold">Bookito</span>
            </div>
            <p className="text-sm leading-7 text-white/60 mb-5">
              مرجع کتاب‌های کلاسیک، رمان‌های ماندگار و آثار برگزیده جهان. بوکیتو، دنیایی از کتاب، یک قدم تا کشف.
            </p>
            <div className="flex gap-3">
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-gold hover:text-forest transition-colors" aria-label="اینستاگرام">
                <Instagram size={18} />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-gold hover:text-forest transition-colors" aria-label="توییتر">
                <Twitter size={18} />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-gold hover:text-forest transition-colors" aria-label="فیسبوک">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-4 text-sm font-bold text-white">{title}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-sm text-white/60 hover:text-gold transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact info */}
        <div className="mt-12 grid grid-cols-1 gap-4 border-t border-white/10 pt-8 sm:grid-cols-3">
          <div className="flex items-center gap-3 text-sm text-white/60">
            <Phone size={18} className="text-gold shrink-0" />
            <span>۰۲۱-۸۸۱۲۳۴۵۶</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-white/60">
            <Mail size={18} className="text-gold shrink-0" />
            <span>info@bookito.ir</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-white/60">
            <MapPin size={18} className="text-gold shrink-0" />
            <span>تهران، خیابان انقلاب، کتاب‌فروشی بوکیتو</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-white/10 pt-6 text-center text-xs text-white/40">
          <p>© ۱۴۰۵ بوکیتو | Bookito. تمام حقوق محفوظ است.</p>
        </div>
      </div>
    </footer>
  )
}
