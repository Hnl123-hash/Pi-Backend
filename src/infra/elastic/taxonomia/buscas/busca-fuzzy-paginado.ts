import {
  getBaseQuery,
  getBaseQueryPaginado,
  getElasticClient,
} from "../../elastic";
import { Retorno } from "../../elastic.types";

export const buscaFuzzyPaginado = async <T>(
  index: string,
  campo: string,
  valor: string,
  paginaAtual: number,
  tamanhoPagina: number
): Promise<Retorno<T>> => {
  const conexao = getElasticClient();
  const query = getBaseQueryPaginado(index, tamanhoPagina, paginaAtual);
  const queryParam = {
    query: valor,
    fuzziness: 2,
    operator: "and",
  };
  query.body.query = {
    match: {
      [campo]: queryParam,
    },
  };

  const queryCount = getBaseQuery(index);
  queryCount.body.query = {
    match: {
      [campo]: queryParam,
    },
  };

  try {
    const response = await conexao.search<T>(query as any);
    const countResponse = await conexao.count(queryCount as any);
    return {
      data: response.hits.hits.map((hit: any) => {
        return {
          ...hit._source,
          id: hit._id,
        } as T;
      }),
      total: countResponse.count,
    };
  } catch (error) {
    console.error("Error executing fuzzy search:", error);
    throw new Error("Fuzzy search failed");
  }
};
