import { db } from "../../infra/elastic/elastic";
import { comparaString } from "../../infra/hashing/hash";
import { UsuarioEntity } from "../entities/usuario.entities";

export class UsuarioUseCase {
  private static index = "usuarios";

  static async realizaLoginUsuario(
    email: string,
    senha: string
  ): Promise<UsuarioEntity | null> {
    const usuario = await db.buscaPorEmail<UsuarioEntity>(email, this.index); // usuario com id
    if (!usuario) return null;

    const isSenhaCorreta = await comparaString(senha, usuario.senhaHash);
    if (isSenhaCorreta) {
      return usuario;
    }
    return null;
  }

  static async criaUsuario(usuario: UsuarioEntity) {
    try {
      await db.criaUsuario(usuario, this.index);
      return true;
    } catch (e) {
      return false;
    }
  }

  static async listaUsuarios() {
    return db.buscaUsuarios(this.index);
  }

  static async deletaUsuario(id: string) {
    try {
      await db.deletaUsuario(this.index, id);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  static async atualizaPermissoesUsuario(
    id: string,
    permissoesAtualizadas: string[]
  ) {
    return db.editaUsuario(this.index, id, permissoesAtualizadas);
  }

  static async defineSenhaParaUsuarioSemSenha(email: string, senha: string) {
    try {
      const usuario = await db.buscaPorEmail<UsuarioEntity>(email, this.index);

      if (usuario?.senhaHash !== "") {
        return null;
      }

      await db.editaUsuarioSemSenha(this.index, email, senha);
      return true;
    } catch (e) {
      return false;
    }
  }
}
