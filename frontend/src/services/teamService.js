import api from './api'

export const analyzeTeam = async (employeeIds) => {
  const response = await api.post('/team/analyze', { employeeIds })
  return response.data
}

export const getTeamComposition = async (teamId) => {
  const response = await api.get(`/team/${teamId}/composition`)
  return response.data
}

export const generateTeamReport = async (employeeIds) => {
  const response = await api.post('/team/report', { employeeIds })
  return response.data
}
