import { UsuarioEntity } from "../../../../core/entities/usuario.entities";
import { criptgrafaString } from "../../../hashing/hash";
import { getElasticClient } from "../../elastic";

export const criaUsuario = async <T>(
  dadosUsuario: UsuarioEntity,
  index: string
): Promise<T> => {
  const conexao = getElasticClient();
  const senha = dadosUsuario.senhaHash
    ? await criptgrafaString(dadosUsuario.senhaHash)
    : "";

  try {
    const novoUsuario: UsuarioEntity = {
      ...dadosUsuario,
      senhaHash: senha,
    };

    const response = await conexao.index({
      index,
      body: novoUsuario,
      refresh: "wait_for",
    });

    return response as T;
  } catch (error) {
    console.error("Erro ao criar admin:", error);
    throw new Error("erro ao criar admin");
  }
};
