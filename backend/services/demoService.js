import tempDB from '../config/tempDB.js'

export const getDemoUser = (email) => {
  return tempDB.db.users.find((u) => u.email === email.toLowerCase()) || null
}

export const getDemoUsers = () => {
  return tempDB.db.users || []
}

export const getDemoEmployees = (filter = {}) => {
  let employees = tempDB.db.employees || []
  
  if (filter.department) {
    employees = employees.filter((e) => e.department === filter.department)
  }
  if (filter.position) {
    employees = employees.filter((e) => e.position === filter.position)
  }
  
  return employees
}

export const getDemoEmployee = (id) => {
  return tempDB.db.employees.find((e) => e._id === id || e.employeeId === id) || null
}

export const getDemoAssessments = (filter = {}) => {
  let assessments = tempDB.db.assessments || []
  
  if (filter.employeeId) {
    assessments = assessments.filter((a) => a.employeeId === filter.employeeId)
  }
  
  return assessments
}

export const getDemoTrainingFlags = (filter = {}) => {
  let flags = tempDB.db.trainingFlags || []
  
  if (filter.employeeId) {
    flags = flags.filter((f) => f.employeeId === filter.employeeId)
  }
  if (filter.status) {
    flags = flags.filter((f) => f.status === filter.status)
  }
  
  return flags
}

export const getDemoDepartments = () => {
  return tempDB.db.departments || []
}

export const getDemoDashboardStats = () => {
  const employees = tempDB.db.employees || []
  
  return {
    totalEmployees: employees.length,
    averageEngagement: employees.length > 0
      ? (employees.reduce((sum, e) => sum + (e.engagementScore || 0), 0) / employees.length).toFixed(1)
      : 0,
    promotionReady: employees.filter((e) => e.promotionReadiness === 'ready_now').length,
    skillGaps: tempDB.db.trainingFlags.length,
    departments: tempDB.db.departments.length,
  }
}

export default {
  getDemoUser,
  getDemoUsers,
  getDemoEmployees,
  getDemoEmployee,
  getDemoAssessments,
  getDemoTrainingFlags,
  getDemoDepartments,
  getDemoDashboardStats,
}
