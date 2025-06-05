import { db } from "../../infra/elastic/elastic";
import { Retorno } from "../../infra/elastic/elastic.types";
import { TaxonomiaEntity } from "../entities/taxonomia.entities";

export class TaxonomiaUseCase {
  private static index = "taxonomia";

  static async getTaxonomiaPorNomeCientificoPaginado(
    nomeCientifico: string,
    paginaAtual: number,
    tamanhoPagina: number
  ): Promise<Retorno<TaxonomiaEntity>> {
    return await db.buscaFuzzyPaginado<TaxonomiaEntity>(
      this.index,
      "nome_cientifico",
      nomeCientifico,
      paginaAtual,
      tamanhoPagina
    );
  }

  static async getTaxonomiaAllPaginado(
    page: number,
    size: number
  ): Promise<Retorno<TaxonomiaEntity>> {
    return db.buscaTodos(this.index, page, size);
  }

  static async getTaxonomiaPorId(id: string): Promise<TaxonomiaEntity> {
    return db.buscaPorId(id, this.index);
  }

  static async putTaxonomia(
    id: string,
    novaTaxonomia: TaxonomiaEntity
  ): Promise<boolean> {
    return db.atualizaTaxonomia(this.index, id, novaTaxonomia);
  }
}
