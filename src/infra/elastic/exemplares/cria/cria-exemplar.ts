import { ExemplarEntity } from "../../../../core/entities/exemplar.entities";
import { getElasticClient } from "../../elastic";

export const criaExemplar = async (exemplar: ExemplarEntity, index: string) => {
  const conexao = getElasticClient();
  try {
    const response = await conexao.index({
      index,
      body: exemplar,
      refresh: "wait_for",
    });
    return response._id;
  } catch (error) {
    console.error("Erro ao criar exemplar:", error);
    throw new Error("Erro ao criar exemplar");
  }
};
