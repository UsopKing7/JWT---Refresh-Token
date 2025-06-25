export const QUERY_POR_ = {
  USER_EMAIL: 'SELECT * FROM usuarios WHERE email = $1',
  USER_EXIST: 'SELECT * FROM usuarios WHERE username = $1 AND email = $2',
  USER_INPUT: 'INSERT INTO usuarios (username, email, password) VALUES ($1, $2, $3)'
}