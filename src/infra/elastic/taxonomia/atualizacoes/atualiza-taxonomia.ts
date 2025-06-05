import { TaxonomiaEntity } from "../../../../core/entities/taxonomia.entities";
import { getElasticClient } from "../../elastic";

export const atualizaTaxonomia = async (
  index: string,
  id: string,
  taxonomiaAtualizada: TaxonomiaEntity
) => {
  const conexao = getElasticClient();

  try {
    await conexao.update({
      index,
      id,
      body: {
        doc: taxonomiaAtualizada as any,
      },
    });
    return true;
  } catch (e) {
    console.error("Erro ao atualizar taxonomia:", e);
    throw new Error("Erro ao atualizar taxonomia");
  }
};
