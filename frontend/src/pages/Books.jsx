"use client"

import { useState, useEffect } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { getBooks, getCategories } from "../services/api"
import { useCart } from "../context/CartContext"

export default function Books() {
  const [books, setBooks] = useState([])
  const [categories, setCategories] = useState([])
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      const categoriesRes = await getCategories()
      setCategories(categoriesRes.data)

      // Check if there's a category parameter in the URL
      const categoryParam = searchParams.get("category")
      if (categoryParam) {
        const matchingCategory = categoriesRes.data.find(
          (cat) => cat.name.toLowerCase() === categoryParam.toLowerCase()
        )
        if (matchingCategory) setSelectedCategory(matchingCategory._id)
      }
    } catch (error) {
      console.error("Error loading categories:", error)
    }
  }

  useEffect(() => {
    loadBooks()
  }, [search, selectedCategory])

  const loadBooks = async () => {
    try {
      setLoading(true)
      const booksRes = await getBooks({ q: search, category: selectedCategory })
      setBooks(booksRes.data)
    } catch (error) {
      console.error("Error loading books:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Books</h1>

      {/* Search + Category Filter */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-lg"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <div
            key={book._id}
            className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden h-full"
          >
            {/* Cover Image */}
            <div className="w-full h-80 bg-gray-100 flex items-center justify-center">
              <img
                src={book.coverImage || "/placeholder.svg?height=300&width=200"}
                alt={book.title}
                className="w-full h-full object-contain p-2"
              />
            </div>

            {/* Book Details */}
            <div className="flex flex-col flex-1 p-4">
              <div>
                <h3 className="font-bold text-lg line-clamp-2">{book.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{book.author}</p>
                <p className="text-blue-600 font-bold mt-2">${book.price}</p>
              </div>

              {/* Spacer pushes buttons to bottom */}
              <div className="flex-1" />

              {/* Buttons */}
              <div className="flex gap-2 mt-3">
                <Link
                  to={`/books/${book._id}`}
                  className="flex-1 flex items-center justify-center bg-gray-100 text-gray-800 font-medium rounded-md px-4 py-2 hover:bg-gray-200 transition"
                >
                  View
                </Link>
                <button
                  onClick={() => addToCart(book)}
                  className="flex-1 flex items-center justify-center bg-blue-600 text-white font-medium rounded-md px-4 py-2 hover:bg-blue-700 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Loading state */}
        {loading && <p className="col-span-full text-center text-gray-500">Loading...</p>}
      </div>
    </div>
  )
}
