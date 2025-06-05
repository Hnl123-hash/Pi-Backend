import { TaxonomiaEntity } from "../../core/entities/taxonomia.entities";
import { TaxonomiaUseCase } from "../../core/usecase/taxonomia.usecase";

const dadosIniciais = async (params?: Record<any, any>) => {
  try {
    const initialData = await TaxonomiaUseCase.getTaxonomiaAllPaginado(
      params?.pagina ?? 1,
      params?.qnt ?? 10
    );
    return initialData;
  } catch (error) {
    console.error("Error fetching initial data:", error);
    throw new Error("Failed to fetch initial data");
  }
};

const buscaPorNomeCientifico = async (params?: Record<any, any>) => {
  try {
    const busca = await TaxonomiaUseCase.getTaxonomiaPorNomeCientificoPaginado(
      params?.nomeCientifico ?? "",
      params?.pagina ?? 1,
      params?.qnt ?? 10
    );
    return busca;
  } catch (error) {
    console.error("Error fetching initial data:", error);
    throw new Error("Failed to fetch initial data");
  }
};

const buscaTaxonomiaPorId = async (params?: Record<any, any>) => {
  const busca = await TaxonomiaUseCase.getTaxonomiaPorId(params?.id);
  return busca;
};

const atualizaTaxonomia = async (
  params: Record<any, any>,
  body: TaxonomiaEntity
) => {
  return await TaxonomiaUseCase.putTaxonomia(params?.id, body);
};

export const taxonomiaController = {
  dadosIniciais,
  buscaPorNomeCientifico,
  buscaTaxonomiaPorId,
  atualizaTaxonomia,
};
