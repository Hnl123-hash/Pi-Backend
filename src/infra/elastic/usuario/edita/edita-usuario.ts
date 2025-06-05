import { UsuarioEntity } from "../../../../core/entities/usuario.entities";
import { getElasticClient } from "../../elastic";

export const editaUsuario = async (
  index: string,
  id: string,
  permissoesAtualizadas: string[]
) => {
  const conexao = getElasticClient();
  let novoUsuario;

  try {
    const response = await conexao.get({ index, id });
    const usuario = response._source as UsuarioEntity;
    novoUsuario = {
      ...usuario,
      permissoes: permissoesAtualizadas,
    };
  } catch (e) {
    console.error(e);
    return null;
  }

  try {
    await conexao.update({
      index,
      id,
      body: {
        doc: novoUsuario as any,
      },
    });
    return true;
  } catch (e) {
    console.error("Erro ao atualizar usuario:", e);
    throw new Error("Erro ao atualizar usuario");
  }
};
