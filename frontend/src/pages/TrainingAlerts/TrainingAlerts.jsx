import React from 'react'
import Navbar from '../../components/common/Navbar/Navbar'
import Sidebar from '../../components/common/Sidebar/Sidebar'
import Footer from '../../components/common/Footer/Footer'
import Card from '../../components/common/Card/Card'
import Badge from '../../components/common/Badge/Badge'
import './TrainingAlerts.css'

const TrainingAlerts = () => {
  const alerts = [
    { id: 1, name: 'Rajesh Kumar', skill: 'Leadership', urgency: 'Critical' },
    { id: 2, name: 'Amit Patel', skill: 'Safety', urgency: 'High' },
    { id: 3, name: 'Neha Gupta', skill: 'Communication', urgency: 'Medium' },
  ]

  const getUrgencyColor = (urgency) => {
    if (urgency === 'Critical') return 'danger'
    if (urgency === 'High') return 'warning'
    return 'info'
  }

  return (
    <div className="dashboard-layout">
      <Navbar />
      <div className="main-layout">
        <Sidebar />
        <div className="content">
          <Card title="Training Alerts">
            <div className="alerts-container">
              {alerts.map((alert) => (
                <div key={alert.id} className="alert-card">
                  <div className="alert-info">
                    <p className="alert-name">{alert.name}</p>
                    <p className="alert-skill">{alert.skill} Training Required</p>
                  </div>
                  <Badge variant={getUrgencyColor(alert.urgency)}>
                    {alert.urgency}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default TrainingAlerts
