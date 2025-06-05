import { getBaseQuery, getElasticClient } from "../../elastic";

export const buscaFuzzy = async <T>(
  index: string,
  campo: string,
  valor: string
): Promise<T[]> => {
  const conexao = getElasticClient();
  const query = getBaseQuery(index);
  const queryParam = {
    query: valor,
    fuzziness: "AUTO",
  };
  query.body.query = {
    match: {
      [campo]: queryParam,
    },
  };

  try {
    const response = await conexao.search<T>(query as any);
    return response.hits.hits.map((hit: any) => {
      return {
        ...hit._source,
        id: hit._id,
      } as T;
    });
  } catch (error) {
    console.error("Error executing fuzzy search:", error);
    throw new Error("Fuzzy search failed");
  }
};
