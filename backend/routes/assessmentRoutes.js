import express from 'express'
import * as assessmentController from '../controllers/assessmentController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get('/', authMiddleware, assessmentController.getAssessments)
router.post('/', authMiddleware, assessmentController.createAssessment)
router.get('/scheduled', authMiddleware, assessmentController.getScheduledAssessments)
router.get('/:id', authMiddleware, assessmentController.getAssessmentById)
router.post('/schedule', authMiddleware, assessmentController.scheduleAssessment)
router.post('/:assessmentId/results', authMiddleware, assessmentController.submitAssessmentResults)

export default router
