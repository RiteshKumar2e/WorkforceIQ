import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { validateEmail, validatePassword } from '../../utils/validators'
import Input from '../../components/common/Input/Input'
import Button from '../../components/common/Button/Button'
import './Login.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const validateForm = () => {
    const newErrors = {}
    if (!email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!password) {
      newErrors.password = 'Password is required'
    } else if (!validatePassword(password)) {
      newErrors.password = 'Password must be at least 6 characters'
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
      await login(email, password)
      if (rememberMe) {
        localStorage.setItem('rememberEmail', email)
      } else {
        localStorage.removeItem('rememberEmail')
      }
      navigate('/dashboard')
    } catch (error) {
      setApiError(error.response?.data?.message || 'Invalid email or password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDemoLogin = async (demoEmail) => {
    setEmail(demoEmail)
    setPassword('password123')
    setApiError('')
    try {
      setLoading(true)
      await login(demoEmail, 'password123')
      navigate('/dashboard')
    } catch (error) {
      setApiError('Demo login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-layout">
      <div className="login-container">
        {/* Left Side - Branding */}
        <div className="login-branding">
          <div className="branding-content">
            <div className="branding-icon">📊</div>
            <h1>WorkforceIQ</h1>
            <p className="branding-subtitle">People Intelligence Platform</p>
            <div className="branding-features">
              <div className="feature">
                <span className="feature-icon">✓</span>
                <span>Employee Analytics</span>
              </div>
              <div className="feature">
                <span className="feature-icon">✓</span>
                <span>Team Management</span>
              </div>
              <div className="feature">
                <span className="feature-icon">✓</span>
                <span>Skill Assessment</span>
              </div>
              <div className="feature">
                <span className="feature-icon">✓</span>
                <span>Promotion Tracking</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="login-form-container">
          <div className="login-card">
            <div className="login-header-section">
              <h2>Sign In</h2>
              <p className="login-subtitle">Welcome back! Please login to your account</p>
            </div>

            {apiError && (
              <div className="alert alert-error">
                <span className="alert-icon">⚠️</span>
                <span>{apiError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (errors.email) setErrors({ ...errors, email: '' })
                  }}
                  error={errors.email}
                />
              </div>

              <div className="form-group">
                <div className="password-label-row">
                  <label htmlFor="password" className="form-label">Password</label>
                  <Link to="#forgot" className="forgot-link">Forgot password?</Link>
                </div>
                <div className="password-input-wrapper">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      if (errors.password) setErrors({ ...errors, password: '' })
                    }}
                    error={errors.password}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              <div className="form-checkbox">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="rememberMe">Remember me for 30 days</label>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                disabled={loading}
                className="login-button"
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            <div className="divider">
              <span>OR</span>
            </div>

            {/* Demo Credentials */}
            <div className="demo-section">
              <p className="demo-title">🎯 Try Demo Account</p>
              <div className="demo-buttons">
                <button
                  type="button"
                  className="demo-button"
                  onClick={() => handleDemoLogin('manager1@munger.com')}
                  disabled={loading}
                >
                  <span className="demo-label">Shift Manager</span>
                  <span className="demo-email">manager1@munger.com</span>
                </button>
                <button
                  type="button"
                  className="demo-button"
                  onClick={() => handleDemoLogin('hr@munger.com')}
                  disabled={loading}
                >
                  <span className="demo-label">HR Admin</span>
                  <span className="demo-email">hr@munger.com</span>
                </button>
                <button
                  type="button"
                  className="demo-button"
                  onClick={() => handleDemoLogin('manager2@munger.com')}
                  disabled={loading}
                >
                  <span className="demo-label">Line Manager</span>
                  <span className="demo-email">manager2@munger.com</span>
                </button>
              </div>
              <p className="demo-password">Password: <code>password123</code></p>
            </div>

            <div className="login-footer">
              <p>
                Don't have an account?
                <Link to="/register" className="signup-link">Create account</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
