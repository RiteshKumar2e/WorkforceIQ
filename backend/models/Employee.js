import tempDB from '../config/tempDB.js'

// Employee model wrapper for temporary database
class Employee {
  static async create(empData) {
    if (!empData.name || !empData.email) {
      throw new Error('Name and email are required')
    }
    return await tempDB.createEmployee(empData)
  }

  static async findById(id) {
    return await tempDB.findEmployeeById(id)
  }

  static async findByEmail(email) {
    return await tempDB.findEmployeeByEmail(email)
  }

  static async find(query = {}) {
    const employees = await tempDB.getAllEmployees()
    
    // Apply filters if provided
    if (query.department) {
      return employees.filter((e) => e.department === query.department)
    }
    if (query.status) {
      return employees.filter((e) => e.status === query.status)
    }
    return employees
  }

  static async findByIdAndUpdate(id, data) {
    return await tempDB.updateEmployee(id, data)
  }

  static async findByIdAndDelete(id) {
    return await tempDB.deleteEmployee(id)
  }

  static async countDocuments(query = {}) {
    const employees = await this.find(query)
    return employees.length
  }

  static async findOne(query) {
    const employees = await tempDB.getAllEmployees()
    for (const [key, value] of Object.entries(query)) {
      const result = employees.find((e) => e[key] === value)
      if (result) return result
    }
    return null
  }
}

export default Employee
