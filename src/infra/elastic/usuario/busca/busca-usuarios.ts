import { UsuarioSemSenhaEntity } from "../../../../core/entities/usuario.entities";
import { getBaseQuery, getElasticClient } from "../../elastic";

export const buscaUsuarios = async (
  index: string
): Promise<UsuarioSemSenhaEntity[]> => {
  const conexao = getElasticClient();
  const bodyPesquisa = getBaseQuery(index);
  bodyPesquisa.body = {
    query: {
      match_all: {},
    },
    size: 100,
  } as any;
  try {
    const response = await conexao.search<UsuarioSemSenhaEntity>(
      bodyPesquisa as any
    );
    return response.hits.hits.map((hit: any) => {
      return {
        ...hit._source,
        id: hit._id,
        senhaHash: undefined,
      } as UsuarioSemSenhaEntity;
    });
  } catch (error) {
    console.error("Erro ao buscar usuarios:", error);
    throw new Error("Erro ao buscar usuarios");
  }
};
