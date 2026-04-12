import React, { useState } from 'react'
import Navbar from '../../components/common/Navbar/Navbar'
import Sidebar from '../../components/common/Sidebar/Sidebar'
import Footer from '../../components/common/Footer/Footer'
import Card from '../../components/common/Card/Card'
import Button from '../../components/common/Button/Button'
import Input from '../../components/common/Input/Input'
import Modal from '../../components/common/Modal/Modal'
import { useAuth } from '../../hooks/useAuth'
import './Settings.css'

const Settings = () => {
  const { user, updateProfile } = useAuth()
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  })

  const handleSaveProfile = async () => {
    // TODO: Call updateProfile service
  }

  return (
    <div className="dashboard-layout">
      <Navbar />
      <div className="main-layout">
        <Sidebar />
        <div className="content">
          <div className="settings-header">
            <h1>Settings</h1>
            <p>Manage your account and preferences</p>
          </div>

          <div className="settings-grid">
            <Card title="Profile Information">
              <Input
                label="Full Name"
                value={profileData.name}
                onChange={(e) => setProfileData({...profileData, name: e.target.value})}
              />
              <Input
                label="Email"
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                disabled
              />
              <div style={{marginTop: '1rem'}}>
                <Button variant="primary" onClick={handleSaveProfile}>
                  Save Changes
                </Button>
              </div>
            </Card>

            <Card title="Security">
              <Button
                variant="outline-primary"
                fullWidth
                onClick={() => setShowPasswordModal(true)}
              >
                Change Password
              </Button>
            </Card>
          </div>

          <Modal
            isOpen={showPasswordModal}
            onClose={() => setShowPasswordModal(false)}
            title="Change Password"
            size="md"
          >
            <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
              <Input label="Current Password" type="password" />
              <Input label="New Password" type="password" />
              <Input label="Confirm Password" type="password" />
            </div>
          </Modal>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Settings
