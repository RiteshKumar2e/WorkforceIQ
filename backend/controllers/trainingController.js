import TrainingFlag from '../models/TrainingFlag.js'
import Employee from '../models/Employee.js'
import { successResponse, errorResponse } from '../utils/responseHandler.js'

export const getTrainingFlags = async (req, res, next) => {
  try {
    const { urgency, status } = req.query
    const filter = {}
    if (urgency) filter.urgency = urgency
    if (status) filter.status = status

    const flags = await TrainingFlag.find(filter)
      .populate('employeeId', 'name email department')
      .populate('assignedBy', 'name')
      .sort({ createdAt: -1 })
    
    successResponse(res, flags, 'Training flags retrieved')
  } catch (error) {
    next(error)
  }
}

export const getTrainingAlertsByEmployee = async (req, res, next) => {
  try {
    const flags = await TrainingFlag.find({ employeeId: req.params.employeeId })
      .sort({ urgency: -1 })
    
    successResponse(res, flags, 'Training alerts retrieved')
  } catch (error) {
    next(error)
  }
}

export const updateTrainingAlert = async (req, res, next) => {
  try {
    const flag = await TrainingFlag.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    
    if (!flag) {
      return errorResponse(res, 'Training flag not found', 404)
    }
    
    successResponse(res, flag, 'Training alert updated')
  } catch (error) {
    next(error)
  }
}

export const createTrainingPlan = async (req, res, next) => {
  try {
    const { employeeId, skillGap, urgency, trainingType, courseUrl } = req.body
    
    const flag = new TrainingFlag({
      employeeId,
      skillGap,
      urgency,
      trainingType,
      status: 'pending',
      assignedBy: req.userId,
    })
    
    await flag.save()
    successResponse(res, flag, 'Training plan created', 201)
  } catch (error) {
    next(error)
  }
}

export const getTrainingPlans = async (req, res, next) => {
  try {
    const plans = await TrainingFlag.find({ status: { $in: ['pending', 'in_progress'] } })
      .populate('employeeId', 'name email')
      .sort({ urgency: -1 })
    
    successResponse(res, plans, 'Training plans retrieved')
  } catch (error) {
    next(error)
  }
}
