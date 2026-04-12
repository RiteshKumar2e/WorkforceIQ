import React from 'react'
import './Navbar.css'
import { useAuth } from '../../../hooks/useAuth'
import { useApp } from '../../../hooks/useApp'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../Button/Button'

const Navbar = () => {
  const { user, logout } = useAuth()
  const { toggleSidebar } = useApp()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <button className="navbar-toggle" onClick={toggleSidebar}>
            ☰
          </button>
          <Link to="/" className="navbar-logo">
            WorkforceIQ
          </Link>
        </div>

        {user && (
          <div className="navbar-content">
            <div className="navbar-user">
              <span className="navbar-username">{user.name}</span>
              <div className="navbar-avatar">
                {user.name.charAt(0).toUpperCase()}
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
