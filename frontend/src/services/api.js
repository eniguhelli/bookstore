import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

const api = axios.create({
  baseURL: API_URL,
})

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auth
export const login = (credentials) => api.post("/auth/login", credentials)
export const register = (userData) => api.post("/auth/register", userData)

// Users
export const updateUser = (id, data) => api.put(`/users/${id}`, data)
export const deleteUser = (id) => api.delete(`/users/${id}`)

// Books
export const getBooks = (params) => api.get("/books", { params })
export const getBook = (id) => api.get(`/books/${id}`)

export const createBook = (bookData) => api.post("/books", bookData)
export const updateBook = (id, bookData) => api.put(`/books/${id}`, bookData)
export const deleteBook = (id) => api.delete(`/books/${id}`)

// Categories
export const getCategories = () => api.get("/categories")
export const createCategory = (categoryData) => api.post("/categories", categoryData)
export const updateCategory = (id, categoryData) => api.put(`/categories/${id}`, categoryData)
export const deleteCategory = (id) => api.delete(`/categories/${id}`)

// Orders
export const createOrder = (orderData) => api.post("/orders", orderData)
export const getOrders = () => api.get("/orders/my")

export const getAllOrders = () => api.get("/orders")
export const updateOrderStatus = (id, status) => api.put(`/orders/${id}/status`, { status })

export const getUsers = () => api.get("/users")

export default api
