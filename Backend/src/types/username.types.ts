import { UUID } from "crypto";

export interface UsuarioDB {
  id_username: UUID
  username: string
  email: string
  password: string
}

export interface UsuairoLogin {
  email: string
  password: string
}

export interface UsuarioRegister {
  username: string
  email: string
  password: string
}