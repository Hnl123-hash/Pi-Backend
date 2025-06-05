import { Router } from "express";
import { taxonomiaController } from "./taxonomia.controller";
import { verificaAutorizacao } from "../../infra/security/security";

const taxonomiaRouter = Router();
const basePath = "/taxonomia";

taxonomiaRouter.get(basePath + "/dadosIniciais", async (req, res) => {
  if (
    !verificaAutorizacao(req.headers["authorization"], undefined, undefined)
  ) {
    res.status(401).json({ erro: "Sem autorização" });
    return;
  }

  try {
    const dadosIniciais = await taxonomiaController.dadosIniciais({
      qnt: req.query.qnt,
      pagina: req.query.pagina,
    });
    res.status(200).json(dadosIniciais);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

taxonomiaRouter.get(basePath + "/buscaTaxonomia", async (req, res) => {
  if (
    !verificaAutorizacao(req.headers["authorization"], undefined, undefined)
  ) {
    res.status(401).json({ erro: "Sem autorização" });
    return;
  }

  try {
    const response = await taxonomiaController.buscaPorNomeCientifico({
      nomeCientifico: req.query.nomeCientifico,
      qnt: req.query.qnt,
      pagina: req.query.pagina,
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

taxonomiaRouter.get(basePath + "/buscaTaxonomiaPorId", async (req, res) => {
  if (
    !verificaAutorizacao(req.headers["authorization"], undefined, undefined)
  ) {
    res.status(401).json({ erro: "Sem autorização" });
    return;
  }

  try {
    const response = await taxonomiaController.buscaTaxonomiaPorId({
      id: req.query.id,
    });
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

taxonomiaRouter.put(basePath + "/atualizaTaxonomia", async (req, res) => {
  if (!verificaAutorizacao(req.headers["authorization"], undefined, "EDITAR")) {
    res.status(401).json({ erro: "Sem autorização" });
    return;
  }

  try {
    await taxonomiaController.atualizaTaxonomia({ id: req.query.id }, req.body);
    res.status(200).json("");
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default taxonomiaRouter;
