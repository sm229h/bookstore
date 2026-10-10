import { Link } from 'react-router-dom'
import type { Author } from '../types'
import { toPersianDigits } from '../utils/format'

interface AuthorCardProps {
  author: Author
}

export default function AuthorCard({ author }: AuthorCardProps) {
  return (
    <Link
      to={`/books?author=${author.slug}`}
      className="group flex flex-col items-center text-center"
    >
      {/* Portrait */}
      <div className={`relative h-32 w-32 overflow-hidden rounded-full bg-gradient-to-b ${author.portraitGradient} shadow-lg transition-all duration-500 ease-smooth group-hover:scale-105 group-hover:shadow-xl sm:h-40 sm:w-40`}>
        {/* Grayscale filter effect */}
        <div className="absolute inset-0 bg-black/10" />
        {/* Initials */}
        <div className="flex h-full w-full items-center justify-center">
          <span className="font-serif text-3xl font-bold text-white/30 sm:text-4xl">
            {author.nameEn.charAt(0)}
          </span>
        </div>
        {/* Subtle border */}
        <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />
      </div>

      {/* Name */}
      <h3 className="mt-4 text-sm font-bold text-ink transition-colors group-hover:text-terracotta">
        {author.name}
      </h3>

      {/* English name */}
      <p className="mt-0.5 font-serif text-xs italic text-ink-muted">
        {author.nameEn}
      </p>

      {/* Book count */}
      <p className="mt-1 text-xs text-ink-muted">
        {toPersianDigits(author.bookCount)} کتاب
      </p>
    </Link>
  )
}
