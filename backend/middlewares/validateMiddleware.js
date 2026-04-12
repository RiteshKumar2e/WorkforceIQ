import { body, validationResult } from 'express-validator'
import { errorResponse } from '../utils/responseHandler.js'

export const validateRegister = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').isIn(['shift_manager', 'line_manager', 'hr_admin']).withMessage('Invalid role'),
]

export const validateLogin = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
]

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return errorResponse(res, 'Validation error', 400, errors.array())
  }
  next()
}
