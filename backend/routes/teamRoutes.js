import express from 'express'
import * as teamController from '../controllers/teamController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/analyze', authMiddleware, teamController.analyzeTeam)
router.post('/report', authMiddleware, teamController.generateTeamReport)

export default router
