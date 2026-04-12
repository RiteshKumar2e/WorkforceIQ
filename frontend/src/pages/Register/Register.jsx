import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { validateEmail, validatePassword, validatePasswordStrength, validateRequired } from '../../utils/validators'
import Input from '../../components/common/Input/Input'
import Button from '../../components/common/Button/Button'
import { ROLES } from '../../utils/constants'
import './Register.css'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ROLES.SHIFT_MANAGER,
    employeeId: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')
  const [passwordStrength, setPasswordStrength] = useState(0)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    if (name === 'password') {
      const strength = validatePasswordStrength(value)
      setPasswordStrength(strength)
    }

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!validateRequired(formData.name)) {
      newErrors.name = 'Full name is required'
    }
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Valid email is required'
    }
    if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    if (!validateRequired(formData.role)) {
      newErrors.role = 'Role is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setApiError('')

    if (!validateForm()) {
      return
    }

    try {
      setLoading(true)
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        employeeId: formData.employeeId,
      })
      navigate('/dashboard')
    } catch (error) {
      setApiError(error.response?.data?.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getPasswordStrengthColor = (strength) => {
    if (strength <= 1) return '#ef4444'
    if (strength === 2) return '#f59e0b'
    if (strength >= 3) return '#22c55e'
  }

  return (
    <div className="register-layout">
      <div className="register-header">
        <h1>WorkforceIQ</h1>
        <p>Create Your Account</p>
      </div>

      <div className="register-container">
        <div className="register-card">
          <h2>Get Started</h2>
          <p className="register-subtitle">Join WorkforceIQ today</p>

          {apiError && (
            <div className="alert alert-error">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="register-form">
            <Input
              label="Full Name"
              placeholder="John Doe"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              required
            />

            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
            />

            <div className="form-group">
              <label className="required">Password</label>
              <input
                type="password"
                className={`input ${errors.password ? 'input-error' : ''}`}
                placeholder="Enter your password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {formData.password && (
                <div className="password-strength">
                  <div className="strength-bars">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="strength-bar"
                        style={{
                          backgroundColor: i < passwordStrength ? getPasswordStrengthColor(passwordStrength) : '#e2e8f0',
                        }}
                      />
                    ))}
                  </div>
                  <span className="strength-label" style={{ color: getPasswordStrengthColor(passwordStrength) }}>
                    {passwordStrength === 0 && 'Very Weak'}
                    {passwordStrength === 1 && 'Weak'}
                    {passwordStrength === 2 && 'Fair'}
                    {passwordStrength === 3 && 'Good'}
                    {passwordStrength === 4 && 'Strong'}
                  </span>
                </div>
              )}
              {errors.password && <span className="form-error">{errors.password}</span>}
            </div>

            <Input
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              required
            />

            <div className="form-group">
              <label className="required">Role</label>
              <select
                name="role"
                className={`input ${errors.role ? 'input-error' : ''}`}
                value={formData.role}
                onChange={handleChange}
              >
                <option value={ROLES.SHIFT_MANAGER}>Shift Manager</option>
                <option value={ROLES.LINE_MANAGER}>Line Manager</option>
                <option value={ROLES.HR_ADMIN}>HR Administrator</option>
              </select>
              {errors.role && <span className="form-error">{errors.role}</span>}
            </div>

            <Input
              label="Employee ID (Optional)"
              placeholder="EMP123456"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <div className="register-footer">
            <p>
              Already have an account?{' '}
              <Link to="/login">Sign in</Link>
            </p>
            <p className="terms">
              By signing up, you agree to our{' '}
              <a href="#terms">Terms of Service</a> and{' '}
              <a href="#privacy">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
