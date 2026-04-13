import tempDB from '../config/tempDB.js'

class Assessment {
  static async create(assessData) {
    if (!assessData.employeeId || !assessData.assessmentType) {
      throw new Error('Employee ID and assessment type are required')
    }
    return await tempDB.createAssessment(assessData)
  }

  static async findById(id) {
    return await tempDB.findAssessmentById(id)
  }

  static async find(query = {}) {
    const assessments = await tempDB.getAllAssessments()
    
    if (query.employeeId) {
      return assessments.filter((a) => a.employeeId === query.employeeId)
    }
    if (query.status) {
      return assessments.filter((a) => a.status === query.status)
    }
    return assessments
  }

  static async findByIdAndUpdate(id, data) {
    return await tempDB.updateAssessment(id, data)
  }

  static async findOne(query) {
    const assessments = await tempDB.getAllAssessments()
    for (const [key, value] of Object.entries(query)) {
      const result = assessments.find((a) => a[key] === value)
      if (result) return result
    }
    return null
  }

  static async countDocuments(query = {}) {
    const assessments = await this.find(query)
    return assessments.length
  }
}

export default Assessment
