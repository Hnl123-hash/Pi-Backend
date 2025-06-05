import jwt from "jsonwebtoken";
import { PayloadUsuario, UsuarioComID } from "./jwtService.types";
import { UsuarioEntity } from "../../core/entities/usuario.entities";

const CHAVE = "8621rt3ygkuasd";

const assinaAuth = (payload: UsuarioComID) => {
  return jwt.sign(payload, CHAVE, { expiresIn: "30m" });
};

const verificaAuth = (token: string) => {
  try {
    const retorno = jwt.verify(token, CHAVE);
    return retorno ? true : false;
  } catch (e) {
    return false;
  }
};

const decodeToken = (token: string): PayloadUsuario => {
  return jwt.decode(token) as PayloadUsuario;
};

export { assinaAuth, verificaAuth, decodeToken };
