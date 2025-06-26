import { pool } from '../config/connection'
import { QUERY_POR_ } from '../models/sql/username.query'

export const tokenServices = {
  async saveToken(token: { id_username: string, token: string }) {
    const userExist = await pool.query(QUERY_POR_.USER_ID, [token.id_username])

    if (userExist.rowCount === 0) throw new Error('Usuario no encontrado')

    const addToken = await pool.query(
      QUERY_POR_.TOKEN, [token.id_username, token.token]
    )

    if (addToken.rowCount === 0) throw new Error('Error al insertar el token')

    return { addToken: addToken.rows[0] }
  }
}
