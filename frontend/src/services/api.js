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

// Books
export const getBooks = (params) => api.get("/books", { params })
export const getBook = (id) => api.get(`/books/${id}`)

// Categories
export const getCategories = () => api.get("/categories")

// Orders
export const createOrder = (orderData) => api.post("/orders", orderData)
export const getOrders = () => api.get("/orders")

export default api
