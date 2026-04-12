import api from './api'

export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password })
  return response.data
}

export const register = async (formData) => {
  const response = await api.post('/auth/register', formData)
  return response.data
}

export const getProfile = async (token) => {
  const response = await api.get('/auth/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export const updateProfile = async (userData) => {
  const response = await api.put('/auth/profile', userData)
  return response.data
}

export const changePassword = async ({ currentPassword, newPassword }) => {
  const response = await api.post('/auth/change-password', {
    currentPassword,
    newPassword,
  })
  return response.data
}
