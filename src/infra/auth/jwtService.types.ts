import { UsuarioEntity } from "../../core/entities/usuario.entities";

export interface PayloadUsuario {
  idUsuario: string;
  permissoes: string[];
  role: "ADMIN" | "USUARIO";
}

export interface UsuarioComID extends UsuarioEntity {
  idUsuario: string;
}
