import {
  UsuarioEntity,
  UsuarioSemSenhaEntity,
} from "../../core/entities/usuario.entities";
import { UsuarioUseCase } from "../../core/usecase/usuario.usecase";
import { assinaAuth } from "../../infra/auth/jwtService";
import { UsuarioComID } from "../../infra/auth/jwtService.types";

const loginUsuario = async (body: UsuarioEntity) => {
  const usuarioLogado = await UsuarioUseCase.realizaLoginUsuario(
    body.email,
    body.senhaHash
  );

  if (usuarioLogado) {
    const token = assinaAuth(usuarioLogado as UsuarioComID);
    return token;
  }

  return null;
};

const criaUsuario = async (body: UsuarioEntity) => {
  const isUsuarioCriado = await UsuarioUseCase.criaUsuario(body);
  return isUsuarioCriado;
};

const buscaUsuarios = async () => {
  return UsuarioUseCase.listaUsuarios();
};

const deletaUsuario = async (id: string) => {
  return UsuarioUseCase.deletaUsuario(id);
};

const atualizaPermissoesUsuario = async (
  id: string,
  permissoesAtualizadas: string[]
) => {
  return UsuarioUseCase.atualizaPermissoesUsuario(id, permissoesAtualizadas);
};

const adicionaSenhaNovoUsuario = async (email: string, senha: string) => {
  const response = await UsuarioUseCase.defineSenhaParaUsuarioSemSenha(
    email,
    senha
  );

  if (response) {
    return true;
  }

  return false;
};

export const UsuarioController = {
  loginUsuario,
  criaUsuario,
  buscaUsuarios,
  deletaUsuario,
  atualizaPermissoesUsuario,
  adicionaSenhaNovoUsuario,
};
