import { Request, Response } from 'express'
import { schemaLogin } from '../schemas/schemaLogin'
import { UsuairoLogin, UsuarioRegister } from '../types/username.types'
import { LoginRegister } from '../services/loginRegisterService'
import { formatError } from '../utils/formatError'
import { schemaRegister } from '../schemas/schemaRegister'
import { genereteToken, verifyRefresToken, generateRefresToken } from '../utils/generateToken'

export const Login = async (req: Request, res: Response) => {
  try {
    const result = schemaLogin.safeParse(req.body)
    if (!result.success)throw new Error('Error de validacion ' + result.error.errors.map(e => e.message).join(', '))

    const { email, password }: UsuairoLogin = result.data
    const userLogin = await LoginRegister.login({ email, password })

    const token = genereteToken({ id_username: userLogin?.id_username, email: userLogin?.email })
    const refresToken = generateRefresToken({ id_username: userLogin?.id_username, email: userLogin?.email })

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 5 * 1000 // --> 5 seg
    })

    res.cookie('refres_token', refresToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // -> 7 day
    })

    res.status(200).json({
      message: userLogin?.message,
      id_username: userLogin?.id_username,
      email: userLogin?.email
    })
  } catch (error) {
    console.log(error)    
    res.status(500).json({
      message: 'algo fallo',
      error: formatError(error)
    })
  }
}

export const Register = async (req: Request, res: Response) => {
  try {
    const result = schemaRegister.safeParse(req.body)

    if (!result.success) throw new Error('Error de validacion' + result.error.errors.map(e => e.message).join(', '))

    const { username, email, password }: UsuarioRegister = result.data
    const newUser = await LoginRegister.register({ username, email, password })

    res.status(201).json({
      message: newUser.message,
      user: newUser.user
    })

  } catch (error) {
    res.status(500).json({
      message: 'algo fallo',
      error: formatError(error)
    })
  }
}

export const refresToken = (req: Request, res: Response) => {
  try {
    const token = req.cookies.refres_token
    if (!token) throw new Error('no se encontro el refresh token')

    const decoded = verifyRefresToken(token)
    if (!decoded) throw new Error('Refres token invalido o expirado')

    const newAccesToken = genereteToken({
      id_username: (decoded as any).id_username,
      email: (decoded as any).email
    })

    res.cookie('access_token', newAccesToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 5 * 1000
    })

    res.status(200).json({ message: 'Access token renovado' })
  } catch (error) {
    res.status(500).json({
      message: 'algo salio mal',
      error: formatError(error)
    })
  }
}