CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Roles
CREATE TABLE roles (
  id_role UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_rol VARCHAR(50) UNIQUE NOT NULL
);

-- Usuarios
CREATE TABLE usuarios (
  id_username UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role_id UUID NOT NULL,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (role_id) REFERENCES roles(id_role)
);

-- Tokens (refresh tokens opcional)
CREATE TABLE tokens (
  id_token UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id_username UUID NOT NULL,
  token TEXT NOT NULL,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_username) REFERENCES usuarios(id_username) ON DELETE CASCADE
);
