"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { getOrders } from "../services/api"

export default function UserDashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      navigate("/login")
    } else {
      fetchOrders()
    }
  }, [user, navigate])

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const response = await getOrders()
      setOrders(response.data)
    } catch (error) {
      console.error("Error fetching orders:", error)
    }
    setLoading(false)
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome, {user.name}!</h1>
          <p className="text-gray-600">Manage your orders and account settings here.</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Orders</h2>
          {loading ? (
            <p className="text-center py-8 text-gray-500">Loading orders...</p>
          ) : orders.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
              <button
                onClick={() => navigate("/books")}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Browse Books
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order._id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-semibold text-gray-900">Order #{order._id.slice(-6)}</p>
                      <p className="text-sm text-gray-500">
                        Placed on {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">${order.totalAmount}</p>
                      <span
                        className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === "delivered"
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
                  <div className="border-t pt-3">
                    <p className="text-sm font-medium text-gray-700 mb-2">Items:</p>
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>
                          {item.book?.title || "Unknown Book"} x {item.quantity}
                        </span>
                        <span>${item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
