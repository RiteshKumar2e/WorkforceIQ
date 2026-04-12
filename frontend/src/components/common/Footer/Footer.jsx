import React from 'react'
import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-text">
          © {currentYear} WorkforceIQ. People Intelligence Platform for Smarter Workforce Decisions.
        </p>
        <div className="footer-links">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
          <a href="#support">Support</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
