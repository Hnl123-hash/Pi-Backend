import { ExemplarEntity } from "../../../../core/entities/exemplar.entities";
import { getElasticClient } from "../../elastic";

export const atualizaExemplar = async (
  id: string,
  exemplarAtualizado: ExemplarEntity,
  index: string
): Promise<boolean> => {
  const conexao = getElasticClient();

  try {
    const response = await conexao.update({
      index,
      id,
      body: {
        doc: exemplarAtualizado as any,
      },
    });

    if (response.result === "updated") {
      return true;
    } else {
      throw new Error(`Erro ao atualizar o documento com ID ${id}.`);
    }
  } catch (error) {
    console.error("Erro ao atualizar o documento:", error);
    throw new Error("Erro ao atualizar o documento");
  }
};
