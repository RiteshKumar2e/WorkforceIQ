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
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const validateForm = () => {
    const newErrors = {}
    if (!validateEmail(email)) {
      newErrors.email = 'Valid email is required'
    }
    if (!validatePassword(password)) {
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
      navigate('/dashboard')
    } catch (error) {
      setApiError(error.response?.data?.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-layout">
      <div className="login-header">
        <h1>WorkforceIQ</h1>
        <p>People Intelligence Platform</p>
      </div>

      <div className="login-container">
        <div className="login-card">
          <h2>Welcome Back</h2>
          <p className="login-subtitle">Sign in to your account</p>

          {apiError && (
            <div className="alert alert-error">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (errors.email) setErrors({...errors, email: ''})
              }}
              error={errors.email}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                if (errors.password) setErrors({...errors, password: ''})
              }}
              error={errors.password}
              required
            />

            <div className="login-remember">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <a href="#forgot">Forgot password?</a>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="login-divide">or</div>

          <div className="login-footer">
            <p>
              Don't have an account?{' '}
              <Link to="/register">Create one</Link>
            </p>
          </div>

          {/* Demo Credentials */}
          <div className="demo-credentials">
            <p className="demo-title">📌 Demo Credentials:</p>
            <div className="demo-item">
              <strong>Shift Manager:</strong>
              <code>manager1@munger.com</code>
            </div>
            <div className="demo-item">
              <strong>HR Admin:</strong>
              <code>hr@munger.com</code>
            </div>
            <div className="demo-item">
              <strong>Password:</strong>
              <code>password123</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
