"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { login as apiLogin, register as apiRegister } from "../services/api"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    const userData = localStorage.getItem("user")
    
    // Safe JSON parsing
    if (token && userData) {
      try {
        setUser(JSON.parse(userData))
      } catch (err) {
        console.error("Failed to parse user from localStorage:", err)
        localStorage.removeItem("user")
        setUser(null)
      }
    }

    setLoading(false)
  }, [])

  const login = async (credentials) => {
    const response = await apiLogin(credentials)
    const { token, user } = response.data
    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(user))
    setUser(user)
    return response
  }

  const register = async (userData) => {
    const response = await apiRegister(userData)
    const { token, user } = response.data
    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(user))
    setUser(user)
    return response
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
