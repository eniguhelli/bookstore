"use client"

import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { getBooks } from "../services/api"

const heroSlides = [
  {
    id: 1,
    title: "Discover Literary Masterpieces",
    subtitle: "Explore timeless classics and contemporary bestsellers",
    cta: "Explore Collection",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&h=600&fit=crop",
  },
  {
    id: 2,
    title: "New Arrivals This Week",
    subtitle: "Fresh stories waiting to be discovered",
    cta: "See What's New",
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=1200&h=600&fit=crop",
  },
  {
    id: 3,
    title: "Summer Reading Collection",
    subtitle: "Perfect books for your next adventure",
    cta: "Browse Summer Picks",
    image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=1200&h=600&fit=crop",
  },
]

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [featuredBooks, setFeaturedBooks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const fetchFeaturedBooks = async () => {
      try {
        const response = await getBooks({})
        // Limit to 4 books for featured section
        setFeaturedBooks(response.data.slice(0, 4))
      } catch (error) {
        console.error("Error fetching featured books:", error)
        // Keep empty array on error
        setFeaturedBooks([])
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedBooks()
  }, [])

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="relative h-[600px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-10" />
            <img src={slide.image || "/placeholder.svg"} alt={slide.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <div className="text-center text-white max-w-4xl px-4">
                <h1 className="text-6xl font-serif font-bold mb-6 text-balance">{slide.title}</h1>
                <p className="text-2xl mb-8 text-balance opacity-90">{slide.subtitle}</p>
                <Link
                  to="/books"
                  className="inline-block bg-amber-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-amber-700 transition-colors shadow-lg"
                >
                  {slide.cta}
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? "bg-white w-8" : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Featured Books</h2>
          <p className="text-xl text-gray-600">Handpicked selections from our collection</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
            <p className="mt-4 text-gray-600">Loading featured books...</p>
          </div>
        ) : featuredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredBooks.map((book) => (
              <Link
                key={book._id}
                to={`/books/${book._id}`}
                className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                  <img
                    src={
                      book.coverImage ||
                      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop" ||
                      "/placeholder.svg" ||
                      "/placeholder.svg"
                    }
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-1">{book.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{book.author}</p>
                  <p className="text-amber-700 font-bold text-lg">${book.price}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No featured books available at the moment.</p>
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            to="/books"
            className="inline-block border-2 border-amber-600 text-amber-700 px-8 py-3 rounded-full text-lg font-semibold hover:bg-amber-600 hover:text-white transition-colors"
          >
            View All Books
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">Wide Selection</h3>
            <p className="text-gray-600 leading-relaxed">
              Thousands of books across all genres, from classics to bestsellers
            </p>
          </div>

          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">Fast Delivery</h3>
            <p className="text-gray-600 leading-relaxed">
              Get your books delivered quickly with our express shipping options
            </p>
          </div>

          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">Best Prices</h3>
            <p className="text-gray-600 leading-relaxed">
              Competitive prices on all books with regular discounts and offers
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-amber-700 to-orange-600 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-serif font-bold text-white mb-4">Join Our Book Club</h2>
          <p className="text-xl text-amber-50 mb-8">
            Get exclusive deals, new releases, and reading recommendations delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-amber-300"
            />
            <button className="bg-gray-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-colors whitespace-nowrap">
              Subscribe Now
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
