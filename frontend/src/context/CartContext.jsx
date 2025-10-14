"use client"

import { createContext, useContext, useState, useEffect } from "react"

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (book) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === book._id)
      if (existing) {
        return prev.map((item) => (item.id === book._id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { ...book, id: book._id, quantity: 1 }]
    })
  }

  const removeFromCart = (bookId) => {
    setCart((prev) => prev.filter((item) => item.id !== bookId))
  }

  const updateQuantity = (bookId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(bookId)
      return
    }
    setCart((prev) => prev.map((item) => (item.id === bookId ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setCart([])
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, total }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
