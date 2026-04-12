import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import anime from 'animejs/lib/anime.es.js'
import AnimatedButton from '../../components/common/AnimatedButton/AnimatedButton'
import GradientText from '../../components/common/GradientText/GradientText'
import ParticleField from '../../components/common/ParticleField/ParticleField'
import useScrollReveal from '../../hooks/useScrollReveal'
import heroImage from '../../assets/hero.png'
import './Landing.css'

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
)

// Stagger container for child animations
const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
}

const fadeUpItem = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const Landing = () => {
  const featuresRef = useScrollReveal({ translateY: 50, duration: 800 })
  const benefitsRef = useScrollReveal({ translateY: 50, duration: 800, delay: 100 })
  const ctaRef = useScrollReveal({ translateY: 40, duration: 900, delay: 100 })

  // Animate feature cards on scroll
  const featureCardsRef = useRef(null)
  useEffect(() => {
    if (!featureCardsRef.current) return
    const cards = featureCardsRef.current.querySelectorAll('.feature-card')
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: cards,
              opacity: [0, 1],
              translateY: [50, 0],
              scale: [0.95, 1],
              delay: anime.stagger(120, { start: 200 }),
              duration: 800,
              easing: 'easeOutCubic',
            })
            observer.disconnect()
          }
        })
      },
      { threshold: 0.2 }
    )

    observer.observe(featureCardsRef.current)
    return () => observer.disconnect()
  }, [])

  // Animate benefit items
  const benefitItemsRef = useRef(null)
  useEffect(() => {
    if (!benefitItemsRef.current) return
    const items = benefitItemsRef.current.querySelectorAll('.benefit-column')
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: items,
              opacity: [0, 1],
              translateX: (el, i) => [i === 0 ? -40 : 40, 0],
              duration: 900,
              delay: anime.stagger(200, { start: 300 }),
              easing: 'easeOutCubic',
            })
            observer.disconnect()
          }
        })
      },
      { threshold: 0.2 }
    )

    observer.observe(benefitItemsRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="landing">
      {/* Navigation */}
      <motion.nav
        className="landing-nav"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="landing-nav-container">
          <motion.div
            className="landing-logo"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            Workforce<span>IQ</span>
          </motion.div>
          <div className="landing-nav-links">
            <Link to="/login">Login</Link>
            <Link to="/register">
              <AnimatedButton variant="primary" size="sm" glow>
                Get Started
              </AnimatedButton>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="hero-section">
        <ParticleField count={25} color="rgba(79, 70, 229, 0.08)" />
        <motion.div
          className="hero-content"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div variants={fadeUpItem} className="hero-badge">
            <span className="hero-badge-dot" />
            Enterprise-Grade Intelligence
          </motion.div>
          <motion.h1 variants={fadeUpItem} className="hero-title">
            People{' '}
            <GradientText
              gradient="linear-gradient(135deg, #4f46e5 0%, #7c3aed 30%, #a855f7 60%, #ec4899 100%)"
            >
              Intelligence
            </GradientText>
            <br />Platform
          </motion.h1>
          <motion.p variants={fadeUpItem} className="hero-subtitle">
            Enterprise-grade workforce analytics for modern organizations
          </motion.p>
          <motion.p variants={fadeUpItem} className="hero-description">
            WorkforceIQ replaces legacy systems with real-time, data-driven insights to help companies optimize performance, balance teams, and track leadership readiness.
          </motion.p>
          <motion.div variants={fadeUpItem} className="hero-cta">
            <Link to="/login">
              <AnimatedButton variant="primary" size="lg" glow magnetic>
                View Demo
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </AnimatedButton>
            </Link>
            <Link to="/register">
              <AnimatedButton variant="outline-primary" size="lg">
                Start Free Trial
              </AnimatedButton>
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div variants={fadeUpItem} className="hero-trust">
            <div className="trust-avatars">
              {['R', 'A', 'P', 'S'].map((letter, i) => (
                <motion.div
                  key={i}
                  className="trust-avatar"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.2 + i * 0.1, type: 'spring', stiffness: 300 }}
                >
                  {letter}
                </motion.div>
              ))}
            </div>
            <p><strong>500+</strong> organizations trust WorkforceIQ</p>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-illustration"
          initial={{ opacity: 0, scale: 0.9, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="hero-img-wrapper">
            <img src={heroImage} alt="Workforce Analytics Illustration" className="hero-img" />
            <div className="hero-img-glow" />
          </div>

          {/* Floating stat cards */}
          <motion.div
            className="floating-stat floating-stat-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <span className="floating-stat-value">+42%</span>
            <span className="floating-stat-label">Retention Rate</span>
          </motion.div>
          <motion.div
            className="floating-stat floating-stat-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            <span className="floating-stat-value">98%</span>
            <span className="floating-stat-label">Accuracy</span>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="features-section" ref={featuresRef}>
        <div className="features-header">
          <div className="section-badge">Platform Capabilities</div>
          <h2>Built for <GradientText>Strategic</GradientText> Leaders</h2>
          <p>Cutting-edge intelligence for strategic human capital management</p>
        </div>
        <div className="features-grid" ref={featureCardsRef}>
          {[
            {
              icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <polyline points="16 11 18 13 22 9"></polyline>
                </svg>
              ),
              title: 'Unified Profiles',
              desc: 'Consolidated technical competencies, behavioral traits, and engagement historical data.',
              color: '#4f46e5',
            },
            {
              icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="20" x2="18" y2="10"></line>
                  <line x1="12" y1="20" x2="12" y2="4"></line>
                  <line x1="6" y1="20" x2="6" y2="14"></line>
                </svg>
              ),
              title: 'Predictive Analytics',
              desc: 'Advanced modeling for team composition, performance trends, and turnover risks.',
              color: '#7c3aed',
            },
            {
              icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              ),
              title: 'Gap Detection',
              desc: 'Automatic identification of technical and behavioral gaps with urgency alerts.',
              color: '#a855f7',
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="feature-card"
              style={{ opacity: 0, '--accent': feature.color }}
            >
              <div className="feature-icon" style={{ color: feature.color }}>
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
              <div className="feature-card-arrow">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section" ref={benefitsRef}>
        <div className="benefits-content">
          <div className="section-badge">Who Benefits</div>
          <h2>Trusted by <GradientText>Strategic</GradientText> Leaders</h2>
          
          <div className="benefits-grid" ref={benefitItemsRef}>
            <div className="benefit-column" style={{ opacity: 0 }}>
              <div className="benefit-column-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <h3>Managers</h3>
              <ul>
                <li><CheckIcon /> Evidence-based performance reviews</li>
                <li><CheckIcon /> Team balance & harmony analysis</li>
                <li><CheckIcon /> Succession planning workflows</li>
                <li><CheckIcon /> Real-time engagement monitoring</li>
              </ul>
            </div>
            
            <div className="benefit-column" style={{ opacity: 0 }}>
              <div className="benefit-column-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
              </div>
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
      <section className="cta-section" ref={ctaRef}>
        <ParticleField count={15} color="rgba(255, 255, 255, 0.1)" />
        <div className="cta-content">
          <h2>Modernize Your Talent Strategy</h2>
          <p>Join world-class organizations using WorkforceIQ to drive people performance.</p>
          <div className="cta-buttons">
            <Link to="/login">
              <AnimatedButton variant="secondary" size="lg" magnetic>
                View Product Demo
              </AnimatedButton>
            </Link>
            <Link to="/register">
              <AnimatedButton variant="outline-primary" size="lg" className="cta-outline-btn">
                Start Free Trial
              </AnimatedButton>
            </Link>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <p>© 2024 WorkforceIQ. Enterprise Grade People Intelligence.</p>
      </footer>
    </div>
  )
}

export default Landing
