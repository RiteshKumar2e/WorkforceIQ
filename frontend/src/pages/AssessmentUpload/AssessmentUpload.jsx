import React from 'react'
import Navbar from '../../components/common/Navbar/Navbar'
import Sidebar from '../../components/common/Sidebar/Sidebar'
import Footer from '../../components/common/Footer/Footer'
import Card from '../../components/common/Card/Card'
import './AssessmentUpload.css'

const AssessmentUpload = () => {
  return (
    <div className="dashboard-layout">
      <Navbar />
      <div className="main-layout">
        <Sidebar />
        <div className="content">
          <Card title="Upload Assessment Results">
            <div style={{padding: '2rem', textAlign: 'center'}}>
              <p>Upload bulk assessment results for employees</p>
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default AssessmentUpload
