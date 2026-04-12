import Assessment from '../models/Assessment.js'
import Employee from '../models/Employee.js'
import { successResponse, errorResponse } from '../utils/responseHandler.js'

export const createAssessment = async (req, res, next) => {
  try {
    const assessment = new Assessment(req.body)
    await assessment.save()
    successResponse(res, assessment, 'Assessment created', 201)
  } catch (error) {
    next(error)
  }
}

export const getAssessments = async (req, res, next) => {
  try {
    const { status, type } = req.query
    const filter = {}
    if (status) filter.status = status
    if (type) filter.assessmentType = type

    const assessments = await Assessment.find(filter)
      .populate('employeeId', 'name email')
      .populate('assessor', 'name email')
    
    successResponse(res, assessments, 'Assessments retrieved')
  } catch (error) {
    next(error)
  }
}

export const getAssessmentById = async (req, res, next) => {
  try {
    const assessment = await Assessment.findById(req.params.id)
      .populate('employeeId')
      .populate('assessor')
    
    if (!assessment) {
      return errorResponse(res, 'Assessment not found', 404)
    }
    
    successResponse(res, assessment, 'Assessment retrieved')
  } catch (error) {
    next(error)
  }
}

export const submitAssessmentResults = async (req, res, next) => {
  try {
    const { score, grade, feedback } = req.body
    
    const assessment = await Assessment.findByIdAndUpdate(
      req.params.assessmentId,
      {
        results: { score, grade, feedback },
        status: 'completed',
        completionDate: new Date(),
      },
      { new: true }
    )

    if (!assessment) {
      return errorResponse(res, 'Assessment not found', 404)
    }

    // Update employee competency based on assessment
    const employee = await Employee.findById(assessment.employeeId)
    if (employee && assessment.assessmentType === 'technical') {
      employee.technicalCompetency = score
      await employee.save()
    }

    successResponse(res, assessment, 'Assessment results submitted')
  } catch (error) {
    next(error)
  }
}

export const scheduleAssessment = async (req, res, next) => {
  try {
    const { employeeId, assessmentType, scheduledDate } = req.body
    
    const assessment = new Assessment({
      employeeId,
      assessmentType,
      scheduledDate,
      status: 'pending',
      assessor: req.userId,
    })
    
    await assessment.save()
    successResponse(res, assessment, 'Assessment scheduled', 201)
  } catch (error) {
    next(error)
  }
}

export const getScheduledAssessments = async (req, res, next) => {
  try {
    const assessments = await Assessment.find({ status: 'pending' })
      .populate('employeeId', 'name email department')
      .sort({ scheduledDate: 1 })
    
    successResponse(res, assessments, 'Scheduled assessments retrieved')
  } catch (error) {
    next(error)
  }
}
