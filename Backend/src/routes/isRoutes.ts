import { Router } from 'express'
import { Login, Register } from '../controllers/LoginRegisterControllers'

export const router = Router()

router.post('/login', Login)
router.post('/register', Register)