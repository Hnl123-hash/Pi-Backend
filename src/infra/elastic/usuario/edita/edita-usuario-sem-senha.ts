import { UsuarioEntityComId } from "../../../../core/entities/usuario.entities";
import { criptgrafaString } from "../../../hashing/hash";
import { getElasticClient } from "../../elastic";
import { buscaPorEmail } from "../busca/busca-usuario";

export const editaUsuarioSemSenha = async (
  index: string,
  email: string,
  senha: string
) => {
  const conexao = getElasticClient();
  let novoUsuario;

  try {
    const usuario = await buscaPorEmail<UsuarioEntityComId>(email, index);
    novoUsuario = {
      ...usuario,
      senhaHash: await criptgrafaString(senha),
    };
  } catch (e) {
    console.error(e);
    return null;
  }

  const novoUsuarioId = novoUsuario.id as any;

  try {
    await conexao.update({
      index,
      id: novoUsuarioId,
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
