import { useState } from 'react'
import type { BookCover as BookCoverType } from '../types'

interface BookCoverProps {
  title: string
  authorName: string
  cover: BookCoverType
  coverImage?: string
  className?: string
}

/**
 * Renders a book cover — uses a real cover image when available,
 * falls back to an elegant CSS-rendered cover on error or when no image exists.
 */
export default function BookCover({ title, authorName, cover, coverImage, className = '' }: BookCoverProps) {
  const [imageError, setImageError] = useState(false)
  const showImage = coverImage && !imageError

  if (showImage) {
    return (
      <div className={`relative aspect-[2/3] overflow-hidden rounded-lg shadow-md ${className}`}>
        <img
          src={coverImage}
          alt={`جلد کتاب ${title}`}
          loading="lazy"
          onError={() => setImageError(true)}
          onLoad={(e) => {
            if (e.currentTarget.naturalWidth <= 1) setImageError(true)
          }}
          className="h-full w-full object-cover"
        />
      </div>
    )
  }

  const textColor = cover.textLight ? '#F7F5F1' : '#242622'
  return (
    <div
      className={`relative flex aspect-[2/3] flex-col justify-between overflow-hidden rounded-lg p-3 shadow-md ${className}`}
    >
      {/* Gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${cover.gradient}`} />

      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' /%3E%3C/svg%3E")',
        }}
      />

      {/* Accent border at top */}
      <div
        className="absolute top-0 inset-x-0 h-1"
        style={{ backgroundColor: cover.accent }}
      />

      {/* Content */}
      <div className="relative z-10 pt-3">
        <div
          className="mb-2 h-px w-12"
          style={{ backgroundColor: cover.accent, opacity: 0.6 }}
        />
        <h3
          className="font-serif text-base font-bold leading-tight"
          style={{ color: textColor }}
        >
          {title}
        </h3>
      </div>

      <div className="relative z-10">
        <div
          className="mb-1 h-px w-8"
          style={{ backgroundColor: cover.accent, opacity: 0.4 }}
        />
        <p
          className="text-[10px] font-medium opacity-80"
          style={{ color: textColor }}
        >
          {authorName}
        </p>
      </div>

      {/* Spine effect on the left edge */}
      <div
        className="absolute inset-y-0 left-0 w-2 opacity-30"
        style={{
          background: 'linear-gradient(to right, rgba(0,0,0,0.4), transparent)',
        }}
      />
    </div>
  )
}
