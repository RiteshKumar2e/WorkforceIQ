import Employee from '../models/Employee.js'
import Assessment from '../models/Assessment.js'
import TrainingFlag from '../models/TrainingFlag.js'
import { successResponse } from '../utils/responseHandler.js'
import * as demoService from '../services/demoService.js'

const isDemoMode = () => process.env.USE_DEMO_MODE === 'true'

export const getDashboardData = async (req, res, next) => {
  try {
    let data

    if (isDemoMode()) {
      const stats = demoService.getDemoDashboardStats()
      data = {
        totalEmployees: stats.totalEmployees,
        activeEmployees: stats.totalEmployees,
        trainingAlerts: stats.skillGaps,
        promotionReady: stats.promotionReady,
      }
    } else {
      const totalEmployees = await Employee.countDocuments()
      const activeEmployees = await Employee.countDocuments({ status: 'active' })
      const trainingAlerts = await TrainingFlag.countDocuments({ status: 'pending' })
      const promotionReady = await Employee.countDocuments({ promotionReadiness: 'ready_now' })

      data = {
        totalEmployees,
        activeEmployees,
        trainingAlerts,
        promotionReady,
      }
    }

    successResponse(res, data, 'Dashboard data retrieved')
  } catch (error) {
    next(error)
  }
}

export const getDashboardStats = async (req, res, next) => {
  try {
    let stats

    if (isDemoMode()) {
      const demoStats = demoService.getDemoDashboardStats()
      stats = {
        totalEmployees: demoStats.totalEmployees,
        activeEmployees: demoStats.totalEmployees,
        pendingAssessments: 2,
        trainingAlerts: demoStats.skillGaps,
        readyForPromotion: demoStats.promotionReady,
        avgEngagement: parseFloat(demoStats.averageEngagement),
      }
    } else {
      stats = {
        totalEmployees: await Employee.countDocuments(),
        activeEmployees: await Employee.countDocuments({ status: 'active' }),
        pendingAssessments: await Assessment.countDocuments({ status: 'pending' }),
        trainingAlerts: await TrainingFlag.countDocuments({ status: 'pending' }),
        readyForPromotion: await Employee.countDocuments({ promotionReadiness: 'ready_now' }),
        avgEngagement: 78,
      }
    }

    successResponse(res, stats, 'Stats retrieved')
  } catch (error) {
    next(error)
  }
}

export const getDashboardCharts = async (req, res, next) => {
  try {
    let chartData

    if (isDemoMode()) {
      const employees = demoService.getDemoEmployees()
      chartData = {
        engagementDistribution: [
          { range: '0-20', count: employees.filter(e => e.engagementScore <= 20).length },
          { range: '21-40', count: employees.filter(e => e.engagementScore > 20 && e.engagementScore <= 40).length },
          { range: '41-60', count: employees.filter(e => e.engagementScore > 40 && e.engagementScore <= 60).length },
          { range: '61-80', count: employees.filter(e => e.engagementScore > 60 && e.engagementScore <= 80).length },
          { range: '81-100', count: employees.filter(e => e.engagementScore > 80).length },
        ],
        promotionPipeline: {
          readyNow: employees.filter(e => e.promotionReadiness > 80).length,
          ready3to6: employees.filter(e => e.promotionReadiness > 60 && e.promotionReadiness <= 80).length,
          needsDevelopment: employees.filter(e => e.promotionReadiness <= 60).length,
        },
      }
    } else {
      const employees = await Employee.find()

      chartData = {
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
    }

    successResponse(res, chartData, 'Chart data retrieved')
  } catch (error) {
    next(error)
  }
}
