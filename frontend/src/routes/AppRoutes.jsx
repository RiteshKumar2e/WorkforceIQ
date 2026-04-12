import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import PrivateRoute from './PrivateRoute'
import RoleBasedRoute from './RoleBasedRoute'
import { ROLES } from '../utils/constants'

// Pages
import Landing from '../pages/Landing/Landing'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import Dashboard from '../pages/Dashboard/Dashboard'
import EmployeeList from '../pages/EmployeeList/EmployeeList'
import EmployeeProfile from '../pages/EmployeeProfile/EmployeeProfile'
import TeamBuilder from '../pages/TeamBuilder/TeamBuilder'
import PromotionReadiness from '../pages/PromotionReadiness/PromotionReadiness'
import TrainingAlerts from '../pages/TrainingAlerts/TrainingAlerts'
import AssessmentSchedule from '../pages/AssessmentSchedule/AssessmentSchedule'
import AssessmentUpload from '../pages/AssessmentUpload/AssessmentUpload'
import HRAdminDashboard from '../pages/HRAdminDashboard/HRAdminDashboard'
import Reports from '../pages/Reports/Reports'
import Settings from '../pages/Settings/Settings'
import NotFound from '../pages/NotFound/NotFound'

const AnimatedRoutes = () => {
  const location = useLocation()
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/employees/:id" element={<EmployeeProfile />} />
          <Route path="/team-builder" element={<TeamBuilder />} />
          <Route path="/promotion-readiness" element={<PromotionReadiness />} />
          <Route path="/training-alerts" element={<TrainingAlerts />} />
          <Route path="/assessment-schedule" element={<AssessmentSchedule />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/reports" element={<Reports />} />

          {/* HR Admin Only Routes */}
          <Route element={<RoleBasedRoute allowedRoles={[ROLES.HR_ADMIN]} />}>
            <Route path="/hr-admin" element={<HRAdminDashboard />} />
            <Route path="/assessment-upload" element={<AssessmentUpload />} />
          </Route>
        </Route>

        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  )
}

const AppRoutes = () => {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  )
}

export default AppRoutes
