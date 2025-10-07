import { Link } from "react-router-dom"

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Welcome to Our Bookstore</h1>
        <p className="text-xl text-gray-600 mb-8">Discover your next favorite book</p>
        <Link
          to="/books"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700"
        >
          Browse Books
        </Link>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2">Wide Selection</h3>
          <p className="text-gray-600">Thousands of books across all genres</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
          <p className="text-gray-600">Get your books delivered quickly</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2">Best Prices</h3>
          <p className="text-gray-600">Competitive prices on all books</p>
        </div>
      </div>
    </div>
  )
}
