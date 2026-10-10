import { useState } from 'react'
import { Mail, Check } from 'lucide-react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubmitted(true)
      setEmail('')
      setTimeout(() => setSubmitted(false), 4000)
    }
  }

  return (
    <section className="py-16 sm:py-20">
      <div className="container-bookito">
        <div className="relative overflow-hidden rounded-3xl bg-forest px-6 py-12 text-center sm:px-12 sm:py-16">
          {/* Decorative gradient */}
          <div
            className="absolute -top-10 -right-10 h-60 w-60 rounded-full opacity-20 blur-3xl"
            style={{ background: 'radial-gradient(circle, #C69A63, transparent 70%)' }}
          />
          <div
            className="absolute -bottom-10 -left-10 h-60 w-60 rounded-full opacity-15 blur-3xl"
            style={{ background: 'radial-gradient(circle, #A94F24, transparent 70%)' }}
          />

          <div className="relative z-10 mx-auto max-w-2xl">
            <div className="mb-4 flex justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/15">
                <Mail size={24} className="text-gold" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              عضو خبرنامه بوکیتو شوید
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/60">
              از جدیدترین کتاب‌ها، تخفیف‌های ویژه و رویدادهای ادبی بوکیتو باخبر شوید. ایمیل خود را وارد کنید تا هیچ اثری را از دست ندهید.
            </p>

            {submitted ? (
              <div className="mt-6 flex items-center justify-center gap-2 text-gold">
                <Check size={20} />
                <span className="text-sm font-medium">عضویت شما با موفقیت ثبت شد!</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ایمیل شما..."
                  required
                  className="flex-1 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm text-white placeholder:text-white/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                />
                <button type="submit" className="btn-primary shrink-0">
                  عضویت
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
