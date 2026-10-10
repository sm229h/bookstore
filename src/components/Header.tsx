import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Menu, X, Search, User, ShoppingBag, Heart, BookOpen } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { toPersianDigits } from '../utils/format'

const navLinks = [
  { id: 'home', label: 'خانه', path: '/' },
  { id: 'books', label: 'کتاب‌ها', path: '/books' },
  { id: 'authors', label: 'نویسندگان', path: '/books?filter=authors' },
  { id: 'categories', label: 'دسته‌بندی‌ها', path: '/books?filter=categories' },
  { id: 'journal', label: 'مجله کتاب', path: '/books' },
  { id: 'about', label: 'درباره ما', path: '/account' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const { totalItems } = useCart()
  const navigate = useNavigate()
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setSearchOpen(false)
  }, [location.pathname])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchValue.trim()) {
      navigate(`/books?q=${encodeURIComponent(searchValue.trim())}`)
      setSearchValue('')
      setSearchOpen(false)
    }
  }

  // Determine header style based on page and scroll
  const isTransparent = isHome && !scrolled
  const headerBg = isTransparent ? 'bg-transparent' : 'bg-forest/95 backdrop-blur-md shadow-lg'
  const textColor = isTransparent ? 'text-white' : 'text-white'

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ease-smooth ${headerBg}`}>
        <div className="container-bookito">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 -mr-2 text-white"
              aria-label="باز کردن منو"
            >
              <Menu size={24} />
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <span className="text-2xl font-extrabold text-white tracking-tight">بوکیتو</span>
              <span className="hidden sm:block font-serif text-lg italic text-gold">Bookito</span>
            </Link>

            {/* Desktop navigation */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  to={link.path}
                  className={`text-sm font-medium ${textColor} hover:text-gold transition-colors duration-200 relative group`}
                >
                  {link.label}
                  <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* Right icons */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-white hover:text-gold transition-colors"
                aria-label="جستجو"
              >
                <Search size={20} />
              </button>
              <Link
                to="/account"
                className="hidden sm:flex p-2 text-white hover:text-gold transition-colors"
                aria-label="حساب کاربری"
              >
                <User size={20} />
              </Link>
              <Link
                to="/account"
                className="hidden sm:flex p-2 text-white hover:text-gold transition-colors"
                aria-label="علاقه‌مندی‌ها"
              >
                <Heart size={20} />
              </Link>
              <Link
                to="/cart"
                className="relative p-2 text-white hover:text-gold transition-colors"
                aria-label="سبد خرید"
              >
                <ShoppingBag size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -left-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-terracotta px-1 text-[10px] font-bold text-white">
                    {toPersianDigits(totalItems)}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Expandable search bar */}
        {searchOpen && (
          <div className="border-t border-white/10 bg-forest-deep/95 backdrop-blur-md">
            <div className="container-bookito py-4">
              <form onSubmit={handleSearch} className="flex gap-2">
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="نام کتاب، نویسنده یا موضوع..."
                  autoFocus
                  className="flex-1 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm text-white placeholder:text-white/50 focus:border-gold focus:outline-none"
                />
                <button type="submit" className="btn-primary">
                  <Search size={18} />
                  جستجو
                </button>
              </form>
            </div>
          </div>
        )}
      </header>

      {/* Mobile navigation drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-forest shadow-2xl animate-slide-up">
            <div className="flex items-center justify-between p-5 border-b border-white/10">
              <div className="flex items-center gap-2">
                <BookOpen size={20} className="text-gold" />
                <span className="text-xl font-bold text-white">بوکیتو</span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-white/70 hover:text-white"
                aria-label="بستن منو"
              >
                <X size={24} />
              </button>
            </div>
            <nav className="flex flex-col p-5 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  to={link.path}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-white/90 hover:bg-white/10 hover:text-gold transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="my-3 h-px bg-white/10" />
              <Link to="/account" className="flex items-center gap-3 rounded-xl px-4 py-3 text-white/90 hover:bg-white/10">
                <User size={18} /> حساب کاربری
              </Link>
              <Link to="/cart" className="flex items-center gap-3 rounded-xl px-4 py-3 text-white/90 hover:bg-white/10">
                <ShoppingBag size={18} /> سبد خرید ({toPersianDigits(totalItems)})
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
