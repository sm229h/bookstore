import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import type { CartItem, Book } from '../types'
import { calculateDiscount } from '../utils/format'

interface CartContextType {
  items: CartItem[]
  addToCart: (book: Book, quantity?: number) => void
  removeFromCart: (bookId: string) => void
  updateQuantity: (bookId: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  subtotal: number
  totalDiscount: number
  totalPayable: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const STORAGE_KEY = 'bookito-cart'

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // ignore
    }
  }, [items])

  const addToCart = useCallback((book: Book, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.bookId === book.id)
      if (existing) {
        return prev.map((i) =>
          i.bookId === book.id
            ? { ...i, quantity: Math.min(i.quantity + quantity, i.stock) }
            : i,
        )
      }
      return [
        ...prev,
        {
          bookId: book.id,
          title: book.title,
          authorName: book.authorName,
          price: book.price,
          discountPercent: book.discountPercent,
          cover: book.cover,
          coverImage: book.coverImage,
          quantity: Math.min(quantity, book.stock),
          stock: book.stock,
        },
      ]
    })
  }, [])

  const removeFromCart = useCallback((bookId: string) => {
    setItems((prev) => prev.filter((i) => i.bookId !== bookId))
  }, [])

  const updateQuantity = useCallback((bookId: string, quantity: number) => {
    setItems((prev) =>
      prev.map((i) =>
        i.bookId === bookId
          ? { ...i, quantity: Math.max(1, Math.min(quantity, i.stock)) }
          : i,
      ),
    )
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const totalDiscount = items.reduce(
    (sum, i) => sum + (i.price - calculateDiscount(i.price, i.discountPercent)) * i.quantity,
    0,
  )
  const totalPayable = subtotal - totalDiscount

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        totalDiscount,
        totalPayable,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
