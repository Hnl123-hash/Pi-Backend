import { getElasticClient } from "../../elastic";

export const buscaPorId = async <T>(id: string, index: string): Promise<T> => {
  const conexao = getElasticClient();

  try {
    const response = await conexao.get({
      index,
      id,
    });

    if (response.found) {
      if (response._source && typeof response._source === "object") {
        return { ...response._source, id: response._id } as T;
      } else {
        throw new Error(
          `O documento com ID ${id} não possui um _source válido.`
        );
      }
    } else {
      throw new Error(`Documento com ID ${id} não encontrado.`);
    }
  } catch (error) {
    console.error("Erro ao buscar documento por ID:", error);
    throw new Error("Erro ao buscar documento por ID");
  }
};
