import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { userToken } from '../types/index'
import { SECRET_KEY } from '../config/proces'

export const verificarToekn = async (req: Request, _res: Response, next: NextFunction) => {
  const token = req.cookies.access_token

  if (!token) throw new Error('Error token no proporcionado')

  try {
    const decoded = jwt.verify(token, SECRET_KEY)
    req.user = decoded as userToken
    next()
  } catch {}
}