import User from '../models/User.js'
import { successResponse, errorResponse } from '../utils/responseHandler.js'
import { generateToken } from '../config/jwt.js'
import * as demoService from '../services/demoService.js'

const isDemoMode = () => process.env.USE_DEMO_MODE === 'true'

const DEMO_CREDENTIALS = {
  'manager1@munger.com': 'password123',
  'manager2@munger.com': 'password123',
  'hr@munger.com': 'password123',
}

export const register = async (req, res, next) => {
  try {
    if (isDemoMode()) {
      return errorResponse(res, 'Cannot register in demo mode', 400)
    }

    const { name, email, password, role, employeeId } = req.body
    
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return errorResponse(res, 'Email already registered', 400)
    }

    const user = await User.create({ name, email, password, role, employeeId })

    const token = generateToken(user._id, user.role)
    
    successResponse(res, {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    }, 'Registration successful', 201)
  } catch (error) {
    next(error)
  }
}

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return errorResponse(res, 'Email and password are required', 400)
    }

    if (isDemoMode()) {
      // Demo mode login
      if (DEMO_CREDENTIALS[email] && DEMO_CREDENTIALS[email] === password) {
        const demoUser = demoService.getDemoUser(email)
        if (demoUser) {
          const token = generateToken(demoUser._id, demoUser.role)
          return successResponse(res, {
            token,
            user: {
              id: demoUser._id,
              email: demoUser.email,
              role: demoUser.role,
            },
          })
        }
      }
      return errorResponse(res, 'Invalid credentials', 401)
    }

    const user = await User.findByEmail(email)
    if (!user) {
      return errorResponse(res, 'Invalid credentials', 401)
    }

    const isPasswordValid = await User.comparePassword(password, user.password)
    if (!isPasswordValid) {
      return errorResponse(res, 'Invalid credentials', 401)
    }

    const token = generateToken(user._id, user.role)
    
    successResponse(res, {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    }, 'Login successful')
  } catch (error) {
    next(error)
  }
}

export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId)
    if (!user) {
      return errorResponse(res, 'User not found', 404)
    }
    successResponse(res, user, 'Profile retrieved')
  } catch (error) {
    next(error)
  }
}

export const updateProfile = async (req, res, next) => {
  try {
    const { name, department } = req.body
    const user = await User.findByIdAndUpdate(
      req.userId,
      { name, department },
      { new: true, runValidators: true }
    )
    successResponse(res, user, 'Profile updated')
  } catch (error) {
    next(error)
  }
}

export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body
    const user = await User.findById(req.userId).select('+password')
    
    const isValid = await user.comparePassword(currentPassword)
    if (!isValid) {
      return errorResponse(res, 'Current password is incorrect', 401)
    }

    user.password = newPassword
    await user.save()
    
    successResponse(res, {}, 'Password changed successfully')
  } catch (error) {
    next(error)
  }
}
