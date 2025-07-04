import { pool } from '../config/connection'
import { UsuarioDB } from '../types/username.types'
import { QUERY_POR_ } from '../models/sql/username.query'
import { SAL } from '../config/proces'
import { rolesServices } from './roleServices'
import bcrypt from 'bcrypt'

export const LoginRegister = {
  login: async (usuario: { email: string, password: string }) => {
    const response = await pool.query<UsuarioDB>(
      QUERY_POR_.USER_EMAIL, [usuario.email]
    )

    if (response.rowCount === 0) throw new Error('Email or password not exists')
    
    const user = response.rows[0]
    const verifiPassword = await bcrypt.compare(usuario.password, user.password)
    if (!verifiPassword) return

    return {
      message: 'Login exitoso',
      id_username: user.id_username,
      email: user.email
    }
  },

  register: async (usuario: { username: string, email: string, password: string, role: string }) => {
    const hashedPassword = await bcrypt.hash(usuario.password, SAL)
    const response = await pool.query<UsuarioDB>(
      QUERY_POR_.USER_EXIST, [usuario.username, usuario.email]
    )

    if (response.rows.length > 0) throw new Error('Date already existent')

    const { role } = await rolesServices.role({ name_rol: usuario.role })

    const newUser = await pool.query<UsuarioDB>(
      QUERY_POR_.USER_INPUT, [usuario.username, usuario.email, hashedPassword, role.id_role]
    )

    if (newUser.rowCount === 0) throw new Error('No se puede registrar el usuario')
    
    return {
      message: 'Usuario registrado correctamente',
      user : newUser.rows[0]
    }
  }
}
