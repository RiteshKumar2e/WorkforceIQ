import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/common/Button/Button'
import heroImage from '../../assets/hero.png'
import './Landing.css'

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
)

const Landing = () => {
  return (
    <div className="landing">
      {/* Navigation */}
      <nav className="landing-nav">
        <div className="landing-nav-container">
          <div className="landing-logo">Workforce<span>IQ</span></div>
          <div className="landing-nav-links">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">People <span>Intelligence</span> Platform</h1>
          <p className="hero-subtitle">
            Enterprise-grade workforce analytics for modern organizations
          </p>
          <p className="hero-description">
            WorkforceIQ replaces legacy systems with real-time, data-driven insights to help companies optimize performance, balance teams, and track leadership readiness.
          </p>
          <div className="hero-cta">
            <Link to="/login">
              <Button variant="primary" size="lg">
                View Demo
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="outline-primary" size="lg">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
        <div className="hero-illustration">
          <img src={heroImage} alt="Workforce Analytics Illustration" className="hero-img" />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-header">
          <h2>Platform Capabilities</h2>
          <p>Cutting-edge intelligence for strategic human capital management</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <polyline points="16 11 18 13 22 9"></polyline>
              </svg>
            </div>
            <h3>Unified Profiles</h3>
            <p>Consolidated technical competencies, behavioral traits, and engagement historical data.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10"></line>
                <line x1="12" y1="20" x2="12" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="14"></line>
              </svg>
            </div>
            <h3>Predictive Analytics</h3>
            <p>Advanced modeling for team composition, performance trends, and turnover risks.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <h3>Gap Detection</h3>
            <p>Automatic identification of technical and behavioral gaps with urgency alerts.</p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="benefits-content">
          <h2>Trusted by Strategic Leaders</h2>
          
          <div className="benefits-grid">
            <div className="benefit-column">
              <h3>Managers</h3>
              <ul>
                <li><CheckIcon /> Evidence-based performance reviews</li>
                <li><CheckIcon /> Team balance & harmony analysis</li>
                <li><CheckIcon /> Succession planning workflows</li>
                <li><CheckIcon /> Real-time engagement monitoring</li>
              </ul>
            </div>
            
            <div className="benefit-column">
              <h3>HR Administrators</h3>
              <ul>
                <li><CheckIcon /> Organization-wide talent mapping</li>
                <li><CheckIcon /> Automated assessment management</li>
                <li><CheckIcon /> Integrated development pipelines</li>
                <li><CheckIcon /> Strategic workforce reporting</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Modernize Your Talent Strategy</h2>
        <p>Join world-class organizations using WorkforceIQ to drive people performance.</p>
        <div className="cta-buttons">
          <Link to="/login">
            <Button variant="primary" size="lg">
              View Product Demo
            </Button>
          </Link>
          <Link to="/register">
            <Button variant="secondary" size="lg">
              Start Free Trial
            </Button>
          </Link>
        </div>
      </section>

      <footer className="landing-footer">
        <p>© 2024 WorkforceIQ. Enterprise Grade People Intelligence.</p>
      </footer>
    </div>
  )
}

export default Landing
