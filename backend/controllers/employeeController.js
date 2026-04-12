import Employee from '../models/Employee.js'
import { successResponse, errorResponse } from '../utils/responseHandler.js'

export const getEmployees = async (req, res, next) => {
  try {
    const { department, status } = req.query
    const filter = {}
    if (department) filter.department = department
    if (status) filter.status = status

    const employees = await Employee.find(filter).populate('reportingManager', 'name email')
    successResponse(res, employees, 'Employees retrieved')
  } catch (error) {
    next(error)
  }
}

export const getEmployeeById = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id)
      .populate('reportingManager', 'name email')
      .populate('assessments')
    
    if (!employee) {
      return errorResponse(res, 'Employee not found', 404)
    }
    
    successResponse(res, employee, 'Employee retrieved')
  } catch (error) {
    next(error)
  }
}

export const createEmployee = async (req, res, next) => {
  try {
    const employee = new Employee(req.body)
    await employee.save()
    successResponse(res, employee, 'Employee created', 201)
  } catch (error) {
    next(error)
  }
}

export const updateEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!employee) {
      return errorResponse(res, 'Employee not found', 404)
    }
    successResponse(res, employee, 'Employee updated')
  } catch (error) {
    next(error)
  }
}

export const deleteEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id)
    if (!employee) {
      return errorResponse(res, 'Employee not found', 404)
    }
    successResponse(res, {}, 'Employee deleted')
  } catch (error) {
    next(error)
  }
}

export const searchEmployees = async (req, res, next) => {
  try {
    const { q } = req.query
    const employees = await Employee.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } },
        { employeeId: { $regex: q, $options: 'i' } },
        { department: { $regex: q, $options: 'i' } },
      ],
    })
    successResponse(res, employees, 'Search results')
  } catch (error) {
    next(error)
  }
}
