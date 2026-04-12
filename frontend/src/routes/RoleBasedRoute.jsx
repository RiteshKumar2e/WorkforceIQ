import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useRole } from '../hooks/useRole'
import Loader from '../components/common/Loader/Loader'

export const RoleBasedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, loading } = useAuth()
  const { hasAnyRole } = useRole()

  if (loading) {
    return <Loader />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (!hasAnyRole(allowedRoles)) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}

export default RoleBasedRoute
