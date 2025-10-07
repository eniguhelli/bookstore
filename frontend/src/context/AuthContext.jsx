"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { login as apiLogin, register as apiRegister } from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load from localStorage when app starts
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (savedUser && savedToken) {
      try {
        setUser(JSON.parse(savedUser));
        setToken(savedToken);
      } catch (err) {
        console.error("Invalid user data in localStorage:", err);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }

    setLoading(false);
  }, []);

  // Login
  const login = async (credentials) => {
    const response = await apiLogin(credentials);
    const { accessToken, user } = response.data;

    localStorage.setItem("token", accessToken);
    localStorage.setItem("user", JSON.stringify(user));

    setUser(user);
    setToken(accessToken);

    return response;
  };

  // Register
  const register = async (userData) => {
    const response = await apiRegister(userData);
    const { accessToken, user } = response.data;

    localStorage.setItem("token", accessToken);
    localStorage.setItem("user", JSON.stringify(user));

    setUser(user);
    setToken(accessToken);

    return response;
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
