import { Client } from "@elastic/elasticsearch";
import { buscaFuzzy } from "./taxonomia/busca/busca-fuzzy";
import { buscaTodos } from "./taxonomia/busca/busca-all";
import { buscaFuzzyPaginado } from "./taxonomia/busca/busca-fuzzy-paginado";
import { buscaPorId } from "./taxonomia/busca/busca-id";
import { atualizaTaxonomia } from "./taxonomia/atualiza/atualiza-taxonomia";
import { buscaPorEmail } from "./usuario/busca/busca-usuario";
import { criaUsuario } from "./usuario/cria/cria-usuario";
import { buscaUsuarios } from "./usuario/busca/busca-usuarios";
import { deletaUsuario } from "./usuario/deleta/deleta-usuario";
import { editaUsuario } from "./usuario/edita/edita-usuario";
import { editaUsuarioSemSenha } from "./usuario/edita/edita-usuario-sem-senha";
import { criaExemplar } from "./exemplares/cria/cria-exemplar";
import { buscaTodosExemplares } from "./exemplares/busca/busca-todos";
import { buscaExemplarPorNomePopular } from "./exemplares/busca/busca-nome-popular";
import { atualizaExemplar } from "./exemplares/atualiza/atualiza";
import { deletaExemplar } from "./exemplares/deleta/deleta";
import { buscaExemplarPorNomeCientifico } from "./exemplares/busca/busca-nome-cientifico";

let conexao: Client | null = null;

export const getBaseQuery = (index: string) => {
  return {
    index,
    body: {
      query: {},
    },
  };
};

export const getBaseQueryPaginado = (
  index: string,
  quantidade: number,
  pagina: number
) => {
  return {
    index,
    body: {
      query: {},
      from: (pagina - 1) * quantidade,
      size: quantidade,
    },
  };
};

export const getElasticClient = () => {
  if (!conexao) {
    conexao = new Client({
      node: "http://localhost:9200",
    });
  }
  return conexao;
};

export const db = {
  buscaFuzzy,
  buscaTodos,
  buscaFuzzyPaginado,
  buscaPorId,
  atualizaTaxonomia,
  buscaPorEmail,
  criaUsuario,
  buscaUsuarios,
  deletaUsuario,
  editaUsuario,
  editaUsuarioSemSenha,
  criaExemplar,
  buscaTodosExemplares,
  buscaExemplarPorNomePopular,
  atualizaExemplar,
  deletaExemplar,
  buscaExemplarPorNomeCientifico,
};
