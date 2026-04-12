import express from 'express'
import * as authController from '../controllers/authController.js'
import { validateRegister, validateLogin, handleValidationErrors } from '../middlewares/validateMiddleware.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/register', validateRegister, handleValidationErrors, authController.register)
router.post('/login', validateLogin, handleValidationErrors, authController.login)
router.get('/profile', authMiddleware, authController.getProfile)
router.put('/profile', authMiddleware, authController.updateProfile)
router.post('/change-password', authMiddleware, authController.changePassword)

export default router
