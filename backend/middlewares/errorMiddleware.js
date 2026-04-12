import { errorResponse } from '../utils/responseHandler.js'

export const errorMiddleware = (err, req, res, next) => {
  console.error(err)
  
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message)
    return errorResponse(res, 'Validation error', 400, errors)
  }
  
  if (err.name === 'CastError') {
    return errorResponse(res, 'Invalid ID format', 400)
  }
  
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0]
    return errorResponse(res, `${field} already exists`, 400)
  }
  
  errorResponse(res, err.message || 'Server error', err.statusCode || 500)
}
