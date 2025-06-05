export interface UsuarioEntity {
  permissoes: string[];
  senhaHash: string;
  email: string;
  role: "ADMIN" | "USUARIO";
}

export interface UsuarioEntityComId {
  permissoes: string[];
  senhaHash: string;
  email: string;
  role: "ADMIN" | "USUARIO";
  id: string;
}

export interface UsuarioSemSenhaComIdEntity {
  permissoes: string[];
  role: "ADMIN" | "USUARIO";
  id: string;
  email: string;
}

export interface UsuarioSemSenhaEntity {
  permissoes: string[];
  role: "ADMIN" | "USUARIO";
  id: string;
  email: string;
}
