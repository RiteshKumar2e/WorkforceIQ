import React from 'react'
import Navbar from '../../components/common/Navbar/Navbar'
import Sidebar from '../../components/common/Sidebar/Sidebar'
import Footer from '../../components/common/Footer/Footer'
import Card from '../../components/common/Card/Card'
import './AssessmentSchedule.css'

const AssessmentSchedule = () => {
  return (
    <div className="dashboard-layout">
      <Navbar />
      <div className="main-layout">
        <Sidebar />
        <div className="content">
          <Card title="Assessment Schedule">
            <div style={{padding: '2rem', textAlign: 'center'}}>
              <p>Schedule assessments for employees</p>
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default AssessmentSchedule
