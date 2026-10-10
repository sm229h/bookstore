import { Link } from 'react-router-dom'
import { BookOpen } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="pt-16 lg:pt-20">
      <div className="container-bookito py-20">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-forest">
            <BookOpen size={32} className="text-gold" />
          </div>
          <h1 className="text-4xl font-bold text-ink">۴۰۴</h1>
          <p className="mt-3 text-sm text-ink-muted">
            صفحه موردنظر شما پیدا نشد. شاید آدرس را اشتباه وارد کرده‌اید.
          </p>
          <Link to="/" className="btn-primary mt-6">بازگشت به خانه</Link>
        </div>
      </div>
    </div>
  )
}
