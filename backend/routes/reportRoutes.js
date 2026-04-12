import express from 'express'
import * as reportController from '../controllers/reportController.js'
import { authMiddleware, roleMiddleware } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get('/', authMiddleware, reportController.generateEmployeeReports)
router.get('/department', authMiddleware, reportController.getDepartmentReports)
router.post('/custom', authMiddleware, roleMiddleware(['hr_admin']), reportController.getCustomReport)

export default router
