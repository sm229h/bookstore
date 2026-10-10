import { useMemo, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Search, SlidersHorizontal, X, BookOpen } from 'lucide-react'
import { books, categories } from '../data/books'
import { authors } from '../data/authors'
import BookCard from '../components/BookCard'
import { toPersianDigits } from '../utils/format'

type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'popular'

export default function BooksPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const category = searchParams.get('category') || ''
  const authorSlug = searchParams.get('author') || ''
  const sort = (searchParams.get('sort') as SortOption) || 'newest'
  const minPrice = searchParams.get('minPrice') || ''
  const maxPrice = searchParams.get('maxPrice') || ''
  const [showFilters, setShowFilters] = useState(false)
  const [searchInput, setSearchInput] = useState(query)

  const author = authors.find((a) => a.slug === authorSlug)

  const filteredBooks = useMemo(() => {
    let result = [...books]

    // Search filter
    if (query) {
      const q = query.toLowerCase()
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.authorName.toLowerCase().includes(q) ||
          b.category.toLowerCase().includes(q),
      )
    }

    // Category filter
    if (category) {
      result = result.filter((b) => b.category === category)
    }

    // Author filter
    if (authorSlug) {
      const authorData = authors.find((a) => a.slug === authorSlug)
      if (authorData) {
        result = result.filter((b) => b.authorId === authorData.id)
      }
    }

    // Price range
    if (minPrice) {
      result = result.filter((b) => b.price >= parseInt(minPrice))
    }
    if (maxPrice) {
      result = result.filter((b) => b.price <= parseInt(maxPrice))
    }

    // Sort
    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'popular':
        result.sort((a, b) => b.reviewCount - a.reviewCount)
        break
      default:
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
    }

    return result
  }, [query, category, authorSlug, sort, minPrice, maxPrice])

  const updateParam = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams)
    if (value) {
      newParams.set(key, value)
    } else {
      newParams.delete(key)
    }
    setSearchParams(newParams)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    updateParam('q', searchInput)
  }

  const clearFilters = () => {
    setSearchParams({})
    setSearchInput('')
  }

  const hasActiveFilters = query || category || authorSlug || minPrice || maxPrice

  return (
    <div className="pt-16 lg:pt-20">
      {/* Page header */}
      <div className="border-b border-black/5 bg-soft-gray">
        <div className="container-bookito py-8">
          <nav className="mb-3 flex items-center gap-2 text-xs text-ink-muted">
            <Link to="/" className="hover:text-terracotta">خانه</Link>
            <span>/</span>
            <span className="text-ink">کتاب‌ها</span>
            {author && (
              <>
                <span>/</span>
                <span className="text-ink">{author.name}</span>
              </>
            )}
          </nav>
          <h1 className="text-2xl font-bold text-ink sm:text-3xl">
            {author ? `کتاب‌های ${author.name}` : category || 'همه کتاب‌ها'}
          </h1>
          <p className="mt-2 text-sm text-ink-muted">
            {toPersianDigits(filteredBooks.length)} کتاب یافت شد
          </p>
        </div>
      </div>

      <div className="container-bookito py-8">
        {/* Search bar */}
        <form onSubmit={handleSearch} className="mb-6 flex gap-2">
          <div className="relative flex-1">
            <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="جستجوی کتاب، نویسنده یا موضوع..."
              className="w-full rounded-xl border border-black/10 bg-white py-3 pr-10 pl-4 text-sm text-ink placeholder:text-ink-muted/60 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
            />
          </div>
          <button type="submit" className="btn-primary">جستجو</button>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-medium text-ink hover:border-gold lg:hidden"
          >
            <SlidersHorizontal size={18} />
          </button>
        </form>

        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Filters sidebar */}
          <aside className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-64 shrink-0`}>
            <div className="space-y-6 rounded-2xl border border-black/5 bg-white p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-ink">فیلترها</h3>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-1 text-xs text-terracotta hover:text-terracotta-light"
                  >
                    <X size={14} /> پاک کردن
                  </button>
                )}
              </div>

              {/* Active filters */}
              {hasActiveFilters && (
                <div className="flex flex-wrap gap-2">
                  {query && (
                    <span className="flex items-center gap-1 rounded-full bg-soft-gray px-3 py-1 text-xs text-ink">
                      {query}
                      <button onClick={() => updateParam('q', '')}><X size={12} /></button>
                    </span>
                  )}
                  {category && (
                    <span className="flex items-center gap-1 rounded-full bg-soft-gray px-3 py-1 text-xs text-ink">
                      {category}
                      <button onClick={() => updateParam('category', '')}><X size={12} /></button>
                    </span>
                  )}
                  {authorSlug && (
                    <span className="flex items-center gap-1 rounded-full bg-soft-gray px-3 py-1 text-xs text-ink">
                      {author?.name}
                      <button onClick={() => updateParam('author', '')}><X size={12} /></button>
                    </span>
                  )}
                </div>
              )}

              {/* Category filter */}
              <div>
                <h4 className="mb-3 text-xs font-semibold text-ink-muted">دسته‌بندی</h4>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        checked={category === cat}
                        onChange={() => updateParam('category', cat)}
                        className="h-4 w-4 accent-terracotta"
                      />
                      <span className="text-sm text-ink">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price range */}
              <div>
                <h4 className="mb-3 text-xs font-semibold text-ink-muted">محدوده قیمت (تومان)</h4>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => updateParam('minPrice', e.target.value)}
                    placeholder="از"
                    className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm focus:border-gold focus:outline-none"
                  />
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => updateParam('maxPrice', e.target.value)}
                    placeholder="تا"
                    className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm focus:border-gold focus:outline-none"
                  />
                </div>
              </div>

              {/* Authors */}
              <div>
                <h4 className="mb-3 text-xs font-semibold text-ink-muted">نویسندگان</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {authors.map((a) => (
                    <label key={a.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="author"
                        checked={authorSlug === a.slug}
                        onChange={() => updateParam('author', a.slug)}
                        className="h-4 w-4 accent-terracotta"
                      />
                      <span className="text-sm text-ink">{a.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1">
            {/* Sort bar */}
            <div className="mb-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <label className="text-sm text-ink-muted whitespace-nowrap">مرتب‌سازی:</label>
                <select
                  value={sort}
                  onChange={(e) => updateParam('sort', e.target.value)}
                  className="rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-ink focus:border-gold focus:outline-none"
                >
                  <option value="newest">جدیدترین</option>
                  <option value="price-asc">ارزان‌ترین</option>
                  <option value="price-desc">گران‌ترین</option>
                  <option value="popular">محبوب‌ترین</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            {filteredBooks.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {filteredBooks.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-soft-gray">
                  <BookOpen size={28} className="text-ink-muted" />
                </div>
                <h3 className="text-lg font-bold text-ink">کتابی یافت نشد</h3>
                <p className="mt-2 text-sm text-ink-muted">
                  با فیلترهای انتخاب‌شده کتابی پیدا نشد. لطفاً فیلترها را تغییر دهید.
                </p>
                <button onClick={clearFilters} className="btn-primary mt-5">
                  پاک کردن فیلترها
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
