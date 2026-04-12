import express from 'express'
import { successResponse, errorResponse } from '../utils/responseHandler.js'
import Employee from '../models/Employee.js'
import Assessment from '../models/Assessment.js'
import TrainingFlag from '../models/TrainingFlag.js'

export const generateEmployeeReports = async (req, res, next) => {
  try {
    const { reportType, dateRange } = req.query

    const employees = await Employee.find({ status: 'active' }).populate('assessments')

    let report = {}

    if (reportType === 'competency') {
      report = {
        title: 'Competency Report',
        generatedAt: new Date(),
        data: employees.map(e => ({
          name: e.name,
          employeeId: e.employeeId,
          department: e.department,
          technicalCompetency: e.technicalCompetency,
          leadershipScore: e.leadershipScore,
          communicationScore: e.communicationScore,
          averageCompetency: Math.round(
            (e.technicalCompetency + e.leadershipScore + e.communicationScore) / 3
          ),
        })),
      }
    } else if (reportType === 'engagement') {
      report = {
        title: 'Engagement Report',
        generatedAt: new Date(),
        data: employees.map(e => ({
          name: e.name,
          employeeId: e.employeeId,
          engagementScore: e.engagementScore,
          status: e.engagementScore > 70 ? 'High' : e.engagementScore > 50 ? 'Medium' : 'Low',
        })),
      }
    } else if (reportType === 'promotion') {
      report = {
        title: 'Promotion Readiness Report',
        generatedAt: new Date(),
        data: {
          readyNow: employees.filter(e => e.promotionReadiness === 'ready_now'),
          ready3to6: employees.filter(e => e.promotionReadiness === 'ready_3_6_months'),
          needsDevelopment: employees.filter(e => e.promotionReadiness === 'needs_development'),
        },
      }
    } else if (reportType === 'training') {
      const trainingFlags = await TrainingFlag.find({ status: 'pending' }).populate(
        'employeeId',
        'name employeeId department'
      )

      report = {
        title: 'Training Requirements Report',
        generatedAt: new Date(),
        data: trainingFlags.map(flag => ({
          employeeName: flag.employeeId.name,
          employeeId: flag.employeeId.employeeId,
          skillGap: flag.skillGap,
          urgency: flag.urgency,
          trainingType: flag.trainingType,
        })),
      }
    }

    successResponse(res, report, 'Report generated successfully')
  } catch (error) {
    next(error)
  }
}

export const getDepartmentReports = async (req, res, next) => {
  try {
    const { department } = req.query

    const employees = await Employee.find({ department })

    const report = {
      department,
      totalEmployees: employees.length,
      averageTechnicalCompetency: Math.round(
        employees.reduce((sum, e) => sum + (e.technicalCompetency || 0), 0) / employees.length
      ),
      averageEngagement: Math.round(
        employees.reduce((sum, e) => sum + (e.engagementScore || 0), 0) / employees.length
      ),
      promotionReady: employees.filter(e => e.promotionReadiness === 'ready_now').length,
      needsTraining: await TrainingFlag.countDocuments({
        employeeId: { $in: employees.map(e => e._id) },
      }),
    }

    successResponse(res, report, 'Department report retrieved')
  } catch (error) {
    next(error)
  }
}

export const getCustomReport = async (req, res, next) => {
  try {
    const { filters } = req.body

    let query = {}
    if (filters.department) query.department = filters.department
    if (filters.status) query.status = filters.status
    if (filters.promotionReadiness) query.promotionReadiness = filters.promotionReadiness

    const employees = await Employee.find(query)

    const report = {
      filters,
      totalRecords: employees.length,
      data: employees,
      generatedAt: new Date(),
    }

    successResponse(res, report, 'Custom report generated')
  } catch (error) {
    next(error)
  }
}
