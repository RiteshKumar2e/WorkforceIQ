import React from 'react'
import { AuthProvider } from './context/AuthContext'
import { AppProvider } from './context/AppContext'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <AppProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </AppProvider>
  )
}

export default App
