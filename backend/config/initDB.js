import tempDB from './tempDB.js'

const initializeDB = async () => {
  try {
    // Check if demo users already exist
    const existingUsers = tempDB.db.users
    if (existingUsers && existingUsers.length > 0) {
      console.log('✅ Database already initialized with data')
      return
    }

    console.log('📝 Initializing database with demo data...')

    // Create demo users
    const demoUsers = [
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
    ]

    // Create users
    for (const userData of demoUsers) {
      await tempDB.createUser(userData)
    }

    console.log('✅ Database initialized with 3 demo users')
    console.log('Demo credentials:')
    console.log('  📧 manager1@munger.com / password123 (Shift Manager)')
    console.log('  📧 manager2@munger.com / password123 (Line Manager)')
    console.log('  📧 hr@munger.com / password123 (HR Admin)')
  } catch (error) {
    console.error('❌ Error initializing database:', error.message)
  }
}

export default initializeDB
