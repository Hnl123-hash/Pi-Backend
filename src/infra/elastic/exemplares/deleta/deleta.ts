import { getElasticClient } from "../../elastic";

export const deletaExemplar = async (id: string): Promise<boolean> => {
  const conexao = getElasticClient();

  try {
    const response = await conexao.delete({
      index: "exemplares",
      id,
    });

    if (response.result === "deleted") {
      return true;
    } else {
      throw new Error(`Erro ao deletar o documento com ID ${id}.`);
    }
  } catch (error) {
    console.error("Erro ao deletar o documento:", error);
    throw new Error("Erro ao deletar o documento");
  }
};
