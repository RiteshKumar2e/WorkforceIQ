import React from 'react'
import Navbar from '../../components/common/Navbar/Navbar'
import Sidebar from '../../components/common/Sidebar/Sidebar'
import Footer from '../../components/common/Footer/Footer'
import Card from '../../components/common/Card/Card'
import Badge from '../../components/common/Badge/Badge'
import './EmployeeProfile.css'

const EmployeeProfile = () => {
  return (
    <div className="dashboard-layout">
      <Navbar />
      <div className="main-layout">
        <Sidebar />
        <div className="content">
          <div className="profile-layout">
            <Card>
              <div className="profile-header">
                <div className="profile-avatar-large">RK</div>
                <div className="profile-info">
                  <h1>Rajesh Kumar</h1>
                  <p className="profile-role">Production Operator</p>
                  <Badge variant="success">Active</Badge>
                </div>
              </div>
            </Card>

            <div className="profile-grid">
              <Card title="Basic Information">
                <div className="info-item">
                  <span>Employee ID:</span>
                  <strong>E001</strong>
                </div>
                <div className="info-item">
                  <span>Department:</span>
                  <strong>Production</strong>
                </div>
                <div className="info-item">
                  <span>Report Manager:</span>
                  <strong>Vikesh Sharma</strong>
                </div>
                <div className="info-item">
                  <span>Experience:</span>
                  <strong>8 years</strong>
                </div>
              </Card>

              <Card title="Performance Metrics">
                <div className="metric-item">
                  <label>Technical Competency</label>
                  <div className="progress-bar">
                    <div className="progress" style={{width: '85%'}}></div>
                  </div>
                  <span>85%</span>
                </div>
                <div className="metric-item">
                  <label>Engagement Score</label>
                  <div className="progress-bar">
                    <div className="progress" style={{width: '78%'}}></div>
                  </div>
                  <span>78%</span>
                </div>
                <div className="metric-item">
                  <label>Leadership Readiness</label>
                  <div className="progress-bar">
                    <div className="progress" style={{width: '65%'}}></div>
                  </div>
                  <span>65%</span>
                </div>
              </Card>
            </div>

            <Card title="Assessment History">
              <div className="assessment-list">
                <div className="assessment-item">
                  <p className="assessment-date">2024-03-15</p>
                  <p className="assessment-type">Technical Skills Assessment</p>
                  <Badge variant="success">Passed</Badge>
                </div>
                <div className="assessment-item">
                  <p className="assessment-date">2024-02-20</p>
                  <p className="assessment-type">Behavioral Assessment</p>
                  <Badge variant="success">Completed</Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default EmployeeProfile
