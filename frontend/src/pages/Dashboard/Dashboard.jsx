import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import anime from 'animejs/lib/anime.es.js'
import Navbar from '../../components/common/Navbar/Navbar'
import Sidebar from '../../components/common/Sidebar/Sidebar'
import Footer from '../../components/common/Footer/Footer'
import AnimatedCard from '../../components/common/AnimatedCard/AnimatedCard'
import AnimatedCounter from '../../components/common/AnimatedCounter/AnimatedCounter'
import AnimatedButton from '../../components/common/AnimatedButton/AnimatedButton'
import Badge from '../../components/common/Badge/Badge'
import './Dashboard.css'

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
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

const Dashboard = () => {
  // Sample data
  const stats = [
    { title: 'Total Employees', value: '248', change: '+12%', positive: true, icon: '👥', color: '#4f46e5' },
    { title: 'Training Alerts', value: '34', change: '+8%', positive: false, icon: '📚', color: '#f59e0b' },
    { title: 'Promotion Ready', value: '12', change: '+3%', positive: true, icon: '⬆️', color: '#22c55e' },
    { title: 'Avg Engagement', value: '78%', change: '+5%', positive: true, icon: '💡', color: '#7c3aed' },
  ]

  const recentAlerts = [
    { id: 1, name: 'Rajesh Kumar', type: 'Training', status: 'Critical', icon: '⚠️' },
    { id: 2, name: 'Priya Singh', type: 'Promotion', status: 'Ready', icon: '⬆️' },
    { id: 3, name: 'Amit Patel', type: 'Training', status: 'High', icon: '📚' },
  ]

  // Anime.js: animate alert items on mount
  const alertsRef = useRef(null)
  useEffect(() => {
    if (!alertsRef.current) return
    const items = alertsRef.current.querySelectorAll('.alert-item')
    anime({
      targets: items,
      opacity: [0, 1],
      translateX: [-20, 0],
      delay: anime.stagger(100, { start: 600 }),
      duration: 600,
      easing: 'easeOutCubic',
    })
  }, [])

  return (
    <div className="dashboard-layout">
      <Navbar />
      <div className="main-layout">
        <Sidebar />
        <motion.div
          className="content"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          <motion.div variants={itemVariants} className="dashboard-header">
            <div>
              <h1>Dashboard</h1>
              <p>Welcome back! Here's your performance overview.</p>
            </div>
            <div className="dashboard-header-actions">
              <AnimatedButton variant="outline-primary" size="sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Export
              </AnimatedButton>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="stats-grid">
            {stats.map((stat, idx) => (
              <AnimatedCard
                key={idx}
                elevated
                glow
                tilt
                delay={idx}
              >
                <div className="stat-content">
                  <div className="stat-header">
                    <div className="stat-icon-wrapper" style={{ background: `${stat.color}12`, color: stat.color }}>
                      <span>{stat.icon}</span>
                    </div>
                    <span className={`stat-change ${stat.positive ? 'positive' : 'negative'}`}>
                      {stat.positive ? '↑' : '↓'} {stat.change}
                    </span>
                  </div>
                  <div className="stat-value">
                    <AnimatedCounter value={stat.value} duration={1800} delay={400 + idx * 150} />
                  </div>
                  <p className="stat-label">{stat.title}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="dashboard-grid">
            {/* Recent Alerts */}
            <AnimatedCard title="Recent Alerts" elevated glow delay={4}>
              <div className="alerts-list" ref={alertsRef}>
                {recentAlerts.map((alert) => (
                  <div key={alert.id} className="alert-item" style={{ opacity: 0 }}>
                    <span className="alert-icon">{alert.icon}</span>
                    <div className="alert-info">
                      <p className="alert-name">{alert.name}</p>
                      <span className="alert-type">{alert.type}</span>
                    </div>
                    <Badge variant={alert.status === 'Critical' ? 'danger' : alert.status === 'Ready' ? 'success' : 'warning'}>
                      {alert.status}
                    </Badge>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '1rem', textAlign: 'right' }}>
                <AnimatedButton variant="ghost" size="sm">View All →</AnimatedButton>
              </div>
            </AnimatedCard>

            {/* Team Overview */}
            <AnimatedCard title="Team Overview" elevated glow delay={5}>
              <div className="team-stats">
                {[
                  { value: '12', label: 'Direct Reports', color: '#4f46e5' },
                  { value: '95%', label: 'On Target', color: '#22c55e' },
                  { value: '3', label: 'Promotion Ready', color: '#7c3aed' },
                ].map((item, i) => (
                  <div key={i} className="team-stat">
                    <span className="team-stat-value" style={{ color: item.color }}>
                      <AnimatedCounter value={item.value} duration={1500} delay={800 + i * 200} />
                    </span>
                    <p className="team-stat-label">{item.label}</p>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '1.25rem' }}>
                <AnimatedButton variant="primary" size="sm" fullWidth>
                  View Team Details
                </AnimatedButton>
              </div>
            </AnimatedCard>
          </div>

          {/* Quick Actions */}
          <AnimatedCard title="Quick Actions" delay={6}>
            <div className="quick-actions">
              {[
                { label: 'View Employees', icon: '👥' },
                { label: 'Build Team', icon: '🤝' },
                { label: 'Schedule Assessment', icon: '📋' },
                { label: 'View Reports', icon: '📈' },
              ].map((action, i) => (
                <AnimatedButton key={i} variant="outline-primary" size="md">
                  <span>{action.icon}</span> {action.label}
                </AnimatedButton>
              ))}
            </div>
          </AnimatedCard>
        </motion.div>
      </div>
      <Footer />
    </div>
  )
}

export default Dashboard
