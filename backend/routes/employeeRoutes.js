import express from 'express'
import * as employeeController from '../controllers/employeeController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get('/', authMiddleware, employeeController.getEmployees)
router.get('/search', authMiddleware, employeeController.searchEmployees)
router.post('/', authMiddleware, employeeController.createEmployee)
router.get('/:id', authMiddleware, employeeController.getEmployeeById)
router.put('/:id', authMiddleware, employeeController.updateEmployee)
router.delete('/:id', authMiddleware, employeeController.deleteEmployee)

export default router
