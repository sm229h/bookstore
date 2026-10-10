/**
 * Convert English digits in a string to Persian digits.
 */
export function toPersianDigits(value: string | number): string {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']
  return String(value).replace(/[0-9]/g, (d) => persianDigits[parseInt(d, 10)])
}

/**
 * Format a price in Tomans with Persian digits and thousands separators.
 */
export function formatPrice(price: number): string {
  return toPersianDigits(price.toLocaleString('en-US')) + ' تومان'
}

/**
 * Format a plain number with Persian digits.
 */
export function formatNumber(value: number): string {
  return toPersianDigits(value.toLocaleString('en-US'))
}

/**
 * Calculate discounted price.
 */
export function calculateDiscount(price: number, discountPercent: number): number {
  return Math.round(price * (1 - discountPercent / 100))
}
