import React, { createContext, useState, useCallback } from 'react'

export const AppContext = createContext(null)

export const AppProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [notifications, setNotifications] = useState([])

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev)
  }, [])

  const addNotification = useCallback((notification) => {
    const id = Math.random().toString(36).substr(2, 9)
    const notif = { id, ...notification }
    setNotifications(prev => [...prev, notif])
    
    if (notification.duration !== Infinity) {
      setTimeout(() => {
        removeNotification(id)
      }, notification.duration || 3000)
    }
    
    return id
  }, [])

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }, [])

  const value = {
    sidebarOpen,
    toggleSidebar,
    notifications,
    addNotification,
    removeNotification,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
