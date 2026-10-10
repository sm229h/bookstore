import { Link } from 'react-router-dom'
import type { Collection } from '../types'
import { toPersianDigits } from '../utils/format'

interface CollectionShelfProps {
  collections: Collection[]
  title: string
  subtitle?: string
}

export default function CollectionShelf({ collections, title, subtitle }: CollectionShelfProps) {
  return (
    <section className="py-12 sm:py-16 bg-soft-gray">
      <div className="container-bookito">
        <div className="mb-8 text-center">
          <h2 className="section-title">{title}</h2>
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </div>

        {/* Desktop: tilted book spines */}
        <div className="hidden md:flex items-end justify-center gap-1.5 lg:gap-2">
          {collections.map((collection, index) => (
            <Link
              key={collection.id}
              to={`/books?collection=${collection.slug}`}
              className="group relative flex h-44 w-12 items-center justify-center overflow-hidden rounded-t-md rounded-b-sm shadow-lg transition-all duration-500 ease-smooth hover:h-52 hover:w-14 hover:z-10 hover:shadow-2xl lg:h-56 lg:w-14"
              style={{
                background: `linear-gradient(to bottom, var(--tw-gradient-stops))`,
                transform: `rotate(${index % 2 === 0 ? -1.5 : 1.5}deg)`,
              }}
            >
              <div className={`absolute inset-0 bg-gradient-to-b ${collection.spineGradient}`} />
              {/* Spine texture */}
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' /%3E%3C/svg%3E\")",
              }} />
              {/* Top accent */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gold/40" />
              {/* Bottom accent */}
              <div className="absolute bottom-0 inset-x-0 h-1 bg-gold/30" />

              {/* Vertical title */}
              <span
                className="relative z-10 whitespace-nowrap text-xs font-bold text-white/90 transition-colors group-hover:text-gold"
                style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
              >
                {collection.title}
              </span>

              {/* Book count badge */}
              <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[9px] text-white/50">
                {toPersianDigits(collection.bookCount)}
              </span>
            </Link>
          ))}
        </div>

        {/* Mobile: horizontal scroll shelf */}
        <div className="no-scrollbar flex gap-3 overflow-x-auto pb-2 md:hidden">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              to={`/books?collection=${collection.slug}`}
              className="group relative flex h-40 w-12 shrink-0 items-center justify-center overflow-hidden rounded-t-md rounded-b-sm shadow-lg"
            >
              <div className={`absolute inset-0 bg-gradient-to-b ${collection.spineGradient}`} />
              <div className="absolute top-0 inset-x-0 h-1 bg-gold/40" />
              <span
                className="relative z-10 whitespace-nowrap text-[10px] font-bold text-white/90 transition-colors group-hover:text-gold"
                style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
              >
                {collection.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
