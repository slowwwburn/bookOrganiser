import { Router } from 'express'
import AuthController from '../controllers/AuthController'
const router = Router()

router.post('/login', AuthController.login)
router.post('/register', AuthController.register)
router.post('/update_password', AuthController.updatePassword)
router.post('/update_user/:id', AuthController.updateUser)
router.post('/delete_user/:id', AuthController.deleteUser)

export default router