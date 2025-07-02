import { ExemplarEntity } from "../../core/entities/exemplar.entities";
import { ExemplaresUseCase } from "../../core/usecase/exemplares.usecase";
import { cloudnaryWrapper } from "../../infra/imagens/cloudnary-wrapper";

const cadastraExemplar = async (
  exemplar: ExemplarEntity
): Promise<ExemplarEntity | null> => {
  const resultado = await ExemplaresUseCase.cadastraExemplar(exemplar);
  return resultado;
};

const listaExemplares = async (quantidade: number, pagina: number) => {
  const exemplares = await ExemplaresUseCase.listaExemplares(
    quantidade,
    pagina
  );
  return exemplares;
};

const buscaExemplarPorId = async (id: string) => {
  const exemplar = await ExemplaresUseCase.buscaExemplarPorId(id);
  return exemplar;
};

const buscaExemplarPorNomePopular = async (
  nomePopular: string,
  quantidade: number,
  pagina: number
) => {
  const exemplares = await ExemplaresUseCase.buscaExemplarPorNomePopular(
    nomePopular,
    quantidade,
    pagina
  );

  console.log(exemplares);
  return exemplares;
};

const atualizaExemplar = async (
  id: string,
  exemplarAtualizado: ExemplarEntity
): Promise<boolean> => {
  const resultado = await ExemplaresUseCase.atualizaExemplar(
    id,
    exemplarAtualizado
  );
  return resultado;
};

const deletaExemplar = async (id: string): Promise<boolean> => {
  const resultado = await ExemplaresUseCase.deletaExemplarPorId(id);
  return resultado;
};

const buscaExemplarPorNomeCientifico = async (
  nomeCientifico: string,
  quantidade: number = 10,
  pagina: number = 1
): Promise<ExemplarEntity[]> => {
  const exemplares = await ExemplaresUseCase.buscaExemplarPorNomeCientifico(
    nomeCientifico,
    quantidade,
    pagina
  );
  return exemplares;
};

const salvaImagem = async (
  id: string,
  imagem: string,
  nome: string
): Promise<boolean> => {
  try {
    const response = await cloudnaryWrapper.salvaImagem(
      imagem,
      "exemplares",
      nome
    );
    const urlImagem = response.secure_url;
    if (!urlImagem) {
      throw new Error("URL da imagem não encontrada na resposta do Cloudinary");
    }

    ExemplaresUseCase.salvaUrlImagem(id, urlImagem);
    console.log(`Imagem salva para o exemplar com a url: ${urlImagem}`);
    return true;
  } catch (error) {
    console.error("Erro ao salvar a imagem:", error);
    return false;
  }
};

export const exemplaresController = {
  cadastraExemplar,
  listaExemplares,
  buscaExemplarPorId,
  buscaExemplarPorNomePopular,
  atualizaExemplar,
  deletaExemplar,
  buscaExemplarPorNomeCientifico,
  salvaImagem,
};
