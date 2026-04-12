import api from './api'

export const getDashboardData = async () => {
  const response = await api.get('/dashboard')
  return response.data
}

export const getDashboardStats = async () => {
  const response = await api.get('/dashboard/stats')
  return response.data
}

export const getDashboardCharts = async (timeRange = 'month') => {
  const response = await api.get('/dashboard/charts', {
    params: { timeRange },
  })
  return response.data
}
