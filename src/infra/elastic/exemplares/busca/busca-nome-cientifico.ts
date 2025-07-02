import { getElasticClient } from "../../elastic";

export const buscaExemplarPorNomeCientifico = async (
  nomeCientifico: string,
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
          match: {
            "taxonomia.nome_cientifico": {
              query: nomeCientifico, // Variável com o nome científico a ser buscado
              fuzziness: 2,
              operator: "and",
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
    console.error("Erro ao buscar exemplares por nome cientifico:", error);
    throw new Error("Erro ao buscar exemplares por nome cientifico");
  }
};
