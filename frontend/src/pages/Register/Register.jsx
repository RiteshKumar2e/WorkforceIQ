import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { validateEmail, validatePassword } from '../../utils/validators'
import { ROLES } from '../../utils/constants'
import Input from '../../components/common/Input/Input'
import Button from '../../components/common/Button/Button'
import './Register.css'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ROLES.SHIFT_MANAGER,
    employeeId: ''
  })
  const [errors, setErrors] = useState({})
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [tosAgree, setTosAgree] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const calculatePasswordStrength = (pwd) => {
    if (!pwd) return 0
    let strength = 0
    if (pwd.length >= 6) strength++
    if (pwd.length >= 8) strength++
    if (pwd.length >= 12) strength++
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++
    if (/\d/.test(pwd)) strength++
    if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>?/]/.test(pwd)) strength++
    return Math.min(Math.ceil((strength / 6) * 4), 4)
  }

  const handlePasswordChange = (e) => {
    const pwd = e.target.value
    setFormData({ ...formData, password: pwd })
    setPasswordStrength(calculatePasswordStrength(pwd))
    if (errors.password) setErrors({ ...errors, password: '' })
  }

  const getPasswordStrengthLabel = () => {
    const labels = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong']
    return labels[Math.max(0, passwordStrength - 1)] || 'Weak'
  }

  const getPasswordStrengthColor = () => {
    const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#16a34a']
    return colors[Math.max(0, passwordStrength - 1)] || '#ef4444'
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (passwordStrength < 2) {
      newErrors.password = 'Password is too weak. Use uppercase, lowercase, and numbers'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (!tosAgree) {
      newErrors.tos = 'You must agree to the terms and conditions'
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
        employeeId: formData.employeeId || undefined
      })
      navigate('/dashboard')
    } catch (error) {
      setApiError(error.response?.data?.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const roleOptions = [
    { value: ROLES.SHIFT_MANAGER, label: 'Shift Manager', icon: '👷' },
    { value: ROLES.LINE_MANAGER, label: 'Line Manager', icon: '👔' },
    { value: ROLES.HR_ADMIN, label: 'HR Admin', icon: '👨‍💼' }
  ]

  return (
    <div className="register-layout">
      <div className="register-container">
        {/* Left Side - Features */}
        <div className="register-features">
          <div className="features-content">
            <div className="features-icon">✨</div>
            <h1>Join WorkforceIQ</h1>
            <p className="features-subtitle">Create your account in seconds</p>
            <div className="benefits-list">
              <div className="benefit-item">
                <span className="benefit-check">✓</span>
                <div>
                  <div className="benefit-title">Real-time Analytics</div>
                  <div className="benefit-desc">Get insights as they happen</div>
                </div>
              </div>
              <div className="benefit-item">
                <span className="benefit-check">✓</span>
                <div>
                  <div className="benefit-title">Team Management</div>
                  <div className="benefit-desc">Manage teams efficiently</div>
                </div>
              </div>
              <div className="benefit-item">
                <span className="benefit-check">✓</span>
                <div>
                  <div className="benefit-title">Skill Tracking</div>
                  <div className="benefit-desc">Monitor employee development</div>
                </div>
              </div>
              <div className="benefit-item">
                <span className="benefit-check">✓</span>
                <div>
                  <div className="benefit-title">Data Security</div>
                  <div className="benefit-desc">Enterprise-grade protection</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Register Form */}
        <div className="register-form-container">
          <div className="register-card">
            <div className="register-header-section">
              <h2>Create Account</h2>
              <p className="register-subtitle">Sign up to get started</p>
            </div>

            {apiError && (
              <div className="alert alert-error">
                <span className="alert-icon">⚠️</span>
                <span>{apiError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="register-form">
              {/* Full Name */}
              <div className="form-group">
                <label htmlFor="name" className="form-label">Full Name</label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleInputChange}
                  error={errors.name}
                />
              </div>

              {/* Email */}
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={errors.email}
                />
              </div>

              {/* Employee ID */}
              <div className="form-group">
                <label htmlFor="employeeId" className="form-label">Employee ID <span className="optional">(Optional)</span></label>
                <Input
                  id="employeeId"
                  type="text"
                  name="employeeId"
                  placeholder="EMP-12345"
                  value={formData.employeeId}
                  onChange={handleInputChange}
                />
              </div>

              {/* Role Selection */}
              <div className="form-group">
                <label htmlFor="role" className="form-label">Your Role</label>
                <div className="role-selection">
                  {roleOptions.map((option) => (
                    <label key={option.value} className={`role-option ${formData.role === option.value ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="role"
                        value={option.value}
                        checked={formData.role === option.value}
                        onChange={handleInputChange}
                      />
                      <span className="role-icon">{option.icon}</span>
                      <span className="role-label">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Password */}
              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <div className="password-input-wrapper">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handlePasswordChange}
                    error={errors.password}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? '👁️' : '🙈'}
                  </button>
                </div>
                {formData.password && (
                  <div className="password-strength">
                    <div className="strength-bar">
                      <div
                        className="strength-fill"
                        style={{
                          width: `${(passwordStrength / 4) * 100}%`,
                          backgroundColor: getPasswordStrengthColor()
                        }}
                      />
                    </div>
                    <span className="strength-text" style={{ color: getPasswordStrengthColor() }}>
                      {getPasswordStrengthLabel()} password
                    </span>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <div className="password-input-wrapper">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Re-enter your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    error={errors.confirmPassword}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label="Toggle confirm password visibility"
                  >
                    {showConfirmPassword ? '👁️' : '🙈'}
                  </button>
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className="form-checkbox">
                <input
                  type="checkbox"
                  id="tos"
                  checked={tosAgree}
                  onChange={(e) => {
                    setTosAgree(e.target.checked)
                    if (errors.tos) setErrors({ ...errors, tos: '' })
                  }}
                />
                <label htmlFor="tos">
                  I agree to the <a href="#tos">Terms of Service</a> and <a href="#privacy">Privacy Policy</a>
                </label>
              </div>
              {errors.tos && <span className="error-text">{errors.tos}</span>}

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                disabled={loading}
                className="register-button"
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Creating account...
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>
            </form>

            {/* Login Link */}
            <div className="register-footer">
              <p>
                Already have an account?
                <Link to="/login" className="login-link">Sign in</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
