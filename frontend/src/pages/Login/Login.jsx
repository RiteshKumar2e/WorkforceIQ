import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import anime from 'animejs/lib/anime.es.js'
import { useAuth } from '../../hooks/useAuth'
import { validateEmail, validatePassword } from '../../utils/validators'
import Input from '../../components/common/Input/Input'
import AnimatedButton from '../../components/common/AnimatedButton/AnimatedButton'
import GradientText from '../../components/common/GradientText/GradientText'
import ParticleField from '../../components/common/ParticleField/ParticleField'
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

// Framer Motion variants
const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
}

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

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

  // Anime.js intro for branding features
  const featuresListRef = useRef(null)
  useEffect(() => {
    if (!featuresListRef.current) return
    const items = featuresListRef.current.querySelectorAll('.feature')
    anime({
      targets: items,
      opacity: [0, 1],
      translateX: [-30, 0],
      delay: anime.stagger(120, { start: 800 }),
      duration: 700,
      easing: 'easeOutCubic',
    })
  }, [])

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
      {/* Background mesh gradient */}
      <div className="login-bg-mesh" />

      <motion.div
        className="login-container"
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Left Side - Branding */}
        <div className="login-branding">
          <ParticleField count={20} color="rgba(255, 255, 255, 0.12)" />
          <div className="branding-content">
            <motion.div
              className="branding-icon"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 15 }}
            >
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
                <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
              </svg>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Workforce<span>IQ</span>
            </motion.h1>
            <motion.p
              className="branding-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              transition={{ delay: 0.55, duration: 0.5 }}
            >
              Advanced People Intelligence Platform
            </motion.p>
            <div className="branding-features" ref={featuresListRef}>
              {[
                'Employee Analytics',
                'Team Management',
                'Skill Assessment',
                'Promotion Tracking',
              ].map((text, i) => (
                <div key={i} className="feature" style={{ opacity: 0 }}>
                  <span className="feature-icon"><CheckIcon /></span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <motion.div
          className="login-form-container"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          <div className="login-card">
            <motion.div variants={itemVariants} className="login-header-section">
              <h2>Sign In</h2>
              <p className="login-subtitle">Access your organization's workforce insights</p>
            </motion.div>

            {apiError && (
              <motion.div
                className="alert alert-error"
                initial={{ opacity: 0, scale: 0.95, x: -10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
                <span>{apiError}</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="login-form">
              <motion.div variants={itemVariants} className="form-group">
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
              </motion.div>

              <motion.div variants={itemVariants} className="form-group">
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
              </motion.div>

              <motion.div variants={itemVariants} className="form-checkbox">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="rememberMe">Remember me for 30 days</label>
              </motion.div>

              <motion.div variants={itemVariants}>
                <AnimatedButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  glow
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
                </AnimatedButton>
              </motion.div>
            </form>

            <motion.div variants={itemVariants} className="divider">
              <span>EXPLORE DEMO</span>
            </motion.div>

            {/* Demo Credentials */}
            <motion.div variants={itemVariants} className="demo-section">
              <div className="demo-buttons">
                {[
                  { label: 'Shift Manager', email: 'manager1@munger.com', icon: '👤' },
                  { label: 'HR Admin', email: 'hr@munger.com', icon: '🏢' },
                  { label: 'Line Manager', email: 'manager2@munger.com', icon: '📊' },
                ].map((demo, i) => (
                  <motion.button
                    key={i}
                    type="button"
                    className="demo-button"
                    onClick={() => handleDemoLogin(demo.email)}
                    disabled={loading}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    <span className="demo-icon">{demo.icon}</span>
                    <span className="demo-label">{demo.label}</span>
                    <span className="demo-email">{demo.email}</span>
                  </motion.button>
                ))}
              </div>
              <p className="demo-password">Password: <code>password123</code></p>
            </motion.div>

            <motion.div variants={itemVariants} className="login-footer">
              <p>
                New to WorkforceIQ?
                <Link to="/register" className="signup-link">Create an account</Link>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Login
