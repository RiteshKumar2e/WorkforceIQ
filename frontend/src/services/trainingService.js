import api from './api'

export const getTrainingFlags = async (params = {}) => {
  const response = await api.get('/training/flags', { params })
  return response.data
}

export const getTrainingAlert = async (id) => {
  const response = await api.get(`/training/flags/${id}`)
  return response.data
}

export const getTrainingAlertsByEmployee = async (employeeId) => {
  const response = await api.get(`/employees/${employeeId}/training-alerts`)
  return response.data
}

export const updateTrainingAlert = async (id, data) => {
  const response = await api.put(`/training/flags/${id}`, data)
  return response.data
}

export const createTrainingPlan = async (trainingData) => {
  const response = await api.post('/training/plans', trainingData)
  return response.data
}

export const getTrainingPlans = async () => {
  const response = await api.get('/training/plans')
  return response.data
}
