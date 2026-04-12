import { verifyToken } from '../config/jwt.js'
import { errorResponse } from '../utils/responseHandler.js'
import User from '../models/User.js'

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return errorResponse(res, 'No token provided', 401)
    }

    const token = authHeader.substring(7)
    const decoded = verifyToken(token)
    
    const user = await User.findById(decoded.id)
    if (!user) {
      return errorResponse(res, 'User not found', 401)
    }

    req.user = user
    req.userId = user._id
    next()
  } catch (error) {
    console.error('Auth middleware error:', error)
    errorResponse(res, 'Invalid token', 401)
  }
}

export const roleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return errorResponse(res, 'Access denied', 403)
    }
    next()
  }
}
