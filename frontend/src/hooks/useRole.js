import { useAuth } from './useAuth'

export const useRole = () => {
  const { user } = useAuth()
  
  const hasRole = (role) => {
    if (!user) return false
    return user.role === role
  }

  const hasAnyRole = (roles) => {
    if (!user) return false
    return roles.includes(user.role)
  }

  const isShiftManager = () => hasRole('shift_manager')
  const isLineManager = () => hasRole('line_manager')
  const isHRAdmin = () => hasRole('hr_admin')

  return {
    role: user?.role,
    hasRole,
    hasAnyRole,
    isShiftManager,
    isLineManager,
    isHRAdmin,
  }
}
