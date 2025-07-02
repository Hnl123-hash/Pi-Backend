import { getElasticClient } from "../elastic";

export async function createExemplaresIndex() {
  const client = getElasticClient();

  const exists = await client.indices.exists({ index: "exemplares" });
  if (exists) {
    //deleta indice se já existir
    await client.indices.delete({ index: "exemplares" });
    console.log('Índice "exemplares" já existe');
    return;
  }

  await client.indices.create({
    index: "exemplares",
    body: {
      mappings: {
        properties: {
          taxonomia: {
            type: "object",
            properties: {
              nome_cientifico: {
                type: "text",
              },
              especie: { type: "keyword", index: false },
              genero: { type: "keyword", index: false },
              familia: { type: "keyword", index: false },
              higherClassification: { type: "keyword", index: false },
              order: { type: "keyword", index: false },
              class: { type: "keyword", index: false },
              phylum: { type: "keyword", index: false },
              kingdom: { type: "keyword", index: false },
              references: { type: "keyword", index: false },
              taxonID: { type: "keyword", index: false },
              nomesPopulares: {
                type: "nested",
                include_in_parent: true,
                properties: {
                  vernacularName: {
                    type: "text",
                  },
                  language: { type: "keyword", index: false },
                  locality: { type: "keyword", index: false },
                },
              },
            },
          },

          identificadorJardim: {
            type: "keyword",
            index: false,
          },
          descricao: {
            type: "text",
            index: false,
          },
          idade: {
            type: "integer",
            index: false,
          },
          localizacao: {
            type: "geo_point",
          },
          fotos: {
            type: "keyword",
            index: false,
          },
          precedencia: {
            type: "keyword",
            index: false,
          },
        },
      },
    } as any,
  });

  console.log('Índice "exemplares" criado com sucesso');
}
