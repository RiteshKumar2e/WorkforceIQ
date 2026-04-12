import React from 'react'
import './Sidebar.css'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { useRole } from '../../../hooks/useRole'
import { ROLES } from '../../../utils/constants'

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
    <aside className="sidebar">
      <div className="sidebar-content">
        <div className="sidebar-menu">
          <h3 className="sidebar-title">Menu</h3>
          <nav>
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`sidebar-item ${isActive(item.path) ? 'active' : ''}`}
              >
                <span className="sidebar-icon">{item.icon}</span>
                <span className="sidebar-label">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        {isHRAdmin() && (
          <div className="sidebar-menu">
            <h3 className="sidebar-title">HR Admin</h3>
            <nav>
              {adminMenuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`sidebar-item ${isActive(item.path) ? 'active' : ''}`}
                >
                  <span className="sidebar-icon">{item.icon}</span>
                  <span className="sidebar-label">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}

        <div className="sidebar-menu">
          <h3 className="sidebar-title">Settings</h3>
          <nav>
            <Link
              to="/settings"
              className={`sidebar-item ${isActive('/settings') ? 'active' : ''}`}
            >
              <span className="sidebar-icon">⚙️</span>
              <span className="sidebar-label">Settings</span>
            </Link>
          </nav>
        </div>
      </div>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="sidebar-user-info">
            <p className="sidebar-user-name">{user?.name}</p>
            <p className="sidebar-user-role">{user?.role?.replace('_', ' ')}</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
