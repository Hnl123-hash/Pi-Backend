import { Router } from "express";
import { UsuarioController } from "./usuario.controller";
import { verificaAutorizacao } from "../../infra/security/security";

const usuarioRouter = Router();
const basePath = "/usuario";

usuarioRouter.post(basePath + "/login", async (req, res) => {
  try {
    const token = await UsuarioController.loginUsuario(req.body);

    token
      ? res.status(200).json(token)
      : res.status(401).json({ erro: "Senha ou email incorreto" });
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

usuarioRouter.post(basePath + "/criaUsuario", async (req, res) => {
  if (!verificaAutorizacao(req.headers["authorization"], "ADMIN", undefined)) {
    res.status(401).json({ erro: "Sem autorização" });
    return;
  }

  try {
    await UsuarioController.criaUsuario(req.body);
    res.status(200).json({ message: "usuario criado" });
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

usuarioRouter.get(basePath + "/listaUsuarios", async (req, res) => {
  if (!verificaAutorizacao(req.headers["authorization"], "ADMIN", undefined)) {
    res.status(401).json({ erro: "Sem autorização" });
    return;
  }

  try {
    const usuarios = await UsuarioController.buscaUsuarios();
    res.status(200).json(usuarios);
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

usuarioRouter.delete(basePath + "/deletaUsuario", async (req, res) => {
  if (!verificaAutorizacao(req.headers["authorization"], "ADMIN", undefined)) {
    res.status(401).json({ erro: "Sem autorização" });
    return;
  }

  try {
    await UsuarioController.deletaUsuario(req.query.id as string);
    res.status(200).json({ mensagem: "usuario deletado" });
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

usuarioRouter.put(basePath + "/atualizaPermissao", async (req, res) => {
  if (!verificaAutorizacao(req.headers["authorization"], "ADMIN", undefined)) {
    res.status(401).json({ erro: "Sem autorização" });
    return;
  }

  try {
    await UsuarioController.atualizaPermissoesUsuario(
      req.query.id as string,
      req.body.permissoes
    );
    res.status(200).json({ mensagem: "permissões atualizadas" });
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

usuarioRouter.put(basePath + "/adicionaSenhaNovoUsuario", async (req, res) => {
  try {
    const response = await UsuarioController.adicionaSenhaNovoUsuario(
      req.body.email,
      req.body.senha
    );

    response
      ? res.status(200).json({ mensagem: "senha adicionada com sucesso" })
      : res.status(401).json({ erro: "erro" });
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default usuarioRouter;
