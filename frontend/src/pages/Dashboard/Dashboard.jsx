import React from 'react'
import Navbar from '../../components/common/Navbar/Navbar'
import Sidebar from '../../components/common/Sidebar/Sidebar'
import Footer from '../../components/common/Footer/Footer'
import Card from '../../components/common/Card/Card'
import Badge from '../../components/common/Badge/Badge'
import Button from '../../components/common/Button/Button'
import './Dashboard.css'

const Dashboard = () => {
  // Sample data
  const stats = [
    { title: 'Total Employees', value: '248', change: '+12%', positive: true },
    { title: 'Training Alerts', value: '34', change: '+8%', positive: false },
    { title: 'Promotion Ready', value: '12', change: '+3%', positive: true },
    { title: 'Avg Engagement', value: '78%', change: '+5%', positive: true },
  ]

  const recentAlerts = [
    { id: 1, name: 'Rajesh Kumar', type: 'Training', status: 'Critical', icon: '⚠️' },
    { id: 2, name: 'Priya Singh', type: 'Promotion', status: 'Ready', icon: '⬆️' },
    { id: 3, name: 'Amit Patel', type: 'Training', status: 'High', icon: '📚' },
  ]

  return (
    <div className="dashboard-layout">
      <Navbar />
      <div className="main-layout">
        <Sidebar />
        <div className="content">
          <div className="dashboard-header">
            <h1>Dashboard</h1>
            <p>Welcome back! Here's your performance overview.</p>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid">
            {stats.map((stat, idx) => (
              <Card key={idx} variant="primary" elevated>
                <div className="stat-content">
                  <p className="stat-label">{stat.title}</p>
                  <div className="stat-value">{stat.value}</div>
                  <span className={`stat-change ${stat.positive ? 'positive' : 'negative'}`}>
                    {stat.positive ? '📈' : '📉'} {stat.change}
                  </span>
                </div>
              </Card>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="dashboard-grid">
            {/* Recent Alerts */}
            <Card title="Recent Alerts" elevated>
              <div className="alerts-list">
                {recentAlerts.map((alert) => (
                  <div key={alert.id} className="alert-item">
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
                <Button variant="ghost" size="sm">View All →</Button>
              </div>
            </Card>

            {/* Team Overview */}
            <Card title="Team Overview" elevated>
              <div className="team-stats">
                <div className="team-stat">
                  <span className="team-stat-value">12</span>
                  <p className="team-stat-label">Direct Reports</p>
                </div>
                <div className="team-stat">
                  <span className="team-stat-value">95%</span>
                  <p className="team-stat-label">On Target</p>
                </div>
                <div className="team-stat">
                  <span className="team-stat-value">3</span>
                  <p className="team-stat-label">Promotion Ready</p>
                </div>
              </div>
              <div style={{ marginTop: '1rem' }}>
                <Button variant="primary" size="sm" fullWidth>
                  View Team Details
                </Button>
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card title="Quick Actions">
            <div className="quick-actions">
              <Button variant="outline-primary" size="md">View Employees</Button>
              <Button variant="outline-primary" size="md">Build Team</Button>
              <Button variant="outline-primary" size="md">Schedule Assessment</Button>
              <Button variant="outline-primary" size="md">View Reports</Button>
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Dashboard
