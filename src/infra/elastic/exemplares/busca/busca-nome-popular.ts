import { getElasticClient } from "../../elastic";

export const buscaExemplarPorNomePopular = async (
  nomePopular: string,
  index: string,
  pagina: number = 1,
  quantidade: number = 10
): Promise<any> => {
  const conexao = getElasticClient();
  try {
    const response = await conexao.search({
      index,
      body: {
        query: {
          nested: {
            path: "taxonomia.nomesPopulares",
            query: {
              match: {
                "taxonomia.nomesPopulares.vernacularName": {
                  query: nomePopular,
                  fuzziness: 2,
                  operator: "and",
                },
              },
            },
          },
        } as any,
      },
      from: (pagina - 1) * quantidade,
      size: quantidade,
    });

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
        };
      }),
      total: totalHits as number,
    };
  } catch (error) {
    console.error("Erro ao buscar exemplares por nome popular:", error);
    throw new Error("Erro ao buscar exemplares por nome popular");
  }
};
