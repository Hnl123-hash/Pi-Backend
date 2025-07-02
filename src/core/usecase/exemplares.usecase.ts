import { db } from "../../infra/elastic/elastic";
import { ExemplarEntity } from "../entities/exemplar.entities";

export class ExemplaresUseCase {
  private static index = "exemplares";

  static async cadastraExemplar(
    exemplar: ExemplarEntity
  ): Promise<ExemplarEntity | null> {
    try {
      const id = await db.criaExemplar(exemplar, this.index);
      return await this.buscaExemplarPorId(id);
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  static async listaExemplares(quantidade: number, pagina: number) {
    return await db.buscaTodosExemplares(this.index, quantidade, pagina);
  }

  static async atualizaExemplar(
    id: string,
    exemplarAtualizado: ExemplarEntity
  ) {
    return db.atualizaExemplar(id, exemplarAtualizado, this.index);
  }

  static async buscaExemplarPorId(id: string): Promise<ExemplarEntity | null> {
    try {
      const exemplar = await db.buscaPorId<ExemplarEntity>(id, this.index);
      return exemplar;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  static async deletaExemplarPorId(id: string): Promise<boolean> {
    try {
      await db.deletaExemplar(id);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  static async buscaExemplarPorNomePopular(
    nomePopular: string,
    quantidade: number = 10,
    pagina: number = 1
  ): Promise<ExemplarEntity[]> {
    try {
      const exemplares = await db.buscaExemplarPorNomePopular(
        nomePopular,
        this.index,
        pagina,
        quantidade
      );

      return exemplares;
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  static async buscaExemplarPorNomeCientifico(
    nomeCientifico: string,
    quantidade: number = 10,
    pagina: number = 1
  ): Promise<ExemplarEntity[]> {
    try {
      const exemplares = await db.buscaExemplarPorNomeCientifico(
        nomeCientifico,
        this.index,
        pagina,
        quantidade
      );

      return exemplares;
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  static async salvaUrlImagem(id: string, urlImagem: string): Promise<void> {
    try {
      const exemplar = await this.buscaExemplarPorId(id);
      if (exemplar) {
        exemplar.fotos?.push(urlImagem);
        await this.atualizaExemplar(id, exemplar);
      } else {
        throw new Error(`Exemplar com ID ${id} não encontrado.`);
      }
    } catch (e) {
      console.error(e);
    }
  }
}
