import React from 'react'
import { motion } from 'framer-motion'
import './Sidebar.css'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { useRole } from '../../../hooks/useRole'
import { ROLES } from '../../../utils/constants'

const sidebarVariants = {
  initial: { opacity: 0, x: -10 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
      staggerChildren: 0.04,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  initial: { opacity: 0, x: -12 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: 'easeOut' },
  },
}

const Sidebar = () => {
  const location = useLocation()
  const { user } = useAuth()
  const { isHRAdmin } = useRole()

  const isActive = (path) => location.pathname === path

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/employees', label: 'Employees', icon: '👥' },
    { path: '/team-builder', label: 'Team Builder', icon: '🤝' },
    { path: '/promotion-readiness', label: 'Promotions', icon: '⬆️' },
    { path: '/training-alerts', label: 'Training', icon: '📚' },
    { path: '/assessment-schedule', label: 'Assessments', icon: '📋' },
    { path: '/reports', label: 'Reports', icon: '📈' },
  ]

  const adminMenuItems = [
    { path: '/hr-admin', label: 'HR Dashboard', icon: '🏢' },
    { path: '/assessment-upload', label: 'Upload Results', icon: '⬆️' },
  ]

  return (
    <motion.aside
      className="sidebar"
      variants={sidebarVariants}
      initial="initial"
      animate="animate"
    >
      <div className="sidebar-content">
        <div className="sidebar-menu">
          <motion.h3 variants={itemVariants} className="sidebar-title">Menu</motion.h3>
          <nav>
            {menuItems.map((item, i) => (
              <motion.div key={item.path} variants={itemVariants}>
                <Link
                  to={item.path}
                  className={`sidebar-item ${isActive(item.path) ? 'active' : ''}`}
                >
                  <span className="sidebar-icon">{item.icon}</span>
                  <span className="sidebar-label">{item.label}</span>
                  {isActive(item.path) && (
                    <motion.div
                      className="sidebar-active-indicator"
                      layoutId="activeIndicator"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>
        </div>

        {isHRAdmin() && (
          <div className="sidebar-menu">
            <motion.h3 variants={itemVariants} className="sidebar-title">HR Admin</motion.h3>
            <nav>
              {adminMenuItems.map((item) => (
                <motion.div key={item.path} variants={itemVariants}>
                  <Link
                    to={item.path}
                    className={`sidebar-item ${isActive(item.path) ? 'active' : ''}`}
                  >
                    <span className="sidebar-icon">{item.icon}</span>
                    <span className="sidebar-label">{item.label}</span>
                    {isActive(item.path) && (
                      <motion.div
                        className="sidebar-active-indicator"
                        layoutId="activeIndicator"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </div>
        )}

        <div className="sidebar-menu">
          <motion.h3 variants={itemVariants} className="sidebar-title">Settings</motion.h3>
          <nav>
            <motion.div variants={itemVariants}>
              <Link
                to="/settings"
                className={`sidebar-item ${isActive('/settings') ? 'active' : ''}`}
              >
                <span className="sidebar-icon">⚙️</span>
                <span className="sidebar-label">Settings</span>
                {isActive('/settings') && (
                  <motion.div
                    className="sidebar-active-indicator"
                    layoutId="activeIndicator"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            </motion.div>
          </nav>
        </div>
      </div>

      <motion.div variants={itemVariants} className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="sidebar-user-info">
            <p className="sidebar-user-name">{user?.name}</p>
            <p className="sidebar-user-role">{user?.role?.replace('_', ' ')}</p>
          </div>
        </div>
      </motion.div>
    </motion.aside>
  )
}

export default Sidebar
