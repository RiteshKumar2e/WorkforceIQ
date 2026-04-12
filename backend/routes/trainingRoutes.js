import express from 'express'
import * as trainingController from '../controllers/trainingController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get('/flags', authMiddleware, trainingController.getTrainingFlags)
router.get('/flags/:id', authMiddleware, trainingController.getTrainingAlertsByEmployee)
router.put('/flags/:id', authMiddleware, trainingController.updateTrainingAlert)
router.post('/plans', authMiddleware, trainingController.createTrainingPlan)
router.get('/plans', authMiddleware, trainingController.getTrainingPlans)

export default router
