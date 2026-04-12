import React from 'react'
import Navbar from '../../components/common/Navbar/Navbar'
import Sidebar from '../../components/common/Sidebar/Sidebar'
import Footer from '../../components/common/Footer/Footer'
import Card from '../../components/common/Card/Card'
import Badge from '../../components/common/Badge/Badge'
import './PromotionReadiness.css'

const PromotionReadiness = () => {
  const promotionData = [
    { status: 'Ready Now', count: 3, color: 'success' },
    { status: 'Ready 3-6 Months', count: 7, color: 'warning' },
    { status: 'Needs Development', count: 12, color: 'danger' },
  ]

  return (
    <div className="dashboard-layout">
      <Navbar />
      <div className="main-layout">
        <Sidebar />
        <div className="content">
          <Card title="Promotion Readiness Tracker">
            <div className="promotion-grid">
              {promotionData.map((item, idx) => (
                <Card key={idx} variant={item.color}>
                  <div className="promotion-stat">
                    <div className="promotion-count">{item.count}</div>
                    <p className="promotion-label">{item.status}</p>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default PromotionReadiness
