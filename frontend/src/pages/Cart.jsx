"use client"

import { useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"
import { createOrder } from "../services/api"

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, total } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleCheckout = async () => {
    if (!user) {
      navigate("/login")
      return
    }

    try {
      const orderData = {
        items: cart.map((item) => ({
          bookId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount: total,
      }

      await createOrder(orderData)
      clearCart()
      alert("Order placed successfully!")
      navigate("/orders")
    } catch (error) {
      alert("Failed to place order")
    }
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <button
          onClick={() => navigate("/books")}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Browse Books
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center gap-4 py-4 border-b">
            <img
              src={item.image || "/placeholder.svg?height=100&width=80"}
              alt={item.title}
              className="w-20 h-28 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="font-bold">{item.title}</h3>
              <p className="text-gray-600">{item.author}</p>
              <p className="text-blue-600 font-bold">${item.price}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
              >
                -
              </button>
              <span className="w-12 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
              >
                +
              </button>
            </div>
            <button onClick={() => removeFromCart(item.id)} className="text-red-600 hover:text-red-800">
              Remove
            </button>
          </div>
        ))}

        <div className="mt-6 flex justify-between items-center">
          <div className="text-2xl font-bold">Total: ${total.toFixed(2)}</div>
          <button onClick={handleCheckout} className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700">
            Checkout
          </button>
        </div>
      </div>
    </div>
  )
}
