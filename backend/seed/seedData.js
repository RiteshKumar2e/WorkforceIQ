import express from 'express'
import User from '../models/User.js'
import Employee from '../models/Employee.js'
import Assessment from '../models/Assessment.js'
import TrainingFlag from '../models/TrainingFlag.js'
import Department from '../models/Department.js'

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({})
    await Employee.deleteMany({})
    await Assessment.deleteMany({})
    await TrainingFlag.deleteMany({})
    await Department.deleteMany({})

    // Create users
    const users = await User.insertMany([
      {
        name: 'Manager 1',
        email: 'manager1@munger.com',
        password: 'password123',
        role: 'shift_manager',
        employeeId: 'M001',
        department: 'Production',
      },
      {
        name: 'Line Manager',
        email: 'manager2@munger.com',
        password: 'password123',
        role: 'line_manager',
        employeeId: 'M002',
        department: 'Production',
      },
      {
        name: 'HR Admin',
        email: 'hr@munger.com',
        password: 'password123',
        role: 'hr_admin',
        employeeId: 'HR001',
        department: 'HR',
      },
    ])

    // Create employees
    const employees = await Employee.insertMany([
      {
        name: 'Rajesh Kumar',
        email: 'rajesh@munger.com',
        employeeId: 'E001',
        department: 'Production',
        designation: 'Operator',
        technicalCompetency: 85,
        leadershipScore: 65,
        communicationScore: 72,
        engagementScore: 78,
        promotionReadiness: 'ready_now',
      },
      {
        name: 'Priya Singh',
        email: 'priya@munger.com',
        employeeId: 'E002',
        department: 'Quality',
        designation: 'Inspector',
        technicalCompetency: 88,
        leadershipScore: 70,
        communicationScore: 75,
        engagementScore: 82,
        promotionReadiness: 'ready_3_6_months',
      },
      {
        name: 'Amit Patel',
        email: 'amit@munger.com',
        employeeId: 'E003',
        department: 'Maintenance',
        designation: 'Technician',
        technicalCompetency: 75,
        leadershipScore: 55,
        communicationScore: 65,
        engagementScore: 68,
        promotionReadiness: 'needs_development',
      },
      {
        name: 'Neha Gupta',
        email: 'neha@munger.com',
        employeeId: 'E004',
        department: 'HR',
        designation: 'Specialist',
        technicalCompetency: 80,
        leadershipScore: 75,
        communicationScore: 85,
        engagementScore: 85,
        promotionReadiness: 'ready_now',
      },
      {
        name: 'Vikesh Sharma',
        email: 'vikesh@munger.com',
        employeeId: 'E005',
        department: 'Production',
        designation: 'Supervisor',
        technicalCompetency: 90,
        leadershipScore: 85,
        communicationScore: 80,
        engagementScore: 88,
        promotionReadiness: 'ready_now',
      },
    ])

    // Create training flags
    await TrainingFlag.insertMany([
      {
        employeeId: employees[2]._id,
        skillGap: 'Leadership Development',
        urgency: 'high',
        trainingType: 'Leadership Course',
        status: 'pending',
        assignedBy: users[2]._id,
      },
      {
        employeeId: employees[2]._id,
        skillGap: 'Technical Skills',
        urgency: 'critical',
        trainingType: 'Technical Training',
        status: 'pending',
        assignedBy: users[2]._id,
      },
    ])

    console.log('✅ Database seeded successfully!')
  } catch (error) {
    console.error('❌ Error seeding database:', error)
  }
}

export default seedData
