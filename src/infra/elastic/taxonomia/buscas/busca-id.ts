import { getElasticClient } from "../../elastic";

export const buscaPorId = async <T>(id: string, index: string): Promise<T> => {
  const conexao = getElasticClient();

  try {
    const response = await conexao.get({
      index,
      id,
    });

    if (response.found) {
      return response._source as T;
    } else {
      throw new Error(`Documento com ID ${id} não encontrado.`);
    }
  } catch (error) {
    console.error("Erro ao buscar documento por ID:", error);
    throw new Error("Erro ao buscar documento por ID");
  }
};
