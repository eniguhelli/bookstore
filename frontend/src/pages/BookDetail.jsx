"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getBook } from "../services/api"
import { useCart } from "../context/CartContext"

export default function BookDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()

  useEffect(() => {
    loadBook()
  }, [id])

  const loadBook = async () => {
    try {
      const response = await getBook(id)
      setBook(response.data)
    } catch (error) {
      console.error("Error loading book:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-16">Loading...</div>
  }

  if (!book) {
    return <div className="text-center py-16">Book not found</div>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button onClick={() => navigate(-1)} className="mb-4 text-blue-600 hover:underline">
        ← Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img
          src={book.image || "/placeholder.svg?height=600&width=400"}
          alt={book.title}
          className="w-full rounded-lg shadow-lg"
        />

        <div>
          <h1 className="text-4xl font-bold mb-4">{book.title}</h1>
          <p className="text-xl text-gray-600 mb-4">by {book.author}</p>
          <p className="text-3xl text-blue-600 font-bold mb-6">${book.price}</p>

          <div className="mb-6">
            <h3 className="font-bold mb-2">Description</h3>
            <p className="text-gray-700">{book.description}</p>
          </div>

          <div className="mb-6">
            <p className="text-gray-600">
              <span className="font-bold">ISBN:</span> {book.isbn}
            </p>
            <p className="text-gray-600">
              <span className="font-bold">Stock:</span> {book.stock} available
            </p>
          </div>

          <button
            onClick={() => {
              addToCart(book)
              alert("Added to cart!")
            }}
            className="w-full bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
