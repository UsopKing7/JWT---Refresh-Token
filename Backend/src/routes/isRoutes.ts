import { Router } from 'express'
import { Login, Register, refresToken } from '../controllers/LoginRegisterControllers'
import { verificarToekn } from '../utils/verificarToken'

export const router = Router()

router.post('/login', Login)
router.post('/register', Register)
router.post('/refresh-token', refresToken)
router.get('/protegida', verificarToekn)