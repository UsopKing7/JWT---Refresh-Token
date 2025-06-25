import { Request, Response } from 'express'
import { schemaLogin } from '../schemas/schemaLogin'
import { UsuairoLogin, UsuarioRegister } from '../types/username.types'
import { LoginRegister } from '../services/loginRegisterService'
import { formatError } from '../utils/formatError'
import { schemaRegister } from '../schemas/schemaRegister'

export const Login = async (req: Request, res: Response) => {
  try {
    const result = schemaLogin.safeParse(req.body)
    if (!result.success)throw new Error('Error de validacion ' + result.error.errors.map(e => e.message).join(', '))

    const { email, password }: UsuairoLogin = result.data
    const userLogin = await LoginRegister.login({ email, password })

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
