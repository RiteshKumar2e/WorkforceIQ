import React from 'react'
import { motion } from 'framer-motion'
import './Navbar.css'
import { useAuth } from '../../../hooks/useAuth'
import { useApp } from '../../../hooks/useApp'
import { Link, useNavigate } from 'react-router-dom'
import AnimatedButton from '../AnimatedButton/AnimatedButton'

const Navbar = () => {
  const { user, logout } = useAuth()
  const { toggleSidebar } = useApp()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className="navbar-container">
        <div className="navbar-brand">
          <motion.button
            className="navbar-toggle"
            onClick={toggleSidebar}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="15" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </motion.button>
          <Link to="/" className="navbar-logo">
            Workforce<span>IQ</span>
          </Link>
        </div>

        {user && (
          <div className="navbar-content">
            <div className="navbar-user">
              <span className="navbar-username">{user.name}</span>
              <motion.div
                className="navbar-avatar"
                whileHover={{ scale: 1.08 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                {user.name.charAt(0).toUpperCase()}
              </motion.div>
            </div>
            <AnimatedButton
              variant="ghost"
              size="sm"
              onClick={handleLogout}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              Logout
            </AnimatedButton>
          </div>
        )}
      </div>
    </motion.nav>
  )
}

export default Navbar
