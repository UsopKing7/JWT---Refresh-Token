export interface userToken {
  id_username: string
  email: string
  username: string
  iat: number
  exp: number
}

declare global {
  namespace Express {
    interface Request {
      user?: userToken
    }
  }
}