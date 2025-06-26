export const QUERY_POR_ = {
  USER_EMAIL: 'SELECT * FROM usuarios WHERE email = $1',
  USER_EXIST: 'SELECT * FROM usuarios WHERE username = $1 AND email = $2',
  USER_INPUT: 'INSERT INTO usuarios (username, email, password, role_id) VALUES ($1, $2, $3, $4)',
  USER_ID: 'SELECT id_username FROM usuarios WHERE id_username = $1',
  TOKEN: 'INSERT INTO tokens (id_username, token) VALUES ($1, $2) RETURNING *'
}