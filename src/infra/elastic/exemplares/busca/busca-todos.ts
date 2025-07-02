import { ExemplarEntityComId } from "../../../../core/entities/exemplar.entities";
import { getBaseQueryPaginado, getElasticClient } from "../../elastic";

interface RetornoBuscaExemplares {
  data: ExemplarEntityComId[];
  total: number;
}

export const buscaTodosExemplares = async (
  index: string,
  tamanho: number,
  pagina: number
): Promise<RetornoBuscaExemplares> => {
  const conexao = getElasticClient();
  const bodyPesquisa = getBaseQueryPaginado(index, tamanho, pagina);
  bodyPesquisa.body.query = {
    match_all: {},
  };

  try {
    const response = await conexao.search(bodyPesquisa as any);

    let totalHits = response.hits.total || 0;
    if (typeof totalHits === "object") {
      // Se totalHits for um objeto, extrair o valor
      totalHits = totalHits.value || 0;
    }

    return {
      data: response.hits.hits.map((hit: any) => {
        return {
          ...hit._source,
          id: hit._id,
        } as ExemplarEntityComId;
      }),
      total: totalHits as number,
    };
  } catch (error) {
    console.error("Erro ao buscar todos os exemplares:", error);
    throw error;
  }
};
