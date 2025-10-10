"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
  getAllOrders,
  updateOrderStatus,
  getUsers,
  updateUser,
  deleteUser,
  getCategories,
} from "../services/api"

export default function AdminDashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("overview")
  const [books, setBooks] = useState([])
  const [orders, setOrders] = useState([])
  const [users, setUsers] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)

  // Book modal states
  const [showBookModal, setShowBookModal] = useState(false)
  const [editingBook, setEditingBook] = useState(null)
  const [bookForm, setBookForm] = useState({
    title: "",
    author: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    coverImage: "",
  })

  // User modal states
  const [showUserModal, setShowUserModal] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    role: "user",
  })

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/")
    }
  }, [user, navigate])

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    if (activeTab === "books") fetchBooks()
    else if (activeTab === "orders") fetchOrders()
    else if (activeTab === "users") fetchUsers()
  }, [activeTab])

  // Fetch functions
  const fetchBooks = async () => {
    setLoading(true)
    try {
      const res = await getBooks()
      setBooks(res.data)
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  const fetchCategories = async () => {
    try {
      const res = await getCategories()
      setCategories(res.data)
    } catch (e) {
      console.error("Error fetching categories:", e)
    }
  }

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const res = await getAllOrders()
      setOrders(res.data)
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const res = await getUsers()
      setUsers(res.data)
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  // Book handlers
  const handleBookSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const bookData = { ...bookForm }
      if (!bookData.category || bookData.category === "") {
        delete bookData.category
      }

      if (editingBook) await updateBook(editingBook._id, bookData)
      else await createBook(bookData)
      setShowBookModal(false)
      setEditingBook(null)
      setBookForm({ title: "", author: "", description: "", price: "", stock: "", category: "", coverImage: "" })
      fetchBooks()
    } catch (e) {
      console.error(e)
      alert("Error saving book")
    }
    setLoading(false)
  }

  const handleEditBook = (book) => {
    setEditingBook(book)
    setBookForm({
      title: book.title,
      author: book.author,
      description: book.description,
      price: book.price,
      stock: book.stock,
      category: book.category ? book.category._id || book.category : "",
      coverImage: book.coverImage || "",
    })
    setShowBookModal(true)
  }

  const handleDeleteBook = async (id) => {
    if (!confirm("Are you sure you want to delete this book?")) return
    setLoading(true)
    try {
      await deleteBook(id)
      fetchBooks()
    } catch (e) {
      console.error(e)
      alert("Error deleting book")
    }
    setLoading(false)
  }

  // User handlers
  const handleEditUser = (user) => {
    setEditingUser(user)
    setUserForm({ name: user.name, email: user.email, role: user.role })
    setShowUserModal(true)
  }

  const handleUserSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await updateUser(editingUser._id, userForm)
      setShowUserModal(false)
      setEditingUser(null)
      fetchUsers()
    } catch (e) {
      console.error(e)
      alert("Error updating user")
    }
    setLoading(false)
  }

  const handleDeleteUser = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return
    setLoading(true)
    try {
      await deleteUser(id)
      fetchUsers()
    } catch (e) {
      console.error(e)
      alert("Error deleting user")
    }
    setLoading(false)
  }

  // Orders
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    setLoading(true)
    try {
      await updateOrderStatus(orderId, newStatus)
      fetchOrders()
    } catch (e) {
      console.error(e)
      alert("Error updating order")
    }
    setLoading(false)
  }

  if (!user || user.role !== "admin") return null

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {["overview", "books", "orders", "users"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 text-sm font-medium ${activeTab === tab ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-gray-700"}`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview */}
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Books</h3>
                  <p className="text-3xl font-bold text-blue-600">{books.length}</p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Orders</h3>
                  <p className="text-3xl font-bold text-green-600">{orders.length}</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Users</h3>
                  <p className="text-3xl font-bold text-purple-600">{users.length}</p>
                </div>
              </div>
            )}

            {/* Books Tab */}
            {activeTab === "books" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Manage Books</h2>
                  <button
                    onClick={() => {
                      setEditingBook(null)
                      setBookForm({
                        title: "",
                        author: "",
                        description: "",
                        price: "",
                        stock: "",
                        category: "",
                        coverImage: "",
                      })
                      setShowBookModal(true)
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Add New Book
                  </button>
                </div>
                {loading ? (
                  <p className="text-center py-8 text-gray-500">Loading...</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          {["Title", "Author", "Price", "Stock", "Actions"].map((h) => (
                            <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {books.map((book) => (
                          <tr key={book._id}>
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{book.title}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{book.author}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">${book.price}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{book.stock}</td>
                            <td className="px-6 py-4 text-sm space-x-2">
                              <button
                                onClick={() => handleEditBook(book)}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteBook(book._id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Manage Orders</h2>
                {loading ? (
                  <p className="text-center py-8 text-gray-500">Loading...</p>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order._id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <p className="font-semibold text-gray-900">Order #{order._id.slice(-6)}</p>
                            <p className="text-sm text-gray-500">
                              Customer: {order.user?.name || order.user?.email || "Unknown"}
                            </p>
                            <p className="text-sm text-gray-500">
                              Date: {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">${order.totalAmount}</p>
                            <select
                              value={order.status}
                              onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                              className="mt-2 text-sm border border-gray-300 rounded px-2 py-1"
                            >
                              {["pending", "processing", "shipped", "delivered", "cancelled"].map((s) => (
                                <option key={s} value={s}>
                                  {s.charAt(0).toUpperCase() + s.slice(1)}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="border-t pt-2">
                          <p className="text-sm font-medium text-gray-700 mb-2">Items:</p>
                          {order.items?.map((item, idx) => (
                            <p key={idx} className="text-sm text-gray-600">
                              {item.book?.title || "Unknown Book"} x {item.quantity} - ${item.price}
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Users Tab */}
            {activeTab === "users" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Manage Users</h2>
                </div>
                {loading ? (
                  <p className="text-center py-8 text-gray-500">Loading...</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          {["Name", "Email", "Role", "Joined Date", "Actions"].map((h) => (
                            <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((u) => (
                          <tr key={u._id}>
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{u.name}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{u.email}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${u.role === "admin" ? "bg-purple-100 text-purple-800" : "bg-gray-100 text-gray-800"}`}
                              >
                                {u.role}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              {new Date(u.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 text-sm space-x-2">
                              <button onClick={() => handleEditUser(u)} className="text-blue-600 hover:text-blue-900">
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteUser(u._id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Book Modal */}
      {showBookModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{editingBook ? "Edit Book" : "Add New Book"}</h2>
              <form onSubmit={handleBookSubmit} className="space-y-4">
                {["title", "author", "description", "price", "stock"].map((f) => {
                  const isTextarea = f === "description"
                  const type = f === "price" || f === "stock" ? "number" : "text"
                  return (
                    <div key={f}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                      </label>
                      {isTextarea ? (
                        <textarea
                          required
                          rows={4}
                          value={bookForm[f]}
                          onChange={(e) => setBookForm({ ...bookForm, [f]: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <input
                          type={type === "number" ? "number" : "text"}
                          step={f === "price" ? "0.01" : undefined}
                          value={bookForm[f]}
                          onChange={(e) => setBookForm({ ...bookForm, [f]: e.target.value })}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      )}
                    </div>
                  )
                })}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={bookForm.category}
                    onChange={(e) => setBookForm({ ...bookForm, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a category (optional)</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
                  <input
                    type="text"
                    value={bookForm.coverImage}
                    onChange={(e) => setBookForm({ ...bookForm, coverImage: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/book.jpg"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowBookModal(false)
                      setEditingBook(null)
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    {loading ? "Saving..." : editingBook ? "Update Book" : "Add Book"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* User Modal */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Edit User</h2>
              <form onSubmit={handleUserSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    required
                    value={userForm.name}
                    onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={userForm.email}
                    onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select
                    value={userForm.role}
                    onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowUserModal(false)
                      setEditingUser(null)
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    {loading ? "Saving..." : "Update User"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
