import api from './api'

export const createAssessment = async (assessmentData) => {
  const response = await api.post('/assessments', assessmentData)
  return response.data
}

export const getAssessments = async (params = {}) => {
  const response = await api.get('/assessments', { params })
  return response.data
}

export const getAssessmentById = async (id) => {
  const response = await api.get(`/assessments/${id}`)
  return response.data
}

export const updateAssessment = async (id, assessmentData) => {
  const response = await api.put(`/assessments/${id}`, assessmentData)
  return response.data
}

export const submitAssessmentResults = async (assessmentId, results) => {
  const response = await api.post(`/assessments/${assessmentId}/results`, results)
  return response.data
}

export const getAssessmentResults = async (employeeId) => {
  const response = await api.get(`/employees/${employeeId}/assessment-results`)
  return response.data
}

export const uploadBulkAssessments = async (formData) => {
  const response = await api.post('/assessments/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

export const scheduleAssessment = async (scheduleData) => {
  const response = await api.post('/assessments/schedule', scheduleData)
  return response.data
}

export const getScheduledAssessments = async () => {
  const response = await api.get('/assessments/scheduled')
  return response.data
}
