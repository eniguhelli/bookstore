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
        // Find the category ID that matches the name from URL
        const matchingCategory = categoriesRes.data.find(
          (cat) => cat.name.toLowerCase() === categoryParam.toLowerCase(),
        )
        if (matchingCategory) {
          setSelectedCategory(matchingCategory._id)
        }
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
      const booksRes = await getBooks({ search, category: selectedCategory })
      setBooks(booksRes.data)
    } catch (error) {
      console.error("Error loading books:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-16">Loading...</div>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Books</h1>

      <div className="mb-8 flex gap-4">
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

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <div key={book._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="w-full h-80 bg-gray-100 flex items-center justify-center">
              <img
                src={book.coverImage || "/placeholder.svg?height=300&width=200"}
                alt={book.title}
                className="w-full h-full object-contain p-2"
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">{book.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{book.author}</p>
              <p className="text-blue-600 font-bold mb-4">${book.price}</p>
              <div className="flex gap-2">
                <Link
                  to={`/books/${book._id}`}
                  className="flex-1 text-center bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                >
                  View
                </Link>
                <button
                  onClick={() => addToCart(book)}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
