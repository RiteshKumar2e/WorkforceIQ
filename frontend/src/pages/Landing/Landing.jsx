import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/common/Button/Button'
import './Landing.css'

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
            Make evidence-based decisions with workforce analytics
          </p>
          <p className="hero-description">
            WorkforceIQ replaces paper files and memory-based decisions with intelligent, data-driven insights for modern performance management.
          </p>
          <div className="hero-cta">
            <Link to="/login">
              <Button variant="primary" size="lg">
                Sign In Now
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="outline-primary" size="lg">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
        <div className="hero-illustration">
          <div className="illustration">📊</div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-header">
          <h2>Key Features</h2>
          <p>Everything managers need to make smart decisions about their teams</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">👤</div>
            <h3>Employee Profiles</h3>
            <p>Comprehensive profiles with technical competency, behavioral insights, and engagement scores</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>Performance Analytics</h3>
            <p>Real-time dashboards with interactive charts and detailed analytics</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🤝</div>
            <h3>Team Builder</h3>
            <p>Select employees and get instant team composition analysis with balance alerts</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⬆️</div>
            <h3>Promotion Readiness</h3>
            <p>Track and manage promotion pipeline with ready now, 3-6 months, and development categories</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>Training Alerts</h3>
            <p>Automated training flags based on technical and behavioral gaps with urgency levels</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📋</div>
            <h3>Assessment Management</h3>
            <p>Schedule, upload, and track employee assessments across your organization</p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="benefits-content">
          <h2>Designed for HR Teams & Managers</h2>
          
          <div className="benefits-grid">
            <div className="benefit-column">
              <h3>👔 For Managers</h3>
              <ul>
                <li>View instantly prepared employee insights</li>
                <li>Build high-performing teams with data</li>
                <li>Identify training needs automatically</li>
                <li>Support succession planning</li>
              </ul>
            </div>
            
            <div className="benefit-column">
              <h3>👩‍💼 For HR Administrators</h3>
              <ul>
                <li>Upload and manage assessments</li>
                <li>Aggregate insights across teams</li>
                <li>Generate detailed reports</li>
                <li>Track talent development pipelines</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="roles-section">
        <h2>Tailored Experiences for Every Role</h2>
        <div className="roles-grid">
          <div className="role-card">
            <div className="role-icon">🏭</div>
            <h3>Shift Manager</h3>
            <p>Monitor daily team performance and engagement</p>
          </div>
          <div className="role-card">
            <div className="role-icon">👨‍💼</div>
            <h3>Line Manager</h3>
            <p>Manage employee development and assessments</p>
          </div>
          <div className="role-card">
            <div className="role-icon">🏢</div>
            <h3>HR Administrator</h3>
            <p>Oversee organization-wide talent insights</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Transform Your Workforce Management?</h2>
        <p>Join teams that make smarter decisions with WorkforceIQ</p>
        <div className="cta-buttons">
          <Link to="/login">
            <Button variant="primary" size="lg">
              Sign In
            </Button>
          </Link>
          <Link to="/register">
            <Button variant="secondary" size="lg">
              Get Started
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>© 2024 WorkforceIQ. People Intelligence for Modern Organizations.</p>
      </footer>
    </div>
  )
}

export default Landing
