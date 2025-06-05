import { getElasticClient } from "../../elastic";

export const deletaUsuario = async <T>(
  index: string,
  id: string
): Promise<T> => {
  const conexao = getElasticClient();

  try {
    const response = await conexao.delete({ index, id });

    return response as T;
  } catch (error) {
    console.error("Erro ao deletar o usuario:", error);
    throw new Error("Erro ao deletar o usuario");
  }
};
