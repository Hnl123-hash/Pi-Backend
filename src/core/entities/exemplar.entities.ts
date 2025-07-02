interface NomePopular {
  vernacularName: string;
  language: string;
  locality: string;
}

interface Taxonomia {
  nome_cientifico: string;
  especie: string;
  genero: string;
  familia: string;
  higherClassification: string;
  order: string;
  class: string;
  phylum: string;
  kingdom: string;
  references: string;
  taxonID: string;
  nomesPopulares?: NomePopular[];
}

interface GeoPoint {
  lat: number;
  lon: number;
}

export interface ExemplarEntity {
  taxonomia: Taxonomia;
  descricao?: string;
  idade?: number;
  localizacao?: GeoPoint;
  fotos?: string[]; // url para as fotos, armazenadas como um array de strings
  precedencia?: string;
  identificadorJardim?: number;
}

export interface ExemplarEntityComId extends ExemplarEntity {
  id: string; // id do exemplar no ElasticSearch
}
