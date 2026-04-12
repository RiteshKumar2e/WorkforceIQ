import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import anime from 'animejs/lib/anime.es.js'
import { useAuth } from '../../hooks/useAuth'
import { validateEmail, validatePassword } from '../../utils/validators'
import { ROLES } from '../../utils/constants'
import Input from '../../components/common/Input/Input'
import AnimatedButton from '../../components/common/AnimatedButton/AnimatedButton'
import GradientText from '../../components/common/GradientText/GradientText'
import ParticleField from '../../components/common/ParticleField/ParticleField'
import './Register.css'

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

const ShifterIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
)

const LineIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <polyline points="16 11 18 13 22 9"></polyline>
  </svg>
)

const AdminIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
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

  // Anime.js intro for features
  const benefitsListRef = useRef(null)
  useEffect(() => {
    if (!benefitsListRef.current) return
    const items = benefitsListRef.current.querySelectorAll('.benefit-item')
    anime({
      targets: items,
      opacity: [0, 1],
      translateX: [-30, 0],
      delay: anime.stagger(120, { start: 800 }),
      duration: 700,
      easing: 'easeOutCubic',
    })
  }, [])

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
      newErrors.password = 'Password is too weak'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (!tosAgree) {
      newErrors.tos = 'Required'
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
      setApiError(error.response?.data?.message || 'Registration failed')
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
    { value: ROLES.SHIFT_MANAGER, label: 'Shift Manager', icon: <ShifterIcon /> },
    { value: ROLES.LINE_MANAGER, label: 'Line Manager', icon: <LineIcon /> },
    { value: ROLES.HR_ADMIN, label: 'HR Admin', icon: <AdminIcon /> }
  ]

  return (
    <div className="register-layout">
      {/* Background mesh gradient */}
      <div className="register-bg-mesh" />

      {/* Mobile Branding */}
      <div className="mobile-branding">
        <div className="mobile-logo">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          <h1>Workforce<span>IQ</span></h1>
        </div>
      </div>

      <motion.div
        className="register-container"
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.98, transition: { duration: 0.3 } }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Left Side - Branding */}
        <div className="register-features">
          <ParticleField count={20} color="rgba(255, 255, 255, 0.12)" />
          <div className="features-content">
            <motion.div
              className="features-icon"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 15 }}
            >
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Start Your <span>Journey</span>
            </motion.h1>
            <motion.p
              className="features-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              transition={{ delay: 0.55, duration: 0.5 }}
            >
              Join world-class managers using WorkforceIQ
            </motion.p>
            <div className="benefits-list" ref={benefitsListRef}>
              {[
                { title: 'Real-time Analytics', desc: 'Live performance tracking' },
                { title: 'Team Harmony', desc: 'Optimize team composition' },
                { title: 'Skill Clarity', desc: 'Monitor competency levels' },
              ].map((benefit, i) => (
                <div key={i} className="benefit-item" style={{ opacity: 0 }}>
                  <span className="benefit-check"><CheckIcon /></span>
                  <div>
                    <div className="benefit-title">{benefit.title}</div>
                    <div className="benefit-desc">{benefit.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Register Form */}
        <motion.div
          className="register-form-container"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          <div className="register-card">
            <motion.div variants={itemVariants} className="register-header-section">
              <h2>Join WorkforceIQ</h2>
              <p className="register-subtitle">Create your professional profile today</p>
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

            <form onSubmit={handleSubmit} className="register-form">
              <motion.div variants={itemVariants} className="form-group">
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
              </motion.div>

              <motion.div variants={itemVariants} className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={errors.email}
                />
              </motion.div>

              <motion.div variants={itemVariants} className="form-group">
                <label className="form-label">Choose Your Role</label>
                <div className="role-selection">
                  {roleOptions.map((option) => (
                    <motion.label
                      key={option.value}
                      className={`role-option ${formData.role === option.value ? 'selected' : ''}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <input
                        type="radio"
                        name="role"
                        value={option.value}
                        checked={formData.role === option.value}
                        onChange={handleInputChange}
                      />
                      <span className="role-icon">{option.icon}</span>
                      <span className="role-label">{option.label}</span>
                    </motion.label>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <div className="password-input-wrapper">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="••••••••"
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
                    <EyeIcon show={showPassword} />
                  </button>
                </div>
                {formData.password && (
                  <motion.div
                    className="password-strength"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                  >
                    <div className="strength-bar">
                      <motion.div
                        className="strength-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${(passwordStrength / 4) * 100}%` }}
                        style={{ backgroundColor: getPasswordStrengthColor() }}
                      />
                    </div>
                    <span className="strength-text" style={{ color: getPasswordStrengthColor() }}>
                      {getPasswordStrengthLabel()} password
                    </span>
                  </motion.div>
                )}
              </motion.div>

              <motion.div variants={itemVariants} className="form-group">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <div className="password-input-wrapper">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="••••••••"
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
                    <EyeIcon show={showConfirmPassword} />
                  </button>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="form-checkbox">
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
                  Agree to <a href="#tos">Terms</a> & <a href="#privacy">Privacy Policy</a>
                </label>
              </motion.div>

              <motion.div variants={itemVariants}>
                <AnimatedButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  glow
                  disabled={loading}
                  className="register-button"
                >
                  {loading ? (
                    <>
                      <span className="spinner"></span>
                      Creating Account...
                    </>
                  ) : (
                    'Create My Account'
                  )}
                </AnimatedButton>
              </motion.div>
            </form>

            <motion.div variants={itemVariants} className="register-footer">
              <p>
                Already have an account?
                <Link to="/login" className="login-link">Sign in instead</Link>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Register
