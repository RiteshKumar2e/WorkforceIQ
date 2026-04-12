import React from 'react'
import Navbar from '../../components/common/Navbar/Navbar'
import Sidebar from '../../components/common/Sidebar/Sidebar'
import Footer from '../../components/common/Footer/Footer'
import Card from '../../components/common/Card/Card'
import './Reports.css'

const Reports = () => {
  return (
    <div className="dashboard-layout">
      <Navbar />
      <div className="main-layout">
        <Sidebar />
        <div className="content">
          <Card title="Reports & Analytics">
            <div style={{padding: '2rem', textAlign: 'center'}}>
              <p>Generate detailed reports and analytics</p>
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Reports
