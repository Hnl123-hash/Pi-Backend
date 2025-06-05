interface NomePopular {
  vernacularName?: string;
  language?: string;
  locality?: string;
}

export interface TaxonomiaEntity {
  nome_cientifico?: string;
  especie?: string;
  genero?: string;
  familia?: string;
  higherClassification?: string;
  order?: string;
  class?: string;
  phylum?: string;
  kingdom?: string;
  references?: string;
  taxonID?: string;
  nomesPopulares?: NomePopular[];
}
