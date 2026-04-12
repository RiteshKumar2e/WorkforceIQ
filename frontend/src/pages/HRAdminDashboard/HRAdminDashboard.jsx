import React from 'react'
import Navbar from '../../components/common/Navbar/Navbar'
import Sidebar from '../../components/common/Sidebar/Sidebar'
import Footer from '../../components/common/Footer/Footer'
import Card from '../../components/common/Card/Card'
import './HRAdminDashboard.css'

const HRAdminDashboard = () => {
  return (
    <div className="dashboard-layout">
      <Navbar />
      <div className="main-layout">
        <Sidebar />
        <div className="content">
          <Card title="HR Admin Dashboard">
            <div style={{padding: '2rem', textAlign: 'center'}}>
              <p>Aggregate insights and manage talent across the organization</p>
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default HRAdminDashboard
