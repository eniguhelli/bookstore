"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getOrders } from "../services/api"
import { useAuth } from "../context/AuthContext"

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate("/login")
      return
    }
    loadOrders()
  }, [user])

  const loadOrders = async () => {
    try {
      const response = await getOrders()
      setOrders(response.data)
    } catch (error) {
      console.error("Error loading orders:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-16">Loading...</div>
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-600 mb-4">You haven't placed any orders yet</p>
          <button
            onClick={() => navigate("/books")}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600">Order #{order._id}</p>
                  <p className="text-sm text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">${order.totalPrice.toFixed(2)}</p>
                  <span
                        className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : order.status === "cancelled"
                              ? "bg-red-100 text-red-800"
                              : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                </div>
              </div>
              <div className="border-t pt-4">
                {order.items?.map((item, index) => (
                  <div key={index} className="flex justify-between py-2">
                    <span>{item.bookId?.title || "Book"}</span>
                    <span>
                      Qty: {item.quantity} × ${item.bookId?.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
