import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, BookOpen, Glasses } from 'lucide-react'

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
      {/* Layered gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-forest via-forest-deep to-forest-deep" />

      {/* Radial light source (warm sunlight from upper-left) */}
      <div
        className="absolute -top-20 -left-20 h-[600px] w-[600px] rounded-full opacity-25 blur-3xl"
        style={{ background: 'radial-gradient(circle, #C69A63, transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full opacity-15 blur-3xl"
        style={{ background: 'radial-gradient(circle, #8b5a2b, transparent 70%)' }}
      />

      {/* Subtle grain texture */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' /%3E%3C/svg%3E\")",
        }}
      />

      {/* Content */}
      <div className="container-bookito relative z-10 flex min-h-[100svh] items-center pt-20">
        <div className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Text content (right side in RTL) */}
          <div className="text-center lg:text-right animate-slide-up">
            {/* Brand */}
            <div className="mb-6 flex items-center justify-center lg:justify-start gap-3">
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
            <p className="mx-auto lg:mr-0 mt-5 max-w-lg text-base leading-8 text-white/70 sm:text-lg">
              مرجع کتاب‌های کلاسیک، رمان‌های ماندگار و آثار برگزیده جهان
            </p>

            {/* Search bar */}
            <form onSubmit={handleSearch} className="mx-auto lg:mr-0 mt-8 max-w-xl">
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
            <div className="mx-auto lg:mr-0 mt-5 flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
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

          {/* Still-life composition (left side in RTL) */}
          <div className="hidden lg:block relative animate-fade-in">
            <StillLifeComposition />
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

/**
 * CSS-based still-life composition recreating the reference image's right side:
 * stacked books, a classical bust, reading glasses, and a plant branch.
 */
function StillLifeComposition() {
  return (
    <div className="relative h-[480px] w-full">
      {/* Wooden table surface */}
      <div
        className="absolute bottom-0 inset-x-0 h-32 rounded-b-2xl"
        style={{
          background: 'linear-gradient(to bottom, #5a3a1a, #3d2812)',
          boxShadow: '0 -4px 20px rgba(0,0,0,0.3)',
        }}
      />

      {/* Classical bust silhouette */}
      <div className="absolute top-0 left-8 h-64 w-44">
        <div
          className="relative h-full w-full overflow-hidden rounded-t-full"
          style={{
            background: 'linear-gradient(135deg, #d4c5a8, #a89a7e 60%, #8a7d65)',
            boxShadow: 'inset -10px -10px 30px rgba(0,0,0,0.25), 0 20px 40px rgba(0,0,0,0.3)',
          }}
        >
          {/* Bust head shape */}
          <div
            className="absolute top-6 left-1/2 -translate-x-1/2 h-28 w-24 rounded-t-full"
            style={{
              background: 'linear-gradient(135deg, #e0d2b8, #b5a78c 60%, #968870)',
              boxShadow: 'inset -5px -5px 15px rgba(0,0,0,0.2)',
            }}
          />
          {/* Bust shoulders */}
          <div
            className="absolute bottom-0 inset-x-0 h-24"
            style={{
              background: 'linear-gradient(135deg, #d4c5a8, #a89a7e 60%, #8a7d65)',
              borderRadius: '50% 50% 0 0 / 40% 40% 0 0',
              boxShadow: 'inset -8px -8px 20px rgba(0,0,0,0.2)',
            }}
          />
          {/* Shadow on right side */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to left, rgba(0,0,0,0.3), transparent 40%)',
            }}
          />
        </div>
      </div>

      {/* Stack of books */}
      <div className="absolute bottom-24 right-4 w-56">
        {/* Book 4 (bottom) */}
        <div
          className="h-14 w-52 rounded-sm shadow-lg"
          style={{
            background: 'linear-gradient(to right, #1a3c34, #142923)',
            borderRight: '4px solid #C69A63',
          }}
        >
          <div className="flex h-full items-center justify-center pr-2">
            <span className="font-serif text-xs font-bold text-gold/80 tracking-wider">MOBY-DICK</span>
          </div>
        </div>
        {/* Book 3 */}
        <div
          className="mt-1 h-12 w-48 rounded-sm shadow-lg"
          style={{
            background: 'linear-gradient(to right, #8b1a1a, #5a0f0f)',
            borderRight: '4px solid #D4B07E',
          }}
        >
          <div className="flex h-full items-center justify-center pr-2">
            <span className="font-serif text-xs font-bold text-gold-light/80 tracking-wider">PRIDE & PREJUDICE</span>
          </div>
        </div>
        {/* Book 2 */}
        <div
          className="mt-1 h-13 w-52 rounded-sm shadow-lg"
          style={{
            background: 'linear-gradient(to right, #2a4a6a, #1a3050)',
            borderRight: '4px solid #C69A63',
          }}
        >
          <div className="flex h-full items-center justify-center pr-2">
            <span className="font-serif text-xs font-bold text-gold/80 tracking-wider">1984</span>
          </div>
        </div>
        {/* Book 1 (top) */}
        <div
          className="mt-1 h-12 w-44 rounded-sm shadow-lg"
          style={{
            background: 'linear-gradient(to right, #6a5a2a, #4a3e1a)',
            borderRight: '4px solid #F7F5F1',
          }}
        >
          <div className="flex h-full items-center justify-center pr-2">
            <span className="font-serif text-xs font-bold text-ivory/80 tracking-wider">THE GREAT GATSBY</span>
          </div>
        </div>
      </div>

      {/* Reading glasses */}
      <div className="absolute bottom-20 left-16 rotate-[-15deg]">
        <Glasses size={48} className="text-gold/40" strokeWidth={1.5} />
      </div>

      {/* Plant branch */}
      <div className="absolute top-4 right-0 text-gold/20">
        <svg width="80" height="120" viewBox="0 0 80 120" fill="none">
          <path d="M40 120 Q35 80 45 50 Q55 25 40 0" stroke="currentColor" strokeWidth="2" />
          <ellipse cx="30" cy="70" rx="12" ry="4" fill="currentColor" transform="rotate(-30 30 70)" />
          <ellipse cx="55" cy="55" rx="12" ry="4" fill="currentColor" transform="rotate(40 55 55)" />
          <ellipse cx="35" cy="35" rx="10" ry="3" fill="currentColor" transform="rotate(-20 35 35)" />
          <ellipse cx="50" cy="20" rx="10" ry="3" fill="currentColor" transform="rotate(30 50 20)" />
        </svg>
      </div>

      {/* Decorative book icon */}
      <div className="absolute top-12 right-12 opacity-20">
        <BookOpen size={32} className="text-gold" />
      </div>

      {/* Warm light overlay */}
      <div
        className="absolute inset-0 rounded-2xl opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 30% 20%, #C69A63, transparent 60%)',
        }}
      />
    </div>
  )
}
