import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import { errorMiddleware } from './middlewares/errorMiddleware.js'

// Routes
import authRoutes from './routes/authRoutes.js'
import employeeRoutes from './routes/employeeRoutes.js'
import dashboardRoutes from './routes/dashboardRoutes.js'
import teamRoutes from './routes/teamRoutes.js'
import assessmentRoutes from './routes/assessmentRoutes.js'
import trainingRoutes from './routes/trainingRoutes.js'
import reportRoutes from './routes/reportRoutes.js'

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Connect to MongoDB
await connectDB()

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/employees', employeeRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/team', teamRoutes)
app.use('/api/assessments', assessmentRoutes)
app.use('/api/training', trainingRoutes)
app.use('/api/reports', reportRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'WorkforceIQ API is running' })
})

// Error handling middleware
app.use(errorMiddleware)

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' })
})

export default app
