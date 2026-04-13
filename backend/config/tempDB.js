import fs from 'fs'
import path from 'path'
import bcrypt from 'bcryptjs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dbPath = path.join(__dirname, '../data/db.json')

// Ensure data directory exists
const dataDir = path.join(__dirname, '../data')
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

// Default database structure
const defaultDB = {
  users: [],
  employees: [],
  assessments: [],
  trainingFlags: [],
  departments: [],
  notifications: [],
}

// Load or initialize database
const loadDB = () => {
  try {
    if (fs.existsSync(dbPath)) {
      const data = fs.readFileSync(dbPath, 'utf-8')
      return JSON.parse(data)
    }
  } catch (error) {
    console.warn('Error loading database, using fresh data')
  }
  return { ...defaultDB }
}

// Save database to file
const saveDB = (db) => {
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2))
}

// Initialize database
let db = loadDB()

// In-memory database with persistence
class TempDB {
  constructor() {
    this.db = db
  }

  // User operations
  async createUser(userData) {
    const id = Date.now().toString()
    const hashedPassword = await bcrypt.hash(userData.password, 10)
    const user = {
      _id: id,
      ...userData,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    this.db.users.push(user)
    saveDB(this.db)
    return { ...user, password: undefined }
  }

  async findUserByEmail(email) {
    // Return with password for login comparison
    return this.db.users.find((u) => u.email === email.toLowerCase())
  }

  async findUserById(id) {
    return this.db.users.find((u) => u._id === id)
  }

  async getAllUsers() {
    return this.db.users.map((u) => ({ ...u, password: undefined }))
  }

  // Employee operations
  async createEmployee(empData) {
    const id = Date.now().toString()
    const employee = {
      _id: id,
      ...empData,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    this.db.employees.push(employee)
    saveDB(this.db)
    return employee
  }

  async findEmployeeById(id) {
    return this.db.employees.find((e) => e._id === id)
  }

  async findEmployeeByEmail(email) {
    return this.db.employees.find((e) => e.email === email.toLowerCase())
  }

  async getAllEmployees() {
    return this.db.employees
  }

  async updateEmployee(id, data) {
    const idx = this.db.employees.findIndex((e) => e._id === id)
    if (idx === -1) return null
    this.db.employees[idx] = { ...this.db.employees[idx], ...data, updatedAt: new Date() }
    saveDB(this.db)
    return this.db.employees[idx]
  }

  async deleteEmployee(id) {
    const idx = this.db.employees.findIndex((e) => e._id === id)
    if (idx === -1) return null
    const deleted = this.db.employees.splice(idx, 1)[0]
    saveDB(this.db)
    return deleted
  }

  // Assessment operations
  async createAssessment(assessData) {
    const id = Date.now().toString()
    const assessment = {
      _id: id,
      ...assessData,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    this.db.assessments.push(assessment)
    saveDB(this.db)
    return assessment
  }

  async findAssessmentById(id) {
    return this.db.assessments.find((a) => a._id === id)
  }

  async getAllAssessments() {
    return this.db.assessments
  }

  async updateAssessment(id, data) {
    const idx = this.db.assessments.findIndex((a) => a._id === id)
    if (idx === -1) return null
    this.db.assessments[idx] = { ...this.db.assessments[idx], ...data, updatedAt: new Date() }
    saveDB(this.db)
    return this.db.assessments[idx]
  }

  // Training Flag operations
  async createTrainingFlag(flagData) {
    const id = Date.now().toString()
    const flag = {
      _id: id,
      ...flagData,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    this.db.trainingFlags.push(flag)
    saveDB(this.db)
    return flag
  }

  async getTrainingFlagsByEmployee(employeeId) {
    return this.db.trainingFlags.filter((f) => f.employeeId === employeeId)
  }

  async getAllTrainingFlags() {
    return this.db.trainingFlags
  }

  async updateTrainingFlag(id, data) {
    const idx = this.db.trainingFlags.findIndex((f) => f._id === id)
    if (idx === -1) return null
    this.db.trainingFlags[idx] = { ...this.db.trainingFlags[idx], ...data, updatedAt: new Date() }
    saveDB(this.db)
    return this.db.trainingFlags[idx]
  }

  // Department operations
  async createDepartment(deptData) {
    const id = Date.now().toString()
    const dept = {
      _id: id,
      ...deptData,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    this.db.departments.push(dept)
    saveDB(this.db)
    return dept
  }

  async getAllDepartments() {
    return this.db.departments
  }

  // Notification operations
  async createNotification(notifData) {
    const id = Date.now().toString()
    const notif = {
      _id: id,
      ...notifData,
      read: false,
      createdAt: new Date(),
    }
    this.db.notifications.push(notif)
    saveDB(this.db)
    return notif
  }

  async getUserNotifications(userId) {
    return this.db.notifications.filter((n) => n.userId === userId)
  }

  // Search operations
  search(collection, query) {
    return this.db[collection].filter((item) =>
      Object.values(item).some((val) => String(val).toLowerCase().includes(query.toLowerCase()))
    )
  }

  // Clear all data
  clearAll() {
    this.db = { ...defaultDB }
    saveDB(this.db)
  }
}

export default new TempDB()
