import tempDB from '../config/tempDB.js'

class TrainingFlag {
  static async create(flagData) {
    if (!flagData.employeeId || !flagData.urgency) {
      throw new Error('Employee ID and urgency are required')
    }
    return await tempDB.createTrainingFlag(flagData)
  }

  static async findById(id) {
    const flags = await tempDB.getAllTrainingFlags()
    return flags.find((f) => f._id === id)
  }

  static async find(query = {}) {
    const flags = await tempDB.getAllTrainingFlags()
    
    if (query.employeeId) {
      return flags.filter((f) => f.employeeId === query.employeeId)
    }
    if (query.status) {
      return flags.filter((f) => f.status === query.status)
    }
    return flags
  }

  static async findByIdAndUpdate(id, data) {
    return await tempDB.updateTrainingFlag(id, data)
  }

  static async findOne(query) {
    const flags = await tempDB.getAllTrainingFlags()
    for (const [key, value] of Object.entries(query)) {
      const result = flags.find((f) => f[key] === value)
      if (result) return result
    }
    return null
  }

  static async countDocuments(query = {}) {
    const flags = await this.find(query)
    return flags.length
  }
}

export default TrainingFlag
