import { UsuarioEntity } from "../../../../core/entities/usuario.entities";
import { getBaseQuery, getElasticClient } from "../../elastic";

export const buscaPorEmail = async <T>(
  email: string,
  index: string
): Promise<T | null> => {
  const conexao = getElasticClient();

  try {
    const bodyPesquisa = getBaseQuery(index);

    bodyPesquisa.body.query = {
      term: {
        email: email,
      },
    };

    const response = await conexao.search(bodyPesquisa as any);

    if (response.hits.hits.length === 0) return null;

    const usuarioResponse = response.hits.hits[0]._source as UsuarioEntity;
    return {
      ...usuarioResponse,
      id: response.hits.hits[0]._id,
    } as T;
  } catch (error) {
    console.error("Erro ao buscar usuario:", error);
    throw new Error("Erro ao buscar usuario");
  }
};
