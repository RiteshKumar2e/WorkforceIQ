import express from 'express'
import * as dashboardController from '../controllers/dashboardController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get('/', authMiddleware, dashboardController.getDashboardData)
router.get('/stats', authMiddleware, dashboardController.getDashboardStats)
router.get('/charts', authMiddleware, dashboardController.getDashboardCharts)

export default router
