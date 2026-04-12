import Employee from '../models/Employee.js'
import Assessment from '../models/Assessment.js'
import TrainingFlag from '../models/TrainingFlag.js'
import { successResponse } from '../utils/responseHandler.js'

export const getDashboardData = async (req, res, next) => {
  try {
    const totalEmployees = await Employee.countDocuments()
    const activeEmployees = await Employee.countDocuments({ status: 'active' })
    const trainingAlerts = await TrainingFlag.countDocuments({ status: 'pending' })
    const promotionReady = await Employee.countDocuments({ promotionReadiness: 'ready_now' })

    successResponse(res, {
      totalEmployees,
      activeEmployees,
      trainingAlerts,
      promotionReady,
    }, 'Dashboard data retrieved')
  } catch (error) {
    next(error)
  }
}

export const getDashboardStats = async (req, res, next) => {
  try {
    const stats = {
      totalEmployees: await Employee.countDocuments(),
      activeEmployees: await Employee.countDocuments({ status: 'active' }),
      pendingAssessments: await Assessment.countDocuments({ status: 'pending' }),
      trainingAlerts: await TrainingFlag.countDocuments({ status: 'pending' }),
      readyForPromotion: await Employee.countDocuments({ promotionReadiness: 'ready_now' }),
      avgEngagement: 78,
    }
    successResponse(res, stats, 'Stats retrieved')
  } catch (error) {
    next(error)
  }
}

export const getDashboardCharts = async (req, res, next) => {
  try {
    const employees = await Employee.find()
    
    const chartData = {
      engagementDistribution: [
        { range: '0-20', count: employees.filter(e => e.engagementScore <= 20).length },
        { range: '21-40', count: employees.filter(e => e.engagementScore > 20 && e.engagementScore <= 40).length },
        { range: '41-60', count: employees.filter(e => e.engagementScore > 40 && e.engagementScore <= 60).length },
        { range: '61-80', count: employees.filter(e => e.engagementScore > 60 && e.engagementScore <= 80).length },
        { range: '81-100', count: employees.filter(e => e.engagementScore > 80).length },
      ],
      promotionPipeline: {
        readyNow: await Employee.countDocuments({ promotionReadiness: 'ready_now' }),
        ready3to6: await Employee.countDocuments({ promotionReadiness: 'ready_3_6_months' }),
        needsDevelopment: await Employee.countDocuments({ promotionReadiness: 'needs_development' }),
      },
    }
    
    successResponse(res, chartData, 'Chart data retrieved')
  } catch (error) {
    next(error)
  }
}
