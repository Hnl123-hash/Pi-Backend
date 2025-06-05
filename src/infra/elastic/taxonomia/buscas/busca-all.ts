import { getBaseQueryPaginado, getElasticClient } from "../../elastic";
import { Retorno } from "../../elastic.types";

const VALOR_TOTAL_ITENS = 126401;

export const buscaTodos = async <T>(
  index: string,
  pagina: number,
  tamanho: number
): Promise<Retorno<T>> => {
  const conexao = getElasticClient();
  const bodyPesquisa = getBaseQueryPaginado(index, tamanho, pagina);
  bodyPesquisa.body.query = {
    match_all: {},
  };
  try {
    const response = await conexao.search<T>(bodyPesquisa as any);
    return {
      data: response.hits.hits.map((hit: any) => {
        return {
          ...hit._source,
          id: hit._id,
        } as T;
      }),
      total: VALOR_TOTAL_ITENS,
    };
  } catch (error) {
    console.error("Erro ao buscar dados iniciais:", error);
    throw new Error("Erro ao buscar dados iniciais");
  }
};
