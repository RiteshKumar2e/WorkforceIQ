import bcrypt from 'bcryptjs'
import tempDB from '../config/tempDB.js'

// User model wrapper for temporary database
class User {
  static async create(userData) {
    if (!userData.email || !userData.password) {
      throw new Error('Email and password are required')
    }
    return await tempDB.createUser(userData)
  }

  static async findById(id) {
    const user = await tempDB.findUserById(id)
    if (user) {
      const { password, ...userWithoutPassword } = user
      return userWithoutPassword
    }
    return null
  }

  static async findByEmail(email) {
    // Returns user WITH password for login comparison
    return await tempDB.findUserByEmail(email)
  }

  static async find(query = {}) {
    const users = await tempDB.getAllUsers()
    return users
  }

  static async findByIdAndUpdate(id, data) {
    const user = await tempDB.findUserById(id)
    if (!user) return null
    const updatedUser = { ...user, ...data }
    tempDB.db.users[tempDB.db.users.indexOf(user)] = updatedUser
    return { ...updatedUser, password: undefined }
  }

  static async findOne(query) {
    const users = tempDB.db.users
    for (const [key, value] of Object.entries(query)) {
      const result = users.find((u) => u[key] === value)
      if (result) return result
    }
    return null
  }

  // Instance method wrapper for password comparison
  static comparePassword = async (enteredPassword, hashedPassword) => {
    return await bcrypt.compare(enteredPassword, hashedPassword)
  }
}

export default User
