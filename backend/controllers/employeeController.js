import Employee from '../models/Employee.js'
import { successResponse, errorResponse } from '../utils/responseHandler.js'
import * as demoService from '../services/demoService.js'

const isDemoMode = () => process.env.USE_DEMO_MODE === 'true'

export const getEmployees = async (req, res, next) => {
  try {
    const { department, status } = req.query
    let employees

    if (isDemoMode()) {
      const filter = {}
      if (department) filter.department = department
      employees = demoService.getDemoEmployees(filter)
    } else {
      const filter = {}
      if (department) filter.department = department
      if (status) filter.status = status

      employees = await Employee.find(filter).populate('reportingManager', 'name email')
    }

    successResponse(res, employees, 'Employees retrieved')
  } catch (error) {
    next(error)
  }
}

export const getEmployeeById = async (req, res, next) => {
  try {
    let employee

    if (isDemoMode()) {
      employee = demoService.getDemoEmployee(req.params.id)
      if (!employee) {
        return errorResponse(res, 'Employee not found', 404)
      }
    } else {
      employee = await Employee.findById(req.params.id)
        .populate('reportingManager', 'name email')
        .populate('assessments')

      if (!employee) {
        return errorResponse(res, 'Employee not found', 404)
      }
    }

    successResponse(res, employee, 'Employee retrieved')
  } catch (error) {
    next(error)
  }
}

export const createEmployee = async (req, res, next) => {
  try {
    if (isDemoMode()) {
      return errorResponse(res, 'Cannot create employee in demo mode', 400)
    }

    const employee = new Employee(req.body)
    await employee.save()
    successResponse(res, employee, 'Employee created', 201)
  } catch (error) {
    next(error)
  }
}

export const updateEmployee = async (req, res, next) => {
  try {
    if (isDemoMode()) {
      return errorResponse(res, 'Cannot update employee in demo mode', 400)
    }

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
    if (isDemoMode()) {
      return errorResponse(res, 'Cannot delete employee in demo mode', 400)
    }

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
    let employees

    if (isDemoMode()) {
      const allEmployees = demoService.getDemoEmployees()
      employees = allEmployees.filter(e =>
        e.name.toLowerCase().includes(q.toLowerCase()) ||
        e.email.toLowerCase().includes(q.toLowerCase()) ||
        e.employeeId.toLowerCase().includes(q.toLowerCase()) ||
        e.department.toLowerCase().includes(q.toLowerCase())
      )
    } else {
      employees = await Employee.find({
        $or: [
          { name: { $regex: q, $options: 'i' } },
          { email: { $regex: q, $options: 'i' } },
          { employeeId: { $regex: q, $options: 'i' } },
          { department: { $regex: q, $options: 'i' } },
        ],
      })
    }

    successResponse(res, employees, 'Search results')
  } catch (error) {
    next(error)
  }
}
