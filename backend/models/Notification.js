import tempDB from '../config/tempDB.js'

class Notification {
  static async create(notifData) {
    if (!notifData.userId) {
      throw new Error('User ID is required')
    }
    return await tempDB.createNotification(notifData)
  }

  static async find(query = {}) {
    if (query.userId) {
      return await tempDB.getUserNotifications(query.userId)
    }
    return []
  }

  static async findById(id) {
    const notifs = await tempDB.getAllTrainingFlags()
    return notifs.find((n) => n._id === id)
  }

  static async findOne(query) {
    const notifs = await tempDB.db.notifications
    for (const [key, value] of Object.entries(query)) {
      const result = notifs.find((n) => n[key] === value)
      if (result) return result
    }
    return null
  }
}

export default Notification
