import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { validateEmail, validatePassword } from '../../utils/validators'
import Input from '../../components/common/Input/Input'
import Button from '../../components/common/Button/Button'
import './Login.css'

const EyeIcon = ({ show }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {show ? (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
        <line x1="1" y1="1" x2="23" y2="23"></line>
      </>
    ) : (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </>
    )}
  </svg>
)

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
)

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
            <div className="branding-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
                <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
              </svg>
            </div>
            <h1>Workforce<span>IQ</span></h1>
            <p className="branding-subtitle">Advanced People Intelligence Platform</p>
            <div className="branding-features">
              <div className="feature">
                <span className="feature-icon"><CheckIcon /></span>
                <span>Employee Analytics</span>
              </div>
              <div className="feature">
                <span className="feature-icon"><CheckIcon /></span>
                <span>Team Management</span>
              </div>
              <div className="feature">
                <span className="feature-icon"><CheckIcon /></span>
                <span>Skill Assessment</span>
              </div>
              <div className="feature">
                <span className="feature-icon"><CheckIcon /></span>
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
              <p className="login-subtitle">Access your organization's workforce insights</p>
            </div>

            {apiError && (
              <div className="alert alert-error">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
                <span>{apiError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
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
                    placeholder="••••••••"
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
                    <EyeIcon show={showPassword} />
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
              <span>EXPLORE DEMO</span>
            </div>

            {/* Demo Credentials */}
            <div className="demo-section">
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
                New to WorkforceIQ?
                <Link to="/register" className="signup-link">Create an account</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
