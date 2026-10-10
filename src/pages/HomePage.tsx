import { Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import HeroSection from '../components/HeroSection'
import BookCarousel from '../components/BookCarousel'
import AuthorCard from '../components/AuthorCard'
import CollectionShelf from '../components/CollectionShelf'
import Newsletter from '../components/Newsletter'
import { books } from '../data/books'
import { authors } from '../data/authors'
import { collections } from '../data/collections'

export default function HomePage() {
  const newBooks = books.filter((b) => b.isNew)
  const bestsellers = books.filter((b) => b.isBestseller)
  const discounted = books.filter((b) => b.isDiscounted)
  const featured = books.filter((b) => b.isFeatured)
  const featuredAuthors = authors.slice(0, 6)

  return (
    <>
      <HeroSection />

      {/* New arrivals */}
      <BookCarousel
        books={newBooks}
        title="تازه‌های بوکیتو"
        subtitle="کتاب‌هایی که به‌تازگی به کتابخانه ما اضافه شده‌اند"
        badge="Bookito"
      />

      {/* Bestsellers */}
      <BookCarousel
        books={bestsellers}
        title="پرفروش‌ترین‌ها"
        subtitle="محبوب‌ترین کتاب‌های بوکیتو در نگاه خوانندگان"
        badge="Bestsellers"
      />

      {/* Featured authors */}
      <section className="py-12 sm:py-16 bg-soft-gray">
        <div className="container-bookito">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <span className="mb-2 block font-serif text-lg italic text-gold">Bookito</span>
              <h2 className="section-title">نویسندگان منتخب بوکیتو</h2>
              <p className="section-subtitle">آشنایی با نویسندگانی که جهان ادبیات را تغییر دادند</p>
            </div>
            <Link
              to="/books?filter=authors"
              className="flex items-center gap-1 text-sm font-medium text-terracotta hover:text-terracotta-light transition-colors"
            >
              مشاهده همه
              <ChevronLeft size={16} />
            </Link>
          </div>

          <div className="no-scrollbar flex gap-6 overflow-x-auto pb-4 sm:grid sm:grid-cols-3 sm:overflow-visible lg:grid-cols-6">
            {featuredAuthors.map((author) => (
              <div key={author.id} className="shrink-0">
                <AuthorCard author={author} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curated collections - book spines */}
      <CollectionShelf
        collections={collections}
        title="کتابخانه‌های موضوعی"
        subtitle="مجموعه‌های منتخب و دسته‌بندی‌شده برای کشف آثار برگزیده"
      />

      {/* Discounted books */}
      <BookCarousel
        books={discounted}
        title="تخفیف‌های ویژه"
        subtitle="کتاب‌های منتخب با تخفیف‌های استثنایی"
        badge="On Sale"
      />

      {/* Recommended books */}
      <BookCarousel
        books={featured}
        title="پیشنهاد بوکیتو"
        subtitle="آثاری که پیشنهاد می‌کنیم از دست ندهید"
        badge="Editor's Pick"
      />

      {/* Newsletter */}
      <Newsletter />
    </>
  )
}
