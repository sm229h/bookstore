import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1462392627162-2baa2b3518a8?fm=jpg&q=80&w=1920&auto=format&fit=crop'

const suggestedTags = ['رمان کلاسیک', 'ادبیات جهان', 'روان‌شناسی', 'فلسفه', 'پرفروش‌ها']

export default function HeroSection() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/books?q=${encodeURIComponent(query.trim())}`)
    } else {
      navigate('/books')
    }
  }

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-forest-deep">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/80 via-forest-deep/70 to-forest-deep/90" />

      {/* Radial warm light from upper-left */}
      <div
        className="absolute -top-20 -left-20 h-[600px] w-[600px] rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #C69A63, transparent 70%)' }}
      />

      {/* Content */}
      <div className="container-bookito relative z-10 flex min-h-[100svh] items-center pt-20">
        <div className="mx-auto max-w-2xl text-center animate-slide-up">
          {/* Brand */}
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="text-3xl font-extrabold text-white sm:text-4xl">بوکیتو</span>
            <span className="font-serif text-xl italic text-gold sm:text-2xl">Bookito</span>
          </div>

          {/* Headline */}
          <h1 className="text-hero text-white text-balance leading-tight">
            دنیایی از کتاب،
            <br />
            <span className="text-gold">یک قدم تا کشف</span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-5 max-w-lg text-base leading-8 text-white/70 sm:text-lg">
            مرجع کتاب‌های کلاسیک، رمان‌های ماندگار و آثار برگزیده جهان
          </p>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="mx-auto mt-8 max-w-xl">
            <div className="relative flex items-center">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="نام کتاب، نویسنده یا موضوع موردنظرت را جستجو کن..."
                className="w-full rounded-full border border-white/15 bg-white/95 py-3.5 pr-5 pl-16 text-sm text-ink placeholder:text-ink-muted/60 shadow-2xl focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
              />
              <button
                type="submit"
                className="absolute left-1.5 flex h-11 w-11 items-center justify-center rounded-full bg-terracotta text-white shadow-lg transition-all hover:bg-terracotta-light active:scale-90"
                aria-label="جستجو"
              >
                <Search size={20} />
              </button>
            </div>
          </form>

          {/* Suggested tags */}
          <div className="mx-auto mt-5 flex flex-wrap items-center justify-center gap-2.5">
            <span className="text-xs text-white/40">پیشنهادها:</span>
            {suggestedTags.map((tag) => (
              <button
                key={tag}
                onClick={() => navigate(`/books?q=${encodeURIComponent(tag)}`)}
                className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs text-white/60 transition-all hover:border-gold/50 hover:bg-white/10 hover:text-gold"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom curve transition */}
      <div className="absolute bottom-0 inset-x-0 z-10">
        <svg viewBox="0 0 1440 80" className="w-full h-auto" preserveAspectRatio="none">
          <path d="M0,80 L0,40 Q360,0 720,20 T1440,30 L1440,80 Z" fill="#F7F5F1" />
        </svg>
      </div>
    </section>
  )
}
