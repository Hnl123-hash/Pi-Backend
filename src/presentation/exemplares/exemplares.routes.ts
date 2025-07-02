import { Router } from "express";
import { verificaAutorizacao } from "../../infra/security/security";
import { exemplaresController } from "./exemplares.controller";
import { createExemplaresIndex } from "../../infra/elastic/exemplares/exemplares.init";

const exemplaresRouter = Router();
const basePath = "/exemplares";

exemplaresRouter.get(basePath + "/init", async (req, res) => {
  try {
    createExemplaresIndex();
    res
      .status(200)
      .json({ message: "Índice de exemplares criado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

exemplaresRouter.post(basePath + "/cadastra-exemplar", async (req, res) => {
  if (!verificaAutorizacao(req.headers["authorization"], undefined, "CRIAR")) {
    res.status(401).json({ erro: "Sem autorização" });
    return;
  }

  try {
    const exemplar = req.body;
    const result = await exemplaresController.cadastraExemplar(exemplar);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Erro ao cadastrar exemplar" });
  }
});

exemplaresRouter.get(basePath + "/lista-exemplares", async (req, res) => {
  try {
    const quantidade = parseInt(req.query.qntPagina as string) || 10;
    const pagina = parseInt(req.query.pagina as string) || 1;
    const exemplares = await exemplaresController.listaExemplares(
      quantidade,
      pagina
    );
    res.status(200).json(exemplares);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar exemplares" });
  }
});

exemplaresRouter.get(basePath + "/exemplar/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const exemplar = await exemplaresController.buscaExemplarPorId(id);
    if (exemplar) {
      res.status(200).json(exemplar);
    } else {
      res.status(404).json({ error: "Exemplar não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar exemplar" });
  }
});

exemplaresRouter.put(basePath + "/atualiza-exemplar/:id", async (req, res) => {
  if (!verificaAutorizacao(req.headers["authorization"], undefined, "EDITAR")) {
    res.status(401).json({ erro: "Sem autorização" });
    return;
  }

  try {
    const id = req.params.id;
    const exemplar = req.body;
    await exemplaresController.atualizaExemplar(id, exemplar);
    res.status(200).json({ message: "Exemplar atualizado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar exemplar" });
  }
});

exemplaresRouter.delete(basePath + "/deleta-exemplar/:id", async (req, res) => {
  if (
    !verificaAutorizacao(req.headers["authorization"], undefined, "DELETAR")
  ) {
    res.status(401).json({ erro: "Sem autorização" });
    return;
  }

  try {
    const id = req.params.id;
    await exemplaresController.deletaExemplar(id);
    res.status(200).json({ message: "Exemplar deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar exemplar" });
  }
});

exemplaresRouter.get(basePath + "/busca-nome-cientifico", async (req, res) => {
  try {
    const nomeCientifico = req.query.nome as string;
    const quantidade = parseInt(req.query.quantidade as string) || 10;
    const pagina = parseInt(req.query.pagina as string) || 1;
    const exemplares =
      await exemplaresController.buscaExemplarPorNomeCientifico(
        nomeCientifico,
        quantidade,
        pagina
      );
    res.status(200).json(exemplares);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar exemplares" });
  }
});

exemplaresRouter.get(basePath + "/busca-nome-popular", async (req, res) => {
  try {
    const nomePopular = req.query.nome as string;
    const quantidade = parseInt(req.query.qntPagina as string) || 10;
    const pagina = parseInt(req.query.pagina as string) || 1;
    const exemplares = await exemplaresController.buscaExemplarPorNomePopular(
      nomePopular,
      quantidade,
      pagina
    );
    res.status(200).json(exemplares);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao buscar exemplares por nome popular" });
  }
});

exemplaresRouter.post(basePath + "/upload-imagem", async (req, res) => {
  if (!verificaAutorizacao(req.headers["authorization"], undefined, "CRIAR")) {
    res.status(401).json({ erro: "Sem autorização" });
    return;
  }

  try {
    const id = req.body.id;
    const imagem = req.body.imagem;
    const nome = req.body.nome;
    if (!id || !imagem) {
      res.status(400).json({ error: "ID e imagem são obrigatórios" });
      return;
    }
    await exemplaresController.salvaImagem(id, imagem, nome);
    res.status(200).json({ message: "Imagem salva com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao salvar imagem" });
  }
});

export default exemplaresRouter;
