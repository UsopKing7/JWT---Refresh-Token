import jwt from 'jsonwebtoken';
import { SECRET_KEY, SECRET_KEY_REFRESH } from '../config/proces'

export const genereteToken = (payload: object): string => {
  return jwt.sign(payload, SECRET_KEY, {
    expiresIn: '5s',
  })
}

export const generateRefresToken = (payload: object): string => {
  return jwt.sign(payload, SECRET_KEY_REFRESH, {
    expiresIn: '7d'
  })
}

export const verifyRefresToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET_KEY_REFRESH)
  } catch (error) {
    return null
  }
}