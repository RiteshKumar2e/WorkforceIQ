import React, { createContext, useState, useEffect } from 'react'
import * as authService from '../services/authService'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token')
    if (token) {
      loadUser(token)
    } else {
      setLoading(false)
    }
  }, [])

  const loadUser = async (token) => {
    try {
      const userData = await authService.getProfile(token)
      setUser(userData)
      setError(null)
    } catch (err) {
      localStorage.removeItem('token')
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      setLoading(true)
      const response = await authService.login(email, password)
      localStorage.setItem('token', response.token)
      setUser(response.user)
      setError(null)
      return response
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const register = async (formData) => {
    try {
      setLoading(true)
      const response = await authService.register(formData)
      localStorage.setItem('token', response.token)
      setUser(response.user)
      setError(null)
      return response
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    setError(null)
  }

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
