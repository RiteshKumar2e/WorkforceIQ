import Employee from '../models/Employee.js'
import { successResponse } from '../utils/responseHandler.js'

export const analyzeTeam = async (req, res, next) => {
  try {
    const { employeeIds } = req.body
    
    const employees = await Employee.find({ _id: { $in: employeeIds } })
    
    // Team analysis logic
    const analysis = {
      totalMembers: employees.length,
      avgTechnicalCompetency: employees.reduce((sum, e) => sum + (e.technicalCompetency || 0), 0) / employees.length,
      avgEngagement: employees.reduce((sum, e) => sum + (e.engagementScore || 0), 0) / employees.length,
      promotionReady: employees.filter(e => e.promotionReadiness === 'ready_now').length,
      skillGaps: employees.filter(e => e.trainingFlags && e.trainingFlags.length > 0).length,
    }
    
    successResponse(res, analysis, 'Team analysis completed')
  } catch (error) {
    next(error)
  }
}

export const generateTeamReport = async (req, res, next) => {
  try {
    const { employeeIds } = req.body
    
    const employees = await Employee.find({ _id: { $in: employeeIds } })
    
    const report = {
      teamSize: employees.length,
      teamComposition: employees.map(e => ({
        name: e.name,
        designation: e.designation,
        technicalCompetency: e.technicalCompetency,
        engagementScore: e.engagementScore,
        promotionReadiness: e.promotionReadiness,
      })),
      balanceAnalysis: {
        hasLeadershipDepth: employees.filter(e => e.leadershipScore > 70).length >= 2,
        hasSkillDiversity: true,
        hasPotentialSuccessors: employees.filter(e => e.promotionReadiness !== 'needs_development').length >= 2,
      },
    }
    
    successResponse(res, report, 'Team report generated')
  } catch (error) {
    next(error)
  }
}
