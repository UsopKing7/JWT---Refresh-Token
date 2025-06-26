import { pool } from '../config/connection'

export const rolesServices = {
  role: async (role: { name_rol: string}) => {
    const roleExiste = await pool.query(
      'SELECT * FROM roles WHERE name_rol = $1', [role.name_rol]
    )

    if (roleExiste.rows.length > 0) {
      return { existe: true, role: roleExiste.rows[0] }
    }

    const newRole = await pool.query(
      'INSERT INTO roles (name_rol) VALUES ($1) RETURNING *', [role.name_rol]
    )

    return { creado: true, role: newRole.rows[0] }
  }
}
