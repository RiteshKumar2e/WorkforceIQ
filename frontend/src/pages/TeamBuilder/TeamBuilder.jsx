import React from 'react'
import Navbar from '../../components/common/Navbar/Navbar'
import Sidebar from '../../components/common/Sidebar/Sidebar'
import Footer from '../../components/common/Footer/Footer'
import Card from '../../components/common/Card/Card'
import './TeamBuilder.css'

const TeamBuilder = () => {
  return (
    <div className="dashboard-layout">
      <Navbar />
      <div className="main-layout">
        <Sidebar />
        <div className="content">
          <Card title="Team Builder">
            <div className="team-builder-content">
              <p>Select employees to analyze team composition, balance, and performance metrics.</p>
              <div style={{padding: '2rem', textAlign: 'center', color: 'var(--text-tertiary)'}}>
                Team builder interface coming soon...
              </div>
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default TeamBuilder
