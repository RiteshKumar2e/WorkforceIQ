import User from '../models/User.js'
import { successResponse, errorResponse } from '../utils/responseHandler.js'
import { generateToken } from '../config/jwt.js'

export const register = async (req, res, next) => {
  try {
    const { name, email, password, role, employeeId } = req.body
    
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return errorResponse(res, 'Email already registered', 400)
    }

    const user = new User({ name, email, password, role, employeeId })
    await user.save()

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

    const user = await User.findOne({ email }).select('+password')
    if (!user) {
      return errorResponse(res, 'Invalid credentials', 401)
    }

    const isPasswordValid = await user.comparePassword(password)
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
