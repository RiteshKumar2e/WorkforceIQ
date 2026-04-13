import tempDB from '../config/tempDB.js'

class Department {
  static async create(deptData) {
    if (!deptData.name) {
      throw new Error('Department name is required')
    }
    return await tempDB.createDepartment(deptData)
  }

  static async find(query = {}) {
    return await tempDB.getAllDepartments()
  }

  static async findById(id) {
    const depts = await tempDB.getAllDepartments()
    return depts.find((d) => d._id === id)
  }

  static async findOne(query) {
    const depts = await tempDB.getAllDepartments()
    for (const [key, value] of Object.entries(query)) {
      const result = depts.find((d) => d[key] === value)
      if (result) return result
    }
    return null
  }
}

export default Department
